// Visuals for the File Processing notes (names 'fp-…'), built on figs.js (window.FIGKIT).
// Labels and captions come from the doctor's slides (Lectures 1-2) and the site's notes. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('ff-accent')) { const s = document.createElement('style'); s.id = 'ff-accent'; s.textContent = '[data-fig^="fp-"]{ --fig-k: var(--k-fp); --fig-s: var(--s-fp); }'; document.head.appendChild(s); } })();
/* ── part 1 ── */
// File Processing visuals, part 1: L1 storage, file organization, physical vs logical files, opening (fopen, modes, C++ flags), closing and the buffer, reading and writing in C/C++, the read methods, the sample program and the ASCII methods. Labels and captions come from the doctor's slides and the site's notes for L1.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.ff1-wrap, .ff1-wrap *{ font-variant-ligatures:none; font-feature-settings:'liga' 0, 'calt' 0; }
.ff1 .fig-btn[aria-pressed="true"]{ background:var(--s-fp); color:#fff; border-color:transparent; }
.ff1 .fig-btn:disabled{ opacity:.45; cursor:default; }
.ff1 .fig-dots i.on{ background:var(--k-fp); }
.ff1-wrap{ max-width:440px; margin:0 auto; color:var(--ink); font-size:.86rem; line-height:1.4; }
.ff1-box{ border:1.4px solid var(--line); background:var(--paper); color:var(--ink); border-radius:8px; padding:6px 8px; transition:background .45s, border-color .45s, color .45s, opacity .45s; }
.ff1-box.on{ border-color:var(--k-fp); box-shadow:0 0 0 3px color-mix(in srgb, var(--k-fp) 22%, transparent); }
.ff1-box.dim{ opacity:.35; }
.ff1-box h5{ margin:0 0 3px; font-size:.88rem; }
.ff1-box small{ display:block; color:var(--graphite); font-size:.8rem; }
.ff1-props{ list-style:none; margin:0; padding:0; font-size:.82rem; }
.ff1-props li{ padding:1px 0; }
.ff1-chips{ display:flex; flex-wrap:wrap; gap:5px; margin-top:4px; }
.ff1-chip{ border:1.3px solid var(--line); background:var(--paper); color:var(--ink); border-radius:99px; padding:2px 9px; font-size:.82rem; font-family:inherit; transition:all .35s; }
.ff1-chip.mono{ font-family:var(--mono); }
.ff1-chip.k{ background:color-mix(in srgb, var(--k-fp) 18%, var(--paper)); border-color:var(--k-fp); }
.ff1-chip.k2{ background:color-mix(in srgb, var(--ok) 18%, var(--paper)); border-color:var(--ok); }
.ff1-chip.bad{ border-color:var(--pen); color:var(--pen); }
button.ff1-chip{ cursor:pointer; }
button.ff1-chip[aria-pressed="true"]{ background:var(--s-fp); color:#fff; border-color:var(--s-fp); }
.ff1-call{ display:inline-block; background:var(--pen); color:#fff; border-radius:12px; padding:3px 10px; font-size:.82rem; font-weight:600; margin:4px 0; }
.ff1-xfer{ position:relative; height:34px; margin:2px auto; width:2px; background:var(--graphite); }
.ff1-xfer i{ position:absolute; left:-5px; width:12px; height:12px; border-radius:50%; background:var(--k-fp); animation:ff1bob 1.4s ease-in-out infinite alternate; }
@keyframes ff1bob{ from{ top:0; } to{ top:22px; } }
.ff1-grid2{ display:grid; grid-template-columns:minmax(0,1.35fr) minmax(0,1fr); gap:8px; align-items:start; }
.ff1-shelf{ position:relative; height:132px; border-radius:8px; background:var(--paper); border:1px solid var(--line); overflow:hidden; }
.ff1-book{ position:absolute; width:9%; height:58px; border-radius:3px; transition:left .9s ease, top .9s ease, transform .9s ease; border:1px solid color-mix(in srgb, var(--ink) 25%, transparent); }
.ff1-plank{ position:absolute; left:4%; right:4%; height:5px; border-radius:2px; background:var(--graphite); transition:opacity .6s; }
.ff1-disk{ border:1.6px solid var(--k-fp); border-radius:50% / 14px; padding:16px 8px 10px; background:color-mix(in srgb, var(--k-fp) 8%, var(--paper)); text-align:center; }
.ff1-files{ display:grid; grid-template-columns:1fr 1fr; gap:4px; margin-top:4px; }
.ff1-file{ font-family:var(--mono); font-size:.8rem; border-radius:5px; padding:2px 3px; border:1px solid transparent; transition:all .35s; }
.ff1-file.p1{ background:var(--s-fp); color:#fff; } .ff1-file.p2{ background:var(--ok); color:#fff; }
.ff1-prog{ border:1.4px solid var(--line); border-radius:8px; padding:5px 7px; background:var(--paper); font-size:.82rem; cursor:pointer; text-align:left; font-family:inherit; color:var(--ink); width:100%; transition:all .35s; }
.ff1-prog + .ff1-prog{ margin-top:8px; }
.ff1-prog.p1{ border-color:var(--s-fp); } .ff1-prog.p2{ border-color:var(--ok); }
.ff1-link{ display:block; margin-top:3px; font-family:var(--mono); font-size:.8rem; font-weight:700; }
.ff1-code{ font-family:var(--mono); font-size:.86rem; line-height:1.9; background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; }
.ff1-tok{ border-radius:5px; padding:1px 3px; cursor:pointer; border:0; font:inherit; background:transparent; color:inherit; transition:all .3s; }
.ff1-tok.on{ background:var(--s-fp); color:#fff; }
.ff1-lbl{ text-align:center; font-weight:700; min-height:1.5em; margin:6px 0 2px; color:var(--k-fp); }
.ff1-cells{ display:flex; flex-wrap:wrap; gap:2px; }
.ff1-cell{ min-width:18px; height:24px; padding:0 2px; border-radius:4px; border:1px solid var(--line); background:var(--paper); display:flex; align-items:center; justify-content:center; font-family:var(--mono); font-size:.82rem; transition:all .3s; }
.ff1-cell.got{ background:color-mix(in srgb, var(--k-fp) 22%, var(--paper)); border-color:var(--k-fp); }
.ff1-cell.ptr{ box-shadow:inset 3px 0 0 var(--pen); }
.ff1-cell.new{ background:color-mix(in srgb, var(--ok) 22%, var(--paper)); border-color:var(--ok); }
.ff1-cell.lost{ background:color-mix(in srgb, var(--pen) 18%, var(--paper)); border-color:var(--pen); text-decoration:line-through; }
.ff1-cell.empty{ color:var(--graphite); }
.ff1-h{ font-size:.8rem; color:var(--graphite); margin:6px 0 3px; font-weight:600; }
.ff1-lines{ font-family:var(--mono); font-size:.8rem; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 0; }
.ff1-lines div{ padding:1px 8px; white-space:pre-wrap; overflow-wrap:anywhere; transition:background .3s; }
.ff1-lines div.in{ padding-left:22px; }
.ff1-lines div.on{ background:color-mix(in srgb, var(--k-fp) 22%, var(--paper)); }
.ff1-kv{ display:flex; flex-wrap:wrap; gap:4px 12px; font-size:.84rem; margin-top:4px; }
.ff1-kv b{ font-family:var(--mono); color:var(--k-fp); }
.ff1-out{ font-family:var(--mono); font-size:.8rem; background:var(--ink); color:var(--paper); border-radius:8px; padding:6px 8px; min-height:3.2em; }
.ff1-out div.dup{ color:#ffb4a8; }
.ff1-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 8px; }
.ff1-res{ text-align:center; font-weight:700; margin:6px 0 2px; }
.ff1-res.bad{ color:var(--pen); } .ff1-res.ok{ color:var(--ok); }
.ff1-map{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:3px 8px; font-size:.82rem; align-items:start; }
.ff1-map > span:nth-child(odd){ font-family:var(--mono); font-weight:700; white-space:nowrap; }
.ff1-sw{ display:inline-block; width:10px; height:10px; border-radius:2px; margin-right:4px; vertical-align:-1px; }
.ff1-range{ width:100%; accent-color:var(--k-fp); }
@media (prefers-reduced-motion: reduce){ .ff1-xfer i{ animation:none; top:11px; } .ff1-book{ transition:none; } }`;
  if (!document.getElementById('ff1-css')) { const s = document.createElement('style'); s.id = 'ff1-css'; s.textContent = CSS; document.head.appendChild(s); }
  const L = t => `<span class="ltr">${t}</span>`;
  const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* ── slide 9: computer storage ── */
  function Storage({ ar }) {
    const steps = [
      { en: '<b>Computer storage</b> can be <b>main memory</b> or <b>secondary storage</b> (slide 9).', ar: 'الـ <b>computer storage</b> نوعين: الـ <b>main memory</b> والـ <b>secondary storage</b> (slide 9).', on: -1 },
      { en: '<b>Main memory (RAM)</b>: data is manipulated here. It is <b>fast, small, expensive and volatile</b>.', ar: 'الـ <b>main memory (RAM)</b>: هنا بنشتغل على الـ data. وهي <b>سريعة وصغيرة وغالية و volatile</b>.', on: 0 },
      { en: '<b>Secondary storage</b>: data is stored here, in files such as A.mp3, first.java and mo.flv. It is <b>slow, large, cheap and stable</b>. Examples: disk, tape, CD-ROM.', ar: 'الـ <b>secondary storage</b>: هنا بنخزّن الـ data في files زي A.mp3 و first.java و mo.flv. وهي <b>بطيئة وكبيرة ورخيصة و stable</b>. وأمثلتها الـ disk والـ tape والـ CD-ROM.', on: 1 },
      { en: 'Data is <b>transferred</b> between the two: it is stored on secondary storage and manipulated in main memory.', ar: 'الـ data <b>بتتنقل</b> بين الاتنين: بتتخزن في الـ secondary storage، وبنشتغل عليها في الـ main memory.', on: 2 },
      { en: '"Files will store here": on secondary storage. "Why is file storage so slow?" Because "file storage systems have many moving parts".', ar: 'الـ files بتتخزن في الـ secondary storage. وليه الـ file storage بطيء؟ لأن أنظمة الـ file storage فيها <b>أجزاء كتير بتتحرك (moving parts)</b>.', on: 3 }
    ];
    const [i, ctl] = useSteps(steps.length, 2800), s = steps[i];
    const box = (k, title, sub, props, extra) => html`<div className="ff1-grid2" style=${{ opacity: s.on === -1 || s.on >= 2 || s.on === k ? 1 : .35, transition: 'opacity .45s' }}>
      <div className=${'ff1-box' + (s.on === k || (s.on === 3 && k === 1) ? ' on' : '')}><h5>${title}</h5><small>${sub}</small>${extra}</div>
      <ul className="ff1-props">${props.map(p => html`<li key=${p}>${p}</li>`)}</ul></div>`;
    return html`<figure className="fig ff1"><div className="fig-stage"><div className="ff1-wrap">
      ${box(0, 'Main Memory', 'RAM · data is manipulated here', ['Fast', 'Small', 'Expensive', 'Volatile'], null)}
      <div className="ff1-xfer" style=${{ opacity: s.on >= 2 ? 1 : .3 }}>${s.on >= 2 && !calm() && html`<i></i>`}</div>
      <div style=${{ textAlign: 'center', fontSize: '.8rem', color: 'var(--graphite)', marginBottom: '4px' }}>transfer</div>
      ${box(1, 'Secondary Storage', 'Disk · data is stored here', ['Slow', 'Large', 'Cheap', 'Stable'], html`<div className="ff1-chips">${['A.mp3', 'first.java', 'mo.flv', '…'].map(f => html`<span key=${f} className="ff1-chip mono">${f}</span>`)}</div><small style=${{ marginTop: '4px' }}>Disk, Tape, CD-ROM</small>`)}
      ${s.on === 3 && html`<div style=${{ textAlign: 'center' }}><span className="ff1-call">Files will store here</span><br /><span className="ff1-call">Why is file storage so slow?</span><br /><span className="ff1-call">File storage systems have many moving parts</span></div>`}
    </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 12: unorganized vs organized ── */
  const MESSY = [[8, 52, -38], [18, 60, 24], [30, 48, 70], [40, 62, -12], [52, 50, 48], [62, 58, -64], [72, 54, 15], [82, 62, -28]];
  function FileOrg({ ar }) {
    const steps = [
      { en: '<b>Unorganized</b>: a messy pile (slide 12).', ar: 'الـ <b>unorganized</b>: كومة مكركبة (slide 12).', org: 0 },
      { en: '<b>Organized</b>: the same books arranged on shelves.', ar: 'الـ <b>organized</b>: نفس الكتب مترتبة على الرفوف.', org: 1 },
      { en: '<b>Logical organization methods</b>: heap, indexing, hashing.', ar: 'الـ <b>logical organization methods</b>: الـ heap والـ indexing والـ hashing.', org: 1, m: 1 },
      { en: '<b>Physical organization methods</b>: organizing tracks by sectors or by blocks.', ar: 'الـ <b>physical organization methods</b>: إننا نرتّب الـ tracks بالـ sectors أو بالـ blocks.', org: 1, m: 2 },
      { en: 'File organization methods must provide <b>fast access time</b> and <b>good space utilization</b>.', ar: 'الـ file organization methods لازم توفّر <b>access time سريع</b> و<b>استغلال كويس للمساحة (space utilization)</b>.', org: 1, m: 3 }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i];
    return html`<figure className="fig ff1"><div className="fig-stage"><div className="ff1-wrap">
      <div className="ff1-shelf" role="img" aria-label=${s.org ? 'Books arranged on a shelf: organized' : 'A messy pile of books: unorganized'}>
        <div className="ff1-plank" style=${{ top: '98px', opacity: s.org ? 1 : 0 }}></div>
        ${MESSY.map(([x, y, r], k) => html`<div key=${k} className="ff1-book" style=${{ left: (s.org ? 8 + k * 10.4 : x) + '%', top: (s.org ? 40 : y) + 'px', transform: `rotate(${s.org ? 0 : r}deg)`, background: `color-mix(in srgb, var(--k-fp) ${20 + (k % 4) * 18}%, var(--paper))` }}></div>`)}
        <div style=${{ position: 'absolute', left: '8px', top: '6px', fontWeight: 700, fontSize: '.86rem' }}>${s.org ? 'Organized' : 'Unorganized'}</div>
      </div>
      ${s.m >= 1 && html`<div className="ff1-h">Logical organization</div><div className="ff1-chips">${['heap', 'indexing', 'hashing'].map(t => html`<span key=${t} className="ff1-chip k">${t}</span>`)}</div>`}
      ${s.m >= 2 && html`<div className="ff1-h">Physical organization</div><div className="ff1-chips">${['tracks by sectors', 'tracks by blocks'].map(t => html`<span key=${t} className="ff1-chip k2">${t}</span>`)}</div>`}
      ${s.m >= 3 && html`<div className="ff1-h">Must provide</div><div className="ff1-chips"><span className="ff1-chip">fast access time</span><span className="ff1-chip">good space utilization</span></div>`}
    </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 20: physical file vs logical file ── */
  function LogPhys({ ar }) {
    const steps = [
      { en: 'A <b>hard disk with 6 physical files</b>: A.txt, b.txt, aa.txt, aa.mp3, a.doc, z.mp3 (slide 20).', ar: 'فيه <b>hard disk عليه 6 physical files</b> (slide 20)، وهما:<span class="ltr">A.txt, b.txt, aa.txt, aa.mp3, a.doc, z.mp3</span>', p: 0 },
      { en: 'A C/C++ program deals with the physical file <b>b.txt</b> through the <b>logical name infile</b>.', ar: 'فيه برنامج <bdi dir="ltr">C/C++</bdi> بيتعامل مع الـ physical file اللي اسمه <b>b.txt</b> عن طريق الـ <b>logical name</b> اللي اسمه infile.', p: 1 },
      { en: 'Another program deals with <b>aa.txt</b> through its own logical name <b>infile</b>. The same logical name, a different physical file.', ar: 'وبرنامج تاني بيتعامل مع <b>aa.txt</b> عن طريق الـ logical name بتاعه هو، واسمه برضه <b>infile</b>. نفس الـ logical name، بس physical file مختلف.', p: 2 },
      { en: 'Declaring the logical name (slide 22): in C <code>FILE * outfile;</code> and in C++ an object of the class fstream: <code>fstream outfile;</code>. It is associated with the physical file (e.g. myfile.txt) <b>when the file is opened</b>.', ar: 'تعريف الـ logical name (slide 22) في C بنكتبه كده:' + L('<code>FILE * outfile;</code>') + 'وفي <bdi dir="ltr">C++</bdi> بيبقى object من الـ class اللي اسمها fstream:' + L('<code>fstream outfile;</code>') + 'وبيترتبط بالـ physical file (زي myfile.txt) <b>وقت فتح الـ file</b>.', p: 3 }
    ];
    const [i, ctl] = useSteps(steps.length, 2900), s = steps[i];
    const F = ['A.txt', 'aa.mp3', 'b.txt', 'a.doc', 'aa.txt', 'z.mp3'];
    const on1 = s.p === 1 || s.p === 2 || s.p === 3, on2 = s.p >= 2;
    return html`<figure className="fig ff1"><div className="fig-stage"><div className="ff1-wrap">
      <div className="ff1-grid2" style=${{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)' }}>
        <div>
          <button className=${'ff1-prog' + (on1 ? ' p1' : '')} style=${{ opacity: s.p === 0 ? .4 : 1 }} onClick=${() => ctl.go(1)}>C/C++ program dealing with physical file b.txt${on1 && html`<span className="ff1-link" style=${{ color: 'var(--k-fp)' }}>infile → b.txt</span>`}</button>
          <button className=${'ff1-prog' + (on2 ? ' p2' : '')} style=${{ opacity: on2 ? 1 : .4 }} onClick=${() => ctl.go(2)}>C/C++ program dealing with physical file aa.txt${on2 && html`<span className="ff1-link" style=${{ color: 'var(--ok)' }}>infile → aa.txt</span>`}</button>
        </div>
        <div className="ff1-disk"><b style=${{ fontSize: '.84rem' }}>Hard disk with 6 physical files</b>
          <div className="ff1-files">${F.map(f => html`<span key=${f} className=${'ff1-file' + (f === 'b.txt' && on1 ? ' p1' : f === 'aa.txt' && on2 ? ' p2' : '')}>${f}</span>`)}</div></div>
      </div>
      ${s.p === 3 && html`<div className="ff1-map" style=${{ marginTop: '10px' }}><span>C</span><span><code>FILE * outfile;</code></span><span>C++</span><span><code>fstream outfile;</code></span></div>`}
    </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 23: the parts of fopen ── */
  function FopenParts({ ar }) {
    const steps = [
      { en: '<b>Opening files in C</b> (slide 23): declare the logical name, then open the physical file with a mode.', ar: '<b>فتح الـ files في C</b> (slide 23): بنعرّف الـ logical name، وبعدين بنفتح الـ physical file بـ mode معيّن.', t: -1 },
      { en: '<code>outFile</code> is the <b>logical name</b>.', ar: 'الـ <code>outFile</code> هو الـ <b>logical name</b>.', t: 0, lbl: 'Logical name' },
      { en: '<code>fopen</code> is the <b>method to open the file</b>.', ar: 'الـ <code>fopen</code> هي الـ <b>method اللي بتفتح الـ file</b>.', t: 1, lbl: 'Method to open file' },
      { en: '<code>"A.txt"</code> is the <b>physical file</b>.', ar: 'الـ <code>"A.txt"</code> هو الـ <b>physical file</b>.', t: 2, lbl: 'Physical file' },
      { en: '<code>"w"</code> is <b>the mode</b>. The modes: r (reading), w (writing), a (append), r+ w+ a+, rb wb ab, rb+ wb+ ab+.', ar: 'الـ <code>"w"</code> هو <b>الـ mode</b>. والـ modes هي:' + L('r (reading), w (writing), a (append), r+ w+ a+, rb wb ab, rb+ wb+ ab+'), t: 3, lbl: 'The mode' },
      { en: 'In C++: <code>fstream outfile; outfile.open("myfile.txt", ios::out);</code>. The second argument is an integer mode, set as a bitwise OR ( | ) of constants of the class ios.', ar: 'وفي <bdi dir="ltr">C++</bdi> بنكتب:' + L('<code>fstream outfile; outfile.open("myfile.txt", ios::out);</code>') + 'والـ argument التاني integer بيحدد الـ mode، وقيمته بتتعمل بـ bitwise OR <bdi dir="ltr">(&nbsp;|&nbsp;)</bdi> لـ constants من الـ class اللي اسمها ios.', t: 4 }
    ];
    const [i, ctl] = useSteps(steps.length, 2700), s = steps[i];
    const tok = (k, txt) => html`<button className=${'ff1-tok' + (s.t === k ? ' on' : '')} onClick=${() => ctl.go(k + 1)}>${txt}</button>`;
    return html`<figure className="fig ff1"><div className="fig-stage"><div className="ff1-wrap">
      <div className="ff1-code" style=${{ opacity: s.t === 4 ? .45 : 1 }}>FILE *${tok(0, 'outFile')};<br />${tok(0, 'outFile')} = ${tok(1, 'fopen')}(${tok(2, '"A.txt"')}, ${tok(3, '"w"')});</div>
      <div className="ff1-lbl">${s.lbl || ''}</div>
      ${s.t === 3 && html`<div className="ff1-chips" style=${{ justifyContent: 'center' }}>${['r (reading)', 'w (writing)', 'a (append)', 'r+', 'w+', 'a+', 'rb', 'wb', 'ab', 'rb+', 'wb+', 'ab+'].map(m => html`<span key=${m} className="ff1-chip mono">${m}</span>`)}</div>`}
      ${s.t === 4 && html`<div className="ff1-code" style=${{ marginTop: '6px' }}>fstream outfile;<br />outfile.open("myfile.txt", <b style=${{ color: 'var(--k-fp)' }}>ios::out</b>);</div>`}
    </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── modes: what each C mode does to an example file, with the C++ flags ── */
  const MODES = {
    r: { cpp: 'ios::in', mustExist: 1, read: 1, write: 0, trunc: 0, app: 0, en: 'open an existing file for reading', ar: 'بيفتح file موجود للقراية' },
    w: { cpp: 'ios::out | ios::trunc  (or ios::out)', read: 0, write: 1, trunc: 1, app: 0, en: 'create a new file or truncate an existing one, for output', ar: 'بيعمل file جديد أو بيفضّي الموجود، للـ output' },
    a: { cpp: 'ios::out | ios::app', read: 0, write: 1, trunc: 0, app: 1, en: 'create a new file or append to an existing one, for output', ar: 'بيعمل file جديد أو بيكمّل في آخر الموجود، للـ output' },
    'r+': { cpp: 'ios::out | ios::in', mustExist: 1, read: 1, write: 1, trunc: 0, app: 0, en: 'open an existing file for input and output', ar: 'بيفتح file موجود للـ input والـ output' },
    'w+': { cpp: 'ios::out | ios::in | ios::trunc', read: 1, write: 1, trunc: 1, app: 0, en: 'create a new file or truncate an existing one, for input and output', ar: 'بيعمل file جديد أو بيفضّي الموجود، للـ input والـ output' },
    'a+': { cpp: 'ios::out | ios::in | ios::app', read: 1, write: 1, trunc: 0, app: 1, en: 'create a new file or append to an existing one, for input and output', ar: 'بيعمل file جديد أو بيكمّل في آخر الموجود، للـ input والـ output' }
  };
  function Modes({ ar }) {
    const [m, setM] = useState('a'), [bin, setBin] = useState(false), [exists, setEx] = useState(true), [op, setOp] = useState(null);
    const M = MODES[m], name = m.length > 1 ? m[0] + (bin ? 'b' : '') + '+' : m + (bin ? 'b' : ''), cpp = M.cpp + (bin ? ' | ios::binary' : '');
    const OLD = 'HELLO', fail = M.mustExist && !exists;
    const start = fail ? null : exists && !M.trunc ? OLD : '';
    let cells = [], res = '', resAr = '', bad = false;
    if (fail) { res = `fopen returns NULL: "${name}" needs an existing file, and there is none to open.`; resAr = `الـ fopen بترجّع NULL، لأن الـ mode ده محتاج file موجود ومفيش.`; bad = true; }
    else if (op === 'write') {
      if (!M.write) { res = `Not allowed: "${name}" opens the file for reading only.`; resAr = 'مش مسموح، لأن الـ mode ده بيفتح الـ file للقراية بس.'; bad = true; cells = [...start].map(c => ({ c })); }
      else if (M.app) { cells = [...start].map(c => ({ c })).concat([{ c: 'A', n: 1 }, { c: 'B', n: 1 }]); res = 'AB is added at the end of the file.'; resAr = 'الـ AB اتضافت في آخر الـ file.'; }
      else { const b = [...start]; b[0] = 'A'; b[1] = 'B'; cells = b.map((c, k) => ({ c, n: k < 2 })); res = start.length ? 'AB is written at the beginning (you are positioned at the beginning after opening).' : 'AB is written into the empty file.'; resAr = start.length ? 'الـ AB اتكتبت في الأول، لأن بعد الفتح بنبقى في أول الـ file.' : 'الـ AB اتكتبت في الـ file الفاضي.'; }
    } else if (op === 'read') {
      if (!M.read) { res = `Not allowed: "${name}" opens the file for output only.`; resAr = 'مش مسموح، لأن الـ mode ده بيفتح الـ file للـ output بس.'; bad = true; cells = [...start].map(c => ({ c })); }
      else { cells = [...start].map(c => ({ c, g: 1 })); res = start.length ? `Reading from the beginning gives "${start}".` : 'The file is empty: there is nothing to read.'; resAr = start.length ? `القراية من الأول بتطلّع "${start}".` : 'الـ file فاضي، ومفيش حاجة تتقري.'; }
    } else cells = [...start].map(c => ({ c }));
    const after = fail ? '' : !exists ? 'A new, empty file is created.' : M.trunc ? 'The existing file is truncated to empty.' : 'The existing contents are kept.';
    const afterAr = fail ? '' : !exists ? 'بيتعمل file جديد فاضي.' : M.trunc ? 'الـ file الموجود بيتفضّى.' : 'المحتوى الموجود بيفضل زي ما هو.';
    const en = `<b>"${name}"</b>: ${M.en}${bin ? ', in <b>binary mode</b>' : ''}. In C++: <code>${cpp}</code>. ${after} ${res}`.trim();
    const arT = `الـ mode ده ${M.ar}${bin ? '، وفي <b>binary mode</b>' : ''}. وفي <bdi dir="ltr">C++</bdi> بيبقى:${L('<code>' + cpp + '</code>')}${afterAr} ${resAr}`.trim();
    return html`<figure className="fig ff1"><div className="fig-stage"><div className="ff1-wrap">
      <div className="ff1-row">${Object.keys(MODES).map(k => html`<button key=${k} className="fig-btn" aria-pressed=${String(m === k)} onClick=${() => { setM(k); setOp(null); }}>${k}</button>`)}</div>
      <div className="ff1-row">
        <button className="fig-btn" aria-pressed=${String(bin)} onClick=${() => setBin(b => !b)}>+ b (binary)</button>
        <button className="fig-btn" aria-pressed=${String(exists)} onClick=${() => { setEx(e => !e); setOp(null); }}>${exists ? 'File exists' : 'No file yet'}</button></div>
      <div className="ff1-h">Example file after fopen("data.txt", "${name}")${exists ? ' (it held HELLO)' : ''}</div>
      <div className="ff1-cells" style=${{ minHeight: '26px' }}>${fail ? html`<span className="ff1-chip bad">NULL</span>` : cells.length ? cells.map((x, k) => html`<span key=${k} className=${'ff1-cell' + (x.n ? ' new' : x.g ? ' got' : '') + (k === 0 && !op ? ' ptr' : '')}>${x.c}</span>`) : html`<span className="ff1-cell empty">empty</span>`}</div>
      <div className="ff1-row" style=${{ marginTop: '8px' }}>
        <button className="fig-btn" disabled=${!!fail} aria-pressed=${String(op === 'write')} onClick=${() => setOp('write')}>Write AB</button>
        <button className="fig-btn" disabled=${!!fail} aria-pressed=${String(op === 'read')} onClick=${() => setOp('read')}>Read</button></div>
      ${(op || fail) && html`<div className=${'ff1-res ' + (bad ? 'bad' : 'ok')}>${bad ? 'Not possible' : 'Done'}</div>`}
    </div></div><${Cap} en=${en} ar=${arT} showAr=${ar} /></figure>`;
  }

  /* ── closing: the buffer, close, and abnormal termination ── */
  const DATA = 'FILEDATA!';
  function Buffer({ ar }) {
    const CAP = 4, [n, setN] = useState(0), [disk, setDisk] = useState(''), [state, setState] = useState('open');
    const buf = DATA.slice(disk.length, n), done = state !== 'open';
    const write = () => { const k = n + 1; setN(k); if (k - disk.length === CAP) setDisk(DATA.slice(0, k)); };
    const close = how => { if (how === 'crash') { setState('crash'); } else { setDisk(DATA.slice(0, n)); setState(how); } };
    const reset = () => { setN(0); setDisk(''); setState('open'); };
    let en, arT;
    if (state === 'open') { en = n === 0 ? '<b>Bytes are not sent one by one.</b> Press Write: they are collected in a buffer (here 4 bytes) and sent to the disk as a block when it is full.' : `The buffer holds ${buf.length} of ${CAP} bytes. ${disk.length ? `The disk already has ${disk.length} bytes, sent as ${disk.length / CAP} block${disk.length > CAP ? 's' : ''}.` : 'Nothing has reached the disk yet.'}`; arT = n === 0 ? '<b>الـ bytes مش بتتبعت واحدة واحدة.</b> دوس Write: الـ bytes بتتجمّع في buffer (هنا 4 bytes)، ولما يتملى بيتبعت للـ disk كـ block واحد.' : `الـ buffer فيه ${buf.length} من ${CAP} bytes. ${disk.length ? `والـ disk وصله ${disk.length} bytes، اتبعتوا كـ blocks.` : 'ولسه مفيش حاجة وصلت للـ disk.'}`; }
    else if (state === 'closed') { en = '<b>fclose</b> sends what is left in the buffer to the disk and frees the logical name for another physical file, "like hanging up the telephone after a call".'; arT = 'الـ <b>fclose</b> بتبعت اللي فاضل في الـ buffer للـ disk، وبتفضّي الـ logical name عشان ينفع يتربط بـ physical file تاني، "زي ما بتقفل السكة بعد المكالمة".'; }
    else if (state === 'os') { en = 'You did not close the file, so the <b>OS closes it at the end of the program</b>, and the buffer still reaches the disk.'; arT = 'إنت مقفلتش الـ file، فالـ <b>OS بيقفله لما البرنامج يخلص</b>، والـ buffer برضه بيوصل للـ disk.'; }
    else { en = 'The program <b>terminated abnormally</b> before closing: the bytes still in the buffer never reach the disk, so <b>data is lost</b>.'; arT = 'البرنامج <b>وقف بشكل غير طبيعي</b> قبل ما يقفل الـ file، فالـ bytes اللي لسه في الـ buffer مش هتوصل للـ disk، يعني <b>الـ data ضاعت</b>.'; }
    return html`<figure className="fig ff1"><div className="fig-stage"><div className="ff1-wrap">
      <div className="ff1-h">Program writes</div>
      <div className="ff1-cells">${[...DATA].map((c, k) => html`<span key=${k} className=${'ff1-cell' + (k < n ? ' got' : '')}>${c}</span>`)}</div>
      <div className="ff1-h">Buffer (${CAP} bytes)</div>
      <div className="ff1-cells">${Array.from({ length: CAP }, (_, k) => { const c = buf[k]; return html`<span key=${k} className=${'ff1-cell' + (c ? (state === 'crash' ? ' lost' : ' new') : ' empty')}>${c || '·'}</span>`; })}</div>
      <div className="ff1-h">Disk file</div>
      <div className="ff1-cells" style=${{ minHeight: '26px' }}>${disk ? [...disk].map((c, k) => html`<span key=${k} className="ff1-cell got">${c}</span>`) : html`<span className="ff1-cell empty">empty</span>`}</div>
      <div className="ff1-row" style=${{ marginTop: '10px' }}>
        <button className="fig-btn" disabled=${done || n >= DATA.length} onClick=${write}>Write a byte</button>
        <button className="fig-btn" disabled=${done} onClick=${() => close('closed')}>fclose</button>
        <button className="fig-btn" disabled=${done} onClick=${() => close('os')}>End without closing</button>
        <button className="fig-btn" disabled=${done} onClick=${() => close('crash')}>Crash</button>
        <button className="fig-btn" onClick=${reset}>↻ Start over</button></div>
    </div></div><${Cap} en=${en} ar=${arT} showAr=${ar} /></figure>`;
  }

  /* ── generic Read/Write and the fread/fwrite arguments ── */
  function RwArgs({ ar }) {
    const steps = [
      { en: 'Generic <b>Read(Source_file, Destination_addr, Size)</b>: read <b>Size</b> bytes from the logical file <b>Source_file</b> into memory starting at <b>Destination_addr</b> (slide 29).', ar: 'الـ <b>Read</b> العامة بتاخد 3 arguments:' + L('Read(Source_file, Destination_addr, Size)') + 'يعني بنقرا <b>Size</b> bytes من الـ logical file، ونحطّهم في الـ memory من أول <b>Destination_addr</b> (slide 29).', w: 0, k: -1 },
      { en: 'In C this is <b>fread</b>. Its 4 arguments: (1) the address of the variable, (2) the element size in bytes, (3) the number of elements, (4) the logical file name.', ar: 'وفي C دي اسمها <b>fread</b>، وليها 4 arguments:<br>(1) الـ address بتاع الـ variable<br>(2) حجم الـ element بالـ bytes<br>(3) عدد الـ elements<br>(4) الـ logical file name.', w: 0, k: 4 },
      { en: '<b>&amp;c</b> is the Destination_addr, and <b>infile</b> is the Source_file.', ar: 'الـ <b><bdi dir="ltr">&amp;c</bdi></b> هو الـ Destination_addr، والـ <b>infile</b> هو الـ Source_file.', w: 0, k: 0 },
      { en: 'The element size <b>1</b> times the number of elements <b>1</b> gives the Size: 1 byte, since a char occupies 1 byte.', ar: 'حجم الـ element (<b>1</b>) في عدد الـ elements (<b>1</b>) بيدّينا الـ Size، يعني byte واحد، لأن الـ char بياخد byte واحد.', w: 0, k: 1 },
      { en: 'Generic <b>Write(Destination_file, Source_addr, Size)</b>: write <b>Size</b> bytes from memory at <b>Source_addr</b> to the logical file <b>Destination_file</b> (slide 33). In C it is <b>fwrite</b>.', ar: 'والـ <b>Write</b> العامة:' + L('Write(Destination_file, Source_addr, Size)') + 'يعني بنكتب <b>Size</b> bytes من الـ memory اللي عند <b>Source_addr</b> في الـ logical file (slide 33). وفي C اسمها <b>fwrite</b>.', w: 1, k: -1 },
      { en: '<b>fwrite(a,1,10,outfile)</b> writes 10 elements of 1 byte from the array a. ‡ The slide calls the 1st argument the "destination address"; for fwrite it is really the <b>source</b> address, the memory the data is written from.', ar: 'الـ <b><bdi dir="ltr">fwrite(a,1,10,outfile)</bdi></b> بتكتب 10 elements كل واحد byte من الـ array اللي اسمها a. ‡ الـ slide بتسمّي أول argument "destination address"، بس في الـ fwrite هو في الحقيقة الـ <b>source</b> address، يعني الـ memory اللي بنكتب منها.', w: 1, k: 0 }
    ];
    const [i, ctl] = useSteps(steps.length, 3000), s = steps[i];
    const C = ['var(--k-fp)', 'var(--ok)', 'var(--ok)', 'var(--pen)'];
    const args = s.w ? ['a', '1', '10', 'outfile'] : ['&c', '1', '1', 'infile'];
    const gen = s.w ? [['Destination_file', 3], ['Source_addr', 0], ['Size', 1]] : [['Source_file', 3], ['Destination_addr', 0], ['Size', 1]];
    const lit = j => s.k === 4 || s.k === j || (s.k === 1 && j === 2) || (s.k === 0 && j === 3);
    const gl = j => s.k === -1 || s.k === 4 || (s.k === 0 && (j === 0 || j === 3)) || (s.k === 1 && (j === 1 || j === 2));
    return html`<figure className="fig ff1"><div className="fig-stage"><div className="ff1-wrap">
      <div className="ff1-code">${s.w ? 'Write' : 'Read'}(${gen.map(([g, c], j) => html`<span key=${g}>${j ? ', ' : ''}<span style=${{ color: C[c], fontWeight: 700, opacity: s.k === -1 || s.k === 4 || (s.k === 0 && c !== 1) || (s.k === 1 && c === 1) ? 1 : .4 }}>${g}</span></span>`)})</div>
      <div className="fig-v" style=${{ textAlign: 'center', color: 'var(--graphite)', margin: '4px 0' }}>↓</div>
      <div className="ff1-code">${s.w ? 'fwrite' : 'fread'}(${args.map((a, j) => html`<span key=${j}>${j ? ', ' : ''}<span style=${{ color: C[j], fontWeight: 700, opacity: s.k === -1 ? .4 : gl(j) && lit(j) ? 1 : .4 }}>${a}</span></span>`)});</div>
      <div className="ff1-map" style=${{ marginTop: '8px' }}>${['address of the variable', 'element size in bytes', 'number of elements', 'logical file name'].map((t, j) => html`<span key=${'k' + j} style=${{ color: C[j] }}>(${j + 1})</span><span key=${'v' + j} style=${{ opacity: s.k === -1 ? .5 : 1 }}>${t}</span>`)}</div>
    </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── reading in C and C++ (slides 31, 32, 36), on an example file ── */
  const TXT = 'FILEPROCESSING';
  const CODE = {
    C: ['char c; char a[100];', 'FILE * infile;', 'infile = fopen("myfile.txt","r");', 'fread(&c,1,1,infile);', 'fread(a,1,10,infile);', 'i = fread(&c,1,1,infile);', 'if (i==0) /* file has ended */'],
    'C++': ['char c; char a[100];', 'fstream infile;', 'infile.open("myfile.txt",ios::in);', 'infile >> c;', 'infile.read(a,10);', 'infile >> c;', 'if (infile.fail()) /* file has ended */']
  };
  function readTrace(lang) {
    const cpp = lang === 'C++', st = [];
    st.push({ line: 0, pos: -1, en: 'Declare a character <b>c</b> and an array <b>a</b> of 100 characters.', ar: 'بنعرّف character اسمه <b>c</b>، و array اسمها <b>a</b> فيها 100 character.' });
    st.push({ line: 1, pos: -1, en: cpp ? 'Declare the logical name: an <b>fstream</b> object.' : 'Declare the logical name: a <b>FILE *</b>.', ar: cpp ? 'بنعرّف الـ logical name، وهو object من نوع <b>fstream</b>.' : 'بنعرّف الـ logical name، وهو <b><bdi dir="ltr">FILE&nbsp;*</bdi></b>.' });
    st.push({ line: 2, pos: 0, en: 'Open myfile.txt for reading. After opening you are positioned at the <b>beginning</b> of the file.', ar: 'بنفتح الـ myfile.txt للقراية. وبعد الفتح بنبقى في <b>أول</b> الـ file.' });
    st.push({ line: 3, pos: 1, c: 'F', got: [0, 1], en: cpp ? '<b>infile &gt;&gt; c</b> reads one character. Since c is a char, it is implicit that only 1 byte is transferred.' : '<b>fread(&amp;c,1,1,infile)</b> reads one character: 1 element of 1 byte.', ar: cpp ? 'الـ <b><bdi dir="ltr">infile&nbsp;&gt;&gt;&nbsp;c</bdi></b> بتقرا character واحد. ولأن الـ c نوعه char، فمفهوم ضمنيًا إن byte واحد بس هو اللي بيتنقل.' : 'الـ <b><bdi dir="ltr">fread(&amp;c,1,1,infile)</bdi></b> بتقرا character واحد، يعني element واحد حجمه byte.' });
    st.push({ line: 4, pos: 11, c: 'F', a: TXT.slice(1, 11), got: [1, 11], en: cpp ? '<b>infile.read(a,10)</b> reads 10 bytes into a (read corresponds to fread in C).' : '<b>fread(a,1,10,infile)</b> reads 10 characters into a.', ar: cpp ? 'الـ <b><bdi dir="ltr">infile.read(a,10)</bdi></b> بتقرا 10 bytes في الـ a، والـ read هي اللي بتقابل الـ fread في C.' : 'الـ <b><bdi dir="ltr">fread(a,1,10,infile)</bdi></b> بتقرا 10 characters في الـ a.' });
    for (let p = 11; p <= TXT.length; p++) {
      const ok = p < TXT.length;
      st.push({ line: ok ? 5 : 6, pos: ok ? p + 1 : p, c: ok ? TXT[p] : TXT[TXT.length - 1], a: TXT.slice(1, 11), got: ok ? [p, p + 1] : null, i: cpp ? undefined : ok ? 1 : 0, fail: cpp ? !ok : undefined, end: !ok,
        en: ok ? `Keep reading one character at a time: c = '${TXT[p]}'.${cpp ? '' : ' fread returned 1.'}` : cpp ? 'The attempted read failed: <b>infile.fail()</b> returns true, so the file has ended (or check <b>infile.eof()</b>).' : 'The attempted read got nothing: <b>fread returned 0</b>, so i==0 is true and the file has ended.',
        ar: ok ? `بنكمّل نقرا character واحد كل مرة، والـ c بقت <bdi dir="ltr">'${TXT[p]}'</bdi>.${cpp ? '' : ' والـ fread رجّعت 1.'}` : cpp ? 'محاولة القراية فشلت، فالـ <b><bdi dir="ltr">infile.fail()</bdi></b> بترجّع true، يعني الـ file خلص (أو نشيك على <b><bdi dir="ltr">infile.eof()</bdi></b>).' : 'محاولة القراية مجابتش حاجة، والـ <b>fread رجّعت 0</b>، فالـ <bdi dir="ltr">i==0</bdi> بقت true، يعني الـ file خلص.' });
    }
    return st;
  }
  function ReadSim({ ar }) {
    const [lang, setLang] = useState('C');
    return html`<${ReadSimInner} key=${lang} lang=${lang} setLang=${setLang} ar=${ar} />`;
  }
  function ReadSimInner({ lang, setLang, ar }) {
    const steps = readTrace(lang), [i, ctl] = useSteps(steps.length, 1800), s = steps[i];
    return html`<figure className="fig ff1"><div className="fig-stage"><div className="ff1-wrap">
      <div className="ff1-row">${['C', 'C++'].map(l => html`<button key=${l} className="fig-btn" aria-pressed=${String(lang === l)} onClick=${() => setLang(l)}>${l}</button>`)}</div>
      <div className="ff1-lines">${CODE[lang].map((l, k) => html`<div key=${k} className=${s.line === k ? 'on' : ''}>${l}</div>`)}</div>
      <div className="ff1-h">myfile.txt (example contents)</div>
      <div className="ff1-cells">${[...TXT].map((c, k) => html`<span key=${k} className=${'ff1-cell' + (s.got && k >= s.got[0] && k < s.got[1] ? ' got' : '') + (k === s.pos ? ' ptr' : '')}>${c}</span>`)}<span className=${'ff1-cell empty' + (s.pos === TXT.length ? ' ptr' : '')}>end</span></div>
      <div className="ff1-kv"><span>c = <b>${s.c ? "'" + s.c + "'" : '?'}</b></span><span>a = <b>${s.a ? '"' + s.a + '"' : '?'}</b></span>${lang === 'C' && s.i !== undefined && html`<span>i = <b>${s.i}</b></span>`}${lang === 'C++' && s.fail !== undefined && html`<span>fail() = <b>${String(s.fail)}</b></span>`}</div>
      ${s.end && html`<div className="ff1-res bad">End of file</div>`}
    </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 30: the four ways to read from files in C ── */
  const RM = [
    { k: 'fgetc', short: 'File Get Character', file: 'alphabet.txt', data: 'A', call: 'ch = fgetc(fp);', out: [['ch', "'A'"]], en: '<b>fgetc</b> (File Get Character) reads <b>one character</b> from the file.', ar: 'الـ <b>fgetc</b> (File Get Character) بتقرا <b>character واحد</b> من الـ file.' },
    { k: 'fgets', short: 'File Get String', file: 'std.txt', data: 'file processing', call: 'fgets(string, 80, fp);', out: [['string', '"file processing"']], en: '<b>fgets</b> (File Get String) reads a <b>string</b> from the file (‡ at most 80 − 1 = 79 characters here).', ar: 'الـ <b>fgets</b> (File Get String) بتقرا <b>string</b> من الـ file (‡ هنا 79 character بالكتير، يعني 80 ناقص 1).' },
    { k: 'fscanf', short: 'File Scan Format', file: 'ascii.txt', data: 'A \t65 \t 41', call: 'result = fscanf(my_file, "%c %d %x", ch, num, hex);', out: [['ch', "'A'"], ['num', '65'], ['hex', '0x41']], en: '<b>fscanf</b> (File Scan Format) reads <b>formatted text</b>: here one line written by writeASCII. ‡ As on the slide, ch, num and hex are passed directly; fscanf really needs their addresses (&amp;ch, &amp;num, &amp;hex).', ar: 'الـ <b>fscanf</b> (File Scan Format) بتقرا <b>formatted text</b>، وهنا سطر من اللي الـ writeASCII كتبته. ‡ الـ slide بتدّي الـ ch والـ num والـ hex على طول، بس الـ fscanf في الحقيقة محتاجة الـ addresses بتاعتهم (<bdi dir="ltr">&amp;ch</bdi> و <bdi dir="ltr">&amp;num</bdi> و <bdi dir="ltr">&amp;hex</bdi>).' },
    { k: 'fread', short: 'File Read', file: 'emp.txt', data: '[ name: Ali | sal: 5000 ]', call: 'fread(&emp, sizeof(emp), 1, my_file);', out: [['emp.name', '"Ali"'], ['emp.sal', '5000']], en: '<b>fread</b> (File Read) reads a <b>record</b> (a block): here 1 block of sizeof(emp) bytes.', ar: 'الـ <b>fread</b> (File Read) بتقرا <b>record</b>، يعني block، وهنا block واحد حجمه <bdi dir="ltr">sizeof(emp)&nbsp;bytes</bdi>.' }
  ];
  function ReadMethods({ ar }) {
    const [k, setK] = useState(0), r = RM[k];
    return html`<figure className="fig ff1"><div className="fig-stage"><div className="ff1-wrap">
      <div className="ff1-row">${RM.map((x, j) => html`<button key=${x.k} className="fig-btn" aria-pressed=${String(j === k)} onClick=${() => setK(j)}>${x.k}</button>`)}</div>
      <div className="ff1-box"><small>${r.short} · ${r.file} (example contents)</small><div style=${{ fontFamily: 'var(--mono)', fontWeight: 700, marginTop: '3px', whiteSpace: 'pre-wrap' }}>${r.data}</div></div>
      <div style=${{ textAlign: 'center', color: 'var(--graphite)', margin: '4px 0' }}>↓</div>
      <div className="ff1-code" style=${{ fontSize: '.8rem', lineHeight: 1.5, overflowWrap: 'anywhere' }}>${r.call}</div>
      <div className="ff1-kv" style=${{ justifyContent: 'center', marginTop: '8px' }}>${r.out.map(([a, b]) => html`<span key=${a}>${a} = <b>${b}</b></span>`)}</div>
    </div></div><${Cap} en=${r.en} ar=${r.ar} showAr=${ar} /></figure>`;
  }

  /* ── slides 38-40: the sample program, and the while(!feof) trap ── */
  const EMP = [['Ali', 5000], ['Mona', 6000], ['Omar', 4500]];
  function sampleTrace(safe) {
    const st = [], print = [], add = o => st.push(Object.assign({ out: print.slice() }, o));
    add({ at: -1, line: 0, eof: false, en: 'Open emp.txt (example: 3 employee records) and test that it opened: <code>my_file != NULL</code>.', ar: 'بنفتح الـ emp.txt (مثال فيه 3 employee records)، ونختبر إنه اتفتح، يعني:' + L('<code>my_file != NULL</code>') });
    let emp = null;
    for (let r = 0; r <= EMP.length; r++) {
      const ok = r < EMP.length;
      if (!safe) add({ at: r, line: 1, eof: false, emp, en: `Check <code>!feof(my_file)</code>: true${!ok ? ', because no read has failed yet, even though all 3 records were read' : ''}. Enter the loop.`, ar: `بنشيك على <code>!feof(my_file)</code>، وطلعت true${!ok ? '، لأن ولا قراية فشلت لسه، مع إن الـ 3 records اتقروا' : ''}. فبندخل الـ loop.` });
      if (ok) emp = EMP[r];
      add({ at: ok ? r + 1 : r, line: 2, eof: !ok, ret: ok ? 1 : 0, emp, en: ok ? `<code>fread</code> reads record ${r + 1} and returns 1.` : '<code>fread</code> finds nothing: it returns 0 and the end-of-file flag is set. <b>emp still holds the last record.</b>', ar: ok ? `الـ <code>fread</code> بتقرا الـ record رقم ${r + 1} وبترجّع 1.` : 'الـ <code>fread</code> ملقتش حاجة، فرجّعت 0 واتظبط الـ end-of-file flag. <b>والـ emp لسه فيه آخر record.</b>' });
      if (ok || !safe) { print.push({ t: `${emp[0]} ${emp[1]}`, dup: !ok }); add({ at: ok ? r + 1 : r, line: 3, eof: !ok, emp, en: ok ? `printf prints ${emp[0]}.` : `printf prints ${emp[0]} <b>a second time</b>: the last record is printed twice.`, ar: ok ? `الـ printf بتطبع ${emp[0]}.` : `الـ printf بتطبع ${emp[0]} <b>مرة تانية</b>، يعني آخر record اتطبع مرتين.` }); }
      else add({ at: r, line: 1, eof: true, emp, en: '<code>fread(...) == 1</code> is false, so the loop ends. Each record was printed once.', ar: 'الشرط ده:' + L('<code>fread(...) == 1</code>') + 'بقى false، فالـ loop خلصت. وكل record اتطبع مرة واحدة بس.' });
    }
    if (!safe) add({ at: EMP.length, line: 1, eof: true, emp, en: 'Now <code>!feof(my_file)</code> is false, so the loop ends.', ar: 'دلوقتي الـ <code>!feof(my_file)</code> بقت false، فالـ loop خلصت.' });
    add({ at: EMP.length, line: 4, eof: true, emp, en: '<code>fclose(my_file);</code> closes the logical file.', ar: 'السطر ده بيقفل الـ logical file:' + L('<code>fclose(my_file);</code>') });
    return st;
  }
  function SampleRun({ ar }) {
    const [safe, setSafe] = useState(false);
    return html`<${SampleInner} key=${String(safe)} safe=${safe} setSafe=${setSafe} ar=${ar} />`;
  }
  function SampleInner({ safe, setSafe, ar }) {
    const steps = sampleTrace(safe), [i, ctl] = useSteps(steps.length, 2000), s = steps[i];
    const code = safe ? ['my_file = fopen("c:\\\\emp.txt","rb+");', 'while (fread(&emp,sizeof(emp),1,my_file) == 1)', '  /* the read is the loop test */', '  printf(...);', 'fclose(my_file);'] : ['my_file = fopen("c:\\\\emp.txt","rb+");', 'while (!feof(my_file)) {', '  fread(&emp,sizeof(emp),1,my_file);', '  printf(...); }', 'fclose(my_file);'];
    const line = safe && s.line === 2 ? 1 : s.line;
    return html`<figure className="fig ff1"><div className="fig-stage"><div className="ff1-wrap">
      <div className="ff1-row"><button className="fig-btn" aria-pressed=${String(!safe)} onClick=${() => setSafe(false)}>The slide's loop</button><button className="fig-btn" aria-pressed=${String(safe)} onClick=${() => setSafe(true)}>‡ Safer loop</button></div>
      <div className="ff1-lines">${code.map((l, k) => html`<div key=${k} className=${(line === k ? 'on' : '') + (l.startsWith('  ') ? ' in' : '')}>${l.trim()}</div>`)}</div>
      <div className="ff1-h">emp.txt (example records)</div>
      <div className="ff1-cells">${EMP.map((e, k) => html`<span key=${k} className=${'ff1-cell' + (k < s.at ? ' got' : '') + (k === s.at ? ' ptr' : '')} style=${{ padding: '0 6px' }}>${e[0]} ${e[1]}</span>`)}<span className=${'ff1-cell empty' + (s.at === EMP.length ? ' ptr' : '')}>end</span></div>
      <div className="ff1-kv"><span>feof = <b>${s.eof ? 'true' : 'false'}</b></span>${s.ret !== undefined && html`<span>fread returned <b>${s.ret}</b></span>`}<span>emp = <b>${s.emp ? s.emp[0] : '?'}</b></span></div>
      <div className="ff1-h">Screen</div>
      <div className="ff1-out">${s.out.map((o, k) => html`<div key=${k} className=${o.dup ? 'dup' : ''}>The Emp Name: ${o.t.split(' ')[0]}  Sal: ${o.t.split(' ')[1]}</div>`)}</div>
    </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 49-53: writeASCII / readASCII ── */
  function Ascii({ ar }) {
    const [ch, setCh] = useState(65);
    const show = c => c === 32 ? '(space)' : c === 127 ? '(DEL)' : String.fromCharCode(c);
    const rows = []; for (let c = Math.max(32, ch - 2); c <= Math.min(127, ch + 2); c++) rows.push(c);
    const en = `<b>writeASCII()</b> writes a header line "Letter Decimal Hexadecimal", then one line per character from 32 to 127 with <code>fprintf(my_file, "%c \\t%d \\t %x \\n", ch, ch, ch)</code>. For ${ch} the line is ${esc(show(ch))}, ${ch}, ${ch.toString(16)}. <b>readASCII()</b> reads the header back with fgets and each line with fscanf until it returns EOF.`;
    const arT = `الـ <b><bdi dir="ltr">writeASCII()</bdi></b> بتكتب سطر عناوين فيه Letter و Decimal و Hexadecimal، وبعدين سطر لكل character من 32 لـ 127 بالـ fprintf:${L('<code>fprintf(my_file, "%c \\t%d \\t %x \\n", ch, ch, ch)</code>')}ولما الـ ch بيساوي ${ch}، السطر بيبقى <bdi dir="ltr">${esc(show(ch))}</bdi> و ${ch} و ${ch.toString(16)}. والـ <b><bdi dir="ltr">readASCII()</bdi></b> بتقرا سطر العناوين بالـ fgets، وكل سطر بعده بالـ fscanf لحد ما ترجّع EOF.`;
    return html`<figure className="fig ff1"><div className="fig-stage"><div className="ff1-wrap">
      <label style=${{ display: 'block', textAlign: 'center', fontWeight: 600 }}>ch = <b style=${{ fontFamily: 'var(--mono)', color: 'var(--k-fp)' }}>${ch}</b>
        <input className="ff1-range" type="range" min="32" max="127" value=${ch} onInput=${e => setCh(+e.target.value)} aria-label="Character code" /></label>
      <div className="ff1-h">ascii.txt</div>
      <div className="ff1-lines"><div>Letter   Decimal   Hexadecimal</div>${rows[0] > 32 && html`<div>⋮</div>`}${rows.map(c => html`<div key=${c} className=${c === ch ? 'on' : ''}>${show(c).padEnd(8, ' ')} ${String(c).padEnd(9, ' ')} ${c.toString(16)}</div>`)}${rows[rows.length - 1] < 127 && html`<div>⋮</div>`}</div>
    </div></div><${Cap} en=${en} ar=${arT} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'fp-storage': Storage, 'fp-file-org': FileOrg, 'fp-log-phys': LogPhys, 'fp-fopen-parts': FopenParts, 'fp-modes': Modes,
    'fp-buffer': Buffer, 'fp-rw-args': RwArgs, 'fp-read-sim': ReadSim, 'fp-read-methods': ReadMethods, 'fp-sample-run': SampleRun, 'fp-ascii': Ascii
  });
})();
/* ── part 2 ── */
// File Processing visuals, part 2: L2 Physical file organization (the hard disk). Every label and caption comes from the doctor's slides and the site's notes for that lecture.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.ff2 .fig-dots i.on{ background:var(--k-fp); } .ff2 .fig-btn:hover{ border-color:var(--k-fp); }
.ff2 .fig-btn[aria-pressed="true"]{ background:var(--s-fp); color:#fff; border-color:transparent; }
.ff2-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.ff2-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.ff2-wrap{ max-width:460px; margin:0 auto; color:var(--ink); font-size:.88rem; line-height:1.45; }
.ff2-svg{ display:block; width:100%; max-width:330px; margin:0 auto; }
.ff2-svg text{ fill:var(--ink); font-family:inherit; }
.ff2-in{ display:flex; flex-wrap:wrap; gap:6px 10px; justify-content:center; margin:0 0 10px; font-size:.84rem; }
.ff2-num{ display:flex; flex-direction:column; align-items:flex-start; gap:2px; color:var(--graphite); }
.ff2-num input{ font:inherit; font-family:var(--mono); font-size:.88rem; width:6.4em; padding:4px 6px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); }
.ff2-num input:focus{ outline:2px solid var(--k-fp); outline-offset:1px; }
.ff2-out{ display:flex; flex-direction:column; gap:5px; }
.ff2-line{ border:1.3px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 9px; transition:all .45s ease; }
.ff2-line b.t{ display:block; font-size:.86rem; }
.ff2-line .f{ font-family:var(--mono); font-size:.82rem; color:var(--graphite); overflow-wrap:anywhere; }
.ff2-line .f b{ color:var(--k-fp); }
.ff2-line.on{ border-color:var(--k-fp); box-shadow:0 0 0 3px color-mix(in srgb, var(--k-fp) 22%, transparent); }
.ff2-line.off{ opacity:.35; }
.ff2-line.na .f{ font-family:inherit; font-style:italic; }
.ff2-bins{ display:grid; grid-template-columns:1.6fr 1fr; gap:8px; }
.ff2-bin{ border:1.4px dashed var(--line); border-radius:10px; padding:6px; background:var(--paper); min-height:70px; }
.ff2-bin > b{ display:block; font-size:.82rem; color:var(--k-fp); margin-bottom:4px; }
.ff2-bin .sub{ border:1px solid var(--line); border-radius:8px; padding:4px; margin-top:4px; min-height:34px; background:var(--paper-2); }
.ff2-bin .sub i{ display:block; font-style:normal; font-size:.76rem; color:var(--graphite); }
.ff2-chip{ display:inline-block; border:1.3px solid var(--line); border-radius:99px; padding:3px 10px; font-size:.82rem; background:var(--paper); color:var(--ink); margin:2px; }
.ff2-chip.in{ border-color:var(--k-fp); background:color-mix(in srgb, var(--k-fp) 14%, var(--paper)); animation:ff2pop .45s ease; }
button.ff2-chip{ cursor:pointer; font:inherit; font-size:.82rem; }
button.ff2-chip:hover{ border-color:var(--k-fp); }
@keyframes ff2pop{ from{ transform:scale(.6); opacity:0; } to{ transform:none; opacity:1; } }
.ff2-buf{ display:flex; flex-wrap:wrap; gap:2px; justify-content:center; margin-top:6px; }
.ff2-buf i{ width:14px; height:18px; border:1px solid var(--line); background:color-mix(in srgb, var(--k-fp) 12%, var(--paper)); }
.ff2-buf i.hit{ background:var(--s-fp); border-color:var(--s-fp); }
.ff2-buf-cap{ text-align:center; font-size:.8rem; color:var(--graphite); margin-top:4px; }
.ff2-track{ display:flex; height:40px; border:1.4px solid var(--graphite); border-radius:6px; overflow:hidden; background:var(--paper); }
.ff2-track > div{ display:flex; align-items:center; justify-content:center; font-size:.76rem; font-weight:700; overflow:hidden; white-space:nowrap; transition:flex-grow .5s ease; }
.ff2-rec{ background:color-mix(in srgb, var(--ok) 26%, var(--paper)); color:var(--ink); border-right:1px solid var(--paper); }
.ff2-waste{ background:color-mix(in srgb, var(--pen) 16%, var(--paper)); color:var(--pen); border-right:2px solid var(--graphite); }
.ff2-ov{ background:color-mix(in srgb, var(--graphite) 45%, var(--paper)); color:var(--paper); }
.ff2-gap{ background:repeating-linear-gradient(45deg, var(--paper-2), var(--paper-2) 3px, var(--line) 3px, var(--line) 5px); border-right:1px solid var(--graphite); border-left:1px solid var(--graphite); }
.ff2-left{ background:repeating-linear-gradient(45deg, var(--paper), var(--paper) 3px, color-mix(in srgb, var(--pen) 25%, var(--paper)) 3px, color-mix(in srgb, var(--pen) 25%, var(--paper)) 5px); }
.ff2-sec{ background:color-mix(in srgb, var(--k-fp) 16%, var(--paper)); color:var(--ink); }
.ff2-legend{ display:flex; flex-wrap:wrap; gap:4px 12px; justify-content:center; font-size:.78rem; color:var(--graphite); margin-top:6px; }
.ff2-legend span{ display:inline-flex; align-items:center; gap:4px; }
.ff2-legend i{ display:inline-block; width:12px; height:10px; border-radius:2px; border:1px solid var(--line); }
.ff2-brace{ text-align:center; font-size:.8rem; font-weight:700; color:var(--k-fp); border-top:2px solid var(--k-fp); border-radius:0 0 8px 8px; margin-top:4px; padding-top:2px; }
.ff2-res{ margin-top:8px; border:1.3px solid var(--k-fp); border-radius:9px; background:color-mix(in srgb, var(--k-fp) 8%, var(--paper)); padding:6px 10px; font-size:.86rem; text-align:center; }
.ff2-res b{ color:var(--k-fp); }
.ff2-blk{ display:grid; grid-template-columns:auto auto 1fr auto; border:1.4px solid var(--graphite); border-radius:6px; overflow:hidden; font-size:.78rem; text-align:center; }
.ff2-blk.nokey{ grid-template-columns:auto 1fr auto; }
.ff2-blk > div{ padding:6px 5px; border-right:1px solid var(--graphite); }
.ff2-blk .k{ background:color-mix(in srgb, var(--k-fp) 30%, var(--paper)); font-weight:700; }
.ff2-blk .c{ background:color-mix(in srgb, var(--graphite) 30%, var(--paper)); font-weight:700; }
.ff2-blk .d{ display:flex; gap:2px; padding:3px; background:var(--paper); }
.ff2-blk .d i{ flex:1; font-style:normal; background:color-mix(in srgb, var(--ok) 26%, var(--paper)); border-radius:3px; display:grid; place-items:center; padding:3px 0; font-weight:600; }
.ff2-check{ display:flex; align-items:center; gap:6px; justify-content:center; font-size:.84rem; margin:8px 0 0; }
.ff2-check input{ width:18px; height:18px; accent-color:var(--s-fp); }
.ff2-stack{ display:flex; height:22px; border-radius:6px; overflow:hidden; border:1px solid var(--line); margin-top:8px; }
.ff2-stack > div{ display:flex; align-items:center; justify-content:center; font-size:.76rem; font-weight:700; color:#fff; white-space:nowrap; overflow:hidden; min-width:3px; transition:flex-grow .5s ease; }
.ff2-stack .s1{ background:var(--s-fp); } .ff2-stack .s2{ background:color-mix(in srgb, var(--s-fp) 60%, var(--ink)); } .ff2-stack .s3{ background:var(--ok); }
.ff2-grid{ display:flex; flex-wrap:wrap; gap:2px; justify-content:center; margin-top:6px; }
.ff2-grid i{ width:12px; height:12px; border-radius:2px; background:var(--s-fp); }
.ff2-grid i.part{ background:linear-gradient(90deg, var(--s-fp) 57%, var(--paper-2) 57%); border:1px solid var(--s-fp); }
.ff2-spin{ animation:ff2spin 3s linear infinite; transform-origin:115px 125px; }
@keyframes ff2spin{ to{ transform:rotate(360deg); } }
.ff2-seek{ animation:ff2seek 2.2s ease-in-out infinite alternate; }
@keyframes ff2seek{ from{ transform:translateX(26px); } to{ transform:translateX(0); } }
.ff2-mv{ transition:transform 1.2s ease; }
@media (prefers-reduced-motion: reduce){ .ff2-spin, .ff2-seek, .ff2-chip.in{ animation:none; } .ff2-mv{ transition:none; } }`;
  if (!document.getElementById('ff2-css')) { const s = document.createElement('style'); s.id = 'ff2-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = s => `<span class="ltr">${s}</span>`;
  const fmt = (n, d = 3) => !isFinite(n) ? '–' : (Math.round(n * 10 ** d) / 10 ** d).toLocaleString('en-US', { maximumFractionDigits: d });
  const Modes = ({ list, mode, set }) => html`<div className="ff2-row" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const Num = ({ label, v, set, step }) => html`<label className="ff2-num"><span>${label}</span><input type="number" inputMode="decimal" min="0" step=${step || 1} value=${v} onInput=${e => set(e.target.value === '' ? '' : +e.target.value)} /></label>`;
  const ok = v => v !== '' && v != null && isFinite(v) && v > 0;

  /* ── L2 slides 3-4: DASD vs SASD ── */
  const DEV = [['Hard disk', 'mag'], ['Floppy disk', 'mag'], ['CD-ROM', 'opt', 'Compact Disk – Read Only Memory'], ['CD-R', 'opt', 'Compact Disk – Recordable'], ['CD-RW', 'opt', 'Compact Disk – ReWritable'], ['DVD', 'opt', 'Digital Video Disk'], ['Magnetic tape', 'sasd']];
  function StorageTypes({ ar }) {
    const [put, setPut] = useState([]);
    const last = put.length ? DEV.find(d => d[0] === put[put.length - 1]) : null;
    let cap;
    if (!last) cap = { en: 'Secondary storage has two major types: <b>DASD</b> (Direct Access Storage Devices) and <b>SASD</b> (Serial Access Storage Devices). Tap each device to put it in its group.', ar: 'الـ secondary storage ليه نوعين أساسيين: الـ <b>DASD</b> (Direct Access Storage Devices) والـ <b>SASD</b> (Serial Access Storage Devices). دوس على كل جهاز عشان يروح للمجموعة بتاعته.' };
    else if (put.length === DEV.length) cap = { en: 'Done. Magnetic disks (hard disk, floppy disk) and optical disks (CD-ROM, CD-R, CD-RW, DVD) are <b>DASD</b>; magnetic tape is <b>SASD</b>.', ar: 'كده خلصنا. الـ magnetic disks (الـ hard disk والـ floppy disk) والـ optical disks (الـ CD-ROM والـ CD-R والـ CD-RW والـ DVD) من الـ <b>DASD</b>، والـ magnetic tape من الـ <b>SASD</b>.' };
    else if (last[1] === 'mag') cap = { en: `<b>${last[0]}</b> is a magnetic disk, so it is a <b>DASD</b>.`, ar: `الـ <b>${last[0].toLowerCase()}</b> ده magnetic disk، يعني من الـ <b>DASD</b>.` };
    else if (last[1] === 'opt') cap = { en: `<b>${last[0]}</b> (${last[2]}) is an optical disk, so it is a <b>DASD</b>.`, ar: `الـ <b>${last[0]}</b> ده optical disk، يعني من الـ <b>DASD</b>.${L(last[0] + ' = ' + last[2])}` };
    else cap = { en: '<b>Magnetic tape</b> is the lecture\'s Serial Access Storage Device (<b>SASD</b>).', ar: 'الـ <b>magnetic tape</b> هو الـ Serial Access Storage Device في المحاضرة، يعني من الـ <b>SASD</b>.' };
    const chips = kind => put.filter(n => DEV.find(d => d[0] === n)[1] === kind).map(n => html`<span key=${n} className="ff2-chip in">${n}</span>`);
    return html`<figure className="fig ff2"><div className="fig-stage"><div className="ff2-wrap">
      <div className="ff2-row" aria-label="Devices to sort">${DEV.filter(d => !put.includes(d[0])).map(d => html`<button key=${d[0]} className="ff2-chip" onClick=${() => setPut(p => p.concat(d[0]))}>${d[0]}</button>`)}
        ${put.length === DEV.length && html`<button className="fig-btn" onClick=${() => setPut([])}>↻ Start over</button>`}</div>
      <div className="ff2-bins">
        <div className="ff2-bin"><b>DASD</b>
          <div className="sub"><i>Magnetic disks</i>${chips('mag')}</div>
          <div className="sub"><i>Optical disks</i>${chips('opt')}</div></div>
        <div className="ff2-bin"><b>SASD</b><div className="sub"><i>Serial access</i>${chips('sasd')}</div></div>
      </div></div></div>
      <${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L2 slides 5-20: the disk's components, built up (drawn like slide 20) ── */
  const PL = [62, 132, 202], CX = 115, RX = 98, RY = 24, TR = 48, TRY = 11.5;
  const ring = (cx, y, rx, ry) => `M${cx - rx},${y} a${rx},${ry} 0 1,0 ${2 * rx},0 a${rx},${ry} 0 1,0 ${-2 * rx},0`;
  const PARTS_STEPS = [
    { en: 'We can use <b>disks</b> or <b>HDD</b> to refer to hard disks. The important components are the platters, read/write heads, arm assembly, spindle and arms (drawn like slide 20).', ar: 'ممكن نقول <b>disks</b> أو <b>HDD</b> ونقصد الـ hard disks. والـ components المهمة هي الـ platters والـ <bdi dir="ltr">read/write&nbsp;heads</bdi> والـ arm assembly والـ spindle والـ arms (الرسمة زي slide 20).', on: 'all' },
    { en: '(1) <b>Platters</b>: the circular disks on which magnetic data is stored, on both sides (surfaces). Each platter is divided into concentric rings called <b>tracks</b>, and each track into a number of <b>sectors</b>.', ar: '(1) الـ <b>Platters</b>: الـ disks الدايرية اللي الداتا الـ magnetic بتتخزن عليها، على الوشين (surfaces). وكل platter متقسم لدواير جوه بعض اسمها <b>tracks</b>، وكل track متقسم لعدد من الـ <b>sectors</b>.', on: 'platter' },
    { en: '(2) <b>Read/write heads</b> fly above the platter surface with a clearance as little as <b>3 nanometers</b>. A head moves to the track that contains the data, and each surface has its own head.', ar: '(2) الـ <b><bdi dir="ltr">Read/write&nbsp;heads</bdi></b> بتطير فوق سطح الـ platter بمسافة ممكن توصل لـ <b>3 nanometers</b> بس. والـ head بيروح للـ track اللي فيه الداتا، وكل surface ليه الـ head بتاعه.', on: 'head' },
    { en: '(3) The <b>arm assembly</b> is the internal set that contains the arms, which carry the heads. When the arm assembly stops working, the drive fails.', ar: '(3) الـ <b>arm assembly</b> هو المجموعة اللي جوه الـ disk وفيها الـ arms اللي شايلة الـ heads. ولو الـ arm assembly وقف عن الشغل، الـ drive كله بيبوظ.', on: 'assembly' },
    { en: '(4) The <b>spindle</b> holds the platters in a fixed position and <b>rotates</b> them, bringing the sector under the head.', ar: '(4) الـ <b>spindle</b> بيمسك الـ platters في مكان ثابت و<b>بيلفّها</b>، فيجيب الـ sector تحت الـ head.', on: 'spindle' },
    { en: '(5) The <b>arms</b> carry, guide and move the heads. Moving the arm is called <b>seeking</b>, and it is usually the slowest part.', ar: '(5) الـ <b>arms</b> بتشيل الـ heads وتوجهها وتحركها. وتحريك الـ arm اسمه <b>seeking</b>، وده غالبًا أبطأ جزء.', on: 'arm' },
    { en: 'Slide 20\'s labels: the ring on the top platter is <b>track t</b>, one segment of the ring (middle platter) is <b>sector s</b>, and the same track on all platters, joined by dashed lines, is <b>cylinder c</b>.', ar: 'الـ labels بتاعة slide 20: الحلقة اللي على الـ platter اللي فوق هي <b>track t</b>، وحتة واحدة من الحلقة (على الـ platter اللي في النص) هي <b>sector s</b>، ونفس الـ track على كل الـ platters (الخطوط المتقطعة) هو <b>cylinder c</b>.', on: 'tsc' },
    { en: 'Reading one byte: the OS finds the correct platter, track and sector, reads the <b>entire sector</b> into a <b>buffer</b> (a special area in memory), then finds the requested byte within that buffer.', ar: 'لما نقرا byte واحد: الـ OS بيلاقي الـ platter والـ track والـ sector الصح، ويقرا <b>الـ sector كله</b> في <b>buffer</b> (مكان مخصوص في الـ memory)، وبعدين يلاقي الـ byte المطلوب جوه الـ buffer ده.', on: 'read' }
  ];
  function DiskParts({ ar }) {
    const [i, ctl] = useSteps(PARTS_STEPS.length, 3400);
    const on = PARTS_STEPS[i].on, all = on === 'all';
    const hi = p => all || on === p, K = 'var(--k-fp)';
    const spinning = (on === 'spindle' || on === 'read') && !calm(), seeking = on === 'arm' && !calm();
    const label = (x, y, t, show, anchor) => show && html`<text x=${x} y=${y} fontSize="14" fontWeight="600" textAnchor=${anchor || 'start'} style=${{ fill: K }}>${t}</text>`;
    return html`<figure className="fig ff2"><div className="fig-stage">
      <svg className="ff2-svg" viewBox="0 0 300 262" role="img" aria-label="Hard disk: three platters on a spindle, a read-write head on each, arms fixed to the arm assembly">
        <rect x="112" y="18" width="6" height="234" rx="2" fill=${hi('spindle') ? K : 'var(--graphite)'} />
        ${PL.map((y, k) => html`<g key=${k}>
          <ellipse cx=${CX} cy=${y + 5} rx=${RX} ry=${RY} fill="color-mix(in srgb, var(--graphite) 45%, var(--paper))" />
          <ellipse cx=${CX} cy=${y} rx=${RX} ry=${RY} fill=${hi('platter') ? 'color-mix(in srgb, var(--k-fp) 30%, var(--paper))' : 'color-mix(in srgb, var(--graphite) 22%, var(--paper))'} stroke=${hi('platter') ? K : 'var(--graphite)'} strokeWidth=${hi('platter') ? 2 : 1} />
          <path d=${ring(CX, y, TR, TRY)} fill="none" stroke=${on === 'tsc' && k === 0 ? K : 'var(--graphite)'} strokeWidth=${on === 'tsc' && k === 0 ? 4 : 3} strokeDasharray="7 2" />
          <ellipse cx=${CX} cy=${y} rx="10" ry="3" fill="var(--paper)" />
          ${on === 'tsc' && k === 1 && html`<ellipse cx=${CX} cy=${y + TRY} rx="9" ry="3.5" fill="var(--pen)" />`}
          ${spinning && k === 0 && html`<circle r="4.5" fill="var(--pen)"><animateMotion dur="2.4s" repeatCount="indefinite" path=${ring(CX, y, TR, TRY)} /></circle>`}
        </g>`)}
        ${on === 'tsc' && html`<g stroke=${K} strokeWidth="1.5" strokeDasharray="4 3"><path d=${`M${CX - TR} ${PL[0]} V${PL[2]}`} /><path d=${`M${CX + TR} ${PL[0]} V${PL[2]}`} /></g>`}
        <g className=${seeking ? 'ff2-seek' : ''}>
          ${PL.map((y, k) => html`<g key=${k}>
            <rect x=${CX + TR + 6} y=${y - 7} width="94" height="5" fill=${hi('arm') ? K : 'var(--graphite)'} />
            <rect x=${CX + TR - 2} y=${y - 10} width="12" height="8" rx="1" fill=${hi('head') ? 'var(--pen)' : 'var(--ink)'} />
          </g>`)}
        </g>
        <rect x="256" y="34" width="18" height="182" rx="2" fill=${hi('assembly') ? K : 'color-mix(in srgb, var(--graphite) 60%, var(--paper))'} stroke="var(--graphite)" />
        ${label(124, 14, 'spindle', on === 'spindle')}
        ${label(4, 108, 'platter', on === 'platter')}
        ${label(296, 236, 'arm assembly', on === 'assembly', 'end')}
        ${label(296, 236, 'arm', on === 'arm', 'end')}
        ${label(296, 236, 'read/write head', on === 'head', 'end')}
        ${label(4, 42, 'track t', on === 'tsc')}
        ${label(4, 168, 'sector s', on === 'tsc')}
        ${label(4, 252, 'cylinder c', on === 'tsc')}
        ${spinning && html`<path d="M70 240 a45 10 0 0 0 90 0" fill="none" stroke=${K} strokeWidth="2" markerEnd="url(#ff2-dp-a)" />`}
        <defs><marker id="ff2-dp-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill=${K} /></marker></defs>
      </svg>
      ${on === 'read' && html`<div className="ff2-wrap"><div className="ff2-buf" aria-label="Buffer holding the whole sector, one byte highlighted">${Array.from({ length: 16 }, (_, k) => html`<i key=${k} className=${k === 9 ? 'hit' : ''}></i>`)}</div>
        <p className="ff2-buf-cap">buffer in memory = the whole sector; the requested byte is found inside it</p></div>`}
      </div><${Cap} ...${PARTS_STEPS[i]} showAr=${ar} /><${Bar} steps=${PARTS_STEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 9-14: track, sector, cluster, cylinder (slide 12's A, B, C, D) ── */
  const C0 = 130, R0 = 34, RW = 8.8, NT = 10, NS = 16;
  const pt = (r, a) => [C0 + r * Math.cos(a), C0 + r * Math.sin(a)];
  const annulus = (r1, r2, a1, a2) => { const [x1, y1] = pt(r2, a1), [x2, y2] = pt(r2, a2), [x3, y3] = pt(r1, a2), [x4, y4] = pt(r1, a1), big = a2 - a1 > Math.PI ? 1 : 0;
    return `M${x1},${y1} A${r2},${r2} 0 ${big} 1 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 ${big} 0 ${x4},${y4} Z`; };
  const PP = {
    A: { en: '<b>A: Track</b>: one of the concentric rings a platter is divided into. There are thousands of tracks on each platter (slide 10\'s example has 1000 tracks).', ar: 'حرف <b>A</b> هو الـ <b>track</b>: حلقة من الدواير اللي الـ platter متقسم ليها جوه بعض. وفيه آلاف الـ tracks في كل platter (مثال slide 10 فيه 1000 track).' },
    B: { en: '<b>B: Geometrical sector</b>: a pie-shaped wedge across all tracks.', ar: 'حرف <b>B</b> هو الـ <b>geometrical sector</b>: شريحة زي حتة الكيكة معدية على كل الـ tracks.' },
    C: { en: '<b>C: Track sector</b>: the part of the wedge on one track. A sector is the smallest addressable portion of a disk, usually <b>512 bytes</b>.', ar: 'حرف <b>C</b> هو الـ <b>track sector</b>: جزء الشريحة اللي على track واحد. والـ sector هو أصغر جزء ليه address في الـ disk، وغالبًا حجمه <b><bdi dir="ltr">512&nbsp;bytes</bdi></b>.' },
    D: { en: '<b>D: Cluster</b>: a fixed number of contiguous sectors on one track, the way the OS file manager sees a file. Slide 11: a cluster of 3 sectors = 3 × 512 = <b>1536 bytes</b>.', ar: 'حرف <b>D</b> هو الـ <b>cluster</b>: عدد ثابت من الـ sectors اللي ورا بعض على نفس الـ track، وده اللي الـ OS file manager شايف بيه الـ file. ومثال slide 11 هو cluster فيه 3 sectors:' + L('3 × 512 = 1536 bytes') },
    Cyl: { en: '<b>Cylinder</b>: the set of tracks directly above and below each other (slide 13). All data on one cylinder can be read without moving the arm, and the number of cylinders = the number of tracks per surface.', ar: 'الـ <b>cylinder</b> هو مجموعة الـ tracks اللي فوق وتحت بعض بالظبط (slide 13). وكل الداتا اللي على cylinder واحد تتقري من غير ما الـ arm يتحرك، وعدد الـ cylinders هو عدد الـ tracks في كل surface.' }
  };
  function PlatterParts({ ar }) {
    const [m, setM] = useState('A');
    const r = k => R0 + k * RW, a = k => -Math.PI / 2 + k * 2 * Math.PI / NS, TK = 6;
    const top = html`<svg className="ff2-svg" viewBox="0 0 260 260" role="img" aria-label=${'Platter surface with concentric tracks, highlighting ' + m}>
      <circle cx=${C0} cy=${C0} r=${r(NT)} fill="color-mix(in srgb, var(--graphite) 14%, var(--paper))" stroke="var(--graphite)" />
      ${Array.from({ length: NT + 1 }, (_, k) => html`<circle key=${'t' + k} cx=${C0} cy=${C0} r=${r(k)} fill="none" stroke="var(--graphite)" strokeWidth="0.8" />`)}
      ${Array.from({ length: NS }, (_, k) => { const [x1, y1] = pt(r(0), a(k)), [x2, y2] = pt(r(NT), a(k)); return html`<line key=${'s' + k} x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="var(--graphite)" strokeWidth="0.8" />`; })}
      ${m === 'A' && html`<circle cx=${C0} cy=${C0} r=${r(TK) - RW / 2} fill="none" stroke="var(--pen)" strokeWidth=${RW - 1} opacity=".75" />`}
      ${(m === 'B' || m === 'C') && html`<path d=${annulus(r(0), r(NT), a(1), a(2))} fill="color-mix(in srgb, var(--k-fp) 55%, transparent)" stroke="var(--k-fp)" />`}
      ${m === 'C' && html`<path d=${annulus(r(TK - 1), r(TK), a(1), a(2))} fill="var(--s-fp)" stroke="var(--ink)" strokeWidth="1.5" />`}
      ${m === 'D' && html`<path d=${annulus(r(TK + 1), r(TK + 2), a(8), a(11))} fill="var(--ok)" stroke="var(--ink)" strokeWidth="1.2" />`}
      <circle cx=${C0} cy=${C0} r=${R0} fill="var(--paper-2)" stroke="var(--graphite)" />
      <text x=${C0} y=${C0 + 6} textAnchor="middle" fontSize="18" fontWeight="700" style=${{ fill: 'var(--k-fp)' }}>${m === 'Cyl' ? '' : m}</text>
    </svg>`;
    const stack = html`<svg className="ff2-svg" viewBox="0 0 260 230" role="img" aria-label="Four platters with the same track highlighted on each: a cylinder">
      <rect x="127" y="12" width="6" height="208" fill="var(--graphite)" />
      ${[40, 90, 140, 190].map((y, k) => html`<g key=${k}>
        <ellipse cx="130" cy=${y + 4} rx="110" ry="24" fill="color-mix(in srgb, var(--graphite) 45%, var(--paper))" />
        <ellipse cx="130" cy=${y} rx="110" ry="24" fill="color-mix(in srgb, var(--graphite) 20%, var(--paper))" stroke="var(--graphite)" />
        <ellipse cx="130" cy=${y} rx="70" ry="15" fill="none" stroke="var(--s-fp)" strokeWidth="6" opacity=".85" />
        <ellipse cx="130" cy=${y} rx="12" ry="3" fill="var(--paper)" /></g>`)}
      <g stroke="var(--k-fp)" strokeWidth="1.5" strokeDasharray="4 3"><path d="M60 40 V190" /><path d="M200 40 V190" /></g>
      <text x="252" y="226" textAnchor="end" fontSize="16" fontWeight="700" style=${{ fill: 'var(--k-fp)' }}>Cylinder</text>
    </svg>`;
    return html`<figure className="fig ff2"><div className="fig-stage">
      <${Modes} list=${[['A', 'A: Track'], ['B', 'B: Geometrical sector'], ['C', 'C: Track sector'], ['D', 'D: Cluster'], ['Cyl', 'Cylinder']]} mode=${m} set=${setM} />
      ${m === 'Cyl' ? stack : top}</div>
      <${Cap} ...${PP[m]} showAr=${ar} /></figure>`;
  }

  /* ── L2 capacity formulas, with the slides' examples ── */
  const CAP_EX = {
    s10: { v: { bps: 512, spc: '', spt: 33, tps: 1000, h: '' }, en: 'Slide 10: a platter has 1000 tracks, each with 33 sectors, so track capacity = 33 × 512 = <b>16,896 bytes</b>. The number of tracks does not change the track capacity.', ar: 'في مثال الـ slide رقم 10، الـ platter فيه 1000 track، وكل track فيه 33 sector، يبقى الـ track capacity هي:' + L('33 × 512 = 16,896 bytes') + 'وعدد الـ tracks مالوش دعوة بالـ track capacity.' },
    s11: { v: { bps: 512, spc: 3, spt: '', tps: '', h: '' }, en: 'Slide 11: sector size = 512 bytes and cluster size = 3 sectors, so the cluster size = 3 × 512 = <b>1536 bytes</b>.', ar: 'مثال slide 11: الـ sector حجمه <bdi dir="ltr">512&nbsp;bytes</bdi> والـ cluster فيه 3 sectors، يبقى حجم الـ cluster هو:' + L('3 × 512 = 1536 bytes') },
    wp: { v: { bps: 512, spc: 4, spt: 60, tps: 5000, h: 14 }, en: 'The worked problem (slides 22–26): track = <b>30,720 B</b>, cylinder = <b>430,080 B</b>, drive = <b>2,150,400,000 B</b>, and cylinder height 14 gives <b>7 platters</b>.', ar: 'المسألة المحلولة (slides 22–26): الـ track حجمه <b><bdi dir="ltr">30,720&nbsp;B</bdi></b>، والـ cylinder حجمه <b><bdi dir="ltr">430,080&nbsp;B</bdi></b>، والـ drive حجمه <b><bdi dir="ltr">2,150,400,000&nbsp;B</bdi></b>، والـ cylinder height بـ 14 معناه <b>7 platters</b>.' },
    q2: { v: { bps: 512, spc: '', spt: 25, tps: 800, h: 20 }, en: 'Quiz (2) part (b): 20 surfaces × 800 tracks × 25 sectors × 512 B = <b>204,800,000 B</b>.', ar: 'الـ Quiz (2) جزء (b): الـ capacity هي:' + L('20 × 800 × 25 × 512 = 204,800,000 B') },
    own: { en: 'Change any value: each capacity is computed with the lecture\'s formulas, and a row needs all of its inputs.', ar: 'غيّر أي قيمة، وكل capacity بتتحسب بالـ formulas بتاعة المحاضرة. وكل سطر محتاج كل المدخلات بتاعته.' }
  };
  function Capacity({ ar }) {
    const [ex, setEx] = useState('wp'), [v, setV] = useState(CAP_EX.wp.v);
    const pick = k => { setEx(k); if (CAP_EX[k].v) setV(CAP_EX[k].v); };
    const upd = key => x => { setEx('own'); setV(o => Object.assign({}, o, { [key]: x })); };
    const { bps, spc, spt, tps, h } = v, track = spt * bps, cyl = h * track;
    const row = (t, need, f, key) => html`<div key=${key} className=${'ff2-line' + (need ? '' : ' na')}><b className="t">${t}</b><div className="f">${need ? html`<span dangerouslySetInnerHTML=${{ __html: f }}></span>` : 'needs ' + key}</div></div>`;
    return html`<figure className="fig ff2"><div className="fig-stage"><div className="ff2-wrap">
      <${Modes} list=${[['s10', 'Slide 10'], ['s11', 'Slide 11'], ['wp', 'Worked problem'], ['q2', 'Quiz (2)']]} mode=${ex} set=${pick} />
      <div className="ff2-in">
        <${Num} label="bytes / sector" v=${bps} set=${upd('bps')} />
        <${Num} label="sectors / cluster" v=${spc} set=${upd('spc')} />
        <${Num} label="sectors / track" v=${spt} set=${upd('spt')} />
        <${Num} label="tracks / surface" v=${tps} set=${upd('tps')} />
        <${Num} label="cylinder height" v=${h} set=${upd('h')} />
      </div>
      <div className="ff2-out">
        ${row('Sector', ok(bps), `${fmt(bps)} B`, 'bytes per sector')}
        ${row('Cluster', ok(bps) && ok(spc), `${spc} × ${fmt(bps)} = <b>${fmt(spc * bps)} B</b>`, 'sectors per cluster')}
        ${row('Track', ok(bps) && ok(spt), `${spt} × ${fmt(bps)} = <b>${fmt(track)} B</b>`, 'sectors per track')}
        ${row('Cylinder', ok(bps) && ok(spt) && ok(h), `${h} × ${fmt(track)} = <b>${fmt(cyl)} B</b>`, 'cylinder height')}
        ${row('Drive (cylinders = tracks per surface)', ok(bps) && ok(spt) && ok(h) && ok(tps), `${fmt(tps)} × ${fmt(cyl)} = <b>${fmt(tps * cyl)} B</b>`, 'tracks per surface')}
        ${row('Platters (surfaces = cylinder height)', ok(h), `${h} / 2 = <b>${fmt(h / 2, 1)}</b>`, 'cylinder height')}
      </div></div></div>
      <${Cap} en=${CAP_EX[ex].en} ar=${CAP_EX[ex].ar} showAr=${ar} /></figure>`;
  }

  /* ── L2 slides 22-26: the worked problem, step by step ── */
  const WP = { bps: 512, spt: 60, h: 14, tps: 5000, spc: 4 };
  function WorkedProblem({ ar }) {
    const [nr, setNr] = useState(90000), [rs, setRs] = useState(256);
    const STEPS = 8, [i, ctl] = useSteps(STEPS, 3000);
    const track = WP.spt * WP.bps, cyl = WP.h * track, file = nr * rs, valid = ok(nr) && ok(rs);
    const cyls = file / cyl, ex = nr === 90000 && rs === 256;
    const lines = [
      ['Given', `${fmt(nr)} records of ${fmt(rs)} B; 512 B/sector; 60 sectors/track; cylinder height 14; 5000 tracks/surface; 4 sectors/cluster`],
      ['Platters and sides', `14 / 2 = <b>7</b> platters; <b>14</b> sides`],
      ['Track size and cylinders', `60 × 512 = <b>30,720 B</b>; cylinders = <b>5000</b>`],
      ['Cylinder size', `14 × 30,720 = <b>430,080 B</b>; sectors/cylinder = 430,080 / 512 = <b>840</b>`],
      ['File size', `${fmt(nr)} × ${fmt(rs)} = <b>${fmt(file)} B</b>`],
      ['Records per sector, track, cylinder', `512 / ${fmt(rs)} = <b>${fmt(512 / rs, 2)}</b>; 30,720 / ${fmt(rs)} = <b>${fmt(track / rs, 2)}</b>; 430,080 / ${fmt(rs)} = <b>${fmt(cyl / rs, 2)}</b>`],
      ['Space for the file', `sectors = ${fmt(file)} / 512 = <b>${fmt(file / 512, 2)}</b>; tracks = ${fmt(file)} / 30,720 = <b>${fmt(file / track, 2)}</b>; cylinders = ${fmt(file)} / 430,080 = <b>${fmt(cyls, 2)}</b>`],
      ['Drive capacity', `5000 × 430,080 = <b>2,150,400,000 B</b>`]
    ];
    const caps = [
      { en: ex ? 'The worked problem from slides 22–26. The disk values are fixed; you can change the number of records and the record size, then step through.' : 'Your own file on the slides\' disk: step through to see where it fits.', ar: ex ? 'المسألة المحلولة من slides 22–26. قيم الـ disk ثابتة، وتقدر تغيّر عدد الـ records وحجم الـ record وبعدين تمشي خطوة خطوة.' : 'ده file من عندك على نفس الـ disk بتاع السلايدز: امشي خطوة خطوة عشان تشوف هياخد قد إيه.' },
      { en: 'The cylinder height is the number of surfaces (sides), and each platter has two: 14 / 2 = 7 platters.', ar: 'الـ cylinder height هو عدد الـ surfaces (الأوجه)، وكل platter ليه وشين، يبقى عدد الـ platters هو:' + L('14 / 2 = 7') },
      { en: 'Track capacity = sectors per track × bytes per sector. The number of cylinders = tracks per surface = 5000.', ar: 'الـ track capacity بتساوي عدد الـ sectors في الـ track مضروب في الـ bytes في الـ sector. وعدد الـ cylinders هو عدد الـ tracks في كل surface، يعني 5000.' },
      { en: 'Cylinder capacity = tracks per cylinder × track capacity.', ar: 'الـ cylinder capacity بتساوي عدد الـ tracks في الـ cylinder مضروب في الـ track capacity.' },
      { en: 'File size = number of records × record size.', ar: 'حجم الـ file بيساوي عدد الـ records مضروب في حجم الـ record.' },
      { en: 'How many records fit in each unit: unit size / record size.', ar: 'عدد الـ records اللي تدخل في كل وحدة بيساوي حجم الوحدة على حجم الـ record.' },
      { en: ex ? 'The file needs 45,000 sectors, 750 tracks and 53.57 cylinders (‡ so 54 whole cylinders). Each square is one cylinder.' : 'Each square below is one cylinder of the file (the last one may be partly used).', ar: ex ? 'الـ file محتاج 45,000 sector و 750 track و 53.57 cylinder (‡ يعني 54 cylinder كاملين). وكل مربع هو cylinder واحد.' : 'كل مربع تحت هو cylinder واحد من الـ file (وآخر واحد ممكن يبقى مستخدم جزء منه بس).' },
      { en: 'Drive capacity = number of cylinders × cylinder capacity.', ar: 'الـ capacity بتاعة الـ drive بتساوي عدد الـ cylinders مضروب في الـ cylinder capacity.' }
    ];
    const n = Math.ceil(cyls), frac = cyls - Math.floor(cyls);
    return html`<figure className="fig ff2"><div className="fig-stage"><div className="ff2-wrap">
      <div className="ff2-in">
        <${Num} label="number of records" v=${nr} set=${x => { setNr(x); ctl.go(0); }} />
        <${Num} label="record size (B)" v=${rs} set=${x => { setRs(x); ctl.go(0); }} />
        ${!ex && html`<button className="fig-btn" onClick=${() => { setNr(90000); setRs(256); ctl.go(0); }}>Example from the slides</button>`}
      </div>
      ${valid ? html`<div className="ff2-out">${lines.map(([t, f], k) => html`<div key=${k} className=${'ff2-line' + (k === i ? ' on' : k > i ? ' off' : '')}><b className="t">${t}</b><div className="f" dangerouslySetInnerHTML=${{ __html: f }}></div></div>`)}</div>
        ${i >= 6 && (n <= 120 ? html`<div className="ff2-grid" aria-label=${fmt(cyls, 2) + ' cylinders'}>${Array.from({ length: n }, (_, k) => html`<i key=${k} className=${k === n - 1 && frac > 0 ? 'part' : ''}></i>`)}</div>` : html`<p className="ff2-res">${fmt(cyls, 2)} cylinders: too many squares to draw</p>`)}`
        : html`<p className="ff2-res">Enter a number of records and a record size.</p>`}
      </div></div>
      <${Cap} ...${caps[i]} showAr=${ar} /><${Bar} steps=${lines} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 27-30: organizing a track by sectors or by blocks ── */
  function SectorsBlocks({ ar }) {
    const [m, setM] = useState('sec'), [rs, setRs] = useState(300), [bf, setBf] = useState(3), [key, setKey] = useState(true);
    const r = Math.min(Math.max(+rs || 0, 0), 512), w = 512 - r;
    const caps = {
      sec: { en: `<b>By sectors</b> (used by the OS): records do not fit exactly in a sector, so space is lost inside it: <b>fragmentation</b>. With a 512 B sector and a ${r} B record, ${w} B of each sector is wasted. Some OSs let the system administrator use clusters.`, ar: `<b>بالـ sectors</b> (بيستخدمها الـ OS): الـ records مش بتيجي مظبوطة على الـ sector، فبتضيع مساحة جواه، وده اسمه <b>fragmentation</b>. ولو الـ sector بـ <bdi dir="ltr">512&nbsp;B</bdi> والـ record بـ <bdi dir="ltr">${r}&nbsp;B</bdi>، بيضيع <bdi dir="ltr">${w}&nbsp;B</bdi> من كل sector. وبعض الـ OSs بتسمح للـ system administrator إنه يستخدم clusters.` },
      blk: { en: `<b>By blocks</b> (used by the DBMS): a user-defined block holds an integral number of records, here a blocking factor of <b>${bf}</b>. No internal fragmentation and no record spans two blocks. Each block has sub-blocks: <b>count</b> (bytes in the block), <b>key</b> (optional: the last record's key, so the controller can search without loading the block) and <b>data</b>, then a gap. Sub-blocks and gaps mean more non-data overhead.`, ar: `<b>بالـ blocks</b> (بيستخدمها الـ DBMS): الـ block اللي الـ user بيحدده فيه عدد صحيح من الـ records، وهنا الـ blocking factor بـ <b>${bf}</b>. ومفيش internal fragmentation ومفيش record بيتقسم على 2 blocks. وكل block معاه sub-blocks: الـ <b>count</b> (عدد الـ bytes في الـ block)، والـ <b>key</b> (اختياري، وفيه key آخر record عشان الـ controller يدوّر من غير ما يحمّل الـ block)، والـ <b>data</b>، وبعدهم gap. والـ sub-blocks والـ gaps معناها non-data overhead أكتر.` },
      page: { en: 'Slide 30, <b>pages and blocks</b>: one track is a row of sectors separated by gaps, and here <b>1 page/block = 4 sectors</b>.', ar: 'في slide 30، الـ <b>pages والـ blocks</b>: الـ track الواحد عبارة عن صف sectors بينهم gaps، وهنا الـ page أو الـ block الواحد بيساوي 4 sectors.' }
    };
    return html`<figure className="fig ff2"><div className="fig-stage"><div className="ff2-wrap">
      <${Modes} list=${[['sec', 'By sectors'], ['blk', 'By blocks'], ['page', 'Page = 4 sectors']]} mode=${m} set=${setM} />
      ${m === 'sec' && html`<div>
        <div className="ff2-in"><${Num} label="record size (B)" v=${rs} set=${setRs} /></div>
        <div className="ff2-track" role="img" aria-label=${'Two 512 byte sectors, each holding one ' + r + ' byte record and ' + w + ' wasted bytes'}>
          ${[1, 2].map(k => html`<${React.Fragment} key=${k}><div className="ff2-rec" style=${{ flexGrow: r }}>${r >= 200 ? 'record' : ''}</div><div className="ff2-waste" style=${{ flexGrow: w }}>${w >= 170 ? w + ' B' : ''}</div></${React.Fragment}>`)}
        </div>
        <div className="ff2-legend"><span><i className="ff2-rec"></i>record</span><span><i className="ff2-waste"></i>fragmentation</span><span>each box = one 512 B sector</span></div></div>`}
      ${m === 'blk' && html`<div>
        <div className="ff2-in"><${Num} label="blocking factor" v=${bf} set=${x => setBf(Math.max(1, Math.min(8, Math.round(+x) || 1)))} /></div>
        <div className=${'ff2-blk' + (key ? '' : ' nokey')} role="img" aria-label="One block: key sub-block, count sub-block, data sub-block, then a gap">
          ${key && html`<div className="k">key</div>`}<div className="c">count</div>
          <div className="d">${Array.from({ length: bf }, (_, k) => html`<i key=${k}>R${k + 1}</i>`)}</div><div className="ff2-gap">gap</div></div>
        <label className="ff2-check"><input type="checkbox" checked=${key} onChange=${e => setKey(e.target.checked)} />key sub-block (optional)</label></div>`}
      ${m === 'page' && html`<div>
        <div className="ff2-track" role="img" aria-label="One track: sector 1, gap, sector 2, gap, sector 3, gap, sector 4, gap">
          ${[1, 2, 3, 4].map(k => html`<${React.Fragment} key=${k}><div className="ff2-sec" style=${{ flexGrow: 5 }}>${k}</div><div className="ff2-gap" style=${{ flexGrow: 2 }}></div></${React.Fragment}>`)}
          <div style=${{ flexGrow: 2 }}>…</div></div>
        <div className="ff2-brace" style=${{ marginRight: '7%' }}>1 page/block = 4 sectors</div>
        <div className="ff2-legend"><span><i className="ff2-sec"></i>sector</span><span><i className="ff2-gap"></i>gap</span><span>one track</span></div></div>`}
      </div></div><${Cap} ...${caps[m]} showAr=${ar} /></figure>`;
  }

  /* ── L2 slides 32-34: records per track with non-data overhead ── */
  function RecordsPerTrack({ ar }) {
    const [bf, setBf] = useState(10), [tr, setTr] = useState(20000), [ov, setOv] = useState(300), [rs, setRs] = useState(100);
    const valid = ok(bf) && ok(tr) && ok(rs) && ov !== '' && ov >= 0;
    const data = bf * rs, blk = data + (+ov || 0), n = valid ? Math.floor(tr / blk) : 0, left = valid ? tr - n * blk : 0, recs = n * bf;
    const ex = tr === 20000 && ov === 300 && rs === 100 && (bf === 10 || bf === 60);
    const setEx = b => { setBf(b); setTr(20000); setOv(300); setRs(100); };
    const cap = valid ? {
      en: `Data sub-block = ${bf} × ${rs} = ${fmt(data)} B, so block = ${fmt(data)} + ${ov} = ${fmt(blk)} B. Only whole blocks fit: ⌊${fmt(tr)} / ${fmt(blk)}⌋ = ⌊${fmt(tr / blk, 2)}⌋ = <b>${n}</b> blocks, so <b>${fmt(recs)} records per track</b>${ex ? (bf === 10 ? ' (the slides\' answer (a))' : ' (the slides\' answer (b))') : ''}.`,
      ar: `الـ data sub-block حجمه:` + L(`${bf} × ${rs} = ${fmt(data)} B`) + `والـ block حجمه:` + L(`${fmt(data)} + ${ov} = ${fmt(blk)} B`) + `والـ blocks الكاملة بس هي اللي بتدخل:` + L(`⌊${fmt(tr)} / ${fmt(blk)}⌋ = ⌊${fmt(tr / blk, 2)}⌋ = ${n} blocks`) + `يعني <b>${fmt(recs)} record</b> في الـ track${ex ? ' (دي إجابة السلايدز)' : ''}.`
    } : { en: 'Enter positive values.', ar: 'دخّل قيم موجبة.' };
    const segs = valid && n <= 60;
    return html`<figure className="fig ff2"><div className="fig-stage"><div className="ff2-wrap">
      <${Modes} list=${[[10, '(a) BF = 10'], [60, '(b) BF = 60']]} mode=${ex ? bf : null} set=${setEx} />
      <div className="ff2-in">
        <${Num} label="blocking factor" v=${bf} set=${setBf} />
        <${Num} label="track size (B)" v=${tr} set=${setTr} />
        <${Num} label="overhead / block" v=${ov} set=${setOv} />
        <${Num} label="record size (B)" v=${rs} set=${setRs} />
      </div>
      ${segs ? html`<div className="ff2-track" role="img" aria-label=${n + ' blocks of ' + blk + ' bytes on a ' + tr + ' byte track, ' + left + ' bytes left over'}>
          ${Array.from({ length: n }, (_, k) => html`<${React.Fragment} key=${k}><div className="ff2-ov" style=${{ flexGrow: +ov || 0.001 }}></div><div className="ff2-rec" style=${{ flexGrow: data }}>${n <= 4 ? 'block ' + (k + 1) : ''}</div></${React.Fragment}>`)}
          ${left > 0 && html`<div className="ff2-left" style=${{ flexGrow: left }}></div>`}
        </div>
        <div className="ff2-legend"><span><i className="ff2-ov"></i>overhead (${ov} B)</span><span><i className="ff2-rec"></i>data (${fmt(data)} B)</span><span><i className="ff2-left"></i>unused (${fmt(left)} B)</span></div>`
        : valid && html`<p className="ff2-res">${n} blocks: too many to draw</p>`}
      ${valid && html`<p className="ff2-res"><b>${fmt(recs)}</b> records per track</p>`}
      </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L2 slide 35: the three components of a disk access ── */
  const ACC = [
    { en: 'The time to access a sector in a track on a surface is divided into <b>3 components</b>: seek time, rotational delay and transfer time (slide 35). The head starts away from the track we want.', ar: 'الوقت اللي بناخده عشان نوصل لـ sector في track على surface بيتقسم لـ <b>3 أجزاء</b>: الـ seek time والـ rotational delay والـ transfer time (slide 35). والـ head بيبدأ بعيد عن الـ track اللي عايزينه.', k: 0 },
    { en: '<b>Seek time</b>: the time to move the arm to the correct cylinder, the largest cost. Typically 5 ms track-to-track, 50 ms maximum and 30 ms average.', ar: 'الـ <b>Seek time</b>: الوقت اللي الـ arm محتاجه عشان يروح للـ cylinder الصح، وده أكبر تكلفة. وعادةً بياخد <bdi dir="ltr">5&nbsp;ms</bdi> من track للي جنبه، و <bdi dir="ltr">50&nbsp;ms</bdi> أقصى حاجة، و <bdi dir="ltr">30&nbsp;ms</bdi> في المتوسط.', k: 1 },
    { en: '<b>Rotational delay (latency)</b>: the time for the disk to rotate so the sector we want is under the read/write head. Minimum 0, maximum one revolution, average half a revolution.', ar: 'الـ <b>Rotational delay (latency)</b>: الوقت اللي الـ disk محتاجه عشان يلف لحد ما الـ sector اللي عايزينه ييجي تحت الـ <bdi dir="ltr">read/write&nbsp;head</bdi>. وأقل قيمة صفر، وأكبر قيمة لفة كاملة، والمتوسط نص لفة.', k: 2 },
    { en: '<b>Transfer time</b>: the time for the head to pass over the block. For one sector it is the revolution time / sectors per track.', ar: 'الـ <b>Transfer time</b>: الوقت اللي الـ head بياخده وهو بيعدي على الـ block. ولـ sector واحد بيساوي وقت اللفة على عدد الـ sectors في الـ track.', k: 3 },
    { en: 'Average total time = seek time + rotational delay + transfer time.', ar: 'متوسط الوقت الكلي بيساوي الـ seek time + الـ rotational delay + الـ transfer time.', k: 4 }
  ];
  function AccessSteps({ ar }) {
    const [i, ctl] = useSteps(ACC.length, 3200);
    const k = ACC[i].k, Cc = 150, R = [96, 84, 72, 60, 48], TT = 2;
    const headX = Cc - (k >= 1 ? R[TT] - 6 : R[0] - 6);
    const rot = k >= 3 ? 205 : k >= 2 ? 180 : 0;
    const sa = -25 * Math.PI / 180, sb = -5 * Math.PI / 180, r1 = R[TT] - 12, r2 = R[TT];
    const P = (r, a) => [Cc + r * Math.cos(a), Cc + r * Math.sin(a)];
    const [x1, y1] = P(r2, sa), [x2, y2] = P(r2, sb), [x3, y3] = P(r1, sb), [x4, y4] = P(r1, sa);
    const tag = (n, t) => html`<span key=${n} className=${'ff2-chip' + (k === n || k === 4 ? ' in' : '')}>${t}</span>`;
    return html`<figure className="fig ff2"><div className="fig-stage">
      <svg className="ff2-svg" viewBox="0 0 300 300" role="img" aria-label="Top view of a disk: the arm seeks to a track, the disk rotates the sector to the head, then the sector passes under it">
        <g className=${calm() ? '' : 'ff2-mv'} style=${{ transform: `rotate(${rot}deg)`, transformOrigin: `${Cc}px ${Cc}px` }}>
          <circle cx=${Cc} cy=${Cc} r=${R[0] + 12} fill="color-mix(in srgb, var(--graphite) 16%, var(--paper))" stroke="var(--graphite)" />
          ${R.map((r, n) => html`<circle key=${n} cx=${Cc} cy=${Cc} r=${r - 6} fill="none" stroke=${n === TT ? 'var(--k-fp)' : 'var(--graphite)'} strokeWidth=${n === TT ? 2 : 0.8} />`)}
          <path d=${`M${x1},${y1} A${r2},${r2} 0 0 1 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 0 0 ${x4},${y4} Z`} fill=${k === 3 ? 'var(--ok)' : 'var(--pen)'} />
          <circle cx=${Cc} cy=${Cc} r="20" fill="var(--paper-2)" stroke="var(--graphite)" />
        </g>
        <g className=${calm() ? '' : 'ff2-mv'} style=${{ transform: `translateX(${headX - 54}px)` }}>
          <rect x="-40" y=${Cc - 6} width="88" height="10" fill=${k === 1 ? 'var(--k-fp)' : 'var(--graphite)'} />
          <rect x="44" y=${Cc - 9} width="12" height="16" rx="2" fill="var(--ink)" />
        </g>
        <text x="150" y="292" textAnchor="middle" fontSize="15" fontWeight="600" style=${{ fill: 'var(--k-fp)' }}>${['', 'seek', 'rotational latency', 'transfer', 'seek + latency + transfer'][k]}</text>
      </svg>
      <div className="ff2-row">${tag(1, 'Seek time')}${tag(2, 'Rotational latency')}${tag(3, 'Transmission time')}</div>
      </div><${Cap} ...${ACC[i]} showAr=${ar} /><${Bar} steps=${ACC} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slides 40-42: average time to read one sector (Examples 1 and 2) ── */
  const AEX = {
    e1: { v: { seek: 8, rpm: 10000, spt: 170, lat: 3 }, en: 'Example 1: average seek 8 ms, average rotational delay 3 ms, 10,000 rpm, 170 sectors/track. Transfer = 6/170 ms ≈ 0.035 ms, so the total = 8 + 3 + 0.035 = <b>11.035 ms</b>.', ar: 'مثال 1: الـ average seek بـ <bdi dir="ltr">8&nbsp;ms</bdi>، والـ average rotational delay بـ <bdi dir="ltr">3&nbsp;ms</bdi>، والسرعة 10,000 rpm، وفيه 170 sector في الـ track. والـ transfer هو:' + L('6/170 ms ≈ 0.035 ms') + 'يبقى الـ total هو:' + L('8 + 3 + 0.035 = 11.035 ms') },
    e2: { v: { seek: 8.5, rpm: 7200, spt: 170, lat: 4.16 }, en: 'Example 2 (Seagate ST3200822A): average seek 8.5 ms, average latency 4.16 ms, 7200 rpm, 170 sectors/track. Transfer = 6/122,400 ≈ 0.05 ms, so the total = 8.5 + 4.16 + 0.05 = <b>12.71 ms</b>.', ar: 'مثال 2 (الـ Seagate ST3200822A): الـ average seek بـ <bdi dir="ltr">8.5&nbsp;ms</bdi>، والـ average latency بـ <bdi dir="ltr">4.16&nbsp;ms</bdi>، والسرعة 7200 rpm، وفيه 170 sector في الـ track. والـ transfer هو:' + L('6/122,400 ≈ 0.05 ms') + 'يبقى الـ total هو:' + L('8.5 + 4.16 + 0.05 = 12.71 ms') },
    own: { en: 'Your own disk. Leave "given latency" empty to use half a revolution: ½ × (60 × 1000)/RPM ms.', ar: 'ده disk من عندك. سيب الـ "given latency" فاضية عشان نستخدم نص لفة:' + L('½ × (60 × 1000)/RPM ms') }
  };
  function AccessTime({ ar }) {
    const [ex, setEx] = useState('e1'), [v, setV] = useState(AEX.e1.v);
    const pick = k => { setEx(k); if (AEX[k].v) setV(AEX[k].v); };
    const upd = key => x => { setEx('own'); setV(o => Object.assign({}, o, { [key]: x })); };
    const { seek, rpm, spt, lat } = v, valid = ok(rpm) && ok(spt) && seek !== '' && seek >= 0;
    const rev = 60000 / rpm, L2 = ok(lat) ? +lat : rev / 2, tr = rev / spt, tot = (+seek || 0) + L2 + tr;
    return html`<figure className="fig ff2"><div className="fig-stage"><div className="ff2-wrap">
      <${Modes} list=${[['e1', 'Example 1'], ['e2', 'Example 2']]} mode=${ex} set=${pick} />
      <div className="ff2-in">
        <${Num} label="average seek (ms)" v=${seek} set=${upd('seek')} step="0.1" />
        <${Num} label="spindle speed (rpm)" v=${rpm} set=${upd('rpm')} />
        <${Num} label="sectors / track" v=${spt} set=${upd('spt')} />
        <${Num} label="given latency (ms)" v=${lat} set=${upd('lat')} step="0.01" />
      </div>
      ${valid ? html`<div className="ff2-out">
        <div className="ff2-line"><b className="t">Revolution time</b><div className="f">60 × 1000 / ${fmt(rpm)} = <b>${fmt(rev, 3)} ms</b></div></div>
        <div className="ff2-line"><b className="t">Rotational delay (average)</b><div className="f">${ok(lat) ? html`given: <b>${fmt(L2, 3)} ms</b>` : html`½ × ${fmt(rev, 3)} = <b>${fmt(L2, 3)} ms</b>`}</div></div>
        <div className="ff2-line"><b className="t">Transfer time (one sector)</b><div className="f">${fmt(rev, 3)} / ${spt} = <b>${fmt(tr, 3)} ms</b></div></div>
        <div className="ff2-line on"><b className="t">Total = seek + rotational delay + transfer</b><div className="f">${fmt(+seek, 3)} + ${fmt(L2, 3)} + ${fmt(tr, 3)} = <b>${fmt(tot, 3)} ms</b></div></div>
      </div>
      <div className="ff2-stack" role="img" aria-label="Share of the total time: seek, rotational delay, transfer">
        <div className="s1" style=${{ flexGrow: +seek || 0 }}>seek</div><div className="s2" style=${{ flexGrow: L2 }}>latency</div><div className="s3" style=${{ flexGrow: Math.max(tr, tot * 0.012) }}></div></div>
      <div className="ff2-legend"><span><i style=${{ background: 'var(--ok)' }}></i>transfer (too small to see)</span></div>`
        : html`<p className="ff2-res">Enter the seek time, the spindle speed and the sectors per track.</p>`}
      </div></div><${Cap} en=${AEX[ex].en} ar=${AEX[ex].ar} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'fp-storage-types': StorageTypes, 'fp-disk-parts': DiskParts, 'fp-platter-parts': PlatterParts, 'fp-capacity': Capacity, 'fp-worked-problem': WorkedProblem, 'fp-sectors-blocks': SectorsBlocks, 'fp-records-track': RecordsPerTrack, 'fp-access-steps': AccessSteps, 'fp-access-time': AccessTime });
})();
/* ── part 3 ── */
// File Processing visuals, part 3: L3 fields and records (file of records, stream files, the 4 field structures, record structures, sequential vs direct access, fseek/seekg, the Quiz (3) copy and update programs). Every label and caption comes from the site's notes for L3.
(function () {
  const { useState, useEffect } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.ff3 .fig-btn.solid{ background:var(--s-fp); color:#fff; border-color:transparent; }
.ff3 .fig-btn[aria-pressed="true"]{ background:var(--s-fp); color:#fff; border-color:transparent; }
.ff3 .fig-btn:disabled{ opacity:.45; cursor:default; }
.ff3-wrap{ max-width:440px; margin:0 auto; color:var(--ink); font-size:.86rem; line-height:1.35; }
.ff3-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.ff3-cells{ display:flex; flex-wrap:wrap; gap:2px; justify-content:flex-start; direction:ltr; }
.ff3-c{ width:15px; height:23px; display:inline-flex; align-items:center; justify-content:center; font:700 .8rem var(--mono); border-radius:3px; border:1px solid var(--line); background:var(--paper); color:var(--ink); transition:background .35s, border-color .35s, color .35s, opacity .35s; }
.ff3-c.sp{ color:var(--faint); font-weight:400; }
.ff3-c.pad{ background:repeating-linear-gradient(135deg, var(--paper) 0 3px, color-mix(in srgb, var(--pen) 22%, var(--paper)) 3px 5px); border-color:color-mix(in srgb, var(--pen) 45%, var(--line)); }
.ff3-c.len{ background:color-mix(in srgb, var(--k-fp) 22%, var(--paper)); border-color:var(--k-fp); }
.ff3-c.key{ background:color-mix(in srgb, var(--graphite) 22%, var(--paper)); border-color:var(--graphite); }
.ff3-c.del{ background:color-mix(in srgb, var(--k-fp) 40%, var(--paper)); border-color:var(--k-fp); }
.ff3-c.on{ background:var(--s-fp); border-color:var(--s-fp); color:#fff; }
.ff3-c.chk{ outline:2px solid var(--pen); outline-offset:-2px; }
.ff3-c.ptr{ background:var(--pen); border-color:var(--pen); color:#fff; }
.ff3-c.put{ box-shadow:inset 0 -4px 0 var(--k-fp); }
.ff3-c.dim{ opacity:.35; }
.ff3-rec{ border:1px dashed var(--line); border-radius:8px; padding:5px; margin:0 0 6px; transition:border-color .35s, background .35s; }
.ff3-rec.on{ border-color:var(--k-fp); border-style:solid; background:color-mix(in srgb, var(--k-fp) 8%, var(--paper)); }
.ff3-rec h5{ margin:0 0 4px; font-size:.8rem; color:var(--graphite); font-weight:700; }
.ff3-kv{ display:flex; flex-wrap:wrap; gap:6px 14px; justify-content:center; font-weight:700; margin:8px 0 2px; }
.ff3-kv b{ font-family:var(--mono); color:var(--k-fp); font-size:1rem; }
.ff3-key{ display:flex; flex-wrap:wrap; gap:6px 12px; justify-content:center; font-size:.8rem; color:var(--graphite); margin-top:8px; }
.ff3-key .ff3-c{ width:13px; height:13px; vertical-align:-2px; margin-right:4px; }
.ff3-in{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:5px 8px; align-items:center; margin:0 0 10px; }
.ff3-in label{ font-weight:700; font-size:.82rem; }
.ff3-in input, .ff3-in select{ font:700 .9rem var(--mono); width:100%; box-sizing:border-box; padding:4px 7px; border:1.4px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); }
.ff3-in input:not([type=number]){ text-transform:uppercase; }
.ff3-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:8px 0 0; }
.ff3-box{ border:1.4px solid var(--line); background:var(--paper); border-radius:8px; padding:5px 8px; text-align:center; font-weight:600; transition:all .4s; }
.ff3-box small{ display:block; font-weight:400; font-size:.8rem; color:var(--graphite); }
.ff3-box.on{ background:var(--s-fp); border-color:var(--s-fp); color:#fff; } .ff3-box.on small{ color:rgba(255,255,255,.92); }
.ff3-box.seen{ background:color-mix(in srgb, var(--k-fp) 14%, var(--paper)); border-color:var(--k-fp); }
.ff3-box.dim{ opacity:.35; }
.ff3-v{ text-align:center; color:var(--graphite); line-height:1; margin:3px 0; }
.ff3-grid{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:5px; }
.ff3-code{ font:600 .8rem/1.45 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; white-space:pre-wrap; word-break:break-all; direction:ltr; text-align:left; }
.ff3-code span{ display:block; border-radius:4px; padding:0 3px; transition:background .3s, color .3s; }
.ff3-code span.on{ background:var(--s-fp); color:#fff; }
.ff3-code span.dim{ opacity:.45; }
.ff3-buf{ display:flex; gap:6px; align-items:center; margin:6px 0; }
.ff3-buf > b{ font-size:.8rem; min-width:62px; color:var(--graphite); }
.ff3-note{ text-align:center; font-weight:700; min-height:1.4em; margin:6px 0 0; }
@media (prefers-reduced-motion: reduce){ .ff3-c, .ff3-rec, .ff3-box{ transition:none; } }`;
  if (!document.getElementById('ff3-css')) { const s = document.createElement('style'); s.id = 'ff3-css'; s.textContent = CSS; document.head.appendChild(s); }
  const L = t => `<span class="ltr">${t}</span>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const Modes = ({ list, mode, set }) => html`<div className="ff3-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  // one byte per cell; spaces shown as a faint dot, padding as a hatched empty cell
  const Cell = ({ ch, cls, k }) => html`<span key=${k} className=${'ff3-c' + (ch === ' ' ? ' sp' : '') + (cls ? ' ' + cls : '')}>${ch === ' ' ? '·' : ch}</span>`;
  const boxCls = (on, seen, dim) => 'ff3-box' + (on ? ' on' : seen ? ' seen' : '') + (dim ? ' dim' : '');

  /* ── §1 the logical view: a file is records, a record is fields ── */
  const BOOK = [['ISBN', 5, '87359'], ['AU', 7, 'CARROLL'], ['TI', 25, 'ALICE IN WONDERLAND']];
  function FileRecords({ ar }) {
    const steps = [
      { en: 'The <b>logical view</b>: data in a file is a <b>collection of records</b>.', ar: 'الـ <b>logical view</b>: الداتا اللي في الـ file عبارة عن <b>مجموعة records</b>.' },
      { en: 'A <b>record</b> is a group of fields forming a logical unit. Here one record holds a book from the notes\' examples.', ar: 'الـ <b>record</b> هو مجموعة fields بتكوّن وحدة logical واحدة. هنا الـ record فيه كتاب من أمثلة الـ notes.' },
      { en: 'A <b>field</b> is a data value, the smallest unit of data with logical meaning. Fields have <b>names</b>, types, <b>lengths</b> and <b>values</b>: ISBN (5), AU (7) and TI (25) as in the notes\' fixed-length example.', ar: 'الـ <b>field</b> هو قيمة داتا، وهو أصغر وحدة داتا ليها معنى logical. الـ fields ليها <b>أسماء</b> وأنواع و<b>أطوال</b> و<b>قيم</b>: الـ ISBN (5) والـ AU (7) والـ TI (25) زي مثال الـ fixed length في الـ notes.' },
      { en: 'There are <b>three file structures</b>: stream, field and record structures. The next diagrams show each one.', ar: 'فيه <b>3 file structures</b>: الـ stream والـ field والـ record structures. الرسومات اللي جاية بتوضح كل واحد فيهم.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    return html`<figure className="fig ff3"><div className="fig-stage"><div className="ff3-wrap">
      <div className=${boxCls(i === 0, i > 0, false)}>File<small>a collection of records</small></div>
      <div className="ff3-v">↓</div>
      <div className="ff3-grid" style=${{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>${['Record 0', 'Record 1', 'Record 2'].map((r, k) => html`<div key=${k} className=${boxCls(i === 1 && k === 0, i >= 1 && k === 0, i < 1 || k > 0)}>${r}</div>`)}</div>
      <div className="ff3-v" style=${{ opacity: i >= 2 ? 1 : .3 }}>↓ fields of record 0</div>
      <div className="ff3-grid" style=${{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>${BOOK.map(([n, l, v], k) => html`<div key=${n} className=${boxCls(i === 2, i > 2, i < 2)}>${n}<small>length ${l}</small><small style=${{ fontFamily: 'var(--mono)', wordBreak: 'break-word' }}>${v}</small></div>`)}</div>
      <div className="ff3-row">${['Stream', 'Field', 'Record'].map(t => html`<span key=${t} className=${boxCls(i === 3, false, i < 3)} style=${{ padding: '3px 10px' }}>${t} structure</span>`)}</div>
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §2 stream files: bytes with no added information ── */
  const STREAM = 'AmesMary123 MapleStillwaterOK74075MasonAlan90 EastgateAdaOK74820';
  function StreamFile({ ar }) {
    const steps = [
      { en: 'A <b>stream file</b>: information is written as a stream of bytes. This is the notes\' example, ' + STREAM.length + ' bytes in a row.', ar: 'الـ <b>stream file</b>: المعلومات بتتكتب كـ stream من الـ bytes. ده مثال الـ notes، وفيه ' + STREAM.length + ' byte ورا بعض.' },
      { en: 'The bytes contain <b>no added information</b>: nothing marks where a field or a record starts or ends.', ar: 'الـ bytes دي <b>مفيهاش أي معلومات زيادة</b>: مفيش حاجة بتحدد الـ field أو الـ record بيبدأ ويخلص فين.' },
      { en: '<b>Problem</b>: there is no way to get the information back in the organized record format. Field structures solve this by adding information.', ar: '<b>المشكلة</b>: مفيش أي طريقة نرجّع بيها المعلومات بشكل الـ record المنظم. والـ field structures بتحل ده بإنها بتضيف معلومات.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    return html`<figure className="fig ff3"><div className="fig-stage"><div className="ff3-wrap">
      <div className="ff3-cells" aria-label=${'Stream file: ' + STREAM}>${STREAM.split('').map((c, k) => html`<${Cell} key=${k} k=${k} ch=${c} cls=${i === 0 ? 'on' : ''} />`)}</div>
      <div className="ff3-note" style=${{ color: i === 2 ? 'var(--pen)' : 'var(--ink)' }}>${i === 0 ? 'one stream of bytes' : i === 1 ? 'where does each field end?' : '? ? ?  records cannot be recovered'}</div>
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §3 and §4: the 4 field structures, read field by field ── */
  const FS = [['fixed', 'Fixed length'], ['len', 'Length indicator'], ['kw', 'keyword=value'], ['del', 'Delimiter']];
  // cells for one record in each structure: [{ch, kind, f}] kind: data | pad | len | key | del
  function layout(m, vals) {
    const out = [], push = (s, kind, f) => s.split('').forEach(ch => out.push({ ch, kind, f }));
    BOOK.forEach(([name, len], f) => {
      const v = vals[f];
      if (m === 'fixed') { push(v.slice(0, len), 'data', f); for (let k = v.length; k < len; k++) out.push({ ch: '', kind: 'pad', f }); }
      if (m === 'len') { push(String(v.length).padStart(2, '0'), 'len', f); push(v, 'data', f); }
      if (m === 'kw') { if (f) out.push({ ch: ' ', kind: 'key', f }); push(name + '=', 'key', f); push(v, 'data', f); }
      if (m === 'del') { push(v, 'data', f); push('|', 'del', f); }
    });
    return out;
  }
  const FS_TXT = {
    fixed: { en: 'Each field has a <b>fixed length</b> (5, 7, 25). <b>Advantage</b>: easy to read and store, the reader just counts bytes. <b>Disadvantage</b>: wastes space with <b>padding</b> (hatched cells).', ar: 'كل field ليه <b>طول ثابت</b> (5 و 7 و 25). <b>الميزة</b>: سهل في القراية والتخزين، لأن الـ reader بيعد الـ bytes بس. <b>العيب</b>: بيضيع مساحة في الـ <b>padding</b> (الخانات المتشرطة).' },
    len: { en: 'A <b>length indicator</b> at the start of each field (05, 07, 19). <b>Advantage</b>: easy to jump ahead to the end of the field. <b>Disadvantage</b>: long fields need more than 1 byte to store the length.', ar: 'فيه <b>length indicator</b> في أول كل field (05 و 07 و 19). <b>الميزة</b>: سهل تنط لآخر الـ field على طول. <b>العيب</b>: الـ fields الطويلة محتاجة أكتر من byte واحد عشان تخزن الطول.' },
    kw: { en: 'Each field is written as <b>keyword=value</b>. <b>Advantage</b>: fields are self-describing, and missing fields are allowed. <b>Disadvantage</b>: wastes space with keywords.', ar: 'كل field بيتكتب على شكل <b><bdi dir="ltr">keyword=value</bdi></b>. <b>الميزة</b>: الـ fields بتوصف نفسها، ومسموح إن fields تبقى ناقصة. <b>العيب</b>: الـ keywords بتضيع مساحة.' },
    del: { en: 'A <b>delimiter</b> (|) at the end of each field. <b>Advantage</b>: may waste less space than length-based fields. <b>Disadvantage</b>: the reader must check every byte against the delimiter.', ar: 'فيه <b>delimiter</b> <bdi dir="ltr">(|)</bdi> في آخر كل field. <b>الميزة</b>: ممكن يضيع مساحة أقل من الـ fields اللي بالطول. <b>العيب</b>: الـ reader لازم يشيك كل byte ويقارنه بالـ delimiter.' }
  };
  function FieldStructs({ ar }) {
    const EX = ['87359', 'CARROLL', 'ALICE IN WONDERLAND'];
    const [m, setM] = useState('fixed');
    const [vals, setVals] = useState(EX);
    const [rd, setRd] = useState(-1);          // field the reader has reached (-1 none)
    const [scan, setScan] = useState(0);       // delimiter mode: bytes compared so far
    const isEx = vals.every((v, k) => v === EX[k]);
    // the notes' fixed-length example uses ISBN 87358; the other three use 87359
    const shown = m === 'fixed' && isEx ? ['87358', EX[1], EX[2]] : vals;
    const cells = layout(m, shown);
    const total = cells.length, pad = cells.filter(c => c.kind === 'pad').length, lenB = cells.filter(c => c.kind === 'len').length, keyB = cells.filter(c => c.kind === 'key').length;
    const ends = BOOK.map((_, f) => cells.reduce((a, c, k) => c.f === f ? k : a, -1));
    const upto = rd < 0 ? -1 : ends[rd];
    useEffect(() => { setRd(-1); setScan(0); }, [m, vals.join('|')]);
    const next = () => {
      const f = rd + 1; if (f >= BOOK.length) return;
      if (m === 'del') { const start = rd < 0 ? 0 : ends[rd] + 1; setScan(s => s + (ends[f] - start + 1)); }
      setRd(f);
    };
    const what = rd < 0 ? 'Press "Read next field"' : m === 'fixed' ? `read ${BOOK[rd][1]} bytes, no checks` : m === 'len' ? `read the length ${String(shown[rd].length).padStart(2, '0')}, then jump ${shown[rd].length} bytes` : m === 'kw' ? `read "${BOOK[rd][0]}=" then the value` : `compared ${scan} bytes with |`;
    const setV = (f, v) => setVals(x => x.map((y, k) => k === f ? v.toUpperCase().slice(0, BOOK[f][1]) : y));
    return html`<figure className="fig ff3"><div className="fig-stage"><div className="ff3-wrap">
      <${Modes} list=${FS} mode=${m} set=${setM} />
      <div className="ff3-in">${BOOK.map(([n, l], f) => html`<label key=${'l' + n} htmlFor=${'ff3-f' + f}>${n} (${l})</label><input key=${'i' + n} id=${'ff3-f' + f} value=${vals[f]} maxLength=${l} onInput=${e => setV(f, e.target.value)} />`)}</div>
      <div className="ff3-cells" aria-label=${'Record bytes: ' + cells.map(c => c.ch || '_').join('')}>${cells.map((c, k) => html`<${Cell} key=${k} k=${k} ch=${c.ch} cls=${(c.kind === 'pad' ? 'pad' : c.kind === 'len' ? 'len' : c.kind === 'key' ? 'key' : c.kind === 'del' ? 'del' : '') + (k <= upto ? ' on' : '') + (m === 'del' && rd >= 0 && k <= upto ? ' chk' : '')} />`)}</div>
      <div className="ff3-kv"><span>bytes <b>${total}</b></span>${m === 'fixed' && html`<span>padding <b>${pad}</b></span>`}${m === 'len' && html`<span>length bytes <b>${lenB}</b></span>`}${m === 'kw' && html`<span>keyword bytes <b>${keyB}</b></span>`}${m === 'del' && html`<span>compared <b>${scan}</b></span>`}</div>
      <div className="ff3-note">${what}</div>
      <div className="ff3-row"><button className="fig-btn solid" onClick=${next} disabled=${rd >= BOOK.length - 1}>Read next field</button><button className="fig-btn" onClick=${() => { setRd(-1); setScan(0); }}>Reset</button>${!isEx && html`<button className="fig-btn" onClick=${() => setVals(EX)}>Example from the notes</button>`}</div>
      <div className="ff3-key"><span><span className="ff3-c pad"></span>padding</span><span><span className="ff3-c len"></span>length</span><span><span className="ff3-c key"></span>keyword</span><span><span className="ff3-c del"></span>delimiter</span></div>
    </div></div><${Cap} en=${FS_TXT[m].en + (m === 'fixed' && isEx ? ' The notes\' fixed-length example shows ISBN 87358.' : '')} ar=${FS_TXT[m].ar} showAr=${ar} /></figure>`;
  }

  /* ── §5 and §6: the 3 record structures and jumping to the i-th record ── */
  const RECS = [['87359', 'CARROLL', 'ALICE IN WONDERLAND'], ['03818', 'FOLK', 'FILE STRUCTURES']];
  const RS = [['m1', '(1) Fixed fields'], ['m2', '(2) Variable fields'], ['m3', '(3) Length indicator']];
  const RSIZE = 37; // 5 + 7 + 25, the fixed-length fields
  function recCells(m, r) {
    const out = [], push = (s, kind) => s.split('').forEach(ch => out.push({ ch, kind }));
    if (m === 'm1') BOOK.forEach(([, len], f) => { push(r[f].slice(0, len), 'data'); for (let k = r[f].length; k < len; k++) out.push({ ch: '', kind: 'pad' }); });
    if (m === 'm2') { r.forEach(v => { push(v, 'data'); push('|', 'del'); }); while (out.length < RSIZE) out.push({ ch: '', kind: 'pad' }); }
    if (m === 'm3') { const body = r.join('|'); push(String(body.length), 'len'); push(body.slice(0, 5), 'data'); body.slice(5).split('').forEach(ch => out.push({ ch, kind: ch === '|' ? 'del' : 'data' })); }
    return out;
  }
  function RecordStructs({ ar }) {
    const [m, setM] = useState('m3');
    const [go, setGo] = useState(0);   // 0 idle, 1 jumped to record 1
    useEffect(() => setGo(0), [m]);
    const recs = RECS.map(r => recCells(m, r)), fixed = m !== 'm3';
    const txt = {
      m1: { en: '<b>Fixed-length records with fixed-length fields</b>: every record is 5 + 7 + 25 = 37 bytes. <b>Advantage</b>: easy to jump to the i-th record (offset = RRN × record size). <b>Disadvantage</b>: wastes space with padding.', ar: 'الـ <b>fixed-length records</b> بـ fixed-length fields: كل record حجمه 37 byte، يعني <bdi dir="ltr">5&nbsp;+&nbsp;7&nbsp;+&nbsp;25</bdi>. <b>الميزة</b>: سهل تنط للـ record رقم i، لأن الـ offset بيساوي RRN × record size. <b>العيب</b>: بيضيع مساحة في الـ padding.' },
      m2: { en: '<b>Fixed-length records with variable-length fields</b>: delimited fields, padded to a fixed record size (37 bytes here, chosen to match method 1). Jumping is still easy, padding still wastes space.', ar: 'الـ <b>fixed-length records</b> بـ variable-length fields: الـ fields بـ delimiters، ونعمل padding لحد ما الـ record يوصل لحجم ثابت (هنا 37 byte زي الطريقة الأولى). النط لسه سهل، والـ padding لسه بيضيع مساحة.' },
      m3: { en: '<b>Each record begins with a length indicator</b> (byte count), as in the notes: 3387359|CARROLL|ALICE IN WONDERLAND. <b>Advantage</b>: saves space when record sizes are diverse. <b>Disadvantage</b>: we cannot jump to the i-th record unless through an index file.', ar: '<b>كل record بيبدأ بـ length indicator</b> (عدد الـ bytes)، زي مثال الـ notes:' + L('3387359|CARROLL|ALICE IN WONDERLAND') + '<b>الميزة</b>: بيوفر مساحة لما أحجام الـ records تبقى مختلفة. <b>العيب</b>: منقدرش ننط للـ record رقم i إلا عن طريق index file.' }
    }[m];
    const jumpTxt = !go ? 'Jump to record 1 (RRN 1)' : fixed ? `seek to byte 1 × ${RSIZE} = ${RSIZE}: one jump` : `read length ${recs[0][0].ch}${recs[0][1].ch}, skip record 0, then reach record 1`;
    return html`<figure className="fig ff3"><div className="fig-stage"><div className="ff3-wrap">
      <${Modes} list=${RS} mode=${m} set=${setM} />
      ${recs.map((cs, r) => html`<div key=${r} className=${'ff3-rec' + (go && r === 1 ? ' on' : '')}><h5>Record ${r} (RRN ${r}): ${cs.length} bytes</h5>
        <div className="ff3-cells">${cs.map((c, k) => html`<${Cell} key=${k} k=${k} ch=${c.ch} cls=${(c.kind === 'pad' ? 'pad' : c.kind === 'len' ? 'len' : c.kind === 'del' ? 'del' : '') + (go && !fixed && r === 0 ? ' chk' : '') + (go && r === 1 && k === 0 ? ' ptr' : '')} />`)}</div></div>`)}
      <div className="ff3-note">${jumpTxt}</div>
      <div className="ff3-row"><button className="fig-btn solid" onClick=${() => setGo(1)} disabled=${!!go}>Jump to record 1</button><button className="fig-btn" onClick=${() => setGo(0)}>Reset</button></div>
    </div></div><${Cap} en=${txt.en} ar=${txt.ar} showAr=${ar} /></figure>`;
  }

  /* ── §7 sequential search O(n) vs direct access O(1) ── */
  function Access({ ar }) {
    const N = 8;
    const [target, setTarget] = useState(5);
    const [m, setM] = useState('seq');
    const [t, setT] = useState(-1);   // records read so far (sequential) or 0/1 (direct)
    useEffect(() => setT(-1), [m, target]);
    useEffect(() => {
      if (t < 0 || calm()) return;
      if (m === 'seq' && t < target) { const id = setTimeout(() => setT(x => x + 1), 450); return () => clearTimeout(id); }
    }, [t, m, target]);
    const run = () => setT(calm() ? (m === 'seq' ? target : 0) : 0);
    const reads = t < 0 ? 0 : m === 'seq' ? t + 1 : 1, done = t >= 0 && (m === 'dir' || t >= target);
    const txt = m === 'seq'
      ? { en: '<b>Sequential search</b>: read the records in order until the match. That is <b>O(n)</b>, fine for pattern matching or files with few records. Tap a record to make it the target.', ar: 'الـ <b>Sequential search</b>: بنقرا الـ records بالترتيب لحد ما نلاقي اللي عايزينه. ده <b><bdi dir="ltr">O(n)</bdi></b>، ومناسب للـ pattern matching أو للـ files اللي فيها records قليلة. دوس على أي record عشان تخليه الهدف.' }
      : { en: '<b>Direct access</b>: when we know the <b>RRN</b> (the first record has RRN 0), seek directly to the start of the record. That is <b>O(1)</b>. With 37-byte records the offset is RRN × 37.', ar: 'الـ <b>Direct access</b>: لما نكون عارفين الـ <b>RRN</b> (أول record الـ RRN بتاعه 0)، بنعمل seek على طول لأول الـ record. ده <b><bdi dir="ltr">O(1)</bdi></b>. ولو الـ record حجمه 37 byte، الـ offset بيبقى RRN × 37.' };
    return html`<figure className="fig ff3"><div className="fig-stage"><div className="ff3-wrap">
      <${Modes} list=${[['seq', 'Sequential search'], ['dir', 'Direct access']]} mode=${m} set=${setM} />
      <div className="ff3-grid">${Array.from({ length: N }, (_, r) => {
        const read = t >= 0 && (m === 'seq' ? r <= t : r === target), hit = done && r === target;
        return html`<button key=${r} className=${boxCls(hit, read && !hit, false)} style=${{ font: 'inherit', cursor: 'pointer', outline: r === target ? '2px solid var(--pen)' : 'none', outlineOffset: '-2px' }} onClick=${() => setTarget(r)}>RRN ${r}<small>byte ${r * 37}</small></button>`; })}</div>
      <div className="ff3-kv"><span>target <b>RRN ${target}</b></span><span>records read <b>${reads}</b></span>${m === 'dir' && t >= 0 && html`<span>offset <b>${target} × 37 = ${target * 37}</b></span>`}</div>
      <div className="ff3-row"><button className="fig-btn solid" onClick=${run}>Find it</button></div>
    </div></div><${Cap} en=${txt.en} ar=${txt.ar} showAr=${ar} /></figure>`;
  }

  /* ── §8 seeking: fseek in C, seekg / seekp in C++ ── */
  const FILE = STREAM, FN = FILE.length;
  const C_CALLS = [['fseek(infile,0L,0)', 0, 0, 'start'], ['fseek(infile,0L,2)', 0, 2, 'end'], ['fseek(infile,-10L,1)', -10, 1, 'back 10 bytes']];
  const CPP_CALLS = [['infile.seekg(0, ios::beg)', 0, 0], ['infile.seekg(0, ios::end)', 0, 2], ['infile.seekg(-10, ios::cur)', -10, 1]];
  function Seek({ ar }) {
    const [m, setM] = useState('c');
    const [pos, setPos] = useState(0), [put, setPut] = useState(0);
    const [last, setLast] = useState('');
    const [off, setOff] = useState(5), [org, setOrg] = useState(0), [which, setWhich] = useState('g');
    useEffect(() => { setPos(0); setPut(0); setLast(''); }, [m]);
    const where = (o, origin, from) => Math.max(0, Math.min(FN, (origin === 0 ? 0 : origin === 1 ? from : FN) + o));
    const doC = ([call, o, origin]) => { setPos(p => where(o, origin, p)); setLast(call); };
    const doG = ([call, o, origin]) => { setPos(p => where(o, origin, p)); setLast(call); };
    const custom = () => {
      const o = parseInt(off, 10) || 0;
      if (m === 'c') { setPos(p => where(o, org, p)); setLast(`fseek(infile,${o}L,${org})`); }
      else { const nm = ['ios::beg', 'ios::cur', 'ios::end'][org]; if (which === 'g') { setPos(p => where(o, org, p)); setLast(`infile.seekg(${o}, ${nm})`); } else { setPut(p => where(o, org, p)); setLast(`file.seekp(${o}, ${nm})`); } }
    };
    const txt = m === 'c'
      ? { en: 'In C, <b>int fseek(FILE *stream, long offset, int origin)</b> moves the file pointer. Origin <b>0</b> = beginning, <b>1</b> = current position, <b>2</b> = end. Try the notes\' three calls on the stream file\'s ' + FN + ' bytes.', ar: 'في C، الـ function دي بتحرك الـ file pointer:' + L('int fseek(FILE *stream, long offset, int origin)') + 'والـ origin قيمته <b>0</b> للبداية، و<b>1</b> للمكان الحالي، و<b>2</b> للنهاية. جرّب الـ 3 calls بتوع الـ notes على الـ ' + FN + ' byte بتوع الـ stream file.' }
      : { en: 'In C++, an <b>fstream has two pointers</b>: <b>seekg</b> moves the get (read) pointer and <b>seekp</b> moves the put (write) pointer. Origins: <b>ios::beg</b>, <b>ios::cur</b>, <b>ios::end</b>.', ar: 'في <bdi dir="ltr">C++</bdi>، الـ <b>fstream ليه pointer-ين</b>: الـ <b>seekg</b> بيحرك الـ get pointer (القراية)، والـ <b>seekp</b> بيحرك الـ put pointer (الكتابة). والـ origins هي الـ <b><bdi dir="ltr">ios::beg</bdi></b> والـ <b><bdi dir="ltr">ios::cur</bdi></b> والـ <b><bdi dir="ltr">ios::end</bdi></b>.' };
    return html`<figure className="fig ff3"><div className="fig-stage"><div className="ff3-wrap">
      <${Modes} list=${[['c', 'C: fseek'], ['cpp', 'C++: seekg / seekp']]} mode=${m} set=${setM} />
      <div className="ff3-cells" aria-label=${'File bytes 0 to ' + (FN - 1)}>${FILE.split('').map((c, k) => html`<${Cell} key=${k} k=${k} ch=${c} cls=${(k === pos ? 'ptr' : '') + (m === 'cpp' && k === put ? ' put' : '')} />`)}<span className=${'ff3-c' + (pos === FN ? ' ptr' : '') + (m === 'cpp' && put === FN ? ' put' : '')} title="end of file">⌁</span></div>
      <div className="ff3-kv"><span>${m === 'c' ? 'file pointer' : 'get pointer'} <b>byte ${pos}</b></span>${m === 'cpp' && html`<span>put pointer <b>byte ${put}</b></span>`}</div>
      <div className="ff3-note" style=${{ fontFamily: 'var(--mono)', fontSize: '.82rem', wordBreak: 'break-all' }}>${last || ' '}</div>
      <div className="ff3-row">${(m === 'c' ? C_CALLS : CPP_CALLS).map(c => html`<button key=${c[0]} className="fig-btn" style=${{ fontFamily: 'var(--mono)', fontSize: '.8rem' }} onClick=${() => (m === 'c' ? doC : doG)(c)}>${c[0]}</button>`)}</div>
      <div className="ff3-in" style=${{ marginTop: '10px' }}>
        ${m === 'cpp' && html`<label htmlFor="ff3-sw">pointer</label><select id="ff3-sw" value=${which} onChange=${e => setWhich(e.target.value)}><option value="g">seekg (get)</option><option value="p">seekp (put)</option></select>`}
        <label htmlFor="ff3-so">offset</label><input id="ff3-so" type="number" value=${off} onInput=${e => setOff(e.target.value)} />
        <label htmlFor="ff3-sg">origin</label><select id="ff3-sg" value=${org} onChange=${e => setOrg(+e.target.value)}>${(m === 'c' ? ['0 beginning', '1 current', '2 end'] : ['ios::beg', 'ios::cur', 'ios::end']).map((t, k) => html`<option key=${k} value=${k}>${t}</option>`)}</select></div>
      <div className="ff3-row" style=${{ marginTop: 0 }}><button className="fig-btn solid" onClick=${custom}>Seek</button></div>
    </div></div><${Cap} en=${txt.en} ar=${txt.ar} showAr=${ar} /></figure>`;
  }

  /* ── §9 Quiz (3) Q1: copy a file with no loops ── */
  const COPY = ['ifstream infile("d:\\\\IFile.txt", ios::binary);', 'ofstream outfile("d:\\\\OFile.txt", ios::binary);', 'infile.seekg(0, infile.end);', 'long size = infile.tellg();', 'infile.seekg(0);', 'char* buffer = new char[size];', 'infile.read(buffer, size);', 'outfile.write(buffer, size);', 'delete[] buffer;', 'outfile.close(); infile.close();'];
  const SRC = 'AmesMary123 MapleStillwaterOK';  // example content for the input file
  function CopyFile({ ar }) {
    const steps = [
      { l: [0, 1], en: 'Open the input and the output file in <b>binary</b> mode. The input file here holds ' + SRC.length + ' example bytes.', ar: 'بنفتح الـ input file والـ output file في الـ <b>binary</b> mode. الـ input file هنا فيه ' + SRC.length + ' byte كمثال.' },
      { l: [2], en: '<b>seekg</b> to the end: the get pointer jumps past the last byte.', ar: 'بنعمل <b>seekg</b> للآخر: الـ get pointer بينط بعد آخر byte.' },
      { l: [3], en: '<b>tellg</b> gives the pointer\'s position, which is the file size: ' + SRC.length + '.', ar: 'الـ <b>tellg</b> بيدي مكان الـ pointer، وده هو حجم الـ file: ' + SRC.length + '.' },
      { l: [4], en: 'seekg(0): back to the start.', ar: 'الـ <bdi dir="ltr">seekg(0)</bdi> بيرجّع الـ pointer للبداية.' },
      { l: [5], en: 'Allocate a buffer of exactly that size.', ar: 'بنحجز buffer بنفس الحجم ده بالظبط.' },
      { l: [6], en: '<b>One read</b> fills the buffer with the whole file at once.', ar: 'عملية <b>read</b> واحدة بتملا الـ buffer بالـ file كله مرة واحدة.' },
      { l: [7], en: '<b>One write</b> copies the buffer into the output file. No loop anywhere.', ar: 'عملية <b>write</b> واحدة بتنسخ الـ buffer في الـ output file. مفيش أي loop.' },
      { l: [8, 9], en: 'Free the buffer and close both files.', ar: 'بنمسح الـ buffer ونقفل الـ 2 files.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400), s = steps[i];
    const ptr = i === 1 || i === 2 ? SRC.length : 0, buf = i >= 4, full = i >= 5, out = i >= 6;
    const row = (label, txt, show, p) => html`<div className="ff3-buf"><b>${label}</b><div className="ff3-cells">${txt.split('').map((c, k) => html`<${Cell} key=${k} k=${k} ch=${show ? c : ''} cls=${(show ? '' : 'pad') + (p === k ? ' ptr' : '')} />`)}${p === txt.length && html`<span className="ff3-c ptr">⌁</span>`}</div></div>`;
    return html`<figure className="fig ff3"><div className="fig-stage"><div className="ff3-wrap">
      <div className="ff3-code">${COPY.map((c, k) => html`<span key=${k} className=${s.l.includes(k) ? 'on' : i > 0 && k > Math.max(...s.l) ? 'dim' : ''}>${c}</span>`)}</div>
      ${row('IFile', SRC, true, i >= 1 && i <= 4 ? ptr : -1)}
      ${buf && row('buffer', SRC, full, -1)}
      ${row('OFile', SRC, out, -1)}
      ${i >= 2 && html`<div className="ff3-kv"><span>size <b>${SRC.length}</b></span></div>`}
    </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §10 Quiz (3) Q2: update a record by RRN ── */
  function UpdateRrn({ ar }) {
    const N = 5;
    const [rrn, setRrn] = useState(2);
    const [st, setSt] = useState(0); // 0 idle, 1 seekp done, 2 written
    useEffect(() => setSt(0), [rrn]);
    useEffect(() => { if (st === 1 && !calm()) { const id = setTimeout(() => setSt(2), 900); return () => clearTimeout(id); } }, [st]);
    const txt = { en: 'Fixed-length fields and records mean every record has the same size, so the byte offset is exactly <b>RRN × record size</b>. <b>seekp</b> moves the put pointer there, and <b>write</b> overwrites the old record. Pick an RRN.', ar: 'الـ fields والـ records الـ fixed-length معناها إن كل record ليه نفس الحجم، فالـ byte offset بيبقى بالظبط:' + L('RRN × record size') + 'والـ <b>seekp</b> بيحرك الـ put pointer هناك، والـ <b>write</b> بتكتب فوق الـ record القديم. اختار RRN.' };
    return html`<figure className="fig ff3"><div className="fig-stage"><div className="ff3-wrap">
      <div className="ff3-code"><span className=${st === 1 ? 'on' : ''}>file.seekp(${rrn} * sizeof(newItem), ios::beg);</span><span className=${st === 2 ? 'on' : ''}>file.write((char*)&newItem, sizeof(newItem));</span></div>
      <div className="ff3-grid" style=${{ gridTemplateColumns: 'repeat(5, minmax(0,1fr))', marginTop: '8px' }}>${Array.from({ length: N }, (_, r) => html`<button key=${r} className=${boxCls(st === 2 && r === rrn, st === 1 && r === rrn, false)} style=${{ font: 'inherit', cursor: 'pointer', padding: '5px 2px', outline: r === rrn ? '2px solid var(--pen)' : 'none', outlineOffset: '-2px' }} onClick=${() => setRrn(r)}>${st === 2 && r === rrn ? 'new' : 'Item'}<small>RRN ${r}</small></button>`)}</div>
      <div className="ff3-kv"><span>offset <b>${rrn} × sizeof(Item)</b></span></div>
      <div className="ff3-row"><button className="fig-btn solid" onClick=${() => setSt(calm() ? 2 : 1)}>UpdateRecord</button></div>
    </div></div><${Cap} en=${txt.en} ar=${txt.ar} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'fp-file-records': FileRecords, 'fp-stream-file': StreamFile, 'fp-field-structs': FieldStructs, 'fp-record-structs': RecordStructs, 'fp-access': Access, 'fp-seek': Seek, 'fp-copy-file': CopyFile, 'fp-update-rrn': UpdateRrn });
})();
/* ── part 4 ── */
// File Processing visuals, part 4: L4 heap (unordered) and sequential (ordered) files: access strategies, heap insert/delete, sorted insert, equality search and the cost table. Every label and caption comes from the site's notes for that lecture.
(function () {
  const { useState, useEffect } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.ff4 .fig-dots i.on{ background:var(--k-fp); } .ff4 .fig-btn:hover{ border-color:var(--k-fp); } .ff4 .fig-btn.solid{ background:var(--s-fp); color:#fff; border-color:transparent; }
.ff4 .fig-btn[aria-pressed="true"]{ background:var(--s-fp); color:#fff; border-color:transparent; }
.ff4 .fig-btn:disabled{ opacity:.45; cursor:default; }
.ff4-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.ff4-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.ff4-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 8px; font-size:.86rem; color:var(--ink); }
.ff4-row .fig-btn{ padding:4px 9px; min-width:34px; font-size:.84rem; }
.ff4-row input{ font:inherit; font-size:.88rem; width:4.2em; padding:3px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.ff4-file{ max-width:380px; margin:0 auto; display:flex; flex-direction:column; gap:4px; }
.ff4-rec{ display:grid; grid-template-columns:3em 3em minmax(0,1fr) 3.8em; gap:6px; align-items:center; border:1.4px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:4px 8px; font-size:.86rem; transition:background .4s, border-color .4s, opacity .4s, transform .45s; }
.ff4-rec .o{ font-family:var(--mono); color:var(--graphite); font-size:.8rem; }
.ff4-rec .k{ font-family:var(--mono); font-weight:700; }
.ff4-rec.hd{ border:0; background:none; padding:0 8px; color:var(--graphite); font-size:.76rem; font-weight:600; white-space:nowrap; }
.ff4-rec.seen{ background:color-mix(in srgb, var(--k-fp) 10%, var(--paper)); }
.ff4-rec.cur{ border-color:var(--k-fp); background:color-mix(in srgb, var(--k-fp) 22%, var(--paper)); }
.ff4-rec.hit{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 20%, var(--paper)); }
.ff4-rec.new{ border-color:var(--k-fp); box-shadow:0 0 0 2px color-mix(in srgb, var(--k-fp) 35%, transparent); animation:ff4in .5s ease both; }
.ff4-rec.dup{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
.ff4-rec.moved{ border-color:var(--k-fp); border-style:dashed; }
.ff4-rec.del{ opacity:.55; text-decoration:line-through; }
.ff4-rec.free{ border-style:dashed; color:var(--graphite); }
.ff4-rec.pick{ cursor:pointer; }
.ff4-rec.pick:hover{ border-color:var(--k-fp); }
.ff4-tag{ font-size:.76rem; font-weight:700; color:var(--pen); }
.ff4-tag.ok{ color:var(--ok); } .ff4-tag.k{ color:var(--k-fp); }
@keyframes ff4in{ from{ opacity:0; transform:translateY(-6px); } to{ opacity:1; transform:none; } }
.ff4-count{ display:flex; flex-wrap:wrap; justify-content:center; gap:4px 14px; margin:8px 0 0; font-size:.86rem; color:var(--ink); }
.ff4-count b{ font-family:var(--mono); color:var(--k-fp); font-size:1rem; }
.ff4-note{ text-align:center; font-size:.86rem; color:var(--ink); margin:8px auto 0; max-width:420px; line-height:1.5; }
.ff4-note .m{ font-family:var(--mono); color:var(--k-fp); font-weight:700; }
.ff4-lane{ max-width:400px; margin:0 auto 10px; }
.ff4-lane h4{ margin:0 0 4px; font-size:.86rem; color:var(--ink); }
.ff4-pages{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:4px; }
.ff4-pg{ border:1.4px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); text-align:center; padding:3px 0; font-size:.78rem; line-height:1.25; transition:background .35s, border-color .35s; }
.ff4-pg small{ display:block; font-size:.74rem; color:var(--graphite); font-family:var(--mono); }
.ff4-pg.read{ background:color-mix(in srgb, var(--k-fp) 14%, var(--paper)); }
.ff4-pg.cur{ border-color:var(--k-fp); background:color-mix(in srgb, var(--k-fp) 26%, var(--paper)); }
.ff4-pg.hit{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 22%, var(--paper)); }
.ff4-pg.out{ opacity:.35; }
.ff4-in{ font-size:.8rem; color:var(--graphite); margin:4px 0 0; min-height:1.3em; font-family:var(--mono); overflow-wrap:anywhere; }
.ff4-in b{ color:var(--ok); }
.ff4-cards{ display:flex; flex-direction:column; gap:6px; max-width:420px; margin:0 auto; }
.ff4-card{ border:1.4px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 10px; font-size:.84rem; color:var(--ink); line-height:1.45; }
.ff4-card .t{ font-weight:700; }
.ff4-card .f{ font-family:var(--mono); font-size:.82rem; color:var(--graphite); overflow-wrap:anywhere; }
.ff4-card .v{ font-family:var(--mono); font-weight:700; color:var(--k-fp); font-size:.95rem; }
.ff4-card.best{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.ff4-card.best .t::after{ content:" (cheapest)"; color:var(--ok); font-weight:600; font-size:.8rem; }
.ff4-in2{ display:grid; grid-template-columns:repeat(auto-fit, minmax(5.4em, 1fr)); gap:6px; max-width:420px; margin:0 auto 10px; }
.ff4-in2 label{ display:flex; flex-direction:column; font-size:.8rem; color:var(--graphite); gap:2px; }
.ff4-in2 input{ font:inherit; font-size:.88rem; width:100%; box-sizing:border-box; padding:3px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.ff4-foot{ max-width:420px; margin:8px auto 0; font-size:.8rem; color:var(--graphite); line-height:1.5; }
@media (prefers-reduced-motion: reduce){ .ff4-rec, .ff4-pg{ transition:none; } .ff4-rec.new{ animation:none; } }`;
  if (!document.getElementById('ff4-css')) { const s = document.createElement('style'); s.id = 'ff4-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = t => `<span class="ltr">${t}</span>`;
  const Modes = ({ list, mode, set }) => html`<div className="ff4-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  // the notes' example heap file: 20-byte records in order of entry
  const HEAP0 = [{ no: 5, name: 'Ahmed', dept: 'CS' }, { no: 2, name: 'Adam', dept: 'ITB' }, { no: 1, name: 'Mona', dept: 'ITD' }, { no: 3, name: 'Ali', dept: 'NW' }];
  const Head = () => html`<div className="ff4-rec hd" aria-hidden="true"><span>Offset</span><span>St-no</span><span>St-name</span><span>St-Dept</span></div>`;

  /* ── §0: sequential search vs direct access on the notes' records ── */
  function AccessStrat({ ar }) {
    const [mode, setMode] = useState('seq'), [target, setTarget] = useState(3), [pos, setPos] = useState(-1), [run, setRun] = useState(false);
    const idx = HEAP0.findIndex(r => r.no === target);
    useEffect(() => {
      if (!run) return;
      if (mode === 'direct' || calm()) { setPos(idx); setRun(false); return; }
      if (pos >= idx) { setRun(false); return; }
      const t = setTimeout(() => setPos(p => p + 1), pos < 0 ? 200 : 700); return () => clearTimeout(t);
    }, [run, pos, mode, idx]);
    const go = () => { setPos(-1); setRun(true); };
    const pick = n => { setTarget(n); setPos(-1); setRun(false); };
    const setM = m => { setMode(m); setPos(-1); setRun(false); };
    const done = pos === idx, reads = mode === 'direct' ? (done ? 1 : 0) : pos + 1;
    let en, a;
    if (pos < 0) { en = `Find student <b>${target}</b>. Pick a strategy and press <b>Read</b>. Efficiency is measured by the <b>number of disk accesses</b>: fewer is better.`; a = `دوّر على الطالب رقم <b>${target}</b>. اختار استراتيجية ودوس <b>Read</b>. الكفاءة بتتقاس بـ <b>عدد الـ disk accesses</b>، وكل ما يقل كل ما يبقى أحسن.`; }
    else if (mode === 'seq' && !done) { en = `Sequential search reads record ${pos + 1} (offset ${pos * 20}): not ${target}, keep going.`; a = `الـ sequential search بيقرا الـ record رقم ${pos + 1} (عند offset ${pos * 20})، ومش هو الـ ${target}، فبيكمل.`; }
    else if (mode === 'seq') { en = `Found after <b>${reads}</b> reads. <b>Sequential search is slow</b>: it reads from the start, O(n).`; a = `لقيناه بعد <b>${reads}</b> reads. الـ <b>sequential search بطيء</b> لأنه بيقرا من الأول، وده <bdi dir="ltr">O(n)</bdi>.`; }
    else { en = `<b>Direct access</b> goes straight to the record at offset ${idx * 20} and gets it in <b>one read</b>, O(1).`; a = `الـ <b>direct access</b> بيروح على الـ record عند offset ${idx * 20} على طول، وبيجيبه في <b>read واحدة</b>، وده <bdi dir="ltr">O(1)</bdi>.`; }
    return html`<figure className="fig ff4"><div className="fig-stage">
      <${Modes} list=${[['seq', 'Sequential search'], ['direct', 'Direct access']]} mode=${mode} set=${setM} />
      <div className="ff4-row"><span>Find St-no:</span>${[1, 2, 3, 5].map(n => html`<button key=${n} className="fig-btn" aria-pressed=${String(target === n)} onClick=${() => pick(n)}>${n}</button>`)}
        <button className="fig-btn solid" onClick=${go} disabled=${run}>Read</button></div>
      <div className="ff4-file" role="list" aria-label="Records of the example file">
        <${Head} />
        ${HEAP0.map((r, k) => { const c = k === pos ? (done ? ' hit' : ' cur') : (mode === 'seq' && k < pos ? ' seen' : '');
          return html`<div key=${k} role="listitem" className=${'ff4-rec' + c}><span className="o">${k * 20}</span><span className="k">${r.no}</span><span>${r.name}</span><span>${r.dept}</span></div>`; })}
      </div>
      <div className="ff4-count"><span>disk accesses: <b>${Math.max(0, reads)}</b></span><span>${mode === 'seq' ? 'O(n)' : 'O(1)'}</span></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── §2: the notes' heap file: insert at the end (duplicates allowed), delete logically or physically ── */
  function HeapFile({ ar }) {
    const fresh = () => HEAP0.map(r => ({ ...r }));
    const [recs, setRecs] = useState(fresh), [msg, setMsg] = useState(null), [del, setDel] = useState('logical'), [picking, setPicking] = useState(false), [no, setNo] = useState('4');
    const live = r => !r.free && !r.del;
    const insert = (n, name, dept) => {
      const dup = recs.some(r => live(r) && r.no === n);
      setRecs(rs => rs.map(r => ({ ...r, isNew: false, hit: false })).concat([{ no: n, name, dept, isNew: true, dup }]));
      setPicking(false);
      setMsg({ kind: 'ins', n, off: recs.length * 20, dup });
    };
    const custom = () => { const n = parseInt(no, 10); if (!(n >= 1 && n <= 99)) return; insert(n, 'New', '-'); };
    const remove = k => {
      const checked = recs.slice(0, k + 1).filter(r => !r.free).length;
      setRecs(rs => rs.map((r, j) => j !== k ? { ...r, isNew: false } : del === 'logical' ? { ...r, del: true, isNew: false, dup: false } : { free: true }));
      setPicking(false); setMsg({ kind: 'del', n: recs[k].no, off: k * 20, checked });
    };
    const reset = () => { setRecs(fresh()); setMsg(null); setPicking(false); };
    let en, a;
    if (!msg) { en = 'The notes\' heap file: 20-byte records stored <b>in order of entry</b>, regardless of key. Press <b>Insert (4, Ali, CS)</b> to run the notes\' example.'; a = 'الـ heap file اللي في الـ notes فيه records حجمها 20 byte، متخزنة <b>بترتيب دخولها</b> بغض النظر عن الـ key. دوس <b><bdi dir="ltr">Insert&nbsp;(4,&nbsp;Ali,&nbsp;CS)</bdi></b> عشان تشغّل مثال الـ notes.'; }
    else if (msg.kind === 'ins') {
      en = `Insert at the end: read the last page (D), add the record (C), write it back (D), so <b>2D + C</b>. St-no ${msg.n} goes to offset <b>${msg.off}</b>.` + (msg.dup ? ` <b>St-no ${msg.n} is already in the file</b>: the heap file allows <b>duplicate records</b>, its serious disadvantage.` : '');
      a = `الـ insert بيحصل في الآخر: نقرا آخر page (D)، ونضيف الـ record (C)، ونكتبها تاني (D)، يعني <b><bdi dir="ltr">2D&nbsp;+&nbsp;C</bdi></b>. والطالب رقم ${msg.n} بيتحط عند offset <b>${msg.off}</b>.` + (msg.dup ? ` والطالب رقم ${msg.n} <b>موجود أصلًا في الـ file</b>، فالـ heap file بيسمح بـ <b>records متكررة (duplicates)</b>، وده عيبه الكبير.` : '');
    } else {
      en = `Delete St-no ${msg.n}: linear search checked <b>${msg.checked}</b> records to find it, then it is deleted <b>${del}ly</b> and written back: <b>search + C + D</b>.`;
      a = `الـ delete للطالب رقم ${msg.n}: الـ linear search شيّك على <b>${msg.checked}</b> records لحد ما لقاه، وبعدين اتمسح <b>${del === 'logical' ? 'logically' : 'physically'}</b> واتكتب تاني، يعني <b>search + C + D</b>.`;
    }
    return html`<figure className="fig ff4"><div className="fig-stage">
      <div className="ff4-row"><button className="fig-btn solid" onClick=${() => insert(4, 'Ali', 'CS')}>Insert (4, Ali, CS)</button>
        <span>St-no</span><input type="number" min="1" max="99" value=${no} onInput=${e => setNo(e.target.value)} aria-label="St-no to insert" /><button className="fig-btn" onClick=${custom}>Insert</button></div>
      <div className="ff4-row"><button className="fig-btn" aria-pressed=${String(picking)} onClick=${() => setPicking(p => !p)}>${picking ? 'Tap a record to delete' : 'Delete…'}</button>
        ${[['logical', 'logically'], ['physical', 'physically']].map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(del === k)} onClick=${() => setDel(k)}>${t}</button>`)}
        <button className="fig-btn" onClick=${reset}>↻ Reset</button></div>
      <div className="ff4-file" role="list" aria-label="Heap file records with offsets">
        <${Head} />
        ${recs.map((r, k) => r.free
          ? html`<div key=${k} role="listitem" className="ff4-rec free"><span className="o">${k * 20}</span><span></span><span>free slot</span><span></span></div>`
          : html`<div key=${k} role="listitem" className=${'ff4-rec' + (r.isNew ? ' new' : '') + (r.dup ? ' dup' : '') + (r.del ? ' del' : '') + (picking && live(r) ? ' pick' : '')} onClick=${picking && live(r) ? () => remove(k) : null}>
              <span className="o">${k * 20}</span><span className="k">${r.no}</span><span>${r.name}${r.dup ? html` <span className="ff4-tag">duplicate</span>` : r.isNew ? html` <span className="ff4-tag k">appended</span>` : r.del ? html` <span className="ff4-tag">deleted</span>` : ''}</span><span>${r.dept}</span></div>`)}
      </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── §5: the ordered (sequential) file: the notes' insert of (4, Ali, CS), then try your own ── */
  const SORT0 = [{ no: 1, name: 'Mona', dept: 'ITD' }, { no: 2, name: 'Adam', dept: 'ITB' }, { no: 3, name: 'Ali', dept: 'NW' }, { no: 5, name: 'Ahmed', dept: 'CS' }];
  const SSTEPS = [
    { en: 'An <b>ordered (sequential) file</b>: records stored in order of the key value. Insert <b>(4, Ali, CS)</b> into 1, 2, 3, 5.', ar: 'ده <b>ordered (sequential) file</b>: الـ records متخزنة بترتيب الـ key value. هنعمل insert للـ record ده:' + L('(4, Ali, CS) into 1, 2, 3, 5'), view: 0 },
    { en: 'The new record goes into an <b>exactly determined position</b>: after key 3 and before key 5, which is <b>offset 60</b>.', ar: 'الـ record الجديد بيروح لـ <b>مكان محدد بالظبط</b>: بعد الـ key رقم 3 وقبل الـ key رقم 5، يعني عند <b>offset 60</b>.', view: 1 },
    { en: 'Every record with a greater key moves one location towards the end: <b>Ahmed (5)</b> shifts from 60 to <b>80</b>.', ar: 'كل record الـ key بتاعه أكبر بيتحرك مكان واحد ناحية الآخر: الـ <b>Ahmed (5)</b> بيتزق من 60 لـ <b>80</b>.', view: 2 },
    { en: '<b>(4, Ali, CS)</b> is written at offset 60. The file is still in key order.', ar: 'الـ <b><bdi dir="ltr">(4,&nbsp;Ali,&nbsp;CS)</bdi></b> اتكتب عند offset 60، والـ file لسه مترتب بالـ key.', view: 3 },
    { en: 'Cost: search + 2 × (0.5B(D + RC)) = <b>search + B(D + RC)</b>: on average half the file is read and rewritten. <b>Delete and update</b> need the opposite procedure (records move back).', ar: 'التكلفة:' + L('search + 2 × (0.5B(D + RC)) = search + B(D + RC)') + 'لأن في المتوسط نص الـ file بيتقري ويتكتب تاني. والـ <b>delete والـ update</b> محتاجين العكس (الـ records بترجع لورا).', view: 3 }
  ];
  function SortedInsert({ ar }) {
    const [mode, setMode] = useState('ex');
    const [i, ctl] = useSteps(SSTEPS.length, 2800), s = SSTEPS[i];
    const [recs, setRecs] = useState(() => SORT0.map(r => ({ ...r }))), [k, setK] = useState('7'), [last, setLast] = useState(null);
    const setM = m => { setMode(m); if (m === 'ex') { ctl.go(0); if (!calm()) setTimeout(ctl.replay, 0); } };
    const ins = () => {
      const n = parseInt(k, 10); if (!(n >= 1 && n <= 99) || recs.some(r => r.no === n)) { setLast({ kind: 'bad', n }); return; }
      const at = recs.findIndex(r => r.no > n), pos = at < 0 ? recs.length : at;
      const nr = recs.map(r => ({ ...r, moved: false, isNew: false })); nr.splice(pos, 0, { no: n, name: 'New', dept: '-', isNew: true });
      nr.forEach((r, j) => { if (j > pos) r.moved = true; });
      setRecs(nr); setLast({ kind: 'ins', n, off: pos * 20, moved: nr.length - 1 - pos });
    };
    const rm = () => {
      const n = parseInt(k, 10), at = recs.findIndex(r => r.no === n); if (at < 0) { setLast({ kind: 'miss', n }); return; }
      const nr = recs.filter(r => r.no !== n).map((r, j) => ({ ...r, isNew: false, moved: j >= at }));
      setRecs(nr); setLast({ kind: 'del', n, moved: nr.length - at });
    };
    let en, a, rows;
    if (mode === 'ex') {
      const v = s.view;
      rows = v < 2 ? SORT0.map((r, j) => ({ ...r, off: j * 20, cls: v === 1 && j === 3 ? ' cur' : '' }))
        : v === 2 ? [...SORT0.slice(0, 3).map((r, j) => ({ ...r, off: j * 20, cls: '' })), { free: true, off: 60 }, { ...SORT0[3], off: 80, cls: ' moved' }]
        : [...SORT0.slice(0, 3).map((r, j) => ({ ...r, off: j * 20, cls: '' })), { no: 4, name: 'Ali', dept: 'CS', off: 60, cls: ' new' }, { ...SORT0[3], off: 80, cls: ' moved' }];
      en = s.en; a = s.ar;
    } else {
      rows = recs.map((r, j) => ({ ...r, off: j * 20, cls: r.isNew ? ' new' : r.moved ? ' moved' : '' }));
      if (!last) { en = 'Type a St-no and press <b>Insert</b> or <b>Delete</b>. Every record with a greater key has to move.'; a = 'اكتب St-no ودوس <b>Insert</b> أو <b>Delete</b>. كل record الـ key بتاعه أكبر لازم يتحرك.'; }
      else if (last.kind === 'ins') { en = `St-no ${last.n} goes to offset <b>${last.off}</b>; <b>${last.moved}</b> record(s) with a greater key moved one location towards the end.`; a = `الطالب رقم ${last.n} بيروح لـ offset <b>${last.off}</b>، و<b>${last.moved}</b> records الـ key بتاعهم أكبر اتحركوا مكان واحد ناحية الآخر.`; }
      else if (last.kind === 'del') { en = `Delete St-no ${last.n}: the opposite procedure, <b>${last.moved}</b> record(s) moved back one location.`; a = `الـ delete للطالب رقم ${last.n}: العملية العكسية، و<b>${last.moved}</b> records رجعوا مكان واحد لورا.`; }
      else if (last.kind === 'miss') { en = `St-no ${last.n} is not in the file.`; a = `الطالب رقم ${last.n} مش موجود في الـ file.`; }
      else { en = 'Use a St-no from 1 to 99 that is not already in the file.'; a = 'استخدم St-no من 1 لـ 99 ومش موجود أصلًا في الـ file.'; }
    }
    return html`<figure className="fig ff4"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example from the notes'], ['try', 'Try it']]} mode=${mode} set=${setM} />
      ${mode === 'try' && html`<div className="ff4-row"><span>St-no</span><input type="number" min="1" max="99" value=${k} onInput=${e => setK(e.target.value)} aria-label="St-no" />
        <button className="fig-btn solid" onClick=${ins}>Insert</button><button className="fig-btn" onClick=${rm}>Delete</button>
        <button className="fig-btn" onClick=${() => { setRecs(SORT0.map(r => ({ ...r }))); setLast(null); }}>↻</button></div>`}
      <div className="ff4-file" role="list" aria-label="Ordered file records with offsets">
        <${Head} />
        ${rows.map((r, j) => r.free
          ? html`<div key=${'f' + j} role="listitem" className="ff4-rec free"><span className="o">${r.off}</span><span></span><span>free for the new record</span><span></span></div>`
          : html`<div key=${r.no} role="listitem" className=${'ff4-rec' + r.cls}><span className="o">${r.off}</span><span className="k">${r.no}</span><span>${r.name}${r.cls === ' moved' ? html` <span className="ff4-tag k">moved</span>` : r.cls === ' new' ? html` <span className="ff4-tag ok">new</span>` : ''}</span><span>${r.dept}</span></div>`)}
      </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />${mode === 'ex' && html`<${Bar} steps=${SSTEPS} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── §6: equality search, heap (linear) vs sorted (binary) on a sample file of B = 8 pages × R = 4 records ── */
  const B = 8, R = 4, SORTED = Array.from({ length: B }, (_, p) => Array.from({ length: R }, (_, r) => p * R + r + 1));
  const HEAPP = (() => { const a = Array.from({ length: B * R }, (_, x) => x + 1); let s = 7; for (let x = a.length - 1; x > 0; x--) { s = (s * 1103515245 + 12345) % 2147483648; const y = s % (x + 1); [a[x], a[y]] = [a[y], a[x]]; } return Array.from({ length: B }, (_, p) => a.slice(p * R, p * R + R)); })();
  function planHeap(t) { const out = []; for (let p = 0; p < B; p++) { out.push({ p, hit: HEAPP[p].includes(t) }); if (HEAPP[p].includes(t)) break; } return out; }
  function planSorted(t) { const out = []; let lo = 0, hi = B - 1; while (lo <= hi) { const m = (lo + hi) >> 1, pg = SORTED[m]; if (t < pg[0]) { out.push({ p: m, dir: 'left' }); hi = m - 1; } else if (t > pg[R - 1]) { out.push({ p: m, dir: 'right' }); lo = m + 1; } else { out.push({ p: m, hit: true }); break; } } return out; }
  function inPage(pg, t) { let lo = 0, hi = pg.length - 1, c = 0; while (lo <= hi) { const m = (lo + hi) >> 1; c++; if (pg[m] === t) return c; if (pg[m] < t) lo = m + 1; else hi = m - 1; } return c; }
  function SearchCompare({ ar }) {
    const [t, setT] = useState('22'), [n, setN] = useState(-1), [run, setRun] = useState(false);
    const tv = parseInt(t, 10), ok = tv >= 1 && tv <= B * R;
    const H = ok ? planHeap(tv) : [], S = ok ? planSorted(tv) : [], total = Math.max(H.length, S.length);
    useEffect(() => { if (!run) return; if (calm()) { setN(total); setRun(false); return; } if (n >= total) { setRun(false); return; } const id = setTimeout(() => setN(x => x + 1), n < 0 ? 150 : 650); return () => clearTimeout(id); }, [run, n, total]);
    const go = () => { if (!ok) return; setN(0); setRun(true); };
    const hk = Math.min(Math.max(n, 0), H.length), sk = Math.min(Math.max(n, 0), S.length), hDone = n >= H.length, sDone = n >= S.length;
    const sp = S.length && sDone ? SORTED[S[S.length - 1].p] : null, cmp = sp ? inPage(sp, tv) : 0;
    const out = p => { if (!S.slice(0, sk).length) return false; let lo = 0, hi = B - 1; for (const st of S.slice(0, sk)) { if (st.dir === 'left') hi = st.p - 1; else if (st.dir === 'right') lo = st.p + 1; } return !sDone && (p < lo || p > hi); };
    const en = n < 0 ? `A sample file of <b>B = 8 pages</b> with <b>R = 4 records</b> each (keys 1 to 32). Search for one key in the heap file and in the sorted file and count the page reads.`
      : `Heap: <b>${hk}</b> page read(s)${hDone ? ' (linear search; on average 0.5B = 4 pages, so 0.5B(D + RC))' : ''}. Sorted: <b>${sk}</b> page read(s)${sDone ? `, binary search over the pages (at most log₂B = 3), then <b>${cmp}</b> comparison(s) inside the page (log₂R = 2): D·log₂B + C·log₂R` : ''}.`;
    const a = n < 0 ? `ده file تجريبي فيه <b>B = 8 pages</b> وفي كل page <b>R = 4 records</b> (الـ keys من 1 لـ 32). دوّر على key واحد في الـ heap file وفي الـ sorted file وعدّ الـ page reads.`
      : `في الـ heap اتقرت <b>${hk}</b> page${hDone ? '، لأنه linear search وفي المتوسط بيقرا نص الـ pages (<bdi dir="ltr">0.5B&nbsp;=&nbsp;4</bdi>)، يعني <bdi dir="ltr">0.5B(D&nbsp;+&nbsp;RC)</bdi>' : ''}. وفي الـ sorted اتقرت <b>${sk}</b> page${sDone ? `، لأنه binary search على الـ pages (بالكتير <bdi dir="ltr">log₂B&nbsp;=&nbsp;3</bdi>)، وبعدين <b>${cmp}</b> مقارنة جوه الـ page (<bdi dir="ltr">log₂R&nbsp;=&nbsp;2</bdi>)، يعني <bdi dir="ltr">D·log₂B&nbsp;+&nbsp;C·log₂R</bdi>` : ''}.`;
    const lane = (title, pages, plan, k, isSorted) => html`<div className="ff4-lane"><h4>${title}</h4>
      <div className="ff4-pages">${pages.map((pg, p) => { const st = plan.slice(0, k).find(x => x.p === p), last = plan[k - 1] && plan[k - 1].p === p;
        const c = st ? (st.hit ? ' hit' : last ? ' cur' : ' read') : (isSorted && out(p) ? ' out' : '');
        return html`<div key=${p} className=${'ff4-pg' + c}>P${p}<small>${isSorted ? pg[0] + '-' + pg[R - 1] : st ? '✓' : '?'}</small></div>`; })}</div>
      <p className="ff4-in">${k > 0 ? html`page ${plan[k - 1].p}: ${pages[plan[k - 1].p].map((x, j) => x === tv ? html`<b key=${j}>${x} </b>` : x + ' ')}` : ''}</p></div>`;
    return html`<figure className="fig ff4"><div className="fig-stage">
      <div className="ff4-row"><span>Key (1-32)</span><input type="number" min="1" max="32" value=${t} onInput=${e => { setT(e.target.value); setN(-1); setRun(false); }} aria-label="Key to search" />
        <button className="fig-btn solid" onClick=${go} disabled=${run || !ok}>Search</button></div>
      ${lane('Heap file (unordered)', HEAPP, H, hk, false)}
      ${lane('Sorted file (ordered)', SORTED, S, sk, true)}
      <div className="ff4-count"><span>heap page reads: <b>${Math.max(hk, 0)}</b></span><span>sorted page reads: <b>${Math.max(sk, 0)}</b></span></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── §7: the cost comparison table as a calculator ── */
  const OPS = [['scan', 'Scan'], ['eq', 'Equality search'], ['range', 'Range search'], ['ins', 'Insert'], ['del', 'Delete']];
  const fmt = x => (Math.round(x * 100) / 100).toLocaleString('en-US') + ' ms';
  function costs(b, r, d, c, h) {
    const full = b * (d + r * c), lg = x => Math.log2(Math.max(1, x));
    const heapEq = 0.5 * full, sortEq = d * lg(b) + c * lg(r), hashEq = h + d + 0.5 * r * c;
    return {
      scan: [['B(D+RC)', full], ['B(D+RC)', full], ['1.25B(D+RC)', 1.25 * full]],
      eq: [['0.5B(D+RC)', heapEq], ['D·log₂B + C·log₂R', sortEq], ['H + D + 0.5RC', hashEq]],
      range: [['B(D+RC)', full], ['search + retrieve matches', sortEq, '+ matches'], ['1.25B(D+RC)', 1.25 * full]],
      ins: [['2D + C', 2 * d + c], ['search + 2·(0.5B(D+RC))', sortEq + full], ['search + C + D', hashEq + c + d]],
      del: [['search + C + D', heapEq + c + d], ['search + 2·(0.5B(D+RC))', sortEq + full], ['search + C + D', hashEq + c + d]]
    };
  }
  function CostCalc({ ar }) {
    const EX = { B: '100', R: '50', D: '15', C: '0.1', H: '1' };
    const [v, setV] = useState(EX), [op, setOp] = useState('scan');
    const num = k => { const x = parseFloat(v[k]); return isFinite(x) && x >= 0 ? x : 0; };
    const K = costs(num('B'), num('R'), num('D'), num('C'), num('H')), row = K[op];
    const best = row.reduce((m, x, j) => (x[2] ? m : (m < 0 || x[1] < row[m][1] ? j : m)), -1);
    const isEx = Object.keys(EX).every(k => k === 'H' || v[k] === EX[k]);
    const sub = op === 'scan' ? `${num('B')} × (${num('D')} + ${num('R')}×${num('C')})` : '';
    const en = (isEx && op === 'scan' ? `The notes' example: B = 100, R = 50, D = 15 ms, C = 0.1 ms. Heap scan = B(D+RC) = 100 × (15 + 50×0.1) = 100 × 20 = <b>2000 ms</b>. ` : '')
      + `Pick an operation; each card is the notes' formula for that file type. For the hashed file, "search" is the equality search H + D + 0.5RC.`;
    const a = (isEx && op === 'scan' ? 'مثال الـ notes بالقيم دي:' + L('B = 100, R = 50, D = 15 ms, C = 0.1 ms') + 'والـ heap scan بيطلع كده:' + L('B(D+RC) = 100 × (15 + 50×0.1) = 100 × 20 = 2000 ms') : '')
      + 'اختار operation، وكل card فيها الـ formula بتاعة الـ notes لنوع الـ file ده. وفي الـ hashed file، الـ "search" هو الـ equality search، يعني <bdi dir="ltr">H&nbsp;+&nbsp;D&nbsp;+&nbsp;0.5RC</bdi>.';
    return html`<figure className="fig ff4"><div className="fig-stage">
      <div className="ff4-in2">${[['B', 'B pages'], ['R', 'R rec/page'], ['D', 'D ms'], ['C', 'C ms'], ['H', 'H ms (hash)']].map(([k, t]) => html`<label key=${k}>${t}<input type="number" min="0" step="any" value=${v[k]} onInput=${e => setV(o => ({ ...o, [k]: e.target.value }))} /></label>`)}</div>
      <div className="ff4-row"><button className="fig-btn" onClick=${() => setV(EX)}>Example from the notes</button></div>
      <${Modes} list=${OPS} mode=${op} set=${setOp} />
      <div className="ff4-cards">${['Heap file', 'Sorted file', 'Hashed file'].map((t, j) => html`<div key=${t} className=${'ff4-card' + (j === best ? ' best' : '')}>
        <div className="t">${t}</div><div className="f">${row[j][0]}</div><div className="v">${fmt(row[j][1])}${row[j][2] ? ' ' + row[j][2] : ''}</div></div>`)}</div>
      ${op === 'del' && html`<p className="ff4-foot">The exam's model answer writes the hashed-file delete as 1.25B(D+RC) + C + D (it uses the hashed scan cost as its "search"): <b>${fmt(1.25 * num('B') * (num('D') + num('R') * num('C')) + num('C') + num('D'))}</b>.</p>`}
      ${op === 'scan' && html`<p className="ff4-foot">Hashed scan is 1.25B(D+RC) because hash buckets are typically kept about 80% full, so there are 1.25× as many pages. ${sub ? 'B(D+RC) = ' + sub + '.' : ''}</p>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'fp-access-strat': AccessStrat, 'fp-heap-file': HeapFile, 'fp-sorted-insert': SortedInsert, 'fp-search-compare': SearchCompare, 'fp-cost-calc': CostCalc });
})();
/* ── part 5 ── */
// File Processing visuals, part 5: L5 hashing: search time, the notes' hash function step by step, collisions and synonyms, and the hashed-file costs. Every label and caption comes from the site's notes for that lecture.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.ff5 .fig-dots i.on{ background:var(--k-fp); } .ff5 .fig-btn:hover{ border-color:var(--k-fp); } .ff5 .fig-btn.solid{ background:var(--s-fp); color:#fff; border-color:transparent; }
.ff5 .fig-btn[aria-pressed="true"]{ background:var(--s-fp); color:#fff; border-color:transparent; }
.ff5-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.ff5-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.ff5-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 8px; font-size:.86rem; color:var(--ink); }
.ff5-row .fig-btn{ padding:4px 9px; font-size:.84rem; }
.ff5-row input{ font:inherit; font-size:.88rem; padding:3px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.ff5-bars{ max-width:400px; margin:0 auto; display:flex; flex-direction:column; gap:8px; }
.ff5-bar{ font-size:.84rem; color:var(--ink); }
.ff5-bar .lab{ display:flex; justify-content:space-between; gap:8px; margin:0 0 3px; }
.ff5-bar .lab b{ font-family:var(--mono); color:var(--k-fp); }
.ff5-bar .tr{ height:14px; border-radius:99px; background:var(--paper); border:1px solid var(--line); overflow:hidden; }
.ff5-bar .tr i{ display:block; height:100%; background:color-mix(in srgb, var(--k-fp) 70%, var(--paper)); transition:width .7s ease; }
.ff5-bar.best .tr i{ background:var(--ok); }
.ff5-key{ display:grid; grid-template-columns:repeat(6, minmax(0,1fr)); gap:4px; max-width:380px; margin:0 auto; }
.ff5-ch{ border:1.4px solid var(--line); border-radius:7px; background:var(--paper); color:var(--ink); text-align:center; padding:3px 0; font-size:.86rem; line-height:1.25; transition:background .35s, border-color .35s; }
.ff5-ch small{ display:block; font-family:var(--mono); font-size:.76rem; color:var(--graphite); }
.ff5-ch.pad{ color:var(--graphite); border-style:dashed; }
.ff5-ch.on{ border-color:var(--k-fp); background:color-mix(in srgb, var(--k-fp) 16%, var(--paper)); }
.ff5-prods{ max-width:380px; margin:8px auto 0; display:flex; flex-direction:column; gap:3px; font-size:.84rem; color:var(--ink); }
.ff5-prods div{ display:flex; justify-content:space-between; gap:8px; border-bottom:1px dashed var(--line); padding:2px 2px; font-family:var(--mono); font-size:.8rem; }
.ff5-prods div b{ color:var(--k-fp); }
.ff5-res{ max-width:380px; margin:8px auto 0; border:1.4px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 10px; font-size:.86rem; color:var(--ink); line-height:1.55; overflow-wrap:anywhere; }
.ff5-res .m{ font-family:var(--mono); }
.ff5-res b{ color:var(--k-fp); font-family:var(--mono); font-size:1rem; }
.ff5-code{ max-width:380px; margin:8px auto 0; font-family:var(--mono); font-size:.78rem; line-height:1.5; color:var(--graphite); border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 8px; white-space:pre-wrap; overflow-wrap:anywhere; }
.ff5-code span{ display:block; border-radius:4px; padding:0 3px; transition:background .35s, color .35s; }
.ff5-code span.on{ background:color-mix(in srgb, var(--k-fp) 18%, var(--paper)); color:var(--ink); font-weight:700; }
.ff5-buckets{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:4px; max-width:380px; margin:0 auto; }
.ff5-bk{ border:1.4px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-height:52px; padding:3px 2px; text-align:center; font-size:.8rem; transition:background .4s, border-color .4s; overflow-wrap:anywhere; }
.ff5-bk .a{ display:block; font-family:var(--mono); color:var(--graphite); font-size:.76rem; }
.ff5-bk.col{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
.ff5-bk.new{ border-color:var(--k-fp); box-shadow:0 0 0 2px color-mix(in srgb, var(--k-fp) 35%, transparent); }
.ff5-bk span.k{ display:block; font-weight:600; }
.ff5-syn{ text-align:center; font-size:.84rem; margin:8px auto 0; max-width:400px; color:var(--ink); min-height:1.3em; }
.ff5-syn b{ color:var(--pen); }
.ff5-pages{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; max-width:380px; margin:0 auto 6px; }
.ff5-pg{ width:26px; height:34px; border:1.4px solid var(--line); border-radius:4px; background:var(--paper); position:relative; overflow:hidden; }
.ff5-pg i{ position:absolute; left:0; right:0; bottom:0; background:color-mix(in srgb, var(--k-fp) 55%, var(--paper)); transition:height .6s ease; }
.ff5-lbl{ text-align:center; font-size:.84rem; color:var(--ink); margin:0 0 8px; }
.ff5-lbl b{ font-family:var(--mono); color:var(--k-fp); }
.ff5-flow{ display:flex; flex-direction:column; gap:5px; max-width:380px; margin:0 auto; }
.ff5-st{ display:flex; gap:8px; align-items:center; border:1.4px solid var(--line); border-radius:10px; background:var(--paper); color:var(--ink); padding:6px 10px; font-size:.86rem; transition:background .4s, border-color .4s, opacity .4s; opacity:.4; }
.ff5-st b{ font-family:var(--mono); color:var(--k-fp); min-width:3.6em; }
.ff5-st.on{ opacity:1; border-color:var(--k-fp); background:color-mix(in srgb, var(--k-fp) 14%, var(--paper)); }
.ff5-st.done{ opacity:1; }
.ff5-recs{ display:grid; grid-template-columns:repeat(8, minmax(0,1fr)); gap:3px; max-width:300px; margin:8px auto 0; }
.ff5-recs i{ height:20px; border-radius:4px; border:1px solid var(--line); background:var(--paper); transition:background .4s; }
.ff5-recs i.chk{ background:color-mix(in srgb, var(--k-fp) 40%, var(--paper)); }
@media (prefers-reduced-motion: reduce){ .ff5-bar .tr i, .ff5-pg i{ transition:none; } }`;
  if (!document.getElementById('ff5-css')) { const s = document.createElement('style'); s.id = 'ff5-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = t => `<span class="ltr">${t}</span>`;
  const Modes = ({ list, mode, set }) => html`<div className="ff5-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  // the notes' hash function, char by char: key[12] padded with '\0' (code 0) as C does for a shorter string
  const codes = key => Array.from({ length: 12 }, (_, i) => i < key.length ? key.charCodeAt(i) : 0);
  const hashOf = (key, max) => { const c = codes(key); let sum = 0; for (let j = 0; j < 12; j += 2) sum += c[j] * c[j + 1]; const s2 = sum % 19937; return { c, sum, s2, h: s2 % max }; };
  const fmt = n => n.toLocaleString('en-US');

  /* ── §0: search time, simple index O(log N) vs B-tree O(log k N) vs hashing O(1) ── */
  function SearchTime({ ar }) {
    const NS = [1000, 100000, 1000000], [N, setN] = useState(1000000), [k, setK] = useState(100);
    const bin = Math.ceil(Math.log2(N)), bt = Math.ceil(Math.log(N) / Math.log(k)), hs = 1, mx = bin;
    const rows = [['Simple index, binary search', 'O(log N)', bin], ['B-tree', 'O(log k N)', bt], ['Hashing', 'O(1)', hs]];
    const en = `For N = ${fmt(N)} keys: binary search over a simple index takes about <b>${bin}</b> steps (log₂N), a B-tree of order ${k} about <b>${bt}</b> (log k N), and hashing goes straight to the address: <b>1</b>. That is why hashing improves search time.`;
    const a = `لو عندنا N = ${fmt(N)} key، الـ binary search على simple index بياخد حوالي <b>${bin}</b> خطوة (log₂N)، والـ B-tree من order ${k} بياخد حوالي <b>${bt}</b> (log k N)، أما الـ hashing فبيروح على الـ address على طول في <b>خطوة واحدة</b>. وعشان كده الـ hashing بيحسّن وقت البحث.`;
    return html`<figure className="fig ff5"><div className="fig-stage">
      <div className="ff5-row"><span>N =</span>${NS.map(n => html`<button key=${n} className="fig-btn" aria-pressed=${String(N === n)} onClick=${() => setN(n)}>${fmt(n)}</button>`)}</div>
      <div className="ff5-row"><span>B-tree order k =</span>${[10, 100, 500].map(x => html`<button key=${x} className="fig-btn" aria-pressed=${String(k === x)} onClick=${() => setK(x)}>${x}</button>`)}</div>
      <div className="ff5-bars">${rows.map(([t, o, v], j) => html`<div key=${t} className=${'ff5-bar' + (j === 2 ? ' best' : '')}><div className="lab"><span>${t} <span style=${{ color: 'var(--graphite)' }}>${o}</span></span><b>${v}</b></div><div className="tr"><i style=${{ width: Math.max(4, 100 * v / mx) + '%' }}></i></div></div>`)}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── §3: the notes' Hash() function on a key you type ── */
  const CODE = ['int Hash(char key[12], int maxAddress) {', '  int sum = 0;', '  for (int j = 0; j < 12; j = j + 2)', '    sum = sum + key[j] * key[j + 1];', '  sum = sum % 19937;', '  return sum % maxAddress;', '}'];
  function HashFn({ ar }) {
    const [key, setKey] = useState('Ahmed'), [max, setMax] = useState('1000');
    const steps = [{ line: [0] }, { line: [2, 3] }, { line: [4] }, { line: [5] }];
    const [i, ctl] = useSteps(steps.length, 3000);
    const m = Math.max(1, parseInt(max, 10) || 1), H = hashOf(key, m);
    const prods = [0, 2, 4, 6, 8, 10].map(j => [j, H.c[j], H.c[j + 1], H.c[j] * H.c[j + 1]]);
    const chr = (c, j) => j < key.length ? (key[j] === ' ' ? '␣' : key[j]) : '\\0';
    const reset = f => v => { f(v); ctl.go(0); };
    const cap = [
      { en: `Step 1: represent the key numerically. Each character is its <b>ASCII code</b>; <code>key[12]</code> has 12 places, and the places after "${key}" hold \\0 (code 0).`, ar: `الخطوة 1: بنمثّل الـ key كرقم، وكل character بيبقى الـ <b>ASCII code</b> بتاعه. والـ <code>key[12]</code> فيه 12 مكان، والأماكن اللي بعد الـ key فيها <bdi dir="ltr">\\0</bdi> (code 0).` },
      { en: `Step 2: fold and add. Characters are combined <b>in pairs</b> (key[j] × key[j + 1]) and added: sum = <b>${fmt(H.sum)}</b>.`, ar: 'الخطوة 2: بنعمل fold ونجمع. كل 2 characters بيتضربوا في بعض وبنجمع النواتج:' + L(`sum = ${fmt(H.sum)}`) },
      { en: `Divide by the prime <b>19937</b> to keep the sum bounded and prevent overflow: ${fmt(H.sum)} % 19937 = <b>${fmt(H.s2)}</b>.`, ar: 'بنقسم على العدد الـ prime <b>19937</b> عشان الـ sum يفضل محدود ونمنع الـ overflow:' + L(`${fmt(H.sum)} % 19937 = ${fmt(H.s2)}`) },
      { en: `Step 3: divide by the address-space size and use the remainder: ${fmt(H.s2)} % ${fmt(m)} = <b>${fmt(H.h)}</b>, the <b>home address</b> of "${key}".`, ar: 'الخطوة 3: بنقسم على حجم الـ address space وناخد الباقي:' + L(`${fmt(H.s2)} % ${fmt(m)} = ${fmt(H.h)}`) + `وده الـ <b>home address</b> بتاع الـ key.` }
    ][i];
    return html`<figure className="fig ff5"><div className="fig-stage">
      <div className="ff5-row"><span>key</span><input value=${key} maxLength="12" size="12" onInput=${e => reset(setKey)(e.target.value)} aria-label="Key, up to 12 characters" />
        <span>maxAddress</span><input type="number" min="1" value=${max} style=${{ width: '5em' }} onInput=${e => reset(setMax)(e.target.value)} aria-label="maxAddress" /></div>
      <div className="ff5-key" aria-label="The 12 characters of the key with their ASCII codes">${H.c.map((c, j) => html`<div key=${j} className=${'ff5-ch' + (j >= key.length ? ' pad' : '') + (i === 1 ? ' on' : '')}>${chr(c, j)}<small>${c}</small></div>`)}</div>
      ${i >= 1 && html`<div className="ff5-prods">${prods.map(([j, a1, b1, p]) => html`<div key=${j}><span>key[${j}] × key[${j + 1}] = ${a1} × ${b1}</span><b>${fmt(p)}</b></div>`)}</div>`}
      <div className="ff5-res"><span className="m">sum = ${i >= 1 ? fmt(H.sum) : '…'}</span>${i >= 2 && html`<br /><span className="m">sum % 19937 = ${fmt(H.s2)}</span>`}${i >= 3 && html`<br /><span className="m">home address = ${fmt(H.s2)} % ${fmt(m)} = </span><b>${fmt(H.h)}</b>`}</div>
      <div className="ff5-code" aria-hidden="true">${CODE.map((l, j) => html`<span key=${j} className=${steps[i].line.includes(j) ? 'on' : ''}>${l}</span>`)}</div></div>
      <${Cap} ...${cap} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §2: collisions and synonyms: keys hashed into 10 buckets with the same function ── */
  const SAMPLE = ['Ahmed', 'Adam', 'Mona', 'Ali', 'Smith'];
  function Collisions({ ar }) {
    const M = 10, [keys, setKeys] = useState([]), [inp, setInp] = useState('');
    const add = k => { k = k.trim().slice(0, 12); if (!k || keys.includes(k)) return; setKeys(ks => ks.concat([k])); };
    const sample = () => setKeys(SAMPLE.slice());
    const bucket = Array.from({ length: M }, () => []); keys.forEach(k => bucket[hashOf(k, M).h].push(k));
    const last = keys[keys.length - 1], lastAt = last ? hashOf(last, M).h : -1;
    const syn = bucket.map((b, a) => [a, b]).filter(([, b]) => b.length > 1);
    let en, a;
    if (!keys.length) { en = 'Hash keys into <b>10 addresses</b> (0 to 9) with the notes\' function. Press <b>Add sample keys</b> or type your own.'; a = 'هنعمل hash للـ keys في <b>10 addresses</b> (من 0 لـ 9) بنفس الـ function بتاعة الـ notes. دوس <b>Add sample keys</b> أو اكتب keys من عندك.'; }
    else if (syn.length) { en = `<b>Collision</b>: two different keys were transformed into the same address. Keys that collide are called <b>synonyms</b>: ${syn.map(([ad, b]) => b.join(' and ') + ' (address ' + ad + ')').join('; ')}. A bucket can hold one or more records.`; a = 'حصل <b>collision</b>: يعني 2 keys مختلفين اتحوّلوا لـ نفس الـ address. والـ keys اللي بيحصل بينهم collision اسمهم <b>synonyms</b>:' + L(syn.map(([ad, b]) => b.join(' and ') + ' (address ' + ad + ')').join('; ')) + 'والـ bucket يقدر يشيل record واحد أو أكتر.'; }
    else { en = `"${last}" goes to address <b>${lastAt}</b>. No collision yet: every key has its own address.`; a = `الـ key ده راح للـ address رقم <b>${lastAt}</b>. لسه مفيش collision، وكل key ليه address لوحده.`; }
    return html`<figure className="fig ff5"><div className="fig-stage">
      <div className="ff5-row"><input value=${inp} maxLength="12" size="10" placeholder="key" onInput=${e => setInp(e.target.value)} onKeyDown=${e => { if (e.key === 'Enter') { add(inp); setInp(''); } }} aria-label="Key to hash" />
        <button className="fig-btn solid" onClick=${() => { add(inp); setInp(''); }}>Hash it</button><button className="fig-btn" onClick=${sample}>Add sample keys</button><button className="fig-btn" onClick=${() => setKeys([])}>↻</button></div>
      <div className="ff5-buckets" role="list" aria-label="Ten addresses and the keys in each">${bucket.map((b, ad) => html`<div key=${ad} role="listitem" className=${'ff5-bk' + (b.length > 1 ? ' col' : '') + (ad === lastAt ? ' new' : '')}><span className="a">${ad}</span>${b.map(k => html`<span key=${k} className="k">${k}</span>`)}</div>`)}</div>
      <p className="ff5-syn">${syn.length ? html`<b>Synonyms:</b> ${syn.map(([, b]) => b.join(', ')).join(' | ')}` : keys.length ? `${keys.length} key(s), no collision` : ''}</p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── §4: hashed-file costs: scan 1.25B (buckets ~80% full) and equality search H + D + 0.5RC ── */
  const EQ = [
    { en: '<b>Equality search</b> in a hashed file, step 1: compute the hash of the key: <b>H</b>.', ar: 'الـ <b>equality search</b> في الـ hashed file، الخطوة 1: بنحسب الـ hash بتاع الـ key، وده <b>H</b>.', s: 0 },
    { en: 'Step 2: read the one bucket page at that address: <b>D</b>.', ar: 'الخطوة 2: بنقرا الـ bucket page الوحيدة اللي عند الـ address ده، وده <b>D</b>.', s: 1 },
    { en: 'Step 3: on average check half of the R records on the page: <b>0.5RC</b>.', ar: 'الخطوة 3: في المتوسط بنشيّك على نص الـ R records اللي في الـ page، وده <b>0.5RC</b>.', s: 2 },
    { en: 'Total: <b>H + D + 0.5RC</b>. Insert and delete are <b>search + C + D</b>; range search is 1.25B(D + RC), because hashing does not keep order, so everything is scanned.', ar: 'الإجمالي:' + L('H + D + 0.5RC') + 'والـ insert والـ delete تكلفتهم <b>search + C + D</b>. أما الـ range search فتكلفته <bdi dir="ltr">1.25B(D&nbsp;+&nbsp;RC)</bdi>، لأن الـ hashing مش بيحافظ على الترتيب، فلازم نعمل scan لكل حاجة.', s: 3 }
  ];
  function HashCosts({ ar }) {
    const [mode, setMode0] = useState('scan'), [b, setB] = useState(8);
    const [i, ctl] = useSteps(EQ.length, 2800), s = EQ[i];
    const setMode = m => { setMode0(m); if (m === 'eq') { ctl.go(0); if (!calm()) setTimeout(ctl.replay, 0); } };
    const pages = Math.round(b * 1.25);
    const en = mode === 'scan' ? `<b>Scan</b>: the records fill <b>B = ${b}</b> pages. Hash buckets are typically kept about <b>80% full</b>, so the same records occupy ${b} / 0.8 = <b>${pages}</b> pages, 1.25 times as many: scan cost <b>1.25B(D + RC)</b>.` : s.en;
    const a = mode === 'scan' ? `الـ <b>Scan</b>: الـ records بتملا <b>B = ${b}</b> pages. والـ hash buckets عادةً بتتساب مليانة حوالي <b>80%</b>، فنفس الـ records بتاخد pages أكتر بـ 1.25 مرة:` + L(`${b} / 0.8 = ${pages} pages, scan = 1.25B(D + RC)`) : s.ar;
    return html`<figure className="fig ff5"><div className="fig-stage">
      <${Modes} list=${[['scan', 'Scan'], ['eq', 'Equality search']]} mode=${mode} set=${setMode} />
      ${mode === 'scan' ? html`
        <div className="ff5-row"><span>B =</span>${[4, 8, 12, 16].map(x => html`<button key=${x} className="fig-btn" aria-pressed=${String(b === x)} onClick=${() => setB(x)}>${x}</button>`)}</div>
        <p className="ff5-lbl">Pages full: <b>${b}</b></p>
        <div className="ff5-pages">${Array.from({ length: b }, (_, k) => html`<div key=${'f' + k} className="ff5-pg"><i style=${{ height: '100%' }}></i></div>`)}</div>
        <p className="ff5-lbl">Buckets about 80% full: <b>${pages}</b> = 1.25 × ${b}</p>
        <div className="ff5-pages">${Array.from({ length: pages }, (_, k) => html`<div key=${'h' + k} className="ff5-pg"><i style=${{ height: '80%' }}></i></div>`)}</div>`
      : html`
        <div className="ff5-flow">${[['H', 'compute h(key) → address'], ['D', 'read that bucket page'], ['0.5RC', 'check half the records on average']].map(([f, t], k) => html`<div key=${f} className=${'ff5-st' + (s.s === k ? ' on' : s.s > k ? ' done' : '')}><b>${f}</b><span>${t}</span></div>`)}</div>
        <div className="ff5-recs" aria-label="The R records of the bucket page">${Array.from({ length: 8 }, (_, k) => html`<i key=${k} className=${s.s >= 2 && k < 4 ? 'chk' : ''}></i>`)}</div>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />${mode === 'eq' && html`<${Bar} steps=${EQ} i=${i} ctl=${ctl} />`}</figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'fp-search-time': SearchTime, 'fp-hash-fn': HashFn, 'fp-collisions': Collisions, 'fp-hash-costs': HashCosts });
})();

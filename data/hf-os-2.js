// Head First chapter for Operating Systems Lecture 2 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Processes and Interprocess Communication. Every fact comes from the lecture's notes; analogies and jokes are marked as ours.
// Every fork() count and output on these pages was traced by hand twice.
// lectures: [2]
(function () {
  const H = window.HF; H.chapters.os = H.chapters.os || {};
  const { html } = H.K;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';

  if (!document.getElementById('hf-css-os2')) {
    const s = document.createElement('style'); s.id = 'hf-css-os2';
    s.textContent = `
.hfb .hf-os2-vs{ display:grid; grid-template-columns:1fr 1fr; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-os2-vs > span{ font:500 13.5px/1.28 var(--body); padding:4px 7px; border-bottom:1px dotted var(--line); color:var(--ink); }
.hfb .hf-os2-vs > span:nth-child(odd){ border-right:1.5px solid var(--hf-line); }
.hfb .hf-os2-vs > span.hf-os2-h{ font-weight:800; background:var(--hf-grey); border-bottom:1.5px solid var(--hf-line); }
.hfb .hf-os2-vs > span.hf-os2-l{ border-bottom:0; }
.hfb .hf-os2-sg{ border:2px solid var(--hf-line); border-radius:8px; overflow:hidden; background:var(--paper); }
.hfb .hf-os2-mis{ margin:0; padding:7px 10px; font:600 14px/1.3 var(--body); background:var(--hf-grey); color:var(--ink); }
.hfb .hf-os2-mis b{ color:var(--hf-k); }
.hfb .hf-os2-sts{ display:flex; flex-wrap:wrap; justify-content:center; gap:5px; padding:9px 8px 4px; }
.hfb .hf-os2-sts span{ font:700 13.5px/1 var(--mono); padding:6px 8px; border-radius:999px; border:1.5px solid var(--faint); color:var(--graphite); transition:background .3s, color .3s; }
.hfb .hf-os2-sts span.hf-os2-on{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-os2-path{ margin:2px 0 6px; text-align:center; font:600 13px/1.3 var(--mono); color:var(--graphite); padding:0 6px; }
.hfb .hf-os2-evs{ display:grid; grid-template-columns:1fr 1fr; gap:5px; padding:0 8px; }
.hfb .hf-os2-evs button{ font:600 13px/1.15 var(--body); min-height:36px; padding:4px 6px; border-radius:6px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-os2-msg{ margin:8px 8px 0; min-height:62px; font:500 14px/1.36 var(--body); padding:6px 9px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 8%, var(--paper)); color:var(--ink); }
.hfb .hf-os2-msg.hf-os2-bad{ border-left-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 8%, var(--paper)); }
.hfb .hf-os2-bar{ display:flex; align-items:center; gap:8px; padding:8px; }
.hfb .hf-os2-bar .grow{ flex:1; }
.hfb .hf-os2-tabs{ display:grid; grid-template-columns:repeat(3, 1fr); gap:4px; }
.hfb .hf-os2-tabs.hf-os2-t4{ grid-template-columns:repeat(4, 1fr); }
.hfb .hf-os2-tabs button{ font:700 13px/1.1 var(--body); min-height:38px; padding:3px 2px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-os2-tabs button small{ display:block; font-weight:500; font-size:13px; }
.hfb .hf-os2-tabs button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-os2-tabs button.hf-os2-ok::after{ content:" ✓"; color:var(--ok); }
.hfb .hf-os2-tabs button[aria-pressed="true"].hf-os2-ok::after{ color:var(--paper); }
.hfb .hf-os2-card{ display:grid; grid-template-columns:auto 1fr; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; margin-top:6px; animation:hf-up .4s both; }
.hfb .hf-os2-card > span{ font:500 14px/1.32 var(--body); padding:6px 8px; border-bottom:1px dotted var(--line); color:var(--ink); }
.hfb .hf-os2-card > span.hf-os2-k{ font-weight:800; background:var(--hf-grey); font-size:13px; }
.hfb .hf-os2-card > span.hf-os2-l{ border-bottom:0; }
.hfb .hf-os2-tree{ margin:0; font:600 14px/1.45 var(--mono); white-space:pre; color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:6px 10px; }
.hfb .hf-os2-tree b{ color:var(--hf-k); }
.hfb .hf-os2-fk{ display:grid; gap:7px; }
.hfb .hf-os2-fk pre{ margin:0; font:600 13.5px/1.42 var(--mono); white-space:pre; color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:6px 9px; min-height:88px; }
.hfb .hf-os2-cnt{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-os2-cell{ border:1.5px solid var(--hf-line); border-radius:7px; padding:5px 4px 6px; display:grid; justify-items:center; gap:3px; background:var(--paper); }
.hfb .hf-os2-cell.hf-os2-ok{ border-color:var(--ok); box-shadow:0 0 0 2px color-mix(in srgb, var(--ok) 35%, transparent); }
.hfb .hf-os2-cell.hf-os2-no{ border-color:var(--hf-red); box-shadow:0 0 0 2px color-mix(in srgb, var(--hf-red) 30%, transparent); }
.hfb .hf-os2-cell .hf-os2-nm{ font:600 13px/1.15 var(--body); color:var(--graphite); text-align:center; }
.hfb .hf-os2-cell .hf-os2-row{ display:flex; align-items:center; gap:10px; }
.hfb .hf-os2-cell .hf-os2-val{ font:800 24px/1 var(--mono); color:var(--ink); min-width:26px; text-align:center; }
.hfb .hf-os2-cell button{ width:32px; height:30px; padding:0; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); font:700 17px/1 var(--body); cursor:pointer; }
.hfb .hf-os2-exp{ margin:0; font:500 13.5px/1.34 var(--body); padding:5px 9px; border-left:3px solid var(--hf-k); color:var(--ink); }
.hfb .hf-os2-exp code{ font-family:var(--mono); font-size:.88em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-os2-rb{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; background:var(--paper); display:grid; gap:7px; }
.hfb .hf-os2-slots{ display:grid; grid-template-columns:repeat(5, 1fr); gap:5px; }
.hfb .hf-os2-slot{ display:grid; justify-items:center; gap:2px; }
.hfb .hf-os2-slot .hf-os2-bx{ width:100%; height:42px; border:1.5px solid var(--hf-line); border-radius:6px; display:grid; place-items:center; font:800 18px/1 var(--mono); color:var(--ink); background:var(--paper); transition:background .3s; }
.hfb .hf-os2-slot .hf-os2-bx.hf-os2-full{ background:color-mix(in srgb, var(--hf-k) 18%, var(--paper)); }
.hfb .hf-os2-slot .hf-os2-ix{ font:600 13px/1 var(--mono); color:var(--graphite); }
.hfb .hf-os2-slot .hf-os2-mk{ font:800 13px/1.1 var(--mono); min-height:30px; text-align:center; }
.hfb .hf-os2-slot .hf-os2-mk .i{ color:var(--hf-k); display:block; } .hfb .hf-os2-slot .hf-os2-mk .o{ color:var(--hf-red); display:block; }
.hfb .hf-os2-rmsg{ margin:0; min-height:58px; font:500 13.5px/1.34 var(--body); padding:5px 8px; border-left:3px solid var(--hf-k); background:var(--hf-grey); color:var(--ink); }
.hfb .hf-os2-rmsg code{ font-family:var(--mono); font-size:.9em; }
.hfb .hf-os2-ol{ list-style:none; margin:0; padding:0; display:grid; gap:4px; }
.hfb .hf-os2-ol li{ display:flex; gap:8px; align-items:baseline; margin:0; }
.hfb .hf-os2-n{ flex:none; display:inline-grid; place-items:center; width:21px; height:21px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 13px/1 var(--body); transform:translateY(3px); }
.hfb .hf-os2-cn{ font:600 14px/1 var(--body); color:var(--graphite); }
.hfb .hf-os2-cn b{ font:800 18px/1 var(--mono); color:var(--hf-k); }
.hfb.hf-ar .hf-os2-cn{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-os2-ipc{ display:block; width:100%; height:auto; color:var(--ink); }
.hfb .hf-os2-ipc text{ font:600 13px var(--body); fill:currentColor; }
.hfb .hf-os2-ipc .k{ fill:var(--hf-k); font-weight:800; }
.hfb .hf-os2-two{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-os2-two > div{ border:1.5px solid var(--hf-line); border-radius:6px; padding:6px 8px; }
.hfb .hf-os2-two h5{ margin:0 0 4px; font:800 14px/1.1 var(--body); color:var(--hf-k); }
.hfb .hf-os2-two p{ margin:0 0 3px; font:500 13.5px/1.3 var(--body); color:var(--ink); }
.hfb .hf-os2-two code{ font-family:var(--mono); font-size:.88em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-os2-code .hf-code{ font-size:13px; line-height:1.42; padding:5px 8px; }
.hfb .hf-os2-code .hf-code > div{ min-height:1.42em; }
.hfb .hf-os2-code .hf-code .c{ font-size:17px; }
.hfb.hf-ar .hf-os2-vs > span, .hfb.hf-ar .hf-os2-mis, .hfb.hf-ar .hf-os2-msg, .hfb.hf-ar .hf-os2-card > span, .hfb.hf-ar .hf-os2-tabs button, .hfb.hf-ar .hf-os2-exp, .hfb.hf-ar .hf-os2-rmsg, .hfb.hf-ar .hf-os2-cell .hf-os2-nm, .hfb.hf-ar .hf-os2-two h5, .hfb.hf-ar .hf-os2-two p, .hfb.hf-ar .hf-os2-ipc text{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb.hf-ar .hf-os2-vs > span, .hfb.hf-ar .hf-os2-card > span, .hfb.hf-ar .hf-os2-two p{ font-size:13px; line-height:1.45; }
.hfb.hf-ar .hf-os2-msg, .hfb.hf-ar .hf-os2-exp, .hfb.hf-ar .hf-os2-rmsg{ font-size:13.5px; line-height:1.5; border-left:0; border-right:3px solid var(--ok); }
.hfb.hf-ar .hf-os2-msg.hf-os2-bad{ border-right-color:var(--hf-red); }
.hfb.hf-ar .hf-os2-exp, .hfb.hf-ar .hf-os2-rmsg{ border-right-color:var(--hf-k); }
.hfb.hf-ar .hf-os2-vs > span:nth-child(odd){ border-right:0; border-left:1.5px solid var(--hf-line); }
.hfb.hf-ar .hf-os2-tree, .hfb.hf-ar .hf-os2-fk pre{ direction:ltr; text-align:left; }
.hfb.hf-ar .hf-os2-mis{ line-height:1.5; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-os2-card{ animation:none; } .hfb .hf-os2-sts span, .hfb .hf-os2-slot .hf-os2-bx{ transition:none; } }
`;
    document.head.appendChild(s);
  }

  /* ── Move the process: pick the event, illegal moves are explained ── */
  const SG_ST = ['new', 'ready', 'running', 'waiting', 'terminated'];
  const SG_EV = [['admitted', 'new', 'ready'], ['scheduler dispatch', 'ready', 'running'], ['interrupt', 'running', 'ready'], ['I/O or event wait', 'running', 'waiting'], ['I/O or event completion', 'waiting', 'ready'], ['exit', 'running', 'terminated']];
  const SG_MIS = [
    [['new', 'ready', 'running'], 'Create a process and get it onto the CPU.', 'اعمل process جديدة ووصّلها للـ CPU.'],
    [['running', 'waiting', 'ready', 'running'], 'It asks for the disk, the disk finishes, and it gets the CPU back.', 'طلبت الـ disk، والـ disk خلّص، ورجعت تاخد الـ CPU.'],
    [['running', 'ready', 'running', 'terminated'], 'Its time slice runs out; later it runs again and finishes.', 'الـ time slice بتاعتها خلصت، وبعدين رجعت اشتغلت وخلّصت خالص.']
  ];
  function sgWhy(ev, cur, ar) {
    const E = (en, a) => ar ? a : en;
    if (cur === 'terminated') return E('The process has finished execution. No arrow leaves <b>terminated</b>: press <b>New process</b>.', 'الـ process خلصت تنفيذ. مفيش ولا سهم بيطلع من الـ <b>terminated</b>، فدوس <b>New process</b>.');
    if (ev === 'admitted') return E('Only a <b>new</b> process is admitted (new → ready). This one was admitted already.', 'الـ admitted بتحصل للـ process الـ <b>new</b> بس، ودي اتعملها admit خلاص.');
    if (ev === 'scheduler dispatch') {
      if (cur === 'waiting') return E('There is <b>no waiting → running arrow</b>! The process is waiting for an event, not for the CPU. Its I/O must complete first; then it goes to <b>ready</b> and waits to be dispatched.', 'مفيش سهم <b>من waiting لـ running</b>! الـ process مستنية event، مش مستنية الـ CPU. لازم الـ I/O يخلص الأول، فتروح <b>ready</b> وتستنى الـ dispatch.');
      if (cur === 'new') return E('Not yet: the scheduler dispatches only <b>ready</b> processes. Admit it first.', 'لسه بدري: الـ scheduler بيعمل dispatch للـ processes الـ <b>ready</b> بس. اعملها admit الأول.');
      return E('It is already running.', 'هي شغالة أصلًا.');
    }
    if (ev === 'interrupt') return E('Only the <b>running</b> process can be interrupted off the CPU: that arrow goes running → ready.', 'الـ interrupt بيشيل الـ process الـ <b>running</b> بس من على الـ CPU، والسهم ده من running لـ ready.');
    if (ev === 'I/O or event wait') {
      if (cur === 'waiting') return E('It is already waiting.', 'هي مستنية أصلًا.');
      if (cur === 'ready') return E('There is <b>no ready → waiting arrow</b>. A ready process is not executing, so it cannot ask for I/O. Only running → waiting carries this label.', 'مفيش سهم <b>من ready لـ waiting</b>. الـ process الـ ready مش بتتنفذ، فمش هتطلب I/O. السهم ده بيطلع من running بس.');
      return E('Only running → waiting carries this label. Get the process running first.', 'السهم ده بيطلع من running بس. شغّل الـ process الأول.');
    }
    if (ev === 'I/O or event completion') return E('Nothing to complete: only a <b>waiting</b> process gets this event, and it goes to <b>ready</b>, never straight to running.', 'مفيش حاجة تخلص: ده بيحصل للـ process الـ <b>waiting</b> بس، وبتروح <b>ready</b>، عمرها ما تروح running على طول.');
    return E('A process exits after executing its <b>last statement</b>, so it must be <b>running</b>: the exit arrow leaves running only.', 'الـ process بتعمل exit بعد ما تنفذ <b>آخر statement</b>، يعني لازم تبقى <b>running</b>. سهم الـ exit بيطلع من running بس.');
  }
  function StateGame() {
    const ar = useAr();
    const E = (en, a) => ar ? a : en;
    const [g, setG] = H.K.useSlot('sg', { cur: 'new', seq: ['new'], path: ['new'], m: 0, last: null });
    const done = g.m >= SG_MIS.length;
    const press = ([k, from, to]) => {
      if (g.cur !== from) { setG(Object.assign({}, g, { last: { bad: true, ev: k, cur: g.cur } })); return; }
      let seq = g.seq.concat(to), m = g.m, hit = false;
      if (m < SG_MIS.length) { const p = SG_MIS[m][0]; if (seq.length >= p.length && p.every((x, j) => seq[seq.length - p.length + j] === x)) { m++; hit = true; seq = [to]; } }
      setG({ cur: to, seq, path: g.path.concat(to).slice(-6), m, last: { ev: k, to, hit } });
    };
    const reset = () => setG({ cur: 'new', seq: ['new'], path: ['new'], m: done ? 0 : g.m, last: null });
    const L = g.last;
    const msg = !L ? E('The process is <b>new</b>: being created. Press the event that moves it.', 'الـ process دلوقتي <b>new</b>، يعني بتتعمل. دوس على الـ event اللي هيحرّكها.')
      : L.bad ? sgWhy(L.ev, L.cur, ar)
      : (ar ? 'حصل <bdi dir="ltr">' + L.ev + '</bdi>، فالـ process بقت <b>' + L.to + '</b>.' : '<b>' + L.ev + '</b>: the process is now <b>' + L.to + '</b>.') + (L.hit ? E(' Mission done!', ' المهمة خلصت!') : '');
    return html`<div className="hf-os2-sg hf-in">
      <p className="hf-os2-mis">${done ? E('All three missions done! Press New process to play again.', 'خلّصت التلات مهمات! دوس New process عشان تلعب تاني.')
        : html`<b>${E('Mission ' + (g.m + 1) + ' of 3: ', 'المهمة ' + (g.m + 1) + ' من 3: ')}</b>${E(SG_MIS[g.m][1], SG_MIS[g.m][2])}`}</p>
      <div className="hf-os2-sts" dir="ltr">${SG_ST.map(x => html`<span key=${x} className=${x === g.cur ? 'hf-os2-on' : ''}>${x}</span>`)}</div>
      <p className="hf-os2-path" dir="ltr">${g.path.join(' → ')}</p>
      <div className="hf-os2-evs" dir="ltr" role="group" aria-label="Events">${SG_EV.map(e => html`<button key=${e[0]} onClick=${() => press(e)}>${e[0]}</button>`)}</div>
      <p className=${'hf-os2-msg' + (L && L.bad ? ' hf-os2-bad' : '')} key=${JSON.stringify(L)}>${H.K.T(msg)}</p>
      <div className="hf-os2-bar"><button className="hf-btn" onClick=${reset}>↻ New process</button><span className="grow"></span>
        <span className="hf-dots">${SG_MIS.map((_, j) => html`<i key=${j} className=${j < g.m ? 'on' : ''}></i>`)}</span></div>
    </div>`;
  }

  /* ── the three schedulers, one card at a time ── */
  const SCH = [
    ['Long-term', 'job scheduler', [
      ['Role', 'الدور', 'Selects which processes are brought into the <b>ready queue</b>.', 'بيختار أنهي processes تدخل الـ <b>ready queue</b>.'],
      ['How often', 'بيشتغل قد إيه', 'Infrequent (seconds, minutes), so it may be slow.', 'مش كتير (كل كام ثانية أو دقيقة)، فعادي يبقى بطيء.'],
      ['Controls', 'بيتحكم في', 'The <b>degree of multiprogramming</b>.', 'الـ <b>degree of multiprogramming</b>.'],
      ['Note', 'ملاحظة', 'Should pick a good mix of I/O-bound and CPU-bound processes.', 'لازم يختار خليط كويس من الـ <bdi dir="ltr">I/O-bound</bdi> والـ CPU-bound.']]],
    ['Short-term', 'CPU scheduler', [
      ['Role', 'الدور', 'Selects which ready process runs next and allocates the CPU.', 'بيختار أنهي process من الـ ready تشتغل بعد كده، ويديها الـ CPU.'],
      ['How often', 'بيشتغل قد إيه', 'Very frequent (milliseconds), so it must be fast.', 'كتير جدًا (كل كام millisecond)، فلازم يبقى سريع.'],
      ['Controls', 'بيتحكم في', 'Which process gets the CPU.', 'مين ياخد الـ CPU.'],
      ['Note', 'ملاحظة', 'Sometimes the only scheduler in a system.', 'ساعات بيبقى الـ scheduler الوحيد في السيستم.']]],
    ['Medium-term', 'swapping', [
      ['Role', 'الدور', 'Removes processes from memory to disk and brings them back in later (<b>swapping</b>).', 'بيشيل processes من الـ memory للـ disk ويرجّعها بعدين، وده الـ <b>swapping</b>.'],
      ['How often', 'بيشتغل قد إيه', 'As needed.', 'وقت ما يحتاج.'],
      ['Controls', 'بيتحكم في', '<b>Decreases</b> the degree of multiprogramming.', 'بـ<b>يقلّل</b> الـ degree of multiprogramming.'],
      ['Note', 'ملاحظة', 'Added when the degree of multiprogramming must decrease.', 'بيتضاف لما الـ degree of multiprogramming محتاجة تقل.']]]
  ];
  function Schedulers() {
    const ar = useAr();
    const [i, setI] = H.K.useSlot('sch', 0);
    const rows = SCH[i][2];
    return html`<div className="hf-in">
      <div className="hf-os2-tabs" dir="ltr" role="group" aria-label="Scheduler">${SCH.map((x, j) => html`<button key=${j} aria-pressed=${String(j === i)} onClick=${() => setI(j)}>${x[0]}<small>${x[1]}</small></button>`)}</div>
      <div className="hf-os2-card" key=${i}>${rows.map((r, j) => { const l = j === rows.length - 1 ? ' hf-os2-l' : ''; return html`<${React.Fragment} key=${j}><span className=${'hf-os2-k' + l}>${ar ? r[1] : r[0]}</span><span className=${l.trim()}>${H.K.T(ar ? r[3] : r[2])}</span></${React.Fragment}>`; })}</div>
    </div>`;
  }

  /* ── the Linux tree of processes from the slides ── */
  function ProcTree() {
    const lines = [['init', ' (pid 1)'], ['├─ login'], ['│   └─ bash'], ['│       ├─ ps'], ['│       └─ emacs'], ['├─ kthreadd'], ['└─ sshd']];
    return html`<pre className="hf-os2-tree hf-in" dir="ltr" aria-label="Tree of processes">${lines.map((l, j) => html`<${React.Fragment} key=${j}>${j ? '\n' : ''}${j === 0 ? html`<b>${l[0]}</b>${l[1]}` : l[0]}</${React.Fragment}>`)}</pre>`;
  }

  /* ── Be the fork() counter: four small programs; how many processes, how many prints ──
     (traced by hand twice; no fork() fails, exec() succeeds)
     a: fork; fork; print   → 1→2→4 processes, 4 prints
     b: fork ×3; print      → 1→2→4→8, 8 prints
     c: if (fork()==0) fork(); print → parent skips (gets PID), child forks a grandchild: 3 processes, 3 prints
     d: if (fork()==0) { execlp(ls); printf(oops) } → 2 processes, exec replaces the child's code: oops 0 times */
  const FK = [
    { code: ['fork();', 'fork();', 'printf("hi\\n");'], w: 'hi', ans: [4, 4],
      en: 'The first <code>fork()</code> turns 1 process into 2. <b>Both</b> run the second one: 2 → 4. All 4 reach the printf.',
      ar: 'أول <code>fork()</code> بتخلّي الـ process الواحدة اتنين. <b>الاتنين</b> بينفذوا التانية فيبقوا 4. والأربعة بيوصلوا للـ printf.' },
    { code: ['fork();', 'fork();', 'fork();', 'printf("hi\\n");'], w: 'hi', ans: [8, 8],
      en: 'Each <code>fork()</code> is run by every process alive at that moment, so the count doubles: 1 → 2 → 4 → 8.',
      ar: 'كل <code>fork()</code> بتتنفذ في كل process موجودة ساعتها، فالعدد بيتضاعف كل مرة لحد ما يوصل 8.' },
    { code: ['if (fork() == 0)', '    fork();', 'printf("x\\n");'], w: 'x', ans: [3, 3],
      en: 'The parent gets the child\'s PID (not 0), so it skips the if. Only the child, which got 0, runs the second <code>fork()</code>. Parent + child + grandchild = 3, and all three print.',
      ar: 'الـ parent بياخد الـ PID بتاع الـ child (مش 0) فبيعدّي الـ if. الـ child بس (اللي أخد 0) بينفذ <code>fork()</code> التانية. يعني parent وchild وgrandchild، تلاتة، والتلاتة بيطبعوا.' },
    { code: ['if (fork() == 0) {', '    execlp("/bin/ls","ls",NULL);', '    printf("oops\\n");', '}'], w: 'oops', ans: [2, 0],
      en: '<code>fork()</code> makes 2 processes. <code>exec()</code> creates <b>none</b>: it replaces the child\'s memory space with the ls program, so the child\'s old code, printf included, is gone.',
      ar: 'الـ <code>fork()</code> عملت 2 processes، والـ <code>exec()</code> <b>ماعملتش ولا واحدة</b>: هي استبدلت الـ memory space بتاع الـ child ببرنامج ls، فالكود القديم بتاعه، ومعاه الـ printf، راح خلاص.' }
  ];
  function ForkLab() {
    const ar = useAr();
    const [m, setM] = H.K.useSlot('fk:m', 0);
    const [v, setV] = H.K.useSlot('fk:v', {});
    const [ck, setCk] = H.K.useSlot('fk:c', {});
    const P = FK[m], cur = v[m] || [1, 1], checked = !!ck[m];
    const allOk = k => !!ck[k] && (v[k] || [1, 1]).every((x, j) => x === FK[k].ans[j]);
    const bump = (j, d) => { const n = cur.slice(); n[j] = Math.max(0, Math.min(12, n[j] + d)); setV(Object.assign({}, v, { [m]: n })); setCk(Object.assign({}, ck, { [m]: false })); };
    const right = cur.filter((x, j) => x === P.ans[j]).length;
    const labs = ar ? ['عدد الـ processes كلها', 'كام مرة اتطبع <bdi dir="ltr">' + P.w + '</bdi>'] : ['processes in total', 'times "' + P.w + '" is printed'];
    return html`<div className="hf-os2-fk hf-in">
      <div className="hf-os2-tabs hf-os2-t4" dir="ltr" role="group" aria-label="Program">${FK.map((_, k) => html`<button key=${k} aria-pressed=${String(k === m)} className=${allOk(k) ? 'hf-os2-ok' : ''} onClick=${() => setM(k)}>${String.fromCharCode(65 + k)}</button>`)}</div>
      <pre dir="ltr">${P.code.join('\n')}</pre>
      <div className="hf-os2-cnt">${cur.map((x, j) => html`<div key=${j} className=${'hf-os2-cell' + (checked ? (x === P.ans[j] ? ' hf-os2-ok' : ' hf-os2-no') : '')}>
        <span className="hf-os2-nm">${H.K.T(labs[j])}</span>
        <span className="hf-os2-row" dir="ltr"><button aria-label="less" onClick=${() => bump(j, -1)}>−</button><span className="hf-os2-val">${x}</span><button aria-label="more" onClick=${() => bump(j, 1)}>+</button></span></div>`)}</div>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setCk(Object.assign({}, ck, { [m]: true }))}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setV(Object.assign({}, v, { [m]: P.ans.slice() })); setCk(Object.assign({}, ck, { [m]: true })); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${checked && html`<span className="hf-score">${ar ? html`<bdi>${right} / 2</bdi> صح` : right + ' / 2 right'}</span>`}
      </div>
      ${checked && html`<p className="hf-os2-exp hf-in">${H.K.T(ar ? P.ar : P.en)}</p>`}
    </div>`;
  }

  /* ── the lecture's bounded buffer, live: BUFFER_SIZE = 5 ── */
  const RB_N = 5;
  function Ring() {
    const ar = useAr();
    const E = (en, a) => ar ? a : en;
    const [s, setS] = H.K.useSlot('rb', { buf: [null, null, null, null, null], inn: 0, out: 0, next: 1, last: null });
    const full = (s.inn + 1) % RB_N === s.out, empty = s.inn === s.out;
    const produce = () => {
      if (full) { setS(Object.assign({}, s, { last: { k: 'full', inn: s.inn, out: s.out } })); return; }
      const buf = s.buf.slice(); buf[s.inn] = s.next;
      setS({ buf, inn: (s.inn + 1) % RB_N, out: s.out, next: s.next + 1, last: { k: 'p', it: s.next, at: s.inn, now: (s.inn + 1) % RB_N } });
    };
    const consume = () => {
      if (empty) { setS(Object.assign({}, s, { last: { k: 'empty', inn: s.inn } })); return; }
      const buf = s.buf.slice(), it = buf[s.out]; buf[s.out] = null;
      setS({ buf, inn: s.inn, out: (s.out + 1) % RB_N, next: s.next, last: { k: 'c', it, at: s.out, now: (s.out + 1) % RB_N } });
    };
    const n = (s.inn - s.out + RB_N) % RB_N, L = s.last;
    const msg = !L ? E('Press <b>Produce</b> and <b>Consume</b>. Can you fill all 5 slots?', 'دوس <b>Produce</b> و<b>Consume</b>. تقدر تملا الـ 5 خانات كلهم؟')
      : L.k === 'p' ? E('Item ' + L.it + ' went into <code>buffer[' + L.at + ']</code>; now <code>in = ' + L.now + '</code>.', 'العنصر ' + L.it + ' دخل <code>buffer[' + L.at + ']</code>، ودلوقتي <code>in = ' + L.now + '</code>.')
      : L.k === 'c' ? E('Took item ' + L.it + ' from <code>buffer[' + L.at + ']</code>; now <code>out = ' + L.now + '</code>.', 'خدنا العنصر ' + L.it + ' من <code>buffer[' + L.at + ']</code>، ودلوقتي <code>out = ' + L.now + '</code>.')
      : L.k === 'full' ? E('<code>(' + L.inn + '+1) % 5 == ' + L.out + '</code>: <b>full</b>, so the producer does nothing (busy-waits), though one slot is empty. Only BUFFER_SIZE − 1 = 4 items fit.', 'الشرط <code>(' + L.inn + '+1) % 5 == ' + L.out + '</code> اتحقق، يعني <b>full</b>، فالـ producer بيلف في مكانه مع إن فيه خانة فاضية. يعني بيشيل 4 عناصر بس، أقل من الـ BUFFER_SIZE بواحد.')
      : E('<code>in == out</code> (both ' + L.inn + '): <b>empty</b>, so the consumer does nothing (busy-waits).', 'الشرط <code>in == out</code> اتحقق (الاتنين ' + L.inn + ')، يعني <b>empty</b>، فالـ consumer بيلف في مكانه.');
    return html`<div className="hf-os2-rb hf-in">
      <div className="hf-os2-slots" dir="ltr">${s.buf.map((x, j) => html`<div key=${j} className="hf-os2-slot">
        <span className="hf-os2-ix">[${j}]</span><span className=${'hf-os2-bx' + (x != null ? ' hf-os2-full' : '')}>${x != null ? x : ''}</span>
        <span className="hf-os2-mk">${j === s.inn && html`<span className="i">in</span>`}${j === s.out && html`<span className="o">out</span>`}</span></div>`)}</div>
      <p className="hf-os2-rmsg" key=${JSON.stringify(L)}>${H.K.T(msg)}</p>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${produce}>Produce</button>
        <button className="hf-btn solid" onClick=${consume}>Consume</button>
        <span className="hf-os2-cn">${ar ? html`العناصر: <b>${n}</b>` : html`<b>${n}</b> ${n === 1 ? 'item' : 'items'}`}</span>
        <button className="hf-btn" onClick=${() => setS({ buf: [null, null, null, null, null], inn: 0, out: 0, next: 1, last: null })} aria-label="Reset">↻</button>
      </div>
    </div>`;
  }

  /* ── the two IPC models (slide figure): (a) message passing through the kernel, (b) shared memory ── */
  function IpcModels() {
    const ar = useAr();
    const box = (x, y, w, h, t, k) => html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="4" fill=${k ? 'color-mix(in srgb, var(--hf-k) 16%, var(--paper))' : 'var(--paper)'} stroke="currentColor" strokeWidth="1.5" /><text x=${x + w / 2} y=${y + h / 2 + 5} textAnchor="middle" className=${k ? 'k' : ''}>${t}</text></g>`;
    return html`<svg className="hf-os2-ipc hf-in" dir="ltr" viewBox="0 0 328 186" role="img" aria-label="Two IPC models: (a) message passing through a message queue in the kernel, (b) a shared-memory region between process A and process B">
      <defs><marker id="hf-os2-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor" /></marker></defs>
      ${box(8, 6, 148, 30, 'process A')}${box(8, 46, 148, 30, 'process B')}
      <rect x="8" y="98" width="148" height="56" rx="4" fill="var(--hf-grey)" stroke="currentColor" strokeWidth="1.5" /><text x="82" y="146" textAnchor="middle">kernel</text>
      ${box(20, 104, 124, 24, 'message queue', true)}
      <path d="M30 36 C 0 70, 10 100, 26 104" fill="none" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#hf-os2-ar)" />
      <path d="M134 104 C 152 96, 150 86, 140 77" fill="none" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#hf-os2-ar)" />
      <text x="82" y="178" textAnchor="middle">(a) message passing</text>
      ${box(172, 6, 148, 30, 'process A')}${box(172, 46, 148, 30, 'shared memory', true)}${box(172, 86, 148, 30, 'process B')}
      <rect x="172" y="124" width="148" height="30" rx="4" fill="var(--hf-grey)" stroke="currentColor" strokeWidth="1.5" /><text x="246" y="144" textAnchor="middle">kernel</text>
      <text x="246" y="178" textAnchor="middle">(b) shared memory</text>
    </svg>`;
  }

  H.chapters.os[2] = {
    title: 'Processes and Interprocess Communication',
    kicker: 'Chapter 2',
    run: 'processes and IPC',
    ar: { title: 'الـ Processes والـ Interprocess Communication', kicker: 'الفصل 2', run: 'الـ processes والـ IPC' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Reveal, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctor's own questions on this lecture (Exam 2026 and the 2026/27 midterm), with the site's Arabic reasons
      const lec = kit.course.lectures.find(l => l.n === 2);
      const arQuiz = (window.AR && window.AR.os && window.AR.os.lectures && window.AR.os.lectures[2] && window.AR.os.lectures[2].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const watch = (en, ar) => html`<${Box} kind="watch"><p className="hf-p small">${X(en, ar)}</p></${Box}>`;
      return [
        // 0 · how this chapter works (faces the opener)
        page(html`
          <${H2}>${t('How this chapter works', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X("Last chapter you met the <b>operating system</b>, the program in charge. This chapter is about the things it is in charge <i>of</i>: <b>processes</b>, how they are born, wait in line, take turns on the CPU, die, and talk to each other.",
            'الفصل اللي فات اتعرفت على الـ <b>operating system</b>، البرنامج اللي ماسك كل حاجة. الفصل ده عن الحاجات اللي هو ماسكها: الـ <b>processes</b>، بتتولد إزاي، وبتقف في الطابور، وبتاخد دورها على الـ CPU، وبتموت، وبتكلّم بعض.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Five exercises</b> on the page: move a process through its states, count the processes fork() makes, fill a buffer, and two sorting games.', '<b>خمس تمارين</b> على الصفحة: حرّك process بين الـ states، وعدّ الـ processes اللي <code>fork()</code> بتعملها، واملا buffer، ولعبتين ترتيب.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps from the course's real papers (Exam 2026 and this year's midterm).", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات المادة الحقيقية (امتحان 2026 والميدترم بتاع السنة دي).')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies, not the slides.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('Music is playing, a file is downloading and you are typing. Say the machine has one CPU. How can one CPU run all three "at the same time"?',
            'الأغاني شغالة، وفيه file بيتحمّل، وإنت بتكتب. افرض إن الجهاز فيه CPU واحد بس. إزاي CPU واحد يشغّل التلاتة "في نفس الوقت"؟')}</p></${Box}>
        `, { sec: t('How this chapter works', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">2</span><span className="t">${A ? html`الفصل التاني<br/>Operating Systems` : html`Chapter two<br/>Operating Systems`}</span></div>
            <${Gap} h=${8} /><${H1}>${t("It's Alive!", 'البرنامج صحي من النوم')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('processes and interprocess communication', 'الـ processes والـ interprocess communication')}</p></div>
          <${Talk} who="disk">${X("I've had <code>game.exe</code> on me for months. It never did a thing.", 'عندي <code>game.exe</code> بقاله شهور. عمره ما عمل أي حاجة.')}</${Talk}>
          <${Talk} who="proc" flip=${true}>${X("Then someone double-clicked it. Now I'm <b>loaded in memory</b>, I have a program counter, and I'm running!", 'لحد ما حد داس عليه دبل كليك. دلوقتي أنا <b>متحمّل في الـ memory</b>، وعندي program counter، وشغال!')}</${Talk}>
          <${P} small=${true}>${X("That moment is when a <b>program</b> becomes a <b>process</b>. In this chapter you'll follow a process through its whole life: its states, its ID card (the <b>PCB</b>), the queues and schedulers, the <b>context switch</b>, <code>fork()</code> and death, and finally how processes talk: <b>IPC</b>.",
            'اللحظة دي هي اللي الـ <b>program</b> بيبقى فيها <b>process</b>. في الفصل ده هتمشي ورا process في حياتها كلها: الـ states بتاعتها، والبطاقة بتاعتها (الـ <b>PCB</b>)، والـ queues والـ schedulers، والـ <b>context switch</b>، و<code>fork()</code> والموت، وفي الآخر الـ processes بتكلّم بعض إزاي: الـ <b>IPC</b>.')}</${P}>
        `, { sec: t("It's alive!", 'البرنامج صحي') }),

        // 2 · program vs process
        page(html`
          <${H1}>${t('Program or process?', 'الـ program ولا الـ process؟')}</${H1}>
          <${Def}>${X('A <b>process</b> is a <b>program in execution</b>. Its execution must progress in <b>sequential</b> fashion.', 'الـ <b>process</b> هي <b>برنامج شغال</b> (<bdi dir="ltr">program in execution</bdi>)، والتنفيذ بتاعها لازم يمشي بالترتيب (<b>sequential</b>).')}</${Def}>
          <div className="hf-os2-vs hf-in">${(A ? [['الـ Program', 'الـ Process'], ['حاجة <b>passive</b>', 'حاجة <b>active</b>'], ['متخزن على الـ disk كـ executable file', 'بتتعمل لما الـ executable file يتحمّل في الـ memory'], ['مجرد instructions', 'ليها program counter وregisters وstack وdata وheap وstate'], ['البرنامج الواحد…', '…ممكن يبقى كذا process']]
            : [['Program', 'Process'], ['<b>Passive</b> entity', '<b>Active</b> entity'], ['Stored on disk as an executable file', 'Created when the executable file is loaded into memory'], ['Just a set of instructions', 'Has a program counter, registers, stack, data, heap and a state'], ['One program…', '…can be several processes']]).map((r, j, all) => r.map((c, k) => html`<span key=${j + '-' + k} className=${(j === 0 ? 'hf-os2-h' : '') + (j === all.length - 1 ? ' hf-os2-l' : '')}>${T(c)}</span>`))}</div>
          <${P} small=${true}>${X('A program is started by <b>GUI mouse clicks, command line entry of its name</b>, etc. And "one program, several processes" happens when, say, multiple users run the same program.', 'البرنامج بيبدأ بـ <b>GUI mouse clicks، أو إنك تكتب اسمه في الـ command line</b>، وهكذا. وحكاية البرنامج الواحد اللي بيبقى كذا process بتحصل مثلًا لما كذا user يشغّلوا نفس البرنامج.')}</${P}>
          <${P} small=${true}>${X('Batch systems run <b>jobs</b>; time-shared systems run <b>user programs or tasks</b>. The textbook uses <i>job</i> and <i>process</i> almost interchangeably.', 'الـ batch systems بتشغّل <b>jobs</b>، والـ time-shared systems بتشغّل <b>user programs أو tasks</b>. والكتاب بيستخدم كلمة job وكلمة process تقريبًا بنفس المعنى.')}</${P}>
        `, { sec: t('Program vs process', 'الـ program والـ process') }),

        // 3 · process in memory
        page(html`
          <${H2}>${t('A process in memory', 'الـ process جوّه الـ memory')}</${H2}>
          <${Fig} name="os-proc-memory" />
        `),

        // 4 · sort: where does it live
        page(html`
          <${Box} kind="pencil" title=${t('Where does it live?', 'دي بتتحط فين؟')}><p className="hf-p small">${X('Tap <b>S</b> stack, <b>H</b> heap, <b>D</b> data or <b>T</b> text for each thing, then check.', 'دوس <b>S</b> للـ stack، أو <b>H</b> للـ heap، أو <b>D</b> للـ data، أو <b>T</b> للـ text، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="mem" bins=${[['S', 'stack'], ['H', 'heap'], ['D', 'data'], ['T', 'text']]} items=${A ? [
            ['متغير local جوّه function', 0],
            ['مساحة اتحجزت بـ <code>malloc()</code> وقت التشغيل', 1],
            ['عدّاد global متعرّف برة الـ main', 2],
            ['كود البرنامج نفسه (الـ instructions)', 3],
            ['الـ return address بتاع function call', 0]
            ['حاجة اتعملت بـ <code>new</code>', 1],
          ] : [
            ['A local variable inside a function', 0],
            ['Space from <code>malloc()</code> at run time', 1],
            ['A global counter declared outside main', 2],
            ['The program code (its instructions)', 3],
            ['The return address of a function call', 0]
            ['An object made with <code>new</code>', 1],
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('stack grows down, heap grows up, into the free space between them', 'الـ stack بيكبر لتحت، والـ heap بيكبر لفوق، في المساحة الفاضية اللي بينهم')}</${Hand}>
          <${Hand}>${t('exam favourite: "the current address of the process" is the program counter, not a section', 'سؤال امتحان مشهور: الـ current address بتاع الـ process هو الـ program counter، مش section')}</${Hand}>
        `),

        // 5 · five states
        page(html`
          <${H1}>${t('Five states of a process', 'الـ states الخمسة بتوع الـ process')}</${H1}>
          <${P} small=${true}>${t('As a process executes, it changes state:', 'والـ process وهي بتتنفذ، الـ state بتاعتها بتتغير:')}</${P}>
          <${UL} items=${A ? ['الـ <b>new</b>: بتتعمل.', 'الـ <b>ready</b>: مستنية تاخد processor.', 'الـ <b>running</b>: الـ instructions بتاعتها بتتنفذ.', 'الـ <b>waiting</b>: مستنية event (إن الـ I/O يخلص، أو signal).', 'الـ <b>terminated</b>: خلصت تنفيذ.']
            : ['<b>new</b>: being created.', '<b>ready</b>: waiting to be assigned to a processor.', '<b>running</b>: instructions are being executed.', '<b>waiting</b>: waiting for some event (I/O completion, a signal).', '<b>terminated</b>: finished execution.']} />
          <${Talk} who="proc">${X("Ready and waiting both sound like waiting! But <b>ready</b> waits for the <b>CPU</b>, <b>waiting</b> waits for an <b>event</b>.", 'الـ ready والـ waiting الاتنين شكلهم استنا! بس الـ <b>ready</b> مستنية الـ <b>CPU</b>، والـ <b>waiting</b> مستنية <b>event</b>.')}</${Talk}>
          <${Grow} />
          <${Hand} red=${true}>${t('on a single processor only one process can be running at any instant; many can be ready or waiting', 'على processor واحد، process واحدة بس تبقى running في أي لحظة، وكتير ممكن يبقوا ready أو waiting')}</${Hand}>
        `, { sec: t('Process states', 'الـ Process states') }),

        // 6 · the state diagram
        page(html`
          <${H2}>${t('The state diagram: press the arrows', 'الـ state diagram: دوس على الأسهم')}</${H2}>
          <${Fig} name="os-state-diagram" />
        `),

        // 7 · move the process game
        page(html`
          <${Box} kind="pencil" title=${t('Move the process', 'حرّك الـ process')}><p className="hf-p small">${t('Pick the event that moves the process. No arrow? We tell you why.', 'اختار الـ event اللي بيحرّك الـ process. مفيش سهم؟ هنقولك ليه.')}</p></${Box}>
          <${StateGame} />
        `),

        // 8 · PCB
        page(html`
          <${H2}>${t("Every process's ID card: the PCB", 'بطاقة كل process: الـ PCB')}</${H2}>
          <${Fig} name="os-pcb" />
        `, { sec: t('The PCB', 'الـ PCB') }),

        // 9 · interview with a PCB
        page(html`
          <${Interview} title=${t('Interview with a PCB', 'حوار مع PCB')} sub=${t("This week: the block every process carries. Our analogy: it is the process's ID card.", 'حوار الأسبوع: الـ block اللي كل process شايلاه. تشبيه من عندنا: هو البطاقة بتاعتها.')} lines=${A ? [
            ['المذيع', 'إنت مين، وشايل إيه؟'],
            ['الـ PCB', 'أنا الـ <b>Process Control Block</b>، واسمي كمان الـ task control block. أنا المعلومات المرتبطة بكل process: شايل الـ <b>state</b> ورقمها والـ <b>program counter</b> والـ <b>CPU registers</b>.'],
            ['المذيع', 'بس كده؟'],
            ['الـ PCB', 'لأ، وكمان معلومات الـ CPU-scheduling (الـ priorities والـ queue pointers)، والـ memory-management، والـ accounting (الـ CPU المستخدم والـ time limits)، والـ I/O status (الأجهزة والـ open files).'],
            ['المذيع', 'والـ OS محتاجك في إيه؟'],
            ['الـ PCB', 'في الـ context switch بيحفظ الـ process فيّا وبعدين يرجّعها مني. الـ context بتاعها بيتمثل فيّا أنا.'],
            ['المذيع', 'سمعنا إنك بتتخن.'],
            ['الـ PCB', 'بسبب الـ <b>threads</b>! الـ process ممكن يبقى ليها كذا program counter، فلازم أشيل تفاصيل كل thread.']
          ] : [
            ['Head First', 'Who are you, and what do you carry?'],
            ['PCB', "I'm the <b>Process Control Block</b> (or task control block): the information associated with each process. I carry its <b>state</b>, its number, its <b>program counter</b> and its <b>CPU registers</b>."],
            ['Head First', "That's all?"],
            ['PCB', 'Also CPU-scheduling info (priorities, queue pointers), memory-management info, accounting info (CPU used, time limits) and I/O status info (devices, open files).'],
            ['Head First', 'Why does the OS need you?'],
            ['PCB', 'On a context switch it saves the process into me and later reloads it from me. The context of a process is represented in me.'],
            ['Head First', "Rumour says you're getting bigger."],
            ['PCB', '<b>Threads!</b> A process may have multiple program counters, so I must store per-thread details.']
          ]} />
        `),

        // 10 · queues
        page(html`
          <${H1}>${t('Waiting in line', 'الوقوف في الطابور')}</${H1}>
          <${P} small=${true}>${X('The goal: <b>maximize CPU use</b> and quickly switch processes onto the CPU for time sharing. The <b>process scheduler</b> selects among the available processes for the next execution on the CPU, and keeps <b>scheduling queues</b>:', 'الهدف: <b>نستغل الـ CPU لآخره</b>، ونبدّل الـ processes عليه بسرعة عشان الـ time sharing. الـ <b>process scheduler</b> بيختار من الـ processes المتاحة مين يتنفذ بعد كده، وبيحتفظ بـ <b>scheduling queues</b>:')}</${P}>
          <${UL} items=${A ? ['الـ <b>job queue</b>: كل الـ processes اللي في السيستم.', 'الـ <b>ready queue</b>: كل الـ processes اللي في الـ main memory، جاهزة ومستنية تتنفذ.', 'الـ <b>device queues</b>: الـ processes اللي مستنية I/O device.']
            : ['<b>Job queue</b>: all processes in the system.', '<b>Ready queue</b>: all processes residing in main memory, ready and waiting to execute.', '<b>Device queues</b>: processes waiting for an I/O device.']} />
          <${Hand} tilt=${true}>${t('processes migrate among the various queues', 'الـ processes بتتنقل بين الـ queues المختلفة')}</${Hand}>
          <${Grow} />
          ${watch('Midterm: "The list of processes waiting for a particular I/O device is called a ___". The slides call it a <b>device queue</b>, but that was not offered: the key is <b>waiting queue</b> (same meaning), not the ready queue.', 'سؤال الميدترم:<span class="ltr">"The list of processes waiting for a particular I/O device is called a ___"</span>السلايدز بتسميها <b>device queue</b>، بس ماكانتش في الاختيارات، فالإجابة <b>waiting queue</b> (نفس المعنى)، مش الـ ready queue.')}
        `, { sec: t('Scheduling queues', 'الـ Scheduling queues') }),

        // 11 · device queues figure (tall)
        page(html`
          <${H2}>${t('Queues are lists of PCBs', 'الـ queues دي PCBs ورا بعض')}</${H2}>
          <${Fig} name="os-device-queues" />
        `),

        // 12 · queueing diagram
        page(html`
          <${H2}>${t('Send a process around the queueing diagram', 'لفّ الـ process في الـ queueing diagram')}</${H2}>
          <${Fig} name="os-queueing" />
        `),

        // 13 · schedulers
        page(html`
          <${H1}>${t('Three schedulers', 'تلات schedulers')}</${H1}>
          <${P} small=${true}>${t('Tap a scheduler to see its card.', 'دوس على أي scheduler عشان تشوف الكارت بتاعه.')}</${P}>
          <${Schedulers} />
          <${Grow} />
          ${watch('Exam 2026: the scheduler that selects which processes are brought into the ready queue is the <b>long-term</b> one. Midterm: the <b>number of processes in memory</b> is the <b>degree of multiprogramming</b>. "Long-term scheduler" is the trap: it <i>controls</i> that number, it is not the number.', 'في امتحان 2026، الـ scheduler اللي بيختار مين يدخل الـ ready queue هو الـ <b>long-term</b>. وفي الميدترم، <b>عدد الـ processes في الـ memory</b> اسمه الـ <b>degree of multiprogramming</b>. والفخ هو اختيار الـ long-term scheduler، لأنه بيتحكم في العدد ده، مش هو العدد.')}
        `, { sec: t('Schedulers', 'الـ Schedulers') }),

        // 14 · I/O-bound vs CPU-bound
        page(html`
          <${H2}>${t('Two kinds of process', 'نوعين من الـ processes')}</${H2}>
          <${Talk} who="proc">${X("I'm <b>I/O-bound</b>: I spend more time doing I/O than computing. <b>Many short CPU bursts.</b>", 'أنا <b><bdi dir="ltr">I/O-bound</bdi></b>: بقضي وقت في الـ I/O أكتر من الحسابات. <b>CPU bursts قصيرة وكتير.</b>')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X("And I serve the <b>CPU-bound</b> ones: more time computing, <b>few very long CPU bursts</b>.", 'وأنا بخدم الـ <b>CPU-bound</b>: بيقضوا وقت أكتر في الحسابات، و<b>CPU bursts قليلة وطويلة جدًا</b>.')}</${Talk}>
          <${Grow} />
          ${mq('m-med', /What is a medium-term scheduler/i)}
        `),

        // 15 · medium-term figure
        page(html`
          <${H2}>${t('Medium-term scheduling: swapping', 'الـ medium-term scheduling: الـ swapping')}</${H2}>
          <${P} small=${true}>${X('When the degree of multiprogramming needs to <b>decrease</b>: remove a process from memory, store it on disk, and bring it back in from disk to continue execution.', 'لما الـ degree of multiprogramming محتاجة <b>تقل</b>: نشيل process من الـ memory، ونخزنها على الـ disk، ونرجّعها من الـ disk تاني عشان تكمّل تنفيذ.')}</${P}>
          <${Fig} name="os-medium-term" />
        `),

        // 16 · mobile multitasking
        page(html`
          <${H1}>${t('Multitasking on your phone', 'الـ multitasking على الموبايل')}</${H1}>
          <${UL} items=${A ? [
            'فيه mobile systems (زي النسخ الأولى من iOS) بتسمح لـ <b>process واحدة بس تشتغل، والباقي suspended</b>.',
            'بسبب مساحة الشاشة وقيود الـ user interface، الـ iOS بيوفر process واحدة <b>foreground</b> (بتتحكم فيها من الـ UI) وكذا <b>background</b> (في الـ memory وشغالة، بس مش على الشاشة، وعليها قيود: task قصيرة، أو notifications، أو tasks طويلة زي الـ audio playback).',
            'الـ Android بيشغّل foreground وbackground بقيود أقل، والـ background process بتستخدم <b>service</b> بتفضل شغالة حتى لو الـ process اتعملها suspend، ومالهاش UI، وmemory بتاعتها صغيرة.'
          ] : [
            'Some mobile systems (e.g. early iOS) allow <b>only one process to run, others suspended</b>.',
            'Because of screen space and UI limits, iOS has a single <b>foreground</b> process (controlled via the UI) and multiple <b>background</b> processes (in memory, running, not on the display, with limits: a single short task, event notifications, long tasks like audio playback).',
            'Android runs foreground and background with fewer limits. A background process uses a <b>service</b>: it keeps running even if the process is suspended, has no UI and uses little memory.'
          ]} />
          <${Grow} />
          ${watch('Exam 2026: "The ___ application is the application appearing on the display screen of a mobile device." <b>Foreground</b>. Not "main" or "display": those are not process types.', 'سؤال امتحان 2026:<span class="ltr">"The ___ application is the application appearing on the display screen of a mobile device."</span>الإجابة <b>foreground</b>. والـ main والـ display مش أنواع processes أصلًا.')}
        `),

        // 17 · match
        page(html`
          <${H2}>${t('Who does what?', 'مين بيعمل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Tap a scheduler or queue, then tap its description.', 'دوس على الـ scheduler أو الـ queue، وبعدين دوس على الوصف بتاعه.')}</${P}>
          <${Match} id="sq" left=${['Long-term scheduler', 'Short-term scheduler', 'Medium-term scheduler', 'Job queue', 'Ready queue', 'Device queue']}
            right=${A ? ['الـ processes اللي في الـ main memory وجاهزة تتنفذ', 'بيختار الـ process الجاية للـ CPU كل كام millisecond', 'كل الـ processes اللي في السيستم', 'بيعمل swap للـ processes على الـ disk ويرجّعها', 'الـ processes اللي مستنية I/O device', 'بيختار مين يدخل الـ ready queue']
              : ['Processes in main memory, ready and waiting to execute', 'Picks the next process for the CPU, every few milliseconds', 'All processes in the system', 'Swaps processes out to disk and back in', 'Processes waiting for an I/O device', 'Chooses which processes enter the ready queue']}
            answer=${[5, 1, 3, 2, 0, 4]} />
        `, { sec: t('Exercise: schedulers and queues', 'تمرين: الـ schedulers والـ queues') }),

        // 18 · context switch
        page(html`
          <${H1}>${t('The context switch', 'الـ context switch')}</${H1}>
          <${Def}>${X('When the CPU switches to another process, the system must <b>save the state of the old process</b> and <b>load the saved state of the new process</b>. This is a <b>context switch</b>. The context of a process is represented in its <b>PCB</b>.', 'لما الـ CPU يحوّل لـ process تانية، السيستم لازم <b>يحفظ الـ state بتاعة الـ process القديمة</b> و<b>يحمّل الـ state المحفوظة للجديدة</b>. ده اسمه <b>context switch</b>. والـ context بتاع الـ process بيتمثل في الـ <b>PCB</b> بتاعها.')}</${Def}>
          <${Talk} who="cpu" flip=${true}>${X('While I switch, I do <b>no useful work</b>. Context-switch time is pure <b>overhead</b>.', 'وأنا ببدّل <b>مش بعمل أي شغل مفيد</b>. وقت الـ context switch ده <b>overhead</b> صافي.')}</${Talk}>
          <${UL} items=${A ? ['كل ما الـ OS والـ PCB يبقوا <b>أعقد</b>، الـ switch ياخد وقت <b>أطول</b>.', 'الوقت ده بيعتمد على دعم الـ hardware: فيه hardware بيوفر <b>كذا register set لكل CPU</b>، فكذا context يبقوا متحمّلين مرة واحدة.']
            : ['The more <b>complex</b> the OS and the PCB, the <b>longer</b> the switch.', 'It depends on hardware support: some hardware provides <b>multiple register sets per CPU</b>, so multiple contexts are loaded at once.']} />
          <${Hand} tilt=${true}>${t('back to the Brain Power on page 1: this is how one CPU takes turns between your apps', 'فاكر سؤال "شغّل مخك" في أول صفحة؟ كده الـ CPU الواحد بيبدّل بين الـ apps بتاعتك')}</${Hand}>
        `, { sec: t('Context switch', 'الـ Context switch') }),

        // 19 · cpu switch figure (tall)
        page(html`
          <${Fig} name="os-cpu-switch" />
        `),

        // 20 · kernel steps + dumb questions
        page(html`
          <${H2}>${t('What the kernel does, in order', 'الـ kernel بيعمل إيه، بالترتيب')}</${H2}>
          <ol className="hf-os2-ol hf-in">${(A ? ['يحفظ الـ PC والـ registers والـ state بتاعة الـ process الشغالة في الـ PCB بتاعها.', 'يحدّث الـ state بتاعتها (<bdi dir="ltr">ready/waiting</bdi>) وينقلها للـ queue المناسبة.', 'يختار الـ process الجاية.', 'يرجّع الـ PC والـ registers ومعلومات الـ memory بتاعتها من الـ PCB.', 'يحوّل لـ user mode وينط على الـ PC المحفوظ بتاعها.']
            : ['Save the PC, registers and state of the running process into its PCB.', 'Update its state (ready/waiting) and move it to the proper queue.', 'Select the next process.', 'Restore its PC, registers and memory info from its PCB.', 'Switch to user mode and jump to its saved PC.']).map((x, i) => html`<li key=${i} className="hf-li"><span className="hf-os2-n">${i + 1}</span><span>${T(x)}</span></li>`)}</ol>
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['هو الـ context switch هو نفسه تغيير الـ state؟', 'لأ. تغيير الـ state (زي running لـ ready) ده سهم في الـ diagram. الـ context switch هو إن الـ OS يحفظ الـ context في الـ PCB ويحمّل context تاني، وهو بيحدّث الـ state في خطوة 2.'],
            ['ليه بيحفظ الأول قبل ما يختار؟', 'لو رجّع الـ context الجديد الأول، هيكتب فوق الـ registers القديمة قبل ما تتحفظ.']
          ] : [
            ['Is a context switch the same as a state change?', 'No. A state change (say running → ready) is an arrow in the diagram. A context switch is the OS saving one context into its PCB and loading another. It does update the state in step 2.'],
            ['Why save before selecting?', 'Loading the new context first would overwrite the old registers before they are saved.']
          ]} />
        `),

        // 21 · creation
        page(html`
          <${H1}>${t('Parents and children', 'الـ parents والـ children')}</${H1}>
          <${P} small=${true}>${X('The system must provide mechanisms for <b>process creation</b> and <b>termination</b>. Parents create children, which create others, forming a <b>tree of processes</b>. Each is identified by a <b>process identifier (PID)</b>. The Linux tree on the slides:', 'السيستم لازم يوفر mechanisms لـ <b>process creation</b> و<b>termination</b>. الـ parents بيعملوا children، واللي بيعملوا غيرهم، فبيتكوّن <b>tree of processes</b>، وكل واحدة بتتعرف بـ <b>process identifier (PID)</b>. شجرة الـ Linux اللي في السلايدز:')}</${P}>
          <${ProcTree} />
          <${UL} items=${A ? ['<b>مشاركة الـ resources</b>: يشاركوا كلها، أو الـ children ياخدوا جزء منها، أو مفيش مشاركة خالص.', '<b>التنفيذ</b>: يشتغلوا concurrently، أو الـ parent يستنى لحد ما الـ children يخلصوا.', '<b>الـ address space</b>: الـ child نسخة من الـ parent، أو الـ child بيتحمّل فيه برنامج جديد.']
            : ['<b>Resource sharing</b>: share all resources, children share a subset, or share none.', '<b>Execution</b>: run concurrently, or the parent waits until the children terminate.', '<b>Address space</b>: the child is a duplicate of the parent, or has a program loaded into it.']} />
        `, { sec: t('Process creation', 'الـ Process creation') }),

        // 22 · fork code
        page(html`
          <${H2}>${t('UNIX: fork(), exec(), wait()', 'في UNIX: الـ fork والـ exec والـ wait')}</${H2}>
          <${UL} items=${A ? ['الـ <code>fork()</code> بتعمل process جديدة، وبترجع <b>0 في الـ child</b>، و<b>الـ PID بتاع الـ child في الـ parent</b>، وقيمة <bdi dir="ltr">&lt; 0</bdi> لو فيه error.', 'الـ <code>exec()</code> بعد الـ fork بتستبدل الـ memory space ببرنامج جديد. والـ parent بيعمل <code>wait()</code>.']
            : ['<code>fork()</code> creates a new process. It returns <b>0 in the child</b>, <b>the child\'s PID in the parent</b>, and &lt; 0 on error.', '<code>exec()</code>, used after fork(), replaces the memory space with a new program. The parent calls <code>wait()</code>.']} />
          <div className="hf-os2-code"><${Code} lines=${[['pid_t pid = fork();', t('fork a child', 'اعمل child')], ['if (pid < 0) {', t('error', 'error')], '  fprintf(stderr,"Fork Failed");', '  return 1;', ['} else if (pid == 0) {', t('child', 'الـ child')], '  execlp("/bin/ls","ls",NULL);', ['} else {', t('parent', 'الـ parent')], ['  wait(NULL);', t('wait for the child', 'استنى الـ child')], '  printf("Child Complete");', '}']} /></div>
          ${watch('Midterm: "The exec() system call creates a new process": <b>False</b> (fork() does). And the UNIX equivalent of Windows <code>CreateProcess()</code> (which then calls WaitForSingleObject()) is <b>fork()</b>.', 'في الميدترم، دي <b>غلط</b>:<span class="ltr">"The exec() system call creates a new process."</span>والمقابل في UNIX لـ <code>CreateProcess()</code> هو <code>fork()</code>.')}
        `),

        // 23 · fork-life figure
        page(html`
          <${H2}>${t('Try fork(), exec(), wait() and exit()', 'جرّب الـ fork والـ exec والـ wait والـ exit')}</${H2}>
          <${Fig} name="os-fork-life" />
        `),

        // 24 · fork lab
        page(html`
          <${Box} kind="pencil" title=${t('Be the fork() counter', 'خليك إنت عدّاد الـ fork')}><p className="hf-p small">${X('For each program (A–D): how many processes exist in the end, counting the original, and how many lines are printed? Assume no <code>fork()</code> fails and <code>exec()</code> succeeds.', 'في كل برنامج (من A لـ D): كام process في الآخر، ومعاهم الأصلية، وكام سطر بيتطبع؟ افرض إن مفيش <code>fork()</code> بتفشل وإن <code>exec()</code> بتنجح.')}</p></${Box}>
          <${ForkLab} />
        `, { sec: t('Exercise: count the forks', 'تمرين: عدّ الـ forks') }),

        // 25 · termination
        page(html`
          <${H1}>${t('How a process dies', 'الـ process بتموت إزاي')}</${H1}>
          <${P} small=${true}>${X('A process executes its last statement and then <b>asks the operating system to delete it</b> with the <code>exit()</code> system call. Status data returns from child to parent (via <code>wait()</code>), and the OS deallocates its resources.', 'الـ process بتنفذ آخر statement وبعدين <b>بتطلب من الـ OS إنه يمسحها</b> بالـ system call <code>exit()</code>. الـ status data بترجع من الـ child للـ parent (عن طريق <code>wait()</code>)، والـ OS بيعمل deallocate للـ resources بتاعتها.')}</${P}>
          <${P} small=${true}>${X('A parent may terminate a child with <code>abort()</code>. Some reasons:', 'والـ parent ممكن يقفل child بـ <code>abort()</code>. من الأسباب:')}</${P}>
          <${UL} items=${A ? ['الـ child عدّى الـ resources المتخصصة له.', 'الـ task اللي اتدّت للـ child ماتبقاش مطلوبة.', 'الـ parent بيخرج، والـ OS مابيسمحش للـ child يكمّل لو الـ parent خلص.']
            : ['The child has exceeded its allocated resources.', 'The task assigned to the child is no longer required.', 'The parent is exiting, and the OS does not allow a child to continue if its parent terminates.']} />
          <${Def}>${X('<b>Cascading termination</b>: in some operating systems, if a process terminates, all its children, grandchildren, etc. must also be terminated. The termination is initiated by the <b>operating system</b>.', 'الـ <b>Cascading termination</b>: في بعض الـ operating systems، لو process خلصت، كل الـ children والـ grandchildren إلخ لازم يتقفلوا. والـ <b>operating system</b> هو اللي بيبدأ الـ termination.')}</${Def}>
        `, { sec: t('Process termination', 'الـ Process termination') }),

        // 26 · zombie vs orphan
        page(html`
          <${H2}>${t('Zombies and orphans', 'الـ zombies والـ orphans')}</${H2}>
          <div className="hf-os2-code"><${Code} lines=${[['pid = wait(&status);', t('returns the status and the pid of the terminated child', 'بترجّع الـ status والـ pid بتاع الـ child اللي خلص')]]} /></div>
          <${Talk} who="proc">${X("I've terminated, but no parent is waiting: mine <b>hasn't called wait()</b> yet. I'm a <b>zombie</b>.", 'أنا خلصت، بس مفيش parent مستنيني: الـ parent بتاعي <b>لسه ماعملش <code>wait()</code></b>. أنا <b>zombie</b>.')}</${Talk}>
          <${Talk} who="proc" flip=${true}>${X("My parent <b>terminated without invoking wait()</b>. I'm an <b>orphan</b>.", 'الـ parent بتاعي <b>خلص من غير ما يعمل <code>wait()</code></b>. أنا <b>orphan</b>.')}</${Talk}>
          <${Hand} tilt=${true}>${t('Memory trick (ours): zombie = the child is dead; orphan = the parent is dead.', 'حيلة للحفظ (من عندنا): الـ zombie يعني الـ child هو اللي مات، والـ orphan يعني الـ parent هو اللي مات.')}</${Hand}>
        `),

        // 27 · chrome
        page(html`
          <${H1}>${t('One tab crashes. Does the browser?', 'تاب واحدة وقعت. الـ browser كله يقع؟')}</${H1}>
          <${P} small=${true}>${X('Many web browsers ran as a <b>single process</b> (some still do): if one web site causes trouble, the entire browser can hang or crash. Google Chrome is <b>multiprocess</b>, with 3 types of process:', 'فيه browsers كتير كانت شغالة بـ <b>process واحدة</b> (وفيه لسه كده): لو موقع واحد عمل مشكلة، الـ browser كله ممكن يعلّق أو يقع. الـ Google Chrome بقى <b>multiprocess</b>، وفيه 3 أنواع processes:')}</${P}>
          <${UL} items=${A ? ['الـ <b>Browser</b> process: بيدير الـ UI والـ disk والـ network I/O.', 'الـ <b>Renderer</b> processes: بترسم الصفحات (HTML وJavaScript)، وواحدة جديدة لكل website، وشغالة في <b>sandbox</b> بيقيّد الـ disk والـ network I/O، فبيقلّل تأثير الـ security exploits.', 'الـ <b>Plug-in</b> process: واحدة لكل نوع plug-in.']
            : ['<b>Browser</b> process: manages the user interface, disk and network I/O.', '<b>Renderer</b> processes: render web pages (HTML, JavaScript), a new one for each website, in a <b>sandbox</b> restricting disk and network I/O, minimizing the effect of security exploits.', '<b>Plug-in</b> process: one for each type of plug-in.']} />
          <${Hand} red=${true}>${t('slide 19: each tab represents a separate process', 'سلايد 19: كل tab بتمثل process لوحدها')}</${Hand}>
        `, { sec: t('Chrome', 'الـ Chrome') }),

        // 28 · chrome figure
        page(html`
          <${H2}>${t('Make one web site cause trouble', 'خلّي موقع واحد يعمل مشكلة')}</${H2}>
          <${Fig} name="os-chrome" />
        `),

        // 29 · cooperating processes and IPC models
        page(html`
          <${H1}>${t('Processes that talk', 'الـ processes بتكلّم بعض')}</${H1}>
          <${P} small=${true}>${X('A process is <b>independent</b>, or <b>cooperating</b>: it can affect or be affected by other processes, including by sharing data. Reasons for cooperating processes: <b>information sharing, computation speedup, modularity, convenience</b>. Cooperating processes need <b>IPC</b>, and there are two models:', 'الـ process يا إما <b>independent</b>، يا إما <b>cooperating</b>: تقدر تأثّر أو تتأثر بـ processes تانية، ومن ضمنها مشاركة الداتا. أسباب الـ cooperating processes: <b>مشاركة المعلومات، وتسريع الحسابات (<bdi dir="ltr">computation speedup</bdi>)، والـ modularity، والـ convenience</b>. والـ cooperating processes محتاجة <b>IPC</b>، وليه موديلين:')}</${P}>
          <${IpcModels} />
          <${Hand} red=${true}>${t('not on the list of reasons: "increased reliability" (that one is from Lecture 1)', 'مش من الأسباب: الـ increased reliability (دي من المحاضرة الأولى)')}</${Hand}>
        `, { sec: t('IPC', 'الـ IPC') }),

        // 30 · shared memory and producer–consumer
        page(html`
          <${H1}>${t('Shared memory', 'الـ Shared memory')}</${H1}>
          <${Def}>${X('An area of memory shared among the communicating processes. The communication is under the control of the <b>user processes, not the OS</b>. The major issue: <b>synchronizing</b> their actions.', 'منطقة memory متشاركة بين الـ processes اللي بتتواصل. التواصل تحت تحكم <b>الـ user processes، مش الـ OS</b>. والمشكلة الكبيرة هي الـ <b>synchronization</b> بين أفعالهم.')}</${Def}>
          <${P} small=${true}>${X('The classic example is the <b>producer–consumer problem</b>: the producer produces information that is consumed by the consumer. The buffer between them is:', 'المثال المشهور هو الـ <b>producer–consumer problem</b>: الـ producer بيطلّع معلومات والـ consumer بيستهلكها. والـ buffer اللي بينهم يا إما:')}</${P}>
          <${UL} items=${A ? ['الـ <b>unbounded buffer</b>: مفيش حد عملي لحجمه.', 'الـ <b>bounded buffer</b>: حجمه ثابت.'] : ['<b>Unbounded buffer</b>: no practical limit on its size.', '<b>Bounded buffer</b>: a fixed buffer size.']} />
          <div className="hf-os2-code"><${Code} lines=${['#define BUFFER_SIZE 10', 'item buffer[BUFFER_SIZE];', ['int in = 0, out = 0;', t('shared', 'متشاركين')]]} /></div>
          <${Hand} arrow="up">${t('in = next free slot, out = first full slot', 'الـ in أول خانة فاضية، والـ out أول خانة مليانة')}</${Hand}>
        `, { sec: t('Shared memory', 'الـ Shared memory') }),

        // 31 · the code
        page(html`
          <${H2}>${t("The lecture's bounded buffer", 'الـ bounded buffer بتاع المحاضرة')}</${H2}>
          <p className="hf-hand">${t('Producer', 'الـ Producer')}</p>
          <div className="hf-os2-code"><${Code} lines=${['while (true) {', '  while (((in+1)%BUFFER_SIZE)==out)', ['    ;', t('full: do nothing', 'مليان: ولا حاجة')], '  buffer[in] = next_produced;', '  in = (in+1) % BUFFER_SIZE;', '}']} /></div>
          <p className="hf-hand">${t('Consumer', 'الـ Consumer')}</p>
          <div className="hf-os2-code"><${Code} lines=${['while (true) {', ['  while (in == out)', t('empty: do nothing', 'فاضي: ولا حاجة')], '  next_consumed = buffer[out];', '  out = (out+1) % BUFFER_SIZE;', '}']} /></div>
          <${Grow} />
          ${watch('The slide\'s own note: the solution is correct, but it can only use <b>BUFFER_SIZE − 1</b> elements. "Full" is when one more item would make <code>in</code> catch up with <code>out</code>.', 'ملاحظة السلايد نفسها: الحل ده صح، بس بيستخدم <b><bdi dir="ltr">BUFFER_SIZE − 1</bdi></b> عناصر بس. والـ "full" معناه إن عنصر كمان هيخلّي الـ <code>in</code> يلحق الـ <code>out</code>.')}
        `),

        // 32 · ring simulator
        page(html`
          <${H2}>${t('Run it: a bounded buffer of 5', 'شغّله: bounded buffer حجمه 5')}</${H2}>
          <${P} small=${true}>${X('Same code, <code>BUFFER_SIZE = 5</code>. Fill it up and watch the producer stop one slot early.', 'نفس الكود، بس <code>BUFFER_SIZE = 5</code>. املاه واتفرج على الـ producer وهو بيقف قبل آخر خانة.')}</${P}>
          <${Ring} />
          <${Grow} />
          <${Box} kind="pencil"><p className="hf-p small">${X('<code>BUFFER_SIZE = 8</code>, <code>in = 7</code>, <code>out = 0</code>. What does the producer do next?', 'لو <code>BUFFER_SIZE = 8</code> و<code>in = 7</code> و<code>out = 0</code>، الـ producer هيعمل إيه؟')}</p>
            <${Reveal} id="rb8"><p className="hf-p small">${X('It busy-waits: <code>(7+1) % 8 = 0 = out</code>, so the buffer counts as full. It already holds 7 items (8 − 1).', 'هيلف في مكانه، لأن <code>(7+1) % 8 = 0 = out</code>، فالـ buffer يتحسب full. وفيه 7 عناصر فعلًا، أقل من 8 بواحد.')}</p></${Reveal}></${Box}>
        `),

        // 33 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: the two IPC models argue about who's the better way to talk.", 'قعدة الليلة: موديلين الـ IPC بيتخانقوا مين فيهم أحسن طريقة للكلام.')} />
          <${Chat} names=${[t('Shared Memory', 'الـ Shared Memory'), t('Message Passing', 'الـ Message Passing')]} lines=${A ? [
            [0, 'أنا منطقة memory متشاركة. الـ processes بتقرا وتكتب فيّا على طول.'],
            [1, 'وأنا مفيش عندي <b>shared variables</b> خالص. كله بعمليتين: <bdi dir="ltr">send(message)</bdi> و<bdi dir="ltr">receive(message)</bdi>.'],
            [0, 'وعندي الـ <b>user processes</b> هي اللي ماسكة التحكم، مش الـ OS.'],
            [1, 'وبيمنعوا بعض من الخبط إزاي؟'],
            [0, '…ماشي. الـ <b>synchronization</b> هي مشكلتي الكبيرة. اسأل الـ producer والـ consumer.'],
            [1, 'أنا بعمل communicate وsynchronize مع بعض. بس الـ P والـ Q لازم يعملوا <b>communication link</b> الأول.'],
            [0, 'والرسايل بتاعتك بتستنى في <b>message queue في الـ kernel</b>.'],
            [1, 'وخمّن: من طرق تنفيذ الـ link بتاعي physically… الـ <b>shared memory</b>.']
          ] : [
            [0, "I'm an area of memory the processes share. They read and write me directly."],
            [1, "I don't do <b>shared variables</b> at all. Just two operations: <code>send(message)</code> and <code>receive(message)</code>."],
            [0, 'With me, the <b>user processes</b> are in control, not the OS.'],
            [1, 'And who stops them tripping over each other?'],
            [0, '…Fine. <b>Synchronizing</b> them is my major issue. Ask the producer and the consumer.'],
            [1, 'I communicate <i>and</i> synchronize. But P and Q must set up a <b>communication link</b> first.'],
            [0, 'And your messages wait in a <b>message queue in the kernel</b>.'],
            [1, 'Guess what: one physical way to implement my link is… <b>shared memory</b>.']
          ]} />
        `),

        // 34 · message passing
        page(html`
          <${H1}>${t('Message passing', 'الـ Message passing')}</${H1}>
          <${P} small=${true}>${X('Processes communicate and synchronize <b>without shared variables</b>, using <code>send(message)</code> and <code>receive(message)</code>; the message size is fixed or variable. P and Q must establish a <b>communication link</b>.', 'الـ processes بتتواصل وتعمل synchronize <b>من غير shared variables</b>، بـ <code>send(message)</code> و<code>receive(message)</code>، وحجم الرسالة ثابت أو متغير. والـ P والـ Q لازم يعملوا <b>communication link</b>.')}</${P}>
          <${P} small=${true}>${X('The link: <b>physical</b> (shared memory, hardware bus, network) or <b>logical</b> (direct or indirect, synchronous or asynchronous, automatic or explicit buffering).', 'الـ link يا إما <b>physical</b> (زي الـ shared memory والـ hardware bus والـ network)، يا إما <b>logical</b> (يعني direct أو indirect، وsynchronous أو asynchronous، وautomatic أو explicit buffering).')}</${P}>
          <div className="hf-os2-two hf-in">
            <div><h5>${t('Direct', 'الـ Direct')}</h5><p><code>send(P, msg)</code></p><p><code>receive(Q, msg)</code></p><p>${t('Processes name each other.', 'كل process بتسمّي التانية.')}</p></div>
            <div><h5>${t('Indirect', 'الـ Indirect')}</h5><p><code>send(A, msg)</code></p><p><code>receive(A, msg)</code></p><p>${t('Through mailboxes (ports) with unique IDs.', 'عن طريق mailboxes (ports) ليها IDs مميزة.')}</p></div>
          </div>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': direct is a phone call by name, indirect is a shared mailbox.", 'تشبيه من عندنا: الـ direct زي مكالمة بالاسم، والـ indirect زي صندوق بريد مشترك.')}</${Hand}>
        `, { sec: t('Message passing', 'الـ Message passing') }),

        // 35 · sort direct / indirect
        page(html`
          <${Box} kind="pencil" title=${t('Direct or indirect?', 'الـ direct ولا الـ indirect؟')}><p className="hf-p small">${X('Tap <b>D</b> for direct or <b>I</b> for indirect (mailboxes).', 'دوس <b>D</b> للـ direct أو <b>I</b> للـ indirect.')}</p></${Box}>
          <${Sort} id="di" bins=${[['D', 'direct'], ['I', 'indirect']]} items=${A ? [
            ['الـ links بتتعمل أوتوماتيك', 0],
            ['الـ link ممكن يوصل processes كتير', 1],
            ['كل pair ليه link واحد بالظبط', 0],
            ['الـ link موجود بس لو بيشاركوا mailbox', 1],
            ['الـ processes بتسمّي بعض بالاسم', 0]
          ] : [
            ['Links are established automatically', 0],
            ['A link may connect many processes', 1],
            ['Exactly one link between each pair', 0],
            ['A link exists only if they share a mailbox', 1],
            ['Processes name each other explicitly', 0]
          ]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('P1, P2 and P3 share mailbox A; P1 sends. Who receives? Fixes: links of at most two processes; only one process at a time may receive; or the system picks the receiver arbitrarily and tells the sender.', 'الـ P1 والـ P2 والـ P3 بيشاركوا mailbox A، والـ P1 بعت. مين يستلم؟ الحلول: link بين اتنين بالكتير، أو واحدة بس تعمل receive في المرة، أو السيستم يختار ويبلّغ الـ sender.')}</p></${Box}>
        `),

        // 36 · synchronization and buffering
        page(html`
          <${H1}>${t('To wait or not to wait', 'تستنى ولا ماتستناش')}</${H1}>
          <${UL} items=${A ? ['الـ <b>blocking</b> يعني <b>synchronous</b>: الـ blocking send بيوقّف الـ sender لحد ما الرسالة تتستلم، والـ blocking receive بيوقّف الـ receiver لحد ما رسالة تبقى متاحة.', 'الـ <b>non-blocking</b> يعني <b>asynchronous</b>: ابعت وكمّل، واستلم يا رسالة صالحة يا null.', 'لو الـ send والـ receive الاتنين blocking يبقى اسمها <b>rendezvous</b>.']
            : ['<b>Blocking = synchronous</b>: a blocking send holds the sender until the message is received; a blocking receive holds the receiver until a message is available.', '<b>Non-blocking = asynchronous</b>: send and continue; receive either a valid message or null.', 'Both send and receive blocking: a <b>rendezvous</b>.']} />
          <${K.H3}>${t('Buffering: the queue attached to the link', 'الـ buffering: الـ queue المتوصلة بالـ link')}</${K.H3}>
          <${UL} items=${A ? ['الـ <b>zero capacity</b>: الـ sender يستنى الـ receiver (rendezvous).', 'الـ <b>bounded capacity</b>: n رسالة، والـ sender يستنى لو الـ queue مليانة.', 'الـ <b>unbounded</b>: الـ sender عمره ما يستنى.']
            : ['<b>Zero capacity</b>: the sender must wait for the receiver (rendezvous).', '<b>Bounded capacity</b>: n messages; the sender waits if the link is full.', '<b>Unbounded</b>: the sender never waits.']} />
          <${Grow} />
          <${Talk} who="proc" flip=${true}>${X('Our analogy: zero capacity is like handing over a note in person. I wait until you take it.', 'تشبيه من عندنا: الـ zero capacity زي إنك تسلّم ورقة إيد بإيد، فأستنى لحد ما تاخدها.')}</${Talk}>
        `, { sec: t('Synchronization and buffering', 'الـ Synchronization والـ buffering') }),

        // 37 · sockets
        page(html`
          <${H1}>${t('Sockets', 'الـ Sockets')}</${H1}>
          <${Def}>${X('A <b>socket</b> is an endpoint for communication: an <b>IP address</b> concatenated with a <b>port</b>. <code>161.25.19.8:1625</code> is port 1625 on host 161.25.19.8. Communication is between a <b>pair of sockets</b>.', 'الـ <b>socket</b> هو endpoint للتواصل، يعني <b><span style="white-space:nowrap">IP address</span></b> وجنبه <b>port</b>. فـ <code>161.25.19.8:1625</code> هي الـ port رقم 1625 على الـ host ده. والتواصل بين <b>pair of sockets</b>.')}</${Def}>
          <${UL} items=${A ? ['الـ ports اللي <b>أقل من 1024</b> هي الـ <b>well known</b> (للخدمات الـ standard).', 'العنوان <code>127.0.0.1</code> هو الـ <b>loopback</b>، يعني السيستم المحلي نفسه.']
            : ['All ports <b>below 1024</b> are <b>well known</b>, used for standard services.', '<code>127.0.0.1</code> is the <b>loopback</b> address: the local system itself.']} />
          <${Hand}>${X('your turn: is the port <b>W</b>ell known, or <b>N</b>ot?', 'دورك: الـ port ده well known ولا لأ؟')}</${Hand}>
          <${Sort} id="sock" bins=${[['W', 'well known'], ['N', 'not well known']]} items=${[['<code>127.0.0.1:80</code>', 0], ['<code>161.25.19.8:1625</code>', 1], ['<code>161.25.19.8:21</code>', 0], ['<code>127.0.0.1:5050</code>', 1]]} />
        `, { sec: t('Sockets', 'الـ Sockets') }),

        // 38–40 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from Exam 2026 and this year's midterm. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحان 2026 والميدترم بتاع السنة دي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m-orph', /whose parent is terminated/i)}
          <${Grow} />
          <${Talk} who="proc" flip=${true}>${t('Hint: whose parent is gone?', 'تلميح: مين اللي الـ parent بتاعه مشي؟')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m-zomb', /has terminated, but whose parent has not yet called wait/i)}
          <${Gap} h=${8} />
          ${mq('m-pass', /The process is a passive entity/i)}
        `),
        page(html`
          ${mq('m-ctx', /saves the state of the currently running process/i)}
          <${Gap} h=${8} />
          ${mq('m-par', /parent process terminates first/i)}
        `),
        page(html`
          ${mq('m-long', /scheduler selects which processes should be brought into the ready queue/i)}
          <${Gap} h=${8} />
          ${mq('m-one', /single-processor system/i)}
        `),

        // bullet points (two pages)
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>process</b> برنامج شغال (active)، والـ program حاجة passive على الـ disk. وفي الـ memory ليها stack وheap وdata وtext.',
            'ليها خمس states هما الـ new والـ ready والـ running والـ waiting والـ terminated، ومفيش سهم من waiting لـ running.',
            'على processor واحد، process واحدة بس تبقى running.',
            'الـ <b>PCB</b> فيه الـ state والـ PC والـ registers، ومعلومات الـ scheduling والـ memory والـ accounting والـ I/O.',
            'فيه تلات queues، هما الـ job والـ ready والـ device.',
            'الـ long-term بيختار مين يدخل الـ ready queue وبيتحكم في الـ degree of multiprogramming، والـ short-term سريع وبيدي الـ CPU، والـ medium-term بيعمل swapping.'
          ] : [
            'A <b>process</b> is a program in execution (active); a program is passive, on disk. In memory: stack, heap, data, text.',
            'Five states: new, ready, running, waiting, terminated. There is no waiting → running arrow.',
            'On a single processor only one process is running at a time.',
            'The <b>PCB</b> holds state, PC, registers, and scheduling, memory, accounting and I/O info.',
            'Queues: job, ready, device.',
            'Long-term: who enters the ready queue (controls the degree of multiprogramming). Short-term: who gets the CPU, fast. Medium-term: swapping.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>context switch</b> بيحفظ الـ state في الـ PCB ويحمّل التانية، وده overhead صافي.',
            'الـ <code>fork()</code> بترجع 0 للـ child والـ PID للـ parent، والـ <code>exec()</code> مابتعملش process جديدة.',
            'الـ zombie خلصت والـ parent لسه ماعملش <code>wait()</code>، والـ orphan الـ parent بتاعها خلص.',
            'الـ IPC ليه موديلين: الـ shared memory (الـ user processes بتتحكم، والمشكلة الـ synchronization)، والـ message passing (من غير shared variables).',
            'الـ blocking يعني synchronous، والاتنين blocking يبقى rendezvous.',
            'الـ socket هو IP address وport، والـ ports اللي أقل من 1024 well known، و<code>127.0.0.1</code> هو الـ loopback.'
          ] : [
            'A <b>context switch</b> saves one state into its PCB and loads another: pure overhead.',
            '<code>fork()</code> returns 0 to the child and the PID to the parent; <code>exec()</code> creates no process.',
            'Zombie: terminated, parent has not called wait(). Orphan: parent terminated.',
            'IPC: shared memory (user processes in control, synchronization is the issue) or message passing (send/receive, no shared variables).',
            'Blocking = synchronous; both blocking = rendezvous.',
            'Socket = IP address + port; ports below 1024 are well known; 127.0.0.1 is loopback.'
          ]} />
        `),

        // 42 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 2!', 'خلّصت الفصل التاني!')}</${H1}>
            <${Talk} who="os">${t('Next time: how I decide who gets the CPU. CPU scheduling!', 'المرة الجاية: أنا بقرر إزاي مين ياخد الـ CPU. الـ CPU scheduling!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [2], t: Date.now() } }}>${t('Quiz me on Lecture 2', 'امتحنّي في محاضرة 2')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 2, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 2, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

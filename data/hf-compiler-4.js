// Head First chapter for Compiler Design Lecture 4 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Syntax analysis: CFGs, derivations, parse trees, ambiguity and left recursion (the slides of Lec 4–5).
// Every fact comes from the lecture's notes; analogies and tricks are marked as ours. Derivations are the notes' own.
// Arabic follows the site's rules: Egyptian colloquial, English technical terms, code in <code>, chains in <span class="ltr">,
// short English pieces with symbols in <bdi dir="ltr">.
(function () {
  const H = window.HF; H.chapters.compiler = H.chapters.compiler || {};
  const { html } = H.K;
  const { useState, useEffect } = React;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T;

  if (!document.getElementById('hf-css-cc4')) {
    const s = document.createElement('style'); s.id = 'hf-css-cc4';
    s.textContent = `
.hfb .hf-c4-io{ display:grid; grid-template-columns:minmax(0,1fr) 20px minmax(0,1.1fr) 20px minmax(0,1fr); align-items:center; gap:2px; }
.hfb .hf-c4-io > div{ border:1.6px solid var(--hf-line); border-radius:8px; padding:6px 5px; text-align:center; background:var(--paper); min-height:62px; display:grid; align-content:center; gap:3px; }
.hfb .hf-c4-io > div.hf-c4-mid{ background:var(--hf-grey); border-width:2.4px; }
.hfb .hf-c4-io small{ font:700 12.5px/1.1 var(--body); color:var(--graphite); text-transform:uppercase; letter-spacing:.05em; }
.hfb .hf-c4-io b{ font:800 14px/1.15 var(--body); color:var(--ink); }
.hfb .hf-c4-io code{ font:700 13px/1.2 var(--mono); color:var(--hf-k); }
.hfb .hf-c4-io .hf-c4-arw{ display:grid; place-items:center; color:var(--hf-k); }
.hfb.hf-ar .hf-c4-io small, .hfb.hf-ar .hf-c4-io b{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hfb .hf-c4-box{ border:2px solid var(--hf-line); border-radius:8px; padding:8px 9px; display:grid; gap:7px; background:var(--paper); }
.hfb .hf-c4-tg{ display:flex; gap:6px; align-items:center; }
.hfb .hf-c4-tg .grow{ flex:1; }
.hfb .hf-c4-tg .hf-btn{ padding:6px 10px; min-height:32px; }
.hfb .hf-c4-tg .hf-btn[aria-pressed="true"]{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-c4-gram{ font:600 13.5px/1.45 var(--mono); color:var(--ink); background:var(--hf-grey); padding:4px 8px; border-radius:5px; white-space:pre; text-align:left; }
.hfb .hf-c4-tb{ width:100%; border-collapse:collapse; font:600 13.5px/1.25 var(--mono); color:var(--ink); }
.hfb .hf-c4-tb td{ padding:2px 4px; border-bottom:1px dotted var(--line); vertical-align:middle; text-align:left; }
.hfb .hf-c4-tb td.hf-c4-r{ color:var(--graphite); font-size:13px; white-space:nowrap; width:1%; }
.hfb .hf-c4-tb tr.hf-c4-now td{ border-bottom:0; padding-top:5px; }
.hfb .hf-c4-chips{ display:flex; flex-wrap:wrap; gap:4px; align-items:center; }
.hfb .hf-c4-chip{ font:700 15px/1 var(--mono); min-width:32px; height:32px; padding:0 7px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); display:inline-grid; place-items:center; }
.hfb button.hf-c4-chip{ cursor:pointer; border-color:var(--hf-k); color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 10%, var(--paper)); }
.hfb button.hf-c4-chip.sel{ background:var(--hf-k); color:var(--paper); }
.hfb button.hf-c4-chip.no{ border-color:var(--hf-red); color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); }
.hfb .hf-c4-ops{ display:flex; flex-wrap:wrap; gap:5px; }
.hfb .hf-c4-ops button{ font:700 13.5px/1 var(--mono); padding:7px 10px; min-height:32px; border-radius:6px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-c4-fb{ font:500 13.5px/1.3 var(--body); margin:0; min-height:1.3em; color:var(--ink); }
.hfb .hf-c4-fb.no{ color:var(--hf-red); } .hfb .hf-c4-fb.ok{ color:var(--ok); font-weight:600; }
.hfb.hf-ar .hf-c4-fb{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hfb .hf-c4-fb code{ font-family:var(--mono); font-size:.9em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-c4-tabs{ display:flex; gap:4px; }
.hfb .hf-c4-tabs button{ flex:1 1 0; font:800 14px/1 var(--body); min-height:32px; border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-c4-tabs button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-c4-rule{ font:700 18px/1.2 var(--mono); text-align:center; color:var(--ink); margin:0; }
.hfb .hf-c4-alts{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; }
.hfb .hf-c4-alt{ display:grid; justify-items:center; gap:2px; font:700 14px/1 var(--mono); padding:5px 8px; min-width:62px; border-radius:7px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-c4-alt i{ font:800 12.5px/1 var(--body); font-style:normal; color:var(--graphite); padding:2px 6px; border-radius:999px; background:var(--hf-grey2); }
.hfb .hf-c4-alt.hf-c4-ia i{ background:var(--hf-k); color:var(--paper); }
.hfb .hf-c4-alt.hf-c4-ib i{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-c4-alt.ok{ border-color:var(--ok); } .hfb .hf-c4-alt.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
.hfb .hf-c4-alt small{ font:600 12.5px/1 var(--mono); color:var(--hf-k); }
.hfb .hf-c4-pick{ display:grid; gap:5px; }
.hfb .hf-c4-pick button{ text-align:left; font:600 13.5px/1.4 var(--mono); padding:5px 9px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; white-space:pre; }
.hfb .hf-c4-pick button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hfb .hf-c4-pick button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); }
.hfb .hf-c4-step{ font:700 13.5px/1.3 var(--body); margin:0; color:var(--ink); }
.hfb.hf-ar .hf-c4-step{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-c4-two{ width:100%; border-collapse:collapse; font:600 13.5px/1.2 var(--mono); color:var(--ink); }
.hfb .hf-c4-two th{ font:800 12.5px/1 var(--body); text-transform:uppercase; letter-spacing:.05em; color:var(--graphite); text-align:left; padding:0 4px 5px; border-bottom:2px solid var(--hf-line); }
.hfb .hf-c4-two td{ padding:4px 4px; border-bottom:1px dotted var(--line); text-align:left; white-space:nowrap; }
.hfb .hf-c4-two td small{ display:block; font:600 11.5px/1.1 var(--mono); color:var(--graphite); margin-top:2px; }
.hfb .hf-c4-two td.hf-c4-k{ color:var(--graphite); font-size:12.5px; width:1%; }
.hfb .hf-c4-two tr.hf-c4-d td:not(.hf-c4-k){ color:var(--hf-k); }
.hfb .hf-c4-two tr.hf-c4-split td:not(.hf-c4-k){ background:color-mix(in srgb, var(--hf-k) 12%, transparent); font-weight:800; }
.hfb .hf-c4-two tr.hf-c4-split td small{ color:var(--hf-k); }
`;
    document.head.appendChild(s);
  }

  const ARW = html`<svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><path d="M1 7h14M10 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>`;
  // the parser in one picture: tokens in, parse tree out, the CFG's rules in the middle
  function ParserIO() {
    const ar = useAr();
    return html`<div className="hf-c4-io hf-in" dir="ltr" aria-label="Tokens go into the parser, a parse tree comes out">
      <div><small>${ar ? 'الداخل' : 'input'}</small><b>${ar ? 'الـ tokens' : 'Stream of tokens'}</b><code>int*int</code></div>
      <span className="hf-c4-arw">${ARW}</span>
      <div className="hf-c4-mid"><small>${ar ? 'بيقارن بالـ' : 'checks the'}</small><b>${ar ? 'الـ parser' : 'Parser'}</b><code>CFG rules</code></div>
      <span className="hf-c4-arw">${ARW}</span>
      <div><small>${ar ? 'الطالع' : 'output'}</small><b>${ar ? 'الـ parse tree' : 'Parse tree'}</b><code>${ar ? 'أو errors' : 'or errors'}</code></div>
    </div>`;
  }

  // Be the parser: derive int * int with the slide-8 grammar, leftmost or rightmost, choosing the non-terminal and the production
  const DG_P = { E: [['T', 'X']], X: [['+', 'E'], []], T: [['int', 'Y'], ['(', 'E', ')']], Y: [['*', 'T'], []] };
  const DG_SEQ = { L: [['E', 0], ['T', 0], ['Y', 0], ['T', 0], ['Y', 1], ['X', 1]], R: [['E', 0], ['X', 1], ['T', 0], ['Y', 0], ['T', 0], ['Y', 1]] };
  const isNT = s => !!DG_P[s];
  const rhs = alt => alt.length ? alt.join(' ') : 'ε';
  const dgForms = m => {
    let f = ['E']; const out = [{ f, r: null }];
    DG_SEQ[m].forEach(([s, j]) => {
      const idx = f.map((x, i) => isNT(x) ? i : -1).filter(i => i >= 0), k = m === 'L' ? idx[0] : idx[idx.length - 1];
      f = f.slice(0, k).concat(DG_P[s][j], f.slice(k + 1)); out.push({ f, r: s + ' → ' + rhs(DG_P[s][j]) });
    });
    return out;
  };
  const DG_F = { L: dgForms('L'), R: dgForms('R') };
  const DG_WHY = {
    X0: ['There is no <b>+</b> in <code>int * int</code>, so <code>X → + E</code> can\'t lead there.', 'مفيش <bdi dir="ltr">+</bdi> في <code>int * int</code>، فالـ production دي مش هتوصلك.'],
    T1: ['There are no parentheses in <code>int * int</code>.', 'مفيش أقواس في <code>int * int</code>.'],
    Y1: ['With <code>Y → ε</code> here, nothing could ever make the <b>*</b>.', 'لو استخدمت <code>Y → ε</code> هنا، مفيش حاجة هتطلّع الـ <bdi dir="ltr">*</bdi> بعد كده.'],
    Y0: ['That adds a second <b>*</b>, and <code>int * int</code> has only one.', 'كده هتزوّد <bdi dir="ltr">*</bdi> تانية، و<code>int * int</code> فيها واحدة بس.']
  };
  function DeriveGame() {
    const ar = useAr();
    const [m, setM] = H.K.useSlot('dg-m', 'L');
    const [ks, setKs] = H.K.useSlot('dg-k', { L: 0, R: 0 });
    const [sel, setSel] = useState(false);
    const [fb, setFb] = useState(null);
    useEffect(() => { setSel(false); setFb(null); }, [m]);
    const L = m === 'L', k = ks[m] || 0, F = DG_F[m], n = DG_SEQ[m].length, done = k >= n;
    const cur = F[k].f, idx = cur.map((x, i) => isNT(x) ? i : -1).filter(i => i >= 0), want = done ? -1 : (L ? idx[0] : idx[idx.length - 1]);
    const side = L ? t2(ar, 'leftmost', 'الشمال') : t2(ar, 'rightmost', 'اليمين');
    const setK = v => setKs(Object.assign({}, ks, { [m]: v }));
    const tapNT = i => {
      if (done) return;
      if (i === want) { setSel(true); setFb(null); return; }
      setSel(false);
      setFb(['no', ar ? `مش ده: الـ ${L ? 'leftmost' : 'rightmost'} derivation دايمًا بيبدّل الـ non-terminal اللي على أقصى ${side}.` : `Not that one: a ${side} derivation always replaces the <b>${side}</b> non-terminal.`]);
    };
    const pick = j => {
      const [s, good] = DG_SEQ[m][k];
      if (j === good) { setK(k + 1); setSel(false); setFb(k + 1 >= n ? ['ok', ar ? `خلصنا: وصلت لـ <code>int * int</code> في <bdi dir="ltr">${n}</bdi> خطوات، ${L ? 'leftmost' : 'rightmost'} derivation مظبوط.` : `Done: <code>int * int</code> in ${n} steps, a perfect ${side} derivation.`] : ['ok', '✓']); return; }
      const w = DG_WHY[s + j]; setFb(['no', w ? w[ar ? 1 : 0] : (ar ? 'الـ production دي مش هتوصلك لـ <code>int * int</code>.' : 'That production can\'t lead to <code>int * int</code>.')]);
    };
    const sym = want >= 0 ? cur[want] : null;
    const prompt = done ? null : sel ? (ar ? `اختار production للـ <code>${sym}</code>:` : `Now pick a production for <b>${sym}</b>:`) : (ar ? `دوس على الـ non-terminal اللي على أقصى ${side}.` : `Tap the <b>${side}</b> non-terminal.`);
    return html`<div className="hf-c4-box hf-in">
      <div className="hf-c4-tg" role="group" aria-label="Derivation order">
        <button className="hf-btn" aria-pressed=${String(L)} onClick=${() => setM('L')}>${ar ? 'الـ Leftmost' : 'Leftmost'}</button>
        <button className="hf-btn" aria-pressed=${String(!L)} onClick=${() => setM('R')}>${ar ? 'الـ Rightmost' : 'Rightmost'}</button>
        <span className="grow"></span><span className="hf-score"><bdi>${k} / ${n}</bdi></span>
      </div>
      <div className="hf-c4-gram" dir="ltr">${['E → T X        X → + E | ε', 'T → int Y | ( E )   Y → * T | ε'].join('\n')}</div>
      <table className="hf-c4-tb" dir="ltr"><tbody>
        ${F.slice(0, k).map((o, i) => html`<tr key=${i}><td className="hf-c4-r">${o.r || 'start'}</td><td>${i ? '⇒ ' : ''}${o.f.join(' ')}</td></tr>`)}
        <tr className="hf-c4-now"><td className="hf-c4-r">${done ? F[k].r : k ? '⇒' : 'start'}</td><td><div className="hf-c4-chips">${done ? html`<b>${'⇒ ' + cur.join(' ')}</b>` : cur.map((s, i) => isNT(s)
          ? html`<button key=${i + s} className=${'hf-c4-chip' + (sel && i === want ? ' sel' : '')} onClick=${() => tapNT(i)} aria-label=${'Replace ' + s}>${s}</button>`
          : html`<span key=${i + s} className="hf-c4-chip">${s}</span>`)}</div></td></tr>
      </tbody></table>
      ${prompt && html`<p className="hf-c4-fb" dir=${ar ? 'rtl' : 'ltr'}>${T(prompt)}</p>`}
      ${sel && !done && html`<div className="hf-c4-ops" dir="ltr">${DG_P[sym].map((alt, j) => html`<button key=${j} onClick=${() => pick(j)}>${sym} → ${rhs(alt)}</button>`)}</div>`}
      ${fb && html`<p className=${'hf-c4-fb ' + fb[0]} dir=${ar ? 'rtl' : 'ltr'}>${T(fb[1])}</p>`}
      <div className="hf-row">
        <button className="hf-btn" onClick=${() => { setK(n); setSel(false); setFb(null); }} disabled=${done}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        <button className="hf-btn" onClick=${() => { setK(0); setSel(false); setFb(null); }} disabled=${!k}>${ar ? 'من الأول' : 'Start over'}</button>
      </div>
    </div>`;
  }
  function t2(ar, en, a) { return ar ? a : en; }

  // the sheets' 001101 proof: the two leftmost derivations side by side, splitting at step 3
  const P001 = [['S', '', 'S', ''], ['0A', 'S → 0A', '0A', 'S → 0A'], ['00AA', 'A → 0AA', '00AA', 'A → 0AA'], ['001SA', 'A → 1S', '001A', 'A → 1'],
    ['0011BA', 'S → 1B', '0011S', 'A → 1S'], ['00110A', 'B → 0', '00110A', 'S → 0A'], ['001101', 'A → 1', '001101', 'A → 1']];
  function TwoLmd() {
    return html`<table className="hf-c4-two hf-in" dir="ltr"><thead><tr><th></th><th>LMD 1</th><th>LMD 2</th></tr></thead><tbody>
      ${P001.map((r, i) => html`<tr key=${i} className=${(i === 3 ? 'hf-c4-split ' : '') + (i >= 3 ? 'hf-c4-d' : '')} style=${{ animation: calm() ? 'none' : 'hf-up .4s ' + (0.1 + i * 0.12) + 's both' }}>
        <td className="hf-c4-k">${i}</td><td>${i ? '⇒ ' : ''}${r[0]}${r[1] && html`<small>${r[1]}</small>`}</td><td>${i ? '⇒ ' : ''}${r[2]}${r[3] && html`<small>${r[3]}</small>`}</td></tr>`)}
    </tbody></table>`;
  }

  // remove the left recursion yourself: label each alternative Aα or β, then pick the right rewrite
  const LR_RULES = [
    { A: 'E', alts: [['E', '+', 'T'], ['T']] },
    { A: 'A', alts: [['A', 'b'], ['c']] },
    { A: 'A', alts: [['A', 'b', 'c'], ['b']] },
    { A: 'A', alts: [['a', 'B'], ['A', 'd']] },
    { A: 'A', alts: [['A', 'B', 'α'], ['A', 'a'], ['a']] }
  ];
  const LR_PERM = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [1, 2, 0], [0, 2, 1]];
  const cat = a => a.join('');
  const lrInfo = i => {
    const R = LR_RULES[i], A = R.A, Ap = A + "'";
    const al = R.alts.filter(x => x[0] === A).map(x => x.slice(1)), be = R.alts.filter(x => x[0] !== A);
    const side = xs => xs.map(x => cat(x) + Ap).join(' | ');
    const kinds = [[A + ' → ' + side(be), Ap + ' → ' + side(al) + ' | ε'], [A + ' → ' + side(al), Ap + ' → ' + side(be) + ' | ε'], [A + ' → ' + side(be), Ap + ' → ' + side(al)]];
    return { A, Ap, al, be, rule: A + ' → ' + R.alts.map(cat).join(' | '), opts: LR_PERM[i].map(k => ({ k, l: kinds[k] })), good: LR_PERM[i].indexOf(0) };
  };
  function LrDrill() {
    const ar = useAr();
    const [ri, setRi] = H.K.useSlot('lr-i', 0);
    const [labs, setLabs] = H.K.useSlot('lr-lab', {});
    const [c1, setC1] = H.K.useSlot('lr-c1', {});
    const [picks, setPicks] = H.K.useSlot('lr-pick', {});
    const I = lrInfo(ri), R = LR_RULES[ri], lab = labs[ri] || {}, chk = !!c1[ri], pk = picks[ri];
    const right = j => R.alts[j][0] === I.A ? 1 : 2;
    const allSet = R.alts.every((_, j) => lab[j]), allOk = R.alts.every((_, j) => lab[j] === right(j)), ok1 = chk && allOk;
    const cycle = j => { if (ok1) return; const nl = Object.assign({}, lab, { [j]: lab[j] === 1 ? 2 : 1 }); setLabs(Object.assign({}, labs, { [ri]: nl })); setC1(Object.assign({}, c1, { [ri]: false })); };
    const show = () => { const nl = {}; R.alts.forEach((_, j) => { nl[j] = right(j); }); setLabs(Object.assign({}, labs, { [ri]: nl })); setC1(Object.assign({}, c1, { [ri]: true })); setPicks(Object.assign({}, picks, { [ri]: I.good })); };
    const als = I.al.map(cat).join(', '), bes = I.be.map(cat).join(', ');
    let fb1 = null;
    if (chk && !allOk) fb1 = ['no', !allSet ? (ar ? 'علّم كل الاختيارات الأول.' : 'Label every alternative first.') : (ar ? `لسه: الاختيار يبقى Aα بس لو بيبدأ بالـ <code>${I.A}</code> نفسه.` : `Not yet: an alternative is Aα only if it starts with <code>${I.A}</code> itself.`)];
    let fb2 = null;
    if (ok1 && pk != null) {
      const kd = I.opts[pk].k;
      fb2 = kd === 0 ? ['ok', ar ? `صح. الـ β هي <code>${bes}</code> وبتبدأ الـ <code>${I.A}</code>، وكل α بتتكرر في الـ <code>${I.Ap}</code>، والـ ε بتخليه يقف.` : `Right. β = <code>${bes}</code> starts ${I.A}; each α (<code>${als}</code>) repeats in ${I.Ap}, and ε lets it stop.`]
        : kd === 1 ? ['no', ar ? 'إنت بدّلت الـ α والـ β: الـ β اللي مش recursive هي اللي لازم تبدأ بيها.' : 'α and β are swapped: the non-recursive β must start ' + I.A + '.']
        : ['no', ar ? `من غير <code>${I.Ap} → ε</code> الـ derivation عمره ما هيقف.` : `Without <code>${I.Ap} → ε</code> the derivation can never stop.`];
    }
    return html`<div className="hf-c4-box hf-in">
      <div className="hf-c4-tabs" dir="ltr" role="group" aria-label="Rules">${LR_RULES.map((_, j) => html`<button key=${j} aria-pressed=${String(j === ri)} onClick=${() => setRi(j)} aria-label=${lrInfo(j).rule}>${j + 1}</button>`)}</div>
      <p className="hf-c4-rule" dir="ltr">${I.rule}</p>
      <p className="hf-c4-step" dir=${ar ? 'rtl' : 'ltr'}>${T(ar ? `الخطوة 1: دوس على كل اختيار وعلّمه <b>Aα</b> لو بيبدأ بالـ <code>${I.A}</code> نفسه، أو <b>β</b> لو لأ.` : `Step 1: tap each alternative to label it <b>Aα</b> if it starts with <code>${I.A}</code> itself, or <b>β</b> if it doesn't.`)}</p>
      <div className="hf-c4-alts" dir="ltr">${R.alts.map((x, j) => html`<button key=${j} className=${'hf-c4-alt' + (lab[j] === 1 ? ' hf-c4-ia' : lab[j] === 2 ? ' hf-c4-ib' : '') + (chk && lab[j] ? (lab[j] === right(j) ? ' ok' : ' no') : '')} onClick=${() => cycle(j)} aria-label=${cat(x)}>
        <span>${cat(x)}</span><i>${lab[j] === 1 ? 'Aα' : lab[j] === 2 ? 'β' : '?'}</i>${ok1 && x[0] === I.A ? html`<small>α = ${cat(x.slice(1))}</small>` : null}</button>`)}</div>
      ${!ok1 && html`<div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setC1(Object.assign({}, c1, { [ri]: true }))}>${ar ? 'صحّح الخطوة 1' : 'Check step 1'}</button>
        <button className="hf-btn" onClick=${show}>${ar ? 'ورّيني الحل' : 'Show me'}</button></div>`}
      ${fb1 && html`<p className=${'hf-c4-fb ' + fb1[0]} dir=${ar ? 'rtl' : 'ltr'}>${T(fb1[1])}</p>`}
      ${ok1 && html`<p className="hf-c4-step" dir=${ar ? 'rtl' : 'ltr'}>${ar ? 'الخطوة 2: أنهي كتابة جديدة هي الصح؟' : 'Step 2: which rewrite is right?'}</p>
        <div className="hf-c4-pick" dir="ltr">${I.opts.map((o, j) => html`<button key=${j} className=${pk == null ? '' : o.k === 0 ? 'ok' : j === pk ? 'no' : ''} onClick=${() => setPicks(Object.assign({}, picks, { [ri]: j }))}>${o.l.join('\n')}</button>`)}</div>`}
      ${fb2 && html`<p className=${'hf-c4-fb ' + fb2[0]} dir=${ar ? 'rtl' : 'ltr'}>${T(fb2[1])}</p>`}
    </div>`;
  }

  H.chapters.compiler[4] = {
    title: 'Syntax Analysis: CFGs, Derivations, Ambiguity',
    kicker: 'Chapter 4',
    run: 'syntax analysis',
    ar: { title: 'تحليل الـ Syntax والـ CFG والـ Ambiguity', kicker: 'الفصل 4', run: 'تحليل الـ syntax' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Reveal, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => K.T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 4);
      const arQuiz = (window.AR && window.AR.compiler && window.AR.compiler.lectures && window.AR.compiler.lectures[4] && window.AR.compiler.lectures[4].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const li = xs => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${xs.map((x, i) => html`<li key=${i} className="hf-li">${K.T(x)}</li>`)}</ul>`;
      return [
        // 0 · recap and how to read (faces the opener)
        page(html`
          <${H2}>${t('Where we are', 'إحنا فين')}</${H2}>
          <${P} small=${true}>${X('Chapters 2 and 3 built the <b>lexer</b>: regular expressions and finite automata (NFA → DFA) that read characters and hand out <b>tokens</b>. This chapter is about what happens to those tokens next.',
            'في الفصل 2 و3 بنينا الـ <b>lexer</b>: الـ regular expressions والـ finite automata (من NFA لـ DFA) اللي بتقرا الحروف وتطلّع <b>tokens</b>. الفصل ده عن اللي بيحصل للـ tokens دي بعد كده.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises</b> on the page: seven of them, with Check and Show buttons.', '<b>حل التمارين</b> على الصفحة نفسها: سبعة، وكل واحد فيه صحّح وورّيني.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are traps from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ من امتحانات الدكاترة نفسهم.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" دي تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('A regular expression can recognise <code>(</code> and <code>)</code> as tokens. But can it check that <b>every</b> <code>(</code> has its own <code>)</code>, however deep they nest? Think before you turn the page.',
            'الـ regular expression تقدر تعرف إن <code>(</code> و<code>)</code> tokens. بس تقدر تتشيك إن <b>كل</b> <code>(</code> ليه <code>)</code> بتاعه، مهما اتداخلوا؟ فكّر قبل ما تقلب الصفحة.')}</p></${Box}>
        `, { sec: t('Before you start', 'قبل ما تبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">4</span><span className="t">${A ? html`الفصل الرابع<br/>Compiler Design` : html`Chapter four<br/>Compiler Design`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('The Grammar Police', 'بوليس الـ Grammar')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('syntax analysis', 'الـ syntax analysis')}</p></div>
          <${P}>${X('The lexer just handed over a neat row of tokens, and every one of them is a real token. But is the <i>sentence</i> they make legal?',
            'الـ lexer لسه مسلّم صف tokens مترتب، وكل واحدة فيهم token سليمة. بس هل الـ<i>جملة</i> اللي عاملينها صح؟')}</${P}>
          <${Talk} who="dev">${X('My lexer was perfectly happy with <code>(int*int</code>.', 'الـ lexer كان مبسوط خالص بـ <code>(int*int</code>.')}</${Talk}>
          <${Talk} who="compiler" flip=${true}>${X("Every token is fine. But that <b>(</b> never closes. Checking structure is <b>my</b> job: I'm the parser.", 'كل token سليمة. بس القوس ده عمره ما اتقفل. الـ structure ده <b>شغلتي أنا</b>، أنا الـ parser.')}</${Talk}>
          <${P} small=${true}>${X("In this chapter you'll meet the parser's rulebook (the <b>context-free grammar</b>), do <b>derivations</b> with your own hands, grow <b>parse trees</b>, catch an <b>ambiguous</b> grammar red-handed and break the <b>left recursion</b> loop.",
            'في الفصل ده هتتعرف على كتاب قواعد الـ parser (الـ <b>context-free grammar</b>)، وتعمل <b>derivations</b> بإيدك، وتزرع <b>parse trees</b>، وتمسك <b>ambiguous</b> grammar متلبّسة، وتكسر لفّة الـ <b>left recursion</b>.')}</${P}>
        `, { sec: t('Meet the parser', 'اتعرّف على الـ parser') }),

        // 2 · why the lexer can't
        page(html`
          <${H1}>${t("Why can't the lexer just do it?", 'ليه الـ lexer ميعملهاش هو؟')}</${H1}>
          <${P}>${X('Syntax analysis, also called <b>parsing</b>, is the <b>second phase</b> of the compiler. The lexer before it finds tokens with <b>regular expressions</b>, but it <b>cannot check the syntax</b> of a sentence, because of the limits of regular expressions.',
            'الـ syntax analysis، أو الـ <b>parsing</b>، هو <b>تاني phase</b> في الـ compiler. الـ lexer اللي قبله بيلاقي الـ tokens بالـ <b>regular expressions</b>، بس <b>مايقدرش يتشيك على الـ syntax</b> بتاع الجملة بسبب حدودها.')}</${P}>
          <${Def}>${X('Regular expressions <b>cannot check balancing tokens</b> such as parentheses. So this phase uses a <b>context-free grammar (CFG)</b>.',
            'الـ regular expressions <b>ماتقدرش تتشيك على الـ tokens المتوازنة</b> زي الأقواس. عشان كده الـ phase دي بتستخدم <b>context-free grammar (CFG)</b>.')}</${Def}>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': the lexer is a spell-checker, every word on its own is fine. The parser is the grammar teacher: are the words in a legal order, and does every bracket close?",
            'تشبيه من عندنا: الـ lexer زي الـ spell-checker بيشوف كل كلمة لوحدها، والـ parser زي مدرّس الـ grammar بيشوف الترتيب، وكل قوس اتقفل ولا لأ.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Syntax analysis is <b>modeled on a context-free grammar</b>, and it is the phase that checks the grammar of the program. A regular grammar models <b>lexical</b> analysis.',
            'الـ syntax analysis <b>معمول على أساس context-free grammar</b>، وهو اللي بيتشيك على الـ grammar بتاعة البرنامج. أما الـ regular grammar فدي بتاعة الـ <b>lexical</b> analysis.')}</p></${Box}>
        `, { sec: t('Why a CFG?', 'ليه CFG؟') }),

        // 3 · the pipeline figure
        page(html`
          <${H2}>${t("Watch the parser catch what the lexer can't", 'اتفرج على الـ parser وهو بيمسك اللي الـ lexer مشافوش')}</${H2}>
          <${P} small=${true}>${X('Pick <code>(int*int</code>: the lexer passes its tokens without complaint; only the CFG sees that the structure is wrong.', 'اختار <code>(int*int</code>: الـ lexer هيعدّي الـ tokens بتاعتها عادي، والـ CFG بس هي اللي هتشوف إن الـ structure غلط.')}</${P}>
          <${Fig} name="cc-parse-pipeline" />
        `),

        // 4 · the parser's job
        page(html`
          <${H2}>${t("The parser's job in one picture", 'شغلانة الـ parser في صورة واحدة')}</${H2}>
          <${ParserIO} />
          ${li(A ? [
            'الـ input بتاعه هو الـ <b>stream of tokens</b> اللي جاي من الـ lexer.',
            'والـ output بتاعه <b>parse tree</b>.',
            'والـ <b>parsing</b> إننا نلاقي parse tree لـ string من الـ tokens.'
          ] : [
            'Input: the <b>stream of tokens</b> from the lexer.',
            'Output: a <b>parse tree</b>.',
            '<b>Parsing</b> = the process of finding a parse tree for a string of tokens.'
          ])}
          <${Grow} />
          ${mq('m-io', /syntax analyzer takes/i)}
        `),

        // 5 · exercise: lexer or parser
        page(html`
          <${Box} kind="pencil" title=${t('Lexer or parser?', 'الـ lexer ولا الـ parser؟')}><p className="hf-p small">${X('Tap <b>L</b> for the lexer or <b>P</b> for the parser, then check.', 'دوس <b>L</b> للـ lexer أو <b>P</b> للـ parser، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="lp" bins=${A ? [['L', 'الـ Lexer'], ['P', 'الـ Parser']] : [['L', 'Lexer'], ['P', 'Parser']]} items=${A ? [
            ['بيستخدم الـ regular expressions', 0],
            ['معمول على أساس context-free grammar', 1],
            ['بيطلّع الـ stream of tokens', 0],
            ['بياخد الـ stream of tokens كـ input', 1],
            ['يقدر يتشيك إن الأقواس متوازنة', 1],
            ['بيطلّع parse tree', 1],
            ['أول phase في الـ compiler', 0],
            ['بيتشيك على الـ grammar بتاعة البرنامج', 1]
          ] : [
            ['Uses regular expressions', 0],
            ['Is modeled on a context-free grammar', 1],
            ['Produces the stream of tokens', 0],
            ['Takes the stream of tokens as input', 1],
            ['Can check that parentheses balance', 1],
            ['Outputs a parse tree', 1],
            ['Is the first phase of the compiler', 0],
            ['Checks the grammar of the program', 1]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('if it needs balanced brackets or a tree, it is the parser', 'لو محتاج أقواس متوازنة أو شجرة، يبقى ده الـ parser')}</${Hand}>
        `, { sec: t('Exercises: lexer or parser', 'تمرين: الـ lexer ولا الـ parser') }),

        // 6 · the four components of a CFG
        page(html`
          <${H1}>${t('Four parts make a grammar', 'الـ grammar ليها أربع أجزاء')}</${H1}>
          <${P} small=${true}>${X("The parser's rulebook is a <b>context-free grammar</b>. Every CFG has exactly four components:", 'كتاب القواعد بتاع الـ parser هو الـ <b>context-free grammar</b>، وأي CFG ليها أربع components بالظبط:')}</${P}>
          ${li(A ? [
            'الـ <b>Non-terminals (V)</b> هي syntactic variables بتمثّل sets من الـ strings.',
            'الـ <b>Terminals (Σ)</b> هي الـ tokens، الرموز الأساسية اللي الـ strings بتتكوّن منها.',
            'الـ <b>Productions (P)</b> بتقول الـ terminals والـ non-terminals بيتجمعوا إزاي: non-terminal على الشمال، وسهم، وعلى اليمين tokens و/أو non-terminals.',
            'الـ <b>Start symbol (S)</b> هو المكان اللي الـ derivation بيبدأ منه.',
            'و<b>مفيش حاجة اسمها "end symbol"</b> في الـ CFG، ودي اختيار غلط مشهور في الامتحانات.'
          ] : [
            '<b>Non-terminals (V)</b>: syntactic variables that denote sets of strings.',
            '<b>Terminals (Σ)</b>: the tokens, the basic symbols strings are formed from.',
            '<b>Productions (P)</b>: how terminals and non-terminals combine. Left side: a non-terminal; then an arrow; right side: tokens and/or non-terminals.',
            '<b>Start symbol (S)</b>: where derivation begins.',
            'There is <b>no "end symbol"</b> in a CFG, a favourite wrong option in the exams.'
          ])}
          <${Code} lines=${[['S → ABC', t('← the start symbol', 'الـ start symbol')], 'A → a | Aa', 'B → b | Bb', 'C → c']} />
        `, { sec: t('Context-free grammars', 'الـ Context-free grammars') }),

        // 7 · figure + no end symbol
        page(html`
          <${H2}>${t('The slide-5 grammar, part by part', 'الـ grammar بتاعة slide 5، جزء جزء')}</${H2}>
          <${Fig} name="cc-cfg-parts" />
        `),

        // 8 · exercise: terminal or non-terminal
        page(html`
          <${Box} kind="pencil" title=${t('Terminal or non-terminal?', 'ده terminal ولا non-terminal؟')}><p className="hf-p small">${t("Slide 8's grammar. Tap N or T for each symbol, then check. Hint: non-terminals are the left sides, and a left side is never a terminal.", 'دي الـ grammar بتاعة slide 8. دوس N أو T لكل symbol وصحّح. تلميح: الـ non-terminals هي الـ left sides.')}</p></${Box}>
          <${Code} lines=${['E → TX          X → +E | ε', 'T → int Y | (E)  Y → *T | ε']} />
          <${Sort} id="nt" bins=${A ? [['N', 'non-terminal'], ['T', 'terminal']] : [['N', 'non-terminal'], ['T', 'terminal']]} items=${[
            ['<code>E</code>', 0], ['<code>int</code>', 1], ['<code>X</code>', 0], ['<code>+</code>', 1], ['<code>Y</code>', 0], ['<code>(</code>', 1]
          ]} />
        `),

        // 9 · derivations
        page(html`
          <${H1}>${t('Derivations: one swap at a time', 'الـ Derivation: تبديلة ورا تبديلة')}</${H1}>
          <${Def}>${X('A <b>derivation</b> is a sequence of production rules applied to get the input string. It begins at the <b>start symbol</b> and keeps replacing a non-terminal by the right side of a production.',
            'الـ <b>derivation</b> هو سلسلة production rules بنطبّقها عشان نوصل للـ input string. بيبدأ من الـ <b>start symbol</b>، ونفضل نبدّل non-terminal بالـ right side بتاع production ليه.')}</${Def}>
          <${P} small=${true}>${X('At every step you make <b>two decisions</b>: (1) <b>which non-terminal</b> to replace, (2) <b>which production</b> to use.',
            'وفي كل خطوة بتاخد <b>قرارين</b>: (1) <b>أنهي non-terminal</b> هتبدّله، و(2) <b>أنهي production</b> هتستخدمها.')}</${P}>
          ${li(A ? [
            'الـ <b>leftmost derivation</b>: دايمًا بدّل الـ non-terminal اللي على <b>أقصى الشمال</b> (امشي من الشمال لليمين).',
            'الـ <b>rightmost derivation</b>: دايمًا بدّل اللي على <b>أقصى اليمين</b> (امشي من اليمين للشمال).'
          ] : [
            '<b>Leftmost derivation</b>: always replace the <b>leftmost</b> non-terminal (scan left to right).',
            '<b>Rightmost derivation</b>: always replace the <b>rightmost</b> one (scan right to left).'
          ])}
          <${Gap} h=${4} />
          <${Hand} tilt=${true}>${t('Trick (ours): leftmost reads like English; rightmost reads like Arabic.', 'حيلة من عندنا: الـ rightmost بيقرا زي العربي، والـ leftmost زي الإنجليزي.')}</${Hand}>
          <${Grow} />
        `, { sec: t('Derivations', 'الـ Derivations') }),

        // 11 · be the parser
        page(html`
          <${H2}>${A ? html`خليك إنت الـ parser: اعمل derive لـ <bdi dir="ltr">int * int</bdi>` : 'Be the parser: derive int * int'}</${H2}>
          <${P} small=${true}>${X('The slide-8 grammar. Choose an order, tap the non-terminal that order says to replace, then tap the production.', 'دي الـ grammar بتاعة slide 8. اختار الترتيب، ودوس على الـ non-terminal اللي الترتيب ده بيقول عليه، وبعدين دوس على الـ production.')}</${P}>
          <${DeriveGame} />
        `, { sec: t('Leftmost and rightmost', 'الـ Leftmost والـ rightmost') }),

        // 12 · the slide-8 table
        page(html`
          <${H2}>${t('The slide-8 table, step by step', 'جدول slide 8 خطوة خطوة')}</${H2}>
          <${Fig} name="cc-int-derive" />
        `),

        // 13 · top-down and bottom-up
        page(html`
          <${H2}>${t('Which parser makes which derivation?', 'أنهي parser بيطلّع أنهي derivation؟')}</${H2}>
          <${P} small=${true}>${X('A <b>top-down</b> parser produces a <b>leftmost derivation</b>. <b>Bottom-up</b> parsers (shift-reduce, LR) produce a <b>rightmost derivation in reverse</b>.',
            'الـ <b>top-down</b> parser بيطلّع <b>leftmost derivation</b>. والـ <b>bottom-up</b> parsers (الـ shift-reduce والـ LR) بيطلّعوا <b>rightmost derivation بالعكس</b>.')}</${P}>
          <${Fig} name="cc-top-bottom" />
        `),

        // 14–15 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight's talk: the Leftmost and the Rightmost derivation compare notes on int*int.", 'قعدة الليلة: الـ Leftmost والـ Rightmost derivation بيقارنوا شغلهم على int*int.')} />
          <${Chat} names=${[t('Leftmost', 'الـ Leftmost'), t('Rightmost', 'الـ Rightmost')]} lines=${A ? [
            [0, 'أنا دايمًا ببدّل الـ non-terminal اللي على <b>أقصى الشمال</b>. بمشي على الـ sentential form من الشمال لليمين.'],
            [1, 'وأنا دايمًا ببدّل اللي على <b>أقصى اليمين</b>، من اليمين للشمال.'],
            [0, 'الـ <b>top-down</b> parser بيطلّعني. بيبدأ من الـ root، الـ start symbol، وينزل لحد الـ tokens.'],
            [1, 'والـ <b>bottom-up</b> parsers (الـ shift-reduce والـ LR) بيطلّعوني أنا، بس <b>بالعكس</b>: من الـ tokens لفوق لحد الـ start symbol.'],
            [0, 'وفي <code>int*int</code> إنت مستعجل وبتشيل الـ X في تاني خطوة. أنا بسيبه لآخر خطوة.'],
            [1, 'بس إحنا الاتنين بنستخدم نفس الـ productions، بترتيب مختلف.']
          ] : [
            [0, 'I always replace the <b>leftmost</b> non-terminal. I scan the sentential form left to right.'],
            [1, 'And I always replace the <b>rightmost</b> one, scanning right to left.'],
            [0, 'A <b>top-down</b> parser produces me. It starts at the root, the start symbol, and expands down toward the tokens.'],
            [1, '<b>Bottom-up</b> parsers (shift-reduce, LR) produce me, only <b>in reverse</b>: from the tokens up to the start symbol.'],
            [0, 'On <code>int*int</code> you rush to kill X at step 2. I keep X until the very last step.'],
            [1, 'Same productions, though. Just a different order.']
          ]} />
        `, { sec: t('Fireside chat', 'دردشة جنب الدفاية') }),
        page(html`
          <${Chat} names=${[t('Leftmost', 'الـ Leftmost'), t('Rightmost', 'الـ Rightmost')]} start=${1} lines=${A ? [
            [0, 'وبنبني <b>نفس الـ parse tree</b>.'],
            [1, 'وعشان كده واحد مني وواحد منك لنفس الـ string مش بيثبتوا أي ambiguity. أي string ليه الاتنين.'],
            [0, 'عشان تثبت الـ ambiguity لازم اتنين <b>leftmost</b> مختلفين…'],
            [1, '…أو اتنين <b>rightmost</b> مختلفين. مش واحد من كل نوع.'],
            [0, 'وإحنا الاتنين بنبدأ من نفس المكان: الـ <b>start symbol</b>.']
          ] : [
            [0, 'And we build the <b>same parse tree</b>.'],
            [1, 'Which is why one of you plus one of me proves nothing about ambiguity. Every string has both of us.'],
            [0, 'To prove ambiguity you need two different <b>leftmost</b> derivations…'],
            [1, '…or two different <b>rightmost</b> ones. Not one of each.'],
            [0, 'And we both start in the same place: the <b>start symbol</b>.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Derivation can be done by starting with any nonterminal symbol": <b>False</b>.<br/>"Derivation can only be started with the start symbol": <b>True</b>.<br/>Bottom-up gives a <b>rightmost</b> derivation in reverse, not a leftmost one.',
            'دي <b>غلط</b>:<span class="ltr">"Derivation can be done by starting with any nonterminal symbol"</span>ودي <b>صح</b>:<span class="ltr">"Derivation can only be started with the start symbol"</span>والـ bottom-up بيطلّع <b>rightmost</b> derivation بالعكس، مش leftmost.')}</p></${Box}>
        `),

        // 16 · parse trees
        page(html`
          <${H1}>${t('Parse trees: a derivation you can see', 'الـ Parse tree هو derivation تقدر تشوفه')}</${H1}>
          <${Def}>${X('A <b>parse tree</b> is a graphical depiction of a derivation.', 'الـ <b>parse tree</b> هو رسمة بتوضّح الـ derivation.')}</${Def}>
          ${li(A ? [
            'الـ <b>start symbol هو الـ root</b>.',
            '<b>كل الـ leaf nodes بتبقى terminals.</b>',
            '<b>كل الـ interior (non-leaf) nodes بتبقى non-terminals.</b>',
            'الـ <b>in-order traversal</b> بيدّيك الـ <b>input string الأصلي</b>.'
          ] : [
            'The <b>start symbol is the root</b>.',
            '<b>All leaf nodes are terminals.</b>',
            '<b>All interior (non-leaf) nodes are non-terminals.</b>',
            'An <b>in-order traversal</b> gives the <b>original input string</b>.'
          ])}
          <${P} small=${true}>${X('A parse tree also shows <b>associativity and precedence</b>: the <b>deepest sub-tree is evaluated first</b>, so its operator has precedence over the operators in parent nodes.',
            'والـ parse tree كمان بيوضّح الـ <b>associativity والـ precedence</b>: <b>أعمق sub-tree بيتحسب الأول</b>، فالـ operator بتاعه ليه precedence على الـ operators اللي في الـ parent nodes.')}</${P}>
          <${Grow} />
          <${Hand} arrow="down">${t('the in-order walk: read the leaves left to right and you get your input back', 'الـ in-order traversal: اقرا الـ leaves من الشمال لليمين وهترجعلك الـ input')}</${Hand}>
        `, { sec: t('Parse trees', 'الـ Parse trees') }),

        // 17 · tree parts figure
        page(html`
          <${H2}>${t('Leaves, interior nodes, the in-order walk', 'الـ leaves والـ interior nodes والـ in-order traversal')}</${H2}>
          <${Fig} name="cc-tree-parts" />
        `),

        // 18 · precedence and the leftmost tree
        page(html`
          <${H2}>${A ? html`الـ leftmost tree بتاع <bdi dir="ltr">id+id*id</bdi>` : 'The leftmost tree of id+id*id'}</${H2}>
          <${Fig} name="cc-lm-tree" />
        `),

        // 19 · the doctor's key on "grows from the right"
        page(html`
          <${Box} kind="watch" title=${t("Watch it: the doctors' key", 'خلّي بالك: إجابة الدكاترة')}><p className="hf-p small">${X('The official revision-sheet key: <i>"A leftmost parsing tree grows from the <b>right</b> side."</i> Instinct says "left", since a leftmost derivation expands the left-most non-terminal first. In the exam answer <b>right</b> (and <b>True</b> for the T/F version).',
            'الـ key الرسمي بتاع الـ revision sheet بيقول:<span class="ltr">"A leftmost parsing tree grows from the <b>right</b> side."</span>إحساسك ممكن يقول "left" لأن الـ leftmost derivation بيفك الـ non-terminal اللي على الشمال الأول. بس في الامتحان جاوب <b>right</b> (و<b>True</b> في سؤال الـ T/F).')}</p></${Box}>
          ${mq('m-grow', /grows from the right hand side/i)}
          <${Grow} />
          <${Talk} who="dev">${t('Fine. Right side it is.', 'خلاص، الـ right side.')}</${Talk}>
        `),

        // 20 · exercise: who is who in a parse tree
        page(html`
          <${Box} kind="pencil" title=${t('Who is who in a parse tree?', 'مين مين في الـ parse tree؟')}><p className="hf-p small">${t('Tap a part of the tree on the left, then the fact that goes with it.', 'دوس على جزء من الشجرة، وبعدين على المعلومة اللي تخصّه.')}</p></${Box}>
          <${Match} id="tree" left=${A ? ['الـ root', 'الـ leaf nodes', 'الـ interior nodes', 'الـ in-order traversal', 'أعمق sub-tree'] : ['The root', 'Leaf nodes', 'Interior nodes', 'In-order traversal', 'The deepest sub-tree']}
            right=${A ? ['كلها terminals', 'بيتحسب الأول', 'هو الـ start symbol', 'بيدّي الـ input string الأصلي', 'كلها non-terminals'] : ['are all terminals', 'is evaluated first', 'is the start symbol', 'gives the original input string', 'are all non-terminals']}
            answer=${[2, 0, 4, 3, 1]} />
        `, { sec: t('Exercise: parse trees', 'تمرين: الـ parse trees') }),

        // 21 · ambiguity
        page(html`
          <${H1}>${t('Ambiguity: one string, two trees', 'الـ Ambiguity: شجرتين لنفس الـ string')}</${H1}>
          <${Def}>${X('A grammar is <b>ambiguous</b> if it has <b>more than one parse tree</b> (more than one leftmost, or more than one rightmost, derivation) for <b>at least one string</b>.',
            'الـ grammar بتبقى <b>ambiguous</b> لو فيه <b>أكتر من parse tree</b> (يعني أكتر من leftmost derivation، أو أكتر من rightmost derivation) لـ <b>string واحد على الأقل</b>.')}</${Def}>
          <${P} small=${true}>${X('If every sentence has only one leftmost (or only one rightmost) tree, the grammar is <b>unambiguous</b>.', 'ولو كل sentence ليها leftmost tree واحدة بس (أو rightmost واحدة بس)، تبقى الـ grammar <b>unambiguous</b>.')}</${P}>
          <${P} small=${true}>${X("The slides' suspect:", 'المتهم بتاع السلايدز:')}</${P}>
          <${Code} lines=${['E → E+E | E-E | id']} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('Before you turn the page: draw two different trees for <code>id-id+id</code> with this grammar. Which operator sits at each root?', 'قبل ما تقلب: ارسم شجرتين مختلفتين لـ <code>id-id+id</code> بالـ grammar دي. أنهي operator في الـ root في كل واحدة؟')}</p></${Box}>
        `, { sec: t('Ambiguity', 'الـ Ambiguity') }),

        // 22 · interview
        page(html`
          <${Interview} title=${t('An Ambiguous Grammar, exposed', 'الـ Ambiguous Grammar على المكشوف')} sub=${t("This week's interview: the grammar that can't make up its mind.", 'حوار الأسبوع: الـ grammar اللي مش عارفة تحسم أمرها.')} lines=${A ? [
            ['المذيع', 'اسم حضرتك إيه؟'],
            ['الـ Grammar', 'أنا <code>E → E+E | E-E | id</code>، وصحابي بيقولولي E وخلاص.'],
            ['المذيع', 'بيقولوا إنك مش عارفة تحسمي أمرك.'],
            ['الـ Grammar', 'عشان أقدر أطلّع <code>id-id+id</code> بطريقتين! اتنين <b>leftmost derivations مختلفين</b>.'],
            ['المذيع', 'إزاي يعني؟'],
            ['الـ Grammar', 'لو بدأت بـ <code>E → E+E</code> الـ + بيبقى في الـ root، ولو بدأت بـ <code>E → E-E</code> الـ - هو اللي في الـ root.'],
            ['المذيع', 'وده يفرق في إيه؟'],
            ['الـ Grammar', 'في المعنى. أعمق sub-tree بيتحسب الأول، فشجرة بتحسب <bdi dir="ltr">(id-id)+id</bdi> والتانية <bdi dir="ltr">id-(id+id)</bdi>.'],
            ['المذيع', 'يعني string واحد كفاية؟'],
            ['الـ Grammar', 'أيوه، <b>string واحد على الأقل</b> ليه أكتر من parse tree، وخلاص.']
          ] : [
            ['Head First', 'Your name, please?'],
            ['Grammar', "<code>E → E+E | E-E | id</code>. Call me E."],
            ['Head First', "People say you can't make up your mind."],
            ['Grammar', 'Because I can make <code>id-id+id</code> two ways! Two <b>different leftmost derivations</b>.'],
            ['Head First', 'Show us.'],
            ['Grammar', 'Start with <code>E → E+E</code> and + is the root; start with <code>E → E-E</code> and - is.'],
            ['Head First', 'Does it matter?'],
            ['Grammar', 'The deepest sub-tree is evaluated first, so one tree means (id-id)+id and the other id-(id+id).'],
            ['Head First', 'So one string is enough?'],
            ['Grammar', 'Yes. <b>At least one string</b> with more than one parse tree, and I am ambiguous.']
          ]} />
        `),

        // 23 · the two trees
        page(html`
          <${H2}>${t('Two leftmost derivations, side by side', 'اتنين leftmost derivations جنب بعض')}</${H2}>
          <${Fig} name="cc-ambig-trees" />
        `),

        // 24 · exercise: does it prove ambiguity
        page(html`
          <${Box} kind="pencil" title=${t('Does it prove ambiguity?', 'ده بيثبت الـ ambiguity؟')}><p className="hf-p small">${t('For each piece of evidence: does it prove the grammar is ambiguous?', 'لكل دليل من دول: هل بيثبت إن الـ grammar ambiguous؟')}</p></${Box}>
          <${Sort} id="amb" bins=${A ? [['أيوه', 'بيثبت'], ['لأ', 'مش بيثبت']] : [['Yes', 'proves it'], ['No', 'proves nothing']]} items=${A ? [
            ['اتنين <b>leftmost</b> derivations مختلفين لنفس الـ string', 0],
            ['واحد leftmost وواحد rightmost لنفس الـ string', 1],
            ['اتنين <b>rightmost</b> derivations مختلفين لنفس الـ string', 0],
            ['اتنين parse trees مختلفين لنفس الـ string', 0],
            ['الـ grammar مش قادرة تعمل derive لـ string معيّن', 1],
            ['قاعدة زي <bdi dir="ltr">A → Ab | c</bdi> (فيها left recursion)', 1]
          ] : [
            ['Two different <b>leftmost</b> derivations of one string', 0],
            ['One leftmost and one rightmost derivation of one string', 1],
            ['Two different <b>rightmost</b> derivations of one string', 0],
            ['Two different parse trees for one string', 0],
            ['The grammar cannot derive some string', 1],
            ['A rule like A → Ab | c (left recursion)', 1]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('every string has one leftmost AND one rightmost derivation, even in an unambiguous grammar', 'أي string ليه leftmost واحد و rightmost واحد، حتى في الـ grammar الـ unambiguous')}</${Hand}>
        `, { sec: t('Exercise: proving ambiguity', 'تمرين: إثبات الـ ambiguity') }),

        // 25 · one leftmost + one rightmost share one tree
        page(html`
          <${H2}>${t('One leftmost, one rightmost, one tree', 'الـ leftmost والـ rightmost ممكن يبنوا نفس الشجرة')}</${H2}>
          <${Fig} name="cc-lmd-rmd" />
        `),

        // 26 · the sheets' 001101 proof
        page(html`
          <${H2}>${t('A proof from the sheets', 'إثبات من الشيتات')}</${H2}>
          <${Code} lines=${['S → 0A | 1B', 'A → 0AA | 1S | 1', 'B → 1BB | 0S | 0']} />
          <${P} small=${true}>${X('The string <code>001101</code> has two leftmost derivations:', 'الـ string <code>001101</code> ليها اتنين leftmost derivations:')}</${P}>
          <${TwoLmd} />
          <${Hand} arrow="up" red=${true}>${X('same until 00AA; then the leftmost A takes A → 1S in one and A → 1 in the other. Two LMDs: ambiguous.', 'نفس الخطوات لحد <bdi dir="ltr">00AA</bdi>، وبعدين <bdi dir="ltr">A → 1S</bdi> في واحد و<bdi dir="ltr">A → 1</bdi> في التاني. يبقى ambiguous.')}</${Hand}>
        `, { sec: t('Proofs from the sheets', 'إثباتات من الشيتات') }),

        // 27 · your turn: aab
        page(html`
          <${Box} kind="pencil" title=${t('Your turn: find both', 'دورك: طلّع الاتنين')}><p className="hf-p small">${X('With this grammar, write two different leftmost derivations of <code>aab</code>, then reveal.', 'بالـ grammar دي، اكتب اتنين leftmost derivations مختلفين لـ <code>aab</code>، وبعدين اكشف الإجابة.')}</p></${Box}>
          <${Code} lines=${['S → Ab | aaB    A → a | Aa    B → b']} />
          <${Reveal} id="aab">
            <${Code} lines=${[['S ⇒ aaB ⇒ aab', 'LMD 1'], ['S ⇒ Ab ⇒ Aab ⇒ aab', 'LMD 2']]} />
            <p className="hf-hand red" style=${{ marginTop: '4px' }}>${t('two leftmost derivations, so ambiguous', 'اتنين leftmost derivations، يبقى ambiguous')}</p>
          </${Reveal}>
          <${Grow} />
          ${mq('m-aab', /valid leftmost derivation of aab/i)}
        `),

        // 28 · the ambiguity finder
        page(html`
          <${H2}>${t('Every leftmost derivation, found for you', 'كل الـ leftmost derivations، بيطلّعهالك')}</${H2}>
          <${Fig} name="cc-ambig-finder" />
        `),

        // 29 · an unambiguous grammar
        page(html`
          <${H2}>${t('And one that behaves', 'وواحدة مؤدّبة')}</${H2}>
          <${P} small=${true}>${X("The sheets' <b>unambiguous</b> grammar. Here <code>id+id*id</code> has only <b>one</b> leftmost derivation:",
            'دي الـ grammar الـ <b>unambiguous</b> بتاعة الشيتات، وهنا <code>id+id*id</code> ليها leftmost derivation <b>واحد بس</b>:')}</${P}>
          <${Code} lines=${['E → E+T | T    T → T*F | F', 'F → (E) | id']} />
          <${Code} lines=${['E', ['⇒ E+T', 'E → E+T'], ['⇒ T+T', 'E → T'], ['⇒ F+T', 'T → F'], ['⇒ id+T', 'F → id'], ['⇒ id+T*F', 'T → T*F'], ['⇒ id+F*F', 'T → F'], ['⇒ id+id*F', 'F → id'], ['⇒ id+id*id', 'F → id']]} />
          <${Grow} />
          <${Hand} red=${true}>${t('one leftmost derivation, one tree: the sheets use it as the unambiguous check', 'leftmost derivation واحد يعني شجرة واحدة، والشيتات بتستخدمها كمثال الـ unambiguous')}</${Hand}>
        `),

        // 30 · left recursion
        page(html`
          <${H1}>${t('Left recursion: the loop that never ends', 'الـ Left recursion: اللفّة اللي مبتخلصش')}</${H1}>
          <${Def}>${X('A grammar is <b>left-recursive</b> if a non-terminal A has a derivation containing <b>A itself as the left-most symbol</b>.', 'الـ grammar بتبقى <b>left-recursive</b> لو فيه non-terminal اسمه A ليه derivation فيه <b>A نفسه كأول symbol على الشمال</b>.')}</${Def}>
          <${P} small=${true}>${X('Take <code>A → Ab | c</code> and watch a <b>top-down</b> parser try it:', 'خد <code>A → Ab | c</code> واتفرج على الـ <b>top-down</b> parser وهو بيحاول:')}</${P}>
          <${Talk} who="compiler">${X('<code>A ⇒ Ab ⇒ Abb ⇒ Abbb ⇒ …</code> The left symbol is A again, every time. I never match a single input symbol!', 'بص: <code>A ⇒ Ab ⇒ Abb ⇒ Abbb ⇒ …</code> وأول symbol على الشمال بيرجع A كل مرة. عمري ما هعمل match لأي input!')}</${Talk}>
          <${P} small=${true}>${X('A top-down parser starts from the start symbol, keeps expanding the same left non-terminal, <b>can\'t judge when to stop</b> and goes into an <b>infinite loop</b>. So <b>LL(1) cannot be applied to a left-recursive grammar</b>.',
            'الـ top-down parser بيبدأ من الـ start symbol، ويفضل يعمل expand لنفس الـ non-terminal اللي على الشمال، و<b>مايعرفش يقف إمتى</b>، فيدخل في <b>infinite loop</b>. عشان كده <b>الـ <bdi dir="ltr">LL(1)</bdi> مينفعش يتطبّق على left-recursive grammar</b>.')}</${P}>
        `, { sec: t('Left recursion', 'الـ Left recursion') }),

        // 31 · the loop figure
        page(html`
          <${H2}>${t('Watch it loop, then watch the fix', 'اتفرج عليه وهو بيلف، وبعدين على الحل')}</${H2}>
          <${Fig} name="cc-lr-loop" />
        `),

        // 32 · immediate and indirect
        page(html`
          <${H2}>${t('Two kinds of left recursion', 'نوعين من الـ left recursion')}</${H2}>
          ${li(A ? [
            'الـ <b>immediate</b> زي <code>A → Aα | β</code>، والـ A أول symbol في الـ rule بتاعته.',
            'الـ <b>indirect</b> زي <code>S → Aα | β</code> ومعاها <code>A ⇒ Sd</code>، فالـ S بترجع على الشمال عن طريق الـ A.'
          ] : [
            '<b>Immediate</b>: <code>A → Aα | β</code>. A is the left-most symbol of its own rule.',
            '<b>Indirect</b>: <code>S → Aα | β</code> with <code>A ⇒ Sd</code>, so <code>S ⇒ Aα ⇒ Sdα</code>: S comes back on the left, through A.'
          ])}
          <${Fig} name="cc-lr-kinds" />
        `),

        // 33 · removing left recursion
        page(html`
          <${H1}>${t('Breaking the loop', 'نكسر اللفّة')}</${H1}>
          <${P} small=${true}>${X("Rewrite the rule with a new non-terminal <b>A'</b>:", "بنكتب الـ rule من جديد بـ non-terminal جديد اسمه <b>A'</b>:")}</${P}>
          <${Code} lines=${['A  → Aα | β', '     ⇓', ["A  → βA'", t("β first, then A'", "الـ β الأول وبعدها A'")], ["A' → αA' | ε", t('repeat α, or stop', 'كرّر الـ α، أو اقف')]]} />
          <${P} small=${true}>${X("<b>β</b> = the alternatives that <b>don't</b> start with A. <b>α</b> = what follows A in the ones that do. More than one recursive alternative? Each becomes its own A' alternative.",
            "الـ <b>β</b> هي الاختيارات اللي <b>مش</b> بتبدأ بالـ A. والـ <b>α</b> هي اللي بعد الـ A في الاختيارات اللي بتبدأ بيه. ولو فيه أكتر من اختيار recursive، كل واحد بيبقى اختيار لوحده في الـ A'.")}</${P}>
          <${Code} lines=${[['E  → E+T | T', 'α = +T, β = T'], ["E  → TE'", ''], ["E' → +TE' | ε", '']]} />
          <${Hand} tilt=${true}>${A ? html`اتأكد بنفسك (من عندنا):<span className="ltr">E ⇒ TE' ⇒ T+TE' ⇒ T+T</span>` : "Check it (ours): E ⇒ TE' ⇒ T+TE' ⇒ T+T, the same T+T as E ⇒ E+T ⇒ T+T."}</${Hand}>
        `, { sec: t('Removing left recursion', 'إزالة الـ left recursion') }),

        // 34 · the removal figure
        page(html`
          <${H2}>${t('Split, then rewrite', 'قسّم، وبعدين اكتب من جديد')}</${H2}>
          <${Fig} name="cc-lr-remove" />
        `),

        // 35 · exercise: remove it yourself
        page(html`
          <${H2}>${t('Remove it yourself', 'شيله بنفسك')}</${H2}>
          <${LrDrill} />
        `, { sec: t('Exercise: removing it', 'تمرين: إزالة الـ left recursion') }),

        // 36 · watch it: swapping α and β
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X("The favourite trap is <b>swapping α and β</b>. <code>A → Abc | b</code> becomes <code>A → bA'</code>, <code>A' → bcA' | ε</code>, <b>not</b> <code>A → bcA'</code>, <code>A' → bA' | ε</code>. And never drop the <b>ε</b>.",
            "أشهر فخ إنك <b>تبدّل الـ α والـ β</b>. الـ <code>A → Abc | b</code> بتبقى:<span class=\"ltr\">A → bA' , A' → bcA' | ε</span>مش:<span class=\"ltr\">A → bcA' , A' → bA' | ε</span>وماتنساش الـ <b>ε</b> أبدًا.")}</p></${Box}>
          ${mq('m-adB', /A → aB \| Ad gives/)}
          <${Grow} />
          <${Talk} who="compiler" flip=${true}>${X("β goes <b>first</b>, α goes into the new A'.", "الـ β <b>الأول</b>، والـ α تروح في الـ A' الجديد.")}</${Talk}>
        `),

        // 37 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['الـ <i>leftmost derivation</i> والـ <i>left recursion</i> شبه بعض، هما نفس الحاجة؟', 'لأ. الـ leftmost derivation هو <b>ترتيب</b> بنبدّل بيه الـ non-terminals. أما الـ left recursion فده <b>صفة في الـ grammar</b> نفسها: الـ A بيطلّع form بيبدأ بـ A.'],
            ['هي الـ left-recursive grammar لازم تبقى ambiguous؟', 'مش شرط. الـ <code>E → E+T | T</code> فيها left recursion بس unambiguous، والـ <code>A → Ab | c</code> بتدّي شجرة واحدة لكل string. دول مشكلتين منفصلين.'],
            ["ليه الـ A' محتاج الـ ε؟", "من غير <code>A' → ε</code> الـ derivation عمره ما هيقف."],
            ['طب ليه بنتعب نفسنا ونشيله؟', 'لأن الـ <bdi dir="ltr">LL(1)</bdi> مينفعش يتطبّق على left-recursive grammar، فلازم نشيله <b>قبل</b> الـ <bdi dir="ltr">LL(1)</bdi>. وده الفصل الجاي.']
          ] : [
            ['A <i>leftmost derivation</i> and <i>left recursion</i> sound the same. Are they?', 'No. A leftmost derivation is an <b>order</b> of replacing non-terminals. Left recursion is a <b>property of the grammar</b>: A derives a form that starts with A.'],
            ['Is a left-recursive grammar always ambiguous?', 'Not necessarily. <code>E → E+T | T</code> is left-recursive but unambiguous, and <code>A → Ab | c</code> gives one tree per string. They are separate problems.'],
            ["Why does A' need the ε?", "Without <code>A' → ε</code> the derivation can never stop."],
            ['Why bother removing it at all?', 'Because LL(1) cannot be applied to a left-recursive grammar, so the left recursion must go <b>before</b> LL(1). That is the next chapter.']
          ]} />
        `),

        // 38–40 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' papers, the revision sheet and this year's midterm. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحانات الدكاترة والـ revision sheet وميدترم السنة دي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m-op', /\(num \/ num\) \+ num/)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m-amb', /said to be ambiguous when/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('two LEFTMOST (or two rightmost) paths, never one of each', 'اتنين LEFTMOST (أو اتنين rightmost)، مش واحد من كل نوع')}</${Hand}>
        `),
        page(html`
          ${mq('m-ll1', /LL\(1\) can be applied/)}
          <${Grow} />
          <${Talk} who="compiler" flip=${true}>${t('Left recursion first has to go. Then LL(1): next chapter.', 'الأول نشيل الـ left recursion، وبعدين الـ LL(1) في الفصل الجاي.')}</${Talk}>
        `),
        page(html`
          ${mq('m-false', /Which of the following statement is false/i)}
          <${Grow} />
          <${Talk} who="compiler" flip=${true}>${t('Careful: by the course key, all three statements are true.', 'خلّي بالك: حسب الـ key بتاع المادة، التلات جمل صح.')}</${Talk}>
        `),

        // 41 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>syntax analysis</b> (الـ parsing) تاني phase: الـ tokens داخلة والـ parse tree طالع، ومعمول على أساس <b>CFG</b> عشان الأقواس المتوازنة.',
            'الـ CFG ليها أربع أجزاء: الـ non-terminals والـ terminals والـ productions والـ start symbol. <b>مفيش end symbol</b>.',
            'الـ derivation بيبدأ من الـ start symbol، وكل خطوة: أنهي non-terminal وأنهي production.',
            'الـ <b>leftmost</b> بيبدّل اللي على أقصى الشمال (الـ top-down)، والـ <b>rightmost</b> اللي على أقصى اليمين (الـ bottom-up بالعكس).',
            'في الـ parse tree الـ root هو الـ start symbol، والـ leaves هي الـ terminals، والباقي non-terminals، وأعمق sub-tree بيتحسب الأول.',
            'الـ <b>ambiguous</b> grammar ليها أكتر من parse tree لـ string واحد على الأقل.',
            'الـ <b>left recursion</b> بيدخّل الـ top-down parser في infinite loop. والحل:<span class="ltr">A → Aα | β &nbsp;⇒&nbsp; A → βA\' , A\' → αA\' | ε</span>'
          ] : [
            '<b>Syntax analysis</b> (parsing) is the second phase: tokens in, parse tree out. It is modeled on a <b>CFG</b> because regular expressions cannot check balancing tokens.',
            'A CFG = non-terminals (V), terminals (Σ), productions (P), start symbol (S). <b>No end symbol.</b>',
            'A derivation starts at the start symbol; each step picks a non-terminal and a production.',
            '<b>Leftmost</b> replaces the leftmost non-terminal (top-down parsers); <b>rightmost</b> the rightmost (bottom-up, in reverse).',
            'Parse tree: root = start symbol, leaves = terminals, interior nodes = non-terminals, in-order = the input; deepest sub-tree first. Key: a leftmost tree "grows from the right".',
            '<b>Ambiguous</b>: more than one parse tree (two leftmost or two rightmost derivations) for at least one string.',
            "<b>Left recursion</b> loops a top-down parser (no LL(1)). Fix: A → Aα | β becomes A → βA', A' → αA' | ε."
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 42 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 4!', 'خلّصت الفصل الرابع!')}</${H1}>
            <${Talk} who="compiler">${X('Next time: with the left recursion gone, I can predict my next move. <b>LL(1)</b> parsing, FIRST and FOLLOW!', 'المرة الجاية: من غير left recursion أقدر أتوقع خطوتي الجاية. الـ <bdi dir="ltr">LL(1)</bdi> parsing والـ FIRST والـ FOLLOW!')}</${Talk}>
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

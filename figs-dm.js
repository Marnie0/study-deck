// Visuals for the Discrete Mathematics notes (names 'dm-…'), built on figs.js (window.FIGKIT).
// Every label and caption comes from the doctor's slides and the site's notes. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('fdm-accent')) { const s = document.createElement('style'); s.id = 'fdm-accent'; s.textContent = '[data-fig^="dm-"]{ --fig-k: var(--k-compiler); --fig-s: var(--s-compiler); }'; document.head.appendChild(s); } })();
/* ── part L1 ── */
// Discrete Mathematics visuals, Lecture 1 (Sets: Theory and Types of Sets): listing vs set-builder, well defined sets, Example 1.1, subset and equal sets, empty/finite/infinite, universal set, power set, ∈ vs ⊆, the Venn figures of union / intersection / complement / difference (slides 19-21, 24), the disjoint union U = M ∪ F and the worked example (slides 22-25). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.dmv1{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.dmv1 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dmv1 .fig-btn.dmv1-sel{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); }
.dmv1 .fig-cap .ltr{ font-family:var(--mono); font-size:.9rem; margin:3px 0; overflow-wrap:anywhere; }
.dmv1-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 auto 10px; max-width:560px; }
.dmv1-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dmv1-modes .dmv1-mono{ font-family:var(--mono); }
.dmv1-wrap{ max-width:560px; margin:0 auto; color:var(--ink); }
.dmv1-mono{ font-family:var(--mono); }
.dmv1-k{ color:var(--k-compiler); font-weight:700; }
.dmv1-muted{ color:var(--graphite); font-size:.84rem; }
.dmv1-big{ text-align:center; font:700 1.05rem/1.5 var(--mono); overflow-wrap:anywhere; margin:4px 0 8px; }
.dmv1-row{ display:flex; flex-wrap:wrap; gap:4px; align-items:center; margin:6px 0; }
.dmv1-lbl{ font:700 .95rem var(--mono); color:var(--k-compiler); min-width:2.4em; }
.dmv1-chip{ display:inline-flex; align-items:center; gap:3px; font:600 .9rem/1.2 var(--mono); border:1px solid var(--line); border-radius:6px; padding:3px 7px; background:var(--paper); color:var(--ink); transition:background .4s, box-shadow .4s, opacity .4s; }
.dmv1-chip.hit{ background:color-mix(in srgb, var(--ok) 24%, var(--paper)); box-shadow:0 0 0 2px var(--ok); }
.dmv1-chip.miss{ background:color-mix(in srgb, var(--pen) 14%, var(--paper)); box-shadow:0 0 0 1.5px var(--pen); }
.dmv1-chip.on{ background:color-mix(in srgb, var(--k-compiler) 22%, var(--paper)); box-shadow:0 0 0 2px var(--k-compiler); }
.dmv1-chip.dim{ opacity:.45; }
.dmv1-chip.new{ background:color-mix(in srgb, var(--k-compiler) 30%, var(--paper)); box-shadow:0 0 0 2px var(--k-compiler); }
.dmv1-chip small{ font-size:.78rem; color:var(--graphite); font-weight:500; }
.dmv1-ok{ color:var(--ok); font-weight:700; } .dmv1-no{ color:var(--pen); font-weight:700; }
.dmv1-in{ font-family:var(--mono); font-size:.95rem; width:100%; max-width:220px; box-sizing:border-box; padding:5px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-width:0; }
.dmv1-in.sm{ max-width:80px; }
.dmv1-in:focus{ outline:2px solid var(--k-compiler); outline-offset:1px; }
.dmv1-form{ display:flex; flex-wrap:wrap; gap:6px 10px; align-items:center; justify-content:center; margin:6px 0 10px; font-size:.9rem; }
.dmv1-form label{ display:flex; gap:6px; align-items:center; min-width:0; }
.dmv1-box{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; margin-top:8px; }
.dmv1-err{ color:var(--pen); font-weight:600; text-align:center; font-size:.9rem; }
.dmv1-svg svg{ max-width:380px !important; }
.dmv1-svg text{ font-family:var(--mono); }
.dmv1-svg .lb{ font-family:var(--body); font-weight:700; fill:var(--k-compiler); }
.dmv1-svg .hot{ fill:var(--pen); font-weight:700; }
.dmv1-fill{ transition:fill .5s ease; }
/* set-builder grid */
.dmv1-grid{ display:grid; grid-template-columns:repeat(10, minmax(0, 1fr)); gap:2px; max-width:360px; margin:8px auto 0; }
.dmv1-grid span{ display:grid; place-items:center; height:22px; font:600 .78rem/1 var(--mono); border-radius:3px; background:var(--paper); border:1px solid var(--line); color:var(--graphite); transition:background .3s, color .3s; }
.dmv1-grid span.on{ background:color-mix(in srgb, var(--k-compiler) 32%, var(--paper)); color:var(--ink); border-color:var(--k-compiler); }
.dmv1-grid span.off{ opacity:.45; }
/* sorter */
.dmv1-card{ font-size:1.02rem; font-weight:700; padding:12px 8px; border:1px solid var(--line); border-radius:12px; background:var(--paper); text-align:center; margin-bottom:10px; overflow-wrap:anywhere; }
.dmv1-pick{ display:flex; gap:6px; justify-content:center; flex-wrap:wrap; }
.dmv1-bins{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:6px; margin-top:12px; }
.dmv1-bins.two{ grid-template-columns:repeat(2, minmax(0, 1fr)); }
.dmv1-bin{ border:1px solid var(--line); border-radius:10px; padding:6px; background:var(--paper); font-size:.8rem; line-height:1.4; min-height:3em; min-width:0; overflow-wrap:anywhere; }
.dmv1-bin > b{ display:block; color:var(--k-compiler); font-size:.84rem; margin-bottom:3px; }
.dmv1-bin > span{ display:block; border-top:1px dashed var(--line); padding:2px 0; }
@media (max-width:420px){ .dmv1-bins{ grid-template-columns:1fr; } .dmv1-bins.two{ grid-template-columns:1fr; } }
/* power set */
.dmv1-ps{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin:8px 0; }
.dmv1-cnt{ text-align:center; font:700 1rem var(--mono); color:var(--k-compiler); }
/* ∈ vs ⊆ */
.dmv1-setbox{ display:flex; flex-wrap:wrap; gap:5px; align-items:center; justify-content:center; border:2px solid var(--k-compiler); border-radius:14px; padding:8px; background:var(--paper); }
.dmv1-brace{ font:700 1.3rem var(--mono); color:var(--k-compiler); }
.dmv1-chip.set{ border-style:dashed; border-color:var(--graphite); }
.dmv1-left{ display:flex; flex-wrap:wrap; gap:5px; align-items:center; justify-content:center; margin:6px 0; }
/* tables */
.dmv1-tb{ border-collapse:collapse; margin:8px auto 0; font-size:.88rem; }
.dmv1-tb th, .dmv1-tb td{ border:1px solid var(--line); padding:3px 8px; text-align:center; }
.dmv1-tb th{ background:var(--paper-2); font-family:var(--mono); }
.dmv1-tb td:first-child{ font-family:var(--mono); font-weight:700; }
.dmv1-tb tr.cur td{ background:color-mix(in srgb, var(--k-compiler) 16%, var(--paper)); }
.dmv1-tb tr.keep td:last-child{ color:var(--ok); font-weight:700; }
.dmv1-tb tr.drop td:last-child{ color:var(--pen); }
/* number line */
.dmv1-nl{ display:flex; flex-wrap:wrap; gap:3px; justify-content:center; margin:10px 0 6px; }
.dmv1-nl span{ min-width:30px; text-align:center; font:600 .9rem/1 var(--mono); padding:6px 2px; border-radius:6px; border:1px solid var(--line); background:var(--paper); transition:background .4s, box-shadow .4s; }
.dmv1-nl span.p{ background:color-mix(in srgb, var(--k-compiler) 28%, var(--paper)); }
.dmv1-nl span.q{ background:color-mix(in srgb, var(--ok) 28%, var(--paper)); }
.dmv1-nl span.u{ box-shadow:0 0 0 2px var(--k-compiler); }
.dmv1-key{ display:flex; flex-wrap:wrap; gap:4px 12px; justify-content:center; font-size:.84rem; }
.dmv1-key i{ display:inline-block; width:12px; height:12px; border-radius:3px; margin-right:4px; vertical-align:-1px; }
@media (prefers-reduced-motion: reduce){ .dmv1-chip, .dmv1-grid span, .dmv1-fill, .dmv1-nl span{ transition:none !important; } }
`;
  if (!document.getElementById('dmv1-css')) { const s = document.createElement('style'); s.id = 'dmv1-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = s => `<span class="ltr">${s}</span>`;
  const I = s => `<bdi dir="ltr">${s}</bdi>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmt = a => a.length ? '{' + a.join(', ') + '}' : '∅';
  const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = n => String(n).split('').map(c => SUP[c]).join('');
  // a flat set typed by the student: "{1, 2, 3}" or "1, 2, 3"; keeps the typed order and repeats
  const raw = t => t.replace(/[{}]/g, '').split(',').map(x => x.trim()).filter(Boolean);
  const uniq = a => a.filter((x, k) => a.indexOf(x) === k);
  const numSort = a => a.every(x => /^-?\d+$/.test(x)) ? a.slice().sort((p, q) => p - q) : a;

  const Modes = ({ list, mode, set, mono }) => html`<div className="dmv1-modes" role="group">${list.map(([k, l]) => html`<button key=${k} className=${'fig-btn' + (mode === k ? ' dmv1-sel' : '') + (mono && k !== 'own' ? ' dmv1-mono' : '')} aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${l}</button>`)}</div>`;

  // steps that restart when `key` changes (preset or input changed)
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), k = useRef(key);
    useEffect(() => { if (k.current === key) return; k.current = key; setI(calm() ? n - 1 : 0); setPlay(!calm()); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: x => { setPlay(false); setI(x); } }];
  }

  /* two-set Venn diagram inside U, with elements written in their regions.
     kind: 'overlap' | 'apart' | 'nested' (B inside A) | 'equal' | 'one' (only A, for the complement) */
  let vennN = 0;
  function Venn({ kind, la = 'A', lb = 'B', a = [], ab = [], b = [], shade = {}, hot, label }) {
    const id = useRef('dmv1-v' + (++vennN)).current;
    const SH = 'color-mix(in srgb, var(--k-compiler) 36%, var(--paper))', PL = 'var(--paper)', f = on => on ? SH : PL;
    const G = { overlap: { A: [115, 100, 80], B: [185, 100, 80], xa: 72, xab: 150, xb: 228, lA: [36, 30], lB: [264, 30] },
      apart: { A: [80, 100, 64], B: [220, 100, 64], xa: 80, xb: 220, lA: [26, 30], lB: [274, 30] },
      nested: { A: [150, 100, 92], B: [180, 100, 52], xa: 96, xab: 180, lA: [36, 30], lB: [180, 40] },
      equal: { A: [150, 100, 86], xab: 150, lA: [150, 40] },
      one: { A: [150, 100, 62], lA: [150, 108] } }[kind];
    const place = (items, cx) => { const n = items.length, cols = n > 5 ? 2 : 1, per = Math.ceil(n / cols);
      return items.map((t, k) => { const c = Math.floor(k / per), r = k % per; return { t, x: cx + (c - (cols - 1) / 2) * 32, y: 100 + (r - (per - 1) / 2) * 22 + 6 }; }); };
    const pts = [...(G.xa != null ? place(a, G.xa) : []), ...(G.xab != null ? place(ab, G.xab) : []), ...(G.xb != null ? place(b, G.xb) : [])];
    const circ = (c, fill) => html`<circle cx=${c[0]} cy=${c[1]} r=${c[2]} fill=${fill} className="dmv1-fill" />`;
    return html`<div className="dmv1-svg"><svg viewBox="0 0 300 200" role="img" aria-label=${label || 'Venn diagram'}>
      <defs>${G.B && html`<clipPath id=${id}><circle cx=${G.A[0]} cy=${G.A[1]} r=${G.A[2]} /></clipPath>`}</defs>
      <rect x="3" y="3" width="294" height="194" rx="8" fill=${f(shade.out)} stroke="var(--graphite)" strokeWidth="1.5" className="dmv1-fill" />
      <text x="16" y="186" fontSize="17" className="lb">U</text>
      ${circ(G.A, f(kind === 'equal' ? shade.ab : shade.a))}
      ${G.B && circ(G.B, f(kind === 'nested' ? shade.ab : shade.b))}
      ${kind === 'overlap' && html`<circle cx=${G.B[0]} cy=${G.B[1]} r=${G.B[2]} clipPath=${`url(#${id})`} fill=${f(shade.ab)} className="dmv1-fill" />`}
      <circle cx=${G.A[0]} cy=${G.A[1]} r=${G.A[2]} fill="none" stroke="var(--k-compiler)" strokeWidth="2.2" />
      ${G.B && html`<circle cx=${G.B[0]} cy=${G.B[1]} r=${G.B[2]} fill="none" stroke="var(--k-compiler)" strokeWidth="2.2" />`}
      <text x=${G.lA[0]} y=${G.lA[1]} fontSize="18" textAnchor="middle" className="lb">${kind === 'equal' ? la + ' = ' + lb : la}</text>
      ${G.lB && html`<text x=${G.lB[0]} y=${G.lB[1]} fontSize="18" textAnchor="middle" className="lb">${lb}</text>`}
      ${pts.map((p, k) => html`<text key=${k} x=${p.x} y=${p.y} fontSize=${p.t.length > 3 ? 14 : 17} textAnchor="middle" className=${hot != null && p.t === hot ? 'hot' : ''}>${p.t}</text>`)}
    </svg></div>`;
  }

  /* ── [0.1]-[0.2] listing vs set-builder, and x ∈ A / x ∉ A ── */
  function SetBuilder({ ar }) {
    const [mode, setMode] = useState('rule'), [x, setX] = useState('7');
    const steps = [
      { en: 'Set-builder: the set is given by a <b>property</b>, nothing is listed. A = {x | x is odd and 0 &lt; x &lt; 100}.', ar: 'في الـ set-builder بنكتب <b>property</b> بتحدد الـ elements من غير ما نعدّهم:' + L('A = {x | x is odd and 0 &lt; x &lt; 100}') },
      { en: 'Test every candidate from 1 to 99 against the property: the odd numbers pass and light up.', ar: 'بنجرّب كل رقم من ' + I('1') + ' لحد ' + I('99') + ' على الـ property، والأرقام الفردية بس هي اللي بتنجح وبتنوّر.' },
      { en: 'Listing (roster) the same set: A = {1, 3, 5, …, 99}, 50 elements. Both ways describe one set.', ar: 'ولو كتبناها بالـ listing (roster) هتبقى هي هي نفس الـ set، وعدد الـ elements فيها خمسين:' + L('A = {1, 3, 5, …, 99}') }
    ];
    const [i, ctl] = useSteps(steps.length, 1700);
    const LIST = ['1', '2', '3', '4', '5'];
    const t = x.trim(), n = Number(t), isInt = /^-?\d+$/.test(t);
    let inA, why;
    if (mode === 'list') { inA = LIST.includes(t); why = inA ? { en: `${esc(t)} is one of the listed elements.`, ar: 'الرقم ده مكتوب في الـ list بين الأقواس.' } : { en: `${esc(t || '?')} is not written between the braces.`, ar: 'الرقم ده مش مكتوب بين الأقواس.' }; }
    else if (!isInt) { inA = false; why = { en: 'Not a whole number, so it cannot be odd.', ar: 'ده مش رقم صحيح، فمينفعش يبقى فردي.' }; }
    else { const odd = Math.abs(n) % 2 === 1, rng = n > 0 && n < 100; inA = odd && rng;
      why = inA ? { en: `${n} is odd and 0 &lt; ${n} &lt; 100: both parts of the property hold.`, ar: 'الرقم ده فردي وكمان بين الصفر والمية، فالـ property كلها متحققة.' }
        : !odd ? { en: `${n} is even: it fails "x is odd".`, ar: 'الرقم ده زوجي، فبيفشل في شرط إنه يكون فردي.' }
        : { en: `${n} is odd but not between 0 and 100.`, ar: 'الرقم ده فردي، بس مش بين الصفر والمية.' }; }
    const stmt = `${esc(t || '?')} ${inA ? '∈' : '∉'} A`;
    const cap = mode === 'list' ? { en: 'Listing (roster): the elements are written between curly braces { } separated by commas. A = {1, 2, 3, 4, 5}.', ar: 'في الـ listing (roster) بنكتب الـ elements بين أقواس معقوفة وبينهم فواصل:' + L('A = {1, 2, 3, 4, 5}') } : steps[i];
    return html`<figure className="fig dmv1"><div className="fig-stage"><div className="dmv1-wrap">
      <${Modes} list=${[['list', 'Listing (roster)'], ['rule', 'Set-builder']]} mode=${mode} set=${setMode} />
      ${mode === 'list' ? html`<div className="dmv1-big">A = {1, 2, 3, 4, 5}</div>
        <div className="dmv1-row" style=${{ justifyContent: 'center' }}>${LIST.map(v => html`<span key=${v} className=${'dmv1-chip' + (v === t ? ' hit' : '')}>${v}</span>`)}</div>`
      : html`<div className="dmv1-big">A = {x | x is odd and 0 &lt; x &lt; 100}</div>
        <div className="dmv1-grid" aria-label="Candidates 1 to 99">${Array.from({ length: 99 }, (_, k) => k + 1).map(v => html`<span key=${v} className=${i >= 1 ? (v % 2 ? 'on' : 'off') : ''} style=${{ transitionDelay: i >= 1 && !calm() ? (v * 9) + 'ms' : '0ms' }}>${v}</span>`)}</div>
        ${i >= 2 && html`<div className="dmv1-big" style=${{ marginTop: '8px' }}>A = {1, 3, 5, …, 99}</div>`}`}
      <div className="dmv1-form"><label>Is x in A? x = <input className="dmv1-in sm" value=${x} onInput=${e => setX(e.target.value)} aria-label="x" spellCheck="false" /></label>
        <span className="dmv1-big" style=${{ margin: 0 }}><span className=${inA ? 'dmv1-ok' : 'dmv1-no'}>${stmt}</span></span></div>
      </div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} />
      <${Cap} en=${`<b>${stmt}</b>: ${why.en}`} ar=${why.ar} showAr=${ar} />
      ${mode === 'rule' && html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── [0.3] well defined or not ── */
  const WD = [
    { t: 'The set of all even numbers less than 10', ok: true, en: 'Well defined: for any number it is always clear whether it is even and less than 10 (the quiz answer is {2, 4, 6, 8}).', ar: 'دي well defined: أي رقم تقدر تحكم عليه بوضوح هو زوجي وأقل من عشرة ولا لأ.' },
    { t: 'Tall students', ok: false, en: 'Not well defined: "tall" is a personal opinion, so it is not clear who belongs.', ar: 'دي مش well defined: كلمة "tall" رأي شخصي، فمش واضح مين ينتمي ومين لأ.' },
    { t: 'Good teachers', ok: false, en: 'Not well defined: "good" is an opinion, not a clear test.', ar: 'دي مش well defined: كلمة "good" رأي، مش اختبار واضح.' },
    { t: 'Beautiful cities', ok: false, en: 'Not well defined: "beautiful" differs from person to person.', ar: 'دي مش well defined: كلمة "beautiful" بتختلف من شخص للتاني.' }
  ];
  function WellDefined({ ar }) {
    const [k, setK] = useState(0), [ans, setAns] = useState({}), cur = WD[k], got = ans[k];
    const pick = v => setAns(o => Object.assign({}, o, { [k]: v }));
    const cap = got == null ? { en: 'A set must be <b>well defined</b>: it is always clear whether an object belongs or not. Is this one?', ar: 'الـ set لازم تكون <b>well defined</b>، يعني دايمًا واضح الحاجة تنتمي ولا لأ. يا ترى دي كده؟' }
      : { en: (got === cur.ok ? 'Right. ' : 'Not quite. ') + cur.en, ar: (got === cur.ok ? 'صح. ' : 'مش بالظبط. ') + cur.ar };
    return html`<figure className="fig dmv1"><div className="fig-stage"><div className="dmv1-wrap" style=${{ maxWidth: '440px' }}>
      <div className="dmv1-card">"${cur.t}"</div>
      <div className="dmv1-pick">
        <button className=${'fig-btn' + (got === true ? ' dmv1-sel' : '')} onClick=${() => pick(true)}>Well defined</button>
        <button className=${'fig-btn' + (got === false ? ' dmv1-sel' : '')} onClick=${() => pick(false)}>Not well defined</button>
        <button className="fig-btn" onClick=${() => setK((k + 1) % WD.length)}>Next ›</button></div>
      <div className="dmv1-bins two">
        <div className="dmv1-bin"><b>Well defined</b>${WD.map((w, j) => ans[j] != null && w.ok && html`<span key=${j}>${w.t}</span>`)}</div>
        <div className="dmv1-bin"><b>Not well defined</b>${WD.map((w, j) => ans[j] != null && !w.ok && html`<span key=${j}>${w.t}</span>`)}</div></div>
      </div></div><${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /></figure>`;
  }

  /* ── [2] Example 1.1 ── */
  function Ex11({ ar }) {
    const A = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], B = ['1', '2', '4', '8', '16'], CP = ['2⁰', '2¹', '2²', '2³', '2⁴'], CV = ['1', '2', '4', '8', '16'];
    const steps = [
      { en: 'Example 1.1 gives four sets. C is written with powers of 2, D with a property.', ar: 'الـ Example 1.1 فيه 4 sets. الـ C مكتوبة بـ powers of 2، والـ D مكتوبة بـ property.' },
      { en: 'Work out C: 2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16, so C = {1, 2, 4, 8, 16}.', ar: 'نحسب الـ C الأول:' + L('2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16') + 'يعني:' + L('C = {1, 2, 4, 8, 16}') },
      { en: '<b>5 ∈ A</b>: 5 is listed in A.', ar: 'الـ 5 مكتوبة في A، فبنكتب:' + L('5 ∈ A') },
      { en: '<b>5 ∉ B</b>: none of B\'s elements is 5 (B has only powers of 2).', ar: 'مفيش element في B بيساوي 5 (الـ B فيها powers of 2 بس)، فبنكتب:' + L('5 ∉ B') },
      { en: '<b>8 ∈ C</b>: 8 = 2³ is in C.', ar: 'الـ 8 هي ' + I('2³') + ' وموجودة في C، فبنكتب:' + L('8 ∈ C') },
      { en: '<b>9 ∉ C</b>: 9 is not a power of 2.', ar: 'الـ 9 مش power of 2، فبنكتب:' + L('9 ∉ C') },
      { en: '<b>B = C</b>: every element of B is in C and every element of C is in B, the same elements.', ar: 'كل element في B موجود في C والعكس، يعني نفس الـ elements بالظبط:' + L('B = C') },
      { en: 'D: the numbers strictly between 7 and 11 are 8, 9, 10, all composite, so <b>D = ∅</b> (if "between" includes the ends, D = {7, 11}).', ar: 'الأرقام اللي بين 7 و11 (من غير الطرفين) هي 8 و9 و10، وكلهم composite، فـ:' + L('D = ∅') + 'ولو "between" بتشمل الطرفين يبقى:' + L('D = {7, 11}') }
    ];
    const [i, ctl] = useSteps(steps.length, 2000), [x, setX] = useState('4');
    const cls = (set, v) => {
      if (set === 'A' && i === 2) return v === '5' ? ' hit' : ' dim';
      if (set === 'B' && i === 3) return ' miss';
      if (set === 'C' && i === 4) return v === '8' ? ' hit' : ' dim';
      if (set === 'C' && i === 5) return ' miss';
      if ((set === 'B' || set === 'C') && i === 6) return ' on';
      return '';
    };
    const t = x.trim(), tests = [['A', A.includes(t)], ['B', B.includes(t)], ['C', CV.includes(t)], ['D', false]];
    return html`<figure className="fig dmv1"><div className="fig-stage"><div className="dmv1-wrap">
      <div className="dmv1-row"><span className="dmv1-lbl">A =</span>${A.map(v => html`<span key=${v} className=${'dmv1-chip' + cls('A', v)}>${v}</span>`)}</div>
      <div className="dmv1-row"><span className="dmv1-lbl">B =</span>${B.map(v => html`<span key=${v} className=${'dmv1-chip' + cls('B', v)}>${v}</span>`)}</div>
      <div className="dmv1-row"><span className="dmv1-lbl">C =</span>${CP.map((p, k) => html`<span key=${k} className=${'dmv1-chip' + cls('C', CV[k])}>${i >= 1 ? `${p} = ${CV[k]}` : p}</span>`)}</div>
      <div className="dmv1-row"><span className="dmv1-lbl">D =</span>${i < 7 ? html`<span className="dmv1-chip">{prime numbers between 7 and 11}</span>`
        : html`${[['8', '2×4'], ['9', '3×3'], ['10', '2×5']].map(([v, fct]) => html`<span key=${v} className="dmv1-chip miss">${v}<small>${fct}</small></span>`)}<span className="dmv1-k dmv1-mono">→ D = ∅</span>`}</div>
      <div className="dmv1-form"><label>Try your own x = <input className="dmv1-in sm" value=${x} onInput=${e => setX(e.target.value)} aria-label="x" spellCheck="false" /></label>
        ${tests.map(([s, v]) => html`<span key=${s} className=${'dmv1-chip ' + (v ? 'hit' : 'miss')}>${esc(t || '?')} ${v ? '∈' : '∉'} ${s}</span>`)}</div>
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3.0]-[3.1] subset and equal sets ── */
  const SUBX = { s30: { A: '1, 2, 3, 4, 5, 6', B: '1, 2, 3, 4' }, s31: { A: '1, 3, 4, 5, 6', B: '4, 1, 5, 6, 3' } };
  function SubsetEqual({ ar }) {
    const [mode, setMode] = useState('s30'), [own, setOwn] = useState({ A: '1, 2, 3', B: '3, 3, 1' });
    const src = mode === 'own' ? own : SUBX[mode], Ar = raw(src.A), Br = raw(src.B), Au = uniq(Ar), Bu = uniq(Br);
    const BinA = Bu.every(v => Au.includes(v)), AinB = Au.every(v => Bu.includes(v));
    const big = Au.length > 10 || Bu.length > 10 || Au.concat(Bu).some(v => v.length > 3);
    const missB = Bu.filter(v => !Au.includes(v)), missA = Au.filter(v => !Bu.includes(v));
    const verdict = AinB && BinA ? { en: 'A ⊆ B and B ⊆ A, which implies <b>A = B</b>. Order and repetition do not matter.', ar: 'الاتنين متحققين، وده معناه إن الـ sets متساويين. الترتيب والتكرار مش فارقين:' + L('A ⊆ B, B ⊆ A ⇒ A = B') }
      : BinA ? { en: `<b>B ⊆ A</b>, but A ⊄ B (${esc(missA.join(', '))} ${missA.length > 1 ? 'are' : 'is'} not in B), so A ≠ B.`, ar: 'الـ B جوه الـ A، لكن الـ A مش جوه الـ B، فهما مش متساويين:' + L(`B ⊆ A, A ⊄ B, A ≠ B`) }
      : AinB ? { en: `<b>A ⊆ B</b>, but B ⊄ A (${esc(missB.join(', '))} ${missB.length > 1 ? 'are' : 'is'} not in A), so A ≠ B.`, ar: 'الـ A جوه الـ B، لكن الـ B مش جوه الـ A، فهما مش متساويين:' + L(`A ⊆ B, B ⊄ A, A ≠ B`) }
      : { en: 'Neither is a subset of the other, so A ≠ B.', ar: 'ولا واحدة فيهم subset من التانية، فهما مش متساويين.' };
    const steps = [
      { en: 'Two sets A and B. Is one a subset of the other? Are they equal?', ar: 'عندنا set اسمها A وset اسمها B. هل واحدة فيهم subset من التانية؟ وهل هما متساويين؟' },
      { en: `Is <b>B ⊆ A</b>? Check every element of B in A: ${BinA ? 'all found, so B ⊆ A.' : esc(missB.join(', ')) + ' not in A, so B ⊄ A.'}`, ar: 'هل الـ B هي subset من A؟ بندوّر على كل element في B جوه A. ' + (BinA ? 'كلهم موجودين، يبقى ' + I('B&nbsp;⊆&nbsp;A') + '.' : 'فيه elements مش موجودة، يبقى الإجابة لأ.') },
      { en: `Is <b>A ⊆ B</b>? Check every element of A in B: ${AinB ? 'all found, so A ⊆ B.' : esc(missA.join(', ')) + ' not in B, so A ⊄ B.'}`, ar: 'وهل الـ A هي subset من B؟ بندوّر على كل element في A جوه B. ' + (AinB ? 'كلهم موجودين، يبقى ' + I('A&nbsp;⊆&nbsp;B') + '.' : 'فيه elements مش موجودة، يبقى الإجابة لأ.') },
      verdict
    ];
    const [i, ctl] = useWalk(steps.length, 1900, mode + src.A + '|' + src.B);
    const chip = (v, k, ok, show) => html`<span key=${k} className=${'dmv1-chip' + (show ? (ok ? ' hit' : ' miss') : '')}>${v}${show && html`<small>${ok ? '✓' : '✗'}</small>`}</span>`;
    let venn = null;
    if (!big && i === 3) {
      if (AinB && BinA) venn = html`<${Venn} kind="equal" ab=${numSort(Au)} label="A and B drawn as the same circle" />`;
      else if (BinA) venn = html`<${Venn} kind="nested" la="A" lb="B" a=${numSort(missA)} ab=${numSort(Bu)} label="B drawn inside A" />`;
      else if (AinB) venn = html`<${Venn} kind="nested" la="B" lb="A" a=${numSort(missB)} ab=${numSort(Au)} label="A drawn inside B" />`;
      else { const both = Au.filter(v => Bu.includes(v)); venn = html`<${Venn} kind=${both.length ? 'overlap' : 'apart'} a=${numSort(missA)} ab=${numSort(both)} b=${numSort(missB)} label="A and B" />`; }
    }
    return html`<figure className="fig dmv1"><div className="fig-stage"><div className="dmv1-wrap">
      <${Modes} list=${[['s30', 'Example 3.0'], ['s31', 'Example 3.1'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />
      ${mode === 'own' && html`<div className="dmv1-form">
        <label>A = <input className="dmv1-in" value=${own.A} onInput=${e => setOwn(Object.assign({}, own, { A: e.target.value }))} aria-label="Set A" spellCheck="false" /></label>
        <label>B = <input className="dmv1-in" value=${own.B} onInput=${e => setOwn(Object.assign({}, own, { B: e.target.value }))} aria-label="Set B" spellCheck="false" /></label></div>`}
      <div className="dmv1-row"><span className="dmv1-lbl">A =</span>${Ar.map((v, k) => chip(v, k, Bu.includes(v), i === 2))}</div>
      <div className="dmv1-row"><span className="dmv1-lbl">B =</span>${Br.map((v, k) => chip(v, k, Au.includes(v), i === 1))}</div>
      ${i === 3 && html`<div className="dmv1-big">${AinB && BinA ? 'A = B' : BinA ? 'B ⊆ A,  A ≠ B' : AinB ? 'A ⊆ B,  A ≠ B' : 'A ⊄ B,  B ⊄ A'}</div>`}
      ${venn}${big && i === 3 && html`<p className="dmv1-muted" style=${{ textAlign: 'center' }}>(Venn drawn for up to 10 short elements per set)</p>`}
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3.2]-[3.4] empty, finite or infinite ── */
  const TY = [
    { t: 'The set of whole numbers less than 0', k: 'E', en: 'there is no whole number less than 0.', ar: 'مفيش whole number أقل من الصفر.' },
    { t: '{x : x ∈ N, 3 < x < 4}', k: 'E', en: 'there is no natural number between 3 and 4.', ar: 'مفيش natural number بين 3 و4.' },
    { t: '{x : 2 < x < 3, x is a natural number}', k: 'E', en: 'there is no natural number between 2 and 3.', ar: 'مفيش natural number بين 2 و3.' },
    { t: '{x : x is a composite number less than 4}', k: 'E', en: 'there is no composite number less than 4.', ar: 'مفيش composite number أقل من 4.' },
    { t: 'The set of all colours in the rainbow', k: 'F', en: 'it has a definite number of elements.', ar: 'فيها عدد محدد من الـ elements.' },
    { t: '{x : x ∈ N, x < 7}', k: 'F', en: 'it has a definite number of elements: it stops below 7.', ar: 'فيها عدد محدد من الـ elements لأنها بتقف قبل 7.' },
    { t: 'P = {2, 3, 5, 7, 11, 13, 17, …, 97}', k: 'F', en: 'the list stops at 97 (25 primes).', ar: 'الـ list بتقف عند 97 (يعني 25 prime).' },
    { t: 'The set of all points in a plane', k: 'I', en: 'the points can never all be listed.', ar: 'النقط دي عمرها ما تتعد كلها.' },
    { t: '{x : x ∈ N, x > 1}', k: 'I', en: '2, 3, 4, … never ends.', ar: 'الأرقام 2 و3 و4 وهكذا مالهاش آخر.' },
    { t: 'The set of all prime numbers', k: 'I', en: 'the primes never end.', ar: 'الـ primes مالهاش آخر.' }
  ];
  const TYN = { E: ['Empty', 'Empty'], F: ['Finite', 'Finite'], I: ['Infinite', 'Infinite'] };
  function SetTypes({ ar }) {
    const [k, setK] = useState(0), [ans, setAns] = useState({}), cur = TY[k], got = ans[k];
    const right = got != null && (got === cur.k || (cur.k === 'E' && got === 'F'));
    const nm = { E: 'empty', F: 'finite', I: 'infinite' }, nmAr = { E: 'empty', F: 'finite', I: 'infinite' };
    const cap = got == null ? { en: 'Is this set <b>empty</b> (no elements), <b>finite</b> (a definite number of elements) or <b>infinite</b> (never-ending)?', ar: 'الـ set دي <b>empty</b> (مفيهاش elements) ولا <b>finite</b> (عددها محدد) ولا <b>infinite</b> (مالهاش آخر)؟' }
      : { en: (right ? 'Right: ' : 'Not quite: ') + `it is <b>${nm[cur.k]}</b> because ${cur.en}` + (cur.k === 'E' ? ' An empty set is also finite.' : ''),
        ar: (right ? 'صح، ' : 'مش بالظبط، ') + `دي set من نوع الـ <b>${nmAr[cur.k]}</b> لأن ${cur.ar}` + (cur.k === 'E' ? ' وخلي بالك الـ empty set كمان finite.' : '') };
    return html`<figure className="fig dmv1"><div className="fig-stage"><div className="dmv1-wrap" style=${{ maxWidth: '480px' }}>
      <div className="dmv1-card dmv1-mono" style=${{ fontWeight: 600 }}>${cur.t}</div>
      <div className="dmv1-pick">${['E', 'F', 'I'].map(c => html`<button key=${c} className=${'fig-btn' + (got === c ? ' dmv1-sel' : '')} onClick=${() => setAns(o => Object.assign({}, o, { [k]: c }))}>${TYN[c][0]}</button>`)}
        <button className="fig-btn" onClick=${() => setK((k + 1) % TY.length)}>Next ›</button></div>
      <div className="dmv1-bins">${['E', 'F', 'I'].map(c => html`<div key=${c} className="dmv1-bin"><b>${TYN[c][0]}</b>${TY.map((y, j) => ans[j] != null && y.k === c && html`<span key=${j}>${y.t}</span>`)}</div>`)}</div>
      <p className="dmv1-muted" style=${{ textAlign: 'center', margin: '6px 0 0' }}>${k + 1} / ${TY.length}</p>
      </div></div><${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /></figure>`;
  }

  /* ── [3.5] universal set ── */
  function Universal({ ar }) {
    const [mode, setMode] = useState('e1');
    const S1 = [
      { en: 'A = {1, 2, 3}.', ar: 'نبدأ بالـ set دي:' + L('A = {1, 2, 3}') },
      { en: 'B = {2, 3, 4}: 2 and 3 are shared with A, 4 is new.', ar: 'وبعدها الـ B، والـ 2 و3 مشتركين مع A، والـ 4 جديدة:' + L('B = {2, 3, 4}') },
      { en: 'C = {3, 5, 7}: 3 is in all three sets, 5 and 7 are new.', ar: 'وبعدها الـ C، والـ 3 موجودة في التلاتة، والـ 5 و7 جداد:' + L('C = {3, 5, 7}') },
      { en: 'U contains every element of the given sets, each written once: <b>U = {1, 2, 3, 4, 5, 7}</b>. So A ⊆ U, B ⊆ U, C ⊆ U.', ar: 'الـ U فيها كل الـ elements بتاعة الـ sets دي، وكل element مكتوب مرة واحدة بس:' + L('U = {1, 2, 3, 4, 5, 7}') + 'وبالتالي:' + L('A ⊆ U, B ⊆ U, C ⊆ U') }
    ];
    const S2 = [
      { en: 'P = the whole numbers: 0, 1, 2, 3, …', ar: 'الـ P هي الـ whole numbers:' + L('P = {0, 1, 2, 3, …}') },
      { en: 'Q = the negative numbers: …, −3, −2, −1.', ar: 'والـ Q هي الـ negative numbers:' + L('Q = {…, −3, −2, −1}') },
      { en: 'Together they cover every integer, so the universal set is <b>U = all integers</b> (Z).', ar: 'الاتنين مع بعض بيغطّوا كل الـ integers، فالـ universal set هي:' + L('U = Z (all integers)') }
    ];
    const steps = mode === 'e1' ? S1 : S2;
    const [i, ctl] = useWalk(steps.length, 1900, mode);
    const C = [[115, 95], [185, 95], [150, 152]], R = 66;
    const el = (t, x, y, at) => html`<text x=${x} y=${y} fontSize="18" textAnchor="middle" className=${pop(i >= at) + (i === at ? ' hot' : '')}>${t}</text>`;
    const U1 = [['1', 0], ['2', 0], ['3', 0], ['4', 1], ['5', 2], ['7', 2]];
    return html`<figure className="fig dmv1"><div className="fig-stage"><div className="dmv1-wrap">
      <${Modes} list=${[['e1', 'Example 1: A, B, C'], ['e2', 'Example 2: P, Q']]} mode=${mode} set=${setMode} />
      ${mode === 'e1' ? html`<div className="dmv1-svg"><svg viewBox="0 0 300 240" role="img" aria-label="Venn diagram of A, B and C inside U">
          <rect x="3" y="3" width="294" height="234" rx="8" fill=${i === 3 ? 'color-mix(in srgb, var(--k-compiler) 10%, var(--paper))' : 'var(--paper)'} stroke=${i === 3 ? 'var(--k-compiler)' : 'var(--graphite)'} strokeWidth=${i === 3 ? 3 : 1.5} className="dmv1-fill" />
          <text x="16" y="226" fontSize="17" className="lb">U</text>
          ${C.map((c, k) => html`<g key=${k} className=${pop(i >= k)}><circle cx=${c[0]} cy=${c[1]} r=${R} fill="color-mix(in srgb, var(--k-compiler) 10%, transparent)" stroke="var(--k-compiler)" strokeWidth="2.2" /></g>`)}
          <text x="36" y="30" fontSize="18" textAnchor="middle" className=${'lb ' + pop(i >= 0)}>A</text>
          <text x="264" y="30" fontSize="18" textAnchor="middle" className=${'lb ' + pop(i >= 1)}>B</text>
          <text x="62" y="208" fontSize="18" textAnchor="middle" className=${'lb ' + pop(i >= 2)}>C</text>
          ${el('1', 88, 84, 0)}${el('2', 150, 72, 0)}${el('3', 150, 118, 0)}${el('4', 212, 84, 1)}${el('5', 136, 192, 2)}${el('7', 164, 192, 2)}
        </svg></div>
        <div className="dmv1-row" style=${{ justifyContent: 'center' }}><span className="dmv1-lbl">U =</span>${i < 3 ? html`<span className="dmv1-muted">?</span>` : U1.map(([v]) => html`<span key=${v} className="dmv1-chip on">${v}</span>`)}</div>`
      : html`<div className="dmv1-nl" aria-label="Number line">${['…', '−4', '−3', '−2', '−1', '0', '1', '2', '3', '4', '…'].map((v, k) => {
            const neg = k < 5, c = (neg ? (i >= 1 ? ' q' : '') : (i >= 0 ? ' p' : '')) + (i >= 2 ? ' u' : '');
            return html`<span key=${k} className=${c.trim()}>${v}</span>`; })}</div>
        <div className="dmv1-key"><span><i style=${{ background: 'color-mix(in srgb, var(--k-compiler) 28%, var(--paper))' }}></i>P (whole numbers)</span><span className=${pop(i >= 1)}><i style=${{ background: 'color-mix(in srgb, var(--ok) 28%, var(--paper))' }}></i>Q (negative numbers)</span></div>
        <div className="dmv1-big" style=${{ marginTop: '10px' }}>${i >= 2 ? 'U = Z = {…, −2, −1, 0, 1, 2, …}' : ' '}</div>`}
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4] power set: built element by element, doubling each time ── */
  const PSX = { p0: [], p1: ['1'], p2: ['p', 'q'], p3: ['1', '2', '3'] };
  function PowerSet({ ar }) {
    const [mode, setMode] = useState('p3'), [own, setOwn] = useState('a, b, c, d');
    const ownS = uniq(raw(own)).slice(0, 5), S = mode === 'own' ? ownS : PSX[mode], n = S.length;
    const lists = [[[]]]; S.forEach(s => { const prev = lists[lists.length - 1]; lists.push(prev.concat(prev.map(x => x.concat([s])))); });
    const fin = lists[n].slice().sort((p, q) => { if (p.length !== q.length) return p.length - q.length; for (let j = 0; j < p.length; j++) { const d = S.indexOf(p[j]) - S.indexOf(q[j]); if (d) return d; } return 0; });
    const Sf = fmt(S), cnt = Array.from({ length: n + 1 }, (_, k) => 2 ** k);
    const steps = [{ en: `S = ${Sf}. Start with the empty set: before any element is used the only subset is ∅, so the list is {∅}.`, ar: 'عندنا الـ set دي:' + L(`S = ${Sf}`) + 'نبدأ بالـ empty set، لأن قبل ما ناخد أي element الـ subset الوحيدة هي ∅، فأول list عندنا:' + L('{∅}') }];
    S.forEach((s, k) => { const p = 2 ** k; steps.push({ en: `Element <b>${esc(s)}</b>: each of the ${p} subsets so far stays without ${esc(s)} (out) and is copied with ${esc(s)} added (in): ${p} × 2 = ${p * 2}.`,
      ar: 'ناخد الـ element ' + I(esc(s)) + '. كل subset من اللي عندنا يا إما تفضل من غيره (برّه) يا إما تتنسخ ومعاها هو (جوه)، فالعدد بيتضاعف:' + L(`${p} × 2 = ${p * 2}`) }); });
    steps.push({ en: `P(S) = {${fin.map(fmt).join(', ')}}. |S| = ${n}, so |P(S)| = 2${sup(n)} = ${2 ** n}. ∅ and S itself are always members.` + (n === 0 ? ' P(∅) = {∅} is not empty: it contains the empty set.' : ''),
      ar: 'الـ power set كاملة:' + L(`P(S) = {${fin.map(fmt).join(', ')}}`) + 'ولأن عدد الـ elements في S هو ' + I(String(n)) + ' يبقى:' + L(`|P(S)| = 2${sup(n)} = ${2 ** n}`) + (n === 0 ? 'يعني هي مش فاضية، جواها الـ empty set.' : 'والـ ∅ والـ S نفسها دايمًا members فيها.') });
    const [i, ctl] = useWalk(steps.length, 1900, mode + S.join('|'));
    const last = i === steps.length - 1, k = Math.min(i, n), shown = last ? fin : lists[k], half = k > 0 && !last ? 2 ** (k - 1) : Infinity;
    return html`<figure className="fig dmv1"><div className="fig-stage"><div className="dmv1-wrap">
      <${Modes} list=${[['p0', 'S = ∅'], ['p1', 'S = {1}'], ['p2', 'S = {p, q}'], ['p3', 'S = {1, 2, 3}'], ['own', 'Try your own']]} mode=${mode} set=${setMode} mono=${true} />
      ${mode === 'own' && html`<div className="dmv1-form"><label>S = <input className="dmv1-in" value=${own} onInput=${e => setOwn(e.target.value)} aria-label="Elements of S, separated by commas" spellCheck="false" /></label><span className="dmv1-muted">(up to 5 elements)</span></div>`}
      <div className="dmv1-big">S = ${Sf}</div>
      <div className="dmv1-row" style=${{ justifyContent: 'center' }}>${S.map((s, j) => html`<span key=${j} className=${'dmv1-chip' + (!last && j === k - 1 ? ' on' : j < k || last ? '' : ' dim')}>${s}</span>`)}</div>
      <div className="dmv1-ps">${shown.map((x, j) => html`<span key=${j} className=${'dmv1-chip' + (j >= half ? ' new' : '') + (last && (x.length === 0 || x.length === n) ? ' hit' : '')}>${fmt(x)}</span>`)}</div>
      <div className="dmv1-cnt">${cnt.slice(0, k + 1).join(' → ')}${last ? `  =  2${sup(n)}` : ''}</div>
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5] ∈ versus ⊆ ── */
  // nested sets: atom {t:'a', v} or set {t:'s', els}
  function parseSet(src) {
    let p = 0; const s = src.trim();
    const ws = () => { while (p < s.length && /\s/.test(s[p])) p++; };
    const item = () => { ws();
      if (s[p] === '∅' || s[p] === 'Φ' || s[p] === 'ϕ' || s[p] === 'φ') { p++; return { t: 's', els: [] }; }
      if (s[p] === 'P' && s[p + 1] === '(') { p += 2; const x = item(); ws(); if (s[p] !== ')') throw 'missing )'; p++; if (x.t !== 's') throw 'P( ) needs a set'; return power(x); }
      if (s[p] === '{') { p++; const els = []; ws(); if (s[p] === '}') { p++; return { t: 's', els }; }
        for (;;) { els.push(item()); ws(); if (s[p] === ',') { p++; continue; } if (s[p] === '}') { p++; break; } throw 'missing }'; }
        const seen = new Set(); return { t: 's', els: els.filter(e => { const kk = key(e); if (seen.has(kk)) return false; seen.add(kk); return true; }) }; }
      const m = s.slice(p).match(/^[A-Za-z0-9]+/); if (!m) throw 'unexpected "' + (s[p] || 'end') + '"'; p += m[0].length; return { t: 'a', v: m[0] }; };
    const r = item(); ws(); if (p < s.length) throw 'unexpected "' + s[p] + '"'; return r;
  }
  const key = e => e.t === 'a' ? e.v : '{' + e.els.map(key).sort().join(',') + '}';
  const show = e => e.t === 'a' ? e.v : e.els.length ? '{' + e.els.map(show).join(', ') + '}' : '∅';
  function power(x) { let out = [[]]; x.els.forEach(e => { out = out.concat(out.map(a => a.concat([e]))); }); return { t: 's', els: out.map(els => ({ t: 's', els })) }; }
  const IVS = [
    { k: 'a', l: '3 ∈ {1,2,3}', L: '3', op: '∈', R: '{1, 2, 3}' },
    { k: 'b', l: '{3} ∈ {1,2,3}', L: '{3}', op: '∈', R: '{1, 2, 3}' },
    { k: 'c', l: '{3} ⊆ {1,2,3}', L: '{3}', op: '⊆', R: '{1, 2, 3}' },
    { k: 'd', l: '{2} ⊆ {1,2,3}', L: '{2}', op: '⊆', R: '{1, 2, 3}' },
    { k: 'e', l: '2 ⊆ {1,2,3}', L: '2', op: '⊆', R: '{1, 2, 3}' },
    { k: 'f', l: 'A ⊆ A', L: '{1, 2, 3}', op: '⊆', R: '{1, 2, 3}', nl: 'A', nr: 'A', ctx: 'A = {1, 2, 3}' },
    { k: 'g', l: 'A ∈ A', L: '{1, 2, 3}', op: '∈', R: '{1, 2, 3}', nl: 'A', nr: 'A', ctx: 'A = {1, 2, 3}' },
    { k: 'h', l: 'B ∈ A', L: '{0}', op: '∈', R: '{0, {0}}', nl: 'B', nr: 'A', ctx: 'A = {0, {0}},  B = {0}' },
    { k: 'i', l: 'B ⊆ A', L: '{0}', op: '⊆', R: '{0, {0}}', nl: 'B', nr: 'A', ctx: 'A = {0, {0}},  B = {0}' },
    { k: 'j', l: 'P(B) ⊆ A', L: 'P({0})', op: '⊆', R: '{0, {0}}', nl: 'P(B)', nr: 'A', ctx: 'A = {0, {0}},  B = {0}' }
  ];
  function InVsSub({ ar }) {
    const [mode, setMode] = useState('a'), [own, setOwn] = useState({ L: '{1, {2}}', op: '⊆', R: '{1, 2, {2}}' });
    const pre = IVS.find(x => x.k === mode), src = mode === 'own' ? own : pre;
    let Lx, Rx, err = null;
    try { Lx = parseSet(src.L); Rx = parseSet(src.R); if (Rx.t !== 's') throw 'the right side must be a set'; } catch (e) { err = String(e); }
    let res = null, en = '', a = '', hit = new Set(), lchips = [];
    if (!err) {
      const ls = show(Lx), rs = show(Rx), nl = src.nl || ls, nr = src.nr || rs, st = `${nl} ${src.op} ${nr}`, keys = Rx.els.map(key);
      const lead = (src.nl ? `${esc(src.nl)} = ${esc(ls)}` + (src.nr ? `, ${esc(src.nr)} = ${esc(rs)}` : '') + '. ' : '');
      const leadAr = src.nl ? L(`${src.nl} = ${ls}` + (src.nr && src.nr !== src.nl ? `, ${src.nr} = ${rs}` : '')) : '';
      if (src.op === '∈') {
        const j = keys.indexOf(key(Lx)); res = j >= 0; if (res) hit.add(j); lchips = [{ t: ls, ok: res }];
        const subToo = Lx.t === 's' && Lx.els.every(e => keys.includes(key(e)));
        en = lead + `<b>${esc(st)}</b> is <b>${res ? 'true' : 'false'}</b>: ` + (res ? `${esc(ls)} is one of the listed elements of ${esc(nr)}.` : `none of the listed elements (${esc(Rx.els.map(show).join(', ') || 'none')}) equals ${esc(ls)}.` + (subToo && Lx.els.length ? ` (${esc(ls)} is a set; ${esc(ls)} ⊆ ${esc(nr)} holds instead.)` : ''))
          + ' ∈ relates an element to a set.';
        a = 'نشوف الجملة دي:' + L(st) + (leadAr ? 'والـ sets هنا:' + leadAr : '') + (res ? 'وهي <b>صح</b>، لأن ' + I(esc(ls)) + ' واحد من الـ elements المكتوبة.' : 'وهي <b>غلط</b>، لأن مفيش element مكتوب يساوي ' + I(esc(ls)) + '.' + (subToo && Lx.els.length ? ' الـ ' + I(esc(ls)) + ' دي set، والصح إنها subset.' : '')) + ' والـ ∈ بتربط element بـ set.';
      } else if (Lx.t === 'a') {
        res = false; lchips = [{ t: ls, ok: false }]; const j = keys.indexOf(ls); if (j >= 0) hit.add(j);
        en = `<b>${esc(st)}</b> does not apply: ${esc(ls)} is an element, not a set. ⊆ relates a set to a set` + (j >= 0 ? `: write ${esc(ls)} ∈ ${esc(nr)} or {${esc(ls)}} ⊆ ${esc(nr)}.` : '.');
        a = 'الجملة دي مش مظبوطة:' + L(st) + 'لأن ' + I(esc(ls)) + ' هنا element مش set، والـ ⊆ بتربط set بـ set.' + (j >= 0 ? ' الصح نكتب:' + L(`${ls} ∈ ${nr}, {${ls}} ⊆ ${nr}`) : '');
      } else {
        lchips = Lx.els.map(e => { const j = keys.indexOf(key(e)); if (j >= 0) hit.add(j); return { t: show(e), ok: j >= 0 }; });
        const miss = lchips.filter(c => !c.ok).map(c => c.t); res = miss.length === 0;
        en = lead + `<b>${esc(st)}</b> is <b>${res ? 'true' : 'false'}</b>: ` + (Lx.els.length === 0 ? '∅ has no element that could be missing.' : res ? `every element of ${esc(nl)} is listed in ${esc(nr)}.` : `${esc(miss.join(', '))} ${miss.length > 1 ? 'are' : 'is'} not an element of ${esc(nr)}.`) + ' ⊆ relates a set to a set.';
        a = 'نشوف الجملة دي:' + L(st) + (leadAr ? 'والـ sets هنا:' + leadAr : '') + (res ? 'وهي <b>صح</b>، لأن كل element في الـ set اللي على الشمال مكتوب في اللي على اليمين.' : 'وهي <b>غلط</b>، لأن فيه element مش موجود في اللي على اليمين:' + L(miss.join(', '))) + 'والـ ⊆ بتربط set بـ set.';
      }
    }
    return html`<figure className="fig dmv1"><div className="fig-stage"><div className="dmv1-wrap">
      <${Modes} list=${[...IVS.map(x => [x.k, x.l]), ['own', 'Try your own']]} mode=${mode} set=${setMode} mono=${true} />
      ${mode === 'own' && html`<div className="dmv1-form">
        <input className="dmv1-in" style=${{ maxWidth: '120px' }} value=${own.L} onInput=${e => setOwn(Object.assign({}, own, { L: e.target.value }))} aria-label="Left side" spellCheck="false" />
        ${['∈', '⊆'].map(o => html`<button key=${o} className=${'fig-btn' + (own.op === o ? ' dmv1-sel' : '')} onClick=${() => setOwn(Object.assign({}, own, { op: o }))}>${o}</button>`)}
        <input className="dmv1-in" style=${{ maxWidth: '140px' }} value=${own.R} onInput=${e => setOwn(Object.assign({}, own, { R: e.target.value }))} aria-label="Right side (a set)" spellCheck="false" />
        <span className="dmv1-muted">use { } , ∅ and P( )</span></div>`}
      ${pre && pre.ctx && html`<div className="dmv1-big dmv1-muted" style=${{ fontSize: '.92rem' }}>${pre.ctx}</div>`}
      ${err ? html`<p className="dmv1-err">Can't read that: ${err}</p>` : html`
        <div className="dmv1-big">${src.nl || show(Lx)} ${src.op} ${src.nr || show(Rx)}  <span className=${res ? 'dmv1-ok' : 'dmv1-no'}>${res ? '✓ true' : '✗ false'}</span></div>
        <div className="dmv1-left"><span className="dmv1-muted">${src.op === '∈' || Lx.t === 'a' ? 'the object:' : 'its elements:'}</span>
          ${lchips.length ? lchips.map((c, j) => html`<span key=${j} className=${'dmv1-chip ' + (c.ok ? 'hit' : 'miss')}>${c.t}</span>`) : html`<span className="dmv1-chip">none</span>`}</div>
        <div className="dmv1-muted" style=${{ textAlign: 'center' }}>the elements of ${src.nr || show(Rx)}:</div>
        <div className="dmv1-setbox"><span className="dmv1-brace">{</span>${Rx.els.map((e, j) => html`<span key=${j} className=${'dmv1-chip' + (e.t === 's' ? ' set' : '') + (hit.has(j) ? ' hit' : '')}>${show(e)}</span>`)}<span className="dmv1-brace">}</span></div>`}
      </div></div>${!err && html`<${Cap} en=${en} ar=${a} showAr=${ar} />`}</figure>`;
  }

  /* ── [6.1]-[6.4] the Venn figures: union, intersection, complement, difference, disjoint ── */
  const OPS = {
    u: { l: 'A ∪ B', sh: { a: 1, ab: 1, b: 1 }, f: '{x | x ∈ A or x ∈ B}', en: '<b>Union</b> A ∪ B = {x | x ∈ A or x ∈ B}: everything in A, in B or in both. It is the smallest set containing all elements of both sets.', ar: 'الـ <b>Union</b> فيها أي حاجة في A أو في B أو في الاتنين، وهي أصغر set فيها كل الـ elements بتاعتهم:' + L('A ∪ B = {x | x ∈ A or x ∈ B}'), rows: [1, 1, 1, 0] },
    i: { l: 'A ∩ B', sh: { ab: 1 }, f: '{x | x ∈ A and x ∈ B}', en: '<b>Intersection</b> A ∩ B = {x | x ∈ A and x ∈ B}: only the elements in A as well as in B.', ar: 'الـ <b>Intersection</b> فيها الـ elements اللي في A وفي B مع بعض بس:' + L('A ∩ B = {x | x ∈ A and x ∈ B}'), rows: [0, 1, 0, 0] },
    c: { l: 'U − A', sh: { out: 1 }, one: true, big: 'complement of A = U − A', en: '<b>Complement</b>: U is the universal set containing A; U − A, everything in U outside A, is the complement of A.', ar: 'الـ <b>Complement</b>: الـ U هي الـ universal set اللي فيها A، والـ complement هو كل اللي في U وبرّه A:' + L('U − A') },
    d: { l: 'A \\ B', sh: { a: 1 }, f: '{x | x ∈ A, x ∉ B}', en: '<b>Difference</b> A \\ B = {x | x ∈ A, x ∉ B}, read "A minus B" (also A − B or A ~ B): in A but not in B.', ar: 'الـ <b>Difference</b> وبتتقري "A minus B" (وبتتكتب كمان بالشكلين التانيين دول):' + L('A \\ B = {x | x ∈ A, x ∉ B}') + L('A − B, A ~ B'), rows: [1, 0, 0, 0] },
    j: { l: 'Disjoint', sh: {}, apart: true, big: 'A ∩ B = ∅', en: 'If A ∩ B = ∅ the sets are <b>disjoint</b>: the circles do not overlap.', ar: 'لو مفيش أي element مشترك بينهم يبقى الـ sets دي <b>disjoint</b>، والدواير مش متداخلة:' + L('A ∩ B = ∅') }
  };
  function VennOps({ ar }) {
    const [m, setM] = useState('u'), o = OPS[m];
    const R = [['only A', '∈ A', '∉ B'], ['both', '∈ A', '∈ B'], ['only B', '∉ A', '∈ B'], ['neither', '∉ A', '∉ B']];
    return html`<figure className="fig dmv1"><div className="fig-stage"><div className="dmv1-wrap">
      <${Modes} list=${Object.keys(OPS).map(k => [k, OPS[k].l])} mode=${m} set=${setM} mono=${true} />
      <${Venn} kind=${o.one ? 'one' : o.apart ? 'apart' : 'overlap'} shade=${o.sh} label=${'Venn diagram, shaded: ' + o.l} />
      <div className="dmv1-big">${o.big || o.l + ' = ' + o.f}</div>
      ${o.rows && html`<table className="dmv1-tb"><thead><tr><th>x in</th><th>A</th><th>B</th><th>${o.l}</th></tr></thead><tbody>
        ${R.map((r, k) => html`<tr key=${k} className=${o.rows[k] ? 'keep' : 'drop'}><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${o.rows[k] ? '✓ shaded' : '✗'}</td></tr>`)}</tbody></table>`}
      </div></div><${Cap} en=${o.en} ar=${o.ar} showAr=${ar} /></figure>`;
  }

  /* ── [6.5] U = M ∪ F, M ∩ F = ∅ ── */
  function DisjointUnion({ ar }) {
    const steps = [
      { en: 'U = the set of students at a university.', ar: 'الـ U هي كل الطلبة اللي في الجامعة.' },
      { en: 'M = the set of male students.', ar: 'والـ M هي مجموعة الطلبة الولاد.' },
      { en: 'F = the set of female students.', ar: 'والـ F هي مجموعة الطالبات البنات.' },
      { en: 'No student is in both: <b>M ∩ F = ∅</b>. Together they make up all of U: <b>U = M ∪ F</b>. U is the <b>disjoint union</b> of M and F.', ar: 'مفيش طالب في الاتنين، والاتنين مع بعض هما كل الـ U، فالـ U هي <b>disjoint union</b> لـ M وF:' + L('M ∩ F = ∅') + L('U = M ∪ F') }
    ];
    const [i, ctl] = useSteps(steps.length, 1800);
    const box = (x, lab, on, sub) => html`<g className=${pop(on)}><rect x=${x} y="40" width="128" height="130" rx="10" fill="color-mix(in srgb, var(--k-compiler) 22%, var(--paper))" stroke="var(--k-compiler)" strokeWidth=${i === 3 ? 3 : 2} className="dmv1-fill" />
      <text x=${x + 64} y="102" fontSize="26" textAnchor="middle" className="lb">${lab}</text><text x=${x + 64} y="128" fontSize="15" textAnchor="middle" style=${{ fontFamily: 'var(--body)' }}>${sub}</text></g>`;
    return html`<figure className="fig dmv1"><div className="fig-stage"><div className="dmv1-wrap"><div className="dmv1-svg"><svg viewBox="0 0 300 200" role="img" aria-label="U split into M and F with no overlap">
      <rect x="3" y="3" width="294" height="194" rx="10" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="1.5" />
      <text x="16" y="28" fontSize="17" className="lb">U (students)</text>
      ${box(14, 'M', i >= 1, 'male')}${box(158, 'F', i >= 2, 'female')}
      <g className=${pop(i >= 3)}><text x="150" y="190" fontSize="15" textAnchor="middle" className="hot">M ∩ F = ∅</text></g>
    </svg></div><div className="dmv1-big">${i >= 3 ? 'U = M ∪ F,  M ∩ F = ∅' : ' '}</div></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [7] the worked example, element by element ── */
  const WX = { A: ['1', '2', '3', '4'], B: ['3', '4', '5', '6', '7'], C: ['2', '3', '8', '9'] };
  const WOPS = [['A', 'u', 'B'], ['A', 'u', 'C'], ['B', 'u', 'C'], ['A', 'i', 'B'], ['A', 'i', 'C'], ['B', 'i', 'C'], ['A', 'd', 'B'], ['A', 'd', 'C'], ['B', 'd', 'C'], ['A', 'd', 'E']];
  const SYM = { u: '∪', i: '∩', d: '\\' };
  function OpsExample({ ar }) {
    const [mode, setMode] = useState('0'), [own, setOwn] = useState({ X: '1, 2, 3', Y: '2, 3, 4, 5', op: 'u' });
    let X, Y, nx, ny, op, inY, yTail = null;
    if (mode === 'own') { nx = 'A'; ny = 'B'; X = uniq(raw(own.X)); Y = uniq(raw(own.Y)); op = own.op; inY = v => Y.includes(v); }
    else { const w = WOPS[+mode]; nx = w[0]; ny = w[2]; op = w[1]; X = WX[nx];
      if (ny === 'E') { Y = ['2', '4', '6', '…']; inY = v => /^\d+$/.test(v) && v % 2 === 0; yTail = '6, 8, …'; } else { Y = WX[ny]; inY = v => Y.includes(v); } }
    const inX = v => X.includes(v);
    const cand = op === 'u' ? numSort(uniq(X.concat(Y))) : X.slice();
    const keep = v => op === 'u' ? inX(v) || inY(v) : op === 'i' ? inX(v) && inY(v) : inX(v) && !inY(v);
    const res = numSort(cand.filter(keep)), name = `${nx} ${SYM[op]} ${ny}`, rule = { u: `x ∈ ${nx} or x ∈ ${ny}`, i: `x ∈ ${nx} and x ∈ ${ny}`, d: `x ∈ ${nx} and x ∉ ${ny}` }[op];
    const ruleAr = { u: 'يكفي يكون في واحدة منهم', i: 'لازم يكون في الاتنين', d: `لازم يكون في ${nx} ومش في ${ny}` }[op];
    const steps = [{ en: `${nx} = ${fmt(X)}, ${ny} = ${ny === 'E' ? '{2, 4, 6, …}' : fmt(Y)}${ny === 'E' ? ', U = N' : ''}. For <b>${name}</b> keep x when ${rule}. Check ${op === 'u' ? 'every element of either set' : 'every element of ' + nx}.`,
      ar: 'عندنا الـ sets دي:' + L(`${nx} = ${fmt(X)}, ${ny} = ${ny === 'E' ? '{2, 4, 6, …}' : fmt(Y)}`) + `ولحساب الـ ${I(esc(name))} العنصر ${ruleAr} عشان يدخل، فبنجرّب كل element واحد واحد.` }];
    cand.forEach(v => { const k = keep(v), s = `${v} ${inX(v) ? '∈' : '∉'} ${nx}, ${v} ${inY(v) ? '∈' : '∉'} ${ny}`;
      steps.push({ en: `<b>${esc(v)}</b>: ${s} → ${k ? 'keep' : 'leave out'}.`, ar: 'نشوف العنصر ' + I(esc(v)) + ' في الـ sets دي:' + L(s) + (k ? 'يبقى بيدخل في الناتج.' : 'يبقى مش بيدخل في الناتج.') }); });
    steps.push({ en: `<b>${name} = ${fmt(res)}</b>` + (ny === 'E' ? ' (the even numbers 2 and 4 are removed).' : '.'), ar: 'الناتج النهائي هو:' + L(`${name} = ${fmt(res)}`) + (ny === 'E' ? 'يعني شلنا الأرقام الزوجية اللي هي 2 و4.' : '') });
    const [i, ctl] = useWalk(steps.length, 1500, mode + JSON.stringify(own));
    const done = cand.slice(0, Math.max(0, i)), cur = i >= 1 && i <= cand.length ? cand[i - 1] : null, last = i === steps.length - 1;
    const sh = last ? { u: { a: 1, ab: 1, b: 1 }, i: { ab: 1 }, d: { a: 1 } }[op] : {};
    const xa = numSort(X.filter(v => !inY(v))), xab = numSort(X.filter(v => inY(v))), yb = yTail ? [yTail] : numSort(Y.filter(v => !inX(v)));
    const big = mode === 'own' && (xa.length > 10 || xab.length > 10 || yb.length > 10 || X.concat(Y).some(v => v.length > 3));
    return html`<figure className="fig dmv1"><div className="fig-stage"><div className="dmv1-wrap">
      <${Modes} list=${[...WOPS.map((w, k) => [String(k), `${w[0]} ${SYM[w[1]]} ${w[2]}`]), ['own', 'Try your own']]} mode=${mode} set=${setMode} mono=${true} />
      ${mode === 'own' && html`<div className="dmv1-form">
        <label>A = <input className="dmv1-in" value=${own.X} onInput=${e => setOwn(Object.assign({}, own, { X: e.target.value }))} aria-label="Set A" spellCheck="false" /></label>
        <label>B = <input className="dmv1-in" value=${own.Y} onInput=${e => setOwn(Object.assign({}, own, { Y: e.target.value }))} aria-label="Set B" spellCheck="false" /></label>
        ${['u', 'i', 'd'].map(o => html`<button key=${o} className=${'fig-btn dmv1-mono' + (own.op === o ? ' dmv1-sel' : '')} onClick=${() => setOwn(Object.assign({}, own, { op: o }))}>A ${SYM[o]} B</button>`)}</div>`}
      ${!big && html`<${Venn} kind=${xab.length ? 'overlap' : 'apart'} la=${nx} lb=${ny} a=${xa} ab=${xab} b=${yb} shade=${sh} hot=${cur} label=${'Venn diagram of ' + nx + ' and ' + ny} />`}
      <div className="dmv1-big">${name} = ${last ? fmt(res) : '{' + done.filter(keep).join(', ') + (done.length < cand.length ? ' …' : '') + '}'}</div>
      ${i >= 1 && html`<table className="dmv1-tb"><thead><tr><th>x</th><th>x ∈ ${nx}?</th><th>x ∈ ${ny}?</th><th>in result?</th></tr></thead><tbody>
        ${done.map(v => html`<tr key=${v} className=${(v === cur ? 'cur ' : '') + (keep(v) ? 'keep' : 'drop')}><td>${v}</td><td>${inX(v) ? 'yes' : 'no'}</td><td>${inY(v) ? 'yes' : 'no'}</td><td>${keep(v) ? '✓ keep' : '✗'}</td></tr>`)}</tbody></table>`}
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'dm-set-builder': SetBuilder, 'dm-well-defined': WellDefined, 'dm-ex11-elements': Ex11, 'dm-subset-equal': SubsetEqual,
    'dm-set-types': SetTypes, 'dm-universal-set': Universal, 'dm-power-set': PowerSet, 'dm-in-vs-subset': InVsSub,
    'dm-venn-ops': VennOps, 'dm-disjoint-union': DisjointUnion, 'dm-ops-example': OpsExample
  });
})();
/* ── part L3 ── */
// Discrete Mathematics visuals, Lecture 3 (Propositions and Truth Tables): propositions, negation, the six connectives and their truth tables, 2ⁿ rows, truth tables of the lecture's examples built cell by cell, negating "all" statements (slides 4 to 21). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.dmv3{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.dmv3 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dmv3 .fig-btn[aria-pressed="true"]{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 16%, var(--paper)); }
.dmv3-wrap{ max-width:560px; margin:0 auto; color:var(--ink); min-width:0; }
.dmv3-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dmv3-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dmv3-mono{ font-family:var(--mono); }
.dmv3-muted{ color:var(--graphite); font-size:.84rem; }
.dmv3-T{ color:var(--ok); font-weight:700; } .dmv3-F{ color:var(--pen); font-weight:700; } .dmv3-hide{ visibility:hidden; }
.dmv3-fx{ text-align:center; font:700 1.08rem/1.35 var(--mono); color:var(--k-compiler); margin:0 0 10px; overflow-wrap:anywhere; }
.dmv3-tw{ max-width:100%; overflow-x:auto; }
.dmv3-tt{ border-collapse:collapse; margin:0 auto; font:600 .95rem/1.25 var(--mono); background:var(--paper); color:var(--ink); }
.dmv3-tt th, .dmv3-tt td{ border:1px solid var(--line); padding:4px 6px; text-align:center; transition:background .35s, box-shadow .35s; }
.dmv3-tt th{ font-size:.8rem; font-weight:700; background:var(--paper-2); overflow-wrap:anywhere; min-width:1.6em; }
.dmv3-tt th button{ all:unset; cursor:pointer; display:block; }
.dmv3-tt th button:focus-visible{ outline:2px solid var(--k-compiler); }
.dmv3-tt th.cur{ color:var(--k-compiler); box-shadow:inset 0 -3px 0 var(--k-compiler); }
.dmv3-tt .v{ background:color-mix(in srgb, var(--k-compiler) 7%, var(--paper)); }
.dmv3-tt .nr{ font:500 .8rem var(--body); color:var(--graphite); background:var(--paper-2); }
.dmv3-tt td.src{ background:color-mix(in srgb, var(--k-compiler) 16%, var(--paper)); }
.dmv3-tt td.cur{ background:color-mix(in srgb, var(--k-compiler) 26%, var(--paper)); box-shadow:inset 0 0 0 2px var(--k-compiler); }
.dmv3-tt tr.hit td.res{ background:color-mix(in srgb, var(--ok) 22%, var(--paper)); }
.dmv3-tt td.box{ box-shadow:inset 0 0 0 2px var(--k-compiler); }
.dmv3-tt tr.pe td{ border-bottom:2px solid var(--faint); }
.dmv3-tt td.new{ background:color-mix(in srgb, var(--k-compiler) 18%, var(--paper)); }
@media (max-width:420px){ .dmv3-tt th, .dmv3-tt td{ padding:4px 3px; } }
.dmv3-in{ display:block; font:500 1rem/1.4 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; width:100%; box-sizing:border-box; min-width:0; }
.dmv3-in{ resize:none; overflow-wrap:anywhere; }
.dmv3-in:focus{ outline:2px solid var(--k-compiler); outline-offset:1px; }
.dmv3-keys{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin:8px 0 10px; }
.dmv3-keys .fig-btn{ font:700 1rem var(--mono); min-width:38px; padding:4px 8px; }
.dmv3-err{ text-align:center; color:var(--pen); font-weight:600; margin:6px 0; }
.dmv3-sbar{ font:600 .84rem var(--mono); color:var(--graphite); }
/* switches */
.dmv3-sw{ display:flex; gap:10px; justify-content:center; margin:0 0 12px; }
.dmv3-sw button{ font:700 1.1rem var(--mono); min-width:96px; min-height:44px; border-radius:12px; border:2px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.dmv3-sw button.t{ border-color:var(--ok); color:var(--ok); } .dmv3-sw button.f{ border-color:var(--pen); color:var(--pen); }
.dmv3-cl{ display:grid; gap:6px; }
.dmv3-cn{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:2px 10px; align-items:center; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:7px 10px; transition:box-shadow .35s, background .35s; }
.dmv3-cn.on{ box-shadow:0 0 0 2px var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.dmv3-cn b{ font-size:.92rem; margin-right:6px; } .dmv3-cn .s{ font:600 .92rem var(--mono); color:var(--k-compiler); display:inline-block; white-space:nowrap; }
.dmv3-cn .r{ grid-column:1 / -1; font-size:.84rem; color:var(--graphite); line-height:1.35; }
.dmv3-cn .val{ font:700 1.05rem var(--mono); grid-row:1; grid-column:2; min-width:2.2em; text-align:center; }
/* cards */
.dmv3-cards{ display:grid; gap:8px; }
.dmv3-card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:10px; }
.dmv3-card .st{ font:700 1.15rem var(--mono); text-align:center; margin:2px 0 6px; }
.dmv3-tag{ display:inline-block; font-size:.84rem; font-weight:600; border-radius:99px; padding:2px 10px; border:1px solid var(--line); }
.dmv3-tag.yes{ border-color:var(--ok); color:var(--ok); } .dmv3-tag.no{ border-color:var(--pen); color:var(--pen); }
.dmv3-mid{ text-align:center; }
.dmv3-row{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; align-items:center; margin:6px 0; }
.dmv3-row .fig-btn{ font-size:.86rem; padding:4px 10px; }
/* days and ruler */
.dmv3-days{ display:grid; grid-template-columns:repeat(7, minmax(0,1fr)); gap:4px; margin:0 0 10px; }
.dmv3-days button{ font:600 .78rem var(--body); padding:8px 0; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; min-width:0; }
.dmv3-days button.p{ background:color-mix(in srgb, var(--k-compiler) 20%, var(--paper)); }
.dmv3-days button.n{ background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.dmv3-days button.at{ box-shadow:0 0 0 2px var(--ink); }
.dmv3-st2{ display:grid; gap:6px; }
.dmv3-st2 div{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:8px; align-items:center; border:1px solid var(--line); border-radius:10px; padding:7px 10px; background:var(--paper); font-size:.9rem; line-height:1.35; }
.dmv3-st2 .val{ font:700 1.05rem var(--mono); }
.dmv3-rul{ position:relative; margin:4px 4px 0; }
.dmv3-band{ position:relative; height:26px; border-radius:6px; background:var(--paper); border:1px solid var(--line); margin:0 0 6px; overflow:hidden; }
.dmv3-band i{ position:absolute; top:0; bottom:0; transition:left .4s, width .4s; }
.dmv3-band .bp{ background:color-mix(in srgb, var(--k-compiler) 35%, var(--paper)); }
.dmv3-band .bn{ background:color-mix(in srgb, var(--ok) 35%, var(--paper)); }
.dmv3-band span{ position:absolute; left:6px; top:3px; font-size:.8rem; font-weight:600; color:var(--ink); }
.dmv3-mark{ position:absolute; top:-4px; bottom:18px; width:0; border-left:2px dashed var(--ink); transition:left .3s; }
.dmv3-ax{ position:relative; height:18px; font:600 .78rem var(--mono); color:var(--graphite); }
.dmv3-ax span{ position:absolute; transform:translateX(-50%); white-space:nowrap; }
.dmv3-ax span:first-child{ transform:none; } .dmv3-ax span:last-child{ transform:translateX(-100%); }
.dmv3-rng{ width:100%; margin:10px 0 4px; accent-color:var(--k-compiler); }
.dmv3-verd{ text-align:center; font-weight:700; margin-top:8px; }
/* animals */
.dmv3-an{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:5px; margin:0 0 10px; }
.dmv3-an button{ font:600 .84rem var(--body); padding:6px 2px; border-radius:9px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; min-width:0; line-height:1.25; }
.dmv3-an button small{ display:block; font-size:.76rem; font-weight:600; }
.dmv3-an button.fly small{ color:var(--ok); } .dmv3-an button.nf small{ color:var(--pen); }
.dmv3-an button.w{ box-shadow:0 0 0 2px var(--k-compiler); }
.dmv3-pair{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 10px; margin:0 0 6px; }
.dmv3-pair .ln{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:2px 8px; align-items:center; padding:3px 0; }
.dmv3-pair .ln + .ln{ border-top:1px dashed var(--line); }
.dmv3-pair .q{ font-size:.9rem; } .dmv3-pair .fm{ font:600 .86rem var(--mono); color:var(--k-compiler); grid-column:1; }
.dmv3-pair .val{ font:700 1.05rem var(--mono); grid-row:1 / span 2; grid-column:2; }
.dmv3-pair .hd{ font-size:.8rem; font-weight:700; color:var(--graphite); }
.dmv3-pair.bad{ border-color:var(--pen); }
`;
  if (!document.getElementById('dmv3-css')) { const s = document.createElement('style'); s.id = 'dmv3-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = s => `<span class="ltr">${s}</span>`, B = s => `<bdi dir="ltr">${s}</bdi>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵'];
  const TF = b => b ? 'T' : 'F';
  const Modes = ({ list, mode, set }) => html`<div className="dmv3-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;

  // step walker that restarts when key changes (shows the full result after an edit)
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setPlay(false); setI(n - 1); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => Math.min(x + 1, n - 1)), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); }, end: () => { setPlay(false); setI(n - 1); } }];
  }
  const WBar = ({ n, i, ctl }) => html`<div className="fig-bar"><span className="dmv3-sbar">${i + 1} / ${n}</span><span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i === n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.end} disabled=${i === n - 1}>End ⏭</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;

  /* ───────── formulas: parse, print, evaluate ───────── */
  const SYM = { not: '¬', and: '∧', or: '∨', xor: '⊕', imp: '→', iff: '↔' };
  const ER = {
    empty: () => ({ en: 'Type a formula.', ar: 'اكتب formula الأول.' }),
    end: () => ({ en: 'The formula ends too early.', ar: 'الـ formula خلصت قبل ما تكمل.' }),
    paren: () => ({ en: 'A closing ")" is missing.', ar: 'فيه قوس <bdi dir="ltr">)</bdi> ناقص.' }),
    tok: x => ({ en: `<b>${esc(x)}</b> is in the wrong place.`, ar: `الرمز ${B(esc(x))} في مكان غلط.` }),
    tf: () => ({ en: 'T and F are truth values: use letters such as p, q, r, s for the variables.', ar: 'الـ T والـ F قيم مش variables، استخدم حروف زي p و q و r و s.' }),
    sym: c => ({ en: `"${esc(c)}" is not one of the symbols of this lecture.`, ar: `الرمز ${B(esc(c))} مش من رموز المحاضرة دي.` }),
    many: () => ({ en: 'At most 4 variables here (16 rows).', ar: 'هنا أقصى حاجة 4 variables يعني 16 row.' }),
    wide: k => ({ en: `This formula needs ${k} columns; at most 8 fit on a phone screen. Try a shorter one.`, ar: `الـ formula دي محتاجة ${B(k)} عمود، وأقصى حاجة 8 أعمدة علشان تبان على الموبايل. جرّب واحدة أقصر.` })
  };
  function lex(s) {
    const t = []; let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (s.startsWith('<->', i)) { t.push('iff'); i += 3; continue; }
      if (s.startsWith('->', i)) { t.push('imp'); i += 2; continue; }
      if ('¬~!'.includes(c)) t.push('not'); else if ('∧&·^*'.includes(c)) t.push('and'); else if ('∨|+'.includes(c)) t.push('or');
      else if (c === '⊕') t.push('xor'); else if ('→⊃>'.includes(c)) t.push('imp'); else if ('↔≡='.includes(c)) t.push('iff');
      else if (c === '(' || c === ')') t.push(c);
      else if (/[A-Za-z]/.test(c)) { if (c === 'T' || c === 'F') return { err: ER.tf() }; t.push({ v: c }); }
      else return { err: ER.sym(c) };
      i++;
    }
    return { t };
  }
  function parse(s) {
    const lx = lex(s); if (lx.err) return lx;
    const t = lx.t; let k = 0;
    const fail = e => { throw e; }, name = x => typeof x === 'object' ? x.v : (SYM[x] || x);
    function atom() {
      const x = t[k]; if (x == null) fail(ER.end());
      if (x === 'not') { k++; return { op: 'not', a: atom() }; }
      if (x === '(') { k++; const e = iff(); if (t[k] !== ')') fail(t[k] == null ? ER.paren() : ER.tok(name(t[k]))); k++; return e; }
      if (typeof x === 'object') { k++; return { op: 'var', v: x.v }; }
      fail(ER.tok(name(x)));
    }
    function and() { let a = atom(); while (t[k] === 'and') { k++; a = { op: 'and', a, b: atom() }; } return a; }
    function or() { let a = and(); while (t[k] === 'or' || t[k] === 'xor') { const o = t[k++]; a = { op: o, a, b: and() }; } return a; }
    function imp() { const a = or(); if (t[k] === 'imp') { k++; return { op: 'imp', a, b: imp() }; } return a; }
    function iff() { let a = imp(); while (t[k] === 'iff') { k++; a = { op: 'iff', a, b: imp() }; } return a; }
    try { if (!t.length) fail(ER.empty()); const e = iff(); if (k < t.length) fail(ER.tok(name(t[k]))); return { e }; } catch (x) { if (x && x.en) return { err: x }; throw x; }
  }
  const show = n => n.op === 'var' ? n.v : n.op === 'not' ? '¬' + (n.a.op === 'var' || n.a.op === 'not' ? show(n.a) : '(' + show(n.a) + ')') : wrap(n.a) + ' ' + SYM[n.op] + ' ' + wrap(n.b);
  const wrap = n => n.op === 'var' || n.op === 'not' ? show(n) : '(' + show(n) + ')';
  const OPS = { not: (a) => !a, and: (a, b) => a && b, or: (a, b) => a || b, xor: (a, b) => a !== b, imp: (a, b) => !a || b, iff: (a, b) => a === b };
  const ev = (n, env) => n.op === 'var' ? env[n.v] : n.op === 'not' ? !ev(n.a, env) : OPS[n.op](ev(n.a, env), ev(n.b, env));
  function build(src) {
    const p = parse(src); if (p.err) return p;
    const S = new Set(); (function w(n) { if (n.op === 'var') S.add(n.v); else { w(n.a); if (n.b) w(n.b); } })(p.e);
    const V = [...S].sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : a < b ? -1 : 1);
    if (V.length > 4) return { err: ER.many() };
    const C = [], seen = {}; (function w(n) { if (n.op === 'var') return; w(n.a); if (n.b) w(n.b); const s = show(n); if (!seen[s]) { seen[s] = 1; C.push(n); } })(p.e);
    if (V.length + C.length > 8) return { err: ER.wide(V.length + C.length) };
    const R = [...Array(1 << V.length)].map((_, k) => { const env = {}; V.forEach((v, j) => { env[v] = !((k >> (V.length - 1 - j)) & 1); }); return env; });
    const res = R.map(env => ev(p.e, env));
    return { e: p.e, V, C, R, res, f: show(p.e) };
  }
  const WHY = {
    not: { en: 'Negation gives the opposite truth value.', ar: 'الـ negation بتقلب الـ truth value للعكس.' },
    and: { en: 'Conjunction is true only when both are true.', ar: 'الـ conjunction بتبقى true بس لو الاتنين true.' },
    or: { en: 'Disjunction is false only when both are false.', ar: 'الـ disjunction بتبقى false بس لو الاتنين false.' },
    xor: { en: 'Exclusive or is true when only one of them is true.', ar: 'الـ exclusive or بتبقى true لو واحد بس فيهم true.' },
    imp: { en: 'Implication is false only when the antecedent is true and the consequent is false.', ar: 'الـ implication بتبقى false بس لو الـ antecedent كان true والـ consequent كان false.' },
    iff: { en: 'Biconditional is true when both have the same truth value.', ar: 'الـ biconditional بتبقى true لو الاتنين ليهم نفس الـ truth value.' }
  };

  /* ───────── truth table built cell by cell (sections [4.5], [5], [6], [7]) ───────── */
  function TTBuild({ ar, f0 }) {
    const [mode, setMode] = useState('ex'), [own, setOwn] = useState(f0), [bits, setBits] = useState(false), inp = useRef(null);
    const src = mode === 'ex' ? f0 : own;
    const T = React.useMemo(() => build(src), [src]);
    const nC = T.err ? 0 : T.C.length, nR = T.err ? 0 : T.R.length, n = T.err ? 1 : 2 + nC * nR;
    const [i, ctl] = useWalk(n, 750, mode + '|' + src);
    const v = b => bits ? (b ? '1' : '0') : TF(b);
    const put = s => { const el = inp.current, a = el ? el.selectionStart : own.length, z = el ? el.selectionEnd : own.length; const nx = own.slice(0, a) + s + own.slice(z); setOwn(nx); setTimeout(() => { if (el) { el.focus(); el.setSelectionRange(a + s.length, a + s.length); } }, 0); };
    let en = '', a = '', curC = -1, curR = -1, srcCells = {};
    if (T.err) { en = T.err.en; a = T.err.ar; }
    else {
      const { V, C, R, res } = T, nv = V.length;
      const colOf = nd => nd.op === 'var' ? 'v' + V.indexOf(nd.v) : 'c' + C.findIndex(c => show(c) === show(nd));
      if (i === 0) {
        en = `${nv} variable${nv > 1 ? 's' : ''} (${V.join(', ')}) give 2${SUP[nv]} = ${nR} rows: every possible case. Then each column is filled left to right; its truth value depends only on the columns it is built from (a truth function).`;
        a = `عندنا ${B(nv)} variable${nv > 1 ? 's' : ''} فعدد الـ rows بيبقى:` + L(`2${SUP[nv]} = ${nR}`) + 'كل row حالة ممكنة. بعد كده بنملا الأعمدة من الشمال لليمين، والـ truth value بتاع كل خانة بيتحدد بس من الأعمدة اللي اتبنت منها (ده معنى الـ truth function).';
      } else if (i === n - 1) {
        const hits = res.map((b, r) => b ? r + 1 : 0).filter(Boolean), list = hits.join(', ');
        if (hits.length === nR) { en = `The last column <b>${esc(T.f)}</b> is <b>${v(true)}</b> in every row: every case is true, so it is a <b>tautology</b> (logically true).`; a = `العمود الأخير طالع ${B(v(true))} في كل الـ rows، يعني كل الحالات true، يبقى الـ formula دي <b>tautology</b> (صح منطقيًا دايمًا).`; }
        else if (!hits.length) { en = `The last column is <b>${v(false)}</b> in every row: the formula is never true.`; a = `العمود الأخير طالع ${B(v(false))} في كل الـ rows، يعني الـ formula دي عمرها ما بتبقى true.`; }
        else {
          en = `<b>${esc(T.f)}</b> is true in row${hits.length > 1 ? 's' : ''} ${list} only, so it is not a tautology.`;
          a = 'الـ formula دي بتطلع true في الـ rows دي بس:' + L(`rows ${list}`) + 'يعني مش tautology.';
          for (const x of V) for (const b of [true, false]) if (R.every((env, r) => (env[x] === b) === res[r])) { en += ` It is true exactly when <b>${x}</b> is ${b ? 'true' : 'false'}.`; a += ` وبتبقى true بالظبط لما الـ ${B(x)} تبقى ${b ? 'true' : 'false'}.`; }
        }
      } else {
        const k = i - 1; curC = Math.floor(k / nR); curR = k % nR;
        const nd = C[curC], env = R[curR], out = ev(nd, env), w = WHY[nd.op];
        const ops = nd.op === 'not' ? [nd.a] : [nd.a, nd.b];
        ops.forEach(o => { srcCells[colOf(o)] = 1; });
        const vals = ops.map(o => `${esc(show(o))} = ${v(ev(o, env))}`).join(', ');
        const calc = nd.op === 'not' ? `¬${v(ev(nd.a, env))} = ${v(out)}` : `${v(ev(nd.a, env))} ${SYM[nd.op]} ${v(ev(nd.b, env))} = ${v(out)}`;
        en = `Row ${curR + 1}, column <b>${esc(show(nd))}</b>: ${vals}, so ${calc}. ${w.en}`;
        a = `في الـ row رقم ${B(curR + 1)} بنحسب خانة العمود اللي متعلّم عليه:` + L(`${vals} &nbsp;⇒&nbsp; ${calc}`) + w.ar;
      }
    }
    const last = nC - 1, end = !T.err && i === n - 1;
    return html`<figure className="fig dmv3"><div className="fig-stage"><div className="dmv3-wrap">
      <${Modes} list=${[['ex', 'Example from the notes'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />
      ${mode === 'own' ? html`<div><textarea ref=${inp} className="dmv3-in" rows="2" value=${own} onInput=${e => setOwn(e.target.value)} aria-label="Formula" spellCheck="false" autoCapitalize="off" autoComplete="off"></textarea>
        <div className="dmv3-keys" role="group" aria-label="Insert a symbol">${['¬', '∧', '∨', '⊕', '→', '↔', '(', ')', 'p', 'q', 'r'].map(s => html`<button key=${s} className="fig-btn" onClick=${() => put(s)}>${s}</button>`)}</div></div>`
        : html`<div className="dmv3-fx">${f0}</div>`}
      ${T.err ? html`<p className="dmv3-err">No table yet</p>` : html`<div className="dmv3-tw"><table className="dmv3-tt"><thead><tr>
        <th className="nr" aria-label="row">#</th>
        ${T.V.map(x => html`<th key=${x} className="v">${x}</th>`)}
        ${T.C.map((c, ci) => html`<th key=${ci} className=${ci === curC ? 'cur' : ''}>${show(c)}</th>`)}</tr></thead>
        <tbody>${T.R.map((env, r) => html`<tr key=${r} className=${end && T.res[r] ? 'hit' : ''}>
          <td className="nr">${r + 1}</td>
          ${T.V.map((x, vi) => html`<td key=${x} className=${'v' + (r === curR && srcCells['v' + vi] ? ' src' : '')}><span className=${env[x] ? 'dmv3-T' : 'dmv3-F'}>${v(env[x])}</span></td>`)}
          ${T.C.map((c, ci) => { const k = 1 + ci * nR + r, b = ev(c, env), cls = (k === i ? 'cur' : r === curR && srcCells['c' + ci] ? 'src' : '') + (ci === last ? ' res' : '');
            return html`<td key=${ci} className=${cls}><span className=${k <= i ? (b ? 'dmv3-T' : 'dmv3-F') : 'dmv3-hide'}>${v(b)}</span></td>`; })}
        </tr>`)}</tbody></table></div>`}
      <div className="dmv3-row"><button className="fig-btn" aria-pressed=${String(bits)} onClick=${() => setBits(!bits)}>${bits ? 'Bits 1 / 0' : 'Show as bits 1 / 0'}</button></div>
      </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      ${!T.err && html`<${WBar} n=${n} i=${i} ctl=${ctl} />`}</figure>`;
  }
  const TTTaut = p => html`<${TTBuild} ...${p} f0="p ∨ ¬p" />`;
  const TTEx5 = p => html`<${TTBuild} ...${p} f0="¬P ∧ (P → Q)" />`;
  const TTEx6 = p => html`<${TTBuild} ...${p} f0="(P → Q) ∨ (Q → P)" />`;
  const TTEx7 = p => html`<${TTBuild} ...${p} f0="(P → Q) ∧ (Q → R)" />`;

  /* ───────── [1.1] is it a proposition? ───────── */
  function PropX({ ar }) {
    const [x, setX] = useState(null);
    const ok = x != null && x + 1 === 2;
    const s = { en: '', ar: '' };
    if (x == null) { s.en = '<b>2 + 2 = 4</b> is a proposition: a fact, and it is true. <b>x + 1 = 2</b> is not a proposition: x has no value, so it is neither true nor false yet. Pick a value of x.'; s.ar = 'الجملة ' + B('2 + 2 = 4') + ' دي proposition لأنها حقيقة وقيمتها true. إنما ' + B('x + 1 = 2') + ' مش proposition لأن الـ x ملهاش قيمة، فمش صح ولا غلط لسه. اختار قيمة للـ x.'; }
    else { s.en = `With x = ${x} the statement becomes <b>${x} + 1 = 2</b>: now it is a proposition, and it is <b>${ok ? 'true' : 'false'}</b>. Its truth depends on x, which is why it needs a specific value.`; s.ar = `لما ${B('x = ' + x)} الجملة بتبقى:` + L(`${x} + 1 = 2`) + `ودلوقتي بقت proposition وقيمتها <b>${ok ? 'true' : 'false'}</b>. صحتها بتعتمد على الـ x، علشان كده لازم قيمة معينة.`; }
    return html`<figure className="fig dmv3"><div className="fig-stage"><div className="dmv3-wrap dmv3-cards">
      <div className="dmv3-card dmv3-mid"><div className="st">2 + 2 = 4</div><span className="dmv3-tag yes">proposition · T</span></div>
      <div className="dmv3-card dmv3-mid"><div className="st">${x == null ? 'x' : html`<span style=${{ color: 'var(--k-compiler)' }}>${x}</span>`} + 1 = 2</div>
        ${x == null ? html`<span className="dmv3-tag no">not a proposition</span>` : html`<span className=${'dmv3-tag ' + (ok ? 'yes' : 'no')}>proposition · ${TF(ok)}</span>`}
        <div className="dmv3-row" role="group" aria-label="Value of x"><span className="dmv3-muted">x =</span>
          ${[null, 0, 1, 2, 3].map(k => html`<button key=${String(k)} className="fig-btn" aria-pressed=${String(x === k)} onClick=${() => setX(k)}>${k == null ? 'no value' : k}</button>`)}</div></div>
      </div></div><${Cap} ...${s} showAr=${ar} /></figure>`;
  }

  /* ───────── [1.3] [1.4] negation: Thursday and the snow in Boulder ───────── */
  const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  function NegEx({ ar }) {
    const [tab, setTab] = useState('day'), [day, setDay] = useState(5), [cand, setCand] = useState('less'), [d, setD] = useState(0.5);
    const s = { en: '', ar: '' }; let body;
    if (tab === 'day') {
      const p = day === 5;
      s.en = `Today is <b>${DAYS[day]}</b>: p "Today is Thursday" is <b>${TF(p)}</b> and ¬p "Today is not Thursday" is <b>${TF(!p)}</b>. On every day exactly one of them is true: the opposite truth values.`;
      s.ar = `النهارده ${B(DAYS[day])}، فالـ p (النهارده Thursday) قيمتها ${B(TF(p))} والـ ${B('¬p')} (النهارده مش Thursday) قيمتها ${B(TF(!p))}. في أي يوم واحدة بس فيهم بتبقى true، يعني الـ truth values عكس بعض دايمًا.`;
      body = html`<div className="dmv3-days" role="group" aria-label="Today">${DAYS.map((x, j) => html`<button key=${x} className=${(j === 5 ? 'p' : 'n') + (j === day ? ' at' : '')} aria-pressed=${String(j === day)} onClick=${() => setDay(j)}>${x}</button>`)}</div>
        <div className="dmv3-st2"><div><span>p: Today is Thursday</span><span className=${'val dmv3-' + TF(p)}>${TF(p)}</span></div><div><span>¬p: Today is not Thursday</span><span className=${'val dmv3-' + TF(!p)}>${TF(!p)}</span></div></div>`;
    } else {
      const p = d >= 1, q = cand === 'less' ? d < 1 : d === 0, opp = p !== q, X = 2, pc = z => (z / X * 100) + '%';
      const qn = cand === 'less' ? 'Less than a foot of snow falls in Boulder on Fridays' : 'No snow falls in Boulder on Fridays';
      const dd = d === 1 ? '1 foot' : d + ' ft';
      if (cand === 'less') { s.en = `p "At least a foot of snow falls in Boulder on Fridays" covers depths from 1 foot up. "Less than a foot" covers everything below 1 foot. At ${dd}: p is <b>${TF(p)}</b>, the candidate is <b>${TF(q)}</b>. Move the depth: they are always opposite, so this is ¬p. The day stays Fridays.`; s.ar = `الـ p (على الأقل foot من التلج يوم الجمعة) بتغطي من foot واحد وطالع، وجملة "less than a foot" بتغطي كل اللي أقل من foot. عند العمق ${B(dd)} الـ p قيمتها ${B(TF(p))} والجملة التانية قيمتها ${B(TF(q))}. حرّك العمق وهتلاقيهم دايمًا عكس بعض، يبقى دي الـ ${B('¬p')}. واليوم بيفضل Fridays زي ما هو.`; }
      else { s.en = `"No snow" covers only depth 0. At ${dd}: p is <b>${TF(p)}</b>, "No snow" is <b>${TF(q)}</b>. ` + (opp ? 'Here they happen to be opposite, but try a depth between 0 and 1 foot: there both are false.' : '<b>Both are false</b>, so "No snow" is not the negation of p. The negation of "at least a foot" is "less than a foot".'); s.ar = `جملة "no snow" بتغطي العمق صفر بس. عند العمق ${B(dd)} الـ p قيمتها ${B(TF(p))} وجملة "no snow" قيمتها ${B(TF(q))}. ` + (opp ? 'هنا جم عكس بعض بالصدفة، بس جرّب عمق بين الصفر والـ foot، هناك الاتنين بيبقوا false.' : '<b>الاتنين false</b>، يبقى "no snow" مش نفي الـ p. نفي "at least a foot" هو "less than a foot".'); }
      body = html`<div className="dmv3-row" role="group" aria-label="Candidate negation"><span className="dmv3-muted">¬p?</span>
          <button className="fig-btn" aria-pressed=${String(cand === 'less')} onClick=${() => setCand('less')}>Less than a foot</button>
          <button className="fig-btn" aria-pressed=${String(cand === 'none')} onClick=${() => setCand('none')}>No snow</button></div>
        <div className="dmv3-rul">
          <div className="dmv3-band"><i className="bp" style=${{ left: pc(1), width: pc(1) }}></i><span>p: at least a foot</span></div>
          <div className="dmv3-band"><i className="bn" style=${cand === 'less' ? { left: 0, width: pc(1) } : { left: 0, width: '4px' }}></i><span style=${{ left: cand === 'less' ? '6px' : '10px' }}>${cand === 'less' ? 'less than a foot' : 'no snow (0 only)'}</span></div>
          <div className="dmv3-mark" style=${{ left: pc(d) }}></div>
          <div className="dmv3-ax"><span style=${{ left: 0 }}>0</span><span style=${{ left: '50%' }}>1 ft</span><span style=${{ left: '100%' }}>2 ft</span></div></div>
        <input type="range" className="dmv3-rng" min="0" max="2" step="0.25" value=${d} onInput=${e => setD(+e.target.value)} aria-label="Snow depth in feet" />
        <div className="dmv3-st2"><div><span>p: At least a foot of snow falls in Boulder on Fridays</span><span className=${'val dmv3-' + TF(p)}>${TF(p)}</span></div>
          <div><span>${qn}</span><span className=${'val dmv3-' + TF(q)}>${TF(q)}</span></div></div>
        <div className=${'dmv3-verd ' + (opp ? 'dmv3-T' : 'dmv3-F')}>${opp ? 'Opposite truth values' : 'Both false: not a negation'}</div>`;
    }
    return html`<figure className="fig dmv3"><div className="fig-stage"><div className="dmv3-wrap">
      <${Modes} list=${[['day', 'Today is Thursday'], ['snow', 'Snow in Boulder']]} mode=${tab} set=${setTab} />${body}</div></div>
      <${Cap} ...${s} showAr=${ar} /></figure>`;
  }

  /* ───────── [2] the six connectives on two switches ───────── */
  const CONN = [
    { k: 'not', name: 'Negation', sym: '¬p, ~p', f: (p) => !p, rule: 'true when p is false (opposite truth values)' },
    { k: 'and', name: 'Conjunction', sym: 'p ∧ q, p · q', f: (p, q) => p && q, rule: 'true only if both p and q are true' },
    { k: 'or', name: 'Disjunction', sym: 'p ∨ q', f: (p, q) => p || q, rule: 'true if either p or q (or both) is true; false only if both are false' },
    { k: 'xor', name: 'Exclusive or', sym: 'p ⊕ q', f: (p, q) => p !== q, rule: 'true if only one of p and q is true' },
    { k: 'imp', name: 'Implication', sym: 'p → q, p ⊃ q', f: (p, q) => !p || q, rule: 'false only when the antecedent p is true and the consequent q is false' },
    { k: 'iff', name: 'Biconditional', sym: 'p ↔ q, p ≡ q', f: (p, q) => p === q, rule: 'true when p and q have equal truth values' }
  ];
  const SHORT = { not: '¬p', and: 'p ∧ q', or: 'p ∨ q', xor: 'p ⊕ q', imp: 'p → q', iff: 'p ↔ q' };
  function ConnSwitch({ ar }) {
    const [p, setP] = useState(true), [q, setQ] = useState(false);
    const vals = CONN.map(c => c.f(p, q)), on = CONN.filter((c, j) => vals[j]).map(c => SHORT[c.k]).join(', '), off = CONN.filter((c, j) => !vals[j]).map(c => SHORT[c.k]).join(', ');
    const s = {
      en: `p = ${TF(p)}, q = ${TF(q)}: true are <b>${on}</b>; false are <b>${off}</b>.` + (p && !q ? ' This is the only case that makes p → q false.' : '') + ' Flip p or q to see each rule.',
      ar: 'لما ' + B('p = ' + TF(p) + ', q = ' + TF(q)) + ' اللي بيطلع true هو:' + L(on) + 'واللي بيطلع false هو:' + L(off) + (p && !q ? 'ودي الحالة الوحيدة اللي بتخلي الـ ' + B('p → q') + ' تطلع false. ' : '') + 'غيّر الـ p أو الـ q وشوف كل rule.'
    };
    return html`<figure className="fig dmv3"><div className="fig-stage"><div className="dmv3-wrap">
      <div className="dmv3-sw"><button className=${p ? 't' : 'f'} onClick=${() => setP(!p)} aria-label=${'p is ' + (p ? 'true' : 'false') + ', tap to flip'}>p = ${TF(p)}</button>
        <button className=${q ? 't' : 'f'} onClick=${() => setQ(!q)} aria-label=${'q is ' + (q ? 'true' : 'false') + ', tap to flip'}>q = ${TF(q)}</button></div>
      <div className="dmv3-cl">${CONN.map((c, j) => html`<div key=${c.k} className=${'dmv3-cn' + (vals[j] ? ' on' : '')}>
        <div><b>${c.name}</b><span className="s">${c.sym}</span></div>
        <span className=${'val dmv3-' + TF(vals[j])}>${TF(vals[j])}</span>
        <div className="r">${c.k === 'imp' ? html`${c.rule} <i>(p: hypothesis / antecedent, q: conclusion / consequent)</i>` : c.rule}</div></div>`)}</div>
      </div></div><${Cap} ...${s} showAr=${ar} /></figure>`;
  }

  /* ───────── [3] the connectives' truth table, column by column ───────── */
  const R4 = [[true, true], [true, false], [false, true], [false, false]];
  const TSTEPS = [
    { en: 'Two variables p and q give 2² = 4 rows, every possible case: TT, TF, FT, FF.', ar: 'الـ p والـ q مع بعض بيدّوا 4 rows، كل الحالات الممكنة:' + L('2² = 4 : TT, TF, FT, FF'), box: [] },
    { en: '<b>Negation</b> ¬p: "opposite truth values". Every row flips p.', ar: 'الـ <b>Negation</b> اللي هي <bdi dir="ltr">¬p</bdi> معناها "opposite truth values"، يعني كل row بنقلب فيه قيمة الـ p.', box: [0, 1, 2, 3] },
    { en: '<b>Conjunction</b> p ∧ q: "both are true". Only row 1 (T, T) is T; otherwise false.', ar: 'الـ <b>Conjunction</b> اللي هي <bdi dir="ltr">p ∧ q</bdi> معناها "both are true"، فبس الـ row الأول (T و T) بيطلع T والباقي F.', box: [0] },
    { en: '<b>Disjunction</b> p ∨ q (inclusive or): true if either p or q or both is true. False only in row 4, where both are false.', ar: 'الـ <b>Disjunction</b> اللي هي <bdi dir="ltr">p ∨ q</bdi> (inclusive or) بتبقى true لو أي واحد فيهم أو الاتنين true. وبتبقى false بس في الـ row الرابع لما الاتنين false.', box: [3] },
    { en: '<b>Exclusive or</b> p ⊕ q: true if only one of p and q is true, rows 2 and 3. Unlike ∨, row 1 (both true) is F.', ar: 'الـ <b>Exclusive or</b> اللي هي <bdi dir="ltr">p ⊕ q</bdi> بتبقى true لو واحد بس فيهم true، يعني الـ row التاني والتالت. وعلى عكس الـ <bdi dir="ltr">∨</bdi> الـ row الأول (الاتنين true) بيطلع F.', box: [1, 2] },
    { en: '<b>Material implication</b> p → q (also p ⊃ q): true "in all cases except when the antecedent is true and the consequent is false". Only row 2 (T, F) is F.', ar: 'الـ <b>Material implication</b> اللي هي <bdi dir="ltr">p → q</bdi> (أو <bdi dir="ltr">p ⊃ q</bdi>) بتبقى true في كل الحالات ما عدا لما الـ antecedent يبقى true والـ consequent يبقى false. فبس الـ row التاني (T و F) بيطلع F.', box: [1] },
    { en: '<b>Material equivalence</b> p ↔ q (also p ≡ q): "equivalent truth values". T in rows 1 and 4, where both are true or both are false.', ar: 'الـ <b>Material equivalence</b> اللي هي <bdi dir="ltr">p ↔ q</bdi> (أو <bdi dir="ltr">p ≡ q</bdi>) معناها "equivalent truth values"، فبتطلع T في الـ row الأول والرابع لما الاتنين true أو الاتنين false.', box: [0, 3] }
  ];
  const TCOLS = [['¬p', 'not'], ['p∧q', 'and'], ['p∨q', 'or'], ['p⊕q', 'xor'], ['p→q', 'imp'], ['p↔q', 'iff']];
  function ConnTable({ ar }) {
    const [i, ctl] = useSteps(TSTEPS.length, 2600), [bits, setBits] = useState(false);
    const v = b => bits ? (b ? '1' : '0') : TF(b), st = TSTEPS[i];
    return html`<figure className="fig dmv3"><div className="fig-stage"><div className="dmv3-wrap">
      <div className="dmv3-tw"><table className="dmv3-tt"><thead><tr><th className="v">p</th><th className="v">q</th>
        ${TCOLS.map(([h], c) => html`<th key=${h} className=${c + 1 === i ? 'cur' : ''}><button onClick=${() => ctl.go(c + 1)} aria-label=${'Show ' + h}>${h}</button></th>`)}</tr></thead>
        <tbody>${R4.map(([p, q], r) => html`<tr key=${r}><td className="v"><span className=${'dmv3-' + TF(p)}>${v(p)}</span></td><td className="v"><span className=${'dmv3-' + TF(q)}>${v(q)}</span></td>
          ${TCOLS.map(([h, k], c) => { const b = k === 'not' ? !p : OPS[k](p, q); return html`<td key=${h} className=${c + 1 === i ? (st.box.includes(r) ? 'cur' : 'src') : ''}><span className=${c + 1 <= i ? 'dmv3-' + TF(b) : 'dmv3-hide'}>${v(b)}</span></td>`; })}</tr>`)}</tbody></table></div>
      <div className="dmv3-row"><button className="fig-btn" aria-pressed=${String(bits)} onClick=${() => setBits(!bits)}>${bits ? 'Bits 1 / 0' : 'Show as bits 1 / 0'}</button></div>
      </div></div><${Cap} ...${st} showAr=${ar} /><${Bar} steps=${TSTEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [4.3] n variables → 2ⁿ rows ───────── */
  const VN = ['p', 'q', 'r', 's'];
  const RSTEPS = [1, 2, 3, 4].map(n => {
    const R = 1 << n, vs = VN.slice(0, n), every = vs.map((x, j) => `${x} every ${1 << (n - 1 - j)}`).join(', ');
    const en = `n = ${n}: 2${SUP[n]} = <b>${R} rows</b>.` + (n > 1 ? ` Adding <b>${vs[n - 1]}</b> doubles the rows: every row of the ${n - 1}-variable table appears twice, once with ${vs[n - 1]} = T and once with ${vs[n - 1]} = F.` : ' One variable is either T or F.') + ` Each column switches value in blocks: ${every} row${n === 1 ? '' : 's'}.` + (n === 3 ? ' Midterm 2025/26 Q21: 3 variables → 8 rows.' : '');
    const ar = `لما ${B('n = ' + n)} عدد الـ rows:` + L(`2${SUP[n]} = ${R}`) + (n > 1 ? `ولما بنزوّد الـ ${B(vs[n - 1])} الـ rows بتتضاعف: كل row من الجدول اللي قبله بيتكرر مرتين، مرة مع ${B(vs[n - 1] + ' = T')} ومرة مع ${B(vs[n - 1] + ' = F')}.` : 'الـ variable الواحد يا T يا F.') + (n === 3 ? ' ودي إجابة سؤال 21 في الـ Midterm بتاع ' + B('2025/26') + '.' : '');
    return { n, en, ar };
  });
  function Rows({ ar }) {
    const [i, ctl] = useSteps(RSTEPS.length, 2600), n = RSTEPS[i].n, R = 1 << n;
    return html`<figure className="fig dmv3"><div className="fig-stage"><div className="dmv3-wrap">
      <div className="dmv3-modes" role="group" aria-label="Number of variables">${RSTEPS.map((s, j) => html`<button key=${j} className="fig-btn" aria-pressed=${String(i === j)} onClick=${() => ctl.go(j)}>n = ${s.n}</button>`)}</div>
      <div className="dmv3-tw"><table className="dmv3-tt"><thead><tr><th className="nr">row</th>${VN.slice(0, n).map((x, j) => html`<th key=${x} className=${j === n - 1 && n > 1 ? 'cur' : 'v'}>${x}</th>`)}</tr></thead>
        <tbody>${[...Array(R)].map((_, k) => html`<tr key=${k} className=${n > 1 && k % 2 === 1 && k < R - 1 ? 'pe' : ''}><td className="nr">${k + 1}</td>
          ${VN.slice(0, n).map((x, j) => { const b = !((k >> (n - 1 - j)) & 1); return html`<td key=${x} className=${j === n - 1 && n > 1 ? 'new' : 'v'}><span className=${'dmv3-' + TF(b)}>${TF(b)}</span></td>`; })}</tr>`)}</tbody></table></div>
      </div></div><${Cap} en=${RSTEPS[i].en} ar=${RSTEPS[i].ar} showAr=${ar} /><${Bar} steps=${RSTEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [8] negating "all": ¬∀x P(x) ≡ ∃x ¬P(x), ¬∃x P(x) ≡ ∀x ¬P(x) ───────── */
  const ANIM = ['eagle', 'sparrow', 'bat', 'penguin', 'cat', 'dog'];
  const WORLDS = { mixed: [true, true, true, false, false, false], all: [true, true, true, true, true, true], none: [false, false, false, false, false, false] };
  function Quant({ ar }) {
    const [fly, setFly] = useState(WORLDS.mixed);
    const all = fly.every(Boolean), some = fly.some(Boolean), someNot = fly.some(b => !b), allNot = fly.every(b => !b);
    const wit = ANIM.filter((_, j) => !fly[j]), witF = ANIM.filter((_, j) => fly[j]);
    const flip = j => setFly(fly.map((b, k) => k === j ? !b : b));
    const s = { en: '', ar: '' };
    if (!all && !allNot) { s.en = `Some can fly, some cannot. "All animals can fly" is <b>F</b> (the ${wit[0]} cannot), and "Some animals cannot fly" is <b>T</b>: exactly opposite, so it is the negation. But "All animals cannot fly" is <b>F</b> too: both F, so it is <b>not</b> the negation of "All animals can fly".`; s.ar = 'فيه حيوانات بتطير وحيوانات مابتطيرش. جملة "كل الحيوانات بتطير" ' + B('∀x P(x)') + ` قيمتها F (الـ ${wit[0]} مابيطيرش)، وجملة "فيه حيوان مابيطيرش" ` + B('∃x ¬P(x)') + ' قيمتها T، يعني عكس بعض بالظبط، يبقى دي الـ negation. إنما جملة "كل الحيوانات مابتطيرش" ' + B('∀x ¬P(x)') + ' قيمتها F هي كمان، والاتنين F، يبقى دي <b>مش</b> النفي.'; }
    else if (all) { s.en = 'Every animal here can fly: ∀x P(x) is <b>T</b>, so its negation ∃x ¬P(x) "Some animals cannot fly" is <b>F</b>: there is no animal that cannot fly.'; s.ar = 'كل الحيوانات هنا بتطير، فالـ ' + B('∀x P(x)') + ' قيمتها T، ونفيها ' + B('∃x ¬P(x)') + ' قيمته F لأن مفيش ولا حيوان مابيطيرش.'; }
    else { s.en = 'No animal here can fly: ∃x P(x) "Some animals can fly" is <b>F</b>, so its negation ∀x ¬P(x) "All animals cannot fly" is <b>T</b>. That is the second rule: ¬(∃x P(x)) ≡ ∀x ¬P(x).'; s.ar = 'مفيش ولا حيوان هنا بيطير، فالـ ' + B('∃x P(x)') + ' قيمتها F، ونفيها ' + B('∀x ¬P(x)') + ' قيمته T. ودي الـ rule التانية:' + L('¬(∃x P(x)) ≡ ∀x ¬P(x)'); }
    const Ln = ({ q, fm, b }) => html`<div className="ln"><span className="q">${q}</span><span className="fm">${fm}</span><span className=${'val dmv3-' + TF(b)}>${TF(b)}</span></div>`;
    return html`<figure className="fig dmv3"><div className="fig-stage"><div className="dmv3-wrap">
      <div className="dmv3-row" role="group" aria-label="Worlds"><button className="fig-btn" aria-pressed=${String(fly.join() === WORLDS.mixed.join())} onClick=${() => setFly(WORLDS.mixed)}>Some fly</button>
        <button className="fig-btn" aria-pressed=${String(all)} onClick=${() => setFly(WORLDS.all)}>All fly</button><button className="fig-btn" aria-pressed=${String(allNot)} onClick=${() => setFly(WORLDS.none)}>None fly</button></div>
      <p className="dmv3-muted dmv3-mid" style=${{ margin: '0 0 6px' }}>P(x): x can fly. Tap an animal to change it.</p>
      <div className="dmv3-an">${ANIM.map((x, j) => html`<button key=${x} className=${(fly[j] ? 'fly' : 'nf') + ((all ? false : !fly[j]) ? ' w' : '')} aria-pressed=${String(fly[j])} onClick=${() => flip(j)}>${x}<small>${fly[j] ? 'can fly' : 'cannot fly'}</small></button>`)}</div>
      <div className="dmv3-pair"><div className="hd">Statement and its negation</div>
        <${Ln} q="All animals can fly" fm="∀x P(x)" b=${all} /><${Ln} q="Some animals cannot fly" fm="∃x ¬P(x)" b=${someNot} /></div>
      <div className="dmv3-pair"><div className="hd">Statement and its negation</div>
        <${Ln} q="Some animals can fly" fm="∃x P(x)" b=${some} /><${Ln} q="All animals cannot fly" fm="∀x ¬P(x)" b=${allNot} /></div>
      <div className=${'dmv3-pair' + (all === allNot ? ' bad' : '')}><div className="hd">Wrong negation: ${all === allNot ? 'both F here' : 'try "Some fly"'}</div>
        <${Ln} q="All animals can fly" fm="∀x P(x)" b=${all} /><${Ln} q="All animals cannot fly" fm="∀x ¬P(x)" b=${allNot} /></div>
      </div></div><${Cap} ...${s} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'dm-l3-prop': PropX, 'dm-l3-neg': NegEx, 'dm-l3-conn-sw': ConnSwitch, 'dm-l3-conn-tt': ConnTable, 'dm-l3-rows': Rows,
    'dm-l3-taut': TTTaut, 'dm-l3-tt-ex5': TTEx5, 'dm-l3-tt-ex6': TTEx6, 'dm-l3-tt-ex7': TTEx7, 'dm-l3-quant': Quant
  });
})();
/* ── part L4 ── */
// Discrete Mathematics visuals, Lecture 4 (tautologies, contradictions, logical equivalences): truth tables filled column by column (Examples 1.1.13/1.1.14, Tables 3 and 4, Example 1.2.2) and row by row (tautology checker, equivalence checker, the laws of Theorem 1.1.1, the hypothesis/conclusion table), and the law-by-law proof of ~(~p ∧ q) ∧ (p ∨ q) ≡ p. Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.dmv4 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dmv4 .fig-btn.dmv4-sel{ background:var(--s-compiler); color:#fff; border-color:transparent; }
.dmv4 .fig-cap .ltr{ display:block; direction:ltr; unicode-bidi:isolate; text-align:left; font-family:var(--mono); font-size:.88rem; margin:3px 0; overflow-wrap:anywhere; color:var(--ink); }
.dmv4-chips{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin:0 0 8px; }
.dmv4-chips .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:30px; }
.dmv4-chips .dmv4-m{ font-family:var(--mono); }
.dmv4-in{ display:block; width:100%; box-sizing:border-box; min-width:0; font:500 1rem/1.4 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; }
.dmv4-in:focus{ outline:2px solid var(--k-compiler); outline-offset:1px; }
.dmv4-field{ display:flex; gap:6px; align-items:center; margin:0 0 6px; max-width:520px; margin-left:auto; margin-right:auto; }
.dmv4-field > b{ font:700 .95rem var(--mono); color:var(--k-compiler); flex:none; }
.dmv4-keys{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin:2px 0 10px; }
.dmv4-key{ font:600 .95rem/1 var(--mono); min-width:34px; min-height:32px; padding:4px 6px; border-radius:7px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.dmv4-key:hover{ border-color:var(--k-compiler); }
.dmv4-err{ text-align:center; color:var(--pen); font-weight:600; font-size:.9rem; margin:8px 0; }
.dmv4-eq{ text-align:center; font:700 1.05rem/1.4 var(--mono); color:var(--ink); margin:2px 0 8px; overflow-wrap:anywhere; }
.dmv4-tw{ max-width:560px; margin:0 auto; }
.dmv4-tb{ border-collapse:collapse; width:100%; color:var(--ink); }
.dmv4-tb th, .dmv4-tb td{ border:1px solid var(--line); padding:4px 3px; text-align:center; background:var(--paper); transition:background .35s, box-shadow .35s; }
.dmv4-tb th{ font:600 .78rem/1.25 var(--mono); background:color-mix(in srgb, var(--k-compiler) 14%, var(--paper)); overflow-wrap:anywhere; vertical-align:bottom; }
.dmv4-tb td{ font:600 .95rem/1.2 var(--mono); }
.dmv4-tb td.dmv4-f{ color:var(--graphite); font-weight:500; }
.dmv4-tb tr.dmv4-tags th{ background:var(--paper-2); border:0; font:600 .75rem/1.2 var(--body); color:var(--k-compiler); padding:0 2px 3px; }
.dmv4-tb tr.dmv4-ft td{ font:600 .75rem/1.25 var(--body); color:var(--k-compiler); background:var(--paper-2); }
.dmv4-tb .dmv4-cur{ background:color-mix(in srgb, var(--k-compiler) 24%, var(--paper)); }
.dmv4-tb .dmv4-cmp{ box-shadow:inset 0 0 0 2px var(--k-compiler); }
.dmv4-tb .dmv4-same{ background:color-mix(in srgb, var(--ok) 20%, var(--paper)); }
.dmv4-tb tr.dmv4-bad td{ background:color-mix(in srgb, var(--pen) 20%, var(--paper)); }
.dmv4-ver{ max-width:520px; margin:10px auto 0; text-align:center; font-weight:700; font-size:.95rem; padding:6px 10px; border-radius:8px; border:1.5px solid var(--ok); color:var(--ink); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.dmv4-ver.dmv4-no{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
.dmv4-ver.dmv4-mid{ border-color:var(--line); background:var(--paper); }
.dmv4-pf{ display:grid; gap:6px; max-width:520px; margin:0 auto; }
.dmv4-pf .dmv4-hd{ font-size:.8rem; color:var(--graphite); text-align:center; }
.dmv4-ln{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; }
.dmv4-ln.dmv4-now{ box-shadow:0 0 0 2px var(--k-compiler); }
.dmv4-fx{ font:600 .98rem/1.45 var(--mono); color:var(--ink); direction:ltr; text-align:left; overflow-wrap:anywhere; }
.dmv4-fx .dmv4-old{ background:color-mix(in srgb, var(--pen) 22%, transparent); border-radius:4px; }
.dmv4-fx .dmv4-new{ background:color-mix(in srgb, var(--k-compiler) 28%, transparent); border-radius:4px; }
.dmv4-by{ display:flex; justify-content:space-between; gap:4px 10px; flex-wrap:wrap; font-size:.8rem; color:var(--graphite); margin-top:2px; direction:ltr; }
.dmv4-by b{ color:var(--k-compiler); font-weight:600; }
.dmv4-by span:last-child{ font-family:var(--mono); letter-spacing:.08em; }
`;
  if (!document.getElementById('dmv4-css')) { const s = document.createElement('style'); s.id = 'dmv4-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── formulas: ~ ∧ ∨ → ↔, ( ), letters; t / T = tautology (always T), c / F = contradiction (always F) ── */
  const L = s => `<span class="ltr">${s}</span>`, I = s => `<bdi dir="ltr">${String(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const TF = v => v ? 'T' : 'F';
  const BIN = { '∧': 1, '∨': 1, '→': 1, '↔': 1 };
  const E = (en, ar) => ({ en, ar });
  function lex(s) {
    s = s.replace(/<->|<=>|⇔/g, '↔').replace(/->|=>|⇒/g, '→');
    const t = [];
    for (const ch of s) {
      if (/\s/.test(ch)) continue;
      if ('~¬!'.includes(ch)) t.push('~'); else if ('∧&^'.includes(ch)) t.push('∧'); else if ('∨|'.includes(ch)) t.push('∨');
      else if ('→↔()'.includes(ch) || /[a-zA-Z]/.test(ch)) t.push(ch);
      else throw E(`Unknown symbol “${ch}”. Use letters, ~ ∧ ∨ → ↔ and parentheses.`, 'فيه رمز مش معروف:' + L(ch) + 'استخدم حروف والرموز دي بس:' + L('~ ∧ ∨ → ↔ ( )'));
    }
    return t;
  }
  function parse(src) {
    const tk = lex(src); let i = 0;
    const peek = () => tk[i];
    function lv1() {
      const a = lv2();
      if (peek() === '→' || peek() === '↔') { const op = tk[i++], b = lv2();
        if (peek() === '→' || peek() === '↔') throw E('Two → / ↔ in a row need parentheses, e.g. (p → q) → r.', 'لو فيه اتنين → أو ↔ ورا بعض لازم أقواس، زي:' + L('(p → q) → r'));
        return { k: op, a, b }; }
      return a;
    }
    function lv2() {
      let a = un(), op = null;
      while (peek() === '∧' || peek() === '∨') { const o = tk[i++];
        if (op && o !== op) throw E('∧ and ∨ together need parentheses, e.g. p ∨ (q ∧ r).', 'لو فيه ∧ و ∨ مع بعض لازم أقواس، زي:' + L('p ∨ (q ∧ r)'));
        op = o; a = { k: o, a, b: un() }; }
      return a;
    }
    function un() { if (peek() === '~') { i++; return { k: '~', a: un() }; } return atom(); }
    function atom() {
      const x = tk[i++];
      if (x === undefined) throw E('The formula ends too early.', 'الـ formula خلصت قبل ما تكمل.');
      if (x === '(') { const e = lv1(); if (tk[i++] !== ')') throw E('A closing “)” is missing.', 'ناقص قوس ' + I(')') + ' يقفل.'); return Object.assign({}, e, { par: true }); }
      if (/^[a-zA-Z]$/.test(x)) { if (x === 't' || x === 'T') return { k: 'k', v: true, n: x }; if (x === 'c' || x === 'F') return { k: 'k', v: false, n: x }; return { k: 'v', n: x }; }
      throw E(`Unexpected “${x}”.`, 'فيه رمز مش في مكانه:' + L(x));
    }
    const e = lv1();
    if (i < tk.length) throw E(`Unexpected “${tk[i]}”.`, 'فيه رمز مش في مكانه:' + L(tk[i]));
    return e;
  }
  const ev = (e, env) => { if (e.k === 'v') return env[e.n]; if (e.k === 'k') return e.v; if (e.k === '~') return !ev(e.a, env);
    const x = ev(e.a, env), y = ev(e.b, env); return e.k === '∧' ? x && y : e.k === '∨' ? x || y : e.k === '→' ? !x || y : x === y; };
  const varsOf = (e, s = new Set()) => { if (e.k === 'v') s.add(e.n); if (e.a) varsOf(e.a, s); if (e.b) varsOf(e.b, s); return s; };
  const constsOf = (e, s = new Set()) => { if (e.k === 'k') s.add(e.n); if (e.a) constsOf(e.a, s); if (e.b) constsOf(e.b, s); return s; };
  const sortV = s => [...s].sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : a < b ? -1 : 1);
  function show(e, ng) {
    if (e.k === 'v' || e.k === 'k') return e.n;
    if (e.k === '~') { const s = show(e.a, ng); return ng + (e.a.k === 'v' || e.a.k === 'k' ? s : '(' + s + ')'); }
    const w = c => { const s = show(c, ng); return c.k in BIN && (c.par || !((c.k === '∧' || c.k === '∨') && (e.k === '→' || e.k === '↔'))) ? '(' + s + ')' : s; };
    return w(e.a) + ' ' + e.k + ' ' + w(e.b);
  }
  const negOf = s => /¬/.test(s) ? '¬' : '~';
  const rowsOf = vars => Array.from({ length: 1 << vars.length }, (_, r) => Object.fromEntries(vars.map((v, j) => [v, !((r >> (vars.length - 1 - j)) & 1)])));
  const asg = (vars, env) => vars.map(v => `${v} = ${TF(env[v])}`).join(', ');
  const tryParse = s => { try { return { e: parse(s) }; } catch (x) { return { err: x && x.en ? x : E(String(x), 'فيه غلط في الـ formula.') }; } };

  // steps that restart from row 1 whenever sig changes
  function useWalk(n, sig) {
    const [i, ctl] = useSteps(n, 950), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } ctl.replay(); }, [sig]);
    return [Math.min(i, n - 1), ctl];
  }

  /* truth table: heads[c], data[r][c] (bool), show(r, c), marks */
  function TT({ heads, tags, data, show: vis, curCol = -1, curRow = -1, cmp, same, bad, foot, label }) {
    const has = (s, x) => s && s.has(x);
    const cls = (r, c) => [c === curCol || r === curRow ? 'dmv4-cur' : '', has(cmp, c) ? 'dmv4-cmp' : '', has(same, c) ? 'dmv4-same' : ''].join(' ');
    return html`<div className="dmv4-tw" dir="ltr"><table className="dmv4-tb" aria-label=${label || 'Truth table'}>
      <thead>${tags && tags.some(Boolean) && html`<tr className="dmv4-tags">${heads.map((_, c) => html`<th key=${c}>${tags[c] || ''}</th>`)}</tr>`}
        <tr>${heads.map((h, c) => html`<th key=${c} className=${cls(-1, c)}>${h}</th>`)}</tr></thead>
      <tbody>${data.map((row, r) => html`<tr key=${r} className=${has(bad, r) ? 'dmv4-bad' : ''}>${row.map((v, c) => { const on = vis(r, c);
        return html`<td key=${c} className=${cls(r, c) + (on && !v ? ' dmv4-f' : '')}>${on ? TF(v) : ''}</td>`; })}</tr>`)}</tbody>
      ${foot && html`<tfoot><tr className="dmv4-ft">${foot.map((f, c) => html`<td key=${c}>${f && vis(0, c) ? f : ''}</td>`)}</tr></tfoot>`}
    </table></div>`;
  }

  const Keys = ({ add, back, clear }) => html`<div className="dmv4-keys" role="group" aria-label="Insert a symbol">
    ${['~', '∧', '∨', '→', '↔', '(', ')', 'p', 'q', 'r'].map(k => html`<button key=${k} className="dmv4-key" onClick=${() => add(k)} aria-label=${'Insert ' + k}>${k}</button>`)}
    <button className="dmv4-key" onClick=${back} aria-label="Delete last symbol">⌫</button><button className="dmv4-key" onClick=${clear} aria-label="Clear">✕</button></div>`;
  const addSym = (s, k) => (/[∧∨→↔]/.test(k) ? s.replace(/\s+$/, '') + ' ' + k + ' ' : s + k);
  const backSym = s => s.replace(/\s+$/, '').slice(0, -1).replace(/\s+$/, '');

  /* ── [0.1] tautology / contradiction checker: truth table row by row ── */
  const CLS = [['p ∨ ~p', 'Example 1.1.13'], ['p ∧ ~p', 'Example 1.1.13'], ['(p ∧ q) → (p ∨ q)', 'quiz'], ['(p ∧ q) → (p → q)', 'quiz']];
  function TautClassify({ ar }) {
    const [pick, setPick] = useState(0), [own, setOwn] = useState('(p ∧ q) → p');
    const src = pick < 0 ? own : CLS[pick][0], P = tryParse(src), e = P.e;
    const vars = e ? sortV(varsOf(e)) : [], tooMany = vars.length > 4, ok = e && !tooMany;
    const rows = ok ? rowsOf(vars) : [], n = rows.length;
    const [i, ctl] = useWalk(ok ? n + 1 : 1, src);
    let heads = [], data = [], top = '', steps = [], vals = [];
    if (ok) {
      const ng = negOf(src), parts = e.k === '~' ? [e.a] : e.k in BIN ? [e.a, e.b] : [];
      const cols = parts.filter(x => x.k !== 'v' && x.k !== 'k');
      top = show(e, ng);
      heads = [...vars, ...cols.map(x => show(x, ng)), top];
      data = rows.map(env => [...vars.map(v => env[v]), ...cols.map(x => ev(x, env)), ev(e, env)]);
      vals = data.map(r => r[r.length - 1]);
      steps = rows.map((env, r) => { const s = asg(vars, env), v = TF(vals[r]);
        return { en: `Row ${r + 1}${s ? ` (${s})` : ''}: <b>${top}</b> is <b>${v}</b>.`, ar: `في الـ row رقم ${I(r + 1)} بنعوّض:` + L(`${s ? s + ': ' : ''}${top} = ${v}`) }; });
      const allT = vals.every(Boolean), allF = vals.every(v => !v);
      steps.push(allT ? { en: `Every row is T: <b>${top}</b> is a <b>tautology</b>.`, ar: 'كل الـ rows طلعت T، يبقى الـ statement form دي <b>tautology</b>:' + L(top) }
        : allF ? { en: `Every row is F: <b>${top}</b> is a <b>contradiction</b>.`, ar: 'كل الـ rows طلعت F، يبقى الـ statement form دي <b>contradiction</b>:' + L(top) }
        : { en: `Some rows are T and some are F: <b>${top}</b> is neither a tautology nor a contradiction.`, ar: 'فيه rows طلعت T وفيه rows طلعت F، يبقى دي مش tautology ولا contradiction:' + L(top) });
    }
    const cap = ok ? steps[i] : P.err || { en: 'Use at most 4 variables.', ar: 'استخدم ' + I(4) + ' variables بالكتير.' };
    const last = ok && i === n, allT = ok && vals.every(Boolean), allF = ok && vals.every(v => !v), lc = heads.length - 1;
    return html`<figure className="fig dmv4"><div className="fig-stage">
      <div className="dmv4-chips" role="group" aria-label="Statement form">
        ${CLS.map(([f], j) => html`<button key=${j} className=${'fig-btn dmv4-m' + (pick === j ? ' dmv4-sel' : '')} aria-pressed=${String(pick === j)} onClick=${() => setPick(j)}>${f}</button>`)}
        <button className=${'fig-btn' + (pick < 0 ? ' dmv4-sel' : '')} aria-pressed=${String(pick < 0)} onClick=${() => setPick(-1)}>Try your own</button></div>
      ${pick < 0 && html`<div className="dmv4-field"><input className="dmv4-in" dir="ltr" value=${own} onInput=${ev2 => setOwn(ev2.target.value)} aria-label="Statement form" spellCheck="false" autoCapitalize="off" autoComplete="off" /></div>
        <${Keys} add=${k => setOwn(s => addSym(s, k))} back=${() => setOwn(backSym)} clear=${() => setOwn('')} />`}
      ${ok ? html`<${TT} heads=${heads} data=${data} show=${(r, c) => c < vars.length || r <= i} curRow=${i < n ? i : -1} same=${last ? new Set([lc]) : null} label=${'Truth table of ' + top} />
        <div className=${'dmv4-ver ' + (last ? (allT ? '' : allF ? 'dmv4-no' : 'dmv4-mid') : 'dmv4-mid') + ' ' + pop(last)}>${last ? (allT ? 'all T: tautology' : allF ? 'all F: contradiction' : 'T and F: neither') : '…'}</div>`
        : html`<p className="dmv4-err">${tooMany ? 'At most 4 variables' : 'Check the formula'}</p>`}
    </div><${Cap} ...${cap} showAr=${ar} />${ok && html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── equivalence by truth table, row by row (used for [0.5] and the laws [2]) ── */
  function EqTable({ A, B, i, n, label }) {
    const a = A.e, b = B.e, vars = sortV(new Set([...varsOf(a), ...varsOf(b)])), ks = sortV(new Set([...constsOf(a), ...constsOf(b)]));
    const rows = rowsOf(vars), ng = negOf(A.src + B.src), ta = show(a, ng), tb = show(b, ng);
    const kv = k => k === 't' || k === 'T';
    const heads = [...vars, ...ks, ta, tb, 'A ↔ B'], tags = [...vars.map(() => ''), ...ks.map(() => ''), 'A', 'B', ''];
    const data = rows.map(env => { const x = ev(a, env), y = ev(b, env); return [...vars.map(v => env[v]), ...ks.map(kv), x, y, x === y]; });
    const nc = heads.length, last = i === n, badR = new Set(data.map((r, j) => r[nc - 1] ? -1 : j).filter(j => j >= 0 && j <= i));
    return html`<${TT} heads=${heads} tags=${tags} data=${data} show=${(r, c) => c < vars.length + ks.length || r <= i} curRow=${i < n ? i : -1}
      cmp=${new Set([nc - 3, nc - 2])} same=${last && !badR.size ? new Set([nc - 3, nc - 2, nc - 1]) : null} bad=${badR} label=${label} />`;
  }
  function eqSteps(A, B, extraEn = '', extraAr = '') {
    const a = A.e, b = B.e, vars = sortV(new Set([...varsOf(a), ...varsOf(b)])), rows = rowsOf(vars);
    const st = rows.map((env, r) => { const x = TF(ev(a, env)), y = TF(ev(b, env)), s = asg(vars, env), same = x === y;
      return { en: `Row ${r + 1}${s ? ` (${s})` : ''}: A = ${x}, B = ${y}: ${same ? 'the same' : '<b>they differ</b>'}.`,
        ar: `في الـ row رقم ${I(r + 1)} ` + (same ? 'القيمتين زي بعض:' : 'القيمتين <b>مختلفين</b>:') + L(`${s ? s + ': ' : ''}A = ${x}, B = ${y}`) }; });
    const diff = rows.filter(env => ev(a, env) !== ev(b, env)), n = rows.length;
    if (!diff.length) st.push({ en: `A and B agree in all ${n} rows, so A ↔ B is all T (a tautology): <b>A ≡ B</b>.${extraEn}`,
      ar: `الـ A والـ B متطابقين في كل الـ rows (${I(n)})، فعمود الـ ${I('A ↔ B')} كله T يعني tautology، يبقى:` + L('A ≡ B') + extraAr });
    else { const env = diff[0], s = asg(vars, env);
      st.push({ en: `They differ (first in ${s}): A ↔ B is not a tautology, so <b>A ≢ B</b>. One such row is enough: the laws can prove equivalence, but not that two forms are not equivalent.`,
        ar: 'بيختلفوا في row واحد على الأقل، زي ده:' + L(`${s}: A = ${TF(ev(a, env))}, B = ${TF(ev(b, env))}`) + `يبقى الـ ${I('A ↔ B')} مش tautology، والـ A مش equivalent للـ B. والـ row الواحد كفاية؛ القوانين تقدر تثبت الـ equivalence بس، ماتقدرش تثبت إنهم مش equivalent.` }); }
    return st;
  }
  const CMP = [['De Morgan (Table 3)', '¬(p ∨ q)', '¬p ∧ ¬q'], ['Table 4', 'p → q', '¬p ∨ q'], ['Example 1.2.2', 'p ∨ q → r', '(p → r) ∧ (q → r)'], ['not equivalent', '¬(p ∧ q)', '¬p ∧ ¬q']];
  function EquivCompare({ ar }) {
    const [pick, setPick] = useState(0), [oa, setOa] = useState('p → q'), [ob, setOb] = useState('q → p'), [foc, setFoc] = useState('a');
    const sa = pick < 0 ? oa : CMP[pick][1], sb = pick < 0 ? ob : CMP[pick][2];
    const A = Object.assign(tryParse(sa), { src: sa }), B = Object.assign(tryParse(sb), { src: sb });
    const vars = A.e && B.e ? sortV(new Set([...varsOf(A.e), ...varsOf(B.e)])) : [], ok = A.e && B.e && vars.length <= 4, n = 1 << vars.length;
    const [i, ctl] = useWalk(ok ? n + 1 : 1, sa + '|' + sb);
    const steps = ok ? eqSteps(A, B) : [];
    const cap = ok ? steps[i] : A.err || B.err || { en: 'Use at most 4 variables.', ar: 'استخدم ' + I(4) + ' variables بالكتير.' };
    const set = foc === 'a' ? setOa : setOb, last = ok && i === n, eq = ok && !steps[n].en.includes('≢');
    return html`<figure className="fig dmv4"><div className="fig-stage">
      <div className="dmv4-chips" role="group" aria-label="Pair of statement forms">
        ${CMP.map(([nm], j) => html`<button key=${j} className=${'fig-btn' + (pick === j ? ' dmv4-sel' : '')} aria-pressed=${String(pick === j)} onClick=${() => setPick(j)}>${nm}</button>`)}
        <button className=${'fig-btn' + (pick < 0 ? ' dmv4-sel' : '')} aria-pressed=${String(pick < 0)} onClick=${() => setPick(-1)}>Try your own</button></div>
      ${pick < 0 ? html`<div className="dmv4-field"><b>A</b><input className="dmv4-in" dir="ltr" value=${oa} onFocus=${() => setFoc('a')} onInput=${x => setOa(x.target.value)} aria-label="Statement form A" spellCheck="false" autoCapitalize="off" autoComplete="off" /></div>
        <div className="dmv4-field"><b>B</b><input className="dmv4-in" dir="ltr" value=${ob} onFocus=${() => setFoc('b')} onInput=${x => setOb(x.target.value)} aria-label="Statement form B" spellCheck="false" autoCapitalize="off" autoComplete="off" /></div>
        <${Keys} add=${k => set(s => addSym(s, k))} back=${() => set(backSym)} clear=${() => set('')} />`
        : html`<div className="dmv4-eq" dir="ltr"><div>A: ${sa}</div><div>B: ${sb}</div></div>`}
      ${ok ? html`<${EqTable} A=${A} B=${B} i=${i} n=${n} label="Truth table of A and B" />
        <div className=${'dmv4-ver ' + (last ? (eq ? '' : 'dmv4-no') : 'dmv4-mid') + ' ' + pop(last)}>${last ? (eq ? 'columns agree: A ≡ B' : 'a row differs: A ≢ B') : '…'}</div>`
        : html`<p className="dmv4-err">Check the formulas</p>`}
    </div><${Cap} ...${cap} showAr=${ar} />${ok && html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── [2] Theorem 1.1.1: pick a law, check it row by row ── */
  const LAWS = [
    ['Commutative', 'الـ Commutative laws', ['p ∧ q ≡ q ∧ p', 'p ∨ q ≡ q ∨ p']],
    ['Associative', 'الـ Associative laws', ['(p ∧ q) ∧ r ≡ p ∧ (q ∧ r)', '(p ∨ q) ∨ r ≡ p ∨ (q ∨ r)']],
    ['Distributive', 'الـ Distributive laws', ['p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)', 'p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)']],
    ['Identity', 'الـ Identity laws', ['p ∧ t ≡ p', 'p ∨ c ≡ p']],
    ['Negation', 'الـ Negation laws', ['p ∨ ~p ≡ t', 'p ∧ ~p ≡ c']],
    ['Double negative', 'الـ Double negative law', ['~(~p) ≡ p']],
    ['Idempotent', 'الـ Idempotent laws', ['p ∧ p ≡ p', 'p ∨ p ≡ p']],
    ['Universal bound', 'الـ Universal bound (Domination) laws', ['p ∨ t ≡ t', 'p ∧ c ≡ c']],
    ["De Morgan's", "الـ De Morgan's laws", ['~(p ∧ q) ≡ ~p ∨ ~q', '~(p ∨ q) ≡ ~p ∧ ~q']],
    ['Absorption', 'الـ Absorption laws', ['p ∨ (p ∧ q) ≡ p', 'p ∧ (p ∨ q) ≡ p']],
    ['Negations of t and c', 'الـ Negations of t and c', ['~t ≡ c', '~c ≡ t']]];
  function LawsCheck({ ar }) {
    const [k, setK] = useState(8), [f, setF] = useState(0);
    const law = LAWS[k], form = law[2][Math.min(f, law[2].length - 1)], [sa, sb] = form.split(' ≡ ');
    const A = Object.assign(tryParse(sa), { src: sa }), B = Object.assign(tryParse(sb), { src: sb });
    const n = 1 << sortV(new Set([...varsOf(A.e), ...varsOf(B.e)])).length;
    const [i, ctl] = useWalk(n + 1, form);
    const steps = eqSteps(A, B, ` This is law ${k + 1}, the ${law[0]} law${law[2].length > 1 ? 's' : ''}.`, `ودي القاعدة رقم ${I(k + 1)} اللي هي ${law[1]}.`);
    steps[0] = { en: `Law ${k + 1}, ${law[0]}: A = ${sa}, B = ${sb}. ` + steps[0].en, ar: `القاعدة رقم ${I(k + 1)} هي ${law[1]}:` + L(`A = ${sa}, B = ${sb}`) + steps[0].ar };
    return html`<figure className="fig dmv4"><div className="fig-stage">
      <div className="dmv4-chips" role="group" aria-label="Law of Theorem 1.1.1">
        ${LAWS.map(([nm], j) => html`<button key=${j} className=${'fig-btn' + (k === j ? ' dmv4-sel' : '')} aria-pressed=${String(k === j)} onClick=${() => { setK(j); setF(0); }}>${j + 1} ${nm}</button>`)}</div>
      ${law[2].length > 1 && html`<div className="dmv4-chips" role="group" aria-label="Form">${law[2].map((x, j) => html`<button key=${j} className=${'fig-btn dmv4-m' + (f === j ? ' dmv4-sel' : '')} aria-pressed=${String(f === j)} onClick=${() => setF(j)}>${x}</button>`)}</div>`}
      <div className="dmv4-eq" dir="ltr">${form}</div>
      <${EqTable} A=${A} B=${B} i=${i} n=${n} label=${'Truth table of ' + form} />
      <div className=${'dmv4-ver ' + (i === n ? '' : 'dmv4-mid') + ' ' + pop(i === n)}>${i === n ? 'columns agree: the law holds' : '…'}</div>
    </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── tables of the notes filled column by column ([1], [3], [4], [7]) ── */
  function ColWalk({ ar, T }) {
    const vars = T.vars, rows = rowsOf(vars), cols = T.cols.map(c => Object.assign({ e: parse(c.h) }, c));
    const steps = [T.start, ...cols, ...(T.end ? [T.end] : [])];
    const [i, ctl] = useSteps(steps.length, 2300);
    const heads = [...vars, ...cols.map(c => c.h)], nv = vars.length;
    const data = rows.map(env => [...vars.map(v => env[v]), ...cols.map(c => ev(c.e, env))]);
    const at = h => heads.indexOf(h), end = T.end && i === steps.length - 1, cur = i >= 1 && i <= cols.length ? nv + i - 1 : -1;
    const cmp = cur >= 0 && cols[i - 1].cmp ? new Set([cur, ...cols[i - 1].cmp.map(at)]) : null;
    const foot = T.cols.some(c => c.foot) ? [...vars.map(() => ''), ...cols.map(c => c.foot || '')] : null;
    return html`<figure className="fig dmv4"><div className="fig-stage">
      <${TT} heads=${heads} tags=${[...vars.map(() => ''), ...cols.map(c => c.tag || '')]} data=${data} show=${(r, c) => c < nv || c - nv < i} curCol=${cur} cmp=${cmp}
        same=${end ? new Set(T.end.same.map(at)) : null} foot=${foot} label=${T.label} />
    </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  const FOUR = { en: 'Fill in the four combinations of truth values for p and q: TT, TF, FT, FF.', ar: 'بنكتب الـ 4 combinations بتوع الـ truth values للـ p والـ q:' + L('TT, TF, FT, FF') };
  const T113 = { vars: ['p'], label: 'Examples 1.1.13 and 1.1.14',
    start: { en: 'p takes its two truth values, T and F, one per row.', ar: 'الـ p ليها قيمتين، T و F، كل قيمة في row.' },
    cols: [
      { h: '~p', en: '~p is the opposite of p: F, T.', ar: 'الـ ' + I('~p') + ' عكس الـ p، يعني F وبعدين T.' },
      { h: 'p ∨ ~p', foot: 'all T', en: 'p ∨ ~p: one of p and ~p is always T, so the column is <b>all T</b>: p ∨ ~p is a <b>tautology</b>.', ar: 'في الـ ' + I('p ∨ ~p') + ' دايمًا واحدة من الاتنين T، فالعمود <b>كله T</b> يعني <b>tautology</b>.' },
      { h: 'p ∧ ~p', foot: 'all F', en: 'p ∧ ~p: p and ~p are never both T, so the column is <b>all F</b>: p ∧ ~p is a <b>contradiction</b>.', ar: 'في الـ ' + I('p ∧ ~p') + ' عمر الاتنين ما يبقوا T مع بعض، فالعمود <b>كله F</b> يعني <b>contradiction</b>.' },
      { h: 't', en: 't is a tautology: T in every row.', ar: 'الـ t هي tautology، يعني T في كل row.' },
      { h: 'p ∧ t', foot: 'same as p', cmp: ['p'], en: 'p ∧ t is T, F: the same truth values as p, so <b>p ∧ t ≡ p</b>.', ar: 'الـ ' + I('p ∧ t') + ' طلعت T وبعدين F، نفس قيم الـ p بالظبط، يبقى:' + L('p ∧ t ≡ p') },
      { h: 'c', en: 'c is a contradiction: F in every row.', ar: 'الـ c هي contradiction، يعني F في كل row.' },
      { h: 'p ∧ c', foot: 'same as c', cmp: ['c'], en: 'p ∧ c is F, F: the same truth values as c, so <b>p ∧ c ≡ c</b>.', ar: 'الـ ' + I('p ∧ c') + ' طلعت F و F، نفس قيم الـ c بالظبط، يبقى:' + L('p ∧ c ≡ c') }] };
  const T3 = { vars: ['p', 'q'], label: 'Table 3', start: FOUR,
    cols: [
      { h: 'p ∨ q', en: 'p ∨ q is F only when p and q are both F (last row): T, T, T, F.', ar: 'الـ ' + I('p ∨ q') + ' بتبقى F بس لما الاتنين يبقوا F (آخر row):' + L('T, T, T, F') },
      { h: '¬(p ∨ q)', cmp: ['p ∨ q'], en: 'Negate that column: ¬(p ∨ q) is F, F, F, T.', ar: 'بنعكس العمود ده، فالـ ' + I('¬(p ∨ q)') + ' بتطلع:' + L('F, F, F, T') },
      { h: '¬p', cmp: ['p'], en: '¬p is the opposite of p: F, F, T, T.', ar: 'الـ ' + I('¬p') + ' عكس الـ p:' + L('F, F, T, T') },
      { h: '¬q', cmp: ['q'], en: '¬q is the opposite of q: F, T, F, T.', ar: 'الـ ' + I('¬q') + ' عكس الـ q:' + L('F, T, F, T') },
      { h: '¬p ∧ ¬q', cmp: ['¬p', '¬q'], en: '¬p ∧ ¬q is T only when ¬p and ¬q are both T (last row): F, F, F, T.', ar: 'الـ ' + I('¬p ∧ ¬q') + ' بتبقى T بس لما الاتنين يبقوا T (آخر row):' + L('F, F, F, T') }],
    end: { same: ['¬(p ∨ q)', '¬p ∧ ¬q'], en: 'The ¬(p ∨ q) and ¬p ∧ ¬q columns agree in every row (F, F, F, T), so they are logically equivalent: De Morgan\'s law <b>¬(p ∨ q) ≡ ¬p ∧ ¬q</b>.', ar: 'عمودين الـ ' + I('¬(p ∨ q)') + ' والـ ' + I('¬p ∧ ¬q') + ' متطابقين في كل row، فهما logically equivalent. ده قانون الـ De Morgan:' + L('¬(p ∨ q) ≡ ¬p ∧ ¬q') } };
  const T4 = { vars: ['p', 'q'], label: 'Table 4', start: FOUR,
    cols: [
      { h: '¬p', cmp: ['p'], en: '¬p is the opposite of p: F, F, T, T.', ar: 'الـ ' + I('¬p') + ' عكس الـ p:' + L('F, F, T, T') },
      { h: '¬p ∨ q', cmp: ['¬p', 'q'], en: '¬p ∨ q is F only when ¬p and q are both F (row TF): T, F, T, T.', ar: 'الـ ' + I('¬p ∨ q') + ' بتبقى F بس لما الـ ' + I('¬p') + ' والـ q يبقوا F (الـ row بتاع TF):' + L('T, F, T, T') },
      { h: 'p → q', cmp: ['p', 'q'], en: 'p → q is F only when p is T and q is F (row TF): T, F, T, T.', ar: 'الـ ' + I('p → q') + ' بتبقى F بس لما الـ p تبقى T والـ q تبقى F (الـ row بتاع TF):' + L('T, F, T, T') }],
    end: { same: ['¬p ∨ q', 'p → q'], en: 'The ¬p ∨ q and p → q columns agree (T, F, T, T), so they are logically equivalent: <b>p → q ≡ ¬p ∨ q</b>.', ar: 'عمودين الـ ' + I('¬p ∨ q') + ' والـ ' + I('p → q') + ' متطابقين، فهما logically equivalent:' + L('p → q ≡ ¬p ∨ q') } };
  const T7 = { vars: ['p', 'q', 'r'], label: 'Example 1.2.2',
    start: { en: 'First fill in the eight possible combinations of truth values for p, q and r.', ar: 'الأول بنكتب الـ 8 combinations الممكنة للـ truth values بتاعة الـ p والـ q والـ r.' },
    cols: [
      { h: 'p ∨ q', cmp: ['p', 'q'], en: 'p ∨ q is F only when p and q are both F (rows 7 and 8).', ar: 'الـ ' + I('p ∨ q') + ' بتبقى F بس لما الـ p والـ q يبقوا F، يعني في الـ rows رقم 7 و 8.' },
      { h: 'p → r', cmp: ['p', 'r'], en: 'p → r has F\'s in the second and fourth rows: the rows in which p is true and r is false.', ar: 'الـ ' + I('p → r') + ' فيها F في الـ row التاني والرابع، ودول الـ rows اللي فيهم الـ p بـ true والـ r بـ false.' },
      { h: 'q → r', cmp: ['q', 'r'], en: 'q → r has F\'s in the second and sixth rows: q is true and r is false.', ar: 'الـ ' + I('q → r') + ' فيها F في الـ row التاني والسادس، اللي فيهم الـ q بـ true والـ r بـ false.' },
      { h: 'p ∨ q → r', tag: '', cmp: ['p ∨ q', 'r'], en: 'p ∨ q → r is F in the second, fourth and sixth rows (TTF, TFF, FTF): the hypothesis p ∨ q is true and the conclusion r is false. T in all the others.', ar: 'الـ ' + I('p ∨ q → r') + ' بتبقى F في الـ row التاني والرابع والسادس، لأن فيهم الـ hypothesis اللي هي ' + I('p ∨ q') + ' بـ true والـ conclusion اللي هي r بـ false:' + L('TTF, TFF, FTF') + 'وفي باقي الـ rows بتبقى T.' },
      { h: '(p → r) ∧ (q → r)', cmp: ['p → r', 'q → r'], en: '(p → r) ∧ (q → r) is F wherever p → r or q → r is F: rows 2, 4 and 6.', ar: 'الـ ' + I('(p → r) ∧ (q → r)') + ' بتبقى F في أي row فيه الـ ' + I('p → r') + ' أو الـ ' + I('q → r') + ' بـ F، يعني الـ rows رقم 2 و 4 و 6.' }],
    end: { same: ['p ∨ q → r', '(p → r) ∧ (q → r)'], en: 'p ∨ q → r and (p → r) ∧ (q → r) have the same truth values in all eight rows, so they are logically equivalent ("division into cases").', ar: 'الاتنين ليهم نفس الـ truth values في الـ 8 rows كلهم، يبقى logically equivalent (ده الـ division into cases):' + L('p ∨ q → r ≡ (p → r) ∧ (q → r)') } };
  const TautTable = ({ ar }) => html`<${ColWalk} ar=${ar} T=${T113} />`;
  const EquivDeMorgan = ({ ar }) => html`<${ColWalk} ar=${ar} T=${T3} />`;
  const EquivImplication = ({ ar }) => html`<${ColWalk} ar=${ar} T=${T4} />`;
  const EquivCases = ({ ar }) => html`<${ColWalk} ar=${ar} T=${T7} />`;

  /* ── [5] the proof law by law; {…} marks the part replaced (old line) and its replacement (new line) ── */
  const PROOF = [
    { to: '~(~p ∧ q) ∧ (p ∨ q)', en: 'Start from the left side, ~(~p ∧ q) ∧ (p ∨ q). Replace one part at a time by a logically equivalent expression until we reach p.', ar: 'بنبدأ من الطرف الشمال، وكل مرة بنبدّل جزء بـ expression مكافئ ليه لحد ما نوصل للـ p:' + L('~(~p ∧ q) ∧ (p ∨ q)') },
    { from: '{~(~p ∧ q)} ∧ (p ∨ q)', to: '{(~(~p) ∨ ~q)} ∧ (p ∨ q)', law: "De Morgan's laws", en: "By <b>De Morgan's laws</b>, ~(~p ∧ q) becomes ~(~p) ∨ ~q.", ar: "بقانون الـ <b>De Morgan</b> الجزء ده بيتغيّر:" + L('~(~p ∧ q) ≡ ~(~p) ∨ ~q') },
    { from: '({~(~p)} ∨ ~q) ∧ (p ∨ q)', to: '({p} ∨ ~q) ∧ (p ∨ q)', law: 'the double negative law', en: 'By the <b>double negative law</b>, ~(~p) becomes p.', ar: 'بالـ <b>double negative law</b> بنشيل النفي المزدوج:' + L('~(~p) ≡ p') },
    { from: '{(p ∨ ~q) ∧ (p ∨ q)}', to: '{p ∨ (~q ∧ q)}', law: 'the distributive law', en: 'By the <b>distributive law</b> p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r), read from right to left, the common p comes out.', ar: 'بالـ <b>distributive law</b> (مقروء من اليمين للشمال) الـ p المشتركة بتطلع برّه:' + L('(p ∨ ~q) ∧ (p ∨ q) ≡ p ∨ (~q ∧ q)') },
    { from: 'p ∨ ({~q ∧ q})', to: 'p ∨ ({q ∧ ~q})', law: 'the commutative law for ∧', en: 'By the <b>commutative law for ∧</b>, ~q ∧ q becomes q ∧ ~q.', ar: 'بالـ <b>commutative law</b> بتاع الـ ∧ بنبدّل الترتيب:' + L('~q ∧ q ≡ q ∧ ~q') },
    { from: 'p ∨ {(q ∧ ~q)}', to: 'p ∨ {c}', law: 'the negation law', en: 'By the <b>negation law</b> p ∧ ~p ≡ c, q ∧ ~q is the contradiction c.', ar: 'بالـ <b>negation law</b> الـ ' + I('q ∧ ~q') + ' هي contradiction:' + L('q ∧ ~q ≡ c') },
    { from: '{p ∨ c}', to: '{p}', law: 'the identity law', en: 'By the <b>identity law</b> p ∨ c ≡ p we reach p. ■ Every line has the same truth values (T, T, F, F) as p. (Asked in Exam 2025/26 Q3b and Exam 2024/25 Q4b.)', ar: 'بالـ <b>identity law</b> وصلنا للـ p وخلص الإثبات:' + L('p ∨ c ≡ p ■') + 'وكل سطر ليه نفس الـ truth values بتاعة الـ p، اللي هي:' + L('T, T, F, F') + 'السؤال ده جه في امتحان ' + I('2025/26 Q3b') + ' وامتحان ' + I('2024/25 Q4b') + '.' }];
  const plain = s => s.replace(/[{}]/g, '');
  const ROWS2 = rowsOf(['p', 'q']);
  const valsOf = s => { const e = parse(plain(s)); return ROWS2.map(env => TF(ev(e, env))).join(' '); };
  const Marked = ({ s, cls }) => html`${s.split(/(\{[^}]*\})/).filter(Boolean).map((x, j) => x[0] === '{' ? html`<span key=${j} className=${cls}>${x.slice(1, -1)}</span>` : x)}`;
  function LawsProof({ ar }) {
    const [i, ctl] = useSteps(PROOF.length, 2600);
    return html`<figure className="fig dmv4"><div className="fig-stage"><div className="dmv4-pf" dir="ltr">
      <div className="dmv4-hd">truth values in rows pq = TT, TF, FT, FF on the right</div>
      ${PROOF.map((s, j) => { if (j > i) return null; const txt = j === i ? s.to : j === i - 1 ? PROOF[i].from : plain(s.to);
        return html`<div key=${j} className=${'dmv4-ln' + (j === i ? ' dmv4-now' : '')}>
          <div className="dmv4-fx">${j ? '≡ ' : ''}${j === i && j > 0 ? html`<${Marked} s=${txt} cls="dmv4-new" />` : j === i - 1 ? html`<${Marked} s=${txt} cls="dmv4-old" />` : plain(txt)}</div>
          <div className="dmv4-by"><span>${j ? html`by <b>${s.law}</b>` : 'start'}</span><span>${valsOf(s.to)}</span></div></div>`; })}
    </div></div><${Cap} ...${PROOF[i]} showAr=${ar} /><${Bar} steps=${PROOF} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [6.3] hypothesis / conclusion: p ∨ ~q → ~p, row by row ── */
  function TautHypConc({ ar }) {
    const vars = ['p', 'q'], hs = ['~p', '~q', 'p ∨ ~q', 'p ∨ ~q → ~p'], es = hs.map(parse), rows = rowsOf(vars);
    const data = rows.map(env => [...vars.map(v => env[v]), ...es.map(e => ev(e, env))]);
    const steps = rows.map((env, r) => { const h = TF(data[r][4]), c = TF(data[r][2]), v = TF(data[r][5]), k = TF(env.p) + TF(env.q);
      return { en: `Row ${k}: hypothesis p ∨ ~q = ${h}, conclusion ~p = ${c}, so ${h} → ${c} = <b>${v}</b>.`, ar: `في الـ row ${I(k)} الـ hypothesis والـ conclusion بيدّوا:` + L(`p ∨ ~q = ${h}, ~p = ${c}: ${h} → ${c} = ${v}`) }; });
    steps.push({ en: 'p ∨ ~q → ~p is F only in rows TT and TF, where the hypothesis is T and the conclusion is F; it is T in rows FT and FF.', ar: 'الـ conditional دي بتبقى F بس في الـ rows دي:' + L('TT, TF') + 'وده لما الـ hypothesis تبقى T والـ conclusion تبقى F، وفي الـ 2 rows الباقيين بتبقى T.' });
    const [i, ctl] = useSteps(steps.length, 2000), n = rows.length;
    return html`<figure className="fig dmv4"><div className="fig-stage">
      <${TT} heads=${[...vars, ...hs]} tags=${['', '', 'conclusion', '', 'hypothesis', '']} data=${data} show=${(r, c) => c < 2 || r <= i} curRow=${i < n ? i : -1}
        cmp=${i < n ? new Set([2, 4]) : null} same=${i === n ? new Set([5]) : null} label="Truth table of p ∨ ~q → ~p" />
    </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'dm-taut-classify': TautClassify, 'dm-equiv-compare': EquivCompare, 'dm-taut-table113': TautTable, 'dm-laws-check': LawsCheck,
    'dm-equiv-demorgan': EquivDeMorgan, 'dm-equiv-implication': EquivImplication, 'dm-laws-proof': LawsProof, 'dm-taut-hypconc': TautHypConc, 'dm-equiv-cases': EquivCases });
})();
/* ── part L6 ── */
// Discrete Mathematics visuals, Lecture 6 (discrete random variables and probability distributions): the S → R arrow diagrams, the heads − tails table, the dice and card grids with their lateral lines, and the three conditions of a probability distribution (slides 2–11). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.dmv6-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dmv6-modes .fig-btn{ font-size:.86rem; padding:4px 10px; }
.dmv6 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dmv6-svg{ max-width:400px !important; }
.dmv6-svg .dmv6-pt, .dmv6-svg .dmv6-arw, .dmv6-svg .dmv6-ln{ transition:opacity .45s, r .35s, fill .35s; }
.dmv6-sbar{ font-size:.86rem; color:var(--graphite); }
.dmv6-bars{ display:grid; gap:3px; align-items:end; max-width:420px; margin:12px auto 0; }
.dmv6-col{ font:inherit; background:none; border:0; padding:0; margin:0; color:var(--ink); display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:3px; cursor:pointer; min-width:0; height:118px; }
.dmv6-col:disabled{ cursor:default; }
.dmv6-bar{ width:72%; max-width:34px; background:var(--fig-k); border-radius:3px 3px 0 0; opacity:.25; transition:height .5s, opacity .4s, background .4s; }
.dmv6-col.on .dmv6-bar{ opacity:.7; } .dmv6-col.cur .dmv6-bar{ opacity:1; background:var(--fig-s); }
.dmv6-fr{ display:inline-flex; flex-direction:column; align-items:center; font:600 .88rem/1.15 var(--mono); color:var(--ink); visibility:hidden; }
.dmv6-col.on .dmv6-fr{ visibility:visible; }
.dmv6-fr i{ font-style:normal; padding:0 1px; } .dmv6-fr i:first-child{ border-bottom:1.5px solid currentColor; }
.dmv6-x{ font:700 .86rem var(--mono); border-top:1.5px solid var(--line); width:100%; text-align:center; padding-top:3px; color:var(--ink); }
.dmv6-col.cur .dmv6-x{ color:var(--fig-k); }
.dmv6-legend{ text-align:center; font-size:.86rem; color:var(--graphite); margin-top:4px; }
.dmv6-tb{ border-collapse:collapse; margin:10px auto 0; font:600 .9rem/1.3 var(--mono); color:var(--ink); background:var(--paper); }
.dmv6-tb th, .dmv6-tb td{ border:1px solid var(--line); padding:4px 7px; text-align:center; transition:background .4s, opacity .4s; }
.dmv6-tb th{ background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); font-family:var(--body); font-size:.86rem; }
.dmv6-tb td.dmv6-cur, .dmv6-tb tr.dmv6-cur td{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.dmv6-tb .dmv6-dim{ opacity:.25; }
.dmv6-tb .dmv6-fr{ visibility:visible; }
.dmv6-wide{ max-width:100%; overflow:hidden; }
.dmv6-set{ font:600 .9rem/1.5 var(--mono); color:var(--ink); text-align:center; margin:10px auto 0; max-width:420px; overflow-wrap:anywhere; direction:ltr; }
.dmv6-groups{ display:grid; gap:4px; max-width:340px; margin:10px auto 0; font:600 .86rem/1.35 var(--mono); color:var(--ink); }
.dmv6-groups div{ border-radius:6px; padding:3px 8px; }
.dmv6-checks{ list-style:none; margin:12px auto 0; padding:0; max-width:440px; display:grid; gap:6px; font-size:.9rem; line-height:1.4; color:var(--ink); }
.dmv6-checks li{ border:1px solid var(--line); border-radius:8px; padding:6px 9px; background:var(--paper); }
.dmv6-checks li.ok{ border-color:var(--ok); } .dmv6-checks li.no{ border-color:var(--pen); }
.dmv6-checks .dmv6-m{ display:block; font:600 .86rem/1.4 var(--mono); overflow-wrap:anywhere; direction:ltr; text-align:left; margin-top:2px; }
.dmv6-checks .dmv6-mk{ font-weight:700; } .dmv6-checks li.ok .dmv6-mk{ color:var(--ok); } .dmv6-checks li.no .dmv6-mk{ color:var(--pen); }
.dmv6-verd{ text-align:center; font-weight:700; margin:10px 0 0; } .dmv6-verd.ok{ color:var(--ok); } .dmv6-verd.no{ color:var(--pen); }
.dmv6-in{ display:grid; gap:8px; max-width:440px; margin:0 auto 6px; font-size:.86rem; color:var(--graphite); }
.dmv6-in input{ display:block; width:100%; box-sizing:border-box; margin-top:3px; font:600 .95rem var(--mono); padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.dmv6-err{ text-align:center; color:var(--pen); font-weight:600; margin-top:8px; font-size:.9rem; }
.dmv6-knob{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; font-size:.86rem; color:var(--graphite); }
.dmv6-knob .fig-btn{ min-width:36px; padding:4px 8px; }
@media (prefers-reduced-motion: reduce){ .dmv6-svg .dmv6-pt, .dmv6-svg .dmv6-arw, .dmv6-svg .dmv6-ln, .dmv6-bar, .dmv6-tb th, .dmv6-tb td{ transition:none; } }
`;
  if (!document.getElementById('dmv6-css')) { const s = document.createElement('style'); s.id = 'dmv6-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = s => '<span class="ltr">' + s + '</span>';
  const B = s => '<bdi dir="ltr">' + String(s).replace(/ /g, '&nbsp;') + '</bdi>';
  const M = v => (v < 0 ? '−' + -v : String(v));
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const red = (p, q) => { const g = gcd(p, q); return q / g === 1 ? String(p / g) : (p / g) + '/' + (q / g); };
  const frac = (c, d) => { const r = red(c, d); return r === c + '/' + d ? c + '/' + d : c + '/' + d + ' = ' + r; };
  const Modes = ({ list, mode, set }) => html`<div className="dmv6-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const SBar = ({ steps, i, ctl }) => steps.length <= 10 ? html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />` : html`<div className="fig-bar"><span className="dmv6-sbar">${i + 1} / ${steps.length}</span><span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(steps.length - 1, i + 1))} disabled=${i === steps.length - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;
  // like useSteps, but starts again when dep changes and copes with a changing length
  function useWalk(n, ms, dep) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(!calm()); }, [dep]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    return [Math.max(0, Math.min(i, n - 1)), { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }
  // bars of a distribution: x under each bar, f(x) as a stacked fraction above it; tap a bar to jump to its step
  const Bars = ({ xs, cs, den, on, cur, pick }) => {
    const mx = Math.max(...cs, 1);
    return html`<div><div className="dmv6-bars" style=${{ gridTemplateColumns: `repeat(${xs.length}, minmax(0, 1fr))` }}>
      ${xs.map((x, k) => html`<button key=${k} className=${'dmv6-col' + (on(k) ? ' on' : '') + (cur === k ? ' cur' : '')} disabled=${!pick} onClick=${() => pick && pick(k)} aria-label=${'f(' + M(x) + ') = ' + cs[k] + '/' + den}>
        <span className="dmv6-fr"><i>${cs[k]}</i><i>${den}</i></span>
        <span className="dmv6-bar" style=${{ height: (on(k) ? cs[k] / mx * 74 : 3) + 'px' }}></span>
        <span className="dmv6-x">${M(x)}</span></button>`)}</div>
      <div className="dmv6-legend">x (bottom) and f(x) (top)</div></div>`;
  };
  // an arrow from (x1,y1) to (x2,y2) with its head drawn as a triangle
  const Arrow = ({ x1, y1, x2, y2, col, w, op }) => {
    const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d, h = 10;
    const bx = x2 - ux * h, by = y2 - uy * h;
    return html`<g className="dmv6-arw" style=${{ opacity: op }}><line x1=${x1} y1=${y1} x2=${bx} y2=${by} stroke=${col} strokeWidth=${w} />
      <polygon points=${`${x2},${y2} ${bx - uy * 5},${by + ux * 5} ${bx + uy * 5},${by - ux * 5}`} fill=${col} /></g>`;
  };

  const heads = s => [...s].filter(c => c === 'H').length;
  const FN = {
    heads: { f: s => heads(s), en: 'the number of heads', ar: 'عدد الـ heads' },
    diff: { f: s => 2 * heads(s) - s.length, en: 'heads − tails', ar: 'الـ heads ناقص الـ tails' }
  };
  const pretty = s => '(' + [...s].join(', ') + ')';

  /* ── slides 2 and 9: the arrow diagram from the sample space S to the real numbers R ── */
  function CoinMap({ ar, tosses, fns, dist }) {
    const [fk, setFk] = useState(fns[0]);
    const F = FN[fk], outs = tosses === 3 ? ['HHH', 'HHT', 'HTH', 'THH', 'HTT', 'THT', 'TTH', 'TTT'] : ['HH', 'HT', 'TH', 'TT'];
    const axis = tosses === 3 ? [3, 2, 1, 0, -1, -2, -3] : fk === 'heads' ? [4, 3, 2, 1, 0] : [2, 1, 0, -1, -2];
    const xs = [...new Set(outs.map(F.f))].sort((a, b) => a - b), cs = xs.map(v => outs.filter(o => F.f(o) === v).length), nS = outs.length;
    const vStart = 1 + outs.length, nSteps = vStart + (dist ? xs.length : 0) + 1;
    const [i, ctl] = useWalk(nSteps, 1700, fk);
    const vi = dist && i >= vStart && i < vStart + xs.length ? i - vStart : -1, fin = i === nSteps - 1;
    const shown = Math.min(i, outs.length), curO = i >= 1 && i <= outs.length ? i - 1 : -1;
    const rowH = tosses === 3 ? 31 : 40, top = 44, H = top + rowH * outs.length + 12;
    const oy = k => top + rowH * (k + .5), yT = oy(0), yB = oy(outs.length - 1), vy = v => yT + axis.indexOf(v) * (yB - yT) / (axis.length - 1);
    const AX = 232;
    const done = k => dist ? (fin || (vi >= 0 && k <= vi)) : fin;
    const listO = v => outs.filter(o => F.f(o) === v);
    let en, a;
    const rng = '{' + xs.map(M).join(', ') + '}';
    if (i === 0) {
      en = `Tossing a coin ${tosses === 3 ? 'three' : 'two'} times gives a sample space S of <b>${nS} outcomes</b>. X = <b>${F.en}</b> sends each outcome (independent variable) to a real number on the R axis (dependent variable).`;
      a = `لما ترمي عملة ${tosses} مرات الـ sample space S فيها <b>${nS} outcomes</b>. والـ X هو <b>${F.ar}</b>، وبيودّي كل outcome (الـ independent variable) لرقم حقيقي على محور الـ R (الـ dependent variable).`;
    } else if (curO >= 0) {
      const o = outs[curO], h = heads(o), t = o.length - h;
      if (fk === 'heads') { en = `<b>${pretty(o)}</b> has ${h} head${h === 1 ? '' : 's'}, so X${pretty(o)} = ${h}.`; a = `الـ outcome <b>${B(pretty(o))}</b> فيه ${h} heads، يعني:` + L(`X${pretty(o)} = ${h}`); }
      else { en = `<b>${pretty(o)}</b>: ${h} head${h === 1 ? '' : 's'} − ${t} tail${t === 1 ? '' : 's'}, so X${pretty(o)} = ${h} − ${t} = ${M(h - t)}.`; a = `الـ outcome <b>${B(pretty(o))}</b> فيه ${h} heads و ${t} tails، يعني:` + L(`X${pretty(o)} = ${h} − ${t} = ${M(h - t)}`); }
    } else if (vi >= 0) {
      const v = xs[vi], os = listO(v), nm = os.length === 1 ? os[0] : '{' + os.join(', ') + '}';
      const eq = `f(${M(v)}) = P(X = ${M(v)}) = n(${nm})/n(S) = ${cs[vi]}/${nS}`;
      en = `${cs[vi] === 1 ? '1 arrow reaches' : cs[vi] + ' arrows reach'} ${M(v)}: ${eq}.`;
      a = `فيه ${cs[vi]} سهم بيوصلوا للرقم ${B(M(v))}، يبقى:` + L(eq);
    } else if (dist) {
      const sum = cs.map(c => c + '/' + nS).join(' + ') + ' = 1 ✓';
      en = `Range of X = ${rng}. The distribution table is complete, and the check holds: ${sum}`;
      a = 'الـ range بتاع X هو:' + L(rng) + 'والـ distribution table خلص، والتأكيد صح:' + L(sum);
    } else {
      en = `Every outcome has exactly one arrow, so X is a <b>function</b> X : S → R (the random variable). Range of X = ${rng}.`;
      a = 'كل outcome طالع منه سهم واحد بس، يبقى الـ X هو <b>function</b> (الـ random variable):' + L('X : S → R') + 'والـ range بتاعه:' + L(rng);
    }
    const steps = Array.from({ length: nSteps });
    return html`<figure className="fig dmv6"><div className="fig-stage">
      ${fns.length > 1 && html`<${Modes} list=${[['heads', 'Number of heads (slide)'], ['diff', 'Heads − tails (Example 1)']]} mode=${fk} set=${setFk} />`}
      <svg className="dmv6-svg" viewBox=${`0 0 300 ${H}`} role="img" aria-label=${'Arrows from each outcome of S to its value of X on the R axis'}>
        <text x="58" y="22" textAnchor="middle" fontSize="17" fontWeight="700">S</text>
        <rect x="8" y=${top - 6} width="100" height=${rowH * outs.length + 12} rx="8" fill="var(--paper)" stroke="var(--fig-k)" strokeWidth="1.5" />
        ${outs.map((o, k) => html`<text key=${k} x="58" y=${oy(k) + 5} textAnchor="middle" fontSize="15" fontFamily="var(--mono)" fontWeight=${curO === k || (vi >= 0 && F.f(o) === xs[vi]) ? 700 : 400}
          style=${{ fill: curO === k || (vi >= 0 && F.f(o) === xs[vi]) ? 'var(--fig-k)' : 'var(--ink)' }}>${pretty(o)}</text>`)}
        <line x1=${AX} y1=${yT - 22} x2=${AX} y2=${yB + 14} stroke="var(--ink)" strokeWidth="2" />
        <polygon points=${`${AX},${yT - 32} ${AX - 6},${yT - 20} ${AX + 6},${yT - 20}`} fill="var(--ink)" />
        <text x=${AX + 16} y="22" fontSize="17" fontWeight="700">R</text>
        ${axis.map(v => { const hit = xs.includes(v) && (i >= 1 && outs.slice(0, shown).some(o => F.f(o) === v)); return html`<g key=${v}>
          <line x1=${AX - 6} y1=${vy(v)} x2=${AX + 6} y2=${vy(v)} stroke="var(--ink)" strokeWidth="2" />
          <circle cx=${AX} cy=${vy(v)} r=${hit ? 5.5 : 0} fill="var(--fig-s)" className="dmv6-pt" />
          <text x=${AX + 14} y=${vy(v) + 5} fontSize="15" fontFamily="var(--mono)" fontWeight=${vi >= 0 && xs[vi] === v ? 700 : 400} style=${{ fill: vi >= 0 && xs[vi] === v ? 'var(--fig-k)' : 'var(--ink)' }}>${M(v)}</text></g>`; })}
        ${outs.slice(0, shown).map((o, k) => { const hot = k === curO || (vi >= 0 && F.f(o) === xs[vi]);
          return html`<${Arrow} key=${k} x1=${110} y1=${oy(k)} x2=${AX - 7} y2=${vy(F.f(o))} col=${hot ? 'var(--fig-s)' : 'var(--fig-k)'} w=${hot ? 2.6 : 1.6} op=${hot ? 1 : vi >= 0 ? .25 : curO >= 0 ? .5 : .8} />`; })}
      </svg>
      ${dist && html`<div className="dmv6-wide"><table className="dmv6-tb"><tbody>
        <tr><th>xᵣ</th>${xs.map((x, k) => html`<td key=${k} className=${vi === k ? 'dmv6-cur' : done(k) ? '' : 'dmv6-dim'}>${M(x)}</td>`)}</tr>
        <tr><th>f(xᵣ)</th>${xs.map((x, k) => html`<td key=${k} className=${vi === k ? 'dmv6-cur' : done(k) ? '' : 'dmv6-dim'}>${done(k) ? html`<span className="dmv6-fr"><i>${cs[k]}</i><i>${nS}</i></span>` : '?'}</td>`)}</tr>
      </tbody></table></div>
      <${Bars} xs=${xs} cs=${cs} den=${nS} on=${done} cur=${vi} pick=${k => ctl.go(vStart + k)} />`}
      </div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><${SBar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  const RvMap = ({ ar }) => html`<${CoinMap} ar=${ar} tosses=${3} fns=${['heads', 'diff']} dist=${false} />`;
  const TwoCoins = ({ ar }) => html`<${CoinMap} ar=${ar} tosses=${2} fns=${['heads']} dist=${true} />`;
  const TwoCoinsDiff = ({ ar }) => html`<${CoinMap} ar=${ar} tosses=${2} fns=${['diff']} dist=${true} />`;

  /* ── slide 3: Example 1, the table X = heads − tails filled row by row ── */
  function DiffTable({ ar }) {
    const rows = ['HHH', 'HHT', 'HTH', 'HTT', 'THH', 'THT', 'TTH', 'TTT'];
    const val = s => 2 * heads(s) - 3, G = [3, 1, -1, -3];
    const steps = [
      { en: 'Toss a coin three times: S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}. X = number of heads − number of tails. Fill X for each outcome.', ar: 'نرمي عملة 3 مرات، والـ S هي:' + L('S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}') + 'والـ X هو عدد الـ heads ناقص عدد الـ tails. نملا قيمة X لكل outcome.' },
      ...rows.map(o => { const h = heads(o), t = 3 - h; return { en: `<b>${pretty(o)}</b>: ${h} head${h === 1 ? '' : 's'} − ${t} tail${t === 1 ? '' : 's'} = ${M(h - t)}.`, ar: `الـ outcome <b>${B(pretty(o))}</b> فيه ${h} heads و ${t} tails، يعني:` + L(`X = ${h} − ${t} = ${M(h - t)}`) }; }),
      { en: 'Group the outcomes by their value: HHH gives 3; HHT, HTH, THH give 1; HTT, THT, TTH give −1; TTT gives −3. Range = {−3, −1, 1, 3}.', ar: 'نجمّع الـ outcomes حسب القيمة:' + L('HHH → 3') + L('HHT, HTH, THH → 1') + L('HTT, THT, TTH → −1') + L('TTT → −3') + 'يبقى الـ range هو:' + L('{−3, −1, 1, 3}') }
    ];
    const [i, ctl] = useSteps(steps.length, 1500), fin = i === steps.length - 1;
    const tint = v => `color-mix(in srgb, var(--fig-k) ${[34, 22, 12, 4][G.indexOf(v)]}%, var(--paper))`;
    return html`<figure className="fig dmv6"><div className="fig-stage">
      <div className="dmv6-wide"><table className="dmv6-tb"><thead><tr><th>Sample space S</th><th>X: heads − tails</th></tr></thead><tbody>
        ${rows.map((o, k) => { const h = heads(o); return html`<tr key=${k} className=${i === k + 1 ? 'dmv6-cur' : ''}>
          <td style=${fin ? { background: tint(val(o)) } : null}>${pretty(o)}</td>
          <td style=${fin ? { background: tint(val(o)) } : null}>${i > k ? `${h} − ${3 - h} = ${M(val(o))}` : ''}</td></tr>`; })}
      </tbody></table></div>
      <div className=${'dmv6-groups ' + pop(fin)}>${G.map(v => html`<div key=${v} style=${{ background: tint(v) }}>X = ${M(v)}: ${rows.filter(o => val(o) === v).join(', ')}</div>`)}</div>
      <div className=${'dmv6-set ' + pop(fin)}>Range = {−3, −1, 1, 3}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${SBar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slides 4, 10 and 11: grids of ordered pairs with the lines that collect equal values (the "lateral shape") ── */
  const KIND = {
    sum: { n0: 6, noDiag: false, f: (x, y) => x + y, ax: ['first time', 'second time'] },
    max: { n0: 6, noDiag: false, f: (x, y) => Math.max(x, y), ax: ['first time', 'second time'] },
    min: { n0: 5, noDiag: true, f: (x, y) => Math.min(x, y), ax: ['first time', 'second time'] }
  };
  function PairGrid({ ar, kind }) {
    const K = KIND[kind], own = kind !== 'sum';
    const [mode, setMode] = useState('ex'), [nOwn, setNOwn] = useState(K.n0);
    const n = mode === 'ex' ? K.n0 : nOwn;
    const pts = []; for (let x = 1; x <= n; x++) for (let y = 1; y <= n; y++) if (!(K.noDiag && x === y)) pts.push([x, y, K.f(x, y)]);
    const nS = pts.length, xs = [...new Set(pts.map(p => p[2]))].sort((a, b) => a - b), cs = xs.map(v => pts.filter(p => p[2] === v).length);
    const nSteps = xs.length + 2, [i, ctl] = useWalk(nSteps, kind === 'sum' ? 1600 : 2200, mode + n);
    const vi = i >= 1 && i <= xs.length ? i - 1 : -1, fin = i === nSteps - 1, cur = vi >= 0 ? xs[vi] : null;
    const cs0 = Math.min(36, 216 / n), X0 = 30, Y0 = 262, px = x => X0 + x * cs0, py = y => Y0 - y * cs0, ext = cs0 * .4;
    // the line through the points of value v, and where its label sits
    const geo = v => {
      if (kind === 'sum') { const a = Math.max(1, v - n), b = Math.min(n, v - 1);
        return { d: `M${px(a) - ext},${py(v - a) - ext} L${px(b) + ext},${py(v - b) + ext}`, bx: px(b) + cs0 * .5 + 2, by: py(v - b) + cs0 * .5 + 2 }; }
      if (kind === 'max') return { d: `M${px(v)},${py(1) + ext} L${px(v)},${py(v)} L${px(1) - ext},${py(v)}`, bx: px(v) + 15, by: py(v) - 15 };
      return { d: `M${px(v)},${py(n) - ext} L${px(v)},${py(v)} L${px(n) + ext},${py(v)}`, bx: px(n) + ext + 13, by: py(v) };
    };
    const pairs = v => pts.filter(p => p[2] === v).map(p => `(${p[0]},${p[1]})`);
    let en, a;
    const den = nS, rng = '{' + xs.join(', ') + '}';
    if (i === 0) {
      if (kind === 'sum') { en = 'A regular die is tossed two times: each point (first, second) is one outcome, so n(S) = 6 × 6 = 36. X = the sum of the two numbers.'; a = 'بنرمي زهرة عادية مرتين: كل نقطة (الأولى، التانية) هي outcome، يعني:' + L('n(S) = 6 × 6 = 36') + 'والـ X هو مجموع الرقمين.'; }
      else if (kind === 'max') { en = `Two dice${n !== 6 ? ` with ${n} faces` : ''}: n(S) = ${n} × ${n} = ${nS}. X = the greatest of the two numbers.`; a = `زهرتين${n !== 6 ? ` كل واحدة فيها ${n} أوجه` : ''}، يعني:` + L(`n(S) = ${n} × ${n} = ${nS}`) + 'والـ X هو أكبر رقم من الاتنين.'; }
      else { const dd = Array.from({ length: n }, (_, k) => `(${k + 1},${k + 1})`).join(', ');
        en = `A box has ${n} cards numbered 1 to ${n}; two are drawn one after the other <b>without replacement</b>, so the pairs ${dd} are impossible (hollow): n(S) = ${n} × ${n - 1} = ${nS}. X = the smaller number.`;
        a = `صندوق فيه ${n} كروت عليها الأرقام من 1 لـ ${n}، بنسحب كارتين ورا بعض <b>من غير إرجاع</b>. فالـ pairs دي مستحيلة (النقط الفاضية):` + L(dd) + 'يعني:' + L(`n(S) = ${n} × ${n - 1} = ${nS}`) + 'والـ X هو الرقم الأصغر.'; }
    } else if (vi >= 0) {
      const v = cur, c = cs[vi], ps = pairs(v).join(', '), eq = `P(X = ${v}) = f(${v}) = ${frac(c, den)}`;
      if (kind === 'sum') { en = `Sum ${v}: ${ps}, ${c} pair${c === 1 ? '' : 's'} on one slanted line. ${eq}.`; a = `المجموع ${B(v)} بييجي من ${c} pairs على خط مايل واحد، وهم:` + L(ps) + 'يبقى:' + L(eq); }
      else if (kind === 'max') { const how = `${v}² − ${v - 1}² = 2(${v}) − 1 = ${c}`; en = `Greatest ${v}: the pairs on the L through (${v},${v}): ${ps}. Count: ${how}, so ${eq}.`; a = `أكبر رقم ${B(v)}: الـ pairs اللي على حرف الـ L اللي بيعدّي على ${B(`(${v},${v})`)}، وهم:` + L(ps) + 'العدد:' + L(how) + 'يبقى:' + L(eq); }
      else { const k = n - v, how = `${k} + ${k} = ${c}`; en = `Least ${v}: the pairs that contain ${v} with a bigger card, ${ps}. Count: ${how}, so ${eq}.`; a = `أصغر رقم ${B(v)}: الـ pairs اللي فيها ${B(v)} مع كارت أكبر منه، وهم:` + L(ps) + 'العدد:' + L(how) + 'يبقى:' + L(eq); }
    } else {
      const chk = '(' + cs.join(' + ') + ')/' + den + ' = 1 ✓';
      en = `Range of X = ${rng}. Each line collects one value of X (the "lateral shape"). Check: ${chk}`;
      a = 'الـ range بتاع X هو:' + L(rng) + 'كل خط بيجمّع قيمة واحدة من قيم X (الـ "lateral shape"). والتأكيد:' + L(chk);
    }
    const steps = Array.from({ length: nSteps });
    const kn = [3, 4, 5, 6, 7, 8];
    return html`<figure className="fig dmv6"><div className="fig-stage">
      ${own && html`<${Modes} list=${[['ex', 'Example from the notes'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />`}
      ${own && mode === 'own' && html`<div className="dmv6-knob" role="group"><span>${kind === 'min' ? 'Cards in the box:' : 'Faces on each die:'}</span>${kn.map(k => html`<button key=${k} className="fig-btn" aria-pressed=${String(nOwn === k)} onClick=${() => setNOwn(k)}>${k}</button>`)}</div>`}
      <svg className="dmv6-svg" viewBox="0 0 300 306" role="img" aria-label=${'Grid of the ' + nS + ' outcomes with the lines that collect equal values of X'}>
        <line x1=${X0} y1=${Y0} x2="292" y2=${Y0} stroke="var(--ink)" strokeWidth="2" /><polygon points=${`296,${Y0} 284,${Y0 - 6} 284,${Y0 + 6}`} fill="var(--ink)" />
        <line x1=${X0} y1=${Y0} x2=${X0} y2="30" stroke="var(--ink)" strokeWidth="2" /><polygon points=${`${X0},24 ${X0 - 6},36 ${X0 + 6},36`} fill="var(--ink)" />
        <text x="292" y="300" textAnchor="end" fontSize="14" style=${{ fill: 'var(--graphite)' }}>${K.ax[0]}</text>
        <text x=${X0 + 12} y="20" fontSize="14" style=${{ fill: 'var(--graphite)' }}>${K.ax[1]}</text>
        ${Array.from({ length: n }, (_, k) => html`<g key=${k}><text x=${px(k + 1)} y=${Y0 + 20} textAnchor="middle" fontSize="14" fontFamily="var(--mono)">${k + 1}</text>
          <text x=${X0 - 10} y=${py(k + 1) + 5} textAnchor="middle" fontSize="14" fontFamily="var(--mono)">${k + 1}</text>
          <line x1=${px(k + 1)} y1=${py(n) - 6} x2=${px(k + 1)} y2=${Y0} stroke="var(--line)" strokeWidth="1" /><line x1=${X0} y1=${py(k + 1)} x2=${px(n) + 6} y2=${py(k + 1)} stroke="var(--line)" strokeWidth="1" /></g>`)}
        ${xs.map((v, k) => { const g = geo(v), on = fin || k === vi; return html`<g key=${v} className="dmv6-ln" style=${{ opacity: on ? (k === vi ? 1 : .6) : 0 }}>
          <path d=${g.d} fill="none" stroke=${k === vi ? 'var(--fig-s)' : 'var(--fig-k)'} strokeWidth=${k === vi ? 3 : 2} strokeDasharray=${kind === 'sum' ? '5 4' : ''} strokeLinejoin="round" />
          <circle cx=${g.bx} cy=${g.by} r="11.5" fill="var(--paper)" stroke=${k === vi ? 'var(--fig-s)' : 'var(--fig-k)'} strokeWidth="1.8" />
          <text x=${g.bx} y=${g.by + 5} textAnchor="middle" fontSize=${v > 9 ? 13.5 : 14.5} fontWeight="700" fontFamily="var(--mono)">${v}</text></g>`; })}
        ${K.noDiag && Array.from({ length: n }, (_, k) => html`<circle key=${'d' + k} cx=${px(k + 1)} cy=${py(k + 1)} r="5" fill="var(--paper-2)" stroke="var(--graphite)" strokeWidth="1.5" />`)}
        ${pts.map(([x, y, v]) => { const hot = v === cur, seen = fin || (vi >= 0 && xs.indexOf(v) < vi);
          return html`<circle key=${x + '-' + y} className="dmv6-pt" cx=${px(x)} cy=${py(y)} r=${hot ? 6.5 : seen ? 4.5 : 4} fill=${hot ? 'var(--fig-s)' : seen ? 'var(--fig-k)' : 'var(--graphite)'} />`; })}
      </svg>
      <${Bars} xs=${xs} cs=${cs} den=${den} on=${k => fin || (vi >= 0 && k <= vi)} cur=${vi} pick=${k => ctl.go(k + 1)} /></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><${SBar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  const DiceSum = ({ ar }) => html`<${PairGrid} ar=${ar} kind="sum" />`;
  const DiceMax = ({ ar }) => html`<${PairGrid} ar=${ar} kind="max" />`;
  const LeastCard = ({ ar }) => html`<${PairGrid} ar=${ar} kind="min" />`;

  /* ── slide 7: the table form, the ordered pairs and the three conditions of a probability distribution ── */
  const ex36 = [1, 3, 5, 7, 9, 11].map(c => c + '/36');
  const PRE = {
    ex3: { t: 'Example 3', x: '0, 1, 2', f: '1/4, 2/4, 1/4' },
    try5: { t: 'Heads − tails', x: '−2, 0, 2', f: '1/4, 2/4, 1/4' },
    card: { t: 'Least card', x: '1, 2, 3, 4', f: '8/20, 6/20, 4/20, 2/20' },
    dice: { t: 'Greatest die', x: '1, 2, 3, 4, 5, 6', f: ex36.join(', ') }
  };
  const parseF = s => { s = s.trim().replace(/−/g, '-'); let m;
    if ((m = s.match(/^(-?\d+)\s*\/\s*(\d+)$/)) && +m[2] > 0) return [+m[1], +m[2]];
    if ((m = s.match(/^(-?)(\d*)(?:\.(\d+))?$/)) && (m[2] || m[3])) { const d = 10 ** (m[3] || '').length, p = +((m[2] || '0') + (m[3] || '')); return [(m[1] ? -1 : 1) * p, d]; }
    return null; };
  function PmfCheck({ ar }) {
    const [mode, setMode] = useState('ex3'), [xt, setXt] = useState(PRE.ex3.x), [ft, setFt] = useState(PRE.ex3.f);
    const pick = k => { setMode(k); if (k !== 'own') { setXt(PRE[k].x); setFt(PRE[k].f); } };
    const xsS = xt.split(',').map(s => s.trim()).filter(Boolean), fsS = ft.split(',').map(s => s.trim()).filter(Boolean);
    const xs = xsS.map(s => Number(s.replace(/−/g, '-'))), fs = fsS.map(parseF);
    let err = null;
    if (!xs.length) err = 'Type at least one value of x.';
    else if (xs.some(v => !isFinite(v))) err = 'Each x must be a number, like 0, 1, 2 or −2.';
    else if (new Set(xs).size !== xs.length) err = 'Each value of x must appear once.';
    else if (xs.length > 8) err = 'Up to 8 values, please.';
    else if (fs.some(f => !f)) err = 'Each f(x) must be a fraction or a decimal, like 1/4 or 0.25.';
    else if (fs.length !== xs.length) err = `Give one f(x) for each x (${xs.length} values of x, ${fs.length} of f(x)).`;
    const errAr = err && 'اكتب لكل قيمة x رقم واحد، ولكل واحدة ' + B('f(x)') + ' على شكل كسر أو رقم عشري، بنفس العدد.';
    let body = null, en, a;
    if (!err) {
      const L0 = fs.reduce((l, [, q]) => l * q / gcd(l, q), 1), num = fs.reduce((s, [p, q]) => s + p * (L0 / q), 0);
      const sameD = fs.every(([, q]) => q === fs[0][1]), fsT = fsS.map(s => s.replace(/-/g, '−').replace(/\s+/g, ''));
      const neg = xs.filter((_, k) => fs[k][0] < 0), c1 = !neg.length, c2 = num === L0;
      const sumT = fsT.join(' + ') + ' = ' + (sameD ? `${num}/${L0} = ` : '') + red(num, L0);
            const okAll = c1 && c2, k0 = xs.length > 1 ? 1 : 0;
      const p3 = `P(X = ${M(xs[k0])}) = f(${M(xs[k0])}) = ${fsT[k0]}`;
      const mx = Math.max(...fs.map(([p, q]) => Math.max(0, p / q)), 1e-9);
      body = html`<div>
        <div className="dmv6-wide"><table className="dmv6-tb"><tbody>
          <tr><th>xᵣ</th>${xs.map((x, k) => html`<td key=${k}>${M(x)}</td>`)}</tr>
          <tr><th>f(xᵣ)</th>${fs.map(([p, q], k) => html`<td key=${k} style=${p < 0 ? { color: 'var(--pen)' } : null}>${q === 1 ? M(p) : html`<span className="dmv6-fr"><i>${M(p)}</i><i>${q}</i></span>`}</td>`)}</tr>
        </tbody></table></div>
        <div className="dmv6-bars" style=${{ gridTemplateColumns: `repeat(${xs.length}, minmax(0, 1fr))`, maxWidth: '320px' }}>
          ${xs.map((x, k) => html`<div key=${k} className="dmv6-col on" style=${{ height: '96px', cursor: 'default' }}><span className="dmv6-bar" style=${{ height: Math.max(2, fs[k][0] / fs[k][1] / mx * 80) + 'px', background: fs[k][0] < 0 ? 'var(--pen)' : '' }}></span><span className="dmv6-x">${M(x)}</span></div>`)}</div>
        <div className="dmv6-set">X = {${xs.map((x, k) => html`<span key=${k} style=${{ whiteSpace: 'nowrap' }}>(${M(x)}, ${fsT[k]})${k < xs.length - 1 ? ', ' : ''}</span>`)}}</div>
        <ul className="dmv6-checks">
          <li className=${c1 ? 'ok' : 'no'}><span className="dmv6-mk">${c1 ? '✓' : '✗'}</span> (1) f(x) ≥ 0 for every x${c1 ? '' : html`: fails at x = ${neg.map(M).join(', ')}`}</li>
          <li className=${c2 ? 'ok' : 'no'}><span className="dmv6-mk">${c2 ? '✓' : '✗'}</span> (2) Σ f(x) = 1<span className="dmv6-m">${sumT}${c2 ? '' : ' ≠ 1'}</span></li>
          <li className=${okAll ? 'ok' : 'no'}><span className="dmv6-mk">${okAll ? '✓' : '✗'}</span> (3) P(X = x) = f(x): read each probability off the table<span className="dmv6-m">${okAll ? p3 : 'not a distribution, so f(x) is not P(X = x)'}</span></li>
        </ul>
        <p className=${'dmv6-verd ' + (okAll ? 'ok' : 'no')}>${okAll ? 'A probability distribution of X' : 'Not a probability distribution'}</p></div>`;
      if (okAll) {
        en = `The table xᵣ / f(xᵣ) and the set of ordered pairs are two ways to write the same distribution. f(x) ≥ 0 for every x and Σ f(x) = ${sumT}, so it <b>is</b> a probability distribution, and ${p3}.`;
        a = 'الجدول بتاع الـ x والـ ' + B('f(x)') + ' والـ set بتاعة الـ ordered pairs طريقتين نكتب بيهم نفس الـ distribution. كل ' + B('f(x)') + ' أكبر من أو تساوي صفر، والمجموع:' + L('Σ f(x) = ' + sumT) + 'يبقى ده <b>probability distribution</b>، ومنه:' + L(p3);
      } else {
        const why = [!c1 && 'some f(x) is negative', !c2 && `Σ f(x) = ${red(num, L0)}, not 1`].filter(Boolean).join(' and ');
        en = `Not a probability distribution: ${why}.`;
        a = 'ده مش probability distribution، لأن ' + [!c1 && 'فيه ' + B('f(x)') + ' سالبة', !c2 && 'المجموع مش 1:' + L('Σ f(x) = ' + red(num, L0))].filter(Boolean).join(' و');
      }
    } else { en = err; a = errAr; }
    return html`<figure className="fig dmv6"><div className="fig-stage">
      <${Modes} list=${[...Object.keys(PRE).map(k => [k, PRE[k].t]), ['own', 'Try your own']]} mode=${mode} set=${pick} />
      ${mode === 'own' && html`<div className="dmv6-in">
        <label>Values of x (comma separated)<input value=${xt} onInput=${e => setXt(e.target.value)} spellCheck="false" /></label>
        <label>f(x) for each x<input value=${ft} onInput=${e => setFt(e.target.value)} spellCheck="false" /></label></div>`}
      ${err ? html`<p className="dmv6-err">${err}</p>` : body}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'dm-rv-map': RvMap, 'dm-rv-diff-table': DiffTable, 'dm-dist-dice-sum': DiceSum, 'dm-dist-pmf-check': PmfCheck, 'dm-dist-two-coins': TwoCoins, 'dm-dist-two-coins-diff': TwoCoinsDiff, 'dm-dist-least-card': LeastCard, 'dm-dist-dice-max': DiceMax });
})();
/* ── part L2 ── */
// Discrete Mathematics visuals, Lecture 2 (operations on sets, set identities): the four operations and the difference on a Venn diagram,
// the Cartesian product filled pair by pair, Ex 1 on a three-set Venn, S ⊂ T and complements, every set law checked side by side,
// sets vs logic, and the exam method element by element (Lec_2_P1 slides 3–17). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, calm, useFit } = window.FIGKIT;
  const CSS = `
.dmv2 .fig-cap .ltr{ display:block; direction:ltr; unicode-bidi:isolate; text-align:left; font-family:var(--mono); font-size:.86rem; margin:2px 0; overflow-wrap:anywhere; }
.dmv2 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dmv2 .fig-btn.dmv2-sel{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.dmv2-w{ max-width:540px; margin:0 auto; color:var(--ink); }
.dmv2-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dmv2-chips .fig-btn{ font-size:.8rem; padding:4px 10px; min-height:30px; }
.dmv2-venn{ max-width:340px; margin:0 auto; }
.dmv2 .dmv2-venn svg{ max-width:340px; }
.dmv2 .dmv2-reg{ transition:opacity .5s ease; }
.dmv2 svg text.dmv2-hot{ fill:#fff; }
.dmv2-res{ text-align:center; font:600 .92rem/1.45 var(--mono); margin:8px 0 0; overflow-wrap:anywhere; direction:ltr; }
.dmv2-sub{ text-align:center; font:500 .82rem/1.4 var(--mono); color:var(--graphite); margin:2px 0 0; overflow-wrap:anywhere; direction:ltr; }
.dmv2-in{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:6px 8px; align-items:center; font-size:.84rem; margin:10px auto 0; max-width:420px; }
.dmv2-in label{ font-family:var(--mono); font-weight:700; }
.dmv2-in input{ font:inherit; font-family:var(--mono); min-width:0; width:100%; box-sizing:border-box; padding:5px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.dmv2-in input:focus{ outline:2px solid var(--fig-k); outline-offset:0; }
.dmv2-err{ color:var(--pen); font-size:.84rem; text-align:center; margin:8px 0 0; }
.dmv2-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-top:10px; }
.dmv2-row .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:30px; }
/* product */
.dmv2-fit{ width:100%; overflow:hidden; }
.dmv2-tab{ border-collapse:collapse; margin:0 auto; font:600 .8rem/1.2 var(--mono); direction:ltr; }
.dmv2-tab th, .dmv2-tab td{ border:1px solid var(--line); padding:5px 5px; text-align:center; min-width:30px; height:30px; white-space:nowrap; }
.dmv2-prod{ font:600 .84rem/1.2 var(--body); }
.dmv2-tab th{ background:var(--paper); color:var(--fig-k); }
.dmv2-tab td{ background:var(--paper); transition:background .3s; }
.dmv2-tab td.dmv2-now{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); }
.dmv2-tab tr.dmv2-now td, .dmv2-tab tr.dmv2-now th{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
.dmv2-tab td.dmv2-yes{ color:var(--ok); } .dmv2-tab td.dmv2-no{ color:var(--faint); }
.dmv2-tab td.dmv2-in1, .dmv2-tab tr.dmv2-now td.dmv2-in1{ color:#fff; background:var(--fig-s); }
/* laws */
.dmv2-law{ text-align:center; font:700 .95rem/1.4 var(--mono); margin:2px 0 10px; direction:ltr; overflow-wrap:anywhere; }
.dmv2-two{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px; }
.dmv2-pan{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px; min-width:0; transition:box-shadow .4s, opacity .4s; }
.dmv2-pan.dmv2-off{ opacity:.4; }
.dmv2-pan.dmv2-good{ box-shadow:0 0 0 2px var(--ok); } .dmv2-pan.dmv2-bad{ box-shadow:0 0 0 2px var(--pen); }
.dmv2-pan .dmv2-ph{ font-size:.76rem; color:var(--graphite); text-align:center; }
.dmv2-pan .dmv2-pe{ font:700 .8rem/1.3 var(--mono); text-align:center; min-height:2.6em; display:grid; place-items:center; direction:ltr; overflow-wrap:anywhere; }
.dmv2-keys{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-top:8px; }
.dmv2-keys button{ font:600 .9rem var(--mono); min-width:34px; min-height:32px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); cursor:pointer; }
.dmv2-keys button:hover{ border-color:var(--fig-k); }
.dmv2-verdict{ text-align:center; font-weight:700; margin:8px 0 0; font-size:.9rem; }
.dmv2-verdict.dmv2-good{ color:var(--ok); } .dmv2-verdict.dmv2-bad{ color:var(--pen); }
/* logic */
.dmv2-lg{ display:grid; gap:10px; align-items:center; }
@media (min-width:560px){ .dmv2-lg{ grid-template-columns:minmax(0,1fr) auto; } }
.dmv2-lg .dmv2-venn{ max-width:260px; width:100%; }
/* calc */
.dmv2-cx{ display:grid; gap:2px; margin:0 0 8px; }
.dmv2-cx div{ font:600 .82rem/1.4 var(--mono); direction:ltr; text-align:center; overflow-wrap:anywhere; }
.dmv2-tab.dmv2-calc td, .dmv2-tab.dmv2-calc th{ min-width:44px; height:24px; padding:2px 6px; }
.dmv2-tab.dmv2-calc td.dmv2-hide{ color:transparent; }
@media (prefers-reduced-motion: reduce){ .dmv2 .dmv2-reg, .dmv2-tab td{ transition:none; } }`;
  if (!document.getElementById('dmv2-css')) { const s = document.createElement('style'); s.id = 'dmv2-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── sets: parse, format ── */
  const isNum = x => /^-?\d+$/.test(x);
  const sortS = a => a.every(isNum) ? a.slice().sort((x, y) => x - y) : a.slice();
  function parseSet(s) {
    const t = String(s).replace(/[{}]/g, ' ').replace(/\.\.\.|\.\./g, ' … ').split(/[\s,،;]+/).filter(Boolean), out = [];
    for (let j = 0; j < t.length; j++) {
      if (t[j] === '…') { const a = +out[out.length - 1], b = +t[j + 1]; if (!isNum(String(out[out.length - 1] || 'x')) || !isNum(t[j + 1] || 'x') || b < a || b - a > 40) throw new Error('range'); for (let x = a + 1; x < b; x++) out.push(String(x)); continue; }
      out.push(t[j].slice(0, 6));
    }
    return [...new Set(out)];
  }
  const fmt = (a, sep = ', ') => a.length ? '{' + sortS(a).join(sep) + '}' : '∅';
  const has = (a, x) => a.includes(x);
  const uni = (a, b) => sortS([...new Set(a.concat(b))]);

  /* ── tiny set-expression language: A B C U ∅ ∪ ∩ − ᶜ ( ) ── */
  function parseEx(s) {
    const t = String(s).replace(/\s+/g, '').replace(/\^?c/g, 'ᶜ').replace(/[′'’]/g, 'ᶜ').replace(/Ø|ø|\{\}/g, '∅').replace(/[|+]/g, '∪').replace(/[&*]/g, '∩').replace(/[-–]/g, '−');
    let i = 0;
    function prim() {
      let n; const c = t[i];
      if (c === '(') { i++; n = expr(); if (t[i] !== ')') throw new Error('bracket'); i++; }
      else if (c && 'ABCU∅'.includes(c)) { i++; n = { k: 'v', v: c }; }
      else throw new Error('token');
      while (t[i] === 'ᶜ') { i++; n = { k: 'c', a: n }; }
      return n;
    }
    function expr() {
      let n = prim(), op = null;
      while (t[i] === '∪' || t[i] === '∩' || t[i] === '−') { const o = t[i++]; if (op && o !== op) throw new Error('mix'); op = o; n = { k: 'b', o, a: n, b: prim() }; }
      return n;
    }
    const n = expr(); if (i !== t.length) throw new Error('token'); return n;
  }
  const VI = { A: 0, B: 1, C: 2 };
  function ev(n, m) {
    if (n.k === 'v') return n.v === 'U' ? true : n.v === '∅' ? false : !!(m >> VI[n.v] & 1);
    if (n.k === 'c') return !ev(n.a, m);
    const a = ev(n.a, m), b = ev(n.b, m); return n.o === '∪' ? a || b : n.o === '∩' ? a && b : a && !b;
  }
  const wrap = x => x.k === 'b' ? '(' + str(x) + ')' : str(x);
  function str(n) {
    if (n.k === 'v') return n.v;
    if (n.k === 'c') return n.a.k === 'v' ? n.a.v + 'ᶜ' : '(' + str(n.a) + ')ᶜ';
    return wrap(n.a) + ' ' + n.o + ' ' + wrap(n.b);
  }
  function subs(n) { const out = []; (function go(x) { if (x.k === 'c') go(x.a); if (x.k === 'b') { go(x.a); go(x.b); } if (x.k !== 'v') out.push(x); })(n); return out.length ? out : [n]; }
  function nvars(n) { let k = 0; (function go(x) { if (x.k === 'v' && x.v in VI) k = Math.max(k, VI[x.v] + 1); if (x.a) go(x.a); if (x.b) go(x.b); })(n); return k; }
  const regs = n => Array.from({ length: 1 << n }, (_, m) => m);
  const shadeOf = (node, n) => regs(n).map(m => ev(node, m));
  // elements of U that satisfy an expression, given A, B, C as lists
  const setOf = (node, U, S) => U.filter(x => ev(node, (has(S.A || [], x) ? 1 : 0) | (has(S.B || [], x) ? 2 : 0) | (has(S.C || [], x) ? 4 : 0)));

  /* ── Venn diagram with shaded regions (region m = which circles it is inside) ── */
  const SM = {
    1: { w: 200, h: 140, c: [[100, 76, 46]], l: [[46, 34]], u: [14, 128], mk: { 1: [100, 76], 0: [30, 30] } },
    2: { w: 200, h: 140, c: [[78, 74, 44], [122, 74, 44]], l: [[38, 28], [162, 28]], u: [178, 128], mk: { 1: [56, 74], 2: [144, 74], 3: [100, 74], 0: [22, 122] } },
    3: { w: 200, h: 156, c: [[82, 58, 34], [118, 58, 34], [100, 92, 34]], l: [[34, 30], [166, 30], [158, 138]], u: [14, 144] }
  };
  const BG = {
    1: { w: 300, h: 230, c: [[150, 100, 72]], l: [[78, 44]], u: [18, 216], a: { 1: [150, 100, 3] }, out: 205 },
    2: { w: 300, h: 230, c: [[112, 100, 68], [188, 100, 68]], l: [[48, 32], [252, 32]], u: [18, 216], a: { 1: [80, 100, 2], 2: [220, 100, 2], 3: [150, 100, 1] }, out: 205 },
    3: { w: 300, h: 272, c: [[118, 95, 60], [182, 95, 60], [150, 150, 60]], l: [[44, 40], [256, 40], [238, 230]], u: [18, 258], a: { 1: [92, 80, 1], 2: [208, 80, 1], 4: [150, 190, 2], 3: [150, 62, 1], 5: [115, 140, 1], 6: [185, 140, 1], 7: [150, 116, 1] }, out: 248 }
  };
  let UID = 0;
  function useUid() { const r = useRef(null); if (r.current == null) r.current = 'dmv2-v' + (++UID); return r.current; }
  function Venn({ n, big, shade, items, hot, mark, label }) {
    const id = useUid(), G = (big ? BG : SM)[n], fs = 22, hs = hot || [];
    const R = regs(n);
    const placed = [];
    if (items) for (const m of R) {
      const xs = items[m] || []; if (!xs.length) continue;
      if (m === 0) { const sp = Math.min(26, 240 / xs.length), x0 = 160 - (xs.length - 1) * sp / 2; xs.forEach((x, j) => placed.push([x, x0 + j * sp, G.out])); continue; }
      const [ax, ay, cols] = G.a[m], cap = cols * 4, show = xs.length > cap ? xs.slice(0, cap - 1).concat('+' + (xs.length - cap + 1)) : xs;
      const cc = Math.min(cols, show.length), rows = Math.ceil(show.length / cols);
      show.forEach((x, j) => placed.push([x, ax + (j % cols - (cc - 1) / 2) * 26, ay + (Math.floor(j / cols) - (rows - 1) / 2) * 24]));
    }
    return html`<svg viewBox=${`0 0 ${G.w} ${G.h}`} role="img" aria-label=${label || 'Venn diagram'}>
      <defs>
        ${G.c.map((c, k) => html`<clipPath key=${'c' + k} id=${id + 'c' + k}><circle cx=${c[0]} cy=${c[1]} r=${c[2]} /></clipPath>`)}
        ${R.map(m => html`<mask key=${'m' + m} id=${id + 'm' + m} maskUnits="userSpaceOnUse" x="0" y="0" width=${G.w} height=${G.h}><rect width=${G.w} height=${G.h} fill="white" />${G.c.map((c, k) => (m >> k & 1) ? null : html`<circle key=${k} cx=${c[0]} cy=${c[1]} r=${c[2]} fill="black" />`)}</mask>`)}
      </defs>
      ${R.map(m => { let el = html`<rect x="3" y="3" width=${G.w - 6} height=${G.h - 6} rx="6" fill="var(--fig-k)" className="dmv2-reg" style=${{ opacity: shade && shade[m] ? .4 : 0 }} />`;
        for (let k = 0; k < n; k++) if (m >> k & 1) el = html`<g clipPath=${`url(#${id}c${k})`}>${el}</g>`;
        return html`<g key=${'r' + m} mask=${`url(#${id}m${m})`}>${el}</g>`; })}
      <rect x="3" y="3" width=${G.w - 6} height=${G.h - 6} rx="6" fill="none" stroke="var(--graphite)" strokeWidth="1.5" />
      ${G.c.map((c, k) => html`<circle key=${'o' + k} cx=${c[0]} cy=${c[1]} r=${c[2]} fill="none" stroke="var(--ink)" strokeWidth="2" />`)}
      ${G.l.map((p, k) => html`<text key=${'l' + k} x=${p[0]} y=${p[1]} textAnchor="middle" fontSize=${fs} fontWeight="700">${'ABC'[k]}</text>`)}
      <text x=${G.u[0]} y=${G.u[1]} textAnchor="middle" fontSize=${fs - 2} fontWeight="700" style=${{ fill: 'var(--graphite)' }}>U</text>
      ${mark != null && G.mk && html`<circle cx=${G.mk[mark][0]} cy=${G.mk[mark][1]} r="9" fill="var(--pen)" stroke="var(--paper)" strokeWidth="2.5" />`}
      ${placed.map(([x, px, py]) => { const on = hs.includes(x); return html`<g key=${'i' + x}>
        ${on && html`<circle cx=${px} cy=${py} r="12" fill="var(--fig-s)" />`}
        <text x=${px} y=${py} dy=".35em" textAnchor="middle" fontSize="17" fontWeight=${on ? 700 : 500} className=${on ? 'dmv2-hot' : ''}>${x}</text></g>`; })}
    </svg>`;
  }
  const Chips = ({ items, on, set }) => html`<div className="dmv2-chips">${items.map(([k, t]) => html`<button key=${k} className=${'fig-btn' + (on === k ? ' dmv2-sel' : '')} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const regionOf = (x, A, B, C) => (has(A, x) ? 1 : 0) | (has(B, x) ? 2 : 0) | (C && has(C, x) ? 4 : 0);
  function itemsBy(all, A, B, C) { const o = {}; for (const x of all) { const m = regionOf(x, A, B, C); (o[m] = o[m] || []).push(x); } return o; }

  /* ── [0] union, intersection, complement, difference on one Venn ── */
  function OpsVenn({ ar }) {
    const PRE = { ex1: { U: '', A: '4, 5', B: '5, 6, 7' }, ex2: { U: '', A: '2, 4, 6, 8', B: '4, 8, 10, 12' } };
    const [mode, setMode] = useState('ex1'), [f, setF] = useState({ U: '1..10', A: '4, 5', B: '5, 6, 7' });
    const [i, ctl] = useSteps(4, 3400);
    const d = mode === 'own' ? f : PRE[mode];
    let A = [], B = [], U = null, err = '';
    try { A = parseSet(d.A); B = parseSet(d.B); U = d.U.trim() ? parseSet(d.U) : null; } catch (e) { err = 'Write each set as numbers or names separated by commas (ranges like 1..10).'; }
    if (!err && (A.length > 12 || B.length > 12 || (U && U.length > 16))) err = 'Keep A and B to 12 elements and U to 16.';
    if (!err && U && uni(A, B).some(x => !has(U, x))) err = 'Every element of A and B must also be in U.';
    if (err) { A = []; B = []; U = null; }
    const all = U ? sortS(U) : uni(A, B), items = itemsBy(all, A, B);
    const As = fmt(A), Bs = fmt(B), I = sortS(A.filter(x => has(B, x)));
    const Un = uni(A, B), Ac = U ? sortS(U.filter(x => !has(A, x))) : sortS(B.filter(x => !has(A, x))), D = sortS(B.filter(x => !has(A, x)));
    const ops = [
      { sh: [false, true, true, true], hot: Un, line: `A ∪ B = ${fmt(Un)}`,
        en: `<b>Union</b>: all of A and all of B shaded ("or" includes "both").<span class="ltr">A ∪ B = {x | x ∈ A or x ∈ B}</span><span class="ltr">${As} ∪ ${Bs} = ${fmt(Un)}</span>` + (I.length ? 'Elements in both are written once.' : ''),
        ar: `الـ <b>Union</b> بتضلّل A كلها وB كلها، و"or" هنا بتشمل "الاتنين":<span class="ltr">A ∪ B = {x | x ∈ A or x ∈ B}</span><span class="ltr">${As} ∪ ${Bs} = ${fmt(Un)}</span>` + (I.length ? 'والـ elements المشتركة بتتكتب مرة واحدة بس.' : '') },
      { sh: [false, false, false, true], hot: I, line: `A ∩ B = ${fmt(I)}`,
        en: `<b>Intersection</b>: only the overlapped part, the elements in common.<span class="ltr">A ∩ B = {x | x ∈ A and x ∈ B}</span><span class="ltr">${As} ∩ ${Bs} = ${fmt(I)}</span>` + (I.length ? '' : 'A ∩ B = ∅, so the sets are <b>disjoint</b>.'),
        ar: `الـ <b>Intersection</b> بتضلّل الجزء المتداخل بس، يعني الـ elements المشتركة:<span class="ltr">A ∩ B = {x | x ∈ A and x ∈ B}</span><span class="ltr">${As} ∩ ${Bs} = ${fmt(I)}</span>` + (I.length ? '' : 'ولأن الناتج فاضي يبقى الـ sets دي <b>disjoint</b>.') },
      { sh: [true, false, true, false], hot: Ac, line: U ? `A′ = U − A = ${fmt(Ac)}` : 'A′ = U − A',
        en: `<b>Complement</b>: everything inside the rectangle U but outside the circle A ("not A").<span class="ltr">A′ = {x : x ∈ U but x ∉ A} = U − A</span>` + (U ? `<span class="ltr">A′ = ${fmt(Ac)}</span>` : 'This example gives no U, so A′ is shaded but not listed. Pick "Try your own" to give a U.'),
        ar: `الـ <b>Complement</b> هو كل حاجة جوه المستطيل U بس برّه الدايرة A، فكّر فيه كـ "not A":<span class="ltr">A′ = {x : x ∈ U but x ∉ A} = U − A</span>` + (U ? `<span class="ltr">A′ = ${fmt(Ac)}</span>` : 'والمثال ده مفيهوش U، فالـ A′ متضلّلة بس مش هنقدر نعدّ الـ elements بتاعتها. اختار "Try your own" وحط U.') },
      { sh: [false, false, true, false], hot: D, line: `B − A = ${fmt(D)}`,
        en: `<b>Difference</b>: the part of B outside A.<span class="ltr">B − A = {x | x ∈ B and x ∉ A}</span><span class="ltr">${Bs} − ${As} = ${fmt(D)}</span>`,
        ar: `الـ <b>Difference</b> بيضلّل الجزء من B اللي برّه A:<span class="ltr">B − A = {x | x ∈ B and x ∉ A}</span><span class="ltr">${Bs} − ${As} = ${fmt(D)}</span>` }
    ];
    const o = ops[i], pick = m => { setMode(m); ctl.replay(); };
    const L = ['A ∪ B', 'A ∩ B', 'A′', 'B − A'];
    return html`<figure className="fig dmv2"><div className="fig-stage"><div className="dmv2-w">
      <${Chips} items=${[['ex1', '{4, 5} and {5, 6, 7}'], ['ex2', '{2, 4, 6, 8} and {4, 8, 10, 12}'], ['own', 'Try your own']]} on=${mode} set=${pick} />
      <div className="dmv2-chips">${L.map((t, j) => html`<button key=${j} className=${'fig-btn' + (i === j ? ' dmv2-sel' : '')} onClick=${() => ctl.go(j)}>${t}</button>`)}</div>
      <div className="dmv2-venn"><${Venn} n=${2} big=${true} shade=${o.sh} items=${items} hot=${o.hot} label=${'Venn diagram of ' + L[i]} /></div>
      <p className="dmv2-res">${o.line}</p>
      ${mode === 'own' && html`<div className="dmv2-in">
        ${['U', 'A', 'B'].map(k => html`<${React.Fragment} key=${k}><label htmlFor=${'dmv2-o' + k}>${k} =</label><input id=${'dmv2-o' + k} value=${f[k]} placeholder=${k === 'U' ? 'optional, e.g. 1..10' : ''} onInput=${e => setF(Object.assign({}, f, { [k]: e.target.value }))} /></${React.Fragment}>`)}
      </div>${err && html`<p className="dmv2-err">${err}</p>`}`}
    </div></div>
      <${Cap} en=${o.en} ar=${o.ar} showAr=${ar} /><${Bar} steps=${ops} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.3] Cartesian product filled pair by pair ── */
  function OpsProduct({ ar }) {
    const EX = { A: 'a₁, a₂, a₃, a₄', B: 'b₁, b₂, b₃' };
    const [mode, setMode] = useState('ex'), [f, setF] = useState(EX);
    let A = [], B = [], err = '';
    try { A = parseSet(mode === 'own' ? f.A : EX.A); B = parseSet(mode === 'own' ? f.B : EX.B); } catch (e) { err = 'Write each set as elements separated by commas.'; }
    if (!err && (A.length > 5 || B.length > 5)) err = 'Keep A and B to 5 elements each.';
    if (!err && (!A.length || !B.length)) err = 'A and B need at least one element each.';
    if (err) { A = []; B = []; }
    const N = A.length * B.length, key = A.join() + '|' + B.join();
    const [k, setK] = useState(calm() ? N : 0), [play, setPlay] = useState(!calm());
    useEffect(() => { setK(calm() ? N : 0); setPlay(!calm()); }, [key]);
    useEffect(() => { if (!play) return; if (k >= N) { setPlay(false); return; } const t = setTimeout(() => setK(x => x + 1), 420); return () => clearTimeout(t); }, [k, play, N]);
    const fit = useFit(key + k);
    const done = k >= N && N > 0, cur = k - 1;
    const en = `<b>Cartesian product</b>: every element of A is paired with every element of B, row by row; each pair is <b>ordered</b>, first from A, then from B.<span class="ltr">A × B = {(a, b) | a ∈ A, b ∈ B}</span>` + (done ? `<span class="ltr">|A × B| = |A|·|B| = ${A.length}·${B.length} = ${N}</span>` : '');
    const T = {}; T.ar = `الـ <b>Cartesian product</b> بيحط كل element من A مع كل element من B، صف ورا صف، وكل pair هي <b>ordered pair</b> أولها من A وتانيها من B:<span class="ltr">A × B = {(a, b) | a ∈ A, b ∈ B}</span>` + (done ? `وعدد الـ pairs:<span class="ltr">|A × B| = |A|·|B| = ${A.length}·${B.length} = ${N}</span>` : '');
    return html`<figure className="fig dmv2"><div className="fig-stage"><div className="dmv2-w">
      <${Chips} items=${[['ex', 'Example: |A| = 4, |B| = 3'], ['own', 'Try your own']]} on=${mode} set=${setMode} />
      <p className="dmv2-sub">A = ${fmt(A)}</p><p className="dmv2-sub">B = ${fmt(B)}</p>
      <div className="dmv2-fit" ref=${fit} style=${{ marginTop: '8px' }}><table className="dmv2-tab dmv2-prod"><thead><tr><th>×</th>${B.map(b => html`<th key=${b}>${b}</th>`)}</tr></thead>
        <tbody>${A.map((x, r) => html`<tr key=${x}><th>${x}</th>${B.map((y, c) => { const j = r * B.length + c; return html`<td key=${y} className=${j === cur && !done ? 'dmv2-now' : ''}>${j < k ? `(${x}, ${y})` : ''}</td>`; })}</tr>`)}</tbody></table></div>
      <p className="dmv2-res">${done ? `|A × B| = ${A.length} · ${B.length} = ${N}` : `pairs so far: ${Math.max(0, k)} of ${N}`}</p>
      ${mode === 'own' && html`<div className="dmv2-in">${['A', 'B'].map(q => html`<${React.Fragment} key=${q}><label htmlFor=${'dmv2-p' + q}>${q} =</label><input id=${'dmv2-p' + q} value=${f[q]} onInput=${e => setF(Object.assign({}, f, { [q]: e.target.value }))} /></${React.Fragment}>`)}</div>${err && html`<p className="dmv2-err">${err}</p>`}`}
      <div className="dmv2-row"><button className="fig-btn solid" disabled=${k >= N} onClick=${() => { setPlay(false); setK(x => Math.min(N, x + 1)); }}>Next pair</button>
        <button className="fig-btn" disabled=${k >= N} onClick=${() => { setPlay(false); setK(N); }}>Fill all</button>
        <button className="fig-btn" onClick=${() => { setK(0); setPlay(!calm()); }}>↻ Replay</button></div>
    </div></div>
      <${Cap} en=${en} ar=${T.ar} showAr=${ar} /></figure>`;
  }

  /* ── [1] Ex 1 on a three-set Venn ── */
  function OpsEx1({ ar }) {
    const U = parseSet('1..10'), S = { A: ['1', '2', '3'], B: ['3', '4', '6'], C: ['1', '4', '7'] };
    const val = e => setOf(parseEx(e), U, S), F = e => fmt(val(e), ',');
    const items = itemsBy(U, S.A, S.B, S.C);
    const sh = e => shadeOf(parseEx(e), 3);
    const steps = [
      { e: null, line: 'U = {1,…,10}',
        en: 'Every number of U sits in the region of the sets it belongs to; 5, 8, 9 and 10 are in none of A, B, C.<span class="ltr">U = {1,2,3,4,5,6,7,8,9,10}, A = {1,2,3}, B = {3,4,6}, C = {1,4,7}</span>',
        ar: 'كل رقم من U متحط في الحتة بتاعة الـ sets اللي هو فيها، والأرقام 5 و8 و9 و10 مش في ولا واحدة من A وB وC. المعطيات:<span class="ltr">U = {1,2,3,4,5,6,7,8,9,10}, A = {1,2,3}, B = {3,4,6}, C = {1,4,7}</span>' },
      { e: 'A ∩ B', t: 'a)', en: `<b>a)</b> Shade the overlap of A and B: only 3 is in both.<span class="ltr">A ∩ B = ${F('A ∩ B')}</span>`, ar: `في (a) بنضلّل الجزء المشترك بين A وB، والـ 3 بس هو اللي في الاتنين:<span class="ltr">A ∩ B = ${F('A ∩ B')}</span>` },
      { e: 'A ∪ B', t: 'b)', en: `<b>b)</b> Shade all of A and all of B; 3 is written once.<span class="ltr">A ∪ B = ${F('A ∪ B')}</span>`, ar: `في (b) بنضلّل A كلها وB كلها، والـ 3 بيتكتب مرة واحدة:<span class="ltr">A ∪ B = ${F('A ∪ B')}</span>` },
      { e: 'A − B', t: 'c)', en: `<b>c)</b> The part of A outside B.<span class="ltr">A − B = ${F('A − B')}</span>`, ar: `في (c) بناخد الجزء من A اللي برّه B:<span class="ltr">A − B = ${F('A − B')}</span>` },
      { e: 'A − C', t: 'd)', en: `<b>d)</b> The part of A outside C (1 is in C, so it goes).<span class="ltr">A − C = ${F('A − C')}</span>`, ar: `في (d) بناخد الجزء من A اللي برّه C، والـ 1 موجود في C فبيطلع:<span class="ltr">A − C = ${F('A − C')}</span>` },
      { e: '(A ∩ B)ᶜ', t: 'f)', en: `<b>f)</b> Everything in U except the overlap.<span class="ltr">(A ∩ B)ᶜ = U − {3} = ${F('(A ∩ B)ᶜ')}</span>Slide error: the slide writes A ∩ B = {1,2,3,4,6} and (A ∩ B)ᶜ = {5,7,8,9,10}; those are the union and its complement.`,
        ar: `في (f) بناخد كل U ما عدا الجزء المشترك:<span class="ltr">(A ∩ B)ᶜ = U − {3} = ${F('(A ∩ B)ᶜ')}</span>وخلي بالك إن الـ slide غلطانة هنا، كاتبة الـ union والـ complement بتاعه بدل الـ intersection.` },
      { e: '(A ∪ B)ᶜ', t: 'u)', en: `<b>u)</b> Everything in U outside both circles.<span class="ltr">(A ∪ B)ᶜ = U − {1,2,3,4,6} = ${F('(A ∪ B)ᶜ')}</span>`, ar: `في (u) بناخد كل حاجة في U برّه الدايرتين:<span class="ltr">(A ∪ B)ᶜ = U − {1,2,3,4,6} = ${F('(A ∪ B)ᶜ')}</span>` },
      { e: 'Aᶜ ∩ Bᶜ', t: 'n)', en: `<b>n)</b> What is outside A and also outside B: the same region as u), De Morgan.<span class="ltr">Aᶜ ∩ Bᶜ = ${F('Aᶜ')} ∩ ${F('Bᶜ')} = ${F('Aᶜ ∩ Bᶜ')}</span>`, ar: `في (n) بناخد اللي برّه A وبرّه B مع بعض، وده نفس الجزء بتاع (u)، يعني De Morgan:<span class="ltr">Aᶜ ∩ Bᶜ = ${F('Aᶜ')} ∩ ${F('Bᶜ')} = ${F('Aᶜ ∩ Bᶜ')}</span>` },
      { e: 'Aᶜ ∪ Bᶜ', t: 's)', en: `<b>s)</b> What is outside A or outside B: everything except the overlap, the same as f), De Morgan.<span class="ltr">Aᶜ ∪ Bᶜ = ${F('Aᶜ ∪ Bᶜ')} = (A ∩ B)ᶜ</span>`, ar: `في (s) بناخد اللي برّه A أو برّه B، يعني كله ما عدا الجزء المشترك، ونفس (f) بالظبط، وده De Morgan:<span class="ltr">Aᶜ ∪ Bᶜ = ${F('Aᶜ ∪ Bᶜ')} = (A ∩ B)ᶜ</span>` }
    ];
    const [i, ctl] = useSteps(steps.length, 3000), s = steps[i];
    return html`<figure className="fig dmv2"><div className="fig-stage"><div className="dmv2-w">
      <div className="dmv2-venn"><${Venn} n=${3} big=${true} shade=${s.e ? sh(s.e) : null} items=${items} hot=${s.e ? val(s.e) : []} label=${'Ex 1 on a Venn diagram of A, B and C' + (s.e ? ': ' + s.e : '')} /></div>
      <p className="dmv2-res">${s.e ? `${s.t} ${s.e} = ${F(s.e)}` : s.line}</p>
    </div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.0–2.1] S ⊂ T: intersection, union and difference ── */
  function OpsSubset({ ar }) {
    const steps = [
      { sh: null, hot: [], line: 'S ⊂ T', en: 'S = {1, 0}, T = {0, 1, 2}: every element of S is in T and T also has 2, so S ⊂ T and the circle S sits inside T.', ar: 'كل element في S موجود في T، وT فيها كمان الـ 2، يبقى S ⊂ T والدايرة S جوه T:<span class="ltr">S = {1, 0}, T = {0, 1, 2}</span>' },
      { sh: 'S', hot: ['0', '1'], line: 'S ∩ T = S = {0, 1}', en: 'The overlap of S and T is all of S.<span class="ltr">S ∩ T = S = {0, 1}</span>', ar: 'الجزء المشترك بين S وT هو S كلها:<span class="ltr">S ∩ T = S = {0, 1}</span>' },
      { sh: 'T', hot: ['0', '1', '2'], line: 'S ∪ T = T = {0, 1, 2}', en: 'S adds nothing new to T, so the union is T.<span class="ltr">S ∪ T = T = {0, 1, 2}</span>', ar: 'الـ S مش بتزوّد حاجة جديدة على T، فالـ union هو T:<span class="ltr">S ∪ T = T = {0, 1, 2}</span>' },
      { sh: 'ring', hot: ['2'], line: 'T − S = {2}', en: 'The part of T outside S holds only 2.<span class="ltr">T − S = {2}</span>', ar: 'الجزء من T اللي برّه S فيه الـ 2 بس:<span class="ltr">T − S = {2}</span>' },
      { sh: 'S', hot: [], line: 'A ⊆ B  ⇒  A ∩ B = A,  A ∪ B = B', en: 'Rule: if A ⊆ B then A ∩ B = A and A ∪ B = B.', ar: 'القاعدة: لو A جوه B يبقى:<span class="ltr">A ⊆ B ⇒ A ∩ B = A, A ∪ B = B</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800), s = steps[i];
    const C = (cx, cy, r) => `M${cx - r},${cy} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0 Z`;
    const T = C(150, 105, 92), Sp = C(122, 114, 46);
    const sd = s.sh === 'S' ? Sp : s.sh === 'T' ? T : s.sh === 'ring' ? T + ' ' + Sp : null;
    const el = [['0', 106, 114], ['1', 138, 114], ['2', 206, 122]];
    return html`<figure className="fig dmv2"><div className="fig-stage"><div className="dmv2-w"><div className="dmv2-venn">
      <svg viewBox="0 0 300 210" role="img" aria-label="S drawn inside T">
        ${sd && html`<path d=${sd} fill="var(--fig-k)" fillRule="evenodd" style=${{ opacity: .4 }} />`}
        <path d=${T} fill="none" stroke="var(--ink)" strokeWidth="2" /><path d=${Sp} fill="none" stroke="var(--ink)" strokeWidth="2" />
        <text x="236" y="34" fontSize="22" fontWeight="700" textAnchor="middle">T</text><text x="122" y="58" fontSize="22" fontWeight="700" textAnchor="middle">S</text>
        ${el.map(([x, px, py]) => { const on = s.hot.includes(x); return html`<g key=${x}>${on && html`<circle cx=${px} cy=${py} r="13" fill="var(--fig-s)" />`}<text x=${px} y=${py} dy=".35em" textAnchor="middle" fontSize="19" fontWeight=${on ? 700 : 500} className=${on ? 'dmv2-hot' : ''}>${x}</text></g>`; })}
      </svg></div>
      <p className="dmv2-res">${s.line}</p>
    </div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.2] complements in a given U ── */
  function OpsCompl({ ar }) {
    const EX = { e1: { U: '1, 2, 3, 4, 5', A: '1, 2' }, e2: { U: '1..6', A: '2, 4, 6' } };
    const [m, setM] = useState('e1'); const [i, ctl] = useSteps(2, 2400);
    const U = parseSet(EX[m].U), A = parseSet(EX[m].A), Ac = U.filter(x => !has(A, x));
    const items = { 1: A, 0: Ac };
    const steps = [
      { en: `U and A drawn: A is the circle, U the rectangle.<span class="ltr">U = ${fmt(U)}, A = ${fmt(A)}</span>`, ar: `المستطيل هو U والدايرة هي A:<span class="ltr">U = ${fmt(U)}, A = ${fmt(A)}</span>` },
      { en: `A′ is what is left of U outside the circle A.<span class="ltr">A′ = U − A = ${fmt(Ac)}</span>`, ar: `الـ A′ هي اللي فاضل من U برّه الدايرة A:<span class="ltr">A′ = U − A = ${fmt(Ac)}</span>` }
    ];
    return html`<figure className="fig dmv2"><div className="fig-stage"><div className="dmv2-w">
      <${Chips} items=${[['e1', 'U = {1,…,5}, A = {1,2}'], ['e2', 'U = {1,…,6}, A = {2,4,6}']]} on=${m} set=${k => { setM(k); ctl.replay(); }} />
      <div className="dmv2-venn"><${Venn} n=${1} big=${true} shade=${i ? [true, false] : null} items=${items} hot=${i ? Ac : []} label="U with the circle A" /></div>
      <p className="dmv2-res">${i ? `A′ = ${fmt(Ac)}` : `U = ${fmt(U)}`}</p>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3] every set identity checked with two Venn diagrams ── */
  const LAWS = [['Identity', ['A ∪ ∅ = A', 'A ∩ U = A']], ['Domination', ['A ∪ U = U', 'A ∩ ∅ = ∅']], ['Idempotent', ['A ∪ A = A', 'A ∩ A = A']], ['Complementation', ['(Aᶜ)ᶜ = A']],
    ['Commutative', ['A ∪ B = B ∪ A', 'A ∩ B = B ∩ A']], ['Associative', ['A ∪ (B ∪ C) = (A ∪ B) ∪ C', 'A ∩ (B ∩ C) = (A ∩ B) ∩ C']], ['Distributive', ['A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)', 'A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)']],
    ['De Morgan', ['(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ', '(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ']], ['Absorption', ['A ∪ (A ∩ B) = A', 'A ∩ (A ∪ B) = A']], ['Complement', ['A ∪ Aᶜ = U', 'A ∩ Aᶜ = ∅']]];
  const DESC = {
    en: x => x.k === 'v' ? (x.v === 'U' ? 'the whole rectangle U' : x.v === '∅' ? 'nothing (∅ is empty)' : 'the circle ' + x.v) : x.k === 'c' ? 'everything in U outside it' : x.o === '∪' ? 'everything shaded in either part' : x.o === '∩' ? 'only what both parts share' : 'the first part without the second',
    ar: x => x.k === 'v' ? (x.v === 'U' ? 'المستطيل U كله' : x.v === '∅' ? 'مفيش حاجة متضلّلة لأن الـ ∅ فاضية' : 'الدايرة ' + x.v) : x.k === 'c' ? 'كل حاجة في U برّه الجزء ده' : x.o === '∪' ? 'كل اللي متضلّل في أي جزء فيهم' : x.o === '∩' ? 'اللي مشترك بين الجزئين بس' : 'الجزء الأول من غير التاني'
  };
  function IdentityLaws({ ar }) {
    const [law, setLaw] = useState(0), [form, setForm] = useState(0), [own, setOwn] = useState({ L: 'Aᶜ ∩ B', R: 'B − A' }), [fld, setFld] = useState('L');
    const isOwn = law === 'own';
    let Ls, Rs, err = '';
    if (isOwn) { Ls = own.L; Rs = own.R; } else { [Ls, Rs] = LAWS[law][1][Math.min(form, LAWS[law][1].length - 1)].split(' = '); }
    let Ln = null, Rn = null;
    try { Ln = parseEx(Ls); Rn = parseEx(Rs); } catch (e) { err = 'Use A, B, C, U, ∅ with ∪ ∩ − ᶜ and brackets; put brackets between different operations, like A ∪ (B ∩ C).'; Ln = Rn = null; }
    const n = Ln ? Math.max(1, nvars(Ln), nvars(Rn)) : 1;
    const steps = [];
    if (Ln) {
      const sl = subs(Ln), sr = subs(Rn);
      sl.forEach((x, j) => steps.push({ side: 0, x, en: `First side, step ${j + 1}: shade ${DESC.en(x)}.<span class="ltr">${str(x)}</span>`, ar: `الطرف الأول (خطوة ${j + 1})، بنضلّل ${DESC.ar(x)}:<span class="ltr">${str(x)}</span>` }));
      sr.forEach((x, j) => steps.push({ side: 1, x, en: `Second side, step ${j + 1}: shade ${DESC.en(x)}.<span class="ltr">${str(x)}</span>`, ar: `الطرف التاني (خطوة ${j + 1})، بنضلّل ${DESC.ar(x)}:<span class="ltr">${str(x)}</span>` }));
    }
    const same = Ln && regs(n).every(m => ev(Ln, m) === ev(Rn, m));
    const name = isOwn ? '' : LAWS[law][0];
    steps.push(same
      ? { side: 2, en: `Both sides shade exactly the same regions, for any sets A, B, C: the identity holds.` + (name ? ` This is the <b>${name}</b> law.` : ''), ar: `الطرفين بيضلّلوا نفس الأجزاء بالظبط لأي sets، يبقى الـ identity صح.` + (name ? ` وده الـ <b>${name}</b> law.` : '') }
      : { side: 2, en: Ln ? 'The two sides shade different regions, so this is not an identity.' : 'Fix the expressions to compare them.', ar: Ln ? 'الطرفين بيضلّلوا أجزاء مختلفة، يبقى دي مش identity.' : 'صلّح الـ expressions عشان نقارنهم.' });
    const key = [law, form, Ls, Rs].join('|');
    const [i0, ctl] = useSteps(steps.length, 2000), i = Math.min(i0, steps.length - 1);
    const first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } ctl.replay(); }, [key]);
    const st = steps[i], last = side => { for (let j = i; j >= 0; j--) if (steps[j].side === side) return steps[j].x; return null; };
    const fin = st.side === 2, ok = fin && same, bad = fin && Ln && !same;
    const pan = (side, title) => { const x = fin ? (side ? Rn : Ln) : last(side); return html`<div className=${'dmv2-pan' + (x ? '' : ' dmv2-off') + (ok ? ' dmv2-good' : bad ? ' dmv2-bad' : '')}>
      <div className="dmv2-ph">${title}</div><div className="dmv2-pe">${x ? str(x) : '…'}</div>
      <${Venn} n=${n} shade=${x ? shadeOf(x, n) : null} label=${title + (x ? ': ' + str(x) : '')} /></div>`; };
    const ins = t => { if (t === '⌫') setOwn(Object.assign({}, own, { [fld]: own[fld].slice(0, -1) })); else setOwn(Object.assign({}, own, { [fld]: own[fld] + t })); };
    return html`<figure className="fig dmv2"><div className="fig-stage"><div className="dmv2-w">
      <${Chips} items=${LAWS.map((l, j) => [j, l[0]]).concat([['own', 'Try your own']])} on=${law} set=${k => { setLaw(k); setForm(0); }} />
      ${!isOwn && LAWS[law][1].length > 1 && html`<${Chips} items=${LAWS[law][1].map((t, j) => [j, t])} on=${form} set=${setForm} />`}
      ${isOwn && html`<div className="dmv2-in">${['L', 'R'].map(q => html`<${React.Fragment} key=${q}><label htmlFor=${'dmv2-l' + q}>${q === 'L' ? 'side 1' : 'side 2'}</label><input id=${'dmv2-l' + q} value=${own[q]} onFocus=${() => setFld(q)} onInput=${e => setOwn(Object.assign({}, own, { [q]: e.target.value }))} /></${React.Fragment}>`)}</div>
        <div className="dmv2-keys">${['A', 'B', 'C', 'U', '∅', '∪', '∩', '−', 'ᶜ', '(', ')', '⌫'].map(t => html`<button key=${t} onClick=${() => ins(t)} aria-label=${'type ' + t}>${t}</button>`)}</div>
        ${err && html`<p className="dmv2-err">${err}</p>`}`}
      ${Ln && html`<p className="dmv2-law">${str(Ln)} = ${str(Rn)}</p>`}
      <div className="dmv2-two">${pan(0, 'Side 1')}${pan(1, 'Side 2')}</div>
      ${fin && Ln && html`<p className=${'dmv2-verdict ' + (same ? 'dmv2-good' : 'dmv2-bad')}>${same ? '✓ same regions: identity holds' : '✗ different regions'}</p>`}
    </div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4] sets mirror logic: Venn regions = truth-table rows ── */
  const MIRROR = [['∪ ↔ ∨', [['A ∪ B', 'p ∨ q']]], ['∩ ↔ ∧', [['A ∩ B', 'p ∧ q']]], ['Aᶜ ↔ ¬p', [['Aᶜ', '¬p']]], ['U ↔ T', [['U', 'T']]], ['∅ ↔ F', [['∅', 'F']]], ['De Morgan', [['(A ∩ B)ᶜ', '¬(p ∧ q)'], ['Aᶜ ∪ Bᶜ', '¬p ∨ ¬q']]]];
  const ROWS = [[true, true, 3], [true, false, 1], [false, true, 2], [false, false, 0]];
  const PART = { en: ['the overlap of A and B', 'the part of A outside B', 'the part of B outside A', 'the part of U outside both circles'], ar: ['الجزء المشترك بين A وB', 'الجزء من A اللي برّه B', 'الجزء من B اللي برّه A', 'الجزء من U اللي برّه الدايرتين'] };
  function IdentityLogic({ ar }) {
    const [c, setC] = useState(0), cols = MIRROR[c][1], nodes = cols.map(x => parseEx(x[0]));
    const [i, ctl] = useSteps(6, 1900);
    const tf = b => b ? 'T' : 'F', S0 = cols[0][0], L0 = cols[0][1];
    let en; const T = {};
    if (i === 0) { en = `Read A as p ("x ∈ A") and B as q ("x ∈ B"). Each region of the Venn diagram is one row of the truth table.<span class="ltr">${cols.map(x => x[0] + '  ↔  ' + x[1]).join('   ≡   ')}</span>`; T.ar = `اقرا A على إنها p يعني <bdi dir="ltr">x&nbsp;∈&nbsp;A</bdi>، وB على إنها q. وكل حتة في الـ Venn هي صف من الـ truth table:<span class="ltr">${cols.map(x => x[0] + '  ↔  ' + x[1]).join('   ≡   ')}</span>`; }
    else if (i <= 4) { const [p, q, m] = ROWS[i - 1], v = ev(nodes[0], m) ? 'T' : 'F', sh = v === 'T';
      en = `Row p = ${tf(p)}, q = ${tf(q)} is ${PART.en[i - 1]}: ${L0} is ${v}, so that part is ${sh ? '' : 'not '}shaded in ${S0}.`;
      T.ar = `الصف ده <bdi dir="ltr">p&nbsp;=&nbsp;${tf(p)}</bdi> و <bdi dir="ltr">q&nbsp;=&nbsp;${tf(q)}</bdi> هو ${PART.ar[i - 1]}، وقيمة الـ formula هنا ${v} فالجزء ده ${sh ? 'متضلّل' : 'مش متضلّل'}.`; }
    else if (cols.length > 1) { en = 'Both columns agree on every row, just as both sides of De Morgan shade the same regions.<span class="ltr">(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ   ↔   ¬(p ∧ q) ≡ ¬p ∨ ¬q</span>'; a = 'العمودين متطابقين في كل صف، زي ما طرفين الـ De Morgan بيضلّلوا نفس الأجزاء:<span class="ltr">(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ   ↔   ¬(p ∧ q) ≡ ¬p ∨ ¬q</span>'; }
    else { en = `The rows where ${L0} is T are exactly the shaded parts of ${S0}.` + (S0 === 'U' ? ' U shades everything, like a tautology is always T.' : S0 === '∅' ? ' ∅ shades nothing, like a contradiction is always F.' : ''); T.ar = `الصفوف اللي الـ formula فيها T هي بالظبط الأجزاء المتضلّلة.` + (S0 === 'U' ? ' والـ U بتضلّل كله، زي الـ tautology اللي دايمًا T.' : S0 === '∅' ? ' والـ ∅ مش بتضلّل حاجة، زي الـ contradiction اللي دايمًا F.' : ''); }
    const cur = i >= 1 && i <= 4 ? i - 1 : -1;
    return html`<figure className="fig dmv2"><div className="fig-stage"><div className="dmv2-w">
      <${Chips} items=${MIRROR.map((x, j) => [j, x[0]])} on=${c} set=${k => { setC(k); ctl.replay(); }} />
      <div className="dmv2-lg">
        <div className="dmv2-venn"><${Venn} n=${2} shade=${shadeOf(nodes[0], 2)} mark=${cur >= 0 ? ROWS[cur][2] : null} label=${'Venn diagram of ' + S0} /><p className="dmv2-res">${cols.map(x => x[0]).join(' = ')}</p></div>
        <table className="dmv2-tab"><thead><tr><th>p</th><th>q</th>${cols.map(x => html`<th key=${x[1]}>${x[1]}</th>`)}</tr></thead>
          <tbody>${ROWS.map(([p, q, m], r) => html`<tr key=${r} className=${r === cur ? 'dmv2-now' : ''}><td>${tf(p)}</td><td>${tf(q)}</td>${nodes.map((nd, j) => { const v = ev(nd, m); return html`<td key=${j} className=${v ? 'dmv2-in1' : ''}>${tf(v)}</td>`; })}</tr>`)}</tbody></table>
      </div>
    </div></div>
      <${Cap} en=${en} ar=${T.ar} showAr=${ar} /><${Bar} steps=${Array(6).fill(0)} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5] the exam method: complements first, then element by element ── */
  const CALC = [{ e: 'Aᶜ ∩ B', sc: 'B − A' }, { e: 'Aᶜ ∩ Bᶜ', sc: '(A ∪ B)ᶜ' }, { e: 'A ∪ Bᶜ', sc: null }, { e: 'Aᶜ ∪ Bᶜ', sc: '(A ∩ B)ᶜ' }];
  function OpsCalc({ ar }) {
    const EX = { U: '1..10', A: '1, 2, 4, 5', B: '1, 3, 7, 8, 9' };
    const [mode, setMode] = useState('ex'), [f, setF] = useState(EX), [q, setQ] = useState(0);
    const d = mode === 'own' ? f : EX;
    let U = [], A = [], B = [], err = '';
    try { U = sortS(parseSet(d.U)); A = parseSet(d.A); B = parseSet(d.B); } catch (e) { err = 'Write each set as elements separated by commas (ranges like 1..10).'; }
    if (!err && (!U.length || U.length > 16)) err = 'U needs 1 to 16 elements.';
    if (!err && uni(A, B).some(x => !has(U, x))) err = 'Every element of A and B must also be in U.';
    if (err) { U = []; A = []; B = []; }
    const C = CALC[q], node = parseEx(C.e), L = node.a, R = node.b, S = { A, B };
    const Ls = str(L), Rs = str(R), op = node.o, res = setOf(node, U, S);
    const cps = [['A', 'Aᶜ'], ['B', 'Bᶜ']].filter(([, c]) => C.e.includes(c));
    const steps = [{ k: 'c' }].concat(U.map(x => ({ k: 'x', x })), [{ k: 'end' }]);
    const key = [mode, q, U.join(), A.join(), B.join()].join('|');
    const [i0, ctl] = useSteps(steps.length, 1300), i = Math.min(i0, steps.length - 1);
    const first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } ctl.replay(); }, [key]);
    const st = steps[i], inL = x => setOf(L, [x], S).length > 0, inR = x => setOf(R, [x], S).length > 0;
    const cl = cps.map(([s, c]) => `${c} = U − ${s} = ${fmt(setOf(parseEx(c), U, S))}`);
    let en; const T = {};
    if (st.k === 'c') { en = `<b>Step 1</b>: write the complement explicitly, ${cps.map(c => c[1] + ' = U − ' + c[0]).join(' and ')}.` + cl.map(t => `<span class="ltr">${t}</span>`).join(''); a = '<b>الخطوة الأولى</b>: اكتب الـ complement صريح:' + cl.map(t => `<span class="ltr">${t}</span>`).join(''); }
    else if (st.k === 'x') { const x = st.x, l = inL(x), r = inR(x), y = op === '∩' ? l && r : l || r;
      en = `<b>Step 2</b>, element ${x}: in ${Ls}? ${l ? 'yes' : 'no'}. In ${Rs}? ${r ? 'yes' : 'no'}. ${op === '∩' ? '∩ needs both' : '∪ needs at least one'}, so ${x} is ${y ? 'in' : 'out'}.`;
      T.ar = `<b>الخطوة التانية</b>، بنشوف الـ ${x}: موجود في <bdi dir="ltr">${Ls}</bdi>؟ ${l ? 'أيوه' : 'لأ'}. وموجود في <bdi dir="ltr">${Rs}</bdi>؟ ${r ? 'أيوه' : 'لأ'}. ${op === '∩' ? 'والـ ∩ محتاج الاتنين' : 'والـ ∪ يكفيه واحد'}، فالـ ${x} ${y ? 'داخل' : 'برّه'}.`; }
    else { const sv = C.sc ? setOf(parseEx(C.sc), U, S) : null;
      en = `Done: ${C.e} = ${fmt(res)}.` + (C.sc ? ` Shortcut check:<span class="ltr">${C.e} = ${C.sc} = ${fmt(sv)}</span>` : '');
      T.ar = `خلصنا، والناتج:<span class="ltr">${C.e} = ${fmt(res)}</span>` + (C.sc ? `والـ shortcut بيدّي نفس الناتج:<span class="ltr">${C.e} = ${C.sc} = ${fmt(sv)}</span>` : ''); }
    const shown = x => st.k === 'end' || (st.k === 'x' && U.indexOf(x) <= U.indexOf(st.x));
    const yes = b => b ? '✓' : '·';
    return html`<figure className="fig dmv2"><div className="fig-stage"><div className="dmv2-w">
      <${Chips} items=${[['ex', 'Exam 2023/24'], ['own', 'Try your own']]} on=${mode} set=${setMode} />
      <${Chips} items=${CALC.map((c, j) => [j, c.e])} on=${q} set=${setQ} />
      <div className="dmv2-cx"><div>U = ${fmt(U)}</div><div>A = ${fmt(A)}</div><div>B = ${fmt(B)}</div>${cl.map(t => html`<div key=${t} style=${{ color: 'var(--fig-k)' }}>${t}</div>`)}</div>
      ${mode === 'own' && html`<div className="dmv2-in" style=${{ margin: '0 auto 10px' }}>${['U', 'A', 'B'].map(k => html`<${React.Fragment} key=${k}><label htmlFor=${'dmv2-c' + k}>${k} =</label><input id=${'dmv2-c' + k} value=${f[k]} onInput=${e => setF(Object.assign({}, f, { [k]: e.target.value }))} /></${React.Fragment}>`)}</div>${err && html`<p className="dmv2-err">${err}</p>`}`}
      <table className="dmv2-tab dmv2-calc"><thead><tr><th>x</th><th>${Ls}</th><th>${Rs}</th><th>${C.e}</th></tr></thead>
        <tbody>${U.map(x => { const s = shown(x), l = inL(x), r = inR(x), y = op === '∩' ? l && r : l || r; return html`<tr key=${x} className=${st.k === 'x' && st.x === x ? 'dmv2-now' : ''}><th>${x}</th>
          <td className=${s ? (l ? 'dmv2-yes' : 'dmv2-no') : 'dmv2-hide'}>${yes(l)}</td><td className=${s ? (r ? 'dmv2-yes' : 'dmv2-no') : 'dmv2-hide'}>${yes(r)}</td><td className=${s ? (y ? 'dmv2-in1' : 'dmv2-no') : 'dmv2-hide'}>${s && y ? x : '·'}</td></tr>`; })}</tbody></table>
      ${st.k === 'end' && html`<p className="dmv2-res">${C.e} = ${fmt(res)}</p>`}
    </div></div>
      <${Cap} en=${en} ar=${T.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'dm-ops-venn': OpsVenn, 'dm-ops-product': OpsProduct, 'dm-ops-ex1': OpsEx1, 'dm-ops-subset': OpsSubset, 'dm-ops-compl': OpsCompl,
    'dm-identity-laws': IdentityLaws, 'dm-identity-logic': IdentityLogic, 'dm-ops-calc': OpsCalc
  });
})();
/* ── part L11 ── */
// Discrete Mathematics visuals, Lecture 11 (Exam extras: mathematical induction and relations): induction as dominoes, the four exam proofs line by line with number checks, A × B built cell by cell, relations and I_A as arrow diagrams, properties of a relation on A checked live (built from the notes; the Lec_11 deck covers graphs). Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.dmv11{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.dmv11 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dmv11 .fig-btn[aria-pressed="true"]{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 16%, var(--paper)); }
.dmv11-wrap{ max-width:560px; margin:0 auto; color:var(--ink); min-width:0; }
.dmv11-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dmv11-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dmv11-row{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; align-items:center; margin:6px 0; }
.dmv11-row .fig-btn{ font-size:.86rem; padding:4px 10px; min-width:34px; }
.dmv11-muted{ color:var(--graphite); font-size:.84rem; }
.dmv11-sbar{ font:600 .84rem var(--mono); color:var(--graphite); }
.dmv11-ok{ color:var(--ok); font-weight:700; } .dmv11-no{ color:var(--pen); font-weight:700; }
/* dominoes */
.dmv11-dom{ display:flex; justify-content:center; align-items:flex-end; gap:14px; height:92px; margin:6px 0 4px; }
.dmv11-dm{ display:flex; flex-direction:column; align-items:center; width:24px; }
.dmv11-dm i{ display:block; width:15px; height:58px; border-radius:3px; border:2px solid var(--ink); background:var(--paper); transform-origin:100% 100%; transition:transform .45s ease-in, background .3s; }
.dmv11-dm.f i{ transform:rotate(58deg); }
.dmv11-dm.as i{ background:color-mix(in srgb, var(--k-compiler) 35%, var(--paper)); border-style:dashed; }
.dmv11-dm.hot i{ background:color-mix(in srgb, var(--k-compiler) 55%, var(--paper)); }
.dmv11-dm.done i{ background:color-mix(in srgb, var(--ok) 35%, var(--paper)); }
.dmv11-dm span{ font:700 .84rem var(--mono); margin-top:6px; white-space:nowrap; }
.dmv11-dm.gap{ width:14px; } .dmv11-dm.gap span{ font-size:1rem; color:var(--graphite); }
.dmv11-chk{ display:grid; gap:5px; margin-top:8px; }
.dmv11-chk div{ display:grid; grid-template-columns:auto minmax(0,1fr) auto; gap:8px; align-items:center; border:1px solid var(--line); border-radius:9px; padding:6px 9px; background:var(--paper); font-size:.88rem; transition:box-shadow .3s; }
.dmv11-chk div.on{ box-shadow:0 0 0 2px var(--k-compiler); }
.dmv11-chk .n{ font:700 .84rem var(--mono); color:var(--k-compiler); }
.dmv11-chk .m{ font:600 .86rem var(--mono); }
/* proofs */
.dmv11-pl{ display:grid; gap:4px; margin:8px 0 0; }
.dmv11-ln{ border:1px solid var(--line); border-radius:9px; padding:5px 9px; background:var(--paper); transition:box-shadow .3s, opacity .3s; }
.dmv11-ln.cur{ box-shadow:0 0 0 2px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 8%, var(--paper)); }
.dmv11-ln.hid{ opacity:0; }
.dmv11-ln .t{ display:block; font-size:.78rem; font-weight:700; color:var(--graphite); }
.dmv11-ln .f{ display:block; font:600 .9rem/1.35 var(--mono); overflow-wrap:anywhere; }
.dmv11-pic{ display:block; width:100%; max-width:300px; margin:0 auto; overflow:visible; }
.dmv11-pic text{ font:700 15px var(--mono); fill:var(--ink); }
.dmv11-pic .st{ fill:var(--paper-2); stroke:var(--line); }
.dmv11-pic .as{ fill:color-mix(in srgb, var(--k-compiler) 30%, var(--paper)); stroke:var(--k-compiler); }
.dmv11-pic .nw{ fill:color-mix(in srgb, var(--pen) 30%, var(--paper)); stroke:var(--pen); }
.dmv11-pic .ok{ fill:color-mix(in srgb, var(--ok) 30%, var(--paper)); stroke:var(--ok); }
.dmv11-pic rect{ transition:height .35s, y .35s; }
.dmv11-lab{ text-align:center; font:600 .84rem var(--mono); color:var(--graphite); margin:2px 0 0; }
.dmv11-ck{ display:grid; gap:5px; margin-top:8px; }
.dmv11-ck div{ border:1px solid var(--line); border-radius:9px; padding:5px 9px; background:var(--paper); }
.dmv11-ck .t{ display:block; font-size:.78rem; font-weight:700; color:var(--graphite); }
.dmv11-ck .f{ display:block; font:600 .9rem/1.35 var(--mono); overflow-wrap:anywhere; }
.dmv11-hb{ display:grid; grid-template-columns:3.6em minmax(0,1fr) auto; gap:4px 8px; align-items:center; margin:4px 0; transition:opacity .3s; }
.dmv11-hb.hid{ opacity:0; }
.dmv11-hb .l{ font:700 .9rem var(--mono); text-align:right; }
.dmv11-hb .tr{ height:18px; border-radius:5px; background:var(--paper-2); overflow:hidden; }
.dmv11-hb .tr i{ display:block; height:100%; min-width:3px; border-radius:5px; transition:width .4s; }
.dmv11-hb .v{ font:700 .9rem var(--mono); min-width:2.6em; text-align:right; }
.dmv11-hb .c0 i{ background:color-mix(in srgb, var(--k-compiler) 55%, var(--paper)); }
.dmv11-hb .c1 i{ background:color-mix(in srgb, var(--pen) 50%, var(--paper)); }
.dmv11-hb .c2 i{ background:color-mix(in srgb, var(--ok) 50%, var(--paper)); }
/* relations */
.dmv11-gw{ display:flex; justify-content:center; }
.dmv11-g{ border-collapse:collapse; font:600 .86rem var(--mono); color:var(--ink); background:var(--paper); }
.dmv11-g th, .dmv11-g td{ border:1px solid var(--line); padding:0; text-align:center; }
.dmv11-g th{ background:var(--paper-2); font-weight:700; padding:4px 7px; }
.dmv11-g th.c{ color:var(--k-compiler); }
.dmv11-g td{ min-width:46px; height:34px; transition:background .3s, box-shadow .3s; }
.dmv11-g td button{ all:unset; display:block; width:100%; height:100%; min-height:34px; line-height:34px; cursor:pointer; box-sizing:border-box; padding:0 3px; }
.dmv11-g td button:focus-visible{ outline:2px solid var(--k-compiler); outline-offset:-2px; }
.dmv11-g td.in{ background:color-mix(in srgb, var(--k-compiler) 24%, var(--paper)); }
.dmv11-g td.cur{ box-shadow:inset 0 0 0 2px var(--k-compiler); }
.dmv11-g td.off{ color:var(--faint); }
.dmv11-g td.dg{ background:color-mix(in srgb, var(--ok) 22%, var(--paper)); }
.dmv11-g td.w{ box-shadow:inset 0 0 0 3px var(--pen); }
.dmv11-g td.wm{ outline:2px dashed var(--pen); outline-offset:-4px; }
.dmv11-g .hid{ visibility:hidden; }
.dmv11-set{ font:600 .9rem/1.45 var(--mono); text-align:center; overflow-wrap:anywhere; margin:8px 0 0; }
.dmv11-set b{ color:var(--k-compiler); }
.dmv11-cnt{ text-align:center; font:700 1rem var(--mono); margin:8px 0 0; }
.dmv11-arw{ display:block; width:100%; max-width:260px; margin:0 auto 6px; }
.dmv11-arw text{ font:700 15px var(--mono); fill:var(--ink); text-anchor:middle; dominant-baseline:central; }
.dmv11-arw .hd{ font:700 14px var(--body); fill:var(--graphite); }
.dmv11-arw ellipse{ fill:none; stroke:var(--line); stroke-width:1.5; }
.dmv11-arw circle{ fill:var(--paper); stroke:var(--ink); stroke-width:1.5; }
.dmv11-arw .e{ stroke:var(--k-compiler); stroke-width:2; fill:none; }
.dmv11-arw .e.w{ stroke:var(--pen); stroke-width:3; }
.dmv11-arw .ah{ fill:var(--k-compiler); } .dmv11-arw .ahw{ fill:var(--pen); }
.dmv11-stm{ display:flex; flex-wrap:wrap; justify-content:center; gap:5px; margin:8px 0 0; }
.dmv11-stm span{ font:700 .92rem var(--body); border:1px solid var(--line); border-radius:99px; padding:2px 9px; }
.dmv11-stm span.y{ border-color:var(--k-compiler); color:var(--k-compiler); }
.dmv11-stm span.n{ color:var(--graphite); }
.dmv11-pr{ display:grid; gap:5px; margin-top:8px; }
.dmv11-pr button{ all:unset; box-sizing:border-box; cursor:pointer; display:grid; grid-template-columns:minmax(0,1fr) auto; gap:2px 8px; align-items:center; border:1px solid var(--line); border-radius:9px; padding:6px 9px; background:var(--paper); }
.dmv11-pr button:focus-visible{ outline:2px solid var(--k-compiler); }
.dmv11-pr button.sel{ box-shadow:0 0 0 2px var(--pen); }
.dmv11-pr button.yes{ background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.dmv11-pr .nm{ font-weight:700; font-size:.92rem; }
.dmv11-pr .df{ grid-column:1 / -1; font:600 .82rem/1.35 var(--mono); color:var(--graphite); overflow-wrap:anywhere; }
.dmv11-pr .wt{ grid-column:1 / -1; font:600 .84rem/1.35 var(--mono); color:var(--pen); overflow-wrap:anywhere; }
.dmv11-pr .vv{ font:700 1.05rem var(--mono); }
`;
  if (!document.getElementById('dmv11-css')) { const s = document.createElement('style'); s.id = 'dmv11-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = s => `<span class="ltr">${s}</span>`, B = s => `<bdi dir="ltr">${s.replace(/ /g, '&nbsp;')}</bdi>`;
  const Modes = ({ list, mode, set }) => html`<div className="dmv11-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setPlay(!calm()); setI(calm() ? n - 1 : 0); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => Math.min(x + 1, n - 1)), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); }, end: () => { setPlay(false); setI(n - 1); } }];
  }
  const WBar = ({ n, i, ctl }) => html`<div className="fig-bar"><span className="dmv11-sbar">${i + 1} / ${n}</span><span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i === n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.end} disabled=${i === n - 1}>End ⏭</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;

  /* ───────── [1] the principle: falling dominoes ───────── */
  const DOMS = ['1', '2', '3', '…', 'k', 'k+1', '…'];
  const DSTEPS = [
    { en: 'To prove P(n) for all n ≥ n₀, picture one domino for each value of n: 1, 2, 3, …, k, k + 1, … (here n₀ = 1).', ar: 'عشان تثبت إن ' + B('P(n)') + ' صح لكل ' + B('n ≥ n₀') + ' تخيّل دومينو لكل قيمة من قيم الـ n:' + L('1, 2, 3, …, k, k + 1, …') + 'وهنا الـ ' + B('n₀ = 1') + '.' },
    { en: '<b>1. Basis step</b>: show P(n₀) is true, usually n = 1. The first domino falls.', ar: 'أولًا، الـ <b>Basis step</b>: اثبت إن ' + B('P(n₀)') + ' صح، وغالبًا ' + B('n = 1') + '. كده أول دومينو وقعت.' },
    { en: '<b>2. Inductive hypothesis</b>: assume P(k) is true for an arbitrary k ≥ n₀. Domino k is assumed down (dashed: assumed, not proved).', ar: 'تانيًا، الـ <b>Inductive hypothesis</b>: افترض إن ' + B('P(k)') + ' صح لأي ' + B('k ≥ n₀') + '. يعني بنفترض إن الدومينو رقم k وقعت (المتقطّعة دي افتراض مش إثبات).' },
    { en: '<b>3. Inductive step</b>: using the hypothesis, prove P(k + 1). Whenever domino k falls it knocks over domino k + 1.', ar: 'تالتًا، الـ <b>Inductive step</b>: باستخدام الفرض اثبت ' + B('P(k + 1)') + '. يعني أي دومينو k لما توقع بتوقّع الدومينو ' + B('k + 1') + ' اللي بعدها.' },
    { en: '<b>Conclusion</b>: domino 1 falls, it knocks 2, 2 knocks 3, and so on: P(n) is true for all n ≥ n₀.', ar: 'النتيجة: الدومينو 1 بتوقع وتوقّع 2، و 2 توقّع 3 وهكذا، يبقى ' + B('P(n)') + ' صح لكل ' + B('n ≥ n₀') + '.' }
  ];
  function InductionDomino({ ar }) {
    const [i, ctl] = useSteps(DSTEPS.length, 2300), [miss, setMiss] = useState('none');
    let cap = DSTEPS[i];
    const fall = j => {
      if (i === 0) return '';
      if (i === 1) return j === 0 ? 'f hot' : '';
      if (i === 2) return j === 4 ? 'f as' : '';
      if (i === 3) return j === 4 ? 'f as' : j === 5 ? 'f hot' : '';
      if (miss === 'basis') return '';
      if (miss === 'step') return j === 0 ? 'f done' : '';
      return 'f done';
    };
    if (i === 4 && miss === 'basis') cap = { en: 'Without the <b>basis step</b> nothing starts: "P(k) gives P(k + 1)" is useless if no domino ever falls. Both steps are needed.', ar: 'من غير الـ <b>basis step</b> مفيش حاجة بتبدأ: إن ' + B('P(k)') + ' بتدّي ' + B('P(k + 1)') + ' ملهاش لازمة لو مفيش ولا دومينو وقعت. لازم الخطوتين.' };
    if (i === 4 && miss === 'step') cap = { en: 'Without the <b>inductive step</b> only P(1) is proved: the first domino falls and nothing pushes the next. Both steps are needed.', ar: 'من غير الـ <b>inductive step</b> إحنا أثبتنا ' + B('P(1)') + ' بس: أول دومينو وقعت ومفيش حاجة بتزقّ اللي بعدها. لازم الخطوتين.' };
    const on = [i === 1, i === 2, i === 3];
    return html`<figure className="fig dmv11"><div className="fig-stage"><div className="dmv11-wrap">
      <div className="dmv11-dom" aria-hidden="true">${DOMS.map((d, j) => d === '…' ? html`<div key=${j} className="dmv11-dm gap"><span>…</span></div>`
        : html`<div key=${j} className=${'dmv11-dm ' + fall(j)}><i style=${{ transitionDelay: i === 4 && !calm() ? (j * 0.22) + 's' : '0s' }}></i><span>${d}</span></div>`)}</div>
      <div className="dmv11-chk">
        <div className=${on[0] ? 'on' : ''}><span className="n">1</span><span>Basis step</span><span className="m">P(n₀)</span></div>
        <div className=${on[1] ? 'on' : ''}><span className="n">2</span><span>Inductive hypothesis</span><span className="m">assume P(k)</span></div>
        <div className=${on[2] ? 'on' : ''}><span className="n">3</span><span>Inductive step</span><span className="m">P(k + 1)</span></div></div>
      ${i === 4 && html`<div className="dmv11-row" role="group" aria-label="Drop a step"><span className="dmv11-muted">What if:</span>
        ${[['none', 'Both steps'], ['basis', 'No basis'], ['step', 'No inductive step']].map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(miss === k)} onClick=${() => setMiss(k)}>${t}</button>`)}</div>`}
      </div></div><${Cap} ...${cap} showAr=${ar} /><${Bar} steps=${DSTEPS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [2] [3] [4] sum proofs: proof line by line + check with numbers ───────── */
  const SUMS = {
    n: {
      term: i => i, F: n => n * (n + 1) / 2, rhs: n => `${n}(${n} + 1)/2`, src: 'Exam 2024/25 Q3a', srcAr: 'من امتحان <bdi dir="ltr">2024/25</bdi>، سؤال <bdi dir="ltr">Q3a</bdi>', newT: '(k + 1)', fm: 'n(n + 1)/2',
      lines: [
        { t: 'Basis (n = 1)', f: 'LHS = 1, RHS = 1(2)/2 = 1 ✓', st: 'basis', en: '<b>Basis step</b> (n = 1): the left side is the first term, 1; the right side is 1(2)/2 = 1. Equal, so P(1) is true.', ar: 'الـ <b>Basis step</b> عند ' + B('n = 1') + ': الطرف الشمال هو أول حد بس، والطرفين:' + L('LHS = 1, RHS = 1(2)/2 = 1') + 'متساويين، يبقى ' + B('P(1)') + ' صح.' },
        { t: 'Hypothesis', f: 'assume 1 + 2 + … + k = k(k + 1)/2', st: 'hyp', en: '<b>Inductive hypothesis</b>: assume the formula is true for n = k (picture: the first k columns, drawn with k = 4).', ar: 'الـ <b>Inductive hypothesis</b>: افترض إن الصيغة صح عند ' + B('n = k') + ':' + L('1 + 2 + … + k = k(k + 1)/2') + 'والرسمة فيها أول k أعمدة (مرسومة بـ ' + B('k = 4') + ').' },
        { t: 'Step (n = k + 1)', f: '1 + 2 + … + k + (k + 1) = k(k + 1)/2 + (k + 1)', st: 'step', en: '<b>Inductive step</b>: the sum up to k + 1 is the sum up to k plus one new column, the term (k + 1). Replace the first k terms by the hypothesis.', ar: 'الـ <b>Inductive step</b>: المجموع لحد ' + B('k + 1') + ' هو المجموع لحد الـ k زائد عمود جديد هو الحد ' + B('(k + 1)') + '. بنبدّل أول k حدود بالفرض:' + L('1 + 2 + … + k + (k + 1) = k(k + 1)/2 + (k + 1)') },
        { t: '', f: '= [k(k + 1) + 2(k + 1)]/2', st: 'step', en: 'Put both parts over the common denominator 2.', ar: 'نوحّد المقام ونخليه 2:' + L('= [k(k + 1) + 2(k + 1)]/2') },
        { t: '', f: '= (k + 1)(k + 2)/2', st: 'step', en: 'Take (k + 1) out as a common factor.', ar: 'ناخد ' + B('(k + 1)') + ' عامل مشترك:' + L('= (k + 1)(k + 2)/2') },
        { t: '', f: '= (k + 1)((k + 1) + 1)/2 ✓', st: 'step', en: 'This is n(n + 1)/2 with n = k + 1, so P(k + 1) is true.', ar: 'ودي هي ' + B('n(n + 1)/2') + ' لما ' + B('n = k + 1') + '، يبقى ' + B('P(k + 1)') + ' صح:' + L('= (k + 1)((k + 1) + 1)/2 ✓') },
        { t: 'Conclusion', f: 'Hence true for all n ≥ 1. ■', st: 'done', en: 'Basis + inductive step: 1 + 2 + … + n = n(n + 1)/2 for all n ≥ 1. (Exam 2024/25 Q3a)', ar: 'الـ basis مع الـ inductive step يبقى الصيغة صح لكل ' + B('n ≥ 1') + ' (من امتحان ' + B('2024/25') + '، سؤال ' + B('Q3a') + ').' }
      ]
    },
    even: {
      term: i => 2 * i, F: n => n * (n + 1), rhs: n => `${n}(${n} + 1)`, newT: '2(k + 1)', fm: 'n(n + 1)',
      lines: [
        { t: 'Basis (n = 1)', f: 'LHS = 2, RHS = 1 × 2 = 2 ✓', st: 'basis', en: '<b>Basis step</b> (n = 1): the left side is the first term, 2; the right side is 1 × 2 = 2. Equal, so P(1) is true.', ar: 'الـ <b>Basis step</b> عند ' + B('n = 1') + ': الطرف الشمال هو أول حد بس، والطرفين:' + L('LHS = 2, RHS = 1 × 2 = 2') + 'متساويين، يبقى ' + B('P(1)') + ' صح.' },
        { t: 'Hypothesis', f: '2 + 4 + … + 2k = k(k + 1)', st: 'hyp', en: '<b>Inductive hypothesis</b>: assume the formula for n = k (picture: the first k columns, drawn with k = 4).', ar: 'الـ <b>Inductive hypothesis</b>: افترض الصيغة عند ' + B('n = k') + ':' + L('2 + 4 + … + 2k = k(k + 1)') + 'والرسمة فيها أول k أعمدة (مرسومة بـ ' + B('k = 4') + ').' },
        { t: 'Step (n = k + 1)', f: '2 + 4 + … + 2k + 2(k + 1) = k(k + 1) + 2(k + 1)', st: 'step', en: '<b>Inductive step</b>: add the next term 2(k + 1), the new column, and replace the first k terms by the hypothesis.', ar: 'الـ <b>Inductive step</b>: نزوّد الحد اللي بعده ' + B('2(k + 1)') + ' وده العمود الجديد، ونبدّل أول k حدود بالفرض:' + L('2 + 4 + … + 2k + 2(k + 1) = k(k + 1) + 2(k + 1)') },
        { t: '', f: '= (k + 1)(k + 2) ✓', st: 'step', en: 'Take (k + 1) out as a common factor.', ar: 'ناخد ' + B('(k + 1)') + ' عامل مشترك:' + L('= (k + 1)(k + 2) ✓') },
        { t: '', f: '= (k + 1)((k + 1) + 1)', st: 'step', en: 'This is n(n + 1) with n = k + 1, so P(k + 1) is true.', ar: 'ودي هي ' + B('n(n + 1)') + ' لما ' + B('n = k + 1') + '، يبقى ' + B('P(k + 1)') + ' صح:' + L('= (k + 1)((k + 1) + 1)') },
        { t: 'Conclusion', f: 'True for all n ≥ 1. ■', st: 'done', en: '2 + 4 + … + 2n = n(n + 1) for all n ≥ 1. (Exam 2025/26 Q3a-i)', ar: 'يبقى الصيغة صح لكل ' + B('n ≥ 1') + ' (من امتحان ' + B('2025/26') + '، سؤال ' + B('Q3a-i') + ').' }
      ]
    },
    three: {
      term: i => 3 * i - 2, F: n => n * (3 * n - 1) / 2, rhs: n => `${n}(3·${n} − 1)/2`, newT: '3k + 1', fm: 'n(3n − 1)/2',
      lines: [
        { t: 'Basis (n = 1)', f: 'LHS = 1, RHS = 1(3 − 1)/2 = 1 ✓', st: 'basis', en: '<b>Basis step</b> (n = 1): the left side is the first term, 1; the right side is 1(3 − 1)/2 = 1. Equal, so P(1) is true.', ar: 'الـ <b>Basis step</b> عند ' + B('n = 1') + ': الطرف الشمال هو أول حد بس، والطرفين:' + L('LHS = 1, RHS = 1(3 − 1)/2 = 1') + 'متساويين، يبقى ' + B('P(1)') + ' صح.' },
        { t: 'Hypothesis', f: '1 + 4 + … + (3k − 2) = k(3k − 1)/2', st: 'hyp', en: '<b>Inductive hypothesis</b>: assume the formula for n = k (picture: the first k columns, drawn with k = 4).', ar: 'الـ <b>Inductive hypothesis</b>: افترض الصيغة عند ' + B('n = k') + ':' + L('1 + 4 + … + (3k − 2) = k(3k − 1)/2') + 'والرسمة فيها أول k أعمدة (مرسومة بـ ' + B('k = 4') + ').' },
        { t: 'Step: next term', f: '3(k + 1) − 2 = 3k + 1', st: 'step', en: '<b>Inductive step</b>: first find the next term: put k + 1 in 3n − 2 to get 3k + 1. That is the new column.', ar: 'الـ <b>Inductive step</b>: الأول نجيب الحد اللي بعده، نحط ' + B('k + 1') + ' مكان الـ n في ' + B('3n − 2') + ':' + L('3(k + 1) − 2 = 3k + 1') + 'وده العمود الجديد.' },
        { t: '', f: 'k(3k − 1)/2 + (3k + 1) = (3k² − k + 6k + 2)/2', st: 'step', en: 'Hypothesis for the first k terms, plus the new term, over the common denominator 2.', ar: 'الفرض مكان أول k حدود زائد الحد الجديد، ونوحّد المقام على 2:' + L('k(3k − 1)/2 + (3k + 1) = (3k² − k + 6k + 2)/2') },
        { t: '', f: '= (3k² + 5k + 2)/2 = (k + 1)(3k + 2)/2', st: 'step', en: 'Collect the terms and factor.', ar: 'نجمّع الحدود ونحلّل:' + L('= (3k² + 5k + 2)/2 = (k + 1)(3k + 2)/2') },
        { t: 'Compare', f: '(k + 1)(3(k + 1) − 1)/2 = (k + 1)(3k + 2)/2 ✓', st: 'step', en: 'The formula with n = k + 1 gives the same thing, so P(k + 1) is true.', ar: 'والصيغة لما ' + B('n = k + 1') + ' بتدّي نفس الحاجة، يبقى ' + B('P(k + 1)') + ' صح:' + L('(k + 1)(3(k + 1) − 1)/2 = (k + 1)(3k + 2)/2 ✓') },
        { t: 'Conclusion', f: 'True for all n ≥ 1. ■', st: 'done', en: '1 + 4 + 7 + … + (3n − 2) = n(3n − 1)/2 for all n ≥ 1. (Exam 2025/26 Q3a-ii)', ar: 'يبقى الصيغة صح لكل ' + B('n ≥ 1') + ' (من امتحان ' + B('2025/26') + '، سؤال ' + B('Q3a-ii') + ').' }
      ]
    }
  };
  // staircase: one column per term
  function Stairs({ c, n, cls, maxN }) {
    const W = 260, H = 130, top = 22, base = H - 4, mx = c.term(maxN), cw = Math.min(30, (W - 10) / maxN - 6);
    return html`<svg className="dmv11-pic" viewBox=${`0 0 ${W} ${H}`} role="img" aria-label=${'Columns of heights ' + Array.from({ length: n }, (_, j) => c.term(j + 1)).join(', ')}>
      ${Array.from({ length: maxN }, (_, j) => { const h = j < n ? (c.term(j + 1) / mx) * (base - top) : 0, x = 5 + j * (cw + 6);
        return html`<g key=${j}><rect className=${cls(j)} x=${x} y=${base - h} width=${cw} height=${h} rx="3" />
          ${j < n && html`<text x=${x + cw / 2} y=${base - h - 6} textAnchor="middle">${c.term(j + 1)}</text>`}</g>`; })}</svg>`;
  }
  function SumProof({ ar, k }) {
    const c = SUMS[k], [mode, setMode] = useState('proof'), [n, setN] = useState(4);
    const [i, ctl] = useWalk(c.lines.length, 2600, mode);
    let body, cap;
    if (mode === 'proof') {
      const ln = c.lines[i], st = ln.st, K = 4;
      const nn = st === 'basis' ? 1 : st === 'hyp' ? K : K + 1;
      const cls = j => st === 'basis' ? 'nw' : st === 'done' ? 'ok' : j < K ? 'as' : 'nw';
      const lab = st === 'basis' ? 'n = 1: one column' : st === 'hyp' ? `first k columns: ${c.F(K)} (k = ${K})` : st === 'step' ? `assumed ${c.F(K)} + new ${c.term(K + 1)} = ${c.F(K + 1)}` : 'every n ≥ 1';
      body = html`<${Stairs} c=${c} n=${nn} cls=${cls} maxN=${K + 1} /><div className="dmv11-lab">${lab}</div>
        <div className="dmv11-pl">${c.lines.map((l, j) => j <= i && html`<div key=${j} className=${'dmv11-ln' + (j === i ? ' cur' : '')}>${l.t && html`<span className="t">${l.t}</span>`}<span className="f">${l.f}</span></div>`)}</div>`;
      cap = ln;
    } else {
      const ts = Array.from({ length: n }, (_, j) => c.term(j + 1)), S = ts.reduce((a, b) => a + b, 0), F = c.F(n), kk = n - 1;
      const lhs = ts.join(' + ') + ' = ' + S, rhs = c.rhs(n) + ' = ' + F, step = kk >= 1 ? `${c.F(kk)} + ${c.term(n)} = ${c.F(kk) + c.term(n)} = ${c.rhs(n)}` : '';
      body = html`<div className="dmv11-row" role="group" aria-label="Value of n"><span className="dmv11-muted">n =</span>
          ${[1, 2, 3, 4, 5, 6, 7].map(v => html`<button key=${v} className="fig-btn" aria-pressed=${String(n === v)} onClick=${() => setN(v)}>${v}</button>`)}</div>
        <${Stairs} c=${c} n=${n} cls=${j => j === n - 1 && n > 1 ? 'nw' : 'as'} maxN=${7} />
        <div className="dmv11-ck"><div><span className="t">Left side (add the terms)</span><span className="f">${lhs}</span></div>
          <div><span className="t">Right side (formula ${c.fm})</span><span className="f">${rhs} ${S === F ? '✓' : '✗'}</span></div>
          ${kk >= 1 && html`<div><span className="t">Inductive step with k = ${kk}: formula at k + next term</span><span className="f">${step} ✓</span></div>`}</div>`;
      cap = kk >= 1
        ? { en: `n = ${n}: adding the terms gives <b>${S}</b> and the formula gives <b>${F}</b>. The step in numbers: the formula at k = ${kk} gives ${c.F(kk)}; adding the new column ${c.term(n)} gives ${F}, the formula at n = ${n}.`, ar: `عند ${B('n = ' + n)} جمع الحدود بيدّي <b>${S}</b> والصيغة بتدّي <b>${F}</b>. والـ step بالأرقام: الصيغة عند ${B('k = ' + kk)} بتدّي ${c.F(kk)}، ولما نزوّد العمود الجديد بيطلع:` + L(step) + 'ودي الصيغة عند ' + B('n = ' + n) + '.' }
        : { en: `n = 1 is the basis: one column, ${S} on both sides.`, ar: `عند ${B('n = 1')} ده الـ basis: عمود واحد وقيمته ${S} في الطرفين.` };
    }
    return html`<figure className="fig dmv11"><div className="fig-stage"><div className="dmv11-wrap">
      <${Modes} list=${[['proof', 'The proof'], ['num', 'Check with numbers']]} mode=${mode} set=${setMode} />${body}</div></div>
      <${Cap} ...${cap} showAr=${ar} />${mode === 'proof' && html`<${WBar} n=${c.lines.length} i=${i} ctl=${ctl} />`}</figure>`;
  }
  const SumN = p => html`<${SumProof} ...${p} k="n" />`;
  const SumEven = p => html`<${SumProof} ...${p} k="even" />`;
  const SumThree = p => html`<${SumProof} ...${p} k="three" />`;

  /* ───────── [5] 2ⁿ > n ───────── */
  const PLINES = [
    { t: 'Basis (n = 1)', f: '2¹ = 2 > 1 ✓', st: 0, en: '<b>Basis step</b> (n = 1): 2¹ = 2 and 2 > 1, so P(1) is true.', ar: 'الـ <b>Basis step</b> عند ' + B('n = 1') + ':' + L('2¹ = 2 > 1') + 'يبقى ' + B('P(1)') + ' صح.' },
    { t: 'Hypothesis', f: '2ᵏ > k', st: 1, en: '<b>Inductive hypothesis</b>: assume 2ᵏ > k (bars drawn with k = 3).', ar: 'الـ <b>Inductive hypothesis</b>: افترض إن ' + B('2ᵏ > k') + ' (الأعمدة مرسومة بـ ' + B('k = 3') + ').' },
    { t: 'Step', f: '2ᵏ⁺¹ = 2 · 2ᵏ', st: 2, en: '<b>Inductive step</b>: 2ᵏ⁺¹ is 2ᵏ doubled.', ar: 'الـ <b>Inductive step</b>: الـ ' + B('2ᵏ⁺¹') + ' هي ' + B('2ᵏ') + ' مضروبة في 2:' + L('2ᵏ⁺¹ = 2 · 2ᵏ') },
    { t: '', f: '> 2k', st: 3, en: 'By the hypothesis 2ᵏ > k, so doubling both sides: 2 · 2ᵏ > 2k.', ar: 'من الفرض ' + B('2ᵏ > k') + '، فلو ضربنا الطرفين في 2:' + L('2 · 2ᵏ > 2k') },
    { t: '', f: '= k + k ≥ k + 1 (since k ≥ 1) ✓', st: 4, en: '2k = k + k, and since k ≥ 1 that is at least k + 1. So 2ᵏ⁺¹ > k + 1: P(k + 1) is true.', ar: 'الـ ' + B('2k') + ' هي ' + B('k + k') + '، وبما إن ' + B('k ≥ 1') + ' تبقى على الأقل ' + B('k + 1') + ':' + L('2ᵏ⁺¹ = 2 · 2ᵏ > 2k = k + k ≥ k + 1') + 'يبقى ' + B('P(k + 1)') + ' صح.' },
    { t: 'Conclusion', f: '2ⁿ > n for all n ≥ 1. ■', st: 5, en: 'Basis + inductive step: 2ⁿ > n for all n ≥ 1.', ar: 'الـ basis مع الـ inductive step يبقى ' + B('2ⁿ > n') + ' لكل ' + B('n ≥ 1') + '.' }
  ];
  const SUP = s => String(s).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('');
  function HBars({ rows }) {
    const mx = Math.max(...rows.map(r => r.v));
    return html`<div aria-hidden="true">${rows.map((r, j) => html`<div key=${j} className=${'dmv11-hb' + (r.hid ? ' hid' : '')}>
      <span className="l">${r.l}</span><span className=${'tr c' + r.c}><i style=${{ width: (r.hid ? 0 : r.v / mx * 100) + '%' }}></i></span><span className="v">${r.v}</span></div>`)}</div>`;
  }
  function InductionPow2({ ar }) {
    const [mode, setMode] = useState('proof'), [k, setK] = useState(3);
    const [i, ctl] = useWalk(PLINES.length, 2600, mode);
    let body, cap;
    if (mode === 'proof') {
      const K = 3, st = PLINES[i].st;
      const rows = st === 0 ? [{ l: '2¹', v: 2, c: 0 }, { l: '1', v: 1, c: 2 }]
        : [{ l: '2ᵏ', v: 2 ** K, c: 0 }, { l: 'k', v: K, c: 2 }, { l: '2ᵏ⁺¹', v: 2 ** (K + 1), c: 0, hid: st < 2 }, { l: '2k', v: 2 * K, c: 1, hid: st < 3 }, { l: 'k + 1', v: K + 1, c: 2, hid: st < 4 }];
      body = html`<${HBars} rows=${rows} /><div className="dmv11-lab">${st === 0 ? 'n = 1' : 'k = 3'}</div>
        <div className="dmv11-pl">${PLINES.map((l, j) => j <= i && html`<div key=${j} className=${'dmv11-ln' + (j === i ? ' cur' : '')}>${l.t && html`<span className="t">${l.t}</span>`}<span className="f">${l.f}</span></div>`)}</div>`;
      cap = PLINES[i];
    } else {
      const p = 2 ** k, q = 2 * p, chain = `2${SUP(k + 1)} = 2 · ${p} = ${q} > ${2 * k} = ${k} + ${k} ≥ ${k + 1}`;
      body = html`<div className="dmv11-row" role="group" aria-label="Value of k"><span className="dmv11-muted">k =</span>
          ${[1, 2, 3, 4, 5, 6, 7, 8].map(v => html`<button key=${v} className="fig-btn" aria-pressed=${String(k === v)} onClick=${() => setK(v)}>${v}</button>`)}</div>
        <${HBars} rows=${[{ l: '2ᵏ', v: p, c: 0 }, { l: 'k', v: k, c: 2 }, { l: '2ᵏ⁺¹', v: q, c: 0 }, { l: '2k', v: 2 * k, c: 1 }, { l: 'k + 1', v: k + 1, c: 2 }]} />
        <div className="dmv11-ck"><div><span className="t">Hypothesis with k = ${k}</span><span className="f">2${SUP(k)} = ${p} > ${k} ✓</span></div>
          <div><span className="t">Inductive step</span><span className="f">${chain} ✓</span></div></div>`;
      cap = { en: `k = ${k}: 2ᵏ = ${p} > ${k}. Doubling gives 2ᵏ⁺¹ = ${q}, more than 2k = ${2 * k}, which is at least k + 1 = ${k + 1}. Each doubling keeps 2ⁿ ahead of n.`, ar: `عند ${B('k = ' + k)} الـ ${B('2ᵏ = ' + p)} أكبر من ${k}. ولما نضاعف:` + L(chain) + 'وكل مرة بنضاعف الـ ' + B('2ⁿ') + ' بتفضل سابقة الـ n.' };
    }
    return html`<figure className="fig dmv11"><div className="fig-stage"><div className="dmv11-wrap">
      <${Modes} list=${[['proof', 'The proof'], ['num', 'Check with numbers']]} mode=${mode} set=${setMode} />${body}</div></div>
      <${Cap} ...${cap} showAr=${ar} />${mode === 'proof' && html`<${WBar} n=${PLINES.length} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ───────── [6.0] A × B built cell by cell ───────── */
  const ELA = ['1', '2', '3', '4', '5'], ELB = ['x', 'y', 'z', 'u', 'v'];
  const pr = (a, b) => `(${a},${b})`;
  function RelationProduct({ ar }) {
    const [sz, setSz] = useState([2, 2]), [na, nb] = sz, A = ELA.slice(0, na), Bs = ELB.slice(0, nb), N = na * nb;
    const [i, ctl] = useWalk(N + 1, 900, na + 'x' + nb);
    const done = i, pairs = [];
    A.forEach(a => Bs.forEach(b => pairs.push(pr(a, b))));
    const shown = pairs.slice(0, done), sA = '{' + A.join(', ') + '}', sB = '{' + Bs.join(', ') + '}';
    const cap = done < N
      ? (done === 0
        ? { en: `A = ${sA}, B = ${sB}. A × B pairs every a ∈ A (rows) with every b ∈ B (columns): a first, b second.`, ar: 'عندنا:' + L(`A = ${sA}, B = ${sB}`) + 'والـ ' + B('A × B') + ' بيعمل pair من كل ' + B('a ∈ A') + ' (الـ rows) مع كل ' + B('b ∈ B') + ' (الـ columns)، والـ a الأول والـ b التاني.' }
        : { en: `Pair ${done}: <b>${pairs[done - 1]}</b>.`, ar: 'الـ pair رقم ' + done + ' هو ' + B(pairs[done - 1]) + '.' })
      : { en: `A × B = {${pairs.join(', ')}}: |A × B| = |A|·|B| = ${na} · ${nb} = <b>${N}</b> pairs.`, ar: 'الـ set كلها:' + L(`A × B = {${pairs.join(', ')}}`) + 'وعدد العناصر:' + L(`|A × B| = |A|·|B| = ${na} · ${nb} = ${N}`) };
    return html`<figure className="fig dmv11"><div className="fig-stage"><div className="dmv11-wrap">
      <div className="dmv11-row" role="group" aria-label="Sizes"><button className="fig-btn" aria-pressed=${String(na === 2 && nb === 2)} onClick=${() => setSz([2, 2])}>Example from the notes</button>
        <button className="fig-btn" aria-pressed=${String(na === 4 && nb === 3)} onClick=${() => setSz([4, 3])}>|A| = 4, |B| = 3 (quiz)</button></div>
      <div className="dmv11-row" role="group" aria-label="Size of A"><span className="dmv11-muted">|A| =</span>${[1, 2, 3, 4, 5].map(v => html`<button key=${v} className="fig-btn" aria-pressed=${String(na === v)} onClick=${() => setSz([v, nb])}>${v}</button>`)}</div>
      <div className="dmv11-row" role="group" aria-label="Size of B"><span className="dmv11-muted">|B| =</span>${[1, 2, 3, 4, 5].map(v => html`<button key=${v} className="fig-btn" aria-pressed=${String(nb === v)} onClick=${() => setSz([na, v])}>${v}</button>`)}</div>
      <div className="dmv11-gw"><table className="dmv11-g"><thead><tr><th>A \\ B</th>${Bs.map(b => html`<th key=${b} className="c">${b}</th>`)}</tr></thead>
        <tbody>${A.map((a, r) => html`<tr key=${a}><th className="c">${a}</th>${Bs.map((b, c) => { const k = r * nb + c + 1;
          return html`<td key=${b} className=${(k <= done ? 'in' : '') + (k === done && done < N ? ' cur' : '')}><span className=${k <= done ? '' : 'hid'}>${pr(a, b)}</span></td>`; })}</tr>`)}</tbody></table></div>
      <div className="dmv11-cnt">|A × B| = ${done < N ? done + ' so far' : `${na} · ${nb} = ${N}`}</div>
      <div className="dmv11-set">A × B = {${shown.join(', ')}${done < N ? (done ? ', …' : '…') : ''}}</div>
      </div></div><${Cap} ...${cap} showAr=${ar} /><${WBar} n=${N + 1} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ───────── [6.1]..[6.5] a relation R from A to B, and I_A, as arrows ───────── */
  function Arrows({ L1, L2, h1, h2, has, wit }) {
    const n = Math.max(L1.length, L2.length), H = 44 + n * 42, xa = 55, xb = 205, y = (j, m) => 44 + j * 42 + (n - m) * 21 + 4;
    return html`<svg className="dmv11-arw" viewBox=${`0 0 260 ${H}`} role="img" aria-label="Arrow diagram">
      <defs><marker id="dmv11-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path className="ah" d="M0,0 L10,5 L0,10 z" /></marker></defs>
      <text className="hd" x=${xa} y="14">${h1}</text><text className="hd" x=${xb} y="14">${h2}</text>
      <ellipse cx=${xa} cy=${(H + 28) / 2} rx="34" ry=${(H - 30) / 2} /><ellipse cx=${xb} cy=${(H + 28) / 2} rx="34" ry=${(H - 30) / 2} />
      ${L1.map((a, r) => L2.map((b, c) => has(r, c) && html`<line key=${a + b} className="e" x1=${xa + 16} y1=${y(r, L1.length)} x2=${xb - 17} y2=${y(c, L2.length)} markerEnd="url(#dmv11-ah)" />`))}
      ${L1.map((a, r) => html`<g key=${'a' + a}><circle cx=${xa} cy=${y(r, L1.length)} r="14" /><text x=${xa} y=${y(r, L1.length)}>${a}</text></g>`)}
      ${L2.map((b, c) => html`<g key=${'b' + b}><circle cx=${xb} cy=${y(c, L2.length)} r="14" /><text x=${xb} y=${y(c, L2.length)}>${b}</text></g>`)}</svg>`;
  }
  const EXR = ['1,x', '2,y'];
  function RelationArrows({ ar }) {
    const [mode, setMode] = useState('R'), [R, setR] = useState(EXR), [na, setNa] = useState(2);
    let body, cap;
    if (mode === 'R') {
      const A = ['1', '2'], Bs = ['x', 'y'], inR = (a, b) => R.includes(a + ',' + b);
      const tog = (a, b) => setR(r => r.includes(a + ',' + b) ? r.filter(z => z !== a + ',' + b) : r.concat(a + ',' + b));
      const list = A.flatMap(a => Bs.filter(b => inR(a, b)).map(b => pr(a, b))), sR = '{' + list.join(', ') + '}';
      const yes = A.flatMap(a => Bs.filter(b => inR(a, b)).map(b => a + 'R' + b)), no = A.flatMap(a => Bs.filter(b => !inR(a, b)).map(b => a + ' R̸ ' + b));
      const isEx = R.length === 2 && EXR.every(z => R.includes(z));
      body = html`<${Arrows} L1=${A} L2=${Bs} h1="A" h2="B" has=${(r, c) => inR(A[r], Bs[c])} />
        <div className="dmv11-gw"><table className="dmv11-g"><thead><tr><th>A \\ B</th>${Bs.map(b => html`<th key=${b} className="c">${b}</th>`)}</tr></thead>
          <tbody>${A.map(a => html`<tr key=${a}><th className="c">${a}</th>${Bs.map(b => html`<td key=${b} className=${inR(a, b) ? 'in' : 'off'}><button aria-pressed=${String(inR(a, b))} aria-label=${pr(a, b) + (inR(a, b) ? ' in R' : ' not in R')} onClick=${() => tog(a, b)}>${pr(a, b)}</button></td>`)}</tr>`)}</tbody></table></div>
        <div className="dmv11-set">R = <b>${sR}</b> ⊆ A × B</div>
        <div className="dmv11-stm">${yes.map(s => html`<span key=${s} className="y">${s}</span>`)}${no.map(s => html`<span key=${s} className="n">${s}</span>`)}</div>
        <div className="dmv11-row"><button className="fig-btn" onClick=${() => setR(EXR)} disabled=${isEx}>Example from the notes</button><span className="dmv11-muted">tap a pair to add or remove it</span></div>`;
      cap = { en: `A = {1, 2}, B = {x, y}. R = ${sR} is a subset of A × B, so it is a relation from A to B (R: A → B). Each arrow a → b is a pair (a, b) ∈ R, written aRb${no.length ? '; a missing arrow is a R̸ b' : ''}.` + (isEx ? ' This is the example from the notes.' : ''),
        ar: 'عندنا ' + B('A = {1, 2}') + ' و ' + B('B = {x, y}') + '. والـ R دي:' + L(`R = ${sR} ⊆ A × B`) + 'يبقى relation من A لـ B ومكتوبة ' + B('R: A → B') + '. كل سهم ' + B('a → b') + ' هو pair ' + B('(a, b) ∈ R') + ' ونكتبه ' + B('aRb') + (no.length ? '، واللي ملوش سهم نكتبه ' + B('a R̸ b') : '') + '.' + (isEx ? ' وده مثال الـ notes.' : '') };
    } else {
      const A = ELA.slice(0, na), sI = '{' + A.map(a => pr(a, a)).join(', ') + '}';
      body = html`<div className="dmv11-row" role="group" aria-label="Size of A"><span className="dmv11-muted">|A| =</span>${[1, 2, 3, 4].map(v => html`<button key=${v} className="fig-btn" aria-pressed=${String(na === v)} onClick=${() => setNa(v)}>${v}${v === 2 ? ' (notes)' : ''}</button>`)}</div>
        <${Arrows} L1=${A} L2=${A} h1="A" h2="A" has=${(r, c) => r === c} />
        <div className="dmv11-gw"><table className="dmv11-g"><thead><tr><th>A \\ A</th>${A.map(b => html`<th key=${b} className="c">${b}</th>`)}</tr></thead>
          <tbody>${A.map(a => html`<tr key=${a}><th className="c">${a}</th>${A.map(b => html`<td key=${b} className=${a === b ? 'dg' : 'off'}><span>${pr(a, b)}</span></td>`)}</tr>`)}</tbody></table></div>
        <div className="dmv11-set">I_A = <b>${sI}</b></div>`;
      cap = { en: `A relation on A is a subset of A × A (the whole grid). The identity relation I_A = {(a, a) | a ∈ A} keeps only the diagonal, each element related to itself: I_A = ${sI}.`, ar: 'الـ relation on A هي subset من ' + B('A × A') + ' (الجدول كله). والـ identity relation بتاخد القطر بس، كل عنصر مع نفسه:' + L('I_A = {(a, a) | a ∈ A}') + 'يعني هنا:' + L('I_A = ' + sI) };
    }
    return html`<figure className="fig dmv11"><div className="fig-stage"><div className="dmv11-wrap">
      <${Modes} list=${[['R', 'R from A to B'], ['I', 'I_A on A']]} mode=${mode} set=${setMode} />${body}</div></div>
      <${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ───────── [7] properties of a relation on A ───────── */
  const PRESETS = {
    mod2: { t: 'Congruence mod 2', n: 4, f: (a, b) => (a - b) % 2 === 0 },
    id: { t: 'I_A', n: 3, f: (a, b) => a === b },
    full: { t: 'A × A', n: 3, f: () => true }
  };
  const mk = (n, f) => { const s = new Set(); for (let a = 1; a <= n; a++) for (let b = 1; b <= n; b++) if (f(a, b)) s.add(a + ',' + b); return s; };
  function props(n, R) {
    const h = (a, b) => R.has(a + ',' + b), V = Array.from({ length: n }, (_, j) => j + 1);
    let w;
    const out = {};
    w = V.find(a => !h(a, a)); out.ref = w == null ? null : { txt: `(${w}, ${w}) ∉ R`, pairs: [], miss: [[w, w]] };
    w = null; for (const a of V) for (const b of V) if (!w && h(a, b) && !h(b, a)) w = [a, b];
    out.sym = w == null ? null : { txt: `(${w[0]}, ${w[1]}) ∈ R but (${w[1]}, ${w[0]}) ∉ R`, pairs: [w], miss: [[w[1], w[0]]] };
    w = null; for (const a of V) for (const b of V) if (!w && a !== b && h(a, b) && h(b, a)) w = [a, b];
    out.anti = w == null ? null : { txt: `(${w[0]}, ${w[1]}) and (${w[1]}, ${w[0]}) ∈ R but ${w[0]} ≠ ${w[1]}`, pairs: [w, [w[1], w[0]]], miss: [] };
    w = null; for (const a of V) for (const b of V) for (const c of V) if (!w && h(a, b) && h(b, c) && !h(a, c)) w = [a, b, c];
    out.tra = w == null ? null : { txt: `(${w[0]}, ${w[1]}), (${w[1]}, ${w[2]}) ∈ R but (${w[0]}, ${w[2]}) ∉ R`, pairs: [[w[0], w[1]], [w[1], w[2]]], miss: [[w[0], w[2]]] };
    out.eq = out.ref || out.sym || out.tra ? { txt: 'needs reflexive + symmetric + transitive', pairs: [], miss: [] } : null;
    return out;
  }
  const PDEF = [
    ['ref', 'Reflexive', '(a, a) ∈ R for every a ∈ A (I_A ⊆ R)'],
    ['sym', 'Symmetric', '(a, b) ∈ R → (b, a) ∈ R'],
    ['anti', 'Antisymmetric', '(a, b) ∈ R and (b, a) ∈ R → a = b'],
    ['tra', 'Transitive', '(a, b) ∈ R and (b, c) ∈ R → (a, c) ∈ R'],
    ['eq', 'Equivalence relation', 'reflexive + symmetric + transitive']
  ];
  const POS = { 3: [[110, 34], [190, 150], [30, 150]], 4: [[45, 40], [175, 40], [45, 150], [175, 150]] };
  function Digraph({ n, R, wp }) {
    const P = POS[n], cx = P.reduce((s, p) => s + p[0], 0) / n, cy = P.reduce((s, p) => s + p[1], 0) / n, r = 15, isW = (a, b) => wp.some(p => p[0] === a && p[1] === b);
    const items = [];
    for (let a = 1; a <= n; a++) for (let b = 1; b <= n; b++) {
      if (!R.has(a + ',' + b)) continue;
      const [x1, y1] = P[a - 1], [x2, y2] = P[b - 1], w = isW(a, b);
      if (a === b) { let ox = x1 - cx, oy = y1 - cy; const d = Math.hypot(ox, oy) || 1; ox /= d; oy /= d;
        items.push(html`<circle key=${a + '-' + b} className=${'e' + (w ? ' w' : '')} style=${{ fill: 'none' }} cx=${x1 + ox * (r + 9)} cy=${y1 + oy * (r + 9)} r="11" />`); continue; }
      const both = R.has(b + ',' + a), dx = x2 - x1, dy = y2 - y1, L0 = Math.hypot(dx, dy), px = -dy / L0, py = dx / L0, off = both ? 16 : 0;
      const qx = (x1 + x2) / 2 + px * off, qy = (y1 + y2) / 2 + py * off;
      const u = (fx, fy, tx, ty, m) => { const l = Math.hypot(tx - fx, ty - fy); return [fx + (tx - fx) / l * m, fy + (ty - fy) / l * m]; };
      const [sx, sy] = u(x1, y1, qx, qy, r + 1), [ex, ey] = u(x2, y2, qx, qy, r + 3);
      items.push(html`<path key=${a + '-' + b} className=${'e' + (w ? ' w' : '')} d=${`M${sx},${sy} Q${qx},${qy} ${ex},${ey}`} markerEnd=${w ? 'url(#dmv11-ahw)' : 'url(#dmv11-ah2)'} />`);
    }
    return html`<svg className="dmv11-arw" viewBox="0 0 220 186" role="img" aria-label="Digraph of R">
      <defs><marker id="dmv11-ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path className="ah" d="M0,0 L10,5 L0,10 z" /></marker>
        <marker id="dmv11-ahw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path className="ahw" d="M0,0 L10,5 L0,10 z" /></marker></defs>
      ${items}${P.map(([x, y], j) => html`<g key=${'n' + j}><circle cx=${x} cy=${y} r=${r} /><text x=${x} y=${y}>${j + 1}</text></g>`)}</svg>`;
  }
  const PNAR = { ref: 'reflexive', sym: 'symmetric', anti: 'antisymmetric', tra: 'transitive' };
  function RelationProps({ ar }) {
    const [st, setSt] = useState({ n: 4, R: mk(4, PRESETS.mod2.f), p: 'mod2' }), [sel, setSel] = useState(null);
    const { n, R } = st, V = Array.from({ length: n }, (_, j) => j + 1), P = props(n, R);
    const load = k => { setSt({ n: PRESETS[k].n, R: mk(PRESETS[k].n, PRESETS[k].f), p: k }); setSel(null); };
    const setN = m => { setSt({ n: m, R: new Set([...R].filter(z => z.split(',').every(v => +v <= m))), p: null }); setSel(null); };
    const tog = (a, b) => { const R2 = new Set(R), k = a + ',' + b; R2.has(k) ? R2.delete(k) : R2.add(k); setSt({ n, R: R2, p: null }); };
    const W = sel && P[sel] ? P[sel] : { pairs: [], miss: [] }, inP = (L, a, b) => L.some(p => p[0] === a && p[1] === b);
    const list = V.flatMap(a => V.filter(b => R.has(a + ',' + b)).map(b => pr(a, b)));
    const yes = ['ref', 'sym', 'anti', 'tra'].filter(k => !P[k]), no = ['ref', 'sym', 'anti', 'tra'].filter(k => P[k]);
    const name = st.p ? PRESETS[st.p].t : 'R';
    let en = `${name} on A = {${V.join(', ')}}: ` + (yes.length ? `<b>${yes.map(k => PNAR[k]).join(', ')}</b>` : 'none of the four properties') + (no.length ? `; not ${no.map(k => PNAR[k]).join(', not ')}` : '') + '.' + (!P.eq ? ' Reflexive + symmetric + transitive: an <b>equivalence relation</b>.' : '');
    let arT = (st.p ? 'الـ relation دي هي ' + (st.p === 'mod2' ? 'الـ ' + B('congruence mod 2') + ' (من محاضرة ' + B('L8') + ')' : 'الـ ' + B(st.p === 'id' ? 'I_A' : 'A × A')) : 'الـ relation اللي بنيتها') + ' على:' + L('A = {' + V.join(', ') + '}') + (yes.length ? 'وهي <b>' + yes.map(k => PNAR[k]).join(' و ') + '</b>' : 'ومفيهاش ولا خاصية من الأربعة') + '.';
    if (no.length) arT += ' ومش ' + no.map(k => PNAR[k]).join(' ولا ') + '.';
    if (!P.eq) arT += ' وبما إنها reflexive و symmetric و transitive تبقى <b>equivalence relation</b>.';
    if (sel && P[sel]) { en += ` Why not ${PDEF.find(d => d[0] === sel)[1].toLowerCase()}: ${P[sel].txt}.`; arT += ' ليه مش ' + (sel === 'eq' ? 'equivalence' : PNAR[sel]) + ':' + L(P[sel].txt); }
    else en += ' Tap a pair to add or remove it; tap a ✗ property to see why.';
    return html`<figure className="fig dmv11"><div className="fig-stage"><div className="dmv11-wrap">
      <div className="dmv11-row" role="group" aria-label="Presets">${Object.keys(PRESETS).map(k => html`<button key=${k} className="fig-btn" aria-pressed=${String(st.p === k)} onClick=${() => load(k)}>${PRESETS[k].t}</button>`)}</div>
      <div className="dmv11-row" role="group" aria-label="Size of A"><span className="dmv11-muted">|A| =</span>${[3, 4].map(v => html`<button key=${v} className="fig-btn" aria-pressed=${String(n === v)} onClick=${() => setN(v)}>${v}</button>`)}</div>
      <${Digraph} n=${n} R=${R} wp=${W.pairs} />
      <div className="dmv11-gw"><table className="dmv11-g"><thead><tr><th>R</th>${V.map(b => html`<th key=${b} className="c">${b}</th>`)}</tr></thead>
        <tbody>${V.map(a => html`<tr key=${a}><th className="c">${a}</th>${V.map(b => { const on = R.has(a + ',' + b);
          return html`<td key=${b} className=${(on ? 'in' : 'off') + (inP(W.pairs, a, b) ? ' w' : '') + (inP(W.miss, a, b) ? ' wm' : '')}><button aria-pressed=${String(on)} aria-label=${pr(a, b) + (on ? ' in R' : ' not in R')} onClick=${() => tog(a, b)}>${pr(a, b)}</button></td>`; })}</tr>`)}</tbody></table></div>
      <div className="dmv11-set">R = {${list.join(', ')}}</div>
      <div className="dmv11-pr">${PDEF.map(([k, nm, df]) => html`<button key=${k} className=${(P[k] ? '' : 'yes') + (sel === k ? ' sel' : '')} aria-pressed=${String(sel === k)} onClick=${() => setSel(sel === k ? null : k)}>
        <span className="nm">${nm}</span><span className=${'vv ' + (P[k] ? 'dmv11-no' : 'dmv11-ok')}>${P[k] ? '✗' : '✓'}</span><span className="df">${df}</span>
        ${sel === k && P[k] && html`<span className="wt">${P[k].txt}</span>`}</button>`)}</div>
      </div></div><${Cap} en=${en} ar=${arT} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'dm-induction-domino': InductionDomino, 'dm-induction-sum-n': SumN, 'dm-induction-sum-even': SumEven, 'dm-induction-sum-3n': SumThree,
    'dm-induction-pow2': InductionPow2, 'dm-relation-product': RelationProduct, 'dm-relation-arrows': RelationArrows, 'dm-relation-props': RelationProps
  });
})();
/* ── part L5 ── */
// Discrete Mathematics visuals, Lecture 5 (Conditional Statements, Negations and Equivalence Proofs): the negation of a conditional (table, derivation, sentences), order of operations, the biconditional table, Tables 7 and 8 checked by truth tables, converse / contrapositive / inverse, "if and only if", the three proofs by equivalences and the tautology exercises. Every label and number comes from the site's notes; truth values are computed.
(function () {
  const { useState, useRef } = React;
  const { html, useSteps, Cap, Bar } = window.FIGKIT;
  const CSS = `
.dmv5 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dmv5-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dmv5-chips .fig-btn{ font-size:.82rem; padding:4px 10px; min-height:32px; }
.dmv5 .fig-btn.dmv5-on{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.dmv5-sel{ display:block; width:100%; max-width:440px; margin:0 auto 10px; font:500 .86rem var(--mono); padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.dmv5-own{ display:grid; gap:6px; max-width:440px; margin:0 auto 10px; }
.dmv5-own label{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:6px; align-items:center; font-size:.82rem; color:var(--graphite); }
.dmv5-in{ font:500 .92rem var(--mono); width:100%; min-width:0; box-sizing:border-box; padding:5px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.dmv5-in.txt{ font-family:var(--body); font-size:.88rem; }
.dmv5-keys{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; }
.dmv5-keys .fig-btn{ font:600 .9rem var(--mono); padding:2px 0; min-width:34px; min-height:32px; }
.dmv5-err{ text-align:center; color:var(--pen); font-weight:600; font-size:.88rem; margin:6px 0; }
.dmv5-tag{ display:block; text-align:center; font-size:.8rem; color:var(--graphite); margin:-4px 0 8px; }
.dmv5-ttw{ display:flex; justify-content:center; }
.dmv5-tt{ border-collapse:collapse; font:600 .86rem var(--mono); color:var(--ink); background:var(--paper); }
.dmv5-tt th, .dmv5-tt td{ border:1px solid var(--line); padding:4px 5px; text-align:center; min-width:20px; transition:background .3s; }
.dmv5-tt th{ background:var(--paper-2); white-space:nowrap; font-weight:700; }
.dmv5-tt td.t{ color:var(--ok); } .dmv5-tt td.f{ color:var(--pen); }
.dmv5-tt .k{ background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.dmv5-tt .k2{ background:color-mix(in srgb, var(--pen) 13%, var(--paper)); }
.dmv5-tt th.k, .dmv5-tt th.k2{ box-shadow:inset 0 -3px 0 var(--fig-k); }
.dmv5-tt th.k2{ box-shadow:inset 0 -3px 0 var(--pen); }
.dmv5-tt tr.cur td{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); }
.dmv5-tt tr.bad td{ background:color-mix(in srgb, var(--pen) 22%, var(--paper)); }
.dmv5-tt tr.hl td{ box-shadow:inset 0 2px 0 var(--pen), inset 0 -2px 0 var(--pen); }
.dmv5-leg{ display:grid; gap:2px; max-width:440px; margin:0 auto 8px; font:500 .84rem/1.4 var(--mono); color:var(--ink); }
.dmv5-leg b{ color:var(--fig-k); }
.dmv5-vd{ text-align:center; font-weight:700; margin:8px 0 0; font-size:.9rem; color:var(--ink); }
.dmv5-vd.ok{ color:var(--ok); } .dmv5-vd.no{ color:var(--pen); }
.dmv5-why{ text-align:center; font-size:.84rem; color:var(--graphite); margin:4px 0 0; }
.dmv5-proof{ max-width:440px; margin:0 auto; font:500 .9rem/1.45 var(--mono); color:var(--ink); direction:ltr; text-align:left; }
.dmv5-pl{ padding:3px 6px; border-radius:6px; transition:background .3s; }
.dmv5-pl.cur{ background:color-mix(in srgb, var(--fig-k) 13%, var(--paper)); }
.dmv5-pf{ overflow-wrap:anywhere; padding-left:2ch; text-indent:-2ch; }
.dmv5-law{ font:italic .78rem/1.35 var(--body); color:var(--graphite); padding-left:2ch; }
.dmv5-new{ background:var(--fig-s); color:#fff; border-radius:3px; padding:0 2px; }
.dmv5-old{ background:color-mix(in srgb, var(--pen) 24%, var(--paper)); border-radius:3px; padding:0 2px; }
.dmv5-chk{ margin:10px auto 0; border-collapse:collapse; font:600 .8rem var(--mono); color:var(--ink); }
.dmv5-chk th, .dmv5-chk td{ border:1px solid var(--line); padding:3px 6px; text-align:center; }
.dmv5-chk th{ font-family:var(--body); font-weight:600; color:var(--graphite); background:var(--paper-2); text-align:left; }
.dmv5-chk td.t{ color:var(--ok); } .dmv5-chk td.f{ color:var(--pen); }
.dmv5-ops{ text-align:center; font:600 1.2rem/1.6 var(--mono); color:var(--ink); margin:4px 0 10px; overflow-wrap:anywhere; direction:ltr; }
.dmv5-ops .l1{ color:var(--pen); } .dmv5-ops .l2{ color:var(--fig-k); } .dmv5-ops .l3{ color:var(--ok); }
.dmv5-ops .add{ font-weight:800; }
.dmv5-ops .u1{ border-bottom:2px solid var(--pen); }
.dmv5-pri{ display:grid; gap:4px; max-width:440px; margin:0 auto; }
.dmv5-pri div{ display:grid; grid-template-columns:1.6em 3.6em minmax(0,1fr); gap:6px; align-items:center; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 8px; font-size:.8rem; color:var(--graphite); opacity:.5; transition:opacity .35s, box-shadow .35s; }
.dmv5-pri div.on{ opacity:1; box-shadow:0 0 0 2px var(--fig-k); color:var(--ink); }
.dmv5-pri b{ font:700 .95rem var(--mono); color:var(--ink); }
.dmv5-read{ display:grid; gap:4px; max-width:440px; margin:8px auto 0; }
.dmv5-read div{ border:1px dashed var(--pen); border-radius:8px; padding:4px 8px; font:600 .88rem var(--mono); color:var(--ink); text-align:center; }
.dmv5-read small{ display:block; font:500 .78rem var(--body); color:var(--graphite); }
.dmv5-sq{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px; max-width:440px; margin:0 auto; }
.dmv5-vc{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; text-align:center; transition:opacity .4s, box-shadow .35s; }
.dmv5-vc b{ display:block; font-size:.8rem; color:var(--graphite); }
.dmv5-vc span{ display:block; font:700 .98rem var(--mono); color:var(--ink); overflow-wrap:anywhere; }
.dmv5-vc small{ display:block; font-size:.75rem; color:var(--graphite); }
.dmv5-vc.dim{ opacity:.3; } .dmv5-vc.on{ box-shadow:0 0 0 2px var(--fig-k); }
.dmv5-vc.pa{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 10%, var(--paper)); }
.dmv5-vc.pb{ box-shadow:0 0 0 2px var(--pen); background:color-mix(in srgb, var(--pen) 9%, var(--paper)); }
.dmv5-world{ display:flex; flex-wrap:wrap; gap:6px 14px; justify-content:center; align-items:center; margin:0 0 10px; font-size:.84rem; color:var(--ink); }
.dmv5-world span{ display:inline-flex; gap:4px; align-items:center; }
.dmv5-world .fig-btn{ font:700 .86rem var(--mono); min-width:36px; padding:3px 8px; }
.dmv5-sc{ display:grid; gap:8px; max-width:460px; margin:0 auto; }
.dmv5-sx{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:4px 8px; align-items:center; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; }
.dmv5-sx > b{ grid-column:1 / -1; font-size:.78rem; color:var(--graphite); font-weight:600; }
.dmv5-sx > span{ font-size:.88rem; line-height:1.35; color:var(--ink); }
.dmv5-sx > i{ font:700 1rem var(--mono); font-style:normal; width:30px; height:30px; display:grid; place-items:center; border-radius:50%; color:#fff; }
.dmv5-sx > i.t{ background:var(--ok); } .dmv5-sx > i.f{ background:var(--pen); }
.dmv5-sx.wrong{ border-style:dashed; }
.dmv5-sx em{ font-style:normal; font-family:var(--mono); font-size:.8rem; color:var(--fig-k); }
.dmv5-sx small{ grid-column:1 / -1; font-size:.78rem; color:var(--graphite); }
.dmv5-iff svg text{ font-family:var(--mono); }
`;
  if (!document.getElementById('dmv5-css')) { const s = document.createElement('style'); s.id = 'dmv5-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = t => '<span class="ltr">' + t + '</span>';
  const B = t => '<bdi dir="ltr">' + t + '</bdi>';
  const TF = b => b ? 'T' : 'F';

  /* ── a small logic engine: ¬ first, then ∧ ∨ (same level), then → ↔ (same level), as in the notes' order of operations ── */
  const SYM = [['<->', '↔'], ['<=>', '↔'], ['->', '→'], ['=>', '→'], ['~', '¬'], ['!', '¬'], ['¬', '¬'], ['&', '∧'], ['^', '∧'], ['∧', '∧'], ['|', '∨'], ['∨', '∨'], ['→', '→'], ['↔', '↔'], ['(', '('], ['[', '('], ['{', '('], [')', ')'], [']', ')'], ['}', ')']];
  const LV = { '∧': 2, '∨': 2, '→': 3, '↔': 3 };
  function lex(s) {
    const out = []; let i = 0;
    while (i < s.length) {
      const c = s[i]; if (/\s/.test(c)) { i++; continue; }
      const m = SYM.find(([k]) => s.startsWith(k, i)); if (m) { out.push(m[1]); i += m[0].length; continue; }
      if (/[A-Za-z]/.test(c)) { out.push(c === 'T' || c === 'F' ? c : c.toLowerCase()); i++; continue; }
      throw { msg: 'unknown symbol "' + c + '"' };
    }
    if (!out.length) throw { msg: 'type a formula' };
    return out;
  }
  function parse(s) {
    const T = lex(s); let k = 0;
    function atom() {
      const t = T[k]; if (t == null) throw { msg: 'the formula ends too early' };
      if (t === '¬') { k++; return { t: '¬', a: atom() }; }
      if (t === '(') { k++; const e = level(3); if (T[k] !== ')') throw { msg: 'a bracket is not closed' }; k++; return e; }
      if (t === 'T' || t === 'F') { k++; return { t: 'c', v: t === 'T' }; }
      if (/^[a-z]$/.test(t)) { k++; return { t: 'v', v: t }; }
      throw { msg: '"' + t + '" is in the wrong place' };
    }
    function level(Lv) {
      const sub = () => Lv === 2 ? atom() : level(2);
      const items = [sub()], ops = [];
      while (k < T.length && LV[T[k]] === Lv) { ops.push(T[k]); k++; items.push(sub()); }
      if (!ops.length) return items[0];
      if (new Set(ops).size > 1 || (Lv === 3 && ops.length > 1)) throw { amb: true, Lv, ops, items, msg: 'parentheses are needed' };
      let e = items[0]; ops.forEach((o, j) => { e = { t: o, a: e, b: items[j + 1] }; }); return e;
    }
    const e = level(3); if (k < T.length) throw { msg: '"' + T[k] + '" is in the wrong place' }; return e;
  }
  const atomic = n => n.t === 'v' || n.t === 'c';
  function pr(n, sp = true, top = true, par) {
    if (n.t === 'v') return n.v; if (n.t === 'c') return TF(n.v);
    if (n.t === '¬') return '¬' + (atomic(n.a) ? pr(n.a, sp) : '(' + pr(n.a, sp) + ')');
    const s = pr(n.a, sp, false, n.t) + (sp ? ' ' + n.t + ' ' : n.t) + pr(n.b, sp, false);
    return top || (par === n.t && LV[n.t] === 2) ? s : '(' + s + ')';
  }
  function ev(n, e) {
    switch (n.t) { case 'v': return e[n.v]; case 'c': return n.v; case '¬': return !ev(n.a, e);
      case '∧': return ev(n.a, e) && ev(n.b, e); case '∨': return ev(n.a, e) || ev(n.b, e);
      case '→': return !ev(n.a, e) || ev(n.b, e); default: return ev(n.a, e) === ev(n.b, e); }
  }
  const varsOf = (...ns) => { const s = new Set(); const w = n => { if (n.t === 'v') s.add(n.v); if (n.a) w(n.a); if (n.b) w(n.b); }; ns.forEach(w); return [...s].sort(); };
  const subs = n => atomic(n) ? [] : [...subs(n.a), ...(n.b ? subs(n.b) : []), n];
  const rowsOf = vs => Array.from({ length: 1 << vs.length }, (_, i) => Object.fromEntries(vs.map((v, j) => [v, !((i >> (vs.length - 1 - j)) & 1)])));
  const neg = n => n.t === '¬' ? n.a : { t: '¬', a: n };
  function autoCols(sides, max) {
    const seen = new Map(), add = n => { const k = pr(n); if (!seen.has(k)) seen.set(k, n); };
    sides.forEach(s => subs(s).forEach(add)); sides.forEach(add);
    if (seen.size > max) { seen.clear(); sides.forEach(s => { [s.a, s.b].forEach(x => { if (x && !atomic(x)) add(x); }); add(s); }); }
    const list = [...seen.values()];
    return { list, idx: sides.map(s => list.indexOf(seen.get(pr(s)))) };
  }

  /* ── shared pieces ── */
  const Chips = ({ items, sel, on }) => html`<div className="dmv5-chips" role="group">${items.map(([k, t]) => html`<button key=${k} className=${'fig-btn' + (sel === k ? ' dmv5-on' : '')} aria-pressed=${String(sel === k)} onClick=${() => on(k)}>${t}</button>`)}</div>`;
  function useKeys(n) {
    const refs = [useRef(null), useRef(null), useRef(null)].slice(0, n), last = useRef(0);
    const ins = (k, vals, sets) => {
      const j = last.current, el = refs[j].current, v = vals[j];
      const a = el && el.selectionStart != null ? el.selectionStart : v.length, b = el && el.selectionEnd != null ? el.selectionEnd : v.length;
      let nv, pos;
      if (k === '⌫') { if (a !== b) { nv = v.slice(0, a) + v.slice(b); pos = a; } else { nv = v.slice(0, Math.max(0, a - 1)) + v.slice(a); pos = Math.max(0, a - 1); } }
      else { const t = LV[k] ? ' ' + k + ' ' : k; nv = v.slice(0, a) + t + v.slice(b); pos = a + t.length; }
      sets[j](nv); requestAnimationFrame(() => { if (el && document.activeElement === el) el.setSelectionRange(pos, pos); });
    };
    return { refs, last, ins };
  }
  const Keys = ({ onKey }) => html`<div className="dmv5-keys">${['¬', '∧', '∨', '→', '↔', '(', ')', 'p', 'q', 'r', '⌫'].map(k => html`<button key=${k} className="fig-btn" onMouseDown=${e => e.preventDefault()} onClick=${() => onKey(k)} aria-label=${k === '⌫' ? 'delete' : 'insert ' + k}>${k}</button>`)}</div>`;

  function TTable({ vs, R, V, heads, filled, cls, cur, bad, hl }) {
    return html`<div className="dmv5-ttw"><table className="dmv5-tt">
      <thead><tr>${vs.map(v => html`<th key=${v}>${v}</th>`)}${heads.map((h, j) => html`<th key=${'h' + j} className=${cls[j] || ''}>${h}</th>`)}</tr></thead>
      <tbody>${R.map((e, r) => html`<tr key=${r} className=${(r === cur ? 'cur' : '') + (bad && bad.includes(r) ? ' bad' : '') + (hl && hl.includes(r) ? ' hl' : '')}>
        ${vs.map(v => html`<td key=${v} className=${e[v] ? 't' : 'f'}>${TF(e[v])}</td>`)}
        ${heads.map((_, j) => { const on = r < filled; return html`<td key=${'c' + j} className=${(cls[j] || '') + (on ? (V[r][j] ? ' t' : ' f') : '')}>${on ? TF(V[r][j]) : ''}</td>`; })}</tr>`)}</tbody></table></div>`;
  }

  // a truth table filled row by row, then a verdict: two columns compared (cmp) or one column checked for a tautology (taut)
  function TTSteps({ ar, top, vs, cols, cmp, taut, intro, verdict, neg: ng, ms, hlRows, why }) {
    const sy = s => ng ? s.replace(/¬/g, ng) : s;
    const R = rowsOf(vs), V = R.map(e => cols.map(c => ev(c, e))), n = R.length;
    const full = cols.map(c => sy(c.s || pr(c))), compact = cols.map(c => sy(c.s ? c.s.replace(/\s/g, '') : pr(c, false)));
    let li = 0; const heads = compact.map(l => l.length > 9 ? 'ABCDEFGH'[li++] : l);
    const legend = heads.map((h, j) => h !== compact[j] ? [h, full[j]] : null).filter(Boolean);
    const key = cmp || [taut], ok = r => cmp ? V[r][cmp[0]] === V[r][cmp[1]] : V[r][taut];
    const bad = R.map((_, r) => r).filter(r => !ok(r)), good = !bad.length;
    const asg = r => vs.map(v => v + ' = ' + TF(R[r][v])).join(', ');
    const nm = cmp ? [full[cmp[0]], full[cmp[1]]] : [full[taut]];
    const st0 = intro || (cmp
      ? { en: `Truth table for <b>${nm[0]}</b> and <b>${nm[1]}</b>: ${n} rows, filled one by one.`, ar: `هنعمل truth table للطرفين، فيها ${n} صفوف بنملاها صف صف:` + L(nm[0] + ' &nbsp; ، &nbsp; ' + nm[1]) }
      : { en: `Truth table for <b>${nm[0]}</b>: ${n} rows, filled one by one.`, ar: `هنعمل truth table ليها ${n} صفوف بنملاها صف صف:` + L(nm[0]) });
    const rowSt = r => ({
      en: `<b>Row ${r + 1}</b>: ${asg(r)}. ` + key.map(j => `${full[j]} is <b>${TF(V[r][j])}</b>`).join(', ') + (cmp ? (ok(r) ? ' (same).' : ' (different).') : '.'),
      ar: `في الصف رقم ${r + 1} القيم هي` + L(asg(r)) + 'والنتيجة هي' + L(key.map(j => full[j] + ' = ' + TF(V[r][j])).join(' &nbsp; ، &nbsp; ')) + (cmp ? (ok(r) ? 'نفس القيمة.' : 'قيمتين مختلفتين.') : (V[r][taut] ? 'يعني صح.' : 'يعني غلط.'))
    });
    const st9 = verdict || (cmp
      ? (good ? { en: `The two highlighted columns agree in all ${n} rows, so <b>${nm[0]} ≡ ${nm[1]}</b>.`, ar: `العمودين المتلوّنين متطابقين في كل الـ ${n} صفوف، يبقوا logically equivalent:` + L(nm[0] + ' ≡ ' + nm[1]) }
        : { en: `They differ in row ${bad[0] + 1} (${asg(bad[0])}), so they are <b>not</b> equivalent.`, ar: `العمودين مختلفين في الصف رقم ${bad[0] + 1}، يعني مش equivalent. الصف ده هو:` + L(asg(bad[0])) })
      : (good ? { en: `The last column is T in all ${n} rows: <b>a tautology</b>.`, ar: `العمود الأخير قيمته T في كل الـ ${n} صفوف، يبقى tautology.` }
        : { en: `Row ${bad[0] + 1} (${asg(bad[0])}) gives F, so it is <b>not</b> a tautology.`, ar: `الصف رقم ${bad[0] + 1} طلع F، يبقى مش tautology. الصف ده هو:` + L(asg(bad[0])) }));
    const steps = [st0, ...R.map((_, r) => rowSt(r)), st9];
    const [i, ctl] = useSteps(steps.length, ms || 1300);
    const end = i === n + 1, filled = i === 0 ? 0 : Math.min(i, n), cur = i >= 1 && i <= n ? i - 1 : -1;
    const cls = cols.map((_, j) => key.includes(j) ? 'k' : '');
    return html`<div className="fig-stage">${top}
        ${legend.length ? html`<div className="dmv5-leg">${legend.map(([h, f]) => html`<div key=${h}><b>${h}</b> = ${f}</div>`)}</div>` : null}
        <${TTable} vs=${vs} R=${R} V=${V} heads=${heads} filled=${filled} cls=${cls} cur=${cur} bad=${end ? bad : null} hl=${end ? hlRows : null} />
        ${end && html`<p className=${'dmv5-vd ' + (good ? 'ok' : 'no')}>${cmp ? (good ? '✓ equivalent' : '✗ not equivalent') : (good ? '✓ tautology' : '✗ not a tautology')}</p>`}
        ${end && why ? html`<p className="dmv5-why">${why}</p>` : null}
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }

  /* ── [0.0–0.1] the negation of a conditional, by its truth table ── */
  function NegTable({ ar }) {
    const P = s => parse(s);
    const cols = [P('p → q'), P('¬(p → q)'), P('¬q'), P('p ∧ ¬q')];
    const intro = { en: 'By definition <b>p → q is false only when p is T and q is F</b>. Fill the table row by row and compare ~(p → q) with p ∧ ~q.', ar: 'بالتعريف الـ ' + B('p&nbsp;→&nbsp;q') + ' بتبقى false بس لما p تبقى T و q تبقى F. هنملا الجدول صف صف ونقارن العمودين دول:' + L('~(p → q) &nbsp; ، &nbsp; p ∧ ~q') };
    const verdict = { en: 'Only row 2 (p = T, q = F) makes p → q false, and that is exactly the row where p ∧ ~q is true. The two columns agree in every row: <b>~(p → q) ≡ p ∧ ~q</b>, "p and not q".', ar: 'الصف التاني بس هو اللي بيخلّي الـ conditional قيمته false، وهو نفس الصف اللي فيه الـ ' + B('"p and not q"') + ' قيمتها true. والعمودين متطابقين في كل الصفوف، يبقى:' + L('~(p → q) ≡ p ∧ ~q') };
    return html`<figure className="fig dmv5"><${TTSteps} ar=${ar} vs=${['p', 'q']} cols=${cols} cmp=${[1, 3]} neg="~" intro=${intro} verdict=${verdict} hlRows=${[1]} /></figure>`;
  }

  /* ── proofs by a series of equivalences, law by law, with a truth check of every line ── */
  const MK = s => s.split(/[«»]/).map((x, j) => j % 2 ? html`<span key=${j} className="dmv5-new">${x}</span>` : x);
  const MKO = s => s.split(/[«»]/).map((x, j) => j % 2 ? html`<span key=${j} className="dmv5-old">${x}</span>` : x);
  const clean = s => s.replace(/[«»]/g, '');
  function Proof({ ar, P, ng }) {
    const [i, ctl] = useSteps(P.length, 2600);
    const sy = s => ng ? s.replace(/¬/g, ng) : s;
    const f0 = parse(clean(P[0].t)), vs = varsOf(f0), R = rowsOf(vs);
    const col = j => { const f = parse(clean(P[j].t)); return R.map(e => ev(f, e)); };
    const c0 = col(0), ci = col(i), same = c0.every((v, k) => v === ci[k]);
    return html`<figure className="fig dmv5"><div className="fig-stage">
      <div className="dmv5-proof">${P.slice(0, i + 1).map((l, j) => html`<div key=${j} className=${'dmv5-pl' + (j === i ? ' cur' : '')}>
        <div className="dmv5-pf">${j > 0 ? '≡ ' : ''}${j === i ? MK(sy(l.t)) : j === i - 1 && P[i].from ? MKO(sy(P[i].from)) : sy(clean(l.t))}${j === P.length - 1 ? ' ■' : ''}</div>
        ${l.law && html`<div className="dmv5-law">${sy(l.law)}</div>`}</div>`)}</div>
      <table className="dmv5-chk" aria-label="truth values of the first line and of this line">
        <thead><tr><th>${vs.join(' ')}</th>${R.map((e, k) => html`<th key=${k} style=${{ textAlign: 'center' }}>${vs.map(v => TF(e[v])).join('')}</th>`)}</tr></thead>
        <tbody><tr><th>first line</th>${c0.map((v, k) => html`<td key=${k} className=${v ? 't' : 'f'}>${TF(v)}</td>`)}</tr>
        <tr><th>this line ${same ? '✓' : ''}</th>${ci.map((v, k) => html`<td key=${k} className=${v ? 't' : 'f'}>${TF(v)}</td>`)}</tr></tbody></table>
      </div><${Cap} en=${P[i].en} ar=${P[i].ar} showAr=${ar} /><${Bar} steps=${P} i=${i} ctl=${ctl} /></figure>`;
  }

  const PR_NEG = [
    { t: '¬(p → q)', en: 'Start from the negation of the conditional, ~(p → q). The table under the proof checks every line against the first one.', ar: 'بنبدأ من نفي الـ conditional، والجدول اللي تحت بيقارن كل سطر بالسطر الأول:' + L('~(p → q)') },
    { from: '¬(«p → q»)', t: '¬(«¬p ∨ q»)', law: 'by p → q ≡ ¬p ∨ q', en: 'Rewrite the conditional with the known equivalence p → q ≡ ~p ∨ q.', ar: 'بنكتب الـ conditional بالـ equivalence المعروفة:' + L('p → q ≡ ~p ∨ q') },
    { from: '«¬(¬p ∨ q)»', t: '«¬(¬p) ∧ (¬q)»', law: 'by De Morgan’s laws', en: 'De Morgan: the negation of an ∨ is the ∧ of the negations.', ar: 'بالـ De Morgan نفي الـ ' + B('∨') + ' بيبقى ' + B('∧') + ' بين النفيين:' + L('~(~p ∨ q) ≡ ~(~p) ∧ (~q)') },
    { from: '«¬(¬p)» ∧ «(¬q)»', t: '«p» ∧ «¬q»', law: 'by the double negative law', en: 'Double negative: ~(~p) ≡ p. Result: <b>~(p → q) ≡ p ∧ ~q</b>, "p and not q".', ar: 'بالـ double negative بنشيل النفيين. والنتيجة هي:' + L('~(p → q) ≡ p ∧ ~q') + 'يعني ' + B('"p and not q"') + '.' }
  ];
  const PR_6 = [
    { t: '¬(p ∨ (¬p ∧ q))', en: 'Show ¬(p ∨ (¬p ∧ q)) ≡ ¬p ∧ ¬q with the laws of Table 6, one at a time, starting from the left side.', ar: 'عايزين نثبت إن الطرفين دول equivalent بقوانين Table 6، قانون قانون، ونبدأ من الطرف الشمال:' + L('¬(p ∨ (¬p ∧ q)) ≡ ¬p ∧ ¬q') },
    { from: '«¬(p ∨ (¬p ∧ q))»', t: '«¬p ∧ ¬(¬p ∧ q)»', law: 'by the second De Morgan law', en: 'Second De Morgan law: ¬(A ∨ B) ≡ ¬A ∧ ¬B, with A = p and B = ¬p ∧ q.', ar: 'بالـ De Morgan التاني:' + L('¬(A ∨ B) ≡ ¬A ∧ ¬B') + 'وهنا A هي p و B هي ' + B('¬p&nbsp;∧&nbsp;q') + '.' },
    { from: '¬p ∧ «¬(¬p ∧ q)»', t: '¬p ∧ «[¬(¬p) ∨ ¬q]»', law: 'by the first De Morgan law', en: 'First De Morgan law on ¬(¬p ∧ q): ¬(A ∧ B) ≡ ¬A ∨ ¬B.', ar: 'بالـ De Morgan الأول على الجزء ' + B('¬(¬p&nbsp;∧&nbsp;q)') + ':' + L('¬(A ∧ B) ≡ ¬A ∨ ¬B') },
    { from: '¬p ∧ [«¬(¬p)» ∨ ¬q]', t: '¬p ∧ («p» ∨ ¬q)', law: 'by the double negation law', en: 'Double negation law: ¬(¬p) ≡ p.', ar: 'بالـ double negation law:' + L('¬(¬p) ≡ p') },
    { from: '«¬p ∧ (p ∨ ¬q)»', t: '«(¬p ∧ p) ∨ (¬p ∧ ¬q)»', law: 'by the second distributive law', en: 'Second distributive law: A ∧ (B ∨ C) ≡ (A ∧ B) ∨ (A ∧ C), with A = ¬p.', ar: 'بالـ distributive law التاني بنوزّع الـ ' + B('¬p&nbsp;∧') + ' على الـ ' + B('∨') + ':' + L('A ∧ (B ∨ C) ≡ (A ∧ B) ∨ (A ∧ C)') },
    { from: '«(¬p ∧ p)» ∨ (¬p ∧ ¬q)', t: '«F» ∨ (¬p ∧ ¬q)', law: 'because ¬p ∧ p ≡ F', en: '¬p ∧ p ≡ F: a statement and its negation are never both true.', ar: 'الجزء ده دايمًا F، لأن الـ statement ونفيها عمرهم ما يبقوا true مع بعض:' + L('¬p ∧ p ≡ F') },
    { from: '«F ∨ (¬p ∧ ¬q)»', t: '«(¬p ∧ ¬q) ∨ F»', law: 'by the commutative law for disjunction', en: 'Commutative law for disjunction: swap the two sides of ∨.', ar: 'بالـ commutative law للـ disjunction بنبدّل طرفين الـ ' + B('∨') + '.' },
    { from: '«(¬p ∧ ¬q) ∨ F»', t: '«¬p ∧ ¬q»', law: 'by the identity law for F', en: 'Identity law for F: A ∨ F ≡ A. So <b>¬(p ∨ (¬p ∧ q)) ≡ ¬p ∧ ¬q</b>, and the truth check agrees in every row.', ar: 'بالـ identity law للـ F:' + L('A ∨ F ≡ A') + 'يبقى الطرفين equivalent، والـ truth check متطابق في كل الصفوف.' }
  ];
  const PR_7 = [
    { t: '(p ∧ q) → (p ∨ q)', en: 'Show (p ∧ q) → (p ∨ q) is a tautology: rewrite it law by law until it becomes T.', ar: 'عايزين نثبت إنها tautology، يعني نوصل بالقوانين لحد ما تبقى T:' + L('(p ∧ q) → (p ∨ q)') },
    { from: '«(p ∧ q) → (p ∨ q)»', t: '«¬(p ∧ q) ∨ (p ∨ q)»', law: 'by p → q ≡ ¬p ∨ q', en: 'Remove the → with p → q ≡ ¬p ∨ q (the slide says "by Example 3").', ar: 'بنشيل الـ ' + B('→') + ' بالـ equivalence دي:' + L('p → q ≡ ¬p ∨ q') },
    { from: '«¬(p ∧ q)» ∨ (p ∨ q)', t: '«(¬p ∨ ¬q)» ∨ (p ∨ q)', law: 'by the first De Morgan law', en: 'First De Morgan law: ¬(p ∧ q) ≡ ¬p ∨ ¬q.', ar: 'بالـ De Morgan الأول:' + L('¬(p ∧ q) ≡ ¬p ∨ ¬q') },
    { from: '«(¬p ∨ ¬q) ∨ (p ∨ q)»', t: '«(¬p ∨ p) ∨ (¬q ∨ q)»', law: 'by the associative and commutative laws for disjunction', en: 'Associative and commutative laws for disjunction: regroup the four parts so each variable meets its negation.', ar: 'بالـ associative والـ commutative laws للـ disjunction بنعيد ترتيب الأربع أجزاء، عشان كل متغير يقابل نفيه.' },
    { from: '«(¬p ∨ p)» ∨ «(¬q ∨ q)»', t: '«T» ∨ «T»', law: 'by the negation law and commutative law', en: 'Negation law (with the commutative law): ¬p ∨ p ≡ T and ¬q ∨ q ≡ T.', ar: 'بالـ negation law والـ commutative law:' + L('¬p ∨ p ≡ T, &nbsp; ¬q ∨ q ≡ T') },
    { from: '«T ∨ T»', t: '«T»', law: 'by the domination law', en: 'Domination law: T ∨ T ≡ T. The statement is always true: <b>a tautology</b>.', ar: 'بالـ domination law:' + L('T ∨ T ≡ T') + 'يعني الـ statement دايمًا true، يبقى tautology.' }
  ];
  const PR_8 = [
    { t: '[¬p ∧ (p ∨ q)] → q', en: 'Show [¬p ∧ (p ∨ q)] → q is a tautology by the laws (Exam 2021/22 Q3b, Aug 2024 paper Q2b).', ar: 'عايزين نثبت بالقوانين إنها tautology:' + L('[¬p ∧ (p ∨ q)] → q') + 'ودي جت في امتحان ' + B('2021/22') + ' وفي ورقة ' + B('Aug&nbsp;2024') + '.' },
    { from: '«[¬p ∧ (p ∨ q)] → q»', t: '«¬[¬p ∧ (p ∨ q)] ∨ q»', law: 'p → q ≡ ¬p ∨ q', en: 'Remove the → with p → q ≡ ¬p ∨ q.', ar: 'بنشيل الـ ' + B('→') + ' بالـ equivalence دي:' + L('p → q ≡ ¬p ∨ q') },
    { from: '«¬[¬p ∧ (p ∨ q)]» ∨ q', t: '«[¬(¬p) ∨ ¬(p ∨ q)]» ∨ q', law: 'De Morgan', en: 'De Morgan: ¬(A ∧ B) ≡ ¬A ∨ ¬B.', ar: 'بالـ De Morgan:' + L('¬(A ∧ B) ≡ ¬A ∨ ¬B') },
    { from: '[«¬(¬p)» ∨ «¬(p ∨ q)»] ∨ q', t: '[«p» ∨ «(¬p ∧ ¬q)»] ∨ q', law: 'double negation, De Morgan', en: 'Double negation ¬(¬p) ≡ p, and De Morgan again: ¬(p ∨ q) ≡ ¬p ∧ ¬q.', ar: 'بالـ double negation والـ De Morgan تاني:' + L('¬(¬p) ≡ p, &nbsp; ¬(p ∨ q) ≡ ¬p ∧ ¬q') },
    { from: '«[p ∨ (¬p ∧ ¬q)]» ∨ q', t: '«[(p ∨ ¬p) ∧ (p ∨ ¬q)]» ∨ q', law: 'distributive', en: 'Distributive law: p ∨ (¬p ∧ ¬q) ≡ (p ∨ ¬p) ∧ (p ∨ ¬q).', ar: 'بالـ distributive law:' + L('p ∨ (¬p ∧ ¬q) ≡ (p ∨ ¬p) ∧ (p ∨ ¬q)') },
    { from: '[«(p ∨ ¬p)» ∧ (p ∨ ¬q)] ∨ q', t: '[«T» ∧ (p ∨ ¬q)] ∨ q', law: 'negation', en: 'Negation law: p ∨ ¬p ≡ T.', ar: 'بالـ negation law:' + L('p ∨ ¬p ≡ T') },
    { from: '«[T ∧ (p ∨ ¬q)]» ∨ q', t: '«(p ∨ ¬q)» ∨ q', law: 'identity', en: 'Identity law: T ∧ A ≡ A.', ar: 'بالـ identity law:' + L('T ∧ A ≡ A') },
    { from: '«(p ∨ ¬q) ∨ q»', t: '«p ∨ (¬q ∨ q)»', law: 'associative', en: 'Associative law: regroup as p ∨ (¬q ∨ q).', ar: 'بالـ associative law بنعيد التجميع:' + L('(p ∨ ¬q) ∨ q ≡ p ∨ (¬q ∨ q)') },
    { from: 'p ∨ «(¬q ∨ q)»', t: 'p ∨ «T»', law: 'negation', en: 'Negation law: ¬q ∨ q ≡ T.', ar: 'بالـ negation law:' + L('¬q ∨ q ≡ T') },
    { from: '«p ∨ T»', t: '«T»', law: 'domination', en: 'Domination law: p ∨ T ≡ T. Always true: <b>a tautology</b>.', ar: 'بالـ domination law:' + L('p ∨ T ≡ T') + 'يعني دايمًا true، يبقى tautology.' }
  ];
  const ProofNeg = ({ ar }) => html`<${Proof} ar=${ar} P=${PR_NEG} ng="~" />`;
  const Proof6 = ({ ar }) => html`<${Proof} ar=${ar} P=${PR_6} />`;
  const Proof7 = ({ ar }) => html`<${Proof} ar=${ar} P=${PR_7} />`;
  const Proof8 = ({ ar }) => html`<${Proof} ar=${ar} P=${PR_8} />`;

  /* ── [0.3–0.4] Example 1.2.4: negating if-then sentences; the negation is an "and", not another if-then ── */
  const SEN = {
    a: { p: 'My car is in the repair shop', q: 'I cannot get to class', nq: 'I can get to class' },
    b: { p: 'Sara lives in Athens', q: 'she lives in Greece', nq: 'she does not live in Greece' },
    j: { p: 'John is rich', q: 'he is famous', nq: 'he is not famous' }
  };
  const low = s => s ? s[0].toLowerCase() + s.slice(1) : s, up = s => s ? s[0].toUpperCase() + s.slice(1) : s;
  function NegSentence({ ar }) {
    const [m, setM] = useState('a'), [vp, setVp] = useState(true), [vq, setVq] = useState(false);
    const [op, setOp] = useState(SEN.j.p), [oq, setOq] = useState(SEN.j.q), [onq, setOnq] = useState(SEN.j.nq);
    const S = m === 'own' ? { p: op.trim() || 'p', q: oq.trim() || 'q', nq: onq.trim() || 'not q' } : SEN[m];
    const cond = `If ${low(S.p)}, then ${S.q}.`, and = `${up(S.p)} and ${S.nq}.`, wrong = `If ${low(S.p)}, then ${S.nq}.`;
    const rev = m === 'j';
    const vc = !vp || vq, vn = vp && !vq, vw = !vp || !vq, wsame = vw === vc;
    const card = (lab, form, txt, v, extra, cls) => html`<div className=${'dmv5-sx' + (cls ? ' ' + cls : '')}><b>${lab} <em>${form}</em></b><span>${txt}</span><i className=${v ? 't' : 'f'} aria-label=${v ? 'true' : 'false'}>${TF(v)}</i>${extra ? html`<small>${extra}</small>` : null}</div>`;
    const intro = {
      a: { en: 'Example 1.2.4 (a). The negation of "if p then q" is <b>"p and not q"</b>.', ar: 'مثال (a) من الـ Example ' + B('1.2.4') + '، ونفي ' + B('"if p then q"') + ' هو <b>' + B('"p and not q"') + '</b>.' },
      b: { en: 'Example 1.2.4 (b). Sara might live in Athens, Georgia; Athens, Ohio; or Athens, Wisconsin: then p is T and q is F, and the negation is true.', ar: 'مثال (b) من Example 1.2.4: ممكن تكون Sara عايشة في Athens اللي في Georgia أو Ohio أو Wisconsin، ساعتها p تبقى T و q تبقى F، والنفي يبقى true.' },
      j: { en: 'From the cards: the negation of "John is rich and he is not famous" (p ∧ ~q) is "John is not rich or he is famous", that is <b>"If John is rich, then he is famous"</b>.', ar: 'من الـ cards: نفي الجملة دي بيرجع الـ if-then، يعني:' + L('~(p ∧ ~q) ≡ ~p ∨ q ≡ p → q') + 'والنفي هو:' + L('"If John is rich, then he is famous"') },
      own: { en: 'Type your own p, q and "not q": the negation is always "p and not q".', ar: 'اكتب الـ p والـ q والـ ' + B('"not q"') + ' بتوعك، والنفي دايمًا ' + B('"p and not q"') + '.' }
    }[m];
    const en = intro.en + ` With p = ${TF(vp)} and q = ${TF(vq)}, the if-then is <b>${TF(vc)}</b> and the "and" statement is <b>${TF(vn)}</b>: always opposite.` + (wsame ? ` The if-then "${wrong}" is also ${TF(vw)} here, so it cannot be the negation: the negation of an if-then is not another if-then.` : '');
    const a = intro.ar + ` ولما p تبقى ${TF(vp)} و q تبقى ${TF(vq)} الـ if-then قيمتها ${TF(vc)} وجملة الـ and قيمتها ${TF(vn)}، ودايمًا عكس بعض.` + (wsame ? ` والـ if-then الغلط قيمتها برضه ${TF(vw)} هنا، يعني مش ممكن تبقى النفي: نفي الـ if-then مش if-then تانية.` : '');
    const tg = (lab, v, set) => html`<span>${lab} = <button className=${'fig-btn' + (v ? ' dmv5-on' : '')} onClick=${() => set(true)} aria-pressed=${String(v)}>T</button><button className=${'fig-btn' + (!v ? ' dmv5-on' : '')} onClick=${() => set(false)} aria-pressed=${String(!v)}>F</button></span>`;
    return html`<figure className="fig dmv5"><div className="fig-stage">
      <${Chips} items=${[['a', 'Example (a)'], ['b', 'Example (b)'], ['j', 'John (card)'], ['own', 'Try your own']]} sel=${m} on=${setM} />
      ${m === 'own' && html`<div className="dmv5-own">
        <label>p <input className="dmv5-in txt" value=${op} onInput=${e => setOp(e.target.value)} aria-label="p" /></label>
        <label>q <input className="dmv5-in txt" value=${oq} onInput=${e => setOq(e.target.value)} aria-label="q" /></label>
        <label>not q <input className="dmv5-in txt" value=${onq} onInput=${e => setOnq(e.target.value)} aria-label="not q" /></label></div>`}
      <div className="dmv5-world">${tg('p', vp, setVp)}${tg('q', vq, setVq)}</div>
      <div className="dmv5-sc">
        ${rev ? card('Statement', 'p ∧ ~q', and, vn) : card('Statement', 'p → q', cond, vc)}
        ${rev ? card('Negation', 'p → q', cond, vc, '= "John is not rich or he is famous" (~p ∨ q)') : card('Negation', 'p ∧ ~q', and, vn)}
        ${!rev && card('Not the negation', 'p → ~q', wrong, vw, wsame ? 'Same value as the statement here: an if-then is not the negation.' : 'Opposite here, but not in every case: try p = F.', 'wrong')}
      </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [1] order of operations: ~ first, then ∧ ∨, then → ↔ ── */
  const PRI = [['1', '~', 'Evaluate negations first.'], ['2', '∧, ∨', 'Evaluate ∧ and ∨ second. When both are present, parentheses may be needed.'], ['3', '→, ↔', 'Evaluate → and ↔ third. When both are present, parentheses may be needed.']];
  function segs(n, k, top) { // formula as coloured pieces, brackets added for every group already evaluated at step k
    if (n.t === 'v' || n.t === 'c') return [{ s: pr(n) }];
    if (n.t === '¬') { const inner = atomic(n.a) ? segs(n.a, k, true) : [{ s: '(' }, ...segs(n.a, k, true), { s: ')' }]; return [{ s: '¬', c: k >= 1 ? 'l1' : '' }, ...inner].map(x => k >= 1 && atomic(n.a) ? Object.assign({}, x, { c: (x.c || '') + ' u1' }) : x); }
    const Lv = LV[n.t], body = [...segs(n.a, k, false), { s: ' ' + n.t + ' ', c: k >= Lv ? 'l' + Lv : '' }, ...segs(n.b, k, false)];
    if (top) return body;
    return n.par0 ? [{ s: '(' }, ...body, { s: ')' }] : k >= Lv ? [{ s: '(', c: 'add l' + Lv }, ...body, { s: ')', c: 'add l' + Lv }] : body;
  }
  function parseKeep(s) { // like parse, but remembers which groups the user bracketed
    const T = lex(s); let k = 0;
    function atom() { const t = T[k]; if (t == null) throw { msg: 'the formula ends too early' };
      if (t === '¬') { k++; return { t: '¬', a: atom() }; }
      if (t === '(') { k++; const e = level(3); if (T[k] !== ')') throw { msg: 'a bracket is not closed' }; k++; return atomic(e) || e.t === '¬' ? e : Object.assign(e, { par0: true }); }
      if (t === 'T' || t === 'F') { k++; return { t: 'c', v: t === 'T' }; }
      if (/^[a-z]$/.test(t)) { k++; return { t: 'v', v: t }; }
      throw { msg: '"' + t + '" is in the wrong place' }; }
    function level(Lv) { const sub = () => Lv === 2 ? atom() : level(2), items = [sub()], ops = [];
      while (k < T.length && LV[T[k]] === Lv) { ops.push(T[k]); k++; items.push(sub()); }
      if (!ops.length) return items[0];
      if (new Set(ops).size > 1 || (Lv === 3 && ops.length > 1)) throw { amb: true, Lv, ops, items, msg: 'parentheses are needed' };
      let e = items[0]; ops.forEach((o, j) => { e = { t: o, a: e, b: items[j + 1] }; }); return e; }
    const e = level(3); if (k < T.length) throw { msg: '"' + T[k] + '" is in the wrong place' }; return e;
  }
  const OPS_EX = ['p ∨ q → r', 'r ∨ p ∧ q', '¬p → q'];
  function OpsRun({ ar, src }) {
    let tree = null, err = null;
    try { tree = parseKeep(src); } catch (e) { err = e; }
    const amb = err && err.amb ? err : null;
    let reads = null;
    if (amb && amb.ops.length === 2) {
      const [i0, i1, i2] = amb.items, [o0, o1] = amb.ops;
      const r1 = { t: o1, a: { t: o0, a: i0, b: i1 }, b: i2 }, r2 = { t: o0, a: i0, b: { t: o1, a: i1, b: i2 } };
      const vs = varsOf(r1), d = rowsOf(vs).find(e => ev(r1, e) !== ev(r2, e));
      reads = { r1: pr(r1), r2: pr(r2), d: d && vs.map(v => v + ' = ' + TF(d[v])).join(', '), v1: d && TF(ev(r1, d)), v2: d && TF(ev(r2, d)) };
    }
    const toks = (() => { try { return lex(src); } catch (e) { return null; } })();
    const flat = toks ? toks.map(t => LV[t] ? ' ' + t + ' ' : t).join('') : src;
    const hasNeg = toks && toks.includes('¬'), has2 = toks && toks.some(t => LV[t] === 2), has3 = toks && toks.some(t => LV[t] === 3);
    const full = tree ? pr(tree) : '';
    const steps = [
      { en: `The formula as written: <b>${flat}</b>. Apply the order of operations.`, ar: 'دي الـ formula زي ما هي مكتوبة، وهنطبّق عليها الـ order of operations:' + L(flat) },
      { en: '<b>Priority 1: ~ first.</b> ' + (hasNeg ? 'Each ~ (¬) applies only to the symbol or bracket right after it.' : 'There is no ~ here.'), ar: hasNeg ? 'الأولوية الأولى للنفي ' + B('~') + '، وكل نفي بيتطبّق على الرمز أو القوس اللي بعده على طول بس.' : 'الأولوية الأولى للنفي ' + B('~') + '، ومفيش نفي هنا.' },
      amb && amb.Lv === 2
        ? { en: `<b>Priority 2:</b> ∧ and ∨ have the <b>same</b> priority, so it can be read two ways: <b>${reads ? reads.r1 : '…'}</b> or <b>${reads ? reads.r2 : '…'}</b>.` + (reads && reads.d ? ` They differ when ${reads.d} (${reads.v1} vs ${reads.v2}): parentheses are needed.` : ' Parentheses are needed.') + (flat === 'r ∨ p ∧ q' ? ' (The quiz reads it as r ∨ (p ∧ q).)' : ''),
          ar: 'الأولوية التانية: الـ ' + B('∧') + ' والـ ' + B('∨') + ' ليهم <b>نفس</b> الأولوية، فالـ formula تتقري بطريقتين:' + L(reads ? reads.r1 + ' &nbsp; أو &nbsp; ' + reads.r2 : flat) + (reads && reads.d ? 'والاتنين بيختلفوا في الحالة دي:' + L(reads.d + ' &nbsp;⟹&nbsp; ' + reads.v1 + ' , ' + reads.v2) : '') + 'يبقى لازم أقواس.' + (flat === 'r ∨ p ∧ q' ? ' والـ quiz بيقراها كده:' + L('r ∨ (p ∧ q)') : '') }
        : { en: '<b>Priority 2: ∧ and ∨ next.</b> ' + (has2 ? 'They group before → and ↔ (coloured brackets).' : 'There is no ∧ or ∨ here.'), ar: has2 ? 'الأولوية التانية للـ ' + B('∧') + ' والـ ' + B('∨') + '، بيتجمّعوا قبل الـ ' + B('→') + ' والـ ' + B('↔') + ' (الأقواس الملوّنة).' : 'الأولوية التانية للـ ' + B('∧') + ' والـ ' + B('∨') + '، ومفيش منهم هنا.' },
      amb && amb.Lv === 3
        ? { en: `<b>Priority 3:</b> → and ↔ come last, but two of them appear together, so it can be read two ways: <b>${reads ? reads.r1 : '…'}</b> or <b>${reads ? reads.r2 : '…'}</b>.` + (reads && reads.d ? ` They differ when ${reads.d} (${reads.v1} vs ${reads.v2}): parentheses are needed.` : ' Parentheses are needed.'),
          ar: 'الأولوية التالتة للـ ' + B('→') + ' والـ ' + B('↔') + '، بس فيه اتنين منهم مع بعض، فالـ formula تتقري بطريقتين:' + L(reads ? reads.r1 + ' &nbsp; أو &nbsp; ' + reads.r2 : flat) + (reads && reads.d ? 'والاتنين بيختلفوا في الحالة دي:' + L(reads.d + ' &nbsp;⟹&nbsp; ' + reads.v1 + ' , ' + reads.v2) : '') + 'يبقى لازم أقواس.' }
        : amb ? { en: '<b>Priority 3: → and ↔ last</b>, but the ∧ / ∨ part above needs parentheses first.', ar: 'الأولوية التالتة للـ ' + B('→') + ' والـ ' + B('↔') + '، بس لازم نحط أقواس للجزء اللي فوق الأول.' }
        : { en: '<b>Priority 3: → and ↔ last.</b> ' + (has3 ? '' : 'There is no → or ↔ here. ') + `So the formula means <b>${full}</b>.`, ar: 'الأولوية التالتة والأخيرة للـ ' + B('→') + ' والـ ' + B('↔') + '. يبقى معنى الـ formula هو:' + L(full) }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const pieces = tree ? segs(tree, i, true) : null;
    return html`<div>
      ${err && !amb ? html`<p className="dmv5-err">${err.msg}</p>` : html`<div className="dmv5-ops">${pieces ? pieces.map((x, j) => html`<span key=${j} className=${x.c || ''}>${x.s}</span>`) : flat}</div>`}
      <div className="dmv5-pri">${PRI.map(([n, o, r], j) => html`<div key=${n} className=${i === j + 1 ? 'on' : ''}><span>${n}</span><b>${o}</b><span>${r}</span></div>`)}</div>
      ${amb && reads && i >= amb.Lv && html`<div className="dmv5-read"><div>${reads.r1}<small>${reads.d ? reads.d + ' gives ' + reads.v1 : ''}</small></div><div>${reads.r2}<small>${reads.d ? reads.d + ' gives ' + reads.v2 : ''}</small></div></div>`}
      ${err && !amb ? null : html`<${Cap} ...${steps[i]} showAr=${ar} />`}${err && !amb ? null : html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}
    </div>`;
  }
  function OpsOrder({ ar }) {
    const [m, setM] = useState('0'), [own, setOwn] = useState('p ∨ q → r'), K = useKeys(1);
    const src = m === 'own' ? own : OPS_EX[+m];
    return html`<figure className="fig dmv5"><div className="fig-stage">
      <${Chips} items=${[...OPS_EX.map((x, j) => [String(j), x]), ['own', 'Try your own']]} sel=${m} on=${setM} />
      ${m === 'own' && html`<div className="dmv5-own"><input ref=${K.refs[0]} className="dmv5-in" value=${own} onInput=${e => setOwn(e.target.value)} aria-label="formula" spellCheck="false" autoCapitalize="off" /><${Keys} onKey=${k => K.ins(k, [own], [setOwn])} /></div>`}
      <${OpsRun} key=${src} ar=${ar} src=${src} />
    </div></figure>`;
  }

  /* ── [2] the biconditional table, row by row ── */
  function BicondTable({ ar }) {
    const cols = ['p → q', 'q → p', 'p ↔ q', '(p → q) ∧ (q → p)'].map(parse);
    const verdict = { en: 'The columns p ↔ q and (p → q) ∧ (q → p) are identical in all 4 rows, so <b>p ↔ q ≡ (p → q) ∧ (q → p)</b>: "p if, and only if, q" means both conditionals.', ar: 'العمودين متطابقين في الـ 4 صفوف، يبقوا logically equivalent، و' + B('"p if, and only if, q"') + ' معناها الـ conditional في الاتجاهين:' + L('p ↔ q ≡ (p → q) ∧ (q → p)') };
    return html`<figure className="fig dmv5"><${TTSteps} ar=${ar} vs=${['p', 'q']} cols=${cols} cmp=${[2, 3]} verdict=${verdict} /></figure>`;
  }

  /* ── [3] [4] Tables 7 and 8 checked by truth tables, and [9] the tautology exercises ── */
  const T7 = [['p → q', '¬p ∨ q', 'the key rewrite'], ['p → q', '¬q → ¬p', 'contrapositive'], ['p ∨ q', '¬p → q', ''], ['p ∧ q', '¬(p → ¬q)', ''], ['¬(p → q)', 'p ∧ ¬q', 'negation of a conditional'], ['(p → q) ∧ (p → r)', 'p → (q ∧ r)', 'asked in Exam 2025/26 Q2b'], ['(p → r) ∧ (q → r)', '(p ∨ q) → r', 'division into cases'], ['(p → q) ∨ (p → r)', 'p → (q ∨ r)', ''], ['(p → r) ∨ (q → r)', '(p ∧ q) → r', '']];
  const T8 = [['p ↔ q', '(p → q) ∧ (q → p)', ''], ['p ↔ q', '¬p ↔ ¬q', ''], ['p ↔ q', '(p ∧ q) ∨ (¬p ∧ ¬q)', ''], ['¬(p ↔ q)', 'p ↔ ¬q', '']];
  const ERRCAP = { en: 'Check the formula: use letters, ¬ ~ ∧ ∨ → ↔ (or -&gt;, &lt;-&gt;) and brackets.', ar: 'راجع الـ formula، واستخدم حروف والرموز دي والأقواس:' + L('¬ ~ ∧ ∨ → ↔ &nbsp; -&gt; &nbsp; &lt;-&gt;') };
  const pretty = src => /[-<>=&|!~^]/.test(src) ? lex(src).map(t => LV[t] ? ' ' + t + ' ' : t).join('') : src.trim();
  function setup(srcs) {
    try {
      const fs = srcs.map(parse), vs = varsOf(...fs);
      if (vs.length > 4) return { err: 'use at most 4 letters' };
      fs.forEach((f, j) => { f.s = pretty(srcs[j]); });
      const { list, idx } = autoCols(fs, 6);
      return { vs: vs.length ? vs : ['p'], list, idx };
    } catch (e) { return { err: e.msg }; }
  }
  function EquivCheck({ ar, list, own0 }) {
    const [sel, setSel] = useState('0'), [a, setA] = useState(own0[0]), [b, setB] = useState(own0[1]), K = useKeys(2);
    const row = sel === 'own' ? [a, b, ''] : list[+sel], S = setup([row[0], row[1]]);
    const top = html`<select className="dmv5-sel" value=${sel} onChange=${e => setSel(e.target.value)} aria-label="choose an equivalence">
        ${list.map((x, j) => html`<option key=${j} value=${String(j)}>${x[0]} ≡ ${x[1]}</option>`)}<option value="own">Try your own</option></select>
      ${row[2] && html`<span className="dmv5-tag">${row[2]}</span>`}
      ${sel === 'own' && html`<div className="dmv5-own">
        <label>left <input ref=${K.refs[0]} className="dmv5-in" value=${a} onInput=${e => setA(e.target.value)} onFocus=${() => { K.last.current = 0; }} aria-label="left side" spellCheck="false" autoCapitalize="off" /></label>
        <label>right <input ref=${K.refs[1]} className="dmv5-in" value=${b} onInput=${e => setB(e.target.value)} onFocus=${() => { K.last.current = 1; }} aria-label="right side" spellCheck="false" autoCapitalize="off" /></label>
        <${Keys} onKey=${k => K.ins(k, [a, b], [setA, setB])} /></div>`}`;
    if (S.err) return html`<figure className="fig dmv5"><div className="fig-stage">${top}<p className="dmv5-err">${S.err}</p></div>
      <${Cap} ...${ERRCAP} showAr=${ar} /></figure>`;
    return html`<figure className="fig dmv5"><${TTSteps} key=${sel + '|' + row[0] + '|' + row[1]} ar=${ar} top=${top} vs=${S.vs} cols=${S.list} cmp=${S.idx} ms=${S.vs.length > 2 ? 900 : 1300} /></figure>`;
  }
  const T7Check = ({ ar }) => html`<${EquivCheck} ar=${ar} list=${T7} own0=${['p ∨ q → r', '(p → r) ∧ (q → r)']} />`;
  const T8Check = ({ ar }) => html`<${EquivCheck} ar=${ar} list=${T8} own0=${['P ↔ Q', '(P ∧ Q) ∨ (¬P ∧ ¬Q)']} />`;

  const EX9 = [
    { f: '(p ∧ q) → p', en: 'If p ∧ q is true, p is true.', ar: 'لو ' + B('p&nbsp;∧&nbsp;q') + ' قيمتها true يبقى p لازم true.' },
    { f: 'p → (p ∨ q)', en: 'If p is true, p ∨ q is true.', ar: 'لو p قيمتها true يبقى ' + B('p&nbsp;∨&nbsp;q') + ' كمان true.' },
    { f: '¬p → (p → q)', en: 'If ¬p is true, p is false so p → q is true.', ar: 'لو ' + B('¬p') + ' قيمتها true يبقى p بـ false، وبالتالي ' + B('p&nbsp;→&nbsp;q') + ' بـ true.' },
    { f: '(p ∧ q) → (p → q)', en: 'If p ∧ q is true, q is true so p → q is true.', ar: 'لو ' + B('p&nbsp;∧&nbsp;q') + ' قيمتها true يبقى q بـ true، وبالتالي ' + B('p&nbsp;→&nbsp;q') + ' بـ true.' },
    { f: '¬(p → q) → p', en: '¬(p → q) ≡ p ∧ ¬q, which forces p true.', ar: 'لأن النفي ده بيساوي' + L('¬(p → q) ≡ p ∧ ¬q') + 'ودي بتجبر p تبقى true.' },
    { f: '¬(p → q) → ¬q', en: 'p ∧ ¬q forces ¬q true.', ar: 'الـ ' + B('p&nbsp;∧&nbsp;¬q') + ' بتجبر ' + B('¬q') + ' تبقى true.' },
    { f: '[¬p ∧ (p ∨ q)] → q', en: 'Disjunctive syllogism.', ar: 'ده الـ disjunctive syllogism.' },
    { f: '[(p → q) ∧ (q → r)] → (p → r)', en: 'Hypothetical syllogism.', ar: 'ده الـ hypothetical syllogism.' },
    { f: '[p ∧ (p → q)] → q', en: 'Modus ponens.', ar: 'ده الـ modus ponens.' },
    { f: '[(p ∨ q) ∧ (p → r) ∧ (q → r)] → r', en: 'Proof by cases.', ar: 'ده الـ proof by cases.' }
  ];
  function TautEx({ ar }) {
    const [sel, setSel] = useState('0'), [own, setOwn] = useState('(p ∧ q) → (p ∨ q)'), K = useKeys(1);
    const X = sel === 'own' ? { f: own } : EX9[+sel], S = setup([X.f]);
    const top = html`<select className="dmv5-sel" value=${sel} onChange=${e => setSel(e.target.value)} aria-label="choose a statement">
        ${EX9.map((x, j) => html`<option key=${j} value=${String(j)}>${String.fromCharCode(97 + j)}) ${x.f}</option>`)}<option value="own">Try your own</option></select>
      ${sel === 'own' && html`<div className="dmv5-own"><input ref=${K.refs[0]} className="dmv5-in" value=${own} onInput=${e => setOwn(e.target.value)} aria-label="statement" spellCheck="false" autoCapitalize="off" /><${Keys} onKey=${k => K.ins(k, [own], [setOwn])} /></div>`}`;
    if (S.err) return html`<figure className="fig dmv5"><div className="fig-stage">${top}<p className="dmv5-err">${S.err}</p></div>
      <${Cap} ...${ERRCAP} showAr=${ar} /></figure>`;
    const why = X.en ? 'Why: ' + X.en : null;
    const tail = X.en ? { en: ' Why: ' + X.en, ar: ' والسبب: ' + X.ar } : { en: '', ar: '' };
    const R = rowsOf(S.vs), t = S.idx[0], allT = R.every(e => ev(S.list[t], e)), n = R.length;
    const verdict = allT ? { en: `The last column is T in all ${n} rows: <b>a tautology</b>.` + tail.en, ar: `العمود الأخير قيمته T في كل الـ ${n} صفوف، يبقى tautology.` + tail.ar } : null;
    return html`<figure className="fig dmv5"><${TTSteps} key=${sel + '|' + X.f} ar=${ar} top=${top} vs=${S.vs} cols=${S.list} taut=${t} verdict=${verdict} why=${allT ? why : null} ms=${S.vs.length > 2 ? 900 : 1300} /></figure>`;
  }

  /* ── [5.0–5.1] converse, contrapositive and inverse ── */
  function VarRun({ ar, H, C, exam }) {
    const h = parse(H), c = parse(C), imp = (a, b) => ({ t: '→', a, b });
    const F = [imp(h, c), imp(c, h), imp(neg(c), neg(h)), imp(neg(h), neg(c))];
    const S = F.map(f => pr(f)), vs = varsOf(h, c), R = rowsOf(vs), V = R.map(e => F.map(f => ev(f, e)));
    const eq = (x, y) => V.every(r => r[x] === r[y]);
    const dn = h.t === '¬' || c.t === '¬';
    const dnEn = dn ? ' (¬(¬x) ≡ x by double negation)' : '', dnAr = dn ? ' واستخدمنا الـ double negation:' + L('¬(¬x) ≡ x') : '';
    const steps = [
      { en: `The conditional <b>${S[0]}</b>: hypothesis ${pr(h)}, conclusion ${pr(c)}.`, ar: 'الـ conditional هو' + L(S[0]) + 'والـ hypothesis هي ' + B(pr(h)) + ' والـ conclusion هي ' + B(pr(c)) + '.' },
      { en: `<b>Converse</b>: swap hypothesis and conclusion: <b>${S[1]}</b>.` + (exam ? ' (Exam 2020/21 Q8: the converse of ¬p → q is q → ¬p.)' : ''), ar: 'الـ <b>converse</b>: بنبدّل الـ hypothesis والـ conclusion:' + L(S[1]) + (exam ? 'ودي إجابة سؤال 8 في امتحان ' + B('2020/21') + '.' : '') },
      { en: `<b>Contrapositive</b>: swap and negate both: <b>${S[2]}</b>` + dnEn + '. It is equivalent to the conditional.', ar: 'الـ <b>contrapositive</b>: بنبدّل وننفي الاتنين، وده مكافئ للـ conditional:' + L(S[2]) + dnAr },
      { en: `<b>Inverse</b>: negate both without swapping: <b>${S[3]}</b>` + dnEn + '. It is equivalent to the converse.', ar: 'الـ <b>inverse</b>: بننفي الاتنين من غير ما نبدّل، وده مكافئ للـ converse:' + L(S[3]) + dnAr },
      { en: 'The truth table: ' + (eq(0, 2) ? 'conditional ≡ contrapositive (blue)' : 'conditional and contrapositive differ') + ', ' + (eq(1, 3) ? 'converse ≡ inverse (red)' : 'converse and inverse differ') + (eq(0, 1) ? '. Here the conditional and its converse also agree.' : '. The conditional and its converse are <b>not</b> equivalent.'),
        ar: 'الـ truth table بيوضّح الأزواج: الـ conditional مع الـ contrapositive (أزرق)، والـ converse مع الـ inverse (أحمر).' + (eq(0, 1) ? ' وهنا الـ conditional والـ converse متطابقين كمان.' : ' لكن الـ conditional والـ converse <b>مش</b> equivalent.') }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const N = [['Conditional', 'p → q'], ['Converse', 'swap'], ['Contrapositive', 'swap and negate'], ['Inverse', 'negate']];
    const cardCls = j => i === 4 ? (j === 0 || j === 2 ? 'pa' : 'pb') : j === i ? 'on' : j > i ? 'dim' : '';
    return html`<div>
      <div className="dmv5-sq">${[0, 1, 3, 2].map(j => html`<div key=${j} className=${'dmv5-vc ' + cardCls(j)}><b>${N[j][0]}</b><span>${S[j]}</span><small>${j ? N[j][1] : 'start'}</small></div>`)}</div>
      ${i === 4 && html`<div style=${{ marginTop: '10px' }}><${TTable} vs=${vs} R=${R} V=${V} heads=${['cond', 'conv', 'contra', 'inv']} filled=${R.length} cls=${['k', 'k2', 'k', 'k2']} cur=${-1} /></div>`}
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function Variants({ ar }) {
    const [m, setM] = useState('a'), [h, setH] = useState('p ∨ q'), [c, setC] = useState('r'), K = useKeys(2);
    let H = 'p', C = 'q', err = null;
    if (m === 'b') { H = '¬p'; C = 'q'; }
    if (m === 'own') { H = h; C = c; try { parse(h); parse(c); } catch (e) { err = e.msg; } }
    return html`<figure className="fig dmv5"><div className="fig-stage">
      <${Chips} items=${[['a', 'p → q'], ['b', '¬p → q (exam)'], ['own', 'Try your own']]} sel=${m} on=${setM} />
      ${m === 'own' && html`<div className="dmv5-own">
        <label>hypothesis <input ref=${K.refs[0]} className="dmv5-in" value=${h} onInput=${e => setH(e.target.value)} onFocus=${() => { K.last.current = 0; }} aria-label="hypothesis" spellCheck="false" autoCapitalize="off" /></label>
        <label>conclusion <input ref=${K.refs[1]} className="dmv5-in" value=${c} onInput=${e => setC(e.target.value)} onFocus=${() => { K.last.current = 1; }} aria-label="conclusion" spellCheck="false" autoCapitalize="off" /></label>
        <${Keys} onKey=${k => K.ins(k, [h, c], [setH, setC])} /></div>`}
      ${err ? html`<p className="dmv5-err">${err}</p>` : html`<${VarRun} key=${H + '|' + C} ar=${ar} H=${H} C=${C} exam=${m === 'b'} />`}
    </div></figure>`;
  }

  /* ── [5.2] "p if q" and "p only if q" together make "p if, and only if, q" ── */
  function IffParts({ ar }) {
    const steps = [
      { en: '"p <b>if</b> q" means: if q then p, that is <b>q → p</b>.', ar: 'جملة ' + B('"p if q"') + ' معناها لو q يبقى p، يعني:' + L('q → p') },
      { en: '"p <b>only if</b> q" means: if p then q, that is <b>p → q</b>.', ar: 'وجملة ' + B('"p only if q"') + ' معناها لو p يبقى q، يعني:' + L('p → q') },
      { en: '"p <b>if, and only if,</b> q" means both: (p → q) ∧ (q → p), written <b>p ↔ q</b>.', ar: 'وجملة ' + B('"p if, and only if, q"') + ' معناها الاتنين مع بعض، وبنكتبها كده:' + L('(p → q) ∧ (q → p) ≡ p ↔ q') }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const on = k => ({ opacity: i >= k ? 1 : .15, transition: 'opacity .5s' });
    return html`<figure className="fig dmv5 dmv5-iff"><div className="fig-stage">
      <svg viewBox="0 0 300 200" role="img" aria-label="p if q is q → p, p only if q is p → q, together p ↔ q">
        <defs><marker id="dmv5-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--fig-k)" /></marker>
          <marker id="dmv5-ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--pen)" /></marker></defs>
        <rect x="14" y="78" width="64" height="44" rx="10" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" /><text x="46" y="108" textAnchor="middle" fontSize="24" fontWeight="700">p</text>
        <rect x="222" y="78" width="64" height="44" rx="10" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" /><text x="254" y="108" textAnchor="middle" fontSize="24" fontWeight="700">q</text>
        <g style=${on(0)}><path d="M240 76 Q150 14 62 76" fill="none" stroke="var(--fig-k)" strokeWidth="3" markerEnd="url(#dmv5-ah)" />
          <text x="150" y="26" textAnchor="middle" fontSize="15" fontWeight="600">p if q</text><text x="150" y="72" textAnchor="middle" fontSize="16" fontWeight="700" style=${{ fill: 'var(--fig-k)' }}>q → p</text></g>
        <g style=${on(1)}><path d="M62 124 Q150 186 240 124" fill="none" stroke="var(--pen)" strokeWidth="3" markerEnd="url(#dmv5-ah2)" />
          <text x="150" y="140" textAnchor="middle" fontSize="16" fontWeight="700" style=${{ fill: 'var(--pen)' }}>p → q</text><text x="150" y="194" textAnchor="middle" fontSize="15" fontWeight="600">p only if q</text></g>
        <g style=${on(2)}><rect x="100" y="84" width="100" height="32" rx="16" fill="var(--fig-s)" /><text x="150" y="106" textAnchor="middle" fontSize="18" fontWeight="700" style=${{ fill: '#fff' }}>p ↔ q</text></g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'dm-l5-neg-table': NegTable,
    'dm-l5-neg-derive': ProofNeg,
    'dm-l5-neg-sentence': NegSentence,
    'dm-l5-ops-order': OpsOrder,
    'dm-l5-bicond-table': BicondTable,
    'dm-l5-t7-check': T7Check,
    'dm-l5-t8-check': T8Check,
    'dm-l5-variants': Variants,
    'dm-l5-iff-parts': IffParts,
    'dm-l5-proof-neg-or': Proof6,
    'dm-l5-proof-taut-and-or': Proof7,
    'dm-l5-proof-taut-ds': Proof8,
    'dm-l5-taut-ex': TautEx,
  });
})();
/* ── part L7 ── */
// Discrete Mathematics visuals, Lecture 7 (expectation (mean) and variance of a random variable): mean as the balance point, E(X) and σ² tables filled step by step for every example (with "Try your own"), Σ becoming ∫, E[g(X)], squared deviations, the coin example with a toss simulator, and the two continuous examples. Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.dmv7 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dmv7 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dmv7 .fig-dots{ flex-wrap:wrap; max-width:100%; }
.dmv7-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dmv7-modes .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.dmv7-t{ border-collapse:collapse; margin:0 auto; width:100%; max-width:440px; font-size:.82rem; font-variant-numeric:tabular-nums; color:var(--ink); table-layout:fixed; }
.dmv7-t th, .dmv7-t td{ border:1px solid var(--line); padding:4px 2px; text-align:center; background:var(--paper); color:var(--ink); overflow-wrap:anywhere; }
.dmv7-t th{ background:var(--paper-2); color:var(--graphite); font-weight:600; font-size:.76rem; line-height:1.2; }
.dmv7-t td.dmv7-on{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); font-weight:700; }
.dmv7-t td.dmv7-q{ color:var(--pen); font-weight:700; }
.dmv7-t tr.dmv7-sum td{ background:var(--paper-2); font-weight:700; }
.dmv7-t input{ width:100%; box-sizing:border-box; font:inherit; text-align:center; padding:3px 1px; border:1px solid var(--line); border-radius:6px; background:var(--paper-2); color:var(--ink); min-width:0; }
.dmv7-f{ max-width:460px; margin:8px auto 0; font:.8rem/1.55 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px 8px; overflow-wrap:anywhere; }
.dmv7-f div{ padding:1px 0; } .dmv7-f .dmv7-on{ color:var(--fig-k); font-weight:700; }
.dmv7-svg{ max-width:460px; margin:0 auto 6px; }
.dmv7 svg .dmv7-ax{ stroke:var(--graphite); stroke-width:1.5; fill:none; }
.dmv7 svg .dmv7-gr{ stroke:var(--line); stroke-width:1; fill:none; }
.dmv7 svg .dmv7-bar{ fill:color-mix(in srgb, var(--fig-k) 45%, var(--paper)); stroke:var(--fig-k); stroke-width:1.5; transition:opacity .4s; }
.dmv7 svg .dmv7-bar.dmv7-hi{ fill:color-mix(in srgb, var(--fig-k) 80%, var(--paper)); }
.dmv7 svg .dmv7-mu{ stroke:var(--pen); stroke-width:2; stroke-dasharray:5 4; }
.dmv7 svg .dmv7-muT{ fill:var(--pen); }
.dmv7 svg .dmv7-band{ fill:color-mix(in srgb, var(--pen) 13%, transparent); }
.dmv7 svg .dmv7-crv{ stroke:var(--fig-k); stroke-width:2.5; fill:none; stroke-linejoin:round; }
.dmv7 svg .dmv7-area{ fill:color-mix(in srgb, var(--fig-k) 28%, transparent); }
.dmv7 svg .dmv7-strip{ fill:color-mix(in srgb, var(--fig-k) 30%, transparent); stroke:var(--fig-k); stroke-width:1; }
.dmv7 svg .dmv7-sq{ stroke:var(--fig-k); stroke-width:1.2; fill:var(--fig-k); transition:opacity .4s; }
.dmv7 svg .dmv7-sq.dmv7-hi{ stroke:var(--pen); stroke-width:3; }
.dmv7 svg .dmv7-sd{ stroke:var(--pen); stroke-width:5; stroke-linecap:round; }
.dmv7 svg .dmv7-beam{ fill:var(--graphite); }
.dmv7 svg .dmv7-piv{ fill:var(--pen); }
.dmv7 svg text.dmv7-p{ fill:var(--pen); font-weight:700; }
.dmv7 svg text.dmv7-k{ fill:var(--fig-k); font-weight:700; }
.dmv7 svg text.dmv7-g{ fill:var(--graphite); }
.dmv7 svg text.dmv7-halo{ stroke:var(--paper-2); stroke-width:4; paint-order:stroke; }
.dmv7-tilt{ transition:transform .5s ease; transform-box:view-box; }
.dmv7-stack{ display:flex; height:28px; border:1px solid var(--line); border-radius:6px; overflow:hidden; max-width:440px; margin:0 auto 8px; }
.dmv7-stack span{ display:grid; place-items:center; font:600 .76rem var(--mono); color:var(--ink); background:color-mix(in srgb, var(--fig-k) 25%, var(--paper)); border-right:1px solid var(--paper); overflow:hidden; white-space:nowrap; transition:background .4s; }
.dmv7-stack span.dmv7-a{ background:color-mix(in srgb, var(--pen) 28%, var(--paper)); }
.dmv7-stack span.dmv7-gap{ background:repeating-linear-gradient(45deg, var(--paper-2) 0 6px, var(--paper) 6px 12px); color:var(--pen); }
.dmv7-row{ display:flex; flex-wrap:wrap; gap:6px 10px; justify-content:center; align-items:center; margin:6px 0; font-size:.86rem; color:var(--ink); }
.dmv7-row input[type=range]{ flex:1 1 150px; accent-color:var(--fig-k); min-width:0; }
.dmv7-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.dmv7-row b{ font-family:var(--mono); color:var(--fig-k); }
.dmv7-note{ font-size:.82rem; color:var(--graphite); text-align:center; margin:4px auto; max-width:460px; line-height:1.45; }
.dmv7-rtl{ display:block; direction:rtl; font-family:"IBM Plex Sans Arabic", var(--body); margin-top:2px; }
.dmv7-coins{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; }
.dmv7-tile{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; text-align:center; font-size:.8rem; color:var(--ink); line-height:1.35; }
.dmv7-tile b{ display:block; color:var(--fig-k); font-family:var(--mono); }
.dmv7-coin{ display:inline-grid; place-items:center; width:28px; height:28px; border-radius:50%; font:700 .9rem var(--mono); margin:0 2px; border:2px solid var(--fig-k); box-sizing:border-box; }
.dmv7-coin.dmv7-h{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dmv7-coin.dmv7-t{ background:var(--paper); color:var(--ink); }
.dmv7-grp{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:8px; align-items:end; max-width:420px; margin:0 auto; }
.dmv7-col{ display:flex; flex-direction:column; gap:6px; align-items:center; padding-bottom:6px; border-bottom:2px solid var(--graphite); }
.dmv7-lab{ text-align:center; font-size:.84rem; color:var(--ink); margin-top:4px; line-height:1.3; } .dmv7-lab b{ font-family:var(--mono); color:var(--fig-k); }
.dmv7-sim{ max-width:440px; margin:12px auto 0; border-top:1px dashed var(--line); padding-top:8px; }
.dmv7-hb{ display:grid; grid-template-columns:3.6em minmax(0, 1fr) 6.6em; gap:6px; align-items:center; font-size:.82rem; color:var(--ink); margin:3px 0; }
.dmv7-hb i{ display:block; height:14px; border-radius:3px; background:var(--fig-k); transition:width .4s ease; }
.dmv7-hb span:last-child{ font-family:var(--mono); text-align:right; }
@media (prefers-reduced-motion: reduce){ .dmv7-tilt, .dmv7-hb i, .dmv7 svg .dmv7-bar, .dmv7 svg .dmv7-sq{ transition:none; } }`;
  if (!document.getElementById('dmv7-css')) { const s = document.createElement('style'); s.id = 'dmv7-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = t => `<span class="ltr">${t}</span>`;
  const B = t => `<bdi dir="ltr">${String(t).replace(/ /g, '&nbsp;')}</bdi>`;
  const fm = v => { const x = Math.round(v * 1e4) / 1e4; return x === 0 ? '0' : String(x).replace('-', '−'); };
  const sum = a => a.reduce((s, v) => s + v, 0);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // steps that reset when `key` changes
  function useRun(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), k = useRef(key);
    useEffect(() => { if (k.current !== key) { k.current = key; setI(calm() ? n - 1 : 0); setPlay(!calm()); } }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.min(i, n - 1);
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: x => { setPlay(false); setI(x); } }];
  }
  const Modes = ({ list, mode, set }) => html`<div className="dmv7-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;

  /* ── the notes' discrete distributions ── */
  const SETS = {
    ex1: { t: 'Example 1', tAr: 'الـ Example 1', xs: ['0', '1', '2'], fs: ['1/4', '1/2', '1/4'], fr: { m: '1', e2: '3/2', v: '1/2' } },
    ex2: { t: 'Example 2', tAr: 'الـ Example 2', xs: ['-1', '0', '1', '2', '3'], fs: ['0.3', '0.1', '0.1', 'a', '0.2'] },
    try: { t: 'Try to solve', tAr: 'الـ Try to solve', xs: ['0', '2', '3', '4'], fs: ['0.1', '0.1', 'a', '0.2'] },
    ex4: { t: 'Example 4', tAr: 'الـ Example 4', xs: ['0', '1', '2', '3'], fs: ['0.51', '0.38', '0.10', '0.01'] }
  };
  const OWN0 = { xs: ['1', '2', '3', '4'], fs: ['0.2', '0.1', 'a', '0.3'] }; // the Q&A question: a = 0.4, E(X) = 2.8, V(X) = 1.16
  const num = s => { s = String(s).trim().replace(/−/g, '-'); if (s === '') return NaN; const m = s.match(/^(-?\d*\.?\d+)\s*\/\s*(\d*\.?\d+)$/); if (m) return +m[2] ? +m[1] / +m[2] : NaN; return Number(s); };
  const lab = s => String(s).trim().replace(/-/g, '−');
  function solve(xs, fs) {
    const x = xs.map(num), unk = fs.map(s => /^\s*a?\s*$/i.test(s)), ai = unk.indexOf(true);
    const E = (en, ar) => ({ err: { en, ar } });
    if (x.some(v => !isFinite(v))) return E('every x must be a number.', 'كل x لازم تبقى رقم.');
    if (new Set(x).size !== x.length) return E('the x values must all be different.', 'قيم الـ x لازم تبقى مختلفة عن بعض.');
    if (unk.filter(Boolean).length > 1) return E('leave at most one probability empty (or a).', 'سيب احتمال واحد بس فاضي (أو a).');
    const f0 = fs.map((s, j) => (unk[j] ? 0 : num(s)));
    if (f0.some(v => !isFinite(v) || v < 0 || v > 1)) return E('every f(x) must be a number from 0 to 1 (fractions like 1/4 work).', 'كل احتمال لازم يبقى رقم من 0 لـ 1، والكسور زي ' + B('1/4') + ' شغالة.');
    const known = sum(f0);
    if (ai < 0 && Math.abs(known - 1) > 1e-6) return E(`the probabilities add up to ${fm(known)}, not 1.`, 'مجموع الاحتمالات لازم يطلع 1، وهو هنا:' + L(`Σ f(x) = ${fm(known)}`));
    const a = 1 - known;
    if (ai >= 0 && a < -1e-9) return E(`the known probabilities already add up to ${fm(known)}, so a would be negative.`, 'الاحتمالات المعروفة مجموعها أكبر من 1، فالـ a هتطلع بالسالب:' + L(`a = 1 − ${fm(known)} = ${fm(a)}`));
    const f = f0.map((v, j) => (j === ai ? Math.max(0, a) : v));
    const m = sum(x.map((v, j) => v * f[j])), e2 = sum(x.map((v, j) => v * v * f[j])), v = e2 - m * m, dv = sum(x.map((u, j) => (u - m) ** 2 * f[j]));
    return { x, f, fl: fs.map(lab), xl: x.map(fm), ai, a: Math.max(0, a), known, m, e2, v: Math.max(0, v), dv, sd: Math.sqrt(Math.max(0, v)) };
  }

  // bars on a number line with μ and the μ ± σ band
  function DistBars({ d, hi, showM, showS, fl }) {
    const lo = Math.min(...d.x), up = Math.max(...d.x), pad = Math.max((up - lo) * .12, .5), X = v => 34 + (v - lo + pad) / (up - lo + 2 * pad) * 232;
    const xs = [...d.x].sort((a, b) => a - b), gap = Math.min(...xs.slice(1).map((v, j) => X(v) - X(xs[j])), 999), w = Math.min(30, gap * .6), fmax = Math.max(...d.f, 1e-9);
    const mx = X(d.m);
    return html`<svg className="dmv7-svg" viewBox="0 0 300 176" role="img" aria-label="Probability bars with the mean marked">
      ${showS && html`<g><rect className="dmv7-band" x=${clamp(X(d.m - d.sd), 2, 298)} y="22" width=${Math.max(0, clamp(X(d.m + d.sd), 2, 298) - clamp(X(d.m - d.sd), 2, 298))} height="98" /><text x=${clamp(mx, 40, 260)} y="16" textAnchor="middle" fontSize="14" className="dmv7-p">μ ± σ</text></g>`}
      <line className="dmv7-ax" x1="8" x2="292" y1="120" y2="120" />
      ${d.x.map((v, j) => { const h = d.f[j] / fmax * 78; return html`<g key=${j}>
        <rect className=${'dmv7-bar' + (j === hi ? ' dmv7-hi' : '')} x=${X(v) - w / 2} y=${120 - h} width=${w} height=${h} />
        <text x=${X(v)} y=${120 - h - 5} textAnchor="middle" fontSize="14" className=${j === d.ai ? 'dmv7-p' : ''}>${fl[j]}</text>
        <text x=${X(v)} y="139" textAnchor="middle" fontSize="15" className="dmv7-k">${d.xl[j]}</text></g>`; })}
      ${showM && html`<g><line className="dmv7-mu" x1=${mx} x2=${mx} y1="26" y2="122" /><path className="dmv7-muT" d=${`M${mx} 145 l7 11 h-14 z`} />
        <text x=${clamp(mx, 46, 254)} y="172" textAnchor="middle" fontSize="15" className="dmv7-p">μ = ${fm(d.m)}</text></g>`}
    </svg>`;
  }

  /* ── E(X) and σ² of a discrete X, filled step by step ── */
  function Disc({ ar, keys, vari, def, perCol }) {
    const [mode, setMode] = useState(keys[0]), [own, setOwn] = useState(OWN0);
    const isOwn = mode === 'own', S = isOwn ? { t: 'your table', tAr: 'الجدول بتاعك', ...own } : SETS[mode], d = solve(S.xs, S.fs);
    const st = [];
    if (d.err) st.push({ k: 'err' });
    else {
      st.push({ k: 'tab' }); if (d.ai >= 0) st.push({ k: 'a' });
      if (perCol) d.x.forEach((_, j) => st.push({ k: 'col', j }));
      st.push({ k: 'm' });
      if (vari) { st.push({ k: 'e2' }, { k: 'v' }); if (def) st.push({ k: 'def' }); st.push({ k: 'sd' }); }
    }
    const [i, ctl] = useRun(st.length, 2100, mode), s = st[i], at = k => st.findIndex(x => x.k === k), past = k => at(k) >= 0 && i >= at(k);
    const edit = (row, j, val) => { setOwn(o => { const n = { xs: [...o.xs], fs: [...o.fs] }; n[row][j] = val; return n; }); ctl.go(99); };
    const resize = dn => { setOwn(o => { const c = o.xs.length + dn; if (c < 2 || c > 6) return o; if (dn > 0) return { xs: [...o.xs, String(Math.max(...o.xs.map(num).filter(isFinite), 0) + 1)], fs: [...o.fs, '0'] }; return { xs: o.xs.slice(0, -1), fs: o.fs.slice(0, -1) }; }); ctl.go(99); };
    const list = keys.map(k => [k, k === 'own' ? 'Try your own' : SETS[k].t]);
    let en = '', a = '';
    const lines = [];
    if (!d.err) {
      const fl = d.fl.map((t, j) => (j === d.ai ? (past('a') ? fm(d.a) : 'a') : t)), P = v => (v < 0 ? `(${fm(v)})` : fm(v));
      const aLine = `${d.fl.map((t, j) => (j === d.ai ? 'a' : t)).join(' + ')} = 1 → a = 1 − ${fm(d.known)} = ${fm(d.a)}`;
      const mLine = `μ = E(X) = ${d.x.map((v, j) => `(${fm(v)})(${fl[j]})`).join(' + ')} = ${d.x.map((v, j) => fm(v * d.f[j])).join(' + ').replace(/\+ −/g, '− ')} = ${fm(d.m)}`;
      const e2Line = `E(X²) = ${d.x.map((v, j) => `(${fm(v * v)})(${fl[j]})`).join(' + ')} = ${d.x.map((v, j) => fm(v * v * d.f[j])).join(' + ')} = ${fm(d.e2)}${S.fr ? ' = ' + S.fr.e2 : ''}`;
      const vLine = `σ² = E(X²) − μ² = ${fm(d.e2)} − ${P(d.m)}² = ${fm(d.e2)} − ${fm(d.m * d.m)} = ${fm(d.v)}${S.fr ? ' = ' + S.fr.v : ''}`;
      const dLine = `Σ (x − μ)² f(x) = ${d.x.map((v, j) => `(${fm(v)} − ${fm(d.m)})²(${fl[j]})`).join(' + ')} = ${d.x.map((v, j) => fm((v - d.m) ** 2 * d.f[j])).join(' + ')} = ${fm(d.dv)}`;
      const sLine = `σ = √${fm(d.v)} ≈ ${fm(d.sd)}`;
      if (d.ai >= 0 && past('a')) lines.push(['a', 'Σ f(x) = 1: ' + aLine]);
      if (past('m')) lines.push(['m', mLine]);
      if (past('e2')) lines.push(['e2', e2Line]);
      if (past('v')) lines.push(['v', vLine]);
      if (past('def')) lines.push(['def', dLine]);
      if (past('sd')) lines.push(['sd', sLine]);
      const cj = s.k === 'col' ? s.j : -1, colDone = j => past('m') || (s.k === 'col' && j <= s.j);
      if (s.k === 'tab') { en = `<b>${S.t}</b>: each value x with its probability f(x).${d.ai >= 0 ? ' One probability is unknown: <b>a</b>.' : ''}${isOwn ? ' Type your own values in the table (fractions like 1/4 work; leave one f(x) as a to find it).' : ''}`; a = `في ${S.tAr} عندنا كل قيمة x والاحتمال بتاعها ${B('f(x)')}.${d.ai >= 0 ? ' وفيه احتمال مش معروف اسمه <b>a</b>.' : ''}${isOwn ? ' اكتب القيم بتاعتك في الجدول، والكسور زي ' + B('1/4') + ' شغالة، وسيب احتمال واحد a عشان تطلعه.' : ''}`; }
      else if (s.k === 'a') { en = `The probabilities of a distribution add up to 1, so Σ f(x) = 1 gives <b>a = ${fm(d.a)}</b>.`; a = 'مجموع الاحتمالات لازم يطلع 1، فبنطلع الـ a منه:' + L(aLine); }
      else if (s.k === 'col') { const v = d.x[cj]; en = `x = ${fm(v)}: x · f(x) = (${fm(v)})(${fl[cj]}) = <b>${fm(v * d.f[cj])}</b>.`; a = 'بنضرب القيمة في الاحتمال بتاعها:' + L(`(${fm(v)})(${fl[cj]}) = ${fm(v * d.f[cj])}`); }
      else if (s.k === 'm') { en = `Add the products: <b>μ = E(X) = Σ x · f(x) = ${fm(d.m)}</b>, marked on the bars.${mode === 'ex1' ? ' A person who tosses 2 coins over and over gets, on average, 1 head per toss.' : ''}`; a = 'بنجمع حاصل الضرب كله فيطلع الـ mean، وهو المتعلّم على الرسمة:' + L(`μ = E(X) = Σ x · f(x) = ${fm(d.m)}`) + (mode === 'ex1' ? 'يعني اللي بيرمي عملتين كتير هياخد في المتوسط head واحد في كل رمية.' : ''); }
      else if (s.k === 'e2') { en = `Same sum with x² in place of x (the theorem with g(x) = x²): <b>E(X²) = ${fm(d.e2)}</b>.`; a = 'نفس المجموع بس بالـ ' + B('x²') + ' بدل x، يعني الـ theorem مع ' + B('g(x) = x²') + ' بيطلع:' + L(`E(X²) = Σ x² f(x) = ${fm(d.e2)}`); }
      else if (s.k === 'v') { en = `Shortcut: <b>σ² = E(X²) − μ² = ${fm(d.v)}</b>.`; a = 'بالطريقة المختصرة:' + L(`σ² = E(X²) − μ² = ${fm(d.v)}`); }
      else if (s.k === 'def') { en = `Check with the definition σ² = Σ (x − μ)² f(x), the last column: the same <b>${fm(d.dv)}</b>.`; a = 'ولو حسبناها بالتعريف نفسه في آخر عمود بيطلع نفس الرقم:' + L(`σ² = Σ (x − μ)² f(x) = ${fm(d.dv)}`); }
      else if (s.k === 'sd') { en = `The standard deviation is the positive square root: <b>σ = √${fm(d.v)} ≈ ${fm(d.sd)}</b>. The shaded band is μ ± σ.`; a = 'الـ standard deviation هو الجذر التربيعي الموجب:' + L(`σ = √${fm(d.v)} ≈ ${fm(d.sd)}`) + 'والمنطقة المتظللة في الرسمة هي ' + B('μ ± σ') + '.'; }
      var table = html`<table className="dmv7-t"><thead><tr><th>x</th><th>f(x)</th><th>x·f(x)</th>${vari && past('e2') && html`<th>x²·f(x)</th>`}${def && past('def') && html`<th>(x−μ)²f(x)</th>`}</tr></thead>
        <tbody>${d.x.map((v, j) => html`<tr key=${j}>
          <td>${isOwn ? html`<input aria-label=${'x ' + (j + 1)} value=${own.xs[j]} onInput=${e => edit('xs', j, e.target.value)} />` : d.xl[j]}</td>
          <td className=${j === d.ai ? (past('a') ? 'dmv7-q dmv7-on' : 'dmv7-q') : ''}>${isOwn ? html`<input aria-label=${'f(x) ' + (j + 1)} value=${own.fs[j]} onInput=${e => edit('fs', j, e.target.value)} />` : fl[j]}</td>
          <td className=${j === cj ? 'dmv7-on' : ''}>${colDone(j) ? fm(v * d.f[j]) : ''}</td>
          ${vari && past('e2') && html`<td className=${s.k === 'e2' ? 'dmv7-on' : ''}>${fm(v * v * d.f[j])}</td>`}
          ${def && past('def') && html`<td className=${s.k === 'def' ? 'dmv7-on' : ''}>${fm((v - d.m) ** 2 * d.f[j])}</td>`}</tr>`)}
          <tr className="dmv7-sum"><td>Σ</td><td>${past('a') || d.ai < 0 ? '1' : ''}</td><td className=${s.k === 'm' ? 'dmv7-on' : ''}>${past('m') ? 'μ = ' + fm(d.m) : ''}</td>${vari && past('e2') && html`<td className=${s.k === 'e2' ? 'dmv7-on' : ''}>${fm(d.e2)}</td>`}${def && past('def') && html`<td className=${s.k === 'def' ? 'dmv7-on' : ''}>${fm(d.dv)}</td>`}</tr></tbody></table>`;
      var chart = html`<${DistBars} d=${d} fl=${fl} hi=${cj} showM=${past('m')} showS=${past('sd')} />`;
      var stack = d.ai >= 0 && html`<div className="dmv7-stack" aria-label="The probabilities side by side fill 1">${d.f.map((v, j) => html`<span key=${j} className=${j === d.ai ? (past('a') ? 'dmv7-a' : 'dmv7-gap') : ''} style=${{ width: (j === d.ai ? d.a : v) * 100 + '%' }}>${(j === d.ai ? d.a : v) >= .08 ? (j === d.ai ? (past('a') ? 'a = ' + fm(d.a) : 'a ?') : fl[j]) : ''}</span>`)}</div>`;
    } else {
      en = 'Fix the table: ' + d.err.en; a = 'صلّح الجدول: ' + d.err.ar;
      var table = html`<table className="dmv7-t"><thead><tr><th>x</th><th>f(x)</th></tr></thead><tbody>${own.xs.map((_, j) => html`<tr key=${j}>
        <td><input aria-label=${'x ' + (j + 1)} value=${own.xs[j]} onInput=${e => edit('xs', j, e.target.value)} /></td>
        <td><input aria-label=${'f(x) ' + (j + 1)} value=${own.fs[j]} onInput=${e => edit('fs', j, e.target.value)} /></td></tr>`)}</tbody></table>`;
    }
    return html`<figure className="fig dmv7"><div className="fig-stage">
      ${keys.length > 1 && html`<${Modes} list=${list} mode=${mode} set=${setMode} />`}
      ${!d.err && chart}${!d.err && stack}${table}
      ${isOwn && html`<div className="dmv7-row"><button className="fig-btn" onClick=${() => resize(1)} disabled=${own.xs.length >= 6}>+ value</button><button className="fig-btn" onClick=${() => resize(-1)} disabled=${own.xs.length <= 2}>− value</button><button className="fig-btn" onClick=${() => { setOwn(OWN0); ctl.go(99); }}>Reset</button></div>`}
      ${lines.length > 0 && html`<div className="dmv7-f">${lines.map(([k, t]) => html`<div key=${k} className=${s.k === k ? 'dmv7-on' : ''}>${t}</div>`)}</div>`}
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /><${Bar} steps=${st} i=${i} ctl=${ctl} /></figure>`;
  }
  const MeanTable = ({ ar }) => html`<${Disc} ar=${ar} keys=${['ex1', 'ex2', 'try', 'ex4', 'own']} perCol=${true} />`;
  const VarShortcut = ({ ar }) => html`<${Disc} ar=${ar} keys=${['ex4', 'ex1', 'ex2', 'try', 'own']} vari=${true} def=${true} />`;
  const MeanFindA = ({ ar }) => html`<${Disc} ar=${ar} keys=${['ex2']} vari=${true} />`;
  const VarTry = ({ ar }) => html`<${Disc} ar=${ar} keys=${['try']} vari=${true} />`;
  const VarDefects = ({ ar }) => html`<${Disc} ar=${ar} keys=${['ex4']} vari=${true} />`;

  /* ── [0.0] the mean as the point the distribution balances on ── */
  function MeanBalance({ ar }) {
    const [mode, setMode] = useState('ex4'), d = solve(SETS[mode].xs, SETS[mode].fs), lo = Math.min(...d.x), up = Math.max(...d.x);
    const [p, setP] = useState(lo);
    useEffect(() => { setP(Math.min(...solve(SETS[mode].xs, SETS[mode].fs).x)); }, [mode]);
    const pad = .45, X = v => 30 + (v - lo + pad) / (up - lo + 2 * pad) * 240, fmax = Math.max(...d.f), diff = d.m - p, bal = Math.abs(diff) < .006;
    const deg = bal ? 0 : clamp(diff / (up - lo) * 40, -12, 12), px = X(p), fl = d.fl.map((t, j) => (j === d.ai ? fm(d.a) : t));
    const side = diff > 0 ? ['right', 'اليمين'] : ['left', 'الشمال'];
    const en = bal ? `Balanced: the pivot is at <b>μ = ${fm(d.m)}</b>, the value the distribution is centred on.`
      : `Pivot at p = ${fm(p)}: Σ (x − p)·f(x) = μ − p = <b>${fm(diff)}</b>, so the rod tips to the ${side[0]}. Move the pivot toward μ.`;
    const a = bal ? 'اتوازنت، لأن المحور واقف عند الـ mean بالظبط، وهي القيمة اللي التوزيع متمركز حواليها:' + L(`p = μ = ${fm(d.m)}`)
      : 'العصاية بتميل ناحية ' + side[1] + ' لأن:' + L(`Σ (x − p)·f(x) = μ − p = ${fm(diff)}`) + 'حرّك المحور ناحية الـ μ.';
    return html`<figure className="fig dmv7"><div className="fig-stage">
      <${Modes} list=${[['ex1', 'Example 1'], ['ex2', 'Example 2'], ['ex4', 'Example 4']]} mode=${mode} set=${setMode} />
      <svg className="dmv7-svg" viewBox="0 0 300 170" role="img" aria-label="Probabilities as weights on a rod balanced on a pivot">
        <line className="dmv7-gr" x1="6" x2="294" y1="140" y2="140" />
        <path className="dmv7-piv" d=${`M${px} 116 l12 24 h-24 z`} />
        <g className="dmv7-tilt" style=${{ transform: `rotate(${deg}deg)`, transformOrigin: `${px}px 114px` }}>
          <rect className="dmv7-beam" x="12" y="110" width="276" height="6" rx="3" />
          ${d.x.map((v, j) => { const h = d.f[j] / fmax * 70; return html`<g key=${j}><rect className="dmv7-bar" x=${X(v) - 13} y=${110 - h} width="26" height=${h} />
            <text x=${X(v)} y=${104 - h} textAnchor="middle" fontSize="14">${fl[j]}</text>
            <text x=${X(v)} y="131" textAnchor="middle" fontSize="15" className="dmv7-k dmv7-halo">${d.xl[j]}</text></g>`; })}
        </g>
        <text x="150" y="164" textAnchor="middle" fontSize="15" className=${bal ? 'dmv7-p' : 'dmv7-g'}>${bal ? 'μ = ' + fm(d.m) + ': balanced' : 'p = ' + fm(p)}</text>
      </svg>
      <div className="dmv7-row"><label htmlFor="dmv7-piv">pivot p</label><input id="dmv7-piv" type="range" min=${lo} max=${up} step="0.01" value=${p} onInput=${e => setP(+e.target.value)} />
        <button className="fig-btn" onClick=${() => setP(Math.round(d.m * 100) / 100)}>Put it at μ</button></div>
      <p className="dmv7-note">Each bar is a weight f(x) standing at x on a rod.${ar && html`<span className="dmv7-rtl">كل عمود وزن قيمته ${html`<bdi dir="ltr">f(x)</bdi>`} واقف عند الـ x على عصاية.</span>`}</p>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [0.2] Σ x·f(x) becomes ∫ x f(x) dx (density of Example 5) ── */
  function MeanStrips({ ar }) {
    const [n, setN] = useState(4), X = v => 30 + (v - .9) / 1.2 * 260, Y = f => 160 - f / 2 * 130, h = 1 / n;
    const mids = Array.from({ length: n }, (_, k) => 1 + (k + .5) * h), s = sum(mids.map(m => m * 2 * (m - 1) * h));
    const en = `${n} strip${n > 1 ? 's' : ''} of width Δx = ${fm(h)} under f(x) = 2(x − 1). A strip at x has probability about f(x)·Δx, so the discrete sum is Σ x·f(x)·Δx = <b>${fm(s)}</b>. Make the strips thinner: the Σ becomes ∫ x f(x) dx = <b>5/3 ≈ 1.6667</b> (Example 5).`;
    const a = 'كل شريحة عرضها ' + B('Δx') + ' واحتمالها تقريبًا ' + B('f(x)·Δx') + '، فالمجموع بتاع الـ discrete بيطلع:' + L(`Σ x·f(x)·Δx = ${fm(s)}  (n = ${n})`) + 'وكل ما الشرايح تضيق الـ Σ بتبقى ' + B('∫') + ' والناتج بيقرب من الـ mean بتاع الـ Example 5:' + L('∫ x f(x) dx = 5/3 ≈ 1.6667');
    return html`<figure className="fig dmv7"><div className="fig-stage">
      <svg className="dmv7-svg" viewBox="0 0 300 186" role="img" aria-label="Strips under the density f(x) = 2(x − 1)">
        <line className="dmv7-ax" x1="20" x2="294" y1="160" y2="160" /><line className="dmv7-ax" x1=${X(1)} x2=${X(1)} y1="20" y2="160" />
        ${mids.map((m, k) => html`<rect key=${k} className="dmv7-strip" x=${X(m - h / 2)} y=${Y(2 * (m - 1))} width=${X(1 + h) - X(1)} height=${160 - Y(2 * (m - 1))} />`)}
        <path className="dmv7-crv" d=${`M${X(1)} ${Y(0)} L${X(2)} ${Y(2)} L${X(2)} 160`} />
        <line className="dmv7-mu" x1=${X(5 / 3)} x2=${X(5 / 3)} y1="24" y2="162" />
        <text x=${X(5 / 3) - 6} y="40" textAnchor="end" fontSize="15" className="dmv7-p">μ = 5/3</text>
        ${[1, 1.5, 2].map(v => html`<text key=${v} x=${X(v)} y="178" textAnchor="middle" fontSize="15" className="dmv7-k">${v}</text>`)}
        <text x=${X(1) + 6} y="30" fontSize="15" className="dmv7-g">f(x) = 2(x − 1)</text>
        <text x=${X(1) - 6} y=${Y(2) + 5} textAnchor="end" fontSize="14" className="dmv7-g">2</text>
      </svg>
      <div className="dmv7-row"><label htmlFor="dmv7-n">strips n = <b>${n}</b></label><input id="dmv7-n" type="range" min="1" max="40" step="1" value=${n} onInput=${e => setN(+e.target.value)} /></div>
      <div className="dmv7-f"><div className="dmv7-on">Σ x·f(x)·Δx = ${fm(s)}</div><div>∫₁² x · 2(x − 1) dx = 5/3 ≈ 1.6667</div></div>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [0.3] E[g(X)] = Σ g(x) f(x) ── */
  function MeanGx({ ar }) {
    const [mode, setMode] = useState('ex1'), [g, setG] = useState('x2'), d = solve(SETS[mode].xs, SETS[mode].fs), fl = d.fl.map((t, j) => (j === d.ai ? fm(d.a) : t));
    const G = { x: [v => v, 'x', 'E(X) = μ'], x2: [v => v * v, 'x²', 'E(X²)'], dev: [v => (v - d.m) ** 2, '(x − μ)²', 'E[(X − μ)²] = σ²'] }[g];
    const gv = d.x.map(G[0]), r = sum(gv.map((v, j) => v * d.f[j]));
    const what = { x: ['With g(x) = x it is just the mean', 'مع ' + B('g(x) = x') + ' بيطلع الـ mean نفسه'], x2: ['With g(x) = x² it gives E(X²), used in the variance shortcut', 'مع ' + B('g(x) = x²') + ' بيطلع ' + B('E(X²)') + ' اللي بنستخدمه في الطريقة المختصرة للـ variance'], dev: [`With g(x) = (x − μ)², μ = ${fm(d.m)}, it gives the variance σ²`, 'مع ' + B('g(x) = (x − μ)²') + ' بيطلع الـ variance'] }[g];
    const en = `The probabilities f(x) stay the same; only the values change to g(x). ${what[0]}: <b>${G[2]} = ${fm(r)}</b>.`;
    const a = 'الاحتمالات ' + B('f(x)') + ' زي ما هي، اللي بيتغير القيم بس وبتبقى ' + B('g(x)') + '. ' + what[1] + ':' + L(`E[g(X)] = Σ g(x) f(x) = ${G[2]} = ${fm(r)}`);
    return html`<figure className="fig dmv7"><div className="fig-stage">
      <${Modes} list=${[['ex1', 'Example 1'], ['ex2', 'Example 2'], ['ex4', 'Example 4']]} mode=${mode} set=${setMode} />
      <${Modes} list=${[['x', 'g(x) = x'], ['x2', 'g(x) = x²'], ['dev', 'g(x) = (x − μ)²']]} mode=${g} set=${setG} />
      <table className="dmv7-t"><thead><tr><th>x</th><th>g(x) = ${G[1]}</th><th>f(x)</th><th>g(x)·f(x)</th></tr></thead>
        <tbody>${d.x.map((v, j) => html`<tr key=${j}><td>${d.xl[j]}</td><td className="dmv7-on">${fm(gv[j])}</td><td>${fl[j]}</td><td>${fm(gv[j] * d.f[j])}</td></tr>`)}
        <tr className="dmv7-sum"><td>Σ</td><td></td><td>1</td><td className="dmv7-on">${fm(r)}</td></tr></tbody></table>
      <div className="dmv7-f"><div className="dmv7-on">E[g(X)] = Σ g(x) f(x) = ${gv.map((v, j) => `(${fm(v)})(${fl[j]})`).join(' + ')} = ${fm(r)}</div></div>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [1.0] σ² = Σ (x − μ)² f(x): squared distances, weighted ── */
  function VarSquares({ ar }) {
    const [mode, setMode] = useState('ex2'), d = solve(SETS[mode].xs, SETS[mode].fs), fl = d.fl.map((t, j) => (j === d.ai ? fm(d.a) : t)), n = d.x.length;
    const [i, ctl] = useRun(n + 3, 2000, mode), cur = i >= 1 && i <= n ? i - 1 : -1;
    const lo = Math.min(...d.x), up = Math.max(...d.x), maxS = Math.max(...d.x.map(v => Math.abs(v - d.m))), sc = Math.min(248 / (up - lo + .6), 140 / maxS);
    const X = v => 150 + (v - (lo + up) / 2) * sc, A = 172;
    const terms = d.x.map((v, j) => (v - d.m) ** 2 * d.f[j]), shown = i >= n + 1 ? n : Math.max(0, i);
    const order = d.x.map((_, j) => j).sort((p, q) => Math.abs(d.x[q] - d.m) - Math.abs(d.x[p] - d.m));
    let en, a;
    if (i === 0) { en = `${SETS[mode].t}: μ = ${fm(d.m)}. For each value x draw a square with side |x − μ|: its area is the squared distance (x − μ)².`; a = 'في ' + SETS[mode].tAr + ' الـ mean بيساوي ' + B('μ = ' + fm(d.m)) + '. لكل قيمة x بنرسم مربع ضلعه المسافة بينها وبين الـ μ، فمساحته هي ' + B('(x − μ)²') + '.'; }
    else if (cur >= 0) { const v = d.x[cur]; en = `x = ${fm(v)}: (${fm(v)} − ${fm(d.m)})² = ${fm((v - d.m) ** 2)}, weighted by f(x) = ${fl[cur]}: <b>${fm(terms[cur])}</b>. The darker the square, the bigger its probability.`; a = 'المربع ده مساحته بتتضرب في الاحتمال بتاعه، وكل ما المربع يغمق يبقى احتماله أكبر:' + L(`(${fm(v)} − ${fm(d.m)})² · ${fl[cur]} = ${fm((v - d.m) ** 2)} · ${fl[cur]} = ${fm(terms[cur])}`); }
    else if (i === n + 1) { en = `Add them: <b>σ² = Σ (x − μ)² f(x) = ${fm(d.dv)}</b>, the probability-weighted average of the squared distances from μ.`; a = 'بنجمعهم فيطلع الـ variance، وهو متوسط مربعات المسافات عن الـ μ موزون بالاحتمالات:' + L(`σ² = Σ (x − μ)² f(x) = ${fm(d.dv)}`); }
    else { en = `Back to the units of x: <b>σ = √${fm(d.dv)} ≈ ${fm(d.sd)}</b>, the standard deviation. The thick segment on the axis is μ ± σ.`; a = 'وعشان نرجع لوحدات الـ x بناخد الجذر الموجب فيطلع الـ standard deviation:' + L(`σ = √${fm(d.dv)} ≈ ${fm(d.sd)}`) + 'والخط التخين على المحور هو ' + B('μ ± σ') + '.'; }
    const st = Array.from({ length: n + 3 });
    return html`<figure className="fig dmv7"><div className="fig-stage">
      <${Modes} list=${[['ex2', 'Example 2'], ['ex4', 'Example 4']]} mode=${mode} set=${setMode} />
      <svg className="dmv7-svg" viewBox="0 0 300 198" role="img" aria-label="Squares of side x minus mu on a number line">
        ${order.filter(j => j < shown || j === cur).map(j => { const v = d.x[j], s = Math.abs(v - d.m) * sc; return s < .5 ? null : html`<rect key=${j} className=${'dmv7-sq' + (j === cur ? ' dmv7-hi' : '')} x=${Math.min(X(v), X(d.m))} y=${A - s} width=${s} height=${s} style=${{ fillOpacity: .08 + d.f[j] * .9 }} />`; })}
        <line className="dmv7-ax" x1="8" x2="292" y1=${A} y2=${A} />
        ${i >= n + 2 && html`<line className="dmv7-sd" x1=${clamp(X(d.m - d.sd), 6, 294)} x2=${clamp(X(d.m + d.sd), 6, 294)} y1=${A} y2=${A} />`}
        ${d.x.map((v, j) => html`<g key=${j}><circle cx=${X(v)} cy=${A} r="4" className="dmv7-piv" style=${{ fill: 'var(--fig-k)' }} /><text x=${X(v)} y="192" textAnchor="middle" fontSize="15" className="dmv7-k">${d.xl[j]}</text></g>`)}
        <line className="dmv7-mu" x1=${X(d.m)} x2=${X(d.m)} y1="22" y2=${A + 4} />
        <text x=${clamp(X(d.m), 40, 260)} y="16" textAnchor="middle" fontSize="15" className="dmv7-p">μ = ${fm(d.m)}</text>
      </svg>
      ${i >= 1 && html`<div className="dmv7-f">${d.x.slice(0, shown || 0).concat(cur >= shown ? [d.x[cur]] : []).map((v, j) => html`<div key=${j} className=${j === cur ? 'dmv7-on' : ''}>(${fm(v)} − ${fm(d.m)})² · ${fl[j]} = ${fm(terms[j])}</div>`)}
        ${i >= n + 1 && html`<div className=${i === n + 1 ? 'dmv7-on' : ''}>σ² = ${terms.map(fm).join(' + ')} = ${fm(d.dv)}</div>`}${i >= n + 2 && html`<div className="dmv7-on">σ = √${fm(d.dv)} ≈ ${fm(d.sd)}</div>`}</div>`}
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /><${Bar} steps=${st} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2] Example 1: two tosses of a fair coin, and a toss simulator ── */
  const OUT = ['HH', 'HT', 'TH', 'TT'];
  function MeanCoins({ ar }) {
    const steps = [
      { en: 'A fair coin tossed twice: <b>S = {HH, HT, TH, TT}</b>, four equally likely sample points.', ar: 'عملة fair بتترمي مرتين، والـ sample space فيه 4 نقط فرصهم متساوية:' + L('S = {HH, HT, TH, TT}') },
      { en: 'X = the number of heads in each sample point (TH means a tail, then a head).', ar: 'الـ X هو عدد الـ heads في كل نقطة، والـ TH معناها tail الأول وبعده head.' },
      { en: 'Group them by X: P(X = 0) = P(TT) = <b>1/4</b>, P(X = 1) = P(TH) + P(HT) = <b>1/2</b>, P(X = 2) = P(HH) = <b>1/4</b>.', ar: 'بنجمّعهم حسب الـ X فتطلع الاحتمالات:' + L('P(X = 0) = P(TT) = 1/4<br>P(X = 1) = P(TH) + P(HT) = 1/2<br>P(X = 2) = P(HH) = 1/4') },
      { en: '<b>μ = E(X) = (0)(1/4) + (1)(1/2) + (2)(1/4) = 0 + 0.5 + 0.5 = 1</b>: a person who tosses 2 coins over and over gets, on average, 1 head per toss.', ar: 'الـ mean بيطلع:' + L('μ = E(X) = (0)(1/4) + (1)(1/2) + (2)(1/4) = 0 + 0.5 + 0.5 = 1') + 'يعني اللي بيرمي عملتين كتير هياخد في المتوسط head واحد في كل رمية.' },
      { en: '(Extra) E(X²) = 0 + 1/2 + 4/4 = 3/2, so <b>σ² = 3/2 − 1 = 1/2</b>.', ar: 'وكزيادة نحسب الـ variance:' + L('E(X²) = 0 + 1/2 + 4/4 = 3/2 → σ² = 3/2 − 1 = 1/2') }
    ];
    const [i, ctl] = useRun(steps.length, 2300, 0), [c, setC] = useState([0, 0, 0]), [last, setLast] = useState(null);
    const heads = o => [...o].filter(ch => ch === 'H').length;
    const toss = k => { const n = [...c]; let o; for (let r = 0; r < k; r++) { o = (Math.random() < .5 ? 'H' : 'T') + (Math.random() < .5 ? 'H' : 'T'); n[heads(o)]++; } setC(n); setLast(o); };
    const N = sum(c), avg = N ? (c[1] + 2 * c[2]) / N : 0;
    const Tile = ({ o, x }) => html`<div className="dmv7-tile">${[...o].map((ch, k) => html`<span key=${k} className=${'dmv7-coin ' + (ch === 'H' ? 'dmv7-h' : 'dmv7-t')}>${ch}</span>`)}${x && html`<b>X = ${heads(o)}</b>`}</div>`;
    return html`<figure className="fig dmv7"><div className="fig-stage">
      ${i < 2 ? html`<div className="dmv7-coins">${OUT.map(o => html`<${Tile} key=${o} o=${o} x=${i >= 1} />`)}</div>`
        : html`<div className="dmv7-grp">${[0, 1, 2].map(x => html`<div key=${x}><div className="dmv7-col">${OUT.filter(o => heads(o) === x).map(o => html`<${Tile} key=${o} o=${o} x=${false} />`)}</div>
          <div className="dmv7-lab">X = ${x}<br /><b>${['1/4', '1/2', '1/4'][x]}</b>${i >= 3 && html`<br /><span>x·f(x) = ${['0', '0.5', '0.5'][x]}</span>`}</div></div>`)}</div>`}
      ${i >= 3 && html`<div className="dmv7-f"><div className=${i === 3 ? 'dmv7-on' : ''}>μ = E(X) = 0 + 0.5 + 0.5 = 1</div>${i >= 4 && html`<div className="dmv7-on">E(X²) = 0 + 1/2 + 4/4 = 3/2 → σ² = 3/2 − 1 = 1/2</div>`}</div>`}
      <div className="dmv7-sim">
        <p className="dmv7-note">Toss the two coins yourself and watch the average number of heads per toss.${ar && html`<span className="dmv7-rtl">ارمي العملتين بنفسك وشوف متوسط عدد الـ heads في الرمية.</span>`}</p>
        <div className="dmv7-row"><button className="fig-btn solid" onClick=${() => toss(1)}>Toss</button><button className="fig-btn" onClick=${() => toss(10)}>×10</button><button className="fig-btn" onClick=${() => toss(100)}>×100</button><button className="fig-btn" onClick=${() => { setC([0, 0, 0]); setLast(null); }} disabled=${!N}>Reset</button></div>
        ${[0, 1, 2].map(x => html`<div key=${x} className="dmv7-hb"><span>X = ${x}</span><span><i style=${{ width: (N ? c[x] / N : 0) * 100 + '%' }}></i></span><span>${N ? fm(c[x] / N) : '0'} (${['1/4', '1/2', '1/4'][x]})</span></div>`)}
        <div className="dmv7-row">${last ? html`<span>last: ${last} → X = ${heads(last)}</span>` : ''}<span>tosses <b>${N}</b></span><span>average <b>${N ? fm(avg) : '–'}</b> (μ = 1)</span></div>
      </div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5] Example 3: expected life of a device, f(x) = 20000/x³, x ≥ 100 ── */
  function MeanDevice({ ar }) {
    const steps = [
      { en: 'Example 3: the life X (hours) of a device has density <b>f(x) = 20000/x³</b> for x ≥ 100 (0 otherwise). The total area under it is 1.', ar: 'في الـ Example 3 عمر الجهاز X بالساعات، والـ density بتاعته:' + L('f(x) = 20000/x³ ,  x ≥ 100  (0 otherwise)') + 'والمساحة الكلية تحتها بتساوي 1.' },
      { en: 'For E(X) multiply by x: x · 20000/x³ = <b>20000/x²</b>, the curve now drawn.', ar: 'عشان نجيب الـ ' + B('E(X)') + ' بنضرب في x:' + L('x · 20000/x³ = 20000/x²') + 'والمنحنى المرسوم دلوقتي هو ده.' },
      { en: 'Integrate from 100 to b: [−20000/x] from 100 to b = <b>200 − 20000/b</b>. Drag b and watch the shaded area grow toward 200.', ar: 'بنكامل من 100 لحد b:' + L('[−20000/x] from 100 to b = 200 − 20000/b') + 'حرّك الـ b وشوف المساحة المتظللة بتقرب من 200.' },
      { en: 'As b → ∞, 20000/b → 0: <b>μ = [−20000/x]₁₀₀^∞ = 0 − (−200) = 200</b>.', ar: 'ولما الـ b تروح لـ ' + B('∞') + ' الكسر بيروح للصفر:' + L('μ = [−20000/x]₁₀₀^∞ = 0 − (−200) = 200') },
      { en: 'Back on f(x) with μ marked: we expect this type of device to last, on average, <b>200 hours</b>.', ar: 'ورجعنا للـ ' + B('f(x)') + ' وعليها الـ μ، يعني نتوقع إن النوع ده من الأجهزة يعيش في المتوسط <b>200 ساعة</b>.' }
    ];
    const [i, ctl] = useRun(steps.length, 2600, 0), [t, setT] = useState(50), b = Math.round(100 * Math.pow(100, t / 100));
    const X = v => 44 + (v - 100) / 900 * 244, gMode = i >= 1 && i <= 3, top = gMode ? 2 : .02, Y = v => 150 - v / top * 120, fn = gMode ? v => 20000 / (v * v) : v => 20000 / (v * v * v);
    const pts = []; for (let v = 100; v <= 1000; v += 10) pts.push(`${X(v).toFixed(1)},${Y(fn(v)).toFixed(1)}`);
    const upto = i === 2 ? Math.min(b, 1000) : 1000, sh = []; for (let v = 100; v <= upto; v += 5) sh.push(`${X(v).toFixed(1)},${Y(fn(v)).toFixed(1)}`);
    const area = i === 0 || i === 4 ? null : i === 3 ? 200 : i === 2 ? 200 - 20000 / b : null;
    return html`<figure className="fig dmv7"><div className="fig-stage">
      <svg className="dmv7-svg" viewBox="0 0 300 178" role="img" aria-label=${gMode ? 'The curve x times f(x) = 20000/x²' : 'The density f(x) = 20000/x³'}>
        ${i !== 1 && html`<path className="dmv7-area" d=${`M${X(100)} 150 L${sh.join(' L')} L${X(upto)} 150 Z`} />`}
        <line className="dmv7-ax" x1="44" x2="292" y1="150" y2="150" /><line className="dmv7-ax" x1="44" x2="44" y1="18" y2="150" />
        <polyline className="dmv7-crv" points=${pts.join(' ')} />
        ${[100, 400, 700, 1000].map(v => html`<text key=${v} x=${X(v)} y="168" textAnchor=${v === 1000 ? 'end' : v === 100 ? 'start' : 'middle'} fontSize="14" className="dmv7-k">${v}</text>`)}
        <text x="40" y=${Y(top) + 5} textAnchor="end" fontSize="14" className="dmv7-g">${gMode ? '2' : '0.02'}</text><text x="40" y=${Y(top / 2) + 5} textAnchor="end" fontSize="14" className="dmv7-g">${gMode ? '1' : '0.01'}</text>
        <text x="120" y="30" fontSize="15" className="dmv7-g">${gMode ? 'x·f(x) = 20000/x²' : 'f(x) = 20000/x³'}</text>
        ${(i === 0 || i === 4) && html`<text x="160" y="60" fontSize="15" className="dmv7-k">${i === 0 ? 'area = 1' : ''}</text>`}
        ${i === 4 && html`<g><line className="dmv7-mu" x1=${X(200)} x2=${X(200)} y1="40" y2="152" /><text x=${X(200) + 6} y="60" fontSize="15" className="dmv7-p">μ = 200 hours</text></g>`}
        ${area != null && html`<text x="160" y="60" fontSize="15" className="dmv7-k">area = ${fm(area)}</text>`}
      </svg>
      ${i === 2 && html`<div className="dmv7-row"><label htmlFor="dmv7-b">b = <b>${b}</b></label><input id="dmv7-b" type="range" min="0" max="100" step="1" value=${t} onInput=${e => setT(+e.target.value)} /></div>`}
      <div className="dmv7-f">
        <div className=${i === 0 ? 'dmv7-on' : ''}>∫₁₀₀^∞ 20000/x³ dx = [−10000/x²]₁₀₀^∞ = 1</div>
        ${i >= 1 && html`<div className=${i === 1 ? 'dmv7-on' : ''}>μ = ∫₁₀₀^∞ x · 20000/x³ dx = ∫₁₀₀^∞ 20000/x² dx</div>`}
        ${i >= 2 && html`<div className=${i === 2 ? 'dmv7-on' : ''}>∫₁₀₀^b 20000/x² dx = 200 − 20000/b = ${fm(200 - 20000 / b)}</div>`}
        ${i >= 3 && html`<div className=${i >= 3 ? 'dmv7-on' : ''}>μ = [−20000/x]₁₀₀^∞ = 0 − (−200) = 200</div>`}
      </div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [7] Example 5: water demand, f(x) = 2(x − 1) on 1 < x < 2 ── */
  function VarWater({ ar }) {
    const steps = [
      { en: 'Example 5: the density <b>f(x) = 2(x − 1)</b> for 1 &lt; x &lt; 2, 0 otherwise. It is a triangle of area ½ · 1 · 2 = 1.', ar: 'في الـ Example 5 الـ density هي:' + L('f(x) = 2(x − 1) ,  1 &lt; x &lt; 2  (0 otherwise)') + 'وشكلها مثلث مساحته بتساوي 1.' },
      { en: '<b>μ = ∫₁² x · 2(x − 1) dx = 5/3 ≈ 1.667</b>, closer to 2 because more of the probability is on the right.', ar: 'الـ mean بيطلع كده:' + L('μ = ∫₁² x · 2(x − 1) dx = 2[x³/3 − x²/2]₁² = 2[(8/3 − 2) − (1/3 − 1/2)] = 2[2/3 + 1/6] = 2 · 5/6 = 5/3') + 'وهو أقرب لـ 2 لأن الاحتمال أكتر ناحية اليمين.' },
      { en: 'Now g(x) = x²: <b>E(X²) = ∫₁² x² · 2(x − 1) dx = 17/6</b>.', ar: 'وبعدين مع ' + B('g(x) = x²') + ' بيطلع:' + L('E(X²) = 2[x⁴/4 − x³/3]₁² = 2[(4 − 8/3) − (1/4 − 1/3)] = 2[4/3 + 1/12] = 2 · 17/12 = 17/6') },
      { en: 'Shortcut: <b>σ² = 17/6 − (5/3)² = 51/18 − 50/18 = 1/18</b> (asked in Exam 2023/24 Q3a).', ar: 'بالطريقة المختصرة، والمسألة دي جت في امتحان ' + B('2023/24') + ' سؤال ' + B('Q3a') + '، والحل:' + L('σ² = 17/6 − (5/3)² = 51/18 − 50/18 = 1/18') },
      { en: '<b>σ = √(1/18) ≈ 0.2357</b>; the shaded band is μ ± σ, from about 1.43 to 1.90.', ar: 'الـ standard deviation هو الجذر الموجب، والمنطقة المتظللة هي ' + B('μ ± σ') + ' وقيمها:' + L('σ = √(1/18) ≈ 0.2357 → μ ± σ ≈ 1.43 to 1.90') }
    ];
    const [i, ctl] = useRun(steps.length, 2800, 0), X = v => 30 + (v - .9) / 1.2 * 260, Y = f => 160 - f / 2 * 130, m = 5 / 3, sd = Math.sqrt(1 / 18);
    const lines = [['μ = ∫₁² x · 2(x − 1) dx = 2 · 5/6 = 5/3', 1], ['E(X²) = ∫₁² x² · 2(x − 1) dx = 2 · 17/12 = 17/6', 2], ['σ² = 17/6 − (5/3)² = 51/18 − 50/18 = 1/18', 3], ['σ = √(1/18) ≈ 0.2357', 4]];
    return html`<figure className="fig dmv7"><div className="fig-stage">
      <svg className="dmv7-svg" viewBox="0 0 300 186" role="img" aria-label="The triangle density f(x) = 2(x − 1) with its mean">
        ${i >= 4 && html`<rect className="dmv7-band" x=${X(m - sd)} y="22" width=${X(m + sd) - X(m - sd)} height="138" />`}
        <path className="dmv7-area" d=${`M${X(1)} 160 L${X(2)} ${Y(2)} L${X(2)} 160 Z`} />
        <line className="dmv7-ax" x1="20" x2="294" y1="160" y2="160" /><line className="dmv7-ax" x1=${X(1)} x2=${X(1)} y1="20" y2="160" />
        <path className="dmv7-crv" d=${`M${X(1)} ${Y(0)} L${X(2)} ${Y(2)} L${X(2)} 160`} />
        <text x=${X(1) - 6} y=${Y(2) + 5} textAnchor="end" fontSize="14" className="dmv7-g">2</text>
        ${[1, 1.5, 2].map(v => html`<text key=${v} x=${X(v)} y="178" textAnchor="middle" fontSize="15" className="dmv7-k">${v}</text>`)}
        <text x=${X(1) + 6} y="30" fontSize="15" className="dmv7-g">f(x) = 2(x − 1)</text>
        <text x=${X(1.62)} y="148" textAnchor="middle" fontSize="15" className=${pop(i === 0) + ' dmv7-k'}>area = 1</text>
        ${i >= 1 && html`<g><line className="dmv7-mu" x1=${X(m)} x2=${X(m)} y1="40" y2="162" /><text x=${X(m) - 6} y="58" textAnchor="end" fontSize="15" className="dmv7-p">μ = 5/3</text></g>`}
        ${i >= 4 && html`<text x=${X(m - sd) + 4} y="84" fontSize="15" className="dmv7-p">μ ± σ</text>`}
      </svg>
      <div className="dmv7-f">${lines.filter(([, k]) => i >= k).map(([t, k]) => html`<div key=${k} className=${i === k ? 'dmv7-on' : ''}>${t}</div>`)}${i === 0 && html`<div className="dmv7-on">∫₁² 2(x − 1) dx = [x² − 2x]₁² = 0 − (−1) = 1</div>`}</div>
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'dm-mean-balance': MeanBalance, 'dm-mean-table': MeanTable, 'dm-mean-strips': MeanStrips, 'dm-mean-gx': MeanGx,
    'dm-var-squares': VarSquares, 'dm-var-shortcut': VarShortcut, 'dm-mean-coins': MeanCoins, 'dm-mean-find-a': MeanFindA,
    'dm-var-try': VarTry, 'dm-mean-device': MeanDevice, 'dm-var-defects': VarDefects, 'dm-var-water': VarWater
  });
})();
/* ── part L8 ── */
// Discrete Mathematics visuals, Lecture 8 (integer arithmetic and modular arithmetic): binary operations, the division relation, divisibility, GCD (Euclid and extended Euclid), mod, Zn, congruence, operations in Zn, additive and multiplicative inverses (Lec_8 slides 2.3–2.53, Figures 2.2–2.15). Every label and number comes from the site's notes or is computed with the course's method.
(function () {
  const { useState, useEffect } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.dmv8{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.dmv8 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dmv8 .fig-dots{ flex-wrap:wrap; row-gap:5px; }
.dmv8 sub{ font-size:12px; line-height:0; }
.dmv8 .fig-btn.dmv8-sel{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.dmv8-wrap{ max-width:540px; margin:0 auto; color:var(--ink); min-width:0; }
.dmv8-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; }
.dmv8-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.dmv8-in{ font:600 .9rem var(--mono); width:64px; box-sizing:border-box; padding:4px 5px; margin-left:4px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); }
.dmv8-in.bad{ border-color:var(--pen); box-shadow:0 0 0 1px var(--pen); }
.dmv8-in:focus{ outline:2px solid var(--fig-k); outline-offset:1px; }
.dmv8-lbl{ font-size:.85rem; color:var(--graphite); white-space:nowrap; }
.dmv8-muted{ font-size:.8rem; color:var(--graphite); text-align:center; margin:6px 0 0; line-height:1.4; }
.dmv8-split{ display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:14px; align-items:start; }
.dmv8-col{ display:flex; flex-direction:column; align-items:center; gap:5px; min-width:0; }
.dmv8-z{ font:500 .84rem/1.4 var(--mono); padding:4px 8px; border:1px solid var(--line); border-radius:4px; background:color-mix(in srgb, var(--fig-k) 10%, var(--paper)); color:var(--ink); text-align:center; max-width:100%; overflow-wrap:anywhere; }
.dmv8-z .on{ background:color-mix(in srgb, var(--fig-k) 40%, var(--paper)); border-radius:3px; padding:0 2px; font-weight:800; }
.dmv8-op{ font:700 .88rem/1.3 var(--mono); padding:7px 10px; border:1.5px solid var(--fig-k); border-radius:3px; background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); box-shadow:3px 3px 0 var(--graphite); text-align:center; color:var(--ink); }
.dmv8-ops span{ display:inline-block; padding:0 7px; opacity:.35; transition:opacity .3s; } .dmv8-ops span.on{ opacity:1; }
.dmv8-arr{ font:600 .85rem/1.3 var(--mono); color:var(--ink); text-align:center; white-space:nowrap; }
.dmv8-mid .dmv8-op{ white-space:nowrap; }
.dmv8-arr small{ display:block; font:500 .75rem/1.2 var(--body); color:var(--graphite); white-space:normal; }
.dmv8-arr.c{ color:var(--pen); } .dmv8-arr.g{ color:var(--ok); }
.dmv8-ab{ display:flex; gap:26px; justify-content:center; flex-wrap:wrap; }
.dmv8-mid{ display:flex; align-items:center; justify-content:center; gap:6px; }
.dmv8-tag{ font:500 .78rem var(--body); color:var(--graphite); margin:0 4px; white-space:nowrap; }
.dmv8-ttl{ font-weight:700; color:var(--fig-k); font-size:.9rem; text-align:center; }
.dmv8-tbl{ border-collapse:collapse; width:100%; font:500 .84rem/1.35 var(--mono); }
.dmv8-tbl th, .dmv8-tbl td{ border:1px solid var(--line); padding:3px 3px; text-align:center; overflow-wrap:anywhere; }
.dmv8-tbl th{ background:var(--paper-2); font-weight:700; color:var(--ink); overflow-wrap:normal; }
.dmv8-tbl td{ background:var(--paper); color:var(--ink); transition:background .4s; height:1.35em; }
.dmv8-tbl td.new{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); font-weight:800; }
.dmv8-tbl td.fin{ background:color-mix(in srgb, var(--ok) 22%, var(--paper)); font-weight:800; }
.dmv8-tbl td.dim{ color:var(--faint); }
.dmv8-eq{ font:600 .88rem/1.5 var(--mono); text-align:center; padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); overflow-wrap:anywhere; transition:opacity .4s, border-color .4s; }
.dmv8-eq.c{ border-color:var(--pen); } .dmv8-eq.g{ border-color:var(--ok); box-shadow:0 0 0 1px var(--ok); }
.dmv8-big{ font:700 1.1rem/1.4 var(--mono); text-align:center; color:var(--ink); overflow-wrap:anywhere; }
.dmv8-ld{ display:grid; grid-template-columns:auto auto; justify-content:center; font:600 1.02rem/1.5 var(--mono); color:var(--ink); }
.dmv8-ldn{ text-align:right; padding-right:.5ch; white-space:nowrap; }
.dmv8-ldq, .dmv8-ldb{ padding-left:.6ch; border-left:2px solid transparent; }
.dmv8-ldb{ border-left-color:var(--ink); border-top:2px solid var(--ink); }
.dmv8-ldl{ white-space:nowrap; } .dmv8-ldl .ul{ border-bottom:1.5px solid var(--ink); }
.dmv8-ldl.nw > span:first-child{ color:var(--fig-k); font-weight:800; }
.dmv8-leg{ display:grid; gap:6px; margin-top:6px; }
.dmv8-lad{ display:grid; grid-template-columns:auto auto 22px auto; gap:3px 2px; justify-content:center; font:600 .9rem/1.3 var(--mono); }
.dmv8-lad .bx{ border:1px solid var(--line); background:var(--paper); padding:4px 8px; min-width:3.2em; text-align:center; color:var(--ink); transition:opacity .4s, background .4s; }
.dmv8-lad .l{ border-right:0; border-radius:3px 0 0 3px; text-align:left; } .dmv8-lad .m{ border-left:0; border-radius:0 3px 3px 0; text-align:right; }
.dmv8-lad .rr{ background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); border-radius:3px; }
.dmv8-lad .ar2{ text-align:center; color:var(--graphite); align-self:center; }
.dmv8-lad .dn{ text-align:center; color:var(--pen); font-size:.85rem; line-height:1; }
.dmv8-lad .gd{ background:color-mix(in srgb, var(--ok) 26%, var(--paper)); font-weight:800; }
.dmv8-lad .nw{ box-shadow:0 0 0 2px var(--fig-k); }
.dmv8-code{ font:500 .8rem/1.6 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px; color:var(--ink); min-width:0; }
.dmv8-code div{ white-space:pre-wrap; padding:0 5px; border-radius:4px; transition:background .4s; }
.dmv8-code div.on{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); }
.dmv8-xg{ display:grid; grid-template-columns:1.35fr 1fr 1fr; gap:8px; align-items:start; }
.dmv8-xg.two{ grid-template-columns:1.3fr 1fr; }
@media (max-width:560px){ .dmv8-xg:not(.two){ grid-template-columns:1fr 1fr; } .dmv8-xg:not(.two) > :first-child{ grid-column:1 / -1; } }
.dmv8-pan{ min-width:0; } .dmv8-pan .dmv8-ttl{ display:block; margin-bottom:3px; }
.dmv8-foot{ font:700 .8rem/1.3 var(--mono); color:var(--ok); text-align:center; margin-top:4px; overflow-wrap:anywhere; }
.dmv8-pair{ display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px; }
.dmv8-box{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px; min-width:0; }
.dmv8-cols{ display:grid; gap:6px; justify-content:center; }
.dmv8-chip{ font:700 .88rem var(--mono); border:1px solid var(--line); border-radius:6px; background:var(--paper); padding:3px 6px; text-align:center; color:var(--ink); transition:opacity .4s, background .4s; }
.dmv8-chip.on{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); border-color:var(--fig-k); }
.dmv8-chip.g{ background:color-mix(in srgb, var(--ok) 24%, var(--paper)); border-color:var(--ok); }
.dmv8-chip.x{ opacity:.45; text-decoration:line-through; }
.dmv8-cells{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; }
.dmv8-cell{ min-width:30px; border:1px solid var(--line); border-radius:5px; background:var(--paper); text-align:center; font:600 .84rem/1.25 var(--mono); padding:2px 3px; color:var(--ink); transition:background .4s, opacity .4s; }
.dmv8-cell small{ display:block; font:500 .75rem/1.2 var(--mono); color:var(--graphite); }
.dmv8-cell.on{ background:color-mix(in srgb, var(--ok) 30%, var(--paper)); border-color:var(--ok); }
.dmv8-cell.hl{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); border-color:var(--fig-k); }
.dmv8-cell.dim{ opacity:.4; }
.dmv8-svg{ max-width:420px; margin:0 auto; }
.dmv8 .dmv8-svg svg text{ font-family:var(--mono); }
.dmv8-ops3 div{ font:600 .82rem/1.6 var(--mono); padding:0 6px; border-radius:4px; opacity:.5; transition:opacity .3s, background .3s; }
.dmv8-ops3 div.on{ opacity:1; background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); }
.dmv8-path{ display:grid; gap:5px; }
.dmv8-path .dmv8-eq{ font-size:.82rem; }
@media (prefers-reduced-motion: reduce){ .dmv8 *{ transition:none !important; } }`;
  if (!document.getElementById('dmv8-css')) { const s = document.createElement('style'); s.id = 'dmv8-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ───────── helpers ───────── */
  const mod = (a, n) => ((a % n) + n) % n;
  const M = x => (x < 0 ? '−' + String(-x) : String(x));
  const P = x => (x < 0 ? '(' + M(x) + ')' : M(x));
  const C3 = x => (x < 0 ? '−' : '') + (x < 0 ? -x : x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const B = s => `<bdi dir="ltr">${String(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const L = s => `<span class="ltr">${s}</span>`;
  const SUB = '₀₁₂₃₄₅₆₇₈₉', SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sb = n => String(n).replace(/\d/g, d => SUB[d]), sp = n => String(n).replace(/\d/g, d => SUP[d]);
  const Z = n => 'Z' + sb(n);
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };
  const cls = (...a) => a.filter(Boolean).join(' ');
  const range = n => Array.from({ length: n }, (_, k) => k);
  const ZSET = 'Z = { …, −2, −1, 0, 1, 2, … }';
  const ZH = n => html`<span>Z<sub>${n}</sub></span>`;

  function NumIn({ label, v, set, lo, hi, w }) {
    const [t, setT] = useState(String(v));
    useEffect(() => { const c = t.replace(/−/g, '-').trim(); if (!/^-?\d+$/.test(c) || parseInt(c, 10) !== v) setT(String(v)); }, [v]);
    const ok = s => { const c = s.replace(/−/g, '-').trim(); return /^-?\d{1,12}$/.test(c) && +c >= lo && +c <= hi ? parseInt(c, 10) : null; };
    const ch = e => { const s = e.target.value; setT(s); const n = ok(s); if (n !== null) set(n); };
    return html`<label className="dmv8-lbl">${label}<input className=${cls('dmv8-in', ok(t) === null && 'bad')} style=${{ width: w || '64px' }} inputMode=${lo < 0 ? 'text' : 'numeric'} value=${t} onChange=${ch} aria-label=${label} title=${`${lo} to ${hi}`} /></label>`;
  }
  const Chips = ({ items, sel, on }) => html`<div className="dmv8-row" role="group">${items.map((x, j) => html`<button key=${j} className=${cls('fig-btn', sel === j && 'dmv8-sel')} aria-pressed=${String(sel === j)} onClick=${() => on(j)}>${x}</button>`)}</div>`;
  const Hint = ({ t }) => html`<p className="dmv8-muted" style=${{ margin: '-4px 0 10px' }}>${t}</p>`;
  const Arw = ({ x1, x2, y, col }) => { const d = x2 > x1 ? 1 : -1; return html`<g><line x1=${x1} y1=${y} x2=${x2 - d * 8} y2=${y} stroke=${col} strokeWidth="3" /><path d=${`M${x2},${y} l${-d * 10},-6 l0,12 z`} fill=${col} /></g>`; };

  /* ───────── [0.1–0.2] Figure 2.2 + Example 2.1: three binary operations on Z ───────── */
  const OPS = [
    { s: '+', en: 'Addition', ar: 'الـ addition (الجمع)', f: (a, b) => a + b },
    { s: '−', en: 'Subtraction', ar: 'الـ subtraction (الطرح)', f: (a, b) => a - b },
    { s: '×', en: 'Multiplication', ar: 'الـ multiplication (الضرب)', f: (a, b) => a * b }];
  const CASES21 = [[5, 9], [-5, 9], [5, -9], [-5, -9]];
  function OpBox({ a, b, op, c }) {
    return html`<div className="dmv8-col">
      <div className="dmv8-z">${ZSET}</div>
      <div className="dmv8-ab"><span className="dmv8-arr">↓ a = ${M(a)}</span><span className="dmv8-arr">↓ b = ${M(b)}</span></div>
      <div className="dmv8-mid"><div className="dmv8-op dmv8-ops">${OPS.map((o, j) => html`<span key=${j} className=${j === op ? 'on' : ''}>${o.s}</span>`)}</div><span className="dmv8-tag">Operation</span></div>
      <div className="dmv8-arr">↓ c = ${M(c)}</div>
      <div className="dmv8-z">${ZSET}</div></div>`;
  }
  function IntOpsEx({ ar, head }) {
    const steps = [];
    OPS.forEach((o, k) => CASES21.forEach(([a, b], j) => {
      const c = o.f(a, b), e = `${P(a)} ${o.s} ${P(b)} = ${M(c)}`;
      steps.push({ k, a, b, c, en: `${o.en}: <b>${e}</b>.` + (j === 0 ? ' Each input can be positive or negative, so each operation has four cases.' : ''),
        ar: o.ar + ':' + L(e) + (j === 0 ? 'كل input ممكن يبقى موجب أو سالب، فكل عملية ليها 4 حالات.' : '') });
    }));
    const [i, ctl] = useSteps(steps.length, 1500), s = steps[i];
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap dmv8-split">
      <${OpBox} a=${s.a} b=${s.b} op=${s.k} c=${s.c} />
      <table className="dmv8-tbl" aria-label="Example 2.1 results"><thead><tr><th>a, b</th>${CASES21.map(([a, b], j) => html`<th key=${j}>${M(a)}, ${M(b)}</th>`)}</tr></thead>
        <tbody>${OPS.map((o, k) => html`<tr key=${k}><th>${o.s}</th>${CASES21.map(([a, b], j) => { const n = k * 4 + j; return html`<td key=${j} className=${n === i ? 'new' : ''}>${n <= i ? M(o.f(a, b)) : ''}</td>`; })}</tr>`)}</tbody></table>
    </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function IntOps({ ar }) {
    const [ex, setEx] = useState(0), [a, setA] = useState(5), [b, setB] = useState(-9), [op, setOp] = useState(2);
    const head = html`<${Chips} items=${['Example 2.1', 'Try your own']} sel=${ex} on=${setEx} />`;
    if (ex === 0) return html`<figure className="fig dmv8"><${IntOpsEx} ar=${ar} head=${head} /></figure>`;
    const o = OPS[op], c = o.f(a, b), e = `${P(a)} ${o.s} ${P(b)} = ${M(c)}`;
    return html`<figure className="fig dmv8"><div className="fig-stage">${head}
      <div className="dmv8-row">${OPS.map((x, j) => html`<button key=${j} className=${cls('fig-btn', op === j && 'dmv8-sel')} aria-pressed=${String(op === j)} onClick=${() => setOp(j)}>${x.s}</button>`)}
        <${NumIn} label="a" v=${a} set=${setA} lo=${-999} hi=${999} /><${NumIn} label="b" v=${b} set=${setB} lo=${-999} hi=${999} /></div>
      <${Hint} t="a and b from −999 to 999" />
      <div className="dmv8-wrap"><${OpBox} a=${a} b=${b} op=${op} c=${c} /></div></div>
      <${Cap} en=${`${o.en}: <b>${e}</b>. Two inputs from Z, one output in Z.`} ar=${o.ar + ':' + L(e) + 'الـ 2 inputs من Z والـ output واحد في Z.'} showAr=${ar} /></figure>`;
  }

  /* ───────── [0.3–0.4] Figure 2.4 + Figure 2.3 (Example 2.2): the division algorithm, long division ───────── */
  function longDiv(a, n) {
    const ds = String(a); let i = 1, cur = +ds[0];
    while (cur < n && i < ds.length) { cur = cur * 10 + +ds[i]; i++; }
    const st = [];
    for (;;) {
      const d = Math.floor(cur / n), p = d * n, rem = cur - p, more = i < ds.length;
      st.push({ end: i - 1, cur, d, p, rem, dig: more ? ds[i] : null, next: more ? rem * 10 + +ds[i] : null });
      if (!more) break; cur = rem * 10 + +ds[i]; i++;
    }
    return st;
  }
  function DivBox({ a, n, q, r, on, neg }) {
    return html`<div className="dmv8-col">
      <div className="dmv8-z">${ZSET}</div><div className="dmv8-arr">↓ a = ${M(a)}</div>
      <div className="dmv8-mid"><span className="dmv8-arr">n = ${n} →<small>(positive)</small></span><div className="dmv8-op">a = q × n + r</div>
        <span className=${cls('dmv8-arr', pop(on), neg && 'c')}>→ r = ${M(r)}<small>(non-negative)</small></span></div>
      <div className=${cls('dmv8-arr', pop(on))}>↓ q = ${M(q)}</div><div className="dmv8-z">${ZSET}</div></div>`;
  }
  function Ln({ s, end, ul, tag, nw }) {
    return html`<div className=${cls('dmv8-ldl', nw && 'nw')}><span className=${ul ? 'ul' : ''} style=${{ marginLeft: Math.max(0, end - s.length + 1) + 'ch' }}>${s}</span>${tag && html`<span className="dmv8-tag">${tag}</span>`}</div>`;
  }
  const EX_LD = [{ t: 'Example 2.2', a: 255, n: 11 }, { t: 'Q&A: 101 ÷ 11', a: 101, n: 11 }, { t: 'Quiz: 165 ÷ 18', a: 165, n: 18 }];
  function DivLongRun({ a, n, ar, head }) {
    const st = longDiv(a, n), K = st.length, q = Math.floor(a / n), r = a % n;
    const steps = [{ en: `Divide the dividend <b>a = ${a}</b> by the divisor <b>n = ${n}</b> (n is positive). The division algorithm finds the quotient q and the remainder r.`,
      ar: 'هنقسم الـ dividend على الـ divisor (والـ n موجب):' + L(`a = ${a}, n = ${n}`) + 'والـ division algorithm بيجيب الـ quotient q والـ remainder r.' }];
    st.forEach((x, k) => {
      const last = k === K - 1, f = `${x.cur} ÷ ${n} → ${x.d}, ${x.d} × ${n} = ${x.p}, ${x.cur} − ${x.p} = ${x.rem}`;
      steps.push({ en: `${x.cur} ÷ ${n} gives <b>${x.d}</b>: ${x.d} × ${n} = ${x.p} and ${x.cur} − ${x.p} = ${x.rem}` + (last ? '.' : `. Bring down ${x.dig}: <b>${x.next}</b>.`),
        ar: `الرقم ${x.d} بيتكتب في الـ q:` + L(f) + (last ? '' : `وبعدين ننزّل الـ ${x.dig} فيبقى معانا ${x.next}.`) });
    });
    steps.push({ en: `<b>q = ${q}</b>, <b>r = ${r}</b>: ${a} = ${q} × ${n} + ${r}, with 0 ≤ ${r} &lt; ${n}.`, ar: 'النتيجة:' + L(`q = ${q}, r = ${r}`) + 'والـ division relation بتبقى:' + L(`${a} = ${q} × ${n} + ${r}, 0 ≤ ${r} &lt; ${n}`) });
    const [i, ctl] = useSteps(steps.length, 1900);
    const t = Math.min(i, K), fin = i === K + 1, qs = st.slice(0, t).map(x => x.d).join(''), lines = [];
    for (let k = 0; k < t; k++) {
      const nw = k === t - 1 && !fin;
      lines.push({ s: String(st[k].p), end: st[k].end, ul: 1, nw });
      if (k < K - 1) lines.push({ s: String(st[k + 1].cur), end: st[k + 1].end, nw });
      else lines.push({ s: String(st[k].rem), end: st[k].end, nw, tag: '← r' });
    }
    const len = String(a).length;
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap dmv8-split">
      <${DivBox} a=${a} n=${n} q=${q} r=${r} on=${fin} />
      <div className="dmv8-ld" role="img" aria-label=${`Long division of ${a} by ${n}`}>
        <span></span><div className="dmv8-ldq">${t > 0 ? html`<${Ln} s=${qs} end=${st[0].end + t - 1} tag="← q" nw=${!fin} />` : html`<div className="dmv8-ldl">\u00a0</div>`}</div>
        <span className="dmv8-ldn"><span className="dmv8-tag">n →</span>${n}</span>
        <div className="dmv8-ldb"><${Ln} s=${String(a)} end=${len - 1} tag="← a" />${lines.map((l, j) => html`<${Ln} key=${j} ...${l} />`)}</div>
      </div></div></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function DivLong({ ar }) {
    const [ex, setEx] = useState(0), [a, setA] = useState(255), [n, setN] = useState(11);
    const own = ex === EX_LD.length, E = own ? { a, n } : EX_LD[ex];
    const head = html`<${Chips} items=${EX_LD.map(e => e.t).concat('Try your own')} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="a" v=${a} set=${setA} lo=${0} hi=${999999} w="84px" /><${NumIn} label="n" v=${n} set=${setN} lo=${1} hi=${9999} /></div><${Hint} t="a from 0 to 999999, n from 1 to 9999 (negative a: see the next visual)" />`}`;
    return html`<figure className="fig dmv8"><${DivLongRun} key=${E.a + '/' + E.n} a=${E.a} n=${E.n} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [0.5] Example 2.3: a negative dividend, fix q and r ───────── */
  const EX_NEG = [{ t: 'Example 2.3', a: -255, n: 11 }, { t: 'Q&A: −18 ÷ 14', a: -18, n: 14 }, { t: 'Quiz: −32 ÷ 6', a: -32, n: 6 }];
  function DivNegRun({ a, n, ar, head }) {
    const qc = Math.trunc(a / n), rc = a - qc * n, neg = rc < 0, q = neg ? qc - 1 : qc, r = neg ? rc + n : rc;
    const eqC = `${M(a)} = (${M(qc)} × ${n}) + ${P(rc)}`, eqF = `${M(a)} = (${M(q)} × ${n}) + ${M(r)}`;
    const steps = [{ en: `Divide <b>a = ${M(a)}</b> by <b>n = ${n}</b> on a computer or a calculator.`, ar: 'هنقسم بالكمبيوتر أو الآلة الحاسبة:' + L(`a = ${M(a)}, n = ${n}`) }];
    if (neg) steps.push(
      { en: `The computer gives <b>q = ${M(qc)}</b> and <b>r = ${M(rc)}</b>: ${eqC}. r is negative, but the relation needs 0 ≤ r &lt; n.`, ar: 'الكمبيوتر بيطلّع r سالب:' + L(eqC) + 'بس الـ relation محتاجة ' + B('0 ≤ r &lt; n') + '.' },
      { en: `Decrement q by 1: q = ${M(qc)} − 1 = <b>${M(q)}</b>, so q × n = ${M(q * n)}, one n further down the line.`, ar: 'بننقّص الـ q بواحد:' + L(`q = ${M(qc)} − 1 = ${M(q)}, q × n = ${M(q * n)}`) },
      { en: `Add n to r: r = ${M(rc)} + ${n} = <b>${r}</b>. Now ${eqF}, with 0 ≤ ${r} &lt; ${n}.`, ar: 'بنزوّد الـ n على الـ r:' + L(`r = ${M(rc)} + ${n} = ${r}`) + 'والـ relation بقت صح:' + L(eqF) });
    else steps.push({ en: `The computer gives q = ${M(qc)} and r = ${M(rc)}: ${eqC}. r is not negative, so nothing needs fixing.`, ar: 'الكمبيوتر بيطلّع:' + L(eqC) + 'والـ r مش سالب أصلًا، فمفيش حاجة نصلّحها.' });
    const [i, ctl] = useSteps(steps.length, 2300);
    const lo = neg ? q * n : qc * n, hi = lo + n, X = v => 30 + (v - lo) * 260 / n, xa = X(a);
    const cl = x => Math.max(52, Math.min(268, x));
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap">
      <div className="dmv8-svg"><svg viewBox="0 0 320 112" role="img" aria-label=${`Number line from ${M(lo)} to ${M(hi)} with a = ${M(a)}`}>
        <line x1="20" y1="52" x2="300" y2="52" stroke="var(--graphite)" strokeWidth="1.5" />
        ${n <= 40 && range(n + 1).map(k => html`<line key=${k} x1=${X(lo + k)} y1="47" x2=${X(lo + k)} y2="57" stroke="var(--faint)" strokeWidth="1" />`)}
        <line x1=${X(lo)} y1="38" x2=${X(lo)} y2="66" stroke=${neg && i >= 2 ? 'var(--ok)' : 'var(--ink)'} strokeWidth="2.5" /><line x1=${X(hi)} y1="38" x2=${X(hi)} y2="66" stroke=${neg && i === 1 ? 'var(--pen)' : 'var(--ink)'} strokeWidth="2.5" />
        <text x=${X(lo)} y="28" textAnchor="middle" fontSize="15" fontWeight=${neg && i >= 2 ? 700 : 400}>${M(lo)}</text><text x=${X(hi)} y="28" textAnchor="middle" fontSize="15">${M(hi)}</text>
        ${neg && i >= 1 && html`<${Arw} x1=${X(hi)} x2=${xa} y=${78} col="var(--pen)" />`}
        ${(neg ? i >= 3 : i >= 1) && a !== lo && html`<${Arw} x1=${X(lo)} x2=${xa} y=${neg ? 88 : 78} col="var(--ok)" />`}
        <circle cx=${xa} cy="52" r="6.5" fill="var(--fig-k)" stroke="var(--paper)" strokeWidth="1.5" />
        <text x=${cl(xa)} y="108" textAnchor="middle" fontSize="15" fontWeight="700">a = ${M(a)}</text>
      </svg></div>
      <div className="dmv8-leg">
        ${neg && html`<div className=${cls('dmv8-eq c', pop(i >= 1))}>computer: ${eqC}</div>`}
        <div className=${cls('dmv8-eq g', pop(neg ? i >= 3 : i >= 1))}>${neg ? 'fixed: ' : ''}${eqF}</div></div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function DivNeg({ ar }) {
    const [ex, setEx] = useState(0), [a, setA] = useState(-255), [n, setN] = useState(11);
    const own = ex === EX_NEG.length, E = own ? { a, n } : EX_NEG[ex];
    const head = html`<${Chips} items=${EX_NEG.map(e => e.t).concat('Try your own')} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="a" v=${a} set=${setA} lo=${-99999} hi=${99999} w="84px" /><${NumIn} label="n" v=${n} set=${setN} lo=${1} hi=${999} /></div><${Hint} t="a from −99999 to 99999, n from 1 to 999" />`}`;
    return html`<figure className="fig dmv8"><${DivNegRun} key=${E.a + '/' + E.n} a=${E.a} n=${E.n} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [1.1–1.2] Examples 2.4 and 2.5: does n divide a? ───────── */
  const EX_DIV = [[4, 32], [8, 42], [13, 78], [7, 98], [-6, 24], [4, 44], [11, -33], [13, 27], [7, 50], [-6, 23], [4, 41], [11, -32]];
  function DivCheck({ ar }) {
    const [ex, setEx] = useState(0), [n0, setN] = useState(7), [a0, setA] = useState(91);
    const own = ex === EX_DIV.length, [n, a] = own ? [n0, a0] : EX_DIV[ex];
    const m = Math.abs(n), r = mod(a, m), q = (a - r) / n, yes = r === 0;
    const eq = `${M(a)} = ${P(q)} × ${P(n)}` + (yes ? '' : ` + ${r}`), vd = `${M(n)} ${yes ? '|' : '∤'} ${P(a)}`;
    const k0 = Math.floor(a / m) - 1, lo = k0 * m, X = v => 30 + (v - lo) * 260 / (3 * m);
    const src = own ? '' : ex < 2 ? 'Example 2.4: ' : 'Example 2.5: ';
    const en = src + (yes ? `${eq}, the remainder is 0, so <b>${vd}</b> (${M(n)} divides ${P(a)}).` : `${eq}, the remainder is ${r} ≠ 0, so <b>${vd}</b> (${M(n)} does not divide ${P(a)}).`) + (n < 0 ? ` For the negative divisor we use ${m} to find the remainder.` : '');
    const arT = (yes ? 'الباقي صفر، يبقى ' + B(vd) + ' لأن:' : 'فيه باقي مش صفر، يبقى ' + B(vd) + ' لأن:') + L(eq) + (n < 0 ? 'ومع الـ divisor السالب بنحسب الباقي بالـ ' + B(m) + '.' : '');
    return html`<figure className="fig dmv8"><div className="fig-stage">
      <${Chips} items=${EX_DIV.map(([x, y]) => `${M(x)} and ${M(y)}`).concat('Try your own')} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="n" v=${n0} set=${v => v !== 0 && setN(v)} lo=${-999} hi=${999} /><${NumIn} label="a" v=${a0} set=${setA} lo=${-9999} hi=${9999} w="74px" /></div><${Hint} t="n from −999 to 999 (not 0), a from −9999 to 9999" />`}
      <div className="dmv8-wrap dmv8-col">
        <div className="dmv8-big">${eq}</div>
        <div className=${cls('dmv8-eq', yes ? 'g' : 'c')} style=${{ fontSize: '1.15rem' }}>${vd}</div>
        <div className="dmv8-svg" style=${{ width: '100%' }}><svg viewBox="0 0 320 86" role="img" aria-label=${`Multiples of ${m} around ${M(a)}`}>
          <line x1="16" y1="44" x2="304" y2="44" stroke="var(--graphite)" strokeWidth="1.5" />
          ${range(4).map(k => { const v = lo + k * m; return html`<g key=${k}><line x1=${X(v)} y1="36" x2=${X(v)} y2="52" stroke="var(--ink)" strokeWidth="2" /><text x=${X(v)} y="74" textAnchor="middle" fontSize="15" fontWeight=${v === a ? 700 : 400}>${M(v)}</text></g>`; })}
          ${!yes && html`<${Arw} x1=${X(a - r)} x2=${X(a)} y=${58} col="var(--pen)" />`}
          <circle cx=${X(a)} cy="44" r="6.5" fill="var(--fig-k)" stroke="var(--paper)" strokeWidth="1.5" />
          <text x=${Math.max(50, Math.min(270, X(a)))} y="22" textAnchor="middle" fontSize="15" fontWeight="700">a = ${M(a)}</text>
        </svg></div>
        <p className="dmv8-muted" style=${{ marginTop: 0 }}>Ticks: multiples of ${m}. ${yes ? 'a sits on a multiple: remainder 0.' : `a is ${r} past a multiple: remainder ${r}.`}</p>
      </div></div>
      <${Cap} en=${en} ar=${arT} showAr=${ar} /></figure>`;
  }

  /* ───────── [2.0] Figure 2.6: common divisors of two integers ───────── */
  const divs = x => range(x).map(k => k + 1).filter(k => x % k === 0);
  const EX_VENN = [{ t: 'Figure 2.6: 140 and 12', a: 140, b: 12 }, { t: 'Example 2.8: 25 and 60', a: 25, b: 60 }, { t: 'Exam: 63 and 110', a: 63, b: 110 }];
  function VennRun({ a, b, ar, head }) {
    const da = divs(a), db = divs(b), com = da.filter(x => db.includes(x)), lo = da.filter(x => !db.includes(x)), ro = db.filter(x => !da.includes(x)), g = com[com.length - 1];
    const rows = Math.max(1, Math.ceil(lo.length / 2), Math.ceil(com.length / 2), Math.ceil(ro.length / 2)), ry = Math.max(62, rows * 11 + 36), cy = 40 + ry, H = cy + ry + 6;
    const place = (arr, xs) => { const nr = Math.ceil(arr.length / 2); return arr.map((v, j) => ({ v, x: arr.length % 2 === 1 && j === arr.length - 1 ? (xs[0] + xs[1]) / 2 : xs[j % 2], y: cy + (Math.floor(j / 2) - (nr - 1) / 2) * 22 + 5 })); };
    const pl = place(lo, [44, 84]), pc = place(com, [150, 190]), pr = place(ro, [256, 296]);
    const steps = [
      { en: `Divisors of ${a}: ${da.join(', ')}.`, ar: `الـ divisors بتوع الـ ${a}:` + L(da.join(', ')) },
      { en: `Divisors of ${b}: ${db.join(', ')}.`, ar: `الـ divisors بتوع الـ ${b}:` + L(db.join(', ')) },
      { en: `The common divisors of ${a} and ${b} are in the shaded part: ${com.join(', ')}.`, ar: 'الـ common divisors هما اللي في الجزء المتظلل:' + L(com.join(', ')) },
      { en: `The greatest common divisor is the largest of them: <b>gcd(${a}, ${b}) = ${g}</b>.` + (g === 1 ? ' Since it is 1, the two numbers are relatively prime.' : ''), ar: 'الـ gcd هو أكبر واحد فيهم:' + L(`gcd(${a}, ${b}) = ${g}`) + (g === 1 ? 'وبما إنه 1 يبقى الرقمين relatively prime.' : '') }];
    const [i, ctl] = useSteps(steps.length, 2000);
    const T = (p, show, key) => p.map(o => html`<g key=${key + o.v} className=${pop(show)}>${i >= 3 && o.v === g && html`<circle cx=${o.x} cy=${o.y - 5} r="16" fill="none" stroke="var(--ok)" strokeWidth="3" />`}<text x=${o.x} y=${o.y} textAnchor="middle" fontSize="16" fontWeight=${i >= 3 && o.v === g ? 800 : 500}>${o.v}</text></g>`);
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap">
      <div className="dmv8-svg"><svg viewBox=${`0 0 340 ${H}`} role="img" aria-label=${`Divisors of ${a} and of ${b}; common divisors in the middle`}>
        <defs><clipPath id="dmv8-venn-clip"><ellipse cx="115" cy=${cy} rx="115" ry=${ry} /></clipPath></defs>
        <ellipse cx="225" cy=${cy} rx="114" ry=${ry - 1} fill="color-mix(in srgb, var(--fig-k) 30%, var(--paper))" clipPath="url(#dmv8-venn-clip)" className="fade" style=${{ opacity: i >= 2 ? 1 : 0 }} />
        <ellipse cx="115" cy=${cy} rx="114" ry=${ry - 1} fill="none" stroke=${i === 0 ? 'var(--fig-k)' : 'var(--ink)'} strokeWidth=${i === 0 ? 2.5 : 1.3} />
        <ellipse cx="225" cy=${cy} rx="114" ry=${ry - 1} fill="none" stroke=${i === 1 ? 'var(--fig-k)' : 'var(--ink)'} strokeWidth=${i === 1 ? 2.5 : 1.3} className=${pop(i >= 1)} />
        <text x="80" y="22" textAnchor="middle" fontSize="16" fontWeight="600">Divisors of ${a}</text>
        <text x="260" y="22" textAnchor="middle" fontSize="16" fontWeight="600" className=${pop(i >= 1)}>Divisors of ${b}</text>
        ${T(pl, true, 'l')}${T(pc, true, 'c')}${T(pr, i >= 1, 'r')}
      </svg></div>
      <div className=${cls('dmv8-eq', i >= 3 && 'g', pop(i >= 2))}>common divisors: ${com.join(', ')}${i >= 3 ? ` → gcd(${a}, ${b}) = ${g}` : ''}</div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function GcdVenn({ ar }) {
    const [ex, setEx] = useState(0), [a, setA] = useState(140), [b, setB] = useState(12);
    const own = ex === EX_VENN.length, E = own ? { a, b } : EX_VENN[ex];
    const head = html`<${Chips} items=${EX_VENN.map(e => e.t).concat('Try your own')} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="a" v=${a} set=${setA} lo=${1} hi=${200} /><${NumIn} label="b" v=${b} set=${setB} lo=${1} hi=${200} /></div><${Hint} t="a and b from 1 to 200" />`}`;
    return html`<figure className="fig dmv8"><${VennRun} key=${E.a + '/' + E.b} a=${E.a} b=${E.b} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [2.3–2.5] Figure 2.7: Euclidean algorithm, process and code ───────── */
  const euclid = (a, b) => { const rows = []; let r1 = a, r2 = b; while (r2 > 0) { const q = Math.floor(r1 / r2), r = r1 - q * r2; rows.push({ q, r1, r2, r }); r1 = r2; r2 = r; } return { rows, g: r1 }; };
  const CODE27 = ['r₁ ← a;   r₂ ← b;   (Initialization)', 'while (r₂ > 0)', '{', '   q ← r₁ / r₂;', '   r ← r₁ − q × r₂;', '   r₁ ← r₂;   r₂ ← r;', '}', 'gcd(a, b) ← r₁'];
  const EX_EU = [{ t: 'Example 2.8: gcd(25, 60)', a: 60, b: 25, note: 1 }, { t: 'Exam: gcd(63, 110)', a: 110, b: 63, note: 1 }];
  function EuclidRunIn({ a, b, note, ar, head }) {
    const { rows, g } = euclid(a, b), m = rows.length;
    const steps = [{ on: [0], en: `Initialization: <b>r₁ ← ${a}</b>, <b>r₂ ← ${b}</b>.` + (note ? ' The notes start with the larger number.' : ''), ar: 'الـ Initialization:' + L(`r₁ ← ${a}, r₂ ← ${b}`) + (note ? 'والنوتس بتبدأ بالرقم الأكبر.' : '') }];
    rows.forEach(x => steps.push({ on: [1, 3, 4, 5], en: `r₂ = ${x.r2} > 0: q ← ${x.r1} / ${x.r2} = ${x.q}, r ← ${x.r1} − ${x.q} × ${x.r2} = ${x.r}, so <b>${x.r1} = ${x.q} × ${x.r2} + ${x.r}</b>. Then r₁ ← ${x.r2}, r₂ ← ${x.r}.`,
      ar: 'الـ r₂ لسه أكبر من صفر، فبنحسب:' + L(`${x.r1} = ${x.q} × ${x.r2} + ${x.r}`) + 'وبعدين بنزحلق القيم:' + L(`r₁ ← ${x.r2}, r₂ ← ${x.r}`) }));
    steps.push({ on: [1, 7], en: `r₂ = 0, so the loop stops: <b>gcd(${a}, ${b}) = r₁ = ${g}</b>.` + (m === 0 ? ' (Fact 1: gcd(a, 0) = a.)' : '') + (g === 1 ? ' gcd = 1: the numbers are relatively prime.' : ''),
      ar: 'الـ r₂ بقت صفر فالـ loop وقفت، والنتيجة:' + L(`gcd(${a}, ${b}) = r₁ = ${g}`) + (g === 1 ? 'وبما إن الـ gcd يساوي 1 يبقى الرقمين relatively prime.' : '') });
    const [i, ctl] = useSteps(steps.length, 2100), fin = i === m + 1;
    const all = rows.map(x => [x.r1, x.r2, x.r]).concat([[g, 0, null]]);
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap dmv8-split">
      <div><div className="dmv8-ttl" style=${{ marginBottom: '4px' }}>a. Process</div>
        <div className="dmv8-lad" role="img" aria-label="Euclidean algorithm process">
          ${all.map((row, k) => k > Math.min(i, m) ? null : html`<${React.Fragment} key=${k}>
            ${k > 0 && html`<span></span><span className="dn">↙</span><span></span><span className="dn">↙</span>`}
            <span className=${cls('bx l', k === m && fin && 'gd', k === i && !fin && 'nw')}>${k === 0 ? 'r₁ = ' : ''}${row[0]}</span>
            <span className=${cls('bx m', k === m && fin && 'gd', k === i && !fin && 'nw')}>${k === 0 ? 'r₂ = ' : ''}${row[1]}</span>
            ${k < m ? html`<span className="ar2">→</span><span className=${cls('bx rr', pop(i > k))}>${row[2]}</span>` : html`<span></span><span></span>`}
          </${React.Fragment}>`)}
        </div>
        <div className=${cls('dmv8-foot', pop(fin))}>gcd(${a}, ${b}) = r₁ = ${g}</div></div>
      <div><div className="dmv8-ttl" style=${{ marginBottom: '4px' }}>b. Algorithm</div>
        <div className="dmv8-code">${CODE27.map((l, k) => html`<div key=${k} className=${steps[i].on.includes(k) ? 'on' : ''}>${l}</div>`)}</div></div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function EuclidRun({ ar }) {
    const [ex, setEx] = useState(0), [a, setA] = useState(2740), [b, setB] = useState(1760);
    const own = ex === EX_EU.length, E = own ? { a, b } : EX_EU[ex];
    const head = html`<${Chips} items=${EX_EU.map(e => e.t).concat('Try your own')} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="a" v=${a} set=${setA} lo=${1} hi=${99999} w="74px" /><${NumIn} label="b" v=${b} set=${setB} lo=${0} hi=${99999} w="74px" /></div><${Hint} t="a from 1 to 99999, b from 0 to 99999" />`}`;
    return html`<figure className="fig dmv8"><${EuclidRunIn} key=${E.a + '/' + E.b} a=${E.a} b=${E.b} note=${E.note} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [3] Example 2.7: the gcd table filled row by row ───────── */
  function EuTableRun({ a, b, ar, head }) {
    const { rows, g } = euclid(a, b), m = rows.length;
    const steps = [{ en: `Start: <b>r₁ = ${a}</b>, <b>r₂ = ${b}</b>.`, ar: 'البداية:' + L(`r₁ = ${a}, r₂ = ${b}`) }];
    rows.forEach((x, k) => {
      steps.push({ en: `Row ${k + 1}: q is the integer part of r₁ / r₂: q = ${x.r1} / ${x.r2} → <b>${x.q}</b>.`, ar: `في الصف ${k + 1} الـ q هي الجزء الصحيح من القسمة:` + L(`q = ${x.r1} / ${x.r2} → ${x.q}`) });
      steps.push({ en: `r = r₁ − q × r₂ = ${x.r1} − ${x.q} × ${x.r2} = <b>${x.r}</b>. In the next row r₂ (${x.r2}) becomes r₁ and r (${x.r}) becomes r₂.`, ar: 'بنحسب الباقي:' + L(`r = ${x.r1} − ${x.q} × ${x.r2} = ${x.r}`) + 'وفي الصف اللي بعده الـ r₂ بتبقى r₁ والـ r بتبقى r₂.' });
    });
    steps.push({ en: `r₂ = 0: stop. <b>gcd(${a}, ${b}) = r₁ = ${g}</b>.`, ar: 'الـ r₂ بقت صفر فبنقف:' + L(`gcd(${a}, ${b}) = r₁ = ${g}`) });
    const [i, ctl] = useSteps(steps.length, 1500), fin = i === 2 * m + 1;
    const cell = (k, c) => {   // step at which a cell appears
      if (c === 'r1' || c === 'r2') return k === 0 ? 0 : 2 * k; if (c === 'q') return 2 * k + 1; return 2 * k + 2; };
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap" style=${{ maxWidth: '400px' }}>
      <table className="dmv8-tbl"><thead><tr><th>q</th><th>r₁</th><th>r₂</th><th>r</th></tr></thead><tbody>
        ${rows.map((x, k) => cell(k, 'r1') > i ? null : html`<tr key=${k}>${['q', 'r1', 'r2', 'r'].map(c => { const s = cell(k, c); return html`<td key=${c} className=${s === i ? 'new' : ''}>${s <= i ? x[c] : ''}</td>`; })}</tr>`)}
        ${i >= 2 * m && html`<tr><td></td><td className=${fin ? 'fin' : i === 2 * m && m > 0 ? 'new' : ''}>${g}</td><td className=${i === 2 * m && m > 0 && !fin ? 'new' : ''}>0</td><td className=${fin ? 'fin' : ''}>${fin ? `gcd = ${g}` : ''}</td></tr>`}
      </tbody></table></div></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function EuTable({ ar }) {
    const [ex, setEx] = useState(0), [a, setA] = useState(2740), [b, setB] = useState(1760);
    const own = ex === 1, E = own ? { a, b } : { a: 2740, b: 1760 };
    const head = html`<${Chips} items=${['Example 2.7', 'Try your own']} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="a" v=${a} set=${setA} lo=${1} hi=${999999} w="84px" /><${NumIn} label="b" v=${b} set=${setB} lo=${0} hi=${999999} w="84px" /></div><${Hint} t="a from 1 to 999999, b from 0 to 999999" />`}`;
    return html`<figure className="fig dmv8"><${EuTableRun} key=${E.a + '/' + E.b} a=${E.a} b=${E.b} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [5] + [9] Figures 2.8 and 2.15: extended Euclidean algorithm (s and t), and the inverse ───────── */
  const xgcd = (a, b) => {
    const rows = []; let r1 = a, r2 = b, s1 = 1, s2 = 0, t1 = 0, t2 = 1;
    while (r2 > 0) { const q = Math.floor(r1 / r2), r = r1 - q * r2, s = s1 - q * s2, t = t1 - q * t2; rows.push({ q, r1, r2, r, s1, s2, s, t1, t2, t }); r1 = r2; r2 = r; s1 = s2; s2 = s; t1 = t2; t2 = t; }
    rows.push({ r1, r2, s1, s2, t1, t2, fin: 1 }); return rows;
  };
  const XC = { r: ['q', 'r1', 'r2', 'r'], s: ['s1', 's2', 's'], t: ['t1', 't2', 't'] }, XH = { q: 'q', r1: 'r₁', r2: 'r₂', r: 'r', s1: 's₁', s2: 's₂', s: 's', t1: 't₁', t2: 't₂', t: 't' };
  const PP = x => '(' + M(x) + ')';
  function XRun({ a, b, inv, ar, head }) {
    const rows = xgcd(a, b), m = rows.length - 1, parts = inv ? ['r', 't'] : ['r', 's', 't'], per = parts.length, F = rows[m], g = F.r1;
    const steps = [{ en: inv ? `Initialization: r₁ ← n = ${a}, r₂ ← b = ${b}; t₁ ← 0, t₂ ← 1.` : `Initialization: r₁ ← ${a}, r₂ ← ${b}; s₁ ← 1, s₂ ← 0; t₁ ← 0, t₂ ← 1.`,
      ar: 'الـ Initialization:' + L(inv ? `r₁ ← ${a}, r₂ ← ${b}; t₁ ← 0, t₂ ← 1` : `r₁ ← ${a}, r₂ ← ${b}; s₁ ← 1, s₂ ← 0; t₁ ← 0, t₂ ← 1`) }];
    rows.slice(0, m).forEach((x, k) => parts.forEach(p => {
      if (p === 'r') steps.push({ en: `Row ${k + 1}: q ← ${x.r1} / ${x.r2} = <b>${x.q}</b>, r ← ${x.r1} − ${x.q} × ${x.r2} = <b>${x.r}</b>; then r₁ ← ${x.r2}, r₂ ← ${x.r}.`,
        ar: `في الصف ${k + 1} بنحسب الـ q والـ r:` + L(`q = ${x.r1} / ${x.r2} → ${x.q}`) + L(`r = ${x.r1} − ${x.q} × ${x.r2} = ${x.r}`) + 'وبعدين بنزحلق:' + L(`r₁ ← ${x.r2}, r₂ ← ${x.r}`) });
      else { const v1 = x[p + '1'], v2 = x[p + '2'], v = x[p], sb1 = p + '₁', sb2 = p + '₂';
        steps.push({ en: `Same q for ${p}: ${p} ← ${M(v1)} − ${x.q} × ${P(v2)} = <b>${M(v)}</b>; then ${sb1} ← ${M(v2)}, ${sb2} ← ${M(v)}.`,
          ar: `نفس الـ q بنستخدمها في الـ ${p}:` + L(`${p} = ${M(v1)} − ${x.q} × ${P(v2)} = ${M(v)}`) + 'وبعدين بنزحلق:' + L(`${sb1} ← ${M(v2)}, ${sb2} ← ${M(v)}`) }); }
    }));
    let fen, far;
    if (!inv) {
      const chk = `${PP(F.s1)}(${a}) + ${PP(F.t1)}(${b}) = ${M(F.s1 * a)} + ${P(F.t1 * b)} = ${g}`;
      fen = `r₂ = 0, so the loop stops: <b>gcd(${a}, ${b}) = ${g}, s = ${M(F.s1)}, t = ${M(F.t1)}</b>. Check s × a + t × b: ${chk}.`;
      far = 'الـ r₂ بقت صفر فالـ loop وقفت، والنتيجة:' + L(`gcd(${a}, ${b}) = r₁ = ${g}, s = s₁ = ${M(F.s1)}, t = t₁ = ${M(F.t1)}`) + 'والتأكيد إن s × a + t × b يساوي الـ gcd:' + L(chk);
    } else if (g === 1) {
      const iv = mod(F.t1, a), k = (b * iv - 1) / a;
      fen = `r₂ = 0: gcd(${a}, ${b}) = 1, so ${b} has an inverse in ${Z(a)}: t₁ = ${M(F.t1)}, mapped to ${Z(a)}: <b>${M(F.t1)} mod ${a} = ${iv}</b>. Check: ${b} × ${iv} = ${b * iv} = ${k} × ${a} + 1.`;
      far = 'الـ gcd طلع 1، يبقى ليه inverse، وهو الـ t₁ بعد ما نرجّعها للـ set ' + B(Z(a)) + ' كده:' + L(`t₁ = ${M(F.t1)} → ${M(F.t1)} mod ${a} = ${iv}`) + 'والتأكيد:' + L(`${b} × ${iv} = ${b * iv} = ${k} × ${a} + 1`);
    } else {
      fen = `r₂ = 0: gcd(${a}, ${b}) = ${g} ≠ 1, so ${b} has <b>no</b> multiplicative inverse in ${Z(a)}.`;
      far = 'الـ gcd طلع مش 1، يبقى الـ inverse مش موجود:' + L(`gcd(${a}, ${b}) = ${g} ≠ 1`);
    }
    steps.push({ en: fen, ar: far });
    const [i, ctl] = useSteps(steps.length, 2000), fin = i === steps.length - 1;
    const at = (k, c) => { const j = parts.indexOf(c === 'q' ? 'r' : c.replace(/[12]$/, '')); return /[12]$/.test(c) ? (k === 0 ? 0 : 1 + (k - 1) * per + j) : 1 + k * per + j; };
    const foot = { r: `gcd = r₁ = ${g}`, s: `s = s₁ = ${M(F.s1)}`, t: inv ? (g === 1 ? `b⁻¹ = t₁ = ${M(F.t1)} → ${mod(F.t1, a)}` : 'no inverse') : `t = t₁ = ${M(F.t1)}` };
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap">
      <div className=${cls('dmv8-xg', inv && 'two')}>${parts.map(p => html`<div key=${p} className="dmv8-pan"><span className="dmv8-ttl">${p}</span>
        <table className="dmv8-tbl"><thead><tr>${XC[p].map(c => html`<th key=${c}>${XH[c]}</th>`)}</tr></thead><tbody>
          ${rows.map((x, k) => at(k, XC[p][p === 'r' ? 1 : 0]) > i ? null : html`<tr key=${k}>${XC[p].map(c => { const s = x.fin && !/[12]$/.test(c) ? 1e9 : at(k, c); return html`<td key=${c} className=${x.fin && fin && /1$/.test(c) ? 'fin' : s === i ? 'new' : ''}>${s <= i ? M(x[c]) : ''}</td>`; })}</tr>`)}
        </tbody></table><div className=${cls('dmv8-foot', pop(fin))}>${foot[p]}</div></div>`)}</div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  const EX_XG = [{ t: 'Example 2.9: 161, 28', a: 161, b: 28 }, { t: 'Example 2.10: 17, 0', a: 17, b: 0 }, { t: 'Example 2.11: 0, 45', a: 0, b: 45 }];
  function XgcdTable({ ar }) {
    const [ex, setEx] = useState(0), [a, setA] = useState(161), [b, setB] = useState(28);
    const own = ex === EX_XG.length, E = own ? { a, b } : EX_XG[ex];
    const head = html`<${Chips} items=${EX_XG.map(e => e.t).concat('Try your own')} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="a" v=${a} set=${setA} lo=${0} hi=${9999} /><${NumIn} label="b" v=${b} set=${setB} lo=${0} hi=${9999} /></div><${Hint} t="a and b from 0 to 9999 (not both 0)" />`}`;
    const ok = E.a + E.b > 0;
    return html`<figure className="fig dmv8">${ok ? html`<${XRun} key=${E.a + '/' + E.b} a=${E.a} b=${E.b} ar=${ar} head=${head} />` : html`<div className="fig-stage">${head}<p className="dmv8-muted">a and b cannot both be 0.</p></div>`}</figure>`;
  }
  const EX_XI = [{ t: 'Example 2.25: 11 in Z₂₆', a: 26, b: 11 }, { t: 'Example 2.26: 23 in Z₁₀₀', a: 100, b: 23 }, { t: 'Example 2.27: 12 in Z₂₆', a: 26, b: 12 }];
  function XgcdInverse({ ar }) {
    const [ex, setEx] = useState(0), [n, setN] = useState(26), [b, setB] = useState(11);
    const own = ex === EX_XI.length, E = own ? { a: n, b } : EX_XI[ex];
    const head = html`<${Chips} items=${EX_XI.map(e => e.t).concat('Try your own')} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="n" v=${n} set=${setN} lo=${2} hi=${9999} /><${NumIn} label="b" v=${b} set=${setB} lo=${1} hi=${9999} /></div><${Hint} t="n from 2 to 9999, b from 1 to n − 1" />`}`;
    const ok = E.b < E.a;
    return html`<figure className="fig dmv8">${ok ? html`<${XRun} key=${E.a + '/' + E.b} a=${E.a} b=${E.b} inv=${true} ar=${ar} head=${head} />` : html`<div className="fig-stage">${head}<p className="dmv8-muted">b must be smaller than n (b is in Zn).</p></div>`}</figure>`;
  }

  /* ───────── [6.0–6.1] Figure 2.9 + Example 2.14: division relation vs mod operator ───────── */
  const EX_MOD = [[27, 5], [36, 12], [-18, 14], [-7, 10]];
  function modSteps(a, n) {
    const qc = Math.trunc(a / n), rc = a - qc * n, out = [];
    if (rc >= 0) out.push({ a, n, q: qc, r: rc, en: `${M(a)} mod ${n}: ${M(a)} = ${P(qc)} × ${n} + ${rc}. The relation outputs q = ${M(qc)} and r = ${rc}; the mod operator keeps only <b>r = ${rc}</b>, the residue.`,
      ar: 'الـ relation بتطلّع q و r، والـ mod operator بياخد الـ r بس (الـ residue):' + L(`${M(a)} = ${P(qc)} × ${n} + ${rc} → ${M(a)} mod ${n} = ${rc}`) });
    else out.push({ a, n, q: qc, r: rc, neg: 1, en: `${M(a)} mod ${n}: dividing gives r = ${M(rc)} (q = ${M(qc)}), which is negative.`, ar: 'القسمة بتطلّع r سالب:' + L(`${M(a)} = (${M(qc)} × ${n}) + ${P(rc)}`) },
      { a, n, q: qc - 1, r: rc + n, en: `Add the modulus: ${M(rc)} + ${n} = <b>${rc + n}</b>, so ${M(a)} mod ${n} = ${rc + n}.`, ar: 'بنزوّد الـ modulus على الباقي:' + L(`${M(rc)} + ${n} = ${rc + n} → ${M(a)} mod ${n} = ${rc + n}`) });
    return out;
  }
  function ModOpRun({ list, ar, head }) {
    const steps = list;
    const [i, ctl] = useSteps(steps.length, 2300), s = steps[i];
    const out = (both) => html`<div className="dmv8-ab">${both && html`<span className="dmv8-arr">↓ q = ${M(s.q)}</span>`}<span className=${cls('dmv8-arr', s.neg ? 'c' : 'g')}>↓ r = ${M(s.r)}<small>${s.neg ? 'negative: add n' : '(non-negative)'}</small></span></div>`;
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap dmv8-pair">
      <div className="dmv8-col dmv8-box"><span className="dmv8-ttl">Relation</span><div className="dmv8-arr">↓ a = ${M(s.a)}</div>
        <div className="dmv8-mid"><span className="dmv8-arr">n = ${s.n} →<small>(positive)</small></span><div className="dmv8-op">a = q × n + r</div></div>${out(true)}</div>
      <div className="dmv8-col dmv8-box"><span className="dmv8-ttl">Operator</span><div className="dmv8-arr">↓ a = ${M(s.a)}</div>
        <div className="dmv8-mid"><span className="dmv8-arr">n = ${s.n} →<small>(modulus)</small></span><div className="dmv8-op">mod</div></div>${out(false)}</div>
    </div><div className="dmv8-wrap" style=${{ marginTop: '10px' }}><div className=${cls('dmv8-eq', s.neg ? 'c' : 'g')}>${M(s.a)} mod ${s.n} = ${s.neg ? '?' : s.r}</div></div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function ModOp({ ar }) {
    const [ex, setEx] = useState(0), [a, setA] = useState(-18), [n, setN] = useState(14);
    const own = ex === 1, list = own ? modSteps(a, n) : EX_MOD.reduce((acc, [x, y]) => acc.concat(modSteps(x, y)), []);
    const head = html`<${Chips} items=${['Example 2.14', 'Try your own']} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="a" v=${a} set=${setA} lo=${-9999} hi=${9999} w="74px" /><${NumIn} label="n" v=${n} set=${setN} lo=${1} hi=${999} /></div><${Hint} t="a from −9999 to 9999, n from 1 to 999" />`}`;
    return html`<figure className="fig dmv8"><${ModOpRun} key=${own ? a + '/' + n : 'ex'} list=${list} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [6.2] Figure 2.10: Zn, the set of least residues, as a wheel ───────── */
  function Wheel({ n, hi, pairs, mid, label }) {
    const R = 108, c = 150, rs = Math.max(11, Math.min(20, Math.PI * R / n - 3)), pt = k => [c + R * Math.cos((-90 + 360 * k / n) * Math.PI / 180), c + R * Math.sin((-90 + 360 * k / n) * Math.PI / 180)];
    return html`<div className="dmv8-svg" style=${{ maxWidth: '300px' }}><svg viewBox="0 0 300 300" role="img" aria-label=${label}>
      <circle cx=${c} cy=${c} r=${R} fill="none" stroke="var(--line)" strokeWidth="2" />
      ${(pairs || []).map(([x, y], j) => { const [x1, y1] = pt(x), [x2, y2] = pt(y); return x === y ? html`<circle key=${'p' + j} cx=${x1} cy=${y1} r=${rs + 5} fill="none" stroke="var(--ok)" strokeWidth="3" />` : html`<line key=${'p' + j} x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="var(--ok)" strokeWidth="3" />`; })}
      ${range(n).map(k => { const [x, y] = pt(k), on = hi && hi.includes(k); return html`<g key=${k}><circle cx=${x} cy=${y} r=${rs} fill=${on ? 'var(--fig-k)' : 'var(--paper)'} stroke=${on ? 'var(--fig-k)' : 'var(--graphite)'} strokeWidth="1.5" />
        <text x=${x} y=${y + 5} textAnchor="middle" fontSize="15" fontWeight="700" style=${on ? { fill: 'var(--paper)' } : null}>${k}</text></g>`; })}
      ${mid && mid.map((t, j) => html`<text key=${'m' + j} x=${c} y=${c - 6 + j * 24 - (mid.length - 1) * 8} textAnchor="middle" fontSize=${j === 0 ? 20 : 15} fontWeight=${j === 0 ? 800 : 500} style=${{ fontFamily: 'var(--body)' }}>${t}</text>`)}
    </svg></div>`;
  }
  const SetBox = ({ n, on }) => html`<div className="dmv8-z">${ZH(n)} = { ${range(n).map(k => html`<${React.Fragment} key=${k}><span className=${on === k ? 'on' : ''}>${k}</span>${k < n - 1 ? ', ' : ''}</${React.Fragment}>`)} }</div>`;
  function ZnRun({ n, ar, head }) {
    const [a, setA] = useState(calm() ? n + 1 : 0), [lim, setLim] = useState(calm() ? null : 2 * n + 1);
    useEffect(() => { if (lim == null) return; if (a >= lim || a >= 999) { setLim(null); return; } const t = setTimeout(() => setA(x => x + 1), 850); return () => clearTimeout(t); }, [a, lim]);
    const r = mod(a, n), q = (a - r) / n, eq = `${M(a)} = ${P(q)} × ${n} + ${r}`;
    const en = `a = ${M(a)}: ${eq}, so <b>${M(a)} mod ${n} = ${r}</b>. Whatever a is, the result is in ${Z(n)} = {0, …, ${n - 1}}, the set of least residues modulo ${n}.`;
    const arT = 'مهما كانت الـ a، الـ residue بيقع جوّه ' + B(Z(n)) + '، وهي الـ set of least residues:' + L(`${eq} → ${M(a)} mod ${n} = ${r} ∈ ${Z(n)}`);
    const go = d => { setLim(null); setA(x => Math.max(-999, Math.min(999, x + d))); };
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap dmv8-col">
      <div className="dmv8-z" style=${{ background: 'var(--paper)' }}>Z<sub>n</sub> = { 0, 1, 2, 3, …, (n − 1) }</div>
      <${SetBox} n=${n} on=${r} />
      <${Wheel} n=${n} hi=${[r]} mid=${[`a = ${M(a)}`, `a mod ${n} = ${r}`]} label=${`${Z(n)} as a wheel, ${M(a)} mod ${n} = ${r}`} />
    </div></div><${Cap} en=${en} ar=${arT} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => go(-1)} aria-label="a minus 1">‹ a − 1</button><button className="fig-btn" onClick=${() => go(1)} aria-label="a plus 1">a + 1 ›</button>
        <button className="fig-btn" onClick=${() => lim != null ? setLim(null) : setLim(Math.min(999, a + 2 * n))}>${lim != null ? '❚❚ Pause' : '▶ Walk'}</button><${NumIn} label="a" v=${a} set=${v => { setLim(null); setA(v); }} lo=${-999} hi=${999} /></div>`;
  }
  const EX_ZN = [2, 6, 11];
  function ZnWheel({ ar }) {
    const [ex, setEx] = useState(1), [n, setN] = useState(10);
    const own = ex === EX_ZN.length, N = own ? n : EX_ZN[ex];
    const head = html`<${Chips} items=${EX_ZN.map(k => Z(k)).concat('Try your own')} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="n" v=${n} set=${setN} lo=${2} hi=${24} /></div><${Hint} t="n from 2 to 24" />`}`;
    return html`<figure className="fig dmv8"><${ZnRun} key=${N} n=${N} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [6.3] Figure 2.11: concept of congruence ───────── */
  const EX_CG = [{ t: 'Figure 2.11', n: 10, xs: [-8, 2, 12, 22] }, { t: '2 ≡ 12 (mod 10)', n: 10, xs: [2, 12] }, { t: '13 ≡ 23 (mod 10)', n: 10, xs: [13, 23] }, { t: '3 ≡ 8 (mod 5)', n: 5, xs: [3, 8] }, { t: '8 ≡ 13 (mod 5)', n: 5, xs: [8, 13] }];
  function CongRun({ n, xs, ar, head }) {
    const rs = xs.map(x => mod(x, n)), same = rs.every(r => r === rs[0]), K = xs.length;
    const rel = same ? xs.map(M).join(' ≡ ') + ` (mod ${n})` : `${M(xs[0])} ≢ ${M(xs[1])} (mod ${n})`;
    const steps = [{ en: `Take the integers ${xs.map(M).join(', ')} from Z and feed each one to mod ${n}.`, ar: 'هندخّل الأرقام دي من Z على الـ mod:' + L(`${xs.map(M).join(', ')} → mod ${n}`) }];
    xs.forEach((x, j) => steps.push({ en: `${M(x)} mod ${n} = <b>${rs[j]}</b>` + (x < 0 ? ` (${M(x)} + ${rs[j] - x} = ${rs[j]}).` : '.'), ar: 'الـ residue بتاع الرقم ده:' + L(`${M(x)} mod ${n} = ${rs[j]}`) }));
    steps.push(same ? { en: `All of them give the same residue ${rs[0]} in ${Z(n)}, so they are congruent: <b>${rel}</b>. a ≡ b (mod n) means a mod n = b mod n.`, ar: 'كلهم طلّعوا نفس الـ residue، يبقوا congruent:' + L(rel) + 'يعني ' + B('a ≡ b (mod n)') + ' معناها إن ' + B('a mod n = b mod n') + '.' }
      : { en: `The residues differ (${rs[0]} and ${rs[1]}), so <b>${rel}</b>: not congruent.`, ar: 'الـ residues مختلفة، يبقوا مش congruent:' + L(rel) });
    const [i, ctl] = useSteps(steps.length, 1800), fin = i === K + 1;
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap dmv8-col">
      <div className="dmv8-cols" style=${{ gridTemplateColumns: `repeat(${K}, minmax(0, 76px))` }}>
        ${xs.map((x, j) => html`<div key=${j} className="dmv8-col">
          <span className=${cls('dmv8-chip', i === j + 1 && 'on')}>${M(x)}</span><span className="dmv8-arr">↓</span>
          <div className="dmv8-op" style=${{ padding: '6px 6px', fontSize: '.84rem' }}>mod ${n}</div>
          <span className=${cls('dmv8-arr', pop(i > j))}>↓</span><span className=${cls('dmv8-chip', i > j && 'g', pop(i > j))}>${rs[j]}</span></div>`)}</div>
      <div className="dmv8-cells" style=${{ marginTop: '4px' }}><span className="dmv8-tag" style=${{ alignSelf: 'center' }}>${ZH(n)}</span>${range(n).map(k => html`<span key=${k} className=${cls('dmv8-cell', rs.slice(0, Math.min(i, K)).includes(k) && (fin ? 'on' : 'hl'))}>${k}</span>`)}</div>
      <div className=${cls('dmv8-eq', same ? 'g' : 'c', pop(fin))} style=${{ fontSize: '1rem' }}>${rel}</div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function Congruence({ ar }) {
    const [ex, setEx] = useState(0), [n, setN] = useState(7), [a, setA] = useState(-3), [b, setB] = useState(18);
    const own = ex === EX_CG.length, E = own ? { n, xs: [a, b] } : EX_CG[ex];
    const head = html`<${Chips} items=${EX_CG.map(e => e.t).concat('Try your own')} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="a" v=${a} set=${setA} lo=${-999} hi=${999} /><${NumIn} label="b" v=${b} set=${setB} lo=${-999} hi=${999} /><${NumIn} label="n" v=${n} set=${setN} lo=${2} hi=${30} /></div><${Hint} t="a and b from −999 to 999, n from 2 to 30" />`}`;
    return html`<figure className="fig dmv8"><${CongRun} key=${E.n + ':' + E.xs.join(',')} n=${E.n} xs=${E.xs} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [6.4] Example 2.15: the clock is modulo 12 arithmetic ───────── */
  function Clock({ ar }) {
    const [s, setS0] = useState(9), [k, setK0] = useState(5), [j, setJ] = useState(calm() ? 5 : 0), [run, setRun] = useState(!calm());
    useEffect(() => { if (!run) return; if (j >= k) { setRun(false); return; } const t = setTimeout(() => setJ(x => x + 1), 500); return () => clearTimeout(t); }, [run, j, k]);
    const restart = () => { setJ(calm() ? k : 0); setRun(!calm()); };
    const setS = v => { setS0(v); setJ(0); setRun(!calm()); if (calm()) setJ(k); }, setK = v => { setK0(v); setJ(calm() ? v : 0); setRun(!calm()); };
    const h = (s + j) % 12, show = h === 0 ? 12 : h, done = j >= k, tot = s + k, r = tot % 12;
    const ang = (show % 12) * 30 - 90, c = 130, P2 = (hr, rad) => [c + rad * Math.cos((hr * 30 - 90) * Math.PI / 180), c + rad * Math.sin((hr * 30 - 90) * Math.PI / 180)];
    const f = `(${s} + ${k}) mod 12 = ${tot} mod 12 = ${r}`;
    const en = done ? `Example 2.15: the clock uses modulo 12 arithmetic. ${s} o'clock + ${k} hours: <b>${f}</b>` + (r === 0 ? ', but the clock writes <b>12</b> instead of 0.' : '.') : `Moving the hand: ${s} o'clock + ${j} of ${k} hours.`;
    const arT = done ? 'الساعة بتستخدم modulo 12 arithmetic:' + L(f) + (r === 0 ? 'بس الساعة بتكتب 12 بدل 0.' : '') : 'العقرب بيتحرك ساعة ساعة، ولحد دلوقتي:' + L(`${s} + ${j} h`);
    const [hx, hy] = P2(show, 66);
    return html`<figure className="fig dmv8"><div className="fig-stage">
      <div className="dmv8-row"><${NumIn} label="start (o'clock)" v=${s} set=${setS} lo=${1} hi=${12} w="52px" /><${NumIn} label="+ hours" v=${k} set=${setK} lo=${0} hi=${48} w="52px" /></div>
      <${Hint} t="start from 1 to 12, hours to add from 0 to 48" />
      <div className="dmv8-wrap dmv8-col"><div className="dmv8-svg" style=${{ maxWidth: '240px', width: '100%' }}><svg viewBox="0 0 260 260" role="img" aria-label=${`Clock showing ${show} o'clock`}>
        <circle cx=${c} cy=${c} r="120" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
        ${range(12).map(t => { const hr = t + 1, [x, y] = P2(hr, 96), on = hr === show; return html`<g key=${t}>${(on || hr === s) && html`<circle cx=${x} cy=${y} r="17" fill=${on ? 'var(--fig-k)' : 'none'} stroke="var(--fig-k)" strokeWidth="2" />`}
          <text x=${x} y=${y + 7} textAnchor="middle" fontSize="20" fontWeight="700" style=${on ? { fill: 'var(--paper)' } : null}>${hr}</text></g>`; })}
        <line x1=${c} y1=${c} x2=${hx} y2=${hy} stroke="var(--fig-k)" strokeWidth="6" strokeLinecap="round" style=${{ transition: calm() ? 'none' : 'all .35s ease' }} />
        <circle cx=${c} cy=${c} r="7" fill="var(--ink)" />
        <text x=${c} y="178" textAnchor="middle" fontSize="16" fontWeight="600">+${j} h</text>
      </svg></div>
      <div className=${cls('dmv8-eq', done && 'g')}>${done ? f + (r === 0 ? ' → 12' : '') : `(${s} + ${j}) mod 12 = ${(s + j) % 12}`}</div></div></div>
      <${Cap} en=${en} ar=${arT} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${restart}>↻ Replay</button></div></figure>`;
  }

  /* ───────── [7.0, 7.5–7.6] Figure 2.13 + Examples 2.16 and 2.17: binary operations in Zn ───────── */
  const EX_ZO = [{ t: '2.16 a', a: 14, b: 7, o: 0, n: 15 }, { t: '2.16 b', a: 7, b: 11, o: 1, n: 13 }, { t: '2.16 c', a: 7, b: 11, o: 2, n: 20 },
    { t: '2.17 a', a: 17, b: 27, o: 0, n: 14 }, { t: '2.17 b', a: 12, b: 43, o: 1, n: 13 }, { t: '2.17 c', a: 123, b: -10, o: 2, n: 19 }];
  function ZnOpsRun({ E, own, ar, head }) {
    const { a, b, o, n } = E, O = OPS[o], v = O.f(a, b), c = mod(v, n), kk = v < 0 ? Math.ceil(-v / n) : 0, e = `${P(a)} ${O.s} ${P(b)} = ${M(v)}`;
    const src = own ? '' : `Example ${E.t.slice(0, 4)} (inputs from ${E.t[3] === '6' ? 'Zn' : 'Z or Zn'}): `;
    const m2 = v >= 0 ? `${v} mod ${n} = ${c}` : `${M(v)} mod ${n} = ${M(v)} + ${kk * n} = ${c}`;
    const steps = [
      { en: src + `a = ${M(a)}, b = ${M(b)}, operation ${O.s}, modulus n = ${n}.`, ar: 'الـ inputs والعملية والـ modulus:' + L(`a = ${M(a)}, b = ${M(b)}, ${O.s}, n = ${n}`) },
      { en: `First the operation: <b>${e}</b>.`, ar: 'الأول بنعمل العملية:' + L(e) },
      { en: (v >= 0 ? `Then map the result to ${Z(n)} with mod: <b>${m2}</b>.` : `The result is negative, so add ${kk} × ${n} = ${kk * n}: <b>${m2}</b>.`) + ` So (${M(a)} ${O.s} ${P(b)}) mod ${n} = ${c}.` + (!own && E.t[3] === '7' ? ' (The slide repeats the answers of 2.16 under 2.17; these are the correct ones.)' : ''),
        ar: 'وبعدين نرجّع النتيجة للـ set ' + B(Z(n)) + ' بالـ mod:' + L(m2) + (!own && E.t[3] === '7' ? 'الـ slide مكررة حلول 2.16 تحت 2.17، ودي الإجابات الصح.' : '') }];
    const [i, ctl] = useSteps(steps.length, 2000);
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap dmv8-split">
      <div className="dmv8-col">
        <div className="dmv8-z" style=${{ background: 'var(--paper)' }}>Z or Z<sub>n</sub></div>
        <div className="dmv8-ab"><span className="dmv8-arr">↓ a = ${M(a)}</span><span className="dmv8-arr">↓ b = ${M(b)}</span></div>
        <div className="dmv8-op dmv8-ops">${OPS.map((x, j) => html`<span key=${j} className=${j === o ? 'on' : ''}>${x.s}</span>`)}</div>
        <div className=${cls('dmv8-arr', pop(i >= 1))}>↓ ${M(v)}</div>
        <div className="dmv8-mid"><span className="dmv8-arr">n = ${n} →</span><div className="dmv8-op">mod</div></div>
        <div className=${cls('dmv8-arr g', pop(i >= 2))}>↓ c = ${c}</div>
        <div className="dmv8-z">${ZH(n)} = { 0, 1, 2, …, ${n - 1} }</div></div>
      <div className="dmv8-col"><span className="dmv8-ttl">Operations</span>
        <div className="dmv8-box dmv8-ops3">${['(a + b) mod n = c', '(a − b) mod n = c', '(a × b) mod n = c'].map((t, j) => html`<div key=${j} className=${j === o ? 'on' : ''}>${t}</div>`)}</div>
        <div className=${cls('dmv8-eq g', pop(i >= 2))} style=${{ marginTop: '6px' }}>(${M(a)} ${O.s} ${P(b)}) mod ${n} = ${c}</div></div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function ZnOps({ ar }) {
    const [ex, setEx] = useState(0), [a, setA] = useState(17), [b, setB] = useState(27), [o, setO] = useState(0), [n, setN] = useState(14);
    const own = ex === EX_ZO.length, E = own ? { a, b, o, n } : EX_ZO[ex];
    const head = html`<${Chips} items=${EX_ZO.map(e => e.t).concat('Try your own')} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row">${OPS.map((x, j) => html`<button key=${j} className=${cls('fig-btn', o === j && 'dmv8-sel')} aria-pressed=${String(o === j)} onClick=${() => setO(j)}>${x.s}</button>`)}
        <${NumIn} label="a" v=${a} set=${setA} lo=${-9999} hi=${9999} w="70px" /><${NumIn} label="b" v=${b} set=${setB} lo=${-9999} hi=${9999} w="70px" /><${NumIn} label="n" v=${n} set=${setN} lo=${2} hi=${999} /></div><${Hint} t="a and b from −9999 to 9999, n from 2 to 999" />`}`;
    return html`<figure className="fig dmv8"><${ZnOpsRun} key=${[E.a, E.b, E.o, E.n].join('/')} E=${E} own=${own} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [7.1–7.2] Figure 2.14 + Example 2.18: properties of mod ───────── */
  const bmod = (x, n) => ((x % n) + n) % n;
  function PropsRun({ a, b, n, o, ex, ar, head }) {
    const O = OPS[o], f = (x, y) => (o === 0 ? x + y : o === 1 ? x - y : x * y);
    const v = f(a, b), c = bmod(v, n), am = bmod(a, n), bm = bmod(b, n), w = f(am, bm);
    const typo = ex && o > 0;
    const steps = [
      { en: (ex ? `Example 2.18, line ${o + 1}: ` : '') + `find (${C3(a)} ${O.s} ${C3(b)}) mod ${n} in two ways.`, ar: 'المطلوب بطريقتين:' + L(`(${C3(a)} ${O.s} ${C3(b)}) mod ${n}`) },
      { en: `a. Original process: first the operation, ${C3(a)} ${O.s} ${C3(b)} = <b>${C3(v)}</b>, a big number.`, ar: 'في الطريقة الأصلية بنعمل العملية الأول، والرقم بيطلع كبير:' + L(`${C3(a)} ${O.s} ${C3(b)} = ${C3(v)}`) },
      { en: `then mod: ${C3(v)} mod ${n} = <b>${c}</b>.`, ar: 'وبعدين الـ mod:' + L(`${C3(v)} mod ${n} = ${c}`) },
      { en: `b. Applying the properties: reduce each input first, ${C3(a)} mod ${n} = <b>${am}</b> and ${C3(b)} mod ${n} = <b>${bm}</b>.`, ar: 'بالـ properties بنصغّر كل input الأول:' + L(`${C3(a)} mod ${n} = ${am}, ${C3(b)} mod ${n} = ${bm}`) },
      { en: `then the operation on the small numbers: ${am} ${O.s} ${bm} = <b>${M(w)}</b>.`, ar: 'وبعدين العملية على الأرقام الصغيرة:' + L(`${am} ${O.s} ${bm} = ${M(w)}`) },
      { en: `and mod again: (${am} ${O.s} ${bm}) mod ${n} = ${M(w)} mod ${n} = <b>${c}</b>, the same result as path a, with small numbers only.` + (typo ? ' (The slide prints "mod 16" on the left of this line; it should be mod 11.)' : ''),
        ar: 'وبعدين mod تاني، ونفس نتيجة الطريقة الأولى بأرقام صغيرة بس:' + L(`(${am} ${O.s} ${bm}) mod ${n} = ${M(w)} mod ${n} = ${c}`) + (typo ? 'الـ slide كاتبة "mod 16" على الشمال في السطر ده، والصح mod 11.' : '') }];
    const [i, ctl] = useSteps(steps.length, 2100);
    const Q = (k, t, g) => html`<div className=${cls('dmv8-eq', g && i >= k && 'g', pop(i >= k))}>${t}</div>`;
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap dmv8-pair">
      <div className="dmv8-box dmv8-path"><span className="dmv8-ttl">a. Original process</span>
        ${Q(0, `a = ${C3(a)}, b = ${C3(b)}`)}${Q(1, `a ${O.s} b = ${C3(v)}`)}${Q(2, `(a ${O.s} b) mod ${n} = ${c}`, 1)}</div>
      <div className="dmv8-box dmv8-path"><span className="dmv8-ttl">b. Applying properties</span>
        ${Q(3, `a mod ${n} = ${am}, b mod ${n} = ${bm}`)}${Q(4, `${am} ${O.s} ${bm} = ${M(w)}`)}${Q(5, `${M(w)} mod ${n} = ${c}`, 1)}</div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function ModProps({ ar }) {
    const [ex, setEx] = useState(0), [a, setA] = useState(1723345), [b, setB] = useState(2124945), [n, setN] = useState(11), [o, setO] = useState(0);
    const own = ex === 3, E = own ? { a: BigInt(a), b: BigInt(b), n: BigInt(n), o } : { a: 1723345n, b: 2124945n, n: 11n, o: ex };
    const head = html`<${Chips} items=${['2.18 line 1 (+)', '2.18 line 2 (−)', '2.18 line 3 (×)', 'Try your own']} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row">${OPS.map((x, j) => html`<button key=${j} className=${cls('fig-btn', o === j && 'dmv8-sel')} aria-pressed=${String(o === j)} onClick=${() => setO(j)}>${x.s}</button>`)}
        <${NumIn} label="a" v=${a} set=${setA} lo=${-99999999} hi=${99999999} w="104px" /><${NumIn} label="b" v=${b} set=${setB} lo=${-99999999} hi=${99999999} w="104px" /><${NumIn} label="n" v=${n} set=${setN} lo=${2} hi=${9999} /></div><${Hint} t="a and b up to 8 digits (may be negative), n from 2 to 9999" />`}`;
    return html`<figure className="fig dmv8"><${PropsRun} key=${[E.a, E.b, E.n, E.o].join('/')} a=${E.a} b=${E.b} n=${E.n} o=${E.o} ex=${!own} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [7.3–7.4] Examples 2.19 and 2.20: powers of 10 mod x and the digit sum ───────── */
  function DigitsRun({ a, x, ar, head }) {
    const ds = String(a).split('').map(Number), K = ds.length, pw = ds.map((_, j) => K - 1 - j);
    const pm = k => { let p = 1; for (let t = 0; t < k; t++) p = (p * 10) % x; return p; }, ten = 10 % x;
    const terms = ds.map((d, j) => d * pm(pw[j])), sum = terms.reduce((s, t) => s + t, 0), res = sum % x;
    const expand = ds.map((d, j) => `${d} × 10${sp(pw[j])}`).join(' + ');
    const red = ten === 1 ? `(${ds.join(' + ')}) mod ${x}` : `(${ds.map((d, j) => `${d} × ${pm(pw[j])}`).join(' + ')}) mod ${x}`;
    const steps = [
      { en: `Write the integer as its digits times powers of 10: ${a} = ${expand}.`, ar: 'بنكتب الرقم كمجموع أرقامه مضروبة في قوى الـ 10:' + L(`${a} = ${expand}`) },
      { en: `Example 2.19: 10ⁿ mod x = (10 mod x)ⁿ, the third property applied n times. Here 10 mod ${x} = ${ten}` + (ten === 1 ? `, so every power of 10 gives 1 mod ${x}.` : `, so 10ⁿ mod ${x} = ${ten}ⁿ mod ${x}.`),
        ar: 'في Example 2.19 بنطبّق الخاصية التالتة n مرة:' + L(`10ⁿ mod x = (10 mod x)ⁿ, 10 mod ${x} = ${ten}` + (ten === 1 ? ` → 10ⁿ mod ${x} = 1` : ` → 10ⁿ mod ${x} = ${ten}ⁿ mod ${x}`)) },
      { en: `Replace each power by its remainder: ${a} mod ${x} = ${red}` + (ten === 1 ? ': just the sum of the digits.' : '.'), ar: 'بنحط باقي كل قوة مكانها:' + L(`${a} mod ${x} = ${red}`) + (ten === 1 ? 'يعني مجموع الأرقام بس.' : '') },
      { en: `${sum} mod ${x} = <b>${res}</b>, and ${a} mod ${x} = ${a % x}: the same remainder.` + (ten === 1 ? ` (Example 2.20: an integer and the sum of its digits have the same remainder mod ${x}.)` : ` For ${x} the digit sum alone does not work (10 mod ${x} ≠ 1).`),
        ar: 'والنتيجة هي نفس باقي الرقم الأصلي:' + L(`${sum} mod ${x} = ${res}, ${a} mod ${x} = ${a % x}`) + (ten === 1 ? 'وده Example 2.20: الرقم ومجموع أرقامه ليهم نفس الباقي.' : 'وهنا مجموع الأرقام لوحده مينفعش لأن ' + B(`10 mod ${x} ≠ 1`) + '.') }];
    const [i, ctl] = useSteps(steps.length, 2300);
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap">
      <div className="dmv8-eq" style=${{ marginBottom: '8px' }}>${a} = ${expand}</div>
      <table className="dmv8-tbl"><thead><tr><th>aₖ</th><th>10ᵏ</th><th>10ᵏ mod ${x}</th><th>aₖ × (10ᵏ mod ${x})</th></tr></thead><tbody>
        ${ds.map((d, j) => html`<tr key=${j}><td>${d}</td><td>10${sp(pw[j])}</td><td className=${i === 1 ? 'new' : ''}>${i >= 1 ? pm(pw[j]) : ''}</td><td className=${i === 2 ? 'new' : ''}>${i >= 2 ? `${d} × ${pm(pw[j])} = ${terms[j]}` : ''}</td></tr>`)}
        <tr><th colSpan="3">sum</th><td className=${i === 3 ? 'fin' : ''}>${i >= 2 ? sum : ''}</td></tr></tbody></table>
      <div className=${cls('dmv8-eq g', pop(i >= 3))} style=${{ marginTop: '8px' }}>${sum} mod ${x} = ${res} = ${a} mod ${x}</div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function ModDigits({ ar }) {
    const [ex, setEx] = useState(0), [x, setX] = useState(3), [a, setA] = useState(6371);
    const own = ex === 1, A = own ? a : 6371;
    const head = html`<${Chips} items=${['Slide example: 6371', 'Try your own']} sel=${ex} on=${setEx} />
      <div className="dmv8-row">${[3, 9, 7].map(k => html`<button key=${k} className=${cls('fig-btn', x === k && 'dmv8-sel')} aria-pressed=${String(x === k)} onClick=${() => setX(k)}>mod ${k}</button>`)}
        ${own && html`<${NumIn} label="integer" v=${a} set=${setA} lo=${1} hi=${999999999} w="110px" />`}</div>
      ${own && html`<${Hint} t="integer from 1 to 999999999" />`}`;
    return html`<figure className="fig dmv8"><${DigitsRun} key=${A + '/' + x} a=${A} x=${x} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [8.0] additive inverse pairs in Zn ───────── */
  function AddInvRun({ n, ar, head }) {
    const pairs = range(Math.floor(n / 2) + 1).map(x => [x, mod(n - x, n)]), lst = pairs.map(([x, y]) => `(${x}, ${y})`).join(', ');
    const steps = [{ en: `In ${Z(n)}, a and b are additive inverses if a + b ≡ 0 (mod ${n}). The inverse of a is ${n} − a.`, ar: 'في ' + B(Z(n)) + ' الـ a والـ b يبقوا additive inverses لو:' + L(`a + b ≡ 0 (mod ${n}), b = ${n} − a`) }];
    pairs.forEach(([x, y]) => steps.push({ en: `<b>(${x}, ${y})</b>: ${x} + ${y} = ${x + y} ≡ 0 (mod ${n}).` + (x === y ? ` ${x} is its own additive inverse.` : ''), ar: 'الزوج ده additive inverses:' + L(`(${x}, ${y}): ${x} + ${y} = ${x + y} ≡ 0 (mod ${n})`) + (x === y ? 'والرقم ده هو الـ inverse بتاع نفسه.' : '') }));
    steps.push({ en: `All ${pairs.length} pairs in ${Z(n)}: ${lst}. Every element has an additive inverse.`, ar: 'كل الأزواج في ' + B(Z(n)) + '، وكل element ليه additive inverse:' + L(lst) });
    const [i, ctl] = useSteps(steps.length, 1500), shown = pairs.slice(0, Math.min(i, pairs.length)), cur = i >= 1 && i <= pairs.length ? pairs[i - 1] : null;
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap dmv8-col">
      <${Wheel} n=${n} pairs=${shown} hi=${cur ? cur : []} mid=${cur ? [`${cur[0]} + ${cur[1]}`, `≡ 0 (mod ${n})`] : [Z(n)]} label=${`Additive inverse pairs in ${Z(n)}`} />
      <div className="dmv8-cells">${pairs.map(([x, y], j) => html`<span key=${j} className=${cls('dmv8-chip', j < i && (j === i - 1 ? 'on' : 'g'), pop(j < i))}>(${x}, ${y})</span>`)}</div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function AddInv({ ar }) {
    const [ex, setEx] = useState(0), [n, setN] = useState(12);
    const own = ex === 1, N = own ? n : 10;
    const head = html`<${Chips} items=${['Example 2.21: Z₁₀', 'Try your own']} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="n" v=${n} set=${setN} lo=${2} hi=${24} /></div><${Hint} t="n from 2 to 24" />`}`;
    return html`<figure className="fig dmv8"><${AddInvRun} key=${N} n=${N} ar=${ar} head=${head} /></figure>`;
  }

  /* ───────── [8.1–8.3] multiplicative inverses in Zn (Examples 2.22–2.24) ───────── */
  function MulInvRun({ n, ar, head, exn }) {
    const inv = range(n).map(b => { const g = gcd(n, b); return g === 1 ? range(n).find(x => (b * x) % n === 1 % n) : null; });
    const pairs = range(n).filter(b => inv[b] != null && b <= inv[b]).map(b => `(${b}, ${inv[b]})`), none = range(n).filter(b => inv[b] == null);
    const steps = range(n).map(b => {
      const g = gcd(n, b), x = inv[b];
      if (x == null) return { b, en: `b = ${b}: gcd(${n}, ${b}) = ${g} ≠ 1, so no x gives ${b} × x ≡ 1 (mod ${n}): <b>${b} has no multiplicative inverse</b>.` + (exn === 10 && b === 8 ? ' (Example 2.22.)' : ''),
        ar: 'الـ gcd مش 1، يبقى مفيش x يخلّي الحاصل ' + B('≡ 1') + '، والرقم ده مالوش multiplicative inverse:' + L(`b = ${b}, gcd(${n}, ${b}) = ${g} ≠ 1`) };
      return { b, en: `b = ${b}: gcd(${n}, ${b}) = 1, and ${b} × ${x} = ${b * x} ≡ 1 (mod ${n}), so <b>(${b}, ${x})</b> are multiplicative inverses.` + (exn === 11 && b === 9 ? ' The slide lists (9, 9), but 9 × 9 = 81 ≡ 4 (mod 11): 9 pairs with 5.' : ''),
        ar: 'الـ gcd يساوي 1، فلقينا الـ inverse:' + L(`gcd(${n}, ${b}) = 1, ${b} × ${x} = ${b * x} ≡ 1 (mod ${n})`) + (exn === 11 && b === 9 ? 'الـ slide كاتبة الزوج ده غلط:' + L('9 × 9 = 81 ≡ 4 (mod 11), 9 × 5 = 45 ≡ 1') : '') };
    });
    steps.push({ b: -1, en: `${Z(n)}: ${pairs.length} pair${pairs.length === 1 ? '' : 's'}, ${pairs.join(', ')}. No inverse: ${none.join(', ')}.` + (exn === 11 ? ' (Six pairs: the slide says seven and includes (9, 9) by mistake.)' : ''),
      ar: 'الأزواج في ' + B(Z(n)) + ' هي:' + L(pairs.join(', ')) + 'واللي مالهمش inverse:' + L(none.join(', ')) + (exn === 11 ? 'يعني ستة أزواج بس، والـ slide قالت سبعة بالغلط.' : '') });
    const [i, ctl] = useSteps(steps.length, 1700), s = steps[i], b = s.b;
    return html`<div className="fig-stage">${head}<div className="dmv8-wrap dmv8-col">
      <div className="dmv8-cells">${range(n).map(k => html`<span key=${k} className=${cls('dmv8-chip', k === b ? 'on' : (k < b || b < 0) && (inv[k] != null ? 'g' : 'x'))}>${k}${(k < b || b < 0 || k === b) && inv[k] != null ? html`<small style=${{ fontWeight: 500 }}> ↔ ${inv[k]}</small>` : ''}</span>`)}</div>
      ${b >= 0 ? html`<div className="dmv8-muted" style=${{ margin: '2px 0 0' }}>${b} × x mod ${n}, for x = 0 … ${n - 1}</div>
        <div className="dmv8-cells">${range(n).map(x => { const p = (b * x) % n; return html`<span key=${x} className=${cls('dmv8-cell', p === 1 % n && n > 1 ? 'on' : '', inv[b] == null && 'dim')}><small>x=${x}</small>${p}</span>`; })}</div>
        <div className=${cls('dmv8-eq', inv[b] != null ? 'g' : 'c')}>gcd(${n}, ${b}) = ${gcd(n, b)} ${inv[b] != null ? `→ ${b}⁻¹ = ${inv[b]}` : '≠ 1 → no inverse'}</div>`
      : html`<div className="dmv8-eq g">pairs: ${pairs.join(', ')}</div><div className="dmv8-eq c">no inverse: ${none.join(', ')}</div>`}
    </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function MulInv({ ar }) {
    const [ex, setEx] = useState(0), [n, setN] = useState(26);
    const own = ex === 2, N = own ? n : ex === 0 ? 10 : 11;
    const head = html`<${Chips} items=${['Examples 2.22–2.23: Z₁₀', 'Example 2.24: Z₁₁', 'Try your own']} sel=${ex} on=${setEx} />
      ${own && html`<div className="dmv8-row"><${NumIn} label="n" v=${n} set=${setN} lo=${2} hi=${30} /></div><${Hint} t="n from 2 to 30" />`}`;
    return html`<figure className="fig dmv8"><${MulInvRun} key=${N} n=${N} exn=${own ? 0 : N} ar=${ar} head=${head} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'dm-int-ops': IntOps, 'dm-div-long': DivLong, 'dm-div-negative': DivNeg, 'dm-div-check': DivCheck,
    'dm-gcd-venn': GcdVenn, 'dm-euclid-run': EuclidRun, 'dm-euclid-table': EuTable, 'dm-xgcd-table': XgcdTable,
    'dm-mod-op': ModOp, 'dm-mod-zn': ZnWheel, 'dm-mod-congruence': Congruence, 'dm-mod-clock': Clock,
    'dm-zn-ops': ZnOps, 'dm-mod-props': ModProps, 'dm-mod-digits': ModDigits,
    'dm-inv-add': AddInv, 'dm-inv-mult': MulInv, 'dm-xgcd-inverse': XgcdInverse
  });
})();
/* ── part L9 ── */
// Discrete Mathematics visuals, Lecture 9 (Graph Theory and Applications, part 1): graphs and incidence, simple graphs and multigraphs, degrees and the handshake proposition, Königsberg, K_n, regular, bipartite and complete bipartite graphs, walks/trails/paths/cycles and the two lemmas, digraph degrees, topological order, the acyclic proposition, FindTopOrd, isomorphism (Petersen drawings), and the lecture's adjacency / incidence / edge-list examples (Lec 9 slides 3 to 19). Every label and number comes from the site's notes and slides.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.dmv9{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.dmv9 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dmv9 .fig-btn[aria-pressed="true"]{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 16%, var(--paper)); }
.dmv9-wrap{ max-width:560px; margin:0 auto; color:var(--ink); min-width:0; }
.dmv9-g{ width:100%; height:auto; display:block; margin:0 auto; max-width:440px; touch-action:manipulation; -webkit-tap-highlight-color:transparent; }
.dmv9-e .ln{ fill:none; stroke:var(--graphite); stroke-width:2.2; transition:stroke .3s, stroke-width .3s; }
.dmv9-e{ transition:opacity .4s; }
.dmv9-e .ah{ fill:var(--graphite); transition:fill .3s; }
.dmv9-e.on .ln{ stroke:var(--k-compiler); stroke-width:4; } .dmv9-e.on .ah{ fill:var(--k-compiler); }
.dmv9-e.ok .ln{ stroke:var(--ok); stroke-width:3.6; } .dmv9-e.ok .ah{ fill:var(--ok); }
.dmv9-e.bad .ln{ stroke:var(--pen); stroke-width:3.4; stroke-dasharray:6 4; } .dmv9-e.bad .ah{ fill:var(--pen); }
.dmv9-e.dim{ opacity:.2; } .dmv9-e.gone{ opacity:0; pointer-events:none; }
.dmv9-e .hit{ fill:none; stroke:transparent; stroke-width:16; cursor:pointer; pointer-events:stroke; }
.fig svg .dmv9-e text{ font-size:14.5px; font-style:italic; paint-order:stroke; stroke:var(--paper-2); stroke-width:4px; stroke-linejoin:round; pointer-events:none; }
.fig svg .dmv9-e.on text{ fill:var(--k-compiler); font-weight:700; }
.dmv9-n circle{ fill:var(--paper); stroke:var(--ink); stroke-width:1.8; transition:fill .3s, stroke .3s, opacity .3s; }
.dmv9-n{ transition:opacity .4s; }
.fig svg .dmv9-n text{ font-size:14.5px; font-weight:600; pointer-events:none; }
.dmv9-n.tap{ cursor:pointer; }
.dmv9-n.on circle{ fill:color-mix(in srgb, var(--k-compiler) 32%, var(--paper)); stroke:var(--k-compiler); stroke-width:2.6; }
.dmv9-n.ok circle{ fill:color-mix(in srgb, var(--ok) 26%, var(--paper)); stroke:var(--ok); stroke-width:2.6; }
.dmv9-n.bad circle{ fill:color-mix(in srgb, var(--pen) 18%, var(--paper)); stroke:var(--pen); stroke-width:2.6; }
.dmv9-n.blk circle{ fill:var(--ink); }
.fig svg .dmv9-n.blk text{ fill:var(--paper); }
.dmv9-n.sel circle{ stroke:var(--k-compiler); stroke-width:3.2; stroke-dasharray:4 3; }
.dmv9-n.dim{ opacity:.25; }
.dmv9-n.dot circle{ fill:var(--ink); stroke:none; }
.fig svg text.dmv9-bd{ font-size:14.5px; font-weight:700; fill:var(--k-compiler); paint-order:stroke; stroke:var(--paper-2); stroke-width:4px; stroke-linejoin:round; }
.fig svg text.dmv9-lb{ font-size:16px; font-weight:700; }
.fig svg text.dmv9-lb2{ font-size:15px; font-style:italic; paint-order:stroke; stroke:var(--paper-2); stroke-width:4px; }
.dmv9-riv{ fill:none; stroke:color-mix(in srgb, var(--k-compiler) 28%, var(--paper-2)); stroke-width:17; transition:opacity .5s; }
.dmv9-brg{ stroke:var(--ink); stroke-width:5; stroke-linecap:round; transition:opacity .5s; }
.dmv9-fade{ transition:opacity .5s; }
.dmv9-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dmv9-modes .fig-btn{ font-size:.86rem; padding:4px 10px; }
.dmv9-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:8px 0 0; }
.dmv9-row .fig-btn{ font-size:.86rem; padding:4px 10px; }
.dmv9-info{ font-size:.92rem; line-height:1.45; text-align:center; margin:8px 0 0; color:var(--ink); }
.dmv9-mut{ color:var(--graphite); font-size:.86rem; }
.dmv9-mono{ font-family:var(--mono); direction:ltr; unicode-bidi:isolate; overflow-wrap:anywhere; }
.dmv9-tw{ max-width:100%; overflow-x:auto; }
.dmv9-tb{ border-collapse:collapse; margin:8px auto 0; font:600 .9rem/1.25 var(--mono); background:var(--paper); color:var(--ink); direction:ltr; }
.dmv9-tb caption{ font:700 .9rem var(--body); color:var(--graphite); padding-bottom:4px; caption-side:top; }
.dmv9-tb th, .dmv9-tb td{ border:1px solid var(--line); padding:3px 6px; text-align:center; min-width:1.5em; transition:background .35s, box-shadow .35s; }
.dmv9-tb th{ background:var(--paper-2); font-weight:700; }
.dmv9-tb td.zero{ color:var(--graphite); font-weight:500; }
.dmv9-tb td.cur{ background:color-mix(in srgb, var(--k-compiler) 28%, var(--paper)); box-shadow:inset 0 0 0 2px var(--k-compiler); }
.dmv9-tb td.odd{ background:color-mix(in srgb, var(--k-compiler) 18%, var(--paper)); }
.dmv9-tb td.ok{ color:var(--ok); } .dmv9-tb td.bad{ color:var(--pen); }
.dmv9-tb td.done{ color:var(--graphite); font-weight:500; }
.dmv9-mats{ display:flex; flex-wrap:wrap; gap:4px 16px; justify-content:center; align-items:flex-start; }
.dmv9-tags{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin:8px 0 0; }
.dmv9-tag{ display:inline-block; font-size:.86rem; font-weight:600; border-radius:99px; padding:2px 10px; border:1px solid var(--line); color:var(--graphite); }
.dmv9-tag.yes{ border-color:var(--ok); color:var(--ok); } .dmv9-tag.no{ border-color:var(--line); color:var(--graphite); text-decoration:line-through; }
.dmv9-big{ text-align:center; font:700 1.02rem/1.4 var(--mono); color:var(--k-compiler); margin:8px 0 0; direction:ltr; overflow-wrap:anywhere; }
.dmv9-warn{ color:var(--pen); font-weight:600; }
.dmv9-okt{ color:var(--ok); font-weight:700; }
.dmv9-list{ font:600 .95rem/1.55 var(--mono); direction:ltr; text-align:left; display:inline-block; margin:8px auto 0; }
.dmv9-list div{ transition:color .3s; } .dmv9-list .cur{ color:var(--k-compiler); } .dmv9-list .later{ color:var(--graphite); opacity:.45; }
.dmv9-c{ text-align:center; }
`;
  if (!document.getElementById('dmv9-css')) { const s = document.createElement('style'); s.id = 'dmv9-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = s => `<span class="ltr">${s}</span>`, B = s => `<bdi dir="ltr">${s}</bdi>`;
  const SB = n => String(n).replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d]);
  const Modes = ({ list, mode, set }) => html`<div className="dmv9-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;

  // step walker that restarts when key changes
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(!calm()); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => Math.min(x + 1, n - 1)), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }
  // counts 0 → total, one per tick (edges drawn one by one)
  function useCount(total, ms, key) {
    const [c, setC] = useState(calm() ? total : 0), [run, setRun] = useState(0);
    useEffect(() => { if (calm()) { setC(total); return; } setC(0); let k = 0; const id = setInterval(() => { k++; setC(k); if (k >= total) clearInterval(id); }, ms); return () => clearInterval(id); }, [key, run]);
    return [Math.min(c, total), () => setRun(r => r + 1)];
  }

  /* ───────── drawing a graph ───────── */
  function geo(a, b, bend) {
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
    return { mx, my, nx, ny, cx: mx + nx * bend * 2, cy: my + ny * bend * 2 };
  }
  // N: [{id,x,y,t}], E: [{id,u,v,t,bend,lp,la,side}]; nc/ec give extra class names
  function GSvg({ vb, N, E, r = 15, dir, nc, ec, onN, onE, nlab, extra, under, aria }) {
    const P = {}; N.forEach(n => { P[n.id] = n; });
    const [, , W, H] = vb.split(' ').map(Number);
    const ed = E.map(e => {
      const a = P[e.u], b = P[e.v], bend = e.bend || 0; let d, lx, ly, ah = null;
      if (e.u === e.v) {
        const th = e.la != null ? e.la * Math.PI / 180 : Math.atan2(a.y - H / 2, a.x - W / 2), q = (ang, k) => [a.x + Math.cos(ang) * k, a.y + Math.sin(ang) * k];
        const [x1, y1] = q(th - .5, r), [x2, y2] = q(th + .5, r), [c1x, c1y] = q(th - .85, r + 34), [c2x, c2y] = q(th + .85, r + 34);
        d = `M${x1},${y1} C${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`; [lx, ly] = q(th, r + 36);
      } else {
        const g = geo(a, b, bend), s = e.side || (bend < 0 ? -1 : 1);
        d = `M${a.x},${a.y} Q${g.cx},${g.cy} ${b.x},${b.y}`; lx = g.mx + g.nx * (bend + 12 * s); ly = g.my + g.ny * (bend + 12 * s);
        if (dir) { const ux = b.x - g.cx, uy = b.y - g.cy, l = Math.hypot(ux, uy) || 1, tx = b.x - ux / l * (r + 1), ty = b.y - uy / l * (r + 1), px = -uy / l, py = ux / l, bx = tx - ux / l * 11, by = ty - uy / l * 11;
          ah = `${tx},${ty} ${bx + px * 5.5},${by + py * 5.5} ${bx - px * 5.5},${by - py * 5.5}`; }
      }
      if (e.lp) [lx, ly] = e.lp;
      return { e, d, lx, ly, ah };
    });
    return html`<svg viewBox=${vb} className="dmv9-g" role="img" aria-label=${aria}>
      ${under}
      ${ed.map(({ e, d, lx, ly, ah }) => html`<g key=${'e' + e.id} className=${'dmv9-e ' + (ec ? ec(e) : '')} onClick=${onE ? () => onE(e) : null}>
        <path d=${d} className="ln" />${ah && html`<polygon points=${ah} className="ah" />`}${onE && html`<path d=${d} className="hit" />`}
        ${e.t && html`<text x=${lx} y=${ly} dy="0.35em" textAnchor="middle">${e.t}</text>`}</g>`)}
      ${N.map(n => html`<g key=${'n' + n.id} className=${'dmv9-n ' + (onN ? 'tap ' : '') + (nc ? nc(n) : '')} onClick=${onN ? () => onN(n) : null}>
        <circle cx=${n.x} cy=${n.y} r=${n.r || r} />${(nlab ? nlab(n) : n.t) !== '' && html`<text x=${n.x} y=${n.y} dy="0.35em" textAnchor="middle">${nlab ? nlab(n) : n.t}</text>`}</g>`)}
      ${extra}
    </svg>`;
  }
  const ring = (n, cx, cy, R, start = -90) => Array.from({ length: n }, (_, k) => { const a = (start + 360 * k / n) * Math.PI / 180; return { x: +(cx + R * Math.cos(a)).toFixed(1), y: +(cy + R * Math.sin(a)).toFixed(1) }; });

  /* ── [0.0–0.1] slide 3: G = (V, E), incident edges ── */
  const G1N = [{ id: 1, x: 112, y: 35, t: 'v₁' }, { id: 2, x: 190, y: 35, t: 'v₂' }, { id: 3, x: 268, y: 35, t: 'v₃' }, { id: 4, x: 32, y: 108, t: 'v₄' }, { id: 5, x: 114, y: 108, t: 'v₅' }];
  const G1E = [{ id: 1, u: 1, v: 2, t: 'e₁', lp: [151, 20] }, { id: 2, u: 2, v: 3, t: 'e₂', lp: [229, 20] }, { id: 3, u: 3, v: 5, t: 'e₃', lp: [206, 88] }, { id: 4, u: 1, v: 4, t: 'e₄', lp: [60, 60] }, { id: 5, u: 1, v: 5, t: 'e₅', lp: [129, 72] }, { id: 6, u: 4, v: 5, t: 'e₆', lp: [73, 127] }];
  function Incident({ ar }) {
    const steps = [{ en: 'G = (V, E) with V(G) = {v₁, …, v₅} and E(G) = {e₁, …, e₆}: n = |V| = 5 and m = |E| = 6. Tap an edge or a vertex.', ar: 'الـ graph ده فيه:' + L('V(G) = {v₁, …, v₅}, E(G) = {e₁, …, e₆}') + 'يعني:' + L('n = |V| = 5, m = |E| = 6') + 'دوس على أي edge أو vertex.' },
      ...G1E.map(e => ({ en: `<b>e${SB(e.id)}</b> = (v${SB(e.u)}, v${SB(e.v)}) is incident with v${SB(e.u)} and v${SB(e.v)}.`, ar: `الـ edge ${B('e' + (SB(e.id)) + ' = (v' + (SB(e.u)) + ', v' + (SB(e.v)) + ')')} بيبقى incident مع ${B('v' + SB(e.u))} و ${B('v' + SB(e.v))}.` }))];
    const [i, ctl] = useSteps(steps.length, 1700), [vx, setVx] = useState(null);
    useEffect(() => { setVx(null); }, [i]);
    const cur = i > 0 ? G1E[i - 1] : null;
    let s = steps[i];
    if (vx != null) { const inc = G1E.filter(e => e.u === vx || e.v === vx).map(e => e.t).join(', '); s = { en: `The edges incident with <b>v${SB(vx)}</b>: ${inc}.`, ar: `الـ edges الـ incident مع ${B('v' + SB(vx))} هي:` + L(inc) }; }
    const ec = e => vx != null ? (e.u === vx || e.v === vx ? 'on' : 'dim') : cur ? (e === cur ? 'on' : 'dim') : '';
    const nc = n => vx != null ? (n.id === vx ? 'on' : '') : cur && (n.id === cur.u || n.id === cur.v) ? 'on' : '';
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${GSvg} vb="0 0 300 140" N=${G1N} E=${G1E} nc=${nc} ec=${ec} onE=${e => ctl.go(e.id)} onN=${n => { ctl.go(i); setTimeout(() => setVx(n.id), 0); }} aria="Graph G with vertices v1 to v5 and edges e1 to e6" />
      <p className="dmv9-info dmv9-mono">V(G) = {v₁, …, v₅}, n = 5 · E(G) = {e₁, …, e₆}, m = 6</p>
    </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.2] slide 3: self-loop and multiple edges vs the simple graph ── */
  const G2N = [{ id: 1, x: 152, y: 34, t: '1' }, { id: 2, x: 40, y: 100, t: '2' }, { id: 3, x: 136, y: 86, t: '3' }, { id: 4, x: 256, y: 60, t: '4' }, { id: 5, x: 139, y: 152, t: '5' }, { id: 6, x: 244, y: 130, t: '6' }];
  function Simple({ ar }) {
    const steps = [
      { en: 'The slide’s left graph: edges a to i on the vertices 1 to 6. It has a self-loop and two edges between the same pair of vertices.', ar: 'الـ graph اللي على شمال الـ slide فيه الـ edges من a لـ i على الـ vertices من 1 لـ 6. فيه self-loop وفيه 2 edges بين نفس الـ 2 vertices.' },
      { en: '<b>i</b> is a self-loop: it starts and ends at vertex 4.', ar: 'الـ edge <b>i</b> ده self-loop، بيبدأ وبيخلص عند الـ vertex رقم 4.' },
      { en: '<b>g</b> and <b>h</b> both join 4 and 6: multiple edges. A graph with multiple edges is a multigraph.', ar: 'الـ <b>g</b> والـ <b>h</b> الاتنين بيوصّلوا 4 و 6، يعني multiple edges. والـ graph اللي فيه multiple edges اسمه multigraph.' },
      { en: 'Remove the self-loop i and the extra edge h: the slide’s right graph, a <b>simple</b> graph (no self-loops, no multiple edges).', ar: 'لو شلنا الـ self-loop i والـ edge الزيادة h هيطلع الـ graph اللي على يمين الـ slide، وده <b>simple</b> graph (مفيهوش self-loops ولا multiple edges).' }];
    const [i, ctl] = useSteps(steps.length, 2300);
    const E = [{ id: 'a', u: 2, v: 1, t: 'a', lp: [88, 56] }, { id: 'b', u: 1, v: 4, t: 'b', lp: [206, 34] }, { id: 'c', u: 2, v: 3, t: 'c', lp: [92, 108] }, { id: 'd', u: 3, v: 4, t: 'd', lp: [194, 62] }, { id: 'e', u: 2, v: 5, t: 'e', lp: [80, 142] }, { id: 'f', u: 5, v: 6, t: 'f', lp: [194, 157] },
      { id: 'g', u: 4, v: 6, t: 'g', bend: i >= 3 ? 0 : 13, side: 1 }, { id: 'h', u: 4, v: 6, t: 'h', bend: -15 }, { id: 'i', u: 4, v: 4, t: 'i', la: -55 }];
    const ec = e => (i >= 3 && (e.id === 'h' || e.id === 'i')) ? 'gone' : (i === 1 && e.id === 'i') || (i === 2 && (e.id === 'g' || e.id === 'h')) ? 'on' : i === 3 ? 'ok' : '';
    const nc = n => (i === 1 || i === 2) && n.id === 4 ? 'on' : i === 2 && n.id === 6 ? 'on' : '';
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${GSvg} vb="0 0 300 172" N=${G2N} E=${E} r=${14} nc=${nc} ec=${ec} aria="A graph with a self-loop i and multiple edges g and h, then the simple graph without them" />
      <p className="dmv9-info"><b>${i >= 3 ? 'simple graph' : 'multigraph'}</b></p>
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.3–0.5] degrees and the handshake proposition (graph of the lecture example) ── */
  const G7N = [{ id: 1, x: 110, y: 42, t: '1' }, { id: 2, x: 52, y: 112, t: '2' }, { id: 3, x: 152, y: 178, t: '3' }, { id: 4, x: 248, y: 132, t: '4' }, { id: 5, x: 252, y: 46, t: '5' }];
  const G7E = [[1, 4], [2, 5], [2, 3], [3, 5], [3, 4], [4, 5]];
  const LET = 'abcdefghijkl';
  const G7LP = { a: [220, 99], b: [98, 84], c: [92, 156], d: [197, 139], e: [208, 168], f: [264, 89] };
  function withBends(list) {
    const seen = {}, cnt = {};
    list.forEach(([u, v]) => { const k = Math.min(u, v) + '-' + Math.max(u, v); cnt[k] = (cnt[k] || 0) + 1; });
    return list.map(([u, v], j) => { const k = Math.min(u, v) + '-' + Math.max(u, v), m = seen[k] = (seen[k] || 0) + 1, c = cnt[k]; const off = u === v ? 0 : (m - 1 - (c - 1) / 2) * 24 * (u < v ? 1 : -1); return { id: j, u, v, t: LET[j], bend: off, la: u === v ? null : undefined }; });
  }
  function Handshake({ ar }) {
    const [E, setE] = useState(G7E), [sel, setSel] = useState(null), [msg, setMsg] = useState(null);
    const deg = G7N.map(n => E.reduce((s, [u, v]) => s + (u === n.id ? 1 : 0) + (v === n.id ? 1 : 0), 0));
    const m = E.length, sum = deg.reduce((a, b) => a + b, 0), odd = deg.filter(d => d % 2).length, iso = G7N.filter((n, k) => deg[k] === 0).map(n => n.t);
    const tapN = n => { setMsg(null); if (sel == null) { setSel(n.id); return; } if (m >= 12) { setMsg('full'); setSel(null); return; } setE(E.concat([[sel, n.id]])); setSel(null); };
    const tapE = e => { setMsg(null); setSel(null); setE(E.filter((_, j) => j !== e.id)); };
    let s;
    if (sel != null) s = { en: `Vertex ${sel} chosen: tap a second vertex for an edge, or ${sel} again for a self-loop.`, ar: `اخترت الـ vertex رقم ${B(sel)}. دوس على vertex تاني علشان تعمل edge، أو على نفس الـ vertex تاني علشان تعمل self-loop.` };
    else if (msg === 'full') s = { en: 'At most 12 edges here. Tap an edge to remove it.', ar: 'هنا أقصى حاجة 12 edge. دوس على edge علشان تشيله.' };
    else if (!m) s = { en: 'The null graph N₅: 5 vertices and no edges. Every vertex is isolated (degree 0), and Σ d(v) = 0 = 2 × 0.', ar: 'ده الـ null graph <bdi dir="ltr">N₅</bdi>، فيه 5 vertices ومفيهوش ولا edge. كل الـ vertices الـ isolated (الـ degree بتاعها صفر)، والمجموع:' + L('Σ d(v) = 0 = 2 × 0') };
    else s = { en: `Σ d(v) = ${sum} = 2 × ${m} = 2m: every edge is counted twice, at both ends (a self-loop adds 2 to its vertex). ${odd} vertices have odd degree: an even number.${iso.length ? ` Isolated (degree 0): ${iso.join(', ')}.` : ''}`,
      ar: `مجموع الـ degrees:${L('Σ d(v) = ' + (sum) + ' = 2 × ' + (m) + ' = 2m')}لأن كل edge بيتعد مرتين، مرة عند كل طرف (والـ self-loop بيزوّد الـ vertex بتاعه 2). عدد الـ vertices اللي الـ degree بتاعها odd هو ${B(odd)}، وده عدد زوجي.${iso.length ? ` والـ vertices الـ isolated (الـ degree بتاعها صفر) هي:${L(iso.join(', '))}` : ''}` };
    const isEx = m === 6 && E.every((p, j) => p[0] === G7E[j][0] && p[1] === G7E[j][1]);
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${Modes} list=${[['ex', 'Example from the notes'], ['null', 'Null graph N₅']]} mode=${isEx ? 'ex' : !m ? 'null' : ''} set=${k => { setSel(null); setMsg(null); setE(k === 'ex' ? G7E : []); }} />
      <${GSvg} vb="0 0 300 215" N=${G7N} E=${withBends(E).map((e, j) => j < 6 && E[j][0] === G7E[j][0] && E[j][1] === G7E[j][1] ? { ...e, lp: G7LP[LET[j]] } : e)} nc=${n => (sel === n.id ? 'sel ' : '') + (deg[n.id - 1] === 0 ? 'dim' : '')} onN=${tapN} onE=${tapE} aria="Graph of the lecture example; tap two vertices to add an edge, tap an edge to remove it" />
      <p className="dmv9-mut dmv9-c" style=${{ margin: '2px 0 0' }}>Tap two vertices: new edge · same vertex twice: self-loop · tap an edge: remove it</p>
      <div className="dmv9-tw"><table className="dmv9-tb"><tbody>
        <tr><th>v</th>${G7N.map(n => html`<th key=${n.id}>${n.t}</th>`)}</tr>
        <tr><th>d(v)</th>${deg.map((d, k) => html`<td key=${k} className=${d % 2 ? 'odd' : ''}>${d}</td>`)}</tr></tbody></table></div>
      <p className="dmv9-big">Σ d(v) = ${deg.join(' + ')} = ${sum} = 2 × ${m}</p>
      <p className="dmv9-info">odd degree: <b>${odd}</b> vertices ${odd % 2 === 0 ? '(even ✓)' : ''}</p>
    </div></div><${Cap} ...${s} showAr=${ar} /></figure>`;
  }

  /* ── [0.6] slide 4: the Königsberg bridges become a graph ── */
  const KN = [{ id: 'A', x: 150, y: 100, t: 'A' }, { id: 'B', x: 150, y: 180, t: 'B' }, { id: 'C', x: 150, y: 22, t: 'C' }, { id: 'D', x: 272, y: 100, t: 'D' }];
  const KE = [{ id: 'a', u: 'A', v: 'B', t: 'a', bend: 22 }, { id: 'b', u: 'A', v: 'B', t: 'b', bend: -22 }, { id: 'c', u: 'A', v: 'C', t: 'c', bend: -22 }, { id: 'd', u: 'A', v: 'C', t: 'd', bend: 22 },
    { id: 'e', u: 'A', v: 'D', t: 'e', side: -1 }, { id: 'f', u: 'B', v: 'D', t: 'f', bend: 18 }, { id: 'g', u: 'C', v: 'D', t: 'g', bend: -18 }];
  const KDEG = { A: 5, B: 3, C: 3, D: 3 };
  function Konigsberg({ ar }) {
    const steps = [
      { en: 'The slide’s map of Königsberg: four land areas A, B, C, D and seven bridges a to g.', ar: 'خريطة Königsberg اللي في الـ slide فيها 4 مناطق أرض A و B و C و D، و 7 كباري من a لـ g.' },
      { en: 'Each land area becomes a vertex.', ar: 'كل منطقة أرض بتبقى vertex.' },
      { en: 'Each bridge becomes an edge: a and b join A and B, c and d join A and C, e joins A and D, f joins B and D, g joins C and D (a multigraph).', ar: 'كل كوبري بيبقى edge. الـ a والـ b بيوصّلوا A بـ B، والـ c والـ d بيوصّلوا A بـ C، والـ e بيوصّل A بـ D، والـ f بيوصّل B بـ D، والـ g بيوصّل C بـ D (يعني multigraph).' },
      { en: 'Degrees (bridges touching each area): d(A) = 5, d(B) = 3, d(C) = 3, d(D) = 3.', ar: 'الـ degrees (عدد الكباري اللي بتلمس كل منطقة):' + L('d(A) = 5, d(B) = 3, d(C) = 3, d(D) = 3') },
      { en: 'Handshake check: 5 + 3 + 3 + 3 = 14 = 2 × 7 bridges. All 4 vertices have odd degree: 4 is even, as the corollary says.', ar: 'نتأكد من الـ handshake:' + L('5 + 3 + 3 + 3 = 14 = 2 × 7') + 'والـ 4 vertices كلهم الـ degree بتاعهم odd، و 4 عدد زوجي زي ما الـ corollary بيقول.' }];
    const [i, ctl] = useSteps(steps.length, 2400);
    const riv = i >= 2 ? .35 : 1, br = i >= 2 ? 0 : 1;
    const bars = [['c', 118, 50, 118, 76, 104, 40], ['d', 182, 50, 182, 76, 196, 40], ['a', 118, 124, 118, 150, 104, 162], ['b', 182, 124, 182, 150, 196, 162], ['e', 203, 100, 229, 100, 216, 117], ['g', 254, 38, 266, 60, 276, 32], ['f', 254, 162, 266, 140, 276, 168]];
    const under = html`<g className="dmv9-fade" style=${{ opacity: riv }}>
        <path className="dmv9-riv" d="M0,100 C40,100 50,63 100,63 L216,63 C246,63 262,48 300,40" />
        <path className="dmv9-riv" d="M0,100 C40,100 50,137 100,137 L216,137 C246,137 262,152 300,160" />
        <path className="dmv9-riv" d="M216,60 L216,140" /></g>
      <g className="dmv9-fade" style=${{ opacity: br }}>${bars.map(([t, x1, y1, x2, y2, lx, ly]) => html`<g key=${t}><line className="dmv9-brg" x1=${x1} y1=${y1} x2=${x2} y2=${y2} /><text className="dmv9-lb2" x=${lx} y=${ly} dy="0.35em" textAnchor="middle">${t}</text></g>`)}</g>
      ${i === 0 && KN.map(n => html`<text key=${n.id} className="dmv9-lb" x=${n.x} y=${n.y} dy="0.35em" textAnchor="middle">${n.t}</text>`)}`;
    const N = i === 0 ? [] : KN;
    const extra = i >= 3 && html`<g>${KN.map(n => html`<text key=${n.id} className="dmv9-bd" x=${n.x + (n.id === 'D' ? -2 : n.id === 'A' ? 26 : -26)} y=${n.y + (n.id === 'D' ? -26 : n.id === 'A' ? -14 : 0)} dy="0.35em" textAnchor="middle">${KDEG[n.id]}</text>`)}</g>`;
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${GSvg} vb="0 0 300 200" N=${N} E=${i >= 2 ? KE : []} r=${13} under=${under} extra=${extra} nc=${() => i >= 3 ? 'on' : ''} aria="Königsberg: four land areas and seven bridges turned into a graph" />
      ${i >= 3 && html`<div className="dmv9-tw"><table className="dmv9-tb"><tbody><tr><th>v</th>${KN.map(n => html`<th key=${n.id}>${n.t}</th>`)}<th>Σ</th></tr>
        <tr><th>d(v)</th>${KN.map(n => html`<td key=${n.id} className="odd">${KDEG[n.id]}</td>`)}<td>${i >= 4 ? '14 = 2 × 7' : ''}</td></tr></tbody></table></div>`}
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1.0] slide 5: complete graphs K_n, edges drawn one by one ── */
  function Complete({ ar }) {
    const [n, setN] = useState(5);
    const P = ring(n, 150, 108, 86), N = P.map((p, k) => ({ id: k, ...p })), all = [];
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) all.push({ id: a + '-' + b, u: a, v: b });
    const tot = all.length, [c, replay] = useCount(tot, Math.max(160, 1800 / tot), n), E = all.slice(0, c);
    const deg = N.map(x => E.filter(e => e.u === x.id || e.v === x.id).length);
    const K = 'K' + SB(n);
    const s = c < tot ? { en: `Drawing ${K}: edge ${c} of ${tot}. The number in each vertex is its degree so far.`, ar: `بنرسم الـ ${B(K)}، وصلنا لـ edge رقم ${B(c)} من ${B(tot)}. الرقم اللي جوه كل vertex هو الـ degree بتاعه لحد دلوقتي.` }
      : { en: `${K} has all B(${n}, 2) = ${n}(${n} − 1)/2 = <b>${tot}</b> edges. Every vertex has degree ${n} − 1 = <b>${n - 1}</b>: ${K} is (n − 1)-regular.`, ar: `الـ ${B(K)} فيه كل الـ edges الممكنة:${L('B(' + (n) + ', 2) = ' + (n) + '(' + (n) + ' − 1)/2 = ' + (tot))}وكل vertex الـ degree بتاعه ${B((n) + ' − 1 = ' + (n - 1))}، يعني الـ ${B(K)} هو ${B('(n − 1)-regular')}.` };
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${Modes} list=${[2, 3, 4, 5, 6, 7].map(k => [k, 'K' + SB(k)])} mode=${n} set=${setN} />
      <${GSvg} vb="0 0 300 206" N=${N} E=${all} ec=${e => E.some(x => x.id === e.id) ? (c === tot ? '' : (E[E.length - 1].id === e.id ? 'on' : '')) : 'gone'} nlab=${x => String(deg[x.id])} nc=${x => deg[x.id] === n - 1 ? 'ok' : ''} aria=${'Complete graph ' + K} />
      <p className="dmv9-big">|E| = ${c} / ${tot}</p>
    </div></div><${Cap} ...${s} showAr=${ar} /><div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${replay}>↻ Replay</button></div></figure>`;
  }

  /* ── Petersen graph: drawing 1 of slide 16 (also slide 5) ── */
  const PD1 = [[558, 175], [872, 372], [744, 568], [370, 568], [240, 372], [558, 272], [744, 372], [650, 470], [465, 470], [370, 372]];
  const PE = []; for (let k = 0; k < 5; k++) PE.push([k, (k + 1) % 5], [k, 5 + k], [5 + k, 5 + (k + 2) % 5]);
  function fitPts(pts, X0 = 30, X1 = 270, Y0 = 20, Y1 = 206) {
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), mnx = Math.min(...xs), mxx = Math.max(...xs), mny = Math.min(...ys), mxy = Math.max(...ys);
    const s = Math.min((X1 - X0) / (mxx - mnx), (Y1 - Y0) / (mxy - mny)), ox = (X0 + X1) / 2 - s * (mnx + mxx) / 2, oy = (Y0 + Y1) / 2 - s * (mny + mxy) / 2;
    return pts.map(p => ({ x: +(ox + s * p[0]).toFixed(1), y: +(oy + s * p[1]).toFixed(1) }));
  }
  function Petersen({ ar }) {
    const steps = [
      { en: 'The slide’s k-regular example: the Petersen graph, 10 vertices. Tap a vertex to see its edges.', ar: 'مثال الـ slide على الـ k-regular هو الـ Petersen graph، وفيه 10 vertices. دوس على أي vertex علشان تشوف الـ edges بتاعته.' },
      { en: 'Every vertex has exactly 3 incident edges: all degrees are equal to 3, so the Petersen graph is <b>3-regular</b>.', ar: 'كل vertex عليه 3 edges بالظبط، يعني كل الـ degrees بتساوي 3، وعلشان كده الـ Petersen graph هو <b>3-regular</b>.' },
      { en: 'Handshake: Σ d(v) = 10 × 3 = 30 = 2m, so it has m = 15 edges.', ar: 'ومن الـ handshake:' + L('Σ d(v) = 10 × 3 = 30 = 2m') + 'يعني فيه 15 edge.' }];
    const [i, ctl] = useSteps(steps.length, 2400), [v, setV] = useState(null);
    const P = fitPts(PD1), N = P.map((p, k) => ({ id: k, ...p })), E = PE.map(([a, b], k) => ({ id: k, u: a, v: b }));
    const nb = v == null ? [] : E.filter(e => e.u === v || e.v === v).map(e => e.u === v ? e.v : e.u);
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${GSvg} vb="0 0 300 226" N=${N} E=${E} r=${12} nlab=${() => i >= 1 ? '3' : ''} nc=${x => x.id === v ? 'on' : nb.includes(x.id) ? 'ok' : ''} ec=${e => v == null ? '' : e.u === v || e.v === v ? 'on' : 'dim'} onN=${x => setV(x.id === v ? null : x.id)} aria="Petersen graph, every vertex of degree 3" />
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1.2–1.3] slides 7–8: which graph is bipartite? colour the vertices ── */
  const BPN1 = [[115, 35], [188, 35], [40, 92], [260, 92], [115, 150], [188, 150]], BPN2 = [[40, 35], [260, 35], [40, 149], [260, 149], [113, 92], [187, 92]];
  const BPG = [
    { N: BPN1, E: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [2, 3], [0, 5], [1, 4]], ans: [1, 0, 0, 1, 1, 0] },
    { N: BPN2, E: [[0, 1], [0, 2], [1, 3], [2, 3], [0, 4], [2, 4], [4, 5], [5, 1], [5, 3]], tri: [5, 1, 3] },
    { N: BPN2, E: [[0, 1], [0, 2], [1, 3], [2, 3], [0, 4], [4, 5], [5, 1], [4, 3], [2, 5]], ans: [1, 0, 0, 1, 0, 1] }];
  function Bipartite({ ar }) {
    const [g, setG] = useState(0), [col, setCol] = useState([[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]), [tri, setTri] = useState(false);
    const G = BPG[g], c = col[g], any = c.some(x => x);
    const N = G.N.map(([x, y], k) => ({ id: k, x, y, t: '' })), E = G.E.map(([u, v], k) => ({ id: k, u, v }));
    const good = E.filter(e => c[e.u] !== c[e.v]).length, m = E.length;
    const inTri = e => G.tri && G.tri.includes(e.u) && G.tri.includes(e.v);
    const flip = n => { setTri(false); setCol(col.map((cc, k) => k === g ? cc.map((x, j) => j === n.id ? 1 - x : x) : cc)); };
    const answer = () => { if (G.tri) { setTri(true); return; } setCol(col.map((cc, k) => k === g ? G.ans.slice() : cc)); };
    let s;
    if (tri) s = { en: 'Graph 2 has a <b>triangle</b> (an odd cycle). Its 3 corners are joined to each other, so 2 colours can never separate all 3 edges: graph 2 is <b>not bipartite</b>.', ar: 'الـ graph رقم 2 فيه <b>triangle</b> (يعني odd cycle). الـ 3 أركان بتوعه متوصلين ببعض، فمستحيل لونين يفصلوا الـ 3 edges، وعلشان كده الـ graph رقم 2 <b>مش bipartite</b>.' };
    else if (!any) s = { en: 'Which graph is bipartite? Tap vertices to colour them black or white. It suffices to find 2 colours that separate the edges: every edge joins a black and a white vertex.', ar: 'أنهي graph فيهم bipartite؟ دوس على الـ vertices علشان تلوّنها أسود أو أبيض. يكفي إنك تلاقي لونين يفصلوا الـ edges، يعني كل edge يوصّل vertex أسود بـ vertex أبيض.' };
    else if (good === m) s = { en: `All ${m} edges join two different colours: V₁ = black, V₂ = white, and no edge stays inside V₁ or V₂. This graph is <b>bipartite</b>.`, ar: `كل الـ ${B(m)} edges بتوصّل بين لونين مختلفين. الـ ${B('V₁')} هي الأسود والـ ${B('V₂')} هي الأبيض، ومفيش edge جوه ${B('V₁')} ولا جوه ${B('V₂')}. يبقى الـ graph ده <b>bipartite</b>.` };
    else s = { en: `${good} of ${m} edges join two different colours. The red dashed edges join two vertices of the same colour.${G.tri ? ' (Graph 2: try it, then press “Slide’s answer”.)' : ''}`, ar: `فيه ${B(good)} من ${B(m)} edges بيوصّلوا بين لونين مختلفين. الـ edges الحمرا المتقطعة بتوصّل 2 vertices من نفس اللون.${G.tri ? ' (جرّب الـ graph رقم 2 وبعدين دوس على إجابة الـ slide.)' : ''}` };
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${Modes} list=${[[0, 'Graph 1'], [1, 'Graph 2'], [2, 'Graph 3']]} mode=${g} set=${k => { setG(k); setTri(false); }} />
      <${GSvg} vb="0 0 300 186" N=${N} E=${E} r=${13} nc=${n => (c[n.id] ? 'blk' : '') + (tri && G.tri.includes(n.id) ? ' bad' : '')} ec=${e => tri ? (inTri(e) ? 'bad' : 'dim') : !any ? '' : c[e.u] !== c[e.v] ? 'ok' : 'bad'} onN=${flip} aria=${'Graph ' + (g + 1) + ' of the slide; tap vertices to colour them'} />
      <p className="dmv9-info"><b>${good} / ${m}</b> edges join two colours ${any && good === m ? html`<span className="dmv9-okt">✓ bipartite</span>` : ''}</p>
      <div className="dmv9-row"><button className="fig-btn solid" onClick=${answer}>Slide’s answer</button><button className="fig-btn" onClick=${() => { setTri(false); setCol(col.map((cc, k) => k === g ? cc.map(() => 0) : cc)); }}>Clear</button></div>
    </div></div><${Cap} ...${s} showAr=${ar} /></figure>`;
  }

  /* ── [1.4] slide 6: complete bipartite K_{n1,n2} ── */
  function KBip({ ar }) {
    const [n1, setN1] = useState(3), [n2, setN2] = useState(4);
    const row = (k, y) => Array.from({ length: k }, (_, j) => ({ x: +(150 + (j - (k - 1) / 2) * Math.min(60, 240 / Math.max(1, k - 1))).toFixed(1), y }));
    const N = [...row(n1, 36).map((p, j) => ({ id: 'a' + j, ...p })), ...row(n2, 168).map((p, j) => ({ id: 'b' + j, ...p }))];
    const all = []; for (let a = 0; a < n1; a++) for (let b = 0; b < n2; b++) all.push({ id: a + '-' + b, u: 'a' + a, v: 'b' + b });
    const tot = all.length, [c, replay] = useCount(tot, Math.max(120, 1600 / tot), n1 * 10 + n2), shown = new Set(all.slice(0, c).map(e => e.id));
    const deg = id => all.slice(0, c).filter(e => e.u === id || e.v === id).length;
    const K = `K${SB(n1)},${SB(n2)}`, reg = n1 === n2;
    const s = c < tot ? { en: `Drawing ${K}: every vertex of V₁ (top) is joined to every vertex of V₂ (bottom). Edge ${c} of ${tot}.`, ar: `بنرسم الـ ${B(K)}، كل vertex في ${B('V₁')} (فوق) بيتوصّل بكل vertex في ${B('V₂')} (تحت). وصلنا لـ edge رقم ${B(c)} من ${B(tot)}.` }
      : { en: `|E| = |V₁|·|V₂| = ${n1} × ${n2} = <b>${tot}</b>. Vertices of V₁ have degree ${n2}, vertices of V₂ have degree ${n1}: ${reg ? `equal, so ${K} is <b>${n1}-regular</b> (n₁ = n₂).` : `not equal, so ${K} is <b>not regular</b> (regular exactly when n₁ = n₂).`}`,
        ar: `عدد الـ edges:${L('|E| = |V₁|·|V₂| = ' + (n1) + ' × ' + (n2) + ' = ' + (tot))}الـ vertices اللي في ${B('V₁')} الـ degree بتاعها ${B(n2)}، واللي في ${B('V₂')} الـ degree بتاعها ${B(n1)}. ${reg ? `متساويين، يبقى الـ ${B(K)} هو ${B(n1 + '-regular')} (لأن ${B('n₁ = n₂')}).` : `مش متساويين، يبقى الـ ${B(K)} <b>مش regular</b> (بيبقى regular بالظبط لما ${B('n₁ = n₂')}).`}` };
    const Step = ({ lab, v, set }) => html`<span className="dmv9-row" style=${{ margin: 0 }}><b className="dmv9-mono">${lab} = ${v}</b><button className="fig-btn" aria-label=${'decrease ' + lab} disabled=${v <= 1} onClick=${() => set(v - 1)}>−</button><button className="fig-btn" aria-label=${'increase ' + lab} disabled=${v >= 5} onClick=${() => set(v + 1)}>+</button></span>`;
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <div className="dmv9-row" style=${{ margin: '0 0 8px', gap: '6px 16px' }}><${Step} lab="n₁" v=${n1} set=${setN1} /><${Step} lab="n₂" v=${n2} set=${setN2} /></div>
      <${GSvg} vb="0 0 300 204" N=${N} E=${all} r=${13} ec=${e => shown.has(e.id) ? '' : 'gone'} nlab=${x => String(deg(x.id))} nc=${x => x.id[0] === 'a' ? 'on' : 'blk'} aria=${'Complete bipartite graph ' + K} />
      <p className="dmv9-big">${K}: |E| = ${c} / ${tot}</p>
      <div className="dmv9-row"><button className="fig-btn" onClick=${() => { setN1(3); setN2(4); }}>Slide’s picture (3 and 4)</button></div>
    </div></div><${Cap} ...${s} showAr=${ar} /><div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${replay}>↻ Replay</button></div></figure>`;
  }

  /* ── [2.0–2.3] slide 9: walks, trails, paths, cycles on the slide's graph G ── */
  const WN = [{ id: 1, x: 26, y: 36 }, { id: 2, x: 159, y: 26 }, { id: 3, x: 100, y: 76 }, { id: 4, x: 90, y: 148 }, { id: 5, x: 146, y: 165 }, { id: 6, x: 186, y: 124 }, { id: 7, x: 242, y: 150 }, { id: 8, x: 274, y: 80 }].map(n => ({ ...n, t: String(n.id) }));
  const WE = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 6], [2, 8], [3, 8], [3, 4], [3, 5], [4, 5], [5, 6], [6, 7], [7, 8]];
  const wk = (a, b) => Math.min(a, b) + '-' + Math.max(a, b), WADJ = new Set(WE.map(([a, b]) => wk(a, b)));
  const WPRE = [['path', 'Slide’s path', [2, 3, 4, 5, 6, 7, 8]], ['walk', 'A walk', [1, 3, 4, 3, 8]], ['trail', 'A trail', [3, 1, 4, 3, 5, 4]], ['cycle', 'A cycle', [2, 3, 5, 6, 2]]];
  function Walk({ ar }) {
    const [w, setW] = useState(WPRE[0][2]), [note, setNote] = useState(null);
    const k = w.length - 1, ek = w.slice(1).map((x, j) => wk(w[j], x));
    const trail = new Set(ek).size === ek.length, path = new Set(w).size === w.length, closed = k >= 1 && w[0] === w[k], cycle = closed && k >= 3 && new Set(w.slice(0, k)).size === k;
    const rep = !trail ? ek.find((e, j) => ek.indexOf(e) !== j) : null, repV = !path ? w.find((x, j) => w.indexOf(x) !== j && !(closed && j === k)) : null;
    const canCut = k >= 1 && !closed && !path;
    const tap = n => { setNote(null); if (!w.length) return setW([n.id]); const last = w[w.length - 1]; if (n.id === last) return setW(w.slice(0, -1)); if (!WADJ.has(wk(last, n.id))) return setNote({ en: `${n.id} is not adjacent to ${last}: a walk only moves along edges.`, ar: `الـ node رقم ${B(n.id)} مش جنب الـ node رقم ${B(last)}، والـ walk بيمشي على الـ edges بس.` }); if (w.length >= 13) return; setW(w.concat(n.id)); };
    const cut = () => { let a = -1, b = -1; for (let j = 0; j < w.length && a < 0; j++) { const l = w.lastIndexOf(w[j]); if (l > j) { a = j; b = l; } } if (a < 0) return; const sub = w.slice(a, b + 1); setW(w.slice(0, a + 1).concat(w.slice(b + 1))); setNote({ en: `Removed the subcycle ${sub.join(' → ')} (length ${b - a}). The walk still goes from ${w[0]} to ${w[k]}.`, ar: `شلنا الـ subcycle ده (طوله ${B(b - a)}):${L(sub.join(' → '))}ولسه الـ walk رايح من ${B(w[0])} لـ ${B(w[k])}.` }); };
    const lab = {}; ek.forEach((e, j) => { lab[e] = (lab[e] ? lab[e] + ',' : '') + (j + 1); });
    const E = WE.map(([a, b]) => ({ id: wk(a, b), u: a, v: b, t: lab[wk(a, b)] || '' }));
    let s;
    if (note) s = note;
    else if (k < 1) s = { en: w.length ? `v₀ = ${w[0]}. Tap a neighbour to walk along an edge (tap the last node to undo).` : 'Tap a node to start a walk.', ar: w.length ? `الـ ${B('v₀ = ' + w[0])}. دوس على node جنبه علشان تمشي على edge (ولو دوست على آخر node بيتشال).` : 'دوس على أي node علشان تبدأ walk.' };
    else if (cycle) s = { en: `v₀ = v${SB(k)} = ${w[0]} and all other nodes are different: a <b>cycle</b> of length ${k}.`, ar: `هنا ${B('v₀ = v' + (SB(k)) + ' = ' + (w[0]))} وباقي الـ nodes كلها مختلفة، يبقى ده <b>cycle</b> طوله ${B(k)}.` };
    else if (closed) s = { en: `v₀ = v${SB(k)} = ${w[0]}: a <b>closed</b> ${trail ? 'trail' : 'walk'} of length ${k}${repV != null ? `, not a cycle (node ${repV} repeats)` : ''}.`, ar: `هنا ${B('v₀ = v' + (SB(k)) + ' = ' + (w[0]))}، يبقى ده ${trail ? 'trail' : 'walk'} <b>closed</b> طوله ${B(k)}${repV != null ? `، بس مش cycle لأن الـ node رقم ${B(repV)} اتكرر` : ''}.` };
    else if (path) s = { en: `All ${k + 1} nodes are different: a <b>path</b> of length ${k} (so its edges are different too).`, ar: `كل الـ nodes مختلفة (عددها ${B(k + 1)})، يبقى ده <b>path</b> طوله ${B(k)} (وبالتالي الـ edges كمان مختلفة).` };
    else if (trail) s = { en: `All edges are different but node ${repV} repeats: a <b>trail</b>, not a path. Lemma: a walk from u to v ≠ u contains a path: press “Eliminate a subcycle”.`, ar: `كل الـ edges مختلفة بس الـ node رقم ${B(repV)} اتكرر، يبقى ده <b>trail</b> ومش path. الـ Lemma بتقول إن أي walk من u لـ ${B('v ≠ u')} جواه path، دوس على الزرار اللي بيشيل الـ subcycle.` };
    else s = { en: `The edge {${rep.replace('-', ', ')}} is used twice: only a <b>walk</b>, not a trail. Lemma: it contains a path from ${w[0]} to ${w[k]}: press “Eliminate a subcycle”.`, ar: `الـ edge ${B('{' + (rep.replace('-', ', ')) + '}')} اتمشى عليه مرتين، يبقى ده <b>walk</b> بس ومش trail. والـ Lemma بتقول إن جواه path من ${B(w[0])} لـ ${B(w[k])}، دوس على الزرار اللي بيشيل الـ subcycle.` };
    const Tag = ({ on, t }) => html`<span className=${'dmv9-tag ' + (on ? 'yes' : 'no')}>${t}</span>`;
    const cur = (WPRE.find(p => p[2].join() === w.join()) || [''])[0];
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${Modes} list=${WPRE.map(p => [p[0], p[1]])} mode=${cur} set=${key => { setNote(null); setW(WPRE.find(p => p[0] === key)[2]); }} />
      <${GSvg} vb="0 0 300 188" N=${WN} E=${E} r=${13} ec=${e => e.t ? 'on' : ''} nc=${n => (n.id === w[w.length - 1] ? 'sel ' : '') + (w.includes(n.id) ? 'on' : '')} onN=${tap} aria="The slide's graph G; tap nodes to build a walk" />
      <p className="dmv9-big">${w.length ? w.join(' → ') : '·'}</p>
      <p className="dmv9-info dmv9-mono">k = ${Math.max(k, 0)} edges · ${w.length} nodes v₀ … v${SB(Math.max(k, 0))} (|V| = |E| + 1)</p>
      <div className="dmv9-tags"><${Tag} on=${k >= 1} t="walk" /><${Tag} on=${k >= 1 && trail} t="trail" /><${Tag} on=${k >= 1 && path} t="path" /><${Tag} on=${closed} t="closed" /><${Tag} on=${cycle} t="cycle" /></div>
      <div className="dmv9-row"><button className="fig-btn solid" disabled=${!canCut} onClick=${cut}>Eliminate a subcycle</button><button className="fig-btn" disabled=${!w.length} onClick=${() => { setNote(null); setW(w.slice(0, -1)); }}>Undo</button><button className="fig-btn" onClick=${() => { setNote(null); setW([]); }}>Clear</button></div>
    </div></div><${Cap} ...${s} showAr=${ar} /></figure>`;
  }

  /* ── [2.3] slide 10: a closed walk of odd length contains an odd cycle ── */
  const OP = { P0: [15, 106], P1: [45, 40], X: [97, 40], P3: [72, 106], Q1: [156, 40], W: [178, 73], Q3: [156, 106], Q4: [98, 106], R1: [206, 40], Y: [234, 73], R3: [206, 106], S1: [260, 40], S2: [286, 73], S3: [260, 106] };
  const OW = ['P0', 'P1', 'X', 'Q1', 'W', 'R1', 'Y', 'S1', 'S2', 'S3', 'Y', 'R3', 'W', 'Q3', 'Q4', 'X', 'P3', 'P0'];
  const OPART = { par: ['P0', 'P1', 'X', 'P3'], pen: ['X', 'Q1', 'W', 'Q3', 'Q4'], dia: ['W', 'R1', 'Y', 'R3', 'S1', 'S2', 'S3'] };
  function OddWalk({ ar }) {
    const steps = [
      { en: 'The slide’s closed walk goes once around every piece and comes back to its start: length 4 + 5 + 4 + 4 = <b>17</b>, odd.', ar: 'الـ closed walk اللي في الـ slide بيلف مرة على كل جزء ويرجع لأوله، وطوله:' + L('4 + 5 + 4 + 4 = 17') + 'وده odd.' },
      { en: 'The walk passes <b>w</b> twice: split it there into two closed walks of lengths 8 (right) and 9 (left). 8 + 9 = 17 is odd, so one part is odd: keep the 9.', ar: 'الـ walk بيعدّي على <b>w</b> مرتين، فنقسمه عندها لـ 2 closed walks، طولهم 8 (يمين) و 9 (شمال). وبما إن المجموع 17 odd يبقى واحد منهم odd، فناخد الـ 9.' },
      { en: 'The 9 still repeats the corner shared by the two left pieces: split again into 4 (even) and 5 (odd). Keep the 5.', ar: 'الـ 9 لسه بيعدّي مرتين على الركن المشترك بين الجزئين اللي على الشمال، فنقسمه تاني لـ 4 (even) و 5 (odd)، وناخد الـ 5.' },
      { en: 'The 5 repeats no node: it is a <b>cycle of odd length 5</b> inside the closed walk of odd length 17. Hint of the slide: decompose recursively and use induction.', ar: 'الـ 5 مفيهوش أي node متكرر، يبقى ده <b>cycle طوله odd</b> (5) جوه الـ closed walk اللي طوله 17. وده الـ hint بتاع الـ slide: نقسّم recursively ونستخدم الـ induction.' }];
    const [i, ctl] = useSteps(steps.length, 2600);
    const N = Object.entries(OP).map(([id, [x, y]]) => ({ id, x, y, t: '', r: id === 'W' || id === 'X' ? 6 : 4.5 }));
    const E = OW.slice(1).map((v, j) => ({ id: j, u: OW[j], v }));
    const part = e => OPART.dia.includes(e.u) && OPART.dia.includes(e.v) ? 'dia' : OPART.par.includes(e.u) && OPART.par.includes(e.v) ? 'par' : 'pen';
    const ec = e => { const p = part(e); if (i === 0) return 'on'; if (i === 1) return p === 'dia' ? 'dim' : 'on'; if (i === 2) return p === 'pen' ? 'on' : 'dim'; return p === 'pen' ? 'ok' : 'dim'; };
    const nc = n => 'dot ' + ((i === 1 && n.id === 'W') || (i === 2 && n.id === 'X') ? 'on' : '');
    const len = ['17', '9 + 8', '5 + 4', '5'][i];
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${GSvg} vb="0 0 300 126" N=${N} E=${E} r=${4.5} nc=${nc} ec=${ec} extra=${html`<text className="dmv9-lb2" x="178" y="54" dy="0.35em" textAnchor="middle">w</text>`} aria="A closed walk of odd length split at repeated nodes until an odd cycle remains" />
      <p className="dmv9-big">length ${len}</p>
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3.0–3.1] slide 11: digraph, source / terminal, in- and out-degree ── */
  const DN = [{ id: 1, x: 106, y: 38, t: 'v₁' }, { id: 2, x: 192, y: 38, t: 'v₂' }, { id: 3, x: 272, y: 38, t: 'v₃' }, { id: 4, x: 28, y: 140, t: 'v₄' }, { id: 5, x: 106, y: 140, t: 'v₅' }];
  const DE = [{ id: 1, u: 1, v: 2, side: -1 }, { id: 2, u: 2, v: 3, bend: -11 }, { id: 3, u: 3, v: 2, bend: -11 }, { id: 4, u: 3, v: 5, bend: -22 }, { id: 5, u: 4, v: 1, bend: -16 }, { id: 6, u: 1, v: 5, bend: -10 }, { id: 7, u: 5, v: 1, bend: -10 }, { id: 8, u: 4, v: 5, side: 1 }];
  function Digraph({ ar }) {
    const [flip, setFlip] = useState([]), [sel, setSel] = useState(null);
    const E = DE.map(e => flip.includes(e.id) ? { ...e, u: e.v, v: e.u, t: 'e' + SB(e.id) } : { ...e, t: 'e' + SB(e.id) });
    const din = DN.map(n => E.filter(e => e.v === n.id).length), dout = DN.map(n => E.filter(e => e.u === n.id).length);
    const off = DN.filter((n, k) => din[k] !== dout[k]).map(n => n.t), bal = !off.length;
    const se = sel != null ? E.find(e => e.id === sel) : null;
    let s;
    if (se) s = { en: `<b>e${SB(se.id)}</b> = (v${SB(se.u)}, v${SB(se.v)}): v${SB(se.u)} is the <b>source</b> node and v${SB(se.v)} the <b>terminal</b> node. It adds 1 to d_out(v${SB(se.u)}) and 1 to d_in(v${SB(se.v)}).`, ar: `الـ ${B('e' + (SB(se.id)) + ' = (v' + (SB(se.u)) + ', v' + (SB(se.v)) + ')')}، الـ ${B('v' + SB(se.u))} هو الـ <b>source</b> node والـ ${B('v' + SB(se.v))} هو الـ <b>terminal</b> node. الـ edge ده بيزوّد ${B('d_out(v' + (SB(se.u)) + ')')} بواحد و ${B('d_in(v' + (SB(se.v)) + ')')} بواحد.` };
    else s = { en: `Σ d_in = Σ d_out = ${E.length}. ${bal ? 'd_in(v) = d_out(v) for every node: the graph is <b>balanced</b>.' : `Not balanced: d_in and d_out differ at ${off.join(', ')}.`} Tap an edge to see its source and terminal; “Reverse” turns it around.`, ar: `مجموع الـ in-degrees بيساوي مجموع الـ out-degrees:${L('Σ d_in = Σ d_out = ' + (E.length))}${bal ? 'وكل node عنده ' + B('d_in(v) = d_out(v)') + '، يبقى الـ graph <b>balanced</b>.' : 'والـ graph <b>مش balanced</b>، لأن الـ in-degree مش بيساوي الـ out-degree عند:' + L(off.join(', '))}دوس على أي edge علشان تشوف الـ source والـ terminal بتوعه، وزرار الـ Reverse بيقلب اتجاهه.` };
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${GSvg} vb="0 0 300 172" N=${DN} E=${E} dir=${true} ec=${e => sel == null ? '' : e.id === sel ? 'on' : 'dim'} nc=${n => se ? (n.id === se.u ? 'on' : n.id === se.v ? 'ok' : '') : ''} onE=${e => setSel(e.id === sel ? null : e.id)} aria="Digraph with nodes v1 to v5 and edges e1 to e8" />
      <div className="dmv9-tw"><table className="dmv9-tb"><tbody>
        <tr><th>v</th>${DN.map(n => html`<th key=${n.id}>${n.t}</th>`)}</tr>
        <tr><th>d_in</th>${din.map((d, k) => html`<td key=${k} className=${se && DN[k].id === se.v ? 'cur' : ''}>${d}</td>`)}</tr>
        <tr><th>d_out</th>${dout.map((d, k) => html`<td key=${k} className=${se && DN[k].id === se.u ? 'cur' : ''}>${d}</td>`)}</tr>
        <tr><th>=</th>${DN.map((n, k) => html`<td key=${k} className=${din[k] === dout[k] ? 'ok' : 'bad'}>${din[k] === dout[k] ? '✓' : '✗'}</td>`)}</tr></tbody></table></div>
      <p className="dmv9-info">${bal ? html`<span className="dmv9-okt">balanced</span>` : html`<span className="dmv9-warn">not balanced</span>`}</p>
      <div className="dmv9-row"><button className="fig-btn solid" disabled=${sel == null} onClick=${() => setFlip(flip.includes(sel) ? flip.filter(x => x !== sel) : flip.concat(sel))}>Reverse ${sel != null ? 'e' + SB(sel) : 'edge'}</button><button className="fig-btn" disabled=${!flip.length && sel == null} onClick=${() => { setFlip([]); setSel(null); }}>Slide’s digraph</button></div>
    </div></div><${Cap} ...${s} showAr=${ar} /></figure>`;
  }

  /* ── slide 12 graph (nodes 0..5) and slide 15 labels (v1..v6) ── */
  const TPOS = { 0: [40, 160], 1: [40, 36], 2: [150, 36], 3: [260, 36], 4: [150, 160], 5: [260, 160] };
  const TE = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 4], [2, 4], [2, 5], [3, 5], [4, 5]];
  const TN = Object.entries(TPOS).map(([id, [x, y]]) => ({ id: +id, x, y, t: id }));
  const EXTRA = { id: 'x', u: 5, v: 0, bend: -36 };

  /* ── [4.0] slide 12: is f_ord a topological order? ── */
  const FIND = [0, 3, 1, 2, 4, 5];
  function TopOrder({ ar }) {
    const [ord, setOrd] = useState(FIND);
    const f = {}; ord.forEach((v, k) => { f[v] = k + 1; });
    const E = TE.map(([u, v], k) => ({ id: k, u, v }));
    const both = E.filter(e => f[e.u] && f[e.v]), bad = both.filter(e => f[e.u] > f[e.v]), full = ord.length === 6;
    const tap = n => { if (f[n.id]) setOrd(ord.slice(0, f[n.id] - 1)); else setOrd(ord.concat(n.id)); };
    let s;
    if (bad.length) s = { en: `Edge (${bad[0].u}, ${bad[0].v}) has f_ord(${bad[0].u}) = ${f[bad[0].u]} > f_ord(${bad[0].v}) = ${f[bad[0].v]}: this is not a topological order. Tap a node to undo from there.`, ar: `الـ edge ${B('(' + (bad[0].u) + ', ' + (bad[0].v) + ')')} فيه:${L('f_ord(' + (bad[0].u) + ') = ' + (f[bad[0].u]) + ' > f_ord(' + (bad[0].v) + ') = ' + (f[bad[0].v]))}يبقى ده مش topological order. دوس على أي node علشان ترجع من عنده.` };
    else if (full) s = { en: 'f_ord(i) &lt; f_ord(j) for all 10 edges (i, j): a <b>topological order</b>. This one is the order FindTopOrd finds (slide 15).', ar: 'الشرط ' + B('f_ord(i) &lt; f_ord(j)') + ' متحقق لكل الـ 10 edges، يبقى ده <b>topological order</b>. وده نفس الترتيب اللي الـ FindTopOrd بيطلّعه (slide 15).' };
    else s = { en: `Tap the nodes in order: the first gets f_ord = 1, the next 2, and so on. Every edge (i, j) needs f_ord(i) &lt; f_ord(j). ${ord.length} of 6 numbered.`, ar: `دوس على الـ nodes بالترتيب، أول واحد ياخد ${B('f_ord = 1')} واللي بعده 2 وهكذا. وكل edge ${B('(i, j)')} لازم يحقق ${B('f_ord(i) &lt; f_ord(j)')}. اترقّم ${B(ord.length)} من 6.` };
    const extra = html`<g>${TN.filter(n => f[n.id]).map(n => html`<text key=${n.id} className="dmv9-bd" x=${n.x + (n.id === 0 ? 0 : 0)} y=${n.y < 100 ? n.y - 25 : n.y + 26} dy="0.35em" textAnchor="middle">f=${f[n.id]}</text>`)}</g>`;
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${GSvg} vb="0 -6 300 202" N=${TN} E=${E} dir=${true} nc=${n => f[n.id] ? 'on' : ''} ec=${e => f[e.u] && f[e.v] ? (f[e.u] < f[e.v] ? 'ok' : 'bad') : ''} onN=${tap} extra=${extra} aria="The slide 12 digraph with nodes 0 to 5; tap nodes to number them" />
      <p className="dmv9-info"><b>${both.length - bad.length} / 10</b> edges with f_ord(i) ${'<'} f_ord(j) ${full && !bad.length ? html`<span className="dmv9-okt">✓</span>` : ''}</p>
      <div className="dmv9-row"><button className="fig-btn solid" onClick=${() => setOrd(FIND)}>FindTopOrd’s order</button><button className="fig-btn" onClick=${() => setOrd([])}>Clear</button></div>
    </div></div><${Cap} ...${s} showAr=${ar} /></figure>`;
  }

  /* ── [4.1] slide 14: why an acyclic graph has a node with zero in-degree (follow predecessors) ── */
  function PredChain({ ar }) {
    const [x, setX] = useState(true);
    const E = TE.map(([u, v], k) => ({ id: k, u, v })).concat(x ? [EXTRA] : []);
    const din = TN.map(n => E.filter(e => e.v === n.id).length);
    const chain = [4]; if (x) { while (true) { const c = chain[chain.length - 1], p = Math.min(...E.filter(e => e.v === c).map(e => e.u)); chain.push(p); if (chain.indexOf(p) < chain.length - 1) break; } }
    const rep = chain[chain.length - 1], cyc = chain.slice(chain.indexOf(rep));
    const steps = x ? [
      { en: 'Assume d_in(v) &gt; 0 for every node. Here the slide 12 graph gets one extra edge (5, 0), and now every node has a predecessor p(i) with (p(i), i) ∈ E. Start anywhere: v₀ = 4.', ar: 'نفترض إن ' + B('d_in(v) &gt; 0') + ' لكل الـ nodes. هنا زوّدنا على graph الـ slide 12 الـ edge ' + B('(5, 0)') + '، فبقى لكل node فيه predecessor:' + L('(p(i), i) ∈ E') + 'ونبدأ من أي node، مثلًا ' + B('v₀ = 4') + '.' },
      ...chain.slice(1).map((v, j) => j + 2 < chain.length
        ? { en: `v${SB(j + 1)} = p(v${SB(j)}) = ${v}, because (${v}, ${chain[j]}) ∈ E.`, ar: `ناخد الـ predecessor:${L('v' + (SB(j + 1)) + ' = p(v' + (SB(j)) + ') = ' + (v) + ', (' + (v) + ', ' + (chain[j]) + ') ∈ E')}` }
        : { en: `v${SB(j + 1)} = p(v${SB(j)}) = ${v}: node ${v} was already visited. Since |V| is bounded this must happen, and it closes a cycle ${cyc.slice().reverse().join(' → ')}. So a graph where every node has d_in &gt; 0 is not acyclic.`, ar: `ناخد ${B('v' + (SB(j + 1)) + ' = p(v' + (SB(j)) + ') = ' + (v))}، والـ node ده زرناه قبل كده. ولأن ${B('|V|')} محدود لازم ده يحصل، وبيقفل cycle:${L(cyc.slice().reverse().join(' → '))}يعني لو كل node عنده ${B('d_in &gt; 0')} يبقى الـ graph مش acyclic.` })]
      : [{ en: 'In the slide’s graph node 0 has d_in(0) = 0: the graph is acyclic and, as the proposition says, it has a node with zero in-degree. FindTopOrd starts there.', ar: 'في الـ graph بتاع الـ slide الـ node رقم 0 عنده ' + B('d_in(0) = 0') + '، والـ graph ده acyclic، وزي ما الـ proposition بتقول فيه node الـ in-degree بتاعه صفر. والـ FindTopOrd بيبدأ منه.' }];
    const [i, ctl] = useWalk(steps.length, 2200, x);
    const seen = x ? chain.slice(0, i + 1) : [], last = i === steps.length - 1 && x;
    const used = new Set(); for (let j = 1; j < seen.length; j++) used.add(seen[j] + '>' + seen[j - 1]);
    const inCyc = e => last && cyc.some((c, j) => j > 0 && e.u === c && e.v === cyc[j - 1]);
    const ec = e => inCyc(e) ? 'ok' : used.has(e.u + '>' + e.v) ? 'on' : x && i > 0 ? 'dim' : '';
    const nc = n => last && cyc.includes(n.id) ? 'ok' : seen.includes(n.id) ? 'on' : !x && n.id === 0 ? 'ok' : '';
    const extra = html`<g>${TN.map(n => html`<text key=${n.id} className="dmv9-bd" x=${n.x + (n.x > 200 ? -2 : 2)} y=${n.y < 100 ? n.y - 25 : n.y + 26} dy="0.35em" textAnchor="middle">${'d=' + din[n.id]}</text>`)}</g>`;
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${Modes} list=${[[true, 'Every d_in > 0 (extra edge 5 → 0)'], [false, 'Slide’s graph']]} mode=${x} set=${setX} />
      <${GSvg} vb="0 0 300 222" N=${TN} E=${E} dir=${true} nc=${nc} ec=${ec} extra=${extra} aria="Following predecessors from node 4 until a node repeats" />
      <p className="dmv9-mut dmv9-c" style=${{ margin: '2px 0 0' }}>d = in-degree</p>
      ${x && html`<p className="dmv9-big">${chain.slice(0, i + 1).map((v, j) => `v${SB(j)} = ${v}`).join(' → ')}</p>`}
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4.2–4.3] slides 13 and 15: FindTopOrd step by step ── */
  const VN = TN.map(n => ({ ...n, t: 'v' + SB({ 0: 4, 1: 1, 2: 2, 3: 3, 4: 5, 5: 6 }[n.id]) }));
  const VL = id => VN.find(n => n.id === id).t;
  function FindTop({ ar }) {
    const [mode, setMode] = useState('ex'), [rem, setRem] = useState([]), [x, setX] = useState(false);
    const [i, ctl] = useWalk(8, 1900, mode);
    const cyc = mode === 'try' && x;
    const E = TE.map(([u, v], k) => ({ id: k, u, v })).concat(cyc ? [EXTRA] : []);
    const R = mode === 'ex' ? FIND.slice(0, Math.min(i, 6)) : rem, t = R.length;
    const live = TN.filter(n => !R.includes(n.id)).map(n => n.id);
    const din = id => E.filter(e => e.v === id && !R.includes(e.u)).length;
    const cand = live.filter(id => din(id) === 0), done = !cand.length;
    const names = a => a.map(VL).join(', ');
    let s;
    if (mode === 'ex' && i === 7 || mode === 'try' && done && t === 6) s = { en: `t = 6 = n: G is <b>acyclic</b>, and the final order {${names(R)}} is a topological order. With an in-degree counter and a queue of in-degree-0 nodes, each node and edge is handled once: the algorithm is linear, O(n + m).`, ar: `هنا ${B('t = 6 = n')}، يبقى G هو <b>acyclic</b>، والترتيب النهائي ده topological order:${L('{' + (names(R)) + '}')}وباستخدام counter للـ in-degree و queue للـ nodes اللي الـ in-degree بتاعها صفر، كل node وكل edge بيتعامل معاهم مرة واحدة، يعني الـ algorithm ده linear:${L('O(n + m)')}` };
    else if (done) s = { en: `No node of G${t ? SB(t) : '⁰'} has in-degree 0, and t = ${t} &lt; n = 6: G <b>has a cycle</b> (the extra edge v₆ → v₄ closes a cycle).`, ar: `مفيش ولا node الـ in-degree بتاعه صفر، و ${B('t = ' + (t) + ' &lt; n = 6')}، يبقى G <b>فيه cycle</b> (الـ edge الزيادة ${B('v₆ → v₄')} هو اللي قفل الـ cycle).` };
    else if (t === 0) s = { en: `t := 0, G⁰ := G. In-degrees are in the table: ${cand.length === 1 ? `the only node of in-degree 0 is ${names(cand)}` : `in-degree 0: ${names(cand)}`}.${mode === 'try' ? ' Tap a green node to remove it.' : ''}`, ar: `في الأول ${B('t := 0')} و ${B('G⁰ := G')}. الـ in-degrees في الجدول، والـ nodes اللي الـ in-degree بتاعها صفر:${L(names(cand))}${mode === 'try' ? 'دوس على node أخضر علشان تشيله.' : ''}` };
    else { const v = R[t - 1]; s = { en: `Remove ${VL(v)}: order(${VL(v)}) := ${t}, t := ${t}. ${t === 2 && v === 3 && mode === 'ex' ? '(v₁ and v₃ both had in-degree 0; the slide picks v₃.) ' : ''}In-degree 0 now: ${names(cand)}.`, ar: `نشيل ${B(VL(v))}، فيبقى ${B('order(' + (VL(v)) + ') := ' + (t))} و ${B('t := ' + (t))}. ${t === 2 && v === 3 && mode === 'ex' ? '(الـ v₁ والـ v₃ الاتنين كان الـ in-degree بتاعهم صفر، والـ slide اختارت v₃.) ' : ''}الـ nodes اللي الـ in-degree بتاعها بقى صفر:${L(names(cand))}` }; }
    const tap = n => { if (mode !== 'try' || !cand.includes(n.id)) return; setRem(rem.concat(n.id)); };
    const badge = html`<g>${R.map((id, k) => { const n = VN.find(q => q.id === id); return html`<text key=${id} className="dmv9-bd" x=${n.x} y=${n.y < 100 ? n.y - 25 : n.y + 26} dy="0.35em" textAnchor="middle">${'order ' + (k + 1)}</text>`; })}</g>`;
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${Modes} list=${[['ex', 'Example from the notes'], ['try', 'Try your own']]} mode=${mode} set=${k => { setMode(k); setRem([]); }} />
      <${GSvg} vb="0 0 300 222" N=${VN} E=${E} dir=${true} nc=${n => t === 6 ? 'ok' : R.includes(n.id) ? 'dim' : cand.includes(n.id) ? 'ok' : ''} ec=${e => t === 6 ? 'ok' : R.includes(e.u) ? 'gone' : e.id === 'x' ? 'on' : ''} onN=${mode === 'try' ? tap : null} extra=${badge} aria="FindTopOrd on the slide 15 digraph: remove a node of in-degree 0 each step" />
      <div className="dmv9-tw"><table className="dmv9-tb"><tbody>
        <tr><th>v</th>${[1, 2, 3, 0, 4, 5].map(id => html`<th key=${id}>${VL(id)}</th>`)}</tr>
        <tr><th>d_in</th>${[1, 2, 3, 0, 4, 5].map(id => R.includes(id) ? html`<td key=${id} className="done">·</td>` : html`<td key=${id} className=${din(id) === 0 ? 'ok' : ''}>${din(id)}</td>`)}</tr></tbody></table></div>
      <p className="dmv9-big">t = ${t} · {${names(R)}}</p>
      ${mode === 'try' && html`<div className="dmv9-row"><button className="fig-btn" aria-pressed=${String(x)} onClick=${() => { setX(!x); setRem([]); }}>${x ? 'Remove' : 'Add'} edge v₆ → v₄</button><button className="fig-btn" onClick=${() => setRem([])}>Restart</button></div>`}
    </div></div><${Cap} ...${s} showAr=${ar} />${mode === 'ex' && html`<${Bar} steps=${Array(8).fill(0)} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── [5.0–5.1] slide 16: four drawings of the same graph (isomorphic) ── */
  const PD = [
    null,
    { pos: { T: [1188, 175], UL: [1000, 272], UM: [1188, 272], UR: [1375, 272], C: [1188, 370], ML: [1095, 470], MR: [1283, 470], LL: [1000, 568], LR: [1375, 568], B: [1188, 668] }, map: ['T', 'UL', 'MR', 'C', 'UM', 'UR', 'LL', 'LR', 'ML', 'B'], curve: { 'UL|MR': 26, 'UR|ML': -26, 'UM|B': -30 } },
    { pos: { T: [578, 62], UL: [358, 180], UR: [795, 180], L: [250, 293], R: [905, 293], IL: [468, 408], IR: [688, 408], LL: [358, 522], LR: [795, 522], B: [578, 638] }, map: ['T', 'UL', 'L', 'R', 'UR', 'B', 'IL', 'LL', 'LR', 'IR'], curve: {} },
    { pos: { T: [575, 40], UL: [262, 205], UR: [885, 205], L: [105, 368], R: [1045, 368], C: [575, 535], ML: [262, 697], MR: [885, 697], BL: [420, 860], BR: [730, 860] }, map: ['T', 'UL', 'L', 'R', 'UR', 'C', 'BR', 'ML', 'MR', 'BL'], curve: {} }];
  function Iso({ ar }) {
    const [d, setD] = useState(1), [t, setT] = useState(0), tr = useRef(0), raf = useRef(0);
    tr.current = t;
    const go = to => { cancelAnimationFrame(raf.current); if (calm()) { setT(to); return; } const t0 = performance.now(), from = tr.current; const f = now => { const p = Math.min(1, (now - t0) / 1500), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; setT(from + (to - from) * e); if (p < 1) raf.current = requestAnimationFrame(f); }; raf.current = requestAnimationFrame(f); };
    useEffect(() => { const id = setTimeout(() => go(1), 900); return () => { clearTimeout(id); cancelAnimationFrame(raf.current); }; }, []);
    const A = fitPts(PD1), D = PD[d], Bp = fitPts(D.map.map(k => D.pos[k]));
    const N = A.map((p, k) => ({ id: k, x: +(p.x + (Bp[k].x - p.x) * t).toFixed(1), y: +(p.y + (Bp[k].y - p.y) * t).toFixed(1), t: String(k + 1) }));
    const E = PE.map(([a, b], k) => { const ka = D.map[a], kb = D.map[b], c = D.curve[ka + '|' + kb], c2 = D.curve[kb + '|' + ka]; return { id: k, u: a, v: b, bend: ((c != null ? c : c2 != null ? -c2 : 0) * t) }; });
    const at = t > .99;
    const s = at ? { en: `Drawing ${d + 1} of the slide, with the same labels: the 15 edges of drawing 1 are exactly the 15 edges here. This numbering is the bijection, so the drawings are <b>isomorphic</b>. Finding such a numbering in general is the hard part (the slide: “NP hard”).`, ar: `ده الرسم رقم ${B(d + 1)} في الـ slide بنفس الأرقام، والـ 15 edge بتوع الرسم الأول هما نفس الـ 15 edge هنا. الترقيم ده هو الـ bijection، يبقى الرسمتين <b>isomorphic</b>. والصعب في العموم هو إنك تلاقي ترقيم زي ده (الـ slide بتقول "NP hard").` }
      : { en: `Drawing 1 (the Petersen graph) with its vertices numbered 1 to 10. Watch them move to drawing ${d + 1}: every vertex keeps its number and every edge keeps its two ends.`, ar: `ده الرسم الأول (الـ Petersen graph) والـ vertices مترقمة من 1 لـ 10. بص عليهم وهما بيتحركوا للرسم رقم ${B(d + 1)}، كل vertex بيفضل برقمه وكل edge بيفضل بنفس الطرفين.` };
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${Modes} list=${[[1, 'Drawing 2'], [2, 'Drawing 3'], [3, 'Drawing 4']]} mode=${d} set=${k => { setD(k); cancelAnimationFrame(raf.current); setT(0); tr.current = 0; setTimeout(() => go(1), 350); }} />
      <${GSvg} vb="0 0 300 226" N=${N} E=${E} r=${12} nc=${() => at ? 'on' : ''} aria=${'Drawing 1 of the slide morphing into drawing ' + (d + 1)} />
      <div className="dmv9-row"><button className="fig-btn solid" onClick=${() => go(t > .5 ? 0 : 1)}>${t > .5 ? '◀ Back to drawing 1' : `▶ Morph to drawing ${d + 1}`}</button></div>
    </div></div><${Cap} ...${s} showAr=${ar} /></figure>`;
  }

  /* ── [7] and [8]: the lecture's adjacency and incidence matrices, built edge by edge ── */
  const MAT = {
    und: { N: G7N, vb: '0 0 300 200',
      E: [['a', 1, 4], ['b', 2, 5], ['c', 2, 3], ['d', 3, 5], ['e', 3, 4], ['f', 4, 5]], A: 'A₁', T: 'T₁' },
    dir: { N: [{ id: 1, x: 40, y: 34, t: '1' }, { id: 2, x: 260, y: 34, t: '2' }, { id: 3, x: 260, y: 148, t: '3' }, { id: 4, x: 40, y: 148, t: '4' }], vb: '0 0 300 182',
      E: [['e₁', 1, 3], ['e₂', 4, 2], ['e₃', 4, 3], ['e₄', 3, 2], ['e₅', 2, 1]], A: 'A₂', T: 'T₂' } };
  const LP = { ...G7LP, 'e₁': [118, 80], 'e₂': [186, 80], 'e₃': [150, 164], 'e₄': [276, 91], 'e₅': [150, 20] };
  const fmt = v => v < 0 ? '−1' : String(v);
  function Mats({ ar, kind }) {
    const G = MAT[kind], di = kind === 'dir', n = G.N.length, m = G.E.length;
    const steps = m + 2;
    const [i, ctl] = useSteps(steps, 1700);
    const k = Math.min(i, m), cur = i >= 1 && i <= m ? G.E[i - 1] : null, have = G.E.slice(0, k);
    const A = (r, c) => have.some(([, u, v]) => (u === r && v === c) || (!di && u === c && v === r)) ? 1 : 0;
    const T = (r, j) => { if (j >= k) return 0; const [, u, v] = G.E[j]; return u === r ? (di ? -1 : 1) : v === r ? 1 : 0; };
    const ids = G.N.map(x => x.id).sort((a, b) => a - b);
    const hlA = (r, c) => cur && ((cur[1] === r && cur[2] === c) || (!di && cur[1] === c && cur[2] === r));
    const hlT = (r, j) => cur && j === i - 1 && (cur[1] === r || cur[2] === r);
    const E = G.E.map(([t, u, v]) => ({ id: t, u, v, t, lp: LP[t] }));
    const deg = ids.map(r => ids.reduce((s, c) => s + A(r, c), 0));
    const lists = ids.map(r => have.filter(e => e[1] === r).map(e => e[2]).sort((a, b) => a - b));
    let s;
    if (i === 0) s = di ? { en: 'The lecture’s digraph: 4 vertices, edges e₁ to e₅. A₂ is 4 × 4 and T₂ is 4 × 5; we fill them edge by edge (tap an edge to jump to it).', ar: 'الـ digraph بتاع المحاضرة فيه 4 vertices والـ edges من ' + B('e₁') + ' لـ ' + B('e₅') + '. الـ ' + B('A₂') + ' حجمها ' + B('4 × 4') + ' والـ ' + B('T₂') + ' حجمها ' + B('4 × 5') + '، وهنملاهم edge edge (دوس على أي edge علشان تروحله).' }
      : { en: 'The lecture’s undirected graph: 5 vertices, edges a to f. A₁ is 5 × 5 and T₁ is 5 × 6; we fill them edge by edge (tap an edge to jump to it).', ar: 'الـ undirected graph بتاع المحاضرة فيه 5 vertices والـ edges من a لـ f. الـ ' + B('A₁') + ' حجمها ' + B('5 × 5') + ' والـ ' + B('T₁') + ' حجمها ' + B('5 × 6') + '، وهنملاهم edge edge (دوس على أي edge علشان تروحله).' };
    else if (cur) { const [t, u, v] = cur; s = di ? { en: `${t} = (${u} → ${v}): A₂(${u}, ${v}) = 1 only (direction matters). In column ${t} of T₂: −1 at the source ${u}, +1 at the terminal ${v}.`, ar: `الـ edge ${B((t) + ' = (' + (u) + ' → ' + (v) + ')')} بيحط ${B('A₂(' + (u) + ', ' + (v) + ') = 1')} بس (الاتجاه مهم). وفي عمود ${B(t)} في الـ ${B('T₂')} بنحط ${B('−1')} عند الـ source ${B(u)} و ${B('+1')} عند الـ terminal ${B(v)}.` }
      : { en: `${t} = (${u}, ${v}): A₁(${u}, ${v}) = A₁(${v}, ${u}) = 1 (A₁ is symmetric), and column ${t} of T₁ gets 1 in rows ${u} and ${v}.`, ar: `الـ edge ${B((t) + ' = (' + (u) + ', ' + (v) + ')')} بيحط 1 في ${B('A₁(' + (u) + ', ' + (v) + ')')} وفي ${B('A₁(' + (v) + ', ' + (u) + ')')} (لأن الـ ${B('A₁')} symmetric)، وعمود ${B(t)} في الـ ${B('T₁')} بياخد 1 في الصفين ${B(u)} و ${B(v)}.` }; }
    else s = di ? { en: 'Done: A₂ and T₂ as in the notes. Organised by source node, the list of edges is V(1) = {3}, V(2) = {1}, V(3) = {2}, V(4) = {2, 3}.', ar: 'خلصنا، والـ ' + B('A₂') + ' والـ ' + B('T₂') + ' طلعوا زي الـ notes. ولو نظّمنا الـ edges حسب الـ source node تبقى الـ list of edges:' + L('V(1) = {3}, V(2) = {1}, V(3) = {2}, V(4) = {2, 3}') }
      : { en: 'Done: A₁ and T₁ as in the notes. Each row sum of A₁ (= ones in a row of T₁) is the degree: 1, 2, 3, 3, 3, sum 12 = 2 × 6 edges ✓.', ar: 'خلصنا، والـ ' + B('A₁') + ' والـ ' + B('T₁') + ' طلعوا زي الـ notes. مجموع كل صف في الـ ' + B('A₁') + ' (يعني عدد الـ 1 في نفس الصف في الـ ' + B('T₁') + ') هو الـ degree:' + L('1, 2, 3, 3, 3 → 12 = 2 × 6') };
    const MatA = html`<table className="dmv9-tb"><caption>${G.A}</caption><tbody><tr><th></th>${ids.map(c => html`<th key=${c}>${c}</th>`)}${!di && i === steps - 1 ? html`<th>d</th>` : null}</tr>
      ${ids.map(r => html`<tr key=${r}><th>${r}</th>${ids.map(c => html`<td key=${c} className=${(A(r, c) ? '' : 'zero ') + (hlA(r, c) ? 'cur' : '')}>${A(r, c)}</td>`)}${!di && i === steps - 1 ? html`<td className="odd">${deg[ids.indexOf(r)]}</td>` : null}</tr>`)}</tbody></table>`;
    const MatT = html`<table className="dmv9-tb"><caption>${G.T}</caption><tbody><tr><th></th>${G.E.map(([t]) => html`<th key=${t}>${t}</th>`)}</tr>
      ${ids.map(r => html`<tr key=${r}><th>${r}</th>${G.E.map(([t], j) => html`<td key=${t} className=${(T(r, j) ? '' : 'zero ') + (hlT(r, j) ? 'cur' : '')}>${fmt(T(r, j))}</td>`)}</tr>`)}</tbody></table>`;
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${GSvg} vb=${G.vb} N=${G.N} E=${E} dir=${di} ec=${e => cur ? (e.id === cur[0] ? 'on' : have.some(h => h[0] === e.id) ? '' : 'dim') : (i === 0 ? 'dim' : '')} nc=${x => cur && (x.id === cur[1] || x.id === cur[2]) ? 'on' : ''} onE=${e => ctl.go(G.E.findIndex(q => q[0] === e.id) + 1)} aria=${di ? 'The lecture digraph with edges e1 to e5' : 'The lecture graph with edges a to f'} />
      <div className="dmv9-mats">${MatA}${MatT}</div>
      ${di && html`<div className="dmv9-c"><div className="dmv9-list">${ids.map((r, j) => html`<div key=${r} className=${cur && cur[1] === r ? 'cur' : ''}>V(${r}) = ${lists[j].length ? `{${lists[j].join(', ')}}` : '∅'}</div>`)}</div></div>`}
    </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${Array(steps).fill(0)} i=${i} ctl=${ctl} /></figure>`;
  }
  const MatsUnd = ({ ar }) => html`<${Mats} ar=${ar} kind="und" />`, MatsDir = ({ ar }) => html`<${Mats} ar=${ar} kind="dir" />`;

  /* ── [6.2–6.3] slide 19: list of edges organised by nodes, size (n + m) log n ── */
  const LN = [{ id: 5, x: 40, y: 36, t: '5' }, { id: 1, x: 150, y: 36, t: '1' }, { id: 2, x: 262, y: 94, t: '2' }, { id: 4, x: 40, y: 152, t: '4' }, { id: 3, x: 150, y: 152, t: '3' }];
  const LE = [{ id: 0, u: 5, v: 1 }, { id: 1, u: 1, v: 2, bend: -16 }, { id: 2, u: 2, v: 3, bend: -16 }, { id: 3, u: 1, v: 3 }, { id: 4, u: 5, v: 3 }, { id: 5, u: 5, v: 4 }, { id: 6, u: 3, v: 4 }];
  function EdgeList({ ar }) {
    const steps = [
      { en: 'The slide’s digraph: n = 5 nodes, m = 7 edges. Instead of a matrix, keep for each node the list of the nodes its edges go to.', ar: 'الـ digraph بتاع الـ slide فيه ' + B('n = 5') + ' nodes و ' + B('m = 7') + ' edges. بدل الـ matrix، بنحتفظ لكل node بـ list فيها الـ nodes اللي الـ edges بتاعته رايحة لها.' },
      ...[1, 2, 3, 4, 5].map(v => { const out = LE.filter(e => e.u === v).map(e => e.v).sort(); const txt = `V(${v}) = ${out.length ? `{${out.join(', ')}}` : '∅'}`; return { en: `Node ${v}: ${out.length ? `its edges go to ${out.join(', ')}` : 'no edge leaves it'}, so <b>${txt}</b>.`, ar: `الـ node رقم ${B(v)} ${out.length ? 'الـ edges بتاعته رايحة لـ ' + B(out.join(', ')) : 'مفيش ولا edge طالع منه'}، يبقى:${L(txt)}` }; }),
      { en: 'The lists hold m = 7 entries (one per edge) plus n = 5 heads: the size is linear in m = |E|. Each entry is a vertex pointer of log n bits, so L = (n + m) log n = (5 + 7) log 5 = 12 log 5 bits.', ar: 'الـ lists فيها ' + B('m = 7') + ' عناصر (واحد لكل edge) زائد ' + B('n = 5') + ' بدايات، يعني الحجم linear في ' + B('m = |E|') + '. وكل عنصر هو vertex pointer محتاج ' + B('log n') + ' bits، يبقى:' + L('L = (n + m) log n = (5 + 7) log 5 = 12 log 5') }];
    const [i, ctl] = useSteps(steps.length, 1900);
    const v = i >= 1 && i <= 5 ? i : null;
    return html`<figure className="fig dmv9"><div className="fig-stage"><div className="dmv9-wrap">
      <${GSvg} vb="0 0 300 182" N=${LN} E=${LE} dir=${true} ec=${e => v == null ? (i === 6 ? 'on' : '') : e.u === v ? 'on' : e.u < v ? '' : 'dim'} nc=${n => n.id === v ? 'on' : ''} aria="The slide 19 digraph with nodes 1 to 5" />
      <div className="dmv9-c"><div className="dmv9-list">${[1, 2, 3, 4, 5].map(r => { const out = LE.filter(e => e.u === r).map(e => e.v).sort(); return html`<div key=${r} className=${r === v ? 'cur' : (i === 0 || (v != null && r > v)) ? 'later' : ''}>V(${r}) = ${out.length ? `{${out.join(', ')}}` : '∅'}</div>`; })}</div></div>
      ${i === 6 && html`<p className="dmv9-big">L = (n + m) log n = 12 log 5</p>`}
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'dm-graph-l9-incident': Incident, 'dm-graph-l9-simple': Simple, 'dm-degree-l9-handshake': Handshake, 'dm-degree-l9-konigsberg': Konigsberg,
    'dm-graph-l9-complete': Complete, 'dm-graph-l9-petersen': Petersen, 'dm-graph-l9-bipartite': Bipartite, 'dm-graph-l9-kbip': KBip,
    'dm-graph-l9-walk': Walk, 'dm-graph-l9-oddwalk': OddWalk, 'dm-degree-l9-digraph': Digraph, 'dm-graph-l9-toporder': TopOrder,
    'dm-graph-l9-predchain': PredChain, 'dm-graph-l9-findtopord': FindTop, 'dm-graph-l9-iso': Iso,
    'dm-graph-l9-edgelist': EdgeList, 'dm-graph-l9-mat-und': MatsUnd, 'dm-graph-l9-mat-dir': MatsDir
  });
})();
/* ── part L10 ── */
// Discrete Mathematics visuals, Lecture 10 (Graph Matrices): A(G) built from the drawing, its observations and rank, the reduced incidence matrix and spanning trees, F, B(G) and 2-isomorphic graphs, C(G) and C_f, P(u, v), edge sequences and powers of X, connectivity and distance from X, the matrix-tree theorem and the worked triangle (Lec_10_part_1, Figs. 10.1 to 10.13). Every label and number comes from the site's notes and the slides, or is computed by the code with the lecture's definitions.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, calm } = window.FIGKIT;
  const CSS = `
.dmv10{ --fig-k:var(--k-compiler); --fig-s:var(--s-compiler); }
.dmv10 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dmv10 .fig-btn[aria-pressed="true"]{ border-color:var(--k-compiler); box-shadow:0 0 0 1px var(--k-compiler); background:color-mix(in srgb, var(--k-compiler) 16%, var(--paper)); }
.dmv10-wrap{ max-width:560px; margin:0 auto; color:var(--ink); min-width:0; }
.dmv10-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dmv10-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dmv10-gr{ display:block; width:100%; height:auto; max-width:400px; margin:0 auto 6px; }
.dmv10-e .dmv10-ln{ fill:none; stroke:var(--graphite); stroke-width:2.2; transition:stroke .3s, stroke-width .3s, opacity .3s; }
.dmv10-e .dmv10-hit{ fill:none; stroke:transparent; stroke-width:18; cursor:pointer; }
.fig svg .dmv10-el{ font:600 13px var(--mono); paint-order:stroke; stroke:var(--paper-2); stroke-width:4px; stroke-linejoin:round; fill:var(--graphite); transition:fill .3s, opacity .3s; }
.fig svg .dmv10-el.dmv10-big{ font-size:15px; }
.dmv10-e.on .dmv10-ln{ stroke:var(--fig-k); stroke-width:4.5; }
.fig svg .dmv10-e.on .dmv10-el{ fill:var(--fig-k); }
.dmv10-e.dim .dmv10-ln{ opacity:.28; } .fig svg .dmv10-e.dim .dmv10-el{ opacity:.5; }
.dmv10-e.off .dmv10-ln{ stroke-dasharray:5 6; opacity:.5; } .fig svg .dmv10-e.off .dmv10-el{ opacity:.6; }
.dmv10-e.tr .dmv10-ln{ stroke:var(--ok); stroke-width:4.5; }
.dmv10-e.cut .dmv10-ln{ stroke:var(--pen); stroke-width:4.5; } .fig svg .dmv10-e.cut .dmv10-el{ fill:var(--pen); }
.dmv10-v circle{ fill:var(--paper); stroke:var(--ink); stroke-width:1.8; transition:fill .3s, stroke .3s; }
.fig svg .dmv10-v text{ font:600 13px var(--body); fill:var(--ink); pointer-events:none; }
.dmv10-v.dmv10-tap{ cursor:pointer; }
.dmv10-v.on circle{ fill:var(--fig-s); stroke:var(--fig-s); } .fig svg .dmv10-v.on text{ fill:#fff; }
.dmv10-v.sa circle{ fill:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); stroke:var(--fig-k); stroke-width:2.5; }
.dmv10-v.sb circle{ fill:color-mix(in srgb, var(--ok) 26%, var(--paper)); stroke:var(--ok); stroke-width:2.5; }
.dmv10-v.sel circle{ stroke:var(--fig-k); stroke-width:4; }
.dmv10-v.ref circle{ stroke-dasharray:3 3; fill:var(--paper-2); }
.dmv10-v.dmv10-dot circle{ fill:var(--ink); stroke:none; }
.fig svg .dmv10-sg{ font:700 17px var(--mono); }
.fig svg .dmv10-sg.p{ fill:var(--ok); } .fig svg .dmv10-sg.m{ fill:var(--pen); }
.dmv10-mw{ max-width:100%; margin:6px auto 4px; min-width:0; }
.dmv10-mt{ text-align:center; font:700 .88rem/1.3 var(--mono); color:var(--fig-k); margin:4px 0; }
.dmv10-m{ border-collapse:collapse; margin:0 auto; font:600 .86rem/1.2 var(--mono); background:var(--paper); color:var(--ink); }
.dmv10-m th, .dmv10-m td{ border:1px solid var(--line); padding:3px 3px; text-align:center; vertical-align:middle; min-width:1.5em; }
.dmv10-m th{ background:var(--paper-2); font-size:.8rem; }
.dmv10-m .dmv10-tap{ cursor:pointer; }
.dmv10-m td.z{ color:var(--graphite); font-weight:400; }
.dmv10-m td.o{ color:var(--fig-k); font-weight:700; }
.dmv10-m .hl{ background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); }
.dmv10-m th.hl{ background:color-mix(in srgb, var(--fig-k) 28%, var(--paper-2)); }
.dmv10-m .cur{ box-shadow:inset 0 0 0 2px var(--fig-k); }
.dmv10-m .ok{ background:color-mix(in srgb, var(--ok) 22%, var(--paper)); }
.dmv10-m .bad{ background:color-mix(in srgb, var(--pen) 22%, var(--paper)); }
.dmv10-m .blk{ background:color-mix(in srgb, var(--fig-k) 11%, var(--paper)); }
.dmv10-m tr.gone td, .dmv10-m tr.gone th{ opacity:.38; text-decoration:line-through; }
.dmv10-m td.gone, .dmv10-m th.gone{ opacity:.38; }
.dmv10-m .sep{ border-left:3px double var(--graphite); }
.dmv10-m .x{ color:var(--graphite); font-weight:700; background:var(--paper-2); }
.dmv10-m tr.ft td, .dmv10-m tr.ft th{ border-top:2px solid var(--graphite); }
.dmv10-two{ display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:4px 8px; align-items:start; }
.dmv10-pair{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; max-width:420px; margin:0 auto; }
.dmv10-pair .dmv10-gr{ margin:0; }
.dmv10-chips{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; align-items:center; margin:6px 0; }
.dmv10-chips .fig-btn{ font:600 .86rem var(--body); padding:3px 8px; min-height:30px; }
.dmv10-lbl{ font-size:.84rem; color:var(--graphite); font-weight:600; }
.dmv10-seq{ text-align:center; font:600 .92rem/1.6 var(--mono); margin:4px 0 6px; overflow-wrap:anywhere; }
.dmv10-seq .on{ color:var(--fig-k); } .dmv10-seq .dim{ opacity:.35; }
.dmv10-ver{ text-align:center; font-weight:700; margin:6px 0 0; font-size:.92rem; }
.dmv10-ver.ok{ color:var(--ok); } .dmv10-ver.bad{ color:var(--pen); }
.dmv10-thumbs{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:6px; max-width:340px; margin:6px auto 0; }
.dmv10-thumbs svg{ width:100%; height:auto; border:1px solid var(--line); border-radius:8px; background:var(--paper); display:block; }
.dmv10-th{ fill:none; stroke:var(--line); stroke-width:6; } .dmv10-th.on{ stroke:var(--fig-k); stroke-width:14; }
.dmv10-thv{ fill:var(--ink); }
.dmv10-list{ font:600 .86rem/1.55 var(--mono); text-align:center; margin:4px 0; }
.dmv10-hint{ text-align:center; font-size:.84rem; color:var(--graphite); margin:4px 0; }
.dmv10-sbar{ font:600 .84rem var(--mono); color:var(--graphite); }
`;
  if (!document.getElementById('dmv10-css')) { const s = document.createElement('style'); s.id = 'dmv10-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = s => `<span class="ltr">${s}</span>`, B = s => `<bdi dir="ltr">${String(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const MI = '−', fmt = v => v == null ? '' : typeof v === 'string' ? v : v < 0 ? MI + (-v) : String(v);
  const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶'];
  const set = a => '{' + a.join(', ') + '}';
  const Modes = ({ list, mode, set: f }) => html`<div className="dmv10-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => f(k)}>${t}</button>`)}</div>`;

  // step walker that jumps to the full result when key changes
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setPlay(false); setI(n - 1); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => Math.min(x + 1, n - 1)), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); }, end: () => { setPlay(false); setI(n - 1); } }];
  }
  const WBar = ({ n, i, ctl, extra }) => html`<div className="fig-bar"><span className="dmv10-sbar">${i + 1} / ${n}</span><span className="grow"></span>${extra || null}
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i === n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;

  /* ───────── graphs and matrices ───────── */
  const V_ = (n, x, y) => ({ n, x, y });
  const E_ = (n, a, b, bend = 0, lx, ly) => ({ n, a, b, bend, lx, ly });
  // Fig. 10.1(a) = Fig. 10.3 G1 = Fig. 10.10 (edges as in the slides' A(G1))
  const G1 = { w: 300, h: 188, V: [V_('v1', 105, 158), V_('v2', 105, 48), V_('v3', 20, 48), V_('v4', 205, 48), V_('v5', 205, 158), V_('v6', 280, 48)],
    E: [E_('e1', 3, 5, -36, 242, 18), E_('e2', 3, 5, 36, 242, 79), E_('e3', 3, 4, 0, 220, 104), E_('e4', 0, 4, 0, 155, 177), E_('e5', 1, 3, 0, 155, 37), E_('e6', 0, 1, 0, 90, 104), E_('e7', 1, 4, 0, 167, 93), E_('e8', 2, 1, 0, 62, 37)] };
  // Fig. 10.2
  const G2 = { w: 300, h: 180, V: [V_('v1', 50, 30), V_('v2', 250, 30), V_('v3', 250, 150), V_('v4', 50, 150)],
    E: [E_('e1', 0, 1, 0, 150, 17), E_('e2', 1, 2, 0, 268, 90), E_('e3', 2, 3, 0, 150, 167), E_('e4', 0, 3, 0, 32, 90), E_('e5', 1, 3, 0, 136, 78)] };
  G2.E[4].st = 54; // e5's +/− sit further along the diagonal, clear of e1 and e3's marks
  // Fig. 10.13
  const G13 = { w: 300, h: 150, V: [V_('v1', 18, 40), V_('v2', 110, 40), V_('v3', 200, 40), V_('v4', 155, 126), V_('v5', 282, 40)],
    E: [E_('e1', 0, 1, 0, 64, 25), E_('e2', 1, 2, 0, 155, 25), E_('e3', 2, 3, 0, 193, 90), E_('e4', 3, 1, 0, 117, 90), E_('e5', 2, 4, 0, 241, 25)] };
  // the worked example: triangle
  const G3 = { w: 300, h: 182, V: [V_('v1', 150, 26), V_('v2', 250, 152), V_('v3', 50, 152)],
    E: [E_('e1', 0, 1, 0, 215, 80), E_('e2', 1, 2, 0, 150, 169), E_('e3', 0, 2, 0, 85, 80)] };

  function geo(G, e) {
    const A = G.V[e.a], Z = G.V[e.b], mx = (A.x + Z.x) / 2, my = (A.y + Z.y) / 2, dx = Z.x - A.x, dy = Z.y - A.y, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
    const d = e.bend ? `M${A.x},${A.y} Q${mx + nx * e.bend},${my + ny * e.bend} ${Z.x},${Z.y}` : `M${A.x},${A.y} L${Z.x},${Z.y}`;
    return { d, px: mx + nx * e.bend / 2, py: my + ny * e.bend / 2, nx, ny };
  }
  // graph from vertex positions and [a, b] pairs (a < b): parallel edges bend apart, labels pushed away from the centre
  function mkG(pos, ed, cx = 150, cy = 100, w = 300, h = 190) {
    const cnt = {}, G = { w, h, V: pos.map(([x, y], i) => V_('v' + (i + 1), x, y)), E: [] };
    ed.forEach(([a, b], j) => { const k = a + '-' + b, c = cnt[k] = (cnt[k] || 0) + 1; G.E.push(E_('e' + (j + 1), a, b, [0, 30, -30, 58, -58, 84, -84, 110][c - 1] || 0)); });
    G.E.forEach(e => { const g = geo(G, e); let dx, dy; if (e.bend) { dx = g.nx * Math.sign(e.bend); dy = g.ny * Math.sign(e.bend); } else { dx = g.px - cx; dy = g.py - cy; const l = Math.hypot(dx, dy); if (l < 6) { dx = g.nx; dy = g.ny; } else { dx /= l; dy /= l; } } e.lx = g.px + dx * 12; e.ly = g.py + dy * 12; });
    return G;
  }
  function Gr({ G, ec, vc, onE, onV, sg, lab, dots, big }) {
    return html`<svg className="dmv10-gr" viewBox=${'0 0 ' + G.w + ' ' + G.h} role="img" aria-label=${lab || 'Graph'}>
      ${G.E.map((e, j) => { const g = geo(G, e); return html`<g key=${'e' + j} className=${'dmv10-e ' + ((ec && ec(j)) || '')}>
        <path d=${g.d} className="dmv10-ln" />
        ${onE ? html`<path d=${g.d} className="dmv10-hit" onClick=${() => onE(j)} />` : null}
        ${e.lx != null ? html`<text className=${'dmv10-el' + (big ? ' dmv10-big' : '')} x=${e.lx} y=${e.ly} textAnchor="middle" dominantBaseline="central" style=${onE ? { cursor: 'pointer' } : null} onClick=${onE ? () => onE(j) : null}>${e.n}</text>` : null}</g>`; })}
      ${sg ? G.E.map((e, j) => { if (sg[j] == null) return null; const g = geo(G, e); return [e.a, e.b].map(p => { const P = G.V[p], O = G.V[p === e.a ? e.b : e.a], l = Math.hypot(O.x - P.x, O.y - P.y), t = (e.st || 32) / l;
        return html`<text key=${'s' + j + '-' + p} className=${'dmv10-sg ' + (p === sg[j] ? 'p' : 'm')} x=${P.x + (O.x - P.x) * t + g.nx * 11} y=${P.y + (O.y - P.y) * t + g.ny * 11} textAnchor="middle" dominantBaseline="central">${p === sg[j] ? '+' : MI}</text>`; }); }) : null}
      ${G.V.map((v, i) => html`<g key=${'v' + i} className=${'dmv10-v ' + ((vc && vc(i)) || '') + (onV ? ' dmv10-tap' : '') + (dots ? ' dmv10-dot' : '')} onClick=${onV ? () => onV(i) : null}>
        <circle cx=${v.x} cy=${v.y} r=${dots ? 5 : 13} />${dots ? null : html`<text x=${v.x} y=${v.y} textAnchor="middle" dominantBaseline="central">${v.n}</text>`}</g>`)}
    </svg>`;
  }
  // v(i, j): value (null = not filled yet); c(i, j): cell class; rc(i): row class; cc(j): column-head class
  function Mat({ rl, cl, v, c, rc, cc, onR, onC, onX, sep, ex, ft, ti }) {
    const cell = (x, extra) => [x == null || x === '' ? '' : x === 0 ? 'z' : 'o'].concat(extra).filter(Boolean).join(' ');
    return html`<div className="dmv10-mw">${ti ? html`<div className="dmv10-mt" dangerouslySetInnerHTML=${{ __html: ti }}></div>` : null}
      <table className="dmv10-m"><thead><tr><th></th>${cl.map((h, j) => html`<th key=${j} className=${[cc && cc(j), sep === j && 'sep', onC && 'dmv10-tap'].filter(Boolean).join(' ')} onClick=${onC ? () => onC(j) : null}>${h}</th>`)}${ex ? html`<th className="x">${ex.h}</th>` : null}</tr></thead>
      <tbody>${rl.map((r, i) => html`<tr key=${i} className=${(rc && rc(i)) || ''}><th className=${onR ? 'dmv10-tap' : ''} onClick=${onR ? () => onR(i) : null}>${r}</th>${cl.map((_, j) => { const x = v(i, j); return html`<td key=${j} className=${cell(x, [c && c(i, j), sep === j && 'sep', onX && 'dmv10-tap'])} onClick=${onX ? () => onX(i, j) : null}>${fmt(x)}</td>`; })}${ex ? html`<td className="x">${ex.v(i)}</td>` : null}</tr>`)}
      ${(ft || []).map((f, k) => html`<tr key=${'f' + k} className="ft"><th>${f.h}</th>${cl.map((_, j) => { const x = f.v(j); return html`<td key=${j} className=${cell(x, [f.c && f.c(j), sep === j && 'sep'])}>${fmt(x)}</td>`; })}${ex ? html`<td className="x"></td>` : null}</tr>`)}
      </tbody></table></div>`;
  }
  const Thumbs = ({ G, trees }) => html`<div className="dmv10-thumbs">${trees.map((t, k) => html`<svg key=${k} viewBox=${'0 0 ' + G.w + ' ' + G.h} aria-hidden="true">${G.E.map((e, j) => html`<path key=${j} d=${geo(G, e).d} className=${'dmv10-th' + (t.includes(j) ? ' on' : '')} />`)}${G.V.map((v, i) => html`<circle key=${'c' + i} cx=${v.x} cy=${v.y} r="17" className="dmv10-thv" />`)}</svg>`)}</div>`;

  const incOf = G => G.V.map((_, i) => G.E.map(e => e.a === i || e.b === i ? 1 : 0));
  const rowSum = M => M.map(r => r.reduce((s, x) => s + x, 0));
  const pairs = G => G.E.map(e => [e.a, e.b]);
  function comps(n, E) {
    const p = [...Array(n).keys()], f = x => p[x] === x ? x : (p[x] = f(p[x]));
    E.forEach(([a, b]) => { p[f(a)] = f(b); });
    const ids = new Map(), c = [];
    for (let i = 0; i < n; i++) { const r = f(i); if (!ids.has(r)) ids.set(r, ids.size); c.push(ids.get(r)); }
    return { c, k: ids.size };
  }
  const mul = (P, Q) => P.map(r => Q[0].map((_, j) => r.reduce((s, x, k) => s + x * Q[k][j], 0)));
  const tr = M => M.length ? M[0].map((_, j) => M.map(r => r[j])) : [];
  function rank2(M) {
    const R = M.map(r => r.map(x => ((x % 2) + 2) % 2)); let rk = 0; const w = R.length ? R[0].length : 0;
    for (let c = 0; c < w && rk < R.length; c++) {
      let p = -1; for (let r = rk; r < R.length; r++) if (R[r][c]) { p = r; break; }
      if (p < 0) continue; [R[rk], R[p]] = [R[p], R[rk]];
      for (let r = 0; r < R.length; r++) if (r !== rk && R[r][c]) R[r] = R[r].map((x, k) => x ^ R[rk][k]);
      rk++;
    }
    return rk;
  }
  function rankR(M) {
    const R = M.map(r => r.slice()); let rk = 0; const w = R.length ? R[0].length : 0;
    for (let c = 0; c < w && rk < R.length; c++) {
      let p = -1, best = 1e-9; for (let r = rk; r < R.length; r++) if (Math.abs(R[r][c]) > best) { best = Math.abs(R[r][c]); p = r; }
      if (p < 0) continue; [R[rk], R[p]] = [R[p], R[rk]];
      for (let r = 0; r < R.length; r++) if (r !== rk) { const f = R[r][c] / R[rk][c]; if (f) R[r] = R[r].map((x, k) => x - f * R[rk][k]); }
      rk++;
    }
    return rk;
  }
  function detI(M) { // Bareiss, exact for integers
    const n = M.length; if (!n) return 1; const A = M.map(r => r.slice()); let sign = 1, prev = 1;
    for (let k = 0; k < n - 1; k++) {
      if (A[k][k] === 0) { let s = -1; for (let r = k + 1; r < n; r++) if (A[r][k] !== 0) { s = r; break; } if (s < 0) return 0; [A[k], A[s]] = [A[s], A[k]]; sign = -sign; }
      for (let i = k + 1; i < n; i++) for (let j = k + 1; j < n; j++) A[i][j] = (A[i][j] * A[k][k] - A[i][k] * A[k][j]) / prev;
      prev = A[k][k];
    }
    return sign * A[n - 1][n - 1];
  }
  const isTree = (n, E) => E.length === n - 1 && comps(n, E).k === 1;
  function spanTrees(n, E, idx) { // idx: edge indices allowed
    const out = [], pick = [];
    (function go(s) { if (pick.length === n - 1) { if (isTree(n, pick.map(j => E[j]))) out.push(pick.slice()); return; } for (let t = s; t < idx.length; t++) { pick.push(idx[t]); go(t + 1); pick.pop(); } })(0);
    return out;
  }
  function pathsOf(G, u, v) {
    const out = [], vis = new Set([u]), es = [];
    (function go(x) { if (x === v) { out.push(es.slice()); return; } G.E.forEach((e, j) => { const y = e.a === x ? e.b : e.b === x ? e.a : -1; if (y < 0 || vis.has(y)) return; vis.add(y); es.push(j); go(y); es.pop(); vis.delete(y); }); })(u);
    return out.map((p, k) => [p, k]).sort((a, b) => a[0].length - b[0].length || a[1] - b[1]).map(x => x[0]);
  }
  const cutOf = (G, S) => G.E.map((e, j) => S.includes(e.a) !== S.includes(e.b) ? j : -1).filter(j => j >= 0);
  const en = (G, js) => js.map(j => G.E[j].n);
  const vn = (G, is) => is.map(i => G.V[i].n);

  /* ── 10.1: A(G1) built edge by edge (Fig. 10.1) ── */
  function IncBuild({ ar }) {
    const G = G1, A = incOf(G), D = rowSum(A), n = 10;
    const [i, ctl] = useWalk(n, 1500);
    const [sel, setSel] = useState(null);
    const go = k => { setSel(null); ctl.go(k); };
    const pick = s => { setSel(s); ctl.end(); };
    const done = i === n - 1, col = i >= 1 && i <= 8 ? i - 1 : -1, filled = j => i >= 9 || j < i;
    let hv = [], he = [];
    if (sel && sel.t === 'e') { he = [sel.k]; hv = [G.E[sel.k].a, G.E[sel.k].b]; }
    else if (sel) { hv = [sel.k]; he = G.E.map((e, j) => e.a === sel.k || e.b === sel.k ? j : -1).filter(j => j >= 0); }
    else if (col >= 0) { he = [col]; hv = [G.E[col].a, G.E[col].b]; }
    let cap;
    if (sel && sel.t === 'v') { const v = G.V[sel.k].n, es = en(G, he);
      cap = { en: `Row <b>${v}</b> has 1s under ${set(es)}, so ${v} has degree <b>${D[sel.k]}</b>.`, ar: `الـ row بتاع <b>${v}</b> فيه 1 تحت ${B(set(es))}، فالـ degree بتاع ${v} هو <b>${D[sel.k]}</b>.` }; }
    else if (sel) { const e = G.E[sel.k], a = G.V[e.a].n, b = G.V[e.b].n, par = sel.k < 2;
      cap = { en: `Column <b>${e.n}</b> has 1s in rows ${a} and ${b}, the two ends of ${e.n}.` + (par ? ' e1 and e2 are parallel edges, so their columns are identical.' : ''),
        ar: `الـ column بتاع <b>${e.n}</b> فيه 1 في الـ rows بتوع ${a} و ${b}، ودول طرفين الـ ${e.n}.` + (par ? ' والـ e1 والـ e2 دول parallel edges، فالـ columns بتوعهم متطابقة.' : '') }; }
    else if (i === 0) cap = { en: 'G1 of Fig. 10.1 has n = 6 vertices, m = 8 edges and no self-loops, so A(G1) is 6 × 8: one row per vertex, one column per edge.', ar: `الـ G1 اللي في ${B('Fig. 10.1')} فيه 6 vertices و 8 edges ومفيهوش self-loops، فالـ ${B('A(G1)')} حجمها ${B('6 × 8')}، يعني row لكل vertex و column لكل edge.` };
    else if (col >= 0) { const e = G.E[col], a = G.V[e.a].n, b = G.V[e.b].n;
      cap = { en: `<b>${e.n}</b> joins ${a} and ${b}: column ${e.n} gets 1 in rows ${a} and ${b}, and 0 in the other four rows.` + (col === 1 ? ' e1 and e2 both join v4 and v6 (parallel edges), so their columns are identical.' : ''),
        ar: `الـ <b>${e.n}</b> بيوصل بين ${a} و ${b}، فالـ column بتاع ${e.n} بياخد 1 في الـ rows بتوع ${a} و ${b}، و 0 في الـ 4 rows التانيين.` + (col === 1 ? ' والـ e1 والـ e2 الاتنين بيوصلوا بين v4 و v6 (parallel edges)، فالـ columns بتوعهم متطابقة.' : '') }; }
    else cap = { en: 'Done. Every column has exactly two 1s (an edge has two ends). The number of 1s in a row is the degree of that vertex: v2 and v4 have degree 4, v3 only 1. Tap a vertex, an edge, a row or a column.', ar: 'خلصنا. كل column فيه 1 مرتين بالظبط (لأن الـ edge ليه طرفين). وعدد الـ 1 في الـ row هو الـ degree بتاع الـ vertex ده، فالـ v2 والـ v4 الـ degree بتاعهم 4، والـ v3 بس 1. دوس على أي vertex أو edge أو row أو column.' };
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Gr} G=${G} lab="Graph G1 of Fig. 10.1" ec=${j => he.includes(j) ? 'on' : (he.length ? 'dim' : '')} vc=${k => hv.includes(k) ? 'on' : ''} onE=${j => pick({ t: 'e', k: j })} onV=${k => pick({ t: 'v', k })} />
      <${Mat} ti="A(G1)" rl=${G.V.map(v => v.n)} cl=${G.E.map(e => e.n)} v=${(r, j) => filled(j) ? A[r][j] : null}
        c=${(r, j) => (sel && sel.t === 'v' && r === sel.k) || (he.includes(j) && hv.includes(r)) ? 'hl' : ''}
        cc=${j => he.includes(j) ? 'hl' : ''} onR=${r => pick({ t: 'v', k: r })} onC=${j => pick({ t: 'e', k: j })}
        ex=${done ? { h: 'deg', v: r => D[r] } : null} />
    </div></div>
      <${Cap} ...${cap} showAr=${ar} /><${WBar} n=${n} i=${i} ctl=${{ ...ctl, go, replay: () => { setSel(null); ctl.replay(); } }} /></figure>`;
  }

  /* ── 10.1–10.2: try your own graph: observations and rank n − k ── */
  const PENT = [[150, 24], [226, 79], [197, 166], [103, 166], [74, 79]];
  const START5 = [[0, 1], [1, 2], [2, 3], [0, 3], [1, 3]];
  function IncTry({ ar }) {
    const [ed, setEd] = useState(START5), [pend, setPend] = useState(null), [blk, setBlk] = useState(false), [full, setFull] = useState(false);
    const n = 5, G = mkG(PENT, ed), A = incOf(G), D = rowSum(A), m = ed.length;
    const { c: cid, k } = comps(n, ed), r2 = m ? rank2(A) : 0;
    const iso = D.map((d, i) => d === 0 ? i : -1).filter(i => i >= 0);
    const par = []; ed.forEach(([a, b], j) => { const f = ed.findIndex(([x, y]) => x === a && y === b); if (f !== j) { const g = par.find(p => p[0] === f); g ? g.push(j) : par.push([f, j]); } });
    const parCols = par.flat();
    const vo = [...Array(n).keys()], eo = [...Array(m).keys()];
    if (blk) { vo.sort((x, y) => cid[x] - cid[y] || x - y); eo.sort((x, y) => cid[ed[x][0]] - cid[ed[y][0]] || x - y); }
    const tapV = i => { setFull(false); if (pend == null) setPend(i); else if (pend === i) setPend(null); else { if (m >= 8) { setFull(true); setPend(null); return; } const a = Math.min(pend, i), b = Math.max(pend, i); setEd(e => e.concat([[a, b]])); setPend(null); } };
    const tapE = j => { setFull(false); setPend(null); setEd(e => e.filter((_, q) => q !== j)); };
    const E = [], R = [];
    if (!m) { E.push('No edges yet, so A has no columns.'); R.push('لسه مفيش edges، فالـ A مفيهاش columns.'); }
    else { E.push(`Every column has exactly two 1s, and the Σ row (all rows added mod 2) is all 0, so the rows are dependent: rank A ≤ n − 1 = 4.`);
      R.push(`كل column فيه 1 مرتين بالظبط، والـ row اللي اسمه Σ (مجموع كل الـ rows بالـ mod 2) كله أصفار، فالـ rows دي dependent، و ${B('rank A ≤ n − 1 = 4')}.`); }
    iso.forEach(i => { const v = G.V[i].n; E.push(`Row ${v} is all zeros: ${v} is an isolated vertex.`); R.push(`الـ row بتاع ${v} كله أصفار، يعني ${v} ده isolated vertex.`); });
    par.forEach(p => { const s = p.map(j => 'e' + (j + 1)); E.push(`Columns ${s.join(' and ')} are identical: parallel edges.`); R.push(`الـ columns بتوع ${s.join(' و ')} متطابقة، يعني parallel edges.`); });
    E.push(`${k === 1 ? 'G is connected' : `G has k = ${k} components`}: rank A = n − k = 5 − ${k} = ${5 - k}${m ? `, and row reduction mod 2 gives ${r2} too` : ''}.`);
    R.push(`${k === 1 ? 'الـ G ده connected' : `الـ G فيه ${B('k = ' + k)} components`}، فـ` + L(`rank A = n − k = 5 − ${k} = ${5 - k}`) + (m ? `والـ row reduction بالـ mod 2 بيطلّع ${r2} برضه.` : 'ومفيش edges أصلًا.'));
    if (blk && k > 1) { E.push('Rows and columns are reordered by component, so A is block diagonal [A(G₁) 0; 0 A(G₂)]: reordering only relabels vertices and edges.'); R.push('رتّبنا الـ rows والـ columns حسب الـ component، فالـ A بقت block diagonal، وإعادة الترتيب دي مجرد إعادة تسمية للـ vertices والـ edges.'); }
    if (full) { E.push('At most 8 edges here.'); R.push('هنا أقصى حاجة 8 edges.'); }
    E.push(pend != null ? `Now tap the other end of the new edge (from ${G.V[pend].n}).` : 'Tap two vertices to add an edge between them; tap an edge to delete it.');
    R.push(pend != null ? `دوس على الطرف التاني للـ edge الجديد (اللي طالع من ${G.V[pend].n}).` : 'دوس على 2 vertices عشان تضيف edge بينهم، ودوس على أي edge عشان تمسحه.');
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Gr} G=${G} lab="Your graph on five vertices" onE=${tapE} onV=${tapV} ec=${j => parCols.includes(j) ? 'on' : ''} vc=${i => i === pend ? 'sel' : iso.includes(i) ? 'sb' : ''} />
      ${m ? html`<${Mat} ti="A(G)" rl=${vo.map(i => G.V[i].n)} cl=${eo.map(j => 'e' + (j + 1))} v=${(r, c) => A[vo[r]][eo[c]]}
        c=${(r, c) => blk && k > 1 && cid[vo[r]] === cid[ed[eo[c]][0]] ? 'blk' : ''} rc=${r => iso.includes(vo[r]) ? 'bad' : ''} cc=${c => parCols.includes(eo[c]) ? 'hl' : ''}
        ex=${{ h: 'deg', v: r => D[vo[r]] }} ft=${[{ h: 'Σ', v: c => A.reduce((s, row) => s + row[eo[c]], 0) % 2 }]} />` : null}
      <div className="dmv10-chips"><button className="fig-btn" onClick=${() => { setEd(START5); setPend(null); setFull(false); }}>Start graph</button>
        <button className="fig-btn" aria-pressed=${String(blk)} onClick=${() => setBlk(b => !b)}>Group by component</button>
        <button className="fig-btn" onClick=${() => { setEd([]); setPend(null); setFull(false); }}>Clear</button></div>
    </div></div>
      <${Cap} en=${E.join('<br>')} ar=${R.join('<br>')} showAr=${ar} /></figure>`;
  }

  /* ── Theorems 10.3, 10.4: reduced incidence matrix, (n − 1) × (n − 1) submatrices and spanning trees (Fig. 10.2's graph) ── */
  function IncTree({ ar }) {
    const G = G2, A = incOf(G);
    const [ref, setRef] = useState(3), [ch, setCh] = useState([0, 1, 2]);
    const tog = j => setCh(c => c.includes(j) ? c.filter(x => x !== j) : c.concat(j).sort((a, b) => a - b));
    const rows = [0, 1, 2, 3].filter(r => r !== ref), vr = G.V[ref].n;
    const ok3 = ch.length === 3, sub = rows.map(r => ch.map(j => A[r][j]));
    const det = ok3 ? (rank2(sub) === 3 ? 1 : 0) : null, tree = ok3 && isTree(4, ch.map(j => [G.E[j].a, G.E[j].b]));
    const S = set(en(G, ch));
    let cap;
    const head = { en: `Reference vertex <b>${vr}</b>: deleting its row leaves the reduced incidence matrix A_f (3 × 5). Nothing is lost: wherever a column has a single 1 left, its second 1 belongs to ${vr} (the bottom row rebuilds it).`,
      ar: `الـ reference vertex هو <b>${vr}</b>، ولما نمسح الـ row بتاعه بتفضل الـ reduced incidence matrix ${B('A_f')} بحجم ${B('3 × 5')}. ومفيش حاجة بتضيع، لأن أي column فاضل فيه 1 واحد بس، الـ 1 التاني بتاعه بيبقى عند ${vr} (الـ row اللي تحت بيبنيه تاني).` };
    if (!ok3) cap = { en: head.en + ` Pick exactly n − 1 = 3 edges (now ${ch.length}).`, ar: head.ar + ` اختار ${B('n − 1 = 3')} edges بالظبط (دلوقتي ${ch.length}).` };
    else cap = { en: head.en + ` Columns ${S}: the 3 × 3 submatrix has det = ${det} (mod 2), so it is <b>${det ? 'non-singular' : 'singular'}</b>, and ${S} ${tree ? 'is a spanning tree (Theorem 10.4; it is that tree’s reduced incidence matrix, Theorem 10.3)' : 'is not a spanning tree: it has a cycle'}. Tap a vertex to change the reference vertex; tap edges to pick others.`,
      ar: head.ar + ` والـ columns ${B(S)} بتدّي submatrix حجمها ${B('3 × 3')} والـ determinant بتاعها بالـ mod 2 هو ${det}، يعني هي <b>${det ? 'non-singular' : 'singular'}</b>، ${tree ? 'والـ edges دول spanning tree (Theorem 10.4، وهي نفسها الـ reduced incidence matrix بتاعة الـ tree ده، Theorem 10.3)' : 'والـ edges دول مش spanning tree لأن فيهم cycle'}. دوس على أي vertex عشان تغيّر الـ reference vertex، ودوس على الـ edges عشان تختار غيرهم.` };
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Gr} G=${G} lab="Graph of Fig. 10.2" ec=${j => ch.includes(j) ? (ok3 ? (tree ? 'tr' : 'cut') : 'on') : 'dim'} vc=${k => k === ref ? 'ref' : ''} onE=${tog} onV=${setRef} />
      <${Mat} ti=${'A_f: row ' + vr + ' deleted'} rl=${G.V.map(v => v.n)} cl=${G.E.map(e => e.n)} v=${(r, j) => A[r][j]} rc=${r => r === ref ? 'gone' : ''}
        c=${(r, j) => ch.includes(j) && r !== ref ? 'hl' : ''} cc=${j => ch.includes(j) ? 'hl' : ''} onC=${tog} onR=${setRef}
        ft=${[{ h: vr, v: j => rows.reduce((s, r) => s + A[r][j], 0) % 2, c: () => 'ok' }]} />
      ${ok3 ? html`<${Mat} ti=${'columns ' + S} rl=${vn(G, rows)} cl=${en(G, ch)} v=${(r, j) => sub[r][j]} />
        <p className=${'dmv10-ver ' + (det ? 'ok' : 'bad')}>det = ${det} (mod 2) · ${tree ? 'spanning tree ✓' : 'not a tree ✗'}</p>` : html`<p className="dmv10-hint">Pick 3 edges (now ${ch.length})</p>`}
    </div></div>
      <${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── F from A (Fig. 10.2), any orientation ── */
  const POS0 = [0, 1, 2, 0, 1];
  function IncOriented({ ar }) {
    const G = G2, A = incOf(G), n = 7;
    const [pos, setPos] = useState(POS0), [last, setLast] = useState(null);
    const [i, ctl] = useWalk(n, 1600, pos.join());
    const F = A.map((r, v) => r.map((x, j) => x ? (v === pos[j] ? 1 : -1) : 0)), rk = rankR(F);
    const conv = j => i >= 6 || j < i, col = i >= 1 && i <= 5 ? i - 1 : -1;
    const flip = j => { setLast(j); setPos(p => p.map((x, q) => q === j ? (x === G.E[j].a ? G.E[j].b : G.E[j].a) : x)); };
    const hj = last != null && i === 6 ? last : col;
    let cap;
    if (i === 0) cap = { en: 'A of Fig. 10.2 (from the notes). To get F, give every edge an orientation: one end positive (+), the other negative (−).', ar: `دي الـ A بتاعة ${B('Fig. 10.2')} من الـ notes. وعشان نطلّع الـ F بندّي كل edge اتجاه، يعني طرف موجب ${B('+')} وطرف سالب ${B(MI)}.` };
    else if (col >= 0) { const e = G.E[col], p = G.V[pos[col]].n, q = G.V[pos[col] === e.a ? e.b : e.a].n;
      cap = { en: `<b>${e.n}</b> = (${p}, ${q}): ${p} is the positive end, so its 1 stays 1; ${q} is the negative end, so its 1 becomes −1.`, ar: `في الـ <b>${e.n}</b> الطرف الموجب هو ${p} فالـ 1 بتاعه بيفضل 1، والطرف السالب هو ${q} فالـ 1 بتاعه بيبقى ${B('−1')}.` }; }
    else if (last != null && pos.join() !== POS0.join()) { const e = G.E[last], p = G.V[pos[last]].n, q = G.V[pos[last] === e.a ? e.b : e.a].n;
      cap = { en: `Your orientation: ${e.n} now has +1 at ${p} and −1 at ${q}. F changed, but rank F is still ${rk} = n − 1: the theorems hold for any orientation.`, ar: `الاتجاه بتاعك: الـ ${e.n} بقى فيه ${B('+1')} عند ${p} و ${B('−1')} عند ${q}. الـ F اتغيرت، بس الـ rank F لسه ${B(rk + ' = n − 1')}، يعني الـ theorems بتمشي مع أي اتجاه.` }; }
    else cap = { en: `F is done: every column has one 1 and one −1, so it adds up to 0. G is connected, so rank F = n − 1 = ${rk} (Theorem 10.5). Tap an edge to swap its ends.`, ar: 'كده الـ F خلصت، وكل column فيه 1 واحد و ' + B('−1') + ' واحد، فمجموعه بـ 0. والـ G ده connected، فـ' + L(`rank F = n − 1 = ${rk}`) + 'وده Theorem 10.5. دوس على أي edge عشان تبدّل طرفينه.' };
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Gr} G=${G} lab="Graph of Fig. 10.2 with oriented edges" sg=${pos.map((p, j) => conv(j) ? p : null)} ec=${j => j === hj ? 'on' : ''} vc=${k => hj >= 0 && (G.E[hj].a === k || G.E[hj].b === k) ? 'on' : ''} onE=${flip} />
      <${Mat} ti=${i === 0 ? 'A' : i >= 6 ? 'F' : 'A → F'} rl=${G.V.map(v => v.n)} cl=${G.E.map(e => e.n)} v=${(r, j) => conv(j) ? F[r][j] : A[r][j]}
        c=${(r, j) => j === hj && A[r][j] ? 'hl' : ''} cc=${j => j === hj ? 'hl' : ''} onC=${flip} />
      <div className="dmv10-chips"><button className="fig-btn" onClick=${() => { setLast(null); setPos(POS0); }} disabled=${pos.join() === POS0.join()}>Example from the notes</button></div>
    </div></div>
      <${Cap} ...${cap} showAr=${ar} /><${WBar} n=${n} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 10.3: B(G1) row by row, then the rank and A Bᵀ ≡ 0 (Fig. 10.3) ── */
  const ZC = [[0, 1], [2, 4, 6], [3, 5, 6], [2, 3, 4, 5]];
  function CycBuild({ ar }) {
    const G = G1, A = incOf(G), n = 8, Bm = ZC.map(z => G.E.map((_, j) => z.includes(j) ? 1 : 0));
    const [i, ctl] = useWalk(n, 1700);
    const [sel, setSel] = useState(null);
    const go = k => { setSel(null); ctl.go(k); };
    const AB = mul(A, tr(Bm)), rk = rank2(Bm), ring = Bm[1].map((x, j) => (x + Bm[2][j]) % 2);
    const row = sel != null ? sel : i >= 1 && i <= 4 ? i - 1 : -1;
    let he = row >= 0 ? ZC[row] : i === 6 ? [2, 3, 4, 5] : [];
    const hv = [...new Set(he.flatMap(j => [G.E[j].a, G.E[j].b]))];
    let cap;
    if (sel != null) { const z = ZC[sel]; cap = { en: `Z${sel + 1} = ${set(en(G, z))}: ${z.length} edges, so ${z.length} ones in its row.`, ar: `الـ ${B('Z' + (sel + 1))} هو ${B(set(en(G, z)))}، يعني ${z.length} edges، وعشان كده فيه ${z.length} وحايد في الـ row بتاعه.` }; }
    else if (i === 0) cap = { en: 'G1 of Fig. 10.3 has m = 8 edges and q = 4 different cycles, so B(G1) is 4 × 8: one row per cycle, one column per edge.', ar: `الـ G1 اللي في ${B('Fig. 10.3')} فيه 8 edges و 4 cycles مختلفة، فالـ ${B('B(G1)')} حجمها ${B('4 × 8')}، يعني row لكل cycle و column لكل edge.` };
    else if (i <= 4) { const z = ZC[i - 1]; cap = { en: `Z${i} = ${set(en(G, z))}: 1 under these ${z.length} edges, 0 elsewhere.`, ar: `الـ ${B('Z' + i)} هو ${B(set(en(G, z)))}، فبنحط 1 تحت الـ ${z.length} edges دول و 0 في الباقي.` }; }
    else if (i === 5) cap = { en: 'Column e8 is all zeros: e8 is a non-cycle edge (no cycle uses it). The 1s in a row count the edges of that cycle: 2, 3, 3, 4. Tap a row to see its cycle.', ar: 'الـ column بتاع e8 كله أصفار، يعني e8 ده non-cycle edge (مفيش cycle بيعدي عليه). وعدد الـ 1 في كل row هو عدد الـ edges في الـ cycle بتاعه، يعني 2 و 3 و 3 و 4. دوس على أي row عشان تشوف الـ cycle بتاعه.' };
    else if (i === 6) cap = { en: `Add Z2 and Z3 mod 2: e7 cancels and Z2 ⊕ Z3 = {e3, e4, e5, e6} = Z4. So only ${rk} rows are independent: rank B = m − n + 1 = 8 − 6 + 1 = ${rk} (Theorem 10.10).`, ar: 'لو جمعنا الـ Z2 والـ Z3 بالـ mod 2 الـ e7 بيروح، والناتج بيطلع كده:' + L('Z2 ⊕ Z3 = {e3, e4, e5, e6} = Z4') + `يعني فيه ${rk} rows بس independent، والـ rank بيطلع:` + L(`rank B = m − n + 1 = 8 − 6 + 1 = ${rk}`) + 'وده Theorem 10.10.' };
    else cap = { en: 'A Bᵀ counts, for each vertex and each cycle, the cycle’s edges at that vertex: always 0 or 2. So A Bᵀ ≡ 0 (mod 2) (Theorem 10.9).', ar: `الـ ${B('A Bᵀ')} بتعدّ لكل vertex وكل cycle عدد edges الـ cycle اللي عند الـ vertex ده، ودايمًا بيطلع 0 أو 2، فـ` + L('A Bᵀ ≡ 0 (mod 2)') + 'وده Theorem 10.9.' };
    const filled = r => i >= 5 || r < i;
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Gr} G=${G} lab="Graph G1 of Fig. 10.3" ec=${j => he.includes(j) ? 'on' : (i === 5 && sel == null && j === 7 ? 'cut' : he.length ? 'dim' : '')} vc=${k => hv.includes(k) ? 'on' : ''} />
      <${Mat} ti="B(G1)" rl=${ZC.map((_, r) => 'Z' + (r + 1))} cl=${G.E.map(e => e.n)} v=${(r, j) => filled(r) ? Bm[r][j] : null}
        rc=${r => r === row || (i === 6 && sel == null && r >= 1) ? 'hl' : ''} c=${(r, j) => i === 5 && sel == null && j === 7 ? 'bad' : ''} onR=${r => { setSel(r); ctl.go(Math.max(i, 5)); }}
        ex=${i >= 5 ? { h: '1s', v: r => ZC[r].length } : null} ft=${i === 6 && sel == null ? [{ h: '⊕', v: j => ring[j], c: () => 'ok' }] : null} />
      ${i === 7 && sel == null ? html`<${Mat} ti="A Bᵀ (before mod 2)" rl=${G.V.map(v => v.n)} cl=${ZC.map((_, r) => 'Z' + (r + 1))} v=${(r, c) => AB[r][c]} c=${(r, c) => AB[r][c] ? 'ok' : ''} />` : null}
    </div></div>
      <${Cap} ...${cap} showAr=${ar} /><${WBar} n=${n} i=${i} ctl=${{ ...ctl, go, replay: () => { setSel(null); ctl.replay(); } }} /></figure>`;
  }

  /* ── Fig. 10.4: same cycle matrix, 2-isomorphic but not isomorphic ── */
  const P4 = [V_('T', 70, 20), V_('TR', 140, 20), V_('L', 16, 66), V_('BM', 70, 110), V_('BR', 140, 110)];
  const H4a = { w: 160, h: 130, V: P4, E: [E_('a', 2, 0, -16, 30, 28), E_('b', 2, 0, 16, 56, 58), E_('c', 0, 1, 0, 105, 9), E_('d', 0, 4, 0, 116, 56), E_('e', 1, 4, 0, 151, 65), E_('f', 2, 3, 0, 34, 97), E_('g', 3, 4, 0, 105, 121)] };
  const H4b = { w: 160, h: 130, V: P4, E: [E_('a', 2, 3, -16, 56, 73), E_('b', 2, 3, 16, 30, 104), E_('c', 0, 1, 0, 105, 9), E_('d', 0, 4, 0, 116, 56), E_('e', 1, 4, 0, 151, 65), E_('f', 2, 0, 0, 34, 35), E_('g', 3, 4, 0, 105, 121)] };
  const Z4 = [[0, 1], [2, 3, 4], [0, 3, 5, 6], [1, 3, 5, 6], [0, 2, 4, 5, 6], [1, 2, 4, 5, 6]];
  function Cyc2Iso({ ar }) {
    const n = 8, [i, ctl] = useWalk(n, 1700), Bm = Z4.map(z => [0, 1, 2, 3, 4, 5, 6].map(j => z.includes(j) ? 1 : 0));
    const degs = H => rowSum(incOf(H)).sort((a, b) => b - a).join(', '), r = i >= 1 && i <= 6 ? i - 1 : -1, he = r >= 0 ? Z4[r] : [];
    const hv = H => [...new Set(he.flatMap(j => [H.E[j].a, H.E[j].b]))];
    let cap;
    if (i === 0) cap = { en: 'Fig. 10.4: two graphs, their edges matched up as a to g (the letters are added here to pair the edges). The left graph has its two parallel edges at the top, the right one at the bottom.', ar: `دي ${B('Fig. 10.4')} وفيها 2 graphs، والـ edges بتوعهم متوصّلين ببعض بالحروف من a لـ g (الحروف دي متضافة هنا عشان نربط الـ edges ببعض). الـ graph الشمال الـ parallel edges بتوعه فوق، واللي على اليمين تحت.` };
    else if (r >= 0) { const s = set(Z4[r].map(j => 'abcdefg'[j])); cap = { en: `Z${i} = ${s}: a cycle in both graphs.`, ar: `الـ ${B('Z' + i)} هو ${B(s)}، وده cycle في الـ 2 graphs.` }; }
    else cap = { en: `The same 6 cycles, so the same cycle matrix: the graphs are 2-isomorphic. Yet they are not isomorphic: the degrees are ${degs(H4a)} on the left and ${degs(H4b)} on the right. So B does not specify a graph completely.`, ar: 'نفس الـ 6 cycles يعني نفس الـ cycle matrix، فالـ 2 graphs دول 2-isomorphic. بس هما مش isomorphic، لأن الـ degrees مختلفة:' + L(`left: ${degs(H4a)} · right: ${degs(H4b)}`) + 'وعشان كده الـ B مش بتحدد الـ graph بالكامل.' };
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <div className="dmv10-pair">
        <${Gr} G=${H4a} dots big lab="Left graph of Fig. 10.4" ec=${j => he.includes(j) ? 'on' : he.length ? 'dim' : ''} vc=${k => hv(H4a).includes(k) ? 'on' : ''} />
        <${Gr} G=${H4b} dots big lab="Right graph of Fig. 10.4" ec=${j => he.includes(j) ? 'on' : he.length ? 'dim' : ''} vc=${k => hv(H4b).includes(k) ? 'on' : ''} />
      </div>
      <${Mat} ti="B (both graphs)" rl=${Z4.map((_, k) => 'Z' + (k + 1))} cl=${'abcdefg'.split('')} v=${(k, j) => i >= 7 || k < i ? Bm[k][j] : null} rc=${k => k === r ? 'hl' : ''} />
    </div></div>
      <${Cap} ...${cap} showAr=${ar} /><${WBar} n=${n} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 10.4: C(G1) from the slides' cut-sets; your own cut ── */
  const CS = [[2], [5], [3, 5], [1, 2], [0, 4], [0], [4], [0, 1, 2]]; // the side each slide cut-set c1..c8 cuts off
  function CutBuild({ ar }) {
    const G = G1, A = incOf(G), n = 11, Cm = CS.map(S => { const c = cutOf(G, S); return G.E.map((_, j) => c.includes(j) ? 1 : 0); });
    const Bm = ZC.map(z => G.E.map((_, j) => z.includes(j) ? 1 : 0)), BC = mul(Bm, tr(Cm)), rk = rank2(Cm);
    const [mode, setMode] = useState('ex'), [S, setS] = useState([0, 1]);
    const [i, ctl] = useWalk(n, 1600);
    let body, cap, bar = null;
    if (mode === 'ex') {
      const r = i >= 1 && i <= 8 ? i - 1 : -1, cut = r >= 0 ? cutOf(G, CS[r]) : [];
      if (i === 0) cap = { en: 'The slides’ cut-sets of the same G1: removing a cut-set splits G1 into two pieces (and no smaller set does). C(G1) gets one row per cut-set (8) and one column per edge.', ar: `دي الـ cut-sets بتاعة نفس الـ G1 من الـ slides، ولما نشيل أي cut-set الـ G1 بيتقسم حتتين (ومفيش set أصغر منه بتعمل كده). والـ ${B('C(G1)')} فيها row لكل cut-set، يعني 8، و column لكل edge.` };
      else if (r >= 0) cap = { en: `c${i} = ${set(en(G, cut))}: it separates ${set(vn(G, CS[r]))} from the rest.`, ar: `الـ ${B('c' + i)} هو ${B(set(en(G, cut)))}، وبيفصل ${B(set(vn(G, CS[r])))} عن الباقي.` };
      else if (i === 9) cap = { en: `Rows c1, c2, c6, c7 each cut off one vertex (v3, v6, v1, v5): they are those vertices’ rows of A(G1). G1 is separable, so the rows of v2 and v4 are not cut-sets. rank C(G1) = ${rk} = n − 1 (Theorem 10.14).`, ar: `الـ rows ${B('c1, c2, c6, c7')} كل واحد فيهم بيعزل vertex واحد (${B('v3, v6, v1, v5')})، فهما نفس الـ rows بتوع الـ vertices دول في الـ ${B('A(G1)')}. والـ G1 ده separable، فالـ rows بتوع v2 و v4 مش cut-sets. والـ rank بيطلع:` + L(`rank C(G1) = ${rk} = n − 1`) + 'وده Theorem 10.14.' };
      else cap = { en: 'Each cycle shares an even number of edges with each cut-set (0 or 2 here), so B Cᵀ ≡ 0 (mod 2).', ar: 'كل cycle مشترك مع كل cut-set في عدد زوجي من الـ edges (هنا 0 أو 2)، فـ' + L('B Cᵀ ≡ 0 (mod 2)') };
      const one = [0, 1, 5, 6];
      body = html`<${Gr} G=${G} lab="Graph G1 with a cut-set" ec=${j => cut.length ? (cut.includes(j) ? 'cut' : 'dim') : ''} vc=${k => r >= 0 ? (CS[r].includes(k) ? 'sa' : 'sb') : ''} />
        <${Mat} ti="C(G1)" rl=${CS.map((_, k) => 'c' + (k + 1))} cl=${G.E.map(e => e.n)} v=${(k, j) => i >= 9 || k < i ? Cm[k][j] : null} rc=${k => k === r || (i === 9 && one.includes(k)) ? 'hl' : ''} />
        ${i === 10 ? html`<${Mat} ti="B Cᵀ (before mod 2)" rl=${ZC.map((_, k) => 'Z' + (k + 1))} cl=${CS.map((_, k) => 'c' + (k + 1))} v=${(a, b) => BC[a][b]} c=${(a, b) => BC[a][b] ? 'ok' : ''} />` : null}`;
      bar = html`<${WBar} n=${n} i=${i} ctl=${ctl} />`;
    } else {
      const cut = cutOf(G, S), rest = G.V.map((_, k) => k).filter(k => !S.includes(k)), sh = Bm.map(b => cut.reduce((s, j) => s + b[j], 0));
      const inS = (k) => S.includes(k), conn = X => X.length > 0 && comps(G.V.length, pairs(G).filter(([a, b]) => X.includes(a) && X.includes(b))).k === G.V.length - X.length + 1;
      const isCS = S.length > 0 && rest.length > 0 && conn(S) && conn(rest), match = CS.findIndex(T => { const c = cutOf(G, T); return c.join() === cut.join(); });
      if (!S.length || !rest.length) cap = { en: 'Tap vertices to put them on one side (blue); the edges that cross to the other side (green) form a cut.', ar: 'دوس على vertices عشان تحطهم في جهة (الأزرق)، والـ edges اللي بتعدي للجهة التانية (الأخضر) هي الـ cut.' };
      else cap = { en: `${set(vn(G, S))} against the rest: the cut is ${set(en(G, cut))}. ${isCS ? `Both sides stay connected, so it is a cut-set${match >= 0 ? ` (c${match + 1} of the slides)` : ''}.` : 'One side falls apart, so it is not a cut-set (it is a union of cut-sets).'} It shares ${sh.join(', ')} edges with Z1, Z2, Z3, Z4: all even.`,
        ar: `الجهة ${B(set(vn(G, S)))} قصاد الباقي، والـ cut هو:` + L(set(en(G, cut))) + (isCS ? `والجهتين فضلوا connected، فده cut-set${match >= 0 ? ` (هو ${B('c' + (match + 1))} في الـ slides)` : ''}.` : 'وجهة منهم اتقسمت، فده مش cut-set (ده اتحاد cut-sets).') + ' وعدد الـ edges المشتركة مع الـ Z1 والـ Z2 والـ Z3 والـ Z4 كله زوجي:' + L(sh.join(', ')) };
      body = html`<${Gr} G=${G} lab="Graph G1: tap vertices to choose a side" onV=${k => setS(s => s.includes(k) ? s.filter(x => x !== k) : s.concat(k).sort())} ec=${j => cut.includes(j) ? 'cut' : ''} vc=${k => S.length && rest.length ? (inS(k) ? 'sa' : 'sb') : inS(k) ? 'sa' : ''} />
        <${Mat} ti="the cut as a row" rl=${['cut']} cl=${G.E.map(e => e.n)} v=${(_, j) => cut.includes(j) ? 1 : 0} />
        <${Mat} ti="edges shared with each cycle" rl=${['shared']} cl=${ZC.map((_, k) => 'Z' + (k + 1))} v=${(_, k) => sh[k]} c=${(_, k) => sh[k] % 2 ? 'bad' : 'ok'} />`;
    }
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Modes} list=${[['ex', 'Example from the slides'], ['try', 'Try your own cut']]} mode=${mode} set=${setMode} />${body}
    </div></div>
      <${Cap} ...${cap} showAr=${ar} />${bar}</figure>`;
  }

  /* ── 10.5: fundamental cut-set matrix C_f = [C_c : I] (Fig. 10.9's tree) ── */
  const T0 = [0, 4, 5, 6, 7];
  function CutFund({ ar }) {
    const G = G1, nV = 6, m = 8;
    const [T, setT] = useState(T0), n = 7;
    const ok = isTree(nV, T.map(j => [G.E[j].a, G.E[j].b]));
    const [i, ctl] = useWalk(n, 1700, T.join());
    const tog = j => setT(t => t.includes(j) ? t.filter(x => x !== j) : t.concat(j).sort((a, b) => a - b));
    const ch = G.E.map((_, j) => j).filter(j => !T.includes(j)), order = ch.concat(T);
    const rows = ok ? T.map(b => { const rest = T.filter(x => x !== b), { c } = comps(nV, rest.map(j => [G.E[j].a, G.E[j].b])), side = G.V.map((_, k) => k).filter(k => c[k] === c[G.E[b].a]); return { b, side, cut: cutOf(G, side) }; }) : [];
    const csName = cut => { const k = CS.findIndex(S => cutOf(G, S).join() === cut.join()); return k >= 0 ? 'c' + (k + 1) : null; };
    const r = ok && i >= 1 && i <= 5 ? i - 1 : -1, cur = r >= 0 ? rows[r] : null;
    let cap;
    if (!ok) cap = { en: `Tap edges to choose a spanning tree: 5 edges joining all 6 vertices without a cycle (now ${T.length}${T.length === 5 ? ', with a cycle' : ''}).`, ar: `دوس على الـ edges عشان تختار spanning tree، يعني 5 edges بيوصلوا الـ 6 vertices من غير cycle (دلوقتي ${T.length}${T.length === 5 ? ' وفيهم cycle' : ''}).` };
    else if (i === 0) cap = { en: `Spanning tree with branches ${set(en(G, T))} (green); the chords ${set(en(G, ch))} are dashed. Each branch gives one fundamental cut-set, so C_f has n − 1 = 5 rows.${T.join() === T0.join() ? ' This is the tree of Fig. 10.9.' : ''}`, ar: `ده spanning tree والـ branches بتوعه ${B(set(en(G, T)))} (الأخضر)، والـ chords هما ${B(set(en(G, ch)))} (المتقطعين). وكل branch بيدّي fundamental cut-set واحد، فالـ ${B('C_f')} فيها ${B('n − 1 = 5')} rows.${T.join() === T0.join() ? ' وده الـ tree بتاع Fig. 10.9.' : ''}` };
    else if (cur) { const nm = csName(cur.cut);
      cap = { en: `Branch <b>${G.E[cur.b].n}</b>: removing it splits the tree into ${set(vn(G, cur.side))} and the rest. The edges between them, ${set(en(G, cur.cut))}, are its fundamental cut-set${nm ? ` (${nm} of the slides)` : ''}: one branch, the rest chords.`,
        ar: `الـ branch <b>${G.E[cur.b].n}</b> لو شلناه الـ tree بيتقسم لـ ${B(set(vn(G, cur.side)))} والباقي. والـ edges اللي بينهم هي الـ fundamental cut-set بتاعه:` + L(set(en(G, cur.cut))) + `وفيه branch واحد بس والباقي chords${nm ? `، وده ${B(nm)} في الـ slides` : ''}.` }; }
    else cap = { en: 'Columns ordered chords first, then branches: C_f = [C_c : I₅], the identity on the 5 branches and C_c on the m − n + 1 = 3 chords. Tap edges to choose another spanning tree.', ar: 'لو رتّبنا الـ columns الـ chords الأول وبعدين الـ branches بتطلع:' + L('C_f = [C_c : I₅]') + `يعني identity على الـ 5 branches، والـ ${B('C_c')} على الـ ${B('m − n + 1 = 3')} chords. دوس على الـ edges عشان تختار spanning tree تاني.` };
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Gr} G=${G} lab="Graph G1 with a spanning tree" onE=${tog} ec=${j => cur && cur.cut.includes(j) ? 'cut' : T.includes(j) ? 'tr' : 'off'} vc=${k => cur ? (cur.side.includes(k) ? 'sa' : 'sb') : ''} />
      ${ok ? html`<${Mat} ti="C_f = [C_c : I₅]" rl=${T.map(b => G.E[b].n)} cl=${order.map(j => G.E[j].n)} sep=${m - 5} v=${(k, c) => i >= 6 || k < i ? (rows[k].cut.includes(order[c]) ? 1 : 0) : null} rc=${k => k === r ? 'hl' : ''} c=${(k, c) => (i >= 6 || k < i) && c >= m - 5 && c - (m - 5) === k ? 'ok' : ''} />` : html`<p className="dmv10-hint">Tree edges chosen: ${T.length} of 5</p>`}
      <div className="dmv10-chips"><button className="fig-btn" onClick=${() => setT(T0)} disabled=${T.join() === T0.join()}>Example from the slides</button></div>
    </div></div>
      <${Cap} ...${cap} showAr=${ar} />${ok ? html`<${WBar} n=${n} i=${i} ctl=${ctl} />` : null}</figure>`;
  }

  /* ── 10.7: path matrix P(u, v) (Fig. 10.10), then A Pᵀ = M ── */
  function PathBuild({ ar }) {
    const G = G1, A = incOf(G);
    const [u, setU] = useState(2), [v, setV] = useState(3);
    const P = u === v ? [] : pathsOf(G, u, v), q = P.length, Pm = P.map(p => G.E.map((_, j) => p.includes(j) ? 1 : 0));
    const hasRing = q >= 2, n = q + 1 + 1 + (hasRing ? 1 : 0) + 1;
    const [i, ctl] = useWalk(n, 1600, u + '-' + v);
    const iObs = q + 1, iRing = hasRing ? q + 2 : -1, iM = n - 1;
    const ones = G.E.map((_, j) => j).filter(j => q && Pm.every(r => r[j])), zeros = G.E.map((_, j) => j).filter(j => q && Pm.every(r => !r[j]));
    const ring = hasRing ? G.E.map((_, j) => j).filter(j => Pm[0][j] !== Pm[1][j]) : [];
    const ringCycle = (() => { if (!ring.length) return false; const vs = [...new Set(ring.flatMap(j => [G.E[j].a, G.E[j].b]))]; const ok2 = vs.every(x => ring.filter(j => G.E[j].a === x || G.E[j].b === x).length === 2); return ok2 && comps(G.V.length, ring.map(j => [G.E[j].a, G.E[j].b])).k === G.V.length - vs.length + 1; })();
    const M = q ? mul(A, tr(Pm)).map(r => r.map(x => x % 2)) : [];
    const un = G.V[u].n, vv = G.V[v].n, ex = u === 2 && v === 3;
    const r = i >= 1 && i <= q ? i - 1 : -1;
    const he = r >= 0 ? P[r] : i === iRing ? ring : i === iObs ? ones : [];
    let cap;
    if (u === v) cap = { en: 'Pick two different vertices u and v.', ar: 'اختار 2 vertices مختلفين للـ u والـ v.' };
    else if (i === 0) cap = { en: `${ex ? 'Fig. 10.10: ' : ''}the different paths between ${un} and ${vv}. P(${un}, ${vv}) gets one row per path (q = ${q}) and one column per edge.`, ar: `دي الـ paths المختلفة بين ${un} و ${vv}${ex ? ' في ' + B('Fig. 10.10') : ''}. والـ ${B('P(' + un + ', ' + vv + ')')} فيها row لكل path (يعني ${B('q = ' + q)}) و column لكل edge.` };
    else if (r >= 0) cap = { en: `p${i} = ${set(en(G, P[r]))}: 1 under its ${P[r].length} edges.`, ar: `الـ ${B('p' + i)} هو ${B(set(en(G, P[r])))}، فبنحط 1 تحت الـ ${P[r].length} edges بتوعه.` };
    else if (i === iObs) cap = { en: (ones.length ? `Column${ones.length > 1 ? 's' : ''} ${en(G, ones).join(', ')} ${ones.length > 1 ? 'are' : 'is'} all 1s: on every ${un}–${vv} path. ` : 'No column is all 1s: no edge is on every path. ') + (zeros.length ? `Column${zeros.length > 1 ? 's' : ''} ${en(G, zeros).join(', ')} ${zeros.length > 1 ? 'are' : 'is'} all 0s: on no ${un}–${vv} path. ` : '') + 'No row is all zeros.',
      ar: (ones.length ? `الـ ${B(en(G, ones).join(', '))} كله وحايد، يعني موجود في كل الـ paths. ` : 'مفيش column كله وحايد، يعني مفيش edge موجود في كل الـ paths. ') + (zeros.length ? `والـ ${B(en(G, zeros).join(', '))} كله أصفار، يعني مش موجود في أي path. ` : '') + 'ومفيش row كله أصفار.' };
    else if (i === iRing) cap = { en: `Ring sum p1 ⊕ p2 = ${set(en(G, ring))}: ${ringCycle ? 'a cycle' : 'an edge-disjoint union of cycles'}.`, ar: `الـ ring sum بتاع ${B('p1 ⊕ p2')} هو:` + L(set(en(G, ring))) + (ringCycle ? 'وده cycle.' : 'وده اتحاد cycles مالهمش edges مشتركة.') };
    else cap = { en: `A Pᵀ (mod 2): a path meets each inner vertex in 2 edges (→ 0) and meets ${un} and ${vv} in 1 edge (→ 1). So M has 1s only in rows ${un} and ${vv} (Theorem 10.15). Pick another u and v.`, ar: `الـ ${B('A Pᵀ')} بالـ mod 2 بتطلع كده، لأن الـ path بيلمس أي vertex في النص بـ 2 edges فبيدّي 0، وبيلمس ${un} و ${vv} بـ edge واحد فبيدّي 1. فالـ M فيها وحايد بس في الـ rows بتوع ${un} و ${vv} (Theorem 10.15). اختار u و v غيرهم.` };
    const pickRow = (lab, val, setter) => html`<div className="dmv10-chips"><span className="dmv10-lbl">${lab}</span>${G.V.map((x, k) => html`<button key=${k} className="fig-btn" aria-pressed=${String(val === k)} onClick=${() => setter(k)}>${x.n}</button>`)}</div>`;
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      ${pickRow('u', u, setU)}${pickRow('v', v, setV)}
      <${Gr} G=${G} lab="Graph of Fig. 10.10" ec=${j => he.includes(j) ? (i === iObs ? 'tr' : 'on') : i === iObs && zeros.includes(j) ? 'off' : he.length ? 'dim' : ''} vc=${k => k === u || k === v ? 'on' : ''} />
      ${q ? html`<${Mat} ti=${'P(' + un + ', ' + vv + ')'} rl=${P.map((_, k) => 'p' + (k + 1))} cl=${G.E.map(e => e.n)} v=${(k, j) => i > q || k < i ? Pm[k][j] : null}
        rc=${k => k === r || (i === iRing && k < 2) ? 'hl' : ''} c=${(k, j) => i === iObs && ones.includes(j) ? 'ok' : i === iObs && zeros.includes(j) ? 'bad' : ''}
        ft=${i === iRing ? [{ h: '⊕', v: j => ring.includes(j) ? 1 : 0, c: () => 'ok' }] : null} />` : null}
      ${q && i === iM ? html`<${Mat} ti="M = A Pᵀ (mod 2)" rl=${G.V.map(x => x.n)} cl=${P.map((_, k) => 'p' + (k + 1))} v=${(a, b) => M[a][b]} rc=${a => a === u || a === v ? 'hl' : ''} />` : null}
    </div></div>
      <${Cap} ...${cap} showAr=${ar} />${u !== v ? html`<${WBar} n=${n} i=${i} ctl=${ctl} />` : null}</figure>`;
  }

  /* ── 10.8: an edge sequence of Fig. 10.13 walked edge by edge ── */
  const SQV = [0, 1, 2, 3, 1, 2, 4], SQE = [0, 1, 2, 3, 1, 4];
  function EdgeSeq({ ar }) {
    const G = G13, n = 8, [i, ctl] = useWalk(n, 1300), k = Math.min(i, 6);
    const he = SQE.slice(0, k), cur = k >= 1 && i <= 6 ? SQE[k - 1] : -1, at = SQV[k];
    const parts = []; SQV.forEach((x, t) => { parts.push([G.V[x].n, t <= k]); if (t < 6) parts.push([G.E[SQE[t]].n, t < k]); });
    let cap;
    if (i === 0) cap = { en: 'Fig. 10.13. In an edge sequence every edge (except the first and the last) shares a vertex with the edge before it and one with the edge after it. Start at v1.', ar: `دي ${B('Fig. 10.13')}. في الـ edge sequence كل edge (ما عدا الأول والأخير) بيشارك vertex مع الـ edge اللي قبله و vertex مع اللي بعده. هنبدأ من v1.` };
    else if (i <= 6) { const e = G.E[SQE[i - 1]], a = G.V[SQV[i - 1]].n, b = G.V[SQV[i]].n, again = i === 5;
      cap = { en: `<b>${e.n}</b>: from ${a} to ${b}.` + (again ? ' e2 again: an edge may appear more than once in an edge sequence.' : ''), ar: `الـ <b>${e.n}</b> من ${a} لـ ${b}.` + (again ? ' والـ e2 اتكرر تاني، والـ edge ممكن يظهر أكتر من مرة في الـ edge sequence.' : '') }; }
    else cap = { en: 'e1 e2 e3 e4 e2 e5 is an edge sequence of length 6 from v1 to v5. It repeats e2 (and the vertices v2, v3), so it is not a path; walks and paths are edge sequences too.', ar: 'كده عندنا edge sequence طولها 6 من v1 لـ v5:' + L('e1 e2 e3 e4 e2 e5') + 'وفيها الـ e2 متكرر (والـ v2 والـ v3 كمان)، فهي مش path. والـ walks والـ paths برضه edge sequences.' };
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Gr} G=${G} lab="Graph of Fig. 10.13" ec=${j => j === cur ? 'cut' : he.includes(j) ? 'on' : ''} vc=${x => x === at ? 'on' : ''} />
      <p className="dmv10-seq">${parts.map(([t, on], q) => html`<span key=${q} className=${on ? 'on' : 'dim'}>${t} </span>`)}</p>
    </div></div>
      <${Cap} ...${cap} showAr=${ar} /><${WBar} n=${n} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── Theorem 10.16: [Xᵏ]ij counts edge sequences of length k (Fig. 10.13) ── */
  const adjOf = (nv, E) => { const X = [...Array(nv)].map(() => Array(nv).fill(0)); E.forEach(([a, b]) => { X[a][b] = 1; X[b][a] = 1; }); return X; };
  function seqs(G, E, a, b, k) {
    const out = [], es = [], vs = [a];
    (function go(x, d) { if (d === k) { if (x === b) out.push([es.slice(), vs.slice()]); return; } E.forEach(j => { const e = G.E[j], y = e.a === x ? e.b : e.b === x ? e.a : -1; if (y < 0) return; es.push(j); vs.push(y); go(y, d + 1); es.pop(); vs.pop(); }); })(a, 0);
    return out;
  }
  function AdjPow({ ar }) {
    const G = G13, nv = 5, all = G.E.map((_, j) => j), X = adjOf(nv, pairs(G));
    const [k, setK] = useState(3), [cell, setCell] = useState([1, 2]);
    let Xk = X; for (let t = 1; t < k; t++) Xk = mul(Xk, X);
    const [a, b] = cell, cnt = Xk[a][b], list = seqs(G, all, a, b, k), va = G.V[a].n, vb = G.V[b].n;
    const en1 = `[X${SUP[k]}] at (${va}, ${vb}) = <b>${cnt}</b>: there ${cnt === 1 ? 'is 1 edge sequence' : `are ${cnt} edge sequences`} of length ${k} from ${va} to ${vb} (Theorem 10.16).` + (a === b && k === 2 ? ' On the diagonal, [X²]ii is the degree of vi.' : '') + ' Pick k and tap a cell.';
    const ar1 = `الخانة ${B('(' + va + ', ' + vb + ')')} في ${B('X' + SUP[k])} قيمتها <b>${cnt}</b>، يعني فيه ${cnt} edge sequence طولها ${k} من ${va} لـ ${vb} (Theorem 10.16).` + (a === b && k === 2 ? ` وعلى الـ diagonal الـ ${B('[X²]ii')} هي الـ degree بتاع الـ ${B('vi')}.` : '') + ' اختار الـ k ودوس على أي خانة.';
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Gr} G=${G} lab="Graph of Fig. 10.13" vc=${x => x === a || x === b ? 'on' : ''} ec=${j => list.length && list[0][0].includes(j) ? 'on' : ''} />
      <div className="dmv10-chips"><span className="dmv10-lbl">k</span>${[1, 2, 3, 4].map(t => html`<button key=${t} className="fig-btn" aria-pressed=${String(k === t)} onClick=${() => setK(t)}>X${SUP[t]}</button>`)}</div>
      <${Mat} ti=${'X' + SUP[k]} rl=${G.V.map(x => x.n)} cl=${G.V.map(x => x.n)} v=${(r, c) => Xk[r][c]} c=${(r, c) => r === a && c === b ? 'hl cur' : ''} onX=${(r, c) => setCell([r, c])} />
      <div className="dmv10-list">${list.slice(0, 8).map(([es, vs], q) => html`<div key=${q}>${es.map(j => G.E[j].n).join(' ')} (${vs.map(x => G.V[x].n).join(' ')})</div>`)}${list.length > 8 ? html`<div>… ${list.length - 8} more</div>` : null}${!list.length ? html`<div>none</div>` : null}</div>
    </div></div>
      <${Cap} en=${en1} ar=${ar1} showAr=${ar} /></figure>`;
  }

  /* ── Theorems 10.17, 10.18: connectivity and distance from the powers of X (Fig. 10.13) ── */
  function AdjConn({ ar }) {
    const G = G13, nv = 5;
    const [off, setOff] = useState([]), [view, setView] = useState('d'), [cell, setCell] = useState([0, 4]);
    const on = G.E.map((_, j) => j).filter(j => !off.includes(j)), X = adjOf(nv, on.map(j => [G.E[j].a, G.E[j].b]));
    const P = [X]; for (let t = 1; t < nv - 1; t++) P.push(mul(P[t - 1], X));
    const Y = X.map((r, a) => r.map((_, b) => P.reduce((s, M) => s + M[a][b], 0)));
    const D = X.map((r, a) => r.map((_, b) => { if (a === b) return 0; const t = P.findIndex(M => M[a][b] !== 0); return t < 0 ? '∞' : t + 1; }));
    const zeros = []; Y.forEach((r, a) => r.forEach((y, b) => { if (a < b && y === 0) zeros.push([a, b]); }));
    const [a, b] = cell, va = G.V[a].n, vb = G.V[b].n, seq = P.map(M => M[a][b]), d = D[a][b];
    let cap;
    if (view === 'Y') cap = zeros.length
      ? { en: `Y = X + X² + X³ + X⁴ (up to n − 1 = 4) has ${zeros.length} zero pair${zeros.length > 1 ? 's' : ''} off the diagonal (red): no edge sequence joins ${G.V[zeros[0][0]].n} and ${G.V[zeros[0][1]].n}, so G is <b>not connected</b> (Theorem 10.17). Tap an edge to delete or restore it.`, ar: `الـ Y اللي هي` + L('Y = X + X² + X³ + X⁴') + `فيها أصفار برّه الـ diagonal (الأحمر)، يعني مفيش edge sequence بين ${G.V[zeros[0][0]].n} و ${G.V[zeros[0][1]].n}، فالـ G <b>مش connected</b> (Theorem 10.17). دوس على أي edge عشان تمسحه أو ترجّعه.` }
      : { en: 'Y = X + X² + X³ + X⁴ (up to n − 1 = 4) has no zero off the main diagonal, so G is <b>connected</b> (Theorem 10.17). Tap an edge to delete it.', ar: 'الـ Y اللي هي' + L('Y = X + X² + X³ + X⁴') + 'مفيهاش ولا صفر برّه الـ main diagonal، فالـ G <b>connected</b> (Theorem 10.17). دوس على أي edge عشان تمسحه.' };
    else if (a === b) cap = { en: 'Tap a cell off the diagonal.', ar: 'دوس على خانة برّه الـ diagonal.' };
    else if (d === '∞') cap = { en: `[X¹], [X²], [X³], [X⁴] at (${va}, ${vb}) are ${seq.join(', ')}: all zero, so ${va} and ${vb} are not connected.`, ar: `قيم الخانة ${B('(' + va + ', ' + vb + ')')} في الـ ${B('X¹ … X⁴')} هي:` + L(seq.join(', ')) + `وكلها أصفار، فالـ ${va} والـ ${vb} مش متوصّلين.` };
    else cap = { en: `[X¹], [X²], [X³], [X⁴] at (${va}, ${vb}) are ${seq.join(', ')}. The first non-zero is at k = ${d}, so d(${va}, ${vb}) = <b>${d}</b> (Theorem 10.18). Tap a cell, or an edge to delete it.`, ar: `قيم الخانة ${B('(' + va + ', ' + vb + ')')} في الـ ${B('X¹ … X⁴')} هي:` + L(seq.join(', ')) + `وأول قيمة مش صفر عند ${B('k = ' + d)}، فـ ${B('d(' + va + ', ' + vb + ') = ' + d)} (Theorem 10.18). دوس على أي خانة، أو على edge عشان تمسحه.` };
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Modes} list=${[['d', 'Distances'], ['Y', 'Y = X + … + X⁴']]} mode=${view} set=${setView} />
      <${Gr} G=${G} lab="Graph of Fig. 10.13: tap an edge to delete it" onE=${j => setOff(o => o.includes(j) ? o.filter(x => x !== j) : o.concat(j))} ec=${j => off.includes(j) ? 'off' : ''} vc=${x => view === 'd' && (x === a || x === b) ? 'on' : ''} />
      ${view === 'Y' ? html`<${Mat} ti="Y" rl=${G.V.map(x => x.n)} cl=${G.V.map(x => x.n)} v=${(r, c) => Y[r][c]} c=${(r, c) => r !== c && Y[r][c] === 0 ? 'bad' : ''} />`
        : html`<${Mat} ti="d(vi, vj)" rl=${G.V.map(x => x.n)} cl=${G.V.map(x => x.n)} v=${(r, c) => D[r][c]} c=${(r, c) => (r === a && c === b ? 'hl cur' : '') + (D[r][c] === '∞' ? ' bad' : '')} onX=${(r, c) => setCell([r, c])} />`}
      <div className="dmv10-chips"><button className="fig-btn" onClick=${() => setOff([])} disabled=${!off.length}>Restore all edges</button></div>
    </div></div>
      <${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── 10.21 matrix-tree theorem: every cofactor of Q = H − X counts the spanning trees ── */
  const SQ4 = [[60, 32], [240, 32], [240, 152], [60, 152]], TRI = [[150, 26], [250, 152], [50, 152]];
  const PRE = { k4: { pos: SQ4, on: [[0, 1], [1, 2], [2, 3], [0, 3], [1, 3], [0, 2]] }, f102: { pos: SQ4, on: [[0, 1], [1, 2], [2, 3], [0, 3], [1, 3]] }, k3: { pos: TRI, on: [[0, 1], [1, 2], [0, 2]] } };
  function MTree({ ar }) {
    const [pre, setPre] = useState('k4'), [on, setOn] = useState(PRE.k4.on.map(p => p.join())), [del, setDel] = useState(0);
    const pos = PRE[pre].pos, nv = pos.length, all = []; for (let a = 0; a < nv; a++) for (let b = a + 1; b < nv; b++) all.push([a, b]);
    const G = { w: 300, h: 182, V: pos.map(([x, y], k) => V_('v' + (k + 1), x, y)), E: all.map(([a, b]) => E_('', a, b)) };
    const live = all.map((p, j) => on.includes(p.join()) ? j : -1).filter(j => j >= 0), E = live.map(j => all[j]);
    const X = adjOf(nv, E), H = rowSum(X), Q = X.map((r, a) => r.map((x, b) => a === b ? H[a] : -x));
    const minor = Q.filter((_, a) => a !== del).map(r => r.filter((_, b) => b !== del)), det = detI(minor);
    const trees = spanTrees(nv, all, live), tau = trees.length;
    const F = [...Array(nv).keys()].map(v => E.map(([a, b]) => v === a ? 1 : v === b ? -1 : 0)), FF = E.length ? mul(F, tr(F)) : Q.map(r => r.map(() => 0)), same = FF.every((r, a) => r.every((x, b) => x === Q[a][b]));
    const complete = E.length === nv * (nv - 1) / 2, vd = 'v' + (del + 1);
    const load = k => { setPre(k); setOn(PRE[k].on.map(p => p.join())); setDel(0); };
    const tog = j => setOn(o => o.includes(all[j].join()) ? o.filter(x => x !== all[j].join()) : o.concat(all[j].join()));
    const enC = `Q = H − X: the degrees on the diagonal, −1 for each edge${same ? ' (and F Fᵀ, computed from F, gives the same Q)' : ''}. Delete row and column ${vd}: the cofactor is <b>${det}</b>, and G has τ(G) = <b>${tau}</b> spanning tree${tau === 1 ? '' : 's'}${tau ? ', drawn below' : ''} (matrix-tree theorem).` + (complete ? ` K${nv}: τ = ${nv}${SUP[nv - 2]} = ${tau}.` : '') + ' Tap an edge to add or remove it, a row of Q to delete another one.';
    const arC = `الـ Q هي ${B('H − X')}، يعني الـ degrees على الـ diagonal و ${B('−1')} مكان كل edge${same ? ' (والـ ' + B('F Fᵀ') + ' لو حسبناها من الـ F بتطلع نفس الـ Q)' : ''}. لو مسحنا الـ row والـ column بتوع ${vd} الـ cofactor بيطلع:` + L(`det = ${det} = τ(G)`) + `يعني الـ G فيه ${tau} spanning trees${tau ? ' مرسومين تحت' : ''} (الـ matrix-tree theorem).` + (complete ? ` ولأنه ${B('K' + nv)} فـ` + L(`τ(K${nv}) = ${nv}${SUP[nv - 2]} = ${tau}`) : '') + 'دوس على أي edge عشان تضيفه أو تشيله، وعلى أي row في الـ Q عشان تمسح غيره.';
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Modes} list=${[['k4', 'K₄'], ['f102', 'Fig. 10.2'], ['k3', 'K₃']]} mode=${pre} set=${load} />
      <${Gr} G=${G} lab="Graph: tap an edge to add or remove it" onE=${tog} ec=${j => live.includes(j) ? '' : 'off'} vc=${k => k === del ? 'ref' : ''} onV=${setDel} />
      <div className="dmv10-two">
        <${Mat} ti="X" rl=${G.V.map(x => x.n)} cl=${G.V.map(x => x.n)} v=${(r, c) => X[r][c]} />
        <${Mat} ti="Q = H − X" rl=${G.V.map(x => x.n)} cl=${G.V.map(x => x.n)} v=${(r, c) => Q[r][c]} rc=${r => r === del ? 'gone' : ''} c=${(r, c) => c === del ? 'gone' : r !== del ? 'hl' : ''} onR=${setDel} />
      </div>
      <p className=${'dmv10-ver ' + (tau ? 'ok' : 'bad')}>cofactor = ${det} = τ(G) = ${tau}</p>
      ${tau ? html`<${Thumbs} G=${G} trees=${trees} />` : null}
    </div></div>
      <${Cap} en=${enC} ar=${arC} showAr=${ar} /></figure>`;
  }

  /* ── worked example: the triangle, step by step ── */
  function Triangle({ ar }) {
    const G = G3, A = incOf(G), X = adjOf(3, pairs(G)), H = rowSum(X), Q = X.map((r, a) => r.map((x, b) => a === b ? H[a] : -x));
    const n = 6, [i, ctl] = useWalk(n, 2200), trees = spanTrees(3, pairs(G), [0, 1, 2]), rA = rank2(A), Bm = [[1, 1, 1]], rB = rank2(Bm);
    const det = detI([[Q[1][1], Q[1][2]], [Q[2][1], Q[2][2]]]);
    const vl = G.V.map(v => v.n), el = G.E.map(e => e.n);
    const caps = [
      { en: 'Worked example: the triangle v1 v2 v3 with e1 = v1v2, e2 = v2v3, e3 = v1v3.', ar: 'مثال محلول: مثلث فيه v1 و v2 و v3، والـ edges بتوعه:' + L('e1 = v1v2, e2 = v2v3, e3 = v1v3') },
      { en: `Incidence A: each column has two 1s; the row sums are the degrees ${H.join(', ')}.`, ar: `الـ incidence matrix A فيها كل column فيه 1 مرتين، ومجموع كل row هو الـ degree، يعني ${H.join(' و ')}.` },
      { en: 'Adjacency X: x_ij = 1 when v_i v_j is an edge, and here every pair is joined.', ar: `الـ adjacency matrix X فيها ${B('x_ij = 1')} لما يكون فيه edge بين ${B('v_i')} و ${B('v_j')}، وهنا كل الأزواج متوصّلة.` },
      { en: 'H − X = [2 −1 −1; −1 2 −1; −1 −1 2].', ar: `الـ ${B('H − X')} بتطلع كده:` + L('H − X = [2 −1 −1; −1 2 −1; −1 −1 2]') },
      { en: `Delete row and column v1: the cofactor det[2 −1; −1 2] = 4 − 1 = ${det} = τ(K₃) = 3³⁻². These are the ${trees.length} spanning trees.`, ar: 'لو مسحنا الـ row والـ column بتوع v1 الـ cofactor بيطلع:' + L(`det[2 −1; −1 2] = 4 − 1 = ${det} = τ(K₃) = 3³⁻²`) + `ودول الـ ${trees.length} spanning trees.` },
      { en: `G is connected: rank A = n − 1 = ${rA}. It has one cycle {e1, e2, e3}: rank B = m − n + 1 = 3 − 3 + 1 = ${rB}.`, ar: 'الـ G ده connected، فـ' + L(`rank A = n − 1 = ${rA}`) + `وفيه cycle واحد بس هو ${B('{e1, e2, e3}')}، فـ` + L(`rank B = m − n + 1 = 3 − 3 + 1 = ${rB}`) }
    ];
    let mats;
    if (i === 0) mats = null;
    else if (i === 1) mats = html`<${Mat} ti="A" rl=${vl} cl=${el} v=${(r, c) => A[r][c]} ex=${{ h: 'deg', v: r => H[r] }} />`;
    else if (i === 2) mats = html`<${Mat} ti="X" rl=${vl} cl=${vl} v=${(r, c) => X[r][c]} />`;
    else if (i === 3) mats = html`<${Mat} ti="H − X" rl=${vl} cl=${vl} v=${(r, c) => Q[r][c]} />`;
    else if (i === 4) mats = html`<${Mat} ti="H − X without row, column v1" rl=${vl} cl=${vl} v=${(r, c) => Q[r][c]} rc=${r => r === 0 ? 'gone' : ''} c=${(r, c) => c === 0 ? 'gone' : r ? 'hl' : ''} /><${Thumbs} G=${G} trees=${trees} />`;
    else mats = html`<div className="dmv10-two"><${Mat} ti=${'A · rank ' + rA} rl=${vl} cl=${el} v=${(r, c) => A[r][c]} /><${Mat} ti=${'B · rank ' + rB} rl=${['Z1']} cl=${el} v=${(r, c) => Bm[r][c]} /></div>`;
    return html`<figure className="fig dmv10"><div className="fig-stage"><div className="dmv10-wrap">
      <${Gr} G=${G} lab="Triangle v1 v2 v3" ec=${() => i === 5 ? 'on' : ''} />${mats}
    </div></div>
      <${Cap} ...${caps[i]} showAr=${ar} /><${WBar} n=${n} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'dm-incmat-build': IncBuild, 'dm-incmat-try': IncTry, 'dm-incmat-tree': IncTree, 'dm-incmat-oriented': IncOriented,
    'dm-cycmat-build': CycBuild, 'dm-cycmat-2iso': Cyc2Iso, 'dm-cutmat-build': CutBuild, 'dm-cutmat-fund': CutFund,
    'dm-pathmat-build': PathBuild, 'dm-adjmat-edgeseq': EdgeSeq, 'dm-adjmat-powers': AdjPow, 'dm-adjmat-connect': AdjConn,
    'dm-adjmat-mtree': MTree, 'dm-adjmat-triangle': Triangle
  });
})();

// Head First chapter for Multimedia Lecture 7 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Digital audio effects: where effects go and their order, the six classes, equalisers (shelving and peak, dB to V0/H0),
// time-varying filters (wah-wah, phaser, M-fold wah, the state variable filter), FIR / IIR / universal comb filters,
// delay in samples, vibrato, flanger, chorus, slapback, echo, ring modulation, AM, tremolo, limiter, compressor, expander,
// overdrive, distortion, fuzz, exciter, enhancer, panning, reverb (Schroeder, Moorer, convolution).
// Every fact comes from the lecture's notes; analogies are marked as ours; ‡ marks a slide error the notes also flag.
// This lecture has no questions from the doctors' papers, so the exam corner uses the site's practice questions, titled so.
// Numbers checked by hand and with node: M = τ × fs (0.1 × 44100 = 4410; 0.003 × 44100 = 132.3 → 132; 0.1 × 8000 = 800;
// 10 / 8000 s = 1.25 ms); comb impulse responses with g = 0.5, M = 10 (FIR: 1 at n = 0, 0.5 at n = 10; IIR: 1, 0.5, 0.25,
// 0.125, 0.0625 at n = 0, 10, 20, 30, 40); V0 = 10^(G/20) (4 dB → 1.585 / H0 0.585; 20 dB → 10 / 9; 6 dB → 1.995);
// F1 = 2 sin(π·1000/44100) = 0.1424; overdrive f(0.2) = 0.4, f(0.5) = 0.917, f(0.8) = 1; panning θ = 30° → 1.366x, 0.366x.
(function () {
  const H = window.HF; H.chapters.mm = H.chapters.mm || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T7 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-mm7')) {
    const s = document.createElement('style'); s.id = 'hf-css-mm7';
    s.textContent = `
.hfb .hf-mm7-two{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-mm7-card{ border:1.5px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--paper); display:grid; gap:4px; align-content:start; }
.hfb .hf-mm7-card > b{ font:800 15px/1.1 var(--body); color:var(--hf-k); }
.hfb .hf-mm7-card > span{ font-size:13.5px; line-height:1.32; color:var(--ink); }
.hfb .hf-mm7-card code{ font-family:var(--mono); font-size:.86em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-mm7-chain{ display:flex; flex-wrap:wrap; gap:4px 3px; align-items:center; }
.hfb .hf-mm7-chain span{ font:700 13px/1 var(--body); padding:5px 7px; border-radius:999px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); }
.hfb .hf-mm7-chain i{ font-style:normal; font:700 13px/1 var(--body); color:var(--graphite); }
.hfb .hf-mm7-cls{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-mm7-cls > div{ border-left:4px solid var(--hf-k); background:var(--hf-grey); padding:5px 8px; }
.hfb .hf-mm7-cls > div > b{ display:block; font:800 13.5px/1.15 var(--body); color:var(--ink); }
.hfb .hf-mm7-cls > div > span{ display:block; font-size:13px; line-height:1.3; color:var(--ink); margin-top:2px; }
.hfb .hf-mm7-tb{ border-collapse:collapse; width:100%; font:500 13.5px/1.2 var(--body); color:var(--ink); }
.hfb .hf-mm7-tb th, .hfb .hf-mm7-tb td{ border:1px solid var(--hf-line); padding:4px 5px; text-align:center; }
.hfb .hf-mm7-tb th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-mm7-tb td.l, .hfb .hf-mm7-tb th.l{ text-align:left; font-weight:700; }
.hfb .hf-mm7-tb td.m{ font-family:var(--mono); font-weight:700; }
/* number drills */
.hfb .hf-mm7-dr{ display:grid; gap:7px; }
.hfb .hf-mm7-dr .dq{ font-size:14px; line-height:1.3; margin:0 0 3px; color:var(--ink); }
.hfb .hf-mm7-dr .dops{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-mm7-dr .dops button{ font:700 13.5px/1 var(--mono); min-height:30px; min-width:52px; padding:0 8px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-mm7-dr .dops button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-mm7-dr .dops button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 16%, var(--paper)); color:var(--ink); }
.hfb .hf-mm7-dr .dops button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); color:var(--ink); }
.hfb .hf-mm7-dr .dw{ font-size:13px; line-height:1.3; margin:3px 0 0; color:var(--hf-red); }
/* be the comb filter */
.hfb .hf-mm7-ct{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-mm7-ct table{ border-collapse:collapse; width:100%; table-layout:fixed; }
.hfb .hf-mm7-ct th, .hfb .hf-mm7-ct td{ border:1px solid var(--hf-line); padding:0; text-align:center; height:34px; }
.hfb .hf-mm7-ct th{ background:var(--hf-grey); font:800 13px/1 var(--mono); color:var(--ink); }
.hfb .hf-mm7-ct th.lb{ width:46px; font-family:var(--body); }
.hfb .hf-mm7-ct td button{ width:100%; height:100%; border:0; background:var(--paper); font:700 13.5px/1 var(--mono); color:var(--ink); cursor:pointer; padding:0; }
.hfb .hf-mm7-ct td button.sel{ box-shadow:inset 0 0 0 2.5px var(--hf-hand); }
.hfb .hf-mm7-ct td button.ok{ background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
.hfb .hf-mm7-ct td button.no{ background:color-mix(in srgb, var(--hf-red) 14%, var(--paper)); color:var(--hf-red); }
.hfb .hf-mm7-pal{ display:flex; gap:5px; flex-wrap:wrap; justify-content:center; }
.hfb .hf-mm7-pal button{ font:700 13.5px/1 var(--mono); min-height:32px; min-width:44px; padding:0 7px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-mm7-hint{ font-size:13.5px; line-height:1.3; margin:0; color:var(--graphite); }
/* spectrum lines */
.hfb .hf-mm7-sp{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-mm7-tabs{ display:flex; gap:5px; }
.hfb .hf-mm7-tabs button{ flex:1 1 0; font:800 13.5px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-mm7-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-mm7-sp svg{ display:block; width:100%; height:auto; }
.hfb .hf-mm7-sp .cands{ display:flex; gap:5px; justify-content:center; }
.hfb .hf-mm7-sp .cands button{ flex:1 1 0; font:700 13.5px/1 var(--mono); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; padding:0; }
.hfb .hf-mm7-sp .cands button[aria-pressed="true"]{ border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 18%, var(--paper)); }
.hfb .hf-mm7-sp .cands button.ok{ border-color:var(--ok); } .hfb .hf-mm7-sp .cands button.no{ border-color:var(--hf-red); color:var(--hf-red); }
.hfb .hf-mm7-sp .cands button.miss{ border-style:dashed; border-color:var(--ok); }
.hfb .hf-mm7-msg{ font-size:13.5px; line-height:1.3; margin:0; color:var(--ink); }
.hf-ar .hf-mm7-card > span, .hf-ar .hf-mm7-cls > div > span, .hf-ar .hf-mm7-dr .dq, .hf-ar .hf-mm7-dr .dw, .hf-ar .hf-mm7-hint, .hf-ar .hf-mm7-msg{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-mm7-card > span, .hf-ar .hf-mm7-cls > div > span{ font-size:13px; }
.hf-ar .hf-mm7-card > b, .hf-ar .hf-mm7-cls > div > b, .hf-ar .hf-mm7-tabs button, .hf-ar .hf-mm7-ct th.lb{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-mm7-cls > div{ border-left:0; border-right:4px solid var(--hf-k); }
.hf-ar .hf-mm7-chain{ direction:ltr; }
`;
    document.head.appendChild(s);
  }

  // Sharpen your pencil with numbers: each row is a question with a few answers to tap; check marks right and wrong
  function Drill({ id, rows }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const right = rows.filter((r, i) => pick[i] === r.a).length;
    return html`<div className="hf-mm7-dr hf-in">
      ${rows.map((r, i) => { const p = pick[i]; return html`<div key=${i}>
        <p className="dq">${T7(r.q)}</p>
        <div className="dops" dir="ltr">${r.o.map((o, j) => html`<button key=${j} aria-pressed=${String(p === j && !chk)} className=${chk && p != null ? (j === r.a ? 'ok' : j === p ? 'no' : '') : ''} onClick=${() => { setChk(false); setPick(Object.assign({}, pick, { [i]: j })); }}>${T7(o)}</button>`)}</div>
        ${chk && p != null && p !== r.a && r.w ? html`<p className="dw">${T7(r.w)}</p>` : null}</div>`; })}
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChk(true)}>${ar ? 'صحّح إجاباتي' : 'Check my answers'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; rows.forEach((r, i) => { p[i] = r.a; }); setPick(p); setChk(true); }}>${ar ? 'ورّيني الإجابات' : 'Show the answers'}</button>
        ${chk && html`<span className="hf-score"><bdi>${right} / ${rows.length}</bdi></span>`}
      </div></div>`;
  }

  // Be the comb filter: a unit impulse, g = 0.5, M = 10, c = 1 (fircomb.m and iircomb.m). Tap a cell, then a value.
  const CT_N = [0, 10, 20, 30, 40];
  const CT_ANS = { fir: [1, 0.5, 0, 0, 0], iir: [1, 0.5, 0.25, 0.125, 0.0625] };
  const CT_VALS = [0, 1, 0.5, 0.25, 0.125, 0.0625];
  const CT_CELLS = ['fir', 'iir'].flatMap(r => CT_N.map((_, j) => r + ':' + j));
  function CombTrace({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const [sel, setSel] = useState('fir:0');
    const put = x => { setChk(false); setV(Object.assign({}, v, { [sel]: x })); const k = CT_CELLS.indexOf(sel); if (k < CT_CELLS.length - 1) setSel(CT_CELLS[k + 1]); };
    const ans = c => { const [r, j] = c.split(':'); return CT_ANS[r][+j]; };
    const right = CT_CELLS.filter(c => v[c] === ans(c)).length;
    return html`<div className="hf-mm7-ct hf-in">
      <table dir="ltr"><thead><tr><th className="lb">n</th>${CT_N.map(n => html`<th key=${n}>${n}</th>`)}</tr></thead>
        <tbody>${['fir', 'iir'].map(r => html`<tr key=${r}><th className="lb">${r.toUpperCase()}</th>${CT_N.map((n, j) => { const c = r + ':' + j, x = v[c];
          return html`<td key=${n}><button className=${(sel === c && !chk ? 'sel' : '') + (chk && x != null ? (x === ans(c) ? ' ok' : ' no') : '')} onClick=${() => setSel(c)} aria-label=${r.toUpperCase() + ' y(' + n + ')'}>${x == null ? '?' : x}</button></td>`; })}</tr>`)}</tbody></table>
      <p className="hf-mm7-hint">${T7(ar ? 'اختار خانة، وبعدين قيمتها:' : 'Pick a cell, then its value:')}</p>
      <div className="hf-mm7-pal" dir="ltr">${CT_VALS.map(x => html`<button key=${x} onClick=${() => put(x)}>${x}</button>`)}</div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChk(true)}>${ar ? 'صحّح الجدول' : 'Check the table'}</button>
        <button className="hf-btn" onClick=${() => { const p = {}; CT_CELLS.forEach(c => { p[c] = ans(c); }); setV(p); setChk(true); }}>${ar ? 'ورّيني الحل' : 'Show the table'}</button>
        ${chk && html`<span className="hf-score"><bdi>${right} / ${CT_CELLS.length}</bdi></span>`}
      </div></div>`;
  }

  // Which lines are in the spectrum? A 1000 Hz carrier and a 300 Hz sine, ring modulated or amplitude modulated
  const SP_C = [300, 700, 1000, 1300, 2000];
  const SP_ANS = { rm: [700, 1300], am: [700, 1000, 1300] };
  function Spectrum({ id }) {
    const ar = useAr();
    const [mode, setMode] = H.K.useSlot(id + ':m', 'rm');
    const [sel, setSel] = H.K.useSlot(id + ':' + mode, []);
    const [chk, setChk] = H.K.useSlot(id + ':c:' + mode, false);
    const ans = SP_ANS[mode], ok = chk && sel.length === ans.length && ans.every(f => sel.includes(f));
    const tog = f => { setChk(false); setSel(sel.includes(f) ? sel.filter(x => x !== f) : sel.concat(f)); };
    const X = f => 14 + f / 2200 * 292;
    const shown = chk ? Array.from(new Set(sel.concat(ans))) : sel;
    const col = f => !chk ? 'var(--hf-k)' : ans.includes(f) ? (sel.includes(f) ? 'var(--ok)' : 'var(--ok)') : 'var(--hf-red)';
    const msg = !chk ? null : ok ? (mode === 'rm'
      ? (ar ? 'صح! الـ RM بيسيب <b>المجموع والفرق بس</b>:<span class="ltr">1000 + 300 = 1300, 1000 − 300 = 700</span>ومفيش 1000 ولا 300.' : 'Right! RM keeps <b>only the sum and difference</b>: 1000 + 300 = 1300 and 1000 − 300 = 700. No 1000, no 300.')
      : (ar ? 'صح! الـ AM بيدّي <b>تلات</b> ترددات: الـ carrier نفسه 1000، و700، و1300.' : 'Right! AM gives <b>three</b> lines: the carrier 1000 itself, 700 and 1300.'))
      : (ar ? 'لسه. الخطوط المتقطعة الخضرا ناقصة، والحمرا زيادة.' : 'Not yet. Dashed green buttons are missing lines; red ones should not be there.');
    return html`<div className="hf-mm7-sp hf-in">
      <div className="hf-mm7-tabs" dir="ltr" role="group" aria-label="Modulation">${[['rm', 'Ring modulation'], ['am', 'AM']].map(([m, l]) => html`<button key=${m} aria-pressed=${String(mode === m)} onClick=${() => setMode(m)}>${l}</button>`)}</div>
      <svg viewBox="0 0 320 96" role="img" aria-label="Spectrum, 0 to 2200 Hz">
        <path d="M14 76 H306" stroke="var(--hf-line)" strokeWidth="1.6" />
        ${[0, 500, 1000, 1500, 2000].map(f => html`<g key=${f}><path d=${'M' + X(f) + ' 76 V80'} stroke="var(--hf-line)" strokeWidth="1.4" /><text x=${X(f)} y="93" textAnchor="middle" fontSize="12" fill="var(--graphite)" fontFamily="var(--mono)">${f}</text></g>`)}
        ${shown.map(f => html`<g key=${f}><path d=${'M' + X(f) + ' 76 V' + (f === 1000 ? 14 : 34)} stroke=${col(f)} strokeWidth="4" strokeLinecap="round" strokeDasharray=${chk && !sel.includes(f) ? '5 4' : ''} /><text x=${X(f)} y=${f === 1000 ? 10 : 30} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" fontFamily="var(--mono)">${f}</text></g>`)}
      </svg>
      <div className="cands" dir="ltr">${SP_C.map(f => html`<button key=${f} aria-pressed=${String(sel.includes(f))} className=${!chk ? '' : sel.includes(f) ? (ans.includes(f) ? 'ok' : 'no') : ans.includes(f) ? 'miss' : ''} onClick=${() => tog(f)}>${f}</button>`)}</div>
      ${msg && html`<p className="hf-mm7-msg">${T7(msg)}</p>`}
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!sel.length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setSel(ans.slice()); setChk(true); }}>${ar ? 'ورّيني الخطوط' : 'Show the lines'}</button>
      </div></div>`;
  }

  H.chapters.mm[7] = {
    title: 'Digital Audio Effects', kicker: 'Chapter 7', run: 'digital audio effects',
    ar: { title: 'الـ Digital Audio Effects', kicker: 'الفصل 7', run: 'الـ digital audio effects' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, Match, MCQ, Reveal, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const B = s => '<bdi dir="ltr">' + s.replace(/ /g, '&nbsp;') + '</bdi>';   // short LTR pieces never wrap
      const L = s => '<span class="ltr">' + s + '</span>';
      const lec = kit.course.lectures.find(l => l.n === 7);
      const arL = (window.AR && window.AR.mm && window.AR.mm.lectures && window.AR.mm.lectures[7]) || {};
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the site's practice questions (this lecture has none from the doctors): from the lecture's quiz or its extra questions
      const pq = (id, re, from) => { const list = lec[from] || []; const i = list.findIndex(x => re.test(strip(x.q)) && !x.src); return i < 0 ? null : html`<${MCQ} id=${id} q=${list[i]} why=${(arL[from] || [])[i]} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const card = (h, b) => html`<div className="hf-mm7-card"><b>${h}</b><span>${T(b)}</span></div>`;
      return [
        // 0 · where we left off, and how this chapter works
        page(html`
          <${H2}>${t('Where we left off', 'وقفنا فين؟')}</${H2}>
          <${P} small=${true}>${X('Last chapter sound became <b>instructions</b>: MIDI messages and structured audio. This chapter takes a sound that already exists and <b>changes</b> it: filters, delays, modulators, distortion and rooms.',
            'الفصل اللي فات الصوت بقى <b>أوامر</b>: MIDI messages والـ structured audio. الفصل ده بياخد صوت موجود أصلًا و<b>يغيّره</b>: filters وdelays وmodulators وdistortion وأوض.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> Many are number drills: delays in samples, dB, comb filter outputs.', '<b>حل التمارين.</b> كتير منها حسابات: الـ delay بالـ samples، والـ dB، والـ output بتاع الـ comb filter.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you read on.', '<b>شغّل مخك</b>: وقّف وفكّر قبل ما تكمّل.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are the traps students fall into on this lecture.', '<b>خلّي بالك!</b> دي الفخاخ اللي الطلبة بيقعوا فيها في المحاضرة دي.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a mistake on the slides, and what was meant.', 'معناها فيه غلطة في السلايد، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات اللي عليها "من عندنا" دي تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t("There are no questions from the doctors' papers on this lecture yet, so the exam corner uses the site's practice questions.", 'لسه مفيش أسئلة من امتحانات الدكاترة على المحاضرة دي، فركن الامتحان فيه أسئلة تدريب من الموقع.')}</${Hand}>
        `, { sec: t('Where we left off', 'وقفنا فين؟') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">7</span><span className="t">${A ? html`الفصل السابع<br/>Multimedia` : html`Chapter seven<br/>Multimedia`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('One Note, a Hundred Sounds', 'نوتة واحدة، ومية صوت')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('digital audio effects', 'الـ digital audio effects')}</p></div>
          <${Talk} who="mic">${X('I recorded one plain guitar note. Dry. Boring.', 'أنا سجّلت نوتة جيتار واحدة عادية. ناشفة. مملة.')}</${Talk}>
          <${Talk} who="spk" flip=${true}>${X('And I can play it back as a <b>wah</b>, a <b>robot</b>, a <b>wobble</b>, or a note in a <b>cathedral</b>.', 'وأنا أقدر أشغّلها <b>wah</b>، أو <b>robot</b>، أو <b>بتترعش</b>، أو كإنها في <b>كاتدرائية</b>.')}</${Talk}>
          <${P}>${X('Every one of those is just arithmetic on samples: a <b>filter</b>, a <b>delay</b>, a <b>multiplication</b>, a <b>curve</b>, or a pile of <b>reflections</b>. This chapter opens the pedal and shows you each one.',
            'كل واحدة من دول مجرد حساب على الـ samples، يعني <b>filter</b>، أو <b>delay</b>، أو <b>ضرب</b>، أو <b>curve</b>، أو كومة <b>انعكاسات</b>. الفصل ده بيفتح الـ pedal ويوريك كل واحدة.')}</${P}>
        `, { sec: t('Meet the effects', 'اتعرّف على الـ effects') }),

        // 2 · where effects go, chains and order
        page(html`
          <${H1}>${t('Where do effects go?', 'الـ effects بتتحط فين؟')}</${H1}>
          <${P} small=${true}>${X('Either <b>during creation/synthesis</b> (then filtered or re-synthesised), or at the <b>end of the audio chain</b> (production / mastering).',
            'يا <b>وقت الـ creation أو الـ synthesis</b> (وبعدين filter أو re-synthesis)، يا في <b>آخر الـ audio chain</b> (الـ production أو الـ mastering).')}</${P}>
          <${P} small=${true}>${X('They can be chained in <b>series</b> or in a <b>parallel</b> audio chain, and the <b>order matters</b>: the same effects in a different order can give a drastically different output. A standard order:',
            'وممكن تتوصل ورا بعض (<b>series</b>) أو في audio chain <b>parallel</b>، و<b>الترتيب بيفرق</b>: نفس الـ effects بترتيب تاني ممكن تطلع output مختلف خالص. ترتيب standard:')}</${P}>
          <div className="hf-mm7-chain hf-in">${['Compression', 'Distortion', 'EQ', 'Noise Redux', 'Amp Sim', 'Modulation', 'Delay', 'Reverb'].map((m, j) => html`<${React.Fragment} key=${j}>${j > 0 && html`<i>→</i>`}<span>${m}</span></${React.Fragment}>`)}</div>
          <${P} small=${true}>${X('A guitar multi-effects pedal (<b>Zoom G1/G1X</b>) links <b>8 modules in series</b>: COMP/EFX, DRIVE, EQ, ZNR, AMP, MODULATION (Chorus, Flanger…), DELAY, REVERB (Hall, Room…).',
            'الـ guitar multi-effects pedal ' + B('(Zoom G1/G1X)') + ' بيوصل <b>8 modules ورا بعض</b>:' + L('COMP/EFX, DRIVE, EQ, ZNR, AMP, MODULATION, DELAY, REVERB'))}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"There is an absolute rule for the order of effects": <b>False</b>. The standard order is only a guide; it depends on the sound you want.',
            'لو قالك فيه قاعدة ثابتة لترتيب الـ effects، دي <b>غلط</b>. الترتيب الـ standard مجرد دليل.')}</p></${Box}>
        `, { sec: t('Chains and order', 'الـ chains والترتيب') }),

        // 3 · order matters, as a visual
        page(html`
          <${H2}>${t('Swap two effects, get a new sound', 'بدّل effect اتنين، يطلعلك صوت جديد')}</${H2}>
          <${Fig} name="mm-fx-order" />
        `),

        // 4 · the six classes
        page(html`
          <${H2}>${t('Six classes, by how the signal is processed', 'ست classes، حسب الـ signal بيتعالج إزاي')}</${H2}>
          <div className="hf-mm7-cls hf-in">
            ${[['Basic filtering', 'lowpass, highpass, equaliser', 'الـ lowpass والـ highpass والـ equaliser'],
              ['Time-varying filters', 'wah-wah, phaser', 'الـ wah-wah والـ phaser'],
              ['Delays', 'vibrato, flanger, chorus, echo', 'الـ vibrato والـ flanger والـ chorus والـ echo'],
              ['Modulators', 'ring modulation, tremolo, vibrato', 'الـ ring modulation والـ tremolo والـ vibrato'],
              ['Non-linear processing', 'compression, limiters, distortion, exciters/enhancers', 'الـ compression والـ limiters والـ distortion والـ exciters والـ enhancers'],
              ['Spatial effects', 'panning, reverb, surround sound', 'الـ panning والـ reverb والـ surround sound']].map(([h, e, a], j) => html`<div key=${j}><b><bdi>${h}</bdi></b><span>${A ? a : e}</span></div>`)}
          </div>
          <${Hand} red=${true} tilt=${true}>${t('Spot it? Vibrato is in TWO classes: a delay effect and a modulator.', 'خدت بالك؟ الـ vibrato موجود في class اتنين: delay وmodulator.')}</${Hand}>
          <${Hand}>${A ? T('حيلة للحفظ (من عندنا) بأول حرف من كل class:' + L('<b>F</b>unny <b>T</b>igers <b>D</b>ance, <b>M</b>onkeys <b>N</b>ever <b>S</b>it')) : html`Memory trick (ours): <b>F</b>unny <b>T</b>igers <b>D</b>ance, <b>M</b>onkeys <b>N</b>ever <b>S</b>it`}</${Hand}>
        `, { sec: t('Six classes', 'الست classes') }),

        // 5 · sorting game
        page(html`
          <${Fig} name="mm-fx-classes" />
        `),

        // 6 · filters and equalisers
        page(html`
          <${H1}>${t('Filter or equaliser?', 'الـ filter ولا الـ equaliser؟')}</${H1}>
          <${Def}>${X('A <b>filter</b> removes or attenuates audio <b>above or below</b> a cut-off frequency. An <b>equaliser</b> <b>enhances or diminishes certain frequency bands</b> while leaving the others unchanged.',
            'الـ <b>filter</b> بيشيل أو يضعّف الصوت <b>فوق أو تحت</b> cut-off frequency. أما الـ <b>equaliser</b> فبـ<b>يقوّي أو يضعّف frequency bands معينة</b> ويسيب الباقي زي ما هو.')}</${Def}>
          <${P} small=${true}>${X('An EQ is built from a series of <b>shelving</b> and <b>peak</b> filters (usually 1st or 2nd order):', 'الـ EQ متبني من سلسلة <b>shelving</b> و<b>peak</b> filters (غالبًا 1st أو 2nd order):')}</${P}>
          <div className="hf-mm7-two hf-in">
            ${card('Shelving', A ? 'بيعمل boost أو cut للـ band <b>الواطية أو العالية</b> (الـ bass shelf أو الـ treble shelf). الـ parameters هي الـ cut-off <b>fc</b> والـ gain <b>G</b>.' : 'Boosts or cuts the <b>low or high</b> band (bass shelf, treble shelf). Parameters: cut-off <b>fc</b> and gain <b>G</b>.')}
            ${card('Peak', A ? 'بيعمل boost أو cut لـ band في <b>النص</b> (mid-frequency). الـ parameters هي الـ centre <b>fc</b> والـ bandwidth <b>fb</b> والـ gain <b>G</b>.' : 'Boosts or cuts a <b>mid-frequency</b> band. Parameters: centre <b>fc</b>, bandwidth <b>fb</b> and gain <b>G</b>.')}
          </div>
          <${P} small=${true}>${X('Inside both sits an <b>allpass</b> filter: it passes <b>all</b> frequencies but modifies their <b>phase</b>. Adding that phase-shifted copy to the input is what boosts or cuts one band.',
            'وجوّه الاتنين فيه <b>allpass</b> filter: بيعدّي <b>كل</b> الـ frequencies بس بيغيّر الـ <b>phase</b> بتاعها. ولما النسخة دي تتجمع على الـ input، بتعلى أو بتوطى band واحدة بس.')}</${P}>
        `, { sec: t('Equalisers', 'الـ Equalisers') }),

        // 7 · formulas and the dB drill
        page(html`
          <${H2}>${t('The formulas, and dB to linear', 'المعادلات، ومن dB لـ linear')}</${H2}>
          <${Code} lines=${[['H(z) = 1 + (H0/2)(1 ± A(z))', t('shelf: + LF, − HF', 'الـ shelf')], ['H(z) = 1 + (H0/2)(1 − A2(z))', t('peak', 'الـ peak')], ['d = −cos(2π fc/fs)', t('peak centre', 'المركز')], ['V0 = 10^(G/20)', t('dB → linear', 'من dB')], 'H0 = V0 − 1']} />
          <${Box} kind="pencil"><p className="hf-p small">${t('Convert the gains. Tap an answer in each row, then check.', 'حوّل الـ gains. اختار إجابة في كل سطر، وبعدين صحّح.')}</p></${Box}>
          <${Drill} id="db" rows=${[
            { q: t('G = 4 dB (the EQ demo). H0 = ?', 'لو ' + B('G = 4 dB') + ' (الـ demo بتاع الـ EQ)، تبقى الـ H0 كام؟'), o: ['0.585', '1.585', '3', '0.4'], a: 0, w: t('V0 = 10^(4/20) = 1.585, then H0 = V0 − 1.', 'الـ ' + B('V0 = 1.585') + '، وبعدين اطرح 1.') },
            { q: t('G = 20 dB. H0 = ?', 'لو ' + B('G = 20 dB') + '، تبقى الـ H0 كام؟'), o: ['1', '9', '19', '99'], a: 1, w: t('V0 = 10^(20/20) = 10, so H0 = 9.', 'الـ V0 بقت 10، يعني ' + B('H0 = 9') + '.') },
            { q: t('G = 6 dB. V0 ≈ ?', 'لو ' + B('G = 6 dB') + '، تبقى الـ V0 تقريبًا كام؟'), o: ['1.995', '3.98', '0.995', '6'], a: 0, w: t('10^(6/20) ≈ 1.995: about double the amplitude.', 'الـ <bdi dir="ltr">10^(6/20)</bdi> تقريبًا 2، يعني الـ amplitude اتضاعفت.') }
          ]} />
        `),

        // 8 · EQ response visual
        page(html`
          <${H2}>${t('Turn the knobs: shelf and peak', 'لف الـ knobs: الـ shelf والـ peak')}</${H2}>
          <${Fig} name="mm-eq-response" />
        `),

        // 9 · time-varying filters
        page(html`
          <${H1}>${t('Time-varying filters: wah-wah', 'الـ Time-varying filters: الـ wah-wah')}</${H1}>
          <${Def}>${X('<b>Wah-wah</b>: a <b>bandpass</b> filter with a <b>small bandwidth</b> whose centre (resonant) frequency is modulated in time. The filtered signal is <b>mixed with the direct signal</b> (direct-mix + wah-mix).',
            'الـ <b>Wah-wah</b> هو <b>bandpass</b> filter <b>ضيق</b> والـ centre (resonant) frequency بتاعته بتتغير مع الوقت. والناتج <b>بيتخلط مع الـ direct signal</b> (الـ direct-mix والـ wah-mix).')}</${Def}>
          <${P} small=${true}>${X('<b>Phaser</b>: the same idea with a <b>notch</b> filter (realisable as cascaded IIR filters), mixed with the direct signal. Change the BP to a notch in the wah-wah code and you have a phaser.',
            'الـ <b>Phaser</b>: نفس الفكرة بس بـ <b>notch</b> filter (ينفع يتعمل من IIR filters ورا بعض)، وبرضه بيتخلط مع الـ direct signal. غيّر الـ BP لـ notch في كود الـ wah-wah يطلعلك phaser.')}</${P}>
          <${P} small=${true}>${X('<b>M-fold wah-wah</b>: M tap-delay bandpass filters spread over the whole spectrum change their centre frequencies <b>simultaneously</b>. A <b>bell effect</b> needs about a hundred of them with narrow bandwidths.',
            'الـ <b>M-fold wah-wah</b>: عدد M من الـ tap-delay bandpass filters على الـ spectrum كله بيغيّروا الـ centre frequencies <b>مع بعض</b>. والـ <b>bell effect</b> محتاج حوالي مية منهم بـ bandwidth ضيق.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Wah-wah = moving <b>bandpass</b> (a moving peak). Phaser = moving <b>notch</b> (a moving dip). Both are <b>time-varying filters</b>, not delays.',
            'الـ wah-wah قمة بتتحرك (<b>bandpass</b>)، والـ phaser وادي بيتحرك (<b>notch</b>). والاتنين <b>time-varying filters</b>، مش delays.')}</p></${Box}>
        `, { sec: t('Time-varying filters', 'الـ Time-varying filters') }),

        // 10 · wah-wah visual
        page(html`
          <${H2}>${t('Watch the band sweep', 'اتفرج على الـ band وهي بتتحرك')}</${H2}>
          <${Fig} name="mm-wah-flow" />
        `),

        // 11 · state variable filter
        page(html`
          <${H2}>${t('Inside the wah: the state variable filter', 'جوّه الـ wah: الـ state variable filter')}</${H2}>
          <${Def}>${X('Borrowed from analog electronics, the <b>State Variable Filter</b> gives <b>independent control of cut-off frequency and damping</b>, and outputs <b>lowpass, bandpass and highpass</b> signals <b>simultaneously</b>.',
            'الـ <b>State Variable Filter</b> مأخوذ من الـ analog electronics، وبيدّي <b>تحكم مستقل في الـ cut-off frequency والـ damping</b>، وبيطلّع <b>lowpass وbandpass وhighpass</b> <b>في نفس الوقت</b>.')}</${Def}>
          <${Code} lines=${[['yl(n) = F1·yb(n) + yl(n−1)', 'LP'], ['yb(n) = F1·yh(n) + yb(n−1)', 'BP'], 'yh(n) = x(n) − yl(n−1) − Q1·yb(n−1)', ['F1 = 2 sin(π fc/fs),  Q1 = 2d', '']]} />
          <${P} small=${true}>${X('Example: fc = 1000 Hz, fs = 44100 Hz → F1 = 2 sin(0.07124) ≈ <b>0.1424</b>; damping d = 0.05 → Q1 = <b>0.1</b>.',
            'مثال:' + L('fc = 1000 Hz, fs = 44100 Hz → F1 = 2 sin(0.07124) ≈ <b>0.1424</b>') + L('d = 0.05 → Q1 = <b>0.1</b>'))}</${P}>
          <${P} small=${true}>${X('The wah-wah is this filter with its fc swept as a <b>triangle wave</b> between 500 and 3000 Hz (Fw = 2000 Hz per second, damping 0.05). <b>F1 must be recalculated every time fc changes</b>, and a lower damping gives a smaller pass band.',
            'والـ wah-wah هو الـ filter ده والـ fc بتاعه بيتحرك <b>triangle wave</b> بين 500 و3000 Hz (الـ Fw بـ 2000 Hz في الثانية، والـ damping بـ 0.05). <b>لازم الـ F1 يتحسب من جديد كل ما الـ fc يتغير</b>، والـ damping الأقل بيدّي pass band أصغر.')}</${P}>
        `),

        // 12 · delay effects and comb filters
        page(html`
          <${H1}>${t('Delays: echoes in a box', 'الـ Delays: صدى جوّه علبة')}</${H1}>
          <${P} small=${true}>${X('In a cave or a large room you hear <b>echo</b> and <b>reverberation</b>; closely spaced parallel walls give repeated reflections you hear as a change of <b>sound colour</b>. Delay effects model these reflections, and they are built from two <b>comb filters</b>:',
            'في كهف أو أوضة كبيرة بتسمع <b>echo</b> و<b>reverberation</b>، والحيطان المتوازية القريبة بتدّي انعكاسات متكررة بتسمعها كتغيير في <b>لون الصوت</b>. الـ delay effects بتعمل model للانعكاسات دي، ومتبنية من نوعين <b>comb filters</b>:')}</${P}>
          <div className="hf-mm7-two hf-in">
            ${card('FIR comb', A ? 'هو <b>delay واحد</b>: الـ input متأخر بـ τ بيتجمع على الـ input بـ gain g.' + L('y(n) = x(n) + g·x(n−M)') + L('H(z) = 1 + g·z<sup>−M</sup>') : 'A <b>single delay</b>: the input delayed by τ is added to the input with gain g.<br/><code>y(n) = x(n) + g·x(n−M)</code><br/><code>H(z) = 1 + g·z<sup>−M</sup></code>')}
            ${card('IIR comb', A ? 'انعكاسات <b>مالهاش نهاية</b> بين طرفين cylinder: الـ <b>output</b> بيلف في الـ delay line ويضعف بـ g كل لفة.' + L('y(n) = c·x(n) + g·y(n−M)') : '<b>Endless</b> reflections at both ends of a cylinder: the <b>output</b> circulates in the delay line, attenuated by g on each pass.<br/><code>y(n) = c·x(n) + g·y(n−M)</code>')}
          </div>
          <${P} small=${true}>${X('The input of the IIR comb is sometimes scaled by <b>c</b> to compensate for the structure\'s high amplification. Combine both combs and you get the <b>Universal Comb Filter</b>.',
            'والـ input بتاع الـ IIR comb ساعات بيتضرب في <b>c</b> عشان يعوّض الـ amplification العالي بتاع التركيبة. ولو جمعت الاتنين يطلعلك الـ <b>Universal Comb Filter</b>.')}</${P}>
        `, { sec: t('Comb filters', 'الـ Comb filters') }),

        // 13 · delay in samples ‡ and the drill
        page(html`
          <${H2}>${t('How many samples is τ?', 'الـ τ دي كام sample؟')}</${H2}>
          <${Def}>${X('The delay in samples is <b>M = τ × fs</b>: the time τ divided by the sampling period 1/fs.<br/>‡ The slides write M = τ/fs; dividing by fs gives a meaningless tiny number. τ × fs is what is meant.',
            'الـ delay بالـ samples هو' + L('<b>M = τ × fs</b>') + 'يعني الوقت τ مقسوم على الـ sampling period. ‡ السلايدز كاتبة ' + B('M = τ/fs') + '، والقسمة على fs بتطلّع رقم صغير مالوش معنى. المقصود ' + B('τ × fs') + '.')}</${Def}>
          <${Drill} id="dl" rows=${[
            { q: t('A 100 ms echo at fs = 44.1 kHz. M = ?', 'لو echo بـ 100 ms عند 44.1 kHz، تبقى M كام؟'), o: ['441', '4410', '44100', '0.0000023'], a: 1, w: t('0.1 s × 44100 = 4410 samples.', 'الحساب: <bdi dir="ltr">0.1&nbsp;×&nbsp;44100&nbsp;=&nbsp;4410</bdi>') },
            { q: t('The flanger\'s 3 ms maximum at 44.1 kHz. M = ?', 'لو أقصى delay للـ flanger 3 ms عند 44.1 kHz، تبقى M كام؟'), o: ['13', '132', '1323', '14700'], a: 1, w: t('0.003 × 44100 = 132.3, rounded to 132.', 'الحساب: <bdi dir="ltr">0.003&nbsp;×&nbsp;44100&nbsp;=&nbsp;132.3&nbsp;→&nbsp;132</bdi>') },
            { q: t('A 100 ms echo at fs = 8 kHz. M = ?', 'لو echo بـ 100 ms عند 8 kHz، تبقى M كام؟'), o: ['80', '800', '8000', '0.0125'], a: 1, w: t('0.1 × 8000 = 800 samples.', 'الحساب: <bdi dir="ltr">0.1&nbsp;×&nbsp;8000&nbsp;=&nbsp;800</bdi>') },
            { q: t('M = 10 samples at fs = 8 kHz. τ = ?', 'لو ' + B('M = 10') + ' samples عند 8 kHz، تبقى τ كام؟'), o: ['0.8 ms', '1.25 ms', '12.5 ms', '80 ms'], a: 1, w: t('τ = M / fs = 10 / 8000 s = 1.25 ms.', 'الحساب: <bdi dir="ltr">10&nbsp;/&nbsp;8000&nbsp;s&nbsp;=&nbsp;1.25&nbsp;ms</bdi>') }
          ]} />
        `),

        // 14 · be the comb filter
        page(html`
          <${Box} kind="pencil" title=${t('Be the comb filter', 'خليك إنت الـ comb filter')}><p className="hf-p small">${X('The lecture\'s fircomb.m and iircomb.m: a unit impulse <code>x = 1, 0, 0, …</code> goes in, with <b>g = 0.5</b>, <b>M = 10</b> and c = 1. Fill in the output y(n).',
            'زي fircomb.m وiircomb.m في المحاضرة: بيدخل unit impulse' + L('x = 1, 0, 0, …') + 'والـ ' + B('g = 0.5') + ' والـ ' + B('M = 10') + ' والـ ' + B('c = 1') + '. املا الـ output.')}</p></${Box}>
          <${CombTrace} id="ct" />
          <${Grow} />
          <${Hand} arrow="up">${t('hint: the FIR line is fed with the input, the IIR line with its own output', 'تلميح: الـ FIR بيتغذى من الـ input، والـ IIR من الـ output بتاعه')}</${Hand}>
        `, { sec: t('Worked example', 'مثال محلول') }),

        // 15 · comb impulse visual
        page(html`
          <${H2}>${t('Now watch it, sample by sample', 'اتفرج عليه sample sample')}</${H2}>
          <${Fig} name="mm-comb-impulse" />
        `),

        // 16 · worked example explained + fireside
        page(html`
          <${Fireside} sub=${t('Tonight: the FIR comb and the IIR comb argue about who makes the better echo.', 'قعدة الليلة: الـ FIR comb والـ IIR comb بيتخانقوا مين بيعمل echo أحسن.')} />
          <${Chat} names=${[t('FIR comb', 'الـ FIR comb'), t('IIR comb', 'الـ IIR comb')]} lines=${A ? [
            [0, 'أنا <b>delay واحد</b>. باخد الـ <b>input</b>، أأخّره M samples، وأضربه في g.'],
            [1, 'نسخة واحدة بس؟ أنا بدخّل الـ <b>output</b> بتاعي تاني في الـ delay line، فالصوت بيلف ويلف.'],
            [0, 'الـ impulse بتاعي:' + L('y(0) = 1, y(10) = 0.5') + 'وبعدين سكوت. <b>echo واحد</b>.'],
            [1, 'وأنا كل لفة بضرب في g تاني:' + L('1, 0.5, 0.25, 0.125, 0.0625 …') + 'echoes <b>مالهاش نهاية</b> بتقل exponentially.'],
            [0, 'وعشان صوتك عالي، ساعات بيضربوا الـ input بتاعك في c.'],
            [1, 'ولو اتجمعنا، يطلع الـ <b>Universal Comb</b>.']
          ] : [
            [0, "I'm a <b>single delay</b>. I take the <b>input</b>, hold it M samples, and add it back times g."],
            [1, 'One copy? I feed my <b>output</b> back into the delay line. Round and round it goes.'],
            [0, 'My impulse response: y(0) = 1, y(10) = 0.5, then silence. <b>One echo.</b>'],
            [1, 'Each pass multiplies by g again: 1, 0.5, 0.25, 0.125, 0.0625… <b>endless</b>, exponentially decaying echoes.'],
            [0, "You're so loud they sometimes scale your input by c."],
            [1, 'And put us together, we become the <b>Universal Comb</b>.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('y(30) of the IIR comb = 0.5³ = <b>0.125</b>; of the FIR comb it is <b>0</b>. Echoes decay, they never add up at one sample.',
            'الـ y(30) في الـ IIR comb بتساوي ' + B('0.5³ = 0.125') + '، وفي الـ FIR بتساوي <b>صفر</b>. الـ echoes بتقل، عمرها ما بتتجمع على sample واحدة.')}</p></${Box}>
        `),

        // 17 · universal comb
        page(html`
          <${H2}>${t('One filter to rule them all: the universal comb', 'الـ filter اللي بيعمل الكل: الـ universal comb')}</${H2}>
          <${P} small=${true}>${X('Basically an <b>allpass</b> with an M-sample delay and an extra <b>feed-forward</b> multiplier. Three knobs: <b>BL</b> (blend), <b>FB</b> (feedback), <b>FF</b> (feed-forward).',
            'هو في الأساس <b>allpass</b> فيه delay بـ M sample وmultiplier زيادة <b>feed-forward</b>. وفيه تلات knobs: الـ <b>BL</b> (blend) والـ <b>FB</b> (feedback) والـ <b>FF</b> (feed-forward).')}</${P}>
          <${Code} lines=${['xh(n) = x(n) + FB·xh(n−M)', 'y(n)  = FF·xh(n−M) + BL·xh(n)']} />
          <table className="hf-mm7-tb hf-in" dir="ltr"><thead><tr><th className="l">Filter</th><th>BL</th><th>FB</th><th>FF</th></tr></thead>
            <tbody>${[['FIR comb', '1', '0', 'g'], ['IIR comb', '1', 'g', '0'], ['Allpass', 'a', '−a', '1'], ['Delay', '0', '0', '1']].map(r => html`<tr key=${r[0]}><td className="l">${r[0]}</td>${r.slice(1).map((v, j) => html`<td key=${j} className="m">${v}</td>`)}</tr>`)}</tbody></table>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('A pure <b>delay</b> is 0, 0, 1. Why must BL be <b>0</b>? What would BL = 1 add to the output?',
            'الـ <b>delay</b> الصافي هو 0 و0 و1. ليه لازم الـ BL يبقى <b>صفر</b>؟ ولو بقى 1، هيضيف إيه للـ output؟')}</p>
            <${Reveal} id="bl"><p className="hf-p small">${X('BL blends in the <b>direct</b> signal. With BL = 1 and FF = 1 you hear the input plus one delayed copy: that is a FIR comb with g = 1, not a delay.',
              'الـ BL بيخلط الـ signal <b>المباشر</b>. لو الـ BL والـ FF الاتنين بـ 1، هتسمع الـ input ومعاه نسخة متأخرة: ده FIR comb بـ ' + B('g = 1') + '، مش delay.')}</p></${Reveal}></${Box}>
        `),

        // 18 · universal comb visual
        page(html`
          <${Fig} name="mm-unicomb" />
        `),

        // 19 · vibrato
        page(html`
          <${H1}>${t('Vibrato: a Doppler in a box', 'الـ Vibrato يعني Doppler جوّه علبة')}</${H1}>
          <${Def}>${X('<b>Vibrato</b>: periodically varying (modulating) the <b>time delay</b>. Like the <b>Doppler effect</b>: changing the distance between source and listener changes the pitch.',
            'الـ <b>Vibrato</b> إنك تغيّر (تعمل modulation لـ) الـ <b>time delay</b> بشكل دوري. زي الـ <b>Doppler effect</b>: لما المسافة بين المصدر والسامع تتغير، الـ pitch بيتغير.')}</${Def}>
          <${UL} items=${A ? [
            'بيتعمل بـ delay line ومعاه <b>LFO</b> (low frequency oscillator).',
            'و<b>بنسمع الـ delayed signal بس</b>، مفيش forward ولا backward feed.',
            'الـ delay العادي <b>' + B('5–10') + ' ms</b>، والـ LFO rate <b>' + B('5–14') + ' Hz</b>.',
            'والكود بيستخدم linear أو allpass interpolation للـ fractional delays.'
          ] : [
            'Built from a delay line and a <b>low frequency oscillator (LFO)</b>.',
            '<b>Only the delayed signal is heard</b>: no forward or backward feed.',
            'Typical delay <b>5–10 ms</b>, LFO rate <b>5–14 Hz</b>.',
            'The code uses linear (or allpass) interpolation for fractional delays.'
          ]} />
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['هو الـ vibrato delay ولا modulator؟', 'الاتنين: موجود في الـ <b>Delays</b> والـ <b>Modulators</b>، وسلايدز الـ modulation بتعتبره <b>phase</b> modulation.']
          ] : [
            ['Is vibrato a delay or a modulator?', 'Both: the classification lists it under <b>Delays</b> and <b>Modulators</b>, and the modulation slides list it as <b>phase</b> modulation.']
          ]} />
        `, { sec: t('Vibrato and friends', 'الـ Vibrato وصحابه') }),

        // 20 · vibrato visual
        page(html`
          <${Fig} name="mm-vibrato" />
        `),

        // 21 · flanger, chorus, slapback, echo
        page(html`
          <${H2}>${t('Same comb, different delay', 'نفس الـ comb، بس الـ delay مختلف')}</${H2}>
          <${P} small=${true}>${X('Flanger, chorus, slapback, echo: each is a comb filter (FIR or IIR) plus some modulation. What differs is the <b>delay range</b>.',
            'الـ flanger والـ chorus والـ slapback والـ echo كلهم comb filter (FIR أو IIR) مع شوية modulation، والفرق في <b>الـ delay range</b>.')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Slapback (doubling)</b>: تكرار سريع للصوت.',
            'الـ <b>Flanging</b>: الـ delay بيتغير باستمرار بـ LFO.',
            'الـ <b>Chorus</b>: كذا نسخة، كل واحدة بـ delay صغير <b>random</b>.'
          ] : [
            '<b>Slapback (doubling)</b>: a quick repetition of the sound.',
            '<b>Flanging</b>: the delay varied continuously by an LFO.',
            '<b>Chorus</b>: several copies, each with a small <b>random</b> delay.'
          ]} />
          <table className="hf-mm7-tb hf-in" dir="ltr"><thead><tr><th className="l">Effect</th><th>Delay (ms)</th><th>Modulation</th></tr></thead>
            <tbody>${[['Resonator', '0 … 20', 'None'], ['Flanger', '0 … 15', 'Sinusoidal (≈ 1 Hz)'], ['Chorus', '10 … 25', 'Random'], ['Slapback', '25 … 50', 'None'], ['Echo', '> 50', 'None']].map(r => html`<tr key=${r[0]}><td className="l">${r[0]}</td><td className="m">${r[1]}</td><td>${r[2]}</td></tr>`)}</tbody></table>
          <${Grow} />
          <${Code} lines=${[['y(i) = 0.7·x(i)', 'flanger.m'], '     + 0.7·x(i − cur_delay)', ['3 ms → round(132.3) = 132', t('samples', 'sample')]]} />
          <${P} small=${true}>${X('One FIR delay swinging 0–3 ms (or 0–15) at 0.1–5 Hz.',
            'فيه FIR delay واحد بيتذبذب ' + B('0–3 ms') + ' (أو ' + B('0–15') + ') بمعدل ' + B('0.1–5 Hz') + '.')}</${P}>
        `),

        // 22 · match the delay effects
        page(html`
          <${H2}>${t('Who lives where on the delay line?', 'مين ساكن فين على خط الـ delay؟')}</${H2}>
          <${P} small=${true}>${t('Match each effect to its delay range and modulation. Tap an effect, then its range.', 'وصّل كل effect بالـ delay range والـ modulation بتوعه. دوس على الـ effect، وبعدين على الـ range.')}</${P}>
          <${Match} id="rng" left=${['Resonator', 'Flanger', 'Chorus', 'Slapback', 'Echo']}
            right=${A ? ['من 10 لـ 25 ms، بـ modulation random', 'أكتر من 50 ms، من غير modulation', 'من 0 لـ 20 ms، من غير modulation', 'من 25 لـ 50 ms، تكرار سريع من غير modulation', 'من 0 لـ 15 ms، بـ sine حوالي 1 Hz']
              : ['10–25 ms, random modulation', '> 50 ms, no modulation', '0–20 ms, no modulation', '25–50 ms, a quick repetition, no modulation', '0–15 ms, sinusoidal at about 1 Hz']}
            answer=${[2, 4, 0, 3, 1]} />
          <${Grow} />
          <${Hand} red=${true}>${t('Trap: 10–25 ms with RANDOM modulation is chorus, not flanger (flanger is sinusoidal).', 'فخ: الـ ' + B('10–25 ms') + ' مع modulation random ده chorus، مش flanger (الـ flanger بـ sine).')}</${Hand}>
        `, { sec: t('Exercises', 'التمارين') }),

        // 23 · modulation: RM and AM
        page(html`
          <${H1}>${t('Modulation: wobble a sinusoid', 'الـ Modulation: هزّ الـ sinusoid')}</${H1}>
          <${P} small=${true}>${X('<b>Modulation</b>: the <b>amplitude, frequency or phase</b> of a sinusoid is varied by an audio signal. You have met all three: amplitude → wah-wah, phaser; frequency → FM synthesis; phase → vibrato, chorus, flanger.',
            'الـ <b>Modulation</b> إن الـ <b>amplitude أو الـ frequency أو الـ phase</b> بتاعة sinusoid تتغير بـ audio signal. وإنت شفت التلاتة:' + L('amplitude → wah-wah, phaser') + L('frequency → FM synthesis') + L('phase → vibrato, chorus, flanger'))}</${P}>
          <div className="hf-mm7-two hf-in">
            ${card('Ring modulation', A ? 'اضرب الـ audio في sine carrier:' + L('y(n) = x(n)·m(n)') + 'بيطلع <b>المجموع والفرق بس</b>:' + L('fc + fx, fc − fx') : 'Multiply the audio by a sine carrier:<br/><code>y(n) = x(n)·m(n)</code><br/>Only the <b>sum and difference</b> remain: fc + fx and fc − fx.')}
            ${card('AM', A ? 'والـ α هي الـ depth:' + L('y(n) = (1 + α·m(n))·x(n)') + 'بيطلع <b>تلات</b> ترددات:' + L('fc, fc − fx, fc + fx') : '<code>y(n) = (1 + α·m(n))·x(n)</code>, depth α (1 = maximum, 0 = off). <b>Three</b> lines: fc, fc − fx, fc + fx.')}
          </div>
          <${P} small=${true}>${X('RM example: fc = 440 Hz, fx = 200 Hz → <b>640 Hz and 240 Hz</b>, no 440, no 200. A periodic input with fundamental f0 gives lines at |k·f0 ± fc|. RM made the <b>robotic speech</b> of old sci-fi films; used carelessly it sounds odd and non-musical.',
            'مثال الـ RM:' + L('fc = 440 Hz, fx = 200 Hz → 640 Hz, 240 Hz') + 'ومفيش 440 ولا 200. ولو الـ input دوري بـ fundamental f0 تطلع خطوط عند ' + B('|k·f0 ± fc|') + '. الـ RM هو صوت الـ <b>robot</b> في أفلام الـ sci-fi القديمة، ولو اتستخدم من غير تركيز بيطلع غريب ومش musical.')}</${P}>
        `, { sec: t('Modulation', 'الـ Modulation') }),

        // 24 · ring mod visual
        page(html`
          <${Fig} name="mm-ring-mod" />
        `),

        // 25 · spectrum exercise + tremolo
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('A <b>1000 Hz</b> carrier meets a <b>300 Hz</b> sine. Tap every frequency you would hear, for RM and then for AM.',
            'الـ carrier بـ <b>1000 Hz</b> والـ sine التانية بـ <b>300 Hz</b>. دوس على كل frequency هتسمعها، في الـ RM وبعدين في الـ AM.')}</p></${Box}>
          <${Spectrum} id="sp" />
        `),

        // 26 · tremolo
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Tremolo</b> wobbles the <b>loudness</b>: AM with a modulator <b>below 20 Hz</b> (demo 5 Hz, α = 0.5, gain 0.5 to 1.5), or RM with a triangular LFO. <b>Vibrato</b> wobbles the <b>pitch</b>. Don\'t swap them.',
            'الـ <b>Tremolo</b> بيهزّ <b>العلو</b>: يعني AM بـ modulator <b>تحت 20 Hz</b> (الـ demo على ' + B('5 Hz, α = 0.5') + '، والـ gain من 0.5 لـ 1.5)، أو RM مع LFO triangular. أما الـ <b>Vibrato</b> فبيهزّ الـ <b>pitch</b>.')}</p></${Box}>
          <${Fig} name="mm-tremolo" />
        `),

        // 26 · non-linear processing: categories and dynamics
        page(html`
          <${H1}>${t('Non-linear: new harmonics', 'الـ Non-linear بيعمل harmonics جديدة')}</${H1}>
          <${P} small=${true}>${X('Non-linear processors create (on purpose or not) <b>harmonic and inharmonic components that were not in the original signal</b>. Three categories:',
            'الـ non-linear processors بتعمل (بقصد أو من غير قصد) <b>harmonic وinharmonic components مكانتش في الـ signal الأصلي</b>. تلات أنواع:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>dynamic processing</b> بيتحكم في الـ envelope وهدفه <b>يقلل</b> الـ harmonic distortion (الـ compressors والـ limiters).',
            'الـ <b>intentional non-linear harmonic processing</b> يعني distortion قوي بقصد، زي الـ guitar distortion.',
            'الـ <b>exciters والـ enhancers</b> بيزودوا harmonics لتحسين خفيف.'
          ] : [
            '<b>Dynamic processing</b>: controls the envelope and aims to <b>minimise</b> harmonic distortion (compressors, limiters).',
            '<b>Intentional non-linear harmonic processing</b>: strong distortion (guitar distortion).',
            '<b>Exciters/enhancers</b>: add harmonics for a subtle improvement.'
          ]} />
          <${Grow} />
          <${Talk} who="spk" flip=${true}>${X('Guitar distortion is the second kind: the new harmonics are the whole point.', 'الـ guitar distortion من النوع التاني: الـ harmonics الجديدة هي المقصودة أصلًا.')}</${Talk}>
        `, { sec: t('Non-linear processing', 'الـ Non-linear processing') }),

        // 28 · limiter, compressor, expander
        page(html`
          <${H2}>${t('Three ways to tame the dynamics', 'تلات طرق تتحكم بيها في الـ dynamics')}</${H2}>
          <div className="hf-mm7-cls hf-in" style=${{ gridTemplateColumns: '1fr' }}>
            <div><b>Limiter</b><span>${T(A ? 'بيتحكم في الـ <b>peaks العالية</b> ويغيّر الـ dynamics أقل ما يمكن. بيستخدم <b>peak level measurement</b> وبيتفاعل <b>بسرعة جدًا</b> فوق الـ threshold. لما الـ peaks توطى، الـ signal كله يقدر يعلى. بيستخدم لآلات منفردة وللـ final mastering (الـ CD والـ radio).' : 'Controls <b>high peaks</b>, changing the main dynamics as little as possible. Uses a <b>peak level measurement</b> and reacts <b>very quickly</b> above a threshold. Lower peaks let the overall signal be boosted. For single instruments and final mastering (CD, radio).')}</span></div>
            <div><b>Compressor</b><span>${T(A ? 'بـ<b>يقلل الـ dynamics</b>: الأجزاء العالية بتقل بـ static curve (والواطية بتتعدل). بيعلّي الـ level العام في الـ mastering، وكتير على الـ vocals والـ guitar.' : '<b>Reduces the dynamics</b>: loud parts are reduced by a static curve (quiet parts modified). Boosts the overall level in mastering; often on vocals and guitar.')}</span></div>
            <div><b>Expander</b><span>${T(A ? 'بيشتغل على المستويات <b>الواطية</b> وبـ<b>يعلّي</b> الـ dynamics بتاعتها، فالصوت يبقى فيه حياة أكتر.' : 'Works on <b>low</b> signal levels and <b>boosts</b> their dynamics: a more lively sound.')}</span></div>
          </div>
        `),

        // 29 · sort: limiter, compressor, expander
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Who does it? <b>L</b> = limiter, <b>C</b> = compressor, <b>E</b> = expander.', 'مين بيعمل كده؟ الـ <b>L</b> للـ limiter، والـ <b>C</b> للـ compressor، والـ <b>E</b> للـ expander.')}</p></${Box}>
          <${Sort} id="lce" bins=${[['L', 'Limiter'], ['C', 'Compressor'], ['E', 'Expander']]} items=${A ? [
            ['بيتفاعل بسرعة جدًا مع الـ peaks اللي فوق الـ threshold', 0],
            ['بيستخدم peak level measurement', 0],
            ['بيقلل الـ dynamics بـ static curve', 1],
            ['بيشتغل على المستويات الواطية ويعلّي الـ dynamics بتاعتها', 2],
            ['بيخلي الصوت فيه حياة أكتر', 2],
            ['كتير بيتحط على الـ vocals والـ guitar', 1],
            ['لما يوطّي الـ peaks، الـ signal كله يقدر يعلى', 0]
          ] : [
            ['Reacts very quickly to peaks above a threshold', 0],
            ['Uses a peak level measurement', 0],
            ['Reduces the dynamics with a static curve', 1],
            ['Works on low levels and boosts their dynamics', 2],
            ['Gives a more lively sound', 2],
            ['Often used on vocals and guitar', 1],
            ['Lowering its peaks lets the whole signal be boosted', 0]
          ]} />
        `),

        // 28 · distortion: overdrive, distortion, fuzz
        page(html`
          <${H2}>${t('Overdrive, distortion, fuzz', 'الـ Overdrive والـ distortion والـ fuzz')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>Overdrive</b>: مستويات input واطية بتتزق لمستويات أعلى في non-linear curve.',
            'الـ <b>Distortion</b>: مساحة tonal أوسع، ومنطقة non-linear أعلى.',
            'الـ <b>Fuzz</b>: سلوك non-linear بالكامل، أخشن وأقسى.'
          ] : [
            '<b>Overdrive</b>: low input levels driven by higher levels into a non-linear curve.',
            '<b>Distortion</b>: a wider tonal area, a higher non-linear region.',
            '<b>Fuzz</b>: complete non-linear behaviour, harder and harsher.'
          ]} />
          <${P} small=${true}>${X('Overdrive is <b>symmetrical soft clipping</b>: linear ×2, then quadratic, then saturated.', 'الـ Overdrive هو <b>symmetrical soft clipping</b>: خطي ×2، بعدين quadratic، بعدين saturated.')}</${P}>
          <${Code} lines=${['0 ≤ x < 1/3:   f = 2x', '1/3 ≤ x < 2/3: f = (3 − (2 − 3x)²)/3', '2/3 ≤ x ≤ 1:   f = 1', ['x = 0.2 → 0.4', ''], ['x = 0.5 → 0.917', ''], ['x = 0.8 → 1', '']]} />
          <${P} small=${true}>${X('<b>Distortion/Fuzz</b>: a non-linear exponential amplification, f(x) = (x/|x|)(1 − e<sup>αx²/|x|</sup>) as printed on the slide; the gain <b>α</b> sets the amount, and part of the distorted signal is usually <b>mixed</b> with the original.<br/>‡ For the curve to level off at ±1 the exponent must be negative; the site\'s fuzz visual (fuzzexp.m) computes it that way.',
            'الـ <b>Distortion/Fuzz</b>: تكبير non-linear أُسّي، زي ما هو مكتوب على السلايد:' + L('f(x) = (x/|x|)(1 − e<sup>αx²/|x|</sup>)') + 'الـ gain <b>α</b> بيحدد الكمية، وعادةً جزء من الـ distorted signal بـ<b>يتخلط</b> مع الأصلي. ‡ عشان المنحنى يثبت عند ' + B('±1') + ' لازم الأُس يبقى سالب، وكده بيحسبه الـ visual (fuzzexp.m).')}</${P}>
        `),

        // 29 · overdrive visual
        page(html`
          <${Fig} name="mm-overdrive" />
        `),

        // 30 · exciter and enhancer
        page(html`
          <${H2}>${t('Exciter and enhancer: just a little shine', 'الـ Exciter والـ enhancer: لمعة صغيرة')}</${H2}>
          <div className="hf-mm7-two hf-in">
            ${card('Exciter', A ? 'بيبرز أو يقلل frequencies معينة عشان يغيّر الـ <b>timbre</b>، ويدّي brightness زيادة من غير EQ. بيعمل high-frequency distortion خفيف وphase shifting بالـ <b>Short-Time Fourier Transform</b> (phase vocoder). بيزود الـ presence والوضوح وفهم الكلام، وأحسن حاجة على signals <b>ناقصها high frequencies</b>.' : 'Emphasises or de-emphasises certain frequencies to change the <b>timbre</b>: extra brightness without EQ. Subtle high-frequency distortion and phase shifting via the <b>Short-Time Fourier Transform</b> (phase vocoder). Adds presence, clarity and speech intelligibility; best on signals <b>lacking high frequencies</b>.')}
            ${card('Enhancer', A ? 'هو <b>equalisation + non-linear processing</b>: كمية distortion "بالكاد ملحوظة". فيه filter network (<b>3 bands</b> على الأقل) وharmonic generator. بيستخدم بدل الـ EQs في بعض الـ consoles، وللـ stereo enhancement في الـ radio broadcast.' : '<b>Equalisation + non-linear processing</b>: a "just noticeable" amount of distortion. A filter network (at least <b>3 bands</b>) plus a harmonic generator. Used instead of EQs on some consoles, and for stereo enhancement in radio broadcast.')}
          </div>
          <${Grow} />
          <${Hand} red=${true}>${t('Exciter: brightness WITHOUT EQ. Enhancer: EQ PLUS non-linear processing.', 'الـ exciter لمعة من غير EQ، والـ enhancer هو EQ ومعاه non-linear processing.')}</${Hand}>
        `),

        // 31 · panning
        page(html`
          <${H2}>${t('Panning: steer a mono sound', 'الـ Panning: حرّك صوت mono')}</${H2}>
          <${P} small=${true}>${X('<b>Panning</b> maps a <b>mono</b> source across the stereo image, moving it from one speaker to the other in n steps. The listener sits in the centre; the speakers subtend 2θ<sub>l</sub> (assume θ<sub>l</sub> = 45°). The gains come from a <b>2D rotation</b> of the same mono x in both rows:',
            'الـ <b>Panning</b> إنك توزّع مصدر <b>mono</b> على الـ stereo image وتنقله من speaker للتاني في n خطوة. السامع في النص، والـ speakers عاملين زاوية ' + B('2θ<sub>l</sub>') + ' (نفترض ' + B('θ<sub>l</sub> = 45°') + '). والـ gains جاية من <b>2D rotation</b> لنفس الـ mono x في الصفين:')}</${P}>
          <${Code} lines=${['A(θ) = [cos θ, sin θ; −sin θ, cos θ]', 'gL = (cos θ + sin θ)·x', 'gR = (cos θ − sin θ)·x', ['θ = 0   → gL = gR = x', t('centre', 'في النص')], 'θ = 45° → gL = 1.414x, gR = 0', ['−40° → 40° in 32 steps', t('matpan.m', 'الـ demo')]]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('θ = 30°: what are gL and gR? (cos 30° ≈ 0.866, sin 30° = 0.5)', 'لو ' + B('θ = 30°') + '، يبقى الـ gL والـ gR كام؟' + L('cos 30° ≈ 0.866, sin 30° = 0.5'))}</p>
            <${Reveal} id="pan"><p className="hf-p small">${X('gL ≈ <b>1.366x</b>, gR ≈ <b>0.366x</b>: the sound leans left.', 'الناتج:' + L('gL ≈ <b>1.366x</b>, gR ≈ <b>0.366x</b>') + 'يعني الصوت مايل للشمال.')}</p></${Reveal}></${Box}>
        `, { sec: t('Spatial effects', 'الـ Spatial effects') }),

        // 32 · reverb
        page(html`
          <${H2}>${t('Reverb: a room full of late, weak copies', 'الـ Reverb: أوضة مليانة نسخ متأخرة وضعيفة')}</${H2}>
          <${P} small=${true}>${X('<b>Reverb</b> is the result of the <b>many reflections</b> of a sound in a room. Reflected waves arrive <b>later</b> (a longer path) and <b>weaker</b> (the walls absorb energy). This series of delayed, attenuated waves creates the room\'s <b>spaciousness</b>, bigger in halls and cathedrals.',
            'الـ <b>Reverb</b> نتيجة <b>الانعكاسات الكتير</b> للصوت في أوضة. الموجات المنعكسة بتوصل <b>متأخر</b> (مسار أطول) و<b>أضعف</b> (الحيطان بتمتص طاقة). والسلسلة دي هي اللي بتعمل <b>الإحساس بالمساحة</b>، وبيبقى أكبر في القاعات والكاتدرائيات.')}</${P}>
          <${UL} items=${A ? [
            '<b>مقابل الـ echo</b>: الـ echo نسخة متأخرة <b>واضحة</b> (delay أكتر من عُشر أو عُشرين من الثانية). في الـ reverb الانعكاس بيوصل بسرعة فبنسمع التأثير المجمّع بس.',
            '<b>مقابل الـ delay</b>: الـ delay بالـ feedback بيدّي انعكاسات على <b>فترة ثابتة</b>. في الأوضة الحقيقية <b>معدل الوصول بيتغير</b>: الأول <b>early reflections</b> ليها اتجاه (شكل الأوضة وحجمها ومكان المصدر والسامع)، بعدين <b>diffuse (late) reverberation</b> أكثف وrandom، بتقل <b>exponentially</b> في القاعات الكويسة.'
          ] : [
            '<b>v. echo</b>: an echo is a <b>distinct</b> delayed copy (delay more than about one or two tenths of a second). In reverb each reflection arrives so quickly we hear only the combined effect.',
            '<b>v. a delay</b>: a delay with feedback gives reflections at a <b>fixed interval</b>. In a real room the <b>arrival rate changes</b>: first <b>early reflections</b> (directional; room shape and size, source and listener position), then <b>diffuse (late) reverberation</b>, much denser and random, decaying <b>exponentially</b> in good halls.'
          ]} />
          <${Grow} />
          <${P} small=${true}>${X('Two classes of simulation: <b>filter bank / delay line</b> methods, and <b>convolution / impulse response</b> methods.', 'فيه نوعين simulation: طرق الـ <b>filter bank والـ delay line</b>، وطرق الـ <b>convolution والـ impulse response</b>.')}</${P}>
        `),

        // 33 · reverb v delay visual
        page(html`
          <${Fig} name="mm-reverb-delay" />
        `),

        // 34 · Schroeder and Moorer
        page(html`
          <${H2}>${t('Schroeder, then Moorer', 'الـ Schroeder، وبعده الـ Moorer')}</${H2}>
          <${Def}>${X('<b>Schroeder (1961)</b>: IIR <b>comb filters in parallel banks</b>, then <b>allpass filters in series</b>. The classic design: <b>4 comb + 2 allpass</b>. It does <b>not</b> create the increasing arrival rate of reflections: primitive by today\'s standards.',
            'الـ <b>Schroeder (1961)</b> فيه IIR <b>comb filters في parallel banks</b>، وبعدها <b>allpass filters في series</b>. التصميم الكلاسيكي ' + B('<b>4 comb + 2 allpass</b>') + '. وهو <b>مش</b> بيعمل الزيادة في معدل وصول الانعكاسات، فبيعتبر بدائي بمقاييس النهارده.')}</${Def}>
          <${P} small=${true}>${X('<b>Moorer (1976)</b> builds on Schroeder:', 'الـ <b>Moorer (1976)</b> بنى على Schroeder:')}</${P}>
          <${UL} items=${A ? [
            'الجزء <bdi dir="ltr">(a)</bdi> فيه <b>tapped delay lines</b> للـ early reflections.',
            'الجزء <bdi dir="ltr">(b)</bdi> فيه combs parallel بأطوال delay <b>مختلفة</b> (الـ room modes والانعكاس بين الحيطان المتوازية) وallpass يزود الـ <b>reflection density</b> (diffusion).',
            'و<b>lowpass filters جوّه الـ feedback loops</b>: الـ reverb time يبقى أقصر في الـ high frequencies (امتصاص الهوا وانعكاسية الحيطان).',
            'والـ demo فيه ' + B('6 lowpass combs + 1 allpass') + '.'
          ] : [
            '(a) <b>Tapped delay lines</b> simulate the early reflections.',
            '(b) Parallel combs with <b>different</b> delay lengths (room modes, reflections between parallel walls) plus allpass to increase <b>reflection density</b> (diffusion) simulate the diffuse reverb.',
            '<b>Lowpass filters in the feedback loops</b> make the reverb time shorter at high frequencies (air absorption, wall reflectivity).',
            'The demo uses 6 lowpass combs + 1 allpass.'
          ]} />
        `, { sec: t('Reverb designs', 'تصميمات الـ Reverb') }),

        // 35 · Schroeder visual
        page(html`
          <${Fig} name="mm-schroeder" />
        `),

        // 36 · convolution reverb
        page(html`
          <${H2}>${t('Convolution reverb: borrow a real room', 'الـ Convolution reverb: استلف أوضة حقيقية')}</${H2}>
          <${Def}>${X('Convolve the input with the room\'s <b>impulse response</b>: the most faithful method. Record the impulse with a <b>gun shot, drum hit or hand clap</b> (or simulate it).',
            'بتعمل convolution للـ input مع الـ <b>impulse response</b> بتاع الأوضة، ودي الطريقة الأدق. بتسجل الـ impulse بـ <b>طلقة مسدس أو ضربة drum أو تسقيفة</b> (أو تعملها simulation).')}</${Def}>
          <${Code} lines=${['y(n) = Σ x(k)·h(n − k)', 'f ∗ g  ⇔  F(u)·G(u)', 'y = IFFT( FFT(x)·FFT(h) )']} />
          <${P} small=${true}>${X('The response is too long for direct filters (hundreds of taps), so we use the <b>FFT</b> and the <b>convolution theorem</b>: multiply the spectra, then take the inverse FFT.',
            'الـ response طويل جدًا على الـ direct filters (مئات الـ taps)، فبنستخدم الـ <b>FFT</b> والـ <b>convolution theorem</b>: نضرب الـ spectra في بعض، وبعدين inverse FFT.')}</${P}>
          <${P} small=${true}>${X('Commercial: <b>Altiverb</b>, Kontakt/Intakt, Garritan Violin, PianoTeq (they also simulate the instrument body). You can convolve with anything: a reversed cathedral, speech.',
            'برامج تجارية زي الـ <b>Altiverb</b> والـ ' + B('Kontakt/Intakt') + ' والـ Garritan Violin والـ PianoTeq (وبيعملوا simulation لجسم الآلة كمان). وتقدر تعمل convolution مع أي حاجة: كاتدرائية معكوسة، أو كلام.')}</${P}>
        `),

        // 37–39 · practice questions
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("This lecture has no questions from the doctors' papers yet, so these are the site's own practice questions. Tap an answer to see why.", 'لسه مفيش أسئلة من امتحانات الدكاترة على المحاضرة دي، فدي أسئلة تدريب من الموقع. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${pq('p2', /Ring modulating a 440 Hz carrier/, 'quiz')}
          <${Grow} />
          <${Hand} red=${true}>${t('RM: sum and difference only. AM: those two plus the carrier.', 'الـ RM: المجموع والفرق بس. والـ AM: الاتنين دول ومعاهم الـ carrier.')}</${Hand}>
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p1', /gives a pure delay/, 'quiz')}
          <${Gap} h=${4} />
          ${pq('p3', /statement about vibrato is correct/, 'quiz')}
        `),
        page(html`
          ${pq('p4', /simple delay with feedback NOT/, 'quiz')}
          <${Grow} />
          <${Hand}>${t('Real rooms: a few early reflections, then a dense diffuse tail.', 'الأوضة الحقيقية: شوية early reflections، وبعدين ذيل diffuse كثيف.')}</${Hand}>
        `),
        page(html`
          ${pq('p5', /Moorer's reverberator improves/, 'quiz')}
          <${Grow} />
          <${Hand}>${t('Schroeder: 4 parallel combs, then 2 allpass in series. Moorer: plus tapped delays and lowpass feedback.', 'الـ Schroeder فيه 4 combs على التوازي وبعدها 2 allpass على التوالي، والـ Moorer زوّد tapped delays وlowpass في الـ feedback.')}</${Hand}>
        `),

        // 40 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الترتيب بيفرق ومفيش قاعدة ثابتة، والـ effects ليها ست classes.',
            'الـ EQ من shelving وpeak وجوّاهم allpass:' + L('V0 = 10^(G/20), H0 = V0 − 1'),
            'الـ wah-wah هو bandpass بيتحرك، والـ phaser هو notch، والـ SVF بيطلّع LP وBP وHP.',
            'الـ FIR comb بيدّي echo واحد، والـ IIR مالوش نهاية (× g كل لفة)، و' + B('M = τ × fs') + ' ‡.',
            'في الـ vibrato بنسمع الـ delayed signal بس، والـ delay من 5 لـ 10 ms والـ LFO من 5 لـ 14 Hz.',
            'الـ RM بيدّي ' + B('fc ± fx') + ' بس، والـ AM بيزود ' + B('fc') + '، والـ tremolo هو AM تحت 20 Hz.',
            'الـ limiter للـ peaks، والـ compressor بيقلل الـ dynamics، والـ expander بيعلّي الواطي.',
            'الـ Schroeder هو ' + B('4 comb + 2 allpass') + '، والـ Moorer زوّد tapped delays وlowpass، والـ convolution بالـ FFT.'
          ] : [
            'Order matters (no absolute rule); effects fall into six classes.',
            'EQ = shelving + peak filters with an allpass inside; V0 = 10^(G/20), H0 = V0 − 1.',
            'Wah-wah = moving bandpass, phaser = moving notch; the SVF gives LP, BP and HP at once.',
            'FIR comb: one echo; IIR comb: endless echoes, × g per pass. <b>M = τ × fs</b> (‡ not τ/fs).',
            'Vibrato: only the delayed signal is heard (5–10 ms, 5–14 Hz).',
            'RM → fc ± fx only; AM → fc and fc ± fx; tremolo = AM below 20 Hz.',
            'Limiter: peaks; compressor: less dynamics; expander: livelier low levels.',
            'Schroeder 4 comb + 2 allpass; Moorer adds tapped delays and lowpass feedback; convolution uses the FFT.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 41 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 7!', 'خلّصت الفصل السابع!')}</${H1}>
            <${Talk} who="cam">${t('Enough sound for now. Next: pictures. Images, colour models and video!', 'كفاية صوت كده. الجاي: الصور. الـ images والـ colour models والـ video!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [7], t: Date.now() } }}>${t('Quiz me on Lecture 7', 'امتحنّي في محاضرة 7')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 7, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 7, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

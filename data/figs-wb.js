// Visuals for the Web Programming notes (names 'wb-…'), built on figs.js (window.FIGKIT).
// Every label and caption comes from the doctor's slides and the site's notes. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('fwb-accent')) { const s = document.createElement('style'); s.id = 'fwb-accent'; s.textContent = '[data-fig^="wb-"]{ --fig-k: var(--k-qa); --fig-s: var(--s-qa); }'; document.head.appendChild(s); } })();
/* ── part L2 ── */
// Web Programming visuals, Lecture 2 (HTML I: document structure, tags and attributes): the simple HTML document and how the browser shows it,
// element anatomy and empty elements, nesting checked with a stack, head vs body, headings, links and target, view source / inspect,
// attributes as name="value", the img attributes (src, alt, width, height), style / title / lang, and absolute vs relative URLs (slides 4 to 32).
// Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.wbv2 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.wbv2 .fig-btn:disabled{ opacity:.45; cursor:default; }
.wbv2-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.wbv2-chips .fig-btn{ font-size:.8rem; padding:4px 10px; min-height:30px; }
.wbv2-chips .fig-btn.m{ font-family:var(--mono); }
.wbv2-code{ font:.78rem/1.5 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:7px 5px; white-space:pre-wrap; overflow-wrap:anywhere; direction:ltr; text-align:left; color:var(--ink); margin:0; }
.wbv2-code .ln{ display:block; border-radius:4px; padding:0 3px; transition:background .4s, opacity .4s; }
.wbv2-code .ln.on{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.wbv2-code .ln.dim{ opacity:.4; }
.wbv2-code .ln.num::before{ content:attr(data-n); display:inline-block; width:1.6em; color:var(--faint); }
.wbv2-t{ color:var(--fig-k); font-weight:600; } .wbv2-an{ color:var(--pen); } .wbv2-av{ color:var(--ok); } .wbv2-cm{ color:var(--graphite); font-style:italic; }
.wbv2-two{ display:grid; grid-template-columns:minmax(0,1fr); gap:8px; max-width:560px; margin:0 auto; }
@media (min-width:640px){ .wbv2-two{ grid-template-columns:repeat(2, minmax(0,1fr)); align-items:start; } }
.wbv2-arrow{ text-align:center; color:var(--fig-k); font-size:.8rem; font-weight:600; }
.wbv2-win{ border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); overflow:hidden; transition:box-shadow .4s; }
.wbv2-win.on{ box-shadow:0 0 0 2.5px var(--fig-k); }
.wbv2-tabs{ display:flex; flex-wrap:wrap; gap:4px; padding:5px 6px 0; background:var(--paper-2); border-bottom:1px solid var(--line); transition:box-shadow .4s; }
.wbv2-tabs.on{ box-shadow:inset 0 0 0 2.5px var(--fig-k); }
.wbv2-tab{ font:inherit; font-size:.75rem; color:var(--ink); padding:3px 9px; border:1px solid var(--line); border-bottom:0; border-radius:6px 6px 0 0; background:var(--paper-2); min-height:24px; min-width:60px; text-align:left; }
.wbv2-tab.act{ background:var(--paper); font-weight:600; } button.wbv2-tab{ cursor:pointer; }
.wbv2-url{ font:.75rem/1.4 var(--mono); color:var(--graphite); padding:4px 8px; border-bottom:1px solid var(--line); overflow-wrap:anywhere; }
.wbv2-page{ padding:8px 12px 10px; font-family:"Times New Roman", Times, serif; font-size:1.1rem; line-height:1.3; min-height:84px; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.wbv2-h{ font-weight:700; margin:.25em 0; line-height:1.12; } .wbv2-h1{ font-size:2em; } .wbv2-h2{ font-size:1.5em; } .wbv2-h3{ font-size:1.17em; } .wbv2-h4{ font-size:1em; } .wbv2-h5{ font-size:.83em; } .wbv2-h6{ font-size:.67em; }
.wbv2-p{ margin:.45em 0; } .wbv2-hr{ border-top:1.5px solid var(--graphite); margin:.6em 0; }
.wbv2-a{ color:var(--fig-k); text-decoration:underline; cursor:pointer; background:none; border:0; padding:0; font:inherit; }
.wbv2-body{ border-radius:4px; transition:outline-color .4s; outline:2px dashed transparent; outline-offset:3px; min-height:60px; }
.wbv2-body.on{ outline-color:var(--fig-k); }
.wbv2-tagnote{ font:.75rem var(--body); color:var(--graphite); }
.wbv2-imgph{ display:inline-grid; place-items:center; width:64px; height:40px; border-radius:6px; border:1.4px solid var(--fig-k); background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); font:.75rem var(--mono); color:var(--ink); vertical-align:middle; }
/* element anatomy */
.wbv2-anat{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:flex-start; }
.wbv2-part{ display:flex; flex-direction:column; align-items:center; gap:3px; transition:opacity .4s; }
.wbv2-part > span{ font:600 .82rem/1.3 var(--mono); padding:5px 7px; border-radius:6px; border:1.5px solid var(--line); background:var(--paper); color:var(--ink); transition:all .4s; }
.wbv2-part > small{ font-size:.75rem; color:var(--graphite); }
.wbv2-part.on > span{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
.wbv2-part.off{ opacity:.35; } .wbv2-part.none > span{ border-style:dashed; color:var(--graphite); font-weight:400; font-family:var(--body); }
.wbv2-brace{ max-width:300px; margin:8px auto 2px; border:2px solid var(--fig-k); border-top:0; height:10px; border-radius:0 0 8px 8px; }
.wbv2-bl{ text-align:center; font-weight:700; color:var(--fig-k); font-size:.85rem; }
.wbv2-out{ max-width:360px; margin:10px auto 0; }
/* nesting stack */
.wbv2-in{ font:.85rem var(--mono); width:100%; box-sizing:border-box; border:1px solid var(--line); border-radius:6px; padding:5px 8px; background:var(--paper); color:var(--ink); direction:ltr; }
.wbv2-own{ max-width:420px; margin:0 auto 10px; } .wbv2-own small{ display:block; font-size:.75rem; color:var(--graphite); margin:0 0 3px; }
.wbv2-toks{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin:0 0 10px; direction:ltr; }
.wbv2-tok{ font:.8rem/1.3 var(--mono); padding:3px 6px; border-radius:5px; border:1.3px solid var(--line); background:var(--paper); color:var(--ink); transition:all .3s; overflow-wrap:anywhere; max-width:100%; }
.wbv2-tok.done{ opacity:.6; } .wbv2-tok.todo{ opacity:.35; border-style:dashed; }
.wbv2-tok.cur{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.wbv2-tok.bad{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 14%, var(--paper)); opacity:1; }
.wbv2-sr{ display:grid; grid-template-columns:104px minmax(0,1fr); gap:8px; align-items:start; max-width:460px; margin:0 auto; }
.wbv2-lbl{ font-size:.75rem; color:var(--graphite); text-align:center; margin:0 0 3px; }
.wbv2-stack{ border:1.5px solid var(--graphite); border-top:0; border-radius:0 0 8px 8px; min-height:74px; padding:4px; display:flex; flex-direction:column; gap:3px; justify-content:flex-end; background:var(--paper); }
.wbv2-stack i{ font:600 .8rem var(--mono); font-style:normal; text-align:center; padding:3px; border-radius:4px; background:var(--paper-2); border:1px solid var(--line); overflow-wrap:anywhere; color:var(--ink); }
.wbv2-stack i.top{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); border-color:var(--fig-k); }
.wbv2-stack em{ font-size:.75rem; color:var(--graphite); text-align:center; font-style:normal; }
/* head / body */
.wbv2-sk{ font:.8rem/1.4 var(--mono); max-width:420px; margin:0 auto; direction:ltr; text-align:left; color:var(--ink); }
.wbv2-box{ border:1.5px solid var(--line); border-radius:8px; padding:4px 6px 6px; margin:4px 0; background:var(--paper); }
.wbv2-box.h{ border-color:color-mix(in srgb, var(--fig-k) 60%, var(--line)); }
.wbv2-box > b{ display:block; font-weight:600; color:var(--fig-k); }
.wbv2-box .sub{ font:.75rem var(--body); color:var(--graphite); font-weight:400; }
.wbv2-slot{ display:flex; flex-wrap:wrap; gap:4px; min-height:26px; align-items:center; }
.wbv2-it{ font:600 .8rem var(--mono); padding:2px 7px; border-radius:99px; border:1.3px solid var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); animation:wbv2in .45s ease both; }
.wbv2-it.miss{ border-color:var(--pen); border-style:dashed; }
.wbv2-q{ text-align:center; margin:0 0 10px; } .wbv2-q .big{ font:700 1.2rem var(--mono); color:var(--ink); display:inline-block; padding:4px 14px; border-radius:10px; border:1.5px solid var(--fig-k); background:var(--paper); margin:4px 0 8px; }
.wbv2-q .row{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; } .wbv2-q .row .fig-btn{ font-family:var(--mono); min-width:96px; }
.wbv2-q.shake .big{ animation:wbv2sh .4s ease; } @keyframes wbv2sh{ 25%{ transform:translateX(-5px); } 75%{ transform:translateX(5px); } }
.wbv2-score{ text-align:center; font-size:.85rem; color:var(--graphite); margin:6px 0 0; }
@keyframes wbv2in{ from{ opacity:0; transform:translateY(5px); } to{ opacity:1; transform:none; } }
.wbv2-in2{ animation:wbv2in .5s ease both; }
/* headings */
.wbv2-hrow{ display:flex; align-items:baseline; gap:8px; transition:opacity .4s; } .wbv2-hrow small{ font:.75rem var(--body); color:var(--fig-k); font-weight:700; white-space:nowrap; }
/* link */
.wbv2-gpage{ text-align:center; padding:12px 4px; } .wbv2-gpage b{ display:block; font:700 1.3rem var(--body); color:var(--fig-k); overflow-wrap:anywhere; } .wbv2-gpage small{ font:.78rem var(--body); color:var(--graphite); }
.wbv2-logo{ display:inline-grid; place-items:center; width:84px; height:44px; border-radius:8px; border:2px solid var(--fig-k); background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); font:600 .8rem var(--mono); color:var(--ink); cursor:pointer; padding:0; }
.wbv2-tap{ display:inline-block; animation:wbv2tap 1.4s ease-in-out infinite; } @keyframes wbv2tap{ 50%{ transform:translateY(-3px); } }
/* view source / inspect */
.wbv2-pick{ border-radius:3px; cursor:pointer; transition:background .3s, box-shadow .3s; }
.wbv2-pick.sel{ background:color-mix(in srgb, var(--fig-k) 20%, transparent); box-shadow:0 0 0 2px var(--fig-k); }
.wbv2-dev{ border:1px solid var(--line); border-radius:8px; background:var(--paper-2); padding:6px; margin-top:8px; }
.wbv2-dev > b{ display:block; font-size:.75rem; color:var(--graphite); margin:0 0 4px; }
.wbv2-edit{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:6px 8px; align-items:center; font-size:.8rem; margin-top:6px; }
.wbv2-edit .wbv2-chips{ justify-content:flex-start; margin:0; }
/* attributes */
.wbv2-ag{ display:inline-flex; gap:0; align-items:flex-start; border-radius:6px; transition:box-shadow .4s; }
.wbv2-ag.on{ box-shadow:0 0 0 2px var(--fig-k); }
/* img */
.wbv2-stage{ height:150px; display:grid; place-items:center; border:1px solid var(--line); border-radius:8px; background:var(--paper); margin:8px 0 0; }
.wbv2-broken{ box-sizing:border-box; border:1.5px dashed var(--graphite); display:flex; gap:4px; align-items:flex-start; padding:3px; font:.75rem/1.25 var(--body); color:var(--ink); text-align:left; }
.wbv2-ctl{ display:grid; grid-template-columns:auto minmax(0,1fr) 3.2em; gap:4px 8px; align-items:center; font-size:.8rem; margin-top:8px; }
.wbv2-ctl input[type=range]{ width:100%; accent-color:var(--fig-k); } .wbv2-ctl b{ font-family:var(--mono); text-align:right; }
/* style / title / lang */
.wbv2-tip{ position:relative; display:inline-block; cursor:help; }
.wbv2-tipb{ position:absolute; left:10px; top:100%; margin-top:4px; background:var(--ink); color:var(--paper); font:.78rem/1.3 var(--body); padding:3px 8px; border-radius:4px; white-space:nowrap; animation:wbv2in .25s ease both; z-index:2; }
.wbv2-lang{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px; margin-top:8px; }
.wbv2-lang div{ border:1.5px solid var(--line); border-radius:8px; padding:6px; text-align:center; background:var(--paper); font-size:.8rem; color:var(--graphite); }
.wbv2-lang div b{ display:block; font:700 1.1rem var(--mono); color:var(--fig-k); } .wbv2-lang div span{ display:block; color:var(--ink); font-weight:600; }
/* urls */
.wbv2-res{ font:.8rem/1.4 var(--mono); text-align:center; overflow-wrap:anywhere; margin:4px 0 8px; direction:ltr; }
.wbv2-res .hs{ color:var(--fig-k); font-weight:700; } .wbv2-res .ps{ color:var(--ink); font-weight:700; }
.wbv2-sites{ display:grid; grid-template-columns:minmax(0,1fr); gap:8px; max-width:420px; margin:0 auto; }
.wbv2-site{ border:1.5px solid var(--line); border-radius:8px; padding:5px 8px; background:var(--paper); font:.8rem/1.5 var(--mono); direction:ltr; text-align:left; transition:box-shadow .4s, opacity .4s; }
.wbv2-site > b{ display:block; font-family:var(--body); font-size:.8rem; color:var(--graphite); }
.wbv2-site.dim{ opacity:.45; } .wbv2-site.on{ box-shadow:0 0 0 2px var(--fig-k); }
.wbv2-node{ display:flex; gap:6px; align-items:center; flex-wrap:wrap; border-radius:4px; padding:0 4px; transition:background .4s; }
.wbv2-node.tg{ background:color-mix(in srgb, var(--fig-k) 26%, transparent); font-weight:700; }
.wbv2-node em{ font:600 .75rem var(--body); font-style:normal; border-radius:99px; padding:0 6px; }
.wbv2-node em.s{ border:1px solid var(--graphite); color:var(--graphite); } .wbv2-node em.t{ background:var(--fig-s); color:#fff; }
@media (prefers-reduced-motion: reduce){ .wbv2-it, .wbv2-in2, .wbv2-tap, .wbv2-tipb, .wbv2-q.shake .big{ animation:none; } }`;
  if (!document.getElementById('wbv2-css')) { const s = document.createElement('style'); s.id = 'wbv2-css'; s.textContent = CSS; document.head.appendChild(s); }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // inline code inside an Arabic sentence: always an ltr isolate
  const T = s => `<bdi dir="ltr">${esc(s)}</bdi>`;
  // colours one line of HTML source (tags, attribute names, values, comments)
  function hl(src) {
    return String(src).replace(/<!--[\s\S]*?(-->|$)|<[^<>]*>|[^<]+|</g, tok => {
      if (tok.startsWith('<!--')) return `<span class="wbv2-cm">${esc(tok)}</span>`;
      const m = tok.length > 1 && tok.match(/^<(\/?!?[A-Za-z][\w-]*)([\s\S]*?)(\/?)>$/);
      if (!m) return esc(tok);
      const at = m[2].replace(/(\s*)([^\s=]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s"']+))?/g, (_, sp, n, eq, v) => esc(sp) + `<span class="wbv2-an">${esc(n)}</span>` + (eq ? esc(eq) + `<span class="wbv2-av">${esc(v)}</span>` : ''));
      return `<span class="wbv2-t">&lt;${esc(m[1])}</span>${at}<span class="wbv2-t">${m[3]}&gt;</span>`;
    });
  }
  const Code = ({ lines, on, dim, num, label }) => html`<pre className="wbv2-code" aria-label=${label || 'HTML source'}>${lines.map((l, j) => html`<span key=${j} data-n=${j + 1}
    className=${'ln' + (on && on.includes(j) ? ' on' : (dim && on && on.length ? ' dim' : '')) + (num ? ' num' : '')} dangerouslySetInnerHTML=${{ __html: hl(l) || ' ' }}></span>`)}</pre>`;
  const Win = ({ tabs, act, url, children, on, tabOn, onTab }) => html`<div className=${'wbv2-win' + (on ? ' on' : '')}>
    <div className=${'wbv2-tabs' + (tabOn ? ' on' : '')}>${tabs.map((t, j) => onTab
      ? html`<button key=${j} className=${'wbv2-tab' + (j === act ? ' act' : '')} onClick=${() => onTab(j)} aria-pressed=${String(j === act)}>${t}</button>`
      : html`<span key=${j} className=${'wbv2-tab' + (j === (act || 0) ? ' act' : '')}>${t}</span>`)}</div>
    <div className="wbv2-url">${url}</div><div className="wbv2-page">${children}</div></div>`;
  const Chips = ({ items, sel, on, mono, label }) => html`<div className="wbv2-chips" role="group" aria-label=${label || 'Choose'}>${items.map(([k, t]) => html`<button key=${k}
    className=${'fig-btn' + (mono ? ' m' : '')} aria-pressed=${String(sel === k)} onClick=${() => on(k)}>${t}</button>`)}</div>`;
  const Fig = ({ children }) => html`<figure className="fig wbv2">${children}</figure>`;

  /* ── [1] slides 4 to 6: the simple HTML document, line by line, and what the browser makes of it ── */
  function Doc({ ar }) {
    const L = ['<!DOCTYPE html>', '<html>', '<head>', '  <title>Page Title</title>', '</head>', '<body>', '  <h1>My First Heading</h1>', '  <p>My first paragraph.</p>', '</body>', '</html>'];
    const steps = [
      { on: [0], en: '<b>&lt;!DOCTYPE html&gt;</b> declares that this is an HTML5 document. It comes first, once, before any tag.', ar: 'السطر الأول <bdi dir="ltr">&lt;!DOCTYPE html&gt;</bdi> بيعلن إن ده HTML5 document. بييجي في الأول، مرة واحدة، قبل أي tag.' },
      { on: [1, 9], en: '<b>&lt;html&gt;</b> and <b>&lt;/html&gt;</b>: the beginning and the end of the HTML document. Everything else sits inside.', ar: 'الـ <bdi dir="ltr">&lt;html&gt;</bdi> والـ <bdi dir="ltr">&lt;/html&gt;</bdi> هما بداية ونهاية الـ HTML document، وكل حاجة تانية جواهم.' },
      { on: [2, 4], en: '<b>&lt;head&gt;</b> holds meta information about the page. None of it is drawn inside the page.', ar: 'الـ <bdi dir="ltr">&lt;head&gt;</bdi> فيه meta information عن الصفحة، ومفيش حاجة منه بتترسم جوه الصفحة.' },
      { on: [3], en: '<b>&lt;title&gt;</b> gives the title shown in the browser tab: <b>Page Title</b>.', ar: 'الـ <bdi dir="ltr">&lt;title&gt;</bdi> بيحدد العنوان اللي بيظهر في الـ tab بتاع الـ browser، وهنا هو <bdi dir="ltr">Page Title</bdi>.' },
      { on: [5, 8], en: '<b>&lt;body&gt;</b>: the visible page content goes between &lt;body&gt; and &lt;/body&gt; (the dashed area).', ar: 'الـ <bdi dir="ltr">&lt;body&gt;</bdi> فيه المحتوى اللي بيظهر في الصفحة، بين <bdi dir="ltr">&lt;body&gt;</bdi> و <bdi dir="ltr">&lt;/body&gt;</bdi> (المساحة المتقطعة).' },
      { on: [6], en: '<b>&lt;h1&gt;</b> defines a large heading: <b>My First Heading</b>.', ar: 'الـ <bdi dir="ltr">&lt;h1&gt;</bdi> بيعرّف heading كبير هو <bdi dir="ltr">My First Heading</bdi>.' },
      { on: [7], en: '<b>&lt;p&gt;</b> defines a paragraph: <b>My first paragraph.</b>', ar: 'الـ <bdi dir="ltr">&lt;p&gt;</bdi> بيعرّف paragraph هو <bdi dir="ltr">My first paragraph.</bdi>' },
      { on: [], en: 'The browser does not display the tags; it uses them to decide how to display the document.', ar: 'الـ browser مابيعرضش الـ tags؛ بيستخدمها عشان يقرر يعرض الـ document إزاي.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    return html`<${Fig}><div className="fig-stage"><div className="wbv2-two">
      <${Code} lines=${L} on=${steps[i].on} dim=${true} />
      <div><div className="wbv2-arrow">▼ the browser shows ▼</div>
        <${Win} tabs=${[i >= 3 ? 'Page Title' : ' ']} url="page.html" on=${i === 1} tabOn=${i === 2 || i === 3}>
          <div className=${'wbv2-body' + (i === 4 ? ' on' : '')}>
            <div className=${'wbv2-h wbv2-h1 ' + pop(i >= 5)}>My First Heading</div>
            <div className=${'wbv2-p ' + pop(i >= 6)}>My first paragraph.</div>
          </div><//></div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [2.0]–[2.2] slides 8, 11, 12: start tag + content + end tag; empty elements ── */
  const ELS = [
    { k: 'h1', s: '<h1>', c: 'My First Heading', e: '</h1>' },
    { k: 'p', s: '<p>', c: 'My first paragraph.', e: '</p>' },
    { k: 'B', s: '<B>', c: 'Warning', e: '</B>' },
    { k: 'br', s: '<br>' }, { k: 'hr', s: '<hr>' }, { k: 'img', s: '<img>' }
  ];
  function ElementSteps({ el, ar }) {
    const pair = !!el.e;
    const steps = pair ? [
      { en: `The <b>start tag</b> ${esc(el.s)}: a keyword enclosed by angle brackets.`, ar: `الـ <b>start tag</b> هو ${T(el.s)}، يعني keyword بين angle brackets.` },
      { en: `The <b>content</b>: ${esc(el.c)}`, ar: `الـ <b>content</b> هنا هو ${T(el.c)}` },
      { en: `The <b>end tag</b> ${esc(el.e)}: the same keyword with an additional forward slash <b>/</b>.`, ar: `الـ <b>end tag</b> هو ${T(el.e)}، نفس الـ keyword بس بـ forward slash <bdi dir="ltr">/</bdi> زيادة.` },
      { en: `The <b>element</b> is everything from the start tag to the end tag.` + (el.k === 'B' ? ' The browser shows “Warning” in bold.' : ''), ar: `الـ <b>element</b> هو كل حاجة من الـ start tag لحد الـ end tag.` + (el.k === 'B' ? ' والـ browser بيعرض كلمة Warning بالـ bold.' : '') }
    ] : [
      { en: `The start tag ${esc(el.s)}…`, ar: `فيه start tag هو ${T(el.s)}…` },
      { en: '…no content…', ar: 'ومالوش content…' },
      { en: '…and no end tag.', ar: 'ومالوش end tag.' },
      { en: `${esc(el.s)} is an <b>empty element</b>: no content and no end tag. The element is just the one tag.`, ar: `الـ ${T(el.s)} ده <b>empty element</b>، مالوش content ولا end tag، والـ element هو الـ tag ده بس.` }
    ];
    const [i, ctl] = useSteps(steps.length, 1700);
    const part = (j, txt, lbl, none) => html`<div className=${'wbv2-part' + (i === j || i === 3 ? ' on' : i < j ? ' off' : '') + (none ? ' none' : '')}><span>${txt}</span><small>${lbl}</small></div>`;
    const out = { h1: html`<div className="wbv2-h wbv2-h1">My First Heading</div>`, p: html`<div className="wbv2-p">My first paragraph.</div>`, B: html`<strong>Warning</strong>`,
      br: html`<span className="wbv2-tagnote">(a line break)</span>`, hr: html`<div className="wbv2-hr"></div>`, img: html`<span className="wbv2-imgph">image</span>` }[el.k];
    return html`<div className="fig-stage">
      <div className="wbv2-anat" dir="ltr">${part(0, el.s, 'start tag')}${part(1, pair ? el.c : 'none', 'content', !pair)}${part(2, pair ? el.e : 'none', 'end tag', !pair)}</div>
      <div className=${pop(i >= 3)}><div className="wbv2-brace"></div><div className="wbv2-bl">element</div>
        <div className="wbv2-out"><${Win} tabs=${['page.html']} url="the browser shows">${out}<//></div></div>
    </div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function Element({ ar }) {
    const [k, setK] = useState('h1');
    const el = ELS.find(e => e.k === k);
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: 0 }}><${Chips} mono=${true} label="Element" items=${ELS.map(e => [e.k, e.e ? e.s + '…' + e.e : e.s])} sel=${k} on=${setK} /></div>
      <${ElementSteps} key=${k} el=${el} ar=${ar} /><//>`;
  }

  /* ── [2.3] slide 15 (+ [2.2] slide 12, [2.5] slide 21, [2.6] slide 22): nesting checked with a stack of open tags ── */
  const EMPTY = new Set(['br', 'hr', 'img', 'meta', 'link', 'input']), BLOCK = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr']);
  const toks = src => (String(src).match(/<!--[\s\S]*?(-->|$)|<[^<>]*>|[^<]+|</g) || []).filter(t => t.trim());
  function kind(t) {
    if (/^<!/.test(t)) return { k: 'decl' };
    let m = t.match(/^<\/\s*([A-Za-z][\w-]*)\s*>$/); if (m) return { k: 'close', n: m[1] };
    m = t.match(/^<([A-Za-z][\w-]*)(\s[^>]*)?>$/); if (m) return { k: EMPTY.has(m[1].toLowerCase()) || /\/>$/.test(t) ? 'empty' : 'open', n: m[1] };
    return t[0] === '<' ? { k: 'bad' } : { k: 'text' };
  }
  function simulate(src) {
    const tk = toks(src), st = [], out = []; let errs = 0;
    tk.forEach(t => {
      const c = kind(t), E = esc(t), top = st[st.length - 1]; let en, a, bad = false;
      if (c.k === 'open') { st.push(c.n); en = `Start tag <b>${E}</b> opens: it is now the nearest open tag (top of the pile).`; a = `الـ start tag ${T(t)} اتفتح، وبقى أقرب tag مفتوح (فوق خالص).`; }
      else if (c.k === 'empty') { en = `<b>${E}</b> is an empty element: no content and no end tag, so nothing stays open.`; a = `الـ ${T(t)} ده empty element، مالوش content ولا end tag، فمفيش حاجة تفضل مفتوحة.`; }
      else if (c.k === 'decl') { en = `<b>${E}</b> is a declaration or a comment, not an element: nothing to close.`; a = `الـ ${T(t)} ده declaration أو comment مش element، فمفيش حاجة تتقفل.`; }
      else if (c.k === 'bad') { bad = true; errs++; en = `<b>${E}</b> is not a valid tag.`; a = `الـ ${T(t)} ده مش tag صح.`; }
      else if (c.k === 'text') {
        en = top ? `Content “${esc(t.trim())}” goes inside the nearest open tag &lt;${esc(top)}&gt;.` : `Content “${esc(t.trim())}” is outside every tag.`;
        a = top ? `الـ content ده ${T(t.trim())} بيتحط جوه أقرب tag مفتوح ${T('<' + top + '>')}.` : `الـ content ده ${T(t.trim())} برّه كل الـ tags.`;
      } else {
        const n = c.n.toLowerCase();
        if (top && top.toLowerCase() === n) {
          st.pop(); const cs = top !== c.n;
          en = `End tag <b>${E}</b> closes the nearest open tag &lt;${esc(top)}&gt; ✓` + (cs ? ' Same tag: HTML is not case sensitive.' : '');
          a = `الـ end tag ${T(t)} قفل أقرب tag مفتوح ${T('<' + top + '>')} ✓` + (cs ? ' وده نفس الـ tag لأن الـ HTML مش case sensitive.' : '');
        } else {
          bad = true; errs++; let at = -1; st.forEach((x, j) => { if (x.toLowerCase() === n) at = j; });
          if (at >= 0) { st.splice(at, 1); en = `✗ <b>${E}</b> arrives, but the nearest open tag is &lt;${esc(top)}&gt;: you must close the nearest tag first.`; a = `غلط ✗ لأن جه ${T(t)} وأقرب tag مفتوح هو ${T('<' + top + '>')}، ولازم تقفل أقرب tag الأول.`; }
          else { en = `✗ <b>${E}</b> has no open start tag to close.`; a = `غلط ✗ لأن الـ ${T(t)} مالوش start tag مفتوح يقفله.`; }
        }
      }
      out.push({ t, bad, st: st.slice(), en, ar: a });
    });
    let fin;
    if (!tk.length) fin = { en: 'Type some HTML in the box.', ar: 'اكتب HTML في المربع.' };
    else if (!errs && !st.length) fin = { en: '✓ Nested correctly: every tag was closed, the nearest one first.', ar: 'تمام ✓ الـ nesting صح، وكل tag اتقفل والأقرب الأول.' };
    else {
      const left = st.map(x => '<' + x + '>').join(' ');
      fin = { en: (errs ? `✗ ${errs} problem${errs > 1 ? 's' : ''}: whenever tags are inside other tags, close the nearest tag first. ` : '') + (st.length ? `Never closed: ${esc(left)}. Some elements (like &lt;p&gt;) still display correctly without the end tag, but never rely on that.` : ''),
        ar: (errs ? `فيه غلط ✗ (${errs})، ولما tags تبقى جوه tags تانية لازم تقفل أقرب tag الأول. ` : '') + (st.length ? `فيه tags ماتقفلتش ${T(left)}. فيه elements (زي ${T('<p>')}) بتتعرض صح من غير الـ end tag، بس ماينفعش تعتمد على كده.` : '') };
    }
    return { tk, out, fin: Object.assign(fin, { t: null, bad: errs > 0, st: st.slice() }) };
  }
  // what a browser would draw for the tokens read so far (a few formatting tags, the rest as plain text)
  function renderTree(tk) {
    const root = { tag: '#', kids: [] }, st = [root];
    for (const t of tk) {
      const c = kind(t), top = st[st.length - 1];
      if (c.k === 'text') top.kids.push(t);
      else if (c.k === 'open' || c.k === 'empty') { const n = c.n.toLowerCase(); if (BLOCK.has(n) && top.tag === 'p') st.pop(); const node = { tag: n, kids: [] }; st[st.length - 1].kids.push(node); if (c.k === 'open') st.push(node); }
      else if (c.k === 'close') { const n = c.n.toLowerCase(), at = st.map(x => x.tag).lastIndexOf(n); if (at > 0) st.length = at; }
    }
    return root;
  }
  function toEl(node, key) {
    if (typeof node === 'string') return node;
    const kids = node.kids.map((k, j) => toEl(k, j)), t = node.tag;
    if (/^h[1-6]$/.test(t)) return html`<div key=${key} className=${'wbv2-h wbv2-' + t}>${kids}</div>`;
    if (t === 'p') return html`<div key=${key} className="wbv2-p">${kids}</div>`;
    if (t === 'b' || t === 'strong') return html`<strong key=${key}>${kids}</strong>`;
    if (t === 'i' || t === 'em') return html`<em key=${key}>${kids}</em>`;
    if (t === 'u') return html`<u key=${key}>${kids}</u>`;
    if (t === 'br') return html`<br key=${key} />`;
    if (t === 'hr') return html`<div key=${key} className="wbv2-hr"></div>`;
    if (t === 'img') return html`<span key=${key} className="wbv2-imgph">image</span>`;
    return html`<span key=${key}>${kids}</span>`;
  }
  function NestRun({ src, ar }) {
    const sim = simulate(src), steps = sim.out.concat([sim.fin]);
    const [i, ctl] = useSteps(steps.length, 1500);
    const s = steps[i], n = sim.tk.length, read = Math.min(i + 1, n);
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="wbv2-toks">${sim.tk.map((t, j) => html`<span key=${j} className=${'wbv2-tok ' + (j === i ? 'cur' + (s.bad ? ' bad' : '') : j < i || i >= n ? 'done' : 'todo')}>${t}</span>`)}</div>
      <div className="wbv2-sr">
        <div><p className="wbv2-lbl">open tags (nearest on top)</p><div className="wbv2-stack">
          ${s.st.length ? s.st.slice().reverse().map((x, j) => html`<i key=${s.st.length - j} className=${j === 0 ? 'top' : ''}>${'<' + x + '>'}</i>`) : html`<em>empty</em>`}</div></div>
        <div><p className="wbv2-lbl">the browser shows</p><${Win} tabs=${['page.html']} url=${'read ' + read + ' of ' + n}>${toEl(renderTree(sim.tk.slice(0, read)), 'r')}<//></div>
      </div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  const NEST = [
    ['ok', '<H1><I>The Nation</I></H1>'], ['wrong', '<H1><I>The Nation</H1></I>'], ['bold', '<B>Warning</B>'],
    ['case', '<P>My first paragraph.</p>'], ['noend', '<p>This is a paragraph<p>This is a paragraph']
  ];
  function Nest({ ar }) {
    const [k, setK] = useState('ok'), [own, setOwn] = useState('<p><b>Hello</b></p>');
    const src = k === 'own' ? own : NEST.find(x => x[0] === k)[1];
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: 6 }}>
      <${Chips} label="Example" items=${[['ok', 'Example from the notes'], ['wrong', 'Closed in the wrong order'], ['bold', '<B>Warning</B>'], ['case', '<P> … </p>'], ['noend', 'No end tags'], ['own', 'Try your own']]} sel=${k} on=${setK} />
      ${k === 'own' && html`<div className="wbv2-own"><small>Type HTML; it is read tag by tag.</small><input className="wbv2-in" value=${own} maxLength="140" spellCheck="false" autoCapitalize="off" aria-label="Your HTML" onInput=${e => setOwn(e.target.value)} /></div>`}
    </div><${NestRun} key=${src} src=${src} ar=${ar} /><//>`;
  }

  /* ── [3.0]–[3.2] slides 13, 14: what goes in <head> and what goes in <body> ── */
  const HB = [
    ['<title>', 'head', 'The title is metadata: it shows in the browser tab and in favorites, history and bookmarks, not inside the page.', 'الـ title ده metadata، بيظهر في الـ tab وفي الـ Favorites والـ History والـ Bookmarks، مش جوه الصفحة.'],
    ['<h1>', 'body', 'A heading is visible content, so it goes in the body.', 'الـ heading ده محتوى ظاهر، فمكانه الـ body.'],
    ['<meta>', 'head', 'meta is metadata about the page: it lives in the head.', 'الـ meta دي metadata عن الصفحة، ومكانها الـ head.'],
    ['<table>', 'body', 'A table is visible content: it is never found in the head.', 'الـ table محتوى ظاهر، وعمرها ما تبقى في الـ head.'],
    ['<style>', 'head', 'style is one of the metadata tags of the head.', 'الـ style من الـ metadata tags بتاعة الـ head.'],
    ['<p>', 'body', 'A paragraph is visible content: body.', 'الـ paragraph محتوى ظاهر، فمكانه الـ body.'],
    ['<link>', 'head', 'link (for example to a CSS file) is metadata in the head.', 'الـ link (زي ربط ملف CSS) ده metadata في الـ head.'],
    ['<img>', 'body', 'An image is visible content: body.', 'الصورة محتوى ظاهر، فمكانها الـ body.'],
    ['<a>', 'body', 'A link the user clicks is visible content: body.', 'الـ link اللي الـ user بيدوس عليه محتوى ظاهر، فمكانه الـ body.']
  ];
  function HeadBody({ ar }) {
    const [k, setK] = useState(0), [placed, setPlaced] = useState([]), [msg, setMsg] = useState(null), [shake, setShake] = useState(0);
    const intro = { en: 'The visible part of the document is in <b>&lt;body&gt;</b>; metadata (title, meta, link, style, script) is in <b>&lt;head&gt;</b>. Where does each tag go?', ar: 'الجزء اللي بيظهر من الـ document جوه <bdi dir="ltr">&lt;body&gt;</bdi>، والـ metadata (الـ title والـ meta والـ link والـ style والـ script) جوه <bdi dir="ltr">&lt;head&gt;</bdi>. كل tag مكانه فين؟' };
    const answer = w => {
      const it = HB[k], ok = it[1] === w;
      setPlaced(p => p.concat([{ t: it[0], w: it[1], ok }])); setK(k + 1); if (!ok) setShake(x => x + 1);
      setMsg({ en: (ok ? '✓ ' : `✗ It goes in &lt;${it[1]}&gt;. `) + it[2], ar: (ok ? 'صح ✓ ' : `غلط ✗ مكانه الـ ${it[1]}. `) + it[3] });
    };
    const right = placed.filter(p => p.ok).length, done = k >= HB.length;
    const m = done ? { en: `Done: ${right} of ${HB.length} right. The DOCTYPE comes once, before any tag; &lt;html&gt; is the first tag; only &lt;body&gt; is visible.`, ar: `خلصت: ${right} صح من ${HB.length}. الـ DOCTYPE بييجي مرة واحدة قبل أي tag، والـ <bdi dir="ltr">&lt;html&gt;</bdi> أول tag، والـ <bdi dir="ltr">&lt;body&gt;</bdi> بس هو اللي بيظهر.` } : msg || intro;
    const slot = w => placed.filter(p => p.w === w).map((p, j) => html`<span key=${j} className=${'wbv2-it' + (p.ok ? '' : ' miss')}>${p.t}</span>`);
    return html`<${Fig}><div className="fig-stage">
      ${done ? html`<div className="wbv2-q"><button className="fig-btn" onClick=${() => { setK(0); setPlaced([]); setMsg(null); }}>↻ Start again</button></div>`
        : html`<div key=${shake} className=${'wbv2-q' + (shake ? ' shake' : '')}><div className="wbv2-lbl">Where does this tag go? (${k + 1} of ${HB.length})</div><div className="big">${HB[k][0]}</div>
        <div className="row"><button className="fig-btn" onClick=${() => answer('head')}>${'<head>'}</button><button className="fig-btn" onClick=${() => answer('body')}>${'<body>'}</button></div></div>`}
      <div className="wbv2-sk">
        <div>${'<!DOCTYPE html>'} <span className="wbv2-tagnote">once, at the top</span></div>
        <div className="wbv2-box"><b>${'<html>'} <span className="sub">first tag</span></b>
          <div className="wbv2-box h"><b>${'<head>'} <span className="sub">metadata, not shown</span></b><div className="wbv2-slot">${slot('head')}</div></div>
          <div className="wbv2-box h"><b>${'<body>'} <span className="sub">the visible part</span></b><div className="wbv2-slot">${slot('body')}</div></div>
          <b>${'</html>'}</b></div>
      </div>
      <p className="wbv2-score">${right} right of ${placed.length} answered</p>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [4.0] slide 16: <h1> to <h6> ── */
  function Headings({ ar }) {
    const steps = [1, 2, 3, 4, 5, 6].map(n => ({ en: `<b>&lt;h${n}&gt;</b>This is heading ${n}<b>&lt;/h${n}&gt;</b>` + (n === 1 ? ': the most important heading, the largest.' : n === 6 ? ': the least important heading, the smallest.' : '.'),
      ar: n === 1 ? 'الـ <bdi dir="ltr">&lt;h1&gt;</bdi> هو أهم heading، والأكبر.' : n === 6 ? 'الـ <bdi dir="ltr">&lt;h6&gt;</bdi> هو أقل heading في الأهمية، والأصغر.' : `الـ ${T('<h' + n + '>')} أصغر من اللي قبله.` }))
      .concat([{ en: 'Headings are defined with the &lt;h1&gt; to &lt;h6&gt; tags: &lt;h1&gt; the most important, &lt;h6&gt; the least important.', ar: 'الـ Headings بتتعرّف بالـ tags من <bdi dir="ltr">&lt;h1&gt;</bdi> لـ <bdi dir="ltr">&lt;h6&gt;</bdi>، والـ <bdi dir="ltr">&lt;h1&gt;</bdi> الأهم والـ <bdi dir="ltr">&lt;h6&gt;</bdi> الأقل أهمية.' }]);
    const [i, ctl] = useSteps(steps.length, 1500);
    const L = [1, 2, 3, 4, 5, 6].map(n => `<h${n}>This is heading ${n}</h${n}>`);
    return html`<${Fig}><div className="fig-stage"><div className="wbv2-two">
      <${Code} lines=${L} on=${i < 6 ? [i] : [0, 5]} />
      <${Win} tabs=${['page.html']} url="the browser shows">${[1, 2, 3, 4, 5, 6].map(n => html`<div key=${n} className=${'wbv2-hrow ' + pop(i >= n - 1)}>
        <div className=${'wbv2-h wbv2-h' + n}>This is heading ${n}</div>${i === 6 && (n === 1 || n === 6) && html`<small>${n === 1 ? 'most important' : 'least important'}</small>`}</div>`)}<//>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [4.2], [4.3] slides 19, 24: a link, its target, and an image link ── */
  function Link({ ar }) {
    const [tg, setTg] = useState(''), [img, setImg] = useState(false), [tabs, setTabs] = useState([{ g: false }]), [act, setAct] = useState(0), [msg, setMsg] = useState(null);
    const reset = () => { setTabs([{ g: false }]); setAct(0); setMsg(null); };
    const pickT = v => { setTg(v); reset(); }, pickI = v => { setImg(v === 'img'); reset(); };
    const go = () => {
      if (tg === '_blank') { setTabs(t => t.concat([{ g: true }])); setAct(tabs.length); setMsg({ en: 'A <b>new tab</b> opened with https://www.google.com. Your page is still open in the first tab: tap it to go back.', ar: 'اتفتحت <b>tab جديدة</b> فيها الـ google.com، وصفحتك لسه مفتوحة في أول tab، دوس عليها عشان ترجع.' }); }
      else { setTabs(t => t.map((x, j) => j === act ? { g: true } : x)); setMsg({ en: 'The <b>same tab</b> now shows https://www.google.com: your page was replaced.', ar: 'نفس الـ <b>tab</b> بقت بتعرض الـ google.com، وصفحتك اتشالت منها.' }); }
    };
    const L = ['<a href="https://www.google.com"' + (tg ? '' : '>')].concat(tg ? [`   target="${tg}">`] : [], [img ? '  <img src="logo.png">' : '  This is a link', '</a>']);
    const intro = {
      '': { en: 'No target: the default <b>_self</b> opens the link in the same frame, here the same tab. Tap the link.', ar: 'مفيش target، فالـ default هو <bdi dir="ltr">_self</bdi> وبيفتح الـ link في نفس الـ frame، يعني نفس الـ tab هنا. دوس على الـ link.' },
      _self: { en: '<b>_self</b> (the default): the same frame, here the same tab. Tap the link.', ar: 'الـ <bdi dir="ltr">_self</bdi> (الـ default) بيفتح في نفس الـ frame، يعني نفس الـ tab هنا. دوس على الـ link.' },
      _blank: { en: '<b>target="_blank"</b> opens the link in a new window/tab. Tap the link.', ar: 'الـ <bdi dir="ltr">target="_blank"</bdi> بيفتح الـ link في window أو tab جديدة. دوس على الـ link.' },
      _parent: { en: '<b>_parent</b> and <b>_top</b> are other target values; they matter when a page sits inside frames. This page has no frames, so the link opens in the same tab.', ar: 'الـ <bdi dir="ltr">_parent</bdi> والـ <bdi dir="ltr">_top</bdi> قيم تانية للـ target بتفرق لما الصفحة تبقى جوه frames. الصفحة دي مفيهاش frames، فالـ link هيفتح في نفس الـ tab.' }
    };
    const base = intro[tg === '_top' ? '_parent' : tg];
    const m = msg || (img ? { en: base.en + ' Here the link is an <b>image</b>: the &lt;img&gt; sits between &lt;a&gt; and &lt;/a&gt;, so clicking the picture follows the link.', ar: base.ar + ' وهنا الـ link عبارة عن <b>صورة</b>، الـ <bdi dir="ltr">&lt;img&gt;</bdi> محطوطة بين <bdi dir="ltr">&lt;a&gt;</bdi> و <bdi dir="ltr">&lt;/a&gt;</bdi>، فلما تدوس على الصورة بتروح للـ link.' } : base);
    const cur = tabs[act];
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="target" items=${[['', 'no target'], ['_self', '_self'], ['_blank', '_blank'], ['_parent', '_parent'], ['_top', '_top']]} sel=${tg} on=${pickT} />
      <${Chips} label="Link content" items=${[['txt', 'Text link'], ['img', 'Image link']]} sel=${img ? 'img' : 'txt'} on=${pickI} />
      <div className="wbv2-two"><${Code} lines=${L} />
        <${Win} tabs=${tabs.map(t => t.g ? 'www.google.com' : 'My page')} act=${act} onTab=${setAct} url=${cur.g ? 'https://www.google.com' : 'my-page.html'}>
          ${cur.g ? html`<div className="wbv2-gpage wbv2-in2"><b>www.google.com</b><small>the page the href points to</small></div>`
            : html`<div className="wbv2-p">${img ? html`<button className="wbv2-logo" onClick=${go} aria-label="Image link">logo.png</button>` : html`<button className="wbv2-a" onClick=${go}>This is a link</button>`}
              ${!msg && html` <span className=${calm() ? '' : 'wbv2-tap'} aria-hidden="true">👆</span>`}</div>`}<//></div>
      ${(msg || tabs.length > 1) && html`<div className="wbv2-chips" style=${{ marginTop: 10 }}><button className="fig-btn" onClick=${reset}>↻ Reset</button></div>`}
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [4.4] slides 20, 24: the page, View Page Source, and Inspect (edit on the fly) ── */
  const wrap = (s, w) => { const out = []; let cur = ''; for (const word of s.split(' ')) { if (cur && (cur + ' ' + word).length > w) { out.push(cur); cur = word; } else cur = cur ? cur + ' ' + word : word; } if (cur) out.push(cur); return out; };
  function ViewSrc({ ar }) {
    const [mode, setMode] = useState('page'), [sel, setSel] = useState('h2');
    const [tx, setTx] = useState({ h2: 'The href Attribute', p: 'HTML links are defined with the a tag. The link address is specified in the href attribute:', a: 'Visit Google' });
    const [col, setCol] = useState({ h2: '', p: '', a: '' });
    const lines = [['<!DOCTYPE html>'], ['<html>'], ['<body>']].map(([s]) => ({ s, el: null }));
    wrap('<h2>' + tx.h2 + '</h2>', 32).forEach(s => lines.push({ s, el: 'h2' }));
    wrap('<p>' + tx.p + '</p>', 32).forEach(s => lines.push({ s, el: 'p' }));
    lines.push({ s: '<a href="https://www.google.com">', el: 'a' }); wrap(tx.a + '</a>', 32).forEach(s => lines.push({ s, el: 'a' }));
    lines.push({ s: '</body>', el: null }, { s: '</html>', el: null });
    const on = mode === 'insp' ? lines.map((l, j) => l.el === sel ? j : -1).filter(j => j >= 0) : [];
    const pk = (k, node) => mode === 'insp' ? html`<div className=${'wbv2-pick' + (sel === k ? ' sel' : '')} onClick=${() => setSel(k)} role="button" tabIndex="0" aria-label=${'Inspect ' + k}>${node}</div>` : node;
    const st = k => col[k] ? { color: col[k] } : null;
    const page = html`${pk('h2', html`<div className="wbv2-h wbv2-h2" style=${st('h2')}>${tx.h2}</div>`)}${pk('p', html`<div className="wbv2-p" style=${st('p')}>${tx.p}</div>`)}${pk('a', html`<div className="wbv2-p"><span className="wbv2-a" style=${st('a')}>${tx.a}</span></div>`)}`;
    const caps = {
      page: { en: 'The page as the browser shows it: no tags are displayed. Right-click the page to see its HTML.', ar: 'دي الصفحة زي ما الـ browser بيعرضها، ومفيش ولا tag ظاهر. اعمل كليك يمين على الصفحة عشان تشوف الـ HTML بتاعها.' },
      src: { en: 'Right-click, then <b>View Page Source</b> (Chrome) or <b>View Source</b> (Edge): a window opens with the HTML source code of the page.', ar: 'كليك يمين وبعدين <b>View Page Source</b> في الـ Chrome أو <b>View Source</b> في الـ Edge، فبتفتح window فيها الـ HTML source code بتاع الصفحة.' },
      insp: { en: '<b>Inspect</b> shows the HTML and CSS of the element you pick (tap one in the page) and lets you edit them on the fly: change the text or the colour and the page updates.', ar: 'الـ <b>Inspect</b> بيوريك الـ HTML والـ CSS بتوع الـ element اللي تختاره (دوس على واحد في الصفحة) وبيخليك تعدّلهم على طول، غيّر الكلام أو اللون والصفحة تتغير.' }
    }[mode];
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="View" items=${[['page', 'The page'], ['src', 'View Page Source'], ['insp', 'Inspect']]} sel=${mode} on=${setMode} />
      ${mode === 'src' ? html`<${Win} tabs=${['My page', 'view-source']} act=${1} url="view-source:my-page.html"><div style=${{ fontSize: '1rem' }}><${Code} lines=${lines.map(l => l.s)} num=${true} /></div><//>`
        : html`<${Win} tabs=${['My page']} url="my-page.html">${page}<//>`}
      ${mode === 'insp' && html`<div className="wbv2-dev wbv2-in2"><b>Elements</b><${Code} lines=${lines.map(l => l.s)} on=${on} />
        <div className="wbv2-edit"><span>text</span><input className="wbv2-in" value=${tx[sel]} maxLength="120" aria-label="Edit the element's text" onInput=${e => { const v = e.target.value; setTx(t => Object.assign({}, t, { [sel]: v })); }} />
          <span>color</span><${Chips} mono=${true} label="Style: color" items=${[['', 'default'], ['red', 'red'], ['blue', 'blue']]} sel=${col[sel]} on=${v => setCol(c => Object.assign({}, c, { [sel]: v }))} /></div></div>`}
    </div><${Cap} en=${caps.en} ar=${caps.ar} showAr=${ar} /><//>`;
  }

  /* ── [5.0] slide 23: attributes are name="value" pairs in the start tag ── */
  const AT = [
    { k: 'a', tag: 'a', at: [['href', 'https://www.google.com']], c: 'This is a link' },
    { k: 'img', tag: 'img', at: [['src', 'img_girl.jpg'], ['width', '500'], ['height', '600']] },
    { k: 'style', tag: 'p', at: [['style', 'color:red;']], c: 'This is a red paragraph.' },
    { k: 'title', tag: 'p', at: [['title', "I'm a tooltip"]], c: 'This is a paragraph.' }
  ];
  function AttrSteps({ x, ar }) {
    const steps = [
      { en: 'All HTML elements can have <b>attributes</b>: they provide additional information about the element.', ar: 'كل HTML elements ممكن يبقى ليها <b>attributes</b>، وبتدّي معلومات زيادة عن الـ element.' },
      { en: `Attributes are always specified in the <b>start tag</b> &lt;${x.tag} …&gt;.`, ar: `الـ Attributes دايمًا بتتكتب في الـ <b>start tag</b> ${T('<' + x.tag + ' …>')}.` }
    ].concat(x.at.map(([n, v]) => ({ en: `A <b>name/value pair</b>: name <b>${n}</b>, value <b>"${esc(v)}"</b> in quotes, written ${n}="${esc(v)}".`, ar: `دي <b>pair من name و value</b>، الـ name هو ${T(n)} والـ value هو ${T('"' + v + '"')} بين quotes.` })), [
      x.c ? { en: `The end tag &lt;/${x.tag}&gt; never carries attributes.`, ar: `الـ end tag ${T('</' + x.tag + '>')} عمره ما بياخد attributes.` }
        : { en: '&lt;img&gt; is an empty element: no end tag, so all its attributes sit in its one start tag.', ar: 'الـ <bdi dir="ltr">&lt;img&gt;</bdi> ده empty element مالوش end tag، فكل الـ attributes بتاعته في الـ start tag الوحيد.' }
    ]);
    const [i, ctl] = useSteps(steps.length, 1900);
    const last = steps.length - 1, inStart = i >= 1 && i < last, cls = on => 'wbv2-part' + (on ? ' on' : '');
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="wbv2-anat" dir="ltr">
        <div className=${cls(inStart)}><span>${'<' + x.tag}</span><small>start tag</small></div>
        ${x.at.map(([n, v], j) => html`<div key=${n} className=${'wbv2-ag' + (i === 2 + j ? ' on' : '')}>
          <div className=${cls(i === 2 + j)}><span>${n}</span><small>name</small></div><div className="wbv2-part"><span>=</span><small> </small></div>
          <div className=${cls(i === 2 + j)}><span>"${v}"</span><small>value</small></div></div>`)}
        <div className=${cls(inStart)}><span>${'>'}</span><small> </small></div>
        ${x.c && html`<div className="wbv2-part"><span style=${{ fontFamily: 'var(--body)', fontWeight: 400 }}>${x.c}</span><small>content</small></div>`}
        ${x.c && html`<div className=${cls(i === last)}><span>${'</' + x.tag + '>'}</span><small>end tag: no attributes</small></div>`}
      </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function Attr({ ar }) {
    const [k, setK] = useState('a');
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: 6 }}><${Chips} label="Attribute" mono=${true} items=${[['a', 'href'], ['img', 'src width height'], ['style', 'style'], ['title', 'title']]} sel=${k} on=${setK} /></div>
      <${AttrSteps} key=${k} x=${AT.find(a => a.k === k)} ar=${ar} /><//>`;
  }

  /* ── [5.2]–[5.4] slides 25, 27, 28: <img> with src, width / height and alt ── */
  const Girl = ({ w, h }) => html`<svg width=${w} height=${h} viewBox="0 0 100 120" preserveAspectRatio="none" role="img" aria-label="the picture img_girl.jpg" style=${{ display: 'block', borderRadius: 3, width: w + 'px', height: h + 'px', maxWidth: 'none', margin: 0 }}>
    <rect width="100" height="120" fill="#cfe3f0" /><path d="M24 120 q2 -38 26 -40 q24 2 26 40 z" fill="#b0413e" /><path d="M50 80 l-7 40 h14 z" fill="#8c2f2c" />
    <path d="M27 56 q-2 -36 23 -38 q25 2 23 38 q-4 12 -8 18 h-30 q-4 -6 -8 -18z" fill="#4a2f1f" /><ellipse cx="50" cy="52" rx="15" ry="18" fill="#e9b48f" />
    <circle cx="44" cy="50" r="1.8" fill="#2b1d14" /><circle cx="56" cy="50" r="1.8" fill="#2b1d14" /><path d="M45 60 q5 4 10 0" stroke="#2b1d14" strokeWidth="1.4" fill="none" /></svg>`;
  function Img({ ar }) {
    const [ok, setOk] = useState(true), [alt, setAlt] = useState(true), [w, setW] = useState(500), [h, setH] = useState(600);
    const src = ok ? 'img_girl.jpg' : 'img_gril.jpg', S = .2, pw = Math.round(w * S), ph = Math.round(h * S);
    const L = [`<img src="${src}"`].concat(alt ? ['     alt="Girl with a jacket"'] : [], [`     width="${w}" height="${h}">`]);
    const m = ok ? (alt ? { en: `The browser loads <b>img_girl.jpg</b> (src) and draws it <b>${w}×${h}</b> pixels (width × height), shown here at 1/5 size.`, ar: `الـ browser بيحمّل ${T('img_girl.jpg')} من الـ src وبيرسمها بمقاس ${T(w + '×' + h)} pixels (الـ width × الـ height)، ومعروضة هنا بخُمس المقاس.` }
      : { en: `The picture shows (${w}×${h} pixels), but <b>alt is required</b>: without it nothing useful is shown if the image cannot be displayed (slow connection or an error in src).`, ar: `الصورة ظاهرة (${T(w + '×' + h)} pixels)، بس الـ <b>alt مطلوب (required)</b>، من غيره مفيش حاجة مفيدة هتظهر لو الصورة ماعرفتش تتعرض (connection بطيء أو غلط في الـ src).` })
      : (alt ? { en: 'There is an <b>error in src</b> (img_gril.jpg), so the image cannot be displayed: the browser shows the <b>alt</b> text “Girl with a jacket” instead.', ar: 'فيه <b>غلط في الـ src</b> اللي هو <bdi dir="ltr">img_gril.jpg</bdi>، فالصورة ماتعرضتش والـ browser عرض الـ <b>alt</b> text بدالها وهو <bdi dir="ltr">Girl with a jacket</bdi>.' }
        : { en: 'Error in src and <b>no alt</b>: the user sees only an empty box. That is why alt is required on &lt;img&gt;.', ar: 'فيه غلط في الـ src و<b>مفيش alt</b>، فالـ user شايف مربع فاضي بس. وعشان كده الـ alt مطلوب على الـ <bdi dir="ltr">&lt;img&gt;</bdi>.' });
    const broken = html`<div className="wbv2-broken" style=${{ width: pw, height: ph }}><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style=${{ flex: 'none', width: '14px', height: '14px', margin: 0 }}><rect x="1" y="1" width="12" height="12" fill="none" stroke="var(--graphite)" /><path d="M1 10 l4 -4 l3 3 l2 -2 l3 3" stroke="var(--pen)" fill="none" /></svg>${alt && html`<span>Girl with a jacket</span>`}</div>`;
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="src" mono=${true} items=${[['ok', 'src="img_girl.jpg"'], ['bad', 'src error']]} sel=${ok ? 'ok' : 'bad'} on=${v => setOk(v === 'ok')} />
      <${Chips} label="alt" items=${[['y', 'with alt'], ['n', 'no alt']]} sel=${alt ? 'y' : 'n'} on=${v => setAlt(v === 'y')} />
      <div className="wbv2-two"><div><${Code} lines=${L} />
        <div className="wbv2-ctl"><span>width</span><input type="range" min="100" max="600" step="50" value=${w} onInput=${e => setW(+e.target.value)} aria-label="width" /><b>${w}</b>
          <span>height</span><input type="range" min="100" max="700" step="50" value=${h} onInput=${e => setH(+e.target.value)} aria-label="height" /><b>${h}</b></div></div>
        <div className="wbv2-stage" style=${{ height: 156 }}>${ok ? html`<${Girl} w=${pw} h=${ph} />` : broken}</div></div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [5.5]–[5.7] slides 29 to 32: style, lang and title ── */
  const OKP = { color: 'color', 'background-color': 'backgroundColor', 'font-size': 'fontSize', 'font-family': 'fontFamily', 'font-style': 'fontStyle', 'font-weight': 'fontWeight', 'text-align': 'textAlign' };
  function parseStyle(v) {
    const o = {};
    String(v).split(';').forEach(d => { const i = d.indexOf(':'); if (i < 0) return; const p = d.slice(0, i).trim().toLowerCase(); let val = d.slice(i + 1).trim(); if (!OKP[p] || !val || /url|expression/i.test(val)) return;
      if (p === 'font-size') { const n = parseFloat(val); if (/px$/.test(val) && n > 40) val = '40px'; if (/%$/.test(val) && n > 250) val = '250%'; if (/em$/.test(val) && n > 2.5) val = '2.5em'; if (/^\d+(\.\d+)?$/.test(val)) return; }
      o[OKP[p]] = val; });
    return o;
  }
  const LANG = { en: 'English', ar: 'Arabic', fr: 'French', de: 'German', es: 'Spanish', it: 'Italian' }, CTRY = { US: 'United States', GB: 'United Kingdom', EG: 'Egypt', CA: 'Canada', AU: 'Australia', FR: 'France' };
  function PAttrs({ ar }) {
    const [tab, setTab] = useState('style'), [sv, setSv] = useState('color:red;'), [tv, setTv] = useState("I'm a tooltip"), [tip, setTip] = useState(false), [lv, setLv] = useState('en-US');
    let body, L, m;
    if (tab === 'style') {
      L = [`<p style="${sv}">`, 'This is a red paragraph.</p>'];
      body = html`<div className="wbv2-p" style=${parseStyle(sv)}>This is a red paragraph.</div>`;
      m = { en: 'The <b>style</b> attribute adds styles to an element, such as color, font and size. Pick one or type your own.', ar: 'الـ attribute اللي اسمه <b>style</b> بيضيف styles للـ element زي اللون والـ font والحجم. اختار واحد أو اكتب بتاعك.' };
    } else if (tab === 'title') {
      L = [`<p title="${tv}">`, 'This is a paragraph.</p>'];
      body = html`<div className="wbv2-p"><span className="wbv2-tip" title=${tv} tabIndex="0" onMouseEnter=${() => setTip(true)} onMouseLeave=${() => setTip(false)} onClick=${() => setTip(x => !x)} onFocus=${() => setTip(true)} onBlur=${() => setTip(false)}>This is a paragraph.${tip && tv && html`<span className="wbv2-tipb">${tv}</span>`}</span></div><div style=${{ height: 30 }}></div>`;
      m = tip ? { en: `The value of <b>title</b> is displayed as a tooltip: “${esc(tv)}”.`, ar: `الـ value بتاعة الـ <b>title</b> ظهرت كـ tooltip وهي ${T(tv)}.` }
        : { en: 'The <b>title</b> attribute defines extra information about an element. Move the mouse over the paragraph (tap it on a phone).', ar: 'الـ attribute اللي اسمه <b>title</b> بيعرّف معلومات زيادة عن الـ element. حط الماوس على الـ paragraph (أو دوس عليه في الموبايل).' };
    } else {
      const v = lv.trim(), ln = v.slice(0, 2).toLowerCase(), ct = v.length > 2 ? v.slice(-2).toUpperCase() : '';
      L = ['<!DOCTYPE html>', `<html lang="${v}">`, '<body>', '...', '</body>', '</html>'];
      body = html`<div className="wbv2-lang"><div>language<b>${ln || '?'}</b><span>${LANG[ln] || 'code ' + (ln || '?')}</span></div><div>country<b>${ct || '-'}</b><span>${ct ? CTRY[ct] || 'code ' + ct : 'not given'}</span></div></div>`;
      m = { en: 'Declare the language in &lt;html lang="…"&gt; to assist search engines and browsers. In lang="en-US" the first two characters are the language, the last two the country.', ar: 'حدد اللغة في <bdi dir="ltr">&lt;html lang="…"&gt;</bdi> عشان تساعد الـ search engines والـ browsers. وفي <bdi dir="ltr">lang="en-US"</bdi> أول حرفين هما اللغة وآخر حرفين هما البلد.' };
    }
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="Attribute" items=${[['style', 'style'], ['title', 'title'], ['lang', 'lang']]} sel=${tab} on=${t => { setTab(t); setTip(false); }} />
      ${tab === 'style' && html`<${Chips} mono=${true} label="Example" items=${[['color:red;', 'color:red;'], ['color:blue;', 'color:blue;'], ['font-family:courier;', 'font-family:courier;'], ['font-size:160%;', 'font-size:160%;']]} sel=${sv} on=${setSv} />
        <div className="wbv2-own"><small>Try your own style</small><input className="wbv2-in" value=${sv} maxLength="60" spellCheck="false" autoCapitalize="off" aria-label="style value" onInput=${e => setSv(e.target.value)} /></div>`}
      ${tab === 'title' && html`<div className="wbv2-own"><small>Try your own title</small><input className="wbv2-in" value=${tv} maxLength="30" aria-label="title value" onInput=${e => setTv(e.target.value)} /></div>`}
      ${tab === 'lang' && html`<${Chips} mono=${true} label="Example" items=${[['en', 'en'], ['en-US', 'en-US']]} sel=${lv} on=${setLv} />
        <div className="wbv2-own"><small>Try your own (for example ar-EG)</small><input className="wbv2-in" value=${lv} maxLength="10" spellCheck="false" autoCapitalize="off" aria-label="lang value" onInput=${e => setLv(e.target.value)} /></div>`}
      <div className="wbv2-two"><${Code} lines=${L} on=${tab === 'lang' ? [1] : [0]} />
        ${tab === 'lang' ? body : html`<${Win} tabs=${['page.html']} url="the browser shows">${body}<//>`}</div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [6] slide 26: absolute URL, relative without / and with a leading slash ── */
  const BASE = 'https://www.example.com/pages/index.html';
  const TREE = [['/', 'www.example.com/', 0], ['/images/', 'images/', 1], ['/images/img_girl.jpg', 'img_girl.jpg', 2], ['/pages/', 'pages/', 1], ['/pages/index.html', 'index.html', 2], ['/pages/about.html', 'about.html', 2], ['/pages/img_girl.jpg', 'img_girl.jpg', 2]];
  const UEX = [['abs', 'src', 'https://www.google.com/images/img_girl.jpg'], ['rel', 'src', 'img_girl.jpg'], ['root', 'src', '/images/img_girl.jpg'], ['site', 'href', 'about.html']];
  function Url({ ar }) {
    const [k, setK] = useState('abs'), [own, setOwn] = useState('../images/img_girl.jpg');
    const ex = UEX.find(x => x[0] === k), v = (k === 'own' ? own : ex[2]).trim(), at = k === 'own' ? 'src' : ex[1];
    let u = null; try { u = v ? new URL(v, BASE) : null; } catch (e) { u = null; }
    const kd = /^[a-z][a-z0-9+.-]*:/i.test(v) || v.startsWith('//') ? 'abs' : v.startsWith('/') ? 'root' : 'rel';
    const here = u && u.host === 'www.example.com', start = kd === 'abs' ? null : kd === 'root' ? '/' : '/pages/';
    const found = u && here && TREE.some(t => t[0] === u.pathname), ext = u && !here;
    const caps = {
      abs: { en: '<b>Absolute URL</b>: the full address with the domain. It links to an external image hosted on another website, which might be under copyright.', ar: 'الـ <b>Absolute URL</b> فيه العنوان كامل بالـ domain، وبيشاور على صورة external متخزنة على website تاني، وممكن تكون عليها copyright.' },
      rel: { en: '<b>Relative URL, no leading slash</b>: relative to the current page, so the browser starts in the folder of this page (/pages/).', ar: 'الـ <b>Relative URL من غير slash في الأول</b> بيتحسب من الصفحة الحالية، فالـ browser بيبدأ من الفولدر بتاعها <bdi dir="ltr">/pages/</bdi>.' },
      root: { en: '<b>Relative URL with a leading slash</b>: relative to the domain, so the browser starts at the root of the site.', ar: 'الـ <b>Relative URL اللي بيبدأ بـ slash</b> بيتحسب من الـ domain، فالـ browser بيبدأ من الـ root بتاع الـ site.' },
      site: { en: 'Relative URLs are used to link other pages within the same site: about.html sits in the same folder as this page.', ar: 'الـ Relative URLs بنستخدمها عشان نربط صفحات تانية جوه نفس الـ site، والـ <bdi dir="ltr">about.html</bdi> في نفس فولدر الصفحة دي.' }
    };
    const c0 = caps[k === 'site' ? 'site' : kd];
    const c = !u ? { en: 'That is not a valid URL.', ar: 'ده مش URL صح.' }
      : k === 'own' ? { en: c0.en + (found ? '' : ext ? '' : ' (That file is not in this small site.)'), ar: c0.ar + (found || ext ? '' : ' (الملف ده مش موجود في الـ site الصغير ده.)') } : c0;
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="URL" items=${[['abs', 'Absolute URL'], ['rel', 'No leading slash'], ['root', 'Leading slash'], ['site', 'Same-site link'], ['own', 'Try your own']]} sel=${k} on=${setK} />
      ${k === 'own' && html`<div className="wbv2-own"><small>Type a src / href value</small><input className="wbv2-in" value=${own} maxLength="80" spellCheck="false" autoCapitalize="off" aria-label="URL" onInput=${e => setOwn(e.target.value)} /></div>`}
      <div className="wbv2-res">current page: ${BASE}</div>
      <div className="wbv2-res" style=${{ fontSize: '.85rem' }} dangerouslySetInnerHTML=${{ __html: hl(at === 'href' ? `<a href="${v}">` : `<img src="${v}">`) }}></div>
      <div className="wbv2-arrow">▼ the browser fetches ▼</div>
      <div className="wbv2-res">${u ? html`<span className="hs">${u.protocol}//${u.host}</span><span className="ps">${u.pathname}</span>` : '?'}</div>
      <div className="wbv2-sites">
        <div className=${'wbv2-site' + (here ? ' on' : ' dim')}><b>this site</b>${TREE.map(([p, lbl, d]) => html`<div key=${p} className=${'wbv2-node' + (here && u.pathname === p ? ' tg' : '')} style=${{ paddingLeft: 4 + d * 16 }}>
          <span>${lbl}</span>${p === '/pages/index.html' && html`<em className="s">this page</em>`}${start === p && html`<em className="s">start</em>`}${here && u.pathname === p && html`<em className="t">fetched</em>`}</div>`)}</div>
        <div className=${'wbv2-site' + (ext ? ' on' : ' dim')}><b>another website</b><div className="wbv2-node">www.google.com/</div>
          <div className=${'wbv2-node' + (ext && u.host === 'www.google.com' && u.pathname === '/images/img_girl.jpg' ? ' tg' : '')} style=${{ paddingLeft: 20 }}><span>images/img_girl.jpg</span>${ext && u.host === 'www.google.com' && u.pathname === '/images/img_girl.jpg' && html`<em className="t">fetched</em>`}</div>
          ${ext && u.host !== 'www.google.com' && html`<div className="wbv2-node tg">${u.host + u.pathname}</div>`}</div>
      </div>
    </div><${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /><//>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'wb-doc': Doc, 'wb-element': Element, 'wb-nest': Nest, 'wb-headbody': HeadBody, 'wb-headings': Headings,
    'wb-link': Link, 'wb-viewsrc': ViewSrc, 'wb-attr': Attr, 'wb-img': Img, 'wb-pattrs': PAttrs, 'wb-url': Url
  });
})();
/* ── part L3 ── */
// Web Programming visuals, Lecture 3 (HTML II: formatting, styles and colors): quotes inside attribute values, <hr> and <br>,
// the poem problem and <pre>, the style attribute and its CSS properties, the text formatting elements, comments,
// colour names, Tomato written 5 ways (with a colour converter), shades of gray, and the inline-styles example run line by line (slides 3 to 31).
// Every label and number comes from the site's notes.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.wbv3 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.wbv3 .fig-btn:disabled{ opacity:.45; cursor:default; }
.wbv3-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.wbv3-chips .fig-btn{ font-size:.8rem; padding:4px 10px; min-height:30px; }
.wbv3-chips .fig-btn.m{ font-family:var(--mono); }
.wbv3-code{ font:.78rem/1.5 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:7px 5px; white-space:pre-wrap; overflow-wrap:anywhere; direction:ltr; text-align:left; color:var(--ink); margin:0; }
.wbv3-code .ln{ display:block; border-radius:4px; padding:0 3px; min-height:1.5em; transition:background .4s, opacity .4s; }
.wbv3-code .ln.on{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.wbv3-code .ln.dim{ opacity:.4; }
.wbv3-t{ color:var(--fig-k); font-weight:600; } .wbv3-an{ color:var(--pen); } .wbv3-av{ color:var(--ok); } .wbv3-cm{ color:var(--graphite); font-style:italic; }
.wbv3-bad{ color:var(--pen); text-decoration:underline wavy; text-underline-offset:3px; }
.wbv3-two{ display:grid; grid-template-columns:minmax(0,1fr); gap:8px; max-width:560px; margin:0 auto; }
@media (min-width:640px){ .wbv3-two{ grid-template-columns:repeat(2, minmax(0,1fr)); align-items:start; } }
.wbv3-arrow{ text-align:center; color:var(--fig-k); font-size:.8rem; font-weight:600; margin:2px 0; }
.wbv3-win{ border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); overflow:hidden; }
.wbv3-url{ display:flex; gap:5px; align-items:center; padding:4px 8px; background:var(--paper-2); border-bottom:1px solid var(--line); font:.75rem/1.4 var(--mono); color:var(--graphite); overflow-wrap:anywhere; }
.wbv3-url i{ width:8px; height:8px; border-radius:50%; background:var(--line); flex:none; }
.wbv3-page{ padding:8px 12px 10px; font-family:"Times New Roman", Times, serif; font-size:1rem; line-height:1.3; min-height:60px; overflow-wrap:anywhere; text-align:left; direction:ltr; transition:background .4s; }
.wbv3-page.w{ background:#fff; color:#000; }
.wbv3-h1{ font-size:2em; font-weight:700; margin:.3em 0; line-height:1.15; } .wbv3-h2{ font-size:1.5em; font-weight:700; margin:.3em 0; line-height:1.15; }
.wbv3-p{ margin:.55em 0; } .wbv3-hr{ border:0; border-top:1.5px solid var(--graphite); margin:.5em 0; height:0; }
.wbv3-pre{ font:.75rem/1.35 "Courier New", Courier, monospace; white-space:pre-wrap; overflow-wrap:anywhere; margin:.5em 0; }
.wbv3-in{ font:.85rem var(--mono); width:100%; box-sizing:border-box; border:1px solid var(--line); border-radius:6px; padding:5px 8px; background:var(--paper); color:var(--ink); direction:ltr; }
textarea.wbv3-in{ resize:vertical; line-height:1.4; }
.wbv3-own{ max-width:420px; margin:0 auto 10px; } .wbv3-own small{ display:block; font-size:.75rem; color:var(--graphite); margin:0 0 3px; }
@keyframes wbv3in{ from{ opacity:0; transform:translateY(5px); } to{ opacity:1; transform:none; } }
.wbv3-in2{ animation:wbv3in .45s ease both; }
/* quotes */
.wbv3-tip{ display:inline-block; margin:4px 0 2px; background:var(--ink); color:var(--paper); font:.8rem/1.35 var(--body); padding:4px 9px; border-radius:5px; overflow-wrap:anywhere; max-width:100%; box-sizing:border-box; }
.wbv3-tip small{ display:block; font-size:.75rem; opacity:.8; }
/* poem */
.wbv3-ws{ background:color-mix(in srgb, var(--fig-k) 28%, transparent); color:var(--fig-k); border-radius:3px; transition:background .4s; }
.wbv3-ws1{ display:inline-block; min-width:.6em; height:1.05em; vertical-align:-2px; background:color-mix(in srgb, var(--fig-k) 45%, transparent); border-radius:3px; }
/* style properties */
.wbv3-rows{ display:grid; grid-template-columns:minmax(0,1fr); gap:6px; max-width:560px; margin:0 auto 10px; }
.wbv3-row{ border:1px solid var(--line); border-radius:8px; padding:4px 6px; background:var(--paper); }
.wbv3-row > b{ display:block; font:600 .78rem var(--mono); color:var(--fig-k); margin:0 0 3px; }
.wbv3-row .wbv3-chips{ justify-content:flex-start; margin:0; gap:4px; }
.wbv3-row .wbv3-chips .fig-btn{ font-size:.75rem; padding:3px 8px; min-height:28px; }
.wbv3-sub{ text-align:center; font-size:.78rem; color:var(--graphite); margin:0 0 6px; }
/* formatting */
.wbv3-twin{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; margin-top:6px; }
.wbv3-twin div{ border:1px dashed var(--line); border-radius:6px; padding:4px; text-align:center; }
.wbv3-twin small{ display:block; font:.75rem var(--mono); color:var(--graphite); }
.wbv3-mean{ font:.8rem/1.4 var(--body); color:var(--graphite); margin-top:4px; }
/* comments table */
.wbv3-tbl{ width:100%; max-width:420px; margin:8px auto 0; border-collapse:collapse; font-size:.8rem; direction:ltr; }
.wbv3-tbl th, .wbv3-tbl td{ border:1px solid var(--line); padding:4px 6px; text-align:left; color:var(--ink); background:var(--paper); }
.wbv3-tbl th{ background:var(--paper-2); font-weight:600; } .wbv3-tbl td code{ font:600 .8rem var(--mono); color:var(--fig-k); margin-right:6px; white-space:nowrap; }
.wbv3-tbl tr{ transition:opacity .4s; } .wbv3-tbl tr.off{ opacity:0; } .wbv3-tbl tr.on td{ box-shadow:inset 0 0 0 1.5px var(--fig-k); }
/* colours */
.wbv3-chk{ background-color:#fff; background-image:linear-gradient(45deg,#ccc 25%,transparent 25%,transparent 75%,#ccc 75%),linear-gradient(45deg,#ccc 25%,transparent 25%,transparent 75%,#ccc 75%); background-size:12px 12px; background-position:0 0,6px 6px; }
.wbv3-ways{ display:grid; grid-template-columns:minmax(0,1fr); gap:5px; max-width:420px; margin:0 auto; }
.wbv3-way{ display:grid; grid-template-columns:44px minmax(0,1fr); gap:8px; align-items:center; border:1.5px solid var(--line); border-radius:8px; padding:4px 6px; background:var(--paper); transition:border-color .4s, opacity .5s, transform .5s; }
.wbv3-way.on{ border-color:var(--fig-k); }
.wbv3-way .sw{ height:26px; border-radius:5px; overflow:hidden; border:1px solid var(--line); }
.wbv3-way .sw span{ display:block; height:100%; }
.wbv3-way code{ font:600 .82rem var(--mono); color:var(--ink); overflow-wrap:anywhere; }
.wbv3-way small{ display:block; font-size:.75rem; color:var(--graphite); }
.wbv3-calc{ max-width:420px; margin:8px auto 0; border:1px solid var(--line); border-radius:8px; padding:6px 8px; background:var(--paper); font:.8rem/1.55 var(--mono); color:var(--ink); direction:ltr; text-align:left; min-height:3em; }
.wbv3-calc b{ color:var(--fig-k); }
.wbv3-bars{ display:grid; grid-template-columns:auto minmax(0,1fr) 2.6em; gap:3px 6px; align-items:center; }
.wbv3-bars .tr{ height:12px; border-radius:3px; background:var(--paper-2); border:1px solid var(--line); overflow:hidden; }
.wbv3-bars .tr span{ display:block; height:100%; transition:width .6s; }
.wbv3-ctl{ display:grid; grid-template-columns:auto minmax(0,1fr) 3em; gap:4px 8px; align-items:center; font-size:.8rem; max-width:420px; margin:8px auto 0; color:var(--ink); }
.wbv3-ctl input[type=range]{ width:100%; accent-color:var(--fig-k); } .wbv3-ctl b{ font-family:var(--mono); text-align:right; }
.wbv3-big{ height:46px; border-radius:8px; border:1px solid var(--line); overflow:hidden; max-width:420px; margin:0 auto 8px; } .wbv3-big span{ display:block; height:100%; }
.wbv3-names{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:5px; max-width:420px; margin:0 auto 10px; }
@media (min-width:520px){ .wbv3-names{ grid-template-columns:repeat(4, minmax(0,1fr)); } }
.wbv3-name{ font:600 .78rem var(--body); border-radius:6px; min-height:34px; border:2px solid transparent; cursor:pointer; padding:2px 4px; overflow-wrap:anywhere; }
.wbv3-name[aria-pressed="true"]{ outline:2.5px solid var(--fig-k); outline-offset:2px; }
.wbv3-grays{ display:grid; grid-template-columns:minmax(0,1fr); gap:3px; max-width:420px; margin:0 auto; }
.wbv3-gray{ font:600 .8rem var(--mono); padding:5px 8px; border-radius:4px; border:1px solid var(--line); }
@media (prefers-reduced-motion: reduce){ .wbv3-in2{ animation:none; } }`;
  if (!document.getElementById('wbv3-css')) { const s = document.createElement('style'); s.id = 'wbv3-css'; s.textContent = CSS; document.head.appendChild(s); }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // inline code inside an Arabic sentence: always an ltr isolate
  const T = s => `<bdi dir="ltr">${esc(s)}</bdi>`;
  // colours one line of HTML source (tags, attribute names, values, comments)
  function hl(src) {
    return String(src).replace(/<!--[\s\S]*?(-->|$)|<[^<>]*>|[^<]+|</g, tok => {
      if (tok.startsWith('<!--')) return `<span class="wbv3-cm">${esc(tok)}</span>`;
      const m = tok.length > 1 && tok.match(/^<(\/?!?[A-Za-z][\w-]*)([\s\S]*?)(\/?)>$/);
      if (!m) return esc(tok);
      const at = m[2].replace(/(\s*)([^\s=]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s"']+))?/g, (_, sp, n, eq, v) => esc(sp) + `<span class="wbv3-an">${esc(n)}</span>` + (eq ? esc(eq) + `<span class="wbv3-av">${esc(v)}</span>` : ''));
      return `<span class="wbv3-t">&lt;${esc(m[1])}</span>${at}<span class="wbv3-t">${m[3]}&gt;</span>`;
    });
  }
  const tg = s => `<span class="wbv3-t">${esc(s)}</span>`, an = s => `<span class="wbv3-an">${esc(s)}</span>`, av = s => `<span class="wbv3-av">${esc(s)}</span>`;
  // lines: plain HTML source strings, or { h } already coloured
  const Code = ({ lines, on, dim, label }) => html`<pre className="wbv3-code" aria-label=${label || 'HTML source'}>${lines.map((l, j) => html`<span key=${j}
    className=${'ln' + (on && on.includes(j) ? ' on' : (dim && on && on.length ? ' dim' : ''))} dangerouslySetInnerHTML=${{ __html: (typeof l === 'string' ? hl(l) : l.h) || ' ' }}></span>`)}</pre>`;
  const Win = ({ url, white, style, children }) => html`<div className="wbv3-win"><div className="wbv3-url"><i></i><i></i><i></i><span>${url || 'page.html'}</span></div>
    <div className=${'wbv3-page' + (white ? ' w' : '')} style=${style}>${children}</div></div>`;
  const Chips = ({ items, sel, on, mono, label }) => html`<div className="wbv3-chips" role="group" aria-label=${label || 'Choose'}>${items.map(([k, t]) => html`<button key=${k}
    className=${'fig-btn' + (mono ? ' m' : '')} aria-pressed=${String(sel === k)} onClick=${() => on(k)}>${t}</button>`)}</div>`;
  const Fig = ({ children }) => html`<figure className="fig wbv3">${children}</figure>`;
  const Arrow = () => html`<div className="wbv3-arrow">▼ the browser shows ▼</div>`;

  /* ── [0.0] slide 3: single or double quotes around an attribute value ── */
  const QX = { ex: ["'", 'John "ShotGun" Nelson'], rev: ['"', "John 'ShotGun' Nelson"], bad: ['"', 'John "ShotGun" Nelson'] };
  function Quotes({ ar }) {
    const [k, setK] = useState('ex'), [oq, setOq] = useState("'"), [ov, setOv] = useState("John 'ShotGun' Nelson");
    const [q, v] = k === 'own' ? [oq, ov] : QX[k];
    const cut = v.indexOf(q), read = cut < 0 ? v : v.slice(0, cut), rest = cut < 0 ? '' : v.slice(cut + 1) + q;
    const qn = q === '"' ? 'double' : 'single', other = q === '"' ? 'single' : 'double';
    const l1 = tg('<p') + ' ' + an('title') + '=' + (cut < 0 ? av(q + v + q) : av(q + read + q) + `<span class="wbv3-bad">${esc(rest)}</span>`) + tg('>');
    const lines = [{ h: l1 }, { h: 'This is a paragraph.' + tg('</p>') }];
    let m;
    if (cut < 0) m = {
      en: `The value is wrapped in <b>${qn} quotes</b> and has no ${qn} quote inside, so the browser reads all of it. The tooltip shows: <b>${esc(v)}</b>` + (k === 'ex' ? '. The value itself contains double quotes, so single quotes go around it.' : k === 'rev' ? '. The reverse also works: single quotes inside, double quotes around.' : ''),
      ar: `القيمة محطوطة بين الـ <b>${qn} quotes</b> ومفيهاش ${qn} quote جواها، فالـ browser بيقرأها كلها. الـ tooltip بيعرض ${T(v || ' ')}` + (k === 'ex' ? '. القيمة نفسها فيها double quotes، فبنحط حواليها single quotes.' : k === 'rev' ? '. والعكس برضه بيشتغل، يعني single quotes جوه و double quotes برّه.' : '')
    };
    else m = {
      en: `✗ The value starts with a ${qn} quote, so the first ${qn} quote inside it ends the value. The browser reads only <b>${esc(read) || '(nothing)'}</b>; the rest <b>${esc(rest)}</b> is left over as broken text in the tag. Use ${other} quotes around the value instead.`,
      ar: `غلط ✗ لأن القيمة بادئة بـ ${qn} quote، فأول ${qn} quote جواها بيقفل القيمة. الـ browser بيقرأ ${read ? T(read) : 'ولا حاجة'} بس، والباقي ${T(rest)} بيفضل كلام بايظ جوه الـ tag. الحل إنك تستخدم ${other} quotes حوالين القيمة.`
    };
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Example" items=${[['ex', 'Example from the notes'], ['rev', 'The reverse'], ['bad', 'Double inside double'], ['own', 'Try your own']]} sel=${k} on=${setK} />
      ${k === 'own' && html`<div className="wbv3-own"><${Chips} mono=${true} label="Quotes around the value" items=${[["'", "title='…'"], ['"', 'title="…"']]} sel=${oq} on=${setOq} />
        <small>The title value (type quotes inside it)</small><input className="wbv3-in" value=${ov} maxLength="40" spellCheck="false" autoCapitalize="off" aria-label="title value" onInput=${e => setOv(e.target.value)} /></div>`}
      <div className="wbv3-two"><${Code} lines=${lines} />
        <div><${Arrow} /><${Win}><div className="wbv3-p">This is a paragraph.</div>
          <div className="wbv3-tip"><small>tooltip (title), on hover</small>${read || ' '}</div><//></div></div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [0.1], [0.2] slides 4, 5: <hr> separates content, <br> starts a new line ── */
  const HR = ['<h1>This is heading 1</h1>', '<p>This is some text.</p>', '<hr>', '<h2>This is heading 2</h2>', '<p>This is some other text.</p>', '<hr>', '<h2>This is heading 2</h2>', '<p>This is some other text.</p>'];
  function Breaks({ ar }) {
    const [k, setK] = useState('hr');
    const hrOn = k === 'hr';
    let lines, page, m;
    if (k === 'hr' || k === 'nohr') {
      lines = hrOn ? HR : HR.filter(l => l !== '<hr>');
      page = HR.map((l, j) => l === '<hr>' ? html`<div key=${j} className=${pop(hrOn)}><hr className="wbv3-hr" /></div>`
        : html`<div key=${j} className=${l[1] === 'h' ? 'wbv3-' + l.slice(1, 3) : 'wbv3-p'}>${l.replace(/<[^>]+>/g, '')}</div>`);
      m = hrOn ? { en: '<b>&lt;hr&gt;</b> defines a thematic break: the browser draws a horizontal rule that separates the content (or marks a change of topic). It is an empty element: no content, no end tag.', ar: 'الـ <bdi dir="ltr">&lt;hr&gt;</bdi> بيعرّف thematic break، والـ browser بيرسم horizontal rule (خط أفقي) يفصل المحتوى (أو يوضّح إن الموضوع اتغير). وهو empty element، مالوش content ولا end tag.' }
        : { en: 'The same page without the two &lt;hr&gt; tags: the sections run into each other with nothing to separate them.', ar: 'نفس الصفحة من غير الـ <bdi dir="ltr">&lt;hr&gt;</bdi> الاتنين، والأجزاء ورا بعض من غير أي فاصل.' };
    } else {
      lines = k === 'br' ? ['<p>This is<br>a paragraph<br>with line breaks.</p>'] : k === 'nobr' ? ['<p>This is', 'a paragraph', 'with line breaks.</p>'] : ['<p>This is</p>', '<p>a paragraph</p>', '<p>with line breaks.</p>'];
      page = k === 'br' ? html`<div className="wbv3-p">This is<br />a paragraph<br />with line breaks.</div>`
        : k === 'nobr' ? html`<div className="wbv3-p">This is a paragraph with line breaks.</div>`
        : html`<div><div className="wbv3-p">This is</div><div className="wbv3-p">a paragraph</div><div className="wbv3-p">with line breaks.</div></div>`;
      m = { br: { en: '<b>&lt;br&gt;</b> is a line break: a new line without starting a new paragraph. It is an empty tag with no end tag.', ar: 'الـ <bdi dir="ltr">&lt;br&gt;</bdi> بيعمل line break، يعني سطر جديد من غير ما تبدأ paragraph جديدة. ده empty tag ملوش end tag.' },
        nobr: { en: 'Pressing Enter in the source is not enough: the browser turns those line breaks into spaces, and the text shows on one line.', ar: 'إنك تدوس Enter في الـ source مش كفاية، لأن الـ browser بيحوّل الـ line breaks دي لمسافات، والكلام بيظهر في سطر واحد.' },
        p3: { en: 'Three &lt;p&gt; elements also give three lines, but each one is a new paragraph with space around it. &lt;br&gt; keeps the lines inside one paragraph.', ar: 'تلات <bdi dir="ltr">&lt;p&gt;</bdi> بيدوا تلات سطور برضه، بس كل واحد paragraph جديدة وحواليها مسافة. أما الـ <bdi dir="ltr">&lt;br&gt;</bdi> فبيخلي السطور جوه paragraph واحدة.' } }[k];
    }
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="Example" items=${[['hr', '<hr>'], ['nohr', 'no <hr>'], ['br', '<br>'], ['nobr', 'no <br>'], ['p3', '<p> per line']]} sel=${k} on=${setK} />
      <div className="wbv3-two"><${Code} lines=${lines} on=${lines.map((l, j) => /<hr>|<br>/.test(l) ? j : -1).filter(j => j >= 0)} />
        <div><${Arrow} /><${Win}>${page}<//></div></div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [1.0], [1.1] slides 6, 7: the poem problem and <pre> ── */
  const POEM = '\n  My Bonnie lies over the ocean.\n\n  My Bonnie lies over the sea.\n\n  My Bonnie lies over the ocean.\n\n  Oh, bring back my Bonnie to me.\n';
  function PoemSteps({ text, tag, ar }) {
    const steps = tag === 'p' ? [
      { en: 'Inside <b>&lt;p&gt;</b> the poem is typed on several lines, with blank lines and indentation (marked: <b>·</b> a space, <b>↵</b> a line break).', ar: 'جوه الـ <bdi dir="ltr">&lt;p&gt;</bdi> القصيدة مكتوبة على كذا سطر، وفيها سطور فاضية ومسافات في الأول (العلامة <bdi dir="ltr">·</bdi> مسافة، والعلامة <bdi dir="ltr">↵</bdi> line break).' },
      { en: 'The browser collapses each run of extra spaces and line breaks into <b>one space</b> (the marked gaps).', ar: 'الـ browser بيلمّ كل مجموعة مسافات و line breaks زيادة ويخليها <b>مسافة واحدة</b> (الفراغات المعلّمة).' },
      { en: 'Result: the poem is displayed as one line of text, wrapping only at the window edge. This is <b>the poem problem</b>.', ar: 'النتيجة إن القصيدة بتظهر كسطر واحد، وبتلف بس عند آخر الـ window. ودي <b>the poem problem</b>.' }
    ] : [
      { en: '<b>&lt;pre&gt;</b> defines preformatted text: a fixed-width font (usually Courier), and both the spaces and the line breaks are kept exactly as typed.', ar: 'الـ <bdi dir="ltr">&lt;pre&gt;</bdi> بيعرّف preformatted text، بيتعرض بـ fixed-width font (غالبًا Courier)، وبيحافظ على المسافات والـ line breaks الاتنين زي ما كتبتهم بالظبط.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const parts = text.split(/(\s+)/);
    const mark = tag === 'p' && i === 0;
    const src = tg('<' + tag + '>') + parts.map(p => /^\s+$/.test(p) && mark ? `<span class="wbv3-ws">${esc(p).replace(/ /g, '·').replace(/\n/g, '↵\n')}</span>` : esc(p)).join('') + tg('</' + tag + '>');
    const flowed = parts.map((p, j) => /^\s+$/.test(p) ? (j === 0 || j === parts.length - 1 ? null : (i === 1 ? html`<span key=${j} className="wbv3-ws1"> </span>` : ' ')) : p);
    return html`<div className="fig-stage"><div className="wbv3-two">
      <pre className="wbv3-code" aria-label="HTML source" dangerouslySetInnerHTML=${{ __html: src }}></pre>
      <div><${Arrow} /><${Win}>${tag === 'p' ? html`<div className=${'wbv3-p ' + pop(i >= 1)}>${flowed}</div>` : html`<div className="wbv3-pre">${text.replace(/^\n/, '')}</div>`}<//></div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} />${steps.length > 1 && html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}`;
  }
  function Poem({ ar }) {
    const [k, setK] = useState('ex'), [tag, setTag] = useState('p'), [own, setOwn] = useState('Roses   are red,\n    violets are blue.');
    const text = k === 'own' ? own : POEM;
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: 0 }}>
      <${Chips} label="Example" items=${[['ex', 'Example from the notes'], ['own', 'Try your own']]} sel=${k} on=${setK} />
      <${Chips} mono=${true} label="Element" items=${[['p', '<p>'], ['pre', '<pre>']]} sel=${tag} on=${setTag} />
      ${k === 'own' && html`<div className="wbv3-own"><small>Type with extra spaces and line breaks</small><textarea className="wbv3-in" rows="4" maxLength="200" spellCheck="false" aria-label="Your text" value=${own} onInput=${e => setOwn(e.target.value)}></textarea></div>`}
    </div><${PoemSteps} key=${tag + k + (k === 'own' ? own : '')} text=${text} tag=${tag} ar=${ar} /><//>`;
  }

  /* ── [2.0] to [2.6] slides 8, 10 to 15, 27: the style attribute and its CSS properties ── */
  const PROPS = [
    ['background-color', ['powderblue', 'tomato', 'DodgerBlue', 'yellow']],
    ['color', ['blue', 'red', 'Tomato', 'MediumSeaGreen']],
    ['font-family', ['verdana', 'courier']],
    ['font-size', ['300%', '160%', '50px']],
    ['text-align', ['center']],
    ['border', ['2px solid Tomato', '2px solid DodgerBlue', '2px solid Violet']]
  ];
  const FONT = { verdana: 'verdana, sans-serif', courier: 'courier, "Courier New", monospace' };
  const toStyle = d => { const o = {}; Object.keys(d).forEach(p => { const v = d[p]; if (!v) return; const key = p.replace(/-(\w)/g, (_, c) => c.toUpperCase()); o[key] = p === 'font-family' ? (FONT[v] || v) : v; }); return o; };
  const decls = d => Object.keys(d).filter(p => d[p]).map(p => p + ':' + d[p] + ';');
  // <tag style="..."> as coloured lines that fit a phone (34 characters)
  function openTag(tag, d, text) {
    const ds = decls(d), close = text != null ? tg('</' + tag + '>') : '';
    if (!ds.length) return [{ h: tg('<' + tag + '>') + (text != null ? esc(text) + close : '') }];
    const one = '<' + tag + ' style="' + ds.join('') + '">';
    if (one.length <= 34) {
      const h = tg('<' + tag) + ' ' + an('style') + '=' + av('"' + ds.join('') + '"') + tg('>');
      if (text == null) return [{ h }];
      return (one + text + '</' + tag + '>').length <= 34 ? [{ h: h + esc(text) + close }] : [{ h }, { h: esc(text) + close }];
    }
    const out = [{ h: tg('<' + tag) + ' ' + an('style') + '=' + av('"') }];
    ds.forEach((x, j) => { const [p, ...v] = x.split(':'); out.push({ h: '  ' + an(p) + ':' + av(v.join(':')) + (j === ds.length - 1 ? av('"') + tg('>') : '') }); });
    if (text != null) out.push({ h: esc(text) + close });
    return out;
  }
  const SP = {
    body: { st: { body: { 'background-color': 'powderblue' }, h1: {}, p: {} }, en: 'Slide 10: <b>background-color</b> on &lt;body&gt; sets the background color for the whole page to powderblue.', ar: 'في slide 10 الـ <b>background-color</b> على الـ <bdi dir="ltr">&lt;body&gt;</bdi> بيخلي خلفية الصفحة كلها powderblue.' },
    bg: { st: { body: {}, h1: { 'background-color': 'powderblue' }, p: { 'background-color': 'tomato' } }, en: 'Slide 11: <b>background-color</b> on each element: the heading gets powderblue, the paragraph tomato. Each colour fills only its own element.', ar: 'في slide 11 الـ <b>background-color</b> اتحط على كل element لوحده، فالـ heading بقى powderblue والـ paragraph بقت tomato. وكل لون بيملا الـ element بتاعه بس.' },
    color: { st: { body: {}, h1: { color: 'blue' }, p: { color: 'red' } }, en: 'Slide 12: <b>color</b> defines the text color: a blue heading and a red paragraph.', ar: 'في slide 12 الـ <b>color</b> بيحدد لون الكلام، فالـ heading أزرق والـ paragraph أحمر.' },
    font: { st: { body: {}, h1: { 'font-family': 'verdana' }, p: { 'font-family': 'courier' } }, en: 'Slide 13: <b>font-family</b> defines the font: verdana for the heading, courier for the paragraph.', ar: 'في slide 13 الـ <b>font-family</b> بيحدد نوع الخط، فالـ heading بالـ verdana والـ paragraph بالـ courier.' },
    size: { st: { body: {}, h1: { 'font-size': '300%' }, p: { 'font-size': '160%' } }, en: 'Slide 14: <b>font-size</b> defines the text size: 300% for the heading, 160% for the paragraph.', ar: 'في slide 14 الـ <b>font-size</b> بيحدد حجم الكلام، فالـ heading حجمه <bdi dir="ltr">300%</bdi> والـ paragraph حجمها <bdi dir="ltr">160%</bdi>.' },
    align: { st: { body: {}, h1: { 'text-align': 'center' }, p: { 'text-align': 'center' } }, t: ['Centered Heading', 'Centered paragraph.'], en: 'Slide 15: <b>text-align</b> defines the horizontal alignment: both are centered.', ar: 'في slide 15 الـ <b>text-align</b> بيحدد المحاذاة الأفقية، والاتنين في النص (center).' },
    border: { st: { body: {}, h1: { border: '2px solid Tomato' }, p: {} }, en: '<b>border:2px solid Tomato</b> sets three things at once: the border width (2px), its style (solid) and its color (Tomato).', ar: 'الـ <bdi dir="ltr">border:2px solid Tomato</bdi> بيحدد 3 حاجات مرة واحدة، عرض الـ border (<bdi dir="ltr">2px</bdi>) ونوعه (solid) ولونه (Tomato).' }
  };
  function StyleProps({ ar }) {
    const [k, setK] = useState('body'), [own, setOwn] = useState(null), [el, setEl] = useState('h1');
    const pickK = x => { if (x === 'own') setOwn(JSON.parse(JSON.stringify(SP[k] ? SP[k].st : own))); setK(x); };
    const st = k === 'own' ? own : SP[k].st, tx = (k === 'own' || !SP[k].t) ? ['This is a heading', 'This is a paragraph.'] : SP[k].t;
    const set = (p, v) => setOwn(o => { const n = JSON.parse(JSON.stringify(o)); n[el][p] = v; return n; });
    const lines = openTag('body', st.body).concat(openTag('h1', st.h1, tx[0]), openTag('p', st.p, tx[1]), [{ h: tg('</body>') }]);
    let m;
    if (k !== 'own') m = SP[k];
    else {
      const ds = decls(st[el]), cnt = ds.length > 1 ? `<bdi dir="ltr">${ds.length}</bdi> pairs` : 'pair واحد';
      m = ds.length ? { en: `The style attribute of &lt;${el}&gt; now holds ${ds.length} property:value pair${ds.length > 1 ? 's' : ''}, each ending with a semicolon. Only &lt;${el}&gt; changes.`, ar: `الـ style attribute بتاع الـ ${T('<' + el + '>')} فيه دلوقتي ${cnt} من نوع property و value، وكل واحد بيخلص بـ semicolon. والـ ${T('<' + el + '>')} بس هو اللي بيتغير.` }
        : { en: 'Pick an element, then a value for any property. The syntax is <span class="ltr">&lt;tagname style="property:value;"&gt;</span> The property is a CSS property and the value a CSS value.', ar: 'اختار element، وبعدين اختار value لأي property. الـ syntax هو:<span class="ltr">&lt;tagname style="property:value;"&gt;</span>الـ property دي CSS property والـ value دي CSS value.' };
    }
    const cur = st[el] || {};
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Example" items=${[['body', 'page background'], ['bg', 'background-color'], ['color', 'color'], ['font', 'font-family'], ['size', 'font-size'], ['align', 'text-align'], ['border', 'border'], ['own', 'Try your own']]} sel=${k} on=${pickK} />
      ${k === 'own' && html`<div className="wbv3-in2"><div className="wbv3-sub">Style which element?</div><${Chips} mono=${true} label="Element" items=${[['body', '<body>'], ['h1', '<h1>'], ['p', '<p>']]} sel=${el} on=${setEl} />
        <div className="wbv3-rows">${PROPS.map(([p, vs]) => html`<div key=${p} className="wbv3-row"><b>${p}</b>
          <${Chips} mono=${true} label=${p} items=${[['', 'none']].concat(vs.map(v => [v, v]))} sel=${vs.find(v => cur[p] && v.toLowerCase() === cur[p].toLowerCase()) || (cur[p] || '')} on=${v => set(p, v)} /></div>`)}</div></div>`}
      <div className="wbv3-two"><${Code} lines=${lines} />
        <div><${Arrow} /><${Win} white=${true} style=${toStyle(st.body)}>
          <div className="wbv3-h1" style=${toStyle(st.h1)}>${tx[0]}</div><div className="wbv3-p" style=${toStyle(st.p)}>${tx[1]}</div><//></div></div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [3] slides 16 to 22: the text formatting elements, one by one ── */
  const FMT = [
    { t: 'b', src: '<b>Bold text</b>', en: '<b>&lt;b&gt;</b> bold text: visual only, it just looks bold.', ar: 'الـ <bdi dir="ltr">&lt;b&gt;</bdi> بيخلي الكلام bold، وده شكل بس (visual only).', twin: ['<b>Bold text</b>', '<strong>Bold text</strong>'] },
    { t: 'strong', src: '<strong>Important text</strong>', en: '<b>&lt;strong&gt;</b> important text: it looks bold like &lt;b&gt;, but it also says the text is important (semantic).', ar: 'الـ <bdi dir="ltr">&lt;strong&gt;</bdi> معناه important text، شكله bold زي الـ <bdi dir="ltr">&lt;b&gt;</bdi> بس كمان بيقول إن الكلام ده مهم (semantic).', twin: ['<b>Bold text</b>', '<strong>Bold text</strong>'] },
    { t: 'i', src: '<i>Italic text</i>', en: '<b>&lt;i&gt;</b> italic text: visual only.', ar: 'الـ <bdi dir="ltr">&lt;i&gt;</bdi> بيخلي الكلام italic، وده شكل بس (visual only).', twin: ['<i>Italic text</i>', '<em>Italic text</em>'] },
    { t: 'em', src: '<em>Emphasized text</em>', en: '<b>&lt;em&gt;</b> emphasized text: it looks italic like &lt;i&gt;, with semantic emphasis.', ar: 'الـ <bdi dir="ltr">&lt;em&gt;</bdi> معناه emphasized text، شكله italic زي الـ <bdi dir="ltr">&lt;i&gt;</bdi> بس فيه تأكيد في المعنى (semantic emphasis).', twin: ['<i>Italic text</i>', '<em>Italic text</em>'] },
    { t: 'mark', src: 'Do not forget to buy <mark>milk</mark> today.', en: '<b>&lt;mark&gt;</b> marked or highlighted text.', ar: 'الـ <bdi dir="ltr">&lt;mark&gt;</bdi> بيعمل marked أو highlighted text، يعني كلام متعلّم عليه.' },
    { t: 'small', src: 'Text and <small>Smaller text</small>', en: '<b>&lt;small&gt;</b> smaller text.', ar: 'الـ <bdi dir="ltr">&lt;small&gt;</bdi> بيخلي الكلام أصغر (smaller text).' },
    { t: 'del', src: 'My favorite color is <del>blue</del> red.', en: '<b>&lt;del&gt;</b> deleted text: browsers strike a line through it.', ar: 'الـ <bdi dir="ltr">&lt;del&gt;</bdi> معناه deleted text، والـ browsers بترسم خط في نصه.' },
    { t: 'ins', src: 'My favorite color is <del>blue</del> <ins>red</ins>.', en: '<b>&lt;ins&gt;</b> inserted text: browsers usually underline it.', ar: 'الـ <bdi dir="ltr">&lt;ins&gt;</bdi> معناه inserted text، والـ browsers غالبًا بتحط تحته خط.' },
    { t: 'sub', src: 'Water is H<sub>2</sub>O', en: '<b>&lt;sub&gt;</b> subscript: half a character below the normal line, in a smaller font, e.g. H<sub>2</sub>O.', ar: 'الـ <bdi dir="ltr">&lt;sub&gt;</bdi> هو subscript، بيبقى تحت السطر بنص حرف وبخط أصغر، زي الـ <bdi dir="ltr">H<sub>2</sub>O</bdi>.' },
    { t: 'sup', src: 'WWW<sup>[1]</sup> and x<sup>2</sup>', en: '<b>&lt;sup&gt;</b> superscript: half a character above the normal line, for footnotes like WWW<sup>[1]</sup> and powers like x<sup>2</sup>.', ar: 'الـ <bdi dir="ltr">&lt;sup&gt;</bdi> هو superscript، بيبقى فوق السطر بنص حرف، للـ footnotes زي <bdi dir="ltr">WWW<sup>[1]</sup></bdi> وللأسس زي <bdi dir="ltr">x<sup>2</sup></bdi>.' },
    { t: 'u', src: '<u>Underline</u>', en: '<b>&lt;u&gt;</b> underline (listed with B, I, P and BR).', ar: 'الـ <bdi dir="ltr">&lt;u&gt;</bdi> بيحط خط تحت الكلام (underline)، ومذكور مع الـ B والـ I والـ P والـ BR.' }
  ];
  function Format({ ar }) {
    const steps = FMT, [i, ctl] = useSteps(steps.length, 2600), f = FMT[i];
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="Tag" items=${FMT.map((x, j) => [j, '<' + x.t + '>'])} sel=${i} on=${ctl.go} />
      <div className="wbv3-two"><${Code} lines=${['<p>' + f.src + '</p>']} />
        <div><${Arrow} /><${Win}><div key=${i} className="wbv3-p wbv3-in2" style=${{ fontSize: '1.15rem' }} dangerouslySetInnerHTML=${{ __html: f.src }}></div>
          ${f.twin && html`<div className="wbv3-twin">${f.twin.map(s => html`<div key=${s}><span dangerouslySetInnerHTML=${{ __html: s }}></span><small>${'<' + s.match(/<(\w+)/)[1] + '>'}</small></div>`)}</div>
            <div className="wbv3-mean">Same look; ${f.twin[1].slice(1, 3) === 'st' ? 'strong' : 'em'} adds meaning.</div>`}<//></div></div>
    </div><${Cap} en=${f.en} ar=${f.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [4.0], [4.1] slide 23: comments are not displayed; comment syntax per language ── */
  const CM = [['HTML', ['<!-- -->']], ['CSS', ['/* */']], ['JavaScript', ['//', '/* */']], ['PHP', ['#', '//', '/* */']]];
  function Comments({ ar }) {
    const steps = [
      { en: 'An HTML comment: <b>&lt;!-- Write your comments here --&gt;</b>. It documents the source code.', ar: 'ده HTML comment، وبيوثّق الـ source code:<span class="ltr">&lt;!-- Write your comments here --&gt;</span>' },
      { en: 'The browser does not display comments: only the paragraph appears on the page.', ar: 'الـ browser مابيعرضش الـ comments، واللي بيظهر في الصفحة هو الـ paragraph بس.' },
      { en: 'Comment syntax to remember: HTML uses &lt;!-- --&gt;.', ar: 'احفظ شكل الـ comment، والـ HTML بيستخدم <bdi dir="ltr">&lt;!--&nbsp;--&gt;</bdi>.' },
      { en: 'CSS uses /* */.', ar: 'الـ CSS بيستخدم <bdi dir="ltr">/*&nbsp;*/</bdi>.' },
      { en: 'JavaScript uses // and /* */.', ar: 'الـ JavaScript بيستخدم <bdi dir="ltr">//</bdi> و <bdi dir="ltr">/*&nbsp;*/</bdi>.' },
      { en: 'PHP uses #, // and /* */.', ar: 'الـ PHP بيستخدم <bdi dir="ltr">#</bdi> و <bdi dir="ltr">//</bdi> و <bdi dir="ltr">/*&nbsp;*/</bdi>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    return html`<${Fig}><div className="fig-stage"><div className="wbv3-two">
      <${Code} lines=${['<!-- Write your comments here -->', '<p>This is a paragraph.</p>']} on=${i === 0 ? [0] : i === 1 ? [1] : []} dim=${true} />
      <div><${Arrow} /><${Win}><div className=${'wbv3-p ' + pop(i >= 1)}>This is a paragraph.</div><//></div></div>
      <table className="wbv3-tbl"><thead><tr><th>Language</th><th>Comment syntax</th></tr></thead><tbody>
        ${CM.map(([l, s], j) => html`<tr key=${l} className=${i >= j + 2 ? (i === j + 2 ? 'on' : '') : 'off'}><td>${l}</td><td>${s.map(x => html`<code key=${x}>${x}</code>`)}</td></tr>`)}</tbody></table>
    </div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── colour helpers ── */
  const hex2 = n => n.toString(16).padStart(2, '0');
  const HEXD = '0123456789abcdef';
  function toHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, l = (mx + mn) / 2; let h = 0, s = 0;
    if (d) { s = d / (1 - Math.abs(2 * l - 1)); h = mx === r ? 60 * (((g - b) / d) % 6) : mx === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4); if (h < 0) h += 360; }
    return [Math.round(h) % 360, Math.round(s * 100), Math.round(l * 100)];
  }
  const fa = a => String(+a.toFixed(2));
  const ways = (r, g, b, a) => { const [h, s, l] = toHsl(r, g, b); return { rgb: `rgb(${r}, ${g}, ${b})`, hex: '#' + hex2(r) + hex2(g) + hex2(b), hsl: `hsl(${h}, ${s}%, ${l}%)`, rgba: `rgba(${r}, ${g}, ${b}, ${fa(a)})`, hsla: `hsla(${h}, ${s}%, ${l}%, ${fa(a)})` }; };
  const hexCalc = (r, g, b) => [r, g, b].map(v => { const h = hex2(v); return `${h} → ${HEXD.indexOf(h[0])}×16 + ${HEXD.indexOf(h[1])} = ${v}`; });
  const Sw = ({ c }) => html`<div className="sw wbv3-chk"><span style=${{ background: c }}></span></div>`;
  // black or white text on a fixed colour
  const inkOn = (r, g, b) => (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? '#000' : '#fff';

  /* ── [5.0], [5.1] slides 24 to 27: colour names applied to background, text and border ── */
  const NAMES = [['Tomato', 255, 99, 71], ['Orange', 255, 165, 0], ['DodgerBlue', 30, 144, 255], ['MediumSeaGreen', 60, 179, 113], ['Gray', 128, 128, 128], ['SlateBlue', 106, 90, 205], ['Violet', 238, 130, 238], ['LightGray', 211, 211, 211]];
  function ColorNames({ ar }) {
    const [n, setN] = useState('Tomato'), [p, setP] = useState('background-color');
    const d = { [p]: p === 'border' ? '2px solid ' + n : n };
    const m = {
      'background-color': { en: `<b>background-color:${n};</b> colours the background of the element (slide 25).`, ar: `الـ background-color بيلوّن خلفية الـ element (slide 25)، والقيمة هنا ${T(n)}.` },
      color: { en: `<b>color:${n};</b> colours the text (slide 26).`, ar: `الـ color بيلوّن الكلام نفسه (slide 26)، والقيمة هنا ${T(n)}.` },
      border: { en: `<b>border:2px solid ${n};</b> colours the border (slide 27).`, ar: `الـ border بيلوّن الإطار (slide 27)، والقيمة هنا ${T('2px solid ' + n)}.` }
    }[p];
    const pre = { en: 'HTML supports <b>140 standard color names</b>; here are eight of them. Tap a name. ', ar: 'الـ HTML بيدعم <b>140 اسم لون standard</b>، ودول 8 منهم، دوس على اسم. ' };
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv3-names" role="group" aria-label="Color name">${NAMES.map(([nm, r, g, b]) => html`<button key=${nm} className="wbv3-name" aria-pressed=${String(n === nm)} onClick=${() => setN(nm)}
        style=${{ background: nm, color: inkOn(r, g, b) }}>${nm}</button>`)}</div>
      <${Chips} mono=${true} label="Apply to" items=${[['background-color', 'background-color'], ['color', 'color'], ['border', 'border']]} sel=${p} on=${setP} />
      <div className="wbv3-two"><${Code} lines=${openTag('h1', d, 'Hello World')} />
        <div><${Arrow} /><${Win} white=${true}><div className="wbv3-h1" style=${toStyle(d)}>Hello World</div><//></div></div>
    </div><${Cap} en=${pre.en + m.en} ar=${pre.ar + m.ar} showAr=${ar} /><//>`;
  }

  /* ── [5.2] slides 28 to 30: "Tomato" written 5 ways, and a converter ── */
  function WaysList({ r, g, b, a, on, name }) {
    const w = ways(r, g, b, a), A = `rgba(${r},${g},${b},${a})`, S = `rgb(${r},${g},${b})`;
    const rows = [[name || 'name', 'color name', S, !!name], [w.rgb, 'RGB', S, true], [w.hex, 'HEX', S, true], [w.hsl, 'HSL', S, true], [w.rgba, 'RGBA: alpha ' + fa(a), A, true], [w.hsla, 'HSLA: alpha ' + fa(a), A, true]];
    return html`<div className="wbv3-ways">${rows.map(([c, l, col, show], j) => show && html`<div key=${j} className=${'wbv3-way ' + pop(on == null || on >= j) + (on === j ? ' on' : '')}>
      <${Sw} c=${col} /><div><code>${c}</code><small>${l}</small></div></div>`)}</div>`;
  }
  function Bars({ r, g, b }) {
    return html`<div className="wbv3-bars">${[['R', r, '#e53935'], ['G', g, '#43a047'], ['B', b, '#1e88e5']].map(([k, v, c]) => html`<b key=${k}>${k}</b><div key=${k + 't'} className="tr"><span style=${{ width: (v / 255 * 100) + '%', background: c }}></span></div><span key=${k + 'v'}>${v}</span>`)}</div>`;
  }
  function ColorWays({ ar }) {
    const [k, setK] = useState('ex');
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: 0 }}><${Chips} label="Example" items=${[['ex', 'Example from the notes'], ['own', 'Try your own']]} sel=${k} on=${setK} /></div>
      ${k === 'ex' ? html`<${TomatoSteps} ar=${ar} />` : html`<${OwnColor} ar=${ar} />`}<//>`;
  }
  function TomatoSteps({ ar }) {
    const steps = [
      { en: 'The colour name <b>Tomato</b>.', ar: 'ده اسم اللون <b>Tomato</b>.' },
      { en: '<b>rgb(255, 99, 71)</b>: red 255, green 99, blue 71, each from 0 to 255.', ar: 'الـ RGB بيدّي كمية الأحمر والأخضر والأزرق، كل واحد من <bdi dir="ltr">0</bdi> لـ <bdi dir="ltr">255</bdi>، والقيمة هي:<span class="ltr">rgb(255, 99, 71)</span>' },
      { en: '<b>#ff6347</b>: the same three numbers in HEX, two hex digits each.', ar: 'الـ HEX هو نفس التلات أرقام، كل واحد برقمين hex:<span class="ltr">#ff6347</span>' },
      { en: '<b>hsl(9, 100%, 64%)</b>: the same Tomato as an HSL value.', ar: 'وده نفس الـ Tomato كـ HSL value:<span class="ltr">hsl(9, 100%, 64%)</span>' },
      { en: '<b>rgba(255, 99, 71, 0.5)</b>: Tomato 50% transparent. The last value, alpha, is the opacity from 0 to 1.', ar: 'ده الـ Tomato شفاف <bdi dir="ltr">50%</bdi>، وآخر قيمة (الـ alpha) هي الـ opacity من <bdi dir="ltr">0</bdi> لـ <bdi dir="ltr">1</bdi>، والقيمة هي:<span class="ltr">rgba(255, 99, 71, 0.5)</span>' },
      { en: '<b>hsla(9, 100%, 64%, 0.5)</b>: the same 50% transparent Tomato in HSLA. Five ways, one colour.', ar: 'وده نفس الـ Tomato الشفاف <bdi dir="ltr">50%</bdi> بالـ HSLA، يعني 5 طرق للون واحد:<span class="ltr">hsla(9, 100%, 64%, 0.5)</span>' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const calc = i === 1 ? html`<${Bars} r=${255} g=${99} b=${71} />` : i === 2 ? hexCalc(255, 99, 71).map(s => html`<div key=${s}>${s}</div>`)
      : i >= 4 ? html`<div>alpha <b>0.5</b> = 50% transparent</div><div>0 = fully transparent, 1 = opaque</div>` : i === 0 ? html`<div>color name: <b>Tomato</b></div>` : html`<div>Tomato = <b>hsl(9, 100%, 64%)</b></div>`;
    return html`<div className="fig-stage"><${WaysList} r=${255} g=${99} b=${71} a=${0.5} on=${i} name="Tomato" />
      <div className="wbv3-calc">${calc}</div></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function OwnColor({ ar }) {
    const [c, setC] = useState([255, 99, 71, 0.5]);
    const [r, g, b, a] = c, w = ways(r, g, b, a), nm = (NAMES.find(x => x[1] === r && x[2] === g && x[3] === b) || [])[0];
    const sl = (j, max, step) => html`<input type="range" min="0" max=${max} step=${step} value=${c[j]} aria-label=${['red', 'green', 'blue', 'alpha'][j]} onInput=${e => { const v = +e.target.value; setC(o => o.map((x, q) => q === j ? v : x)); }} />`;
    return html`<div className="fig-stage">
      <div className="wbv3-ctl"><span>R</span>${sl(0, 255, 1)}<b>${r}</b><span>G</span>${sl(1, 255, 1)}<b>${g}</b><span>B</span>${sl(2, 255, 1)}<b>${b}</b><span>alpha</span>${sl(3, 1, 0.05)}<b>${fa(a)}</b></div>
      <div className="wbv3-calc">${hexCalc(r, g, b).map(s => html`<div key=${s}>${s}</div>`)}</div>
      <div style=${{ height: 8 }}></div><${WaysList} r=${r} g=${g} b=${b} a=${a} name=${nm} />
    </div><${Cap} en=${`Your colour is <b>${w.rgb}</b> = <b>${w.hex}</b> = <b>${w.hsl}</b>. With alpha ${fa(a)} it is ${Math.round((1 - a) * 100)}% transparent.`}
      ar=${`اللون بتاعك مكتوب بـ 3 طرق:<span class="ltr">${w.rgb} = ${w.hex} = ${w.hsl}</span>ومع alpha قيمتها <bdi dir="ltr">${fa(a)}</bdi> بيبقى شفاف <bdi dir="ltr">${Math.round((1 - a) * 100)}%</bdi>.`} showAr=${ar} />`;
  }

  /* ── [5.3] slide 31: shades of gray, equal R, G and B ── */
  const GRAYS = [60, 100, 140, 180, 200, 240];
  function Grays({ ar }) {
    const steps = GRAYS.map(v => ({ en: `<b>rgb(${v}, ${v}, ${v})</b>: red, green and blue all ${v}.`, ar: `الأحمر والأخضر والأزرق كلهم <bdi dir="ltr">${v}</bdi>، يعني:<span class="ltr">rgb(${v}, ${v}, ${v})</span>` }))
      .concat([{ en: 'Shades of gray use equal values for all three RGB parameters: the bigger the value, the lighter the gray.', ar: 'الـ Shades of gray بتستخدم نفس القيمة للتلات parameters بتوع الـ RGB، وكل ما القيمة تكبر الرمادي بيفتح.' }]);
    const [i, ctl] = useSteps(steps.length, 1500), [lv, setLv] = useState(200);
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv3-grays">${GRAYS.map((v, j) => html`<div key=${v} className=${'wbv3-gray ' + pop(i >= j)} style=${{ background: `rgb(${v},${v},${v})`, color: v > 150 ? '#000' : '#fff' }}>rgb(${v}, ${v}, ${v})</div>`)}</div>
      <div className="wbv3-ctl"><span>Try your own level</span><input type="range" min="0" max="255" value=${lv} aria-label="Gray level" onInput=${e => setLv(+e.target.value)} /><b>${lv}</b></div>
      <div className="wbv3-gray" style=${{ background: `rgb(${lv},${lv},${lv})`, color: lv > 150 ? '#000' : '#fff', maxWidth: 420, margin: '6px auto 0' }}>Gray with level ${lv} = rgb(${lv}, ${lv}, ${lv})</div>
    </div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [6] slides 9, 30: the inline-styles example run line by line ── */
  const EX = ['<p>I am normal</p>', '<p style="color:red;">I am red</p>', '<p style="color:blue;">I am blue</p>', '<p style="font-size:50px;">I am big</p>',
    '<h1 style="background-color:rgb(255, 99, 71);">rgb(255, 99, 71)</h1>', '<h1 style="background-color:#ff6347;">#ff6347</h1>', '<h1 style="background-color:hsla(9, 100%, 64%, 0.5);">50% transparent</h1>',
    '<p>Water is H<sub>2</sub>O and E = mc<sup>2</sup></p>', '<p>My favorite color is <del>blue</del> <ins>red</ins>.</p>'];
  function InlineEx({ ar }) {
    const steps = [
      { en: 'No style attribute: the paragraph uses the default look.', ar: 'مفيش style attribute، فالـ paragraph بتظهر بالشكل الـ default.' },
      { en: '<b>color:red;</b> makes this paragraph’s text red.', ar: 'الـ <bdi dir="ltr">color:red;</bdi> بيخلي كلام الـ paragraph دي أحمر.' },
      { en: '<b>color:blue;</b> makes this one blue. Each style attribute changes only its own element.', ar: 'الـ <bdi dir="ltr">color:blue;</bdi> بيخلي دي زرقا، وكل style attribute بيغيّر الـ element بتاعه بس.' },
      { en: '<b>font-size:50px;</b> makes the text big.', ar: 'الـ <bdi dir="ltr">font-size:50px;</bdi> بيكبّر الكلام.' },
      { en: '<b>background-color:rgb(255, 99, 71);</b> is Tomato as an RGB value.', ar: 'الخلفية هنا Tomato مكتوب كـ RGB value:<span class="ltr">background-color:rgb(255, 99, 71);</span>' },
      { en: '<b>#ff6347</b> is the same Tomato in HEX: the two headings look the same.', ar: 'الـ <bdi dir="ltr">#ff6347</bdi> هو نفس الـ Tomato بالـ HEX، فالـ headings الاتنين شكلهم واحد.' },
      { en: '<b>hsla(9, 100%, 64%, 0.5)</b> is Tomato 50% transparent: the white page shows through, so it looks lighter.', ar: 'ده الـ Tomato شفاف <bdi dir="ltr">50%</bdi>، فالصفحة البيضا بتبان من وراه وبيبان أفتح:<span class="ltr">hsla(9, 100%, 64%, 0.5)</span>' },
      { en: '<b>&lt;sub&gt;</b> puts the 2 of H<sub>2</sub>O below the line; <b>&lt;sup&gt;</b> puts the power of mc<sup>2</sup> above it.', ar: 'الـ <bdi dir="ltr">&lt;sub&gt;</bdi> بينزّل الـ 2 بتاعة الـ <bdi dir="ltr">H<sub>2</sub>O</bdi> تحت السطر، والـ <bdi dir="ltr">&lt;sup&gt;</bdi> بيطلّع الأس بتاع الـ <bdi dir="ltr">mc<sup>2</sup></bdi> فوقه.' },
      { en: '<b>&lt;del&gt;</b> strikes through “blue” and <b>&lt;ins&gt;</b> underlines “red”.', ar: 'الـ <bdi dir="ltr">&lt;del&gt;</bdi> بيشطب كلمة blue، والـ <bdi dir="ltr">&lt;ins&gt;</bdi> بيحط خط تحت كلمة red.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    const out = [html`<div className="wbv3-p">I am normal</div>`, html`<div className="wbv3-p" style=${{ color: 'red' }}>I am red</div>`, html`<div className="wbv3-p" style=${{ color: 'blue' }}>I am blue</div>`,
      html`<div className="wbv3-p" style=${{ fontSize: '50px', lineHeight: 1.1 }}>I am big</div>`, html`<div className="wbv3-h1" style=${{ backgroundColor: 'rgb(255, 99, 71)' }}>rgb(255, 99, 71)</div>`,
      html`<div className="wbv3-h1" style=${{ backgroundColor: '#ff6347' }}>#ff6347</div>`, html`<div className="wbv3-h1" style=${{ backgroundColor: 'hsla(9, 100%, 64%, 0.5)' }}>50% transparent</div>`,
      html`<div className="wbv3-p">Water is H<sub>2</sub>O and E = mc<sup>2</sup></div>`, html`<div className="wbv3-p">My favorite color is <del>blue</del> <ins>red</ins>.</div>`];
    return html`<${Fig}><div className="fig-stage"><div className="wbv3-two">
      <${Code} lines=${EX} on=${[i]} dim=${true} />
      <div><${Arrow} /><${Win} white=${true}>${out.map((o, j) => html`<div key=${j} className=${pop(i >= j)} style=${{ borderRadius: 4, outline: i === j ? '2px dashed #888' : 'none', outlineOffset: 1 }}>${o}</div>`)}<//></div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'wb-quotes': Quotes, 'wb-breaks': Breaks, 'wb-poem': Poem, 'wb-styleprops': StyleProps, 'wb-format': Format,
    'wb-comments': Comments, 'wb-colornames': ColorNames, 'wb-colorways': ColorWays, 'wb-grays': Grays, 'wb-inline': InlineEx
  });
})();
/* ── part L1 ── */
// Web Programming visuals, Lecture 1 (Introduction to the Internet and the Web): the Internet and its services, advantages / disadvantages,
// web page vs web site, static vs dynamic sites, URL anatomy and a URL splitter (with the TLD table), search engines, the protocols,
// the client-server example and web architecture, the 5 steps of how the web works, site structure, hyperlinks, how browsers display pages,
// standard link colours, phishing symptoms and the security considerations (slides of Lec_1_Intro pages 1 to 13).
// Every label and number comes from the site's notes.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.wbv1 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.wbv1 .fig-btn:disabled{ opacity:.45; cursor:default; }
.wbv1-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.wbv1-chips .fig-btn{ font-size:.8rem; padding:4px 10px; min-height:30px; }
.wbv1-chips .fig-btn.m{ font-family:var(--mono); }
.wbv1-hint{ text-align:center; font-size:.75rem; color:var(--graphite); margin:0 0 6px; }
.wbv1-in{ font:.85rem var(--mono); width:100%; box-sizing:border-box; border:1px solid var(--line); border-radius:6px; padding:6px 8px; background:var(--paper); color:var(--ink); direction:ltr; }
.wbv1-ta{ font-size:.8rem; resize:none; overflow:hidden; overflow-wrap:anywhere; word-break:break-all; display:block; }
.wbv1-own{ max-width:440px; margin:0 auto 10px; } .wbv1-own small{ display:block; font-size:.75rem; color:var(--graphite); margin:0 0 3px; }
.wbv1-code{ font:.78rem/1.5 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:7px 8px; white-space:pre-wrap; overflow-wrap:anywhere; direction:ltr; text-align:left; color:var(--ink); margin:0; }
.wbv1-code .ln{ display:block; border-radius:4px; padding:0 3px; transition:background .4s, opacity .4s; }
.wbv1-code .ln.on{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.wbv1-code mark{ background:color-mix(in srgb, var(--pen) 22%, transparent); color:inherit; border-radius:3px; }
@keyframes wbv1in{ from{ opacity:0; transform:translateY(5px); } to{ opacity:1; transform:none; } }
@keyframes wbv1sh{ 25%{ transform:translateX(-5px); } 75%{ transform:translateX(5px); } }
@keyframes wbv1pulse{ 0%,100%{ opacity:.35; } 50%{ opacity:1; } }
.wbv1-new{ animation:wbv1in .45s ease both; }
/* Internet and its services */
.wbv1-net{ border:2px solid var(--fig-k); border-radius:14px; padding:6px 8px 10px; max-width:420px; margin:0 auto; background:var(--paper); }
.wbv1-net > p{ margin:0 0 4px; text-align:center; font-weight:700; color:var(--fig-k); font-size:.9rem; }
.wbv1-net > small{ display:block; text-align:center; font-size:.75rem; color:var(--graphite); margin:-2px 0 4px; }
.wbv1-svc{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; margin-top:6px; }
.wbv1-svc div{ border:1.5px solid var(--line); border-radius:8px; padding:6px 4px; text-align:center; font-size:.82rem; font-weight:600; background:var(--paper-2); color:var(--ink); transition:all .4s; }
.wbv1-svc div small{ display:block; font-weight:400; font-size:.75rem; color:var(--graphite); }
.wbv1-svc div.hi{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); }
.wbv1-svc div.lo{ opacity:.45; }
.wbv1-neq{ text-align:center; font:700 1rem var(--body); color:var(--ink); margin:10px 0 0; direction:ltr; }
.wbv1-neq span{ color:var(--pen); font-size:1.3rem; padding:0 6px; }
/* advantages / disadvantages */
.wbv1-pc{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:10px 14px; max-width:400px; margin:0 auto; align-items:stretch; }
.wbv1-pc .bx{ min-height:52px; display:grid; place-items:center; text-align:center; padding:6px; border-radius:6px; font-weight:600; font-size:.85rem; color:var(--ink); border:1.5px solid var(--fig-k); background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.wbv1-pc .bx.bad{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 16%, var(--paper)); }
.wbv1-pc .cl{ grid-column:1 / -1; justify-self:center; padding:10px 22px; border-radius:50%; border:2px solid var(--graphite); background:var(--paper); font-weight:700; font-size:.88rem; text-align:center; color:var(--ink); }
/* page vs site */
.wbv1-svgbox{ max-width:340px; margin:0 auto; }
.wbv1-svgbox svg{ width:100%; height:auto; display:block; }
.wbv1-svgbox text{ font-family:var(--body); }
/* static / dynamic */
.wbv1-sd{ display:grid; grid-template-columns:minmax(0,1fr); gap:8px; max-width:560px; margin:0 auto; }
@media (min-width:640px){ .wbv1-sd{ grid-template-columns:repeat(2, minmax(0,1fr)); } }
.wbv1-pane{ border:1.5px solid var(--line); border-radius:8px; background:var(--paper); overflow:hidden; }
.wbv1-pane > b{ display:block; font-size:.78rem; padding:4px 8px; background:var(--paper-2); border-bottom:1px solid var(--line); color:var(--graphite); }
.wbv1-pane > div{ padding:6px 8px; min-height:92px; }
.wbv1-piece{ font-size:.85rem; padding:3px 6px; border-radius:5px; margin:3px 0; border:1.3px dashed var(--line); color:var(--ink); }
.wbv1-piece.tpl{ font-family:var(--mono); font-size:.78rem; }
.wbv1-piece.var{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.wbv1-piece.same{ border-style:solid; }
.wbv1-ctl{ display:grid; grid-template-columns:minmax(0,1fr); gap:6px; max-width:440px; margin:0 auto 10px; }
.wbv1-ctl label{ font-size:.75rem; color:var(--graphite); }
.wbv1-go{ text-align:center; margin:4px 0 8px; }
.wbv1-arrow{ text-align:center; color:var(--fig-k); font-size:.8rem; font-weight:700; }
/* URL anatomy */
.wbv1-url{ display:flex; flex-wrap:wrap; gap:8px 4px; justify-content:center; direction:ltr; }
.wbv1-blk{ display:flex; flex-direction:column; align-items:center; gap:2px; transition:opacity .4s; }
.wbv1-blk.off{ opacity:.35; }
.wbv1-blk > i{ font-style:normal; font-size:.75rem; font-weight:700; color:var(--fig-k); }
.wbv1-segs{ display:flex; border-radius:6px; overflow:hidden; border:1.5px solid var(--line); background:var(--paper); }
.wbv1-blk.on .wbv1-segs{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
.wbv1-seg{ display:flex; flex-direction:column; align-items:center; padding:3px 4px; }
.wbv1-seg + .wbv1-seg{ border-left:1px dashed var(--graphite); }
.wbv1-seg code{ font:600 .9rem var(--mono); color:var(--ink); background:none; padding:0; }
.wbv1-seg small{ font-size:.75rem; color:var(--graphite); white-space:nowrap; }
.wbv1-hosts{ margin-top:10px; }
/* URL splitter */
.wbv1-ustr{ font:600 .9rem/1.6 var(--mono); text-align:center; direction:ltr; overflow-wrap:anywhere; margin:0 0 10px; color:var(--graphite); }
.wbv1-ustr span{ border-radius:4px; padding:1px 0; transition:all .35s; }
.wbv1-ustr span.dn{ color:var(--ink); }
.wbv1-ustr span.cur{ background:var(--fig-s); color:#fff; padding:1px 2px; }
.wbv1-tbl{ width:100%; max-width:440px; margin:0 auto; border-collapse:collapse; font-size:.82rem; }
.wbv1-tbl td{ border-bottom:1px solid var(--line); padding:4px 6px; vertical-align:top; color:var(--ink); }
.wbv1-tbl td:first-child{ color:var(--graphite); width:46%; }
.wbv1-tbl td code{ font:600 .85rem var(--mono); overflow-wrap:anywhere; background:none; padding:0; color:var(--ink); }
.wbv1-tbl tr{ transition:opacity .35s; } .wbv1-tbl tr.todo{ opacity:.25; } .wbv1-tbl tr.cur td{ background:color-mix(in srgb, var(--fig-k) 16%, transparent); }
.wbv1-tbl td small{ display:block; font-size:.75rem; color:var(--graphite); }
.wbv1-err{ text-align:center; color:var(--pen); font-size:.85rem; margin:6px 0; }
/* search engine */
.wbv1-sites{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:5px; max-width:440px; margin:0 auto; }
.wbv1-site{ border:1.5px solid var(--line); border-radius:6px; padding:3px 4px; text-align:center; font-size:.75rem; background:var(--paper); color:var(--ink); transition:all .4s; }
.wbv1-site b{ display:block; font-size:.8rem; }
.wbv1-site.got{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.wbv1-site.hit{ box-shadow:0 0 0 2.5px var(--fig-k); }
.wbv1-site.miss{ border-style:dashed; opacity:.55; }
.wbv1-db{ border:2px solid var(--fig-k); border-radius:10px; max-width:440px; margin:8px auto 0; background:var(--paper); padding:5px 8px; }
.wbv1-db > b{ display:block; font-size:.8rem; color:var(--fig-k); margin-bottom:3px; }
.wbv1-idx{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:2px 10px; font-size:.8rem; color:var(--ink); }
.wbv1-idx span:nth-child(odd){ font-family:var(--mono); font-weight:600; }
.wbv1-idx .hit{ background:color-mix(in srgb, var(--fig-k) 22%, transparent); border-radius:3px; }
.wbv1-q{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; margin-top:8px; font-size:.82rem; color:var(--ink); }
.wbv1-q code{ font:600 .85rem var(--mono); border:1.5px solid var(--line); border-radius:99px; padding:2px 10px; background:var(--paper); color:var(--ink); }
/* chain diagrams (protocols, client-server) */
.wbv1-chain{ display:flex; flex-direction:column; align-items:center; max-width:340px; margin:0 auto; }
.wbv1-node{ width:100%; box-sizing:border-box; border:1.5px solid var(--line); border-radius:9px; padding:5px 8px; text-align:center; background:var(--paper); color:var(--ink); transition:all .4s; }
.wbv1-node b{ display:block; font-size:.88rem; } .wbv1-node small{ display:block; font-size:.75rem; color:var(--graphite); }
.wbv1-node.on{ border-color:var(--fig-k); box-shadow:0 0 0 2px var(--fig-k); }
.wbv1-node.dim{ opacity:.4; }
.wbv1-node.cloud{ border-radius:40px; }
.wbv1-link{ display:flex; justify-content:center; gap:14px; min-height:34px; align-items:center; font-size:.75rem; color:var(--graphite); }
.wbv1-link span{ display:flex; align-items:center; gap:3px; }
.wbv1-link span.on{ color:var(--fig-k); font-weight:700; animation:wbv1pulse 1.4s ease infinite; }
.wbv1-link .bar{ width:2px; height:26px; background:var(--line); }
.wbv1-lock{ font-family:var(--mono); letter-spacing:1px; }
/* architecture */
.wbv1-arch{ max-width:420px; margin:0 auto; display:grid; grid-template-columns:22px minmax(0,1fr); gap:4px 6px; }
.wbv1-side{ writing-mode:vertical-rl; transform:rotate(180deg); font-size:.75rem; font-weight:700; color:var(--graphite); text-align:center; }
.wbv1-brow{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; }
.wbv1-brow span{ font-size:.75rem; border:1px solid var(--line); border-radius:99px; padding:1px 7px; background:var(--paper); color:var(--ink); }
.wbv1-layer{ border:1.5px solid var(--fig-k); border-radius:8px; text-align:center; font-weight:700; padding:5px; background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); color:var(--ink); font-size:.9rem; }
.wbv1-techs{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; min-height:28px; align-items:center; border:1.3px dashed var(--line); border-radius:8px; padding:3px; margin-top:4px; }
.wbv1-techs span{ font:600 .78rem var(--mono); border-radius:6px; padding:2px 6px; border:1.3px solid var(--fig-k); background:var(--paper); color:var(--ink); animation:wbv1in .4s ease both; }
.wbv1-techs em{ font-style:normal; font-size:.75rem; color:var(--graphite); }
.wbv1-dash{ grid-column:1 / -1; border-top:2px dashed var(--fig-k); margin:4px 0; }
.wbv1-card{ text-align:center; margin:12px 0 2px; }
.wbv1-card .big{ font:700 1.05rem var(--mono); color:var(--ink); display:inline-block; padding:4px 14px; border-radius:10px; border:1.5px solid var(--fig-k); background:var(--paper); margin:4px 0 8px; }
.wbv1-card .row{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; }
.wbv1-card.shake .big{ animation:wbv1sh .4s ease; }
.wbv1-score{ text-align:center; font-size:.8rem; color:var(--graphite); margin:6px 0 0; }
/* how the web works */
.wbv1-trio{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; max-width:440px; margin:0 auto; }
.wbv1-trio .wbv1-node{ padding:5px 3px; } .wbv1-trio .wbv1-node b{ font-size:.8rem; }
.wbv1-msg{ max-width:440px; margin:8px auto 0; min-height:48px; border-radius:8px; border:1.5px solid var(--fig-k); background:color-mix(in srgb, var(--fig-k) 10%, var(--paper)); padding:4px 8px; text-align:center; font-size:.8rem; color:var(--ink); }
.wbv1-msg .dir{ display:block; font-weight:700; color:var(--fig-k); direction:ltr; }
.wbv1-msg.none{ border-style:dashed; border-color:var(--line); background:var(--paper); color:var(--graphite); }
.wbv1-cloudtag{ text-align:center; font-size:.75rem; color:var(--graphite); margin:4px 0 0; }
.wbv1-win{ border:1px solid var(--line); border-radius:8px; background:var(--paper); overflow:hidden; max-width:440px; margin:10px auto 0; transition:box-shadow .4s; }
.wbv1-win.on{ box-shadow:0 0 0 2.5px var(--fig-k); }
.wbv1-addr{ font:.78rem/1.4 var(--mono); color:var(--ink); padding:4px 8px; background:var(--paper-2); border-bottom:1px solid var(--line); overflow-wrap:anywhere; direction:ltr; text-align:left; }
.wbv1-addr.on{ box-shadow:inset 0 0 0 2px var(--fig-k); }
.wbv1-page{ padding:8px 10px; min-height:64px; font-size:.85rem; color:var(--ink); direction:ltr; text-align:left; }
.wbv1-page .ln{ height:8px; border-radius:4px; background:var(--line); margin:6px 0; }
.wbv1-404{ font:700 1.1rem var(--mono); color:var(--pen); }
/* site tree */
.wbv1-tree{ max-width:300px; margin:0 auto; font:.85rem/1.3 var(--mono); direction:ltr; text-align:left; color:var(--ink); }
.wbv1-tr{ display:flex; align-items:center; gap:6px; padding:3px 4px; border-radius:5px; transition:background .4s; }
.wbv1-tr.cur{ background:color-mix(in srgb, var(--fig-k) 20%, transparent); }
.wbv1-tr small{ font:.75rem var(--body); color:var(--graphite); }
.wbv1-ico{ flex:none; width:16px; height:12px; border-radius:2px; border:1.5px solid var(--graphite); background:var(--paper); }
.wbv1-ico.fd{ background:var(--fig-k); border-color:var(--fig-k); border-radius:2px 5px 2px 2px; }
.wbv1-ico.rt{ background:var(--pen); border-color:var(--pen); border-radius:50%; width:14px; }
/* hyperlinks */
.wbv1-lpage{ height:200px; overflow-y:auto; position:relative; padding:8px 10px; font-size:.88rem; color:var(--ink); direction:ltr; text-align:left; }
.wbv1-lpage h4{ margin:.2em 0 .4em; font-size:1rem; }
.wbv1-lpage p{ margin:.4em 0; }
.wbv1-a{ color:var(--fig-k); text-decoration:underline; cursor:pointer; background:none; border:0; padding:0; font:inherit; }
.wbv1-a.flash{ outline:2.5px solid var(--fig-k); outline-offset:2px; border-radius:3px; }
.wbv1-imgl{ display:inline-grid; place-items:center; width:92px; height:52px; border-radius:6px; border:2px solid var(--fig-k); background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); font:.75rem var(--body); color:var(--ink); cursor:pointer; }
.wbv1-imgl.flash{ outline:2.5px solid var(--fig-k); outline-offset:2px; }
.wbv1-sec{ margin-top:140px; padding-top:6px; border-top:1px solid var(--line); }
.wbv1-sec.hl{ background:color-mix(in srgb, var(--fig-k) 14%, transparent); }
.wbv1-mail{ position:absolute; inset:10px; border:1.5px solid var(--fig-k); border-radius:8px; background:var(--paper); padding:8px; font-size:.82rem; animation:wbv1in .3s ease both; }
.wbv1-mail div{ border-bottom:1px solid var(--line); padding:3px 0; }
/* how browsers display */
.wbv1-disp{ display:grid; grid-template-columns:minmax(0,1fr); gap:8px; max-width:560px; margin:0 auto; }
@media (min-width:640px){ .wbv1-disp{ grid-template-columns:minmax(0,1fr) minmax(0,1.2fr); align-items:start; } }
.wbv1-banner{ border-radius:5px; padding:8px 6px; font:700 .9rem var(--body); color:#fff; background:linear-gradient(120deg, var(--fig-s), color-mix(in srgb, var(--fig-s) 50%, #000)); }
.wbv1-banner small{ display:block; font-weight:400; font-size:.75rem; }
.wbv1-hole{ border:1.5px dashed var(--graphite); border-radius:5px; padding:8px 6px; font:.75rem var(--mono); color:var(--graphite); text-align:center; }
.wbv1-icon{ display:inline-grid; place-items:center; width:40px; height:34px; border-radius:5px; background:var(--fig-s); color:#fff; font:700 .75rem var(--body); vertical-align:middle; margin-right:6px; }
.wbv1-dl{ text-align:center; font-size:.78rem; font-weight:700; color:var(--fig-k); }
/* link colours: a browser page is white whatever the site theme */
.wbv1-white{ background:#fff; color:#111; border:1px solid var(--line); border-radius:8px; padding:10px 14px; max-width:320px; margin:0 auto; font:1rem "Times New Roman", Times, serif; text-align:left; direction:ltr; user-select:none; -webkit-user-select:none; }
.wbv1-white p{ margin:.35em 0; }
.wbv1-white button{ background:none; border:0; padding:0; font:inherit; text-decoration:underline; cursor:pointer; color:#0000EE; touch-action:manipulation; }
.wbv1-white button.v{ color:#551A8B; } .wbv1-white button.a{ color:#EE0000; }
.wbv1-key{ display:flex; flex-wrap:wrap; gap:6px 14px; justify-content:center; margin-top:8px; font-size:.8rem; color:var(--ink); }
.wbv1-key i{ display:inline-block; width:12px; height:12px; border-radius:3px; vertical-align:-1px; margin-right:4px; }
/* phishing */
.wbv1-mailbox{ max-width:440px; margin:0 auto; border:1.5px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); font-size:.85rem; direction:ltr; text-align:left; overflow:hidden; }
.wbv1-mailbox .hd{ padding:6px 8px; background:var(--paper-2); border-bottom:1px solid var(--line); }
.wbv1-mailbox .hd div{ margin:2px 0; overflow-wrap:anywhere; } .wbv1-mailbox .hd span{ color:var(--graphite); }
.wbv1-mailbox .bd{ padding:8px; } .wbv1-mailbox .bd p{ margin:.4em 0; }
.wbv1-spot{ cursor:pointer; border-radius:4px; transition:background .3s, box-shadow .3s; }
.wbv1-spot:hover{ box-shadow:0 0 0 1.5px var(--line); }
.wbv1-spot.found{ background:color-mix(in srgb, var(--pen) 20%, transparent); box-shadow:0 0 0 1.5px var(--pen); }
.wbv1-logo{ display:inline-block; font:800 .85rem var(--body); letter-spacing:1px; padding:3px 8px; border-radius:4px; background:var(--fig-s); color:#fff; }
.wbv1-fakel{ color:var(--fig-k); text-decoration:underline; }
.wbv1-tip{ display:block; font:.75rem var(--mono); color:var(--graphite); overflow-wrap:anywhere; }
/* security lab */
.wbv1-checks{ list-style:none; padding:0; margin:8px auto 0; max-width:380px; font-size:.85rem; color:var(--ink); }
.wbv1-checks li{ padding:2px 6px; border-radius:5px; margin:0 !important; line-height:1.35; display:flex; gap:8px; align-items:center; }
.wbv1-checks li i{ font-style:normal; font-weight:700; width:1.1em; text-align:center; }
.wbv1-checks li.ok i{ color:var(--ok); } .wbv1-checks li.no i{ color:var(--pen); }
.wbv1-verdict{ text-align:center; font-weight:700; margin:8px 0 0; font-size:.9rem; }
.wbv1-verdict.ok{ color:var(--ok); } .wbv1-verdict.no{ color:var(--pen); }
.wbv1-form{ max-width:300px; margin:0 auto; display:grid; gap:6px; }
.wbv1-form label{ font-size:.75rem; color:var(--graphite); display:grid; gap:2px; }
.wbv1-alert{ max-width:300px; margin:8px auto 0; border-radius:6px; padding:6px 8px; font-size:.85rem; text-align:center; border:1.5px solid var(--pen); color:var(--ink); background:color-mix(in srgb, var(--pen) 12%, var(--paper)); direction:ltr; }
.wbv1-alert.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.wbv1-users{ width:100%; max-width:300px; margin:8px auto 0; border-collapse:collapse; font:.8rem var(--mono); direction:ltr; }
.wbv1-users th, .wbv1-users td{ border:1px solid var(--line); padding:3px 6px; text-align:left; color:var(--ink); }
.wbv1-users th{ background:var(--paper-2); font-family:var(--body); }
.wbv1-users tr.got td{ background:color-mix(in srgb, var(--pen) 16%, transparent); }
.wbv1-users tr.ok td{ background:color-mix(in srgb, var(--ok) 16%, transparent); }
.wbv1-gone{ text-align:center; font:700 .9rem var(--mono); color:var(--pen); border:1.5px dashed var(--pen); border-radius:6px; padding:8px; max-width:300px; margin:8px auto 0; }
.wbv1-show{ max-width:340px; margin:8px auto 0; border:1px solid var(--line); border-radius:8px; background:var(--paper); }
.wbv1-show > small{ display:block; font-size:.75rem; color:var(--graphite); padding:3px 8px; border-bottom:1px solid var(--line); }
.wbv1-show > div{ padding:6px 8px; font-size:.88rem; color:var(--ink); direction:ltr; text-align:left; overflow-wrap:anywhere; min-height:24px; }
.wbv1-run{ display:block; margin-top:4px; font:600 .78rem var(--body); color:#fff; background:var(--pen); border-radius:4px; padding:3px 6px; }
@media (prefers-reduced-motion: reduce){ .wbv1-new, .wbv1-techs span, .wbv1-link span.on, .wbv1-card.shake .big, .wbv1-mail{ animation:none; } }`;
  if (!document.getElementById('wbv1-css')) { const s = document.createElement('style'); s.id = 'wbv1-css'; s.textContent = CSS; document.head.appendChild(s); }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // short code / English inside an Arabic sentence: always an ltr isolate
  const T = s => `<bdi dir="ltr">${esc(s)}</bdi>`;
  const Fig = ({ children }) => html`<figure className="fig wbv1">${children}</figure>`;
  const Chips = ({ items, sel, on, mono, label }) => html`<div className="wbv1-chips" role="group" aria-label=${label || 'Choose'}>${items.map(([k, t]) => html`<button key=${k}
    className=${'fig-btn' + (mono ? ' m' : '')} aria-pressed=${String(sel === k)} onClick=${() => on(k)}>${t}</button>`)}</div>`;
  const Plain = ({ en, a, ar, extra }) => html`<${Cap} en=${en} ar=${a} showAr=${ar} />${extra || ''}`;

  /* ── [0.0]–[0.2] page 1: the Internet carries many services; the Web is only one ── */
  function L1Services({ ar }) {
    const steps = [
      { en: '<b>The Internet</b>: computers around the world connected to each other via a high speed series of networks. It is the global system of interconnected computer networks.', ar: 'الـ <b>Internet</b> عبارة عن كمبيوترات في العالم كله متوصلة ببعض عن طريق سلسلة networks سريعة جدًا، يعني النظام العالمي للـ computer networks المتوصلة ببعض.' },
      { en: 'The connected computers exchange information and use services: the inter-linked hypertext documents of the <b>Web</b>, <b>electronic mail</b>, <b>telephony</b> and <b>file sharing</b>.', ar: 'الكمبيوترات دي بتتبادل معلومات وبتستخدم خدمات، زي الـ hypertext documents المربوطة ببعض بتاعة الـ <b>Web</b>، والـ <b>electronic mail</b>، والـ <b>telephony</b>، والـ <b>file sharing</b>.' },
      { en: 'The <b>World Wide Web</b> (WWW or W3) is just <b>one</b> of these services, although it is the most commonly used one.', ar: 'الـ <b>World Wide Web</b> (اللي اسمه كمان WWW أو W3) مجرد خدمة <b>واحدة</b> من دول، حتى لو هي الأكتر استخدامًا.' },
      { en: 'So the Internet is <b>not</b> the World Wide Web: the Internet is the network of networks, and the Web is one service it offers.', ar: 'يبقى الـ Internet <b>مش</b> هو الـ World Wide Web؛ الـ Internet هو الـ network of networks، والـ Web خدمة واحدة من اللي بيقدمها.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const N = [[20, 35], [70, 12], [72, 58], [128, 30], [180, 10], [182, 60], [232, 34], [282, 14], [280, 58]];
    const E = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6], [6, 7], [6, 8], [1, 4], [2, 5]];
    const SV = [['web', 'World Wide Web', 'hypertext documents'], ['mail', 'Electronic mail', ''], ['tel', 'Telephony', ''], ['file', 'File sharing', '']];
    return html`<${Fig}><div className="fig-stage"><div className="wbv1-net">
        <p>The Internet</p><small>interconnected computer networks</small>
        <svg viewBox="0 0 300 70" style=${{ width: '100%', maxWidth: '300px', height: 'auto', display: 'block', margin: '0 auto' }} aria-hidden="true">
          ${E.map(([a, b], j) => html`<line key=${'e' + j} x1=${N[a][0]} y1=${N[a][1]} x2=${N[b][0]} y2=${N[b][1]} stroke="var(--graphite)" strokeWidth="1.5" />`)}
          ${N.map(([x, y], j) => html`<g key=${'n' + j}><rect x=${x - 8} y=${y - 6} width="16" height="11" rx="2" fill="var(--paper)" stroke="var(--fig-k)" strokeWidth="2" /><line x1=${x - 5} y1=${y + 8} x2=${x + 5} y2=${y + 8} stroke="var(--fig-k)" strokeWidth="2" /></g>`)}
        </svg>
        <div className=${'wbv1-svc ' + pop(i >= 1)}>${SV.map(([k, t, s]) => html`<div key=${k} className=${i >= 2 ? (k === 'web' ? 'hi' : 'lo') : ''}>${t}${s && html`<small>${s}</small>`}${k === 'web' && i >= 2 && html`<small>the most used service</small>`}</div>`)}</div>
      </div>
      <p className=${'wbv1-neq ' + pop(i >= 3)}>Internet<span>≠</span>World Wide Web</p></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [0.3]–[0.4] pages 1–2: the two cloud figures, advantages and disadvantages ── */
  function L1ProsCons({ ar }) {
    const ADV = ['Social Networking', 'Education and technology', 'Entertainment', 'Online services'];
    const DIS = ['Threat to personal information', 'Spamming', 'Cyber Crime', 'Virus Attacks'];
    const AR_ADV = ['الـ Social networking', 'الـ Education and technology (التعليم والتكنولوجيا)', 'الـ Entertainment (الترفيه)', 'الـ Online services (الخدمات اللي أونلاين)'];
    const AR_DIS = ['تهديد للمعلومات الشخصية (Threat to personal information)', 'الـ Spamming', 'الـ Cyber crime', 'الـ Virus attacks'];
    const ORD = ['الأولى', 'التانية', 'التالتة', 'الرابعة'];
    const steps = ADV.map((t, j) => ({ en: (j === 0 ? 'The Internet covers almost every aspect of life. ' : '') + `Internet advantage ${j + 1} of 4: <b>${t}</b>.`, ar: (j === 0 ? 'الـ Internet داخل في كل جوانب الحياة تقريبًا. ' : '') + `الميزة ${ORD[j]} للـ Internet هي <b>${AR_ADV[j]}</b>.` }))
      .concat(DIS.map((t, j) => ({ en: `Internet disadvantage ${j + 1} of 4: <b>${t}</b>.`, ar: `العيب ${j === 0 ? 'الأول' : j === 1 ? 'التاني' : j === 2 ? 'التالت' : 'الرابع'} للـ Internet هو <b>${AR_DIS[j]}</b>.` })));
    const [i, ctl] = useSteps(steps.length, 1500);
    const bad = i >= 4, list = bad ? DIS : ADV, n = i % 4;
    const bx = j => html`<div key=${(bad ? 'd' : 'a') + j} className=${'bx ' + (bad ? 'bad ' : '') + pop(j <= n)}>${list[j]}</div>`;
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Figure" items=${[['a', 'Advantages'], ['d', 'Disadvantages']]} sel=${bad ? 'd' : 'a'} on=${k => ctl.go(k === 'd' ? 4 : 0)} />
      <div className="wbv1-pc">${bx(0)}${bx(1)}<div className="cl">Internet<br />${bad ? 'Disadvantages' : 'Advantages'}</div>${bx(2)}${bx(3)}</div></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [0.7]–[0.8] page 2–3: one web page with links to resources, then a web site of connected pages ── */
  function L1PageSite({ ar }) {
    const steps = [
      { en: 'A <b>web page</b> is a space of information on the Internet presenting information about a particular person, business, organization or cause. The Web consists of these files, called web pages (documents).', ar: 'الـ <b>web page</b> مساحة معلومات على الـ Internet بتقدم معلومات عن شخص أو business أو organization أو قضية معينة. والـ Web متكون من الـ files دي، اللي اسمها web pages (documents).' },
      { en: 'A web page contains <b>links to resources</b> throughout the Internet: text, images, audio, video and other data.', ar: 'الـ web page فيها <b>links لـ resources</b> على الـ Internet كله، زي الـ text والـ images والـ audio والـ video وأي data تانية.' },
      { en: 'A <b>web site</b> is a collection of web pages grouped together...', ar: 'أما الـ <b>web site</b> فهو مجموعة web pages متجمعة مع بعض...' },
      { en: '...and usually connected together in various ways (the links between the pages). Often just called a “site”.', ar: '...وغالبًا متوصلة ببعض بطرق مختلفة (الـ links اللي بين الصفحات). وساعات بنقول عليه “site” بس.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const page = (x, y, w, h, label, hi) => html`<g><rect x=${x} y=${y} width=${w} height=${h} rx="5" fill="var(--paper)" stroke=${hi ? 'var(--fig-k)' : 'var(--graphite)'} strokeWidth="2" />
      <rect x=${x + 8} y=${y + 9} width=${w - 16} height="7" rx="2" fill="var(--fig-k)" opacity=".7" />
      ${[0, 1, 2].map(j => html`<rect key=${j} x=${x + 8} y=${y + 22 + j * 9} width=${(w - 16) * (j === 2 ? .6 : 1)} height="4" rx="2" fill="var(--line)" />`)}
      <text x=${x + w / 2} y=${y + h + 17} textAnchor="middle" fontSize="15" fontWeight="600">${label}</text></g>`;
    const RES = [['text', 34, 30], ['images', 266, 30], ['audio', 30, 150], ['video', 270, 150], ['other data', 150, 196]];
    let svg;
    if (i < 2) svg = html`<svg viewBox="0 0 300 210" role="img" aria-label="A web page with links to text, images, audio, video and other data">
        ${RES.map(([t, x, y], j) => html`<g key=${t} className=${pop(i >= 1)}><line x1="150" y1="90" x2=${x} y2=${y - 5} stroke="var(--fig-k)" strokeWidth="1.8" strokeDasharray="5 4" />
          <rect x=${x - 42} y=${y - 18} width="84" height="26" rx="13" fill="var(--paper)" stroke="var(--fig-k)" strokeWidth="1.8" /><text x=${x} y=${y + .5} textAnchor="middle" fontSize="15">${t}</text></g>`)}
        ${page(110, 50, 80, 64, 'web page', true)}</svg>`;
    else {
      const P = [[110, 22, 'page 1'], [24, 118, 'page 2'], [196, 118, 'page 3']];
      svg = html`<svg viewBox="0 0 300 210" role="img" aria-label="A web site: a collection of web pages connected by links">
        <rect x="4" y="4" width="292" height="202" rx="12" fill="color-mix(in srgb, var(--fig-k) 8%, transparent)" stroke="var(--fig-k)" strokeWidth="2" strokeDasharray="7 5" />
        <text x="16" y="24" fontSize="15" fontWeight="700" fill="var(--fig-k)" style=${{ fill: 'var(--fig-k)' }}>web site</text>
        <g className=${pop(i >= 3)}>
          <line x1="128" y1="86" x2="72" y2="118" stroke="var(--fig-k)" strokeWidth="2.2" />
          <line x1="172" y1="86" x2="228" y2="118" stroke="var(--fig-k)" strokeWidth="2.2" />
          <line x1="104" y1="150" x2="196" y2="150" stroke="var(--fig-k)" strokeWidth="2.2" />
        </g>
        ${P.map(([x, y, t]) => html`<g key=${t}>${page(x, y, 80, 64, t, false)}</g>`)}</svg>`;
    }
    return html`<${Fig}><div className="fig-stage"><div className="wbv1-svgbox">${svg}</div></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [0.9]–[0.10] page 3: static (stored as viewed) vs dynamic (built piece by piece, varies by rules or user input) ── */
  function L1StaticDynamic({ ar }) {
    const [mode, setMode] = useState('s'), [name, setName] = useState('Sara'), [time, setTime] = useState('m'), [n, setN] = useState(-1);
    const greet = time === 'm' ? 'Good morning' : 'Good evening', who = name.trim() || 'visitor';
    const stat = ['Welcome to our site', 'Opening hours, prices and contact details', 'Copyright footer'];
    const tpl = [['Site header', 'Site header', false], ['{greeting by time of day}', greet, true], ['{name the user typed}', who, true], ['Site footer', 'Site footer', false]];
    const total = mode === 's' ? 1 : tpl.length;
    useEffect(() => { if (n < 0 || n >= total) return; const t = setTimeout(() => setN(x => x + 1), calm() ? 0 : 900); return () => clearTimeout(t); }, [n, total]);
    const request = () => setN(calm() ? total : 0);
    const reset = f => v => { f(v); setN(-1); };
    const done = n >= total;
    let en, a;
    if (mode === 's') {
      en = n < 0 ? '<b>Static website</b>: the page is stored on the server in the <b>same form</b> as the user will view it. Press “Request the page”.' : 'The server sends the stored file as it is: what the user sees is exactly what is stored. Every visitor gets the same page.';
      a = n < 0 ? 'الـ <b>Static website</b> الصفحة فيه متخزنة على الـ server <b>بنفس الشكل</b> اللي الـ user هيشوفها بيه. دوس “Request the page”.' : 'الـ server بيبعت الـ file المتخزن زي ما هو، فاللي الـ user بيشوفه هو بالظبط اللي متخزن، وكل زائر بياخد نفس الصفحة.';
    } else {
      en = n < 0 ? '<b>Dynamic website</b>: the page is <b>not</b> stored in the form the user sees. Change the user input or the time of day, then press “Request the page”.'
        : !done ? `The page code is constructed dynamically, <b>piece by piece</b> (piece ${Math.min(n + 1, total)} of ${total}).`
          : `The content varies by criteria: a <b>pre-defined rule</b> chose “${greet}” and the <b>variable user input</b> gave “${esc(who)}”. Change them and request again: the page changes.`;
      a = n < 0 ? 'الـ <b>Dynamic website</b> الصفحة فيه <b>مش</b> متخزنة بالشكل اللي الـ user بيشوفه. غيّر الـ input أو الوقت، ودوس “Request the page”.'
        : !done ? `الـ code بتاع الصفحة بيتبني dynamically <b>حتة حتة</b> (الحتة رقم ${Math.min(n + 1, total)} من ${total}).`
          : `المحتوى بيختلف حسب criteria، فيه <b>قاعدة متحددة قبل كده</b> اختارت ${T(greet)}، والـ <b>input المتغير من الـ user</b> جاب ${T(who)}. غيّرهم واطلب الصفحة تاني وهتلاقيها اتغيرت.`;
    }
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Website" items=${[['s', 'Static website'], ['d', 'Dynamic website']]} sel=${mode} on=${reset(setMode)} />
      ${mode === 'd' && html`<div className="wbv1-ctl">
        <label>Variable user input (your name)<input className="wbv1-in" value=${name} maxLength="18" onInput=${e => reset(setName)(e.target.value)} /></label>
        <div><label>Pre-defined rule: greeting by time of day</label><${Chips} label="Time of day" items=${[['m', 'Morning'], ['e', 'Evening']]} sel=${time} on=${reset(setTime)} /></div></div>`}
      <div className="wbv1-go"><button className="fig-btn solid" onClick=${request}>Request the page</button></div>
      <div className="wbv1-sd">
        <div className="wbv1-pane"><b>Stored on the server</b><div>${mode === 's'
          ? html`<div className="wbv1-piece same">${stat.map((t, j) => html`<div key=${j}>${t}</div>`)}</div>`
          : tpl.map(([s, , v], j) => html`<div key=${j} className=${'wbv1-piece tpl' + (v ? ' var' : '')}>${s}</div>`)}</div></div>
        <div className="wbv1-pane"><b>What the user sees</b><div>${mode === 's'
          ? n >= 1 && html`<div className="wbv1-piece same wbv1-new">${stat.map((t, j) => html`<div key=${j}>${t}</div>`)}</div>`
          : tpl.slice(0, Math.max(0, n)).map(([, t, v], j) => html`<div key=${j + t} className=${'wbv1-piece wbv1-new' + (v ? ' var' : '')}>${t}</div>`)}</div></div>
      </div></div>
      <${Plain} en=${en} a=${a} ar=${ar} /><//>`;
  }

  /* ── [1.0]–[1.3] page 3 figure: protocol, name of site (host name + domain name), absolute path (directory path + document) ── */
  function L1UrlParts({ ar }) {
    const [host, setHost] = useState('www');
    const steps = [
      { en: 'The <b>URL</b> is the complete address of a web page. It has three components that identify where the page is stored on the Internet.', ar: 'الـ <b>URL</b> هو العنوان الكامل للـ web page، وليه 3 components بيحددوا الصفحة متخزنة فين على الـ Internet.' },
      { en: '① <b>Protocol</b> <code>http://</code>: lets the server know to use the Hypertext Transfer Protocol, to get into “web mode”.', ar: 'أول جزء هو الـ <b>Protocol</b> اللي هو ' + T('http://') + '، وبيقول للـ server يستخدم الـ Hypertext Transfer Protocol، يعني يدخل “web mode”.' },
      { en: '② <b>Name of site</b>: the server address. <code>example.com</code> is the <b>domain name</b>; <code>www.</code> is the particular <b>host name</b> at that domain.', ar: 'تاني جزء هو <b>اسم الـ site</b>، يعني عنوان الـ server. الـ ' + T('example.com') + ' هو الـ <b>domain name</b>، والـ ' + T('www.') + ' هو الـ <b>host name</b> المعين جوه الـ domain ده.' },
      { en: 'The same domain can have other hosts, like <code>development.example.com</code> and <code>clients.example.com</code>. Try them.', ar: 'نفس الـ domain ممكن يبقى فيه hosts تانية، زي ' + T('development.example.com') + ' و ' + T('clients.example.com') + '. جرّبهم.' },
      { en: '③ <b>Absolute path</b> (optional) <code>/2012/samples/first.html</code>: the words separated by slashes are directory names, starting from the root directory of the host, ending with the document <b>first.html</b>.', ar: 'تالت جزء هو الـ <b>Absolute path</b> (اختياري) زي ' + T('/2012/samples/first.html') + '. الكلمات اللي بينها slashes هي أسماء الـ directories، بتبدأ من الـ root directory بتاع الـ host، وآخرها الـ document اللي هو <b>first.html</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const st = k => 'wbv1-blk' + (i === 0 ? '' : (k === 1 && i === 1) || (k === 2 && (i === 2 || i === 3)) || (k === 3 && i === 4) ? ' on' : ' off');
    const seg = (c, s) => html`<div className="wbv1-seg"><code>${c}</code>${s && html`<small>${s}</small>`}</div>`;
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv1-url" aria-label=${'URL http://' + host + '.example.com/2012/samples/first.html'}>
        <div className=${st(1)}><i>① Protocol</i><div className="wbv1-segs">${seg('http://', '')}</div></div>
        <div className=${st(2)}><i>② Name of site</i><div className="wbv1-segs">${seg(host + '.', 'Host name')}${seg('example.com', 'Domain name')}</div></div>
        <div className=${st(3)}><i>③ Absolute path</i><div className="wbv1-segs">${seg('/2012/samples/', 'Directory path')}${seg('first.html', 'Document')}</div></div>
      </div>
      <div className=${'wbv1-hosts ' + pop(i === 3)}><${Chips} mono=${true} label="Host" items=${[['www', 'www'], ['development', 'development'], ['clients', 'clients']]} sel=${host} on=${setHost} /></div></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [1.4] + [2] page 4: split a URL into its six named parts; the TLD meaning comes from the lecture's table ── */
  const TLD = { com: ['Commercial enterprise', 'مؤسسة تجارية'], edu: ['Educational institution', 'مؤسسة تعليمية'], gov: ['Government entity', 'جهة حكومية'], mil: ['Military entity', 'جهة عسكرية'],
    net: ['Provider access network', 'شبكة مزوّد خدمة (provider access network)'], org: ['Organizations (usually nonprofit)', 'منظمات (غالبًا غير هادفة للربح)'], biz: ['Businesses', 'أعمال تجارية (businesses)'], pro: ['Professionals such as doctors and attorneys', 'مهنيين زي الدكاترة والمحامين'] };
  function splitUrl(u) {
    const m = String(u).trim().match(/^([A-Za-z][A-Za-z0-9+.-]*):\/\/([A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*)(?::(\d+))?(\/[^\s?#]*)?$/);
    if (!m) return null;
    const [, proto, host, port, path = ''] = m, segs = [], parts = [];
    const add = (t, part) => { if (part) { parts.push(part); segs.push({ t, p: parts.length - 1 }); } else segs.push({ t, p: -1 }); };
    const pl = proto.toLowerCase();
    const pname = pl === 'http' ? ['the Hypertext Transfer Protocol (“web mode”)', 'الـ Hypertext Transfer Protocol (يعني “web mode”)'] : pl === 'https' ? ['the secure, encrypted version of HTTP', 'النسخة الـ secure المتشفرة من الـ HTTP'] : pl === 'ftp' ? ['the File Transfer Protocol', 'الـ File Transfer Protocol'] : ['a protocol not covered in this lecture', 'protocol مش متشرح في المحاضرة دي'];
    add(proto + '://', { k: 'Protocol', v: proto, en: `<b>Protocol</b>: <code>${esc(proto)}</code>, ${pname[0]}.`, ar: `الـ <b>Protocol</b> هو ${T(proto)}، يعني ${pname[1]}.` });
    const L = host.split('.');
    if (L.length >= 3) add(L.slice(0, -2).join('.') + '.', { k: 'Host computer name', v: L.slice(0, -2).join('.'), en: `<b>Host computer name</b>: <code>${esc(L.slice(0, -2).join('.'))}</code>, the particular host at that domain.`, ar: `اسم الـ <b>host computer</b> هو ${T(L.slice(0, -2).join('.'))}، يعني الـ host المعين جوه الـ domain.` });
    if (L.length >= 2) {
      const sld = L[L.length - 2], tld = L[L.length - 1], mean = TLD[tld.toLowerCase()];
      add(sld, { k: 'Second-level domain name', v: sld, en: `<b>Second-level domain name</b>: <code>${esc(sld)}</code>.`, ar: `الـ <b>second-level domain name</b> هو ${T(sld)}.` });
      add('.', null);
      add(tld, { k: 'Top-level domain name', v: tld, note: mean ? mean[0] : 'not in the lecture’s table', en: `<b>Top-level domain name</b>: <code>${esc(tld)}</code>, ` + (mean ? `meaning: ${mean[0]}.` : 'which is not in the lecture’s table of top-level domains.'), ar: `الـ <b>top-level domain name</b> هو ${T(tld)}، ` + (mean ? `ومعناه ${mean[1]}.` : 'ومش موجود في جدول الـ top-level domains بتاع المحاضرة.') });
    } else add(host, { k: 'Host computer name', v: host, en: `<b>Host name</b>: <code>${esc(host)}</code> (no domain).`, ar: `الـ <b>host name</b> هو ${T(host)} (من غير domain).` });
    if (port) add(':' + port, { k: 'Port', v: port, en: `<b>Port</b>: <code>${esc(port)}</code> (the general syntax is scheme://prefix.domain:port/path/filename).`, ar: `الـ <b>port</b> هو ${T(port)}، والشكل العام هو<br><span class="ltr">scheme://prefix.domain:port/path/filename</span>` });
    const ps = path.split('/').slice(1), trail = path.endsWith('/') || !path;
    ps.forEach((s, j) => {
      if (!s) { add('/', null); return; }
      const last = j === ps.length - 1 && !trail;
      add('/', null);
      if (last && s.includes('.')) add(s, { k: 'File name', v: s, en: `<b>File name</b>: <code>${esc(s)}</code>, the requested document.`, ar: `اسم الـ <b>file</b> هو ${T(s)}، يعني الـ document المطلوب.` });
      else add(s, { k: 'Directory name', v: s, en: `<b>Directory name</b>: <code>${esc(s)}</code>` + (j === 0 ? ', starting from the root directory of the host.' : '.'), ar: `اسم الـ <b>directory</b> هو ${T(s)}` + (j === 0 ? '، والـ path بيبدأ من الـ root directory بتاع الـ host.' : '.') });
    });
    if (!parts.some(p => p.k === 'File name')) parts.push({ k: 'File name', v: '(none)', note: 'the path is optional', en: '<b>File name</b>: none. The file name (path) is optional.', ar: 'مفيش <b>اسم file</b> هنا، لأن الـ file name (الـ path) اختياري.' });
    return { segs, parts };
  }
  function UrlSteps({ url, ar }) {
    const r = splitUrl(url);
    const steps = r ? r.parts.map(p => ({ en: p.en, ar: p.ar })).concat([{ en: 'All parts named. Type your own URL above to split it.', ar: 'كده سمّينا كل الأجزاء. اكتب URL بتاعك فوق عشان تقسمه.' }]) : [{ en: 'Not a full URL: write it as protocol://host.domain/path, for example http://www.icci.org/studies/ips.html', ar: 'ده مش URL كامل. اكتبه بالشكل ده:<br><span class="ltr">protocol://host.domain/path</span>' }];
    const [i, ctl] = useSteps(steps.length, 1900);
    if (!r) return html`<p className="wbv1-err" dir="ltr">${url}</p><${Cap} en=${steps[0].en} ar=${steps[0].ar} showAr=${ar} />`;
    const n = r.parts.length;
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}>
      <p className="wbv1-ustr">${r.segs.map((s, j) => html`<${React.Fragment} key=${j}><span className=${s.p < 0 ? (i >= n ? 'dn' : '') : s.p === i ? 'cur' : s.p < i ? 'dn' : ''}>${s.t}</span><wbr /><//>`)}</p>
      <table className="wbv1-tbl"><tbody>${r.parts.map((p, j) => html`<tr key=${j} className=${j === i ? 'cur' : j > i ? 'todo' : ''}><td>${j + 1}. ${p.k}</td><td><code>${p.v}</code>${p.note && html`<small>${p.note}</small>`}</td></tr>`)}</tbody></table></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function L1UrlSplit({ ar }) {
    const EX = [['icci', 'http://www.icci.org/studies/ips.html', 'Example from the notes'], ['fig', 'http://www.example.com/2012/samples/first.html', 'The figure’s URL'], ['port', 'http://www.example.com:8080/2012/samples/first.html', 'With a port']];
    const [url, setUrl] = useState(EX[0][1]), [draft, setDraft] = useState(EX[0][1]);
    useEffect(() => { const t = setTimeout(() => setUrl(draft), 500); return () => clearTimeout(t); }, [draft]);
    const sel = (EX.find(e => e[1] === url) || [])[0];
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: 6 }}>
      <${Chips} label="URL" items=${EX.map(e => [e[0], e[2]])} sel=${sel} on=${k => { const u = EX.find(e => e[0] === k)[1]; setDraft(u); setUrl(u); }} />
      <div className="wbv1-own"><small>Try your own URL</small><textarea className="wbv1-in wbv1-ta" rows="2" value=${draft} onInput=${e => setDraft(e.target.value.replace(/\n/g, ''))} aria-label="URL" spellCheck="false"></textarea></div></div>
      <${UrlSteps} key=${url} url=${url} ar=${ar} /><//>`;
  }

  /* ── [3.1] page 5: a search engine collects, indexes and searches its own database, not the whole Internet ── */
  const SITES = [['A', 'HTML basics', 'html'], ['B', 'CSS colors', 'css'], ['C', 'HTML forms', 'html'], ['D', 'JavaScript loops', 'javascript'], ['E', 'HTML tables', 'html'], ['F', 'PHP intro', 'php']];
  const ENG = { 1: ['A', 'B', 'D', 'E'], 2: ['A', 'C', 'D', 'F'] };
  function L1Search({ ar }) {
    const steps = [
      { en: 'Web sites all over the Internet hold information (six sites here, each about one topic).', ar: 'فيه web sites في كل حتة على الـ Internet فيها معلومات (هنا 6 sites، كل واحد عن موضوع).' },
      { en: '<b>Search engine 1</b> first <b>collects</b> information from the various websites. It does not reach every site: here it collected A, B, D and E.', ar: 'الـ <b>search engine</b> الأول بيبدأ <b>يجمع</b> معلومات من الـ websites المختلفة، بس مش بيوصل لكل site. هنا جمع من الـ sites اللي هي A و B و D و E.' },
      { en: 'It <b>analyzes</b> the information and <b>stores</b> it in its <b>database</b>, organized by an <b>index</b> (topic → sites).', ar: 'بعدين بيعمل <b>analyze</b> للمعلومات و<b>يخزنها</b> في الـ <b>database</b> بتاعته، متنظمة بـ <b>index</b> (الموضوع وقصاده الـ sites).' },
      { en: 'The user enters a query: <code>html</code>. It is matched against the engine’s database through the index.', ar: 'الـ user بيكتب query هي ' + T('html') + '، وبتتقارن بالـ database بتاعة الـ engine عن طريق الـ index.' },
      { en: 'Results: A and E. Site C is also about HTML but is <b>not found</b>: you search the search engine’s database, <b>not the entire Internet</b>.', ar: 'النتايج هي A و E. الـ site اللي هو C برضه عن HTML بس <b>مش ظاهر</b>، لأنك بتدوّر في الـ database بتاعة الـ search engine، <b>مش في الـ Internet كله</b>.' },
      { en: '<b>Search engine 2</b> collected different sites, so the same query gives <b>different results</b> (A and C). That is why different engines give different results.', ar: 'الـ <b>search engine</b> التاني جمع sites تانية، فنفس الـ query بتطلّع <b>نتايج مختلفة</b> (A و C). وعشان كده كل engine بيطلعلك نتايج مختلفة.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const e = i >= 5 ? 2 : 1, got = ENG[e];
    const idx = {}; SITES.forEach(([id, , k]) => { if (got.includes(id)) (idx[k] = idx[k] || []).push(id); });
    const hits = i >= 4 ? (idx.html || []) : [];
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv1-sites">${SITES.map(([id, t, k]) => html`<div key=${id} className=${'wbv1-site' + (i >= 1 && got.includes(id) ? ' got' : '') + (hits.includes(id) ? ' hit' : '') + (i >= 4 && k === 'html' && !hits.includes(id) ? ' miss' : '')}><b>Site ${id}</b>${t}</div>`)}</div>
      <div className=${'wbv1-db ' + pop(i >= 2)}><b>Search engine ${e}: database (index)</b>
        <div className="wbv1-idx">${Object.keys(idx).map(k => html`<${React.Fragment} key=${k}><span className=${i >= 3 && k === 'html' ? 'hit' : ''}>${k}</span><span className=${i >= 3 && k === 'html' ? 'hit' : ''}>${idx[k].map(x => 'Site ' + x).join(', ')}</span><//>`)}</div></div>
      <div className=${'wbv1-q ' + pop(i >= 3)}>Query <code>html</code><span>→</span><span>${i >= 4 ? 'Results: ' + hits.map(x => 'Site ' + x).join(', ') : 'searching the index…'}</span></div></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [3.0], [3.2]–[3.5] pages 4–5: what each protocol / service does between your computer and the web server ── */
  function L1Protocols({ ar }) {
    const [k, setK] = useState('tcp');
    const D = {
      tcp: { on: [0, 1, 2, 3], l: [['⇅ rules', '⇅ rules', '⇅ rules']], en: '<b>TCP/IP</b> is the main protocol for Internet communication: it defines the rules computers need to follow to communicate with other computers via a network. Every exchange below follows it.', ar: 'الـ <b><bdi dir="ltr">TCP/IP</bdi></b> هو الـ protocol الأساسي للتواصل على الـ Internet؛ بيحدد القواعد اللي الكمبيوترات لازم تمشي عليها عشان تتواصل مع بعض على network. وكل تبادل تحت ماشي عليه.' },
      http: { on: [0, 3], l: [['▼ request', '▼ request', '▼ request'], ['▲ page, image, search results', '▲ resources', '▲ resources']], en: '<b>HTTP</b> ensures the exchange of almost all types of resources on the web (files, pages, images, search results). It is the browser’s language to send <b>requests</b> to the server.', ar: 'الـ <b>HTTP</b> بيضمن تبادل كل أنواع الـ resources تقريبًا على الـ web (الـ files والـ pages والـ images ونتايج البحث)، وهو اللغة اللي الـ browser بيبعت بيها <b>requests</b> للـ server.' },
      https: { on: [0, 3], l: [['▼ request', '▼ ▒▓░▒▓', '▼ ▒▓░▒▓'], ['▲ page', '▲ ░▓▒░▓', '▲ ░▓▒░▓']], lock: true, en: '<b>HTTPS</b> is the secure and encrypted version of HTTP: on the way, the request and the page are scrambled, so whoever intercepts them cannot read them.', ar: 'الـ <b>HTTPS</b> هو النسخة الـ secure المتشفرة (encrypted) من الـ HTTP، فالـ request والصفحة بيبقوا متشفرين في السكة ومحدش يقدر يقراهم لو مسكهم.' },
      ftp: { on: [0, 3], l: [['▲ upload file', '▲ upload file', '▲ upload file'], ['▼ download file', '▼ download file', '▼ download file']], en: '<b>FTP</b> (File Transfer Protocol) loads (<b>uploads</b>) or retrieves (<b>downloads</b>) files between the client and the server, or between two computers on the Internet: it is responsible for file transfer.', ar: 'الـ <b>FTP</b> (File Transfer Protocol) بيرفع (<b>upload</b>) أو ينزّل (<b>download</b>) files بين الـ client والـ server، أو بين كمبيوترين على الـ Internet، يعني هو المسؤول عن نقل الـ files.' },
      isp: { on: [0, 1], l: [['⇅ access', '', '']], en: 'The <b>ISP</b> (Internet Service Provider) is an organization that provides individuals and companies <b>access to the Internet</b> and related services such as e-mail.', ar: 'الـ <b>ISP</b> (Internet Service Provider) هو organization بتدّي الأفراد والشركات <b>access للـ Internet</b> وخدمات تانية زي الـ e-mail.' },
      host: { on: [3], l: [['', '', '']], en: '<b>Web hosting</b>: after you create a website it must be stored where it is always available for users. Web hosting companies own web servers that can store the content.', ar: 'الـ <b>Web hosting</b>: بعد ما تعمل الـ website لازم يتخزن في مكان متاح للـ users طول الوقت، وشركات الـ hosting عندها web servers تقدر تخزن المحتوى ده.' }
    }[k];
    const nodes = [['Your computer', 'client: web browser'], ['ISP', 'Internet Service Provider'], ['The Internet', 'network of networks'], ['Web server', 'at a web hosting company']];
    const link = j => html`<div className="wbv1-link">${D.l.map((row, r) => row[j] ? html`<span key=${r} className="on">${row[j]}</span>` : html`<span key=${r}><i className="bar"></i></span>`)}</div>`;
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="Protocol" items=${[['tcp', 'TCP/IP'], ['http', 'HTTP'], ['https', 'HTTPS'], ['ftp', 'FTP'], ['isp', 'ISP'], ['host', 'Web hosting']]} sel=${k} on=${setK} />
      <div className="wbv1-chain" key=${k}>${nodes.map(([t, s], j) => html`<${React.Fragment} key=${j}>
        <div className=${'wbv1-node' + (j === 2 ? ' cloud' : '') + (D.on.includes(j) ? ' on' : ' dim')}><b>${t}${D.lock && (j === 0 || j === 3) ? ' 🔒' : ''}</b><small>${s}</small></div>
        ${j < 3 && link(j)}<//>`)}</div></div>
      <${Cap} en=${D.en} ar=${D.ar} showAr=${ar} /><//>`;
  }

  /* ── [4.0]–[4.1] page 6 figure “Client-Server Example”: request, web server ↔ database, response ── */
  function L1CsExample({ ar }) {
    const steps = [
      { en: 'Computers on the Internet use <b>client/server</b> architecture. The <b>client</b> is the user’s local machine, here its <b>web browser</b>.', ar: 'الكمبيوترات على الـ Internet بتستخدم الـ architecture اللي اسمها <b><bdi dir="ltr">client/server</bdi></b>. الـ <b>client</b> هو جهاز الـ user المحلي، وهنا الـ <b>web browser</b> بتاعه.' },
      { en: 'The browser sends a <b>request</b> to the remote <b>web server</b>.', ar: 'الـ browser بيبعت <b>request</b> للـ <b>web server</b> اللي بعيد.' },
      { en: 'The web server runs special <b>serving software</b>. To build the answer it works with its <b>database</b>.', ar: 'الـ web server شغال عليه <b>serving software</b> مخصوص، وعشان يجهز الرد بيتعامل مع الـ <b>database</b> بتاعته.' },
      { en: 'The server sends the <b>response</b>: it “serves” the HTML pages and the files associated with them back to the client.', ar: 'الـ server بيبعت الـ <b>response</b>، يعني بيعمل “serve” للـ HTML pages والـ files المرتبطة بيها ويرجعها للـ client.' },
      { en: 'The server computer is <b>secured</b>: only authorized people can access it to make changes to the data.', ar: 'كمبيوتر الـ server <b>متأمّن</b>، ومحدش يقدر يدخل يغيّر في الـ data غير الناس الـ authorized.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    return html`<${Fig}><div className="fig-stage"><div className="wbv1-chain">
      <div className=${'wbv1-node' + (i === 0 || i === 3 ? ' on' : '')}><b>Client</b><small>Web Browser</small></div>
      <div className="wbv1-link"><span className=${i === 1 ? 'on' : ''}>▼ Request</span><span className=${i === 3 ? 'on' : ''}>▲ Response</span></div>
      <div className=${'wbv1-node' + (i >= 1 && i !== 3 ? ' on' : '')}><b>Web Server ${i === 4 ? '🔒' : ''}</b><small>${i === 4 ? 'only authorized people can change data' : 'serving software'}</small></div>
      <div className="wbv1-link"><span className=${i === 2 ? 'on' : ''}>⇅</span></div>
      <div className=${'wbv1-node' + (i === 2 ? ' on' : '')} style=${{ borderRadius: '50% / 18px' }}><b>Database</b></div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [4.2]–[4.5] page 7 figure “Web Architecture”, filled by sorting the client-side and server-side technologies ── */
  const TECH = [['PHP', 's'], ['HTML / XHTML', 'c'], ['JSP', 's'], ['CSS', 'c'], ['ASP.NET', 's'], ['JavaScript / VBScript', 'c'], ['Python', 's'], ['ASP', 's']];
  const LONG = { JSP: 'Java Server Pages', ASP: 'Active Server Pages', 'ASP.NET': 'next generation of ASP', CSS: 'Cascading Style Sheets', 'HTML / XHTML': 'Extensible HyperText Markup Language', 'JavaScript / VBScript': 'client-side scripting' };
  function L1Arch({ ar }) {
    const [n, setN] = useState(0), [shake, setShake] = useState(0), [msg, setMsg] = useState(null);
    const placed = TECH.slice(0, n), cur = TECH[n];
    const pick = side => {
      if (!cur) return;
      if (side === cur[1]) { setMsg({ ok: true, t: cur }); setN(n + 1); }
      else { setMsg({ ok: false, t: cur }); setShake(s => s + 1); }
    };
    const chip = ([t]) => html`<span key=${t}>${t}</span>`;
    let en, a;
    if (!msg) { en = '<b>Web Architecture</b>: browsers on the client side, the web server on the server side. Sort each technology to its side to fill the figure.'; a = 'الـ <b>Web Architecture</b> فيها الـ browsers في ناحية الـ client، والـ web server في ناحية الـ server. حط كل technology في ناحيتها عشان الرسمة تكمل.'; }
    else {
      const [t, s] = msg.t, side = s === 'c' ? 'client-side' : 'server-side', sideA = s === 'c' ? 'الـ client-side' : 'الـ server-side', l = LONG[t] ? ` (${LONG[t]})` : '';
      en = (msg.ok ? '✓ ' : '✗ Not that side. ') + `<b>${esc(t)}</b>${l} is a <b>${side}</b> technology` + (s === 'c' ? ': it runs in the browser on the user’s machine.' : ': it runs on the web server.');
      a = (msg.ok ? 'صح ✓ ' : 'غلط ✗ ') + `الـ ${T(t)} ده technology من ناحية <b>${sideA}</b>` + (s === 'c' ? '، يعني بيشتغل في الـ browser على جهاز الـ user.' : '، يعني بيشتغل على الـ web server.');
      if (!cur) { en += ' All sorted: the figure is complete.'; a += ' كده كله اترتب والرسمة كملت.'; }
    }
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv1-arch">
        <span></span><div className="wbv1-brow">${['Internet Explorer', 'Chrome', 'Firefox', 'Opera', 'Safari'].map(b => html`<span key=${b}>${b}</span>`)}</div>
        <div className="wbv1-side">Client</div>
        <div><div className="wbv1-layer">Web Browser</div><div className="wbv1-techs">${placed.filter(t => t[1] === 'c').map(chip)}${!placed.some(t => t[1] === 'c') && html`<em>client-side technologies</em>`}</div></div>
        <div className="wbv1-dash"></div>
        <div className="wbv1-side">Server-side</div>
        <div><div className="wbv1-layer">Web Server</div><div className="wbv1-techs">${placed.filter(t => t[1] === 's').map(chip)}${!placed.some(t => t[1] === 's') && html`<em>server-side technologies</em>`}</div></div>
      </div>
      ${cur ? html`<div className=${'wbv1-card' + (shake % 2 ? ' shake' : '')} key=${'c' + shake}><div className="big">${cur[0]}</div><div className="row">
          <button className="fig-btn" onClick=${() => pick('c')}>Client side</button><button className="fig-btn" onClick=${() => pick('s')}>Server side</button></div></div>`
        : html`<p className="wbv1-score">All ${TECH.length} technologies sorted.</p>`}
      </div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="wbv1-score" style=${{ margin: 0 }}>${n} / ${TECH.length}</span><span className="grow"></span>
        <button className="fig-btn" onClick=${() => { setN(TECH.length); setMsg(null); }} disabled=${!cur}>Show all</button>
        <button className="fig-btn" onClick=${() => { setN(0); setMsg(null); }}>↻ Start over</button></div><//>`;
  }

  /* ── [5] pages 7–8: the 5 steps of how the web works (browser, DNS, web server through the Internet) ── */
  function WebSteps({ url, found, ar }) {
    const hm = url.match(/^[a-z]+:\/\/([^\/:?#\s]+)/i), host = hm ? hm[1] : null;
    const steps = [
      { on: 0, m: null, en: `<b>Step 1</b>: the user enters the URL <code>${esc(url)}</code> in the address bar of the web browser.`, ar: `<b>الخطوة 1</b>: الـ user بيكتب الـ URL في الـ address bar بتاع الـ web browser:<br><span class="ltr">${esc(url)}</span>` },
      { on: 1, m: ['Browser → DNS', `What is the IP address of ${host}?`], en: `<b>Step 2</b>: the browser asks the <b>Domain Name Server (DNS)</b> for the IP address corresponding to <code>${esc(host)}</code>.`, ar: `<b>الخطوة 2</b>: الـ browser بيسأل الـ <b>Domain Name Server (DNS)</b> عن الـ IP address بتاع ${T(host)}.` },
      { on: 2, m: ['DNS → Browser, then Browser → Web server', `IP address of ${host} ✓, then an HTTP request for the page`], en: '<b>Step 3</b>: after receiving the IP address (an identifying number associated with a specific computer or network), the browser sends the request for the page to the web server using <b>HTTP</b>, which specifies how browser and server communicate.', ar: '<b>الخطوة 3</b>: بعد ما ياخد الـ IP address (رقم تعريفي مربوط بكمبيوتر أو network معينة)، الـ browser بيبعت request للصفحة للـ web server باستخدام الـ <b>HTTP</b>، اللي بيحدد الـ browser والـ server بيتكلموا إزاي.' },
      found
        ? { on: 2, m: ['Web server → Browser', 'the web page (HTML file); connection closed'], en: '<b>Step 4</b>: the web server receives the request and searches for the page. It is found, so it returns it to the browser and closes the HTTP connection.', ar: '<b>الخطوة 4</b>: الـ web server بيستقبل الـ request ويدوّر على الصفحة، ولقاها، فبيرجعها للـ browser ويقفل الـ HTTP connection.' }
        : { on: 2, m: ['Web server → Browser', '404: the requested file is missing'], en: '<b>Step 4</b>: the web server searches for the page and does <b>not</b> find it: a missing file gives the <b>404</b> HTTP error instead of the page.', ar: '<b>الخطوة 4</b>: الـ web server بيدوّر على الصفحة و<b>مش</b> لاقيها، والـ file الناقص بيطلّع الـ error رقم <b>404</b> بدل الصفحة.' },
      found
        ? { on: 0, m: null, en: '<b>Step 5</b>: the browser receives the web page, interprets it and displays its contents in the browser window.', ar: '<b>الخطوة 5</b>: الـ browser بيستقبل الـ web page، يعملها interpret ويعرض محتواها في الـ window.' }
        : { on: 0, m: null, en: '<b>Step 5</b>: the browser receives the 404 answer and displays it instead of the page.', ar: '<b>الخطوة 5</b>: الـ browser بيستقبل رد الـ 404 ويعرضه بدل الصفحة.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    if (!host) return html`<p className="wbv1-err">Write a full URL like http://www.tutorialspoint.com</p><${Cap} en="Write the URL with its protocol, like http://www.tutorialspoint.com" ar=${'اكتب الـ URL بالـ protocol بتاعه، زي ' + T('http://www.tutorialspoint.com')} showAr=${ar} />`;
    const s = steps[i];
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="wbv1-trio">
        ${[['Web browser', 'client'], ['DNS', 'Domain Name Server'], ['Web server', 'stores the page']].map(([t, d], j) => html`<div key=${j} className=${'wbv1-node' + (s.on === j || (i === 2 && j === 1) ? ' on' : '')}><b>${t}</b><small>${d}</small></div>`)}
      </div>
      <p className="wbv1-cloudtag">every message travels through the Internet</p>
      <div className=${'wbv1-msg' + (s.m ? '' : ' none')} key=${'m' + i}>${s.m ? html`<span className="dir">${s.m[0]}</span><span className="wbv1-new" style=${{ display: 'block' }}>${s.m[1]}</span>` : 'no message on the way'}</div>
      <div className=${'wbv1-win' + (i === 4 ? ' on' : '')}><div className=${'wbv1-addr' + (i === 0 ? ' on' : '')}>${url}</div>
        <div className="wbv1-page">${i < 4 ? html`<span style=${{ color: 'var(--graphite)' }}>${i === 0 ? 'press Enter…' : 'waiting for the page…'}</span>`
          : found ? html`<div className="wbv1-new"><b>${host}</b><div className="ln"></div><div className="ln" style=${{ width: '70%' }}></div></div>` : html`<div className="wbv1-new wbv1-404">404 Not Found</div>`}</div></div>
    </div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function L1WebWorks({ ar }) {
    const EX = 'http://www.tutorialspoint.com';
    const [draft, setDraft] = useState(EX), [url, setUrl] = useState(EX), [found, setFound] = useState(true);
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: 6 }}>
      <${Chips} label="Example" items=${[['ex', 'Example from the notes']]} sel=${url === EX && found ? 'ex' : ''} on=${() => { setDraft(EX); setUrl(EX); setFound(true); }} />
      <div className="wbv1-own"><small>Try your own URL (press Go)</small>
        <div style=${{ display: 'flex', gap: '6px' }}><textarea className="wbv1-in wbv1-ta" rows="2" value=${draft} onInput=${e => setDraft(e.target.value.replace(/\n/g, ''))} onKeyDown=${e => { if (e.key === 'Enter') { e.preventDefault(); setUrl(draft.trim()); } }} aria-label="URL" spellCheck="false"></textarea>
          <button className="fig-btn solid" onClick=${() => setUrl(draft.trim())}>Go</button></div></div>
      <${Chips} label="Page on the server" items=${[['y', 'Page exists'], ['n', 'Page missing']]} sel=${found ? 'y' : 'n'} on=${k => setFound(k === 'y')} /></div>
      <${WebSteps} key=${url + found} url=${url} found=${found} ar=${ar} /><//>`;
  }

  /* ── [6.0] page 8 figure: the recommended site structure, folder by folder ── */
  function L1SiteTree({ ar }) {
    const R = [[0, 'rt', 'Website Root', 0], [1, 'fd', 'images', 2], [2, 'f', 'logo.png', 2], [2, 'f', 'kirupa.jpeg', 2], [2, 'f', 'dancing_banana.gif', 2], [1, 'fd', 'scripts', 3], [2, 'f', 'animation.js', 3], [1, 'fd', 'styles', 3], [2, 'f', 'default.css', 3], [2, 'f', 'theme.css', 3], [1, 'f', 'index.html', 1], [1, 'f', 'icon.png', 4]];
    const steps = [
      { en: '(1) A <b>root folder</b> that contains the whole web site: HTML files, documents and images in a single master folder.', ar: '(1) الـ <b>root folder</b> اللي فيه الـ web site كله، يعني الـ HTML files والـ documents والـ images في folder رئيسي واحد.' },
      { en: '(2) A web page named <b>index.html</b> (or index.htm) inside the root folder: the default homepage of the site.', ar: '(2) صفحة اسمها <b>index.html</b> (أو index.htm) جوه الـ root folder، ودي الـ homepage الـ default بتاعة الـ site.' },
      { en: '(3) Maybe an <b>images</b> folder for the graphics, illustrations, images and photographs used in the pages.', ar: '(3) ممكن folder اسمه <b>images</b> فيه الـ graphics والـ illustrations والصور اللي الصفحات بتستخدمها.' },
      { en: '(4) <b>Additional folders</b> for organizing the content, like <b>scripts</b> and <b>styles</b> in the slide’s figure.', ar: '(4) فيه <b>folders زيادة</b> عشان تنظّم المحتوى، زي <b>scripts</b> و <b>styles</b> في رسمة الـ slide.' },
      { en: 'The whole structure from the slide’s figure: a consistent and simple organization (icon.png also sits in the root).', ar: 'ده الهيكل كله زي رسمة الـ slide، تنظيم ثابت وبسيط (والـ icon.png كمان في الـ root).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    return html`<${Fig}><div className="fig-stage"><div className="wbv1-tree">${R.map(([d, ic, t, s], j) => html`<div key=${j} className=${'wbv1-tr ' + pop(i >= s) + (s === i ? ' cur' : '')} style=${{ paddingLeft: 4 + d * 20 + 'px' }}>
        <i className=${'wbv1-ico ' + ic}></i><span>${t}</span>${t === 'index.html' && html`<small>default homepage</small>`}</div>`)}</div></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [6.1] page 9: the four types of hyperlink, working inside a small page ── */
  function L1Links({ ar }) {
    const [pg, setPg] = useState('home'), [mail, setMail] = useState(false), [flash, setFlash] = useState(null), [hl, setHl] = useState(false), [last, setLast] = useState(null);
    const box = useRef(null), sec = useRef(null);
    const say = k => setLast(k);
    const go = (p, k) => { setPg(p); setMail(false); say(k); if (box.current) box.current.scrollTop = 0; };
    const jump = () => { setMail(false); say('book'); setHl(true); if (box.current && sec.current) box.current.scrollTop = sec.current.offsetTop - 8; setTimeout(() => setHl(false), 1500); };
    const show = k => { setPg('home'); setMail(false); setFlash(k); setLast(null); if (box.current) box.current.scrollTop = 0; setTimeout(() => setFlash(f => (f === k ? null : f)), 1600); };
    const C = {
      text: ['A <b>text hyperlink</b> uses a word or phrase to take visitors to another page, file or document. Text links are usually underlined and in a different colour.', 'الـ <b>Text hyperlink</b> بيستخدم كلمة أو جملة عشان يودّي الزائر لصفحة أو file أو document تاني. وغالبًا بيبقى عليه خط ولونه مختلف.'],
      img: ['An <b>image hyperlink</b> uses an image to take visitors to another page, file or document.', 'الـ <b>Image hyperlink</b> بيستخدم صورة عشان يودّي الزائر لصفحة أو file أو document تاني.'],
      book: ['A <b>bookmark hyperlink</b> uses text or an image to take visitors to another part of the <b>same</b> web page (here, the Contact part).', 'الـ <b>Bookmark hyperlink</b> بيستخدم text أو صورة عشان يودّي الزائر لجزء تاني في <b>نفس</b> الـ web page (هنا جزء الـ Contact).'],
      mail: ['An <b>e-mail hyperlink</b> allows visitors to send an e-mail message to the displayed e-mail address.', 'الـ <b>E-mail hyperlink</b> بيخلي الزائر يبعت e-mail للعنوان اللي ظاهر.']
    };
    const en = last ? C[last][0] : 'Hyperlinks are the primary method used to navigate between pages and web sites. Tap the links in the page, or a type below to find it.';
    const a = last ? C[last][1] : 'الـ Hyperlinks هي الطريقة الأساسية للتنقل بين الصفحات والـ web sites. دوس على الـ links اللي في الصفحة، أو على نوع تحت عشان تلاقيه.';
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv1-win" style=${{ marginTop: 0 }}><div className="wbv1-addr">${pg === 'home' ? 'index.html' : pg === 'course' ? 'course.html' : 'photos.html'}</div>
        <div className="wbv1-lpage" ref=${box}>
          ${pg === 'home' ? html`<div>
              <h4>Home</h4>
              <p>See the <button className=${'wbv1-a' + (flash === 'text' ? ' flash' : '')} onClick=${() => go('course', 'text')}>course page</button> for this term.</p>
              <p><span className=${'wbv1-imgl' + (flash === 'img' ? ' flash' : '')} role="link" tabIndex="0" onClick=${() => go('photos', 'img')}>image link</span></p>
              <p><button className=${'wbv1-a' + (flash === 'book' ? ' flash' : '')} onClick=${jump}>Jump to Contact</button></p>
              <div ref=${sec} className=${'wbv1-sec' + (hl ? ' hl' : '')}><h4>Contact</h4><p>Mail us: <button className=${'wbv1-a' + (flash === 'mail' ? ' flash' : '')} onClick=${() => { setMail(true); say('mail'); }}>info@example.com</button></p></div>
            </div>`
            : html`<div className="wbv1-new"><h4>${pg === 'course' ? 'Course page' : 'Photos page'}</h4><p>${pg === 'course' ? 'Another page, reached by a text link.' : 'Another page, reached by an image link.'}</p>
              <p><button className="wbv1-a" onClick=${() => { setPg('home'); setLast(null); }}>← back to Home</button></p></div>`}
          ${mail && html`<div className="wbv1-mail"><div><b>New message</b></div><div>To: info@example.com</div><div>Subject:</div>
            <p><button className="fig-btn" onClick=${() => setMail(false)}>Close</button></p></div>`}
        </div></div>
      <p className="wbv1-hint" style=${{ marginTop: '10px' }}>Find each type in the page:</p>
      <${Chips} label="Hyperlink types" items=${[['text', 'Text'], ['img', 'Image'], ['book', 'Bookmark'], ['mail', 'E-mail']]} sel=${flash} on=${show} /></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [6.2] page 9 figure: the browser reads index.htm and downloads the files it only references ── */
  function L1Display({ ar }) {
    const steps = [
      { en: 'On the server: the <b>root folder</b> holds <b>index.htm</b> and an <b>images</b> folder with <b>banner.jpg</b> and <b>icon.gif</b>.', ar: 'على الـ server فيه <b>root folder</b> جواه <b>index.htm</b> و folder اسمه <b>images</b> فيه <b>banner.jpg</b> و <b>icon.gif</b>.' },
      { en: 'When the page is opened, the browser <b>reads and interprets the HTML file</b> index.htm. It is a text file: the images appear in it only as <b>references</b> (highlighted).', ar: 'لما الصفحة تتفتح، الـ browser <b>بيقرا الـ HTML file ويعمله interpret</b>. ده text file، والصور موجودة فيه كـ <b>references</b> بس (المتعلّم عليها).' },
      { en: 'It <b>formats the page for display</b>: the text is shown, the images are still empty places.', ar: 'بعدين <b>بيظبط شكل الصفحة للعرض</b>، فالـ text بيظهر، والصور لسه أماكن فاضية.' },
      { en: 'For the reference to <b>images/banner.jpg</b>, the external file is <b>downloaded from the server</b> and displayed in the window.', ar: 'عشان الـ reference بتاع <b><bdi dir="ltr">images/banner.jpg</bdi></b>، الـ file الخارجي ده <b>بينزل من الـ server</b> ويتعرض في الـ window.' },
      { en: 'Same for <b>images/icon.gif</b>: downloaded and displayed. The page is complete.', ar: 'ونفس الكلام مع <b><bdi dir="ltr">images/icon.gif</bdi></b>، بينزل ويتعرض، والصفحة كده كملت.' },
      { en: 'HTML files are text files that only contain <b>references</b> to external files; you do <b>not “embed”</b> the images or multimedia into the web page.', ar: 'الـ HTML files عبارة عن text files فيها <b>references</b> بس للـ files الخارجية، يعني إنت <b>مش بتعمل “embed”</b> للصور أو الـ multimedia جوه الـ web page.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2500);
    const src = ['<img src="images/banner.jpg">', '<h3>Welcome to the OBE 153', 'Homepage! We hope that you', 'will enjoy this class.</h3>', '<img src="images/icon.gif">', '<p>...</p>'];
    const refOn = j => (j === 0 && (i === 1 || i === 3 || i === 5)) || (j === 4 && (i === 1 || i === 4 || i === 5));
    const tree = [[0, 'fd', 'root folder', i === 0], [1, 'f', 'index.htm', i === 1], [1, 'fd', 'images', i === 0], [2, 'f', 'banner.jpg', i === 3], [2, 'f', 'icon.gif', i === 4]];
    return html`<${Fig}><div className="fig-stage"><div className="wbv1-disp">
      <div>
        <div className="wbv1-tree" style=${{ maxWidth: 'none' }}>${tree.map(([d, ic, t, on], j) => html`<div key=${j} className=${'wbv1-tr' + (on ? ' cur' : '')} style=${{ paddingLeft: 4 + d * 18 + 'px' }}><i className=${'wbv1-ico ' + ic}></i><span>${t}</span>${(j === 3 && i === 3) || (j === 4 && i === 4) ? html`<small className="wbv1-new">↓ downloading</small>` : ''}</div>`)}</div>
        <div className=${pop(i >= 1)} style=${{ marginTop: '6px' }}><pre className="wbv1-code" aria-label="index.htm">${src.map((l, j) => html`<span key=${j} className=${'ln' + (refOn(j) ? ' on' : '')}>${l}</span>`)}</pre></div>
      </div>
      <div><div className="wbv1-dl">In Browser… ▼</div>
        <div className="wbv1-win" style=${{ marginTop: '4px' }}><div className="wbv1-addr">index.htm</div>
          <div className="wbv1-page" style=${{ minHeight: '120px' }}>${i < 2 ? html`<span style=${{ color: 'var(--graphite)' }}>${i === 1 ? 'reading index.htm…' : ' '}</span>` : html`<div>
            ${i >= 3 ? html`<div className="wbv1-banner wbv1-new">OBE 153<small>Management of Human Resources</small></div>` : html`<div className="wbv1-hole">images/banner.jpg</div>`}
            <p style=${{ fontWeight: 700, margin: '6px 0' }}>Welcome to the OBE 153 Homepage! We hope that you will enjoy this class.</p>
            <div style=${{ display: 'flex', alignItems: 'center' }}>${i >= 4 ? html`<span className="wbv1-icon wbv1-new">icon</span>` : html`<span className="wbv1-hole" style=${{ marginRight: '6px' }}>icon.gif</span>`}<span style=${{ color: 'var(--graphite)' }}>...</span></div></div>`}</div></div></div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [8.2] page 10: the standard link colours, live (blue link, violet visited, red active) ── */
  function L1LinkColors({ ar }) {
    const [vis, setVis] = useState({}), [act, setAct] = useState(null), [last, setLast] = useState(null);
    const L = ['Lecture 1: Introduction', 'Lecture 2: HTML', 'Lecture 3: HTML'];
    const down = j => { setAct(j); setLast('a'); };
    const up = j => { if (act === j) { setVis(v => Object.assign({}, v, { [j]: true })); setLast('v'); } setAct(null); };
    const msg = {
      null: ['Standard colors should be used, since colors affect usability. Press and hold a link, then let go.', 'لازم تستخدم الألوان الـ standard، لأن الألوان بتأثر على الـ usability. دوس على link وسيبك ضاغط، وبعدين شيل صباعك.'],
      a: ['While you press it, the link is <b>active</b>: <b>red</b>.', 'وإنت ضاغط على الـ link بيبقى <b>active</b> ولونه <b>أحمر (red)</b>.'],
      v: ['Once followed, the link is <b>visited</b>: <b>violet</b>. Links not yet followed stay <b>blue</b>. Keep these standard colors, or you risk confusing the visitors.', 'بعد ما تفتحه بيبقى <b>visited</b> ولونه <b>بنفسجي (violet)</b>، والـ links اللي لسه ماتفتحتش بتفضل <b>زرقا (blue)</b>. خلي الألوان الـ standard دي، وإلا هتلخبط الزوار.']
    }[last];
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv1-white">${L.map((t, j) => html`<p key=${j}><button className=${act === j ? 'a' : vis[j] ? 'v' : ''}
          onPointerDown=${() => down(j)} onPointerUp=${() => up(j)} onPointerLeave=${() => act === j && setAct(null)}
          onKeyDown=${e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); down(j); } }} onKeyUp=${e => { if (e.key === 'Enter' || e.key === ' ') up(j); }}>${t}</button></p>`)}</div>
      <div className="wbv1-key"><span><i style=${{ background: '#0000EE' }}></i>link: blue</span><span><i style=${{ background: '#551A8B' }}></i>visited: violet</span><span><i style=${{ background: '#EE0000' }}></i>active: red</span></div></div>
      <${Cap} en=${msg[0]} ar=${msg[1]} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { setVis({}); setLast(null); }}>↻ Forget visited</button></div><//>`;
  }

  /* ── [9.3] pages 11–12: spot the four symptoms of a phishing email ── */
  function L1Phish({ ar }) {
    const [found, setFound] = useState({}), [last, setLast] = useState(null);
    const S = {
      spoof: ['<b>Spoofing a popular company</b>: the logo and name look like your bank, but the sender address is not the bank’s. Such graphics connect to fake websites.', 'الـ <b>Spoofing</b> لشركة معروفة، يعني الـ logo والاسم شكلهم زي البنك بتاعك، بس عنوان الـ sender مش بتاع البنك. والرسومات دي بتوديك لـ websites مزيفة.'],
      threat: ['<b>Threats</b>: “your account will be closed if you do not respond”. The pressure is meant to make you act without thinking.', 'فيه <b>تهديد (Threats)</b> زي إن الـ account بتاعك هيتقفل لو مارديتش. الضغط ده عشان تتصرف من غير ما تفكر.'],
      spell: ['<b>Spelling and bad grammar</b>: “Dear costumer, we has detected…”. Ignore such emails, they can be spam.', 'فيه <b>أخطاء في الـ spelling والـ grammar</b> زي “Dear costumer, we has detected”. تجاهل الإيميلات دي، ممكن تبقى spam.'],
      link: ['<b>A suspicious link</b>: the text says your bank, but it leads to another site, a fake look-alike that asks for your username, password and credit card details. Do not click links in suspicious emails.', 'فيه <b>link مشبوه</b>، الكلام بيقول البنك بتاعك بس بيوديك لـ site تاني مزيف شبه الأصلي، بيطلب الـ username والـ password وبيانات الـ credit card. ماتدوسش على links في إيميلات مشبوهة.']
    };
    const n = Object.keys(found).length;
    const hit = k => { setFound(f => Object.assign({}, f, { [k]: true })); setLast(k); };
    const spot = (k, kids) => html`<span className=${'wbv1-spot' + (found[k] ? ' found' : '')} role="button" tabIndex="0" onClick=${() => hit(k)} onKeyDown=${e => e.key === 'Enter' && hit(k)}>${kids}</span>`;
    const en = last ? `${S[last][0]} (${n} of 4 found)` : 'Email phishing: emails claiming to be from a legitimate enterprise to steal sensitive information. Tap the 4 symptoms in this email.';
    const a = last ? `${S[last][1]} (لقيت ${n} من 4)` : 'الـ Email phishing هو إيميلات بتدّعي إنها من شركة حقيقية عشان تسرق معلومات حساسة. دوس على الـ 4 symptoms اللي في الإيميل ده.';
    return html`<${Fig}><div className="fig-stage"><div className="wbv1-mailbox">
      <div className="hd">
        <div>${spot('spoof', html`<span className="wbv1-logo">YOUR BANK</span> <span>from</span> security@yourbank-alerts.co`)}</div>
        <div><span>Subject:</span> ${spot('threat', 'Your account will be closed if you do not respond')}</div></div>
      <div className="bd">
        <p>${spot('spell', 'Dear costumer, we has detected a problem with you account.')}</p>
        <p>Confirm your username, password and credit card details today:</p>
        <p>${spot('link', html`<span className="wbv1-fakel">www.yourbank.com/login</span>${found.link && html`<span className="wbv1-tip">really goes to: http://yourbank.verify-login.xyz</span>`}`)}</p>
      </div></div>
      <p className="wbv1-score">${n} of 4 symptoms found${n === 4 ? ': this is a phishing email.' : ''}</p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { setFound({}); setLast(null); }}>↻ Start over</button></div><//>`;
  }

  /* ── [9.4] pages 12–13: security considerations tried hands-on (passwords, error messages, SQL injection, XSS) ── */
  function PwTab({ ar }) {
    const [pw, setPw] = useState('hello');
    const R = [['at least 8 characters', 'على الأقل 8 حروف', pw.length >= 8], ['an upper case letter', 'حرف capital', /[A-Z]/.test(pw)], ['a lower case letter', 'حرف small', /[a-z]/.test(pw)], ['a special character', 'رمز (special character)', /[^A-Za-z0-9]/.test(pw)]];
    const ok = R.every(r => r[2]), miss = R.filter(r => !r[2]);
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}>
      <${Chips} mono=${true} label="Examples" items=${[['hello', 'hello'], ['Hello123', 'Hello123'], ['Hello#2024', 'Hello#2024']]} sel=${pw} on=${setPw} />
      <div className="wbv1-own"><small>Try your own password</small><input className="wbv1-in" value=${pw} onInput=${e => setPw(e.target.value)} aria-label="Password" spellCheck="false" /></div>
      <ul className="wbv1-checks">${R.map(([t, , g]) => html`<li key=${t} className=${g ? 'ok' : 'no'}><i>${g ? '✓' : '✗'}</i>${t}</li>`)}</ul>
      <p className=${'wbv1-verdict ' + (ok ? 'ok' : 'no')}>${ok ? 'Meets the requirements' : 'Too weak'}</p></div>
      <${Cap} en=${'<b>Passwords</b>: enforce a minimum of eight characters, including upper case, lower case and a special character. ' + (ok ? 'This one passes all four.' : 'Missing: ' + miss.map(r => r[0]).join(', ') + '.')}
        ar=${'الـ <b>Passwords</b> لازم يكون ليها شروط، على الأقل 8 حروف، وفيها حرف capital وحرف small ورمز. ' + (ok ? 'ودي عدّت الـ 4 شروط.' : 'الناقص هنا ' + miss.map(r => r[1]).join(' و ') + '.')} showAr=${ar} />`;
  }
  function ErrTab({ ar }) {
    const [u, setU] = useState('sara'), [p, setP] = useState('12345'), [safe, setSafe] = useState(false), [res, setRes] = useState(null);
    const login = () => {
      const known = u.trim().toLowerCase() === 'sara', good = known && p === 'Web#2024';
      setRes(good ? { ok: true, t: 'Welcome, sara!' } : safe ? { ok: false, t: 'Username or password is incorrect.' } : { ok: false, t: known ? 'Wrong password for user “sara”.' : 'No user named “' + u.trim() + '”.', leak: known });
    };
    let en, a;
    if (!res) { en = '<b>Error messages</b>: be careful how much information they give. The site has one user, <b>sara</b>. Try a wrong login with each message style.'; a = 'الـ <b>Error messages</b> لازم تاخد بالك هي بتدّي معلومات قد إيه. الـ site فيه user واحد اسمه ' + T('sara') + '. جرّب login غلط بكل نوع رسالة.'; }
    else if (res.ok) { en = 'Correct username and password: logged in.'; a = 'الـ username والـ password صح، فدخلت.'; }
    else if (safe) { en = '✓ The message does not let the user know which field is incorrect, so a hacker learns nothing about which usernames exist.'; a = 'صح ✓ الرسالة مابتقولش أنهي field غلط، فالـ hacker مش بيعرف أي username موجود.'; }
    else { en = '✗ This message tells which field is wrong' + (res.leak ? ': now a hacker knows the username <b>sara</b> exists and only has to guess the password.' : ': a hacker can try names until the message changes.'); a = 'غلط ✗ الرسالة دي بتقول أنهي field غلط' + (res.leak ? '، فالـ hacker عرف إن الـ username ' + T('sara') + ' موجود، وفاضله يخمّن الـ password بس.' : '، فالـ hacker يقدر يجرّب أسماء لحد ما الرسالة تتغير.'); }
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}>
      <${Chips} label="Message style" items=${[['bad', 'Reveals the field'], ['good', 'Does not reveal']]} sel=${safe ? 'good' : 'bad'} on=${k => { setSafe(k === 'good'); setRes(null); }} />
      <div className="wbv1-form"><label>Username<input className="wbv1-in" value=${u} onInput=${e => { setU(e.target.value); setRes(null); }} spellCheck="false" /></label>
        <label>Password<input className="wbv1-in" value=${p} onInput=${e => { setP(e.target.value); setRes(null); }} spellCheck="false" /></label>
        <button className="fig-btn solid" onClick=${login}>Log in</button></div>
      ${res && html`<div className=${'wbv1-alert wbv1-new' + (res.ok ? ' ok' : '')}>${res.t}</div>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />`;
  }
  function SqlTab({ ar }) {
    const EX = [['sara', 'sara'], ["x' OR '1'='1", "x' OR '1'='1"], ["x'; DROP TABLE users; --", 'DROP TABLE']];
    const [v, setV] = useState('sara');
    const U = [['sara', 'sara@mail.com'], ['omar', 'omar@mail.com'], ['mona', 'mona@mail.com']];
    const drop = /drop\s+table/i.test(v), all = !drop && /'\s*or\s*'?(\w+)'?\s*=\s*'?\1/i.test(v), rogue = v.includes("'");
    const rows = drop ? null : all ? U.map(r => r[0]) : rogue ? [] : U.filter(r => r[0] === v.trim().toLowerCase()).map(r => r[0]);
    let en, a;
    if (drop) { en = '✗ The rogue code ends the query and adds a second command: the whole <b>users</b> table is deleted.'; a = 'غلط ✗ الـ rogue code قفل الـ query وزوّد أمر تاني، فجدول الـ ' + T('users') + ' كله اتمسح.'; }
    else if (all) { en = '✗ The rogue code changes the query’s condition so it is always true: the hacker <b>gets information</b> of every user.'; a = 'غلط ✗ الـ rogue code غيّر شرط الـ query وخلاه دايمًا true، فالـ hacker <b>خد معلومات</b> كل الـ users.'; }
    else if (rogue) { en = 'The quote in the input breaks out of the query’s text: whatever follows becomes part of the query itself.'; a = 'الـ quote اللي في الـ input بيطلع برّه الـ text بتاع الـ query، وأي حاجة بعده بتبقى جزء من الـ query نفسها.'; }
    else { en = '<b>SQL injection</b>: the site builds its database query from what the user types. A normal name returns only that user’s row. Now try the other inputs.'; a = 'الـ <b>SQL injection</b>: الـ site بيبني الـ query بتاعة الـ database من اللي الـ user بيكتبه. الاسم العادي بيرجّع الـ row بتاع الـ user ده بس. جرّب الـ inputs التانية.'; }
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}>
      <${Chips} mono=${true} label="Input" items=${EX.map(([x, t]) => [x, t])} sel=${v} on=${setV} />
      <div className="wbv1-own"><small>The name typed in the login box</small><input className="wbv1-in" value=${v} onInput=${e => setV(e.target.value)} aria-label="Name" spellCheck="false" /></div>
      <pre className="wbv1-code" style=${{ maxWidth: '340px', margin: '0 auto' }}>${'SELECT * FROM users\nWHERE name = \''}<mark>${v}</mark>${"'"}</pre>
      ${rows ? html`<table className="wbv1-users"><thead><tr><th>name</th><th>email</th></tr></thead><tbody>${U.map(([nm, em]) => html`<tr key=${nm} className=${rows.includes(nm) ? (all ? 'got' : 'ok') : ''}><td>${nm}</td><td>${em}</td></tr>`)}</tbody></table>`
        : html`<div className="wbv1-gone wbv1-new">table users deleted</div>`}
      <p className="wbv1-score">${rows ? rows.length + ' row' + (rows.length === 1 ? '' : 's') + ' returned' : 'no data left'}</p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />`;
  }
  function XssTab({ ar }) {
    const EX = [['Nice lecture!', 'plain text'], ['<b>Nice</b> lecture!', 'with <b>'], ['<script>steal(cookie)</script>', 'with <script>']];
    const [v, setV] = useState(EX[2][0]), [mode, setMode] = useState('raw');
    const hasScript = /<script[\s>]/i.test(v), strip = v.replace(/<script[\s\S]*?(<\/script>|$)/gi, '').replace(/<[^>]*>/g, '');
    const asIs = () => {
      const parts = []; const re = /<b>([\s\S]*?)<\/b>/gi; let m, at = 0, src = v.replace(/<script[\s\S]*?(<\/script>|$)/gi, '');
      while ((m = re.exec(src))) { parts.push(src.slice(at, m.index).replace(/<[^>]*>/g, '')); parts.push(html`<b key=${m.index}>${m[1].replace(/<[^>]*>/g, '')}</b>`); at = m.index + m[0].length; }
      parts.push(src.slice(at).replace(/<[^>]*>/g, ''));
      return html`<span>${parts}</span>${hasScript && html`<span className="wbv1-run">⚠ the script runs in every visitor’s browser</span>`}`;
    };
    const out = mode === 'raw' ? asIs() : mode === 'enc' ? html`<span style=${{ fontFamily: 'var(--mono)' }}>${v}</span>` : html`<span>${strip}</span>`;
    let en, a;
    if (mode === 'raw') { en = hasScript ? '✗ <b>Cross Site Scripting (XSS)</b>: the comment is put into the page as HTML, so the attacker’s client side script is injected into the page and runs for every visitor.' : 'The comment is put into the page as HTML: its tags take effect. With a &lt;script&gt; tag the attacker could inject a client side script.'; a = hasScript ? 'غلط ✗ ده <b>Cross Site Scripting (XSS)</b>، الـ comment اتحط في الصفحة كـ HTML، فالـ client side script بتاع الـ attacker اتحقن في الصفحة وبيشتغل عند كل زائر.' : 'الـ comment اتحط في الصفحة كـ HTML فالـ tags بتاعته اشتغلت. ولو فيه ' + T('<script>') + ' كان الـ attacker يقدر يحقن client side script.'; }
    else if (mode === 'enc') { en = '✓ <b>Encode</b> the submitted data: the tags are shown as plain characters, nothing runs.'; a = 'صح ✓ اعمل <b>encode</b> للـ data اللي اتبعتت، فالـ tags بتظهر كحروف عادية ومفيش حاجة بتشتغل.'; }
    else { en = '✓ <b>Strip out</b> the HTML: the tags are removed, only the text stays.'; a = 'صح ✓ اعمل <b>strip</b> للـ HTML، فالـ tags بتتشال ويفضل الـ text بس.'; }
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}>
      <${Chips} mono=${true} label="Comment" items=${EX.map(([x, t]) => [x, t])} sel=${v} on=${setV} />
      <div className="wbv1-own"><small>A comment submitted through a form</small><input className="wbv1-in" value=${v} onInput=${e => setV(e.target.value)} aria-label="Comment" spellCheck="false" /></div>
      <${Chips} label="The site" items=${[['raw', 'Shows it as is'], ['enc', 'Encodes HTML'], ['strip', 'Strips HTML']]} sel=${mode} on=${setMode} />
      <div className="wbv1-show"><small>The comment as other visitors see it</small><div key=${mode + v}>${out}</div></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />`;
  }
  function L1SecLab({ ar }) {
    const [t, setT] = useState('pw');
    const Tab = { pw: PwTab, err: ErrTab, sql: SqlTab, xss: XssTab }[t];
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: 4 }}>
      <${Chips} label="Security consideration" items=${[['pw', 'Passwords'], ['err', 'Error messages'], ['sql', 'SQL injection'], ['xss', 'XSS']]} sel=${t} on=${setT} /></div>
      <${Tab} key=${t} ar=${ar} /><//>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'wb-l1-services': L1Services, 'wb-l1-proscons': L1ProsCons, 'wb-l1-pagesite': L1PageSite, 'wb-l1-staticdyn': L1StaticDynamic,
    'wb-l1-urlparts': L1UrlParts, 'wb-l1-urlsplit': L1UrlSplit, 'wb-l1-search': L1Search, 'wb-l1-protocols': L1Protocols,
    'wb-l1-csexample': L1CsExample, 'wb-l1-arch': L1Arch, 'wb-l1-webworks': L1WebWorks, 'wb-l1-sitetree': L1SiteTree,
    'wb-l1-links': L1Links, 'wb-l1-display': L1Display, 'wb-l1-linkcolors': L1LinkColors, 'wb-l1-phish': L1Phish, 'wb-l1-seclab': L1SecLab
  });
})();
/* ── part L4 ── */
// Web Programming visuals, Lecture 4 (CSS): the three layers, the three ways to add CSS and their scope, the anatomy of a rule,
// selectors matched live, colors / fonts / sizes and text properties toggled, background properties, the box model,
// the margin / padding / border-width shorthand, position, float, display with Grid and Flexbox, and the navigation bar
// built rule by rule (Lec_6_CSS slides 3 to 20, Lab 6 grid slides). Every label and number comes from the site's notes.
// Demo styles are applied with inline styles on the preview's own elements only, so nothing can leak into the site.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.wbv4 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.wbv4 .fig-btn:disabled{ opacity:.45; cursor:default; }
.wbv4-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.wbv4-chips .fig-btn{ font-size:.8rem; padding:4px 10px; min-height:30px; }
.wbv4-chips .fig-btn.wbv4-m{ font-family:var(--mono); }
.wbv4-lab{ font-size:.75rem; color:var(--graphite); text-align:center; margin:0 0 4px; }
.wbv4-code{ font:.78rem/1.5 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:7px 5px; white-space:pre-wrap; overflow-wrap:anywhere; direction:ltr; text-align:left; color:var(--ink); margin:0; }
.wbv4-code .wbv4-ln{ display:block; border-radius:4px; padding:0 3px; transition:background .4s, opacity .4s; }
.wbv4-code .wbv4-ln.wbv4-on{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.wbv4-code .wbv4-ln.wbv4-dim{ opacity:.4; } .wbv4-code .wbv4-ln.wbv4-hide{ display:none; }
.wbv4-t{ color:var(--fig-k); font-weight:600; } .wbv4-an{ color:var(--pen); } .wbv4-av{ color:var(--ok); } .wbv4-cm{ color:var(--graphite); font-style:italic; }
.wbv4-se{ color:var(--fig-k); font-weight:600; } .wbv4-pr{ color:var(--pen); } .wbv4-va{ color:var(--ok); }
.wbv4-fname{ font:600 .75rem var(--mono); color:var(--graphite); margin:6px 0 2px; direction:ltr; text-align:left; }
.wbv4-two{ display:grid; grid-template-columns:minmax(0,1fr); gap:8px; max-width:560px; margin:0 auto; }
@media (min-width:640px){ .wbv4-two{ grid-template-columns:repeat(2, minmax(0,1fr)); align-items:start; } }
.wbv4-arrow{ text-align:center; color:var(--fig-k); font-size:.8rem; font-weight:600; margin:2px 0; }
/* a browser window: the page inside is a real white web page, like the slides' screenshots */
.wbv4-win{ border:1px solid var(--line); border-radius:8px; overflow:hidden; background:var(--paper-2); transition:box-shadow .4s, opacity .4s; min-width:0; }
.wbv4-win.wbv4-on{ box-shadow:0 0 0 2.5px var(--fig-k); }
.wbv4-tab{ font:.75rem var(--mono); color:var(--ink); padding:3px 8px; border-bottom:1px solid var(--line); overflow-wrap:anywhere; direction:ltr; text-align:left; }
.wbv4-pg{ background:#fff; color:#111; font-family:"Times New Roman", Times, serif; font-size:16px; line-height:1.3; padding:8px 10px; text-align:left; direction:ltr; overflow-wrap:anywhere; transition:background-color .4s; }
.wbv4-pg h1, .wbv4-pg p{ margin:.35em 0; } .wbv4-pg h1{ font-size:1.6em; line-height:1.15; }
.wbv4-pages{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; margin-top:8px; }
.wbv4-pages .wbv4-pg{ font-size:12px; padding:5px 6px; min-height:74px; } .wbv4-pages .wbv4-pg h1{ font-size:15px; } .wbv4-pages .wbv4-pg p{ font-size:12px; }
/* layers */
.wbv4-lay{ display:flex; flex-direction:column; gap:4px; max-width:420px; margin:0 auto 10px; }
.wbv4-lay div{ border:1.5px solid var(--line); border-radius:8px; padding:4px 8px; font-size:.8rem; color:var(--ink); background:var(--paper); display:flex; justify-content:space-between; gap:8px; flex-wrap:wrap; transition:all .4s; opacity:.4; }
.wbv4-lay div b{ font-family:var(--mono); } .wbv4-lay div span{ color:var(--graphite); }
.wbv4-lay div.wbv4-on{ opacity:1; border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
/* rule anatomy */
.wbv4-anat{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; align-items:flex-start; direction:ltr; }
.wbv4-part{ display:flex; flex-direction:column; align-items:center; gap:3px; transition:opacity .4s; }
.wbv4-part > span{ font:600 1rem/1.3 var(--mono); padding:4px 7px; border-radius:6px; border:1.5px solid var(--line); background:var(--paper); color:var(--ink); transition:all .4s; white-space:pre; }
.wbv4-part > small{ font-size:.75rem; color:var(--graphite); min-height:1.2em; }
.wbv4-part.wbv4-on > span{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); }
.wbv4-part.wbv4-off{ opacity:.35; }
.wbv4-cmt{ text-align:center; font:600 .9rem var(--mono); color:var(--graphite); margin-top:12px; direction:ltr; }
/* selectors */
.wbv4-own{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; margin:0 0 10px; font-size:.8rem; }
.wbv4-in{ font:.85rem var(--mono); width:150px; box-sizing:border-box; border:1px solid var(--line); border-radius:6px; padding:5px 8px; background:var(--paper); color:var(--ink); direction:ltr; }
.wbv4-in.wbv4-wide{ width:190px; }
.wbv4-cnt{ text-align:center; font-size:.8rem; color:var(--graphite); margin:6px 0 0; } .wbv4-cnt b{ color:var(--fig-k); }
.fig .wbv4-pg .wbv4-hit{ outline:2px solid var(--fig-k); outline-offset:1px; background:color-mix(in srgb, var(--fig-k) 22%, #fff); border-radius:2px; }
.fig .wbv4-pg .wbv4-may{ outline:2px dashed var(--fig-k); outline-offset:1px; border-radius:2px; }
.fig .wbv4-pg ul{ display:block; gap:0; max-width:none; font-size:inherit; line-height:inherit; color:inherit; margin:.3em 0; padding-left:24px; } .fig .wbv4-pg li::marker{ color:inherit; } .wbv4-pg table{ border-collapse:collapse; margin:.3em 0; } .fig .wbv4-pg table{ width:auto; background:#fff; font-size:inherit; } .fig .wbv4-pg td{ border:1px solid #999; padding:1px 8px; color:#111; background:transparent; font-size:inherit; } .fig .wbv4-pg tr{ background:transparent; }
.wbv4-pg a{ color:#0000ee; text-decoration:underline; cursor:pointer; } .wbv4-pg a.wbv4-vis{ color:#551a8b; }
.wbv4-pg .wbv4-sm{ font-size:1.3em; font-weight:700; }
/* declarations as switches */
.wbv4-decl{ display:block; width:100%; text-align:left; font:inherit; color:inherit; background:none; border:0; border-radius:4px; padding:0 3px 0 18px; cursor:pointer; position:relative; min-height:22px; }
.wbv4-decl::before{ content:"✓"; position:absolute; left:3px; color:var(--ok); font-weight:700; }
.wbv4-decl[aria-pressed="false"]{ opacity:.45; text-decoration:line-through; } .wbv4-decl[aria-pressed="false"]::before{ content:"○"; color:var(--graphite); }
.wbv4-decl:hover{ background:color-mix(in srgb, var(--fig-k) 14%, transparent); }
.wbv4-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 8px; }
.wbv4-row > small{ font:.75rem var(--mono); color:var(--graphite); width:100%; text-align:center; }
/* background */
.wbv4-scroll{ height:170px; overflow-y:auto; border:1px solid var(--line); border-radius:0 0 8px 8px; }
.wbv4-tile{ display:inline-block; width:44px; height:44px; vertical-align:middle; border:1px solid var(--line); margin-right:6px; }
.wbv4-bgnote{ display:flex; align-items:center; justify-content:center; font-size:.75rem; color:var(--graphite); margin:0 0 8px; }
/* box model */
.wbv4-mbox{ transition:all .5s; } .wbv4-mbox p{ margin:0; transition:all .5s; }
.wbv4-leg{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:4px 8px; margin-top:8px; font-size:.75rem; color:var(--ink); }
.wbv4-leg span{ display:flex; gap:5px; align-items:center; opacity:.4; transition:opacity .4s; } .wbv4-leg span.wbv4-on{ opacity:1; font-weight:600; }
.wbv4-leg i{ width:14px; height:14px; border-radius:3px; border:1px solid var(--line); flex:none; }
.wbv4-ctl{ display:grid; grid-template-columns:auto minmax(0,1fr) 3.4em; gap:4px 8px; align-items:center; font-size:.8rem; margin-top:10px; }
.wbv4-ctl input[type=range]{ width:100%; accent-color:var(--fig-k); } .wbv4-ctl b{ font-family:var(--mono); text-align:right; }
.wbv4-blab{ font:600 12px/1 var(--body); color:#111; }
/* shorthand sides */
.wbv4-sides{ display:grid; grid-template-columns:auto minmax(0,1fr) auto; gap:4px; align-items:center; max-width:340px; margin:0 auto; }
.wbv4-sd{ font:.8rem/1.25 var(--mono); text-align:center; color:var(--graphite); padding:2px 4px; border-radius:6px; transition:all .4s; }
.wbv4-sd b{ display:block; color:var(--ink); font-size:.9rem; }
.wbv4-sd.wbv4-on{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); color:var(--ink); box-shadow:0 0 0 1.5px var(--fig-k); }
.wbv4-sd.wbv4-off{ opacity:.35; }
.wbv4-sbox{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); border-radius:4px; transition:padding .5s; min-height:60px; display:grid; }
.wbv4-sbox > div{ background:var(--paper); border:1.5px solid var(--graphite); display:grid; place-items:center; font-size:.8rem; color:var(--ink); min-height:44px; }
.wbv4-sbox.wbv4-bw{ background:none; padding:0 !important; } .wbv4-sbox.wbv4-bw > div{ border-style:solid; border-color:var(--fig-k); transition:border-width .5s; }
.wbv4-err{ text-align:center; color:var(--pen); font-size:.8rem; margin:0 0 8px; }
/* position */
.wbv4-posw{ transform:translateZ(0); position:relative; border:1px solid var(--line); border-radius:8px; overflow:hidden; background:#fff; }
.wbv4-posw .wbv4-scroll{ height:200px; border:0; border-radius:0; }
.wbv4-par{ border:1.5px dashed #888; margin:6px 0; padding:2px 6px; } .wbv4-par > small{ font:12px var(--mono); color:#555; }
.wbv4-bx{ width:96px; height:34px; display:grid; place-items:center; background:var(--fig-s); color:#fff; font:600 13px var(--mono); border-radius:4px; z-index:2; }
.wbv4-ghost{ width:96px; height:34px; outline:1.5px dashed #888; border-radius:4px; }
.wbv4-hint{ text-align:center; font-size:.75rem; color:var(--graphite); margin:6px 0 0; }
/* float */
.wbv4-img{ width:72px; height:54px; display:grid; place-items:center; background:color-mix(in srgb, var(--fig-k) 30%, #fff); border:1.5px solid var(--fig-s); font:600 13px var(--mono); color:#111; margin:6px; transition:all .4s; }
/* display */
.wbv4-it{ background:color-mix(in srgb, var(--fig-k) 28%, #fff); border:1.5px solid var(--fig-s); color:#111; font:600 13px var(--mono); padding:4px 6px; text-align:center; border-radius:3px; }
.wbv4-it.wbv4-hi{ background:var(--fig-s); color:#fff; }
.wbv4-gwin{ background:#2196F3; padding:6px; gap:4px; }
.wbv4-gwin .wbv4-it{ background:#e6e6e6; border-color:#999; padding:6px 0; min-width:0; overflow:hidden; }
/* navbar */
.wbv4-nav a{ transition:background-color .3s; } .wbv4-nav.wbv4-hov a:hover, .wbv4-nav.wbv4-hov a.wbv4-fake{ background-color:#111 !important; }
@media (prefers-reduced-motion: reduce){ .wbv4 *{ transition:none !important; } }`;
  if (!document.getElementById('wbv4-css')) { const s = document.createElement('style'); s.id = 'wbv4-css'; s.textContent = CSS; document.head.appendChild(s); }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // short code inside an Arabic sentence: an ltr isolate with non-breaking spaces
  const T = s => `<bdi dir="ltr">${esc(s).replace(/ /g, '&nbsp;')}</bdi>`;
  // longer code inside an Arabic caption: its own left-to-right line
  const LT = s => `<span class="ltr">${esc(s)}</span>`;

  // colours one line of source: HTML lines (start with <) or CSS lines
  function hlHtml(src) {
    return String(src).replace(/<!--[\s\S]*?(-->|$)|<[^<>]*>|[^<]+|</g, tok => {
      if (tok.startsWith('<!--')) return `<span class="wbv4-cm">${esc(tok)}</span>`;
      const m = tok.length > 1 && tok.match(/^<(\/?!?[A-Za-z][\w-]*)([\s\S]*?)(\/?)>$/);
      if (!m) return esc(tok);
      const at = m[2].replace(/(\s*)([^\s=]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s"']+))?/g, (_, sp, n, eq, v) => esc(sp) + `<span class="wbv4-an">${esc(n)}</span>` + (eq ? esc(eq) + `<span class="wbv4-av">${esc(v)}</span>` : ''));
      return `<span class="wbv4-t">&lt;${esc(m[1])}</span>${at}<span class="wbv4-t">${m[3]}&gt;</span>`;
    });
  }
  function hlCss(src) {
    return String(src).replace(/\/\*[\s\S]*?(\*\/|$)|([^{};\s][^{};]*?)(\s*\{)|([\w-]+)(\s*:\s*)([^;{}]*[^;{}\s])(\s*;)?|[\s\S]/g, (tok, _c, sel, br, p, col, v, semi) => {
      if (tok.startsWith('/*')) return `<span class="wbv4-cm">${esc(tok)}</span>`;
      if (sel) return `<span class="wbv4-se">${esc(sel)}</span>${esc(br)}`;
      if (p) return `<span class="wbv4-pr">${esc(p)}</span>${esc(col)}<span class="wbv4-va">${esc(v)}</span>${esc(semi || '')}`;
      return esc(tok);
    });
  }
  const hl = l => /^\s*</.test(l) ? hlHtml(l) : hlCss(l);
  const Code = ({ lines, on, dim, hide, label }) => html`<pre className="wbv4-code" aria-label=${label || 'Source code'}>${lines.map((l, j) => html`<span key=${j}
    className=${'wbv4-ln' + (on && on.includes(j) ? ' wbv4-on' : (dim && on && on.length ? ' wbv4-dim' : '')) + (hide && hide.includes(j) ? ' wbv4-hide' : '')} dangerouslySetInnerHTML=${{ __html: hl(l) || ' ' }}></span>`)}</pre>`;
  const Chips = ({ items, sel, on, mono, label }) => html`<div className="wbv4-chips" role="group" aria-label=${label || 'Choose'}>${items.map(([k, t]) => html`<button key=${k}
    className=${'fig-btn' + (mono ? ' wbv4-m' : '')} aria-pressed=${String(sel === k)} onClick=${() => on(k)}>${t}</button>`)}</div>`;
  const Win = ({ tab, on, children, style, cls }) => html`<div className=${'wbv4-win' + (on ? ' wbv4-on' : '')}><div className="wbv4-tab">${tab}</div><div className=${'wbv4-pg ' + (cls || '')} style=${style}>${children}</div></div>`;
  const Fig = ({ children }) => html`<figure className="fig wbv4">${children}</figure>`;

  /* ── [0.1] + [0.3] the same page as content only, with presentation, with behavior ── */
  function Layers({ ar }) {
    const steps = [
      { en: '<b>HTML is the content layer</b>: the structure and meaning of the page, here a heading, a paragraph and a button. With no CSS the browser uses its default look.', ar: 'الـ <b>HTML هو الـ content layer</b>، يعني الهيكل والمعنى بتوع الصفحة، وهنا فيه heading و paragraph و button. ومن غير CSS الـ browser بيستخدم الشكل الـ default بتاعه.' },
      { en: '<b>CSS is the presentation layer</b>: the same HTML, now with a color, a font, a size of text, spacing and a background color. The content did not change, only how it is displayed.', ar: 'الـ <b>CSS هو الـ presentation layer</b>، نفس الـ HTML بس دلوقتي فيه لون وخط وحجم كلام ومسافات ولون خلفية. المحتوى ماتغيرش، اللي اتغير طريقة العرض بس.' },
      { en: '<b>JavaScript is the behavior layer</b>: it makes the page react. Tap the button.', ar: 'الـ <b>JavaScript هو الـ behavior layer</b>، وهو اللي بيخلّي الصفحة تتفاعل. دوس على الـ button.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), [clicks, setClicks] = useState(0);
    useEffect(() => { if (i < 2) setClicks(0); }, [i]);
    const css = i >= 1;
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv4-lay">
        <div className=${i >= 2 ? 'wbv4-on' : ''}><b>JavaScript</b><span>behavior layer</span></div>
        <div className=${i >= 1 ? 'wbv4-on' : ''}><b>CSS</b><span>presentation layer</span></div>
        <div className="wbv4-on"><b>HTML</b><span>content layer (structure and semantics)</span></div>
      </div>
      <div style=${{ maxWidth: '420px', margin: '0 auto' }}><${Win} tab="page.html" style=${css ? { backgroundColor: 'powderblue', padding: '14px 16px' } : null}>
        <h1 style=${css ? { color: 'blue', fontFamily: 'verdana, sans-serif', fontSize: '1.5em' } : null}>This is a heading</h1>
        <p style=${css ? { color: 'red', fontFamily: 'courier, monospace', margin: '10px 0 14px' } : null}>This is a paragraph.</p>
        <button onClick=${() => i >= 2 && setClicks(c => c + 1)} style=${css ? { font: '600 14px verdana, sans-serif', padding: '8px 16px', borderRadius: '6px', border: '0', background: 'blue', color: '#fff', cursor: 'pointer' } : { font: '13px sans-serif', cursor: i >= 2 ? 'pointer' : 'default' }}>Click me</button>
        ${i >= 2 && clicks > 0 && html`<p style=${{ color: 'blue', fontFamily: 'verdana, sans-serif', fontSize: '14px' }}>You clicked the button ${clicks} time${clicks > 1 ? 's' : ''}.</p>`}
      <//></div>
    </div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [1] slides 4 to 12: inline, internal, external, and how many elements / pages each one styles ── */
  function Ways({ ar }) {
    const steps = [
      { k: 'Inline', en: '<b>Inline</b>: the <b>style</b> attribute inside one element. Scope: <b>a unique style for a single element</b>, only the &lt;h1&gt; and the &lt;p&gt; that carry it (slide 6). Pages 2 and 3 are untouched.',
        ar: 'الـ <b>Inline</b> بيستخدم الـ attribute اللي اسمه <b>style</b> جوه element واحد. الـ scope بتاعه <b>element واحد بس</b>، يعني الـ <bdi dir="ltr">&lt;h1&gt;</bdi> والـ <bdi dir="ltr">&lt;p&gt;</bdi> اللي عليهم الـ style (من slide 6). والصفحتين 2 و 3 مااتأثروش.' },
      { k: 'Internal', en: '<b>Internal</b>: a &lt;style&gt; element inside &lt;head&gt;. Scope: <b>one HTML page</b>. On page 1 every &lt;h1&gt; is blue, every &lt;p&gt; red and the background powderblue (slide 8). Pages 2 and 3 are untouched.',
        ar: 'الـ <b>Internal</b> هو element من نوع <bdi dir="ltr">&lt;style&gt;</bdi> جوه الـ <bdi dir="ltr">&lt;head&gt;</bdi>. الـ scope بتاعه <b>صفحة HTML واحدة</b>، ففي صفحة 1 كل الـ h1 بقت زرقا وكل الـ p حمرا والخلفية powderblue (من slide 8). والصفحتين 2 و 3 مااتأثروش.' },
      { k: 'External', en: '<b>External</b>: a &lt;link rel="stylesheet" href="styles.css"&gt; in the head of <b>each</b> page. Scope: <b>many pages</b>: change styles.css once and all three pages change. The .css file contains no HTML and is saved with a .css extension (slides 10 to 12).',
        ar: 'الـ <b>External</b> هو <bdi dir="ltr">&lt;link&gt;</bdi> في الـ head بتاع <b>كل</b> صفحة:<span class="ltr">&lt;link rel="stylesheet" href="styles.css"&gt;</span>الـ scope بتاعه <b>صفحات كتير</b>، تغيّر الـ styles.css مرة واحدة فالتلات صفحات يتغيروا. والـ file ده مافيهوش HTML ولازم يتحفظ بامتداد <bdi dir="ltr">.css</bdi> (من slides 10 لـ 12).' }
    ];
    const [i, ctl] = useSteps(steps.length, 3600);
    const CODE = [
      [['page1.html', ['<body>', '<h1 style="color:blue;">A Blue Heading</h1>', '<p style="color:red;">A red paragraph.</p>', '</body>']]],
      [['page1.html', ['<head>', '<style>', 'body {background-color: powderblue;}', 'h1   {color: blue;}', 'p    {color: red;}', '</style>', '</head>', '<body>', '<h1>This is a heading</h1>', '<p>This is a paragraph.</p>', '</body>']]],
      [['page1.html, page2.html, page3.html', ['<head>', '<link rel="stylesheet" href="styles.css">', '</head>']], ['styles.css', ['body {', '  background-color: powderblue;', '}', 'h1 {', '  color: blue;', '}', 'p {', '  color: red;', '}']]]
    ][i];
    const styled = j => i === 2 || (i === 1 && j === 0);
    const page = j => {
      if (i === 0 && j === 0) return html`<h1 style=${{ color: 'blue' }}>A Blue Heading</h1><p style=${{ color: 'red' }}>A red paragraph.</p>`;
      const s = styled(j);
      return html`<h1 style=${s ? { color: 'blue' } : null}>This is a heading</h1><p style=${s ? { color: 'red' } : null}>This is a paragraph.</p>`;
    };
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Way to add CSS" items=${steps.map((s, j) => [j, s.k])} sel=${i} on=${ctl.go} />
      <div style=${{ maxWidth: '520px', margin: '0 auto' }}>
        ${CODE.map(([f, l]) => html`<div key=${f}><div className="wbv4-fname">${f}</div><${Code} lines=${l} /></div>`)}
        <div className="wbv4-arrow">▼ the browser shows ▼</div>
        <div className="wbv4-pages">${[0, 1, 2].map(j => html`<${Win} key=${j} tab=${'page' + (j + 1)} on=${i === 2 || j === 0}
          style=${styled(j) ? { backgroundColor: 'powderblue' } : null}>${page(j)}<//>`)}</div>
      </div>
    </div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [3.0] + [3.1] the anatomy of a rule, and a comment ── */
  function Rule({ ar }) {
    const P = [['body', 'selector'], [' {', ''], ['color', 'property'], [':', 'colon'], [' black', 'value'], [';', 'semicolon'], ['}', '']];
    const steps = [
      { on: [0, 1, 2, 3, 4, 5, 6], en: 'A CSS <b>rule</b>, in the correct syntax: body {color: black;}', ar: 'ده <b>rule</b> في الـ CSS، وده الـ syntax الصح:' + LT('body {color: black;}') },
      { on: [0], en: 'The <b>selector</b> body says which elements the rule styles.', ar: 'الـ <b>selector</b> هنا هو ' + T('body') + '، وهو اللي بيحدد الـ rule هيظبط شكل أنهي elements.' },
      { on: [1, 2, 3, 4, 5, 6], brace: 1, en: 'The <b>declaration block</b> sits inside curly braces { }.', ar: 'الـ <b>declaration block</b> بيبقى جوه curly braces ' + T('{ }') + '.' },
      { on: [2, 3, 4, 5], brace: 2, en: 'Each <b>declaration</b> is property: value; and here there is one, color: black;', ar: 'كل <b>declaration</b> شكلها ' + T('property: value;') + ' وهنا فيه declaration واحدة هي ' + T('color: black;') },
      { on: [2], en: 'The <b>property</b> color: what to change.', ar: 'الـ <b>property</b> هي ' + T('color') + '، يعني هنغيّر إيه.' },
      { on: [4], en: 'The <b>value</b> black: what to set it to.', ar: 'الـ <b>value</b> هي ' + T('black') + '، يعني هنخليها إيه.' },
      { on: [3, 5], en: 'A <b>colon</b> goes between the property and the value, and a <b>semicolon</b> ends each declaration.', ar: 'الـ <b>colon</b> بييجي بين الـ property والـ value، والـ <b>semicolon</b> بيقفل كل declaration.' },
      { on: [], cm: 1, en: 'A CSS <b>comment</b>: /* this is a comment */. The browser ignores it.', ar: 'الـ <b>comment</b> في الـ CSS بيتكتب كده، والـ browser بيتجاهله:' + LT('/* this is a comment */') }
    ];
    const [i, ctl] = useSteps(steps.length, 2000), s = steps[i];
    const lbl = { 2: 'declaration block', 3: 'declaration' };
    return html`<${Fig}><div className="fig-stage" style=${{ paddingTop: '20px' }}>
      <div className="wbv4-anat" aria-label="body {color: black;}">${P.map(([t, l], j) => html`<div key=${j} className=${'wbv4-part' + (s.on.includes(j) ? ' wbv4-on' : (s.on.length ? ' wbv4-off' : ''))}><span>${t}</span><small>${l}</small></div>`)}</div>
      <div style=${{ textAlign: 'center', minHeight: '1.4em', marginTop: '4px' }}><b className=${pop(!!s.brace)} style=${{ fontSize: '.85rem', color: 'var(--fig-k)' }}>${s.brace ? '└ ' + lbl[s.brace + 1] + ' ┘' : ' '}</b></div>
      <div className=${'wbv4-cmt ' + pop(!!s.cm)}>/* this is a comment */</div>
    </div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [3.2] to [3.7] selectors matched on a small page; the matching is done by the browser's own querySelectorAll ── */
  const SRC = `<h1 id="id1" data-k="0">This is a heading</h1>
<p class="c1" data-k="1">This is a paragraph.</p>
<p data-k="2">Another paragraph.</p>
<h1 class="c1" data-k="3">A class heading</h1>
<ul data-k="4">
  <li data-k="5"><a href="#" data-k="6">Home</a></li>
  <li data-k="7"><a href="#" data-k="8">News</a></li>
</ul>
<table data-k="9">
  <tr data-k="10"><td data-k="11">row 1</td></tr>
  <tr data-k="12"><td data-k="13">row 2</td></tr>
  <tr data-k="14"><td data-k="15">row 3</td></tr>
  <tr data-k="16"><td data-k="17">row 4</td></tr>
</table>
<a href="#" data-k="18">A link</a>`;
  const SRC_LINES = SRC.split('\n'), SHOW = SRC_LINES.map(l => l.replace(/ data-k="\d+"/g, ''));
  const LINE_KEYS = SRC_LINES.map(l => [...l.matchAll(/data-k="(\d+)"/g)].map(m => +m[1]));
  const SELS = {
    'p': { en: 'Element selector <b>p</b>: selects all &lt;p&gt; elements.', ar: 'الـ Element selector ' + T('p') + ' بيختار كل الـ <bdi dir="ltr">&lt;p&gt;</bdi> elements.' },
    '#id1': { en: 'id selector <b>#id1</b>: selects the element with id="id1". An id is unique, so it is one element.', ar: 'الـ id selector ' + T('#id1') + ' بيختار الـ element اللي الـ id بتاعه ' + T('id1') + '، والـ id لازم يبقى unique فده element واحد.' },
    '.c1': { en: 'class selector <b>.c1</b>: selects all elements with class="c1", here a &lt;p&gt; and an &lt;h1&gt;.', ar: 'الـ class selector ' + T('.c1') + ' بيختار كل الـ elements اللي الـ class بتاعها ' + T('c1') + '، وهنا هما الـ p والـ h1.' },
    'p.c1': { en: '<b>p.c1</b>: only the &lt;p&gt; elements with that class.', ar: 'الـ ' + T('p.c1') + ' بيختار الـ <bdi dir="ltr">&lt;p&gt;</bdi> اللي عندها الـ class ده بس.' },
    'p, h1': { en: 'Grouping selector <b>p, h1</b>: all &lt;p&gt; and all &lt;h1&gt; with one rule.', ar: 'الـ Grouping selector ' + T('p, h1') + ' بيختار كل الـ p وكل الـ h1 بـ rule واحدة.' },
    '*': { en: 'Universal selector <b>*</b>: selects all elements (on a real page also &lt;html&gt; and &lt;body&gt;).', ar: 'الـ Universal selector ' + T('*') + ' بيختار كل الـ elements (وفي الصفحة الحقيقية كمان الـ html والـ body).' },
    'li a': { en: 'Descendant <b>li a</b>: every &lt;a&gt; inside an &lt;li&gt;. The link outside the list is not selected.', ar: 'الـ descendant selector ' + T('li a') + ' بيختار كل <bdi dir="ltr">&lt;a&gt;</bdi> جوه <bdi dir="ltr">&lt;li&gt;</bdi>، والـ link اللي بره الـ list مش هيتختار.' },
    'a:hover': { en: 'Pseudo-class <b>a:hover</b>: a link while the mouse is over it. Dashed = could match; hover a link in the page.', ar: 'الـ pseudo-class ' + T('a:hover') + ' بيختار الـ link وقت ما الماوس يكون عليه. المتقطع ممكن يتختار، فوقف بالماوس على link في الصفحة.' },
    'a:visited': { en: '<b>a:visited</b>: links already visited. Dashed = could match; tap a link to visit it.', ar: 'الـ ' + T('a:visited') + ' بيختار الـ links اللي اتزارت قبل كده. المتقطع ممكن يتختار، فدوس على link عشان تزوره.' },
    'a:active': { en: '<b>a:active</b>: a link at the moment it is clicked. Press and hold a link.', ar: 'الـ ' + T('a:active') + ' بيختار الـ link في اللحظة اللي بيتداس عليه فيها. دوس على link وخليك دايس.' },
    'tr:nth-child(even)': { en: '<b>tr:nth-child(even)</b>: the even rows of the table, row 2 and row 4.', ar: 'الـ ' + T('tr:nth-child(even)') + ' بيختار الـ rows الزوجية في الـ table، يعني row 2 و row 4.' }
  };
  const PSEUDO = /:(hover|visited|active)\b/g;
  function Select({ ar }) {
    const [sel, setSel] = useState('p'), [own, setOwn] = useState(false), [hov, setHov] = useState(null), [act, setAct] = useState(null), [vis, setVis] = useState([]);
    const tpl = useRef(null);
    if (!tpl.current) { const t = document.createElement('template'); t.innerHTML = SRC; tpl.current = t; }
    const q = sel.trim();
    let hits = new Set(), may = new Set(), bad = false;
    const run = s => { const out = new Set(); tpl.current.content.querySelectorAll(s).forEach(e => { if (e.dataset.k != null) out.add(+e.dataset.k); }); return out; };
    try {
      if (!q) bad = true;
      else if (/:(hover|visited|active)\b/.test(q)) {
        const kinds = [...q.matchAll(PSEUDO)].map(m => m[1]), base = q.replace(PSEUDO, '').trim() || '*';
        may = run(/[\s>+~,]$/.test(base) ? base + '*' : base);
        may.forEach(k => { const ok = kinds.every(t => t === 'hover' ? hov === k : t === 'active' ? act === k : vis.includes(k)); if (ok) hits.add(k); });
      } else hits = run(q);
    } catch (e) { bad = true; }
    PSEUDO.lastIndex = 0;
    const c = k => hits.has(k) ? 'wbv4-hit' : may.has(k) ? 'wbv4-may' : '';
    const on = SHOW.map((_, j) => j).filter(j => LINE_KEYS[j].some(k => hits.has(k)));
    const link = (k, t) => html`<a href="#" className=${c(k) + (vis.includes(k) ? ' wbv4-vis' : '')} onClick=${e => { e.preventDefault(); setVis(v => v.includes(k) ? v : v.concat(k)); }}
      onMouseEnter=${() => setHov(k)} onMouseLeave=${() => { setHov(null); setAct(null); }} onMouseDown=${() => setAct(k)} onMouseUp=${() => setAct(null)}
      onTouchStart=${() => { setHov(k); setAct(k); }} onTouchEnd=${() => setAct(null)}>${t}</a>`;
    const pick = s => { setOwn(false); setSel(s); };
    const info = own ? null : SELS[sel];
    const n = hits.size;
    const en = bad ? 'That is not a valid selector.' : info ? info.en : `Your selector <b>${esc(q)}</b> selects ${n} element${n === 1 ? '' : 's'} here.`;
    const a = bad ? 'ده مش selector صحيح.' : info ? info.ar : 'الـ selector بتاعك ' + T(q) + ' عدد الـ elements اللي بيختارها هنا: ' + n;
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv4-lab">Example from the notes</div>
      <${Chips} mono=${true} label="Selector" items=${Object.keys(SELS).map(s => [s, s])} sel=${own ? null : sel} on=${pick} />
      <div className="wbv4-own"><label>Try your own <input className="wbv4-in" value=${own ? sel : ''} placeholder="e.g. ul li" spellCheck="false" autoCapitalize="off" aria-label="Your selector"
        onInput=${e => { setOwn(true); setSel(e.target.value); }} /></label></div>
      <div className="wbv4-two">
        <${Code} lines=${SHOW} on=${on} dim=${true} label="HTML source" />
        <div><div className="wbv4-arrow">▼ the browser shows ▼</div><${Win} tab="page.html">
          <h1 className=${c(0)} style=${{ fontSize: '1.4em' }}>This is a heading</h1>
          <p className=${c(1)}>This is a paragraph.</p>
          <p className=${c(2)}>Another paragraph.</p>
          <h1 className=${c(3)} style=${{ fontSize: '1.4em' }}>A class heading</h1>
          <ul className=${c(4)}><li className=${c(5)}>${link(6, 'Home')}</li><li className=${c(7)}>${link(8, 'News')}</li></ul>
          <table className=${c(9)}><tbody>${[10, 12, 14, 16].map((k, j) => html`<tr key=${k} className=${c(k)}><td className=${c(k + 1)}>row ${j + 1}</td></tr>`)}</tbody></table>
          ${link(18, 'A link')}
        <//></div>
      </div>
      <p className="wbv4-cnt">${bad ? ' ' : html`selected: <b>${n}</b>${may.size ? html` · could match: <b>${may.size}</b>` : ''}`}</p>
    </div><${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [4.0] slide 14 (and [2]): the internal style sheet, each declaration switched on and off ── */
  const FDECL = [
    { s: 'body', p: 'background-color', v: 'powderblue', css: { backgroundColor: 'powderblue' } },
    { s: 'h1', p: 'color', v: 'blue', css: { color: 'blue' } }, { s: 'h1', p: 'font-family', v: 'verdana', css: { fontFamily: 'verdana, sans-serif' } }, { s: 'h1', p: 'font-size', v: '300%', css: { fontSize: '300%' } },
    { s: 'p', p: 'color', v: 'red', css: { color: 'red' } }, { s: 'p', p: 'font-family', v: 'courier', css: { fontFamily: 'courier, monospace' } }, { s: 'p', p: 'font-size', v: '160%', css: { fontSize: '160%' } }
  ];
  const FWHY = {
    'background-color': ['background-color sets the background color.', 'الـ background-color بيحدد لون الخلفية.'],
    'color': ['color sets the text color.', 'الـ color بيحدد لون الكلام.'],
    'font-family': ['font-family sets the font.', 'الـ font-family بيحدد نوع الخط.'],
    'font-size': ['font-size sets the text size; a % is relative to the normal size.', 'الـ font-size بيحدد حجم الكلام، والنسبة المئوية بتبقى من الحجم العادي.']
  };
  function Fonts({ ar }) {
    const [on, setOn] = useState(FDECL.map(() => true)), [last, setLast] = useState(null);
    const flip = j => { setOn(o => o.map((x, k) => k === j ? !x : x)); setLast(j); };
    const st = s => Object.assign({}, ...FDECL.map((d, j) => d.s === s && on[j] ? d.css : {}));
    const group = s => FDECL.map((d, j) => [d, j]).filter(([d]) => d.s === s);
    let en = 'The internal style sheet from the slides (slide 14, with the powderblue body of slide 8). Tap a declaration to switch it off and on.', a = 'ده الـ internal style sheet اللي في الـ slides، ومعاه خلفية powderblue للـ body زي ما في الـ slides برضه. دوس على أي declaration عشان تطفيها أو تشغلها.';
    if (last != null) {
      const d = FDECL[last], w = FWHY[d.p], txt = d.p + ': ' + d.v + ';';
      en = `${on[last] ? 'Added' : 'Removed'} <b>${esc(txt)}</b> on ${d.s}. ${w[0]}`;
      a = (on[last] ? 'اتضافت ' : 'اتشالت ') + T(txt) + (on[last] ? ' على الـ ' : ' من الـ ') + d.s + '. ' + w[1];
    }
    return html`<${Fig}><div className="fig-stage"><div className="wbv4-two">
      <pre className="wbv4-code" aria-label="The style sheet">${['body', 'h1', 'p'].map(s => html`<span key=${s} className="wbv4-ln" dangerouslySetInnerHTML=${{ __html: hlCss(s + ' {') }}></span>
        ${group(s).map(([d, j]) => html`<button key=${j} className="wbv4-decl" aria-pressed=${String(on[j])} onClick=${() => flip(j)} dangerouslySetInnerHTML=${{ __html: hlCss(d.p + ': ' + d.v + ';') }}></button>`)}
        <span className="wbv4-ln">}</span>`)}</pre>
      <div><div className="wbv4-arrow">▼ the browser shows ▼</div><${Win} tab="page.html" style=${st('body')}>
        <h1 style=${Object.assign({ fontSize: '2em' }, st('h1'))}>This is a heading</h1>
        <p style=${st('p')}>This is a paragraph.</p><//>
        <div className="wbv4-row" style=${{ marginTop: '8px' }}><button className="fig-btn" onClick=${() => { setOn(FDECL.map(() => false)); setLast(null); }}>All off</button><button className="fig-btn" onClick=${() => { setOn(FDECL.map(() => true)); setLast(null); }}>All on</button></div></div>
    </div></div><${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [4.1] font-weight, font-style, text-decoration ── */
  const TXT = {
    'font-weight': { vals: ['normal', 'bold'], en: { normal: 'font-weight: normal is regular text.', bold: 'font-weight: bold makes the text bold. p {font-weight: bold;} makes all &lt;p&gt; bold.' },
      ar: { normal: 'الـ font-weight بـ normal يعني كلام عادي.', bold: 'الـ font-weight بـ bold بيخلي الكلام بولد، والـ rule دي بتخلي كل الـ p بولد:' + LT('p {font-weight: bold;}') } },
    'font-style': { vals: ['normal', 'italic'], en: { normal: 'font-style: normal is upright text.', italic: 'font-style: italic makes the text italic.' },
      ar: { normal: 'الـ font-style بـ normal يعني كلام عادي مش مايل.', italic: 'الـ font-style بـ italic بيخلي الكلام italic (مايل).' } },
    'text-decoration': { vals: ['underline', 'overline', 'line-through', 'none'], en: { underline: 'text-decoration: underline adds a line under the text (links have it by default).', overline: 'text-decoration: overline adds a line over the text.', 'line-through': 'text-decoration: line-through draws a line through the text.', none: 'text-decoration: none removes the underline of links.' },
      ar: { underline: 'الـ text-decoration بـ underline بيضيف خط تحت الكلام (والـ links عندها ده by default).', overline: 'الـ text-decoration بـ overline بيضيف خط فوق الكلام.', 'line-through': 'الـ text-decoration بـ line-through بيرسم خط في نص الكلام.', none: 'الـ text-decoration بـ none بيشيل الخط اللي تحت الـ links.' } }
  };
  function TextProps({ ar }) {
    const [v, setV] = useState({ 'font-weight': 'bold', 'font-style': 'normal', 'text-decoration': 'underline' }), [last, setLast] = useState('font-weight');
    const set = (p, x) => { setV(o => Object.assign({}, o, { [p]: x })); setLast(p); };
    const lines = ['p {', `  font-weight: ${v['font-weight']};`, `  font-style: ${v['font-style']};`, '}', `a {text-decoration: ${v['text-decoration']};}`];
    return html`<${Fig}><div className="fig-stage">
      ${Object.keys(TXT).map(p => html`<div key=${p} className="wbv4-row"><small>${p === 'text-decoration' ? 'a { text-decoration }' : 'p { ' + p + ' }'}</small>
        ${TXT[p].vals.map(x => html`<button key=${x} className="fig-btn" style=${{ fontFamily: 'var(--mono)', fontSize: '.8rem', padding: '4px 10px' }} aria-pressed=${String(v[p] === x)} onClick=${() => set(p, x)}>${x}</button>`)}</div>`)}
      <div className="wbv4-two" style=${{ marginTop: '6px' }}><${Code} lines=${lines} on=${last === 'text-decoration' ? [4] : last === 'font-style' ? [2] : [1]} />
        <${Win} tab="page.html"><p style=${{ fontWeight: v['font-weight'], fontStyle: v['font-style'], fontSize: '18px' }}>This is a paragraph with <a href="#" onClick=${e => e.preventDefault()} style=${{ textDecoration: v['text-decoration'] }}>a link</a> inside it.</p><//></div>
    </div><${Cap} en=${TXT[last].en[v[last]]} ar=${TXT[last].ar[v[last]]} showAr=${ar} /><//>`;
  }

  /* ── [4.2] background-color / -image / -repeat / -attachment / -position ── */
  const TILE = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44"><rect width="44" height="44" fill="#fbf3dc"/><path d="M12 8h14l7 7v21H12z" fill="#fff" stroke="#e2d6b4" stroke-width="1.2"/><path d="M26 8v7h7" fill="none" stroke="#e2d6b4" stroke-width="1.2"/><path d="M15 21h14M15 25h14M15 29h10" stroke="#ebe2c8" stroke-width="1.2"/></svg>');
  const BGW = {
    ex: ['The answer from the notes: body {background-image: url("paper.gif");}. The image is smaller than the page, so it is <b>repeated by default</b> to cover it.', 'إجابة الـ notes هي إن الـ body ياخد ' + T('background-image') + ' بالصورة دي:' + LT('body {background-image: url("paper.gif");}') + 'والصورة أصغر من الصفحة، فبتتكرر <b>' + T('by default') + '</b> لحد ما تغطيها.'],
    repeat: ['background-repeat: repeat (the default): the image is repeated across and down to cover the element.', 'الـ background-repeat بـ repeat هو الـ default، والصورة بتتكرر بالعرض وبالطول لحد ما تغطي الـ element.'],
    'repeat-x': ['background-repeat: repeat-x: repeated across only.', 'الـ background-repeat بـ repeat-x بيكرر الصورة بالعرض بس.'],
    'repeat-y': ['background-repeat: repeat-y: repeated down only.', 'الـ background-repeat بـ repeat-y بيكرر الصورة بالطول بس.'],
    'no-repeat': ['background-repeat: no-repeat: the image is shown once; the background-color fills the rest.', 'الـ background-repeat بـ no-repeat بيعرض الصورة مرة واحدة، والـ background-color بيملا الباقي.'],
    scroll: ['background-attachment: scroll: the image scrolls with the page. Scroll the page to see.', 'الـ background-attachment بـ scroll بيخلي الصورة تتحرك مع الصفحة لما تعمل scroll. جرّب تعمل scroll.'],
    fixed: ['background-attachment: fixed: the image stays put while the content scrolls over it. Scroll the page to see.', 'الـ background-attachment بـ fixed بيخلي الصورة ثابتة والكلام بيتحرك فوقها. جرّب تعمل scroll.'],
    pos: ['background-position places the image (clearest with no-repeat).', 'الـ background-position بيحدد مكان الصورة (وده بيبان أكتر مع no-repeat).']
  };
  function Background({ ar }) {
    const [rep, setRep] = useState('repeat'), [att, setAtt] = useState('scroll'), [pos, setPos] = useState('left top'), [last, setLast] = useState('ex');
    const ex = () => { setRep('repeat'); setAtt('scroll'); setPos('left top'); setLast('ex'); };
    const lines = ['body {', '  background-color: powderblue;', '  background-image: url("paper.gif");', `  background-repeat: ${rep};`, `  background-attachment: ${att};`, `  background-position: ${pos};`, '}'];
    // the scrolling box stands for the page: 'scroll' moves with the content (local here), 'fixed' stays with the window (scroll here)
    const st = { backgroundColor: 'powderblue', backgroundImage: `url("${TILE}")`, backgroundRepeat: rep, backgroundAttachment: att === 'scroll' ? 'local' : 'scroll', backgroundPosition: pos, padding: '8px 12px' };
    const w = BGW[last === 'rep' ? rep : last === 'att' ? att : last];
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv4-bgnote"><img className="wbv4-tile" src=${TILE} alt="" /> paper.gif, a small image</div>
      <div className="wbv4-row"><button className="fig-btn" aria-pressed=${String(last === 'ex')} onClick=${ex}>Example from the notes</button></div>
      <div className="wbv4-row"><small>background-repeat</small>${['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].map(x => html`<button key=${x} className="fig-btn" style=${{ fontFamily: 'var(--mono)', fontSize: '.8rem', padding: '4px 9px' }} aria-pressed=${String(rep === x)} onClick=${() => { setRep(x); setLast('rep'); }}>${x}</button>`)}</div>
      <div className="wbv4-row"><small>background-attachment</small>${['scroll', 'fixed'].map(x => html`<button key=${x} className="fig-btn" style=${{ fontFamily: 'var(--mono)', fontSize: '.8rem', padding: '4px 9px' }} aria-pressed=${String(att === x)} onClick=${() => { setAtt(x); setLast('att'); }}>${x}</button>`)}</div>
      <div className="wbv4-row"><small>background-position</small>${['left top', 'center', 'right bottom'].map(x => html`<button key=${x} className="fig-btn" style=${{ fontFamily: 'var(--mono)', fontSize: '.8rem', padding: '4px 9px' }} aria-pressed=${String(pos === x)} onClick=${() => { setPos(x); setLast('pos'); }}>${x}</button>`)}</div>
      <div className="wbv4-two"><${Code} lines=${lines} on=${last === 'rep' ? [3] : last === 'att' ? [4] : last === 'pos' ? [5] : [2]} />
        <div className="wbv4-win"><div className="wbv4-tab">page.html (scroll inside)</div><div className="wbv4-pg wbv4-scroll" style=${st}>
          <h1 style=${{ fontSize: '1.4em' }}>This is a heading</h1>${[1, 2, 3, 4, 5, 6, 7, 8].map(k => html`<p key=${k}>This is a paragraph.</p>`)}</div></div></div>
    </div><${Cap} en=${w[0]} ar=${w[1]} showAr=${ar} /><//>`;
  }

  /* ── [5] slides 15 to 18: content, padding, border, margin, with the Q&A example p {border: 2px solid powderblue; padding: 30px; margin: 50px;} ── */
  const BOXC = { margin: '#f9cc9d', padding: '#c3d08b', content: '#8cb6c0' };
  function BoxModel({ ar }) {
    const steps = [
      { en: 'The <b>content</b>: the text This is a paragraph.', ar: 'الـ <b>content</b> هو الكلام نفسه ' + T('This is a paragraph.') },
      { en: '<b>padding: 30px</b>: space between the text and the border, inside the border.', ar: 'الـ <b>padding</b> بقى ' + T('30px') + '، وده المسافة بين الكلام والـ border، جوه الـ border.' },
      { en: '<b>border: 2px solid powderblue</b>: a border around the element (width, style, color).', ar: 'الـ <b>border</b> هو إطار حوالين الـ element، وهنا ليه عرض ونوع ولون:' + LT('border: 2px solid powderblue;') },
      { en: '<b>margin: 50px</b>: space outside the border.', ar: 'الـ <b>margin</b> بقى ' + T('50px') + '، وده المسافة بره الـ border.' },
      { en: 'Inside to outside: content, padding, border, margin. Now try your own values.', ar: 'من جوه لبره: الـ content، الـ padding، الـ border، الـ margin. جرّب قيم من عندك.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    const [v, setV] = useState({ m: 50, b: 2, p: 30 });
    useEffect(() => { if (i < 4) setV({ m: 50, b: 2, p: 30 }); }, [i]);
    const m = i >= 3 ? v.m : 0, b = i >= 2 ? v.b : 0, p = i >= 1 ? v.p : 0;
    const code = [`p {`, `  border: ${b}px solid powderblue;`, `  padding: ${p}px;`, `  margin: ${m}px;`, `}`];
    const hide = [i < 2 && 1, i < 1 && 2, i < 3 && 3].filter(x => x);
    const sl = (k, lab, max) => html`<span>${lab}</span><input type="range" min="0" max=${max} value=${v[k]} aria-label=${lab} onInput=${e => setV(o => Object.assign({}, o, { [k]: +e.target.value }))} /><b>${v[k]}px</b>`;
    return html`<${Fig}><div className="fig-stage"><div className="wbv4-two">
      <div><${Code} lines=${code} hide=${hide} />
        <div className="wbv4-leg">${[['content', BOXC.content, 0], ['padding ' + p + 'px', BOXC.padding, 1], ['border ' + b + 'px', 'powderblue', 2], ['margin ' + m + 'px', BOXC.margin, 3]].map(([t, col, j]) => html`<span key=${j} className=${i === j || i === 4 ? 'wbv4-on' : ''}><i style=${{ background: col }}></i>${t}</span>`)}</div>
        ${i === 4 && html`<div className="wbv4-ctl">${sl('m', 'margin', 60)}${sl('b', 'border', 10)}${sl('p', 'padding', 40)}</div>`}</div>
      <${Win} tab="page.html" style=${{ padding: '6px' }}>
        <div className="wbv4-mbox" style=${{ background: i >= 3 ? BOXC.margin : '#fff', padding: m + 'px', position: 'relative' }}>
          ${i >= 3 && m >= 14 && html`<span className="wbv4-blab" style=${{ position: 'absolute', left: '4px', top: Math.max(0, m / 2 - 7) + 'px' }}>margin</span>`}
          <p style=${{ border: b + 'px solid powderblue', padding: p + 'px', background: i >= 1 ? BOXC.padding : 'transparent', position: 'relative' }}>
            ${i >= 1 && p >= 14 && html`<span className="wbv4-blab" style=${{ position: 'absolute', left: '4px', top: Math.max(0, p / 2 - 7) + 'px' }}>padding</span>`}
            <span style=${{ display: 'block', background: BOXC.content, padding: '2px 0' }}>This is a paragraph.</span></p>
        </div><//>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [6] the shorthand: 1, 2, 3 or 4 values and which side gets which ── */
  const SPRE = [['margin', '25px'], ['margin', '25px 50px'], ['margin', '25px 50px 75px'], ['margin', '25px 50px 75px 100px'], ['border-width', '10px 1px 5px 20px']];
  const ORD = ['الأولى', 'التانية', 'التالتة', 'الرابعة'], ORDE = ['1st', '2nd', '3rd', '4th'];
  const SIDE_AR = { top: 'الـ top', right: 'الـ right', bottom: 'الـ bottom', left: 'الـ left' };
  function sideGroups(n) {
    return [null, [['top', 'right', 'bottom', 'left']], [['top', 'bottom'], ['right', 'left']], [['top'], ['right', 'left'], ['bottom']], [['top'], ['right'], ['bottom'], ['left']]][n];
  }
  function SidesSteps({ prop, vals, ar }) {
    const n = vals.length, G = sideGroups(n);
    const res = {}; G.forEach((g, j) => g.forEach(s => { res[s] = vals[j]; }));
    const steps = G.map((g, j) => ({
      g, en: n === 1 ? `One value: <b>${esc(vals[0])}</b> for all four sides.` : `${ORDE[j]} value <b>${esc(vals[j])}</b> → ${g.join(' and ')}.` + (n === 4 && j === 0 ? ' Four values go clockwise from the top.' : ''),
      ar: n === 1 ? 'قيمة واحدة ' + T(vals[0]) + ' للأربع جهات.' : 'القيمة ' + ORD[j] + ' ' + T(vals[j]) + ' للـ ' + g.map(s => s).join(' والـ ') + '.' + (n === 4 && j === 0 ? ' والأربع قيم بيمشوا مع عقارب الساعة من الـ top.' : '')
    })).concat([{ g: [], en: `Result: top ${res.top}, right ${res.right}, bottom ${res.bottom}, left ${res.left}. So ${prop === 'border-width' ? 'the left border is' : 'the left ' + prop + ' is'} <b>${res.left}</b>.`,
      ar: 'النتيجة:' + LT(`top ${res.top}, right ${res.right}, bottom ${res.bottom}, left ${res.left}`) + 'يعني الـ left ' + (prop === 'border-width' ? 'border' : prop) + ' بيبقى ' + T(res.left) + '.' }]);
    const [i, ctl] = useSteps(steps.length, 1500);
    const done = new Set(); steps.slice(0, i + 1).forEach(s => s.g.forEach(x => done.add(x)));
    const cur = new Set(steps[i].g);
    const px = s => { const m = /^(-?\d*\.?\d+)px$/.exec(res[s] || ''); return m ? +m[1] : 0; };
    const bw = prop === 'border-width', sc = x => Math.min(48, bw ? x : x * 0.4);
    const sd = (s) => html`<div className=${'wbv4-sd' + (cur.has(s) ? ' wbv4-on' : done.has(s) ? '' : ' wbv4-off')}>${s}<b>${done.has(s) ? res[s] : '?'}</b></div>`;
    const long = ['top', 'right', 'bottom', 'left'].map(s => `${bw ? 'border-' + s + '-width' : prop + '-' + s}: ${res[s]};`);
    const pad = ['top', 'right', 'bottom', 'left'].map(s => done.has(s) ? sc(px(s)) + 'px' : '0px').join(' ');
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="wbv4-sides"><span></span>${sd('top')}<span></span>${sd('left')}
        <div className=${'wbv4-sbox' + (bw ? ' wbv4-bw' : '')} style=${bw ? null : { padding: pad }}><div style=${bw ? { borderWidth: pad } : null}>${bw ? 'element' : prop === 'margin' ? 'element' : 'content'}</div></div>
        ${sd('right')}<span></span>${sd('bottom')}<span></span></div>
      <p className="wbv4-lab" style=${{ marginTop: '6px' }}>${bw ? 'border drawn at real size' : 'shaded band = ' + prop + ' (drawn smaller)'}</p>
      <div style=${{ maxWidth: '340px', margin: '6px auto 0' }}><${Code} lines=${[`${prop}: ${vals.join(' ')};`, '/* the same as */'].concat(long)} on=${i === steps.length - 1 ? [2, 3, 4, 5] : [0]} /></div>
    </div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  function Sides({ ar }) {
    const [k, setK] = useState(2), [own, setOwn] = useState(null), [prop, setProp] = useState('margin');
    const src = own != null ? own : SPRE[k][1], P = own != null ? prop : SPRE[k][0];
    const vals = src.trim().split(/\s+/).filter(Boolean), ok = vals.length >= 1 && vals.length <= 4 && vals.every(x => /^(-?\d*\.?\d+(px|%|em)?|auto)$/.test(x));
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: '6px' }}>
      <div className="wbv4-lab">Example from the notes</div>
      <${Chips} mono=${true} label="Shorthand" items=${SPRE.map(([p, v], j) => [j, p + ': ' + v])} sel=${own != null ? null : k} on=${j => { setOwn(null); setK(j); }} />
      <div className="wbv4-own"><span>Try your own</span>
        <select className="wbv4-in" style=${{ width: 'auto' }} value=${prop} onChange=${e => { setProp(e.target.value); setOwn(own != null ? own : SPRE[k][1]); }} aria-label="Property">${['margin', 'padding', 'border-width'].map(p => html`<option key=${p}>${p}</option>`)}</select>
        <input className="wbv4-in" value=${own != null ? own : ''} placeholder="10px 20px 30px" spellCheck="false" autoCapitalize="off" aria-label="Values" onInput=${e => setOwn(e.target.value)} /></div>
      ${!ok && html`<p className="wbv4-err">Write 1 to 4 values, e.g. 25px 50px</p>`}
    </div>${ok ? html`<${SidesSteps} key=${P + '|' + vals.join(' ')} prop=${P} vals=${vals} ar=${ar} />` : html`<${Cap} en="Write 1 to 4 values, e.g. 25px 50px." ar=${'اكتب من 1 لـ 4 قيم، زي ' + T('25px 50px') + '.'} showAr=${ar} />`}<//>`;
  }

  /* ── [7.0] position: static, relative, absolute, fixed, sticky on a real box inside a scrolling page ── */
  const POSW = {
    static: ['position: <b>static</b> is the default: the normal flow. top and left have no effect.', 'الـ <b>static</b> هو الـ default، يعني الـ normal flow، والـ top والـ left مالهمش أي تأثير.'],
    relative: ['<b>relative</b>: moved from its normal place (dashed) by top: 20px and left: 30px. Its space in the flow is kept.', 'الـ <b>relative</b> بيتزق من مكانه الطبيعي (المتقطع) بالـ top والـ left، ومكانه في الـ flow بيفضل محجوز.'],
    absolute: ['<b>absolute</b>: taken out of the flow and placed relative to the nearest positioned ancestor, the div with position: relative. Paragraph 3 moves up into the free space.', 'الـ <b>absolute</b> بيطلع من الـ flow ويتحط نسبةً لأقرب ancestor ليه position، وهنا ده الـ div اللي عليه relative. والـ Paragraph 3 بيطلع مكانه.'],
    fixed: ['<b>fixed</b>: placed relative to the window. Scroll the page: the box stays where it is.', 'الـ <b>fixed</b> بيتحط نسبةً للـ window. اعمل scroll للصفحة وهتلاقي الـ box ثابت مكانه.'],
    sticky: ['<b>sticky</b>: in the normal flow until you scroll to it, then it sticks at top: 20px while its parent div is on screen. Scroll the page.', 'الـ <b>sticky</b> بيفضل في الـ normal flow لحد ما تعمل scroll لحد عنده، وبعدين بيلزق على بعد ' + T('top: 20px') + ' طول ما الـ div الأب بتاعه ظاهر. جرّب تعمل scroll.']
  };
  function Position({ ar }) {
    const [pos, setPos] = useState('relative'), sc = useRef(null);
    useEffect(() => { if (sc.current) sc.current.scrollTop = 0; }, [pos]);
    const box = html`<div className="wbv4-bx" style=${{ position: pos, top: '20px', left: '30px' }}>box</div>`;
    const P = k => html`<p key=${k} style=${{ margin: '6px 0' }}>Paragraph ${k}</p>`;
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="position" items=${['static', 'relative', 'absolute', 'fixed', 'sticky'].map(x => [x, x])} sel=${pos} on=${setPos} />
      <div className="wbv4-two"><${Code} lines=${['.box {', `  position: ${pos};`, '  top: 20px;', '  left: 30px;', '}', '.parent {position: relative;}']} on=${[1]} />
        <div><div className="wbv4-posw"><div className="wbv4-tab" style=${{ background: 'var(--paper-2)' }}>page.html (the window)</div>
          <div className="wbv4-pg wbv4-scroll" ref=${sc}>
            ${P(1)}
            <div className="wbv4-par" style=${{ position: 'relative' }}><small>div.parent</small>${P(2)}
              ${pos === 'relative' ? html`<div className="wbv4-ghost">${box}</div>` : box}
              ${P(3)}${P(4)}${P(5)}</div>
            ${[6, 7, 8, 9, 10].map(P)}
          </div></div>
          <p className="wbv4-hint">${pos === 'fixed' || pos === 'sticky' ? 'scroll inside the page ↕' : ' '}</p></div></div>
    </div><${Cap} en=${POSW[pos][0]} ar=${POSW[pos][1]} showAr=${ar} /><//>`;
  }

  /* ── [7.1] float ── */
  const FLW = {
    none: ['float: none: the image stays in the flow and the text starts below it.', 'مع ' + T('float: none') + ' الصورة بتفضل في الـ flow والكلام بيبدأ تحتها.'],
    left: ['float: left pushes the image to the left and the text wraps around it on the right.', 'مع ' + T('float: left') + ' الصورة بتتزق للشمال والكلام بيلف حواليها من اليمين.'],
    right: ['float: right pushes the image to the right and the text wraps around it on the left.', 'مع ' + T('float: right') + ' الصورة بتتزق لليمين والكلام بيلف حواليها من الشمال.']
  };
  function Float({ ar }) {
    const [f, setF] = useState('left');
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="float" items=${['none', 'left', 'right'].map(x => [x, x])} sel=${f} on=${setF} />
      <div className="wbv4-two"><${Code} lines=${['img {', `  float: ${f};`, '  margin: 6px;', '}']} on=${[1]} />
        <${Win} tab="page.html"><div className="wbv4-img" style=${{ float: f }}>img</div>
          <p style=${{ marginTop: '4px' }}>Cascading Style Sheets (CSS) is used to format the layout of a webpage. With CSS you control the color, font, size of text, spacing between elements and how elements are positioned and laid out.</p><//></div>
    </div><${Cap} en=${FLW[f][0]} ar=${FLW[f][1]} showAr=${ar} /><//>`;
  }

  /* ── [7.2] display block / inline / none on an element; flex and grid on the parent (Lab 6) ── */
  const GPRE = ['auto', 'auto auto', 'auto auto auto', '100px', '50% 50%', 'repeat(3,300px)'];
  // the window stands for a 1000px wide page: px are drawn as a share of it
  function gridCols(src) {
    let s = String(src).trim().replace(/;$/, '');
    s = s.replace(/repeat\(\s*(\d+)\s*,\s*([^)]+)\)/g, (_, n, v) => Array(Math.min(+n, 12)).fill(v.trim()).join(' '));
    const t = s.split(/\s+/).filter(Boolean);
    if (!t.length || t.length > 12) return null;
    const out = t.map(x => /^\d*\.?\d+px$/.test(x) ? (parseFloat(x) / 10) + '%' : /^(auto|\d*\.?\d+(%|fr))$/.test(x) ? x : null);
    return out.includes(null) ? null : { css: out.join(' '), n: t.length };
  }
  function Display({ ar }) {
    const [d, setD] = useState('block'), [dir, setDir] = useState('row'), [gi, setGi] = useState(1), [own, setOwn] = useState(null);
    const gsrc = own != null ? own : GPRE[gi], g = gridCols(gsrc);
    let lines, en, a, view;
    if (d === 'block' || d === 'inline' || d === 'none') {
      lines = ['<p>Text <span>item 1</span>', '<span class="item2">item 2</span>', '<span>item 3</span> text.</p>', '', `.item2 {display: ${d};}`];
      const W = { block: ['<b>block</b>: item 2 starts on a new line and takes the full width.', 'الـ item 2 بقى <b>block</b>، فبيبدأ في سطر جديد وبياخد العرض كله.'], inline: ['<b>inline</b>: item 2 stays in the line with the text and takes only the width it needs.', 'الـ item 2 بقى <b>inline</b>، فبيفضل في نفس السطر مع الكلام وبياخد العرض اللي محتاجه بس.'], none: ['<b>none</b>: item 2 is not displayed at all and its space is gone.', 'الـ item 2 بقى <b>none</b>، فمش بيظهر خالص ومكانه بيختفي.'] }[d];
      en = W[0]; a = W[1];
      view = html`<p style=${{ lineHeight: 2 }}>Text <span className="wbv4-it">item 1</span> <span className="wbv4-it wbv4-hi" style=${{ display: d }}>item 2</span> <span className="wbv4-it">item 3</span> text.</p>`;
    } else if (d === 'flex') {
      lines = ['.parent {', '  display: flex;', `  flex-direction: ${dir};`, '}'];
      en = '<b>Flexbox</b> lays the items in a row or a column: display: flex on the parent, flex-direction chooses ' + dir + '.';
      a = 'الـ <b>Flexbox</b> بيرص الـ items في row أو column، والـ parent بياخد ' + T('display: flex') + ' والـ flex-direction هنا ' + T(dir) + '.';
      view = html`<div style=${{ display: 'flex', flexDirection: dir, gap: '6px', padding: '6px', border: '1.5px dashed #888' }}>${[1, 2, 3].map(k => html`<div key=${k} className="wbv4-it">item ${k}</div>`)}</div>`;
    } else {
      lines = ['.parent {', '  display: grid;', `  grid-template-columns: ${gsrc};`, '}'];
      if (g) {
        en = `<b>Grid</b> divides the page into regions: grid-template-columns: ${esc(gsrc)} gives ${g.n} column${g.n > 1 ? 's' : ''} (Lab 6). The window stands for a 1000px wide page, so px are drawn as a share of it.`;
        a = 'الـ <b>Grid</b> بيقسم الصفحة لمناطق، والسطر ده:' + LT('grid-template-columns: ' + gsrc + ';') + 'بيعمل عدد أعمدة ' + g.n + ' (من Lab 6). والـ window هنا بتمثل صفحة عرضها ' + T('1000px') + '، فالـ px بتترسم كجزء منها.';
        view = html`<div className="wbv4-gwin" style=${{ display: 'grid', gridTemplateColumns: g.css }}>${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => html`<div key=${k} className="wbv4-it">${k}</div>`)}</div>`;
      } else { en = 'Write column sizes such as auto, 100px, 50% or repeat(3,300px).'; a = 'اكتب أحجام الأعمدة زي ' + T('auto') + ' أو ' + T('100px') + ' أو ' + T('50%') + '.'; view = html`<p className="wbv4-err">?</p>`; }
    }
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="display" items=${['block', 'inline', 'none', 'flex', 'grid'].map(x => [x, 'display: ' + x])} sel=${d} on=${setD} />
      ${d === 'flex' && html`<${Chips} mono=${true} label="flex-direction" items=${[['row', 'row'], ['column', 'column']]} sel=${dir} on=${setDir} />`}
      ${d === 'grid' && html`<div className="wbv4-lab">Example from Lab 6</div><${Chips} mono=${true} label="grid-template-columns" items=${GPRE.map((x, j) => [j, x])} sel=${own != null ? null : gi} on=${j => { setOwn(null); setGi(j); }} />
        <div className="wbv4-own"><label>Try your own <input className="wbv4-in" value=${own != null ? own : ''} placeholder="200px auto" spellCheck="false" autoCapitalize="off" aria-label="grid-template-columns" onInput=${e => setOwn(e.target.value)} /></label></div>`}
      <div className="wbv4-two"><${Code} lines=${lines} on=${[lines.length - (d === 'flex' || d === 'grid' ? 2 : 1)]} />
        <${Win} tab=${d === 'grid' ? 'page.html (1000px wide)' : 'page.html'}>${view}<//></div>
    </div><${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [7.3] the navigation bar built rule by rule ── */
  function NavBar({ ar }) {
    const CSSL = ['ul {', '  list-style-type: none;', '  margin: 0;', '  padding: 0;', '  overflow: hidden;', '  background-color: #333; /* added */', '}', 'li {float: left;}', 'li a {', '  display: block;', '  padding: 14px 16px;', '  text-decoration: none;', '  color: white; /* added */', '}', 'li a:hover {background-color: #111;}'];
    const SHOWN = [[], [0, 1, 2, 3, 4, 6], [7], [8, 9, 10, 11, 13], [5, 12], [14]];
    const steps = [
      { en: 'A navigation bar is a list of links. With no CSS: bullets, an indent, links one under another and underlined.', ar: 'الـ Navigation bar عبارة عن list من الـ links. ومن غير CSS بيبقى فيه bullets ومسافة على الشمال، والـ links تحت بعض وتحتها خط.' },
      { en: 'ul: list-style-type: none removes the bullets, margin: 0 and padding: 0 remove the indent, overflow: hidden keeps the floated items inside the ul.', ar: 'في الـ ul، الـ list-style-type بـ none بيشيل الـ bullets، والـ margin والـ padding بـ 0 بيشيلوا المسافة، والـ overflow بـ hidden بيخلي الـ items اللي عليها float تفضل جوه الـ ul.' },
      { en: 'li {float: left;}: the items line up side by side, a horizontal bar.', ar: 'الـ float بـ left على الـ li بيخلي الـ items جنب بعض، فالـ bar بقى horizontal.' },
      { en: 'li a: display: block makes the whole area with padding 14px 16px clickable; text-decoration: none removes the underline.', ar: 'في الـ li a، الـ display بـ block بيخلي المساحة كلها بالـ padding ' + T('14px 16px') + ' تتداس، والـ text-decoration بـ none بيشيل الخط اللي تحت الـ links.' },
      { en: 'Colours added here (they are not in the notes) so the bar shows: background-color: #333 on the ul and color: white on the links.', ar: 'الألوان دي متضافة هنا بس (مش في الـ notes) عشان الـ bar يبان، خلفية ' + T('#333') + ' للـ ul ولون أبيض للـ links.' },
      { en: 'li a:hover {background-color: #111;}: the link under the mouse gets a darker background. Hover a link.', ar: 'الـ hover على الـ li a بيدي الـ link اللي عليه الماوس خلفية أغمق ' + T('#111') + '. جرّب تقف بالماوس على link.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const shown = new Set(SHOWN.slice(0, i + 1).flat());
    const hide = CSSL.map((_, j) => j).filter(j => !shown.has(j)), on = SHOWN[i];
    const ul = i >= 1 ? { listStyleType: 'none', margin: 0, padding: 0, overflow: 'hidden' } : { margin: '.3em 0', paddingLeft: '24px' };
    if (i >= 4) ul.backgroundColor = '#333';
    const li = i >= 2 ? { float: 'left' } : {};
    const a = i >= 3 ? { display: 'block', padding: '14px 16px', textDecoration: 'none', fontSize: '14px', fontFamily: 'Arial, sans-serif' } : {};
    if (i >= 4) a.color = 'white';
    return html`<${Fig}><div className="fig-stage"><div className="wbv4-two">
      <div><${Code} lines=${['<ul>', '  <li><a href="#">Home</a></li>', '  <li><a href="#">News</a></li>', '  <li><a href="#">Contact</a></li>', '</ul>']} label="HTML source" />
        <div style=${{ height: '6px' }}></div><${Code} lines=${CSSL} on=${on} hide=${hide.length === CSSL.length ? [] : hide} label="CSS" /></div>
      <div><div className="wbv4-arrow">▼ the browser shows ▼</div><${Win} tab="page.html">
        <ul className=${'wbv4-nav' + (i >= 5 ? ' wbv4-hov' : '')} style=${ul}>${['Home', 'News', 'Contact'].map((t, j) => html`<li key=${t} style=${li}><a href="#" className=${i >= 5 && j === 1 && !calm() ? 'wbv4-fake' : ''} style=${a} onClick=${e => e.preventDefault()}>${t}</a></li>`)}</ul>
        <p style=${{ clear: 'both' }}>Page content.</p><//></div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'wb-css-layers': Layers, 'wb-css-ways': Ways, 'wb-css-rule': Rule, 'wb-css-select': Select, 'wb-css-fonts': Fonts, 'wb-css-text': TextProps,
    'wb-css-bg': Background, 'wb-css-box': BoxModel, 'wb-css-sides': Sides, 'wb-css-position': Position, 'wb-css-float': Float, 'wb-css-display': Display, 'wb-css-navbar': NavBar
  });
})();
/* ── part L5 ── */
// Web Programming visuals, Lecture 5 (HTML III: lists and tables): ul / ol built item by item, nested lists, the navigation bar,
// list-style-type, ol type / start, the description list and the notes' list code; tables built row by row, the table tags,
// borders (double vs collapse, radius, style, colour, invisible look), sizes, zebra stripes, the responsive table, colspan / rowspan,
// and the exam method for an irregular table (slides of Lec_4_HTML, pages 3 to 38). Every label and number comes from the site's notes and slides.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop } = window.FIGKIT;
  const CSS = `
.wbv5 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.wbv5 .fig-btn:disabled{ opacity:.45; cursor:default; }
.wbv5-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.wbv5-chips .fig-btn{ font-size:.8rem; padding:4px 10px; min-height:30px; }
.wbv5-chips .fig-btn.m{ font-family:var(--mono); }
.wbv5-sub{ font-size:.75rem; color:var(--graphite); text-align:center; margin:0 0 4px; }
.wbv5-code{ font:.78rem/1.5 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:7px 5px; white-space:pre-wrap; overflow-wrap:anywhere; direction:ltr; text-align:left; color:var(--ink); margin:0; }
.wbv5-code .ln{ display:block; border-radius:4px; padding:0 3px; transition:background .4s, opacity .4s; }
.wbv5-code .ln.on{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.wbv5-code .ln.dim{ opacity:.4; } .wbv5-code .ln.new{ animation:wbv5in .45s ease both; }
.wbv5-t{ color:var(--fig-k); font-weight:600; } .wbv5-an{ color:var(--pen); } .wbv5-av{ color:var(--ok); } .wbv5-cm{ color:var(--graphite); font-style:italic; }
.wbv5-two{ display:grid; grid-template-columns:minmax(0,1fr); gap:8px; max-width:600px; margin:0 auto; }
@media (min-width:640px){ .wbv5-two{ grid-template-columns:repeat(2, minmax(0,1fr)); align-items:start; } }
.wbv5-arrow{ text-align:center; color:var(--fig-k); font-size:.8rem; font-weight:600; margin:0 0 3px; }
.wbv5-win{ border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); transition:box-shadow .4s; }
.wbv5-win.on{ box-shadow:0 0 0 2.5px var(--fig-k); }
.wbv5-wbar{ font:.75rem/1.4 var(--mono); color:var(--graphite); padding:4px 8px; border-bottom:1px solid var(--line); background:var(--paper-2); border-radius:8px 8px 0 0; }
.wbv5 .wbv5-page{ padding:8px 10px 10px; font-family:"Times New Roman", Times, serif; font-size:1.05rem; line-height:1.35; min-height:70px; overflow-wrap:anywhere; text-align:left; direction:ltr; color:var(--ink); }
.wbv5 .wbv5-page ul, .wbv5 .wbv5-page ol{ display:block; margin:.25em 0; padding:0 0 0 28px; gap:0; max-width:none; font:inherit; line-height:inherit; color:inherit; list-style-position:outside; }
.wbv5 .wbv5-page li{ display:list-item; margin:0; } .wbv5 .wbv5-page li::marker{ color:var(--ink); }
.wbv5 .wbv5-page dl{ margin:.25em 0; } .wbv5 .wbv5-page dt{ margin:0; font-weight:400; } .wbv5 .wbv5-page dd{ margin:0 0 0 32px; }
.wbv5 .wbv5-page table{ border-collapse:separate; border-spacing:2px; width:auto; margin:0; font:inherit; background:none; color:inherit; overflow-wrap:normal; }
.wbv5 .wbv5-page th, .wbv5 .wbv5-page td{ padding:1px 4px; border:0; text-align:left; background:none; color:inherit; vertical-align:middle; font-size:inherit; transition:background .4s, box-shadow .4s; }
.wbv5 .wbv5-page th{ text-align:center; font-weight:700; }
.wbv5 .wbv5-page caption{ padding:2px 0; font-style:normal; color:inherit; }
.wbv5-guide td, .wbv5-guide th{ outline:1px dashed color-mix(in srgb, var(--graphite) 55%, transparent); outline-offset:-1px; }
.wbv5-li{ animation:wbv5in .45s ease both; }
.wbv5-box{ outline:2px dashed var(--fig-k); outline-offset:2px; border-radius:4px; }
.wbv5-on{ background:color-mix(in srgb, var(--fig-k) 22%, transparent) !important; }
.wbv5-sel{ box-shadow:inset 0 0 0 2px var(--fig-k); }
.wbv5-tag{ display:inline-block; font:600 .75rem/1.3 var(--body); color:var(--fig-k); border:1px solid var(--fig-k); border-radius:99px; padding:0 6px; margin-left:6px; vertical-align:middle; }
@keyframes wbv5in{ from{ opacity:0; transform:translateY(5px); } to{ opacity:1; transform:none; } }
/* nav bar */
.wbv5-link{ color:var(--fig-k); text-decoration:underline; cursor:pointer; background:none; border:0; padding:0; font:inherit; }
.wbv5-navv{ list-style:none !important; padding:0 !important; margin:0 !important; width:150px; background:var(--paper-2); border:1px solid var(--line); }
.wbv5-navv li, .wbv5-navh li{ list-style:none; }
.wbv5-navv button, .wbv5-navh button{ display:block; width:100%; text-align:left; font:.95rem/1.2 var(--body); color:var(--ink); background:none; border:0; padding:8px 14px; cursor:pointer; }
.wbv5-navh{ list-style:none !important; padding:0 !important; margin:0 !important; display:flex !important; flex-wrap:wrap; background:var(--ink); }
.wbv5-navh button{ color:var(--paper); text-align:center; padding:10px 12px; }
.wbv5-navv button.act, .wbv5-navh button.act{ background:var(--fig-s); color:#fff; }
/* zoom on the borders */
.wbv5-zoom{ display:flex; gap:10px; align-items:center; justify-content:center; margin:10px 0 0; font-size:.75rem; color:var(--graphite); }
.wbv5-zt{ width:120px; height:56px; border:3px solid var(--ink); padding:5px; display:flex; gap:5px; box-sizing:border-box; background:var(--paper); }
.wbv5-zt.c{ padding:0; gap:0; } .wbv5-zt i{ flex:1; border:3px solid var(--ink); } .wbv5-zt.c i{ border-width:0 3px 0 0; } .wbv5-zt.c i:last-child{ border:0; }
/* responsive */
.wbv5-phone{ position:relative; contain:paint; border:2px solid var(--graphite); border-radius:10px; background:var(--paper); padding:8px 0 8px 8px; }
.wbv5-wide{ transition:transform .3s; }
.wbv5-edge{ position:absolute; top:0; bottom:0; right:0; width:0; border-right:2.5px dashed var(--pen); }
.wbv5-track{ height:10px; border-radius:5px; background:var(--paper-2); border:1px solid var(--line); margin:6px 8px 0 0; position:relative; }
.wbv5-thumb{ position:absolute; top:1px; bottom:1px; border-radius:4px; background:var(--graphite); }
.wbv5-ctl{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:6px 10px; align-items:center; font-size:.8rem; margin:8px 0 0; }
.wbv5-ctl input[type=range]{ width:100%; accent-color:var(--fig-k); }
/* ol start */
.wbv5-num{ display:flex; gap:6px; align-items:center; justify-content:center; margin:0 0 10px; font-size:.8rem; flex-wrap:wrap; }
.wbv5-num input{ width:5em; font:.85rem var(--mono); border:1px solid var(--line); border-radius:6px; padding:4px 6px; background:var(--paper); color:var(--ink); }
/* irregular table */
.wbv5-grid{ display:grid; gap:4px; max-width:360px; margin:0 auto; direction:ltr; }
.wbv5-cell{ font:600 .9rem/1.2 var(--mono); min-height:44px; border-radius:6px; border:1.5px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; padding:2px; overflow-wrap:anywhere; transition:all .3s; }
.wbv5-cell.new{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); }
.wbv5-cell.up{ border-style:dashed; border-color:var(--graphite); background:repeating-linear-gradient(45deg, var(--paper-2) 0 6px, var(--paper) 6px 12px); }
.wbv5-cell.dim{ opacity:.45; } .wbv5-cell.pick{ box-shadow:0 0 0 3px var(--pen); }
.wbv5-cell small{ display:block; font:.75rem var(--body); color:var(--graphite); font-weight:400; }
.wbv5-rc{ display:flex; gap:12px; justify-content:center; flex-wrap:wrap; font-size:.8rem; margin:0 0 8px; align-items:center; }
.wbv5-rc span{ display:inline-flex; gap:4px; align-items:center; } .wbv5-rc .fig-btn{ min-width:32px; padding:2px 8px; min-height:30px; }
.wbv5-hint{ font-size:.75rem; color:var(--graphite); text-align:center; margin:6px 0 8px; }
@media (prefers-reduced-motion: reduce){ .wbv5-li, .wbv5-code .ln.new{ animation:none; } .wbv5-wide{ transition:none; } }`;
  if (!document.getElementById('wbv5-css')) { const s = document.createElement('style'); s.id = 'wbv5-css'; s.textContent = CSS; document.head.appendChild(s); }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // inline code inside an Arabic sentence: always an ltr isolate
  const T = s => `<bdi dir="ltr">${esc(s)}</bdi>`;
  // colours one line of HTML / CSS source (tags, attribute names, values, comments)
  function hl(src) {
    return String(src).replace(/<!--[\s\S]*?(-->|$)|<[^<>]*>|[^<]+|</g, tok => {
      if (tok.startsWith('<!--')) return `<span class="wbv5-cm">${esc(tok)}</span>`;
      const m = tok.length > 1 && tok.match(/^<(\/?[A-Za-z][\w-]*)([\s\S]*?)(\/?)>$/);
      if (!m) return esc(tok);
      const at = m[2].replace(/(\s*)([^\s=]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s"']+))?/g, (_, sp, n, eq, v) => esc(sp) + `<span class="wbv5-an">${esc(n)}</span>` + (eq ? esc(eq) + `<span class="wbv5-av">${esc(v)}</span>` : ''));
      return `<span class="wbv5-t">&lt;${esc(m[1])}</span>${at}<span class="wbv5-t">${m[3]}&gt;</span>`;
    });
  }
  const Code = ({ lines, on, dim, fresh, label }) => html`<pre className="wbv5-code" aria-label=${label || 'Source'}>${lines.map((l, j) => html`<span key=${j + ':' + l}
    className=${'ln' + (on && on.includes(j) ? ' on' : (dim && on && on.length ? ' dim' : '')) + (fresh && fresh.includes(j) ? ' new' : '')} dangerouslySetInnerHTML=${{ __html: hl(l) || ' ' }}></span>`)}</pre>`;
  const Chips = ({ items, sel, on, mono, label }) => html`<div className="wbv5-chips" role="group" aria-label=${label || 'Choose'}>${items.map(([k, t]) => html`<button key=${k}
    className=${'fig-btn' + (mono ? ' m' : '')} aria-pressed=${String(sel === k)} onClick=${() => on(k)}>${t}</button>`)}</div>`;
  const Fig = ({ children }) => html`<figure className="fig wbv5">${children}</figure>`;
  const Win = ({ title, on, children }) => html`<div className=${'wbv5-win' + (on ? ' on' : '')}><div className="wbv5-wbar">${title || 'page.html'}</div><div className="wbv5-page">${children}</div></div>`;
  // source on one side, the rendered page on the other, stepped
  function Stepped({ lines, steps, page, ms, title, ar }) {
    const [i, ctl] = useSteps(steps.length, ms || 1900), s = steps[i];
    return html`<div className="fig-stage"><div className="wbv5-two">
        <${Code} lines=${lines} on=${s.on} dim=${true} />
        <div><div className="wbv5-arrow">▼ the browser shows ▼</div><${Win} title=${title}>${page(i)}<//></div>
      </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} />`;
  }
  const LI = (show, key, children, extra) => show ? html`<li key=${key} className="wbv5-li" ...${extra || {}}>${children}</li>` : null;

  /* ── [0.0] [0.1] slides 4, 5, 10: <ul> or <ol>, each item an <li> ── */
  function ListKinds({ ar }) {
    const [tag, setTag] = useState('ul');
    const items = ['Coffee', 'Tea', 'Milk'], u = tag === 'ul';
    const lines = [`<h2>An ${u ? 'unordered' : 'ordered'} HTML list</h2>`, `<${tag}>`, '  <li>Coffee</li>', '  <li>Tea</li>', '  <li>Milk</li>', `</${tag}>`];
    const steps = [
      u ? { on: [1, 5], en: '<b>&lt;ul&gt;</b> starts an <b>unordered</b> list and &lt;/ul&gt; ends it.', ar: 'الـ <bdi dir="ltr">&lt;ul&gt;</bdi> بيبدأ <b>unordered</b> list والـ <bdi dir="ltr">&lt;/ul&gt;</bdi> بيقفلها.' }
        : { on: [1, 5], en: '<b>&lt;ol&gt;</b> starts an <b>ordered</b> list and &lt;/ol&gt; ends it.', ar: 'الـ <bdi dir="ltr">&lt;ol&gt;</bdi> بيبدأ <b>ordered</b> list والـ <bdi dir="ltr">&lt;/ol&gt;</bdi> بيقفلها.' },
      ...items.map((t, j) => ({ on: [2 + j], en: `Each item starts with <b>&lt;li&gt;</b>: “${t}” gets ${u ? 'a bullet' : 'the number ' + (j + 1)}.`, ar: u ? `كل item بيبدأ بـ <bdi dir="ltr">&lt;li&gt;</bdi>، والـ item ده ${T(t)} بياخد bullet.` : `كل item بيبدأ بـ <bdi dir="ltr">&lt;li&gt;</bdi>، والـ item ده ${T(t)} بياخد رقم ${j + 1}.` })),
      u ? { on: [], en: 'By default the items of an unordered list are marked with <b>bullets</b> (small black circles). Switch to &lt;ol&gt; to see numbers.', ar: 'كـ default الـ items في الـ unordered list بيتعلّم عليها بـ <b>bullets</b> (دواير سودا صغيرة). جرّب <bdi dir="ltr">&lt;ol&gt;</bdi> عشان تشوف الأرقام.' }
        : { on: [], en: 'By default the items of an ordered list are marked with <b>numbers</b>. Same &lt;li&gt; items, only the list tag changed.', ar: 'كـ default الـ items في الـ ordered list بيتعلّم عليها بـ <b>أرقام</b>. نفس الـ items بتاعة الـ <bdi dir="ltr">&lt;li&gt;</bdi>، اللي اتغيّر بس هو الـ tag بتاع الـ list.' }
    ];
    const L = u ? 'ul' : 'ol';
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: 0 }}><${Chips} mono=${true} label="List tag" items=${[['ul', '<ul>'], ['ol', '<ol>']]} sel=${tag} on=${setTag} /></div>
      <${Stepped} key=${tag} ar=${ar} lines=${lines} steps=${steps} page=${i => html`<div style=${{ fontWeight: 700, fontSize: '1.2em', margin: '0 0 .2em' }}>An ${u ? 'unordered' : 'ordered'} HTML list</div>
        <${L} className=${i === 0 ? 'wbv5-box' : ''} style=${{ listStyleType: u ? 'disc' : 'decimal', minHeight: '1.2em' }}>${items.map((t, j) => LI(i >= j + 1, j, t, { className: 'wbv5-li' + (i === j + 1 ? ' wbv5-on' : '') }))}<//>`} /><//>`;
  }

  /* ── [0.2] slide 8: a list inside an <li> ── */
  function ListNested({ ar }) {
    const lines = ['<ul>', '  <li>Coffee</li>', '  <li>Tea', '    <ul>', '      <li>Black tea</li>', '      <li>Green tea</li>', '    </ul>', '  </li>', '  <li>Milk</li>', '</ul>'];
    const steps = [
      { on: [0, 9], en: 'The outer &lt;ul&gt;: an unordered list.', ar: 'الـ <bdi dir="ltr">&lt;ul&gt;</bdi> اللي برّه ده unordered list.' },
      { on: [1], en: '&lt;li&gt;Coffee&lt;/li&gt;: the first item, with a bullet.', ar: 'أول item هو <bdi dir="ltr">Coffee</bdi>، وعليه bullet.' },
      { on: [2], en: '&lt;li&gt;Tea starts the second item, and it is <b>not closed yet</b>.', ar: 'الـ <bdi dir="ltr">&lt;li&gt;Tea</bdi> بيبدأ تاني item، و<b>لسه ماتقفلش</b>.' },
      { on: [3, 6], en: 'A whole new &lt;ul&gt; <b>inside</b> the Tea item: a nested list. It is indented one level.', ar: 'فيه <bdi dir="ltr">&lt;ul&gt;</bdi> كاملة <b>جوه</b> الـ item بتاع Tea، ودي nested list، وبتتزق لجوه level كمان.' },
      { on: [4], en: 'Black tea: an item of the nested list. The browser marks the inner level with circles.', ar: 'الـ <bdi dir="ltr">Black tea</bdi> item في الـ nested list، والـ browser بيعلّم الـ level اللي جوه بدواير فاضية (circles).' },
      { on: [5], en: 'Green tea: the second item of the nested list.', ar: 'الـ <bdi dir="ltr">Green tea</bdi> تاني item في الـ nested list.' },
      { on: [7], en: '&lt;/li&gt; closes Tea <b>after</b> the inner list, so the inner list belongs to the Tea item.', ar: 'الـ <bdi dir="ltr">&lt;/li&gt;</bdi> بيقفل Tea <b>بعد</b> الـ list اللي جوه، فالـ list دي تبع الـ item بتاع Tea.' },
      { on: [8], en: 'Milk: back on the outer list, with a bullet.', ar: 'الـ <bdi dir="ltr">Milk</bdi> رجعنا بيه للـ list اللي برّه، وعليه bullet.' },
      { on: [], en: 'Lists can be nested: a list inside an &lt;li&gt;. Output: Coffee, Tea (Black tea, Green tea), Milk.', ar: 'الـ lists ينفع تبقى nested، يعني list جوه <bdi dir="ltr">&lt;li&gt;</bdi>. النتيجة:<span class="ltr">Coffee, Tea (Black tea, Green tea), Milk</span>' }
    ];
    const on = (i, k) => i === k ? ' wbv5-on' : '';
    return html`<${Fig}><${Stepped} ar=${ar} lines=${lines} steps=${steps} ms=${1800} title="A Nested List" page=${i => html`<ul className=${i === 0 ? 'wbv5-box' : ''} style=${{ listStyleType: 'disc', minHeight: '1.2em' }}>
      ${LI(i >= 1, 'c', 'Coffee', { className: 'wbv5-li' + on(i, 1) })}
      ${i >= 2 && html`<li key="t" className=${'wbv5-li' + (i === 2 || i === 6 ? ' wbv5-on' : '')}>Tea${i >= 3 && html`<ul className=${'wbv5-li' + (i === 3 ? ' wbv5-box' : '')} style=${{ listStyleType: 'circle' }}>
        ${LI(i >= 4, 'b', 'Black tea', { className: 'wbv5-li' + on(i, 4) })}${LI(i >= 5, 'g', 'Green tea', { className: 'wbv5-li' + on(i, 5) })}</ul>`}</li>`}
      ${LI(i >= 7, 'm', 'Milk', { className: 'wbv5-li' + on(i, 7) })}</ul>`} /><//>`;
  }

  /* ── [0.3] slide 9: a navigation bar is a list of links ── */
  function ListNavbar({ ar }) {
    const [k, setK] = useState('plain'), [act, setAct] = useState('Home');
    const L = [['home', 'Home'], ['news', 'News'], ['contact', 'Contact'], ['about', 'About']];
    const lines = ['<ul>', ...L.map(([h, t]) => `  <li><a href="#${h}">${t}</a></li>`), '</ul>'];
    const cap = {
      plain: { en: 'The navigation bar is just a &lt;ul&gt; whose &lt;li&gt; items each hold a link &lt;a href="#home"&gt;. Unstyled, the browser shows a bulleted list of links.', ar: 'الـ navigation bar هو ببساطة <bdi dir="ltr">&lt;ul&gt;</bdi> وكل <bdi dir="ltr">&lt;li&gt;</bdi> فيه link زي <bdi dir="ltr">&lt;a href="#home"&gt;</bdi>. من غير style الـ browser بيعرضه list من الـ links عليها bullets.' },
      vert: { en: '<b>Vertical</b>: the same list styled with CSS: no markers (list-style-type: none) and each link a block. Tap a link to make it the active one.', ar: 'الشكل الـ <b>Vertical</b> هو نفس الـ list بس متعملها style بالـ CSS، من غير markers (<bdi dir="ltr">list-style-type: none</bdi>) وكل link بقى block. دوس على link عشان يبقى هو الـ active.' },
      horz: { en: '<b>Horizontal</b>: the same list again, with CSS placing the items side by side. The HTML did not change at all.', ar: 'الشكل الـ <b>Horizontal</b> هو نفس الـ list تاني، والـ CSS حط الـ items جنب بعض. الـ HTML نفسه ماتغيّرش خالص.' }
    }[k];
    const a = (t, cls) => html`<button key=${t} className=${cls + (act === t && k !== 'plain' ? ' act' : '')} onClick=${() => setAct(t)} aria-pressed=${String(act === t)}>${t}</button>`;
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Style" items=${[['plain', 'No CSS'], ['vert', 'Vertical'], ['horz', 'Horizontal']]} sel=${k} on=${setK} />
      <div className="wbv5-two"><${Code} lines=${lines} />
        <div><div className="wbv5-arrow">▼ the browser shows ▼</div><${Win} title="Navigation Bar = List of Links">
          ${k === 'plain' ? html`<ul style=${{ listStyleType: 'disc' }}>${L.map(([, t]) => html`<li key=${t}>${a(t, 'wbv5-link')}</li>`)}</ul>`
            : html`<ul className=${k === 'vert' ? 'wbv5-navv' : 'wbv5-navh'}>${L.map(([, t]) => html`<li key=${t}>${a(t, '')}</li>`)}</ul>`}<//></div></div>
      </div><${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /><//>`;
  }

  /* ── [1] slides 6, 7: list-style-type ── */
  const MARK = {
    disc: ['Sets the list item marker to a bullet (default).', 'بيخلي علامة الـ item تبقى bullet (ده الـ default).'],
    circle: ['Sets the list item marker to a circle.', 'بيخلي علامة الـ item تبقى circle (دايرة فاضية).'],
    square: ['Sets the list item marker to a square.', 'بيخلي علامة الـ item تبقى square (مربع).'],
    none: ['The list items will not be marked.', 'الـ items مش هيبقى عليها أي علامة.']
  };
  function ListMarker({ ar }) {
    const [v, setV] = useState('disc');
    const lines = [`<ul style="list-style-type:${v};">`, '  <li>Coffee</li>', '  <li>Tea</li>', '  <li>Milk</li>', '</ul>'];
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="list-style-type" items=${Object.keys(MARK).map(x => [x, x])} sel=${v} on=${setV} />
      <div className="wbv5-two"><${Code} lines=${lines} on=${[0]} />
        <div><div className="wbv5-arrow">▼ the browser shows ▼</div><${Win}><ul key=${v} className="wbv5-li" style=${{ listStyleType: v }}><li>Coffee</li><li>Tea</li><li>Milk</li></ul><//></div></div>
      </div><${Cap} en=${`<b>list-style-type: ${v}</b>: ${MARK[v][0]}`} ar=${`القيمة ${T('list-style-type: ' + v)} ${MARK[v][1]}`} showAr=${ar} /><//>`;
  }

  /* ── [2] slides 9 to 12: <ol type> and <ol start> ── */
  const roman = n => { let s = ''; [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']].forEach(([v, r]) => { while (n >= v) { s += r; n -= v; } }); return s; };
  const alpha = n => { let s = ''; while (n > 0) { n--; s = String.fromCharCode(65 + n % 26) + s; n = Math.floor(n / 26); } return s; };
  const mark = (n, t) => t === '1' ? String(n) : t === 'A' ? alpha(n) : t === 'a' ? alpha(n).toLowerCase() : t === 'I' ? roman(n) : roman(n).toLowerCase();
  const OLT = {
    '1': ['Numbers (default)', 'أرقام (ده الـ default)'], A: ['Uppercase letters', 'حروف capital'], a: ['Lowercase letters', 'حروف small'],
    I: ['Uppercase roman numbers', 'أرقام رومانية capital'], i: ['Lowercase roman numbers', 'أرقام رومانية small']
  };
  // caption for one ol setting (also used by the test harness)
  function olCap(t, st, items) {
    const ms = items.map((x, j) => mark(st + j, t) + '. ' + x).join(', ');
    return {
      en: `<b>type="${t}"</b>: ${OLT[t][0]}; ${st === 1 ? 'counting starts at 1 (default)' : `<b>start="${st}"</b>: counting starts at ${st} instead of 1`}. The items read: ${esc(ms)}.`,
      ar: `الـ ${T('type="' + t + '"')} معناه ${OLT[t][1]}، و` + (st === 1 ? 'العد بيبدأ من 1 (الـ default)' : `الـ ${T('start="' + st + '"')} بيخلي العد يبدأ من ${st} بدل 1`) + `. الـ items بتطلع كده:<span class="ltr">${esc(ms)}</span>`
    };
  }
  function ListOl({ ar }) {
    const [t, setT] = useState('A'), [st, setSt] = useState(3), [ex, setEx] = useState('notes');
    const items = ex === 'notes' ? ['Coffee', 'Tea'] : ['Coffee', 'Tea', 'Milk'];
    const load = k => { setEx(k); if (k === 'notes') { setT('A'); setSt(3); } if (k === 's11') { setT('A'); setSt(1); } if (k === 's12') { setT('1'); setSt(50); } };
    const attrs = (t !== '1' || st === 1 ? ` type="${t}"` : '') + (st !== 1 ? ` start="${st}"` : '');
    const lines = [`<ol${attrs}>`, ...items.map(x => `  <li>${x}</li>`), '</ol>'];
    const setStart = v => { const n = Math.max(1, Math.min(999, parseInt(v, 10) || 1)); setSt(n); };
    const c = olCap(t, st, items);
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Example" items=${[['notes', 'Example from the notes'], ['s11', 'type="A"'], ['s12', 'start="50"']]} sel=${ex} on=${load} />
      <div className="wbv5-sub">type</div>
      <${Chips} mono=${true} label="type" items=${Object.keys(OLT).map(x => [x, 'type="' + x + '"'])} sel=${t} on=${setT} />
      <div className="wbv5-num"><span>start =</span><button className="fig-btn" onClick=${() => setStart(st - 1)} disabled=${st <= 1} aria-label="start minus 1">−</button>
        <input type="number" min="1" max="999" value=${st} aria-label="start" onInput=${e => setStart(e.target.value)} /><button className="fig-btn" onClick=${() => setStart(st + 1)} aria-label="start plus 1">+</button></div>
      <div className="wbv5-two"><${Code} lines=${lines} on=${[0]} />
        <div><div className="wbv5-arrow">▼ the browser shows ▼</div><${Win}><ol key=${t + st + items.length} className="wbv5-li" type=${t} start=${st} style=${{ paddingLeft: '52px' }}>${items.map(x => html`<li key=${x}>${x}</li>`)}</ol><//></div></div>
      </div><${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /><//>`;
  }

  /* ── [3] slides 13, 14 and the notes' code: description list, square + nested, type="A" start="3" ── */
  const DL = {
    dl: {
      lines: ['<dl>', '  <dt>Coffee</dt>', '  <dd>- black hot drink</dd>', '  <dt>Milk</dt>', '  <dd>- white cold drink</dd>', '</dl>'],
      steps: [
        { on: [0, 5], en: '<b>&lt;dl&gt;</b> defines the description list: a list of terms, with a description of each term.', ar: 'الـ <bdi dir="ltr">&lt;dl&gt;</bdi> بيعرّف الـ description list، وهي list من terms ولكل term وصف.' },
        { on: [1], en: '<b>&lt;dt&gt;</b> defines the term (name): Coffee.', ar: 'الـ <bdi dir="ltr">&lt;dt&gt;</bdi> بيعرّف الـ term (الاسم)، وهنا هو Coffee.' },
        { on: [2], en: '<b>&lt;dd&gt;</b> describes the term: “- black hot drink”, shown indented under it.', ar: 'الـ <bdi dir="ltr">&lt;dd&gt;</bdi> بيوصف الـ term، وهنا <bdi dir="ltr">- black hot drink</bdi>، وبيظهر متزق لجوه تحته.' },
        { on: [3], en: 'The next term: Milk.', ar: 'الـ term اللي بعده هو Milk.' },
        { on: [4], en: 'Its description: “- white cold drink”.', ar: 'والوصف بتاعه هو <bdi dir="ltr">- white cold drink</bdi>.' },
        { on: [], en: 'Terms sit at the left edge, descriptions are indented, and there are no bullets or numbers.', ar: 'الـ terms على الطرف الشمال، والـ descriptions متزقة لجوه، ومفيش bullets ولا أرقام.' }
      ],
      page: i => html`<dl className=${i === 0 ? 'wbv5-box' : ''} style=${{ minHeight: '1.2em' }}>
        ${[['Coffee', '- black hot drink'], ['Milk', '- white cold drink']].map(([a, b], j) => html`<${React.Fragment} key=${a}>
          ${i >= 1 + 2 * j && html`<dt className=${'wbv5-li' + (i === 1 + 2 * j ? ' wbv5-on' : '')}>${a}${i === 1 + 2 * j && html`<span className="wbv5-tag">term</span>`}</dt>`}
          ${i >= 2 + 2 * j && html`<dd className=${'wbv5-li' + (i === 2 + 2 * j ? ' wbv5-on' : '')}>${b}${i === 2 + 2 * j && html`<span className="wbv5-tag">description</span>`}</dd>`}<//>`)}</dl>`
    },
    sq: {
      lines: ['<ul style="list-style-type:square;">', '  <li>Coffee</li>', '  <li>Tea', '    <ul><li>Black tea</li><li>Green tea</li></ul>', '  </li>', '</ul>'],
      steps: [
        { on: [0, 5], en: 'list-style-type:square on the &lt;ul&gt;: square bullets.', ar: 'الـ <bdi dir="ltr">list-style-type:square</bdi> على الـ <bdi dir="ltr">&lt;ul&gt;</bdi> بيخلي الـ bullets مربعات.' },
        { on: [1], en: 'Coffee, with a square.', ar: 'الـ item ده Coffee وعليه مربع.' },
        { on: [2, 4], en: 'Tea: its &lt;li&gt; stays open until the nested list is inside it.', ar: 'الـ item ده Tea، والـ <bdi dir="ltr">&lt;li&gt;</bdi> بتاعه بيفضل مفتوح لحد ما الـ nested list تبقى جواه.' },
        { on: [3], en: 'The nested &lt;ul&gt;: Black tea and Green tea, one level in. It has no style of its own, so the browser gives the inner level circles.', ar: 'الـ nested <bdi dir="ltr">&lt;ul&gt;</bdi> فيها Black tea و Green tea، متزقة level لجوه. مالهاش style بتاعها، فالـ browser بيدّي الـ level اللي جوه circles.' }
      ],
      page: i => html`<ul className=${i === 0 ? 'wbv5-box' : ''} style=${{ listStyleType: 'square', minHeight: '1.2em' }}>
        ${LI(i >= 1, 'c', 'Coffee', { className: 'wbv5-li' + (i === 1 ? ' wbv5-on' : '') })}
        ${i >= 2 && html`<li key="t" className=${'wbv5-li' + (i === 2 ? ' wbv5-on' : '')}>Tea${i >= 3 && html`<ul className="wbv5-li wbv5-box" style=${{ listStyleType: 'circle' }}><li>Black tea</li><li>Green tea</li></ul>`}</li>`}</ul>`
    },
    ol: {
      lines: ['<ol type="A" start="3">', '  <li>Coffee</li>', '  <li>Tea</li>', '</ol>'],
      steps: [
        { on: [0, 3], en: 'type="A": uppercase letters; start="3": counting starts at the 3rd letter.', ar: 'الـ <bdi dir="ltr">type="A"</bdi> معناه حروف capital، والـ <bdi dir="ltr">start="3"</bdi> معناه العد يبدأ من تالت حرف.' },
        { on: [1], en: 'Coffee is item 3: <b>C</b>.', ar: 'الـ item ده Coffee رقمه 3، يعني <b>C</b>.' },
        { on: [2], en: 'Tea is item 4: <b>D</b>.', ar: 'الـ item ده Tea رقمه 4، يعني <b>D</b>.' },
        { on: [], en: 'Result: C. Coffee, D. Tea.', ar: 'النتيجة:<span class="ltr">C. Coffee, D. Tea</span>' }
      ],
      page: i => html`<ol type="A" start="3" className=${i === 0 ? 'wbv5-box' : ''} style=${{ minHeight: '1.2em', paddingLeft: '40px' }}>
        ${LI(i >= 1, 'c', 'Coffee', { className: 'wbv5-li' + (i === 1 ? ' wbv5-on' : '') })}${LI(i >= 2, 't', 'Tea', { className: 'wbv5-li' + (i === 2 ? ' wbv5-on' : '') })}</ol>`
    }
  };
  function ListDl({ ar }) {
    const [k, setK] = useState('dl'), d = DL[k];
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: 0 }}><${Chips} label="Code" items=${[['dl', '<dl> description list'], ['sq', 'Square + nested'], ['ol', 'type="A" start="3"']]} sel=${k} on=${setK} /></div>
      <${Stepped} key=${k} ar=${ar} lines=${d.lines} steps=${d.steps} page=${d.page} /><//>`;
  }

  /* ── [4.1] slides 16 to 19: <table>, <tr>, <th>, <td> built row by row ── */
  function TableBuild({ ar }) {
    const R = [['Person 1', 'Person 2', 'Person 3'], ['Emil', 'Tobias', 'Linus'], ['16', '14', '10']];
    const lines = ['<table>'];
    R.forEach((r, j) => { lines.push('  <tr>'); r.forEach(c => lines.push(j ? `    <td>${c}</td>` : `    <th>${c}</th>`)); lines.push('  </tr>'); });
    lines.push('</table>');
    const steps = [
      { on: [0, 16], en: '<b>&lt;table&gt;</b> creates the table. Nothing shows until it has rows. (Dashed lines here only mark the cells: no border is set.)', ar: 'الـ <bdi dir="ltr">&lt;table&gt;</bdi> بيعمل الجدول، ومفيش حاجة بتظهر لحد ما يبقى فيه rows. (الخطوط المتقطعة هنا بتعلّم الـ cells بس، مفيش border.)' },
      { on: [1, 5], en: '<b>&lt;tr&gt;</b> defines a row: the beginning of row 1.', ar: 'الـ <bdi dir="ltr">&lt;tr&gt;</bdi> بيعرّف row، وده بداية أول row.' },
      { on: [2, 3, 4], en: '<b>&lt;th&gt;</b> defines a header cell: Person 1, Person 2, Person 3 are <b>bold and centered</b> by default.', ar: 'الـ <bdi dir="ltr">&lt;th&gt;</bdi> بيعرّف header cell، فالـ Person 1 و Person 2 و Person 3 بيطلعوا <b>bold و centered</b> كـ default.' },
      { on: [6, 10], en: 'A second &lt;tr&gt;: row 2.', ar: 'تاني <bdi dir="ltr">&lt;tr&gt;</bdi>، يعني row رقم 2.' },
      { on: [7, 8, 9], en: '<b>&lt;td&gt;</b> defines a data cell: Emil, Tobias, Linus, normal text aligned left.', ar: 'الـ <bdi dir="ltr">&lt;td&gt;</bdi> بيعرّف data cell، فالـ Emil و Tobias و Linus بيطلعوا نص عادي على الشمال.' },
      { on: [11, 12, 13, 14, 15], en: 'Row 3: 16, 14, 10. Each &lt;td&gt; lands in the next column.', ar: 'الـ row رقم 3 فيه 16 و 14 و 10، وكل <bdi dir="ltr">&lt;td&gt;</bdi> بيقع في الـ column اللي بعده.' },
      { on: [], en: 'Each &lt;tr&gt; is a row, each &lt;th&gt;/&lt;td&gt; inside it is one cell: 3 rows × 3 columns.', ar: 'كل <bdi dir="ltr">&lt;tr&gt;</bdi> عبارة عن row، وكل <bdi dir="ltr">&lt;th&gt;</bdi> أو <bdi dir="ltr">&lt;td&gt;</bdi> جواه cell واحدة، فالجدول 3 rows في 3 columns.' }
    ];
    const rowsShown = i => i >= 5 ? 3 : i >= 3 ? 2 : i >= 1 ? 1 : 0;
    return html`<${Fig}><${Stepped} ar=${ar} lines=${lines} steps=${steps} ms=${2000} page=${i => html`<table className=${'wbv5-guide' + (i === 0 ? ' wbv5-box' : '')} style=${{ minHeight: '1.4em', minWidth: '60%' }}><tbody>
      ${R.slice(0, rowsShown(i)).map((r, j) => html`<tr key=${j} className=${'wbv5-li' + ((i === 1 && j === 0) || (i === 3 && j === 1) ? ' wbv5-on' : '')}>
        ${r.map((c, q) => { const show = j === 0 ? i >= 2 : j === 1 ? i >= 4 : i >= 5, on = (j === 0 && i === 2) || (j === 1 && i === 4) || (j === 2 && i === 5);
          const C = j ? 'td' : 'th'; return html`<${C} key=${q} className=${on ? 'wbv5-on' : ''} style=${{ minWidth: '3.2em', height: '1.4em' }}>${show ? c : ''}<//>`; })}</tr>`)}</tbody></table>`} /><//>`;
  }

  /* ── [4.2] slide 18: the other table tags ── */
  const PARTS = {
    table: [[0, 12], 'Defines a table.', 'بيعرّف جدول.'], caption: [[1], 'Defines a table caption (its title).', 'بيعرّف الـ caption بتاع الجدول (العنوان).'],
    thead: [[2, 3, 4], 'Groups the header content in a table.', 'بيجمّع الـ header content في الجدول.'], tbody: [[5, 6, 7, 8], 'Groups the body content in a table.', 'بيجمّع الـ body content في الجدول.'],
    tfoot: [[9, 10, 11], 'Groups the footer content in a table.', 'بيجمّع الـ footer content في الجدول.'], tr: [[3, 6, 7, 10], 'Defines a row in a table.', 'بيعرّف row في الجدول.'],
    th: [[3], 'Defines a header cell (bold and centered).', 'بيعرّف header cell (bold و centered).'], td: [[6, 7, 10], 'Defines a cell in a table.', 'بيعرّف cell في الجدول.']
  };
  function TableParts({ ar }) {
    const [k, setK] = useState('caption');
    const lines = ['<table>', '  <caption>Caption</caption>', '  <thead>', '    <tr><th>Firstname</th><th>Age</th></tr>', '  </thead>', '  <tbody>', '    <tr><td>Jill</td><td>50</td></tr>', '    <tr><td>Eve</td><td>94</td></tr>', '  </tbody>', '  <tfoot>', '    <tr><td>…</td><td>…</td></tr>', '  </tfoot>', '</table>'];
    const h = x => k === x ? 'wbv5-on wbv5-sel' : '';
    const cell = (C, t, key) => html`<${C} key=${key} className=${h(C)}>${t}<//>`;
    const row = (cells, C, key) => html`<tr key=${key} className=${h('tr')}>${cells.map((t, j) => cell(C, t, j))}</tr>`;
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="Tag" items=${Object.keys(PARTS).map(x => [x, '<' + x + '>'])} sel=${k} on=${setK} />
      <div className="wbv5-two"><${Code} lines=${lines} on=${PARTS[k][0]} dim=${true} />
        <div><div className="wbv5-arrow">▼ the browser shows ▼</div><${Win}>
          <table className=${'wbv5-guide ' + h('table')} style=${{ minWidth: '70%' }}>
            <caption className=${h('caption')}>Caption</caption>
            <thead className=${h('thead')}>${row(['Firstname', 'Age'], 'th', 0)}</thead>
            <tbody className=${h('tbody')}>${row(['Jill', '50'], 'td', 1)}${row(['Eve', '94'], 'td', 2)}</tbody>
            <tfoot className=${h('tfoot')}>${row(['…', '…'], 'td', 3)}</tfoot></table><//></div></div>
      </div><${Cap} en=${`<b>&lt;${k}&gt;</b>: ${PARTS[k][1]}` + (k === 'table' || k === 'tr' || k === 'td' ? ' The set that are all table elements: &lt;table&gt;&lt;tr&gt;&lt;td&gt;.' : '')}
        ar=${`الـ ${T('<' + k + '>')} ${PARTS[k][2]}` + (k === 'table' || k === 'tr' || k === 'td' ? ` والمجموعة اللي كلها table elements هي ${T('<table><tr><td>')}.` : '')} showAr=${ar} /><//>`;
  }

  /* ── [5.0] [5.1] slides 19 to 23: double borders, then border-collapse ── */
  const JILL = [['Firstname', 'Lastname', 'Age'], ['Jill', 'Smith', '50'], ['Eve', 'Jackson', '94'], ['John', 'Doe', '80']];
  const DataTable = ({ rows, tbl, cell, rowStyle, cellStyle }) => html`<table style=${tbl}><tbody>${rows.map((r, j) => html`<tr key=${j} style=${rowStyle ? rowStyle(j) : null}>${r.map((c, q) => {
    const C = j ? 'td' : 'th'; return html`<${C} key=${q} style=${Object.assign({}, cell, cellStyle ? cellStyle(j, q) : null)}>${c}<//>`; })}</tr>`)}</tbody></table>`;
  function TableCollapse({ ar }) {
    const steps = [
      { css: [], b: 0, en: 'The table with no CSS: no borders at all.', ar: 'الجدول من غير CSS خالص، مفيش borders.' },
      { css: ['table, th, td {', '  border: 1px solid black;', '}'], on: [0, 1, 2], b: 1, en: '<b>table, th, td { border: 1px solid black; }</b> puts a border around the table <b>and</b> around each th and td cell.', ar: 'الـ CSS ده بيحط border حوالين الجدول <b>وكمان</b> حوالين كل cell من الـ th والـ td:<span class="ltr">table, th, td { border: 1px solid black; }</span>' },
      { css: ['table, th, td {', '  border: 1px solid black;', '}'], on: [], b: 1, z: 1, en: 'So every line is <b>double</b>: each cell has its own box, and the table has one more box around them (see the zoom).', ar: 'فكل خط بيطلع <b>مزدوج</b>، لأن كل cell ليها box لوحدها، والجدول ليه box كمان حواليهم (بص على الـ zoom).' },
      { css: ['table, th, td {', '  border: 1px solid black;', '  border-collapse: collapse;', '}'], on: [2], b: 2, z: 2, en: '<b>border-collapse: collapse;</b> collapses the double borders into a <b>single border</b>.', ar: 'الـ <bdi dir="ltr">border-collapse: collapse;</bdi> بيدمج الـ borders المزدوجة في <b>border واحد</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i];
    const bd = s.b ? '1px solid var(--ink)' : '0';
    return html`<${Fig}><div className="fig-stage"><div className="wbv5-two">
      <${Code} lines=${s.css.length ? ['<style>', ...s.css, '</style>'] : ['<style>', '  /* no CSS yet */', '</style>']} on=${(s.on || []).map(x => x + 1)} label="CSS" />
      <div><div className="wbv5-arrow">▼ the browser shows ▼</div><${Win} title="Collapsed Borders">
        <${DataTable} rows=${JILL} tbl=${{ border: bd, borderCollapse: s.b === 2 ? 'collapse' : 'separate', borderSpacing: '2px' }} cell=${{ border: bd, padding: '1px 5px' }} /><//>
        <div className=${'wbv5-zoom ' + pop(!!s.z)}><span>zoom:</span><div className=${'wbv5-zt' + (s.z === 2 ? ' c' : '')}><i></i><i></i></div><span>${s.z === 2 ? 'one line' : 'two lines + the table box'}</span></div></div>
    </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [5.2] to [5.4] slides 24 to 28: invisible look, rounded, skip the outer border, style, colour ── */
  const STY = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden'];
  const TEAL = '#96D4D4';
  function TableStyle({ ar }) {
    const [k, setK] = useState('round'), [st, setSt] = useState('dotted');
    const P = {
      round: { css: ['table, th, td {', '  border: 1px solid black;', '  border-radius: 10px;', '}'], en: '<b>border-radius: 10px;</b> on table, th and td: the borders get rounded corners, around the table and every cell.', ar: 'الـ <bdi dir="ltr">border-radius: 10px;</bdi> على الـ table والـ th والـ td بيخلي الـ borders أركانها مدوّرة، حوالين الجدول وكل cell.' },
      skip: { css: ['th, td {', '  border: 1px solid black;', '  border-radius: 10px;', '}'], en: '<b>Skip the border around the table</b> by leaving table out of the selector: only the cells are boxed.', ar: 'لو <b>شلت الـ table من الـ selector</b> مش هيبقى فيه border حوالين الجدول، والـ cells بس اللي ليها boxes.' },
      style: { css: ['th, td {', `  border-style: ${st};`, '}'], en: `<b>border-style: ${st};</b> sets the look of the border. The values: dotted, dashed, solid, double, groove, ridge, inset, outset, none, hidden.`, ar: `القيمة ${T('border-style: ' + st + ';')} بتحدد شكل الـ border. القيم هي:<span class="ltr">dotted, dashed, solid, double, groove, ridge, inset, outset, none, hidden</span>` },
      color: { css: ['table, th, td {', '  border: 1px solid black;', '}', 'th, td {', '  border-color: #96D4D4;', '}'], en: '<b>border-color</b> sets the colour of the border: here the cells get #96D4D4.', ar: 'الـ <bdi dir="ltr">border-color</bdi> بيحدد لون الـ border، وهنا الـ cells بتاخد <bdi dir="ltr">#96D4D4</bdi>.' },
      inv: { css: ['table, th, td {', '  border: 1px solid white;', '  border-collapse: collapse;', '}', 'th, td {', '  background-color: #96D4D4;', '}'], en: 'Give each cell a <b>background colour</b> and the border a <b>white</b> colour (the same as the page background, drawn here in the page colour): you get the impression of an <b>invisible border</b>.', ar: 'لو اديت كل cell <b>background color</b> وخليت لون الـ border <b>أبيض</b> (نفس لون خلفية الـ document، ومترسوم هنا بلون الصفحة)، هيبان كأن الـ border <b>مش موجود</b>.' }
    }[k];
    const ink = '1px solid var(--ink)';
    const tbl = k === 'round' ? { border: ink, borderRadius: '10px' } : k === 'color' ? { border: ink } : k === 'inv' ? { border: '1px solid var(--paper)', borderCollapse: 'collapse' } : {};
    const cell = k === 'round' || k === 'skip' ? { border: ink, borderRadius: '10px' } : k === 'style' ? { borderStyle: st, borderColor: 'var(--ink)' }
      : k === 'color' ? { border: '1px solid ' + TEAL } : { border: '1px solid var(--paper)', background: TEAL, color: '#000' };
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Border" items=${[['round', 'Rounded'], ['skip', 'Rounded, no outer'], ['style', 'border-style'], ['color', 'border-color'], ['inv', 'Invisible look']]} sel=${k} on=${setK} />
      ${k === 'style' && html`<${Chips} mono=${true} label="border-style" items=${STY.map(x => [x, x])} sel=${st} on=${setSt} />`}
      <div className="wbv5-two"><${Code} lines=${['<style>', ...P.css, '</style>']} label="CSS" />
        <div><div className="wbv5-arrow">▼ the browser shows ▼</div><${Win}><${DataTable} key=${k + st} rows=${JILL} tbl=${Object.assign({ borderSpacing: '2px' }, tbl)} cell=${Object.assign({ padding: '2px 6px' }, cell)} /><//></div></div>
      </div><${Cap} en=${P.en} ar=${P.ar} showAr=${ar} /><//>`;
  }

  /* ── [5.5] slides 29 to 31: table width, column width, row height ── */
  function TableSizes({ ar }) {
    const [w, setW] = useState(true), [cw, setCw] = useState(true), [rh, setRh] = useState(false);
    const rows = JILL.slice(0, 3);
    const lines = [`<table${w ? ' style="width:100%"' : ''}>`, '  <tr>', `    <th${cw ? ' style="width:70%"' : ''}>Firstname</th>`, '    <th>Lastname</th>', '    <th>Age</th>', '  </tr>',
      `  <tr${rh ? ' style="height:200px"' : ''}>`, '    <td>Jill</td>', '    <td>Smith</td>', '    <td>50</td>', '  </tr>', '  <tr>', '    <td>Eve</td>', '    <td>Jackson</td>', '    <td>94</td>', '  </tr>', '</table>'];
    const on = [w && 0, cw && 2, rh && 6].filter(x => x !== false);
    const T2 = (v, set, t) => html`<button className="fig-btn m" aria-pressed=${String(v)} onClick=${() => set(!v)}>${t}</button>`;
    const parts = [w && ['the table is <b>width:100%</b> of the page', `الجدول عرضه ${T('width:100%')} من الصفحة`], cw && ['the first column is <b>width:70%</b> (set on its &lt;th&gt;)', `الـ column الأول عرضه ${T('width:70%')} (متحط على الـ th بتاعه)`], rh && ['the Jill row is <b>height:200px</b> (set on its &lt;tr&gt;)', `الـ row بتاع Jill ارتفاعه ${T('height:200px')} (متحط على الـ tr بتاعه)`]].filter(Boolean);
    const en = 'Use the <b>style</b> attribute with width or height. ' + (parts.length ? 'Now ' + parts.map(p => p[0]).join('; ') + '.' : 'With none set, the table is only as wide as its content.');
    const a = 'استخدم الـ style attribute مع الـ width أو الـ height. ' + (parts.length ? 'دلوقتي ' + parts.map(p => p[1]).join('، و') + '.' : 'ولو مفيش ولا واحد، الجدول عرضه على قد المحتوى بس.');
    const ink = '1px solid var(--ink)';
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv5-chips" role="group" aria-label="Sizes">${T2(w, setW, 'table width:100%')}${T2(cw, setCw, 'th width:70%')}${T2(rh, setRh, 'tr height:200px')}</div>
      <div className="wbv5-two"><${Code} lines=${lines} on=${on} />
        <div><div className="wbv5-arrow">▼ the browser shows ▼</div><${Win}><${DataTable} rows=${rows} tbl=${{ width: w ? '100%' : 'auto', borderCollapse: 'collapse', border: ink }} cell=${{ border: ink, padding: '1px 4px' }}
          rowStyle=${j => j === 1 && rh ? { height: '200px' } : null} cellStyle=${(j, q) => j === 0 && q === 0 && cw ? { width: '70%' } : null} /><//></div></div>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [5.6] slide 37: zebra stripes with nth-child(even) ── */
  const ZEB = [['First Name', 'Last Name', 'Points'], ['Jill', 'Smith', '50'], ['Eve', 'Jackson', '94'], ['Adam', 'Johnson', '67']];
  function TableZebra({ ar }) {
    const [k, setK] = useState('tr');
    const grey = 'color-mix(in srgb, var(--ink) 11%, var(--paper))';
    const C = {
      none: { css: ['/* no stripes */'], en: 'No stripes: every row has the page background.', ar: 'من غير stripes، كل الـ rows بخلفية الصفحة.' },
      tr: { css: ['tr:nth-child(even) {', '  background-color: #f2f2f2;', '}'], en: '<b>tr:nth-child(even)</b> picks rows 2, 4, …: the header row is row 1, so Jill (row 2) and Adam (row 4) get the light grey #f2f2f2. Striped rows.', ar: 'الـ <bdi dir="ltr">tr:nth-child(even)</bdi> بيختار الـ rows رقم 2 و 4 وهكذا. الـ header row رقمه 1، فـ Jill (row رقم 2) و Adam (row رقم 4) بياخدوا الرمادي الفاتح <bdi dir="ltr">#f2f2f2</bdi>، فتطلع الـ rows مقلّمة.' },
      td: { css: ['td:nth-child(even) {', '  background-color: #f2f2f2;', '}'], en: 'Or <b>td:nth-child(even)</b>: the 2nd cell of every row, so the Last Name column is striped (its header is a th, not a td).', ar: 'أو <bdi dir="ltr">td:nth-child(even)</bdi>، وده تاني cell في كل row، فالـ column بتاع Last Name هو اللي بيتلوّن (والـ header بتاعه th مش td).' }
    }[k];
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="Stripes" items=${[['none', 'none'], ['tr', 'tr:nth-child(even)'], ['td', 'td:nth-child(even)']]} sel=${k} on=${setK} />
      <div className="wbv5-two"><${Code} lines=${['<style>', ...C.css, '</style>']} label="CSS" />
        <div><div className="wbv5-arrow">▼ the browser shows ▼</div><${Win}><${DataTable} rows=${ZEB} tbl=${{ width: '100%', borderCollapse: 'collapse' }} cell=${{ padding: '4px 6px', borderBottom: '1px solid var(--line)', textAlign: 'left' }}
          rowStyle=${j => k === 'tr' && j % 2 === 1 ? { background: grey } : null} cellStyle=${(j, q) => k === 'td' && j > 0 && q === 1 ? { background: grey } : null} /><//></div></div>
      </div><${Cap} en=${C.en} ar=${C.ar} showAr=${ar} /><//>`;
  }

  /* ── [5.6] slide 37: the responsive table (a div with overflow-x:auto) ── */
  function TableResponsive({ ar }) {
    const [wrap, setWrap] = useState(true), [x, setX] = useState(0);
    const N = 10, rows = [['First Name', 'Last Name', ...Array(N).fill('Points')], ['Jill', 'Smith', ...Array(N).fill('50')], ['Eve', 'Jackson', ...Array(N).fill('94')], ['Adam', 'Johnson', ...Array(N).fill('67')]];
    const WIDE = 760, VIEW = 250, shift = wrap ? x / 100 * (WIDE - VIEW) : 0;
    const lines = wrap ? ['<div style="overflow-x:auto;">', '  <table>', '    …', '  </table>', '</div>'] : ['<table>', '  …', '</table>'];
    const en = wrap ? 'Wrapped in a container element (a &lt;div&gt;) with <b>overflow-x:auto</b>, the table is <b>responsive</b>: on a screen too small for it, a horizontal scroll bar shows the full content. Drag the slider to scroll.'
      : 'Without the wrapper, the table is wider than the small screen: its columns run past the right edge (the dashed line).';
    const a = wrap ? 'لما تحطه جوه container element (زي <bdi dir="ltr">&lt;div&gt;</bdi>) عليه <bdi dir="ltr">overflow-x:auto</bdi>، الجدول بيبقى <b>responsive</b>، ولو الشاشة صغيرة عليه بيظهر horizontal scroll bar يعرض المحتوى كله. حرّك الـ slider عشان تعمل scroll.'
      : 'من غير الـ div، الجدول أعرض من الشاشة الصغيرة، والـ columns بتعدّي الطرف اليمين (الخط المتقطع).';
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Wrapper" items=${[['no', 'Table only'], ['yes', 'In <div style="overflow-x:auto">']]} sel=${wrap ? 'yes' : 'no'} on=${v => { setWrap(v === 'yes'); setX(0); }} />
      <${Code} lines=${lines} on=${wrap ? [0, 4] : []} />
      <div className="wbv5-arrow" style=${{ marginTop: '8px' }}>▼ on a small screen ▼</div>
      <div className="wbv5-phone" style=${{ maxWidth: VIEW + 'px', margin: '0 auto' }}>
        <div className="wbv5-page" style=${{ padding: 0, minHeight: 0 }}><div className="wbv5-wide" style=${{ width: WIDE + 'px', transform: `translateX(${-shift}px)` }}>
          <${DataTable} rows=${rows} tbl=${{ borderCollapse: 'collapse', width: '100%' }} cell=${{ padding: '3px 5px', borderBottom: '1px solid var(--line)', whiteSpace: 'nowrap', textAlign: 'left' }} rowStyle=${j => j % 2 === 1 ? { background: 'color-mix(in srgb, var(--ink) 11%, var(--paper))' } : null} /></div></div>
        ${wrap ? html`<div className="wbv5-track"><div className="wbv5-thumb" style=${{ width: (VIEW / WIDE * 100) + '%', left: (x / 100 * (1 - VIEW / WIDE) * 100) + '%' }}></div></div>` : html`<div className="wbv5-edge"></div>`}
      </div>
      ${wrap && html`<div className="wbv5-ctl" style=${{ maxWidth: VIEW + 'px', margin: '8px auto 0' }}><span>scroll</span><input type="range" min="0" max="100" value=${x} onInput=${e => setX(+e.target.value)} aria-label="Scroll the table" /></div>`}
    </div><${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [6] slides 33 to 36: colspan and rowspan, on and off ── */
  const SPAN = {
    col: { attr: 'colspan="2"', css: true },
    row: { attr: 'rowspan="2"' }
  };
  function TableSpan({ ar }) {
    const [k, setK] = useState('col'), [on, setOn] = useState(true);
    const CSSL = ['<style>', 'table, th, td {', '  border: 1px solid black;', '  border-collapse: collapse;', '}', '</style>'];
    const A = on ? ' ' + SPAN[k].attr : '';
    const lines = k === 'col'
      ? [...CSSL, '<table style="width:100%">', '  <tr>', `    <th${A}>Name</th>`, '    <th>Age</th>', '  </tr>', '  <tr>', '    <td>Jill</td>', '    <td>Smith</td>', '    <td>43</td>', '  </tr>', '</table>']
      : [...CSSL, '<table>', '  <tr>', '    <th>Name</th>', '    <td>Jill</td>', '  </tr>', '  <tr>', `    <th${A}>Phone</th>`, '    <td>555-1234</td>', '  </tr>', '  <tr>', '    <td>555-8745</td>', '  </tr>', '</table>'];
    const hlL = k === 'col' ? [8] : [12];
    const ink = '1px solid var(--ink)', cs = { border: ink, padding: '2px 6px' }, sel = { background: 'color-mix(in srgb, var(--fig-k) 22%, var(--paper))' };
    const tbl = k === 'col'
      ? html`<table style=${{ width: '100%', borderCollapse: 'collapse', border: ink }}><tbody>
          <tr><th colSpan=${on ? 2 : 1} style=${Object.assign({}, cs, sel)}>Name</th><th style=${cs}>Age</th></tr>
          <tr><td style=${cs}>Jill</td><td style=${cs}>Smith</td><td style=${cs}>43</td></tr></tbody></table>`
      : html`<table style=${{ borderCollapse: 'collapse', border: ink }}><tbody>
          <tr><th style=${cs}>Name</th><td style=${cs}>Jill</td></tr>
          <tr><th rowSpan=${on ? 2 : 1} style=${Object.assign({}, cs, sel)}>Phone</th><td style=${cs}>555-1234</td></tr>
          <tr><td style=${cs}>555-8745</td></tr></tbody></table>`;
    const C = k === 'col'
      ? (on ? { en: '<b>colspan="2"</b>: the Name header spans 2 columns, over Jill and Smith; Age sits over 43. Row 1: 2 + 1 = 3 columns, row 2: 3 cells.', ar: 'الـ <bdi dir="ltr">colspan="2"</bdi> بيخلي الـ header بتاع Name يمتد على 2 columns فوق Jill و Smith، والـ Age فوق 43. الحسبة كده:<span class="ltr">row 1: 2 + 1 = 3 columns, row 2: 3 cells</span>' }
        : { en: 'Without colspan, Name covers only 1 column: Age slides over Smith and the 3rd column of row 1 is empty.', ar: 'من غير الـ colspan، الـ Name بيغطي column واحد بس، فالـ Age بيتزق فوق Smith وتالت column في أول row بيفضل فاضي.' })
      : (on ? { en: '<b>rowspan="2"</b>: the Phone header spans 2 rows. In the next row its position is already taken, so that row has only one &lt;td&gt;: 555-8745 lands next to Phone.', ar: 'الـ <bdi dir="ltr">rowspan="2"</bdi> بيخلي الـ header بتاع Phone يمتد على 2 rows. في الـ row اللي بعده مكانه متغطي، فالـ row ده فيه <bdi dir="ltr">&lt;td&gt;</bdi> واحد بس، والـ <bdi dir="ltr">555-8745</bdi> بيقع جنب Phone.' }
        : { en: 'Without rowspan, Phone covers only its own row: the last row\'s single &lt;td&gt; 555-8745 falls into the first column, under Phone.', ar: 'من غير الـ rowspan، الـ Phone بيغطي الـ row بتاعه بس، فالـ <bdi dir="ltr">&lt;td&gt;</bdi> الوحيد في آخر row (<bdi dir="ltr">555-8745</bdi>) بيقع في أول column تحت Phone.' });
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Example" items=${[['col', 'colspan: Name'], ['row', 'rowspan: Phone']]} sel=${k} on=${v => { setK(v); setOn(true); }} />
      <div className="wbv5-chips"><button className="fig-btn m" aria-pressed=${String(on)} onClick=${() => setOn(!on)}>${SPAN[k].attr} ${on ? 'on' : 'off'}</button></div>
      <div className="wbv5-two"><${Code} lines=${lines} on=${hlL} />
        <div><div className="wbv5-arrow">▼ the browser shows ▼</div><${Win} title=${k === 'col' ? 'Cell that spans two columns' : 'Cell that spans two rows'}><div key=${k + on} className="wbv5-li">${tbl}</div><//></div></div>
      </div><${Cap} en=${C.en} ar=${C.ar} showAr=${ar} /><//>`;
  }

  /* ── [7] the exam method for an irregular table, with the notes' question and a grid you can merge ── */
  const EXAMPLES = {
    exam: { R: 3, C: 3, cells: [[0, 0, 1, 2, 'A'], [0, 2, 2, 1, 'B'], [1, 0, 2, 1, 'C'], [1, 1, 1, 1, 'D'], [2, 1, 1, 2, 'E']].map(([r, c, rs, cs, t]) => ({ r, c, rs, cs, t, tag: 'th' })), border: true },
    col: { R: 2, C: 3, cells: [[0, 0, 1, 2, 'Name', 'th'], [0, 2, 1, 1, 'Age', 'th'], [1, 0, 1, 1, 'Jill', 'td'], [1, 1, 1, 1, 'Smith', 'td'], [1, 2, 1, 1, '43', 'td']].map(([r, c, rs, cs, t, tag]) => ({ r, c, rs, cs, t, tag })) },
    row: { R: 3, C: 2, cells: [[0, 0, 1, 1, 'Name', 'th'], [0, 1, 1, 1, 'Jill', 'td'], [1, 0, 2, 1, 'Phone', 'th'], [1, 1, 1, 1, '555-1234', 'td'], [2, 1, 1, 1, '555-8745', 'td']].map(([r, c, rs, cs, t, tag]) => ({ r, c, rs, cs, t, tag })) }
  };
  const units = (R, C) => { const a = []; for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) a.push({ r, c, rs: 1, cs: 1, tag: 'td' }); return a; };
  const letter = cells => cells.slice().sort((p, q) => p.r - q.r || p.c - q.c).map((x, j) => Object.assign({}, x, { t: alpha(j + 1) }));
  const hits = (x, b) => x.r < b.r2 && x.r + x.rs > b.r1 && x.c < b.c2 && x.c + x.cs > b.c1;
  function merge(cells, a, b) {
    const box = { r1: Math.min(a.r, b.r), c1: Math.min(a.c, b.c), r2: Math.max(a.r + a.rs, b.r + b.rs), c2: Math.max(a.c + a.cs, b.c + b.cs) };
    for (let ch = true; ch;) { ch = false; cells.forEach(x => { if (hits(x, box)) { const n = { r1: Math.min(box.r1, x.r), c1: Math.min(box.c1, x.c), r2: Math.max(box.r2, x.r + x.rs), c2: Math.max(box.c2, x.c + x.cs) }; if (n.r1 !== box.r1 || n.c1 !== box.c1 || n.r2 !== box.r2 || n.c2 !== box.c2) { Object.assign(box, n); ch = true; } } }); }
    return cells.filter(x => !hits(x, box)).concat([{ r: box.r1, c: box.c1, rs: box.r2 - box.r1, cs: box.c2 - box.c1, tag: 'td' }]);
  }
  function split(cells, a) { const out = cells.filter(x => x !== a); for (let r = a.r; r < a.r + a.rs; r++) for (let c = a.c; c < a.c + a.cs; c++) out.push({ r, c, rs: 1, cs: 1, tag: 'td' }); return out; }
  const tagLine = x => `<${x.tag}${x.cs > 1 ? ` colspan="${x.cs}"` : ''}${x.rs > 1 ? ` rowspan="${x.rs}"` : ''}>${x.t}</${x.tag}>`;
  const desc = x => x.t + (x.cs > 1 || x.rs > 1 ? ' (' + [x.cs > 1 && 'colspan ' + x.cs, x.rs > 1 && 'rowspan ' + x.rs].filter(Boolean).join(', ') + ')' : '');
  // the method's steps for a layout: code lines, which row is on, and the captions (also used by the test harness)
  function method(L) {
    const { R, C, cells } = L, lines = [`<table${L.border ? ' border="1"' : ''}>`], rowLines = [], steps = [];
    for (let r = 0; r < R; r++) {
      const nw = cells.filter(x => x.r === r).sort((p, q) => p.c - q.c), up = cells.filter(x => x.r < r && x.r + x.rs > r).sort((p, q) => p.c - q.c);
      const from = lines.length; lines.push('  <tr>'); nw.forEach(x => lines.push('    ' + tagLine(x))); lines.push('  </tr>');
      rowLines.push([from, lines.length]);
      const parts = cells.filter(x => nw.includes(x) || up.includes(x)).sort((p, q) => p.c - q.c).map(x => `${x.cs} (${x.t}${up.includes(x) ? ' from above' : ''})`);
      const sum = nw.concat(up).reduce((s, x) => s + x.cs, 0), eq = `${parts.join(' + ')} = ${sum}${sum === C ? ' ✓' : ' ✗'}`;
      const nl = nw.map(desc).join(', '), ul = up.map(x => x.t).join(', ');
      steps.push({ row: r, nw, up,
        en: `<b>Row ${r + 1}</b>: write a &lt;tr&gt;, then one cell for each cell that <b>starts</b> in this row: ${nw.length ? esc(nl) : 'none'}.` + (up.length ? ` Skip ${esc(ul)}: already covered by a rowspan from above.` : '') + ` Check: ${esc(eq)}`,
        ar: `في الـ row رقم ${r + 1}، اكتب <bdi dir="ltr">&lt;tr&gt;</bdi> وبعدين cell لكل cell <b>بتبدأ</b> في الـ row ده، وهي ${nw.length ? T(nl) : 'ولا واحدة'}.` + (up.length ? ` واتخطّى ${T(ul)} لأنها متغطية بـ rowspan من فوق.` : '') + ` والـ check بيطلع كده:<span class="ltr">${esc(eq)}</span>` });
    }
    lines.push('</table>');
    const first = { row: -1, en: `<b>Count</b>: the widest row has <b>${C}</b> unit columns (the smallest unit width), and there are <b>${R}</b> rows.`, ar: `أول حاجة <b>عِدّ</b>، أعرض row فيه <b>${C}</b> columns (أصغر عرض وحدة)، وعدد الـ rows هو <b>${R}</b>.` };
    const last = { row: -2, en: `Done: every row checks out to ${C} columns. The browser draws the code as the table below.`, ar: `خلصنا، وكل row مجموعه طلع ${C} columns. والـ browser بيرسم الكود ده زي الجدول اللي تحت.` };
    return { lines, rowLines, steps: [first, ...steps, last] };
  }
  function MethodRun({ L, ar }) {
    const m = method(L), [i, setI] = useState(0), s = m.steps[i];
    const ctl = { go: setI, replay: () => setI(0) };
    const shownTo = s.row === -2 ? m.lines.length : s.row >= 0 ? m.rowLines[s.row][1] : 1;
    const lines = m.lines.slice(0, shownTo);
    const on = s.row >= 0 ? Array.from({ length: m.rowLines[s.row][1] - m.rowLines[s.row][0] }, (_, j) => m.rowLines[s.row][0] + j) : [];
    const ink = '1px solid var(--ink)';
    const rows = []; for (let r = 0; r < L.R; r++) rows.push(L.cells.filter(x => x.r === r).sort((p, q) => p.c - q.c));
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}>
      <div className="wbv5-grid" style=${{ gridTemplateColumns: `repeat(${L.C}, minmax(0,1fr))`, maxWidth: '300px', marginBottom: '10px' }} aria-hidden="true">
        ${L.cells.map((x, j) => { const cls = s.row < 0 ? '' : s.nw.includes(x) ? ' new' : s.up.includes(x) ? ' up' : ' dim';
          return html`<div key=${j} className=${'wbv5-cell' + cls} style=${{ gridRow: `${x.r + 1} / span ${x.rs}`, gridColumn: `${x.c + 1} / span ${x.cs}`, display: 'grid', placeItems: 'center', cursor: 'default', minHeight: '34px' }}>${x.t}${s.row >= 0 && s.up.includes(x) && html`<small>from above</small>`}</div>`; })}</div>
      <div className="wbv5-two"><${Code} lines=${lines} on=${on} fresh=${on} />
        ${s.row === -2 && html`<div><div className="wbv5-arrow">▼ the browser shows ▼</div><${Win}><table className="wbv5-li" style=${{ borderCollapse: 'collapse', border: ink, minWidth: '60%' }}><tbody>
          ${rows.map((rw, r) => html`<tr key=${r}>${rw.map((x, q) => { const C = x.tag; return html`<${C} key=${q} colSpan=${x.cs} rowSpan=${x.rs} style=${{ border: ink, padding: '4px 10px', textAlign: 'center' }}>${x.t}<//>`; })}</tr>`)}</tbody></table><//></div>`}</div>
      </div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${m.steps} i=${i} ctl=${ctl} />`;
  }
  function TableIrregular({ ar }) {
    const [ex, setEx] = useState('exam'), [L, setL] = useState(EXAMPLES.exam), [pick, setPick] = useState(null);
    const load = k => { setEx(k); setPick(null); setL(k === 'own' ? { R: 3, C: 3, cells: letter(units(3, 3)) } : EXAMPLES[k]); };
    const tap = x => {
      if (ex !== 'own') return;
      if (!pick) { setPick(x); return; }
      const cells = pick === x ? (x.rs > 1 || x.cs > 1 ? split(L.cells, x) : L.cells) : merge(L.cells, pick, x);
      setPick(null); setL({ R: L.R, C: L.C, cells: letter(cells) });
    };
    const size = (dr, dc) => { const R = Math.max(1, Math.min(5, L.R + dr)), C = Math.max(1, Math.min(5, L.C + dc)); setPick(null); setL({ R, C, cells: letter(units(R, C)) }); };
    const sig = JSON.stringify([L.R, L.C, L.cells.map(x => [x.r, x.c, x.rs, x.cs, x.t])]);
    return html`<${Fig}><div className="fig-stage" style=${{ paddingBottom: 4 }}>
      <${Chips} label="Example" items=${[['exam', 'Example from the notes'], ['col', 'colspan: Name'], ['row', 'rowspan: Phone'], ['own', 'Try your own']]} sel=${ex} on=${load} />
      ${ex === 'own' && html`<div>
        <div className="wbv5-rc"><span>rows ${L.R} <button className="fig-btn" onClick=${() => size(-1, 0)} disabled=${L.R <= 1} aria-label="fewer rows">−</button><button className="fig-btn" onClick=${() => size(1, 0)} disabled=${L.R >= 5} aria-label="more rows">+</button></span>
          <span>columns ${L.C} <button className="fig-btn" onClick=${() => size(0, -1)} disabled=${L.C <= 1} aria-label="fewer columns">−</button><button className="fig-btn" onClick=${() => size(0, 1)} disabled=${L.C >= 5} aria-label="more columns">+</button></span></div>
        <div className="wbv5-grid" style=${{ gridTemplateColumns: `repeat(${L.C}, minmax(0,1fr))` }}>
          ${L.cells.map(x => html`<button key=${x.r + '-' + x.c} className=${'wbv5-cell' + (pick === x ? ' pick' : '')} style=${{ gridRow: `${x.r + 1} / span ${x.rs}`, gridColumn: `${x.c + 1} / span ${x.cs}` }} onClick=${() => tap(x)} aria-pressed=${String(pick === x)}>${x.t}</button>`)}</div>
        <p className="wbv5-hint">${pick ? 'Now tap another cell: the rectangle between them becomes one cell (tap the same merged cell again to split it).' : 'Tap a cell, then another: they merge into one cell. Tap a merged cell twice to split it.'}</p></div>`}
    </div><${MethodRun} key=${sig} L=${L} ar=${ar} /><//>`;
  }
  TableIrregular.__t = { method, letter, units, merge, olCap };

  window.FIGS = Object.assign(window.FIGS || {}, {
    'wb-list-kinds': ListKinds, 'wb-list-nested': ListNested, 'wb-list-navbar': ListNavbar, 'wb-list-marker': ListMarker, 'wb-list-ol': ListOl, 'wb-list-dl': ListDl,
    'wb-table-build': TableBuild, 'wb-table-parts': TableParts, 'wb-table-collapse': TableCollapse, 'wb-table-style': TableStyle, 'wb-table-sizes': TableSizes,
    'wb-table-zebra': TableZebra, 'wb-table-responsive': TableResponsive, 'wb-table-span': TableSpan, 'wb-table-irregular': TableIrregular
  });
})();
/* ── part L6 ── */
// Web Programming visuals, Lecture 6 (HTML IV: block/inline, div/span, iframes, symbols, XHTML, forms, multimedia): block vs inline boxes,
// span styling part of a text, display changed by CSS, iframe size/border and link target, entities three ways, an XHTML rule checker,
// input types, radio/checkbox with labels, the form example sent with GET/POST, and a mock video/audio player (Lec_5_HTML slides 3 to 53).
// Every label and number comes from the site's notes and the doctor's slides. Demos never submit or load anything.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.wbv6 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.wbv6 .fig-btn:disabled{ opacity:.45; cursor:default; }
.wbv6-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.wbv6-chips .fig-btn{ font-size:.8rem; padding:4px 10px; min-height:30px; }
.wbv6-chips .fig-btn.m{ font-family:var(--mono); }
.wbv6-lbl{ font-size:.75rem; color:var(--graphite); text-align:center; margin:0 0 4px; }
.wbv6-code{ font:.78rem/1.5 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:7px 5px; white-space:pre-wrap; overflow-wrap:anywhere; direction:ltr; text-align:left; color:var(--ink); margin:0; }
.wbv6-code .ln{ display:block; border-radius:4px; padding:0 3px; transition:background .4s, opacity .4s; }
.wbv6-code .ln.on{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.wbv6-t{ color:var(--fig-k); font-weight:600; } .wbv6-an{ color:var(--pen); } .wbv6-av{ color:var(--ok); } .wbv6-cm{ color:var(--graphite); font-style:italic; }
.wbv6-two{ display:grid; grid-template-columns:minmax(0,1fr); gap:8px; max-width:600px; margin:0 auto; }
@media (min-width:640px){ .wbv6-two{ grid-template-columns:repeat(2, minmax(0,1fr)); align-items:start; } }
.wbv6-win{ border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); overflow:hidden; }
.wbv6-tabs{ display:flex; flex-wrap:wrap; gap:4px; padding:5px 6px 0; background:var(--paper-2); border-bottom:1px solid var(--line); }
.wbv6-tab{ font-size:.75rem; color:var(--ink); padding:3px 9px; border:1px solid var(--line); border-bottom:0; border-radius:6px 6px 0 0; background:var(--paper-2); min-height:22px; min-width:60px; text-align:left; }
.wbv6-tab.act{ background:var(--paper); font-weight:600; } .wbv6-tab.new{ animation:wbv6in .45s ease both; }
.wbv6-url{ font:.75rem/1.4 var(--mono); color:var(--graphite); padding:4px 8px; border-bottom:1px solid var(--line); overflow-wrap:anywhere; direction:ltr; text-align:left; }
.wbv6-page{ padding:8px 10px 10px; font-size:.95rem; line-height:1.4; overflow-wrap:anywhere; text-align:left; direction:ltr; color:var(--ink); }
.wbv6-page p{ margin:.4em 0; } .wbv6-page h2{ font-size:1.1rem; margin:.1em 0 .3em; }
/* a real web page: white by default, as the browser draws it */
.wbv6-web{ background:#fff; color:#111; border:1px solid var(--line); border-radius:8px; padding:8px 10px; font-family:"Times New Roman", Times, serif; font-size:1.05rem; line-height:1.4; direction:ltr; text-align:left; overflow-wrap:anywhere; }
.wbv6-web p{ margin:.3em 0; }
@keyframes wbv6in{ from{ opacity:0; transform:translateY(5px); } to{ opacity:1; transform:none; } }
.wbv6-in{ animation:wbv6in .45s ease both; }
/* block / inline */
.wbv6-bx{ border:1px solid var(--ink); transition:outline-color .4s, background .4s; outline:2.5px solid transparent; outline-offset:2px; box-sizing:border-box; }
.wbv6-bx.on{ outline-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 16%, transparent); }
.wbv6-tag{ display:inline-block; font:600 .75rem var(--body); color:#fff; background:var(--fig-s); border-radius:99px; padding:0 7px; margin:2px 0; }
.wbv6-meas{ display:flex; align-items:center; gap:4px; font:600 .75rem var(--body); color:var(--fig-k); margin:2px 0; }
.wbv6-meas i{ flex:1; height:0; border-top:2px solid var(--fig-k); position:relative; }
.wbv6-meas i::before, .wbv6-meas i::after{ content:""; position:absolute; top:-6px; width:2px; height:10px; background:var(--fig-k); } .wbv6-meas i::before{ left:0; } .wbv6-meas i::after{ right:0; }
/* sort quiz */
.wbv6-q{ text-align:center; margin:0 0 10px; } .wbv6-q .big{ font:700 1.2rem var(--mono); color:var(--ink); display:inline-block; padding:4px 14px; border-radius:10px; border:1.5px solid var(--fig-k); background:var(--paper); margin:4px 0 8px; }
.wbv6-q .row{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; } .wbv6-q .row .fig-btn{ min-width:110px; }
.wbv6-q.shake .big{ animation:wbv6sh .4s ease; } @keyframes wbv6sh{ 25%{ transform:translateX(-5px); } 75%{ transform:translateX(5px); } }
.wbv6-cols{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px; max-width:440px; margin:0 auto; }
.wbv6-col{ border:1.5px solid var(--line); border-radius:8px; padding:5px; background:var(--paper); min-height:70px; }
.wbv6-col > b{ display:block; font-size:.8rem; color:var(--fig-k); text-align:center; margin:0 0 4px; }
.wbv6-col > small{ display:block; font-size:.75rem; color:var(--graphite); text-align:center; margin:0 0 4px; }
.wbv6-slot{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; }
.wbv6-it{ font:600 .8rem var(--mono); padding:2px 7px; border-radius:99px; border:1.3px solid var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); color:var(--ink); animation:wbv6in .45s ease both; }
.wbv6-it.miss{ border-color:var(--pen); border-style:dashed; }
.wbv6-score{ text-align:center; font-size:.85rem; color:var(--graphite); margin:6px 0 0; }
/* display */
.wbv6-dnote{ font-size:.75rem; color:var(--graphite); text-align:center; margin:4px 0 0; }
/* iframe */
.wbv6-ctl{ display:grid; grid-template-columns:auto minmax(0,1fr) 3.2em; gap:4px 8px; align-items:center; font-size:.8rem; margin:6px 0 0; color:var(--ink); }
.wbv6-ctl input[type=range]{ width:100%; accent-color:var(--fig-k); } .wbv6-ctl b{ font-family:var(--mono); text-align:right; }
.wbv6-ifr{ box-sizing:border-box; overflow:hidden; background:var(--paper); transition:width .3s, height .3s; max-width:100%; }
.wbv6-ifr .in{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); color:var(--ink); height:100%; padding:6px; font:700 .8rem/1.3 "Times New Roman", serif; box-sizing:border-box; }
.wbv6-ifr .in small{ display:block; font:.75rem var(--mono); color:var(--graphite); font-weight:400; margin-bottom:2px; }
.wbv6-iname{ font:.75rem var(--mono); color:var(--graphite); }
.wbv6-a{ color:var(--fig-k); text-decoration:underline; cursor:pointer; background:none; border:0; padding:0; font:inherit; }
.wbv6-tap{ display:inline-block; animation:wbv6tap 1.4s ease-in-out infinite; } @keyframes wbv6tap{ 50%{ transform:translateY(-3px); } }
.wbv6-goo{ text-align:center; padding:6px 4px; } .wbv6-goo b{ display:block; font:700 1.1rem var(--body); color:var(--fig-k); } .wbv6-goo i{ display:block; margin:6px auto 0; width:80%; height:16px; border:1.3px solid var(--line); border-radius:99px; }
.wbv6-goo small{ font-size:.75rem; color:var(--graphite); }
/* entities */
.wbv6-grid{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin:0 0 10px; }
.wbv6-ch{ min-width:38px; min-height:38px; font:1.15rem var(--body); border-radius:8px; border:1.3px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; padding:0 4px; }
.wbv6-ch[aria-pressed="true"]{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); box-shadow:0 0 0 1.5px var(--fig-k); }
.wbv6-ch small{ font-size:.75rem; }
.wbv6-ways{ display:grid; grid-template-columns:auto minmax(0,1fr) auto; gap:5px 8px; align-items:center; max-width:380px; margin:0 auto; font-size:.8rem; color:var(--ink); }
.wbv6-ways > span{ color:var(--graphite); } .wbv6-ways code{ font:600 .85rem var(--mono); direction:ltr; overflow-wrap:anywhere; }
.wbv6-ways b{ font-size:1.25rem; text-align:center; min-width:1.6em; animation:wbv6in .4s ease both; }
.wbv6-ways .na{ color:var(--graphite); font-style:italic; font-family:var(--body); font-weight:400; font-size:.8rem; }
.wbv6-own{ max-width:420px; margin:10px auto 0; } .wbv6-own small{ display:block; font-size:.75rem; color:var(--graphite); margin:0 0 3px; }
.wbv6-inp{ font:.85rem var(--mono); width:100%; box-sizing:border-box; border:1px solid var(--line); border-radius:6px; padding:5px 8px; background:var(--paper); color:var(--ink); direction:ltr; }
textarea.wbv6-inp{ resize:vertical; min-height:96px; line-height:1.45; }
.wbv6-outp{ margin-top:6px; font-size:1.05rem; } .wbv6-outp mark{ background:color-mix(in srgb, var(--fig-k) 26%, transparent); color:inherit; border-radius:3px; padding:0 1px; }
/* xhtml */
.wbv6-rules{ list-style:none; margin:8px 0 0; padding:0; display:grid; gap:3px; font-size:.8rem; color:var(--ink); }
.wbv6-rules li{ display:grid; grid-template-columns:1.5em minmax(0,1fr); gap:4px; padding:3px 6px; border-radius:6px; border:1px solid var(--line); background:var(--paper); transition:background .3s; }
.wbv6-rules li.bad{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
.wbv6-rules li.na{ opacity:.55; }
.wbv6-rules li > i{ font-style:normal; font-weight:700; text-align:center; } .wbv6-rules li.ok > i{ color:var(--ok); } .wbv6-rules li.bad > i{ color:var(--pen); }
.wbv6-rules em{ display:block; font:.75rem var(--mono); font-style:normal; color:var(--pen); overflow-wrap:anywhere; }
.wbv6-verd{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; margin:8px 0 0; }
.wbv6-verd div{ border:1.5px solid var(--line); border-radius:8px; padding:5px 6px; background:var(--paper); font-size:.8rem; color:var(--ink); text-align:center; }
.wbv6-verd div b{ display:block; font-size:.8rem; } .wbv6-verd .ok{ border-color:var(--ok); } .wbv6-verd .bad{ border-color:var(--pen); }
/* forms */
.wbv6-form{ font-size:.95rem; color:var(--ink); }
.wbv6-form input, .wbv6-form select, .wbv6-form textarea, .wbv6-form button{ font-size:.9rem; max-width:100%; box-sizing:border-box; }
.wbv6-form input[type=text], .wbv6-form input:not([type]), .wbv6-form input[type=password], .wbv6-form input[type=email], .wbv6-form input[type=tel], .wbv6-form input[type=number]{ width:200px; }
.wbv6-form label{ cursor:pointer; }
.wbv6-form .row{ margin:3px 0; display:flex; align-items:center; gap:4px; flex-wrap:wrap; }
.wbv6-said{ font-size:.8rem; color:var(--graphite); margin-top:6px; animation:wbv6in .4s ease both; }
.wbv6-sent{ font:.8rem/1.5 var(--mono); border:1.5px dashed var(--fig-k); border-radius:8px; padding:5px 8px; margin:8px 0 0; background:var(--paper); color:var(--ink); direction:ltr; text-align:left; overflow-wrap:anywhere; }
.wbv6-sent b{ font-family:var(--body); font-size:.75rem; color:var(--graphite); display:block; font-weight:400; }
.wbv6-hl{ animation:wbv6flash 1s ease; border-radius:4px; } @keyframes wbv6flash{ 0%{ background:color-mix(in srgb, var(--fig-k) 40%, transparent); } 100%{ background:transparent; } }
/* request flow */
.wbv6-flow{ display:grid; grid-template-columns:minmax(0,1fr) 56px minmax(0,1fr); gap:6px; align-items:center; margin:10px 0 0; }
.wbv6-node{ border:1.5px solid var(--line); border-radius:8px; padding:6px; text-align:center; background:var(--paper); font-size:.8rem; color:var(--ink); transition:box-shadow .4s; }
.wbv6-node.on{ box-shadow:0 0 0 2.5px var(--fig-k); } .wbv6-node b{ display:block; font-size:.85rem; } .wbv6-node code{ font:.75rem var(--mono); overflow-wrap:anywhere; }
.wbv6-wire{ position:relative; height:24px; } .wbv6-wire::before{ content:""; position:absolute; left:0; right:0; top:50%; border-top:2px dashed var(--graphite); }
.wbv6-pk{ position:absolute; top:3px; left:0; width:18px; height:16px; border-radius:4px; background:var(--fig-s); transition:left .9s ease; }
.wbv6-pk.go{ left:calc(100% - 18px); }
.wbv6-srv{ font:.8rem/1.5 var(--mono); text-align:left; direction:ltr; }
/* media */
.wbv6-scr{ position:relative; background:#14161a; color:#f2f2f2; border-radius:4px; overflow:hidden; margin:0 auto; max-width:100%; transition:height .25s; }
.wbv6-scr .ball{ position:absolute; width:26px; height:26px; border-radius:50%; background:var(--fig-k); top:40%; left:10%; }
.wbv6-scr .ball.run{ animation:wbv6roll 3s linear infinite alternate; } @keyframes wbv6roll{ to{ left:80%; transform:rotate(360deg); } }
.wbv6-scr .msg{ position:absolute; inset:auto 6px 6px 6px; font-size:.75rem; text-align:center; }
.wbv6-scr .src{ position:absolute; top:5px; left:6px; font:.75rem var(--mono); opacity:.85; }
.wbv6-bar{ display:flex; align-items:center; gap:6px; background:#2a2d33; color:#fff; padding:4px 6px; border-radius:0 0 4px 4px; }
.wbv6-bar button{ background:none; border:0; color:#fff; font-size:.95rem; cursor:pointer; min-width:28px; min-height:26px; padding:0; }
.wbv6-bar .tr{ flex:1; height:5px; border-radius:3px; background:#5a5f68; overflow:hidden; } .wbv6-bar .tr i{ display:block; height:100%; background:var(--fig-k); }
.wbv6-fall{ border:1.5px dashed var(--graphite); border-radius:6px; padding:8px; font-size:.85rem; text-align:center; color:var(--ink); }
.wbv6-below{ font-size:.8rem; color:var(--graphite); margin:6px 0 0; transition:transform .25s; }
.wbv6-srcs{ font:.75rem/1.5 var(--mono); margin:6px 0 0; direction:ltr; text-align:left; color:var(--ink); }
.wbv6-srcs div{ border-radius:4px; padding:0 4px; } .wbv6-srcs .use{ background:color-mix(in srgb, var(--ok) 22%, transparent); font-weight:700; } .wbv6-srcs .skip{ text-decoration:line-through; opacity:.6; }
@media (prefers-reduced-motion: reduce){ .wbv6-in, .wbv6-it, .wbv6-tap, .wbv6-tab.new, .wbv6-ways b, .wbv6-said, .wbv6-q.shake .big, .wbv6-hl, .wbv6-scr .ball.run{ animation:none; } .wbv6-pk{ transition:none; } }`;
  if (!document.getElementById('wbv6-css')) { const s = document.createElement('style'); s.id = 'wbv6-css'; s.textContent = CSS; document.head.appendChild(s); }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const T = s => `<bdi dir="ltr">${esc(s)}</bdi>`;
  function hl(src) {
    return String(src).replace(/<!--[\s\S]*?(-->|$)|<[^<>]*>|[^<]+|</g, tok => {
      if (tok.startsWith('<!--')) return `<span class="wbv6-cm">${esc(tok)}</span>`;
      const m = tok.length > 1 && tok.match(/^<(\/?!?[A-Za-z][\w-]*)([\s\S]*?)(\/?)>$/);
      if (!m) return esc(tok);
      const at = m[2].replace(/(\s*)([^\s=]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s"']+))?/g, (_, sp, n, eq, v) => esc(sp) + `<span class="wbv6-an">${esc(n)}</span>` + (eq ? esc(eq) + `<span class="wbv6-av">${esc(v)}</span>` : ''));
      return `<span class="wbv6-t">&lt;${esc(m[1])}</span>${at}<span class="wbv6-t">${m[3]}&gt;</span>`;
    });
  }
  const Code = ({ lines, on, label, raw }) => html`<pre className="wbv6-code" aria-label=${label || 'HTML source'}>${lines.map((l, j) => html`<span key=${j}
    className=${'ln' + (on && on.includes(j) ? ' on' : '')} dangerouslySetInnerHTML=${{ __html: (raw ? esc(l) : hl(l)) || ' ' }}></span>`)}</pre>`;
  const Win = ({ tabs, act, url, children }) => html`<div className="wbv6-win">
    <div className="wbv6-tabs">${tabs.map((t, j) => html`<span key=${t + j} className=${'wbv6-tab' + (j === (act || 0) ? ' act' : '') + (j > 0 ? ' new' : '')}>${t}</span>`)}</div>
    <div className="wbv6-url">${url}</div><div className="wbv6-page">${children}</div></div>`;
  const Chips = ({ items, sel, on, mono, label }) => html`<div className="wbv6-chips" role="group" aria-label=${label || 'Choose'}>${items.map(([k, t]) => html`<button key=${k}
    className=${'fig-btn' + (mono ? ' m' : '')} aria-pressed=${String(sel === k)} onClick=${() => on(k)}>${t}</button>`)}</div>`;
  const Fig = ({ children }) => html`<figure className="fig wbv6">${children}</figure>`;
  const noSubmit = e => e.preventDefault();

  /* ── [0] slides 4, 6, 7: the slide's example, a block <div> and an inline <span>; then width/height and top/bottom margin ── */
  function Flow({ ar }) {
    const steps = [
      { en: 'The slide’s example: a <b>&lt;div&gt;</b> and a <b>&lt;span&gt;</b> inside a paragraph, both with <b>border: 1px solid black</b> so you can see the box each one takes.', ar: 'ده مثال الـ slide، فيه <bdi dir="ltr">&lt;div&gt;</bdi> و <bdi dir="ltr">&lt;span&gt;</bdi> جوه paragraph، والاتنين عليهم <bdi dir="ltr">border: 1px solid black</bdi> عشان تشوف المساحة اللي كل واحد واخدها.' },
      { en: '<b>&lt;div&gt; is block-level</b>: it always starts on a new line and takes up the full width available (100% of the parent), stretching out to the left and right as far as it can.', ar: 'الـ <bdi dir="ltr">&lt;div&gt;</bdi> ده <b>block-level</b>، فدايمًا بيبدأ في سطر جديد وبياخد العرض كله (<bdi dir="ltr">100%</bdi> من الـ parent)، وبيتمد يمين وشمال على قد ما يقدر.' },
      { en: '<b>&lt;span&gt; is inline</b>: it does not start on a new line; it sits inside the paragraph’s line and takes only as much width as necessary.', ar: 'الـ <bdi dir="ltr">&lt;span&gt;</bdi> ده <b>inline</b>، فمابيبدأش في سطر جديد، بيقعد جوه سطر الـ paragraph وبياخد العرض اللي محتاجه بس.' },
      { en: 'Add <b>width: 120px; height: 40px</b> to both: the block element takes that size, the inline element ignores width and height.', ar: 'ضيف <bdi dir="ltr">width: 120px; height: 40px</bdi> للاتنين، الـ block element بياخد المقاس ده، والـ inline element بيتجاهل الـ width والـ height.' },
      { en: 'Add <b>margin: 12px 0</b> (top and bottom): the block element gets space above and below it; the inline element has no top and bottom margin, the lines do not move.', ar: 'ضيف <bdi dir="ltr">margin: 12px 0</bdi> (فوق وتحت)، الـ block element بياخد مسافة فوقه وتحته، أما الـ inline element فمالوش top و bottom margin، والسطور مابتتحركش.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const extra = (i >= 3 ? '; width: 120px; height: 40px' : '') + (i >= 4 ? '; margin: 12px 0' : '');
    const st = Object.assign({}, i >= 3 ? { width: '120px', height: '40px' } : {}, i >= 4 ? { margin: '12px 0' } : {});
    const L = [`<div style="border: 1px solid black${extra}">Hello World</div>`, '<p>This is an inline span', `<span style="border: 1px solid black${extra}">Hello World</span>`, 'element inside a paragraph.</p>'];
    return html`<${Fig}><div className="fig-stage"><div className="wbv6-two">
      <${Code} lines=${L} on=${i === 1 ? [0] : i === 2 ? [2] : i >= 3 ? [0, 2] : []} />
      <${Win} tabs=${['page.html']} url="the browser shows">
        <div className=${'wbv6-meas ' + pop(i === 1)} aria-hidden="true"><i></i><span>100% of the parent</span><i></i></div>
        <div className=${'wbv6-bx' + (i === 1 ? ' on' : '')} style=${st}>Hello World</div>
        <p style=${{ margin: '.4em 0 0' }}>This is an inline span <span className=${'wbv6-bx' + (i === 2 ? ' on' : '')} style=${st}>Hello World</span> element inside a paragraph.</p>
        <div className=${pop(i >= 1)}><span className="wbv6-tag">div: block</span> ${i >= 2 && html`<span className="wbv6-tag">span: inline</span>`}</div>
      <//></div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [0] slides 5 and 8: sort elements from the two lists into block-level and inline ── */
  const SORT = [['<div>', 'block'], ['<span>', 'inline'], ['<p>', 'block'], ['<a>', 'inline'], ['<h1>', 'block'], ['<img>', 'inline'], ['<ul>', 'block'], ['<button>', 'inline'],
    ['<table>', 'block'], ['<input>', 'inline'], ['<form>', 'block'], ['<strong>', 'inline'], ['<li>', 'block'], ['<label>', 'inline']];
  function Sort({ ar }) {
    const [k, setK] = useState(0), [placed, setPlaced] = useState([]), [msg, setMsg] = useState(null), [shake, setShake] = useState(0);
    const answer = w => {
      const it = SORT[k], ok = it[1] === w, E = esc(it[0]);
      setPlaced(p => p.concat([{ t: it[0], w: it[1], ok }])); setK(k + 1); if (!ok) setShake(x => x + 1);
      const isB = it[1] === 'block';
      setMsg({ en: (ok ? '✓ ' : '✗ ') + `<b>${E}</b> is ${isB ? 'block-level: it starts on a new line and takes the full width' : 'inline: it stays in the line and takes only the width it needs'}.`,
        ar: (ok ? 'صح ✓ ' : 'غلط ✗ ') + `الـ ${T(it[0])} ` + (isB ? 'ده block-level، بيبدأ في سطر جديد وبياخد العرض كله.' : 'ده inline، بيفضل في نفس السطر وبياخد العرض اللي محتاجه بس.') });
    };
    const right = placed.filter(p => p.ok).length, done = k >= SORT.length;
    const intro = { en: 'Block-level or inline? Each element below is in one of the slide’s two lists. Tap your answer.', ar: 'الـ element ده block-level ولا inline؟ كل واحد تحت موجود في واحدة من قايمتين الـ slide. دوس على إجابتك.' };
    const m = done ? { en: `Done: ${right} of ${SORT.length} right. Typical containers: &lt;div&gt; for blocks, &lt;span&gt; for inline text.`, ar: `خلصت، وجبت ${right} صح من ${SORT.length}. والـ container المعتاد للـ block هو ${T('<div>')}، وللـ inline هو ${T('<span>')}.` } : (msg || intro);
    const slot = w => placed.filter(p => p.w === w).map((p, j) => html`<span key=${j} className=${'wbv6-it' + (p.ok ? '' : ' miss')}>${p.t}</span>`);
    return html`<${Fig}><div className="fig-stage">
      ${done ? html`<div className="wbv6-q"><button className="fig-btn" onClick=${() => { setK(0); setPlaced([]); setMsg(null); }}>↻ Start again</button></div>`
        : html`<div key=${shake} className=${'wbv6-q' + (shake ? ' shake' : '')}><div className="wbv6-lbl">Element ${k + 1} of ${SORT.length}</div><div className="big">${SORT[k][0]}</div>
        <div className="row"><button className="fig-btn" onClick=${() => answer('block')}>Block-level</button><button className="fig-btn" onClick=${() => answer('inline')}>Inline</button></div></div>`}
      <div className="wbv6-cols">
        <div className="wbv6-col"><b>Block-level</b><small>new line, full width</small><div className="wbv6-slot">${slot('block')}</div></div>
        <div className="wbv6-col"><b>Inline</b><small>same line, fits the content</small><div className="wbv6-slot">${slot('inline')}</div></div></div>
      <p className="wbv6-score">${right} right of ${placed.length} answered</p>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [1.1] slides 10, 11: <span> marks up part of a text; with CSS it styles it ── */
  function Span({ ar }) {
    const S1 = 'color:blue;font-weight:bold', S2 = 'color:darkolivegreen;font-weight:bold';
    const steps = [
      { en: 'A plain paragraph from the slide: <i>My mother has blue eyes and my father has dark green eyes.</i>', ar: 'ده paragraph عادي من الـ slide، مفيهوش أي tags جواه.' },
      { en: 'Wrap the word <b>blue</b> in <b>&lt;span&gt;</b>. Nothing changes on the page: &lt;span&gt; has no required attributes, it only marks up a part of the text.', ar: 'حط كلمة <bdi dir="ltr">blue</bdi> جوه <bdi dir="ltr">&lt;span&gt;</bdi>. مفيش حاجة اتغيرت في الصفحة، لإن الـ span مالوش attributes إجبارية، هو بس بيعلّم جزء من النص.' },
      { en: 'Add <b>style="color:blue;font-weight:bold"</b> to the span: with CSS, only that part of the text is styled.', ar: 'ضيف للـ span الـ style ده:<span class="ltr">style="color:blue;font-weight:bold"</span>وبكده الـ CSS بيعمل style للجزء ده من النص بس.' },
      { en: 'A second span, <b>style="color:darkolivegreen;font-weight:bold"</b>, styles <b>dark green</b>.', ar: 'وفيه span تاني بيعمل style لـ <bdi dir="ltr">dark green</bdi> بالـ style ده:<span class="ltr">style="color:darkolivegreen;font-weight:bold"</span>' },
      { en: '&lt;span&gt; is inline: both spans stay inside the sentence, no new line and only the width of their words.', ar: 'الـ <bdi dir="ltr">&lt;span&gt;</bdi> ده inline، فالاتنين فضلوا جوه الجملة، من غير سطر جديد وعلى قد كلماتهم بس.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const w1 = i >= 2 ? `<span style="${S1}">blue</span>` : i >= 1 ? '<span>blue</span>' : 'blue', w2 = i >= 3 ? `<span style="${S2}">dark green</span>` : 'dark green';
    const L = ['<p>My mother has', `${w1} eyes and`, 'my father has', `${w2} eyes.</p>`];
    const sp = (on, st, t) => on ? html`<span className=${i === 4 ? 'wbv6-bx on' : ''} style=${Object.assign({ border: 0 }, st)}>${t}</span>` : t;
    return html`<${Fig}><div className="fig-stage"><div className="wbv6-two">
      <${Code} lines=${L} on=${i === 1 || i === 2 ? [1] : i === 3 ? [3] : i === 4 ? [1, 3] : []} />
      <div><div className="wbv6-lbl">the browser shows</div><div className="wbv6-web">
        <p>My mother has ${sp(i >= 1, i >= 2 ? { color: 'blue', fontWeight: 'bold' } : {}, 'blue')} eyes and my father has ${sp(i >= 3, { color: 'darkolivegreen', fontWeight: 'bold' }, 'dark green')} eyes.</p></div></div>
    </div></div><${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [1.0], [1.2] slide 12 (Example 2): a parent <div> holding four <div> blocks; change display with CSS ── */
  const BLK = [['blk1', 'red', '#fff'], ['blk2', 'green', '#fff'], ['blk3', 'blue', '#fff'], ['blk4', 'cyan', '#000']];
  function Display({ ar }) {
    const [pd, setPd] = useState('block'), [cd, setCd] = useState('block');
    const k = 1 / 6, M = 30 * k, P = 20 * k;
    const css = ['.parent{ background: yellow;', '  margin:30px; padding: 20px;', `  display: ${pd}; }`, `.blk1{ background: red; display: ${cd};`, '  margin:30px; padding: 20px; }', '/* .blk2 green, .blk3 blue,', '   .blk4 cyan: the same */'];
    const m = pd === 'flex' ? { en: '<b>display: flex</b> on the parent: its children are laid out side by side in a row. (Inside a flex parent, the children’s own display: inline is ignored.)', ar: 'لما الـ parent ياخد <bdi dir="ltr">display: flex</bdi>، الـ children بيترصّوا جنب بعض في صف واحد. (وجوه parent من النوع flex، الـ <bdi dir="ltr">display: inline</bdi> بتاع الـ children بيتجاهل.)' }
      : pd === 'grid' ? { en: '<b>display: grid</b> on the parent: no columns are set, so the grid has one column and the blocks stack again. (Inside a grid parent, the children’s own display: inline is ignored.)', ar: 'لما الـ parent ياخد <bdi dir="ltr">display: grid</bdi> من غير ما نحدد columns، الـ grid بيبقى column واحد فالـ blocks بترجع فوق بعض. (وجوه الـ grid، الـ <bdi dir="ltr">display: inline</bdi> بتاع الـ children بيتجاهل.)' }
      : cd === 'inline' ? { en: '<b>display: inline</b> on the four divs: now they behave like spans. They sit on the same line (wrapping when it is full), take only the width of their text, and their top and bottom margin no longer pushes anything.', ar: 'لما الـ 4 divs ياخدوا <bdi dir="ltr">display: inline</bdi> بيتصرفوا زي الـ spans، بيقعدوا في نفس السطر (وينزلوا سطر لما يتملي)، وبياخدوا عرض النص بتاعهم بس، والـ margin اللي فوق وتحت مابقاش بيزق حاجة.' }
      : { en: '<b>display: block</b>, the default of &lt;div&gt;: the parent div is a container for the four divs; each block starts on a new line and takes the full width, so they stack (the slide’s picture).', ar: 'الـ <bdi dir="ltr">display: block</bdi> هو الـ default بتاع الـ <bdi dir="ltr">&lt;div&gt;</bdi>. الـ div الـ parent هو container للـ 4 divs، وكل block بيبدأ في سطر جديد وبياخد العرض كله، فبيترصّوا فوق بعض، زي صورة الـ slide بالظبط.' };
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv6-lbl">.parent { display: … }</div><${Chips} mono=${true} label="parent display" items=${[['block', 'block'], ['flex', 'flex'], ['grid', 'grid']]} sel=${pd} on=${setPd} />
      <div className="wbv6-lbl">.blk1 … .blk4 { display: … }</div><${Chips} mono=${true} label="children display" items=${[['block', 'block'], ['inline', 'inline']]} sel=${cd} on=${setCd} />
      <div className="wbv6-two"><${Code} lines=${css} raw=${true} label="CSS" on=${[2, 3]} />
        <div><div style=${{ background: 'yellow', margin: 0, padding: P + 'px', display: pd, color: '#000', direction: 'ltr', textAlign: 'left', lineHeight: 1.6, borderRadius: '2px' }}>
          ${BLK.map(([c, bg, fg], j) => html`<div key=${c} style=${{ background: bg, color: fg, display: cd, margin: M + 'px', padding: P + 'px', font: '600 .75rem var(--mono)' }}>BLOCK${j + 1}</div>`)}</div>
          <p className="wbv6-dnote">margin and padding drawn at 1/6 size to fit a phone</p></div></div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [2.1], [2.2] slides 14 to 17: iframe height and width (attributes or CSS), and its border ── */
  function Iframe({ ar }) {
    const [mode, setMode] = useState('attr'), [w, setW] = useState(300), [h, setH] = useState(200), [bd, setBd] = useState('def');
    const cssv = 'height:' + h + 'px;width:' + w + 'px', ha = 'height="' + h + '"', wa = 'width="' + w + '"';
    const S = .5, sty = (mode === 'css' ? `height:${h}px;width:${w}px;` : '') + (bd === 'none' ? 'border:none;' : bd === 'red' ? 'border:2px solid red;' : '');
    const L = ['<iframe src="demo_iframe.htm"'].concat(mode === 'attr' ? [`  height="${h}" width="${w}"`] : [], sty ? [`  style="${sty}"`] : [], ['  title="Iframe Example"></iframe>']);
    const border = bd === 'none' ? 'none' : bd === 'red' ? '2px solid #e01b1b' : '2px inset var(--graphite)';
    const m = bd === 'none' ? { en: '<b>style="border:none;"</b> removes the default border: the embedded page blends into the page.', ar: 'الـ <bdi dir="ltr">style="border:none;"</bdi> بيشيل الـ border الـ default، فالصفحة اللي جوه بتبان كإنها جزء من الصفحة.' }
      : bd === 'red' ? { en: 'With CSS you can also change the border’s size, style and colour: <b>style="border:2px solid red;"</b>.', ar: 'وبالـ CSS كمان تقدر تغيّر مقاس الـ border والـ style واللون بتاعه، زي <bdi dir="ltr">border:2px solid red;</bdi> كده.' }
      : mode === 'css' ? { en: `The same size with CSS: <b>style="height:${h}px;width:${w}px"</b>. Always keep a <b>title</b> for screen readers.`, ar: `نفس المقاس بالـ CSS، يعني ${T(cssv)}. ودايمًا خلي فيه <bdi dir="ltr">title</bdi> عشان الـ screen readers.` }
      : { en: `An iframe embeds another document in this page. <b>height="${h}" width="${w}"</b> are in pixels by default; by default the iframe has a border. Drawn at half size.`, ar: `الـ iframe بيحط document تاني جوه الصفحة دي. الـ ${T(ha)} والـ ${T(wa)} بالـ pixels كـ default، وكـ default الـ iframe عليه border. ومرسوم بنص المقاس.` };
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="size" items=${[['attr', 'height / width attributes'], ['css', 'CSS style']]} sel=${mode} on=${setMode} />
      <${Chips} label="border" mono=${true} items=${[['def', 'default'], ['none', 'border:none'], ['red', '2px solid red']]} sel=${bd} on=${setBd} />
      <div className="wbv6-two"><div><${Code} lines=${L} on=${[1, 2].filter(j => j < L.length - 1)} />
        <div className="wbv6-ctl"><span>width</span><input type="range" min="100" max="500" step="50" value=${w} onInput=${e => setW(+e.target.value)} aria-label="width" /><b>${w}</b>
          <span>height</span><input type="range" min="100" max="400" step="50" value=${h} onInput=${e => setH(+e.target.value)} aria-label="height" /><b>${h}</b></div></div>
        <${Win} tabs=${['HTML Iframes']} url="page.html">
          <h2>HTML Iframes</h2><p style=${{ fontSize: '.8rem' }}>You can use the height and width attributes to specify the size of the iframe:</p>
          <div className="wbv6-ifr" style=${{ width: w * S + 'px', height: h * S + 'px', border }} title="Iframe Example">
            <div className="in"><small>demo_iframe.htm</small>This page is displayed in an iframe</div></div><//></div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [3] slide 18: a link whose target is the iframe's name opens inside the iframe ── */
  function Target({ ar }) {
    const [tg, setTg] = useState('iframe_a'), [go, setGo] = useState(false);
    const pick = v => { setTg(v); setGo(false); };
    const L = ['<iframe src="demo_iframe.htm" name="iframe_a"', '  height="300px" width="100%"', '  title="Iframe Example"></iframe>', `<p><a href="https://www.google.com"${tg === 'none' ? '' : ` target="${tg}"`}>`, '  Google.com</a></p>'];
    const goo = html`<div className="wbv6-goo wbv6-in"><b>google.com</b><i></i><small>the linked page</small></div>`;
    const page = html`<h2>Iframe - Target for a Link</h2>
      <div className="wbv6-iname">name="iframe_a"</div>
      <div className="wbv6-ifr" style=${{ width: '100%', height: '96px', border: '2px inset var(--graphite)' }}>${go && tg === 'iframe_a' ? goo : html`<div className="in"><small>demo_iframe.htm</small>This page is displayed in an iframe</div>`}</div>
      <p><button className="wbv6-a" onClick=${() => setGo(true)}>Google.com</button> ${!go && html`<span className="wbv6-tap" aria-hidden="true">👆</span>`}</p>`;
    let win, m;
    if (!go) { win = html`<${Win} tabs=${['page.html']} url="page.html">${page}<//>`; m = { en: 'Tap the link <b>Google.com</b>. Pick the link’s target first: the iframe’s name, _blank, or no target.', ar: 'دوس على الـ link اللي اسمه <bdi dir="ltr">Google.com</bdi>، واختار الـ target بتاع الـ link الأول (اسم الـ iframe، أو <bdi dir="ltr">_blank</bdi>، أو من غير target).' }; }
    else if (tg === 'iframe_a') { win = html`<${Win} tabs=${['page.html']} url="page.html">${page}<//>`; m = { en: 'The link’s <b>target="iframe_a"</b> equals the iframe’s <b>name="iframe_a"</b>, so the link opens inside the iframe. The rest of the page stays.', ar: 'الـ target بتاع الـ link هو <bdi dir="ltr">iframe_a</bdi>، وده نفس الـ name بتاع الـ iframe، فالـ link اتفتح جوه الـ iframe، وباقي الصفحة زي ما هو.' }; }
    else if (tg === '_blank') { win = html`<${Win} tabs=${['page.html', 'google.com']} act=${1} url="https://www.google.com">${goo}<//>`; m = { en: '<b>target="_blank"</b> is not the iframe’s name: the link opens in a new tab, and the iframe is not used.', ar: 'الـ <bdi dir="ltr">target="_blank"</bdi> مش اسم الـ iframe، فالـ link اتفتح في tab جديدة، والـ iframe ماتستخدمش.' }; }
    else { win = html`<${Win} tabs=${['google.com']} url="https://www.google.com">${goo}<//>`; m = { en: 'With no target the link opens in the same tab: the whole page, iframe included, is replaced. To fill the iframe, the target must equal its name.', ar: 'من غير target الـ link بيتفتح في نفس الـ tab، والصفحة كلها (والـ iframe معاها) بتتشال. وعشان يتفتح جوه الـ iframe لازم الـ target يساوي الـ name بتاعه.' }; }
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="target" mono=${true} items=${[['iframe_a', 'target="iframe_a"'], ['_blank', 'target="_blank"'], ['none', 'no target']]} sel=${tg} on=${pick} />
      <div className="wbv6-two"><${Code} lines=${L} on=${go ? [0, 3] : [3]} /><div>${win}
        ${go && html`<div style=${{ textAlign: 'center', marginTop: '8px' }}><button className="fig-btn" onClick=${() => setGo(false)}>↻ Back to the page</button></div>`}</div></div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [4] slides 19 to 25: a symbol as entity name, decimal and hexadecimal reference; emojis are characters ── */
  const ENT = {
    notes: [['€', 'euro', 8364, 'euro sign'], ['©', 'copy', 169, 'copyright'], ['<', 'lt', 60, 'less-than'], ['>', 'gt', 62, 'greater-than'], ['&', 'amp', 38, 'ampersand'], [' ', 'nbsp', 160, 'non-breaking space']],
    math: [['∀', 'forall', 8704, 'for all'], ['∂', 'part', 8706, 'partial differential'], ['∃', 'exist', 8707, 'there exists'], ['∅', 'empty', 8709, 'empty sets'], ['∇', 'nabla', 8711, 'nabla'], ['∈', 'isin', 8712, 'element of'], ['∉', 'notin', 8713, 'not an element of'], ['∋', 'ni', 8715, 'contains as member'], ['∏', 'prod', 8719, 'n-ary product'], ['∑', 'sum', 8721, 'n-ary summation']],
    other: [['®', 'reg', 174, 'registered sign'], ['™', 'trade', 8482, 'trademark'], ['←', 'larr', 8592, 'leftwards arrow'], ['↑', 'uarr', 8593, 'upwards arrow'], ['→', 'rarr', 8594, 'rightwards arrow'], ['↓', 'darr', 8595, 'downwards arrow'], ['♠', 'spades', 9824, 'black spade suit'], ['♣', 'clubs', 9827, 'black club suit'], ['♥', 'hearts', 9829, 'black heart suit'], ['♦', 'diams', 9830, 'black diamond suit']],
    emoji: [128512, 128516, 128525, 128151].map(n => [String.fromCodePoint(n), null, n, 'emoji'])
  };
  const NAMES = {}; Object.values(ENT).flat().forEach(e => { if (e[1]) NAMES[e[1]] = e[2]; });
  const hex = n => n.toString(16).toUpperCase();
  function decode(s) {
    const out = []; let last = 0;
    String(s).replace(/&(#x[0-9a-fA-F]{1,6}|#[0-9]{1,7}|[A-Za-z]+);/g, (all, b, at) => {
      let cp = null;
      if (b[0] === '#') cp = b[1] === 'x' || b[1] === 'X' ? parseInt(b.slice(2), 16) : parseInt(b.slice(1), 10); else if (NAMES[b] != null) cp = NAMES[b];
      if (cp != null && cp > 0 && cp <= 0x10FFFF && !(cp >= 0xD800 && cp <= 0xDFFF)) { out.push(s.slice(last, at), { c: String.fromCodePoint(cp), src: all }); last = at + all.length; }
      return all;
    });
    out.push(s.slice(last)); return out;
  }
  function Entity({ ar }) {
    const [grp, setGrp] = useState('notes'), [sel, setSel] = useState(0), [own, setOwn] = useState('Price: 20&euro; &copy; 2024 &#128512; &#x2192; &sum;');
    const e = ENT[grp][Math.min(sel, ENT[grp].length - 1)], [c, nm, n, desc] = e, emo = grp === 'emoji', sp = nm === 'nbsp';
    const show = sp ? '␣' : c, eN = '&' + nm + ';', eD = '&#' + n + ';', eH = '&#x' + hex(n) + ';', nS = String(n), hS = hex(n);
    const m = emo ? { en: `Emojis look like images, but they are characters from the UTF-8 (Unicode) character set. With <b>&lt;meta charset="UTF-8"&gt;</b> write the decimal reference <b>&amp;#${n};</b> (or the hexadecimal &amp;#x${hex(n)};).`, ar: `الـ Emojis شكلها صور، بس هي characters من الـ UTF-8 (Unicode) character set. مع ${T('<meta charset="UTF-8">')} اكتب الـ decimal reference ${T(eD)} (أو الـ hexadecimal ${T(eH)}).` }
      : { en: `<b>${esc(desc)}</b>: the entity name <b>&amp;${nm};</b>, the decimal number <b>&amp;#${n};</b> and the hexadecimal number <b>&amp;#x${hex(n)};</b> all display ${sp ? 'a space that does not break the line' : `<b>${esc(c)}</b>`}. (${n} in hexadecimal is ${hex(n)}.)`,
        ar: `الـ ${T(desc)} ليه 3 طرق، الـ entity name ${T(eN)} والـ decimal ${T(eD)} والـ hexadecimal ${T(eH)}، والتلاتة بيعرضوا ${sp ? 'مسافة مابتكسرش السطر' : T(c)}. والرقم ${T(nS)} بالـ hexadecimal هو ${T(hS)}.` };
    const parts = decode(own);
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="group" items=${[['notes', 'Notes'], ['math', 'Math'], ['other', 'Arrows, suits'], ['emoji', 'Emojis']]} sel=${grp} on=${g => { setGrp(g); setSel(0); }} />
      <div className="wbv6-grid" role="group" aria-label="Symbols">${ENT[grp].map((x, j) => html`<button key=${x[2]} className="wbv6-ch" aria-pressed=${String(j === sel)} onClick=${() => setSel(j)} aria-label=${x[3]}>${x[1] === 'nbsp' ? html`<small>nbsp</small>` : x[0]}</button>`)}</div>
      <div className="wbv6-ways" key=${grp + sel}>
        <span>name</span>${nm ? html`<code>${'&' + nm + ';'}</code>` : html`<code className="na">no entity name</code>`}${nm ? html`<b>${show}</b>` : html`<b></b>`}
        <span>decimal</span><code>${'&#' + n + ';'}</code><b>${show}</b>
        <span>hex</span><code>${'&#x' + hex(n) + ';'}</code><b>${show}</b></div>
      <div className="wbv6-own"><small>${'Try your own: type text with entities (&name;  &#number;  &#xhex;)'}</small>
        <textarea className="wbv6-inp" style=${{ minHeight: 0 }} rows="2" value=${own} onInput=${ev => setOwn(ev.target.value)} aria-label="Text with entities" spellCheck="false"></textarea>
        <div className="wbv6-lbl" style=${{ textAlign: 'left', marginTop: '6px' }}>the browser shows</div>
        <div className="wbv6-web wbv6-outp">${parts.map((p, j) => typeof p === 'string' ? html`<span key=${j}>${p}</span>` : html`<mark key=${j} title=${p.src}>${p.c}</mark>`)}</div></div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [5.2], [5.3] slides 28 to 35: the XHTML rules checked on the slides' correct and wrong examples ── */
  const RULES = [
    ['<!DOCTYPE> is mandatory', 'الـ <bdi dir="ltr">&lt;!DOCTYPE&gt;</bdi> إجباري'],
    ['the xmlns attribute in <html> is mandatory', 'الـ xmlns في الـ <bdi dir="ltr">&lt;html&gt;</bdi> إجباري'],
    ['<html>, <head>, <title>, <body> are mandatory', 'الـ html والـ head والـ title والـ body إجباريين'],
    ['elements properly nested', 'الـ elements لازم تبقى properly nested'],
    ['elements always closed', 'الـ elements لازم دايمًا تتقفل'],
    ['elements in lowercase', 'الـ elements لازم تبقى lowercase'],
    ['attribute names in lowercase', 'أسماء الـ attributes لازم تبقى lowercase'],
    ['attribute values quoted', 'قيم الـ attributes لازم تبقى بين quotes']];
  const XEMPTY = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'track', 'col', 'area', 'base', 'wbr', 'embed', 'param']);
  function xcheck(src) {
    const bad = {}, add = (r, s) => { (bad[r] = bad[r] || []); if (!bad[r].includes(s)) bad[r].push(s); };
    const doc = /<!doctype|<html[\s>]/i.test(src), st = [], seen = new Set(); let xmlns = false, firstHtml = true;
    const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<(\/?)([A-Za-z][\w-]*)((?:\s+[^\s"'>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*(\/?)>/gi;
    let m;
    while ((m = re.exec(src))) {
      if (!m[2]) continue;
      const close = m[1] === '/', name = m[2], ln = name.toLowerCase(), self = m[4] === '/', tag = m[0];
      seen.add(ln);
      if (name !== ln) add(6, tag);
      if (!close) {
        const ar = /([^\s"'>\/=]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'>]+))?/g; let a;
        while ((a = ar.exec(m[3] || ''))) {
          if (a[1] !== a[1].toLowerCase()) add(7, tag);
          if (!a[2] || !/^["']/.test(a[2])) add(8, tag);
          if (ln === 'html' && firstHtml && a[1].toLowerCase() === 'xmlns') xmlns = true;
        }
        if (ln === 'html') firstHtml = false;
        if (XEMPTY.has(ln)) { if (!self) add(5, tag + ' → ' + tag.replace(/\s*>$/, ' />')); continue; }
        if (!self) st.push([ln, tag]);
      } else {
        if (XEMPTY.has(ln)) continue;
        if (st.length && st[st.length - 1][0] === ln) st.pop();
        else if (st.some(x => x[0] === ln)) { add(4, `${tag} while ${st[st.length - 1][1]} is still open`); for (let j = st.length - 1; j >= 0; j--) if (st[j][0] === ln) { st.splice(j, 1); break; } }
        else add(4, `${tag} has no start tag`);
      }
    }
    st.forEach(x => add(5, x[1] + ' is never closed'));
    if (doc) {
      if (!/<!doctype/i.test(src)) add(1, 'no <!DOCTYPE>');
      if (!xmlns) add(2, '<html> has no xmlns');
      const miss = ['html', 'head', 'title', 'body'].filter(t => !seen.has(t)); if (miss.length) add(3, 'missing: ' + miss.map(t => '<' + t + '>').join(' '));
    }
    return { bad, doc };
  }
  const XEX = {
    doc: ['Document', '<html>\n<body>\n<p>My first paragraph.</p>\n</body>\n</html>', '<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n<title>Page Title</title>\n</head>\n<body>\n<p>My first paragraph.</p>\n</body>\n</html>'],
    nest: ['Nesting', '<b><i>Some text</b></i>', '<b><i>Some text</i></b>'],
    closed: ['Closed', '<p>This is a paragraph\n<p>This is another paragraph', '<p>This is a paragraph</p>\n<p>This is another paragraph</p>'],
    empty: ['Empty elements', 'A break: <br>\nA horizontal rule: <hr>\nAn image: <img src="happy.gif" alt="Happy face">', 'A break: <br />\nA horizontal rule: <hr />\nAn image: <img src="happy.gif" alt="Happy face" />'],
    lower: ['Lowercase', '<BODY>\n<P>This is a paragraph</P>\n</BODY>', '<body>\n<p>This is a paragraph</p>\n</body>'],
    attr: ['Attribute names', '<a HREF="https://www.Google.com/html/">Visit Google.com</a>', '<a href="https://www.Google.com/html/">Visit Google.com</a>'],
    quote: ['Quoted values', '<a href=https://www.Google.com/html/>Visit Google.com</a>', '<a href="https://www.Google.com/html/">Visit Google.com</a>']
  };
  function Xhtml({ ar }) {
    const [ex, setEx] = useState('nest'), [ok, setOk] = useState(false), [src, setSrc] = useState(XEX.nest[1]);
    const load = (e, o) => { setEx(e); setOk(o); setSrc(XEX[e][o ? 2 : 1]); };
    const { bad, doc } = xcheck(src), n = Object.keys(bad).length;
    const list = Object.keys(bad).map(r => '(' + r + ')').join(' ');
    const m = n ? { en: `A browser shows this as HTML anyway: it ignores errors. As XHTML it breaks ${n} rule${n > 1 ? 's' : ''} ${list}, and XHTML’s much stricter error handling does not accept it.` + (doc ? '' : ' Rules (1) to (3) apply to a whole document, so they are skipped for this fragment.'),
      ar: `الـ browser هيعرضه كـ HTML عادي لإنه بيطنّش الأخطاء، لكن كـ XHTML ده بيكسر ${n} من القواعد ${T(list)}، والـ error handling بتاع الـ XHTML أشد بكتير ومش هيقبله.` + (doc ? '' : ' والقواعد من (1) لـ (3) بتتطبق على document كامل، فمتسابة هنا لإن ده جزء بس.') }
      : { en: 'Valid XHTML for every rule that applies: properly nested, closed, lowercase, quoted.' + (doc ? ' The document has the DOCTYPE, xmlns and the four mandatory elements.' : ' Rules (1) to (3) apply to a whole document, so they are skipped for this fragment.'),
        ar: 'ده XHTML سليم في كل القواعد اللي تنطبق عليه (nested صح، ومقفول، و lowercase، والقيم بين quotes كمان).' + (doc ? ' والـ document فيه الـ DOCTYPE والـ xmlns والـ 4 elements الإجباريين.' : ' والقواعد من (1) لـ (3) بتتطبق على document كامل، فمتسابة هنا لإن ده جزء بس.') };
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="example" items=${Object.entries(XEX).map(([k, v]) => [k, v[0]])} sel=${ex} on=${e => load(e, false)} />
      <${Chips} label="version" items=${[['w', 'Wrong'], ['c', 'Correct']]} sel=${ok ? 'c' : 'w'} on=${v => load(ex, v === 'c')} />
      <div className="wbv6-two"><div><div className="wbv6-lbl">edit it, or type your own</div>
        <textarea className="wbv6-inp" value=${src} onInput=${e => setSrc(e.target.value)} rows="6" spellCheck="false" aria-label="XHTML to check"></textarea>
        <div className="wbv6-verd"><div className="ok"><b>HTML</b>the browser shows it anyway</div><div className=${n ? 'bad' : 'ok'}><b>XHTML</b>${n ? `${n} rule${n > 1 ? 's' : ''} broken` : 'valid'}</div></div></div>
        <ul className="wbv6-rules">${RULES.map(([en], j) => { const r = j + 1, na = r <= 3 && !doc, b = bad[r];
          return html`<li key=${r} className=${na ? 'na' : b ? 'bad' : 'ok'}><i>${na ? '–' : b ? '✗' : '✓'}</i><span>(${r}) ${en}${b && b.map((s, k) => html`<em key=${k}>${s}</em>`)}</span></li>`; })}</ul></div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [6.1], [6.2], [6.4] slides 38, 39 (+ the notes' type list): each input type and control, live ── */
  const INP = [
    ['default', '<input>', 'No type attribute: the default type is <b>text</b>.', 'من غير attribute اسمه type، الـ type الـ default هو <bdi dir="ltr">text</bdi>.'],
    ['text', '<input type="text">', 'A single-line text input field.', 'الـ text ده text field سطر واحد.'],
    ['password', '<input type="password">', 'A password field: what you type is masked.', 'الـ password بيخبّي النص اللي بتكتبه.'],
    ['radio', '<input type="radio" name="g">', 'Radio buttons with the same name form a group: select ONE of a limited number of choices.', 'الـ radio buttons اللي ليها نفس الـ name بتبقى group، وبتختار منها واحد بس (ONE) من الاختيارات.'],
    ['checkbox', '<input type="checkbox">', 'Checkboxes: select ZERO or MORE options.', 'الـ checkboxes بتختار منها صفر أو أكتر (ZERO or MORE) من الاختيارات.'],
    ['submit', '<input type="submit" value="Submit">', 'A submit button: sends the form data to the form-handler in the form’s action attribute (not sent here).', 'الـ submit زرار بيبعت داتا الـ form للـ form-handler اللي في الـ action بتاع الـ form (هنا مش بيتبعت).'],
    ['button', '<input type="button" value="Button">', 'A clickable button; it does nothing by itself.', 'الـ button زرار بيتداس عليه، ومابيعملش حاجة لوحده.'],
    ['reset', '<input type="reset">', 'A reset button: puts every field of the form back to its initial value.', 'الـ reset زرار بيرجّع كل fields الـ form لقيمتها الأولانية.'],
    ['number', '<input type="number">', 'A field for a number.', 'الـ number خانة لرقم.'],
    ['email', '<input type="email">', 'A field for an e-mail address.', 'الـ email خانة لـ e-mail address.'],
    ['date', '<input type="date">', 'A date picker.', 'الـ date بيختار تاريخ.'],
    ['month', '<input type="month">', 'Month and year.', 'الـ month بيختار شهر وسنة.'],
    ['week', '<input type="week">', 'Week and year.', 'الـ week بيختار أسبوع وسنة.'],
    ['color', '<input type="color">', 'A color picker.', 'الـ color هو color picker.'],
    ['file', '<input type="file">', 'A file-select field (nothing is uploaded here).', 'الـ file هو file-select field (هنا مفيش حاجة بتترفع).'],
    ['image', '<input type="image" alt="Submit">', 'An image as a submit button (no picture here, so its alt text shows).', 'الـ image بيخلي صورة تبقى submit button (مفيش صورة هنا، فالـ alt بتاعها هو اللي ظاهر).'],
    ['tel', '<input type="tel">', 'A field for a telephone number.', 'الـ tel خانة لرقم تليفون.'],
    ['range', '<input type="range">', 'A slider for a number in a range.', 'الـ range هو slider لرقم في مدى معيّن.'],
    ['textarea', '<textarea rows="3"></textarea>', '&lt;textarea&gt;: multi-line text input.', 'الـ <bdi dir="ltr">&lt;textarea&gt;</bdi> بتاخد نص كذا سطر.'],
    ['select', '<select>\n  <option>Volvo</option>\n  <option selected>Saab</option>\n</select>', '&lt;select&gt; with &lt;option&gt;: a drop-down list; the option with <b>selected</b> is chosen first.', 'الـ <bdi dir="ltr">&lt;select&gt;</bdi> مع الـ <bdi dir="ltr">&lt;option&gt;</bdi> بيعملوا drop-down list، والـ option اللي عليها selected بتبقى مختارة من الأول.'],
    ['multiple', '<select multiple>\n  <option>Volvo</option>\n  <option selected>Saab</option>\n</select>', 'The <b>multiple</b> attribute lets &lt;select&gt; accept several choices (Ctrl-click).', 'الـ attribute اللي اسمه multiple بيخلي الـ <bdi dir="ltr">&lt;select&gt;</bdi> يقبل أكتر من اختيار بالـ Ctrl-click.']];
  function Inputs({ ar }) {
    const [k, setK] = useState('text'), [said, setSaid] = useState(null), uid = React.useId().replace(/:/g, '');
    const it = INP.find(x => x[0] === k);
    const pick = v => { setK(v); setSaid(null); };
    const ctl = {
      default: html`<input />`, text: html`<input type="text" />`, password: html`<input type="password" defaultValue="secret" />`,
      radio: html`<span className="row"><input type="radio" name=${uid + 'g'} id=${uid + 'r1'} /><label htmlFor=${uid + 'r1'}>One</label> <input type="radio" name=${uid + 'g'} id=${uid + 'r2'} /><label htmlFor=${uid + 'r2'}>Two</label></span>`,
      checkbox: html`<span className="row"><input type="checkbox" id=${uid + 'c1'} /><label htmlFor=${uid + 'c1'}>One</label> <input type="checkbox" id=${uid + 'c2'} /><label htmlFor=${uid + 'c2'}>Two</label></span>`,
      submit: html`<input type="submit" value="Submit" />`, button: html`<input type="button" value="Button" onClick=${() => setSaid('clicked: nothing happens unless a script handles it')} />`, reset: html`<span><input type="text" defaultValue="type here" /> <input type="reset" /></span>`,
      number: html`<input type="number" />`, email: html`<input type="email" />`, date: html`<input type="date" />`, month: html`<input type="month" />`, week: html`<input type="week" />`,
      color: html`<input type="color" defaultValue="#3366cc" />`, file: html`<input type="file" />`, image: html`<input type="image" alt="Submit" />`, tel: html`<input type="tel" />`, range: html`<input type="range" />`,
      textarea: html`<textarea rows="3" style=${{ width: '200px' }}></textarea>`,
      select: html`<select defaultValue="Saab"><option>Volvo</option><option>Saab</option></select>`,
      multiple: html`<select multiple defaultValue=${['Saab']} size="2"><option>Volvo</option><option>Saab</option></select>`
    }[k];
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="type" mono=${true} items=${INP.map(x => [x[0], x[0] === 'default' ? '(no type)' : x[0] === 'multiple' ? 'select multiple' : x[0]])} sel=${k} on=${pick} />
      <div className="wbv6-two"><${Code} lines=${it[1].split('\n')} />
        <div><div className="wbv6-lbl">the browser shows</div>
          <form className="wbv6-form wbv6-page wbv6-win" key=${k} onSubmit=${e => { noSubmit(e); setSaid('the form would now be sent to the form-handler in action (not sent here)'); }} onReset=${() => setSaid('reset: the fields are back to their initial values')}>
            ${ctl}${said && html`<div className="wbv6-said">${said}</div>`}</form></div></div>
    </div><${Cap} en=${it[2]} ar=${it[3]} showAr=${ar} /><//>`;
  }

  /* ── [6.2], [6.3] slides 41 to 43: radio buttons, checkboxes and <label for="id"> ── */
  const RAD = [['html', 'HTML'], ['css', 'CSS'], ['javascript', 'JavaScript']], CHK = [['vehicle1', 'Bike', 'I have a bike'], ['vehicle2', 'Car', 'I have a car'], ['vehicle3', 'Boat', 'I have a boat']];
  function Choice({ ar }) {
    const [forOk, setForOk] = useState(true), [same, setSame] = useState(true), [data, setData] = useState([]), [flash, setFlash] = useState(0), uid = React.useId().replace(/:/g, ''), form = useRef(null);
    const read = () => { setData([...new FormData(form.current).entries()]); setFlash(f => f + 1); };
    const rn = j => same ? 'fav_language' : 'fav_language' + (j + 1), fr = id => forOk ? id : id + 'x';
    const L = ['<p>Choose your favorite Web language:</p>'].concat(
      RAD.flatMap(([id, v], j) => [`<input type="radio" id="${id}" name="${rn(j)}" value="${v}">`, `<label for="${fr(id)}">${v}</label><br>`]),
      CHK.flatMap(([id, v, t]) => [`<input type="checkbox" id="${id}" name="${id}" value="${v}">`, `<label for="${fr(id)}"> ${t}</label><br>`]));
    const reset = () => { setData([]); };
    const m = !forOk ? { en: 'Now each label’s <b>for</b> does not equal its input’s <b>id</b> (html ≠ htmlx): tapping the label text does nothing, only the tiny circle or box works.', ar: 'دلوقتي الـ for بتاع كل label مش بيساوي الـ id بتاع الـ input بتاعه، فلما تدوس على نص الـ label مفيش حاجة بتحصل، والدايرة أو المربع الصغير بس هو اللي شغال.' }
      : !same ? { en: 'The radios now have different names, so they are not one group: you can select several and cannot unselect them. The same name is what makes "select ONE".', ar: 'الـ radios دلوقتي ليها names مختلفة، فمابقوش group واحد، وتقدر تختار أكتر من واحد ومش هتعرف تلغيه. نفس الـ name هو اللي بيخلي الاختيار واحد بس (ONE) في الـ group.' }
      : { en: 'Tap the words, not only the small circles: <b>&lt;label for="html"&gt;</b> is bound to <b>id="html"</b>, so clicking its text toggles the input. Radios with name="fav_language" allow ONE choice; checkboxes allow ZERO or MORE.', ar: 'دوس على الكلام نفسه، مش بس الدواير الصغيرة. الـ label اللي <bdi dir="ltr">for="html"</bdi> مربوط بالـ input اللي <bdi dir="ltr">id="html"</bdi>، فالدوس على النص بيعمل toggle للـ input. والـ radios اللي ليها نفس الـ name بتسمح باختيار واحد (ONE)، والـ checkboxes بتسمح بصفر أو أكتر (ZERO or MORE) من الاختيارات.' };
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="label for" mono=${true} items=${[['y', 'for = id'], ['n', 'for ≠ id']]} sel=${forOk ? 'y' : 'n'} on=${v => { setForOk(v === 'y'); reset(); }} />
      <${Chips} label="radio names" items=${[['y', 'radios: same name'], ['n', 'radios: different names']]} sel=${same ? 'y' : 'n'} on=${v => { setSame(v === 'y'); reset(); }} />
      <div className="wbv6-two"><${Code} lines=${L} />
        <div><form ref=${form} key=${String(forOk) + same} className="wbv6-form wbv6-page wbv6-win" onSubmit=${noSubmit} onChange=${read}>
          <p style=${{ marginTop: 0 }}>Choose your favorite Web language:</p>
          ${RAD.map(([id, v], j) => html`<div className="row" key=${id}><input type="radio" id=${uid + id} name=${rn(j)} value=${v} /><label htmlFor=${uid + fr(id)}>${v}</label></div>`)}
          <hr style=${{ border: 0, borderTop: '1px solid var(--line)', margin: '6px 0' }} />
          ${CHK.map(([id, v, t]) => html`<div className="row" key=${id}><input type="checkbox" id=${uid + id} name=${id} value=${v} /><label htmlFor=${uid + fr(id)}>${t}</label></div>`)}</form>
          <div className="wbv6-sent"><b>form data (name=value)</b><span key=${flash} className=${flash ? 'wbv6-hl' : ''}>${data.length ? data.map(([a, b]) => a + '=' + b).join('  ') : '(nothing selected)'}</span></div></div></div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  /* ── [7] slides 44, 45: the form example sent to /action_page.php with POST or GET ── */
  function Submit({ ar }) {
    const [fname, setF] = useState('Mohamed'), [rad, setRad] = useState(false), [chk, setChk] = useState(false), [method, setMethod] = useState('post'), [ph, setPh] = useState(0), uid = React.useId().replace(/:/g, '');
    const tm = useRef([]); useEffect(() => () => tm.current.forEach(clearTimeout), []);
    const q = new URLSearchParams(); q.append('fname', fname); if (rad) q.append('fav_language', 'HTML'); if (chk) q.append('vehicle1', 'Bike');
    const qs = q.toString(), get = method === 'get';
    const send = e => { e.preventDefault(); tm.current.forEach(clearTimeout); if (calm()) { setPh(3); return; } setPh(1); tm.current = [setTimeout(() => setPh(2), 700), setTimeout(() => setPh(3), 1700)]; };
    const edit = f => v => { f(v); setPh(0); };
    const L = [`<form action="/action_page.php" method="${method}">`, '  <label for="fname">First name:</label><br>', '  <input type="text" id="fname" name="fname" value="Mohamed"><br>',
      '  <input type="radio" id="html" name="fav_language" value="HTML">', '  <label for="html">HTML</label><br>', '  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">', '  <label for="vehicle1"> I have a bike</label><br>', '  <input type="submit" value="Submit">', '</form>'];
    const req = get ? `GET /action_page.php?${qs}` : 'POST /action_page.php';
    const steps = [
      { en: 'Fill the form (or keep <b>Mohamed</b>), choose the method, then press <b>Submit</b>.', ar: 'املا الـ form (أو سيب <bdi dir="ltr">Mohamed</bdi>)، واختار الـ method، وبعدين دوس <bdi dir="ltr">Submit</bdi>.' },
      { en: `The browser packs each control’s <b>name=value</b>: ${esc(qs.split('&').join(', '))}. ${rad && chk ? '' : 'An unchecked radio or checkbox sends nothing.'}`, ar: `الـ browser بيجمع الـ <bdi dir="ltr">name=value</bdi> بتاع كل control، وبيطلع:<span class="ltr">${esc(qs.split('&').join(', '))}</span>` + (rad && chk ? '' : 'والـ radio أو الـ checkbox اللي مش متعلّم مابيتبعتش.') },
      get ? { en: '<b>method="get"</b>: the data is appended to the URL after <b>?</b>, so it shows in the address bar.', ar: 'مع <bdi dir="ltr">method="get"</bdi> الداتا بتتحط في آخر الـ URL بعد علامة <bdi dir="ltr">?</bdi>، فبتبان في الـ address bar.' }
        : { en: '<b>method="post"</b>: the data travels in the request body, not in the URL.', ar: 'مع <bdi dir="ltr">method="post"</bdi> الداتا بتتبعت في الـ body بتاع الـ request، مش في الـ URL.' },
      { en: 'The form-handler named in <b>action</b>, <b>/action_page.php</b>, receives the data and processes it on the server.', ar: 'الـ form-handler اللي في الـ action، وهو <bdi dir="ltr">/action_page.php</bdi>، بيستلم الداتا ويعالجها على الـ server.' }];
    const s = steps[ph];
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="method" mono=${true} items=${[['post', 'method="post"'], ['get', 'method="get"']]} sel=${method} on=${edit(setMethod)} />
      <div className="wbv6-two"><${Code} lines=${L} on=${ph === 2 || ph === 3 ? [0] : ph === 1 ? [2, 3, 5] : []} />
        <form className="wbv6-form wbv6-page wbv6-win" onSubmit=${send}>
          <label htmlFor=${uid + 'f'}>First name:</label><br />
          <input type="text" id=${uid + 'f'} name="fname" value=${fname} onInput=${e => edit(setF)(e.target.value)} /><br />
          <div className="row"><input type="radio" id=${uid + 'h'} name="fav_language" value="HTML" checked=${rad} onChange=${e => edit(setRad)(e.target.checked)} /><label htmlFor=${uid + 'h'}>HTML</label></div>
          <div className="row"><input type="checkbox" id=${uid + 'v'} name="vehicle1" value="Bike" checked=${chk} onChange=${e => edit(setChk)(e.target.checked)} /><label htmlFor=${uid + 'v'}> I have a bike</label></div>
          <input type="submit" value="Submit" /></form></div>
      <div className="wbv6-flow">
        <div className=${'wbv6-node' + (ph === 1 ? ' on' : '')}><b>Browser</b><code>${ph >= 1 ? qs : 'the form'}</code></div>
        <div className="wbv6-wire" aria-hidden="true"><span className=${'wbv6-pk' + (ph >= 2 ? ' go' : '')} style=${{ opacity: ph >= 1 ? 1 : 0 }}></span></div>
        <div className=${'wbv6-node' + (ph === 3 ? ' on' : '')}><b>Server</b><code>/action_page.php</code></div></div>
      ${ph >= 2 && html`<div className="wbv6-sent wbv6-in"><b>the request</b>${req}${!get && html`<div><b>body</b>${qs}</div>`}</div>`}
      ${ph >= 3 && html`<div className="wbv6-sent wbv6-in wbv6-srv"><b>/action_page.php receives</b>${[...q.entries()].map(([a, b]) => html`<div key=${a}>${a} = ${b || '(empty)'}</div>`)}</div>`}
    </div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { tm.current.forEach(clearTimeout); setPh(0); }}>↻ Reset</button></div><//>`;
  }

  /* ── [8.1] to [8.4] slides 49 to 53: <video> and <audio> with controls, sources, autoplay + muted, width/height ── */
  function Media({ ar }) {
    const [kind, setKind] = useState('video'), [sup, setSup] = useState('both'), [controls, setControls] = useState(true), [autoplay, setAutoplay] = useState(false), [muted, setMuted] = useState(false), [wh, setWh] = useState(true);
    const [play, setPlay] = useState(false), [vol, setVol] = useState(true), [loading, setLoading] = useState(false), [t, setT] = useState(0);
    const vid = kind === 'video';
    const SRC = vid ? [['movie.mp4', 'video/mp4'], ['movie.ogg', 'video/ogg']] : [['horse.ogg', 'audio/ogg'], ['horse.mp3', 'audio/mpeg']];
    const use = sup === 'none' ? -1 : sup === 'both' ? 0 : 1;
    const tm = useRef(null);
    const reload = () => { clearTimeout(tm.current); setPlay(false); setT(0); if (calm()) { setLoading(false); return; } setLoading(true); tm.current = setTimeout(() => setLoading(false), 1100); };
    useEffect(() => () => clearTimeout(tm.current), []);
    useEffect(() => { reload(); }, [kind, sup, controls, autoplay, muted, wh]);
    useEffect(() => { if (!loading && autoplay && muted && use >= 0) setPlay(true); }, [loading, autoplay, muted, use]);
    useEffect(() => { if (!play || loading) return; const id = setInterval(() => setT(x => (x + 2) % 100), 200); return () => clearInterval(id); }, [play, loading]);
    const mute = muted || !vol;
    const attrs = (vid && wh ? ' width="320" height="240"' : '') + (controls ? ' controls' : '') + (autoplay ? ' autoplay' : '') + (muted ? ' muted' : '');
    const L = [`<${kind}${attrs}>`].concat(SRC.map(([f, ty]) => `  <source src="${f}" type="${ty}">`), [vid ? '  Your browser does not support the video tag.' : '  Your browser does not support the audio element.', `</${kind}>`]);
    const S = .75, W = 320 * S, H = 240 * S;
    const fallback = html`<div className="wbv6-fall">${vid ? 'Your browser does not support the video tag.' : 'Your browser does not support the audio element.'}</div>`;
    const bar = controls && html`<div className="wbv6-bar" style=${{ width: (vid ? W : 250) + 'px', maxWidth: '100%', margin: '0 auto', borderRadius: vid ? '0 0 4px 4px' : '99px', boxSizing: 'border-box' }}>
      <button onClick=${() => setPlay(p => !p)} aria-label=${play ? 'Pause' : 'Play'}>${play ? '❚❚' : '▶'}</button><span className="tr"><i style=${{ width: t + '%' }}></i></span>
      <button onClick=${() => setVol(v => !v)} aria-label="Volume">${mute ? '🔇' : '🔊'}</button></div>`;
    let player;
    if (use < 0) player = fallback;
    else if (vid) {
      const hgt = loading && !wh ? 0 : H;
      player = html`<div><div className="wbv6-scr" style=${{ width: W + 'px', height: hgt + 'px', borderRadius: controls ? '4px 4px 0 0' : '4px' }}>
        <span className="src">${SRC[use][0]}</span>${loading ? html`<span className="msg">loading…</span>` : html`<span className=${'ball' + (play ? ' run' : '')}></span>`}
        ${!loading && !play && html`<span className="msg">${autoplay && !muted ? 'autoplay without muted: did not start' : controls ? 'press ▶ to play' : 'no controls: no play button'}</span>`}</div>${!(loading && !wh) && bar}</div>`;
    } else player = html`<div><div className="wbv6-lbl">${SRC[use][0]}${play ? ' ♪ playing' : autoplay && !muted && !loading ? ' (autoplay without muted: did not start)' : ''}</div>${controls ? bar : html`<div className="wbv6-lbl">(no controls: nothing is shown)</div>`}</div>`;
    let m;
    if (use < 0) m = { en: `This browser does not support &lt;${kind}&gt;: the text between the tags is shown instead.`, ar: `الـ browser ده مابيدعمش ${T('<' + kind + '>')}، فبيعرض النص اللي بين الـ tags بدل منه.` };
    else if (vid && !wh && loading) m = { en: 'No width and height: while the video loads its box has no size, the text below sits higher and then jumps down. That is the flicker; always include width and height.', ar: 'من غير width و height، الـ video وهو بيحمّل مالوش مقاس، فالنص اللي تحته بيبقى فوق وبعدين بينط لتحت. ده الـ flicker، فدايمًا حط الـ width والـ height.' };
    else if (autoplay && !muted) m = { en: '<b>autoplay</b> alone: the browser does not let it start. Add <b>muted</b> after autoplay to let it start (muted).', ar: 'الـ autoplay لوحده مش هيخلي الـ browser يشغّله. ضيف muted بعد الـ autoplay عشان يقدر يشتغل (من غير صوت).' };
    else if (autoplay && muted) m = { en: '<b>autoplay muted</b>: it starts automatically, without sound.', ar: 'الـ autoplay مع الـ muted بيشغّله لوحده، من غير صوت.' };
    else if (!controls) m = { en: 'Without <b>controls</b> there is no play, pause or volume: the user cannot start it.', ar: 'من غير الـ controls مفيش play ولا pause ولا volume، والـ user مش هيعرف يشغّله.' };
    else m = { en: `The browser uses the first source format it recognizes: <b>${SRC[use][0]}</b>${use === 1 ? ` (it skips ${SRC[0][0]})` : ''}. <b>controls</b> adds play, pause and volume.` + (vid ? ' Try removing width/height and watch the text below.' : ''),
      ar: `الـ browser بيستخدم أول format يعرفه، وهنا هو ${T(SRC[use][0])}` + (use === 1 ? ` (وبيعدّي ${T(SRC[0][0])})` : '') + '. والـ controls بيضيف play و pause و volume.' + (vid ? ' جرّب تشيل الـ width والـ height وبص على النص اللي تحت.' : '') };
    const Tg = ({ on, set, t }) => html`<button className="fig-btn m" aria-pressed=${String(on)} onClick=${() => set(!on)}>${t}</button>`;
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="element" mono=${true} items=${[['video', '<video>'], ['audio', '<audio>']]} sel=${kind} on=${k => { setKind(k); setSup('both'); }} />
      <div className="wbv6-chips" role="group" aria-label="attributes">${vid && html`<${Tg} on=${wh} set=${setWh} t="width/height" />`}<${Tg} on=${controls} set=${setControls} t="controls" /><${Tg} on=${autoplay} set=${setAutoplay} t="autoplay" /><${Tg} on=${muted} set=${setMuted} t="muted" /></div>
      <div className="wbv6-lbl">the browser plays</div>
      <${Chips} label="browser support" items=${vid ? [['both', 'MP4 and Ogg'], ['ogg', 'Ogg only'], ['none', 'no <video>']] : [['both', 'Ogg and MP3'], ['mp3', 'MP3 only'], ['none', 'no <audio>']]} sel=${sup} on=${setSup} />
      <div className="wbv6-two"><div><${Code} lines=${L} on=${use < 0 ? [3] : [1 + use]} />
        ${use >= 0 && html`<div className="wbv6-srcs">${SRC.map(([f], j) => html`<div key=${f} className=${j === use ? 'use' : j < use ? 'skip' : ''}>${j === use ? '✓ ' : j < use ? '✗ ' : '  '}${f}${j === use ? ' (used)' : j < use ? ' (not recognized)' : ''}</div>`)}</div>`}</div>
        <div className="wbv6-win wbv6-page">${player}<p className="wbv6-below">Text below the ${kind} on the page.</p>
          <div style=${{ textAlign: 'center' }}><button className="fig-btn" onClick=${reload}>↻ Reload the page</button></div></div></div>
    </div><${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /><//>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'wb-l6-flow': Flow, 'wb-l6-sort': Sort, 'wb-l6-span': Span, 'wb-l6-display': Display, 'wb-l6-iframe': Iframe, 'wb-l6-target': Target,
    'wb-l6-entity': Entity, 'wb-l6-xhtml': Xhtml, 'wb-l6-inputs': Inputs, 'wb-l6-choice': Choice, 'wb-l6-submit': Submit, 'wb-l6-media': Media
  });
})();
/* ── part L7 ── */
// Web Programming visuals, Lecture 7 (JavaScript P1): the three layers, the history line, validating in the browser vs on the server,
// the First Example parsed line by line, head vs body scripts, inline / internal / external, <noscript>, loose typing, var / let / const scope,
// the naming rules, typeof, + with a string, comments, the four output methods, Example 5 traced, DOM access methods and addEventListener
// (slides 2 to 27 and Lab 8). Every label and number comes from the site's notes; expressions are read by a small tracer here, never run.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop } = window.FIGKIT;
  const CSS = `
.wbv7 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.wbv7 .fig-btn:disabled{ opacity:.45; cursor:default; }
.wbv7 .fig-cap .ltr{ display:block; direction:ltr; unicode-bidi:isolate; text-align:left; font-family:var(--mono); font-size:.86rem; margin:3px 0; overflow-wrap:anywhere; color:var(--ink); }
.wbv7-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.wbv7-chips .fig-btn{ font-size:.8rem; padding:4px 10px; min-height:30px; }
.wbv7-chips .fig-btn.m{ font-family:var(--mono); }
.wbv7-code{ font:.78rem/1.5 var(--mono); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:7px 5px; white-space:pre-wrap; overflow-wrap:anywhere; direction:ltr; text-align:left; color:var(--ink); margin:0; }
.wbv7-code .ln{ display:block; border-radius:4px; padding:0 3px; min-height:1.5em; transition:background .4s, opacity .4s; }
.wbv7-code .ln.on{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.wbv7-code .ln.dim{ opacity:.45; }
.wbv7-code .ln.gone{ opacity:.3; text-decoration:line-through; }
.wbv7-file{ font:600 .75rem var(--mono); color:var(--graphite); margin:6px 0 3px; direction:ltr; text-align:left; }
.wbv7-t{ color:var(--fig-k); font-weight:600; } .wbv7-an{ color:var(--pen); } .wbv7-av{ color:var(--ok); } .wbv7-cm{ color:var(--graphite); font-style:italic; } .wbv7-kw{ color:var(--fig-k); font-weight:600; } .wbv7-st{ color:var(--ok); } .wbv7-nu{ color:var(--pen); }
.wbv7-two{ display:grid; grid-template-columns:minmax(0,1fr); gap:8px; max-width:560px; margin:0 auto; }
@media (min-width:640px){ .wbv7-two{ grid-template-columns:repeat(2, minmax(0,1fr)); align-items:start; } }
.wbv7-arrow{ text-align:center; color:var(--fig-k); font-size:.8rem; font-weight:600; margin:2px 0; }
.wbv7-win{ position:relative; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); overflow:hidden; }
.wbv7-url{ display:flex; gap:5px; align-items:center; padding:4px 8px; background:var(--paper-2); border-bottom:1px solid var(--line); font:.75rem/1.4 var(--mono); color:var(--graphite); overflow-wrap:anywhere; }
.wbv7-url i{ width:8px; height:8px; border-radius:50%; background:var(--line); flex:none; }
.wbv7-page{ padding:8px 12px 10px; font-family:"Times New Roman", Times, serif; font-size:1rem; line-height:1.3; min-height:70px; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.wbv7-h1{ font-size:1.6em; font-weight:700; margin:.3em 0; line-height:1.15; } .wbv7-h2{ font-size:1.35em; font-weight:700; margin:.3em 0; line-height:1.15; } .wbv7-h3{ font-size:1.1em; font-weight:700; margin:.4em 0; line-height:1.2; }
.wbv7-p{ margin:.45em 0; } .wbv7-new{ background:color-mix(in srgb, var(--fig-k) 20%, transparent); border-radius:3px; }
.wbv7-pbtn{ font:inherit; font-size:.85rem; padding:2px 8px; border:1px solid var(--graphite); border-radius:3px; background:var(--paper-2); color:var(--ink); cursor:pointer; min-height:28px; }
.wbv7-pin{ font:inherit; font-size:.85rem; width:7em; padding:2px 4px; border:1px solid var(--graphite); border-radius:2px; background:var(--paper); color:var(--ink); }
.wbv7-in{ font:.85rem var(--mono); width:100%; box-sizing:border-box; border:1px solid var(--line); border-radius:6px; padding:5px 8px; background:var(--paper); color:var(--ink); direction:ltr; }
.wbv7-own{ max-width:420px; margin:0 auto 10px; } .wbv7-own small{ display:block; font-size:.75rem; color:var(--graphite); margin:0 0 3px; }
.wbv7-alert{ position:absolute; left:50%; top:34px; transform:translateX(-50%); width:min(230px, 86%); background:var(--paper); border:1px solid var(--line); border-radius:8px; box-shadow:0 6px 22px rgba(0,0,0,.28); padding:8px 10px; font:.82rem/1.4 var(--body); color:var(--ink); z-index:2; text-align:left; direction:ltr; }
.wbv7-alert small{ display:block; font-size:.75rem; color:var(--graphite); }
.wbv7-alert b{ display:block; margin:4px 0 6px; overflow-wrap:anywhere; }
.wbv7-alert button{ float:right; font:600 .78rem var(--body); padding:3px 12px; border-radius:99px; border:0; background:var(--fig-s); color:#fff; cursor:pointer; min-height:26px; }
.wbv7-alert::after{ content:""; display:block; clear:both; }
.wbv7-cons{ border:1px solid var(--line); border-top:0; border-radius:0 0 8px 8px; background:var(--paper-2); font:.78rem/1.5 var(--mono); padding:4px 8px; color:var(--ink); text-align:left; direction:ltr; min-height:2.6em; }
.wbv7-cons small{ display:block; font:600 .75rem var(--body); color:var(--graphite); border-bottom:1px solid var(--line); margin:0 0 3px; }
.wbv7-cons div{ border-bottom:1px dashed var(--line); }
.wbv7-ctr{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:8px 0 0; }
.wbv7-ctr span{ font:.78rem var(--body); border:1px solid var(--line); border-radius:99px; padding:3px 10px; background:var(--paper); color:var(--ink); }
.wbv7-ctr b{ font-family:var(--mono); color:var(--fig-k); }
@keyframes wbv7in{ from{ opacity:0; transform:translateY(5px); } to{ opacity:1; transform:none; } }
.wbv7-in2{ animation:wbv7in .45s ease both; }
/* layers */
.wbv7-lay{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; max-width:560px; margin:0 auto 10px; }
.wbv7-lay div{ border:1.5px solid var(--line); border-radius:8px; padding:5px 4px; text-align:center; background:var(--paper); font-size:.75rem; line-height:1.3; opacity:.4; transition:opacity .4s, border-color .4s; }
.wbv7-lay div.on{ opacity:1; border-color:var(--fig-k); }
.wbv7-lay code{ display:block; font:700 .82rem var(--mono); color:var(--fig-k); margin-bottom:2px; overflow-wrap:anywhere; }
.wbv7-sty{ font-family:var(--body); background:var(--paper-2); border-radius:6px; }
.wbv7-sty .wbv7-p:first-child{ font-weight:600; color:var(--fig-k); }
.wbv7-sty .wbv7-pin{ border-radius:6px; border-color:var(--fig-k); padding:4px 6px; }
.wbv7-sty .wbv7-pbtn{ background:var(--fig-s); color:#fff; border:0; border-radius:99px; padding:4px 14px; }
.wbv7-sty .wbv7-demo{ font-weight:700; }
/* history */
.wbv7-hrow{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 8px; }
.wbv7-box{ border:1.5px solid var(--line); border-radius:8px; padding:5px 9px; background:var(--paper); font-size:.82rem; text-align:center; line-height:1.3; color:var(--ink); }
.wbv7-box.k{ border-color:var(--fig-k); } .wbv7-box small{ display:block; font-size:.75rem; color:var(--graphite); }
.wbv7-op{ font:700 1.1rem var(--mono); color:var(--fig-k); }
.wbv7-tl{ display:flex; flex-wrap:wrap; gap:4px 2px; justify-content:center; align-items:center; max-width:520px; margin:6px auto 0; }
.wbv7-tl span{ font:600 .78rem var(--mono); border:1px solid var(--line); border-radius:99px; padding:3px 8px; background:var(--paper); color:var(--ink); }
.wbv7-tl span.k{ background:var(--fig-s); color:#fff; border-color:transparent; }
.wbv7-tl i{ font-style:normal; color:var(--graphite); font-size:.78rem; }
/* round trip */
.wbv7-lane{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; margin:0 auto 8px; max-width:520px; transition:opacity .4s; }
.wbv7-lane > b{ display:block; font-size:.8rem; margin-bottom:5px; color:var(--ink); }
.wbv7-lane.dim{ opacity:.45; }
.wbv7-trip{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.1fr) minmax(0,.8fr); gap:6px; align-items:center; }
.wbv7-end{ border:1.5px solid var(--line); border-radius:6px; padding:4px; text-align:center; font-size:.78rem; line-height:1.3; min-height:44px; display:grid; place-items:center; color:var(--ink); }
.wbv7-end.k{ border-color:var(--fig-k); }
.wbv7-msg{ font-size:.75rem; color:var(--pen); font-weight:700; }
.wbv7-ok{ color:var(--ok); font-weight:700; font-size:.75rem; }
.wbv7-wire{ display:grid; gap:3px; font-size:.75rem; text-align:center; color:var(--graphite); }
.wbv7-wire span{ display:block; border-radius:4px; padding:1px 2px; }
.wbv7-wire span.go{ color:var(--fig-k); font-weight:600; }
/* boxes and tables */
.wbv7-var{ display:flex; gap:10px; justify-content:center; align-items:center; flex-wrap:wrap; margin:10px 0 0; }
.wbv7-cell{ min-width:120px; border:2px solid var(--fig-k); border-radius:8px; background:var(--paper); text-align:center; padding:4px 10px; }
.wbv7-cell small{ display:block; font:.75rem var(--body); color:var(--graphite); }
.wbv7-cell b{ display:block; font:700 1rem var(--mono); color:var(--ink); overflow-wrap:anywhere; }
.wbv7-tag{ font:700 .82rem var(--mono); border-radius:99px; padding:3px 10px; background:var(--fig-s); color:#fff; }
.wbv7-tbl{ width:100%; max-width:420px; margin:8px auto 0; border-collapse:collapse; font-size:.8rem; direction:ltr; }
.wbv7-tbl th, .wbv7-tbl td{ border:1px solid var(--line); padding:4px 6px; text-align:left; color:var(--ink); background:var(--paper); }
.wbv7-tbl th{ background:var(--paper-2); font-weight:600; }
.wbv7-tbl td code{ font:600 .8rem var(--mono); color:var(--fig-k); }
.wbv7-yes{ color:var(--ok); font-weight:700; } .wbv7-no{ color:var(--pen); font-weight:700; }
.wbv7-err{ max-width:420px; margin:8px auto 0; border:1.5px solid var(--pen); color:var(--pen); border-radius:8px; padding:5px 8px; font:600 .8rem/1.4 var(--mono); direction:ltr; text-align:left; overflow-wrap:anywhere; }
.wbv7-rg{ border-left:3px solid transparent; }
.wbv7-code .ln.f{ border-left:3px solid color-mix(in srgb, var(--fig-k) 55%, transparent); border-radius:0; }
.wbv7-code .ln.k{ background:color-mix(in srgb, var(--fig-k) 10%, transparent); }
.wbv7-code .ln.on.k, .wbv7-code .ln.on{ background:color-mix(in srgb, var(--fig-k) 26%, transparent); }
/* names */
.wbv7-name{ font:700 1.2rem var(--mono); text-align:center; margin:4px 0 8px; overflow-wrap:anywhere; color:var(--ink); }
.wbv7-name .x{ color:var(--pen); text-decoration:underline wavy; text-underline-offset:4px; }
.wbv7-rules{ display:grid; gap:4px; max-width:420px; margin:0 auto; }
.wbv7-rules div{ display:grid; grid-template-columns:1.4em minmax(0,1fr); gap:6px; border:1px solid var(--line); border-radius:6px; padding:4px 8px; background:var(--paper); font-size:.8rem; line-height:1.35; color:var(--ink); }
.wbv7-verdict{ text-align:center; font-weight:700; margin:8px 0 0; font-size:.9rem; }
/* trace */
.wbv7-trace{ max-width:460px; margin:8px auto 0; display:grid; gap:4px; }
.wbv7-trace div{ border:1px solid var(--line); border-radius:6px; padding:4px 8px; background:var(--paper); font:.8rem/1.45 var(--mono); color:var(--ink); direction:ltr; text-align:left; overflow-wrap:anywhere; }
.wbv7-trace div.on{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); }
.wbv7-trace small{ display:block; font:.75rem var(--body); color:var(--graphite); }
.wbv7-v{ border-radius:4px; padding:0 3px; font-weight:700; }
.wbv7-v.s{ background:color-mix(in srgb, var(--ok) 18%, transparent); } .wbv7-v.n{ background:color-mix(in srgb, var(--pen) 14%, transparent); }
/* dom */
.wbv7-tree{ max-width:460px; margin:0 auto; display:grid; gap:2px; direction:ltr; text-align:left; }
.wbv7-node{ display:flex; gap:6px; align-items:baseline; flex-wrap:wrap; border:1px solid transparent; border-radius:6px; padding:2px 5px; font:.78rem/1.4 var(--mono); color:var(--ink); transition:background .4s, border-color .4s; }
.wbv7-node code{ color:var(--fig-k); font-weight:600; font-family:var(--mono); font-size:.78rem; }
.wbv7-sel code{ font:.8rem var(--mono); color:var(--ink); }
.wbv7-node span{ font-family:var(--body); color:var(--graphite); font-size:.75rem; }
.wbv7-node.hit{ background:color-mix(in srgb, var(--fig-k) 20%, transparent); border-color:var(--fig-k); }
.wbv7-node em{ font:700 .75rem var(--body); font-size:.75rem; font-style:normal; color:#fff; background:var(--fig-s); border-radius:99px; padding:0 7px; }
.wbv7-sel{ display:flex; gap:4px; align-items:center; flex-wrap:wrap; max-width:460px; margin:0 auto 8px; font:.8rem var(--mono); direction:ltr; color:var(--ink); }
.wbv7-sel input{ flex:1; min-width:6em; }
.wbv7-ret{ max-width:460px; margin:8px auto 0; font:.8rem/1.45 var(--body); color:var(--ink); text-align:center; }
@media (prefers-reduced-motion: reduce){ .wbv7-in2{ animation:none; } }`;
  if (!document.getElementById('wbv7-css')) { const s = document.createElement('style'); s.id = 'wbv7-css'; s.textContent = CSS; document.head.appendChild(s); }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // short code inside an Arabic sentence: always an ltr isolate
  const T = s => `<bdi dir="ltr">${esc(s)}</bdi>`;
  // a formula / chain on its own line inside an Arabic caption
  const L = s => `<span class="ltr">${esc(s)}</span>`;
  // colours HTML source
  function hl(src) {
    return String(src).replace(/<!--[\s\S]*?(-->|$)|<[^<>]*>|[^<]+|</g, tok => {
      if (tok.startsWith('<!--')) return `<span class="wbv7-cm">${esc(tok)}</span>`;
      const m = tok.length > 1 && tok.match(/^<(\/?!?[A-Za-z][\w-]*)([\s\S]*?)(\/?)>$/);
      if (!m) return esc(tok);
      const at = m[2].replace(/(\s*)([^\s=]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s"']+))?/g, (_, sp, n, eq, v) => esc(sp) + `<span class="wbv7-an">${esc(n)}</span>` + (eq ? esc(eq) + `<span class="wbv7-av">${esc(v)}</span>` : ''));
      return `<span class="wbv7-t">&lt;${esc(m[1])}</span>${at}<span class="wbv7-t">${m[3]}&gt;</span>`;
    });
  }
  // colours JavaScript source
  const JSRE = /(\/\/.*$|\/\*[\s\S]*?(?:\*\/|$))|("(?:\\.|[^"\\])*"?|'(?:\\.|[^'\\])*'?)|\b(var|let|const|function|if|else|typeof|true|false|null|undefined|return|new)\b|\b(\d+(?:\.\d+)?)\b/g;
  function hj(src) {
    let out = '', last = 0;
    for (const m of String(src).matchAll(JSRE)) {
      out += esc(src.slice(last, m.index)); last = m.index + m[0].length;
      const c = m[1] ? 'cm' : m[2] ? 'st' : m[3] ? 'kw' : 'nu';
      out += `<span class="wbv7-${c}">${esc(m[0])}</span>`;
    }
    return out + esc(src.slice(last));
  }
  // lines: HTML source strings, { js } JavaScript, or { h } already coloured
  const Code = ({ lines, on, cls, label }) => html`<pre className="wbv7-code" aria-label=${label || 'source code'}>${lines.map((l, j) => html`<span key=${j}
    className=${'ln' + (on && on.includes(j) ? ' on' : '') + (cls && cls[j] ? ' ' + cls[j] : '')} dangerouslySetInnerHTML=${{ __html: (typeof l === 'string' ? hl(l) : l.js != null ? hj(l.js) : l.h) || ' ' }}></span>`)}</pre>`;
  const Win = ({ url, cls, children, over }) => html`<div className="wbv7-win"><div className="wbv7-url"><i></i><i></i><i></i><span>${url || 'page.html'}</span></div>
    <div className=${'wbv7-page' + (cls ? ' ' + cls : '')}>${children}</div>${over}</div>`;
  const Chips = ({ items, sel, on, mono, label }) => html`<div className="wbv7-chips" role="group" aria-label=${label || 'Choose'}>${items.map(([k, t]) => html`<button key=${k}
    className=${'fig-btn' + (mono ? ' m' : '')} aria-pressed=${String(sel === k)} onClick=${() => on(k)}>${t}</button>`)}</div>`;
  const Fig = ({ children }) => html`<figure className="fig wbv7">${children}</figure>`;
  const Arrow = ({ t }) => html`<div className="wbv7-arrow">▼ ${t || 'the browser shows'} ▼</div>`;
  // a pretend alert box drawn inside the page window (the real alert() is never called)
  const Alert = ({ msg, ok }) => html`<div className="wbv7-alert wbv7-in2" role="dialog" aria-label="alert box"><small>This page says</small><b>${msg}</b><button onClick=${ok}>OK</button></div>`;
  const Console = ({ lines }) => html`<div className="wbv7-cons" aria-label="browser console"><small>Console</small>${lines.map((l, j) => html`<div key=${j} className="wbv7-in2">${l}</div>`)}</div>`;

  /* small reader for literal values (the tracer never runs typed code) */
  function splitTop(s, sep) {
    const out = []; let d = 0, q = null, cur = '';
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (q) { cur += c; if (c === '\\') { cur += s[++i] || ''; } else if (c === q) q = null; continue; }
      if (c === '"' || c === "'") { q = c; cur += c; continue; }
      if ('([{'.includes(c)) d++; else if (')]}'.includes(c)) d--;
      if (c === sep && d === 0) { out.push(cur); cur = ''; } else cur += c;
    }
    out.push(cur); return q || d ? null : out;
  }
  function lit(s) {
    s = String(s).trim(); let m;
    if ((m = s.match(/^"((?:[^"\\]|\\.)*)"$|^'((?:[^'\\]|\\.)*)'$/))) return { t: 'string', v: (m[1] != null ? m[1] : m[2]).replace(/\\(.)/g, '$1') };
    if (/^-?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) return { t: 'number', v: Number(s) };
    if (s === 'NaN') return { t: 'number', v: NaN, k: 'nan' };
    if (/^-?Infinity$/.test(s)) return { t: 'number', v: Number(s) };
    if (/^-?\d+n$/.test(s)) return { t: 'bigint', v: s };
    if (s === 'true' || s === 'false') return { t: 'boolean', v: s === 'true' };
    if (s === 'undefined') return { t: 'undefined', v: undefined };
    if (s === 'null') return { t: 'object', v: null, k: 'null' };
    if (/^Symbol\(\s*(?:"[^"]*"|'[^']*')?\s*\)$/.test(s)) return { t: 'symbol', v: s };
    if (/^function\s*[A-Za-z_$]?[\w$]*\s*\([^()]*\)\s*\{[\s\S]*\}$/.test(s) || /^(\([^()]*\)|[A-Za-z_$][\w$]*)\s*=>/.test(s)) return { t: 'function', v: s };
    if (/^\[[\s\S]*\]$/.test(s)) { const inner = s.slice(1, -1).trim(), parts = inner ? splitTop(inner, ',') : []; if (!parts || parts.some(p => !lit(p))) return null; return { t: 'object', v: s, k: 'array' }; }
    if (/^\{[\s\S]*\}$/.test(s)) { const inner = s.slice(1, -1).trim(), parts = inner ? splitTop(inner, ',') : []; if (!parts || parts.some(p => { const q = p.match(/^\s*([A-Za-z_$][\w$]*|"[^"]*"|'[^']*')\s*:([\s\S]+)$/); return !q || !lit(q[2]); })) return null; return { t: 'object', v: s, k: 'obj' }; }
    return null;
  }
  const show = r => r.t === 'string' ? '"' + r.v + '"' : r.t === 'number' ? String(r.v) : r.t === 'boolean' ? String(r.v) : r.t === 'undefined' ? 'undefined' : r.k === 'null' ? 'null' : String(r.v);

  /* ── [0] slide 2: content, presentation and behavior layers ── */
  function check(x) { // Example 5's condition, as JavaScript evaluates it: x is the field's value (a string)
    const n = Number(x), tr = [{ k: 'nan', r: isNaN(n), n }];
    if (isNaN(n)) return { bad: true, tr };
    tr.push({ k: 'lt', r: n < 1, n }); if (n < 1) return { bad: true, tr };
    tr.push({ k: 'gt', r: n > 10, n }); return { bad: n > 10, tr };
  }
  function Layers({ ar }) {
    const steps = [
      { en: '<b>Content layer: HTML.</b> The HTML gives the page its structure and adds semantics: a paragraph, a number box, a button and an empty paragraph (Example 5). Nothing is styled yet, and Submit does nothing.', ar: '<b>الـ Content layer هي الـ HTML.</b> الـ HTML بتدّي الصفحة الـ structure بتاعها وبتضيف semantics، يعني paragraph و number box و button و paragraph فاضي (Example 5). لسه مفيش styling، والـ Submit مش بيعمل حاجة.' },
      { en: '<b>Presentation layer: CSS.</b> CSS rules state how the same HTML content is presented: fonts, colours, spacing. The content itself did not change, and Submit still does nothing.', ar: '<b>الـ Presentation layer هي الـ CSS.</b> الـ CSS rules بتقول نفس الـ HTML content يتعرض إزاي، يعني الـ fonts والألوان والمسافات. الـ content نفسه ما اتغيرش، والـ Submit لسه مش بيعمل حاجة.' },
      { en: '<b>Behavior layer: JavaScript.</b> JS controls how the page behaves, adding interactivity: now Submit checks the number and writes the answer into the empty paragraph. Type a number and try it.', ar: '<b>الـ Behavior layer هي الـ JavaScript.</b> الـ JS بتتحكم في الصفحة بتتصرف إزاي وبتضيف interactivity، ودلوقتي الـ Submit بيشيك على الرقم ويكتب النتيجة في الـ paragraph الفاضي. اكتب رقم وجرّب.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), [v, setV] = useState('5'), [out, setOut] = useState(''), [tried, setTried] = useState(false);
    const submit = () => { setTried(true); if (i >= 2) setOut(check(v).bad ? 'Input not valid' : 'Input OK'); };
    const lay = [['<html>', 'Content layer', 'structure, semantics'], ['{css}', 'Presentation layer', 'how it is presented'], ['javascript()', 'Behavior layer', 'how it behaves']];
    const dead = tried && i < 2 ? { en: ' <b>You pressed Submit: nothing happened</b>, because there is no behavior layer yet.', ar: ' <b>إنت دوست Submit ومحصلش حاجة</b>، عشان لسه مفيش behavior layer.' } : { en: '', ar: '' };
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv7-lay">${lay.map(([c, n, d], k) => html`<div key=${k} className=${i >= k ? 'on' : ''}><code>${c}</code><b>${n}</b><br/>${d}</div>`)}</div>
      <${Win} url="example5.html" cls=${i >= 1 ? 'wbv7-sty' : ''}>
        <div className="wbv7-p">Please input a number between 1 and 10:</div>
        <div className="wbv7-p"><input className="wbv7-pin" type="number" value=${v} aria-label="number between 1 and 10" onInput=${e => { setV(e.target.value); setOut(''); }} /> <button className="wbv7-pbtn" onClick=${submit}>Submit</button></div>
        <div className="wbv7-p wbv7-demo" style=${{ minHeight: '1.3em' }}>${i >= 2 ? out : ''}</div>
      <//>
    </div><${Cap} en=${steps[i].en + dead.en} ar=${steps[i].ar + dead.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${{ ...ctl, go: j => { setOut(''); setTried(false); ctl.go(j); }, replay: () => { setOut(''); setTried(false); ctl.replay(); } }} /><//>`;
  }

  /* ── [1.0]–[1.2] slide 3: Netscape, ECMAScript, JavaScript = ECMAScript + DOM API, the timeline ── */
  const TL = ['JavaScript 1.0', 'ES1', 'ES2', 'ES3', 'AJAX', 'jQuery', 'ES5', 'ES6', 'ES7'];
  function History({ ar }) {
    const steps = [
      { en: 'JavaScript was introduced as part of the <b>Netscape 2.0</b> browser. Microsoft soon released its own version, called <b>JScript</b>.', ar: 'الـ JavaScript اتقدمت كجزء من الـ browser اللي اسمه <b>Netscape 2.0</b>. ومايكروسوفت بسرعة طلّعت نسختها الخاصة اسمها <b>JScript</b>.' },
      { en: 'Two versions of one language: <b>ECMA</b> developed a standard language known as <b>ECMAScript</b>. ECMAScript Edition 6 (ES6) is widely supported and is what is commonly called “JavaScript”.', ar: 'بقى فيه نسختين من نفس اللغة، فالـ <b>ECMA</b> عملت لغة standard اسمها <b>ECMAScript</b>. والـ ECMAScript Edition 6 (ES6) مدعومة في كل حتة وهي اللي بنسميها عادةً "JavaScript".' },
      { en: '<b>JavaScript = ECMAScript + DOM API</b>: the language specification, plus the way to communicate with the HTML page.', ar: 'المعادلة هي:' + L('JavaScript = ECMAScript + DOM API') + 'يعني الـ language specification، وفوقها طريقة التواصل مع صفحة الـ HTML.' },
      { en: 'The timeline on the slide, in order: JavaScript 1.0, ES1, ES2, ES3, AJAX, jQuery, ES5, <b>ES6</b>, ES7.', ar: 'الـ timeline اللي في الـ slide بالترتيب:' + L(TL.join(', ')) + 'والـ <b>ES6</b> هي اللي بنسميها "JavaScript".' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv7-hrow"><div className=${'wbv7-box k ' + pop(true)}>JavaScript<small>Netscape 2.0</small></div><div className=${'wbv7-box ' + pop(i >= 0)}>JScript<small>Microsoft</small></div></div>
      <div className=${'wbv7-hrow ' + pop(i >= 1)}><div className="wbv7-box">ECMA<small>standards body</small></div><span className="wbv7-op">→</span><div className="wbv7-box k">ECMAScript<small>ES6 = “JavaScript”</small></div></div>
      <div className=${'wbv7-hrow ' + pop(i >= 2)}><div className="wbv7-box k">JavaScript</div><span className="wbv7-hrow" style=${{ margin: 0, flexWrap: 'nowrap' }}><span className="wbv7-op">=</span><div className="wbv7-box">ECMAScript<small>language specification</small></div></span><span className="wbv7-hrow" style=${{ margin: 0, flexWrap: 'nowrap' }}><span className="wbv7-op">+</span><div className="wbv7-box">DOM API<small>communication with HTML</small></div></span></div>
      <div className=${'wbv7-tl ' + pop(i >= 3)} aria-label="timeline">${TL.flatMap((t, k) => (k ? [html`<i key=${'a' + k}>›</i>`] : []).concat(html`<span key=${t} className=${t === 'ES6' ? 'k' : ''}>${t}</span>`))}</div>
    </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [2.0], [2.1]: checking the input on the server vs in the browser ── */
  function RoundTrip({ ar }) {
    const steps = [
      { en: 'The visitor forgot to enter something in a form and presses <b>Submit</b>. Watch the same mistake without JavaScript and with it.', ar: 'الزائر نسي يدخل حاجة في الـ form وداس <b>Submit</b>. شوف نفس الغلطة من غير JavaScript ومعاها.' },
      { en: '<b>Without JavaScript</b>, the page is sent off to the server to be checked: one trip.', ar: '<b>من غير JavaScript</b> الصفحة بتتبعت للـ server عشان يتشيك عليها، ودي رحلة.' },
      { en: 'The server finds the empty field and sends a page back: a second trip, and the visitor waits for the page to <b>reload</b> before seeing what they forgot. Traffic for the server, load on the server.', ar: 'الـ server بيلاقي الخانة فاضية ويبعت صفحة تاني، ودي رحلة تانية، والزائر بيستنى الصفحة تعمل <b>reload</b> عشان يعرف نسي إيه. ده traffic على الـ server و load عليه.' },
      { en: '<b>With JavaScript</b>, the input is validated in the browser before anything is sent: <b>immediate feedback</b>, no reload, no trip to the server.', ar: '<b>مع JavaScript</b> الـ input بيتعمله validate في الـ browser قبل ما أي حاجة تتبعت، فالـ <b>feedback فوري</b> ومفيش reload ولا رحلة للـ server.' },
      { en: 'Only when the input is valid does the page go to the server, once. <b>Less server interaction</b>: it saves server traffic, which means less load on the server.', ar: 'الصفحة بتروح للـ server مرة واحدة بس لما الـ input يبقى صح. ده <b>تعامل أقل مع الـ server</b>، فبيوفر traffic ويقلل الـ load على الـ server.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const trips1 = i >= 2 ? 2 : i >= 1 ? 1 : 0, trips2 = i >= 4 ? 1 : 0;
    return html`<${Fig}><div className="fig-stage">
      <div className=${'wbv7-lane' + (i >= 3 ? ' dim' : '')}><b>Without JavaScript · trips to the server: ${trips1}</b>
        <div className="wbv7-trip"><div className="wbv7-end">Browser<br/>${i >= 2 ? html`<span className="wbv7-msg wbv7-in2">reloaded: field is empty</span>` : i === 1 ? html`<span>waiting…</span>` : html`<span>Submit ✓</span>`}</div>
          <div className="wbv7-wire"><span className=${i === 1 ? 'go' : ''}>${i >= 1 ? 'whole page →' : ' '}</span><span className=${i === 2 ? 'go' : ''}>${i >= 2 ? '← page sent back' : ' '}</span></div>
          <div className=${'wbv7-end' + (i === 1 || i === 2 ? ' k' : '')}>Server${i >= 2 ? html`<br/><span className="wbv7-msg">empty!</span>` : ''}</div></div></div>
      <div className=${'wbv7-lane' + (i < 3 && i > 0 ? ' dim' : '')}><b>With JavaScript · trips to the server: ${trips2}</b>
        <div className="wbv7-trip"><div className=${'wbv7-end' + (i === 3 ? ' k' : '')}>Browser + JS<br/>${i === 3 ? html`<span className="wbv7-msg wbv7-in2">at once: field is empty</span>` : i >= 4 ? html`<span className="wbv7-ok">valid ✓</span>` : html`<span>Submit ✓</span>`}</div>
          <div className="wbv7-wire"><span className=${i === 4 ? 'go' : ''}>${i >= 4 ? 'valid page →' : i === 3 ? 'nothing sent' : ' '}</span><span> </span></div>
          <div className=${'wbv7-end' + (i === 4 ? ' k' : '')}>Server</div></div></div>
    </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [4.0]–[4.3] slides 10, 11: the First Example read top to bottom ── */
  const FIRST = ['<!DOCTYPE html>', '<html lang="en">', '<head>', '  <meta charset="UTF-8">', '  <meta http-equiv="X-UA-Compatible" content="IE=edge">', '  <title>JS Tutorials</title>', '</head>', '<body>', '  <h2>This line is straight HTML</h2>', '  <h3>',
    '    <script type="text/javascript">', { js: '      document.write("These lines are produced by<br/>");' }, { js: '      document.write("the JavaScript program<br/>");' }, '    </script>', '  </h3>', '  <h2>More straight HTML</h2>', '  <script type="text/javascript" src="file.js"></script>', '</body>', '</html>'];
  function FirstExample({ ar }) {
    const steps = [
      { on: [0, 1, 2, 3, 4, 5, 6], en: 'The browser reads the page from the top. The <b>&lt;head&gt;</b> shows nothing on the page; the title “JS Tutorials” goes on the tab.', ar: 'الـ browser بيقرا الصفحة من فوق. الـ <bdi dir="ltr">&lt;head&gt;</bdi> مش بيظهر حاجة في الصفحة، والـ title اللي هو "JS Tutorials" بيروح على الـ tab.' },
      { on: [7, 8], en: 'In the <b>&lt;body&gt;</b>, the first &lt;h2&gt; is straight HTML: drawn as it is.', ar: 'جوه الـ <bdi dir="ltr">&lt;body&gt;</bdi> أول <bdi dir="ltr">&lt;h2&gt;</bdi> ده HTML عادي، بيترسم زي ما هو.' },
      { on: [9, 10, 11], en: 'An &lt;h3&gt; opens, then a <b>&lt;script&gt;</b>: the JS interpreter inside the browser reads and executes it at once. <code>document.write</code> puts “These lines are produced by” and a line break right here, inside the &lt;h3&gt;.', ar: 'بيتفتح <bdi dir="ltr">&lt;h3&gt;</bdi> وبعده <bdi dir="ltr">&lt;script&gt;</bdi>، فالـ JS interpreter اللي جوه الـ browser بيقراه وينفذه على طول. الـ <code>document.write</code> بيحط "These lines are produced by" وسطر جديد هنا بالظبط، جوه الـ <bdi dir="ltr">&lt;h3&gt;</bdi>.' },
      { on: [12], en: 'The second statement writes “the JavaScript program”. Both lines are in the &lt;h3&gt;, so they get its bold heading style.', ar: 'الـ statement التاني بيكتب "the JavaScript program". السطرين جوه الـ <bdi dir="ltr">&lt;h3&gt;</bdi>، فبياخدوا شكل الـ heading التخين بتاعه.' },
      { on: [13, 14, 15], en: 'The script and the &lt;h3&gt; close; the next &lt;h2&gt; is straight HTML again.', ar: 'الـ script والـ <bdi dir="ltr">&lt;h3&gt;</bdi> بيتقفلوا، والـ <bdi dir="ltr">&lt;h2&gt;</bdi> اللي بعدهم HTML عادي تاني.' },
      { on: [16], file: true, en: 'An <b>external file</b>: <code>src="file.js"</code> makes the browser load file.js and run it here. Its line, “this line is produced by external script”, appears at this point of the page.', ar: 'ده <b>external file</b>، والـ <bdi dir="ltr">src="file.js"</bdi> بيخلي الـ browser يحمّل الـ file.js ويشغله هنا. السطر بتاعه "this line is produced by external script" بيظهر في المكان ده من الصفحة.' },
      { on: [17, 18], file: true, en: 'Done: the page matches the slide’s output. The JS was not compiled first: the interpreter ran each script as the browser reached it.', ar: 'خلصنا، والصفحة طلعت زي الـ output اللي في الـ slide. الـ JS ما اتعملهاش compile الأول، الـ interpreter شغّل كل script أول ما الـ browser وصله.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i], nw = k => (k === i ? ' wbv7-new' : '');
    return html`<${Fig}><div className="fig-stage"><div className="wbv7-two">
      <div><${Code} lines=${FIRST} on=${s.on} label="First Example source" />
        ${i >= 5 && html`<div className="wbv7-file">file.js</div><${Code} lines=${[{ js: 'document.write("this line is produced by external script");' }]} on=${i === 5 ? [0] : []} label="file.js" />`}</div>
      <div><${Arrow} /><${Win} url=${'JS Tutorials'}>
        ${i >= 1 && html`<div className=${'wbv7-h2' + nw(1)}>This line is straight HTML</div>`}
        ${i >= 2 && html`<div className="wbv7-h3"><span className=${nw(2)}>These lines are produced by</span><br/>${i >= 3 && html`<span className=${nw(3)}>the JavaScript program</span>`}</div>`}
        ${i >= 4 && html`<div className=${'wbv7-h2' + nw(4)}>More straight HTML</div>`}
        ${i >= 5 && html`<div className=${'wbv7-p' + nw(5)}>this line is produced by external script</div>`}
      <//></div></div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [4.1], [4.2] slide 8: a function in the <head> runs when called, code in the <body> runs once at load ── */
  const HB = ['<head>', '  <script>', { js: '    function sayHi() {' }, { js: '      alert("Hi");' }, { js: '    }' }, '  </script>', '</head>', '<body>', '  <button onclick="sayHi()">Press</button>', '  <script>', { js: '    document.write("Hello Java Script");' }, '  </script>', '</body>'];
  function HeadBody({ ar }) {
    const steps = [
      { on: [1, 2, 3, 4, 5], en: 'The <b>&lt;head&gt;</b> script is read first, but it only <b>defines</b> the function sayHi. Nothing runs yet: it is interpreted only when the function is called.', ar: 'الـ script اللي في الـ <bdi dir="ltr">&lt;head&gt;</bdi> بيتقري الأول، بس هو بس <b>بيعرّف</b> الـ function اللي اسمها sayHi. لسه مفيش حاجة اتنفذت، وهيتعمله interpret بس لما الـ function تتنادى.' },
      { on: [8], en: 'The body draws the button. Its <code>onclick</code> will call sayHi.', ar: 'الـ body بيرسم الـ button، والـ <code>onclick</code> بتاعه هينادي sayHi.' },
      { on: [9, 10, 11], en: 'The <b>&lt;body&gt;</b> script runs right now, <b>once</b>, while the document is first loaded: it writes “Hello Java Script”.', ar: 'الـ script اللي في الـ <bdi dir="ltr">&lt;body&gt;</bdi> بيتنفذ دلوقتي <b>مرة واحدة</b> وهو الـ document بيتحمّل أول مرة، وبيكتب "Hello Java Script".' },
      { on: [2, 3, 4, 8], en: 'The page is loaded. <b>Press the button</b> as many times as you like: each press calls sayHi again (code that may execute multiple times belongs in the head). The body script never runs again.', ar: 'الصفحة اتحملت. <b>دوس على الـ button</b> كذا مرة زي ما تحب، وكل مرة بتنادي sayHi تاني (الـ code اللي ممكن يتنفذ كذا مرة مكانه الـ head). والـ body script مش بيتنفذ تاني خالص.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800), [n, setN] = useState(0), [box, setBox] = useState(false);
    const press = () => { if (i < 3) return; setN(x => x + 1); setBox(true); };
    const c = { ...ctl, go: j => { setN(0); setBox(false); ctl.go(j); }, replay: () => { setN(0); setBox(false); ctl.replay(); } };
    return html`<${Fig}><div className="fig-stage"><div className="wbv7-two">
      <${Code} lines=${HB} on=${box ? [3] : steps[i].on} label="head and body scripts" />
      <div><${Arrow} /><${Win} url="page.html" over=${box && html`<${Alert} msg="Hi" ok=${() => setBox(false)} />`}>
        ${i >= 1 && html`<div className="wbv7-p wbv7-in2"><button className="wbv7-pbtn" onClick=${press} disabled=${i < 3}>Press</button></div>`}
        ${i >= 2 && html`<div className=${'wbv7-p' + (i === 2 ? ' wbv7-new' : '')}>Hello Java Script</div>`}
      <//>
      <div className="wbv7-ctr"><span>sayHi() ran: <b>${n}</b></span><span>body script ran: <b>${i >= 2 ? 1 : 0}</b></span></div></div></div></div>
      <${Cap} en=${steps[i].en + (i === 3 && n ? ` You pressed ${n} time${n > 1 ? 's' : ''}.` : '')} ar=${steps[i].ar + (i === 3 && n ? ' عدد مرات الضغط ' + T(String(n)) + '.' : '')} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${c} /><//>`;
  }

  /* ── [4.3], [4.4] Lab 7: inline, internal, external ── */
  const PLACES = {
    inline: { files: [['page.html', ['<button onclick="alert(\'Hi\')">Press</button>']]], en: '<b>Inline</b>: the JS sits inside an event attribute of the tag itself. Fine for one short statement.', ar: '<b>الـ Inline</b> يعني الـ JS قاعدة جوه event attribute في الـ tag نفسه. مناسبة لـ statement واحد قصير.' },
    internal: { files: [['page.html', ['<button onclick="sayHi()">Press</button>', '<script>', { js: '  function sayHi() {' }, { js: '    alert("Hi");' }, { js: '  }' }, '</script>']]], en: '<b>Internal</b>: the JS is in a <b>&lt;script&gt;</b> block in the same page; the button calls the function by name.', ar: '<b>الـ Internal</b> يعني الـ JS في block <bdi dir="ltr">&lt;script&gt;</bdi> في نفس الصفحة، والـ button بينادي الـ function باسمها.' },
    external: { files: [['page.html', ['<button onclick="sayHi()">Press</button>', '<script src="file.js"></script>']], ['file.js', [{ js: 'function sayHi() {' }, { js: '  alert("Hi");' }, { js: '}' }]]], en: '<b>External</b>: the JS is in its own <b>.js</b> file, included with the <b>src</b> attribute. The &lt;script&gt; tag stays empty; the same file can serve many pages.', ar: '<b>الـ External</b> يعني الـ JS في ملف <bdi dir="ltr">.js</bdi> لوحده، وبيتضمّن بالـ attribute اللي اسمه <b>src</b>. الـ tag ده بيفضل فاضي، ونفس الملف ينفع لصفحات كتير.' }
  };
  function Places({ ar }) {
    const [k, setK] = useState('inline'), [box, setBox] = useState(false), P = PLACES[k];
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Where the JS is" items=${[['inline', 'Inline'], ['internal', 'Internal'], ['external', 'External']]} sel=${k} on=${x => { setK(x); setBox(false); }} />
      <div className="wbv7-two"><div>${P.files.map(([f, ls]) => html`<div key=${f}><div className="wbv7-file">${f}</div><${Code} lines=${ls} on=${box ? ls.map((_, j) => j).filter(j => /alert/.test(typeof ls[j] === 'string' ? ls[j] : ls[j].js)) : []} label=${f} /></div>`)}</div>
        <div><${Arrow} /><${Win} url="page.html" over=${box && html`<${Alert} msg="Hi" ok=${() => setBox(false)} />`}><div className="wbv7-p"><button className="wbv7-pbtn" onClick=${() => setBox(true)}>Press</button></div><//></div></div>
    </div><${Cap} en=${P.en + ' Press the button: all three give the same alert box.'} ar=${P.ar + ' دوس على الـ button، والتلات طرق بيطلّعوا نفس الـ alert box.'} showAr=${ar} /><//>`;
  }

  /* ── [4.5] <noscript> ── */
  function NoScript({ ar }) {
    const [on, setOn] = useState(true);
    const lines = ['<script>', { js: '  document.write("Hello Java Script");' }, '</script>', '<noscript>Your browser does not support JavaScript!</noscript>'];
    const m = on ? { en: '<b>JavaScript on</b>: the script runs and writes its line; the browser ignores the &lt;noscript&gt; content.', ar: '<b>الـ JavaScript شغالة</b>، فالـ script بيتنفذ ويكتب السطر بتاعه، والـ browser بيتجاهل محتوى الـ <bdi dir="ltr">&lt;noscript&gt;</bdi>.' }
      : { en: '<b>JavaScript off</b>: the script is skipped, and only now the &lt;noscript&gt; content is displayed.', ar: '<b>الـ JavaScript مقفولة</b>، فالـ script بيتعدّى، ودلوقتي بس محتوى الـ <bdi dir="ltr">&lt;noscript&gt;</bdi> بيظهر.' };
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="JavaScript in the browser" items=${[['on', 'JavaScript on'], ['off', 'JavaScript off']]} sel=${on ? 'on' : 'off'} on=${x => setOn(x === 'on')} />
      <div className="wbv7-two"><${Code} lines=${lines} on=${on ? [0, 1, 2] : [3]} cls=${on ? { 3: 'dim' } : { 0: 'dim', 1: 'dim', 2: 'dim' }} label="noscript example" />
        <div><${Arrow} /><${Win} url="page.html"><div className="wbv7-p wbv7-in2" key=${String(on)}>${on ? 'Hello Java Script' : 'Your browser does not support JavaScript!'}</div><//></div></div>
    </div><${Cap} ...${m} showAr=${ar} /><//>`;
  }

  /* ── [5.0], [5.2] slide 15: loose typing, the type follows the value ── */
  const TN = { string: 'String', number: 'Number', boolean: 'Boolean', undefined: 'Undefined', object: 'Object', function: 'Function', symbol: 'Symbol', bigint: 'BigInt' };
  function Loose({ ar }) {
    const steps = [
      { r: { t: 'undefined', v: undefined }, en: '<code>var x;</code> declares x but stores nothing: a variable declared but not initialized has the value <b>undefined</b>, type Undefined.', ar: 'الـ <bdi dir="ltr">var x;</bdi> بيعرّف x من غير ما يخزن فيه حاجة، والـ variable اللي اتعرّف ومتدّلوش قيمة بيبقى <b>undefined</b> ونوعه Undefined.' },
      { r: { t: 'number', v: 2 }, en: '<code>x = 2;</code> stores a number, so x is now of type <b>Number</b>. No type was ever written: JS figures it out from the value.', ar: 'الـ <bdi dir="ltr">x = 2;</bdi> بيخزن رقم، فالـ x بقى نوعه <b>Number</b>. محدش كتب النوع، الـ JS عرفته من القيمة.' },
      { r: { t: 'string', v: 'Hi' }, en: '<code>x = \'Hi\';</code> the same variable now holds text, so its type becomes <b>String</b>. That is loose typing: the type is determined dynamically by the value stored.', ar: 'الـ <bdi dir="ltr">x = \'Hi\';</bdi> نفس الـ variable بقى شايل نص، فنوعه بقى <b>String</b>. ده الـ loose typing، يعني النوع بيتحدد dynamically من القيمة المتخزنة.' }
    ];
    const [mode, setMode] = useState('ex'), [own, setOwn] = useState('true');
    const [i, ctl] = useSteps(steps.length, 2600);
    const lines = [{ js: 'var x;       // type: Undefined' }, { js: 'x = 2;       // type: Number' }, { js: "x = 'Hi';    // type: String" }];
    const r = mode === 'own' ? lit(own) : steps[i].r;
    const capOwn = r ? { en: `<code>x = ${esc(own.trim())};</code> stores a value of type <b>${TN[r.t]}</b>, so <code>typeof x</code> is "${r.t}".` + (r.k === 'null' ? ' (null is a value of its own, but typeof calls it "object".)' : r.k === 'array' ? ' (Arrays are objects.)' : ''),
      ar: 'القيمة دي نوعها <b>' + TN[r.t] + '</b>، فالـ typeof بيرجع ' + T('"' + r.t + '"') + '.' + (r.k === 'null' ? ' (الـ null قيمة لوحدها، بس الـ typeof بيقول عليها "object".)' : r.k === 'array' ? ' (الـ arrays عبارة عن objects.)' : '') }
      : { en: 'Type a value the notes cover: a number, a string in quotes, true / false, null, undefined, an array like [1,2,3], {} or function(){}.', ar: 'اكتب قيمة من اللي في النوتس، يعني رقم أو string بين quotes أو true أو false أو null أو undefined أو array زي <bdi dir="ltr">[1,2,3]</bdi> أو <bdi dir="ltr">{}</bdi> أو <bdi dir="ltr">function(){}</bdi>.' };
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Example" items=${[['ex', 'Example from the notes'], ['own', 'Try your own']]} sel=${mode} on=${setMode} />
      ${mode === 'own' ? html`<div className="wbv7-own"><small>x = (a value)</small><input className="wbv7-in" value=${own} maxLength="40" spellCheck="false" autoCapitalize="off" aria-label="value for x" onInput=${e => setOwn(e.target.value)} /></div>`
        : html`<div style=${{ maxWidth: '360px', margin: '0 auto' }}><${Code} lines=${lines} on=${[i]} cls=${{ [i + 1]: 'dim', [i + 2]: 'dim' }} label="slide 15" /></div>`}
      <div className="wbv7-var">${r ? html`<div className="wbv7-cell wbv7-in2" key=${mode + i + own}><small>variable x holds</small><b>${show(r)}</b></div><span className="wbv7-tag">typeof x → "${r.t}"</span>` : html`<div className="wbv7-cell"><small>variable x holds</small><b>?</b></div>`}</div>
    </div><${Cap} ...${mode === 'own' ? capOwn : steps[i]} showAr=${ar} />${mode === 'ex' && html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}<//>`;
  }

  /* ── [5.1] var, let, const: global, function and block scope ── */
  const SC = [{ js: 'var g = "global";' }, { js: 'function f() {' }, { js: '  var a = "local";' }, { js: '  if (true) {' }, { js: '    var v = 1;' }, { js: '    let b = 2;' }, { js: '    const c = 3;' }, { js: '    // spot A' }, { js: '  }' }, { js: '  // spot B' }, { js: '}' }, { js: 'f();' }, { js: '// spot C' }];
  const NAMES = [['g', 'var, outside any function: global'], ['a', 'var inside f: local to f'], ['v', 'var inside the if: still the whole of f'], ['b', 'let: only the { } block'], ['c', 'const: only the { } block']];
  const SEE = { A: ['g', 'a', 'v', 'b', 'c'], B: ['g', 'a', 'v'], C: ['g'] };
  function Scope({ ar }) {
    const [k, setK] = useState('A');
    const spot = k === 'const' ? 'A' : k, line = { A: 7, B: 9, C: 12 }[spot];
    const cls = {}; for (let j = 2; j <= 9; j++) cls[j] = 'f'; for (let j = 4; j <= 7; j++) cls[j] = 'f k';
    const lines = k === 'const' ? SC.map((l, j) => j === 7 ? { js: '    c = 4;   // spot A' } : l) : SC;
    const caps = {
      A: { en: '<b>Spot A</b>, inside the if block: all five names are visible. g is global, a and v belong to f, b and c belong to this block.', ar: 'في <b>الـ spot A</b> اللي جوه الـ if block، الأسامي الخمسة باينين. الـ g هو global، والـ a والـ v تبع الـ f، والـ b والـ c تبع الـ block ده.' },
      B: { en: '<b>Spot B</b>, after the block but still in f: <b>b</b> and <b>c</b> are gone (let and const have <b>block scope</b>), but <b>v</b> is still there: var ignores blocks and has <b>function scope</b>.', ar: 'في <b>الـ spot B</b> بعد الـ block بس لسه جوه f، الـ <b>b</b> والـ <b>c</b> اختفوا لأن الـ let والـ const ليهم <b>block scope</b>. بس الـ <b>v</b> لسه موجود، لأن الـ var مش بيهتم بالـ blocks وليه <b>function scope</b>.' },
      C: { en: '<b>Spot C</b>, outside the function: only <b>g</b> is visible. Declarations within a function are local to it; the one outside any function is global.', ar: 'في <b>الـ spot C</b> برا الـ function، الـ <b>g</b> بس اللي باين. أي declaration جوه function بيبقى local ليها، واللي برا أي function بيبقى global.' },
      const: { en: '<b>const</b> declares a constant: trying to reassign c stops the program with a TypeError.', ar: 'الـ <b>const</b> بتعرّف constant، فلو حاولت تعمل reassign للـ c البرنامج بيقف بـ TypeError.' }
    };
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Where to look" items=${[['A', 'Spot A'], ['B', 'Spot B'], ['C', 'Spot C'], ['const', 'Reassign c']]} sel=${k} on=${setK} />
      <div className="wbv7-two"><${Code} lines=${lines} on=${[line]} cls=${cls} label="scope example" />
        <div>${k === 'const' ? html`<div className="wbv7-err wbv7-in2">c = 4;<br/>TypeError: Assignment to constant variable.</div>` : html`<table className="wbv7-tbl"><thead><tr><th>name</th><th>at spot ${spot}</th><th>why</th></tr></thead><tbody>
          ${NAMES.map(([n, why]) => { const ok = SEE[spot].includes(n); return html`<tr key=${n}><td><code>${n}</code></td><td className=${ok ? 'wbv7-yes' : 'wbv7-no'}>${ok ? '✓ visible' : '✗ ReferenceError'}</td><td>${why}</td></tr>`; })}</tbody></table>`}</div></div>
    </div><${Cap} ...${caps[k]} showAr=${ar} /><//>`;
  }

  /* ── [5.3] naming rules ── */
  const RESERVED = 'break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof let new null return static super switch this throw true try typeof var void while with yield await implements interface package private protected public'.split(' ');
  const LET = /[\p{L}$_]/u, REST = /[\p{L}$_0-9]/u;
  function Names({ ar }) {
    const [k, setK] = useState('_myVariable'), [own, setOwn] = useState('my-name');
    const nm = k === 'own' ? own : k, ch = [...nm];
    const r1 = ch.length > 0 && LET.test(ch[0]), badRest = ch.map((c, j) => j > 0 && !REST.test(c)), r2 = ch.length > 0 && !badRest.some(Boolean), r3 = !RESERVED.includes(nm), ok = r1 && r2 && r3;
    const rules = [
      [r1, 'Starts with a letter, $ or _' + (ch.length && !r1 ? ` (it starts with “${ch[0]}”)` : '')],
      [r2, 'Then only letters, $, _ or digits' + (ch.length && !r2 ? ` (“${ch.filter((_, j) => badRest[j]).join('')}” is not allowed)` : '')],
      [r3, 'Is not a reserved word' + (!r3 ? ' (it is one)' : '')]
    ];
    const en = !ch.length ? 'Type a name to check it.' : ok ? `<b>${esc(nm)}</b> is a valid variable name. Names are case sensitive: <b>${esc(nm)}</b> and <b>${esc(nm.toUpperCase() === nm ? nm.toLowerCase() : nm.toUpperCase())}</b> would be two different variables.` : `<b>${esc(nm)}</b> is not a valid variable name: it breaks the rule marked ✗.`;
    const arT = !ch.length ? 'اكتب اسم عشان نشيك عليه.' : ok ? 'الاسم ده ' + T(nm) + ' صح كـ variable name. والأسامي case sensitive، يعني لو غيرت حالة الحروف هيبقى variable تاني خالص.' : 'الاسم ده ' + T(nm) + ' مينفعش يبقى variable name، لأنه بيكسر القاعدة اللي عليها ✗.';
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="Name" items=${[['_myVariable', '_myVariable'], ['123variable', '123variable'], ['break', 'break'], ['$total', '$total'], ['own', 'Try your own']]} sel=${k} on=${setK} />
      ${k === 'own' && html`<div className="wbv7-own"><small>A variable name</small><input className="wbv7-in" value=${own} maxLength="30" spellCheck="false" autoCapitalize="off" aria-label="variable name" onInput=${e => setOwn(e.target.value)} /></div>`}
      <div className="wbv7-name" dir="ltr">${ch.map((c, j) => html`<span key=${j} className=${(j === 0 && !r1) || badRest[j] || !r3 ? 'x' : ''}>${c === ' ' ? '␣' : c}</span>`)}</div>
      <div className="wbv7-rules">${rules.map(([good, t], j) => html`<div key=${j}><span className=${good ? 'wbv7-yes' : 'wbv7-no'}>${good ? '✓' : '✗'}</span><span>${t}</span></div>`)}</div>
      <p className=${'wbv7-verdict ' + (ok ? 'wbv7-yes' : 'wbv7-no')}>${ok ? '✓ valid name' : '✗ not valid'}</p>
    </div><${Cap} en=${en} ar=${arT} showAr=${ar} /><//>`;
  }

  /* ── [5.4], [5.5] typeof, including typeof typeof ── */
  const TYX = ['"a"', '5', 'true', 'undefined', 'null', '[1,2,3]', 'NaN', 'function(){}', 'typeof 1'];
  const WHY = {
    null: { en: 'This is the well-known surprise: <b>typeof null</b> is "object", although null is a value of its own.', ar: 'دي المفاجأة المشهورة، الـ typeof بتاع null بيطلع "object" مع إن الـ null قيمة لوحدها.' },
    array: { en: 'Arrays are objects, so <b>typeof</b> an array is "object".', ar: 'الـ arrays عبارة عن objects، فالـ typeof بتاع أي array بيطلع "object".' },
    nan: { en: 'NaN means “Not a Number”, yet it is a value of the number type: "number".', ar: 'الـ NaN معناها "Not a Number"، ومع ذلك هي قيمة من نوع number، فالنتيجة "number".' },
    tt: { en: 'typeof always gives back a <b>string</b>, so applying typeof to that result gives "string".', ar: 'الـ typeof دايماً بيرجع <b>string</b>، فلو عملت typeof تاني على النتيجة هيطلع "string".' },
    plain: { en: 'typeof gives back the type of the value as a string.', ar: 'الـ typeof بيرجع نوع القيمة على شكل string.' }
  };
  function readTypeof(s) {
    s = s.trim(); let n = 0;
    for (;;) { const m = s.match(/^typeof(?:\s+|(?=\())/); if (!m) break; n++; s = s.slice(m[0].length).trim(); }
    while (/^\(.*\)$/.test(s) && splitTop(s.slice(1, -1), '\u0000')) s = s.slice(1, -1).trim();
    const r = lit(s); if (!r) return null;
    const out = [[`typeof ${s}`, r.t]]; for (let j = 1; j < Math.max(n, 1); j++) out.push([`typeof "${out[j - 1][1]}"`, 'string']);
    return { r, out, n };
  }
  function Typeof({ ar }) {
    const [k, setK] = useState('null'), [own, setOwn] = useState('typeof typeof [ ]');
    const src = k === 'own' ? own : 'typeof ' + k, t = readTypeof(src);
    let en, a;
    if (!t) { en = 'This tracer reads only <code>typeof</code> in front of a value the notes cover: a number, a string in quotes, true / false, undefined, null, NaN, an array, {}, function(){} or Symbol().'; a = 'الـ tracer ده بيقرا بس الـ typeof قدام قيمة من اللي في النوتس، يعني رقم أو string بين quotes أو true أو false أو undefined أو null أو NaN أو array أو <bdi dir="ltr">{}</bdi> أو <bdi dir="ltr">function(){}</bdi> أو <bdi dir="ltr">Symbol()</bdi>.'; }
    else { const w = t.out.length > 1 ? WHY.tt : WHY[t.r.k] || WHY.plain; en = `Result: <b>"${t.out[t.out.length - 1][1]}"</b>. ` + w.en; a = 'النتيجة هي ' + T('"' + t.out[t.out.length - 1][1] + '"') + '. ' + w.ar; }
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="Expression" items=${TYX.map(x => [x, 'typeof ' + x]).concat([['own', 'Try your own']])} sel=${k} on=${setK} />
      ${k === 'own' && html`<div className="wbv7-own"><small>typeof (a value)</small><input className="wbv7-in" value=${own} maxLength="50" spellCheck="false" autoCapitalize="off" aria-label="typeof expression" onInput=${e => setOwn(e.target.value)} /></div>`}
      <div className="wbv7-trace">${t ? t.out.map(([e, r], j) => html`<div key=${src + j} className=${'wbv7-in2' + (j === t.out.length - 1 ? ' on' : '')} style=${{ animationDelay: j * .5 + 's' }}><small>${j === 0 ? 'innermost first' : 'then the outer typeof'}</small>${e}  →  <span className="wbv7-v s">"${r}"</span></div>`) : html`<div><small>not understood</small>${src}</div>`}</div>
    </div><${Cap} en=${en} ar=${a} showAr=${ar} /><//>`;
  }

  /* ── [6.0] slide 16: + with a string operand concatenates ── */
  function readPlus(s) {
    const parts = splitTop(s, '+'); if (!parts || parts.length < 2) return null;
    const vals = parts.map(p => lit(p)); if (vals.some(v => !v || (v.t !== 'number' && v.t !== 'string'))) return null;
    const steps = []; let acc = vals[0];
    for (let j = 1; j < vals.length; j++) {
      const b = vals[j], str = acc.t === 'string' || b.t === 'string';
      const res = str ? { t: 'string', v: String(acc.v) + String(b.v) } : { t: 'number', v: acc.v + b.v };
      steps.push({ a: acc, b, str, res }); acc = res;
    }
    return steps;
  }
  const V = r => html`<span className=${'wbv7-v ' + (r.t === 'string' ? 's' : 'n')}>${show(r)}</span>`;
  function PlusTrace({ steps, ar }) {
    const [i, ctl] = useSteps(steps.length + 1, 2400), done = i >= steps.length, s = steps[Math.min(i, steps.length - 1)];
    const caps = steps.map(st => st.str
      ? { en: `${esc(show(st.a))} + ${esc(show(st.b))}: one operand is a <b>string</b>, so + means <b>string concatenation</b>; the other operand is coerced to a string and the two are joined.`, ar: 'الـ + هنا فيها operand من نوع <b>string</b>، فبتبقى <b>string concatenation</b>، والـ operand التاني بيتحول لـ string ويتلزقوا في بعض:' + L(`${show(st.a)} + ${show(st.b)} → ${show(st.res)}`) }
      : { en: `${esc(show(st.a))} + ${esc(show(st.b))}: both operands are numbers, so + adds them.`, ar: 'الـ operands الاتنين numbers، فالـ + بتجمعهم عادي:' + L(`${show(st.a)} + ${show(st.b)} → ${show(st.res)}`) });
    const last = steps[steps.length - 1].res;
    const fin = { en: `Result: <b>${esc(show(last))}</b>, a ${last.t}. The + is read left to right, one pair at a time.`, ar: 'النتيجة ' + T(show(last)) + ' ونوعها ' + last.t + '. الـ + بتتقري من الشمال لليمين، كل اتنين مع بعض.' };
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}><div className="wbv7-trace" style=${{ marginTop: 0 }}>${steps.slice(0, Math.min(i + 1, steps.length)).map((st, j) => html`<div key=${j} className=${'wbv7-in2' + (j === i ? ' on' : '')}>
        <small>${st.str ? 'a string is involved: concatenate' : 'two numbers: add'}</small>${V(st.a)} + ${V(st.b)}${st.str && st.a.t !== 'string' ? html`  (${V(st.a)} → ${V({ t: 'string', v: String(st.a.v) })})` : ''}${st.str && st.b.t !== 'string' ? html`  (${V(st.b)} → ${V({ t: 'string', v: String(st.b.v) })})` : ''}  →  ${V(st.res)}</div>`)}
      ${done && html`<div className="on wbv7-in2"><small>result</small>${V(last)}  typeof → "${last.t}"</div>`}</div></div>
      <${Cap} ...${done ? fin : caps[i]} showAr=${ar} /><${Bar} steps=${steps.concat([0])} i=${i} ctl=${ctl} />`;
  }
  function Plus({ ar }) {
    const [k, setK] = useState('59'), [own, setOwn] = useState('1 + 2 + "3"');
    const ex = { 59: ['5 + "9"', [{ js: '5 + "9"' }]], hello: ["'Hello' + 4", [{ js: "var x = 'Hello';" }, { js: 'var y = 4;' }, { js: "var result = x + y;   // 'Hello4'" }]] };
    const src = k === 'own' ? own : ex[k][0], steps = readPlus(src);
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="Expression" items=${[['59', '5 + "9"'], ['hello', 'x + y (slide 16)'], ['own', 'Try your own']]} sel=${k} on=${setK} />
      ${k === 'own' ? html`<div className="wbv7-own"><small>numbers and strings joined with +</small><input className="wbv7-in" value=${own} maxLength="50" spellCheck="false" autoCapitalize="off" aria-label="expression" onInput=${e => setOwn(e.target.value)} /></div>`
        : html`<div style=${{ maxWidth: '360px', margin: '0 auto' }}><${Code} lines=${ex[k][1]} label="expression" /></div>`}
    </div>${steps ? html`<${PlusTrace} key=${src} steps=${steps} ar=${ar} />` : html`<${Cap} en="This tracer reads only numbers and strings in quotes joined with +, for example <code>1 + 2 + &quot;3&quot;</code>." ar=${'الـ tracer ده بيقرا بس أرقام و strings بين quotes متوصّلين بـ +، زي ' + T('1 + 2 + "3"') + '.'} showAr=${ar} />`}<//>`;
  }

  /* ── [6.1] slides 13, 17: comments are skipped ── */
  function Comments({ ar }) {
    const steps = [
      { en: 'The code from slide 13, with a single-line comment <code>//</code> and a multi-line comment <code>/* */</code>, written the same way as in Java.', ar: 'ده الـ code بتاع slide 13 ومعاه single-line comment بـ <bdi dir="ltr">//</bdi> و multi-line comment بـ <bdi dir="ltr">/* */</bdi>، ونفس الكتابة بتاعة الـ Java.' },
      { en: 'The interpreter skips every comment: everything after <code>//</code> to the end of the line, and everything between <code>/*</code> and <code>*/</code>, over several lines.', ar: 'الـ interpreter بيتجاهل كل الـ comments، يعني أي حاجة بعد الـ <bdi dir="ltr">//</bdi> لحد آخر السطر، وأي حاجة بين الـ <bdi dir="ltr">/*</bdi> والـ <bdi dir="ltr">*/</bdi> حتى لو كذا سطر.' },
      { en: 'Only the two real statements run: the console shows <b>Adel</b>. Recall the 2 comment syntaxes: HTML uses <code>&lt;!-- --&gt;</code>; CSS and JS use <code>/* */</code>.', ar: 'الـ statements الحقيقيين الاتنين بس اللي اتنفذوا، والـ console بيطلّع <b>Adel</b>. افتكر الطريقتين، الـ HTML بيستخدم <bdi dir="ltr">&lt;!-- --&gt;</bdi>، والـ CSS والـ JS بيستخدموا <bdi dir="ltr">/* */</bdi>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const lines = [{ js: '// var' }, { js: 'var name = "Adel";   // a string' }, { h: '<span class="wbv7-cm">/* a multi-line comment:</span>' }, { h: '<span class="wbv7-cm">   none of this runs */</span>' }, { js: 'console.log(name);' }];
    const cls = i >= 1 ? { 0: 'gone', 2: 'gone', 3: 'gone' } : {};
    return html`<${Fig}><div className="fig-stage">
      <div style=${{ maxWidth: '380px', margin: '0 auto' }}><div className="wbv7-file">firstjs.js</div><${Code} lines=${lines} on=${i >= 1 ? [1, 4] : []} cls=${cls} label="comments example" />
        ${i >= 2 && html`<${Console} lines=${['Adel']} />`}
        ${i >= 2 && html`<table className="wbv7-tbl wbv7-in2"><thead><tr><th>language</th><th>comment</th></tr></thead><tbody><tr><td>HTML</td><td><code>${'<!-- comment -->'}</code></td></tr><tr><td>CSS / JS</td><td><code>/* comment */</code></td></tr><tr><td>JS only</td><td><code>// comment</code></td></tr></tbody></table>`}</div>
    </div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── [7] slides 18 to 26: the four ways to output ── */
  const OUT = {
    inner: { label: 'innerHTML', code: ['<div id="demo"> Hello</div>', '<script>', { js: '  document.getElementById("demo").innerHTML = "Hello Java Script";' }, '</script>'], run: 2 },
    write: { label: 'document.write()', code: ['<script>', { js: '  document.write("Hello Java Script");' }, '</script>'], run: 1 },
    after: { label: 'write after load', code: ['<h1>The Document Object</h1>', '<h2>The open() Method</h2>', '<p>If document.write() is used on a closed document, document.open() is automatically called.</p>', '<p>This will delete existing content.</p>', '<button onclick="myFunction()">Try it</button>', '<script>', { js: 'function myFunction() {' }, { js: '  document.write("<h1>Hello World</h1>");' }, { js: '}' }, '</script>'], run: 7 },
    alert: { label: 'alert()', code: ['<script>', { js: '  alert("success process");' }, '</script>'], run: 1 },
    cons: { label: 'console.log()', code: ['<script>', { js: '  console.log(5 + 6);' }, '</script>'], run: 1 }
  };
  const OCAP = {
    inner: [{ en: '<b>innerHTML</b> (Example 1): the page has a div with id="demo" holding “Hello”. Press Run.', ar: 'الـ <b>innerHTML</b> في Example 1، الصفحة فيها div الـ id بتاعه demo وجواه "Hello". دوس Run.' },
      { en: 'The script finds the element by its id and replaces what is inside it: the div now says <b>Hello Java Script</b>. Writing into an HTML element.', ar: 'الـ script بيلاقي الـ element بالـ id بتاعه ويغيّر اللي جواه، والـ div بقى فيه <b>Hello Java Script</b>. ده الكتابة جوه HTML element.' }],
    write: [{ en: '<b>document.write()</b> while the page loads (slide 22). Press Run.', ar: 'الـ <bdi dir="ltr">document.write()</bdi> وهي الصفحة بتتحمّل (slide 22). دوس Run.' },
      { en: 'The text is written into the HTML output right where the script sits: <b>Hello Java Script</b> appears in the page.', ar: 'النص بيتكتب في الـ HTML output في نفس مكان الـ script، فالـ <b>Hello Java Script</b> بيظهر في الصفحة.' }],
    after: [{ en: '<b>Example 4</b>: the page is fully loaded. Press <b>Try it</b> in the page (or Run).', ar: 'ده <b>Example 4</b>، والصفحة اتحمّلت خلاص. دوس <b>Try it</b> في الصفحة (أو Run).' },
      { en: 'document.write() on a closed (loaded) document calls document.open() automatically, which <b>deletes all existing HTML</b>: only “Hello World” is left.', ar: 'الـ <bdi dir="ltr">document.write()</bdi> على document اتقفل (اتحمّل) بتنادي الـ <bdi dir="ltr">document.open()</bdi> لوحدها، وده <b>بيمسح كل الـ HTML الموجود</b>، ومفيش غير "Hello World".' }],
    alert: [{ en: '<b>alert()</b>, also written window.alert(). Press Run.', ar: 'الـ <bdi dir="ltr">alert()</bdi> وبتتكتب كمان <bdi dir="ltr">window.alert()</bdi>. دوس Run.' },
      { en: 'Writing into an <b>alert box</b>: the message “success process” pops up over the page until OK is pressed.', ar: 'ده الكتابة في <b>alert box</b>، والرسالة "success process" بتطلع فوق الصفحة لحد ما تدوس OK.' }],
    cons: [{ en: '<b>console.log()</b>. Press Run, and look under the page, where the browser console is (Inspect, Console tab).', ar: 'الـ <bdi dir="ltr">console.log()</bdi>. دوس Run وبص تحت الصفحة، مكان الـ console بتاع الـ browser (من Inspect وبعدين تاب Console).' },
      { en: 'The expression is computed first, 5 + 6 = 11, and <b>11</b> is written into the console; the page itself does not change. Used for debugging.', ar: 'الـ expression بيتحسب الأول، يعني 5 و 6 مجموعهم 11، والـ <b>11</b> بيتكتب في الـ console، والصفحة نفسها مش بتتغير. ده بيستخدم في الـ debugging.' }]
  };
  function Output({ ar }) {
    const [k, setK] = useState('inner'), [ran, setRan] = useState(false), [box, setBox] = useState(false), O = OUT[k];
    const run = () => { setRan(true); if (k === 'alert') setBox(true); };
    let page;
    if (k === 'inner') page = html`<div className=${'wbv7-p' + (ran ? ' wbv7-new' : '')}>${ran ? 'Hello Java Script' : ' Hello'}</div>`;
    else if (k === 'write') page = ran ? html`<div className="wbv7-p wbv7-new wbv7-in2">Hello Java Script</div>` : html`<div className="wbv7-p" style=${{ color: 'var(--graphite)' }}>(empty page)</div>`;
    else if (k === 'after') page = ran ? html`<div className="wbv7-h1 wbv7-in2">Hello World</div>` : html`<div><div className="wbv7-h1">The Document Object</div><div className="wbv7-h2">The open() Method</div><div className="wbv7-p">If document.write() is used on a closed document, document.open() is automatically called.</div><div className="wbv7-p">This will delete existing content.</div><button className="wbv7-pbtn" onClick=${run}>Try it</button></div>`;
    else page = html`<div className="wbv7-p" style=${{ color: 'var(--graphite)' }}>(the page is unchanged)</div>`;
    const c = OCAP[k][ran ? 1 : 0];
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="Output method" items=${Object.keys(OUT).map(x => [x, OUT[x].label])} sel=${k} on=${x => { setK(x); setRan(false); setBox(false); }} />
      <div className="wbv7-two"><${Code} lines=${O.code} on=${ran ? [O.run] : []} label="output example" />
        <div><${Arrow} /><${Win} url="page.html" over=${box && html`<${Alert} msg="success process" ok=${() => setBox(false)} />`}>${page}<//>
          ${k === 'cons' && html`<${Console} lines=${ran ? ['11'] : []} />`}</div></div>
    </div><${Cap} ...${c} showAr=${ar} />
    <div className="fig-bar"><span className="grow"></span><button className="fig-btn solid" onClick=${run} disabled=${ran && k !== 'alert'}>▶ Run</button><button className="fig-btn" onClick=${() => { setRan(false); setBox(false); }}>↻ Reset</button></div><//>`;
  }

  /* ── [8] slide 27: Example 5 traced ── */
  const EX5 = [{ js: 'function myFunction() {' }, { js: '  var x, text;' }, { js: '  x = document.getElementById("numb").value;' }, { js: '  if (isNaN(x) || x < 1 || x > 10) {' }, { js: '    text = "Input not valid";' }, { js: '  } else {' }, { js: '    text = "Input OK";' }, { js: '  }' }, { js: '  document.getElementById("demo").innerHTML = text;' }, { js: '}' }];
  function Ex5Trace({ x, ar }) {
    const c = check(x), q = JSON.stringify(x), n = String(Number(x));
    const rows = [{ on: [0, 1], e: 'myFunction()', w: 'Submit was clicked: onclick calls the function', en: 'Clicking <b>Submit</b> calls <code>myFunction()</code>; it declares x and text.', ar: 'الضغط على <b>Submit</b> بينادي الـ <bdi dir="ltr">myFunction()</bdi>، وهي بتعرّف الـ x والـ text.' },
      { on: [2], e: `x = ${q}`, w: 'value is always a string', en: `x is read from the box: <b>${esc(q)}</b>. The value of an input is always a <b>string</b>` + (x === '' ? '; a number box gives "" when it is empty or holds something that is not a number.' : '.'), ar: 'الـ x بيتقري من الخانة، والـ value بتاع أي input دايماً <b>string</b>' + (x === '' ? '، والـ number box بيدّي string فاضي لو الخانة فاضية أو فيها حاجة مش رقم' : '') + ':' + L(`x = ${q}`) }];
    for (const t of c.tr) {
      const e = t.k === 'nan' ? `isNaN(${q})  →  Number(${q}) is ${n}  →  ${t.r}` : t.k === 'lt' ? `${q} < 1  →  ${n} < 1  →  ${t.r}` : `${q} > 10  →  ${n} > 10  →  ${t.r}`;
      const w = t.k === 'nan' ? 'not a number?' : t.k === 'lt' ? 'less than one? (the string is coerced to a number)' : 'greater than 10?';
      const stop = t.r && t !== c.tr[2] ? ' It is <b>true</b>, so <code>||</code> stops here: the rest is not checked.' : '';
      rows.push({ on: [3], e, w, en: (t.k === 'nan' ? `isNaN turns ${esc(q)} into a number first: ${esc(n)}.` : `Comparing a string with a number turns the string into a number: ${esc(n)}.`) + ` The test is <b>${t.r}</b>.` + stop,
        ar: (t.k === 'nan' ? 'الـ isNaN بتحوّل القيمة لرقم الأول، وبعدين بتشوف:' : 'المقارنة بين string ورقم بتحوّل الـ string لرقم:') + L(e) + (stop ? 'النتيجة true، فالـ <bdi dir="ltr">||</bdi> بتقف هنا ومش بتكمل الباقي.' : '') });
    }
    const text = c.bad ? 'Input not valid' : 'Input OK';
    rows.push({ on: [c.bad ? 4 : 6], e: `text = "${text}"`, w: c.bad ? 'the condition is true' : 'every test is false: else', en: c.bad ? 'The whole condition is <b>true</b>: text = "Input not valid".' : 'All three tests are <b>false</b>, so the else branch runs: text = "Input OK".', ar: c.bad ? 'الشرط كله طلع <b>true</b>، فالـ text بقى:' + L('text = "Input not valid"') : 'التلات اختبارات طلعوا <b>false</b>، فالـ else هي اللي اتنفذت:' + L('text = "Input OK"') });
    rows.push({ on: [8], e: `#demo.innerHTML = "${text}"`, w: 'shown in the page', en: `innerHTML writes <b>${text}</b> into the paragraph with id="demo".`, ar: 'الـ innerHTML بيكتب <b>' + text + '</b> جوه الـ paragraph اللي الـ id بتاعه demo.' });
    const [i, ctl] = useSteps(rows.length, 2400);
    return html`<div className="fig-stage" style=${{ paddingTop: 0 }}><div className="wbv7-two">
        <${Code} lines=${EX5} on=${rows[i].on} label="Example 5 function" />
        <div><div className="wbv7-trace">${rows.slice(0, i + 1).map((r, j) => html`<div key=${j} className=${'wbv7-in2' + (j === i ? ' on' : '')}><small>${r.w}</small>${r.e}</div>`)}</div>
          <div className="wbv7-ret">#demo shows: <b>${i === rows.length - 1 ? text : ''}</b></div></div></div></div>
      <${Cap} en=${rows[i].en} ar=${rows[i].ar} showAr=${ar} /><${Bar} steps=${rows} i=${i} ctl=${ctl} />`;
  }
  function Example5({ ar }) {
    const [k, setK] = useState('15'), [v, setV] = useState('15'), [sub, setSub] = useState(['15', 0]);
    const pick = x => { setK(x); if (x !== 'own') { setV(x); setSub(s => [x, s[1] + 1]); } };
    return html`<${Fig}><div className="fig-stage">
      <${Chips} label="Input" items=${[['15', 'Example from the notes: 15'], ['5', '5'], ['0', '0'], ['', 'empty'], ['own', 'Try your own']]} sel=${k} on=${pick} />
      <${Win} url="example5.html"><div className="wbv7-p">Please input a number between 1 and 10:</div>
        <div className="wbv7-p"><input className="wbv7-pin" type="number" value=${v} disabled=${k !== 'own'} aria-label="numb" onInput=${e => setV(e.target.value)} /> <button className="wbv7-pbtn" onClick=${() => setSub(s => [v, s[1] + 1])}>Submit</button></div><//>
    </div><${Ex5Trace} key=${'s' + sub[1]} x=${sub[0]} ar=${ar} /><//>`;
  }

  /* ── [9.0], [9.1] Lab 8: the DOM tree and the access methods ── */
  const DOM = [{ t: 'html', d: 0 }, { t: 'head', d: 1 }, { t: 'title', d: 2, x: 'DOM' }, { t: 'body', d: 1 }, { t: 'h1', d: 2, x: 'The Element Object' }, { t: 'p', d: 2, id: 'myP', c: 'c', x: 'I am a paragraph.' }, { t: 'p', d: 2, c: 'c', x: 'The content of "myP" is:' }, { t: 'p', d: 2, id: 'demo' }];
  DOM.forEach((n, j) => { for (let p = j - 1; p >= 0; p--) if (DOM[p].d === n.d - 1) { n.up = p; break; } });
  function cmatch(n, comp) { // one compound selector: tag, #id, .class, combined
    const m = comp.match(/^([a-z][a-z0-9]*|\*)?((?:[#.][\w-]+)*)$/i); if (!m || !comp) return null;
    if (m[1] && m[1] !== '*' && m[1].toLowerCase() !== n.t) return false;
    for (const part of m[2].match(/[#.][\w-]+/g) || []) { if (part[0] === '#' ? n.id !== part.slice(1) : !(n.c || '').split(' ').includes(part.slice(1))) return false; }
    return true;
  }
  function smatch(j, sel) { // descendant selectors like "body p.c"
    const comps = sel.trim().split(/\s+/); if (comps.some(c => cmatch(DOM[0], c) === null)) return null;
    let r = cmatch(DOM[j], comps[comps.length - 1]); if (!r) return false;
    let k = comps.length - 2, p = DOM[j].up;
    while (k >= 0 && p != null) { if (cmatch(DOM[p], comps[k])) k--; p = DOM[p].up; }
    return k < 0;
  }
  const METH = { id: 'getElementById', cls: 'getElementsByClassName', tag: 'getElementsByTagName', qs: 'querySelector' };
  function domFind(m, arg) {
    const a = arg.trim(), all = DOM.map((_, j) => j);
    if (m === 'id') { const j = all.find(j => DOM[j].id === a); return { hits: j == null ? [] : [j], one: true }; }
    if (m === 'cls') { const cs = a.split(/\s+/).filter(Boolean); return { hits: cs.length ? all.filter(j => cs.every(c => (DOM[j].c || '').split(' ').includes(c))) : [] }; }
    if (m === 'tag') return { hits: all.filter(j => a === '*' || DOM[j].t === a.toLowerCase()) };
    if (!a) return { bad: true };
    const r = all.map(j => smatch(j, a)); if (r.some(x => x === null)) return { bad: true };
    const j = all.find(j => r[j]); return { hits: j == null ? [] : [j], one: true, firstOf: r.filter(Boolean).length };
  }
  function Dom({ ar }) {
    const EXS = { a: ['id', 'demo'], b: ['cls', 'c'], c: ['tag', 'p'], d: ['qs', 'p.c'] };
    const [k, setK] = useState('a'), [om, setOm] = useState('qs'), [oa, setOa] = useState('body p');
    const [m, arg] = k === 'own' ? [om, oa] : EXS[k], f = domFind(m, arg);
    let en, a;
    if (f.bad) { en = 'Type a CSS selector made of tag names, #id and .class (spaces for “inside”).'; a = 'اكتب CSS selector من أسامي tags و #id و .class (والمسافة معناها "جوه").'; }
    else if (f.one) { const n = f.hits.length;
      en = n ? `<b>${METH[m]}</b> returns <b>one element</b>, the highlighted ${DOM[f.hits[0]].t}` + (m === 'qs' && f.firstOf > 1 ? `: ${f.firstOf} elements match, querySelector gives only the <b>first</b>.` : '.') : `<b>${METH[m]}</b> finds nothing, so it returns <b>null</b>.`;
      a = n ? 'الـ ' + T(METH[m]) + ' بيرجع <b>element واحد</b>، اللي متعلّم عليه' + (m === 'qs' && f.firstOf > 1 ? '. فيه أكتر من element بيطابق، والـ querySelector بيدّيك <b>أولهم</b> بس.' : '.') : 'الـ ' + T(METH[m]) + ' مش لاقي حاجة، فبيرجع <b>null</b>.'; }
    else { en = `<b>${METH[m]}</b> returns a collection (HTMLCollection) of <b>${f.hits.length}</b> element${f.hits.length === 1 ? '' : 's'}, in page order.`; a = 'الـ ' + T(METH[m]) + ' بيرجع collection (HTMLCollection) فيها كل الـ elements اللي بتطابق بترتيب الصفحة، وعددهم ' + T(String(f.hits.length)) + '.'; }
    const sig = `document.${METH[m]}("${arg}")`;
    return html`<${Fig}><div className="fig-stage">
      <${Chips} mono=${true} label="Access method" items=${[['a', 'getElementById("demo")'], ['b', 'getElementsByClassName("c")'], ['c', 'getElementsByTagName("p")'], ['d', 'querySelector("p.c")'], ['own', 'Try your own']]} sel=${k} on=${setK} />
      ${k === 'own' && html`<div className="wbv7-own"><${Chips} mono=${true} label="Method" items=${Object.keys(METH).map(x => [x, METH[x]])} sel=${om} on=${setOm} />
        <small>argument</small><input className="wbv7-in" value=${oa} maxLength="40" spellCheck="false" autoCapitalize="off" aria-label="argument" onInput=${e => setOa(e.target.value)} /></div>`}
      <div className="wbv7-sel"><code style=${{ overflowWrap: 'anywhere' }}>${sig}</code></div>
      <div className="wbv7-tree" aria-label="DOM tree">${DOM.map((n, j) => { const h = !f.bad && f.hits.includes(j); return html`<div key=${j} className=${'wbv7-node' + (h ? ' hit' : '')} style=${{ marginLeft: n.d * 16 + 'px' }}>
        <code>${'<' + n.t + (n.id ? ` id="${n.id}"` : '') + (n.c ? ` class="${n.c}"` : '') + '>'}</code>${n.x ? html`<span>${n.x}</span>` : ''}${h && !f.one ? html`<em>[${f.hits.indexOf(j)}]</em>` : ''}</div>`; })}</div>
    </div><${Cap} en=${'In the DOM every HTML element is an object in a tree. ' + en} ar=${'في الـ DOM كل HTML element عبارة عن object في شجرة. ' + a} showAr=${ar} /><//>`;
  }

  /* ── [9.2] addEventListener ── */
  function Listen({ ar }) {
    const [att, setAtt] = useState({ click: false, mouseover: false }), [log, setLog] = useState([]), [last, setLast] = useState(null);
    const fire = ev => { setLast(ev); if (att[ev]) setLog(l => l.concat(ev === 'click' ? 'Hello' : 'mouse over the button').slice(-4)); };
    const lines = [{ js: 'var btn = document.getElementById("myBtn");' }, { js: 'function sayHello() { console.log("Hello"); }' }, { js: 'function hover() { console.log("mouse over the button"); }' }, { js: 'btn.addEventListener("click", sayHello, false);' }, { js: 'btn.addEventListener("mouseover", hover, false);' }];
    const cls = { 3: att.click ? '' : 'dim', 4: att.mouseover ? '' : 'dim' };
    let en, a;
    if (last && !att[last]) { en = `The button got a <b>${last}</b> event, but no function listens for it yet, so nothing happens.`; a = 'الـ button جاله event من نوع ' + T(last) + '، بس لسه مفيش function مستنياه، فمحصلش حاجة.'; }
    else if (last) { en = `The <b>${last}</b> event reached the button and its listener ran: see the console.`; a = 'الـ event اللي هو ' + T(last) + ' وصل للـ button والـ listener بتاعه اشتغل، بص على الـ console.'; }
    else { en = '<code>element.addEventListener(event, function, useCapture)</code> attaches a function to an event of an element. Attach a listener, then click or hover over the button.'; a = 'الـ addEventListener بتربط function بـ event معين على element، وشكلها كده:' + L('element.addEventListener(event, function, useCapture)') + 'اربط listener، وبعدين دوس أو عدّي بالـ mouse على الـ button.'; }
    return html`<${Fig}><div className="fig-stage">
      <div className="wbv7-chips"><button className="fig-btn" aria-pressed=${String(att.click)} onClick=${() => setAtt(s => ({ ...s, click: true }))}>Attach "click"</button><button className="fig-btn" aria-pressed=${String(att.mouseover)} onClick=${() => setAtt(s => ({ ...s, mouseover: true }))}>Attach "mouseover"</button></div>
      <div className="wbv7-two"><${Code} lines=${lines} cls=${cls} on=${last && att[last] ? [last === 'click' ? 1 : 2] : []} label="addEventListener example" />
        <div><${Win} url="page.html"><div className="wbv7-p"><button className="wbv7-pbtn" onClick=${() => fire('click')} onMouseEnter=${() => fire('mouseover')}>myBtn</button></div><//><${Console} lines=${log} /></div></div>
      <p className="wbv7-ret">useCapture is optional; false (the default) is used here.</p>
    </div><${Cap} en=${en} ar=${a} showAr=${ar} />
    <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { setAtt({ click: false, mouseover: false }); setLog([]); setLast(null); }}>↻ Reset</button></div><//>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'wb-js1-layers': Layers, 'wb-js1-history': History, 'wb-js1-trip': RoundTrip, 'wb-js1-first': FirstExample, 'wb-js1-headbody': HeadBody,
    'wb-js1-places': Places, 'wb-js1-noscript': NoScript, 'wb-js1-loose': Loose, 'wb-js1-scope': Scope, 'wb-js1-names': Names,
    'wb-js1-typeof': Typeof, 'wb-js1-plus': Plus, 'wb-js1-comments': Comments, 'wb-js1-output': Output, 'wb-js1-ex5': Example5, 'wb-js1-dom': Dom, 'wb-js1-listen': Listen
  });
})();

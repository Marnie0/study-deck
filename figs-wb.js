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

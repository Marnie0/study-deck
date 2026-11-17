// Head First chapter for Software Quality Assurance Lecture 4 (built on hf.js), English + Egyptian Arabic, same pages in both.
// The V-model (verification down, validation up), foo() and its control flow graph, cyclomatic complexity three ways
// (E − N + 2P, predicate nodes + 1, regions), basis paths and their test cases, the triangle problem (functional test cases,
// the slide's bad-inputs slip, statement and branch coverage, minimal sets, its control flow graph), the area-of-a-triangle
// functional tests, and OOP testing (MM and function pair testing, the stack's 14 pairs).
// Every number was worked by hand twice and checked with node: foo E = 7, N = 6, V(G) = 3, 2 predicates, 2 inner + 1 outer
// regions; foo paths (2,0,0) 1-2-3-4-6, (2,1,0) 1-3-4-6, (0,0,0) 1-3-5-6, (3,0,9) 1-2-3-4-6, (3,0,2) 1-2-3-5-6, (4,1,3) 1-3-4-6.
// Triangle graph (the notes' figure; the counts are ours, the slides give none): 9 nodes, 12 edges, 4 decisions, 4 inner + 1
// outer regions, V(G) = 5; feasible independent paths from the notes' own inputs (3,4,5) (3,5,3) (4,4,4) (1,2,4) (−1,2,4).
// Triangle coverage columns: (3,4,5) none of D F H J, (3,5,3) D, (0,1,0) D H J, (4,4,4) D F. Areas 8, collinear, 50, 50, 12.
(function () {
  const H = window.HF; H.chapters.qa = H.chapters.qa || {};
  const { html } = H.K; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T4 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-qa4')) {
    const s = document.createElement('style'); s.id = 'hf-css-qa4';
    s.textContent = `
.hfb .hf-qa4-g{ display:block; color:var(--ink); font-family:var(--body); }
.hfb .hf-qa4-g text{ fill:currentColor; }
.hfb .hf-qa4-g .nd{ cursor:default; }
.hfb .hf-qa4-g .nd.can{ cursor:pointer; }
.hfb .hf-qa4-g .nd.can:focus-visible{ outline:none; }
.hfb .hf-qa4-g .nd.can:focus-visible ellipse{ stroke-width:3.4; }
.hfb .hf-qa4-g .on text{ fill:var(--paper); }
.hfb .hf-qa4-g .rg{ font:700 16px var(--body); fill:var(--hf-hand); }
.hfb .hf-qa4-box{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:6px; background:var(--paper); }
.hfb .hf-qa4-tabs{ display:flex; gap:4px; flex-wrap:wrap; }
.hfb .hf-qa4-tabs button{ flex:1 1 0; min-width:0; font:700 13px/1 var(--mono); letter-spacing:-.05em; min-height:30px; padding:0; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; white-space:nowrap; }
.hfb .hf-qa4-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-qa4-tabs button.done::after{ content:" ✓"; }
.hfb .hf-qa4-tabs.w button{ font-family:var(--body); font-size:13.5px; }
.hfb .hf-qa4-row{ display:flex; gap:8px; align-items:center; }
.hfb .hf-qa4-cd{ font:600 13px/1.5 var(--mono); margin:0; color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:4px 7px; white-space:pre; flex:1 1 auto; min-width:0; overflow:hidden; }
.hfb .hf-qa4-cd b{ color:var(--hf-k); }
.hfb .hf-qa4-ask{ font:700 14px/1.3 var(--body); margin:0; color:var(--ink); }
.hfb .hf-qa4-ask code{ font:800 14px var(--mono); color:var(--hf-k); background:none; }
.hfb .hf-qa4-path{ font:700 14px/1.3 var(--mono); margin:0; padding:5px 8px; border:1.5px dashed var(--faint); border-radius:6px; color:var(--ink); min-height:30px; }
.hfb .hf-qa4-path.ok{ border:1.5px solid var(--ok); background:color-mix(in srgb, var(--ok) 10%, var(--paper)); }
.hfb .hf-qa4-path.no{ border:1.5px solid var(--hf-red); }
.hfb .hf-qa4-sol{ font:600 13px/1.42 var(--mono); color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; margin:0; }
.hfb .hf-qa4-sol b{ color:var(--hf-k); }
.hfb .hf-qa4-why{ font:500 13.5px/1.35 var(--body); margin:0; padding-left:8px; border-left:3px solid var(--hf-k); color:var(--ink); }
.hfb .hf-qa4-legend{ font:600 13px/1.3 var(--body); color:var(--graphite); margin:0; text-align:center; }
.hfb .hf-qa4-fields{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:6px; }
.hfb .hf-qa4-fields.two{ grid-template-columns:repeat(2, minmax(0, 1fr)); }
.hfb .hf-qa4-fields label{ display:grid; gap:3px; font:700 13px/1.1 var(--body); color:var(--graphite); }
.hfb .hf-qa4-in{ width:100%; box-sizing:border-box; height:34px; font:700 16px/1 var(--mono); text-align:center; border:1.5px solid var(--faint); border-radius:6px; background:var(--paper); color:var(--ink); }
.hfb .hf-qa4-in.ok{ border-color:var(--ok); box-shadow:0 0 0 1.5px var(--ok); } .hfb .hf-qa4-in.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
.hfb .hf-qa4-tbl{ border-collapse:collapse; width:100%; font:500 13px/1.25 var(--body); color:var(--ink); }
.hfb .hf-qa4-tbl th, .hfb .hf-qa4-tbl td{ border:1px solid var(--hf-line); padding:4px 5px; text-align:left; vertical-align:middle; }
.hfb .hf-qa4-tbl th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-qa4-tbl td.m, .hfb .hf-qa4-tbl th.m{ font:700 13px/1.2 var(--mono); }
.hfb .hf-qa4-tbl td.c, .hfb .hf-qa4-tbl th.c{ text-align:center; }
.hfb .hf-qa4-tbl td.k{ font-weight:800; color:var(--hf-k); }
.hfb .hf-qa4-tbl tr.bad td{ background:color-mix(in srgb, var(--hf-red) 9%, var(--paper)); }
.hfb .hf-qa4-cov{ table-layout:fixed; }
.hfb .hf-qa4-tbl td.hide{ color:var(--graphite); font-family:"Caveat", cursive; font-size:19px; text-align:center; }
.hfb .hf-qa4-cell{ width:100%; height:30px; border-radius:5px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); font:800 18px/1 var(--mono); cursor:pointer; padding:0; }
.hfb .hf-qa4-cell[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-grey2); }
.hfb .hf-qa4-cell.ok{ border-color:var(--ok); box-shadow:0 0 0 1.5px var(--ok); }
.hfb .hf-qa4-cell.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
.hfb .hf-qa4-eq{ font:800 15px/1.35 var(--mono); text-align:center; margin:0; padding:7px 8px; border:2px solid var(--hf-k); border-radius:8px; color:var(--ink); }
.hfb .hf-qa4-fp{ display:grid; grid-template-columns:1fr; gap:1px; margin:0; padding:0; list-style:none; }
.hfb .hf-qa4-fp li{ font:500 13px/1.3 var(--mono); padding:2px 6px; border-bottom:1px dotted var(--faint); }
.hfb .hf-qa4-fp li.err{ color:var(--hf-red); font-weight:700; }
.hfb .hf-qa4-fp li b{ display:inline-block; min-width:22px; color:var(--hf-k); }
.hfb .hf-qa4-st{ display:grid; grid-template-columns:auto 1fr; gap:3px 8px; font:500 13.5px/1.3 var(--body); }
.hfb .hf-qa4-st b{ font:800 13.5px var(--mono); color:var(--hf-k); }
.hf-ar .hf-qa4-fields label, .hf-ar .hf-qa4-why, .hf-ar .hf-qa4-ask, .hf-ar .hf-qa4-tabs.w button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-qa4-why{ padding-left:0; padding-right:8px; border-left:0; border-right:3px solid var(--hf-k); line-height:1.55; }
.hf-ar .hf-qa4-tbl{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-qa4-tbl th, .hf-ar .hf-qa4-tbl td{ text-align:right; }
.hf-ar .hf-qa4-tbl td.c, .hf-ar .hf-qa4-tbl th.c{ text-align:center; }
.hf-ar .hf-qa4-tbl td.m{ direction:ltr; text-align:left; }
.hf-ar .hf-qa4-sol, .hf-ar .hf-qa4-path, .hf-ar .hf-qa4-cd, .hf-ar .hf-qa4-fp, .hf-ar .hf-qa4-eq, .hf-ar .hf-qa4-legend{ direction:ltr; text-align:left; }
.hf-ar .hf-qa4-eq, .hf-ar .hf-qa4-legend{ text-align:center; }
.hf-ar .hf-qa4-cd{ border-left:3px solid var(--hf-k); }
`;
    document.head.appendChild(s);
  }

  /* ── the two control flow graphs from the notes, drawn small so you can tap through them ── */
  // nodes: id → [x, y, label, rx, ry]; edges: [from, to, kind] with t = true branch, f = false branch, s = sequential
  const FOO = {
    vb: [150, 184], start: '1', end: '6',
    nodes: { 1: [62, 20, '1', 14, 14], 2: [124, 56, '2', 14, 14], 3: [62, 92, '3', 14, 14], 5: [28, 132, '5', 14, 14], 4: [96, 132, '4', 14, 14], 6: [62, 166, '6', 14, 14] },
    edges: [['1', '2', 't'], ['1', '3', 'f'], ['2', '3', 's'], ['3', '4', 't'], ['3', '5', 'f'], ['4', '6', 's'], ['5', '6', 's']]
  };
  const TRI = {
    vb: [336, 108], start: 'a', end: 'i',
    nodes: { a: [20, 22, 'a', 14, 14], c: [96, 22, 'c', 14, 14], e: [172, 22, 'e', 14, 14], g: [248, 22, 'g', 14, 14], i: [316, 22, 'i', 14, 14],
      iso: [58, 86, 'iso', 26, 14], equi: [134, 86, 'equi', 28, 14], not: [210, 86, 'not', 26, 14], bad: [284, 86, 'bad', 26, 14] },
    edges: [['a', 'c', 'f'], ['c', 'e', 'f'], ['e', 'g', 'f'], ['g', 'i', 'f'], ['a', 'iso', 't'], ['iso', 'c', 's'], ['c', 'equi', 't'], ['equi', 'e', 's'], ['e', 'not', 't'], ['not', 'g', 's'], ['g', 'bad', 't'], ['bad', 'i', 's']]
  };
  let gid = 0;
  function Graph({ g, path, cand, onTap, width, regions }) {
    const [mid] = React.useState(() => 'hf-qa4-m' + (++gid));
    const P = g.nodes, hot = new Set();
    (path || []).forEach((n, i) => { if (i) hot.add(path[i - 1] + '>' + n); });
    const on = new Set(path || []);
    const rad = (n, ux, uy) => { const [, , , rx, ry] = P[n]; return rx * ry / Math.sqrt((ry * ux) ** 2 + (rx * uy) ** 2); };
    const edge = ([a, b, k]) => {
      const [x1, y1] = P[a], [x2, y2] = P[b], L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
      const r1 = rad(a, ux, uy), r2 = rad(b, ux, uy) + 3, h = hot.has(a + '>' + b);
      return html`<path key=${a + b} d=${`M${(x1 + ux * r1).toFixed(1)} ${(y1 + uy * r1).toFixed(1)} L${(x2 - ux * r2).toFixed(1)} ${(y2 - uy * r2).toFixed(1)}`}
        stroke=${h ? 'var(--hf-k)' : 'var(--hf-line)'} strokeWidth=${h ? 3.4 : k === 't' ? 2.2 : 1.5} strokeDasharray=${k === 'f' && !h ? '3 3' : null} fill="none" markerEnd=${`url(#${mid}${h ? 'k' : ''})`} />`;
    };
    const node = n => {
      const [x, y, l, rx, ry] = P[n], isOn = on.has(n), can = cand && cand.has(n);
      const act = can && onTap ? () => onTap(n) : null;
      return html`<g key=${n} className=${'nd' + (isOn ? ' on' : '') + (can ? ' can' : '')} role=${act ? 'button' : null} tabIndex=${act ? 0 : null} aria-label=${act ? 'Go to node ' + l : null}
        onClick=${act} onKeyDown=${act ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } } : null}>
        <ellipse cx=${x} cy=${y} rx=${rx} ry=${ry} fill=${isOn ? 'var(--hf-k)' : 'var(--paper)'} stroke=${can ? 'var(--hf-hand)' : 'var(--hf-line)'} strokeWidth=${can ? 2.6 : 1.8} strokeDasharray=${can ? '4 2.5' : null} />
        <text x=${x} y=${y + 4.8} textAnchor="middle" fontSize=${l.length > 1 ? 15 : 16} fontWeight="700">${l}</text></g>`;
    };
    return html`<svg className="hf-qa4-g" viewBox=${'0 0 ' + g.vb[0] + ' ' + g.vb[1]} width=${width} style=${{ maxWidth: '100%', flex: 'none' }} role="img" aria-label="Control flow graph">
      <defs>${[['', 'var(--hf-line)'], ['k', 'var(--hf-k)']].map(([s, c]) => html`<marker key=${s} id=${mid + s} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill=${c} /></marker>`)}</defs>
      ${g.edges.map(edge)}${Object.keys(P).map(node)}
      ${regions && regions.map(([x, y, t], i) => html`<text key=${'r' + i} className="rg" x=${x} y=${y} textAnchor="middle">${t}</text>`)}
    </svg>`;
  }

  // Be the program counter: tap the nodes in the order a test input runs them
  const FOO_CODE = ['<b>1</b> if (a>1 && b==0)', '<b>2</b>    x = x/a', '<b>3</b> if (a==2 || x>1)', '<b>4</b>    x = x+1', '<b>5</b> else x = x*a', '<b>6</b> return (a+x)'];
  const TRI_CODE = ['<b>a</b> if (a==b or a==c or b==c)  → iso', '<b>c</b> if (a==b and a==c)  → equi', '<b>e</b> if (a>=b+c or b>=a+c', '         or c>=a+b)  → not', '<b>g</b> if (a<=0 or b<=0 or c<=0) → bad', '<b>i</b> print type'];
  const FOO_T = [
    { in: '2,0,0', p: ['1', '2', '3', '4', '6'], en: 'a>1 && b==0 is true → node 2 (x = 0/2 = 0). Then a==2 is true → node 4. Basis path 1.', ar: 'الشرط <bdi dir="ltr">a>1 && b==0</bdi> بيبقى true فبنروح لـ node 2، وبعدين <bdi dir="ltr">a==2</bdi> بيبقى true فبنروح لـ node 4. ده الـ basis path الأول.' },
    { in: '2,1,0', p: ['1', '3', '4', '6'], en: 'b==0 is false → skip node 2. a==2 is true → node 4. Basis path 2.', ar: 'الشرط <bdi dir="ltr">b==0</bdi> بيبقى false فبنتنط node 2، و <bdi dir="ltr">a==2</bdi> بيبقى true فبنروح لـ node 4. ده الـ basis path التاني.' },
    { in: '0,0,0', p: ['1', '3', '5', '6'], en: 'a>1 is false → skip 2. a==2 is false and x>1 is false → the else, node 5. Basis path 3.', ar: 'الشرط <bdi dir="ltr">a>1</bdi> بيبقى false فبنتنط 2، و <bdi dir="ltr">a==2</bdi> و <bdi dir="ltr">x>1</bdi> الاتنين false فبنروح للـ else، يعني node 5. ده الـ basis path التالت.' },
    { in: '3,0,9', p: ['1', '2', '3', '4', '6'], en: 'First IF true → x = 9/3 = 3. a is not 2, but x>1 is true → node 4.', ar: 'أول IF بيبقى true فالـ x بتبقى <bdi dir="ltr">9/3 = 3</bdi>. والـ a مش 2، بس <bdi dir="ltr">x>1</bdi> بيبقى true فبنروح لـ node 4.' },
    { in: '3,0,2', p: ['1', '2', '3', '5', '6'], en: 'First IF true → x = 2/3 ≈ 0.67. a is not 2 and x is not > 1 → node 5. A fourth path, not one of the slide\'s three.', ar: 'أول IF بيبقى true فالـ x بتبقى <bdi dir="ltr">2/3 ≈ 0.67</bdi>. والـ a مش 2 والـ x مش أكبر من 1 فبنروح لـ node 5. ده path رابع، مش من التلاتة اللي في الـ slide.' },
    { in: '4,1,3', p: ['1', '3', '4', '6'], en: 'b==0 is false → skip 2. a==2 is false, but x = 3 > 1 → node 4.', ar: 'الشرط <bdi dir="ltr">b==0</bdi> بيبقى false فبنتنط 2. والـ <bdi dir="ltr">a==2</bdi> بيبقى false، بس <bdi dir="ltr">x = 3 > 1</bdi> فبنروح لـ node 4.' }
  ];
  const TRI_T = [
    { in: '3,4,5', p: ['a', 'c', 'e', 'g', 'i'], en: 'No sides equal, a valid triangle, all positive: every IF is false. Prints scalene.', ar: 'مفيش أضلاع متساوية، ومثلث valid، وكله موجب: كل IF بيبقى false. بيطبع scalene.' },
    { in: '3,5,3', p: ['a', 'iso', 'c', 'e', 'g', 'i'], en: 'a==c → isosceles. Not all equal, 5 < 3+3, all positive. Prints isosceles.', ar: 'عشان <bdi dir="ltr">a==c</bdi> بيروح لـ isosceles. ومش كلهم متساويين، و <bdi dir="ltr">5 < 3+3</bdi>، وكله موجب. بيطبع isosceles.' },
    { in: '4,4,4', p: ['a', 'iso', 'c', 'equi', 'e', 'g', 'i'], en: 'All equal → isosceles, then equilateral. Valid and positive. Prints equilateral.', ar: 'كلهم متساويين فبيروح لـ isosceles وبعدين equilateral. وvalid وموجب. بيطبع equilateral.' },
    { in: '1,2,4', p: ['a', 'c', 'e', 'not', 'g', 'i'], en: 'No sides equal; 4 ≥ 1+2 → not a triangle; no side ≤ 0. Prints not a triangle (the slide wrongly lists it as bad inputs).', ar: 'مفيش أضلاع متساوية؛ و <bdi dir="ltr">4 ≥ 1+2</bdi> فبيروح لـ not a triangle؛ ومفيش ضلع <bdi dir="ltr">≤ 0</bdi>. بيطبع not a triangle (والـ slide حطاه غلط في الـ bad inputs).' },
    { in: '−1,2,4', p: ['a', 'c', 'e', 'not', 'g', 'bad', 'i'], en: 'No sides equal; 4 ≥ −1+2 → not a triangle; a ≤ 0 → bad inputs. Prints bad inputs.', ar: 'مفيش أضلاع متساوية؛ و <bdi dir="ltr">4 ≥ −1+2</bdi> فبيروح لـ not a triangle؛ و <bdi dir="ltr">a ≤ 0</bdi> فبيروح لـ bad inputs. بيطبع bad inputs.' },
    { in: '0,1,0', p: ['a', 'iso', 'c', 'e', 'not', 'g', 'bad', 'i'], en: 'a==c → isosceles; not all equal; 1 ≥ 0+0 → not a triangle; a ≤ 0 → bad inputs. Prints bad inputs.', ar: 'عشان <bdi dir="ltr">a==c</bdi> بيروح لـ isosceles؛ ومش كلهم متساويين؛ و <bdi dir="ltr">1 ≥ 0+0</bdi> فبيروح لـ not a triangle؛ و <bdi dir="ltr">a ≤ 0</bdi> فبيروح لـ bad inputs.' }
  ];
  function Tracer({ id, g, tasks, code, width, side }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id, 0);
    const [p, setP] = H.K.useSlot(id + ':p' + k, [g.start]);
    const [c, setC] = H.K.useSlot(id + ':c' + k, false);
    const tk = tasks[k], last = p[p.length - 1], end = last === g.end;
    const cand = new Set(end ? [] : g.edges.filter(e => e[0] === last).map(e => e[1]));
    const ok = p.join(',') === tk.p.join(',');
    const label = n => g.nodes[n][2];
    const tap = n => { setP(p.concat(n)); setC(false); };
    const graph = html`<${Graph} g=${g} path=${p} cand=${cand} onTap=${tap} width=${width} />`;
    const cd = html`<pre className="hf-qa4-cd">${code.map((l, j) => html`<div key=${j}>${T4(l)}</div>`)}</pre>`;
    return html`<div className="hf-qa4-box hf-in">
      <div className="hf-qa4-tabs" dir="ltr" role="group" aria-label="Test inputs">${tasks.map((x, j) => html`<button key=${j} aria-pressed=${String(j === k)} onClick=${() => setK(j)}>${x.in}</button>`)}</div>
      <p className="hf-qa4-ask">${ar ? html`دوس على الـ nodes بالترتيب للـ input <code dir="ltr">(${tk.in})</code>` : html`Input <code>(${tk.in})</code>: tap the nodes in the order they run`}</p>
      ${side ? html`<div className="hf-qa4-row" dir="ltr">${graph}${cd}</div>` : html`<div dir="ltr" style=${{ display: 'grid', gap: '6px' }}>${graph}${cd}</div>`}
      <p className=${'hf-qa4-path' + (c ? (ok ? ' ok' : ' no') : '')} dir="ltr">${p.map(label).join(' → ')}${end ? '' : ' → …'}</p>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setC(true)} disabled=${!end}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setP(tk.p.slice()); setC(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        <button className="hf-btn" onClick=${() => { if (p.length > 1) { setP(p.slice(0, -1)); setC(false); } }} disabled=${p.length < 2}>${ar ? 'رجّع خطوة' : 'Undo'}</button>
      </div>
      ${c && (ok ? html`<p className="hf-qa4-why hf-in">${T4(ar ? tk.ar : tk.en)}</p>` : html`<p className="hf-hand red">${ar ? 'مش ده الـ path. جرّب كل IF بالقيم دي تاني.' : 'Not this path. Try each IF with these values again.'}</p>`)}
    </div>`;
  }

  // Be the complexity counter: count E, N, decisions and regions, then V(G)
  const CNT = {
    foo: { E: 7, N: 6, D: 2, R: 3, V: 3, sol: ['7 − 6 + 2(1) = <b>3</b>', 'decisions (1, 3): 2 + 1 = <b>3</b>', 'regions: 2 inner + 1 outer = <b>3</b>'] },
    tri: { E: 12, N: 9, D: 4, R: 5, V: 5, sol: ['E = 4 + 4 out + 4 back = 12; N = 5 + 4 = 9', '12 − 9 + 2(1) = <b>5</b>', 'decisions (a, c, e, g): 4 + 1 = <b>5</b>', 'regions: 4 inner + 1 outer = <b>5</b>'] }
  };
  function Counter() {
    const ar = useAr();
    const [w, setW] = H.K.useSlot('cnt', 'foo');
    const [a, setA] = H.K.useSlot('cnt:a' + w, {});
    const [c, setC] = H.K.useSlot('cnt:c' + w, false);
    const S = CNT[w];
    const num = v => v != null && /^\s*\d+\s*$/.test(String(v)) ? +String(v).trim() : NaN;
    const keys = ['E', 'N', 'D', 'R', 'V'];
    const right = keys.filter(x => num(a[x]) === S[x]).length;
    const set = (x, v) => { setA(Object.assign({}, a, { [x]: v })); if (c) setC(false); };
    const lab = { E: ar ? 'الـ edges' : 'Edges E', N: ar ? 'الـ nodes' : 'Nodes N', D: ar ? 'الـ decisions' : 'Decisions', R: ar ? 'الـ regions' : 'Regions', V: ar ? 'الـ V(G)' : 'V(G)' };
    const inp = x => html`<label key=${x}><span>${lab[x]}</span><input className=${'hf-qa4-in' + (c ? (num(a[x]) === S[x] ? ' ok' : ' no') : '')} type="text" inputMode="numeric" autoComplete="off" spellCheck="false" maxLength="2" aria-label=${lab[x]} value=${a[x] == null ? '' : a[x]} onChange=${e => set(x, e.target.value)} /></label>`;
    return html`<div className="hf-qa4-box hf-in">
      <div className="hf-qa4-tabs w" role="group" aria-label="Graph">${[['foo', ar ? html`الـ <bdi dir="ltr">foo()</bdi>` : 'foo()'], ['tri', ar ? 'المثلث' : 'Triangle']].map(([x, l]) => html`<button key=${x} aria-pressed=${String(w === x)} onClick=${() => setW(x)}>${l}</button>`)}</div>
      ${w === 'foo' ? html`<div className="hf-qa4-row" style=${{ alignItems: 'center' }}><div dir="ltr" style=${{ flex: 'none', width: '124px' }}><${Graph} g=${FOO} width=${124} /></div><div className="hf-qa4-fields two" style=${{ flex: '1 1 auto' }}>${keys.map(inp)}</div></div>`
        : html`<div dir="ltr" style=${{ display: 'flex', justifyContent: 'center' }}><${Graph} g=${TRI} width=${300} /></div>
      <p className="hf-qa4-legend" dir="ltr">iso = isosceles · equi = equilateral · not = not a triangle · bad = bad inputs</p>
      <div className="hf-qa4-fields">${keys.map(inp)}</div>`}
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setC(true)} disabled=${!Object.keys(a).length}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const n = {}; keys.forEach(x => { n[x] = String(S[x]); }); setA(n); setC(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${c && html`<span className="hf-score">${ar ? html`<bdi>${right} / 5</bdi> صح` : right + ' / 5 right'}</span>`}
      </div>
      ${c && html`<div className="hf-qa4-sol hf-in" dir="ltr">${S.sol.map((l, j) => html`<div key=${j}>${T4(l)}</div>`)}</div>`}
    </div>`;
  }

  // Be the coverage table: which of the type-setting lines D, F, H, J does each test run?
  const COV_COLS = ['3,4,5', '3,5,3', '0,1,0', '4,4,4'];
  const COV_ROWS = [['D', 'type = isosceles', [0, 1, 1, 1]], ['F', 'type = equilateral', [0, 0, 0, 1]], ['H', 'type = not a triangle', [0, 0, 1, 0]], ['J', 'type = bad inputs', [0, 0, 1, 0]]];
  function CovFill() {
    const ar = useAr();
    const [m, setM] = H.K.useSlot('cov', {});
    const [c, setC] = H.K.useSlot('cov:c', false);
    let right = 0; COV_ROWS.forEach(([n, , ans]) => ans.forEach((v, j) => { if (!!m[n + j] === !!v) right++; }));
    return html`<div className="hf-in">
      <table className="hf-qa4-tbl hf-qa4-cov" dir="ltr"><colgroup><col style=${{ width: '34px' }} /><col />${COV_COLS.map(x => html`<col key=${x} style=${{ width: '47px' }} />`)}</colgroup>
        <thead><tr><th className="c">Node</th><th>Source line</th>${COV_COLS.map(x => html`<th key=${x} className="m c" style=${{ padding: '4px 1px' }}>${x}</th>`)}</tr></thead>
        <tbody>${COV_ROWS.map(([n, src, ans]) => html`<tr key=${n}><td className="k c">${n}</td><td>${src}</td>${ans.map((v, j) => {
          const on = !!m[n + j], st = c ? (on === !!v ? ' ok' : ' no') : '';
          return html`<td key=${j} className="c" style=${{ padding: '3px' }}><button className=${'hf-qa4-cell' + st} aria-pressed=${String(on)} aria-label=${'Node ' + n + ' runs for ' + COV_COLS[j]} onClick=${() => { setM(Object.assign({}, m, { [n + j]: !on })); setC(false); }}>${on ? '*' : ''}</button></td>`;
        })}</tr>`)}</tbody></table>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" onClick=${() => setC(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const n = {}; COV_ROWS.forEach(([r, , ans]) => ans.forEach((v, j) => { if (v) n[r + j] = true; })); setM(n); setC(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${c && html`<span className="hf-score">${ar ? html`<bdi>${right} / 16</bdi> صح` : right + ' / 16 right'}</span>`}
      </div></div>`;
  }

  // the area-of-a-triangle functional tests (notes' table), expected outputs hidden until you ask
  const AREA = [['1,1', '1,5', '5,1', '8'], ['1,1', '1,5', '1,10', 'Not a triangle'], ['10,10', '0,10', '10,0', '50'], ['0,0', '0,10', '10,10', '50']];
  function AreaTable() {
    const ar = useAr();
    const [open, setOpen] = H.K.useSlot('area', false);
    return html`<div className="hf-in">
      <table className="hf-qa4-tbl" dir="ltr"><thead><tr><th className="c">Point 1</th><th className="c">Point 2</th><th className="c">Point 3</th><th className="c">Expected area</th></tr></thead>
        <tbody>${AREA.map((r, i) => html`<tr key=${i}>${r.slice(0, 3).map((x, j) => html`<td key=${j} className="m c">(${x})</td>`)}${open ? html`<td className="c k">${r[3]}</td>` : html`<td className="hide">?</td>`}</tr>`)}</tbody></table>
      <div className="hf-row" style=${{ marginTop: '7px' }}>${!open && html`<button className="hf-btn solid" onClick=${() => setOpen(true)}>${ar ? 'ورّيني الإجابات' : 'Show the answers'}</button>`}</div>
    </div>`;
  }

  H.chapters.qa[4] = {
    title: 'Cyclomatic Complexity, Triangle Problem and OOP Testing', kicker: 'Chapter 4', run: 'cyclomatic complexity and oop testing',
    ar: { title: 'الـ Cyclomatic Complexity ومسألة المثلث والـ OOP Testing', kicker: 'الفصل 4', run: 'الـ cyclomatic complexity والـ oop testing' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 4);
      const arL = (window.AR && window.AR.qa && window.AR.qa.lectures && window.AR.qa.lectures[4]) || {};
      const arQuiz = arL.quiz || [], arExtra = arL.extra || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' questions (quiz items with src)
      const q = re => { const i = lec.quiz.findIndex(x => x.src && re.test(strip(x.q))); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      // the site's own practice questions (no src)
      const pfind = re => {
        let i = (lec.quiz || []).findIndex(x => !x.src && re.test(strip(x.q)));
        if (i >= 0) return { q: lec.quiz[i], why: arQuiz[i] };
        i = (lec.extra || []).findIndex(x => !x.src && re.test(strip(x.q)));
        return i < 0 ? {} : { q: lec.extra[i], why: arExtra[i] };
      };
      const pq = (id, re) => { const r = pfind(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · warm-up (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('In Lecture 3 you met <b>statement</b>, <b>path (branch)</b> and <b>condition</b> coverage, and the lecture ended with an exercise it never solved: the <b>triangle problem</b>. This chapter solves it, and gives you a number that says how many paths a program has.',
            'في محاضرة 3 اتعرّفت على الـ <b>statement</b> والـ <b>path (branch)</b> والـ <b>condition</b> coverage، والمحاضرة خلصت بتمرين محلّتهوش: الـ <b>triangle problem</b>. الفصل ده بيحلّه، وبيديك رقم بيقولك البرنامج فيه كام path.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('A function has two IFs, one after the other. Each IF can go true or false. How many different routes can a run take from the first line to the last? And how many tests would you write to try them?',
            'عندك function فيها اتنين IF ورا بعض. كل IF ممكن يبقى true أو false. التنفيذ ممكن ياخد كام طريق مختلف من أول سطر لآخر سطر؟ وهتكتب كام test عشان تجرّبهم؟')}</p></${Box}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will trace paths through real flow graphs and count them.', '<b>حل التمارين.</b> هتمشي على paths في flow graphs حقيقية وتعدّها بنفسك.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are the traps from the exam.', '<b>خلّي بالك!</b> دي الفخاخ اللي جت في الامتحانات.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">4</span><span className="t">${A ? html`الفصل الرابع<br/>Software Quality` : html`Chapter four<br/>Software Quality`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('How Many Roads Lead Through Your Code?', 'كام طريق بيعدّي جوه الكود بتاعك؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('Cyclomatic complexity, the triangle problem and OOP testing', 'الـ cyclomatic complexity ومسألة المثلث والـ OOP testing')}</p></div>
          <${Talk} who="bug">${X('I live on <b>one path</b> of your program. Test the others all day and you will never meet me.', 'أنا ساكن في <b>path واحد</b> من البرنامج بتاعك. اختبر الباقيين طول اليوم ومش هتقابلني.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Then I will count the paths first. <b>Cyclomatic complexity</b> tells me how many independent ones there are.', 'يبقى هعدّ الـ paths الأول. الـ <b>cyclomatic complexity</b> بتقولي فيه كام واحد independent.')}</${Talk}>
          <${P} small=${true}>${X('In this chapter: the <b>V-model</b> one more time, a function called <b>foo()</b> and its <b>control flow graph</b>, the number <b>V(G)</b>, the <b>triangle problem</b> tested black-box and white-box, and how testing changes for <b>object-oriented</b> code.',
            'في الفصل ده: الـ <b>V-model</b> مرة كمان، وfunction اسمها <b>foo()</b> والـ <b>control flow graph</b> بتاعها، والرقم <b>V(G)</b>، والـ <b>triangle problem</b> بالـ black-box والـ white-box، وإزاي الـ testing بيتغيّر مع الكود الـ <b>object-oriented</b>.')}</${P}>
        `),

        // 2 · V-model
        page(html`
          <${H1}>${t('The V again: down is verification, up is validation', 'الـ V تاني: النازل verification والطالع validation')}</${H1}>
          <${UL} items=${A ? [
            'الجنب <b>الشمال</b> وهو <b>نازل</b> هو الـ <b>verification</b>:<span class="ltr">Requirements spec → Functional spec → System design → Unit design → Code</span>',
            'الجنب <b>اليمين</b> وهو <b>طالع</b> هو الـ <b>validation</b>:<span class="ltr">Unit test → Integration test → System test → Acceptance test</span>',
            'الـ <b>test plans</b> بتربط الجنبين بأسهم منقطة: الـ <b>Acceptance Test Plan</b> (من الـ requirements)، والـ <b>System Test Plan</b> (من الـ functional spec)، والـ <b>Integration Test Plan</b> (من الـ system design).',
            'والـ <b>Test Cases</b> بين الـ Unit Design والـ Unit Test.'
          ] : [
            'The <b>left</b> side going <b>down</b> is <b>verification</b>: Requirements spec → Functional spec → System design → Unit design → Code.',
            'The <b>right</b> side going <b>up</b> is <b>validation</b>: Unit test → Integration test → System test → Acceptance test.',
            'Dotted <b>test plans</b> link the sides: <b>Acceptance Test Plan</b> (requirements → acceptance), <b>System Test Plan</b> (functional spec → system test), <b>Integration Test Plan</b> (design → integration).',
            '<b>Test Cases</b> sit between Unit Design and Unit Test.'
          ]} />
          <${Grow} />
          <${Hand}>${t('Our trick: verify on the way DOWN, validate on the way UP.', 'حيلة من عندنا: بتعمل verify وإنت نازل، وvalidate وإنت طالع.')}</${Hand}>
        `, { sec: t('The V-model', 'الـ V-model') }),

        // 3 · figure: V-model
        page(html`
          <${Fig} name="qa-v-verify" />
        `),

        // 4 · sort V-model
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Which side of the V? <b>Ver</b> = verification (left, down), <b>Val</b> = validation (right, up).', 'أنهي جنب من الـ V؟ الـ <b>Ver</b> يعني verification (شمال ونازل)، والـ <b>Val</b> يعني validation (يمين وطالع).')}</p></${Box}>
          <${Sort} id="vside" bins=${[['Ver', 'Verification'], ['Val', 'Validation']]} items=${A ? [
            ['الـ Functional Specifications', 0], ['الـ Acceptance Test', 1], ['الـ Unit Design', 0],
            ['الـ Integration Test', 1], ['الـ System Design', 0], ['الـ Unit Test', 1]
          ] : [
            ['Functional Specifications', 0], ['Acceptance Test', 1], ['Unit Design', 0],
            ['Integration Test', 1], ['System Design', 0], ['Unit Test', 1]
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The figure labels the <b>left (downward)</b> side <b>Verification</b>, not validation, debugging or maintenance.',
            'الجنب <b>الشمال (النازل)</b> مكتوب عليه <b>Verification</b>، مش validation ولا debugging ولا maintenance.')}</p></${Box}>
        `),

        // 5 · meet foo
        page(html`
          <${H1}>${t('Meet foo()', 'اتعرّف على foo()')}</${H1}>
          <${P} small=${true}>${X('The lecture\'s worked example. The numbers on the left are the <b>nodes</b> of its flow graph: each numbered statement becomes one node.',
            'ده المثال المحلول بتاع المحاضرة. الأرقام اللي على الشمال هي الـ <b>nodes</b> بتاعة الـ flow graph: كل statement عليه رقم بيبقى node.')}</${P}>
          <${Code} lines=${['public float foo(int a, int b,', '                 float x) {', ['1.  if (a>1 && b==0) {', t('decision', 'decision')], '2.     x = x/a;', '    }', ['3.  if (a==2 || x>1) {', t('decision', 'decision')], '4.     x = x+1;', '    }', '    else', '5.     x = x*a;', '6.  return (a+x);', '}']} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Two IFs, so two <b>decisions</b>. Before you turn the page, guess: how many arrows will the graph have?',
            'فيه اتنين IF، يعني اتنين <b>decisions</b>. قبل ما تقلّب الصفحة خمّن: الـ graph هيبقى فيه كام سهم؟')}</p></${Box}>
        `, { sec: t('foo() and its graph', 'الـ foo() والـ graph بتاعها') }),

        // 6 · edges table
        page(html`
          <${H2}>${t('Seven arrows, three kinds', 'سبع أسهم، من تلات أنواع')}</${H2}>
          <table className="hf-qa4-tbl hf-in"><thead><tr><th className="c">${t('Edge', 'الـ Edge')}</th><th>${t('Meaning', 'معناه')}</th></tr></thead>
            <tbody>${(A ? [
              ['1 → 2', html`الـ <b>True branch</b> بتاع <bdi dir="ltr">(a>1 && b==0)</bdi>`], ['1 → 3', html`الـ <b>False branch</b> بتاع أول IF`], ['2 → 3', 'الـ Sequential'],
              ['3 → 4', html`الـ <b>True branch</b> بتاع <bdi dir="ltr">(a==2 || x>1)</bdi>`], ['3 → 5', html`الـ <b>False branch</b> (الـ else)`], ['4 → 6', 'الـ Sequential'], ['5 → 6', 'الـ Sequential']
            ] : [
              ['1 → 2', html`<b>True branch</b> of (a>1 && b==0)`], ['1 → 3', html`<b>False branch</b> of the first IF`], ['2 → 3', 'Sequential'],
              ['3 → 4', html`<b>True branch</b> of (a==2 || x>1)`], ['3 → 5', html`<b>False branch</b> (else)`], ['4 → 6', 'Sequential'], ['5 → 6', 'Sequential']
            ]).map((r, i) => html`<tr key=${i}><td className="m c">${r[0]}</td><td>${r[1]}</td></tr>`)}</tbody></table>
          <${P} small=${true}>${X('In the slide\'s figure the <b>true</b> branches are thick solid arrows, the <b>false</b> branches dotted, and the <b>sequential</b> ones thin.',
            'في رسمة الـ slide الـ <b>true</b> branches أسهم solid تقيلة، والـ <b>false</b> branches منقطة، والـ <b>sequential</b> رفيعة.')}</${P}>
          <${Grow} />
          <${Talk} who="lens">${X('So: <b>6 nodes</b>, <b>7 edges</b>. Keep those two numbers.', 'يبقى: <b>6 nodes</b> و<b>7 edges</b>. احفظ الرقمين دول.')}</${Talk}>
        `),

        // 7 · figure: foo cfg
        page(html`
          <${Fig} name="qa-foo-cfg" />
        `),

        // 8 · three formulas
        page(html`
          <${H1}>${t('One number, three ways to get it', 'رقم واحد، وتلات طرق توصله')}</${H1}>
          <${Def}>${X('<b>Cyclomatic complexity V(G)</b> is the <b>number of independent (basis) paths</b> through the flow graph G.',
            'الـ <b>Cyclomatic complexity V(G)</b> هي <b>عدد الـ independent (basis) paths</b> في الـ flow graph اللي اسمه G.')}</${Def}>
          <${Code} lines=${[['V(G) = E − N + 2P', t('edges, nodes, components', 'الـ edges والـ nodes والـ components')], ['     = 7 − 6 + 2(1) = 3', ''], ['V(G) = predicates + 1', t('decision nodes', 'الـ decision nodes')], ['     = 2 + 1 = 3', t('nodes 1 and 3', 'الـ nodes 1 و3')], ['V(G) = regions', t('of the planar graph', 'بتاعة الـ planar graph')], ['     = 2 inner + 1 outer = 3', '']]} />
          <${P} small=${true}>${X('<b>P</b> = number of <b>connected components</b>, usually 1, so it is just <b>E − N + 2</b>.',
            'الـ <b>P</b> هي عدد الـ <b>connected components</b>، وعادةً 1، فالـ formula بتبقى <bdi dir="ltr"><b>E − N + 2</b></bdi>.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>P is not the predicates</b> (those are in predicates + 1). And it is <b>E − N</b>: 6 − 7 + 2 = 1 is the reversed slip.',
            'الـ <b>P مش الـ predicates</b> (دول بتوع الـ predicates + 1). وهي <bdi dir="ltr"><b>E − N</b></bdi>؛ ولو عكستها هيطلع <bdi dir="ltr">6 − 7 + 2 = 1</bdi> غلط.')}</p></${Box}>
        `, { sec: t('Cyclomatic complexity', 'الـ Cyclomatic complexity') }),

        // 9 · regions picture
        page(html`
          <${H2}>${t('Counting regions: colour inside the lines', 'عدّ الـ regions: لوّن جوه الخطوط')}</${H2}>
          <${P} small=${true}>${X('Draw the graph flat with no crossing arrows (<b>planar</b>). Each closed area is a <b>region</b>; the outside counts as one more.',
            'ارسم الـ graph مفرود من غير أسهم بتقطع بعض (<b>planar</b>). كل مساحة مقفولة تبقى <b>region</b>، واللي برّه بتتحسب واحدة كمان.')}</${P}>
          <div className="hf-in" dir="ltr" style=${{ display: 'flex', justifyContent: 'center' }}><${Graph} g=${FOO} width=${150} regions=${[[84, 60, 'R1'], [62, 136, 'R2'], [128, 160, 'R3']]} /></div>
          <${UL} items=${A ? [
            'الـ <b>R1</b>: محوّطة بالـ <bdi dir="ltr">1 → 2 → 3</bdi> و <bdi dir="ltr">1 → 3</bdi>، اللي عملهم أول IF.',
            'الـ <b>R2</b>: محوّطة بالـ <bdi dir="ltr">3 → 4 → 6</bdi> و <bdi dir="ltr">3 → 5 → 6</bdi>، اللي عملهم تاني IF.',
            'الـ <b>R3</b>: اللي برّه. يبقى <bdi dir="ltr">2 + 1 = 3</bdi> regions.'
          ] : [
            '<b>R1</b>: fenced by 1 → 2 → 3 and 1 → 3, made by the first IF.',
            '<b>R2</b>: fenced by 3 → 4 → 6 and 3 → 5 → 6, made by the second IF.',
            '<b>R3</b>: the outside. So 2 inner + 1 outer = <b>3</b> regions.'
          ]} />
          <${Grow} />
          <${Hand}>${t('Our trick: each simple IF fences in one region.', 'حيلة من عندنا: كل IF بسيط بيقفل region واحدة.')}</${Hand}>
        `),

        // 10 · interview with V(G)
        page(html`
          <${Interview} title=${t('Cyclomatic Complexity, exposed', 'الـ Cyclomatic Complexity على المكشوف')} sub=${t("This week's interview: the number that counts your paths.", 'حوار الأسبوع: الرقم اللي بيعدّ الـ paths بتاعتك.')} lines=${A ? [
            ['المذيع', 'إنت بتعدّ إيه بالظبط؟'],
            ['الـ V(G)', 'بعدّ الـ <b>independent (basis) paths</b> في الـ control flow graph. مش السطور، ولا الـ states، ولا الـ statements.'],
            ['المذيع', 'وأحسبك إزاي؟'],
            ['الـ V(G)', 'بتلات طرق، وكلهم لازم يطلّعوا نفس الرقم: <bdi dir="ltr">E − N + 2P</bdi>، أو الـ predicate nodes زائد 1، أو عدد الـ regions.'],
            ['المذيع', 'يعني لو إنت 3، أكتب 3 tests؟'],
            ['الـ V(G)', 'أيوه، 3 test cases عشان تنفّذ كل basis path، واحدة لكل path، زي الـ slide.'],
            ['المذيع', 'وده أقل عدد للـ branch coverage كمان؟'],
            ['الـ V(G)', 'لأ! ‡ الـ <code>foo()</code> بتوصل للـ branch coverage بـ 2 بس: واحد يخلّي الـ IFs الاتنين true، وواحد يخلّيهم false.']
          ] : [
            ['Head First', 'What exactly do you count?'],
            ['V(G)', 'The <b>independent (basis) paths</b> of a control flow graph. Not lines, not states, not statements.'],
            ['Head First', 'How do I work you out?'],
            ['V(G)', 'Three ways, and they must agree: <b>E − N + 2P</b>, <b>predicate nodes + 1</b>, or the <b>number of regions</b>.'],
            ['Head First', 'So if you are 3, I write 3 tests?'],
            ['V(G)', 'Yes: 3 test cases to execute every basis path, one per path, as on the slide.'],
            ['Head First', 'Is that also the minimum for branch coverage?'],
            ['V(G)', 'No! ‡ foo() reaches branch coverage with only <b>2</b>: one test makes both IFs true, one makes both false.']
          ]} />
        `),

        // 11 · basis paths and test cases
        page(html`
          <${H1}>${t('Three paths, three test cases', 'تلات paths، وتلات test cases')}</${H1}>
          <${P} small=${true}>${X('V(G) = 3, so the slide lists <b>3 basis paths</b> and a test case for each:', 'الـ V(G) بتساوي 3، فالـ slide بتطلّع <b>3 basis paths</b> وtest case لكل واحد:')}</${P}>
          <table className="hf-qa4-tbl hf-in" dir="ltr"><thead><tr><th>#</th><th>Basis path</th><th>Test case</th></tr></thead>
            <tbody>${[['1', '1, 2, 3, 4, 6', 'a=2, b=0, x=0 (any x)'], ['2', '1, 3, 4, 6', 'a=2, b=1, x=0 (any x)'], ['3', '1, 3, 5, 6', 'a=0, b=0, x=0']].map(r => html`<tr key=${r[0]}><td className="k c">${r[0]}</td><td className="m">${r[1]}</td><td className="m">${r[2]}</td></tr>`)}</tbody></table>
          <${UL} items=${A ? [
            'لما <bdi dir="ltr">a=2, b=0</bdi>: أول IF بيبقى true فبننفذ <bdi dir="ltr">x=x/2</bdi>، وبعدين <bdi dir="ltr">a==2</bdi> بيبقى true فبننفذ <bdi dir="ltr">x=x+1</bdi>.',
            'لما <bdi dir="ltr">a=2, b=1</bdi>: الـ <bdi dir="ltr">b==0</bdi> بيبقى false فبنتنط 2، والـ <bdi dir="ltr">a==2</bdi> بيبقى true فبنروح لـ 4.',
            'لما <bdi dir="ltr">a=0, b=0, x=0</bdi>: الـ <bdi dir="ltr">a>1</bdi> بيبقى false، والـ <bdi dir="ltr">a==2</bdi> و <bdi dir="ltr">x>1</bdi> الاتنين false، فبنروح للـ else (5).'
          ] : [
            '<b>a=2, b=0</b>: the first IF is true → x = x/2; then a==2 is true → x = x+1.',
            '<b>a=2, b=1</b>: b==0 is false → skip 2; a==2 is true → node 4.',
            '<b>a=0, b=0, x=0</b>: a>1 is false → skip 2; a==2 and x>1 are both false → the else, node 5.'
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${X('"any x" in paths 1 and 2: a==2 alone makes the second IF true', 'الـ "any x" في الـ paths 1 و2 معناها إن <bdi dir="ltr">a==2</bdi> لوحدها بتخلّي تاني IF true')}</${Hand}>
        `, { sec: t('Basis paths', 'الـ Basis paths') }),

        // 12 · tracer foo
        page(html`
          <${Box} kind="pencil" title=${t('Be the program counter', 'خليك إنت الـ program counter')}><p className="hf-p small">${t('Pick an input, then tap the nodes foo() runs, in order. Dashed circles are where you can go next.', 'اختار input، ودوس على الـ nodes بالترتيب. الدواير المتقطعة هي الجاية.')}</p></${Box}>
          <${Tracer} id="trf" g=${FOO} tasks=${FOO_T} code=${FOO_CODE} width=${128} side=${true} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 13 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['الـ input <bdi dir="ltr">(3,0,2)</bdi> مشي في <bdi dir="ltr">1, 2, 3, 5, 6</bdi>. ده path رابع! يبقى الـ V(G) غلط؟', 'لأ. الـ V(G) بتعدّ الـ paths الـ <b>independent</b>، مش كل الـ paths. الـ <code>foo()</code> فيها 4 طرق مختلفة من الأول للآخر، بس 3 بس منهم independent (ملحوظة من عندنا: الطريق الرابع مابيستخدمش أي سهم جديد مش موجود في التلاتة).'],
            ['يعني الـ V(G) هي أقل عدد tests للـ branch coverage؟', '‡ لأ. الـ <code>foo()</code> بتوصل للـ branch coverage بـ 2: الـ <bdi dir="ltr">a=2, b=0</bdi> بتخلّي الـ IFs الاتنين true، والـ <bdi dir="ltr">a=0, b=0, x=0</bdi> بتخلّيهم الاتنين false.']
          ] : [
            ['Input (3,0,2) ran 1, 2, 3, 5, 6. That\'s a fourth path! Is V(G) wrong?', 'No. V(G) counts <b>independent</b> paths, not all paths. foo() has 4 different start-to-end routes but only 3 independent ones (our note: the fourth uses no arrow that the other three don\'t already use).'],
            ['So V(G) is the minimum number of tests for branch coverage?', '‡ No. foo() gets branch coverage with 2: a=2, b=0 makes both IFs true; a=0, b=0, x=0 makes both false.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Cyclomatic complexity is used to determine the number of ..." <b>paths</b>, not states, lines or statements. It came twice: summary MCQs and the 2026/27 midterm.',
            'سؤال "Cyclomatic complexity is used to determine the number of" إجابته <b>paths</b>، مش states ولا lines ولا statements. جه مرتين: في الـ summary MCQs وفي ميدترم <bdi dir="ltr">2026/27</bdi>.')}</p></${Box}>
        `),

        // 14 · triangle problem intro
        page(html`
          <${H1}>${t('The triangle problem, solved at last', 'الـ triangle problem، اتحلّت أخيرًا')}</${H1}>
          <${P} small=${true}>${X('Apply <b>black box</b> and <b>white box</b>: show <b>function testing</b>, <b>statement</b> and <b>path (branch) coverage</b>.',
            'طبّق الـ <b>black box</b> والـ <b>white box</b>: وضّح الـ <b>function testing</b> والـ <b>statement</b> والـ <b>path (branch) coverage</b>.')}</${P}>
          <${Code} lines=${['read a,b,c;', 'type = "scalene";', 'if (a==b or a==c or b==c)', ['    type = "isosceles";', ''], 'if (a==b and a==c)', ['    type = "equilateral";', ''], 'if (a>=b+c or b>=a+c or c>=a+b)', ['    type = "not a triangle";', ''], 'if (a<=0 or b<=0 or c<=0)', ['    type = "bad inputs";', ''], 'print type']} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('No <b>else</b> anywhere. If two IFs are true, which type is printed? (Hint: each IF overwrites <code>type</code>.)', 'مفيش <b>else</b> خالص. لو اتنين IF طلعوا true، أنهي type هيتطبع؟ (تلميح: كل IF بيكتب فوق الـ <code>type</code>.)')}</p></${Box}>
        `, { sec: t('The triangle problem', 'الـ triangle problem') }),

        // 15 · subdomains
        page(html`
          <${H2}>${t('Black box first: split the inputs', 'الـ black box الأول: قسّم الـ inputs')}</${H2}>
          <${P} small=${true}>${X('Functional testing ignores the code and splits the <b>domain</b> by what the output should be:', 'الـ functional testing مابيبصّش على الكود، وبيقسّم الـ <b>domain</b> على حسب الـ output المفروض يطلع:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>3 subdomains</b>: الـ <b>scalene</b> (مفيش أضلاع متساوية)، والـ <b>isosceles</b> (ضلعين متساويين)، والـ <b>equilateral</b> (كلهم متساويين).',
            'وزيادة عليهم <b>2 error subdomains</b>: الـ <b>bad inputs</b> والـ <b>not a triangle</b>.',
            'وكل test case <b>لازم تقول الـ expected output</b> بتاعها.'
          ] : [
            '<b>3 subdomains</b>: <b>scalene</b> (no sides equal), <b>isosceles</b> (two equal), <b>equilateral</b> (all equal).',
            'Plus <b>2 error subdomains</b>: <b>bad inputs</b> and <b>not a triangle</b>.',
            'Each test case must <b>state the expected output</b>.'
          ]} />
          <${Grow} />
          <${Talk} who="lens">${X('Then I pick tests in each subdomain and <b>vary the order</b> of the sides.', 'وبعدين باختار tests في كل subdomain و<b>بغيّر ترتيب</b> الأضلاع.')}</${Talk}>
        `),

        // 16 · functional test cases table
        page(html`
          <${H2}>${t('The slide\'s functional test cases', 'الـ functional test cases بتاعة الـ slide')}</${H2}>
          <table className="hf-qa4-tbl hf-in"><thead><tr><th>${t('Subdomain', 'الـ Subdomain')}</th><th>${t('Case', 'الحالة')}</th><th>${t('Test → output', 'الـ Test')}</th></tr></thead>
            <tbody>${(A ? [
              ['Scalene', 'الحجم بيزيد', '(3,4,5)'], ['Scalene', 'الحجم بيقل', '(5,4,3)'], ['Scalene', 'الأكبر في النص', '(4,5,3)'],
              ['Isosceles', 'الـ a=b والتالت أكبر أو أصغر', '(5,5,8) (8,8,5)'], ['Isosceles', 'الـ a=c والتالت أكبر أو أصغر', '(5,8,5) (8,5,8)'], ['Isosceles', 'الـ b=c والتالت أكبر أو أصغر', '(8,5,5) (5,8,8)'],
              ['Equilateral', 'كلهم متساويين', '(5,5,5)'], ['Not a triangle', 'الأكبر أول، تاني، تالت', '(6,4,2) (4,6,2) (1,2,3)'], ['Bad inputs', 'واحد، اتنين، تلاتة bad', '(1,2,4)‡ (3,2,5)‡ (0,0,0)']
            ] : [
              ['Scalene', 'Increasing size', '(3,4,5)'], ['Scalene', 'Decreasing size', '(5,4,3)'], ['Scalene', 'Largest as second', '(4,5,3)'],
              ['Isosceles', 'a=b, other larger / smaller', '(5,5,8) (8,8,5)'], ['Isosceles', 'a=c, other larger / smaller', '(5,8,5) (8,5,8)'], ['Isosceles', 'b=c, other larger / smaller', '(8,5,5) (5,8,8)'],
              ['Equilateral', 'All sides equal', '(5,5,5)'], ['Not a triangle', 'Largest first / second / third', '(6,4,2) (4,6,2) (1,2,3)'], ['Bad inputs', 'One / two / three bad', '(1,2,4)‡ (3,2,5)‡ (0,0,0)']
            ]).map((r, i) => html`<tr key=${i} className=${i === 8 ? 'bad' : ''}><td className="k">${r[0]}</td><td>${r[1]}</td><td className="m">${r[2]}</td></tr>`)}</tbody></table>
          <${P} small=${true}>${X('Each row\'s expected output is its subdomain. The red row has a slip: turn the page.', 'الـ expected output بتاع كل صف هو الـ subdomain بتاعه. والصف الأحمر فيه غلطة: قلّب الصفحة.')}</${P}>
        `),

        // 17 · bad inputs slip
        page(html`
          <${Box} kind="watch" title=${t('Watch it: two "bad inputs" that aren\'t', 'خلّي بالك: اتنين "bad inputs" وهما مش كده')}><p className="hf-p small">${X('‡ The slide lists <b>(1,2,4)</b> and <b>(3,2,5)</b> as bad inputs. Run the pseudocode: no side is ≤ 0, but 4 ≥ 1+2 and 5 ≥ 3+2, so both print <b>"not a triangle"</b>. Correct examples would be <b>(−1,2,4)</b> for one bad input and <b>(0,−2,5)</b> for two. <b>(0,0,0)</b> is right: the last IF sets "bad inputs".',
            '‡ الـ slide حاطّة <b>(1,2,4)</b> و<b>(3,2,5)</b> كـ bad inputs. شغّل الـ pseudocode: مفيش ضلع <bdi dir="ltr">≤ 0</bdi>، بس <bdi dir="ltr">4 ≥ 1+2</bdi> و <bdi dir="ltr">5 ≥ 3+2</bdi>، فالاتنين بيطبعوا <b>"not a triangle"</b>. الأمثلة الصح هتبقى <bdi dir="ltr"><b>(−1,2,4)</b></bdi> لـ bad input واحد و<bdi dir="ltr"><b>(0,−2,5)</b></bdi> لاتنين. أما <b>(0,0,0)</b> فصح: آخر IF بيحط "bad inputs".')}</p></${Box}>
          <${Talk} who="bug">${X('I love this one. The test says "bad inputs", the program says "not a triangle", and someone files a bug against the <b>program</b>.', 'دي بحبها. الـ test بيقول "bad inputs"، والبرنامج بيقول "not a triangle"، وحد يفتح bug على <b>البرنامج</b>.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Which is why every test case must state its expected output, and the expected output must be <b>right</b>.', 'وعشان كده كل test case لازم تقول الـ expected output بتاعها، والـ expected output ده لازم يبقى <b>صح</b>.')}</${Talk}>
          <${Grow} />
          <${Hand} red=${true}>${t('run the pseudocode to get the expected output; don\'t trust the row\'s label', 'شغّل الـ pseudocode عشان تعرف الـ expected output؛ متثقش في اسم الصف')}</${Hand}>
        `),

        // 18 · sort outputs
        page(html`
          <${Box} kind="pencil" title=${t('Be the triangle program', 'خليك إنت الـ triangle program')}><p className="hf-p small">${X('What does the pseudocode finally <b>print</b>? <b>S</b> scalene, <b>I</b> isosceles, <b>E</b> equilateral, <b>NT</b> not a triangle, <b>BI</b> bad inputs.',
            'الـ pseudocode هيطبع إيه في الآخر؟ الـ <b>S</b> يعني scalene، والـ <b>I</b> يعني isosceles، والـ <b>E</b> يعني equilateral، والـ <b>NT</b> يعني not a triangle، والـ <b>BI</b> يعني bad inputs.')}</p></${Box}>
          <${Sort} id="tri" bins=${[['S', 'scalene'], ['I', 'isosceles'], ['E', 'equilateral'], ['NT', 'not a triangle'], ['BI', 'bad inputs']]} items=${[
            ['<code>(5,8,5)</code>', 1], ['<code>(4,5,3)</code>', 0], ['<code>(5,5,5)</code>', 2], ['<code>(1,2,4)</code>', 3],
            ['<code>(2,2,4)</code>', 3], ['<code>(−1,2,4)</code>', 4]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${X('(2,2,4): isosceles first, then 4 ≥ 2+2 overwrites it', 'الـ <bdi dir="ltr">(2,2,4)</bdi> بتبقى isosceles الأول، وبعدين <bdi dir="ltr">4 ≥ 2+2</bdi> بتكتب فوقها')}</${Hand}>
        `),

        // 19 · white box: statement & branch coverage
        page(html`
          <${H1}>${t('Now white box: which lines run?', 'دلوقتي white box: أنهي سطور بتتنفذ؟')}</${H1}>
          <${P} small=${true}>${X('The slide letters the lines <b>A to K</b> and stars the lines each of four tests runs: <b>(3,4,5)</b>, <b>(3,5,3)</b>, <b>(0,1,0)</b>, <b>(4,4,4)</b>.',
            'الـ slide بتدّي السطور حروف من <b>A لـ K</b>، وبتحط نجمة على السطور اللي كل test من الأربعة بينفذها:<span class="ltr"><b>(3,4,5)  (3,5,3)  (0,1,0)  (4,4,4)</b></span>')}</${P}>
          <div className="hf-qa4-st hf-in" dir="ltr">
            <b>A</b><span>read a,b,c</span><b>B</b><span>type = scalene</span><b>C</b><span>if (a==b || b==c || a==c)</span><b>D</b><span>type = isosceles</span>
            <b>E</b><span>if (a==b && b==c)</span><b>F</b><span>type = equilateral</span><b>G</b><span>if (a>=b+c || b>=a+c || c>=a+b)</span><b>H</b><span>type = not a triangle</span>
            <b>I</b><span>${'if (a<=0 || b<=0 || c<=0)'}</span><b>J</b><span>type = bad inputs</span><b>K</b><span>print type</span>
          </div>
          <${Grow} />
          <${Box} kind="relax"><p className="hf-p small">${X('Seven lines run for <b>every</b> test: A, B, K and the IFs C, E, G, I. Only <b>D, F, H, J</b> depend on the input.', 'سبع سطور بيتنفذوا مع <b>كل</b> test، هما A وB وK والـ IFs. والـ <b>D وF وH وJ</b> بس بيعتمدوا على الـ input.')}</p></${Box}>
        `, { sec: t('Statement and branch coverage', 'الـ Statement والـ branch coverage') }),

        // 20 · figure: triangle run
        page(html`
          <${Fig} name="qa-triangle-run" />
        `),

        // 21 · coverage fill
        page(html`
          <${Box} kind="pencil" title=${t('Be the coverage table', 'خليك إنت جدول الـ coverage')}><p className="hf-p small">${X('Tap a cell to star it if that test runs that line. Only D, F, H and J are left; every other line runs for all four.',
            'دوس على الخانة وحط نجمة لو الـ test ده بينفذ السطر ده. فاضل بس D وF وH وJ؛ وباقي السطور بتتنفذ مع الأربعة.')}</p></${Box}>
          <${CovFill} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('(0,1,0) finally prints <b>bad inputs</b>, though it ran D and H on the way: a==c set isosceles, 1 ≥ 0+0 set not a triangle, then a ≤ 0 overwrote both.',
            'الـ (0,1,0) في الآخر بتطبع <b>bad inputs</b>، مع إنها عدّت على D وH في السكة: الـ <bdi dir="ltr">a==c</bdi> حطت isosceles، والـ <bdi dir="ltr">1 ≥ 0+0</bdi> حطت not a triangle، وبعدين الـ <bdi dir="ltr">a ≤ 0</bdi> كتبت فوقهم.')}</p></${Box}>
        `),

        // 22 · minimal sets
        page(html`
          <${H1}>${t('The fewest tests that do the job', 'أقل عدد tests يعمل الشغلانة')}</${H1}>
          <${P} small=${true}>${X('The slide asks: find the <b>minimal set of test cases</b> for <b>statement</b> and <b>branch</b> coverage. Using the slide table\'s four tests:',
            'الـ slide بتسأل: هات <b>أقل set من الـ test cases</b> للـ <b>statement</b> والـ <b>branch</b> coverage. باستخدام الأربع tests اللي في جدول الـ slide:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Statement coverage</b> محتاجة <b>2 tests</b>، هما <bdi dir="ltr">(4,4,4)</bdi> و <bdi dir="ltr">(0,1,0)</bdi>: الـ <bdi dir="ltr">(4,4,4)</bdi> بس هي اللي بتوصل لـ F، والـ <bdi dir="ltr">(0,1,0)</bdi> بس هي اللي بتوصل لـ H و J.',
            'الـ <b>Branch coverage</b> محتاجة <b>3 tests</b>: ضيف <bdi dir="ltr">(3,4,5)</bdi>، لأنها الوحيدة اللي بتخلّي C تبقى false. كده كل IF بقى true مرة وfalse مرة.'
          ] : [
            '<b>Statement coverage: 2 tests</b>, (4,4,4) + (0,1,0). Only (4,4,4) reaches F; only (0,1,0) reaches H and J.',
            '<b>Branch coverage: 3 tests</b>: add (3,4,5), the only column that makes C false. (0,1,0) makes E false and G, I true; (4,4,4) makes E true and G, I false.'
          ]} />
          <${Box} kind="watch" title=${t('Watch it: "any input" changes the answer', 'خلّي بالك: "أي input" بيغيّر الإجابة')}><p className="hf-p small">${X('‡ The slide gives no answer. If <b>any</b> input is allowed: <b>(0,0,0)</b> alone runs every line A to K, so statement coverage needs <b>1 test</b>; (0,0,0) makes every IF true and (3,4,5) makes every IF false, so branch coverage needs <b>2</b>. One test can never make an IF both true and false.',
            '‡ الـ slide مابتديش إجابة. لو مسموح بـ <b>أي</b> input: الـ <bdi dir="ltr"><b>(0,0,0)</b></bdi> لوحدها بتشغّل كل السطور من A لـ K، فالـ statement coverage محتاجة <b>test واحد</b>؛ والـ (0,0,0) بتخلّي كل IF true، والـ (3,4,5) بتخلّيه false، فالـ branch coverage محتاجة <b>2</b>. وtest واحد عمره ما يخلّي IF يبقى true وfalse مع بعض.')}</p></${Box}>
        `),

        // 23 · figure: triangle cfg
        page(html`
          <${Fig} name="qa-triangle-cfg" />
        `, { sec: t('The triangle graph', 'الـ graph بتاع المثلث') }),

        // 24 · counter
        page(html`
          <${Box} kind="pencil" title=${t('Be the complexity counter', 'خليك إنت عدّاد الـ complexity')}><p className="hf-p small">${X('Count, then V(G). ‡ The slides don\'t count the triangle graph; we did.',
            'عدّ وبعدين احسب الـ V(G). ‡ السلايدز مابتعدّش graph المثلث؛ إحنا عدّيناه.')}</p></${Box}>
          <${Counter} />
        `),

        // 25 · tracer triangle
        page(html`
          <${P} small=${true}>${X('<b>Five independent paths through the triangle</b>, from the notes\' own inputs: each uses an arrow the ones before it did not. The sixth, (0,1,0), is a mix.',
            '<b>خمس independent paths جوه المثلث</b> من inputs النوتس نفسها: كل path بيستخدم سهم اللي قبله ماستخدموهوش. والسادس <bdi dir="ltr">(0,1,0)</bdi> خليط.')}</${P}>
          <${Tracer} id="trt" g=${TRI} tasks=${TRI_T} code=${TRI_CODE} width=${306} />
        `),

        // 26 · area of a triangle
        page(html`
          <${H2}>${t('One more black box: the area of a triangle', 'black box كمان: مساحة المثلث')}</${H2}>
          <${P} small=${true}>${X('A program calculates the area of a triangle. Its inputs are <b>three sets of x,y coordinates</b>. Construct functional tests: complete the expected column yourself, then check.',
            'برنامج بيحسب مساحة مثلث. الـ inputs بتاعته <b>3 sets من الـ <bdi dir="ltr">x,y</bdi> coordinates</b>. اعمل functional tests: كمّل عمود الـ expected بنفسك وبعدين اتأكد.')}</${P}>
          <${AreaTable} />
          <${P} small=${true}>${X('(1,1), (1,5), (5,1) is a right triangle with legs 4 and 4: ½ × 4 × 4 = 8. Three points on x = 1 are <b>collinear</b>, so there is no triangle at all.',
            'الـ <bdi dir="ltr">(1,1), (1,5), (5,1)</bdi> مثلث قايم ضلعيه 4 و4، فالمساحة <bdi dir="ltr">½ × 4 × 4 = 8</bdi>. وتلات نقط على <bdi dir="ltr">x = 1</bdi> يبقوا <b>collinear</b> (على خط واحد)، فمفيش مثلث أصلًا.')}</${P}>
        `, { sec: t('Area of a triangle', 'مساحة المثلث') }),

        // 27 · OOP testing intro
        page(html`
          <${H1}>${t('Objects change the game (a little)', 'الـ Objects بتغيّر اللعبة (شوية)')}</${H1}>
          <${UL} items=${A ? [
            'الـ testing بتاع الـ object-oriented software فيه <b>شوية challenges جديدة</b>، بس <b>تقنيات conventional كتير لسه مناسبة</b>.',
            'الـ <b>Functional</b> testing للـ OO <b>مش مختلف</b> عن الـ conventional: الـ test cases بتيجي من الـ functionality المطلوبة في الـ <b>requirements document</b>.',
            'أما الـ <b>Structural</b> testing للـ OOP <b>فمختلف جدًا</b>.',
            'الـ coverage criteria العادية (statement وbranch وdata flow) ممكن تتطبق على الـ OO، بس الـ statement والـ branch <b>شكلهم مش مناسبين</b> لتعقيد الـ OO: لازم نختبر <b>الـ interactions بين الـ methods</b>.'
          ] : [
            'Testing object-oriented software presents <b>some new challenges</b>, but <b>many conventional techniques are still appropriate</b>.',
            '<b>Functional</b> testing of OO software is <b>no different</b> from conventional: test cases come from the required functionality in the <b>requirements document</b>.',
            '<b>Structural</b> testing of OOP is <b>very different</b>.',
            'Statement, branch and data flow coverage can be applied to OO, but statement and branch coverage <b>do not seem appropriate</b> for OO complexity: the <b>interactions between methods</b> must be tested.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Very different" is <b>structural</b> testing. Functional testing of OO is <b>no different</b>. And statement coverage <b>can</b> be applied to OO; it is just not enough.',
            'الـ "very different" دي للـ <b>structural</b> testing. أما الـ functional testing للـ OO فـ <b>مش مختلف</b>. والـ statement coverage <b>ممكن</b> يتطبق على الـ OO؛ بس مش كفاية.')}</p></${Box}>
        `, { sec: t('OOP testing', 'الـ OOP testing') }),

        // 28 · MM and FP defined
        page(html`
          <${H2}>${t('Two structural approaches for objects', 'اتنين structural approaches للـ objects')}</${H2}>
          <${Def}>${X('<b>MM (Method-Message) testing</b>: every method call must be tested <b>at least once</b>. If a method calls another several times, <b>each call is tested only once</b>. It is the <b>most basic</b> criterion and <b>does not subsume statement coverage</b>.',
            'الـ <b>MM (Method-Message) testing</b>: كل method call لازم يتختبر <b>مرة على الأقل</b>. لو method بتنادي method تانية كذا مرة، <b>كل call بيتختبر مرة واحدة بس</b>. هو <b>أبسط</b> criterion و<b>مابيشملش الـ statement coverage</b>.')}</${Def}>
          <${Def}>${X('<b>Function Pair (FP) testing</b>: all possible sequences of method executions <b>of length two</b> must be tested, usually based on a <b>state machine diagram</b>.',
            'الـ <b>Function Pair (FP) testing</b>: كل الـ sequences الممكنة من تنفيذ الـ methods <b>اللي طولها اتنين</b> لازم تتختبر، وعادةً بتبقى مبنية على <b>state machine diagram</b>.')}</${Def}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Function pair is used to test": <b>the interactions between methods</b> (2026/27 midterm). The state machine is where the pairs <b>come from</b>.',
            'سؤال "Function pair is used to test" إجابته <b>the interactions between methods</b> (ميدترم <bdi dir="ltr">2026/27</bdi>). والـ state machine هي اللي الـ pairs <b>بتيجي منها</b>.')}</p></${Box}>
        `),

        // 29 · fireside
        page(html`
          <${Fireside} sub=${t('Tonight: Method-Message Testing and Function Pair Testing argue over a stack.', 'قعدة الليلة: الـ Method-Message Testing والـ Function Pair Testing بيتخانقوا على stack.')} />
          <${Chat} names=${[t('MM testing', 'الـ MM testing'), t('Function pair', 'الـ Function pair')]} lines=${A ? [
            [0, 'أنا شغلي بسيط: كل <b>method call</b> يتختبر مرة على الأقل. ولو call اتكرر، بختبره مرة واحدة.'],
            [1, 'وأنا بختبر <b>كل sequence من اتنين method executions</b>، من الـ state machine diagram.'],
            [0, 'للـ stack أنا محتاج <b>create وpush وpop</b> وخلاص.'],
            [1, 'وأنا محتاج <b>14 pair</b> لنفس الـ stack.'],
            [0, '14؟ ليه كل ده؟'],
            [1, 'عشان الـ pop على stack فاضي، والـ push على stack مليان. دي <b>state-dependent bugs</b> إنت مابتشوفهاش.'],
            [0, 'بس أنا أرخص.'],
            [1, 'وإنت <b>مابتشملش الـ statement coverage</b> كمان. الـ slide قالت كده.']
          ] : [
            [0, 'My job is simple: every <b>method call</b> tested at least once. A repeated call? I test it once.'],
            [1, 'I test <b>every sequence of two method executions</b>, from the state machine diagram.'],
            [0, 'For a stack I need <b>create, push and pop</b>. Done.'],
            [1, 'For the same stack I need <b>14 pairs</b>.'],
            [0, '14? Why so many?'],
            [1, 'Pop on an empty stack. Push on a full one. Those are <b>state-dependent bugs</b> you never see.'],
            [0, 'I am cheaper, though.'],
            [1, 'And you <b>don\'t subsume statement coverage</b>. The slide says so.']
          ]} />
        `),

        // 30 · stack states + MM
        page(html`
          <${H1}>${t('The stack: Empty, Normal, Full', 'الـ stack وحالاته التلاتة')}</${H1}>
          <${P} small=${true}>${X('The slide: "Find MM and FP of the stack in the following figure". The state machine has three states:', 'الـ slide بتقول:<span class="ltr">"Find MM and FP of the stack in the following figure"</span>')}</${P}>
          <table className="hf-qa4-tbl hf-in" dir="ltr"><thead><tr><th>Call</th><th>From → to</th></tr></thead><tbody>
            <tr><td className="k">new</td><td className="m">start → Empty</td></tr>
            <tr><td className="k">push</td><td className="m">Empty→Normal, Normal→Normal, Normal→Full, Full→error</td></tr>
            <tr><td className="k">pop</td><td className="m">Empty→error, Normal→Normal, Normal→Empty, Full→Normal</td></tr></tbody></table>
          <${Def}>${X('<b>MM</b> for the stack: "a simple sequence of <b>create, push and pop</b> might achieve MM testing."', 'للـ stack، الـ <b>MM</b> testing ممكن يتحقق بـ sequence بسيطة من <b>create وpush وpop</b>.')}</${Def}>
          <${Grow} />
          <${Box} kind="watch" title=${t('Watch it: the queue version', 'خلّي بالك: نسخة الـ queue')}><p className="hf-p small">${X('The 2026/27 midterm swapped the stack for a <b>queue</b>. Its methods are new, <b>insert</b> and <b>delete</b>, so the answer is <b>create, insert, and delete</b>. "create, push, and pop" is the stack\'s answer copied word for word.',
            'ميدترم <bdi dir="ltr">2026/27</bdi> سأل عن <b>queue</b>، والـ methods بتاعتها new و<b>insert</b> و<b>delete</b>، فالإجابة:<span class="ltr"><b>create, insert, and delete</b></span>مش إجابة الـ stack.')}</p></${Box}>
        `, { sec: t('Stack: MM and FP', 'الـ Stack: الـ MM والـ FP') }),

        // 31 · figure: stack
        page(html`
          <${Fig} name="qa-stack-fp" />
        `),

        // 32 · 14 pairs
        page(html`
          <${H2}>${t('All 14 function pairs', 'الـ 14 function pair كلهم')}</${H2}>
          <ol className="hf-qa4-fp hf-in" dir="ltr">${[
            ['new – pop (empty: error)', 1], ['new – push', 0], ['push (from empty) – push', 0], ['push (from empty) – pop', 0],
            ['push (N→N) – push (still normal)', 0], ['push (N→N) – push (into full)', 0], ['push (N→N) – pop', 0], ['push (N→full) – push (error)', 1],
            ['push (N→full) – pop', 0], ['pop (N→N) – push (still normal)', 0], ['pop (N→N) – pop (still normal)', 0], ['pop (N→N) – pop (into empty)', 0],
            ['pop (into empty) – push', 0], ['pop (into empty) – pop (error)', 1]
          ].map(([x, e], i) => html`<li key=${i} className=${e ? 'err' : ''}><b>${i + 1}</b>${x}</li>`)}</ol>
          <${Hand} red=${true}>${t('N = normal. Red = the three error pairs.', 'الـ N يعني normal. والأحمر هما الـ 3 error pairs.')}</${Hand}>
          <${Grow} />
          <${Talk} who="bug">${X('Pairs 1, 8 and 14 are my home: pop on empty, push on full.', 'الـ pairs رقم 1 و8 و14 دول بيتي: pop على فاضي، وpush على مليان.')}</${Talk}>
        `),

        // 33 · sort pairs
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Does the pair end in an <b>error</b>? <b>OK</b> or <b>ERR</b>.', 'الـ pair ده بيخلص بـ <b>error</b>؟ اختار <b>OK</b> أو <b>ERR</b>.')}</p></${Box}>
          <${Sort} id="fp" bins=${[['OK', t('No error', 'مفيش error')], ['ERR', 'error']]} items=${[
            ['<code>new – push</code>', 0], ['<code>new – pop</code>', 1], ['<code>push (from empty) – pop</code>', 0], ['<code>push (N→full) – push</code>', 1],
            ['<code>push (N→full) – pop</code>', 0], ['<code>pop (into empty) – pop</code>', 1], ['<code>pop (N→N) – push</code>', 0], ['<code>pop (into empty) – push</code>', 0]
          ]} />
        `),

        // 34 · lecture questions
        page(html`
          <${H2}>${t('The lecture\'s own four questions', 'الأربع أسئلة بتوع المحاضرة')}</${H2}>
          <${Dumb} qa=${A ? [
            ['الـ functional testing للـ OO بيتعمل إزاي؟', 'زي الـ conventional بالظبط: الـ test cases من الـ functionality المطلوبة في الـ requirements document.'],
            ['هل الـ statement coverage مفيد للـ OO؟', 'محدود: ممكن يتطبق، بس مابيختبرش الـ interactions بين الـ methods.'],
            ['هل الـ MM بيشمل (subsume) الـ statement coverage؟', '<b>لأ.</b> المحاضرة بتقول:<span class="ltr">"MM testing does not subsume every-statement coverage"</span>'],
            ['إيه ميزة الـ function pair coverage؟', 'بيختبر sequences من اتنين method executions، فبيمسك الـ interaction faults والـ state-dependent bugs (push على full، أو pop على empty) اللي الـ MM بيفوّتها.']
          ] : [
            ['How is functional testing of OO software done?', 'The same as conventional: test cases from the required functionality in the requirements document.'],
            ['Is statement coverage useful for OO?', 'Limited: it can be applied but does not test interactions between methods.'],
            ['Does MM subsume statement coverage?', '<b>No.</b> The lecture: "MM testing does not subsume every-statement coverage."'],
            ['Advantage of function pair coverage?', 'It tests sequences of two method executions, so it catches interaction faults and state-dependent bugs (push on full, pop on empty) that single-call MM misses.']
          ]} />
        `),

        // 34b · why pairs
        page(html`
          <${H2}>${t('Why bother with pairs?', 'ليه نتعب نفسنا بالـ pairs؟')}</${H2}>
          <${Box} kind="brain"><p className="hf-p small">${X('MM testing would call push and pop once each. Which of the three error pairs could it miss?', 'الـ MM testing هيعمل call لـ push وpop مرة واحدة لكل واحد. أنهي error pair من التلاتة ممكن يفوّته؟')}</p></${Box}>
          <${Talk} who="lens" flip=${true}>${X('All of them. That is FP\'s advantage: it catches <b>interaction faults</b> and <b>state-dependent bugs</b>.', 'كلهم. ودي ميزة الـ FP: بيمسك الـ <b>interaction faults</b> والـ <b>state-dependent bugs</b>.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The lec-4 <b>student summary</b> answers Q3 "Yes". That contradicts the slide: the answer is <b>No</b>. The exam asked it twice (summary MCQ and midterm): MM does not subsume <b>statement coverage</b>.',
            'الـ <b>student summary</b> بتاع lec-4 بيجاوب على Q3 بـ "Yes"، وده عكس الـ slide: الإجابة <b>لأ</b>. والامتحان سأله مرتين (الـ summary MCQ والميدترم): الـ MM مابيشملش الـ <b>statement coverage</b>.')}</p></${Box}>
        `),

        // 35 · match
        page(html`
          <${H2}>${t('Who does what?', 'مين بيعمل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Tap an idea, then what it means.', 'دوس على الفكرة، وبعدين على معناها.')}</${P}>
          <${Match} id="who" left=${A ? ['الـ MM testing', 'الـ FP testing', 'الـ V(G)', 'الـ Functional OO testing', 'الـ Verification', 'الـ Basis path'] : ['MM testing', 'FP testing', 'V(G)', 'Functional OO testing', 'Verification', 'Basis path']}
            right=${A ? ['زي الـ conventional: من الـ requirements document', 'كل method call مرة على الأقل', 'جنب الـ V الشمال، وهو نازل', 'كل sequence من اتنين method executions', 'path واحد من الـ independent paths، ولكل واحد test case', 'عدد الـ independent paths']
              : ['Same as conventional: from the requirements document', 'Every method call tested at least once', 'The left side of the V, going down', 'Every sequence of two method executions', 'One of the independent paths, each with a test case', 'The number of independent paths']}
            answer=${[1, 3, 5, 0, 2, 4]} />
        `),

        // 36–38 · exam corner (the doctors' questions)
        page(html`
          <${Box} kind="exam" title=${t("From the doctors' papers", 'من امتحانات الدكاترة')}><p className="hf-p small">${t('Real questions from the 2025/26 exam and the 2026/27 midterm. Tap an answer to see why.', 'أسئلة حقيقية من امتحان 2025/26 وميدترم 2026/27. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${mq('m1', /Cyclomatic Complexity equals/)}
          <${Grow} />
          <${Talk} who="lens">${X('Check it on foo(): 7 − 6 + 2 = 3.', 'جرّبها على الـ <code>foo()</code>: <bdi dir="ltr">7 − 6 + 2 = 3</bdi>.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /Cyclomatic Complexity is used to determine$/)}
          <${Grow} />
          <${Talk} who="bug">${X('This one also came in the summary MCQs, almost word for word. Asked twice, same answer.', 'السؤال ده جه كمان في الـ summary MCQs تقريبًا بالحرف. اتسأل مرتين، وإجابته واحدة.')}</${Talk}>
        `),
        page(html`
          ${mq('m3', /achieves method-message coverage in stack/)}
          ${mq('m4', /in Queue testing/)}
        `),
        page(html`
          ${mq('m5', /The method message testing does not subsume/)}
          <${Gap} h=${2} />
          ${mq('m6', /Function pair is used to test/)}
        `),

        // 39 · practice questions
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("These two are the site's own practice questions, not the doctors'.", 'دول سؤالين تدريب من الموقع، مش من امتحانات الدكاترة.')}</p></${Box}>
          ${pq('p1', /The triple \(0,1,0\) finally prints/)}
          <${Gap} h=${2} />
          ${pq('p2', /Since V\(G\) of foo\(\) is 3/)}
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),

        // 40 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'في الـ V-model: الشمال النازل <b>verification</b>، واليمين الطالع <b>validation</b>.',
            'الـ <b>V(G)</b> هي عدد الـ independent (basis) paths:<span class="ltr">V(G) = E − N + 2P = predicates + 1 = regions</span>',
            'الـ <code>foo()</code> فيها <bdi dir="ltr">7 − 6 + 2 = 3</bdi>، والـ paths هما <bdi dir="ltr">1,2,3,4,6</bdi> و <bdi dir="ltr">1,3,4,6</bdi> و <bdi dir="ltr">1,3,5,6</bdi>.',
            'الـ triangle فيه 3 subdomains (scalene وisosceles وequilateral) و2 error (bad inputs وnot a triangle). ‡ الـ (1,2,4) والـ (3,2,5) بيطبعوا not a triangle.',
            'من جدول الـ slide: الـ statement محتاجة 2 والـ branch محتاجة 3. ‡ ومع أي input: 1 و2.',
            'الـ Functional OO زي الـ conventional؛ والـ structural مختلف جدًا.',
            'الـ <b>MM</b> كل call مرة، ومابيشملش الـ statement coverage. وللـ stack: create وpush وpop.',
            'الـ <b>FP</b> كل sequence طولها اتنين من الـ state machine: 14 pair للـ stack.'
          ] : [
            'V-model: left going down = <b>verification</b>; right going up = <b>validation</b>.',
            '<b>V(G)</b> = number of independent (basis) paths = E − N + 2P = predicates + 1 = regions.',
            'foo(): 7 − 6 + 2 = 3; paths 1,2,3,4,6 · 1,3,4,6 · 1,3,5,6.',
            'Triangle: 3 subdomains (scalene, isosceles, equilateral) + 2 error (bad inputs, not a triangle). ‡ (1,2,4) and (3,2,5) print not a triangle.',
            'From the slide\'s table: statement 2 tests, branch 3. ‡ With any input: 1 and 2.',
            'Functional OO testing = conventional; structural is very different.',
            '<b>MM</b>: every call once; does not subsume statement coverage. Stack: create, push, pop.',
            '<b>FP</b>: every length-two sequence, from a state machine: 14 pairs for the stack.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 41 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 4!', 'خلّصت الفصل الرابع!')}</${H1}>
            <${Talk} who="lens">${t('Next time: testing a whole web site.', 'المرة الجاية: هنختبر web site كامل.')}</${Talk}>
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

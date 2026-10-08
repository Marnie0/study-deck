// Libraries come from cdnjs/jsdelivr with deferred script tags. If one of them failed to load,
// try a mirror before starting, and show a clear message if nothing works.
(function () {
  const MIRRORS = {
    React: ['https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js', 'https://unpkg.com/react@18.3.1/umd/react.production.min.js'],
    ReactDOM: ['https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js', 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js'],
    htm: ['https://unpkg.com/htm@3.1.1/dist/htm.umd.js', 'https://cdnjs.cloudflare.com/ajax/libs/htm/3.1.1/htm.umd.js']
  };
  const fail = () => { document.getElementById('root').innerHTML = '<p class="boot">The page couldn’t load its code. Check your internet connection, then refresh.</p>'; };
  const loadOne = (urls, i, done) => {
    if (i >= urls.length) return fail();
    const s = document.createElement('script'); s.src = urls[i];
    s.onload = done; s.onerror = () => { s.remove(); loadOne(urls, i + 1, done); };
    document.head.appendChild(s);
  };
  const missing = ['React', 'ReactDOM', 'htm'].filter(g => !window[g]);
  const next = () => { const g = missing.shift(); if (!g) return start(); loadOne(MIRRORS[g], 0, () => window[g] ? next() : fail()); };
  next();
})();

function start() {
  const { useState, useEffect, useLayoutEffect, useMemo, useRef, useCallback } = React;
  const html = htm.bind(React.createElement);
  const C = window.COURSES = window.COURSES || {};   // filled course by course as data/<id>.js files load
  const M = window.MANIFEST || {};                   // names and counts only, loaded up front
  const ORDER = [['compiler', 0], ['os', 0], ['mm', 0], ['qa', 0], ['hci', 1], ['fp', 1]].filter(([k]) => M[k]);
  const SPINE_H = { compiler: 318, os: 300, mm: 330, qa: 292, hci: 312, fp: 284 };
  const LET = 'ABCDEFGH';

  /* ── storage (same keys as the previous version, so progress carries over) ── */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('sd:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('sd:' + k, JSON.stringify(v)); } catch (e) {} }
  };
  function usePersist(key, init) {
    const [v, setV] = useState(() => store.get(key, init));
    useEffect(() => { store.set(key, v); window.dispatchEvent(new Event('sd-store')); }, [key, v]);
    return [v, setV];
  }

  /* ── data helpers ── */
  const strip = s => String(s == null ? '' : s).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const isExam = q => !!q.src && /^(exam|midterm)\b/i.test(q.src);
  const memo = {};
  const cardsOf = k => memo['c' + k] || (memo['c' + k] = C[k].lectures.flatMap(l => l.cards.map((x, i) => ({ id: l.n + '-' + i, f: x[0], b: x[1], lec: l.n }))));
  // where a question came from: the professor (past exam, revision sheet, lecture example), a student summary, or written for this site
  const originOf = q => q.xtra || !q.src ? 'extra' : /^(exam|midterm)\b/i.test(q.src) ? 'exam' : /sheet|revision/i.test(q.src) ? 'sheet' : /^lecture\b/i.test(q.src) ? 'lecture' : /summary/i.test(q.src) ? 'summary' : 'extra';
  const isProf = q => ['exam', 'sheet', 'lecture'].includes(originOf(q));
  const ORIGIN = { exam: ['Past exam', 'prof'], sheet: ["Professor's sheet", 'prof'], lecture: ['Lecture example', 'prof'], summary: ['Student summary', 'summary'], extra: ['Extra question', 'extra'] };
  const Source = ({ q }) => { const o = originOf(q), [label, cls] = ORIGIN[o]; return html`<span className=${'srcbadge ' + cls} title=${o === 'extra' ? 'Written for Study Deck from this lecture, not from the professor' : q.src}>${o === 'extra' ? label : (o === 'exam' || o === 'sheet' ? q.src : label)}</span>`; };
  const quizOf = k => memo['q' + k] || (memo['q' + k] = C[k].lectures.flatMap(l => l.quiz.map((x, i) => Object.assign({ id: l.n + '-' + i, lec: l.n }, x))
    .concat((l.extra || []).map((x, i) => Object.assign({ id: 'x' + l.n + '-' + i, lec: l.n, xtra: true }, x)))));
  const lecTitle = (k, n) => (M[k].lectures.find(l => l.n === n) || {}).title || '';
  const H = ({ h, as, className }) => React.createElement(as || 'span', { className, dangerouslySetInnerHTML: { __html: h == null ? '' : String(h) } });
  const pad = n => String(n).padStart(2, '0');
  const shortTitle = (t, n) => {
    if (t.length <= n) return t;
    const cut = t.slice(0, n), sp = cut.lastIndexOf(' ');
    return (sp > n * 0.5 ? cut.slice(0, sp) : cut).replace(/[\s,:;–—-]+$/, '') + '…';
  };

  function progressOf(k) {
    const cards = M[k].cards;
    const known = store.get('known:' + k, []).length;
    return { cards, known, pctKnown: cards ? Math.round(known / cards * 100) : 0, best: store.get('best:' + k, null), miss: store.get('miss:' + k, []).length,
      read: store.get('read:' + k, []).length, lectures: M[k].lectures.length, fixed: store.get('fixed:' + k, []).length, due: dueInfo(k, M[k].cards).total };
  }

  const calm = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ── study memory: spaced repetition for cards, answer history for questions ── */
  const NEW_PER_DAY = 20;
  const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
  // a small SM-2 style scheduler: Again resets, Hard grows slowly, Good multiplies by the card's ease
  function srsStep(prev, rating) {
    const s = Object.assign({ ivl: 0, ease: 2.5, reps: 0, lapses: 0 }, prev || {});
    if (rating === 0) { s.reps = 0; s.lapses += 1; s.ease = Math.max(1.3, s.ease - 0.2); s.ivl = 0; }
    else if (rating === 1) { s.ease = Math.max(1.3, s.ease - 0.15); s.ivl = s.reps === 0 ? 1 : Math.max(s.ivl + 1, Math.round(s.ivl * 1.2)); s.reps += 1; }
    else { s.ivl = s.reps === 0 ? 2 : s.reps === 1 ? 4 : Math.max(s.ivl + 1, Math.round(s.ivl * s.ease)); s.reps += 1; }
    s.due = today() + s.ivl;
    return s;
  }
  const ivlLabel = d => d <= 0 ? 'today' : d === 1 ? '1 day' : d < 30 ? d + ' days' : (d / 30).toFixed(d < 60 ? 1 : 0) + ' mo';
  function dueInfo(k, totalCards) {
    const srs = store.get('srs:' + k, {}), t = today(), log = store.get('srsnew:' + k, { day: 0, count: 0 });
    const ids = Object.keys(srs);
    const due = ids.filter(id => srs[id].due <= t).length;
    const fresh = Math.max(0, Math.min(NEW_PER_DAY - (log.day === t ? log.count : 0), totalCards - ids.length));
    return { due, fresh, total: due + fresh, seen: ids.length, tomorrow: ids.filter(id => srs[id].due === t + 1).length };
  }
  function recordAnswers(k, pairs) {
    const st = store.get('stats:' + k, {});
    pairs.forEach(([id, ok]) => { const v = st[id] || [0, 0]; v[ok ? 0 : 1] += 1; st[id] = v; });
    store.set('stats:' + k, st);
    const day = store.get('daily', {}), t = today(), d = day[t] || [0, 0];
    pairs.forEach(([, ok]) => { d[0] += ok ? 1 : 0; d[1] += 1; });
    day[t] = d; Object.keys(day).forEach(x => { if (+x < t - 60) delete day[x]; });
    store.set('daily', day);
  }
  const fmtClock = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

  /* ── Egyptian Arabic explanations, shown under the English when the reader switches them on ── */
  let LANG = 'en';
  const arOf = k => (LANG === 'ar' && window.AR && window.AR[k]) || null;
  const arLec = (k, n) => { const A = arOf(k); return (A && A.lectures && A.lectures[n]) || null; };
  const arQ = (k, q, j) => { const m = q && q.id && /^(x?)(\d+)-(\d+)$/.exec(q.id); const L = m && arLec(k, m[2]); const arr = L && (m[1] ? L.extra : L.quiz); return (arr && arr[+m[3]] && arr[+m[3]][j]) || null; };
  const arCard = (k, id) => { const m = /^(\d+)-(\d+)$/.exec(id || ''); const L = m && arLec(k, m[1]); return (L && L.cards && L.cards[+m[2]]) || null; };
  const Ar = ({ t, cls }) => t ? html`<span className=${'ar' + (cls ? ' ' + cls : '')} dir="rtl" lang="ar" dangerouslySetInnerHTML=${{ __html: t }}></span>` : null;
  const scriptOnce = {};
  const loadScript = src => scriptOnce[src] || (scriptOnce[src] = new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => { delete scriptOnce[src]; s.remove(); rej(); }; document.head.appendChild(s); }));
  const loadAr = k => (M[k] && M[k].ar && !(window.AR && window.AR[k])) ? loadScript('data/ar-' + k + '.js') : Promise.resolve();
  function arFont() {
    if (document.getElementById('ar-font')) return;
    const l = document.createElement('link'); l.id = 'ar-font'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600&display=swap';
    document.head.appendChild(l);
  }
  function LangButton({ lang, setLang }) {
    const on = lang === 'ar';
    return html`<button className=${'langbtn' + (on ? ' on' : '')} aria-pressed=${String(on)} onClick=${() => setLang(on ? 'en' : 'ar')}
      title=${on ? 'Hide the Arabic explanations' : 'Show Egyptian Arabic explanations under the English'}><span lang="ar">عربي</span></button>`;
  }

  /* ── tiny icons ── */
  const Icon = {
    search: html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>`,
    back: html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`,
    tick: html`<svg className="mark" viewBox="0 0 34 34" aria-label="correct"><path d="M6 18 L14 26 L29 6"/></svg>`,
    cross: html`<svg className="mark" viewBox="0 0 34 34" aria-label="your wrong answer"><path d="M8 8 L26 26 M26 8 L8 26"/></svg>`
  };

  /* ── course data loads on demand ── */
  const pending = {};
  function loadCourse(k) {
    if (C[k]) return Promise.resolve();
    return pending[k] || (pending[k] = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'data/' + k + '.js';
      s.onload = () => C[k] ? resolve() : reject(new Error('empty'));
      s.onerror = () => { delete pending[k]; s.remove(); reject(new Error('network')); };
      document.head.appendChild(s);
    }));
  }
  const prefetch = k => { loadCourse(k).catch(() => {}); };
  function useCourse(k) {
    const [state, setState] = useState(C[k] ? 'ready' : 'loading');
    const [attempt, setAttempt] = useState(0);
    useEffect(() => {
      if (C[k]) { setState('ready'); return; }
      let live = true; setState('loading');
      loadCourse(k).then(() => live && setState('ready'), () => live && setState('error'));
      return () => { live = false; };
    }, [k, attempt]);
    return [state, () => setAttempt(a => a + 1)];
  }

  /* ── light / dark ── */
  const darkMQ = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function currentDark() {
    const t = document.documentElement.getAttribute('data-theme');
    return t ? t === 'dark' : !!(darkMQ && darkMQ.matches);
  }
  function useTheme() {
    const [dark, setDark] = useState(currentDark);
    useEffect(() => {
      if (!darkMQ) return;
      const onChange = () => setDark(currentDark());
      darkMQ.addEventListener ? darkMQ.addEventListener('change', onChange) : darkMQ.addListener(onChange);
      return () => { darkMQ.removeEventListener ? darkMQ.removeEventListener('change', onChange) : darkMQ.removeListener(onChange); };
    }, []);
    const toggle = ev => {
      const next = currentDark() ? 'light' : 'dark';
      const apply = () => { document.documentElement.setAttribute('data-theme', next); store.set('theme', next); ReactDOM.flushSync(() => setDark(next === 'dark')); };
      const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || calm || !ev || !ev.currentTarget) return apply();
      const r = ev.currentTarget.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      const st = document.documentElement.style;
      st.setProperty('--vx', x + 'px'); st.setProperty('--vy', y + 'px');
      st.setProperty('--vr', Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 'px');
      document.documentElement.classList.add('vt-theme');
      const vt = document.startViewTransition(apply);
      vt.finished.finally(() => document.documentElement.classList.remove('vt-theme'));
    };
    return { dark, toggle };
  }
  function LampButton({ theme, compact }) {
    const label = theme.dark ? 'Switch to light mode' : 'Switch to dark mode';
    return html`<button className=${'lamp' + (theme.dark ? ' off' : '') + (compact ? ' compact' : '')} onClick=${theme.toggle} aria-label=${label} title=${label}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path className="shade" d="M8.5 3.5h7l2.8 6.5H5.7z"/>
        <path className="stem" d="M12 10v8.5M7.5 20.5h9"/>
        <path className="rays" d="M8 13l-1.6 2.6M12 13.2v3M16 13l1.6 2.6"/>
      </svg>
      ${!compact && html`<span>${theme.dark ? 'Light' : 'Dark'}</span>`}
    </button>`;
  }

  const TAB_ICONS = {
    read: 'M5 4h11l3 3v13H5zM8 9h8M8 13h8M8 17h5',
    cards: 'M4 7h13v12H4zM7 4h13v12',
    ask: 'M4 5h16v11H9l-5 4zM9 9h6M9 12h4',
    quiz: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM8.5 12.5l2.4 2.4 4.6-5',
    papers: 'M6 3h12v18H6zM9 7h6M9 11h6M9 15h3',
    progress: 'M4 20h16M7 20v-6M12 20V7M17 20v-9'
  };
  const SHORT_TAB = { read: 'Notes', cards: 'Cards', ask: 'Q&A', quiz: 'Quiz', papers: 'Papers', progress: 'Progress' };

  /* ════════════ APP ════════════ */
  function App() {
    const [nav, setNav] = useState(() => {
      const hash = decodeURIComponent(location.hash.slice(1));
      if (M[hash]) return { view: 'course', course: hash, mode: 'path' };
      const saved = store.get('nav2', null);
      if (saved && (saved.view === 'shelf' || M[saved.course])) return saved;
      return { view: 'shelf' };
    });
    const [searching, setSearching] = useState(false);
    const theme = useTheme();
    const [lang, setLang] = usePersist('lang', 'en');
    LANG = lang;
    const [, setArTick] = useState(0);
    useEffect(() => {
      if (lang !== 'ar') return;
      arFont();
      if (nav.view === 'course' && M[nav.course]) loadAr(nav.course).then(() => setArTick(t => t + 1), () => {});
    }, [lang, nav.view, nav.course]);
    const navRef = useRef(nav); navRef.current = nav;
    // big moves (screen, course, tab, lecture) cross-fade with the View Transitions API where available
    const navigate = useCallback(next => {
      const cur = navRef.current, n = typeof next === 'function' ? next(cur) : next;
      const big = ['view', 'course', 'mode', 'lec'].some(key => n[key] !== cur[key]);
      if (big && document.startViewTransition && !calm() && !document.querySelector('.bookmode')) document.startViewTransition(() => ReactDOM.flushSync(() => setNav(n)));
      else setNav(n);
    }, []);
    const go = useCallback(patch => navigate(n => Object.assign({}, n, patch)), []);

    useEffect(() => {
      // warm up the course you were last studying while the browser is idle
      const last = store.get('last', null);
      if (!last || !M[last.course] || C[last.course]) return;
      const idle = window.requestIdleCallback || (f => setTimeout(f, 1200));
      idle(() => prefetch(last.course));
    }, []);

    useEffect(() => {
      const keep = { view: nav.view, course: nav.course, mode: nav.mode, lec: nav.lec };
      store.set('nav2', keep);
      if (nav.view === 'course') store.set('last', keep);
      if (nav.view === 'course' && typeof nav.lec === 'number') store.set('lastlec:' + nav.course, nav.lec);
      document.body.dataset.course = nav.view === 'course' ? nav.course : '';
    }, [nav.view, nav.course, nav.mode, nav.lec]);

    useEffect(() => {
      const onKey = e => {
        const typing = e.target.matches && e.target.matches('input, textarea, select');
        if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) { e.preventDefault(); setSearching(true); }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, []);

    const [, setStoreTick] = useState(0);
    useEffect(() => { const f = () => setStoreTick(t => t + 1); window.addEventListener('sd-store', f); return () => window.removeEventListener('sd-store', f); }, []);
    const openSearch = () => setSearching(true);
    const inCourse = nav.view === 'course' && M[nav.course];
    const bar = { go, openSearch, theme, lang, setLang };

    return html`
      <div className="app">
        ${inCourse
          ? html`<${CourseView} key=${nav.course} nav=${nav} bar=${bar} />`
          : html`<${Home} bar=${bar} />`}
      </div>
      ${searching && html`<${Search} close=${() => setSearching(false)} go=${p => { setSearching(false); navigate(p); }} />`}
    `;
  }

  /* ════════════ TOP BAR ════════════ */
  const lastLec = k => { const n = store.get('lastlec:' + k, null); return M[k].lectures.some(l => l.n === n) ? n : undefined; };
  function Topbar({ bar, cur, children }) {
    const { go, openSearch, theme, lang, setLang } = bar;
    const open = k => k === cur ? go({ mode: 'path' }) : go({ view: 'course', course: k, mode: 'path', lec: lastLec(k), anchor: null, quizPreset: null, cardFocus: null, cardLec: null });
    return html`<header className="topbar">
      <button className="brand" onClick=${() => go({ view: 'shelf' })} aria-label="Study Deck home"><span className="logo" aria-hidden="true">S</span><b>Study Deck</b></button>
      <nav className="cpills" aria-label="Courses">${ORDER.map(([k]) => html`<button key=${k} className=${'cpill sp-' + k} aria-current=${String(k === cur)} onMouseEnter=${() => prefetch(k)} onClick=${() => open(k)}><i aria-hidden="true"></i>${M[k].short}</button>`)}</nav>
      <div className="tb-tools">
        <button className="tb-search" onClick=${openSearch} aria-label="Search">${Icon.search}<span>Search</span><kbd>/</kbd></button>
        <${LangButton} lang=${lang} setLang=${setLang} />
        <${LampButton} theme=${theme} compact=${true} />
      </div>
      ${children}
    </header>`;
  }

  /* ════════════ HOME: bento tiles ════════════ */
  const lecOfId = id => { const m = /^x?(\d+)-/.exec(id); return m ? +m[1] : null; };
  function Home({ bar }) {
    const { go, openSearch, lang, setLang } = bar;
    const last = store.get('last', null);
    const rows = ORDER.map(([k, el]) => Object.assign({ k, el }, progressOf(k)));
    const sum = rows.reduce((a, r) => { a.due += r.due; a.read += r.read; a.lec += r.lectures; a.known += r.known; a.cards += r.cards; return a; }, { due: 0, read: 0, lec: 0, known: 0, cards: 0 });
    const h = new Date().getHours();
    const greet = h < 5 ? 'Up late' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    const t = today(), daily = store.get('daily', {});
    const week = [6, 5, 4, 3, 2, 1, 0].map(d => { const v = daily[t - d] || [0, 0]; return { d: t - d, r: v[0], n: v[1] }; });
    const wk = week.reduce((a, x) => ({ r: a.r + x.r, n: a.n + x.n }), { r: 0, n: 0 });
    const ever = ORDER.reduce((a, [k]) => { Object.values(store.get('stats:' + k, {})).forEach(v => { a.r += v[0]; a.n += v[0] + v[1]; }); return a; }, { r: 0, n: 0 });
    const acc = wk.n ? wk : ever;
    const maxN = Math.max(1, ...week.map(x => x.n));
    const weak = ORDER.flatMap(([k]) => {
      const g = {}; store.get('miss:' + k, []).forEach(id => { const n = lecOfId(id); if (n != null) (g[n] = g[n] || []).push(id); });
      return Object.keys(g).map(n => ({ k, n: +n, ids: g[n] }));
    }).sort((a, b) => b.ids.length - a.ids.length).slice(0, 3);
    const dueTop = rows.filter(r => r.due).sort((a, b) => b.due - a.due)[0];
    const papers = ORDER.reduce((a, [k]) => a + (M[k].exams || 0), 0);
    const paperCourse = last && M[last.course] ? last.course : ORDER[0][0];
    const cont = last && M[last.course] ? last : null;
    const contPct = !cont ? 0 : cont.mode === 'read' && typeof cont.lec === 'number' && store.get('posf:' + cont.course + ':' + cont.lec, null) != null
      ? Math.round(store.get('posf:' + cont.course + ':' + cont.lec, 0) * 100)
      : Math.round(progressOf(cont.course).read / Math.max(1, M[cont.course].lectures.length) * 100);
    const contWhat = !cont ? '' : cont.mode === 'read' && typeof cont.lec === 'number' ? 'of this lecture read' : 'of the course read';
    const modeName = { path: 'Path', read: 'Notes', cards: 'Cards', ask: 'Q&A', quiz: 'Quiz', papers: 'Past papers', progress: 'Progress', miss: 'Progress' };
    const openCourse = (k, extra) => { go(Object.assign({ view: 'course', course: k, mode: 'path', lec: lastLec(k), anchor: null, quizPreset: null, cardFocus: null, cardLec: null }, extra || {})); window.scrollTo(0, 0); };
    const dayLetter = d => 'SMTWTFS'[new Date(d * 86400000).getUTCDay()];
    return html`<div className="page home-page">
      <${Topbar} bar=${bar} cur=${null} />
      <main className="content home">
        <div className="hello">
          <div><h1>${greet}</h1><p>Level 3 · Semester 1 · ${ORDER.length} courses, ${sum.lec} lectures</p></div>
          <button className="hsearch" onClick=${openSearch}>${Icon.search}<span>Search notes, cards, past papers…</span><kbd>/</kbd></button>
        </div>
        <div className="bento">
          ${cont ? html`<button className=${'tile t-cont sp-' + cont.course} onMouseEnter=${() => prefetch(cont.course)} onClick=${() => go(Object.assign({}, cont, { view: 'course' }))}>
              <span className="ring" style=${{ '--p': contPct }} aria-hidden="true"><i>${contPct}%</i></span>
              <span className="tc-text"><span className="tl">Continue · ${modeName[cont.mode] || 'Notes'}</span>
                <b className="tc-title">${typeof cont.lec === 'number' ? lecTitle(cont.course, cont.lec) : cont.lec === 'rev' ? 'Revision sheet' : M[cont.course].name}</b>
                <span className="tc-sub">${M[cont.course].name}${typeof cont.lec === 'number' ? ' · Lecture ' + cont.lec : ''} · ${contPct}% ${contWhat}</span>
                <span className="tgo">Resume →</span></span>
            </button>`
          : html`<button className="tile t-cont" onClick=${() => openCourse(ORDER[0][0])}>
              <span className="ring" style=${{ '--p': 0 }} aria-hidden="true"><i>0%</i></span>
              <span className="tc-text"><span className="tl">Start here</span><b className="tc-title">Pick a course and follow its path</b>
                <span className="tc-sub">Each lecture is a stop: read the notes, flip the cards, pass the quiz.</span><span className="tgo">Open ${M[ORDER[0][0]].name} →</span></span>
            </button>`}
          <button className="tile t-due" disabled=${!dueTop} onClick=${() => dueTop && openCourse(dueTop.k, { mode: 'cards', cardsAuto: Date.now() })}>
            <span className="tl">Cards due today</span><b className="big">${sum.due}</b>
            <span className="tsub">${dueTop ? 'Start with ' + M[dueTop.k].short + ' (' + dueTop.due + ') →' : 'All caught up'}</span>
            <span className="stk" aria-hidden="true"><i></i><i></i><i></i></span>
          </button>
          <div className="tile t-acc">
            <span className="tl">${wk.n ? 'Quiz accuracy · last 7 days' : 'Quiz accuracy'}</span>
            <b className="big">${acc.n ? Math.round(acc.r / acc.n * 100) + '%' : '–'}</b>
            <span className="tsub">${wk.n ? wk.n + ' answers this week' : ever.n ? ever.n + ' answers so far' : 'No answers yet'}</span>
            <span className="bars" aria-label="Answers per day, last 7 days">${week.map(x => html`<span key=${x.d} title=${x.n + ' answers, ' + x.r + ' right'}><b><i style=${{ height: (x.n ? Math.max(12, x.n / maxN * 100) : 5) + '%', opacity: x.n ? 1 : .35 }}></i></b><em>${dayLetter(x.d)}</em></span>`)}</span>
          </div>
          <div className="t-courses">${rows.map(r => html`<button key=${r.k} className=${'tile t-course sp-' + r.k} onMouseEnter=${() => prefetch(r.k)} onClick=${() => openCourse(r.k)}>
            <span className="tcn"><b>${M[r.k].short}</b>${r.due ? html`<em>${r.due} due</em>` : null}</span>
            <span className="tcs">${M[r.k].code}${r.el ? ' · Elective' : ''}</span>
            <span className="dots" aria-hidden="true">${M[r.k].lectures.map(l => html`<i key=${l.n} className=${store.get('read:' + r.k, []).includes(l.n) ? 'f' : ''}></i>`)}</span>
            <span className="tcs">${r.read} of ${r.lectures} lectures read</span>
          </button>`)}</div>
          <div className="tile t-weak">
            <span className="tl">Weak spots, from your mistakes</span>
            ${weak.length ? html`<ul>${weak.map(w => html`<li key=${w.k + w.n}><button className=${'sp-' + w.k} onClick=${() => openCourse(w.k, { mode: 'quiz', lec: w.n, quizPreset: { ids: w.ids, t: Date.now(), from: 'home' } })}>
                <i aria-hidden="true"></i><span>${M[w.k].short} · L${w.n} ${shortTitle(lecTitle(w.k, w.n), 40)}</span><em>${w.ids.length} to fix</em></button></li>`)}</ul>`
              : html`<p className="tempty">Questions you get wrong collect here, grouped by lecture, so you know what to fix before the exam.</p>`}
          </div>
          <button className="tile t-papers" onClick=${() => openCourse(paperCourse, { mode: 'papers' })}>
            <span className="tl">Solved past papers</span><b className="big">${papers}</b><span className="tsub">Every answer explained · open ${M[paperCourse].short} →</span>
          </button>
          <button className=${'tile t-ar' + (lang === 'ar' ? ' on' : '')} aria-pressed=${String(lang === 'ar')} onClick=${() => setLang(lang === 'ar' ? 'en' : 'ar')}>
            <span className="tl">Explanations</span><b className="big" lang="ar">بالعربي</b>
            <span className="tsub">${lang === 'ar' ? 'On: Egyptian Arabic under each answer' : 'Off: tap to show Egyptian Arabic'}</span>
          </button>
        </div>
        <p className="foot">Built from the course slides, revision sheets and past papers on the MA Platform. Where an official answer key disagrees with the lectures, both are shown. Progress is saved in this browser only.</p>
      </main>
    </div>`;
  }

  /* ════════════ COURSE ════════════ */
  function CourseView({ nav, bar }) {
    const { go } = bar;
    const k = nav.course, c = M[k];
    const [status, retry] = useCourse(k);
    const [known, setKnown] = usePersist('known:' + k, []);
    const [miss, setMiss] = usePersist('miss:' + k, []);
    const [fixed, setFixed] = usePersist('fixed:' + k, []);
    const [best, setBest] = usePersist('best:' + k, null);
    const [read, setRead] = usePersist('read:' + k, []);
    const barRef = useRef(null);
    const mode = nav.mode === 'miss' ? 'progress' : (nav.mode || 'path');
    // with no lecture chosen, the path points at the first lecture you haven't read
    const lecN = nav.lec === 'rev' ? 'rev' : c.lectures.some(l => l.n === nav.lec) ? nav.lec : ((c.lectures.find(l => !read.includes(l.n)) || c.lectures[0]).n);

    useEffect(() => { if (!nav.anchor) window.scrollTo(0, 0); }, [mode]);

    const modes = [
      ['path', 'Path', null],
      ['read', 'Notes', c.lectures.length],
      ['cards', 'Cards', c.cards],
      ['ask', 'Q&A', c.qa],
      ['quiz', 'Quiz', c.quiz],
      ['papers', 'Past papers', c.exams],
      ['progress', 'Progress', miss.length || null]
    ];
    return html`<div className="page">
      <${Topbar} bar=${bar} cur=${k}><div className="readbar" hidden=${mode !== 'read' || status !== 'ready' || lecN === 'rev'}><i ref=${barRef}></i></div></${Topbar}>
      <section className=${'band' + (mode === 'path' ? ' tall' : '')}>
        <div className="band-in">
          <div className="band-top">
            <div className="band-id">
              <p className="band-k">${c.code} · ${ORDER.find(o => o[0] === k)[1] ? 'Elective' : 'Core course'}</p>
              <h1>${c.name}</h1>
              <p className="band-by">${c.by}</p>
            </div>
            <div className="band-stats">
              <div><b>${read.length}<em>/${c.lectures.length}</em></b><span>lectures read</span></div>
              <div><b>${known.length}<em>/${c.cards}</em></b><span>cards known</span></div>
              <div><b>${best == null ? '–' : best + '%'}</b><span>best quiz</span></div>
            </div>
          </div>
          <nav className="ctabs" role="tablist" aria-label="Course sections">
            ${modes.map(([id, label, n]) => html`<button key=${id} role="tab" className="ctab" aria-selected=${String(mode === id)}
              onClick=${() => go({ mode: id, anchor: null, quizPreset: null, cardFocus: null, cardLec: null })}>${label}${n != null ? html`<span className="n">${n}</span>` : null}</button>`)}
          </nav>
        </div>
      </section>
      <main className=${'content course m-' + mode}>
        ${status === 'loading' && html`<div className="paper loadsheet" aria-busy="true"><span className="pen">Opening ${c.name}…</span><i></i><i></i><i></i></div>`}
        ${status === 'error' && html`<div className="paper empty"><span className="pen">Couldn't load this course.</span>Check your internet connection, then try again.<div style=${{ marginTop: '14px' }}><button className="btn" onClick=${retry}>Try again</button></div></div>`}
        ${status === 'ready' && html`<${CourseBody} k=${k} mode=${mode} nav=${nav} go=${go} lecN=${lecN} known=${known} setKnown=${setKnown} miss=${miss} setMiss=${setMiss} fixed=${fixed} setFixed=${setFixed} best=${best} setBest=${setBest} read=${read} setRead=${setRead} barRef=${barRef} onSection=${() => {}} />`}
      </main>
    </div>`;
  }

  /* ════════════ PATH: each lecture is a stop ════════════ */
  function PathView({ k, lecN, go, read, known }) {
    const c = C[k], stats = store.get('stats:' + k, {}), knownSet = new Set(known);
    const stops = c.lectures.map(l => ({ n: l.n, t: l.title, done: read.includes(l.n) })).concat([{ n: 'rev', t: 'Revision sheet', done: false, last: true }]);
    const N = stops.length;
    const pts = stops.map((s, i) => ({ x: 7 + i * 86 / Math.max(1, N - 1), y: i % 2 ? 32 : 64 }));
    const lastDone = stops.reduce((a, s, i) => s.done ? i : a, -1);
    const line = arr => arr.map((p, i) => (i ? 'L' : 'M') + (p.x * 10).toFixed(1) + ' ' + (p.y * 2.4).toFixed(1)).join(' ');
    const sel = (key, s) => go({ lec: s.n });
    const l = lecN === 'rev' ? null : c.lectures.find(x => x.n === lecN);
    let detail;
    if (!l) {
      detail = html`<div className="stop">
        <div className="st-info"><p className="eyebrow">Last stop</p><h2>Revision sheet</h2><p>Every key term, formula and past-paper answer in one place, for the night before the exam.</p></div>
        <button className="step go" onClick=${() => go({ mode: 'read', lec: 'rev', anchor: null })}><span className="sn">1</span><b>Open the revision sheet</b><span>All ${c.lectures.length} lectures</span><em>Open →</em></button>
        <button className="step" onClick=${() => go({ mode: 'quiz' })}><span className="sn">2</span><b>Timed mock exam</b><span>Past-exam questions first</span><em>Set it up →</em></button>
      </div>`;
    } else {
      const cardIds = l.cards.map((_, i) => l.n + '-' + i), kn = cardIds.filter(id => knownSet.has(id)).length;
      const qs = quizOf(k).filter(q => q.lec === l.n);
      let r = 0, w = 0; qs.forEach(q => { const v = stats[q.id]; if (v) { r += v[0]; w += v[1]; } });
      const att = r + w, acc = att ? Math.round(r / att * 100) : null;
      const isRead = read.includes(l.n), cardsDone = cardIds.length > 0 && kn === cardIds.length, quizDone = att >= 5 && acc >= 70;
      const nextStep = [isRead, cardsDone, quizDone].indexOf(false);
      const examQs = l.quiz.filter(isExam).length;
      const steps = [
        ['Read the notes', l.notes.length + ' sections · ' + minutesFor(l) + ' min', isRead ? '✓ Read' : 'Start →', () => go({ mode: 'read', lec: l.n, anchor: null })],
        ['Flip the cards', kn + ' of ' + cardIds.length + ' known', cardsDone ? '✓ All known' : 'Open →', () => go({ mode: 'cards', cardLec: l.n, cardFocus: null })],
        ['Take the quiz', qs.length + ' questions' + (acc != null ? ' · ' + acc + '% so far' : ''), quizDone ? '✓ Passed' : '70% to pass →', () => go({ mode: 'quiz', quizPreset: { lecs: [l.n], t: Date.now(), from: 'path' } })]
      ];
      detail = html`<div className="stop">
        <div className="st-info"><p className="eyebrow">Lecture ${l.n} of ${c.lectures.length}${isRead ? ' · read' : ''}</p><h2>${cleanTitle(l.title)}</h2>
          <p>${examQs ? examQs + ' past-exam question' + (examQs > 1 ? 's come' : ' comes') + ' from this lecture. ' : ''}${l.qa.length ? html`<button className="linkbtn" onClick=${() => go({ mode: 'ask', askLec: l.n })}>Practise its ${l.qa.length} Q&A →</button>` : null}</p></div>
        ${steps.map(([t, sub, st, fn], i) => html`<button key=${i} className=${'step' + (i === nextStep ? ' go' : '') + ([isRead, cardsDone, quizDone][i] ? ' done' : '')} onClick=${fn}>
          <span className="sn">${[isRead, cardsDone, quizDone][i] ? '✓' : i + 1}</span><b>${t}</b><span>${sub}</span><em>${st}</em></button>`)}
      </div>`;
    }
    return html`<section className="path" aria-label="Lecture path">
      <div className="map">
        <svg className="map-line" viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
          <path d=${line(pts)} className="mp-todo" />
          ${lastDone >= 0 && html`<path d=${line(pts.slice(0, lastDone + 1))} className="mp-done" />`}
        </svg>
        ${stops.map((s, i) => html`<button key=${s.n} className=${'node' + (s.done ? ' done' : '') + (s.n === lecN ? ' cur' : '') + (i % 2 ? ' up' : '')} style=${{ left: pts[i].x + '%', top: (pts[i].y) + '%' }}
          onClick=${() => sel(i, s)} aria-current=${s.n === lecN ? 'step' : null} title=${s.t}>
          <span className="dot">${s.last ? '★' : s.done ? '✓' : s.n}</span><span className="nl">${s.last ? 'Revision' : shortTitle(cleanTitle(s.t), 24)}</span></button>`)}
      </div>
      <ol className="map-v">${stops.map((s, i) => html`<li key=${s.n}><button className=${'vnode' + (s.done ? ' done' : '') + (s.n === lecN ? ' cur' : '')} onClick=${() => sel(i, s)} aria-current=${s.n === lecN ? 'step' : null}>
        <span className="dot">${s.last ? '★' : s.done ? '✓' : s.n}</span><span>${s.last ? 'Revision sheet' : cleanTitle(s.t)}</span></button></li>`)}</ol>
      ${detail}
    </section>`;
  }

  function CourseBody({ k, mode, nav, go, lecN, known, setKnown, miss, setMiss, fixed, setFixed, best, setBest, read, setRead, barRef, onSection }) {
    return html`
        ${mode === 'path' && html`<${PathView} k=${k} lecN=${lecN} go=${go} read=${read} known=${known} />`}
        ${mode === 'read' && lecN === 'rev' && html`<${RevisionSheet} k=${k} go=${go} read=${read} onSection=${onSection} />`}
        ${mode === 'read' && lecN !== 'rev' && html`<${Read} k=${k} lecN=${lecN} anchor=${nav.anchor} go=${go} read=${read} setRead=${setRead} barRef=${barRef} onSection=${onSection} />`}
        ${mode === 'cards' && html`<${Cards} k=${k} focus=${nav.cardFocus} startLec=${nav.cardLec} auto=${nav.cardsAuto} go=${go} known=${known} setKnown=${setKnown} />`}
        ${mode === 'ask' && html`<${Ask} k=${k} startLec=${nav.askLec} />`}
        ${mode === 'quiz' && html`<${Quiz} k=${k} preset=${nav.quizPreset} go=${go} miss=${miss} setMiss=${setMiss} setFixed=${setFixed} best=${best} setBest=${setBest} />`}
        ${mode === 'papers' && html`<${Papers} k=${k} />`}
        ${mode === 'progress' && html`<${Progress} k=${k} miss=${miss} setMiss=${setMiss} fixed=${fixed} setFixed=${setFixed} read=${read} known=${known} best=${best} go=${go} />`}
    `;
  }

  function LecFilter({ k, value, onChange, multi, scroll }) {
    const c = C[k];
    const isOn = n => multi ? (value === 'all' ? false : value.includes(n)) : value === n;
    const toggle = n => {
      if (!multi) return onChange(n);
      const cur = value === 'all' ? [] : value;
      const next = cur.includes(n) ? cur.filter(x => x !== n) : cur.concat(n);
      onChange(next.length ? next : 'all');
    };
    return html`<div className=${'filters' + (scroll ? ' scroller' : '')} role="group" aria-label="Filter by lecture">
      <button className="fchip" aria-pressed=${String(value === 'all')} onClick=${() => onChange('all')}>All lectures</button>
      ${c.lectures.map(l => html`<button key=${l.n} className="fchip" aria-pressed=${String(isOn(l.n))} title=${l.title} onClick=${() => toggle(l.n)}>
        <span className="l">L${l.n}</span>${shortTitle(l.title, 28)}</button>`)}
    </div>`;
  }

  /* ════════════ NOTES ════════════ */
  const READ_SIZES = [['s', 'Smaller text', 14], ['m', 'Medium text', 16.5], ['l', 'Larger text', 19]];
  const minutesFor = lec => {
    const words = lec.notes.reduce((a, s) => a + strip([].concat(s.pts || [], (s.table || []).flat(), s.formula || [], s.code || []).join(' ')).split(' ').length, 0);
    return Math.max(1, Math.round(words / 180));
  };

  function Read({ k, lecN, anchor, go, read, setRead, barRef, onSection }) {
    const c = C[k];
    const idx = c.lectures.findIndex(l => l.n === lecN);
    const lec = c.lectures[idx];
    const pageRef = useRef(null);
    const armed = useRef(false);
    const [prefs, setPrefs] = usePersist('readprefs', { size: 'm', hl: true, focus: false });
    const [active, setActive] = useState(0);
    const [resumed, setResumed] = useState(false);
    const titles = useMemo(() => lec.notes.map(s => strip(s.h)), [k, lec.n]);
    const mins = useMemo(() => minutesFor(lec), [k, lec.n]);
    const isRead = read.includes(lec.n);
    const arL = arLec(k, lec.n);
    const toggleRead = () => setRead(r => r.includes(lec.n) ? r.filter(x => x !== lec.n) : r.concat(lec.n));
    const setPref = patch => setPrefs(p => Object.assign({}, p, patch));
    const posKey = 'pos:' + k + ':' + lec.n;
    const [book, setBook] = usePersist('bookopen', false);
    const chapter = useMemo(() => ({
      id: 'L' + lec.n, kicker: 'Lecture ' + lec.n + ' · ' + c.short, title: cleanTitle(lec.title), runTitle: splitTitle(lec.title)[0], sections: titles.map((t, i) => (i + 1) + ' · ' + t),
      content: bookLecture(c, lec),
      next: idx < c.lectures.length - 1 ? () => go({ lec: c.lectures[idx + 1].n }) : null, nextId: idx < c.lectures.length - 1 ? 'L' + c.lectures[idx + 1].n : null,
      prev: idx > 0 ? () => go({ lec: c.lectures[idx - 1].n }) : null, prevId: idx > 0 ? 'L' + c.lectures[idx - 1].n : null
    }), [k, lec.n]);
    const closeBook = sec => {
      setBook(false);
      requestAnimationFrame(() => { const el = document.getElementById('sec-' + lec.n + '-' + sec); if (el) el.scrollIntoView({ block: 'start' }); });
    };

    // progress bar + remembering where you stopped: one passive listener, painted with transform, no re-render while scrolling
    useEffect(() => {
      let frame = 0, lastSave = 0;
      const paint = () => {
        frame = 0;
        const el = pageRef.current, bar = barRef && barRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (bar) bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / Math.max(1, r.height))).toFixed(4) + ')';
        const now = Date.now();
        if (armed.current && now - lastSave > 700) { lastSave = now; store.set(posKey, Math.max(0, Math.round(-r.top))); store.set('posf:' + k + ':' + lec.n, Math.min(1, Math.max(0, (innerHeight - r.top) / Math.max(1, r.height)))); }
      };
      const onScroll = () => { if (!frame) frame = requestAnimationFrame(paint); };
      paint();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
    }, [lec.n]);

    // reopen a lecture where you stopped (unless you arrived from search at a specific section)
    useEffect(() => {
      armed.current = false; setResumed(false);
      const y = anchor ? 0 : store.get(posKey, 0);
      const t = requestAnimationFrame(() => {
        if (y > 400 && pageRef.current) {
          window.scrollTo(0, pageRef.current.getBoundingClientRect().top + window.scrollY + y);
          setResumed(true);
        }
        setTimeout(() => { armed.current = true; }, 400);
      });
      return () => cancelAnimationFrame(t);
    }, [lec.n]);

    useEffect(() => {
      if (!anchor) return;
      const el = document.getElementById(anchor);
      if (el) { el.scrollIntoView({ block: 'start' }); el.classList.remove('flash-target'); void el.offsetWidth; el.classList.add('flash-target'); }
      go({ anchor: null });
    }, [anchor]);

    // which section is on screen
    useEffect(() => {
      setActive(0);
      if (!('IntersectionObserver' in window)) return;
      const seen = new Set();
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => e.isIntersecting ? seen.add(+e.target.dataset.i) : seen.delete(+e.target.dataset.i));
        if (seen.size) setActive(Math.min.apply(null, [...seen]));
      }, { rootMargin: '-96px 0px -55% 0px' });
      lec.notes.forEach((_, i) => { const el = document.getElementById('sec-' + lec.n + '-' + i); if (el) io.observe(el); });
      return () => io.disconnect();
    }, [lec.n]);
    useEffect(() => { onSection && onSection({ lec: lec.n, title: lec.title, sec: active, secTitle: titles[active] || '' }); }, [lec.n, active]);
    useEffect(() => () => onSection && onSection(null), []);

    // focus mode hides the course header and tabs as well
    useEffect(() => {
      document.body.classList.toggle('focus-read', !!prefs.focus);
      return () => document.body.classList.remove('focus-read');
    }, [prefs.focus]);

    const jump = i => {
      const at = Math.max(0, Math.min(lec.notes.length - 1, i));
      const el = document.getElementById('sec-' + lec.n + '-' + at);
      if (el) { setActive(at); el.scrollIntoView({ behavior: calm() ? 'auto' : 'smooth', block: 'start' }); }
    };
    const openLec = n => { go({ lec: n }); window.scrollTo(0, 0); };
    const sizeAt = READ_SIZES.findIndex(x => x[0] === prefs.size);

    useEffect(() => {
      const onKey = e => {
        if (e.target.matches && e.target.matches('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey || document.querySelector('.scrim, .bookmode')) return;
        const key = e.key;
        if (key === 'b') setBook(true);
        else if (key === 'j') jump(active + 1);
        else if (key === 'k') jump(active - 1);
        else if (key === 'ArrowRight' && idx < c.lectures.length - 1) openLec(c.lectures[idx + 1].n);
        else if (key === 'ArrowLeft' && idx > 0) openLec(c.lectures[idx - 1].n);
        else if (key === 'f') setPref({ focus: !prefs.focus });
        else if (key === 'Escape' && prefs.focus) setPref({ focus: false });
        else if (key === '+' || key === '=') setPref({ size: READ_SIZES[Math.min(2, sizeAt + 1)][0] });
        else if (key === '-') setPref({ size: READ_SIZES[Math.max(0, sizeAt - 1)][0] });
        else return;
        e.preventDefault();
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    });

    return html`<div className=${'read' + (prefs.focus ? ' focus' : '')} data-size=${prefs.size} data-hl=${prefs.hl ? 'on' : 'off'}>
      <div className="readcol">
        <div className="readtools" role="toolbar" aria-label="Reading options">
          <span className="rt-meta">${mins} min read · ${lec.notes.length} sections</span>
          <select className="secpick" id=${'secpick-' + k} aria-label="Jump to a section" value=${active} onChange=${e => jump(+e.target.value)}>
            ${titles.map((t, i) => html`<option key=${i} value=${i}>§${i + 1} ${t}</option>`)}
          </select>
          <span className="grow"></span>
          <span className="sizes" role="group" aria-label="Text size">
            ${READ_SIZES.map(([id, label, px]) => html`<button key=${id} aria-pressed=${String(prefs.size === id)} title=${label} aria-label=${label} onClick=${() => setPref({ size: id })}><span style=${{ fontSize: px + 'px' }}>A</span></button>`)}
          </span>
          <button className="tbtn" aria-pressed=${String(!!prefs.hl)} onClick=${() => setPref({ hl: !prefs.hl })} title="Show or hide highlighted key terms"><span className="hlswatch"></span>Highlights</button>
          <button className="tbtn" aria-pressed=${String(!!prefs.focus)} onClick=${() => setPref({ focus: !prefs.focus })} title="Focus mode (F)">${prefs.focus ? 'Exit focus' : 'Focus'}</button>
          <button className="tbtn bookbtn" onClick=${() => setBook(true)} title="Read as a book (B)"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M3 5.5C5.5 4.5 9 4.5 12 6.5c3-2 6.5-2 9-1v13c-2.5-1-6-1-9 1-3-2-6.5-2-9-1z M12 6.5v13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>Book view</button>
        </div>
        ${resumed && html`<div className="resume"><span>Picked up where you stopped.</span><button className="linkbtn" onClick=${() => { window.scrollTo({ top: 0, behavior: calm() ? 'auto' : 'smooth' }); setResumed(false); }}>Start from the top</button><button className="linkbtn muted" aria-label="Dismiss" onClick=${() => setResumed(false)}>✕</button></div>`}

        <article className="paper" ref=${pageRef}>
          
          <header className="page-head">
            <p className="kicker" style=${{ color: 'var(--c)' }}>Lecture ${lec.n} · ${c.short}</p>
            <h2>${lec.title}</h2>
            <p className="meta">${mins} min read · ${lec.notes.length} sections · ${lec.cards.length} cards · ${lec.quiz.length} quiz questions</p>
          </header>
          ${lec.notes.map((s, i) => { const an = arL && arL.notes && arL.notes[i]; return html`<section key=${i} className="note" id=${'sec-' + lec.n + '-' + i} data-i=${i}>
            <h3><span className="sec">§${i + 1}</span><${H} h=${s.h} /></h3>
            <${Ar} t=${an && an.h} cls="arh" />
            ${s.formula && html`<div className="formula">${s.formula.join('\n')}</div>`}
            ${s.table && html`<div className="tbl"><table>
              <thead><tr>${s.table[0].map((x, j) => html`<th key=${j} dangerouslySetInnerHTML=${{ __html: x }}></th>`)}</tr></thead>
              <tbody>${s.table.slice(1).map((r, ri) => html`<tr key=${ri}>${r.map((x, j) => html`<td key=${j} dangerouslySetInnerHTML=${{ __html: x }}></td>`)}</tr>`)}</tbody>
            </table></div>`}
            ${s.code && html`<pre className="code">${s.code}</pre>`}
            ${s.pts && html`<ul>${s.pts.map((p, j) => html`<li key=${j}><span dangerouslySetInnerHTML=${{ __html: p }}></span><${Ar} t=${an && an.pts && an.pts[j]} /></li>`)}</ul>`}
          </section>`; })}
          <${ExtraQuestions} k=${k} lec=${lec} go=${go} />
          <footer className="page-foot">
            <button className=${'btn readmark' + (isRead ? ' on' : '')} aria-pressed=${String(isRead)} onClick=${toggleRead}>${isRead ? '✓ Read' : 'Mark lecture as read'}</button>
            <button className="btn solid" onClick=${() => go({ mode: 'quiz', quizPreset: { lecs: [lec.n], t: Date.now() } })}>Quiz me on lecture ${lec.n}</button>
            <button className="btn" onClick=${() => go({ mode: 'cards', cardLec: lec.n, cardFocus: null })}>Flip its ${lec.cards.length} cards</button>
            <span className="grow"></span>
            ${idx > 0 && html`<button className="btn ghost" onClick=${() => openLec(c.lectures[idx - 1].n)}>← L${c.lectures[idx - 1].n}</button>`}
            ${idx < c.lectures.length - 1 && html`<button className="btn ghost" onClick=${() => openLec(c.lectures[idx + 1].n)}>L${c.lectures[idx + 1].n} →</button>`}
          </footer>
        </article>
      </div>

      ${book && html`<${Book} k=${k} chapter=${chapter} onClose=${closeBook} />`}
      ${!prefs.focus && html`<aside className="outline" aria-label="In this lecture">
        <p className="kicker">In this lecture</p>
        <ol>${titles.map((t, i) => html`<li key=${i}><button className=${i === active ? 'on' : i < active ? 'past' : ''} aria-current=${i === active ? 'location' : null} onClick=${() => jump(i)}>
          <span className="on-n">§${i + 1}</span><span>${t}</span></button></li>`)}</ol>
        <div className="ol-actions">
          <button className=${'btn readmark' + (isRead ? ' on' : '')} aria-pressed=${String(isRead)} onClick=${toggleRead}>${isRead ? '✓ Read' : 'Mark as read'}</button>
          <button className="btn" onClick=${() => go({ mode: 'quiz', quizPreset: { lecs: [lec.n], t: Date.now() } })}>Quiz me</button>
        </div>
        <p className="keys"><kbd>J</kbd> <kbd>K</kbd> sections · <kbd>←</kbd> <kbd>→</kbd> lectures · <kbd>F</kbd> focus · <kbd>B</kbd> book · <kbd>+</kbd> <kbd>−</kbd> size</p>
      </aside>`}
    </div>`;
  }

  /* ── "Extra questions": practice written for the site from this lecture, answered in place ── */
  function ExtraQuestions({ k, lec, go }) {
    const items = useMemo(() => quizOf(k).filter(q => q.lec === lec.n && originOf(q) === 'extra'), [k, lec.n]);
    const [picks, setPicks] = useState({});
    const [showAll, setShowAll] = useState(false);
    useEffect(() => { setPicks({}); setShowAll(false); }, [k, lec.n]);
    if (!items.length) return null;
    const shown = showAll ? items : items.slice(0, 5);
    const answered = Object.keys(picks).length, right = items.filter(q => picks[q.id] === q.a).length;
    const pick = (q, j) => { if (picks[q.id] != null) return; setPicks(p => Object.assign({}, p, { [q.id]: j })); recordAnswers(k, [[q.id, j === q.a]]); };
    return html`<section className="xq" aria-labelledby=${'xq-' + lec.n}>
      <header className="xq-head">
        <div>
          <p className="kicker">Practice · not from the professor</p>
          <h3 id=${'xq-' + lec.n}>Extra questions</h3>
          <p className="muted small">${items.length} questions written for Study Deck from this lecture's material. The professor's own questions (past exams and sheets) are marked separately in the Quiz tab.</p>
        </div>
        ${answered > 0 && html`<span className="pen xq-score">${right}/${answered}</span>`}
      </header>
      <ol className="xq-list">${shown.map((q, n) => { const p = picks[q.id], done = p != null; return html`<li key=${q.id} className="xq-item">
        <div className="xq-q"><span className="xq-n">${n + 1}</span><${H} h=${q.q} /></div>
        <ol className="opts">${q.o.map((o, j) => html`<li key=${j}>
          <button className=${'opt' + (p === j ? ' picked' : '') + (done && j === q.a ? ' answer' : '')} disabled=${done} onClick=${() => pick(q, j)}>
            <span className="bubble">${LET[j]}</span><span className="otext"><${H} h=${o[0]} /></span><span>${done && j === q.a ? Icon.tick : done && j === p ? Icon.cross : null}</span>
          </button>
          ${done && html`<p className=${'why ' + (j === q.a ? 'right' : 'wrong')}><b>${j === q.a ? 'Right' : 'Wrong'}</b><${H} h=${o[1]} /><${Ar} t=${arQ(k, q, j)} /></p>`}
        </li>`)}</ol>
      </li>`; })}</ol>
      <div className="row">
        ${items.length > 5 && html`<button className="btn" onClick=${() => setShowAll(v => !v)}>${showAll ? 'Show fewer' : 'Show all ' + items.length}</button>`}
        <button className="btn ghost" onClick=${() => go({ mode: 'quiz', quizPreset: { ids: shuffle(items.map(q => q.id)), t: Date.now() } })}>Take them as a quiz</button>
      </div>
    </section>`;
  }

  /* ════════════ INDEX CARDS ════════════ */
  function Cards(props) {
    const { k, auto, go } = props;
    const [reviewing, setReviewing] = useState(false);
    useEffect(() => { if (auto) { setReviewing(true); go({ cardsAuto: null }); } }, [auto]);
    const info = dueInfo(k, cardsOf(k).length);
    return html`<div>
      <section className="revpanel">
        <div><p className="eyebrow">Spaced review</p><h2>${info.total ? info.total + ' card' + (info.total > 1 ? 's' : '') + ' to review today' : 'Nothing to review right now'}</h2>
          <p className="muted">${info.total ? info.due + ' coming back · ' + info.fresh + ' new. Cards you know well come back less often.' : info.tomorrow ? info.tomorrow + ' card' + (info.tomorrow > 1 ? 's come' : ' comes') + ' back tomorrow.' : 'Cards come back on a schedule as you rate them.'}</p></div>
        <button className="btn solid big" disabled=${!info.total} onClick=${() => setReviewing(true)}>Start review</button>
      </section>
      <h2 className="sub-h">Browse the cards</h2>
      <${Browse} ...${props} />
      ${reviewing && html`<${Review} k=${k} known=${props.known} setKnown=${props.setKnown} onClose=${() => setReviewing(false)} />`}
    </div>`;
  }

  function Review({ k, known, setKnown, onClose }) {
    const all = cardsOf(k);
    const byId = useMemo(() => new Map(all.map(c => [c.id, c])), [k]);
    const [srs, setSrs] = usePersist('srs:' + k, {});
    const [, setLog] = usePersist('srsnew:' + k, { day: 0, count: 0 });
    const t = today();
    const [queue, setQueue] = useState(() => {
      const s = store.get('srs:' + k, {}), lg = store.get('srsnew:' + k, { day: 0, count: 0 });
      const due = all.filter(c => s[c.id] && s[c.id].due <= t).sort((a, b) => s[a.id].due - s[b.id].due).map(c => c.id);
      const left = Math.max(0, NEW_PER_DAY - (lg.day === t ? lg.count : 0));
      return due.concat(all.filter(c => !s[c.id]).slice(0, left).map(c => c.id));
    });
    const [flip, setFlip] = useState(false);
    const [done, setDone] = useState(0);
    const id = queue[0], card = id && byId.get(id), isNew = !!card && !srs[id];
    const preview = card ? [0, 1, 2].map(r => srsStep(srs[id], r).ivl) : [];
    const rate = r => {
      if (!card || !flip) return;
      const next = srsStep(srs[id], r);
      setSrs(o => Object.assign({}, o, { [id]: next }));
      if (isNew) setLog(l => l.day === t ? { day: t, count: l.count + 1 } : { day: t, count: 1 });
      if (r === 0) setKnown(kn => kn.filter(x => x !== id));
      else if (next.ivl >= 7) setKnown(kn => kn.includes(id) ? kn : kn.concat(id));
      setQueue(q => { const rest = q.slice(1); if (r === 0) rest.splice(Math.min(rest.length, 4), 0, id); return rest; });
      setDone(d => d + 1); setFlip(false);
    };
    useEffect(() => {
      const onKey = e => {
        if (e.target.matches && e.target.matches('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlip(f => !f); }
        else if (flip && ['1', '2', '3'].includes(e.key)) rate(+e.key - 1);
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    });
    const prog = html`<span className="f-bar"><i style=${{ width: (done / Math.max(1, done + queue.length) * 100) + '%' }}></i></span>`;
    const chip = C[k].short + ' · cards';
    if (!card) {
      const info = dueInfo(k, all.length);
      return html`<${FocusShell} onClose=${onClose} chip=${chip} progress=${prog}>
        <div className="f-result">
          <span className="f-score ok" style=${{ '--p': 100 }}><b>${done}</b><em>reviewed</em></span>
          <h2 className="f-q">${done ? 'Done for today!' : 'Nothing to review right now.'}</h2>
          <p className="f-note">${info.tomorrow ? info.tomorrow + ' card' + (info.tomorrow > 1 ? 's come' : ' comes') + ' back tomorrow.' : 'Cards come back on a schedule as you rate them.'}</p>
          <div className="f-acts"><button className="f-go" onClick=${onClose}>Back to the course</button></div>
        </div>
      </${FocusShell}>`;
    }
    return html`<${FocusShell} onClose=${onClose} chip=${chip} progress=${prog} resetKey=${done}
      sheet=${flip && html`<div className="f-sheet rate-sheet" role="group" aria-label="How well did you know it?">
        <button className="f-rate again" onClick=${() => rate(0)}><b>Again</b><small>${ivlLabel(preview[0])}</small></button>
        <button className="f-rate hard" onClick=${() => rate(1)}><b>Hard</b><small>${ivlLabel(preview[1])}</small></button>
        <button className="f-rate good" onClick=${() => rate(2)}><b>Good</b><small>${ivlLabel(preview[2])}</small></button>
      </div>`}>
      <p className="f-src"><span className="f-tag">${isNew ? 'New card' : 'Review'}</span><span>${queue.length} left · L${card.lec} ${shortTitle(lecTitle(k, card.lec), 40)}</span></p>
      <div className="stack f-stack">
        <button className=${'icard' + (flip ? ' flipped' : '')} onClick=${() => setFlip(f => !f)} aria-label=${flip ? 'Show the question side' : 'Show the answer side'}>
          <span className="in">
            <span className="face front"><span className="fbody"><span className="term">${card.f}</span></span><span className="ftip">tap or press Space to flip</span></span>
            <span className="face back"><span className="fhead"><span className="l">${card.f.length > 60 ? card.f.slice(0, 58) + '…' : card.f}</span><span>Answer</span></span>
              <span className="fbody"><span className="ans">${card.b}</span><${Ar} t=${arCard(k, card.id)} /></span></span>
          </span>
        </button>
      </div>
      ${!flip ? html`<div className="f-acts"><button className="f-go" onClick=${() => setFlip(true)}>Show answer</button></div><p className="f-keys"><kbd>Space</kbd> flip, then rate with <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd></p>`
        : html`<p className="f-keys">How well did you know it? <kbd>1</kbd> again · <kbd>2</kbd> hard · <kbd>3</kbd> good</p>`}
    </${FocusShell}>`;
  }

  function Browse({ k, focus, startLec, go, known, setKnown }) {
    const all = cardsOf(k);
    const focusCard = focus ? all.find(x => x.id === focus) : null;
    const [lec, setLec] = useState(focusCard ? focusCard.lec : (startLec || 'all'));
    const [order, setOrder] = useState(null);
    const [hideKnown, setHideKnown] = useState(false);
    const [i, setI] = useState(0);
    const [flip, setFlip] = useState(false);
    const knownSet = useMemo(() => new Set(known), [known]);

    let deck = lec === 'all' ? all : all.filter(x => x.lec === lec);
    if (order) { const rank = new Map(order.map((id, n) => [id, n])); deck = deck.slice().sort((a, b) => rank.get(a.id) - rank.get(b.id)); }
    if (hideKnown) deck = deck.filter(x => !knownSet.has(x.id) || (focusCard && x.id === focusCard.id));

    useEffect(() => {
      if (focusCard) {
        setLec(focusCard.lec); setOrder(null); setHideKnown(false); setFlip(false);
        setI(Math.max(0, all.filter(x => x.lec === focusCard.lec).findIndex(x => x.id === focusCard.id)));
        go({ cardFocus: null });
      }
    }, [focus]);
    useEffect(() => { if (startLec) go({ cardLec: null }); }, []);

    const n = deck.length;
    const at = Math.min(i, Math.max(0, n - 1));
    const card = deck[at];
    const move = d => { if (!n) return; setFlip(false); setI((at + d + n) % n); };
    const toggleKnown = () => {
      if (!card) return;
      const has = knownSet.has(card.id);
      setKnown(has ? known.filter(x => x !== card.id) : known.concat(card.id));
      if (!has) { setFlip(false); if (!hideKnown) setI((at + 1) % n); }
    };
    const resetTo = l => { setLec(l); setI(0); setFlip(false); };

    useEffect(() => {
      const onKey = e => {
        if (e.target.matches && e.target.matches('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlip(f => !f); }
        else if (e.key === 'ArrowRight') move(1);
        else if (e.key === 'ArrowLeft') move(-1);
        else if (e.key.toLowerCase() === 'k') toggleKnown();
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    });

    const deckKnown = (lec === 'all' ? all : all.filter(x => x.lec === lec)).filter(x => knownSet.has(x.id)).length;
    const deckTotal = (lec === 'all' ? all : all.filter(x => x.lec === lec)).length;

    return html`<div>
      <${LecFilter} k=${k} value=${lec} onChange=${resetTo} scroll=${true} />
      <div className="deck">
        <div className="deckbar">
          <span className="muted small">${deckKnown} of ${deckTotal} cards marked known</span>
          <span className="row">
            <label className="row small" style=${{ gap: '6px', cursor: 'pointer' }}><input id="hide-known" type="checkbox" checked=${hideKnown} onChange=${e => { setHideKnown(e.target.checked); setI(0); setFlip(false); }} /> Hide known</label>
            <button className="btn ghost" onClick=${() => { setOrder(shuffle(all.map(x => x.id))); setI(0); setFlip(false); }}>Shuffle</button>
            ${order && html`<button className="btn ghost" onClick=${() => { setOrder(null); setI(0); setFlip(false); }}>In order</button>`}
          </span>
        </div>
        ${!card ? html`<div className="paper empty" style=${{ width: 'min(680px,100%)' }}>
          <span className="pen">All done here.</span>
          You marked every card in this set as known.
          <div style=${{ marginTop: '14px' }}><button className="btn" onClick=${() => setHideKnown(false)}>Show them again</button></div>
        </div>` : html`
          <div className="thin"><i style=${{ width: ((at + 1) / n * 100) + '%' }}></i></div>
          <div className="stack">
            ${knownSet.has(card.id) && html`<span className="known-stamp">known</span>`}
            <button className=${'icard' + (flip ? ' flipped' : '')} onClick=${() => setFlip(f => !f)} aria-label=${flip ? 'Show the question side' : 'Show the answer side'}>
              <span className="in">
                <span className="face front">
                  <span className="fhead"><span className="l">L${card.lec} · ${lecTitle(k, card.lec)}</span><span>Card ${at + 1}</span></span>
                  <span className="fbody"><span className="term">${card.f}</span></span>
                  <span className="ftip">tap to flip</span>
                </span>
                <span className="face back">
                  <span className="fhead"><span className="l">${card.f.length > 60 ? card.f.slice(0, 58) + '…' : card.f}</span><span>Answer</span></span>
                  <span className="fbody"><span className="ans">${card.b}</span><${Ar} t=${arCard(k, card.id)} /></span>
                </span>
              </span>
            </button>
          </div>
          <div className="cardctl">
            <button className="btn" onClick=${() => move(-1)} aria-label="Previous card">←</button>
            <span className="count">${at + 1} / ${n}</span>
            <button className="btn" onClick=${() => move(1)} aria-label="Next card">→</button>
            <button className="btn knew" aria-pressed=${String(knownSet.has(card.id))} onClick=${toggleKnown}>${knownSet.has(card.id) ? '✓ Known' : 'I know this'}</button>
          </div>
          <p className="muted small" style=${{ margin: 0 }}><kbd>Space</kbd> flip · <kbd>←</kbd> <kbd>→</kbd> move · <kbd>K</kbd> mark known</p>
        `}
      </div>
    </div>`;
  }

  /* ════════════ Q&A ════════════ */
  function Ask({ k, startLec }) {
    const c = C[k];
    const [lec, setLec] = useState(startLec || 'all');
    const [open, setOpen] = useState({});
    useEffect(() => { if (startLec) setLec(startLec); }, [startLec]);
    const lecs = lec === 'all' ? c.lectures : c.lectures.filter(l => l.n === lec);
    const allKeys = lecs.flatMap(l => l.qa.map((_, i) => l.n + '-' + i));
    const allOpen = allKeys.length && allKeys.every(x => open[x]);
    return html`<div>
      <${LecFilter} k=${k} value=${lec} onChange=${setLec} scroll=${true} />
      <article className="paper">
        
        <div className="row" style=${{ marginBottom: '6px' }}>
          <p className="muted small" style=${{ margin: 0 }} >Say your answer out loud or write it down, then open the model answer.</p>
          <span className="grow"></span>
          <button className="btn ghost" onClick=${() => { const o = {}; if (!allOpen) allKeys.forEach(x => o[x] = true); setOpen(o); }}>${allOpen ? 'Hide all answers' : 'Show all answers'}</button>
        </div>
        <div className="asklist">
          ${lecs.map(l => html`<section key=${l.n} className="askgroup">
            <h3><span className="sec">L${l.n}</span>${l.title}</h3>
            ${l.qa.map((x, i) => { const id = l.n + '-' + i; return html`<div key=${id} className="askitem">
              <div className="askq"><span className="qn">Q${i + 1}</span><p>${x[0]}</p>
                <button className="linkbtn" aria-expanded=${String(!!open[id])} onClick=${() => setOpen(o => Object.assign({}, o, { [id]: !o[id] }))}>${open[id] ? 'Hide' : 'Show answer'}</button></div>
              ${open[id] && html`<div className="askans">${x[1]}<${Ar} t=${(arLec(k, l.n) || {}).qa && arLec(k, l.n).qa[i]} /></div>`}
            </div>`; })}
          </section>`)}
        </div>
      </article>
    </div>`;
  }

  /* ════════════ FOCUS MODE: one thing on screen ════════════ */
  function FocusShell({ onClose, chip, progress, children, sheet, resetKey }) {
    const body = useRef(null);
    useEffect(() => { const r = document.documentElement, prev = r.style.overflow; r.style.overflow = 'hidden'; return () => { r.style.overflow = prev; }; }, []);
    useEffect(() => { const f = e => { if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f); }, [onClose]);
    useEffect(() => { if (body.current) body.current.scrollTop = 0; }, [resetKey]);
    return html`<div className="fmode" role="dialog" aria-modal="true" aria-label=${chip}>
      <div className="f-top"><button className="f-x" onClick=${onClose} aria-label="Close">✕</button><div className="f-prog">${progress}</div><span className="f-chip">${chip}</span></div>
      <div className=${'f-body' + (sheet ? ' has-sheet' : '')} ref=${body}><div className="f-in">${children}</div></div>
      ${sheet}
    </div>`;
  }

  /* ════════════ QUIZ ════════════ */
  function Quiz({ k, preset, go, miss, setMiss, setFixed, best, setBest }) {
    const all = quizOf(k);
    const [lecs, setLecs] = useState('all');
    const [src, setSrc] = usePersist('qsrc', 'all');
    const [count, setCount] = usePersist('qcount', '10');
    const [run, setRun] = useState(null);
    const [mock, setMockState] = useState(() => loadMock(k));
    const setMock = m => { saveMock(k, m); setMockState(m); window.scrollTo(0, 0); };
    const [mockLen, setMockLen] = usePersist('mocklen', 20);
    const startMock = nq => {
      const ex = shuffle(all.filter(isExam)), rest = shuffle(all.filter(q => !isExam(q)));
      const ids = ex.concat(rest).slice(0, nq).map(q => q.id);
      const minutes = Math.round(ids.length * 1.5);
      setMock({ ids, minutes, started: Date.now(), deadline: Date.now() + minutes * 60000, ans: {}, flag: {}, i: 0, result: null });
    };

    const srcMode = src === 'exam' ? 'prof' : src;
    // counts on the source buttons follow the chosen lectures, so a button never promises questions the quiz can't show
    const inLecs = all.filter(q => lecs === 'all' || lecs.includes(q.lec));
    const bySrc = { all: inLecs.length, prof: inLecs.filter(isProf).length, extra: inLecs.filter(q => originOf(q) === 'extra').length, miss: inLecs.filter(q => miss.includes(q.id)).length };
    const pool = inLecs.filter(q => srcMode === 'all' || (srcMode === 'prof' ? isProf(q) : srcMode === 'extra' ? originOf(q) === 'extra' : miss.includes(q.id)));
    // practice rounds (retrying misses, practising saved mistakes, a single question) are marked but never set the best score
    const start = (items, practice, from) => { if (items.length) setRun({ items, i: 0, picks: [], saved: false, practice: !!practice, from: from || null }); };
    const closeRun = () => { const from = run && run.from; setRun(null); if (from === 'path') go({ mode: 'path' }); else if (from === 'home') go({ view: 'shelf' }); };
    const startFromSetup = () => start(count === 'all' ? shuffle(pool) : shuffle(pool).slice(0, +count), src === 'miss');
    useEffect(() => { if (src === 'exam') setSrc('prof'); }, []);

    useEffect(() => {
      if (!preset) return;
      if (preset.ids) start(all.filter(q => preset.ids.includes(q.id)), true, preset.from);
      else if (preset.lecs) { setLecs(preset.lecs); start(shuffle(all.filter(q => preset.lecs.includes(q.lec))), false, preset.from); }
      go({ quizPreset: null });
    }, [preset && preset.t]);

    const pick = j => {
      if (!run || run.picks[run.i] != null) return;
      const q = run.items[run.i];
      const picks = run.picks.slice(); picks[run.i] = j;
      setRun(Object.assign({}, run, { picks }));
      recordAnswers(k, [[q.id, j === q.a]]);
      const wasMissed = miss.includes(q.id);
      setMiss(m => j === q.a ? m.filter(x => x !== q.id) : (m.includes(q.id) ? m : m.concat(q.id)));
      if (j === q.a && wasMissed) setFixed(f => f.includes(q.id) ? f : f.concat(q.id));
      if (j !== q.a) setFixed(f => f.filter(x => x !== q.id));
    };
    const next = () => setRun(r => r && r.picks[r.i] != null ? Object.assign({}, r, { i: r.i + 1 }) : r);

    useEffect(() => {
      if (!run || run.i >= run.items.length) return;
      const onKey = e => {
        if (e.target.matches && e.target.matches('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
        const n = run.items[run.i].o.length, key = e.key.toLowerCase();
        let j = -1;
        if (/^[1-8]$/.test(key)) j = +key - 1; else if (/^[a-h]$/.test(key)) j = key.charCodeAt(0) - 97;
        if (j >= 0 && j < n) pick(j);
        else if (e.key === 'Enter') { e.preventDefault(); next(); }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [run]);

    const chip = C[k].short + (run && run.items.length && run.items.every(q => q.lec === run.items[0].lec) ? ' · Lecture ' + run.items[0].lec : '') + (run && run.practice ? ' · practice' : '');
    const segs = run && (run.items.length <= 40
      ? html`<span className="f-segs">${run.items.map((qq, i) => { const p = run.picks[i]; return html`<i key=${i} className=${i === run.i ? 'cur' : p == null ? '' : p === qq.a ? 'ok' : 'no'}></i>`; })}</span>`
      : html`<span className="f-bar"><i style=${{ width: (Math.min(run.i, run.items.length) / run.items.length * 100) + '%' }}></i></span>`);

    /* finished */
    if (run && run.i >= run.items.length) {
      const total = run.items.length;
      const right = run.items.filter((q, i) => run.picks[i] === q.a).length;
      const pct = Math.round(right / total * 100);
      const counts = !run.practice && total >= 5;
      if (!run.saved) { run.saved = true; if (counts && (best == null || pct > best)) setTimeout(() => setBest(pct), 0); }
      const missed = run.items.map((q, i) => ({ q, p: run.picks[i] })).filter(x => x.p !== x.q.a);
      const line = pct === 100 ? 'Full marks.' : pct >= 85 ? 'Excellent work.' : pct >= 65 ? 'Good. Fix the few below.' : pct >= 50 ? 'Pass, but re-read the notes.' : 'Back to the notes, then retry.';
      return html`<${FocusShell} onClose=${closeRun} chip=${chip} progress=${segs}>
        <div className="f-result">
          <span className=${'f-score' + (pct >= 70 ? ' ok' : ' no')} style=${{ '--p': pct }}><b>${right}/${total}</b><em>${pct}%</em></span>
          <h2 className="f-q">${line}</h2>
          <p className="f-note">${missed.length ? missed.length + ' question' + (missed.length > 1 ? 's were' : ' was') + ' added to your mistakes.' : 'Nothing new in your mistakes.'}${run.practice ? ' Practice rounds don’t change your best score.' : !counts ? ' Quizzes under 5 questions don’t change your best score.' : ''}</p>
          <div className="f-acts">
            ${missed.length > 0 && html`<button className="f-go" onClick=${() => start(shuffle(missed.map(x => x.q)), true, run.from)}>Retry the ${missed.length} I missed</button>`}
            ${!run.practice && html`<button className="f-ghost" onClick=${() => start(shuffle(run.items), false, run.from)}>Same questions, new order</button>`}
            <button className="f-ghost" onClick=${closeRun}>Done</button>
          </div>
          ${missed.length > 0 && html`<div className="f-corr">
            <h3>Corrections</h3>
            ${missed.map(({ q, p }) => html`<div key=${q.id} className="f-rv">
              <p className="f-rq"><${H} h=${q.q} /></p>
              <p><span className="bad">You: ${LET[p]}</span> <${H} h=${q.o[p][0]} />. <span className="muted"><${H} h=${q.o[p][1]} /></span><${Ar} t=${arQ(k, q, p)} /></p>
              <p><span className="good">Answer: ${LET[q.a]}</span> <${H} h=${q.o[q.a][0]} />. <span className="muted"><${H} h=${q.o[q.a][1]} /></span><${Ar} t=${arQ(k, q, q.a)} /></p>
            </div>`)}
          </div>`}
        </div>
      </${FocusShell}>`;
    }

    /* question: one at a time, full screen */
    if (run) {
      const q = run.items[run.i], pk = run.picks[run.i], done = pk != null, ok = pk === q.a;
      const one = q.o.length < 3 || q.o.some(o => strip(o[0]).length > 46);
      return html`<${FocusShell} onClose=${closeRun} chip=${chip} progress=${segs} resetKey=${run.i}
        sheet=${done && html`<div className=${'f-sheet ' + (ok ? 'ok' : 'no')} role="status">
          <div><h3>${ok ? 'Correct!' : 'Not quite. It’s ' + LET[q.a] + '.'}</h3><p>Every choice is explained above${arQ(k, q, q.a) ? ', with Arabic' : ''}.</p></div>
          <button className="f-go" onClick=${next}>${run.i + 1 < run.items.length ? 'Continue' : 'See my score'}</button>
        </div>`}>
        <p className="f-src"><${Source} q=${q} /><span>Question ${run.i + 1} of ${run.items.length} · L${q.lec}</span></p>
        <${H} as="h2" className="f-q" h=${q.q} />
        <ol className=${'f-opts' + (one ? ' one' : '')}>
          ${q.o.map((o, j) => html`<li key=${j} className=${done ? (j === q.a ? 'ok' : j === pk ? 'no' : 'dim') : ''}>
            <button className="f-opt" disabled=${done} onClick=${() => pick(j)}>
              <span className="f-let">${done && j === q.a ? '✓' : done && j === pk ? '✕' : LET[j]}</span><span className="f-ot"><${H} h=${o[0]} /></span>
            </button>
            ${done && html`<p className="f-why"><b>${j === q.a ? 'Why it’s right:' : 'Why not:'}</b> <${H} h=${o[1]} /><${Ar} t=${arQ(k, q, j)} /></p>`}
          </li>`)}
        </ol>
        ${!done && html`<p className="f-keys">Press <kbd>A</kbd>–<kbd>${LET[q.o.length - 1]}</kbd> or <kbd>1</kbd>–<kbd>${q.o.length}</kbd> · <kbd>Esc</kbd> to stop</p>`}
      </${FocusShell}>`;
    }

    if (mock) return html`<${MockExam} k=${k} mock=${mock} setMock=${setMock} setMiss=${setMiss} setFixed=${setFixed} onNew=${() => startMock(mock.ids.length)} />`;

    /* setup */
    const n = count === 'all' ? pool.length : Math.min(+count, pool.length);
    const exams = [...new Set(all.filter(isExam).map(q => q.src))];
    return html`<div>
      <article className="paper setup">
        
        <div>
          <p className="kicker">Answer sheet</p>
          <h2>Build a quiz</h2>
          <p className="muted" style=${{ margin: 0, maxWidth: '52ch' }}>Fill in a bubble to answer. The sheet is marked straight away, and every choice gets a reason: why the right one is right and why each wrong one is wrong.</p>
          <div className="fieldset"><span className="flabel">Lectures</span><${LecFilter} k=${k} value=${lecs} onChange=${setLecs} multi=${true} /></div>
          <div className="fieldset"><span className="flabel">Questions</span>
            <div className="seg">
              ${[['all', 'All questions'], ['prof', "Professor's"], ['extra', 'Extra questions'], ['miss', 'My mistakes']].map(([v, l]) =>
                html`<button key=${v} aria-pressed=${String(srcMode === v)} disabled=${!bySrc[v] && srcMode !== v} onClick=${() => setSrc(v)}>${l} <span className="segn">${bySrc[v]}</span></button>`)}
            </div>
          </div>
          <div className="fieldset"><span className="flabel">Length</span>
            <div className="seg">${['10', '20', '30', 'all'].map(v => html`<button key=${v} aria-pressed=${String(count === v)} onClick=${() => setCount(v)}>${v === 'all' ? 'Everything' : v}</button>`)}</div>
          </div>
        </div>
        <div className="cover">
          <p className="kicker">${C[k].short} · ${lecs === 'all' ? 'all lectures' : 'L' + lecs.join(', L')}</p>
          <div className="big">${n}</div>
          <p className="muted small" style=${{ margin: '4px 0 0' }}>question${n === 1 ? '' : 's'} on this sheet, from ${pool.length} that match</p>
          <ul>
            <li>${all.length} questions in this course</li>
            <li><span className="srcbadge prof">Professor's</span> ${all.filter(isProf).length} from past exams, the professor's sheets and lecture examples</li>
            <li><span className="srcbadge extra">Extra</span> ${all.filter(q => originOf(q) === 'extra').length} written for Study Deck from the lectures</li>
            ${all.some(q => originOf(q) === 'summary') && html`<li><span className="srcbadge summary">Summary</span> ${all.filter(q => originOf(q) === 'summary').length} from student summaries</li>`}
            ${best != null && html`<li>Your best score: ${best}%</li>`}
          </ul>
          <button className="btn solid" style=${{ width: '100%', justifyContent: 'center' }} disabled=${!pool.length} onClick=${startFromSetup}>Start the quiz</button>
          ${!pool.length && html`<div className="nomatch">
            <p className="small">${srcMode === 'prof'
              ? "The professor's past papers and sheets didn't ask about " + (lecs === 'all' ? 'this course' : (lecs.length > 1 ? 'these lectures' : 'Lecture ' + lecs[0])) + '. Practise with the extra questions instead, or take the professor\'s questions from every lecture.'
              : srcMode === 'miss' ? 'No saved mistakes for ' + (lecs === 'all' ? 'this course' : 'these lectures') + ' yet. Questions you get wrong will appear here.'
              : 'No questions match these lectures.'}</p>
            <div className="row">
              ${srcMode !== 'extra' && bySrc.extra > 0 && html`<button className="btn" onClick=${() => setSrc('extra')}>Use the ${bySrc.extra} extra questions</button>`}
              ${srcMode === 'prof' && lecs !== 'all' && html`<button className="btn ghost" onClick=${() => setLecs('all')}>Professor's from all lectures (${all.filter(isProf).length})</button>`}
              ${srcMode !== 'all' && bySrc.all > 0 && html`<button className="btn ghost" onClick=${() => setSrc('all')}>All ${bySrc.all} questions</button>`}
            </div>
          </div>`}
        </div>
      </article>
      <article className="paper mockcard">
        
        <div>
          <p className="kicker" style=${{ color: 'var(--pen)' }}>Exam conditions</p>
          <h2>Timed mock exam</h2>
          <p className="muted" style=${{ margin: '0 0 14px', maxWidth: '56ch' }}>A mixed paper built from past-exam questions first, with 1.5 minutes per question. No hints while it runs: answer, flag, change your mind, then hand in. Everything is marked at the end with full explanations.</p>
          <div className="seg">${[10, 20, 30, 40].map(v => html`<button key=${v} aria-pressed=${String(mockLen === v)} onClick=${() => setMockLen(v)}>${v} questions · ${Math.round(v * 1.5)} min</button>`)}</div>
        </div>
        <div className="cover">
          <p className="kicker">${C[k].short} · mock paper</p>
          <div className="big">${fmtClock(Math.round(Math.min(mockLen, all.length) * 1.5) * 60000).replace(/:00$/, '')}<span className="unit"> min</span></div>
          <ul>
            <li>${Math.min(mockLen, all.length)} questions, ${Math.min(mockLen, all.filter(isExam).length)} from past papers</li>
            ${store.get('mock:' + k, null) != null && html`<li>Best mock so far: ${store.get('mock:' + k, null)}%</li>`}
          </ul>
          <button className="btn solid" style=${{ width: '100%', justifyContent: 'center' }} onClick=${() => startMock(mockLen)}>Start the timer</button>
        </div>
      </article>
      ${exams.length > 0 && html`<p className="muted small" style=${{ marginTop: '14px' }}>Past-paper questions come from: ${exams.join(' · ')}</p>`}
    </div>`;
  }

  /* ════════════ MOCK EXAM ════════════ */
  const MOCKS = {};
  function loadMock(k) { if (MOCKS[k]) return MOCKS[k]; try { const v = JSON.parse(sessionStorage.getItem('sd:mock:' + k)); if (v) MOCKS[k] = v; } catch (e) {} return MOCKS[k] || null; }
  function saveMock(k, m) { MOCKS[k] = m; try { m ? sessionStorage.setItem('sd:mock:' + k, JSON.stringify(m)) : sessionStorage.removeItem('sd:mock:' + k); } catch (e) {} }

  function MockExam({ k, mock, setMock, setMiss, setFixed, onNew }) {
    const all = quizOf(k);
    const byId = useMemo(() => new Map(all.map(q => [q.id, q])), [k]);
    const items = mock.ids.map(id => byId.get(id)).filter(Boolean);
    const [now, setNow] = useState(Date.now());
    const [confirm, setConfirm] = useState(false);
    const latest = useRef(mock); latest.current = mock;
    const upd = patch => setMock(Object.assign({}, latest.current, patch));
    const submit = () => {
      const m = latest.current; if (m.result) return;
      const pairs = items.map(q => [q.id, m.ans[q.id] === q.a]);
      recordAnswers(k, pairs);
      const okIds = pairs.filter(p => p[1]).map(p => p[0]), badIds = pairs.filter(p => !p[1]).map(p => p[0]);
      setMiss(list => { const keep = list.filter(id => !okIds.includes(id)); badIds.forEach(id => { if (!keep.includes(id)) keep.push(id); }); setFixed(f => f.filter(id => !badIds.includes(id)).concat(okIds.filter(id => list.includes(id) && !f.includes(id)))); return keep; });
      const right = okIds.length, pct = Math.round(right / items.length * 100);
      const prev = store.get('mock:' + k, null); if (prev == null || pct > prev) store.set('mock:' + k, pct);
      upd({ result: { right, pct, used: Math.min(m.minutes * 60000, Date.now() - m.started), timeUp: Date.now() >= m.deadline } });
    };
    useEffect(() => {
      if (mock.result) return;
      if (Date.now() >= mock.deadline) { submit(); return; }
      const t = setInterval(() => { setNow(Date.now()); if (Date.now() >= latest.current.deadline) submit(); }, 1000);
      return () => clearInterval(t);
    }, [mock.result]);
    // keyboard: the handler is refreshed every render; hooks stay above the early return for the result view
    const keyRef = useRef(null);
    useEffect(() => { const f = e => { if (!latest.current.result && keyRef.current) keyRef.current(e); }; window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f); }, []);

    if (mock.result) {
      const r = mock.result;
      const byLec = {};
      items.forEach(q => { const b = byLec[q.lec] || (byLec[q.lec] = [0, 0]); b[1]++; if (mock.ans[q.id] === q.a) b[0]++; });
      return html`<article className="paper">
        
        <div className="row" style=${{ gap: '28px', alignItems: 'center' }}>
          <div className="score">
            
            <span className="pen">${r.right}/${items.length}</span>
          </div>
          <div>
            <p className="kicker">Mock exam · ${r.pct}% · ${r.timeUp ? 'time ran out' : 'handed in after ' + fmtClock(r.used)}</p>
            <p className="pen" style=${{ fontSize: '2rem', margin: '6px 0 0' }}>${r.pct >= 85 ? 'Exam ready.' : r.pct >= 65 ? 'Solid. Fix the gaps below.' : r.pct >= 50 ? 'A pass. Keep revising.' : 'Not yet. Back to the notes.'}</p>
            <p className="muted small" style=${{ margin: '8px 0 0' }}>Wrong and unanswered questions were added to Mistakes.</p>
          </div>
        </div>
        <div className="tbl" style=${{ marginTop: '22px' }}><table>
          <thead><tr><th>Lecture</th><th>Score</th><th style=${{ width: '40%' }}></th></tr></thead>
          <tbody>${Object.entries(byLec).sort((a, b) => a[0] - b[0]).map(([n, [ok, tot]]) => html`<tr key=${n}><td>L${n} · ${lecTitle(k, +n)}</td><td className="num">${ok}/${tot}</td>
            <td><span className="meter" style=${{ '--w': Math.round(ok / tot * 100) + '%', '--sp': ok / tot >= 0.6 ? 'var(--ok)' : 'var(--pen)' }}><b>${Math.round(ok / tot * 100)}%</b><i></i></span></td></tr>`)}</tbody>
        </table></div>
        <div className="row" style=${{ marginTop: '18px' }}>
          <button className="btn solid" onClick=${onNew}>Sit another paper</button>
          <button className="btn ghost" onClick=${() => setMock(null)}>Back to quiz setup</button>
        </div>
        <div className="review">
          <h3>Marked paper</h3>
          ${items.map((q, i) => { const p = mock.ans[q.id], ok = p === q.a; return html`<details key=${q.id} className="rv mockrv" open=${!ok}>
            <summary><span className=${ok ? 'good' : 'bad'}>${ok ? '✓' : p == null ? 'No answer' : '✗'}</span> <b>Q${i + 1}.</b> <${H} h=${q.q} /></summary>
            <ol className="opts">${q.o.map((o, j) => html`<li key=${j}>
              <div className=${'opt' + (p === j ? ' picked' : '') + (j === q.a ? ' answer' : '')}><span className="bubble">${LET[j]}</span><span className="otext"><${H} h=${o[0]} /></span><span>${j === q.a ? Icon.tick : p === j ? Icon.cross : null}</span></div>
              <p className=${'why ' + (j === q.a ? 'right' : 'wrong')}><b>${j === q.a ? 'Right' : 'Wrong'}</b><${H} h=${o[1]} /><${Ar} t=${arQ(k, q, j)} /></p></li>`)}</ol>
          </details>`; })}
        </div>
      </article>`;
    }

    const i = Math.min(mock.i, items.length - 1), q = items[i];
    const left = mock.deadline - now, answered = items.filter(x => mock.ans[x.id] != null).length;
    const choose = j => upd({ ans: Object.assign({}, mock.ans, { [q.id]: j }) });
    const goTo = n => upd({ i: Math.max(0, Math.min(items.length - 1, n)) });
    keyRef.current = e => {
      if (e.target.matches && e.target.matches('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toLowerCase(); let j = -1;
      if (/^[1-8]$/.test(key)) j = +key - 1; else if (/^[a-e]$/.test(key)) j = key.charCodeAt(0) - 97;
      if (j >= 0 && j < q.o.length) choose(j);
      else if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); goTo(i + 1); }
      else if (e.key === 'ArrowLeft') goTo(i - 1);
      else if (key === 'f') upd({ flag: Object.assign({}, mock.flag, { [q.id]: !mock.flag[q.id] }) });
    };

    return html`<div className="mock">
      <div className="mockbar">
        <span className=${'clock' + (left < 5 * 60000 ? ' low' : '')} aria-label="Time left">${fmtClock(left)}</span>
        <span className="muted small">${answered}/${items.length} answered</span>
        <span className="grow"></span>
        ${confirm ? html`<span className="row small"><span>${items.length - answered ? items.length - answered + ' unanswered. ' : ''}Hand in now?</span>
            <button className="btn solid" onClick=${submit}>Hand in</button><button className="btn ghost" onClick=${() => setConfirm(false)}>Keep going</button></span>`
          : html`<button className="btn" onClick=${() => setConfirm(true)}>Hand in</button>`}
      </div>
      <div className="mockgrid">
        <article className="paper">
          
          <div className="qtop">
            <span>Question ${i + 1} of ${items.length}</span>
            <span className="tag lec">L${q.lec}</span>
            <${Source} q=${q} />
            ${mock.flag[q.id] && html`<span className="tag exam">flagged</span>`}
          </div>
          <${H} as="h2" className="qtext" h=${q.q} />
          <ol className="opts">${q.o.map((o, j) => html`<li key=${j}><button className=${'opt' + (mock.ans[q.id] === j ? ' picked' : '')} onClick=${() => choose(j)}>
            <span className="bubble">${LET[j]}</span><span className="otext"><${H} h=${o[0]} /></span><span></span></button></li>`)}</ol>
          <div className="qfoot">
            <button className="btn ghost" disabled=${i === 0} onClick=${() => goTo(i - 1)}>← Previous</button>
            <button className=${'btn' + (mock.flag[q.id] ? ' flagged' : '')} aria-pressed=${String(!!mock.flag[q.id])} onClick=${() => upd({ flag: Object.assign({}, mock.flag, { [q.id]: !mock.flag[q.id] }) })}>${mock.flag[q.id] ? 'Flagged' : 'Flag for review'}</button>
            <button className="btn solid" onClick=${() => i + 1 < items.length ? goTo(i + 1) : setConfirm(true)}>${i + 1 < items.length ? 'Next →' : 'Finish'}</button>
          </div>
        </article>
        <aside className="navgrid" aria-label="Jump to a question">
          <p className="kicker">Answer sheet</p>
          <div className="nums">${items.map((x, n) => html`<button key=${x.id} aria-current=${n === i ? 'step' : null}
            className=${(mock.ans[x.id] != null ? 'done' : '') + (mock.flag[x.id] ? ' flag' : '')} onClick=${() => goTo(n)} aria-label=${'Question ' + (n + 1)}>${n + 1}</button>`)}</div>
          <p className="muted small" style=${{ margin: 0 }}>Filled = answered · red ring = flagged</p>
          <p className="keys"><kbd>A</kbd>–<kbd>D</kbd> answer · <kbd>←</kbd> <kbd>→</kbd> move · <kbd>F</kbd> flag</p>
        </aside>
      </div>
    </div>`;
  }

  /* ════════════ PAST PAPERS ════════════ */
  function Papers({ k }) {
    const c = C[k];
    const [ix, setIx] = usePersist('paper:' + k, 0);
    const exI = Math.min(ix, c.exams.length - 1), ex = c.exams[exI];
    const arEx = (si, ii) => { const A = arOf(k); const t = A && A.exams && A.exams[exI] && A.exams[exI].sections[si] && A.exams[exI].sections[si].items[ii]; return t || {}; };
    const [st, setSt] = useState({});
    useEffect(() => setSt({}), [ix]);
    const total = ex.sections.reduce((a, s) => a + s.items.length, 0);
    const set = (key, patch) => setSt(o => Object.assign({}, o, { [key]: Object.assign({}, o[key], patch) }));
    const scored = Object.entries(st).filter(([key, v]) => v.pick != null);
    const right = scored.filter(([key, v]) => { const [si, ii] = key.split('.').map(Number); return ex.sections[si].items[ii].a === v.pick; }).length;

    return html`<div className="papers">
      <nav className="plist" aria-label="Past papers">
        ${c.exams.map((e, i) => html`<button key=${i} className="pitem" aria-current=${String(e === ex)} onClick=${() => { setIx(i); window.scrollTo(0, 0); }}>
          ${e.title}<small>${e.sections.reduce((a, s) => a + s.items.length, 0)} questions</small></button>`)}
      </nav>
      <article className="paper">
        
        <header className="exhead">
          <p className="kicker">${c.code} · ${c.name}</p>
          <h2>${ex.title}</h2>
          <p>${ex.meta}</p>
          ${ex.note && html`<p className="exnote"><span className="pen">Note:</span>${ex.note}</p>`}
        </header>
        <div className="extools">
          <span className="muted small">${total} questions. Choose an answer or draft one, then check it.</span>
          <span className="grow"></span>
          ${scored.length > 0 && html`<span className="pen" style=${{ fontSize: '1.5rem' }}>${right}/${scored.length}</span>`}
          <button className="btn ghost" onClick=${() => { const o = {}; ex.sections.forEach((s, si) => s.items.forEach((_, ii) => { o[si + '.' + ii] = Object.assign({}, st[si + '.' + ii], { open: true }); })); setSt(o); }}>Show all answers</button>
          <button className="btn ghost" onClick=${() => setSt({})}>Clear</button>
        </div>
        ${ex.sections.map((s, si) => html`<section key=${si} className="psec">
          <div className="psec-h"><h3>${s.title}</h3><span>${s.marks}</span></div>
          ${s.items.map((it, ii) => {
            const key = si + '.' + ii, my = st[key] || {}, open = !!my.open || my.pick != null;
            const opts = it.type === 'tf' ? ['True', 'False'] : it.o;
            return html`<div key=${key} className="eq">
              <span className="num">${ii + 1}</span>
              <div style=${{ minWidth: 0 }}>
                <${H} as="div" className="qt" h=${it.q} />
                ${opts && html`<div className="eopts">${opts.map((o, oi) => html`<button key=${oi} disabled=${open}
                    className=${'eopt' + (my.pick === oi ? ' picked' : '') + (open && oi === it.a ? ' answer' : '')}
                    onClick=${() => set(key, { pick: oi, open: true })}>
                    <span className="bubble">${it.type === 'tf' ? o[0] : LET[oi].toLowerCase()}</span><${H} h=${o} /></button>`)}</div>`}
                ${it.type === 'written' && !open && html`<textarea className="draft" id=${'draft-' + k + '-' + ix + '-' + key} placeholder="Draft your answer here (it is not saved)…"></textarea>`}
                ${!open && html`<div><button className="linkbtn" style=${{ marginTop: '8px' }} onClick=${() => set(key, { open: true })}>${it.type === 'written' ? 'Show the model answer' : 'Reveal the answer'}</button></div>`}
                ${open && html`<div className="model">
                  <div className="lab">${opts ? (my.pick == null ? 'Answer' : my.pick === it.a ? '✓ Correct' : '✗ Not this one') : 'Model answer'}</div>
                  ${it.key && html`<span className="keyn">${it.key}</span>`}
                  ${it.ans && html`<${H} as="div" className="ansbox" h=${it.ans} />`}
                  <${Ar} t=${arEx(si, ii).ans} cls="arblock" />
                  ${opts && html`<p style=${{ margin: '0 0 6px' }}><b>${it.type === 'mcq' ? LET[it.a].toLowerCase() + ') ' : ''}<${H} h=${opts[it.a]} /></b></p>`}
                  <p className="expl" style=${{ margin: 0 }}><b>Why: </b><${H} h=${it.why} /><${Ar} t=${arEx(si, ii).why} /></p>
                </div>`}
              </div>
            </div>`;
          })}
        </section>`)}
      </article>
    </div>`;
  }

  /* ════════════ BOOK VIEW ════════════
     The chapter is laid out once with CSS columns (one column = one page). Every visible page renders the same
     content shifted to its column, so pagination is exact and a page-turn leaf can show any two pages. */
  const cleanTitle = t => t.replace(/\s*\((?:Lec|Lecture|Topic)\b[^)]*\)\s*$/i, '').trim();
  const splitTitle = t => { t = cleanTitle(t); const i = t.indexOf(': '); return i > 0 && i <= 48 ? [t.slice(0, i), t.slice(i + 2)] : [t, '']; };
  function bookLecture(c, lec) {
    const [main, sub] = splitTitle(lec.title);
    return html`<div className="bcontent" lang="en">
      <header className="bopen"><p className="bk">Lecture ${lec.n}</p><h1>${main}</h1>${sub && html`<p className="bsubt">${sub}</p>`}<p className="bsub">${c.name}</p><div className="borna" aria-hidden="true">❦</div></header>
      ${lec.notes.map((s, i) => {
        // like a typeset book, a heading never sits alone at the foot of a page: it travels with its first block
        const blocks = [];
        if (s.formula) blocks.push(html`<div className="formula">${s.formula.join('\n')}</div>`);
        if (s.table) blocks.push(html`<table><thead><tr>${s.table[0].map((x, j) => html`<th key=${j} dangerouslySetInnerHTML=${{ __html: x }}></th>`)}</tr></thead>
          <tbody>${s.table.slice(1).map((r, ri) => html`<tr key=${ri}>${r.map((x, j) => html`<td key=${j} dangerouslySetInnerHTML=${{ __html: x }}></td>`)}</tr>`)}</tbody></table>`);
        if (s.code) blocks.push(html`<pre>${s.code}</pre>`);
        const pts = s.pts || [];
        const li = (p, j) => html`<li key=${j} dangerouslySetInnerHTML=${{ __html: p }}></li>`;
        const firstIsList = !blocks.length && pts.length;
        return html`<section key=${i} className="bsec" data-i=${i}>
          <div className="bkeep">
            <p className="bsn">Section ${i + 1}</p>
            <h2><${H} h=${s.h} /></h2>
            ${blocks.length ? blocks[0] : firstIsList ? html`<ul>${li(pts[0], 0)}</ul>` : null}
          </div>
          ${blocks.slice(1)}
          ${firstIsList ? (pts.length > 1 && html`<ul className="bcont">${pts.slice(1).map((p, j) => li(p, j + 1))}</ul>`) : (pts.length > 0 && html`<ul>${pts.map(li)}</ul>`)}
        </section>`;
      })}
      <p className="bend">End of lecture ${lec.n}</p>
    </div>`;
  }
  function bookRevision(c) {
    return html`<div className="bcontent" lang="en">
      <header className="bopen"><p className="bk">Revision sheet</p><h1>${c.name}</h1><p className="bsub">Every key term, formula and past-paper answer</p><div className="borna" aria-hidden="true">❦</div></header>
      ${c.lectures.map((l, i) => { const formulas = l.notes.filter(s => s.formula).flatMap(s => s.formula); const exam = l.quiz.filter(isExam);
        return html`<section key=${l.n} className="bsec" data-i=${i}>
          <div className="bkeep"><p className="bsn">Lecture ${l.n}</p><h2>${cleanTitle(l.title)}</h2></div>
          <dl className="bterms">${l.cards.map((x, j) => html`<div key=${j}><dt>${x[0]}</dt><dd>${x[1]}</dd></div>`)}</dl>
          ${formulas.length > 0 && html`<div className="formula">${formulas.join('\n')}</div>`}
          ${exam.length > 0 && html`<p className="bk-small">From past papers</p><ul>${exam.map((q, j) => html`<li key=${j}><${H} h=${q.q} /> <b>→ <${H} h=${q.o[q.a][0]} /></b></li>`)}</ul>`}
        </section>`; })}
      <p className="bend">End of the revision sheet</p>
    </div>`;
  }

  const BOOK_FS = { s: 15.5, m: 17, l: 19 };
  function Book({ k, chapter, onClose }) {
    const c = M[k];
    const stageRef = useRef(null), measureRef = useRef(null);
    const [size, setSize] = usePersist('booksize', 'm');
    const [stage, setStage] = useState({ w: innerWidth, h: Math.max(300, innerHeight - 120) });
    useEffect(() => {
      const el = stageRef.current; if (!el) return;
      const ro = new ResizeObserver(() => setStage({ w: el.clientWidth, h: el.clientHeight }));
      ro.observe(el); return () => ro.disconnect();
    }, []);
    useEffect(() => { const r = document.documentElement, prev = r.style.overflow; r.style.overflow = 'hidden'; return () => { r.style.overflow = prev; }; }, []);
    useEffect(() => {
      // the book is typeset in a serif; load it only when a book is opened
      if (document.getElementById('book-font')) return;
      const l = document.createElement('link'); l.id = 'book-font'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,36,400;0,36,500;1,36,400&display=swap';
      document.head.appendChild(l);
    }, []);

    // page geometry, in book units; the whole book is then scaled to fit the screen
    const spread = stage.w >= 760 && stage.w > stage.h * 0.95;
    const PW = spread ? 520 : 380;
    const PH = spread ? 740 : Math.round(Math.min(900, Math.max(600, PW * (stage.h - 24) / Math.max(200, stage.w - 24))));
    const PX = spread ? 50 : 28, PT = 54, PB = 58;
    const CW = PW - 2 * PX, CH = PH - PT - PB, FS = BOOK_FS[size] || 17;
    const bookW = spread ? PW * 2 : PW, bookH = PH;
    const fit = Math.max(0.2, Math.min((stage.w - 24) / (bookW + 28), (stage.h - 20) / (bookH + 24)));
    const [z, setZ] = useState(1);
    const zRef = useRef(1); zRef.current = z;
    const scale = fit * z;

    // measure pages and where each section starts
    const [lay, setLay] = useState({ pages: 1, sec: [] });
    useLayoutEffect(() => {
      const el = measureRef.current; if (!el) return;
      const run = () => setLay({
        pages: Math.max(1, Math.round((el.scrollWidth + 2 * PX) / PW)),
        sec: [...el.querySelectorAll('[data-i]')].map(n => Math.floor((n.offsetLeft + 2) / PW))
      });
      run(); if (document.fonts) document.fonts.ready.then(run);
    }, [chapter.id, PW, PH, FS]);
    const total = lay.pages, step = spread ? 2 : 1;
    const secNowRef = useRef(0);
    const norm = p => { p = Math.max(0, Math.min(total - 1, p)); return spread ? p - (p % 2) : p; };

    const posKey = 'bookpos:' + k + ':' + chapter.id;
    const readPos = () => { const v = store.get(posKey, 0); return v === 'end' ? 1e6 : v; };
    const [p, setP] = useState(readPos);
    const [turn, setTurn] = useState(null);
    useEffect(() => { setP(readPos()); setTurn(null); }, [chapter.id]);
    const page = norm(p);
    useEffect(() => { if (total > 1 || page === 0) store.set(posKey, page); }, [page, total, posKey]);

    // a new turn while one is animating finishes the current one at once, so quick presses never get dropped
    const here = () => turn ? turn.to : page;
    const turnTo = target => {
      const base = here(), busy = !!turn;
      if (target > total - 1 || (spread && target >= total)) { if (chapter.next) { store.set('bookpos:' + k + ':' + chapter.nextId, 0); chapter.next(); } return; }
      if (target < 0) { if (chapter.prev) { store.set('bookpos:' + k + ':' + chapter.prevId, 'end'); chapter.prev(); } return; }
      target = norm(target);
      if (target === base) { if (busy) { setTurn(null); setP(base); } return; }
      if (busy || calm() || Math.abs(target - base) > step) { setTurn(null); setP(target); return; }
      setTurn({ dir: target > base ? 1 : -1, from: base, to: target, go: false });
      requestAnimationFrame(() => requestAnimationFrame(() => setTurn(t => t && Object.assign({}, t, { go: true }))));
    };
    const finish = () => setTurn(t => { if (t) setP(t.to); return null; });
    useEffect(() => { if (!turn || !turn.go) return; const id = setTimeout(finish, 760); return () => clearTimeout(id); }, [turn && turn.go]);
    const next = () => turnTo(here() + step), prev = () => turnTo(here() - step);

    // zoom around a point (pinch centre, cursor, or the middle of the screen)
    const zoomAt = (nz, cx, cy) => {
      const st = stageRef.current; nz = Math.max(1, Math.min(4, nz));
      if (!st || Math.abs(nz - zRef.current) < 0.001) return;
      const r = st.getBoundingClientRect();
      if (cx == null) { cx = r.left + r.width / 2; cy = r.top + r.height / 2; }
      const ratio = nz / zRef.current, px = cx - r.left + st.scrollLeft, py = cy - r.top + st.scrollTop;
      ReactDOM.flushSync(() => setZ(nz));
      st.scrollLeft = px * ratio - (cx - r.left); st.scrollTop = py * ratio - (cy - r.top);
    };
    const close = () => onClose(secNowRef.current);

    // keyboard
    const keys = useRef(null);
    keys.current = e => {
      if (e.target.matches && e.target.matches('input[type="text"], textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
      const kk = e.key;
      if (kk === 'ArrowRight' || kk === 'PageDown' || (kk === ' ' && !e.shiftKey)) next();
      else if (kk === 'ArrowLeft' || kk === 'PageUp' || (kk === ' ' && e.shiftKey)) prev();
      else if (kk === 'Home') turnTo(0);
      else if (kk === 'End') turnTo(total - 1);
      else if (kk === '+' || kk === '=') zoomAt(zRef.current + 0.25);
      else if (kk === '-') zoomAt(zRef.current - 0.25);
      else if (kk === '0') zoomAt(1);
      else if (kk === 'Escape') close();
      else return;
      e.preventDefault();
    };
    useEffect(() => { const f = e => keys.current(e); window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f); }, []);

    // wheel: Ctrl/pinch-wheel zooms; at fit, a deliberate wheel or trackpad swipe turns the page
    const wheelAcc = useRef({ v: 0, t: 0 });
    useEffect(() => {
      const st = stageRef.current; if (!st) return;
      const onWheel = e => {
        if (e.ctrlKey || e.metaKey) { e.preventDefault(); zoomAt(zRef.current * Math.exp(-e.deltaY * 0.0022), e.clientX, e.clientY); return; }
        if (zRef.current > 1.02) return;
        e.preventDefault();
        const a = wheelAcc.current, now = Date.now();
        if (now - a.t < 650) return;
        a.v += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (Math.abs(a.v) > 90) { a.t = now; const d = a.v; a.v = 0; keys.current({ key: d > 0 ? 'ArrowRight' : 'ArrowLeft', target: st, preventDefault() {} }); }
      };
      st.addEventListener('wheel', onWheel, { passive: false });
      return () => st.removeEventListener('wheel', onWheel);
    }, []);

    // touch and mouse: swipe or tap the page edge to turn, pinch or double-tap to zoom
    const ptr = useRef({ pts: new Map(), pinch: null, start: null, lastTap: 0 });
    const onDown = e => {
      const P = ptr.current; P.pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (P.pts.size === 2) { const [a, b] = [...P.pts.values()]; P.pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), z: zRef.current }; P.start = null; }
      else if (P.pts.size === 1) P.start = { x: e.clientX, y: e.clientY, t: Date.now(), type: e.pointerType };
    };
    const onMove = e => {
      const P = ptr.current; if (!P.pts.has(e.pointerId)) return;
      P.pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (P.pinch && P.pts.size === 2) { const [a, b] = [...P.pts.values()]; zoomAt(P.pinch.z * Math.hypot(a.x - b.x, a.y - b.y) / P.pinch.d, (a.x + b.x) / 2, (a.y + b.y) / 2); }
    };
    const onUp = e => {
      const P = ptr.current; P.pts.delete(e.pointerId);
      if (P.pts.size < 2) P.pinch = null;
      const s0 = P.start; P.start = null;
      if (!s0 || P.pts.size) return;
      const dx = e.clientX - s0.x, dy = e.clientY - s0.y, moved = Math.hypot(dx, dy);
      if (s0.type !== 'mouse' && zRef.current <= 1.02 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) { dx < 0 ? next() : prev(); return; }
      if (moved > 8 || (window.getSelection && String(window.getSelection()).length)) return;
      const now = Date.now();
      if (s0.type !== 'mouse' && now - P.lastTap < 300) { P.lastTap = 0; zoomAt(zRef.current > 1.3 ? 1 : 2, e.clientX, e.clientY); return; }
      P.lastTap = now;
      if (zRef.current > 1.02) return;
      const book = stageRef.current && stageRef.current.querySelector('.bbook'); if (!book) return;
      const r = book.getBoundingClientRect(), x = (e.clientX - r.left) / r.width;
      if (x > 0.82) next(); else if (x < 0.18) prev();
    };

    const flow = i => ({ width: CW + 'px', height: CH + 'px', columnWidth: CW + 'px', columnGap: 2 * PX + 'px', fontSize: FS + 'px', transform: 'translateX(' + (-i * PW) + 'px)' });
    const pageEl = (i, side, key) => (i == null || i < 0 || i >= total)
      ? html`<div key=${key} className=${'bpage blank ' + side}></div>`
      : html`<div key=${key} className=${'bpage ' + side} aria-hidden=${key === 'leaf-f' || key === 'leaf-b' ? 'true' : null}>
          ${i > 0 && html`<div className="brun">${side === 'left' && spread ? c.name : (chapter.runTitle || chapter.title)}</div>`}
          <div className="bwin"><div className="bflow" style=${flow(i)}>${chapter.content}</div></div>
          <div className="bnum">${i + 1}</div>
        </div>`;

    let left = null, right = null, leaf = null;
    if (spread) {
      left = page; right = page + 1;
      if (turn && turn.dir > 0) { left = turn.from; right = turn.from + 3; leaf = { cls: 'fwd spread', f: [turn.from + 1, 'right'], b: [turn.from + 2, 'left'] }; }
      if (turn && turn.dir < 0) { left = turn.from - 2; right = turn.from + 1; leaf = { cls: 'back', f: [turn.from, 'left'], b: [turn.from - 1, 'right'] }; }
    } else {
      right = page;
      if (turn && turn.dir > 0) { right = turn.to; leaf = { cls: 'fwd', f: [turn.from, 'right'], b: [null, 'left'] }; }
      if (turn && turn.dir < 0) { right = turn.from; leaf = { cls: 'in', f: [turn.to, 'right'], b: [null, 'left'] }; }
    }
    const label = spread ? 'Pages ' + (page + 1) + (page + 2 <= total ? '–' + (page + 2) : '') + ' of ' + total : 'Page ' + (page + 1) + ' of ' + total;
    const shortLabel = spread ? label : (page + 1) + ' / ' + total;
    const atEnd = here() + step > total - 1, atStart = here() === 0;
    const lastVisible = page + (spread ? 1 : 0);
    let secNow = lay.sec.findIndex(pg => pg >= page && pg <= lastVisible);
    if (secNow < 0) secNow = lay.sec.reduce((best, pg, i) => pg <= page ? i : best, 0);
    secNowRef.current = secNow;

    return html`<div className="bookmode" role="dialog" aria-modal="true" aria-label=${'Book view: ' + chapter.title}>
      <header className="bbar">
        <button className="btn ghost" onClick=${close} aria-label="Close the book">✕<span className="hide-s"> Close</span></button>
        <div className="btitle"><span className="kicker">${chapter.kicker}</span><b>${chapter.title}</b></div>
        <select className="secpick bsel" id=${'booksec-' + k} aria-label="Go to a section" value=${secNow} onChange=${e => turnTo(lay.sec[+e.target.value] || 0)}>
          ${chapter.sections.map((t, i) => html`<option key=${i} value=${i}>${t}</option>`)}
        </select>
        <div className="bzoom" role="group" aria-label="Zoom">
          <button onClick=${() => zoomAt(zRef.current - 0.25)} disabled=${z <= 1} aria-label="Zoom out">−</button>
          <button className="zv" onClick=${() => zoomAt(1)} title="Fit the page (0)">${Math.round(z * 100)}%</button>
          <button onClick=${() => zoomAt(zRef.current + 0.25)} disabled=${z >= 4} aria-label="Zoom in">+</button>
        </div>
        <span className="sizes hide-s" role="group" aria-label="Text size">
          ${READ_SIZES.map(([id, lab, px]) => html`<button key=${id} aria-pressed=${String(size === id)} title=${lab} aria-label=${lab} onClick=${() => setSize(id)}><span style=${{ fontSize: px + 'px' }}>A</span></button>`)}
        </span>
      </header>

      <div className=${'bstage' + (z > 1.02 ? ' zoomed' : '')} ref=${stageRef} onPointerDown=${onDown} onPointerMove=${onMove} onPointerUp=${onUp} onPointerCancel=${onUp}>
        <div className="bsizer" style=${{ width: (bookW + 28) * scale + 'px', height: (bookH + 24) * scale + 'px' }}>
          <div className=${'bbook' + (spread ? ' spread' : ' single')} style=${{ width: bookW + 'px', height: bookH + 'px', left: 14 * scale + 'px', top: 12 * scale + 'px', transform: 'scale(' + scale + ')',
              '--pw': PW + 'px', '--ph': PH + 'px', '--px': PX + 'px', '--pt': PT + 'px', '--cw': CW + 'px', '--ch': CH + 'px' }}>
            <div className="bcover" aria-hidden="true"></div>
            ${spread && pageEl(left, 'left', 'L')}
            ${pageEl(right, 'right', 'R')}
            ${leaf && html`<div className=${'bleaf ' + leaf.cls + (turn.go ? ' go' : '')} onTransitionEnd=${e => { if (e.target === e.currentTarget) finish(); }}>
              <div className="bface front">${pageEl(leaf.f[0], leaf.f[1], 'leaf-f')}</div>
              <div className="bface back">${pageEl(leaf.b[0], leaf.b[1], 'leaf-b')}</div>
            </div>`}
            ${spread && html`<div className="bspine" aria-hidden="true"></div>`}
          </div>
        </div>
        <div className="bmeasure" aria-hidden="true"><div ref=${measureRef} className="bflow" style=${Object.assign(flow(0), { transform: 'none', position: 'relative' })}>${chapter.content}</div></div>
      </div>

      <footer className="bfoot">
        <button className="bturn" onClick=${prev} disabled=${atStart && !chapter.prev} aria-label=${atStart && chapter.prev ? 'Previous lecture' : 'Previous page'}>${atStart && chapter.prev ? '« Lecture' : '‹'}</button>
        <input type="range" id=${'bookpage-' + k} min="0" max=${Math.max(0, total - 1)} step=${step} value=${page} aria-label="Page" onInput=${e => turnTo(+e.target.value)} />
        <span className="bplabel" aria-label=${label}><span className="lf">${label}</span><span className="ls">${shortLabel}</span></span>
        <button className="bturn" onClick=${next} disabled=${atEnd && !chapter.next} aria-label=${atEnd && chapter.next ? 'Next lecture' : 'Next page'}>${atEnd && chapter.next ? 'Lecture »' : '›'}</button>
      </footer>
    </div>`;
  }

  /* ════════════ PROGRESS (weak spots) ════════════ */
  function Progress({ k, miss, setMiss, fixed, setFixed, read, known, best, go }) {
    const c = C[k];
    const stats = store.get('stats:' + k, {}), srs = store.get('srs:' + k, {}), t = today();
    const knownSet = new Set(known), missSet = new Set(miss);
    const rows = c.lectures.map(l => {
      const cardIds = l.cards.map((_, i) => l.n + '-' + i), qIds = l.quiz.map((_, i) => l.n + '-' + i);
      let r = 0, w = 0; qIds.forEach(id => { const v = stats[id]; if (v) { r += v[0]; w += v[1]; } });
      const att = r + w, acc = att ? r / att : null;
      const kn = cardIds.filter(id => knownSet.has(id)).length;
      const due = cardIds.filter(id => srs[id] && srs[id].due <= t).length;
      const isRead = read.includes(l.n), mistakes = qIds.filter(id => missSet.has(id)).length;
      const status = !(isRead || att || kn) ? 'new' : att >= 3 && acc < 0.6 ? 'weak' : isRead && att >= 3 && acc >= 0.85 ? 'strong' : 'going';
      return { l, cards: cardIds.length, kn, due, att, acc, isRead, mistakes, status };
    });
    const att = rows.reduce((a, r) => a + r.att, 0), right = rows.reduce((a, r) => a + (r.acc || 0) * r.att, 0);
    const di = dueInfo(k, cardsOf(k).length), bestMock = store.get('mock:' + k, null);
    const LABEL = { new: 'Not started', weak: 'Weak spot', going: 'In progress', strong: 'Strong' };

    const next = [];
    if (di.total) next.push({ t: 'Review ' + di.total + ' index card' + (di.total > 1 ? 's' : ''), d: (di.due ? di.due + ' due for review' : '') + (di.due && di.fresh ? ' and ' : '') + (di.fresh ? di.fresh + ' new for today' : '') + '. About ' + Math.max(1, Math.round(di.total * 0.25)) + ' min.',
      a: [['Start review', () => go({ mode: 'cards', cardsAuto: Date.now() })]] });
    const weak = rows.filter(r => r.status === 'weak').sort((a, b) => a.acc - b.acc)[0];
    if (weak) next.push({ t: 'Shore up lecture ' + weak.l.n + ': ' + weak.l.title, d: Math.round(weak.acc * 100) + '% correct over ' + weak.att + ' answers. Re-read the notes, then quiz it again.',
      a: [['Re-read notes', () => go({ mode: 'read', lec: weak.l.n })], ['Quiz this lecture', () => go({ mode: 'quiz', quizPreset: { lecs: [weak.l.n], t: Date.now() } })]] });
    if (miss.length) next.push({ t: 'Fix ' + miss.length + ' saved mistake' + (miss.length > 1 ? 's' : ''), d: 'Questions you got wrong before. Each one leaves the list when you answer it right.',
      a: [['Practise them', () => go({ mode: 'quiz', quizPreset: { ids: shuffle(miss.slice()), t: Date.now() } })]] });
    const untested = rows.find(r => r.isRead && !r.att);
    if (untested) next.push({ t: 'Test yourself on lecture ' + untested.l.n, d: 'You read it but haven\'t answered any of its ' + untested.l.quiz.length + ' questions yet.',
      a: [['Quiz this lecture', () => go({ mode: 'quiz', quizPreset: { lecs: [untested.l.n], t: Date.now() } })]] });
    const fresh = rows.find(r => r.status === 'new');
    if (fresh) next.push({ t: 'Start lecture ' + fresh.l.n + ': ' + fresh.l.title, d: 'Not opened yet. About ' + minutesFor(fresh.l) + ' min to read.', a: [['Read it', () => go({ mode: 'read', lec: fresh.l.n })]] });
    if (next.length < 3) next.push({ t: 'Sit a timed mock exam', d: 'Past-exam questions under time pressure, marked at the end.' + (bestMock != null ? ' Your best so far: ' + bestMock + '%.' : ''), a: [['Go to mock exam', () => go({ mode: 'quiz' })]] });

    return html`<div className="progress">
      <section className="pg-stats">
        <div><b>${read.length}<span className="of">/${c.lectures.length}</span></b><span>lectures read</span></div>
        <div><b>${known.length}<span className="of">/${cardsOf(k).length}</span></b><span>cards known</span></div>
        <div><b>${di.total}</b><span>cards to review today</span></div>
        <div><b>${att ? Math.round(right / att * 100) + '%' : '–'}</b><span>${att ? 'correct over ' + att + ' answers' : 'quiz accuracy'}</span></div>
        <div><b>${best == null ? '–' : best + '%'}</b><span>best quiz</span></div>
        <div><b>${bestMock == null ? '–' : bestMock + '%'}</b><span>best mock exam</span></div>
      </section>

      <section className="paper pg-next">
        
        <p className="kicker">Study next</p>
        <ol>${next.slice(0, 3).map((x, i) => html`<li key=${i}>
          <span className="pg-n">${i + 1}</span>
          <div><h3>${x.t}</h3><p>${x.d}</p><div className="row">${x.a.map(([label, fn], j) => html`<button key=${j} className=${'btn' + (j === 0 ? ' solid' : '')} onClick=${fn}>${label}</button>`)}</div></div>
        </li>`)}</ol>
      </section>

      <section className="ledger pg-table">
        <table>
          <thead><tr><th>Lecture</th><th>Read</th><th>Cards known</th><th>Quiz accuracy</th><th>Mistakes</th><th>Status</th></tr></thead>
          <tbody>${rows.map(r => html`<tr key=${r.l.n} onClick=${() => go({ mode: 'read', lec: r.l.n })}>
            <td><span className="cname"><span className="lnum">L${r.l.n}</span><span className="lt">${r.l.title}</span></span></td>
            <td>${r.isRead ? html`<span style=${{ color: 'var(--ok)' }}>✓</span>` : html`<span className="muted">–</span>`}</td>
            <td><span className="meter" style=${{ '--w': Math.round(r.kn / Math.max(1, r.cards) * 100) + '%', '--sp': 'var(--c)' }}><b>${r.kn}/${r.cards}</b><i></i></span></td>
            <td>${r.att ? html`<span className="meter" style=${{ '--w': Math.round(r.acc * 100) + '%', '--sp': r.acc >= 0.6 ? 'var(--ok)' : 'var(--pen)' }}><b>${Math.round(r.acc * 100)}%</b><i></i></span><small className="muted"> ${r.att} ans.</small>` : html`<span className="muted">not tried</span>`}</td>
            <td>${r.mistakes ? html`<span style=${{ color: 'var(--pen)' }}>${r.mistakes}</span>` : html`<span className="muted">0</span>`}</td>
            <td><span className=${'status ' + r.status}>${LABEL[r.status]}</span></td>
          </tr>`)}</tbody>
        </table>
      </section>

      <${Mistakes} k=${k} miss=${miss} setMiss=${setMiss} fixed=${fixed} setFixed=${setFixed} go=${go} />
    </div>`;
  }

  /* ════════════ REVISION SHEET ════════════ */
  function RevisionSheet({ k, go, read, onSection }) {
    const c = C[k];
    const [cover, setCover] = usePersist('revcover', false);
    const [shown, setShown] = useState({});
    useEffect(() => { onSection && onSection(null); setShown({}); }, [k]);
    const reveal = id => cover && setShown(o => Object.assign({}, o, { [id]: !o[id] }));
    const hidden = id => cover && !shown[id];
    const data = useMemo(() => c.lectures.map(l => ({
      l,
      formulas: l.notes.filter(s => s.formula).flatMap(s => s.formula),
      exam: l.quiz.map((q, i) => Object.assign({ id: l.n + '-' + i }, q)).filter(isExam)
    })), [k]);
    const terms = data.reduce((a, d) => a + d.l.cards.length, 0), formulas = data.reduce((a, d) => a + d.formulas.length, 0), exam = data.reduce((a, d) => a + d.exam.length, 0);
    const coverProps = id => hidden(id) ? { className: 'covered', role: 'button', tabIndex: 0, 'aria-label': 'Show answer', onClick: () => reveal(id), onKeyDown: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(id); } } } : { onClick: () => reveal(id) };
    const jump = n => { const el = document.getElementById('rev-' + n); if (el) el.scrollIntoView({ behavior: calm() ? 'auto' : 'smooth', block: 'start' }); };
    const [book, setBook] = usePersist('bookopen', false);
    const chapter = useMemo(() => ({ id: 'rev', kicker: 'Revision sheet', title: c.name, sections: c.lectures.map(l => 'Lecture ' + l.n + ' · ' + cleanTitle(l.title)), content: bookRevision(c), next: null, prev: null }), [k]);

    return html`<div className="read">
      <div className="readcol">
        <div className="readtools">
          <span className="rt-meta">${terms} terms · ${formulas} formula lines · ${exam} past-paper answers</span>
          <span className="grow"></span>
          <button className="tbtn" aria-pressed=${String(!!cover)} onClick=${() => { setCover(!cover); setShown({}); }}>${cover ? 'Show all answers' : 'Cover the answers'}</button>
          <button className="tbtn bookbtn" onClick=${() => setBook(true)}><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M3 5.5C5.5 4.5 9 4.5 12 6.5c3-2 6.5-2 9-1v13c-2.5-1-6-1-9 1-3-2-6.5-2-9-1z M12 6.5v13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>Book view</button>
        </div>
        ${book && html`<${Book} k=${k} chapter=${chapter} onClose=${i => { setBook(false); requestAnimationFrame(() => jump(c.lectures[i] ? c.lectures[i].n : c.lectures[0].n)); }} />`}
        <article className="paper revsheet">
          
          <header className="page-head">
            <p className="kicker" style=${{ color: 'var(--c)' }}>Revision sheet · ${c.short}</p>
            <h2>The whole course on one page</h2>
            <p className="meta">${cover ? 'Answers are covered. Tap one to check yourself.' : 'Every key term, formula and past-paper answer, lecture by lecture.'}</p>
          </header>
          ${data.map(({ l, formulas, exam }) => html`<section key=${l.n} className="rev-lec" id=${'rev-' + l.n}>
            <h3><span className="sec">L${l.n}</span>${l.title}</h3>
            <dl className="terms">${l.cards.map((x, i) => { const id = 'c' + l.n + '-' + i; return html`<div key=${i} className="term"><dt>${x[0]}</dt><dd ...${coverProps(id)}>${x[1]}<${Ar} t=${arCard(k, l.n + '-' + i)} /></dd></div>`; })}</dl>
            ${formulas.length > 0 && html`<div className="formula">${formulas.join('\n')}</div>`}
            ${exam.length > 0 && html`<div className="rev-exam"><p className="flabel">From past papers</p><ul>
              ${exam.map(q => html`<li key=${q.id}><${H} h=${q.q} /> <span className="arrow">→</span> <b ...${coverProps('q' + q.id)}><${H} h=${q.o[q.a][0]} /></b></li>`)}
            </ul></div>`}
          </section>`)}
        </article>
      </div>
      <aside className="outline" aria-label="Lectures on this sheet">
        <p className="kicker">On this sheet</p>
        <ol>${c.lectures.map(l => html`<li key=${l.n}><button onClick=${() => jump(l.n)}><span className="on-n">L${l.n}</span><span>${l.title}</span></button></li>`)}</ol>
      </aside>
    </div>`;
  }

  /* ════════════ MISTAKES ════════════ */
  function Mistakes({ k, miss, setMiss, fixed, setFixed, go }) {
    const all = quizOf(k);
    const items = miss.map(id => all.find(q => q.id === id)).filter(Boolean);
    const [confirm, setConfirm] = useState(false);
    return html`<article className="paper">
      
      <header className="misshead">
        <div>
          <p className="kicker">Saved from your quizzes</p>
          <h2>${items.length} to fix<span className="fixed-n"> · ${fixed.length} fixed</span></h2>
          <p className="muted small" style=${{ margin: '6px 0 0' }}>A question leaves this list, and counts as fixed, when you answer it correctly in a later quiz.</p>
        </div>
        ${items.length > 0 && html`<div className="row">
          <button className="btn solid" onClick=${() => go({ mode: 'quiz', quizPreset: { ids: shuffle(items.map(q => q.id)), t: Date.now() } })}>Practise all ${items.length}</button>
          ${confirm ? html`<span className="row small"><span>Clear the list?</span><button className="btn" onClick=${() => { setMiss([]); setFixed([]); setConfirm(false); }}>Yes, clear</button><button className="btn ghost" onClick=${() => setConfirm(false)}>Keep</button></span>`
                    : html`<button className="btn ghost" onClick=${() => setConfirm(true)}>Clear list</button>`}
        </div>`}
      </header>
      ${!items.length ? html`<div className="empty"><span className="pen">Clean sheet.</span>${fixed.length ? 'You fixed all ' + fixed.length + ' question' + (fixed.length > 1 ? 's' : '') + ' you got wrong. New mistakes will appear here.' : 'Questions you get wrong in a quiz will be collected here.'}</div>`
        : html`<div className="review" style=${{ marginTop: '6px' }}>${items.map(q => html`<div key=${q.id} className="rv">
            <div className="row" style=${{ alignItems: 'flex-start' }}>
              <div className="grow" style=${{ minWidth: 0 }}>
                <p className="qtop" style=${{ margin: '0 0 4px' }}><span className="tag lec">L${q.lec}</span><${Source} q=${q} /></p>
                <div className="q"><${H} h=${q.q} /></div>
                <p><span className="good">Answer: ${LET[q.a]}</span><${H} h=${q.o[q.a][0]} />. <span className="muted"><${H} h=${q.o[q.a][1]} /></span><${Ar} t=${arQ(k, q, q.a)} /></p>
              </div>
              <button className="btn ghost small" onClick=${() => go({ mode: 'quiz', quizPreset: { ids: [q.id], t: Date.now() } })}>Try again</button>
            </div>
          </div>`)}</div>`}
    </article>`;
  }

  /* ════════════ SEARCH ════════════ */
  let INDEX = null;
  function buildIndex() {
    if (INDEX) return INDEX;
    const out = [];
    ORDER.forEach(([k]) => {
      const c = C[k];
      c.lectures.forEach(l => {
        l.notes.forEach((s, i) => {
          const body = [].concat(s.pts || [], s.formula || [], (s.table || []).flat(), s.code || []).map(strip).join(' ');
          out.push({ k, kind: 'Notes', lec: l.n, title: strip(s.h), text: body, to: { view: 'course', course: k, mode: 'read', lec: l.n, anchor: 'sec-' + l.n + '-' + i } });
        });
        l.cards.forEach((x, i) => out.push({ k, kind: 'Card', lec: l.n, title: x[0], text: x[1], to: { view: 'course', course: k, mode: 'cards', lec: l.n, cardFocus: l.n + '-' + i } }));
        l.qa.forEach(x => out.push({ k, kind: 'Q&A', lec: l.n, title: x[0], text: x[1], to: { view: 'course', course: k, mode: 'ask', lec: l.n, askLec: l.n } }));
        l.quiz.forEach((x, i) => out.push({ k, kind: originOf(x) === 'extra' ? 'Extra question' : 'Quiz', lec: l.n, title: strip(x.q), text: x.o.map(o => strip(o[0])).join(' · '), to: { view: 'course', course: k, mode: 'quiz', lec: l.n, quizPreset: { ids: [l.n + '-' + i], t: 0 } } }));
        (l.extra || []).forEach((x, i) => out.push({ k, kind: 'Extra question', lec: l.n, title: strip(x.q), text: x.o.map(o => strip(o[0])).join(' · '), to: { view: 'course', course: k, mode: 'quiz', lec: l.n, quizPreset: { ids: ['x' + l.n + '-' + i], t: 0 } } }));
      });
    });
    out.forEach(e => { e.low = (e.title + ' ' + e.text).toLowerCase(); });
    return (INDEX = out);
  }
  const esc = s => s.replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  function highlight(s, terms) {
    let h = esc(s);
    terms.forEach(t => { if (t.length < 2) return; const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'); h = h.replace(re, '<mark>$1</mark>'); });
    return h;
  }
  function snippet(text, terms) {
    const low = text.toLowerCase();
    let at = -1; terms.some(t => (at = low.indexOf(t)) >= 0);
    if (at < 0) return text.slice(0, 160);
    const s = Math.max(0, at - 60);
    return (s ? '…' : '') + text.slice(s, s + 180);
  }
  function Search({ close, go }) {
    const [q, setQ] = useState('');
    const [sel, setSel] = useState(0);
    const inputRef = useRef(null);
    const [ready, setReady] = useState(() => ORDER.every(([k]) => C[k]));
    const [failed, setFailed] = useState(false);
    useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
    useEffect(() => {
      if (ready) return;
      Promise.all(ORDER.map(([k]) => loadCourse(k))).then(() => setReady(true), () => setFailed(true));
    }, []);
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const results = useMemo(() => {
      if (q.trim().length < 2 || !ready) return [];
      const idx = buildIndex();
      const hits = idx.filter(e => terms.every(t => e.low.includes(t)));
      const score = e => terms.reduce((a, t) => a + (e.title.toLowerCase().includes(t) ? 3 : 0), 0) + (e.kind === 'Notes' ? 1 : 0);
      return hits.sort((a, b) => score(b) - score(a)).slice(0, 40);
    }, [q, ready]);
    const choose = r => { const to = Object.assign({}, r.to); if (to.quizPreset) to.quizPreset = Object.assign({}, to.quizPreset, { t: Date.now() }); go(to); window.scrollTo(0, 0); };
    const onKey = e => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, results.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
      else if (e.key === 'Enter' && results[sel]) choose(results[sel]);
    };
    return html`<div className="scrim" onMouseDown=${e => { if (e.target === e.currentTarget) close(); }}>
      <div className="palette" role="dialog" aria-label="Search all courses">
        <div className="sin">${Icon.search}
          <input id="search-input" ref=${inputRef} value=${q} placeholder="Search notes, cards, Q&A and quiz questions…" onInput=${e => { setQ(e.target.value); setSel(0); }} onKeyDown=${onKey} autoComplete="off" />
          <kbd>Esc</kbd>
        </div>
        <div className="results">
          ${failed ? html`<p className="small" style=${{ padding: '8px 18px', color: 'var(--pen)' }}>Some courses didn't load, so search is unavailable. Check your connection and reopen search.</p>`
            : !ready ? html`<p className="muted small" style=${{ padding: '8px 18px' }}>Loading all six courses for search…</p>`
            : q.trim().length < 2 ? html`<p className="muted small" style=${{ padding: '8px 18px' }}>Try "Belady", "FIRST set", "wireframe", "Nyquist" or "cyclomatic".</p>`
            : !results.length ? html`<p className="muted small" style=${{ padding: '8px 18px' }}>Nothing matches "${q}". Try a shorter word.</p>`
            : results.map((r, i) => html`<button key=${i} className=${'res sp-' + r.k + (i === sel ? ' on' : '')} onMouseEnter=${() => setSel(i)} onClick=${() => choose(r)}>
                <span className="chipdot"></span>
                <span style=${{ minWidth: 0 }}>
                  <span className="rm">${C[r.k].short} · L${r.lec} · ${r.kind}</span>
                  <span className="rt" style=${{ display: 'block' }} dangerouslySetInnerHTML=${{ __html: highlight(r.title, terms) }}></span>
                  <span className="rs" dangerouslySetInnerHTML=${{ __html: highlight(snippet(r.text, terms), terms) }}></span>
                </span>
              </button>`)}
        </div>
        <div className="shint"><span><kbd>↑</kbd> <kbd>↓</kbd> move</span><span><kbd>Enter</kbd> open</span><span>${results.length ? results.length + (results.length === 40 ? '+' : '') + ' results' : ''}</span></div>
      </div>
    </div>`;
  }

  /* ── boot ── */
  const root = ReactDOM.createRoot(document.getElementById('root'));
  if (!ORDER.length) { document.getElementById('root').innerHTML = '<p class="boot">The course files did not load. Refresh the page to try again.</p>'; return; }
  root.render(html`<${App} />`);
}

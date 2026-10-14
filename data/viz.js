// Animated diagrams for the notes. A note section can carry viz: { type, ...settings, ops: [...] }.
// Nothing is drawn by hand: each diagram runs the operations with the lecture's own rules
// (top = -1, head/tail = -1, temp1/temp2, h1 + i + i², ...) and records one frame per step,
// so the picture always agrees with the code in the notes. build.mjs copies this file to data/viz.js;
// app.js loads it only when a lecture that has a diagram is opened.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);
  const calm = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ════════ frames ════════
     A frame is { items, edges, cap: [english, arabic], out }.
     item: { id, k: kind, x, y, w, h, t: text, c: class, from: {dx, dy} (where a new item slides in from) }
     edge: { id, a, b, as, bs: anchors, c: class, bend } */
  const SIZE = { cell: [56, 38], val: [56, 38], node: [84, 38], dnode: [112, 38], circ: [40, 40], slot: [64, 34] };
  function mk(k, id, x, y, extra) {
    const s = SIZE[k] || [0, 0];
    return Object.assign({ id, k, x, y, w: s[0], h: s[1] }, extra || {});
  }
  const ptr = (id, x, y, t, c) => ({ id, k: 'ptr', x, y, w: Math.max(44, t.length * 7.4 + 18), h: 24, t, c: c || '' });
  const lbl = (id, x, y, t, c) => ({ id, k: 'lbl', x, y, w: 0, h: 0, t: String(t), c: c || '' });

  // anchor points: sides, the next/prev boxes of list nodes, or 'auto' (the rectangle edge facing the other item)
  function anchor(it, side, other) {
    const cx = it.x + it.w / 2, cy = it.y + it.h / 2;
    if (it.k === 'lbl') { const hw = String(it.t).length * 3.9 + 5, ox = other ? other.x + other.w / 2 : cx; return [ox < cx ? cx - hw : cx + hw, cy]; }
    if (it.k === 'ptr' && side === 'c') return [cx, cy];
    switch (side) {
      case 't': return [cx, it.y];
      case 'b': return [cx, it.y + it.h];
      case 'l': return [it.x, cy];
      case 'r': return [it.x + it.w, cy];
      case 'next': return it.k === 'dnode' ? [it.x + it.w - 13, it.y + 12] : [it.x + it.w - 14, cy];
      case 'prev': return [it.x + 13, it.y + it.h - 12];
      case 'inU': return [it.x, it.y + 12];             // a doubly node's left side, upper lane (next arrows arrive here)
      case 'outL': return [it.x + it.w, it.y + it.h - 12]; // right side, lower lane (prev arrows arrive here)
      default: {
        const ox = other.x + other.w / 2, oy = other.y + other.h / 2, dx = ox - cx, dy = oy - cy;
        if (it.k === 'circ') { const d = Math.hypot(dx, dy) || 1; return [cx + dx / d * it.w / 2, cy + dy / d * it.h / 2]; }
        const sx = dx ? (it.w / 2) / Math.abs(dx) : Infinity, sy = dy ? (it.h / 2) / Math.abs(dy) : Infinity, s = Math.min(sx, sy);
        return s === Infinity ? [cx, cy] : [cx + dx * s, cy + dy * s];
      }
    }
  }

  /* ════════ captions in both languages ════════ */
  const C = (en, ar) => [en, ar];

  /* ════════ array-based structures ════════ */
  // values are their own items (so a pushed value drops in and a popped one is left greyed out, as in memory)
  let vid = 0;
  const newVal = () => 'v' + (++vid);

  function stackSim(spec) {
    const N = spec.size || 4, frames = [];
    const arr = Array(N).fill(null);  // {id, v}
    let top = -1;
    const X = 110, cellY = i => (N - 1 - i) * 44 + 20;
    const draw = (cap, hl) => {
      const items = [], edges = [];
      items.push(lbl('title', X + 28, 4, 'stack_arr  (MAXSIZE = ' + N + ')', 'muted'));
      for (let i = 0; i < N; i++) {
        items.push(mk('cell', 'c' + i, X, cellY(i), { c: hl && hl[i] || '' }));
        items.push(lbl('i' + i, X + 76, cellY(i) + 19, '[' + i + ']', 'muted'));
        if (arr[i]) items.push(mk('val', arr[i].id, X, cellY(i), { t: arr[i].v, c: i > top ? 'stale' : '', from: { dx: 0, dy: -40 } }));
      }
      if (top >= 0) { items.push(ptr('top', 0, cellY(top) + 7, 'top = ' + top, 'on')); edges.push({ id: 'e-top', a: 'top', as: 'r', b: 'c' + top, bs: 'l' }); }
      else items.push(ptr('top', 0, cellY(0) + 52, 'top = -1', ''));
      frames.push({ items, edges, cap });
    };
    draw(C('Empty stack: top = -1 (isEmpty is true).', 'الـ stack فاضي: الـ top = -1 (يعني isEmpty بترجع true).'));
    for (const op of spec.ops) {
      const [name, a] = op.split(' ');
      if (name === 'push') {
        if (top === N - 1) { draw(C(`push(${a}): top == MAXSIZE − 1 (${N - 1}), so isFull is true → "Stack overflow".`, `push(${a}): الـ top == MAXSIZE − 1 (يعني ${N - 1})، فالـ isFull بترجع true → "Stack overflow".`), { [top]: 'bad' }); continue; }
        top++; arr[top] = { id: newVal(), v: a };
        draw(C(`push(${a}): top = top + 1 = ${top}, then stack_arr[${top}] = ${a}.`, `push(${a}): الـ top = top + 1 = ${top}، وبعدين stack_arr[${top}] = ${a}.`), { [top]: 'new' });
      } else if (name === 'pop') {
        if (top === -1) { draw(C('pop(): top == -1, so isEmpty is true → "Stack underflow", returns -1.', 'pop(): الـ top == -1، فالـ isEmpty بترجع true → "Stack underflow" وبترجع -1.')); continue; }
        const v = arr[top].v; top--;
        draw(C(`pop(): item = stack_arr[${top + 1}] = ${v}, top = ${top}, returns ${v}. The value stays in the array (greyed out) but is no longer part of the stack.`, `pop(): الـ item = stack_arr[${top + 1}] = ${v}، والـ top بقى ${top}، وبترجع ${v}. القيمة لسه موجودة في الـ array (باهتة) بس خلاص مش جزء من الـ stack.`), { [top + 1]: 'gone' });
      } else if (name === 'peek') {
        draw(top < 0 ? C('peek(): the stack is empty.', 'peek(): الـ stack فاضي.') : C(`peek(): returns stack_arr[top] = ${arr[top].v} without removing it.`, `peek(): بترجع stack_arr[top] = ${arr[top].v} من غير ما تشيلها.`), { [top]: 'hl' });
      }
    }
    return frames;
  }

  function queueSim(spec) {
    const N = spec.size || 5, frames = [], arr = Array(N).fill(null);
    let head = -1, tail = -1;
    const H = spec.names ? spec.names[0] : 'head', T = spec.names ? spec.names[1] : 'tail';
    const X0 = 96, cx = i => X0 + i * 62, Y = 64;
    const draw = (cap, hl) => {
      const items = [], edges = [];
      items.push(lbl('title', X0 + (N * 62) / 2 - 4, 6, 'queue[ ]  (maxsize = ' + N + ')', 'muted'));
      for (let i = 0; i < N; i++) {
        items.push(mk('cell', 'c' + i, cx(i), Y, { c: hl && hl[i] || '' }));
        items.push(lbl('i' + i, cx(i) + 28, Y + 52, '[' + i + ']', 'muted'));
        const live = head !== -1 && i >= head && i <= tail;
        if (arr[i]) items.push(mk('val', arr[i].id, cx(i), Y, { t: arr[i].v, c: live ? '' : 'stale', from: { dx: 0, dy: -40 } }));
      }
      if (head >= 0 && head < N) { items.push(ptr('h', cx(head) + 28 - 30, 22, H + ' = ' + head, 'on')); edges.push({ id: 'e-h', a: 'h', as: 'b', b: 'c' + head, bs: 't' }); }
      else items.push(ptr('h', 0, 22, H + ' = ' + head, ''));
      if (tail >= 0) { items.push(ptr('t', cx(tail) + 28 - 30, Y + 70, T + ' = ' + tail, 'on2')); edges.push({ id: 'e-t', a: 't', as: 't', b: 'c' + tail, bs: 'b' }); }
      else items.push(ptr('t', 0, Y + 70, T + ' = -1', ''));
      frames.push({ items, edges, cap });
    };
    draw(C(`Empty queue: ${H} = -1, ${T} = -1.`, `الـ queue فاضي: ${H} = -1 و ${T} = -1.`));
    for (const op of spec.ops) {
      const [name, a] = op.split(' ');
      if (name === 'enqueue') {
        if (tail === N - 1) {
          const free = head > 0 ? head : 0;
          draw(free
            ? C(`enqueue(${a}): ${T} == maxsize − 1, so isFull says "Queue is full", although slots 0 to ${head - 1} are free. This wasted space is the problem of the linear queue; the circular queue fixes it.`, `enqueue(${a}): الـ ${T} == maxsize − 1، فالـ isFull بتقول "Queue is full" مع إن الأماكن من 0 لـ ${head - 1} فاضية. المساحة المهدرة دي هي مشكلة الـ linear queue، والـ circular queue هو اللي بيحلها.`)
            : C(`enqueue(${a}): ${T} == maxsize − 1 → "Queue is full".`, `enqueue(${a}): الـ ${T} == maxsize − 1 → "Queue is full".`),
            Object.fromEntries([...Array(head > 0 ? head : 0).keys()].map(i => [i, 'warn'])));
          continue;
        }
        const first = head === -1;
        if (first) head = 0;
        tail++; arr[tail] = { id: newVal(), v: a };
        draw(C(`enqueue(${a}): ${first ? H + ' was -1, so ' + H + ' = 0; ' : ''}${T} = ${T} + 1 = ${tail}, queue[${tail}] = ${a}.`, `enqueue(${a}): ${first ? 'الـ ' + H + ' كان -1، فبقى ' + H + ' = 0؛ ' : ''}الـ ${T} = ${T} + 1 = ${tail}، و queue[${tail}] = ${a}.`), { [tail]: 'new' });
      } else if (name === 'dequeue') {
        if (head === -1 || head > tail) { draw(C(`dequeue(): ${H} == -1 or ${H} > ${T}, so the queue is empty → "Queue Underflow", returns -1.`, `dequeue(): الـ ${H} == -1 أو ${H} > ${T}، يعني الـ queue فاضي → "Queue Underflow" وبترجع -1.`)); continue; }
        const v = arr[head].v; head++;
        draw(C(`dequeue(): element = queue[${head - 1}] = ${v}, then ${H}++ → ${H} = ${head}. Returns ${v}.${head > tail ? ' Now ' + H + ' > ' + T + ', so the queue is empty.' : ''}`, `dequeue(): الـ element = queue[${head - 1}] = ${v}، وبعدين ${H}++ → ${H} = ${head}. بترجع ${v}.${head > tail ? ' دلوقتي ' + H + ' > ' + T + '، يعني الـ queue فاضي.' : ''}`), { [head - 1]: 'gone' });
      }
    }
    return frames;
  }

  function cqueueSim(spec) {
    const N = spec.size || 5, frames = [], arr = Array(N).fill(null);
    let front = -1, rear = -1;
    const CX = 190, CY = 170, R = 100;
    const pos = (i, r) => { const a = (-90 + i * 360 / N) * Math.PI / 180; return [CX + r * Math.cos(a), CY + r * Math.sin(a)]; };
    const live = i => front !== -1 && (front <= rear ? i >= front && i <= rear : i >= front || i <= rear);
    const draw = (cap, hl) => {
      const items = [], edges = [];
      items.push({ id: 'ring', k: 'ring', x: CX - R, y: CY - R, w: 2 * R, h: 2 * R });
      for (let i = 0; i < N; i++) {
        const [x, y] = pos(i, R);
        items.push(mk('cell', 'c' + i, x - 28, y - 19, { c: hl && hl[i] || '' }));
        const [lx, ly] = pos(i, R + 44); items.push(lbl('i' + i, lx, ly, '[' + i + ']', 'muted'));
        if (arr[i]) items.push(mk('val', arr[i].id, x - 28, y - 19, { t: arr[i].v, c: live(i) ? '' : 'stale', from: { dx: 0, dy: -30 } }));
      }
      const pl = (id, name, idx, rr, dA, c) => {
        if (idx < 0) { items.push(ptr(id, CX - 40, CY - (id === 'f' ? 26 : -2), name + ' = -1', '')); return; }
        const a = (-90 + idx * 360 / N + dA) * Math.PI / 180, x = CX + rr * Math.cos(a), y = CY + rr * Math.sin(a);
        const p = ptr(id, 0, 0, name + ' = ' + idx, c); p.x = x - p.w / 2; p.y = y - p.h / 2; items.push(p);
        edges.push({ id: 'e-' + id, a: id, as: 'auto', b: 'c' + idx, bs: 'auto' });
      };
      pl('f', 'front', front, R - 62, front === rear ? -22 : 0, 'on');
      pl('r', 'rear', rear, R - 62, front === rear ? 22 : 0, 'on2');
      frames.push({ items, edges, cap });
    };
    draw(C(`Empty circular queue of size ${N}: front = -1, rear = -1. Index ${N - 1} is followed by index 0.`, `circular queue فاضي حجمه ${N}: الـ front = -1 والـ rear = -1. بعد الـ index ${N - 1} بييجي الـ index 0.`));
    for (const op of spec.ops) {
      const [name, a] = op.split(' ');
      if (name === 'enqueue') {
        if ((front === 0 && rear === N - 1) || (rear === (front - 1) % (N - 1))) { draw(C(`enQueue(${a}): isFull is true (front = ${front}, rear = ${rear}) → "Queue is full."`, `enQueue(${a}): الـ isFull بترجع true (الـ front = ${front} والـ rear = ${rear}) → "Queue is full."`), { [rear]: 'bad' }); continue; }
        const first = front === -1; if (first) front = 0;
        const old = rear; rear = (rear + 1) % N; arr[rear] = { id: newVal(), v: a };
        const wrap = old === N - 1;
        draw(C(`enQueue(${a}): ${first ? 'front was -1, so front = 0; ' : ''}rear = (${old} + 1) % ${N} = ${rear}${wrap ? ' (it wraps around to the start)' : ''}, arr[${rear}] = ${a}.`, `enQueue(${a}): ${first ? 'الـ front كان -1 فبقى 0؛ ' : ''}الـ rear = (${old} + 1) % ${N} = ${rear}${wrap ? ' (لف ورجع لأول الـ array)' : ''}، و arr[${rear}] = ${a}.`), { [rear]: 'new' });
      } else if (name === 'dequeue') {
        if (front === -1) { draw(C('deQueue(): front == -1 → "Queue is empty."', 'deQueue(): الـ front == -1 → "Queue is empty."')); continue; }
        const v = arr[front].v, old = front;
        if (front === rear) { front = -1; rear = -1; draw(C(`deQueue(): element = arr[${old}] = ${v}. front == rear (the last element), so front = rear = -1.`, `deQueue(): الـ element = arr[${old}] = ${v}. الـ front == rear (ده آخر عنصر)، فبيرجعوا front = rear = -1.`), { [old]: 'gone' }); }
        else { front = (front + 1) % N; draw(C(`deQueue(): element = arr[${old}] = ${v}, front = (${old} + 1) % ${N} = ${front}. Returns ${v}.`, `deQueue(): الـ element = arr[${old}] = ${v}، والـ front = (${old} + 1) % ${N} = ${front}. بترجع ${v}.`), { [old]: 'gone' }); }
      }
    }
    return frames;
  }

  function arraySim(spec) {
    const N = spec.size || 8, frames = [];
    const el = Array(N).fill(null);
    (spec.init || []).forEach((v, i) => { el[i] = { id: newVal(), v: String(v) }; });
    let length = (spec.init || []).length;
    const X0 = 20, cx = i => X0 + i * 62, Y = 40;
    const draw = (cap, hl) => {
      const items = [lbl('title', X0 + N * 31 - 4, 8, 'element[ ]  (MaxSize = ' + N + ', length = ' + length + ')', 'muted')];
      for (let i = 0; i < N; i++) {
        items.push(mk('cell', 'c' + i, cx(i), Y, { c: hl && hl[i] || '' }));
        items.push(lbl('i' + i, cx(i) + 28, Y + 52, '[' + i + ']', 'muted'));
        if (el[i]) items.push(mk('val', el[i].id, cx(i), Y, { t: el[i].v, c: i < length ? '' : 'stale', from: { dx: 0, dy: -40 } }));
      }
      frames.push({ items, edges: [], cap });
    };
    draw(C(`The array holds ${length} elements: length = ${length}.`, `الـ array فيه ${length} عناصر: الـ length = ${length}.`));
    for (const op of spec.ops) {
      const p = op.split(' '), name = p[0], k = +p[1], x = p[2];
      if (name === 'insert') {
        if (k < 0 || k > length) { draw(C(`Insert(${k}, ${x}): k is out of range → OutOfBounds.`, `Insert(${k}, ${x}): الـ k برّه الحدود → OutOfBounds.`)); continue; }
        if (length === N) { draw(C(`Insert(${k}, ${x}): length == MaxSize → NoMem (the array is full).`, `Insert(${k}, ${x}): الـ length == MaxSize → NoMem (الـ array مليان).`)); continue; }
        draw(C(`Insert ${x} after the ${k}th element (at index ${k}): shift element[${length - 1}] … element[${k}] one place right, starting from the end.`, `هندخّل ${x} بعد العنصر رقم ${k} (في الـ index ${k}): بنزق العناصر من element[${length - 1}] لحد element[${k}] خطوة لليمين، ونبدأ من الآخر.`), { [k]: 'hl' });
        for (let i = length - 1; i >= k; i--) {
          if (el[i + 1] && i + 1 >= length) el[i + 1] = null;
          el[i + 1] = el[i]; el[i] = null;
          draw(C(`i = ${i}: element[${i + 1}] = element[${i}] (${el[i + 1].v} moves right).`, `i = ${i}: element[${i + 1}] = element[${i}] (الـ ${el[i + 1].v} اتنقلت يمين).`), { [i + 1]: 'hl' });
        }
        if (el[k]) el[k] = null;
        el[k] = { id: newVal(), v: x }; length++;
        draw(C(`element[${k}] = ${x}, length++ → ${length}.`, `element[${k}] = ${x}، والـ length++ → ${length}.`), { [k]: 'new' });
      } else if (name === 'delete') {
        if (k < 1 || k > length) { draw(C(`Delete(${k}): there is no ${k}th element.`, `Delete(${k}): مفيش عنصر رقم ${k}.`)); continue; }
        const gone = el[k - 1].v; el[k - 1] = null;
        draw(C(`Delete(${k}): remove the ${k}th element, element[${k - 1}] = ${gone}.`, `Delete(${k}): هنشيل العنصر رقم ${k}، يعني element[${k - 1}] = ${gone}.`), { [k - 1]: 'gone' });
        for (let i = k; i < length; i++) {
          el[i - 1] = el[i]; el[i] = null;
          draw(C(`i = ${i}: element[${i - 1}] = element[${i}] (${el[i - 1].v} moves left).`, `i = ${i}: element[${i - 1}] = element[${i}] (الـ ${el[i - 1].v} اتنقلت شمال).`), { [i - 1]: 'hl' });
        }
        length--;
        draw(C(`length-- → ${length}.`, `الـ length-- → ${length}.`));
      } else if (name === 'search') {
        let found = -1;
        for (let i = 0; i < length; i++) {
          const hit = el[i].v === p[1];
          draw(C(`Compare element[${i}] = ${el[i].v} with ${p[1]}: ${hit ? 'found at index ' + i + '.' : 'not equal, move on.'}`, `قارن element[${i}] = ${el[i].v} بالـ ${p[1]}: ${hit ? 'لقيناها في الـ index ' + i + '.' : 'مش زيها، نكمل.'}`), { [i]: hit ? 'ok' : 'hl' });
          if (hit) { found = i; break; }
        }
        if (found < 0) draw(C(`${p[1]} is not in the array (${length} comparisons).`, `الـ ${p[1]} مش موجودة في الـ array (${length} مقارنات).`));
      }
    }
    return frames;
  }

  /* ════════ linked structures ════════ */
  // one renderer for singly, doubly, stack and queue lists: nodes in a row, pointer labels above or below
  function listDraw(st, cap, hl) {
    const dbl = st.dbl, NW = dbl ? 112 : 84, gap = dbl ? 54 : 46, X0 = dbl ? 86 : 20, Y = 92;
    const items = [], edges = [];
    const nx = i => X0 + i * (NW + gap);
    st.nodes.forEach((n, i) => items.push(mk(dbl ? 'dnode' : 'node', n.id, nx(i), Y, { t: n.v, c: hl && hl[n.id] || '', nul: i === st.nodes.length - 1, from: { dx: 0, dy: 70 } })));
    const last = st.nodes.length - 1;
    items.push(lbl('null', (last >= 0 ? nx(last) + NW + 34 : X0 + 30), Y + 19, 'NULL', 'muted'));
    st.nodes.forEach((n, i) => {
      if (i < last) edges.push({ id: 'n' + n.id + '>' + st.nodes[i + 1].id, a: n.id, as: 'next', b: st.nodes[i + 1].id, bs: dbl ? 'inU' : 'l' });
      if (dbl && i > 0) edges.push({ id: 'p' + n.id + '>' + st.nodes[i - 1].id, a: n.id, as: 'prev', b: st.nodes[i - 1].id, bs: 'outL', c: 'prevl' });
    });
    if (last >= 0) edges.push({ id: 'n' + st.nodes[last].id + '>null', a: st.nodes[last].id, as: 'next', b: 'null', bs: 'c' });
    if (dbl) {
      items.push(lbl('nullL', X0 - 40, Y + 19, 'NULL', 'muted'));
      if (last >= 0) edges.push({ id: 'p' + st.nodes[0].id + '>nullL', a: st.nodes[0].id, as: 'prev', b: 'nullL', bs: 'c', c: 'prevl' });
    }
    // the node being built sits under the row until it is linked in
    if (st.fresh) {
      const at = Math.max(0, Math.min(st.freshAt != null ? st.freshAt : st.nodes.length, st.nodes.length));
      items.push(mk(dbl ? 'dnode' : 'node', st.fresh.id, nx(at) - (st.freshAt != null && st.freshAt < st.nodes.length ? (NW + gap) / 2 : 0), Y + 112, { t: st.fresh.v, c: 'new', nul: !st.fresh.next, from: { dx: 0, dy: 30 } }));
      if (st.fresh.next) edges.push({ id: 'f>' + st.fresh.next, a: st.fresh.id, as: 'next', b: st.fresh.next, bs: dbl ? 'auto' : 'auto' });
      if (st.fresh.prev) edges.push({ id: 'fp>' + st.fresh.prev, a: st.fresh.id, as: 'prev', b: st.fresh.prev, bs: 'auto', c: 'prevl' });
      (st.linkTo || []).forEach(src => edges.push({ id: 'l' + src + '>f', a: src, as: src === 'x' ? 'b' : 'next', b: st.fresh.id, bs: 'auto' }));
      (st.backTo || []).forEach(src => edges.push({ id: 'b' + src + '>f', a: src, as: 'prev', b: st.fresh.id, bs: 'auto', c: 'prevl' }));
    }
    // pointers: stacked above (or below) the node they point to
    const stackAt = {};
    for (const p of st.ptrs) {
      const below = p.side === 'below';
      const idx = p.to == null ? -1 : st.nodes.findIndex(n => n.id === p.to);
      const onFresh = st.fresh && p.to === st.fresh.id;
      const key = (onFresh ? 'F' : idx) + (below ? 'b' : 'a');
      const n = stackAt[key] = (stackAt[key] || 0) + 1;
      const label = p.name + (p.to == null ? ' = NULL' : '');
      const it = ptr('p-' + p.name, 0, 0, label, p.to == null ? '' : p.c || 'on');
      if (onFresh) { const f = items.find(x => x.id === st.fresh.id); it.x = f.x + f.w / 2 - it.w / 2 + (n - 1) * 0; it.y = f.y + f.h + 14 + (n - 1) * 28; }
      else if (idx >= 0) { it.x = nx(idx) + NW / 2 - it.w / 2; it.y = below ? Y + 52 + (n - 1) * 28 : Y - 34 - (n - 1) * 28; }
      else { it.x = X0 - (dbl ? 70 : 0); it.y = below ? Y + 60 + (n - 1) * 28 : Y - 60 - (n - 1) * 28; }
      items.push(it);
      if (p.to != null) edges.push({ id: 'e-' + p.name, a: it.id, as: onFresh ? 't' : below ? 't' : 'b', b: p.to, bs: onFresh ? 'b' : below ? 'b' : 't', c: 'ptrl' });
    }
    return { items, edges, cap };
  }

  function listSim(spec) {
    const frames = [], kind = spec.type;   // list | dlist | lstack | lqueue
    const dbl = kind === 'dlist';
    let uid = 0; const nid = () => 'N' + (++uid);
    const st = { dbl, nodes: (spec.init || []).map(v => ({ id: nid(), v: String(v) })), ptrs: [], fresh: null };
    const P = { list: ['head'], dlist: ['head'], lstack: ['top'], lqueue: ['front', 'rear'] }[kind];
    const first = () => st.nodes[0] ? st.nodes[0].id : null, lastId = () => st.nodes.length ? st.nodes[st.nodes.length - 1].id : null;
    const basePtrs = () => kind === 'lqueue' ? [{ name: 'front', to: first() }, { name: 'rear', to: lastId(), side: 'below', c: 'on2' }] : [{ name: P[0], to: first() }];
    const snap = (cap, hl, extra) => { st.ptrs = basePtrs().concat(extra || []); frames.push(listDraw(st, cap, hl)); };
    const walkTo = (pred, label, labelAr) => {   // temp1 = head; while (...) temp1 = temp1->next
      let i = 0;
      snap(C(`${label} = ${P[0]} (the first node).`, `الـ ${label} = ${P[0]} (أول node).`), { [st.nodes[0].id]: 'hl' }, [{ name: label, to: st.nodes[0].id, side: 'below', c: 'on2' }]);
      while (!pred(i)) { i++; snap(C(`${labelAr ? labelAr[0] : ''}${label} = ${label}->next.`, `${labelAr ? labelAr[1] : ''}الـ ${label} = ${label}->next.`), { [st.nodes[i].id]: 'hl' }, [{ name: label, to: st.nodes[i].id, side: 'below', c: 'on2' }]); }
      return i;
    };
    const t = { list: ['Singly linked list', 'singly linked list'], dlist: ['Doubly linked list', 'doubly linked list'], lstack: ['Linked stack', 'linked stack'], lqueue: ['Linked queue', 'linked queue'] }[kind];
    snap(st.nodes.length ? C(`${t[0]}: ${P.join(' and ')} point${P.length > 1 ? '' : 's'} into the chain; the last node's next is NULL.`, `${t[1]}: الـ ${P.join(' والـ ')} بيشاوروا على السلسلة، والـ next بتاع آخر node بيبقى NULL.`)
      : C(`Empty ${t[1]}: ${P.map(p => p + ' = NULL').join(', ')}.`, `${t[1]} فاضية: ${P.map(p => p + ' = NULL').join('، ')}.`));
    for (const op of spec.ops) {
      const [name, a] = op.split(' ');
      const make = () => { st.fresh = { id: nid(), v: a, next: null }; };
      if (name === 'begin' || name === 'push') {
        make(); st.freshAt = 0;
        snap(C(`${name === 'push' ? 'push' : 'insertatbeginning'}(${a}): newnode = new Node(), newnode->data = ${a}.`, `${name === 'push' ? 'push' : 'insertatbeginning'}(${a}): بنعمل newnode = new Node() و newnode->data = ${a}.`));
        const p = P[0];
        if (st.nodes.length) {
          st.fresh.next = first();
          snap(C(`newnode->next = ${p}: the new node points at the old first node (${st.nodes[0].v}).`, `newnode->next = ${p}: الـ node الجديدة بتشاور على أول node قديمة (${st.nodes[0].v}).`));
          if (dbl) { st.backTo = [first()]; snap(C(`${p}->prev = newnode: the old first node points back at the new one.`, `${p}->prev = newnode: أول node قديمة بقت بتشاور ورا على الجديدة.`)); }
        } else snap(C(`The ${t[1]} is empty (${p} == NULL), so newnode->next = NULL.`, `الـ ${t[1]} فاضية (${p} == NULL)، فـ newnode->next = NULL.`));
        st.nodes.unshift({ id: st.fresh.id, v: a }); st.fresh = null; st.backTo = null; st.freshAt = null;
        snap(C(`${p} = newnode: ${a} is now the first node.`, `${p} = newnode: الـ ${a} بقت أول node.`), { [first()]: 'new' });
      } else if (name === 'end' || name === 'enqueue') {
        make(); st.freshAt = st.nodes.length;
        snap(C(`${name === 'enqueue' ? 'enqueue' : 'insertatend'}(${a}): newnode with data = ${a} and newnode->next = NULL.`, `${name === 'enqueue' ? 'enqueue' : 'insertatend'}(${a}): newnode فيها data = ${a} و newnode->next = NULL.`));
        if (!st.nodes.length) {
          st.nodes.push({ id: st.fresh.id, v: a }); st.fresh = null;
          snap(kind === 'lqueue' ? C('The queue is empty (rear == NULL), so front = newnode and rear = newnode.', 'الـ queue فاضي (rear == NULL)، فـ front = newnode و rear = newnode.') : C(`The list is empty, so head = newnode (the safe version; the lecture's loop would crash here).`, `الـ list فاضية، فـ head = newnode (دي النسخة الآمنة؛ الـ loop اللي في المحاضرة كانت هتعمل crash هنا).`), { [first()]: 'new' });
          continue;
        }
        if (kind === 'lqueue') {
          st.linkTo = [lastId()];
          snap(C(`rear->next = newnode: the old last node (${st.nodes[st.nodes.length - 1].v}) points at the new one. No walking needed: rear already points at the end.`, `rear->next = newnode: آخر node قديمة (${st.nodes[st.nodes.length - 1].v}) بقت بتشاور على الجديدة. مش محتاجين نلف على الـ list: الـ rear أصلًا واقف عند الآخر.`));
        } else {
          walkTo(i => !st.nodes[i + 1], 'temp1', ['temp1->next != NULL, so ', 'الـ temp1->next != NULL، فـ ']);
          st.linkTo = [lastId()];
          snap(C(`temp1->next is NULL (temp1 is the last node), so temp1->next = newnode.`, `الـ temp1->next بقت NULL (يعني temp1 هي آخر node)، فـ temp1->next = newnode.`), { [lastId()]: 'hl' }, [{ name: 'temp1', to: lastId(), side: 'below', c: 'on2' }]);
          if (dbl) { st.fresh.prev = lastId(); snap(C('newnode->prev = temp1: the new node points back at the old last node.', 'newnode->prev = temp1: الـ node الجديدة بتشاور ورا على آخر node قديمة.'), {}, [{ name: 'temp1', to: lastId(), side: 'below', c: 'on2' }]); }
        }
        st.nodes.push({ id: st.fresh.id, v: a }); st.fresh = null; st.linkTo = null;
        snap(kind === 'lqueue' ? C(`rear = newnode: ${a} is the new rear.`, `rear = newnode: الـ ${a} بقت الـ rear الجديدة.`) : C(`${a} is now the last node; its next is NULL.`, `الـ ${a} بقت آخر node، والـ next بتاعها NULL.`), { [lastId()]: 'new' });
      } else if (name === 'pop' || name === 'dequeue' || name === 'delfirst') {
        const p = P[0];
        if (!st.nodes.length) { snap(C(`${name}(): ${p} == NULL → the ${t[1]} is empty, nothing to remove.`, `${name}(): الـ ${p} == NULL → الـ ${t[1]} فاضية، مفيش حاجة نشيلها.`)); continue; }
        const gone = st.nodes[0];
        snap(C(`${name}(): temp = ${p} (the node with ${gone.v}).`, `${name}(): الـ temp = ${p} (الـ node اللي فيها ${gone.v}).`), { [gone.id]: 'gone' }, [{ name: 'temp', to: gone.id, side: 'below', c: 'on2' }]);
        st.nodes.shift();
        const lastOne = !st.nodes.length;
        frames.push(listDraw(Object.assign({}, st, { nodes: [gone].concat(st.nodes), ptrs: [{ name: p, to: first() }].concat(kind === 'lqueue' ? [{ name: 'rear', to: lastOne ? null : lastId(), side: 'below', c: 'on2' }] : [], [{ name: 'temp', to: gone.id, side: 'below', c: 'on2' }]) }),
          C(`${p} = ${p}->next: ${lastOne ? p + ' becomes NULL' : p + ' now points at ' + st.nodes[0].v}.${kind === 'lqueue' && lastOne ? ' The queue is now empty, so rear must be set to NULL too (the lecture code forgets this).' : ''}`, `${p} = ${p}->next: ${lastOne ? 'الـ ' + p + ' بقى NULL' : 'الـ ' + p + ' بقى بيشاور على ' + st.nodes[0].v}.${kind === 'lqueue' && lastOne ? ' الـ queue فضي، فلازم الـ rear كمان يبقى NULL (الكود اللي في المحاضرة ناسي الخطوة دي).' : ''}`), { [gone.id]: 'gone' }));
        snap(C(`delete temp: the node with ${gone.v} is freed. Returns ${gone.v}.`, `delete temp: الـ node اللي فيها ${gone.v} اتمسحت من الـ memory. بترجع ${gone.v}.`));
      } else if (name === 'dellast') {
        if (!st.nodes.length) { snap(C('deletefromend(): the list is empty.', 'deletefromend(): الـ list فاضية.')); continue; }
        let i = 0;
        snap(C('temp1 = head, temp2 = NULL.', 'الـ temp1 = head والـ temp2 = NULL.'), { [st.nodes[0].id]: 'hl' }, [{ name: 'temp1', to: st.nodes[0].id, side: 'below', c: 'on2' }, { name: 'temp2', to: null, side: 'below' }]);
        while (st.nodes[i + 1]) { i++; snap(C('temp1->next != NULL: temp2 = temp1, temp1 = temp1->next.', 'الـ temp1->next != NULL: الـ temp2 = temp1 والـ temp1 = temp1->next.'), { [st.nodes[i].id]: 'hl' }, [{ name: 'temp1', to: st.nodes[i].id, side: 'below', c: 'on2' }, { name: 'temp2', to: st.nodes[i - 1].id, side: 'below', c: 'on3' }]); }
        const gone = st.nodes.pop();
        snap(C(`delete temp1 (${gone.v}) and set temp2->next = NULL${st.nodes.length ? '' : ' (it was the only node, so head = NULL)'}.`, `delete temp1 (${gone.v}) وبعدين temp2->next = NULL${st.nodes.length ? '' : ' (كانت الـ node الوحيدة، فـ head = NULL)'}.`));
      } else if (name === 'delete') {
        const idx = st.nodes.findIndex(n => n.v === a);
        if (idx < 0) { snap(C(`deleteitem(${a}): search(${a}) is false, so nothing is deleted.`, `deleteitem(${a}): الـ search(${a}) رجعت false، فمفيش حاجة هتتمسح.`)); continue; }
        if (idx === 0) {
          snap(C(`deleteitem(${a}): head->data == ${a}, so temp1 = head and head = head->next.`, `deleteitem(${a}): الـ head->data == ${a}، فـ temp1 = head و head = head->next.`), { [st.nodes[0].id]: 'gone' }, [{ name: 'temp1', to: st.nodes[0].id, side: 'below', c: 'on2' }]);
          const gone = st.nodes.shift();
          if (dbl && st.nodes.length) snap(C(`head->prev = NULL, then delete temp1 (${gone.v}).`, `head->prev = NULL، وبعدين delete temp1 (${gone.v}).`));
          else snap(C(`delete temp1: ${gone.v} is removed.`, `delete temp1: الـ ${gone.v} اتشالت.`));
          continue;
        }
        snap(C(`deleteitem(${a}): temp1 = head, temp2 = NULL. Walk until temp1->data == ${a}.`, `deleteitem(${a}): الـ temp1 = head والـ temp2 = NULL. نمشي لحد ما temp1->data == ${a}.`), { [st.nodes[0].id]: 'hl' }, [{ name: 'temp1', to: st.nodes[0].id, side: 'below', c: 'on2' }, { name: 'temp2', to: null, side: 'below' }]);
        for (let i = 1; i <= idx; i++) snap(C(`temp1->data != ${a}: temp2 = temp1, temp1 = temp1->next.`, `الـ temp1->data != ${a}: الـ temp2 = temp1 والـ temp1 = temp1->next.`), { [st.nodes[i].id]: i === idx ? 'gone' : 'hl' }, [{ name: 'temp1', to: st.nodes[i].id, side: 'below', c: 'on2' }, { name: 'temp2', to: st.nodes[i - 1].id, side: 'below', c: 'on3' }]);
        const prev = st.nodes[idx - 1], gone = st.nodes[idx], nextN = st.nodes[idx + 1];
        // bypass: draw the previous node pointing past the one being removed
        const shown = listDraw(Object.assign({}, st, { ptrs: basePtrs().concat([{ name: 'temp1', to: gone.id, side: 'below', c: 'on2' }, { name: 'temp2', to: prev.id, side: 'below', c: 'on3' }]) }),
          C(`temp2->next = temp1->next: ${prev.v} now skips ${gone.v} and points at ${nextN ? nextN.v : 'NULL'}.${dbl && nextN ? ' And temp1->next->prev = temp2.' : ''}`, `temp2->next = temp1->next: الـ ${prev.v} بقت بتعدّي الـ ${gone.v} وبتشاور على ${nextN ? nextN.v : 'NULL'}.${dbl && nextN ? ' وكمان temp1->next->prev = temp2.' : ''}`), { [gone.id]: 'gone' });
        shown.edges = shown.edges.filter(e => e.a !== gone.id && !(e.a === prev.id && e.b === gone.id) && !(dbl && nextN && e.a === nextN.id && e.b === gone.id));
        shown.edges.push({ id: 'skip' + prev.id, a: prev.id, as: 'next', b: nextN ? nextN.id : 'null', bs: nextN ? (dbl ? 'inU' : 'l') : 'c', bend: -46 });
        if (dbl && nextN) shown.edges.push({ id: 'skipb' + nextN.id, a: nextN.id, as: 'prev', b: prev.id, bs: 'outL', c: 'prevl', bend: 46 });
        frames.push(shown);
        st.nodes.splice(idx, 1);
        snap(C(`delete temp1: ${gone.v} is freed and the list closes the gap.`, `delete temp1: الـ ${gone.v} اتمسحت والـ list قفلت المكان.`));
      } else if (name === 'search') {
        let i = 0, found = false;
        if (!st.nodes.length) { snap(C('search(): the list is empty.', 'search(): الـ list فاضية.')); continue; }
        while (i < st.nodes.length) {
          const hit = st.nodes[i].v === a;
          snap(C(`temp->data = ${st.nodes[i].v} ${hit ? '== ' + a + ': found, return true.' : '!= ' + a + ', temp = temp->next.'}`, `الـ temp->data = ${st.nodes[i].v} ${hit ? '== ' + a + ': لقيناها، بترجع true.' : '!= ' + a + '، فـ temp = temp->next.'}`), { [st.nodes[i].id]: hit ? 'ok' : 'hl' }, [{ name: 'temp', to: st.nodes[i].id, side: 'below', c: 'on2' }]);
          if (hit) { found = true; break; }
          i++;
        }
        if (!found) snap(C(`temp reached NULL: ${a} is not in the list, return false.`, `الـ temp وصل NULL: الـ ${a} مش في الـ list، بترجع false.`), {}, [{ name: 'temp', to: null, side: 'below' }]);
      } else if (name === 'sorted') {
        make();
        snap(C(`insertsorted(${a}): newnode with data = ${a}. Find the first node whose data is bigger.`, `insertsorted(${a}): newnode فيها data = ${a}. ندوّر على أول node الـ data بتاعتها أكبر.`));
        const pos = st.nodes.findIndex(n => +n.v > +a);
        const at = pos < 0 ? st.nodes.length : pos;
        st.freshAt = at;
        if (at === 0) {
          st.fresh.next = first();
          snap(st.nodes.length ? C(`${a} < head->data (${st.nodes[0].v}), so it goes first: newnode->next = head.`, `الـ ${a} أصغر من head->data (${st.nodes[0].v})، فهتبقى الأولى: newnode->next = head.`) : C('The list is empty, so head = newnode.', 'الـ list فاضية، فـ head = newnode.'));
          st.nodes.unshift({ id: st.fresh.id, v: a }); st.fresh = null; st.freshAt = null;
          snap(C(`head = newnode.`, `head = newnode.`), { [first()]: 'new' });
          continue;
        }
        for (let i = 0; i < at; i++) snap(C(`${st.nodes[i].v} < ${a}${st.nodes[i + 1] ? ' and next (' + st.nodes[i + 1].v + ') is ' + (+st.nodes[i + 1].v > +a ? 'bigger: stop here.' : 'not bigger: move on.') : ' and it is the last node: stop here.'}`, `الـ ${st.nodes[i].v} أصغر من ${a}${st.nodes[i + 1] ? ' والـ next (' + st.nodes[i + 1].v + ') ' + (+st.nodes[i + 1].v > +a ? 'أكبر: نقف هنا.' : 'مش أكبر: نكمل.') : ' وهي آخر node: نقف هنا.'}`), { [st.nodes[i].id]: 'hl' }, [{ name: 'temp', to: st.nodes[i].id, side: 'below', c: 'on2' }]);
        const prev = st.nodes[at - 1];
        st.fresh.next = st.nodes[at] ? st.nodes[at].id : null;
        snap(C(`newnode->next = temp->next (${st.nodes[at] ? st.nodes[at].v : 'NULL'}).`, `newnode->next = temp->next (${st.nodes[at] ? st.nodes[at].v : 'NULL'}).`), {}, [{ name: 'temp', to: prev.id, side: 'below', c: 'on2' }]);
        st.linkTo = [prev.id];
        const sh = listDraw(Object.assign({}, st, { ptrs: basePtrs().concat([{ name: 'temp', to: prev.id, side: 'below', c: 'on2' }]) }), C(`temp->next = newnode: ${prev.v} → ${a} → ${st.nodes[at] ? st.nodes[at].v : 'NULL'}.`, `temp->next = newnode: ${prev.v} → ${a} → ${st.nodes[at] ? st.nodes[at].v : 'NULL'}.`));
        sh.edges = sh.edges.filter(e => !(e.a === prev.id && e.id.startsWith('n')));
        frames.push(sh);
        st.nodes.splice(at, 0, { id: st.fresh.id, v: a }); st.fresh = null; st.linkTo = null; st.freshAt = null;
        snap(C(`${a} is in place and the list is still sorted.`, `الـ ${a} اتحطت في مكانها والـ list لسه مترتبة.`), { [st.nodes[at].id]: 'new' });
      }
    }
    return frames;
  }

  /* ════════ binary search tree ════════ */
  function bstSim(spec) {
    const frames = [];
    let root = null; const out = [];
    const ins = v => { const n = { v, l: null, r: null }; if (!root) { root = n; return; } let c = root; for (;;) { if (v < c.v) { if (!c.l) { c.l = n; return; } c = c.l; } else { if (!c.r) { c.r = n; return; } c = c.r; } } };
    (spec.init || []).forEach(v => ins(+v));
    const draw = (cap, hl, extraOut) => {
      const items = [], edges = [], order = [];
      const walk = (n, d) => { if (!n) return; walk(n.l, d + 1); order.push([n, d]); walk(n.r, d + 1); };
      walk(root, 0);
      order.forEach(([n, d], i) => { n._x = 16 + i * 50; n._y = 16 + d * 66; items.push(mk('circ', 'n' + n.v, n._x, n._y, { t: n.v, c: hl && hl[n.v] || '', from: { dx: 0, dy: -24 } })); });
      const link = n => { if (!n) return; [n.l, n.r].forEach(ch => { if (ch) edges.push({ id: 'e' + n.v + '-' + ch.v, a: 'n' + n.v, as: 'auto', b: 'n' + ch.v, bs: 'auto', c: 'tree' }); link(ch); }); };
      link(root);
      if (!root) items.push(lbl('empty', 60, 30, 'root = NULL', 'muted'));
      frames.push({ items, edges, cap, out: extraOut != null ? extraOut : null });
    };
    draw(root ? C('The tree before the operations. Smaller keys go left, bigger keys go right.', 'الـ tree قبل العمليات. المفاتيح الأصغر بتروح شمال والأكبر يمين.') : C('Empty tree: root = NULL.', 'tree فاضية: الـ root = NULL.'));
    for (const op of spec.ops) {
      const [name, a] = op.split(' ');
      if (name === 'insert') {
        for (const s of a.split(',')) {
          const v = +s;
          if (!root) { ins(v); draw(C(`insert(${v}): the tree is empty, so ${v} becomes the root.`, `insert(${v}): الـ tree فاضية، فالـ ${v} بقت الـ root.`), { [v]: 'new' }); continue; }
          let c = root;
          for (;;) {
            const left = v < c.v, nx = left ? c.l : c.r;
            draw(C(`insert(${v}): ${v} ${left ? '<' : '>'} ${c.v} → go ${left ? 'left' : 'right'}${nx ? '.' : '. That child is NULL, so ' + v + ' is attached here as a leaf.'}`, `insert(${v}): الـ ${v} ${left ? 'أصغر من' : 'أكبر من'} ${c.v} → نروح ${left ? 'شمال' : 'يمين'}${nx ? '.' : '. الـ child ده NULL، فالـ ' + v + ' هتتحط هنا كـ leaf.'}`), { [c.v]: 'hl' });
            if (!nx) break; c = nx;
          }
          ins(v); draw(C(`${v} is now the ${v < c.v ? 'left' : 'right'} child of ${c.v}.`, `الـ ${v} بقت الـ ${v < c.v ? 'left' : 'right'} child بتاع ${c.v}.`), { [v]: 'new' });
        }
      } else if (name === 'search') {
        const v = +a; let c = root;
        while (c) {
          if (v === c.v) { draw(C(`search(${v}): ${v} == ${c.v} → found.`, `search(${v}): الـ ${v} == ${c.v} → لقيناها.`), { [c.v]: 'ok' }); break; }
          const left = v < c.v;
          draw(C(`search(${v}): ${v} ${left ? '<' : '>'} ${c.v} → search the ${left ? 'left' : 'right'} subtree.`, `search(${v}): الـ ${v} ${left ? 'أصغر من' : 'أكبر من'} ${c.v} → ندوّر في الـ ${left ? 'left' : 'right'} subtree.`), { [c.v]: 'hl' });
          c = left ? c.l : c.r;
          if (!c) draw(C(`Reached NULL: ${v} is not in the tree.`, `وصلنا NULL: الـ ${v} مش في الـ tree.`));
        }
      } else if (name === 'inorder' || name === 'preorder' || name === 'postorder') {
        const seq = [];
        const go = n => { if (!n) return; if (name === 'preorder') seq.push(n.v); go(n.l); if (name === 'inorder') seq.push(n.v); go(n.r); if (name === 'postorder') seq.push(n.v); };
        go(root);
        const rule = { inorder: ['left, root, right', 'شمال، الـ root، يمين'], preorder: ['root, left, right', 'الـ root، شمال، يمين'], postorder: ['left, right, root', 'شمال، يمين، الـ root'] }[name];
        out.length = 0;
        draw(C(`${name[0].toUpperCase() + name.slice(1)} traversal: visit ${rule[0]} at every node.`, `الـ ${name} traversal: في كل node بنزور ${rule[1]}.`), {}, '');
        seq.forEach((v, i) => {
          out.push(v);
          const hl = {}; out.forEach(x => { hl[x] = 'done'; }); hl[v] = 'hl';
          draw(C(`Visit ${v}.${i === seq.length - 1 ? ' Done: ' + out.join(' ') : ''}`, `نزور ${v}.${i === seq.length - 1 ? ' خلصنا: ' + out.join(' ') : ''}`), hl, out.join('  '));
        });
      } else if (name === 'delete') {
        const v = +a; let p = null, c = root;
        while (c && c.v !== v) { p = c; c = v < c.v ? c.l : c.r; }
        if (!c) { draw(C(`delete(${v}): ${v} is not in the tree.`, `delete(${v}): الـ ${v} مش في الـ tree.`)); continue; }
        const setChild = (par, old, nw) => { if (!par) root = nw; else if (par.l === old) par.l = nw; else par.r = nw; };
        if (!c.l && !c.r) {
          draw(C(`delete(${v}): ${v} is a leaf (case 1), so just remove it.`, `delete(${v}): الـ ${v} عبارة عن leaf (الحالة 1)، فبنشيلها وخلاص.`), { [v]: 'gone' });
          setChild(p, c, null); draw(C(`${v} removed.`, `الـ ${v} اتشالت.`));
        } else if (!c.l || !c.r) {
          const ch = c.l || c.r;
          draw(C(`delete(${v}): ${v} has one child (${ch.v}) (case 2), so the child takes its place.`, `delete(${v}): الـ ${v} ليها child واحد بس (${ch.v}) (الحالة 2)، فالـ child بياخد مكانها.`), { [v]: 'gone', [ch.v]: 'hl' });
          setChild(p, c, ch); draw(C(`${ch.v} is now linked to ${p ? p.v : 'root'}.`, `الـ ${ch.v} بقت متوصلة بـ ${p ? p.v : 'الـ root'}.`), { [ch.v]: 'new' });
        } else {
          let sp = c, s = c.r; while (s.l) { sp = s; s = s.l; }
          draw(C(`delete(${v}): ${v} has two children (case 3). Its inorder successor is the minimum of the right subtree: ${s.v}.`, `delete(${v}): الـ ${v} ليها 2 children (الحالة 3). الـ inorder successor بتاعها هو أصغر حاجة في الـ right subtree: ${s.v}.`), { [v]: 'gone', [s.v]: 'hl' });
          const sv = s.v;
          if (sp === c) sp.r = s.r; else sp.l = s.r;
          c.v = sv;
          draw(C(`Copy ${sv} into the node and delete the successor's old node (it has at most one right child).`, `بننسخ ${sv} في الـ node، ونمسح الـ node القديمة بتاعة الـ successor (عندها right child واحد بالكتير).`), { [sv]: 'new' });
        }
      }
    }
    return frames;
  }

  /* ════════ hashing ════════ */
  function hashSim(spec) {
    const m = spec.size, frames = [], table = Array(m).fill(null), chains = Array.from({ length: m }, () => []);
    const method = spec.method; // linear | quadratic | double | chain
    const h2m = spec.h2 || (m - 2);
    const X = 150, sy = i => 14 + i * 42;
    const draw = (cap, hl, key) => {
      const items = [], edges = [];
      for (let i = 0; i < m; i++) {
        items.push(mk('slot', 's' + i, X, sy(i), { c: hl && hl[i] || '', t: method === 'chain' ? (chains[i].length ? '' : '/') : '' }));
        items.push(lbl('i' + i, method === 'chain' ? X - 22 : X + 88, sy(i) + 17, '[' + i + ']', 'muted'));
        if (method !== 'chain' && table[i]) items.push(mk('slot', table[i].id, X, sy(i), { k: 'val', w: 64, h: 34, t: table[i].v, c: 'filled' }));
        if (method === 'chain') chains[i].forEach((n, j) => {
          items.push(mk('node', n.id, X + 104 + j * 120, sy(i) - 2, { h: 38, t: n.v, nul: j === chains[i].length - 1, c: hl && hl['n' + n.id] || '', from: { dx: 0, dy: -20 } }));
          edges.push({ id: 'c' + (j ? chains[i][j - 1].id : 's' + i) + '>' + n.id, a: j ? chains[i][j - 1].id : 's' + i, as: j ? 'next' : 'c', b: n.id, bs: 'l' });
        });
      }
      if (key) {
        const k = ptr('key', 0, sy(key.at) + 5, 'key ' + key.v, key.c || 'on');
        items.push(k); edges.push({ id: 'e-key', a: 'key', as: 'r', b: 's' + key.at, bs: 'l', c: 'ptrl' });
      }
      frames.push({ items, edges, cap });
    };
    const f = {
      linear: ['h(k, i) = (k mod ' + m + ' + i) mod ' + m, 'linear probing'],
      quadratic: ['h(k, i) = (k mod ' + m + ' + i + i²) mod ' + m + '   (the lecture\'s formula)', 'quadratic probing'],
      double: ['h(k, i) = (k mod ' + m + ' + i·(1 + k mod ' + h2m + ')) mod ' + m, 'double hashing'],
      chain: ['h(k) = k mod ' + m + '; each slot holds a linked list', 'separate chaining']
    }[method];
    draw(C(`Table of size ${m}, ${f[1]}: ${f[0]}.`, `جدول حجمه ${m} بالـ ${f[1]}: ${f[0]}.`));
    let uid = 0;
    for (const s of spec.keys) {
      const k = +s, h1 = k % m;
      if (method === 'chain') {
        draw(C(`${k} mod ${m} = ${h1} → slot ${h1}.`, `${k} mod ${m} = ${h1} → الـ slot رقم ${h1}.`), { [h1]: 'hl' }, { v: k, at: h1 });
        chains[h1].push({ id: 'K' + (++uid), v: String(k) });
        draw(C(chains[h1].length > 1 ? `Collision at ${h1}: ${k} is added to the end of slot ${h1}'s list.` : `${k} becomes the first node of slot ${h1}'s list.`, chains[h1].length > 1 ? `فيه collision في ${h1}: الـ ${k} بتتضاف في آخر الـ list بتاعة الـ slot ${h1}.` : `الـ ${k} بقت أول node في الـ list بتاعة الـ slot ${h1}.`), { [h1]: 'ok', ['nK' + uid]: 'new' });
        continue;
      }
      const d = 1 + k % h2m;
      for (let i = 0; i < m; i++) {
        const add = method === 'linear' ? i : method === 'quadratic' ? i + i * i : i * d;
        const at = (h1 + add) % m;
        const math = i === 0 ? `${k} mod ${m} = ${h1}` : method === 'linear' ? `(${h1} + ${i}) mod ${m} = ${at}` : method === 'quadratic' ? `(${h1} + ${i} + ${i * i}) mod ${m} = ${at}` : `(${h1} + ${i}·${d}) mod ${m} = ${at}`;
        const pre = method === 'double' && i === 1 ? `h2 = 1 + ${k} mod ${h2m} = ${d}; ` : '';
        if (table[at]) {
          draw(C(`${k}, i = ${i}: ${pre}${math} → slot ${at} holds ${table[at].v}: collision, try i = ${i + 1}.`, `${k}، i = ${i}: ${pre}${math} → الـ slot ${at} فيه ${table[at].v}: collision، نجرب i = ${i + 1}.`), { [at]: 'bad' }, { v: k, at, c: 'warn' });
        } else {
          draw(C(`${k}, i = ${i}: ${pre}${math} → slot ${at} is empty.`, `${k}، i = ${i}: ${pre}${math} → الـ slot ${at} فاضي.`), { [at]: 'ok' }, { v: k, at });
          table[at] = { id: 'K' + (++uid), v: String(k) };
          draw(C(`${k} is stored in slot ${at}.`, `الـ ${k} اتخزنت في الـ slot ${at}.`), { [at]: 'new' });
          break;
        }
      }
    }
    const fin = method === 'chain' ? chains.map((c, i) => `[${i}] ${c.length ? c.map(n => n.v).join(' → ') : '–'}`).join('   ') : table.map((x, i) => `[${i}]=${x ? x.v : '–'}`).join(' ');
    draw(C(`Final table: ${fin}`, `الجدول في الآخر: ${fin}`));
    return frames;
  }

  const SIMS = { stack: stackSim, queue: queueSim, cqueue: cqueueSim, array: arraySim, list: listSim, dlist: listSim, lstack: listSim, lqueue: listSim, bst: bstSim, hash: hashSim };

  /* ════════ drawing ════════ */
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  function blend(A, B, t) {
    // items move from their place in A to their place in B; new ones fade in from their `from` offset, removed ones fade out
    if (!A || t >= 1) return { items: B.items.map(i => Object.assign({ o: 1 }, i)), edges: B.edges.map(e => Object.assign({ o: 1 }, e)) };
    const am = new Map(A.items.map(i => [i.id, i])), bm = new Map(B.items.map(i => [i.id, i]));
    const items = [];
    for (const b of B.items) {
      const a = am.get(b.id);
      if (a) items.push(Object.assign({}, b, { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), w: lerp(a.w, b.w, t), o: 1 }));
      else { const f = b.from || { dx: 0, dy: 0 }; items.push(Object.assign({}, b, { x: b.x + f.dx * (1 - t), y: b.y + f.dy * (1 - t), o: t })); }
    }
    for (const a of A.items) if (!bm.has(a.id)) items.unshift(Object.assign({}, a, { o: 1 - t }));
    const ae = new Set(A.edges.map(e => e.id)), be = new Set(B.edges.map(e => e.id));
    const edges = B.edges.map(e => Object.assign({}, e, { o: ae.has(e.id) ? 1 : t }))
      .concat(A.edges.filter(e => !be.has(e.id)).map(e => Object.assign({}, e, { o: 1 - t })));
    return { items, edges };
  }

  function Item({ it }) {
    const st = { opacity: it.o };
    const cls = 'vz-' + it.k + (it.c ? ' ' + it.c : '');
    const tx = (x, y, s, c) => html`<text x=${x} y=${y} className=${c || ''} textAnchor="middle" dominantBaseline="central">${s}</text>`;
    switch (it.k) {
      case 'cell': case 'slot':
        return html`<g className=${cls} style=${st}><rect x=${it.x} y=${it.y} width=${it.w} height=${it.h} rx="6" />${it.t ? tx(it.x + it.w / 2, it.y + it.h / 2, it.t, 'muted') : null}</g>`;
      case 'val':
        return html`<g className=${cls} style=${st}>${tx(it.x + it.w / 2, it.y + it.h / 2, it.t)}</g>`;
      case 'node': {
        const dx = it.x + it.w - 28;
        return html`<g className=${cls} style=${st}><rect x=${it.x} y=${it.y} width=${it.w} height=${it.h} rx="6" /><line x1=${dx} y1=${it.y} x2=${dx} y2=${it.y + it.h} />
          ${tx(it.x + (it.w - 28) / 2, it.y + it.h / 2, it.t)}${it.nul ? html`<line className="slash" x1=${dx + 6} y1=${it.y + it.h - 7} x2=${it.x + it.w - 6} y2=${it.y + 7} />` : html`<circle cx=${dx + 14} cy=${it.y + it.h / 2} r="3" />`}</g>`;
      }
      case 'dnode': {
        const a = it.x + 26, b = it.x + it.w - 26;
        return html`<g className=${cls} style=${st}><rect x=${it.x} y=${it.y} width=${it.w} height=${it.h} rx="6" /><line x1=${a} y1=${it.y} x2=${a} y2=${it.y + it.h} /><line x1=${b} y1=${it.y} x2=${b} y2=${it.y + it.h} />
          ${tx(it.x + it.w / 2, it.y + it.h / 2, it.t)}<circle cx=${it.x + 13} cy=${it.y + it.h - 12} r="3" />${it.nul ? html`<line className="slash" x1=${b + 6} y1=${it.y + it.h - 7} x2=${it.x + it.w - 6} y2=${it.y + 7} />` : html`<circle cx=${b + 13} cy=${it.y + 12} r="3" />`}</g>`;
      }
      case 'circ':
        return html`<g className=${cls} style=${st}><circle cx=${it.x + it.w / 2} cy=${it.y + it.h / 2} r=${it.w / 2} />${tx(it.x + it.w / 2, it.y + it.h / 2, it.t)}</g>`;
      case 'ptr':
        return html`<g className=${cls} style=${st}><rect x=${it.x} y=${it.y} width=${it.w} height=${it.h} rx=${it.h / 2} />${tx(it.x + it.w / 2, it.y + it.h / 2, it.t)}</g>`;
      case 'ring':
        return html`<g className="vz-ring" style=${st}><circle cx=${it.x + it.w / 2} cy=${it.y + it.h / 2} r=${it.w / 2} /></g>`;
      case 'lbl':
        return html`<g className=${cls} style=${st}>${tx(it.x, it.y, it.t, it.c)}</g>`;
    }
    return null;
  }
  function Edge({ e, map, mid }) {
    const A = map.get(e.a), B = map.get(e.b);
    if (!A || !B) return null;
    const p = anchor(A, e.as, B), q = anchor(B, e.bs, A);
    let d;
    if (e.bend) {
      const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2 + e.bend;
      d = `M${p[0]},${p[1]} Q${mx},${my} ${q[0]},${q[1]}`;
    } else d = `M${p[0]},${p[1]} L${q[0]},${q[1]}`;
    return html`<path d=${d} className=${'vz-edge' + (e.c ? ' ' + e.c : '')} style=${{ opacity: Math.min(e.o, A.o, B.o) }} markerEnd=${e.c === 'tree' ? null : `url(#${mid})`} />`;
  }

  let ids = 0;
  function Viz({ spec, ar }) {
    const frames = useMemo(() => { vid = 0; try { return (SIMS[spec.type] || (() => []))(spec); } catch (err) { console.error(err); return []; } }, [spec]);
    const [i, setI] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [shown, setShown] = useState(() => frames[0] ? blend(null, frames[0], 1) : null);
    const mid = useMemo(() => 'vzh' + (++ids), []);
    const prev = useRef(0), raf = useRef(0);
    // the viewBox covers every frame, so the diagram never jumps in size while it plays
    const box = useMemo(() => {
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      frames.forEach(f => f.items.forEach(it => {
        const w = it.k === 'lbl' ? it.t.length * 7.5 : it.w, h = it.k === 'lbl' ? 16 : it.h, x = it.k === 'lbl' ? it.x - w / 2 : it.x, y = it.k === 'lbl' ? it.y - 8 : it.y;
        x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x + w); y1 = Math.max(y1, y + h);
      }));
      return x0 === Infinity ? [0, 0, 100, 50] : [x0 - 14, y0 - 14, x1 - x0 + 28, y1 - y0 + 28];
    }, [frames]);
    useEffect(() => {
      const from = frames[prev.current], to = frames[i];
      prev.current = i;
      if (!to) return;
      cancelAnimationFrame(raf.current);
      if (calm() || from === to) { setShown(blend(null, to, 1)); return; }
      const t0 = performance.now(), dur = 520;
      const tick = now => { const t = Math.min(1, (now - t0) / dur); setShown(blend(from, to, ease(t))); if (t < 1) raf.current = requestAnimationFrame(tick); };
      raf.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf.current);
    }, [i, frames]);
    useEffect(() => {
      if (!playing) return;
      if (i >= frames.length - 1) { setPlaying(false); return; }
      const t = setTimeout(() => setI(x => Math.min(x + 1, frames.length - 1)), 1700);
      return () => clearTimeout(t);
    }, [playing, i, frames.length]);
    if (!frames.length || !shown) return null;
    const f = frames[i], map = new Map(shown.items.map(it => [it.id, it]));
    const go = n => { setPlaying(false); setI(x => Math.max(0, Math.min(frames.length - 1, typeof n === 'function' ? n(x) : n))); };
    const play = () => { if (i >= frames.length - 1) { prev.current = 0; setI(0); } setPlaying(p => !p); };
    const onKey = e => { if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); go(x => x + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); go(x => x - 1); } };
    return html`<figure className="vz" onKeyDown=${onKey}>
      <div className="vz-stage">
        <svg viewBox=${box.join(' ')} style=${{ maxWidth: Math.round(box[2] * 1.05) + 'px', minWidth: Math.round(Math.min(box[2], 520)) + 'px' }} role="img" aria-label=${f.cap[0]}>
          <defs><marker id=${mid} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" className="vz-head" /></marker></defs>
          ${shown.edges.map(e => html`<${Edge} key=${e.id} e=${e} map=${map} mid=${mid} />`)}
          ${shown.items.map(it => html`<${Item} key=${it.id} it=${it} />`)}
        </svg>
      </div>
      ${f.out != null && html`<div className="vz-out"><span>Output</span><code>${f.out || ' '}</code></div>`}
      <figcaption className="vz-cap" aria-live="polite">
        <span className="vz-step">${i + 1} / ${frames.length}</span>
        <span className="vz-text">${f.cap[0]}</span>
        ${ar && f.cap[1] ? html`<span className="ar vz-ar" dir="rtl" lang="ar">${f.cap[1]}</span>` : null}
      </figcaption>
      <div className="vz-bar">
        <button onClick=${() => go(0)} disabled=${i === 0} aria-label="Back to the start" title="Start"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 5v14M19 5l-9 7 9 7z" /></svg></button>
        <button onClick=${() => go(x => x - 1)} disabled=${i === 0} aria-label="Previous step" title="Previous step (←)"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg></button>
        <button className="vz-play" onClick=${play} aria-label=${playing ? 'Pause' : 'Play'}>${playing
          ? html`<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg><span>Pause</span>`
          : html`<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 5l12 7-12 7z" /></svg><span>${i >= frames.length - 1 ? 'Replay' : i ? 'Play' : 'Play'}</span>`}</button>
        <button onClick=${() => go(x => x + 1)} disabled=${i >= frames.length - 1} aria-label="Next step" title="Next step (→)"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg></button>
        <span className="vz-prog" aria-hidden="true"><i style=${{ width: (frames.length > 1 ? i / (frames.length - 1) * 100 : 100) + '%' }}></i></span>
      </div>
    </figure>`;
  }

  window.VIZ = { Viz, SIMS };
})();

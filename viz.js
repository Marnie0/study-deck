// Animated diagrams for the notes. A note section (or a past-paper item) can carry viz: { type, ...settings, ops } or a list of them.
// Nothing is drawn by hand: each diagram runs the operations with the lecture's own code and records one frame per step.
// Every frame knows the code line it is on, the variable values, and (at key steps) a question to answer before it is shown,
// so a diagram is an active trace exercise, not just an animation. Students can also type their own operations.
// build.mjs copies this file to data/viz.js; app.js loads it only when a lecture or paper with a diagram is opened.
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const html = htm.bind(React.createElement);
  const calm = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const C = (en, ar) => [en, ar];

  /* ════════ the lecture's code, shown beside the diagram (a frame points at it with { fn, hit: [substrings of the lines to light] }) ════════ */
  const CODE = {
    'stack.push': `void push(int item)
{
   if (isFull(top))           // top == MAXSIZE - 1
      cout << "Stack overflow";
   else
   { top = top + 1; stack_arr[top] = item; }
}`,
    'stack.pop': `int pop()
{
   if (isEmpty(top)) { cout << "Stack underflow"; return -1; }
   else
   { int item = stack_arr[top]; top = top - 1; return item; }
}`,
    'queue.enqueue': `void enqueue(int item)
{
   if (isFull(tail))          // tail == maxsize - 1
   { cout << "\\nQueue is full"; return; }
   else
   {
      if (head == -1) head = 0;   // first element
      tail = tail + 1;
      queue[tail] = item;
   }
}`,
    'queue.dequeue': `int dequeue()
{
   int element;
   if (isEmpty(head))         // head == -1 || head > tail
   { cout << "Queue Underflow "; return -1; }
   else
   {
      element = queue[head];
      head++;
   }
   return element;
}`,
    'cqueue.enQueue': `void enQueue(int value)
{
   if (isFull()) { cout << "Queue is full." << endl; }
   else
   {
      if (front == -1) { front = 0; }
      rear = (rear + 1) % MAX_SIZE;
      arr[rear] = value;
   }
}`,
    'cqueue.deQueue': `int deQueue()
{
   int element;
   if (isEmpty()) { cout << "Queue is empty." << endl; return -1; }
   else
   {
      element = arr[front];
      if (front == rear) { front = -1; rear = -1; }   // last element removed
      else { front = (front + 1) % MAX_SIZE; }
      return element;
   }
}`,
    'array.insert': `// Insert x after the k'th element.
{
   if (k < 0 || k > length) throw OutOfBounds();
   if (length == MaxSize) throw NoMem();
   for (int i = length-1; i >= k; i--)
      element[i+1] = element[i];      // shift right
   element[k] = x;
   length++;
}`,
    'array.delete': `// Delete the k'th element if it exists.
{
   if (Find(k, x)) {
      for (int i = k; i < length; i++)
         element[i-1] = element[i];   // shift left
      length--;
   }
}`,
    'array.search': `int search(int x)              // linear search
{
   for (int i = 0; i < length; i++)
      if (element[i] == x) return i;
   return -1;                       // not found
}`,
    'list.insertatbeginning': `void insertatbeginning(int item)
{
   Node *newnode = new Node();
   newnode->data = item;
   if (isEmpty())
   { newnode->next = NULL; head = newnode; }
   else
   { newnode->next = head;      // 1. new node points at the old first node
     head = newnode; }           // 2. head points at the new node
}`,
    'list.insertatend': `void insertatend(int item)
{
   Node *newnode = new Node();
   newnode->data = item;
   newnode->next = NULL;            // new last node
   if (isEmpty()) { head = newnode; return; }   // safe version (not on the slide)
   Node *temp1 = head;
   while (temp1->next != NULL) temp1 = temp1->next;   // go to last node
   temp1->next = newnode;           // last node now points to new node
}`,
    'list.insertatend.slide': `void insertatend(int item)        // exactly as on the slide
{
   Node *newnode = new Node();
   newnode->data = item;
   newnode->next = NULL;
   Node *temp1 = head;
   while (temp1->next != NULL) temp1 = temp1->next;
   temp1->next = newnode;
}`,
    'list.insertsorted': `void insertsorted(int item)            // ascending order
{
   Node *newnode = new Node();
   newnode->data = item;
   if (isEmpty() || item < head->data)   // empty list or new smallest
   {
      newnode->next = head;
      head = newnode;
   }
   else
   {
      Node *temp = head;
      while (temp->next != NULL && temp->next->data < item)
         temp = temp->next;                // temp = node before insertion point
      newnode->next = temp->next;          // step 2
      temp->next = newnode;                // step 3
   }
}`,
    'list.insertsorted.slide': `void insertsorted(int item)        // the slide's loop
{
   Node *newnode = new Node();
   newnode->data = item;
   Node *temp1 = head;
   while ((temp1->data > item && temp1->next->data > item) ||
          (temp1->data < item && temp1->next->data < item) && temp1 != NULL)
      temp1 = temp1->next;
   newnode->next = temp1->next;
   temp1->next = newnode;
}`,
    'list.deletefrombeginning': `int deletefrombeginning()
{
   int value;
   Node *temp = head;
   if (isEmpty()) { cout << "Empty" << endl; return 0; }
   else
   { value = head->data;
     head = head->next;      // head points to the second node
     delete(temp);
     return (value); }
}`,
    'list.deletefromend': `int deletefromend()
{
   if (isEmpty()) { cout << "Empty" << endl; return 0; }
   else
   { int value;
     Node *temp1 = head, *temp2 = NULL;
     while (temp1->next != NULL) { temp2 = temp1; temp1 = temp1->next; }
     value = temp1->data;
     delete temp1;
     temp2->next = NULL;     // (if there was only one node, set head = NULL instead)
     return (value); }
}`,
    'list.deleteitem': `void deleteitem(int value)
{
   if (isEmpty()) cout << "empty";
   else if (search(value))
   {
      Node *temp1 = head, *temp2 = NULL;
      if (head->data == value) { head = head->next; delete temp1; }
      else
      {
         while ((temp1->data != value) && (temp1 != NULL))
         { temp2 = temp1; temp1 = temp1->next; }   // temp2 = previous, temp1 = current
         temp2->next = temp1->next;                 // bypass the node
         delete(temp1);
      }
   }
   else cout << "not found";
}`,
    'list.search': `bool search(int item)
{
   Node *temp = head;
   while (temp != NULL)
   {
      if (temp->data == item) return (true);
      else temp = temp->next;
   }
   return (false);
}`,
    'lstack.push': `void push(int item)
{
   Node *newnode = new Node();
   newnode->data = item;
   if (isEmpty()) { newnode->next = NULL; top = newnode; }
   else           { newnode->next = top;  top = newnode; }
}`,
    'lstack.pop': `int pop()
{
   int value;
   Node *temp = top;
   if (isEmpty()) { cout << "Empty" << endl; return 0; }
   else
   { value = top->data;
     top = top->next;
     delete(temp);
     return (value); }
}`,
    'lqueue.enqueue': `void enqueue(int item)
{
   Node *newnode = new Node();
   newnode->data = item;
   newnode->next = NULL;
   if (isEmpty()) { front = newnode; rear = newnode; }
   else           { rear->next = newnode; rear = newnode; }
}`,
    'lqueue.dequeue': `int dequeue()
{
   int value;
   Node *temp = front;
   if (isEmpty()) { cout << "Empty" << endl; return 0; }
   else
   { value = front->data;
     front = front->next;
     if (front == NULL) rear = NULL;   // the fix (Lab 7); the lecture forgets it
     delete(temp);
     return (value); }
}`,
    'lqueue.dequeue.slide': `int dequeue()                      // exactly as in the lecture
{
   int value;
   Node *temp = front;
   if (isEmpty()) { cout << "Empty" << endl; return 0; }
   else
   { value = front->data;
     front = front->next;
     delete(temp);
     return (value); }
}
// isEmpty() is: front == NULL && rear == NULL`,
    'dlist.insertatbeginning': `void insertatbeginning(int item)
{
   Node *newnode = new Node();
   newnode->data = item;
   if (isEmpty())
   { newnode->next = NULL; newnode->prev = NULL; head = newnode; }
   else
   { newnode->next = head;
     newnode->prev = NULL;
     head->prev = newnode;      // old first node points back to new node
     head = newnode; }
}`,
    'dlist.insertatend': `void insertatend(int item)
{
   Node *newnode = new Node();
   newnode->data = item;
   newnode->next = NULL;
   Node *temp1 = head;
   while (temp1->next != NULL) temp1 = temp1->next;   // last node
   temp1->next = newnode;
   newnode->prev = temp1;
}`,
    'dlist.deleteitem': `void deleteitem(int value)
{
   Node *temp1 = head, *temp2 = NULL;
   if (head->data == value)
   {
      if (head->next == NULL) { head = NULL; delete (temp1); }
      else { head = head->next; head->prev = NULL; delete temp1; }
   }
   else
   {
      while ((temp1->data != value) && (temp1 != NULL))
      { temp2 = temp1; temp1 = temp1->next; }
      if (temp1->next == NULL)              // deleting the last node
      { temp2->next = NULL; delete temp1; }
      else                                  // interior node
      { temp2->next = temp1->next;
        temp1->next->prev = temp1->prev;
        delete(temp1); }
   }
}`,
    'bst.insert': `Node* insert(Node *temp, int item)
{
   if (temp == NULL)
   {
      Node *newnode = new Node();
      newnode->data = item;
      temp = newnode;
   }
   else if (item < temp->data) temp->left = insert(temp->left, item);
   else temp->right = insert(temp->right, item);
   return temp;
}`,
    'bst.search': `bool search(Node *temp, int item)
{
   if (temp == NULL) return false;
   else if (item == temp->data) return true;
   else if (item < temp->data) return search(temp->left, item);
   else return search(temp->right, item);
}`,
    'bst.inorder': `void inorder(Node *temp)
{
   if (temp == NULL) { return; }
   inorder(temp->left);
   cout << temp->data << "\\t";
   inorder(temp->right);
}`,
    'bst.preorder': `void preorder(Node *temp)
{
   if (temp == NULL) { return; }
   cout << temp->data << "\\t";
   preorder(temp->left);
   preorder(temp->right);
}`,
    'bst.postorder': `void postorder(Node *temp)
{
   if (temp == NULL) { return; }
   postorder(temp->left);
   postorder(temp->right);
   cout << temp->data << "\\t";
}`,
    'bst.delete': `// delete(item): the three cases from the lecture
find p, the node that holds item
if (p is a leaf)                 // case 1
   remove p
else if (p has one child)        // case 2
   link p's parent to that child
else                             // case 3: two children
{  s = minimum(p->right);        // inorder successor
   p->data = s->data;
   delete s (it has no left child)
}`,
    'hash.probe': `int i = 0;
int index = h(k, i);
while (table[index] != EMPTY)    // collision
{  i++;  index = h(k, i);  }
table[index] = k;`,
    'hash.chain': `int index = k % n;               // division method
append k to the end of list[index];`
  };
  const codeLines = fn => (CODE[fn] || '').split('\n');

  /* ════════ frames ════════
     frame: { items, edges, cap: [en, ar], out, code: { fn, hit: [] }, vars: [[name, value]], ask: { q: [en, ar], o: [], a }, crash }
     item: { id, k: kind, x, y, w, h, t, c, from: { dx, dy } }   edge: { id, a, b, as, bs, c, bend } */
  const SIZE = { cell: [56, 38], val: [56, 38], node: [84, 38], dnode: [112, 38], circ: [40, 40], slot: [64, 34] };
  const mk = (k, id, x, y, extra) => { const s = SIZE[k] || [0, 0]; return Object.assign({ id, k, x, y, w: s[0], h: s[1] }, extra || {}); };
  const ptr = (id, x, y, t, c) => ({ id, k: 'ptr', x, y, w: Math.max(44, t.length * 7.4 + 18), h: 24, t, c: c || '' });
  const lbl = (id, x, y, t, c) => ({ id, k: 'lbl', x, y, w: 0, h: 0, t: String(t), c: c || '' });

  // a recorder: sims say where in the code they are (at) and whether the next frame should be predicted (quiz), then push frames
  function Rec() {
    const r = { frames: [], code: null, ask: null, lastAsk: -9 };
    r.at = (fn, ...hit) => { r.code = fn ? { fn, hit } : null; };
    // ordinary questions are kept at least 3 steps apart; key moments (imp) are always asked
    r.quiz = (q, right, wrong, imp) => {
      if (!imp && r.frames.length - r.lastAsk < 3) return;
      const o = [String(right)]; wrong.forEach(w => { w = String(w); if (!o.includes(w)) o.push(w); });
      if (o.length < 2) return;
      const opts = o.slice(0, 4), seed = q[0].length + opts.join('').length;   // stable shuffle: same order every time
      for (let i = opts.length - 1; i > 0; i--) { const j = (seed * (i + 3)) % (i + 1); [opts[i], opts[j]] = [opts[j], opts[i]]; }
      r.ask = { q, o: opts, a: opts.indexOf(String(right)) };
    };
    r.push = (f, vars) => { f.code = r.code; f.vars = vars || []; if (r.ask) { f.ask = r.ask; r.ask = null; r.lastAsk = r.frames.length; } r.frames.push(f); return f; };
    return r;
  }

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
      case 'inU': return [it.x, it.y + 12];
      case 'outL': return [it.x + it.w, it.y + it.h - 12];
      default: {
        const ox = other.x + other.w / 2, oy = other.y + other.h / 2, dx = ox - cx, dy = oy - cy;
        if (it.k === 'circ') { const d = Math.hypot(dx, dy) || 1; return [cx + dx / d * it.w / 2, cy + dy / d * it.h / 2]; }
        const sx = dx ? (it.w / 2) / Math.abs(dx) : Infinity, sy = dy ? (it.h / 2) / Math.abs(dy) : Infinity, s = Math.min(sx, sy);
        return s === Infinity ? [cx, cy] : [cx + dx * s, cy + dy * s];
      }
    }
  }

  let vid = 0;
  const newVal = () => 'v' + (++vid);
  const others = (right, pool) => pool.filter(x => String(x) !== String(right));

  /* ════════ array-based structures ════════ */
  function stackSim(spec, R) {
    const N = spec.size || 4, arr = Array(N).fill(null);
    let top = -1;
    const X = 110, cellY = i => (N - 1 - i) * 44 + 20;
    const draw = (cap, hl, extraVars) => {
      const items = [lbl('title', X + 28, 4, 'stack_arr  (MAXSIZE = ' + N + ')', 'muted')], edges = [];
      for (let i = 0; i < N; i++) {
        items.push(mk('cell', 'c' + i, X, cellY(i), { c: hl && hl[i] || '' }));
        items.push(lbl('i' + i, X + 76, cellY(i) + 19, '[' + i + ']', 'muted'));
        if (arr[i]) items.push(mk('val', arr[i].id, X, cellY(i), { t: arr[i].v, c: i > top ? 'stale' : '', from: { dx: 0, dy: -40 } }));
      }
      if (top >= 0) { items.push(ptr('top', 0, cellY(top) + 7, 'top = ' + top, 'on')); edges.push({ id: 'e-top', a: 'top', as: 'r', b: 'c' + top, bs: 'l' }); }
      else items.push(ptr('top', 0, cellY(0) + 52, 'top = -1', ''));
      return R.push({ items, edges, cap }, [['top', top], ['MAXSIZE', N]].concat(extraVars || []));
    };
    R.at(null); draw(C('Empty stack: top = -1 (isEmpty is true).', 'الـ stack فاضي: الـ top = -1 (يعني isEmpty بترجع true).'));
    for (const op of spec.ops) {
      const [name, a] = op.split(' ');
      if (name === 'push') {
        if (top === N - 1) {
          R.at('stack.push', 'isFull(top)', 'Stack overflow');
          R.quiz(C(`The stack is full (top = ${top}). What does push(${a}) do?`, `الـ stack مليان (top = ${top}). push(${a}) هتعمل إيه؟`), 'Prints "Stack overflow"', [`Stores ${a} in stack_arr[${top + 1}]`, `Overwrites stack_arr[${top}] with ${a}`, 'Sets top = -1'], true);
          draw(C(`push(${a}): top == MAXSIZE − 1 (${N - 1}), so isFull is true → "Stack overflow".`, `push(${a}): الـ top == MAXSIZE − 1 (يعني ${N - 1})، فالـ isFull بترجع true → "Stack overflow".`), { [top]: 'bad' }, [['item', a]]);
          continue;
        }
        R.at('stack.push', 'top = top + 1');
        R.quiz(C(`push(${a}): top is ${top} now. What is top after the push?`, `push(${a}): الـ top دلوقتي ${top}. هيبقى كام بعد الـ push؟`), top + 1, [top, top + 2, -1]);
        top++; arr[top] = { id: newVal(), v: a };
        draw(C(`push(${a}): top = top + 1 = ${top}, then stack_arr[${top}] = ${a}.`, `push(${a}): الـ top = top + 1 = ${top}، وبعدين stack_arr[${top}] = ${a}.`), { [top]: 'new' }, [['item', a]]);
      } else if (name === 'pop') {
        if (top === -1) { R.at('stack.pop', 'isEmpty(top)'); draw(C('pop(): top == -1, so isEmpty is true → "Stack underflow", returns -1.', 'pop(): الـ top == -1، فالـ isEmpty بترجع true → "Stack underflow" وبترجع -1.')); continue; }
        const v = arr[top].v, live = arr.slice(0, top + 1).map(x => x.v);
        R.at('stack.pop', 'int item = stack_arr[top]');
        R.quiz(C('What does pop() return?', 'الـ pop() هترجع إيه؟'), v, others(v, live.slice().reverse()).concat(['-1']));
        top--;
        draw(C(`pop(): item = stack_arr[${top + 1}] = ${v}, top = ${top}, returns ${v}. The value stays in the array (greyed out) but is no longer part of the stack.`, `pop(): الـ item = stack_arr[${top + 1}] = ${v}، والـ top بقى ${top}، وبترجع ${v}. القيمة لسه موجودة في الـ array (باهتة) بس خلاص مش جزء من الـ stack.`), { [top + 1]: 'gone' }, [['item', v]]);
      }
    }
  }

  function queueSim(spec, R) {
    const N = spec.size || 5, arr = Array(N).fill(null);
    let head = -1, tail = -1;
    const H = spec.names ? spec.names[0] : 'head', T = spec.names ? spec.names[1] : 'tail';
    const X0 = 96, cx = i => X0 + i * 62, Y = 64;
    const draw = (cap, hl, extraVars) => {
      const items = [lbl('title', X0 + (N * 62) / 2 - 4, 6, 'queue[ ]  (maxsize = ' + N + ')', 'muted')], edges = [];
      for (let i = 0; i < N; i++) {
        items.push(mk('cell', 'c' + i, cx(i), Y, { c: hl && hl[i] || '' }));
        items.push(lbl('i' + i, cx(i) + 28, Y + 52, '[' + i + ']', 'muted'));
        const live = head !== -1 && i >= head && i <= tail;
        if (arr[i]) items.push(mk('val', arr[i].id, cx(i), Y, { t: arr[i].v, c: live ? '' : 'stale', from: { dx: 0, dy: -40 } }));
      }
      if (head >= 0 && head < N) { items.push(ptr('h', cx(head) - 2, 22, H + ' = ' + head, 'on')); edges.push({ id: 'e-h', a: 'h', as: 'b', b: 'c' + head, bs: 't' }); }
      else items.push(ptr('h', 0, 22, H + ' = ' + head, ''));
      if (tail >= 0) { items.push(ptr('t', cx(tail) - 2, Y + 70, T + ' = ' + tail, 'on2')); edges.push({ id: 'e-t', a: 't', as: 't', b: 'c' + tail, bs: 'b' }); }
      else items.push(ptr('t', 0, Y + 70, T + ' = -1', ''));
      return R.push({ items, edges, cap }, [[H, head], [T, tail]].concat(extraVars || []));
    };
    R.at(null); draw(C(`Empty queue: ${H} = -1, ${T} = -1.`, `الـ queue فاضي: ${H} = -1 و ${T} = -1.`));
    for (const op of spec.ops) {
      const [name, a] = op.split(' ');
      if (name === 'enqueue') {
        if (tail === N - 1) {
          const free = head > 0;
          R.at('queue.enqueue', 'isFull(tail)', 'Queue is full');
          if (free) R.quiz(C(`${T} = ${N - 1} but slots 0 to ${head - 1} are empty. What does enqueue(${a}) do?`, `الـ ${T} = ${N - 1} بس الأماكن من 0 لـ ${head - 1} فاضية. enqueue(${a}) هتعمل إيه؟`), 'Prints "Queue is full"', [`Stores ${a} in queue[0]`, `Stores ${a} in queue[${head - 1}]`, `Moves every element left, then stores ${a}`], true);
          draw(free
            ? C(`enqueue(${a}): ${T} == maxsize − 1, so isFull says "Queue is full", although slots 0 to ${head - 1} are free. This wasted space is the problem of the linear queue; the circular queue fixes it.`, `enqueue(${a}): الـ ${T} == maxsize − 1، فالـ isFull بتقول "Queue is full" مع إن الأماكن من 0 لـ ${head - 1} فاضية. المساحة المهدرة دي هي مشكلة الـ linear queue، والـ circular queue هو اللي بيحلها.`)
            : C(`enqueue(${a}): ${T} == maxsize − 1 → "Queue is full".`, `enqueue(${a}): الـ ${T} == maxsize − 1 → "Queue is full".`),
            Object.fromEntries([...Array(head > 0 ? head : 0).keys()].map(i => [i, 'warn'])), [['item', a]]);
          continue;
        }
        const first = head === -1;
        R.at('queue.enqueue', first ? 'if (head == -1)' : 'tail = tail + 1', 'tail = tail + 1', 'queue[tail] = item');
        if (!first) R.quiz(C(`enqueue(${a}): where does ${a} go?`, `enqueue(${a}): الـ ${a} هتتحط فين؟`), `queue[${tail + 1}]`, [`queue[${tail}]`, `queue[${head}]`, `queue[0]`]);
        if (first) head = 0;
        tail++; arr[tail] = { id: newVal(), v: a };
        draw(C(`enqueue(${a}): ${first ? H + ' was -1, so ' + H + ' = 0; ' : ''}${T} = ${T} + 1 = ${tail}, queue[${tail}] = ${a}.`, `enqueue(${a}): ${first ? 'الـ ' + H + ' كان -1، فبقى ' + H + ' = 0؛ ' : ''}الـ ${T} = ${T} + 1 = ${tail}، و queue[${tail}] = ${a}.`), { [tail]: 'new' }, [['item', a]]);
      } else if (name === 'dequeue') {
        if (head === -1 || head > tail) { R.at('queue.dequeue', 'isEmpty(head)', 'Queue Underflow'); draw(C(`dequeue(): ${H} == -1 or ${H} > ${T}, so the queue is empty → "Queue Underflow", returns -1.`, `dequeue(): الـ ${H} == -1 أو ${H} > ${T}، يعني الـ queue فاضي → "Queue Underflow" وبترجع -1.`)); continue; }
        const v = arr[head].v, live = arr.slice(head, tail + 1).map(x => x.v);
        R.at('queue.dequeue', 'element = queue[head]', 'head++');
        R.quiz(C('What does dequeue() return?', 'الـ dequeue() هترجع إيه؟'), v, others(v, live.slice().reverse()).concat(['-1']));
        head++;
        draw(C(`dequeue(): element = queue[${head - 1}] = ${v}, then ${H}++ → ${H} = ${head}. Returns ${v}.${head > tail ? ' Now ' + H + ' > ' + T + ', so the queue is empty.' : ''}`, `dequeue(): الـ element = queue[${head - 1}] = ${v}، وبعدين ${H}++ → ${H} = ${head}. بترجع ${v}.${head > tail ? ' دلوقتي ' + H + ' > ' + T + '، يعني الـ queue فاضي.' : ''}`), { [head - 1]: 'gone' }, [['element', v]]);
      }
    }
  }

  function cqueueSim(spec, R) {
    const N = spec.size || 5, arr = Array(N).fill(null);
    let front = -1, rear = -1;
    const F = spec.names ? spec.names[0] : 'front', B = spec.names ? spec.names[1] : 'rear';
    const CX = 190, CY = 170, Rr = 100;
    const pos = (i, r) => { const a = (-90 + i * 360 / N) * Math.PI / 180; return [CX + r * Math.cos(a), CY + r * Math.sin(a)]; };
    const live = i => front !== -1 && (front <= rear ? i >= front && i <= rear : i >= front || i <= rear);
    const draw = (cap, hl, extraVars) => {
      const items = [{ id: 'ring', k: 'ring', x: CX - Rr, y: CY - Rr, w: 2 * Rr, h: 2 * Rr }], edges = [];
      for (let i = 0; i < N; i++) {
        const [x, y] = pos(i, Rr);
        items.push(mk('cell', 'c' + i, x - 28, y - 19, { c: hl && hl[i] || '' }));
        const [lx, ly] = pos(i, Rr + 44); items.push(lbl('i' + i, lx, ly, '[' + i + ']', 'muted'));
        if (arr[i]) items.push(mk('val', arr[i].id, x - 28, y - 19, { t: arr[i].v, c: live(i) ? '' : 'stale', from: { dx: 0, dy: -30 } }));
      }
      const pl = (id, name, idx, rr, dA, c) => {
        if (idx < 0) { items.push(ptr(id, CX - 40, CY - (id === 'f' ? 26 : -2), name + ' = -1', '')); return; }
        const a = (-90 + idx * 360 / N + dA) * Math.PI / 180, x = CX + rr * Math.cos(a), y = CY + rr * Math.sin(a);
        const p = ptr(id, 0, 0, name + ' = ' + idx, c); p.x = x - p.w / 2; p.y = y - p.h / 2; items.push(p);
        edges.push({ id: 'e-' + id, a: id, as: 'auto', b: 'c' + idx, bs: 'auto' });
      };
      pl('f', F, front, Rr - 62, front === rear ? -22 : 0, 'on');
      pl('r', B, rear, Rr - 62, front === rear ? 22 : 0, 'on2');
      return R.push({ items, edges, cap }, [[F, front], [B, rear], ['MAX_SIZE', N]].concat(extraVars || []));
    };
    R.at(null); draw(C(`Empty circular queue of size ${N}: ${F} = -1, ${B} = -1. Index ${N - 1} is followed by index 0.`, `circular queue فاضي حجمه ${N}: الـ ${F} = -1 والـ ${B} = -1. بعد الـ index ${N - 1} بييجي الـ index 0.`));
    for (const op of spec.ops) {
      const [name, a] = op.split(' ');
      if (name === 'enqueue') {
        if ((front === 0 && rear === N - 1) || (rear === (front - 1) % (N - 1))) {
          R.at('cqueue.enQueue', 'isFull()');
          R.quiz(C(`${F} = ${front}, ${B} = ${rear}. What does enQueue(${a}) do?`, `الـ ${F} = ${front} والـ ${B} = ${rear}. enQueue(${a}) هتعمل إيه؟`), 'Prints "Queue is full."', [`Stores ${a} in arr[${(rear + 1) % N}]`, `Overwrites arr[${front}]`, `Sets ${B} = 0`], true);
          draw(C(`enQueue(${a}): isFull is true (${F} = ${front}, ${B} = ${rear}) → "Queue is full."`, `enQueue(${a}): الـ isFull بترجع true (الـ ${F} = ${front} والـ ${B} = ${rear}) → "Queue is full."`), { [rear]: 'bad' }, [['value', a]]);
          continue;
        }
        const first = front === -1, old = rear;
        R.at('cqueue.enQueue', first ? 'if (front == -1)' : 'rear = (rear + 1) % MAX_SIZE', 'rear = (rear + 1) % MAX_SIZE', 'arr[rear] = value');
        if (!first) R.quiz(C(`enQueue(${a}) with ${B} = ${old}: what is the new ${B}?`, `enQueue(${a}) والـ ${B} = ${old}: الـ ${B} الجديد كام؟`), (old + 1) % N, [old + 1, 0, old].filter(x => x !== (old + 1) % N), old === N - 1);
        if (first) front = 0;
        rear = (rear + 1) % N; arr[rear] = { id: newVal(), v: a };
        const wrap = old === N - 1;
        draw(C(`enQueue(${a}): ${first ? F + ' was -1, so ' + F + ' = 0; ' : ''}${B} = (${old} + 1) % ${N} = ${rear}${wrap ? ' (it wraps around to the start)' : ''}, arr[${rear}] = ${a}.`, `enQueue(${a}): ${first ? 'الـ ' + F + ' كان -1 فبقى 0؛ ' : ''}الـ ${B} = (${old} + 1) % ${N} = ${rear}${wrap ? ' (لف ورجع لأول الـ array)' : ''}، و arr[${rear}] = ${a}.`), { [rear]: 'new' }, [['value', a]]);
      } else if (name === 'dequeue') {
        if (front === -1) { R.at('cqueue.deQueue', 'isEmpty()'); draw(C(`deQueue(): ${F} == -1 → "Queue is empty."`, `deQueue(): الـ ${F} == -1 → "Queue is empty."`)); continue; }
        const v = arr[front].v, old = front;
        const pool = []; for (let k = 0; k < N; k++) if (live(k)) pool.push(arr[k].v);
        R.at('cqueue.deQueue', 'element = arr[front]', front === rear ? 'if (front == rear)' : 'else { front = (front + 1) % MAX_SIZE; }');
        R.quiz(C('What does deQueue() return?', 'الـ deQueue() هترجع إيه؟'), v, others(v, pool.reverse()).concat(['-1']));
        if (front === rear) { front = -1; rear = -1; draw(C(`deQueue(): element = arr[${old}] = ${v}. ${F} == ${B} (the last element), so ${F} = ${B} = -1.`, `deQueue(): الـ element = arr[${old}] = ${v}. الـ ${F} == ${B} (ده آخر عنصر)، فبيرجعوا ${F} = ${B} = -1.`), { [old]: 'gone' }, [['element', v]]); }
        else { front = (front + 1) % N; draw(C(`deQueue(): element = arr[${old}] = ${v}, ${F} = (${old} + 1) % ${N} = ${front}. Returns ${v}.`, `deQueue(): الـ element = arr[${old}] = ${v}، والـ ${F} = (${old} + 1) % ${N} = ${front}. بترجع ${v}.`), { [old]: 'gone' }, [['element', v]]); }
      }
    }
  }

  function arraySim(spec, R) {
    const N = spec.size || 8, el = Array(N).fill(null);
    (spec.init || []).forEach((v, i) => { if (i < N) el[i] = { id: newVal(), v: String(v) }; });
    let length = Math.min(N, (spec.init || []).length);
    const X0 = 20, cx = i => X0 + i * 62, Y = 40;
    const draw = (cap, hl, extraVars) => {
      const items = [lbl('title', X0 + N * 31 - 4, 8, 'element[ ]  (MaxSize = ' + N + ', length = ' + length + ')', 'muted')];
      for (let i = 0; i < N; i++) {
        items.push(mk('cell', 'c' + i, cx(i), Y, { c: hl && hl[i] || '' }));
        items.push(lbl('i' + i, cx(i) + 28, Y + 52, '[' + i + ']', 'muted'));
        if (el[i]) items.push(mk('val', el[i].id, cx(i), Y, { t: el[i].v, c: i < length ? '' : 'stale', from: { dx: 0, dy: -40 } }));
      }
      return R.push({ items, edges: [], cap }, [['length', length], ['MaxSize', N]].concat(extraVars || []));
    };
    R.at(null); draw(C(`The array holds ${length} elements: length = ${length}.`, `الـ array فيه ${length} عناصر: الـ length = ${length}.`));
    for (const op of spec.ops) {
      const p = op.split(' '), name = p[0], k = +p[1], x = p[2];
      if (name === 'insert') {
        if (k < 0 || k > length || isNaN(k)) { R.at('array.insert', 'OutOfBounds'); draw(C(`Insert(${p[1]}, ${x}): k is out of range (0 to ${length}) → OutOfBounds.`, `Insert(${p[1]}, ${x}): الـ k برّه الحدود (من 0 لـ ${length}) → OutOfBounds.`)); continue; }
        if (length === N) { R.at('array.insert', 'NoMem'); draw(C(`Insert(${k}, ${x}): length == MaxSize → NoMem (the array is full).`, `Insert(${k}, ${x}): الـ length == MaxSize → NoMem (الـ array مليان).`)); continue; }
        R.at('array.insert', 'for (int i = length-1');
        if (length > k) R.quiz(C(`Insert ${x} at index ${k}: which element moves first?`, `هندخّل ${x} في الـ index ${k}: أنهي عنصر بيتحرك الأول؟`), `element[${length - 1}] (${el[length - 1].v})`, [`element[${k}] (${el[k].v})`, `element[0] (${el[0].v})`, `None: ${x} overwrites element[${k}]`]);
        draw(C(`Insert ${x} after the ${k}th element (at index ${k}): shift element[${length - 1}] … element[${k}] one place right, starting from the end.`, `هندخّل ${x} بعد العنصر رقم ${k} (في الـ index ${k}): بنزق العناصر من element[${length - 1}] لحد element[${k}] خطوة لليمين، ونبدأ من الآخر.`), { [k]: 'hl' }, [['k', k], ['x', x]]);
        for (let i = length - 1; i >= k; i--) {
          R.at('array.insert', 'element[i+1] = element[i]');
          el[i + 1] = el[i]; el[i] = null;
          draw(C(`i = ${i}: element[${i + 1}] = element[${i}] (${el[i + 1].v} moves right).`, `i = ${i}: element[${i + 1}] = element[${i}] (الـ ${el[i + 1].v} اتنقلت يمين).`), { [i + 1]: 'hl' }, [['k', k], ['x', x], ['i', i]]);
        }
        el[k] = { id: newVal(), v: x }; length++;
        R.at('array.insert', 'element[k] = x', 'length++');
        draw(C(`element[${k}] = ${x}, length++ → ${length}.`, `element[${k}] = ${x}، والـ length++ → ${length}.`), { [k]: 'new' }, [['k', k], ['x', x]]);
      } else if (name === 'delete') {
        if (!(k >= 1 && k <= length)) { R.at('array.delete', 'if (Find(k, x))'); draw(C(`Delete(${p[1]}): there is no ${p[1]}th element (Find fails).`, `Delete(${p[1]}): مفيش عنصر رقم ${p[1]} (الـ Find بترجع false).`)); continue; }
        const gone = el[k - 1].v; el[k - 1] = null;
        R.at('array.delete', 'if (Find(k, x))');
        draw(C(`Delete(${k}): remove the ${k}th element, element[${k - 1}] = ${gone}.`, `Delete(${k}): هنشيل العنصر رقم ${k}، يعني element[${k - 1}] = ${gone}.`), { [k - 1]: 'gone' }, [['k', k], ['x', gone]]);
        for (let i = k; i < length; i++) {
          R.at('array.delete', 'element[i-1] = element[i]');
          el[i - 1] = el[i]; el[i] = null;
          draw(C(`i = ${i}: element[${i - 1}] = element[${i}] (${el[i - 1].v} moves left).`, `i = ${i}: element[${i - 1}] = element[${i}] (الـ ${el[i - 1].v} اتنقلت شمال).`), { [i - 1]: 'hl' }, [['k', k], ['i', i]]);
        }
        R.at('array.delete', 'length--');
        R.quiz(C('What is length now?', 'الـ length بقى كام؟'), length - 1, [length, length - 2, k]);
        length--;
        draw(C(`length-- → ${length}.`, `الـ length-- → ${length}.`), {}, [['k', k]]);
      } else if (name === 'search') {
        let found = -1;
        const idx = el.slice(0, length).findIndex(e => e.v === p[1]);
        R.at('array.search', 'for (int i = 0');
        R.quiz(C(`search(${p[1]}): what does it return?`, `search(${p[1]}): هترجع إيه؟`), idx, [-1, 0, length - 1, idx + 1].filter(v => v !== idx));
        for (let i = 0; i < length; i++) {
          const hit = el[i].v === p[1];
          R.at('array.search', hit ? 'return i' : 'if (element[i] == x)');
          draw(C(`Compare element[${i}] = ${el[i].v} with ${p[1]}: ${hit ? 'found, return ' + i + '.' : 'not equal, move on.'}`, `قارن element[${i}] = ${el[i].v} بالـ ${p[1]}: ${hit ? 'لقيناها، بترجع ' + i + '.' : 'مش زيها، نكمل.'}`), { [i]: hit ? 'ok' : 'hl' }, [['x', p[1]], ['i', i]]);
          if (hit) { found = i; break; }
        }
        if (found < 0) { R.at('array.search', 'return -1'); draw(C(`${p[1]} is not in the array (${length} comparisons): return -1.`, `الـ ${p[1]} مش موجودة في الـ array (${length} مقارنات): بترجع -1.`), {}, [['x', p[1]]]); }
      }
    }
  }

  /* ════════ linked structures ════════ */
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
    if (st.ghost) items.push(mk(dbl ? 'dnode' : 'node', st.ghost.id, X0, Y + 112, { t: st.ghost.v, c: 'freed', nul: true }));
    if (st.fresh) {
      const at = Math.max(0, Math.min(st.freshAt != null ? st.freshAt : st.nodes.length, st.nodes.length));
      items.push(mk(dbl ? 'dnode' : 'node', st.fresh.id, nx(at) - (st.freshAt != null && st.freshAt < st.nodes.length ? (NW + gap) / 2 : 0) + (st.ghost ? NW + gap : 0), Y + 112, { t: st.fresh.v, c: 'new', nul: !st.fresh.next, from: { dx: 0, dy: 30 } }));
      if (st.fresh.next) edges.push({ id: 'f>' + st.fresh.next, a: st.fresh.id, as: 'next', b: st.fresh.next, bs: 'auto' });
      if (st.fresh.prev) edges.push({ id: 'fp>' + st.fresh.prev, a: st.fresh.id, as: 'prev', b: st.fresh.prev, bs: 'auto', c: 'prevl' });
      (st.linkTo || []).forEach(src => edges.push({ id: 'l' + src + '>f', a: src, as: 'next', b: st.fresh.id, bs: 'auto', c: st.ghost && src === st.ghost.id ? 'badl' : '' }));
      (st.backTo || []).forEach(src => edges.push({ id: 'b' + src + '>f', a: src, as: 'prev', b: st.fresh.id, bs: 'auto', c: 'prevl' }));
    }
    const stackAt = {};
    for (const p of st.ptrs) {
      const below = p.side === 'below';
      const idx = p.to == null ? -1 : st.nodes.findIndex(n => n.id === p.to);
      const onFresh = st.fresh && p.to === st.fresh.id, onGhost = st.ghost && p.to === st.ghost.id;
      const key = (onFresh ? 'F' : onGhost ? 'G' : idx) + (below ? 'b' : 'a');
      const n = stackAt[key] = (stackAt[key] || 0) + 1;
      const it = ptr('p-' + p.name, 0, 0, p.name + (p.to == null ? ' = NULL' : ''), p.to == null ? '' : p.c || 'on');
      const box = onFresh ? items.find(x => x.id === st.fresh.id) : onGhost ? items.find(x => x.id === st.ghost.id) : null;
      if (box) { it.x = box.x + box.w / 2 - it.w / 2; it.y = box.y + box.h + 14 + (n - 1) * 28; }
      else if (idx >= 0) { it.x = nx(idx) + NW / 2 - it.w / 2; it.y = below ? Y + 52 + (n - 1) * 28 : Y - 34 - (n - 1) * 28; }
      else { it.x = X0 - (dbl ? 70 : 0); it.y = below ? Y + 60 + (n - 1) * 28 : Y - 60 - (n - 1) * 28; }
      items.push(it);
      if (p.to != null) edges.push({ id: 'e-' + p.name, a: it.id, as: box ? 't' : below ? 't' : 'b', b: p.to, bs: box ? 'b' : below ? 'b' : 't', c: 'ptrl' });
    }
    return { items, edges, cap };
  }

  function listSim(spec, R) {
    const kind = spec.type, dbl = kind === 'dlist';
    let uid = 0; const nid = () => 'N' + (++uid);
    const st = { dbl, nodes: (spec.init || []).map(v => ({ id: nid(), v: String(v) })), ptrs: [], fresh: null, ghost: null };
    const P = { list: ['head'], dlist: ['head'], lstack: ['top'], lqueue: ['front', 'rear'] }[kind];
    const pre = kind;
    const first = () => st.nodes[0] ? st.nodes[0].id : null, lastId = () => st.nodes.length ? st.nodes[st.nodes.length - 1].id : null;
    const valOf = id => { const n = st.nodes.find(x => x.id === id) || (st.fresh && st.fresh.id === id && st.fresh) || (st.ghost && st.ghost.id === id && st.ghost); return n ? n.v : '?'; };
    const basePtrs = () => kind === 'lqueue' ? [{ name: 'front', to: first() }, { name: 'rear', to: st.ghost ? st.ghost.id : lastId(), side: 'below', c: st.ghost ? 'warn' : 'on2' }] : [{ name: P[0], to: first() }];
    const show = id => id == null ? 'NULL' : '→ ' + valOf(id) + (st.ghost && st.ghost.id === id ? ' (freed)' : '');
    const snap = (cap, hl, extra, override) => {
      st.ptrs = basePtrs().concat(extra || []);
      const f = listDraw(override ? Object.assign({}, st, override) : st, cap, hl);
      const vars = st.ptrs.map(p => [p.name, show(p.to)]);
      if (st.fresh) vars.push(['newnode', '→ ' + st.fresh.v]);
      return R.push(f, vars);
    };
    const t = { list: ['Singly linked list', 'singly linked list'], dlist: ['Doubly linked list', 'doubly linked list'], lstack: ['Linked stack', 'linked stack'], lqueue: ['Linked queue', 'linked queue'] }[kind];
    R.at(null);
    snap(st.nodes.length ? C(`${t[0]}: ${P.join(' and ')} point${P.length > 1 ? '' : 's'} into the chain; the last node's next is NULL.`, `${t[1]}: الـ ${P.join(' والـ ')} بيشاوروا على السلسلة، والـ next بتاع آخر node بيبقى NULL.`)
      : C(`Empty ${t[1]}: ${P.map(p => p + ' = NULL').join(', ')}.`, `${t[1]} فاضية: ${P.map(p => p + ' = NULL').join('، ')}.`));
    for (const op of spec.ops) {
      const [name, a] = op.split(' ');
      const make = () => { st.fresh = { id: nid(), v: a, next: null }; };
      if (name === 'begin' || name === 'push') {
        const fn = pre + (name === 'push' ? '.push' : '.insertatbeginning'), p = P[0];
        make(); st.freshAt = 0;
        R.at(fn, 'new Node()', 'newnode->data = item');
        snap(C(`${name === 'push' ? 'push' : 'insertatbeginning'}(${a}): newnode = new Node(), newnode->data = ${a}.`, `${name === 'push' ? 'push' : 'insertatbeginning'}(${a}): بنعمل newnode = new Node() و newnode->data = ${a}.`));
        if (st.nodes.length) {
          R.at(fn, 'newnode->next = ' + p);
          R.quiz(C('Which line must run first, so no node is lost?', 'أنهي سطر لازم يتنفذ الأول عشان مانضيعش أي node؟'), `newnode->next = ${p};`, [`${p} = newnode;`, `${p}->next = newnode;`, `newnode = ${p};`], true);
          st.fresh.next = first();
          snap(C(`newnode->next = ${p}: the new node points at the old first node (${st.nodes[0].v}). Doing "${p} = newnode" first would lose the whole list.`, `newnode->next = ${p}: الـ node الجديدة بتشاور على أول node قديمة (${st.nodes[0].v}). لو عملنا "${p} = newnode" الأول هنضيّع الـ list كلها.`));
          if (dbl) { R.at(fn, 'head->prev = newnode'); st.backTo = [first()]; snap(C(`${p}->prev = newnode: the old first node points back at the new one.`, `${p}->prev = newnode: أول node قديمة بقت بتشاور ورا على الجديدة.`)); }
        } else { R.at(fn, 'newnode->next = NULL'); snap(C(`The ${t[1]} is empty (${p} == NULL), so newnode->next = NULL.`, `الـ ${t[1]} فاضية (${p} == NULL)، فـ newnode->next = NULL.`)); }
        R.at(fn, p + ' = newnode');
        st.nodes.unshift({ id: st.fresh.id, v: a }); st.fresh = null; st.backTo = null; st.freshAt = null;
        snap(C(`${p} = newnode: ${a} is now the first node.`, `${p} = newnode: الـ ${a} بقت أول node.`), { [first()]: 'new' });
      } else if (name === 'end' || name === 'enqueue' || name === 'end!') {
        const slide = name === 'end!', fn = kind === 'lqueue' ? 'lqueue.enqueue' : pre + '.insertatend' + (slide ? '.slide' : '');
        make(); st.freshAt = st.nodes.length;
        R.at(fn, 'new Node()', 'newnode->data = item', 'newnode->next = NULL');
        snap(C(`${kind === 'lqueue' ? 'enqueue' : 'insertatend'}(${a}): newnode with data = ${a} and newnode->next = NULL.`, `${kind === 'lqueue' ? 'enqueue' : 'insertatend'}(${a}): newnode فيها data = ${a} و newnode->next = NULL.`));
        if (kind === 'lqueue' && st.ghost) {
          R.at(fn, 'if (isEmpty())', 'rear->next = newnode');
          R.quiz(C('front is NULL but rear still points at the freed node. What does enqueue do now?', 'الـ front بـ NULL بس الـ rear لسه بيشاور على الـ node اللي اتمسحت. الـ enqueue هتعمل إيه دلوقتي؟'), 'Writes rear->next into freed memory; front stays NULL', ['front = rear = newnode, as for an empty queue', 'Prints "Empty"', 'Adds the node after the old front'], true);
          st.linkTo = [st.ghost.id];
          snap(C('isEmpty() is false (rear is not NULL), so it runs rear->next = newnode: that writes into the deleted node. front is still NULL, so the queue looks empty and the new value is lost. This is why the lecture code needs "if (front == NULL) rear = NULL;".', 'الـ isEmpty() بترجع false (الـ rear مش NULL)، فبتنفّذ rear->next = newnode: يعني بتكتب جوه node اتمسحت. والـ front لسه NULL، فالـ queue شكله فاضي والقيمة الجديدة ضاعت. عشان كده كود المحاضرة محتاج "if (front == NULL) rear = NULL;".'), {}).crash = true;
          st.fresh = null; st.linkTo = null;
          continue;
        }
        if (!st.nodes.length) {
          if (slide) {
            R.at(fn, 'Node *temp1 = head');
            snap(C('temp1 = head, but the list is empty, so temp1 = NULL.', 'الـ temp1 = head، بس الـ list فاضية، فـ temp1 = NULL.'), {}, [{ name: 'temp1', to: null, side: 'below' }]);
            R.at(fn, 'while (temp1->next != NULL)');
            R.quiz(C('temp1 is NULL. What happens at "temp1->next"?', 'الـ temp1 بـ NULL. إيه اللي هيحصل عند "temp1->next"؟'), 'The program crashes', ['The loop is skipped and head = newnode', 'temp1->next is NULL, so the loop ends', 'newnode becomes the first node'], true);
            snap(C('temp1->next reads memory through a NULL pointer: the program crashes (segmentation fault). The slide\'s insertatend only works on a non-empty list; the fix is "if (isEmpty()) { head = newnode; return; }" before the loop.', 'الـ temp1->next بيقرا من الـ memory عن طريق NULL pointer: البرنامج بيعمل crash (segmentation fault). الـ insertatend اللي في السلايد بتشتغل بس لو الـ list مش فاضية؛ والحل إننا نحط "if (isEmpty()) { head = newnode; return; }" قبل الـ loop.'), {}, [{ name: 'temp1', to: null, side: 'below' }]).crash = true;
            st.fresh = null; st.freshAt = null;
            continue;
          }
          R.at(fn, kind === 'lqueue' ? 'front = newnode; rear = newnode' : 'if (isEmpty()) { head = newnode; return; }');
          st.nodes.push({ id: st.fresh.id, v: a }); st.fresh = null;
          snap(kind === 'lqueue' ? C('The queue is empty (front and rear are NULL), so front = newnode and rear = newnode.', 'الـ queue فاضي (الـ front والـ rear بـ NULL)، فـ front = newnode و rear = newnode.') : C('The list is empty, so head = newnode (the safe version; the slide\'s loop would crash here).', 'الـ list فاضية، فـ head = newnode (دي النسخة الآمنة؛ الـ loop اللي في السلايد كانت هتعمل crash هنا).'), { [first()]: 'new' });
          continue;
        }
        if (kind === 'lqueue') {
          R.at(fn, 'rear->next = newnode');
          R.quiz(C('The queue is not empty. Which node gets linked to the new one?', 'الـ queue مش فاضي. أنهي node هتتوصل بالجديدة؟'), `rear (${st.nodes[st.nodes.length - 1].v})`, (st.nodes.length > 1 ? [`front (${st.nodes[0].v})`] : []).concat(['None: front = newnode', 'We walk from front to find the last node']));
          st.linkTo = [lastId()];
          snap(C(`rear->next = newnode: the old last node (${st.nodes[st.nodes.length - 1].v}) points at the new one. No walking needed: rear already points at the end.`, `rear->next = newnode: آخر node قديمة (${st.nodes[st.nodes.length - 1].v}) بقت بتشاور على الجديدة. مش محتاجين نلف على الـ list: الـ rear أصلًا واقف عند الآخر.`));
        } else {
          R.at(fn, 'Node *temp1 = head');
          R.quiz(C('temp1 starts at head. At which node does the loop stop?', 'الـ temp1 بيبدأ من الـ head. الـ loop هتقف عند أنهي node؟'), st.nodes[st.nodes.length - 1].v, st.nodes.map(n => n.v).concat(['NULL']).reverse());
          let i = 0;
          snap(C('temp1 = head (the first node).', 'الـ temp1 = head (أول node).'), { [st.nodes[0].id]: 'hl' }, [{ name: 'temp1', to: st.nodes[0].id, side: 'below', c: 'on2' }]);
          while (st.nodes[i + 1]) { i++; R.at(fn, 'while (temp1->next != NULL)'); snap(C('temp1->next != NULL, so temp1 = temp1->next.', 'الـ temp1->next != NULL، فـ temp1 = temp1->next.'), { [st.nodes[i].id]: 'hl' }, [{ name: 'temp1', to: st.nodes[i].id, side: 'below', c: 'on2' }]); }
          R.at(fn, 'temp1->next = newnode');
          st.linkTo = [lastId()];
          snap(C('temp1->next is NULL (temp1 is the last node), so temp1->next = newnode.', 'الـ temp1->next بقت NULL (يعني temp1 هي آخر node)، فـ temp1->next = newnode.'), { [lastId()]: 'hl' }, [{ name: 'temp1', to: lastId(), side: 'below', c: 'on2' }]);
          if (dbl) { R.at(fn, 'newnode->prev = temp1'); st.fresh.prev = lastId(); snap(C('newnode->prev = temp1: the new node points back at the old last node.', 'newnode->prev = temp1: الـ node الجديدة بتشاور ورا على آخر node قديمة.'), {}, [{ name: 'temp1', to: lastId(), side: 'below', c: 'on2' }]); }
        }
        R.at(fn, kind === 'lqueue' ? 'rear = newnode' : 'temp1->next = newnode');
        st.nodes.push({ id: st.fresh.id, v: a }); st.fresh = null; st.linkTo = null;
        snap(kind === 'lqueue' ? C(`rear = newnode: ${a} is the new rear.`, `rear = newnode: الـ ${a} بقت الـ rear الجديدة.`) : C(`${a} is now the last node; its next is NULL.`, `الـ ${a} بقت آخر node، والـ next بتاعها NULL.`), { [lastId()]: 'new' });
      } else if (name === 'pop' || name === 'dequeue' || name === 'dequeue!' || name === 'delfirst') {
        const slide = name === 'dequeue!', p = P[0];
        const fn = kind === 'lstack' ? 'lstack.pop' : kind === 'lqueue' ? 'lqueue.dequeue' + (slide ? '.slide' : '') : 'list.deletefrombeginning';
        const call = name === 'delfirst' ? 'deletefrombeginning' : name.replace('!', '');
        if (!st.nodes.length) { R.at(fn, 'if (isEmpty())'); snap(C(`${call}(): ${p} == NULL → the ${t[1]} is empty ("Empty").`, `${call}(): الـ ${p} == NULL → الـ ${t[1]} فاضية ("Empty").`)); continue; }
        const gone = st.nodes[0];
        R.at(fn, 'Node *temp = ' + p, 'value = ' + p + '->data');
        R.quiz(C(`What does ${call}() return?`, `الـ ${call}() هترجع إيه؟`), gone.v, others(gone.v, st.nodes.map(n => n.v).reverse()).concat(['0']));
        snap(C(`${call}(): temp = ${p} (the node with ${gone.v}), value = ${gone.v}.`, `${call}(): الـ temp = ${p} (الـ node اللي فيها ${gone.v})، والـ value = ${gone.v}.`), { [gone.id]: 'gone' }, [{ name: 'temp', to: gone.id, side: 'below', c: 'on2' }]);
        st.nodes.shift();
        const lastOne = !st.nodes.length, keepRear = kind === 'lqueue' && lastOne && slide;
        R.at(fn, p + ' = ' + p + '->next');
        R.push(listDraw(Object.assign({}, st, { nodes: [gone].concat(st.nodes), ptrs: [{ name: p, to: first() }].concat(kind === 'lqueue' ? [{ name: 'rear', to: lastOne ? (keepRear ? gone.id : null) : lastId(), side: 'below', c: keepRear ? 'warn' : 'on2' }] : [], [{ name: 'temp', to: gone.id, side: 'below', c: 'on2' }]) }),
          C(`${p} = ${p}->next: ${lastOne ? p + ' becomes NULL' : p + ' now points at ' + st.nodes[0].v}.${kind === 'lqueue' && lastOne ? (slide ? ' rear still points at this node.' : ' The queue is now empty, so the fixed code also sets rear = NULL (the lecture forgets this).') : ''}`, `${p} = ${p}->next: ${lastOne ? 'الـ ' + p + ' بقى NULL' : 'الـ ' + p + ' بقى بيشاور على ' + st.nodes[0].v}.${kind === 'lqueue' && lastOne ? (slide ? ' والـ rear لسه بيشاور على الـ node دي.' : ' الـ queue فضي، فالكود المظبوط بيخلي الـ rear = NULL كمان (المحاضرة ناسية الخطوة دي).') : ''}`), { [gone.id]: 'gone' }),
          [[p, lastOne ? 'NULL' : '→ ' + st.nodes[0].v]].concat(kind === 'lqueue' ? [['rear', keepRear ? '→ ' + gone.v : lastOne ? 'NULL' : '→ ' + st.nodes[st.nodes.length - 1].v]] : [], [['temp', '→ ' + gone.v]]));
        R.at(fn, 'delete(temp)');
        if (keepRear) {
          st.ghost = { id: gone.id, v: gone.v };
          snap(C('delete temp: the node is freed, but rear still points at it (a dangling pointer). isEmpty() checks front == NULL && rear == NULL, so it now says the queue is NOT empty.', 'delete temp: الـ node اتمسحت، بس الـ rear لسه بيشاور عليها (dangling pointer). والـ isEmpty() بتشيك front == NULL && rear == NULL، فدلوقتي بتقول إن الـ queue مش فاضي.'));
        } else snap(C(`delete temp: the node with ${gone.v} is freed. Returns ${gone.v}.`, `delete temp: الـ node اللي فيها ${gone.v} اتمسحت من الـ memory. بترجع ${gone.v}.`));
      } else if (name === 'dellast') {
        const fn = 'list.deletefromend';
        if (!st.nodes.length) { R.at(fn, 'if (isEmpty())'); snap(C('deletefromend(): the list is empty.', 'deletefromend(): الـ list فاضية.')); continue; }
        let i = 0;
        R.at(fn, 'Node *temp1 = head, *temp2 = NULL');
        R.quiz(C('When the loop stops, where does temp2 point?', 'لما الـ loop تقف، الـ temp2 هيشاور على إيه؟'), st.nodes.length > 1 ? st.nodes[st.nodes.length - 2].v : 'NULL', st.nodes.map(n => n.v).concat(['NULL']).reverse());
        snap(C('temp1 = head, temp2 = NULL.', 'الـ temp1 = head والـ temp2 = NULL.'), { [st.nodes[0].id]: 'hl' }, [{ name: 'temp1', to: st.nodes[0].id, side: 'below', c: 'on2' }, { name: 'temp2', to: null, side: 'below' }]);
        while (st.nodes[i + 1]) { i++; R.at(fn, 'while (temp1->next != NULL)'); snap(C('temp1->next != NULL: temp2 = temp1, temp1 = temp1->next.', 'الـ temp1->next != NULL: الـ temp2 = temp1 والـ temp1 = temp1->next.'), { [st.nodes[i].id]: 'hl' }, [{ name: 'temp1', to: st.nodes[i].id, side: 'below', c: 'on2' }, { name: 'temp2', to: st.nodes[i - 1].id, side: 'below', c: 'on3' }]); }
        const gone = st.nodes.pop();
        R.at(fn, 'delete temp1', 'temp2->next = NULL');
        snap(C(`delete temp1 (${gone.v}) and set temp2->next = NULL${st.nodes.length ? '' : ' (it was the only node, so head = NULL)'}.`, `delete temp1 (${gone.v}) وبعدين temp2->next = NULL${st.nodes.length ? '' : ' (كانت الـ node الوحيدة، فـ head = NULL)'}.`));
      } else if (name === 'delete') {
        const fn = pre + '.deleteitem';
        const idx = st.nodes.findIndex(n => n.v === a);
        if (idx < 0) { R.at(fn, dbl ? 'if (head->data == value)' : 'else cout << "not found"'); snap(C(`deleteitem(${a}): ${a} is not in the list, so nothing is deleted ("not found").`, `deleteitem(${a}): الـ ${a} مش في الـ list، فمفيش حاجة هتتمسح ("not found").`)); continue; }
        if (idx === 0) {
          R.at(fn, 'if (head->data == value)');
          snap(C(`deleteitem(${a}): head->data == ${a}, so temp1 = head and head = head->next.`, `deleteitem(${a}): الـ head->data == ${a}، فـ temp1 = head و head = head->next.`), { [st.nodes[0].id]: 'gone' }, [{ name: 'temp1', to: st.nodes[0].id, side: 'below', c: 'on2' }]);
          const gone = st.nodes.shift();
          R.at(fn, 'delete temp1');
          snap(dbl && st.nodes.length ? C(`head->prev = NULL, then delete temp1 (${gone.v}).`, `head->prev = NULL، وبعدين delete temp1 (${gone.v}).`) : C(`delete temp1: ${gone.v} is removed.`, `delete temp1: الـ ${gone.v} اتشالت.`));
          continue;
        }
        R.at(fn, 'Node *temp1 = head, *temp2 = NULL');
        snap(C(`deleteitem(${a}): temp1 = head, temp2 = NULL. Walk until temp1->data == ${a}.`, `deleteitem(${a}): الـ temp1 = head والـ temp2 = NULL. نمشي لحد ما temp1->data == ${a}.`), { [st.nodes[0].id]: 'hl' }, [{ name: 'temp1', to: st.nodes[0].id, side: 'below', c: 'on2' }, { name: 'temp2', to: null, side: 'below' }]);
        for (let i = 1; i <= idx; i++) { R.at(fn, '{ temp2 = temp1; temp1 = temp1->next; }'); snap(C(`temp1->data != ${a}: temp2 = temp1, temp1 = temp1->next.`, `الـ temp1->data != ${a}: الـ temp2 = temp1 والـ temp1 = temp1->next.`), { [st.nodes[i].id]: i === idx ? 'gone' : 'hl' }, [{ name: 'temp1', to: st.nodes[i].id, side: 'below', c: 'on2' }, { name: 'temp2', to: st.nodes[i - 1].id, side: 'below', c: 'on3' }]); }
        const prev = st.nodes[idx - 1], gone = st.nodes[idx], nextN = st.nodes[idx + 1];
        if (dbl) R.at(fn, 'temp2->next = temp1->next', 'temp1->next->prev = temp1->prev'); else R.at(fn, 'temp2->next = temp1->next');
        R.quiz(C(`To unlink ${gone.v}, temp2->next (the node with ${prev.v}) must point to…`, `عشان نفصل الـ ${gone.v}، الـ temp2->next (الـ node اللي فيها ${prev.v}) لازم يشاور على…`), nextN ? nextN.v : 'NULL', [gone.v, prev.v, st.nodes[0].v, 'NULL'].filter(x => x !== (nextN ? nextN.v : 'NULL')));
        const shown = listDraw(Object.assign({}, st, { ptrs: basePtrs().concat([{ name: 'temp1', to: gone.id, side: 'below', c: 'on2' }, { name: 'temp2', to: prev.id, side: 'below', c: 'on3' }]) }),
          C(`temp2->next = temp1->next: ${prev.v} now skips ${gone.v} and points at ${nextN ? nextN.v : 'NULL'}.${dbl && nextN ? ' And temp1->next->prev = temp1->prev, so ' + nextN.v + ' points back at ' + prev.v + '.' : ''}`, `temp2->next = temp1->next: الـ ${prev.v} بقت بتعدّي الـ ${gone.v} وبتشاور على ${nextN ? nextN.v : 'NULL'}.${dbl && nextN ? ' وكمان temp1->next->prev = temp1->prev، فالـ ' + nextN.v + ' بقت بتشاور ورا على ' + prev.v + '.' : ''}`), { [gone.id]: 'gone' });
        shown.edges = shown.edges.filter(e => e.a !== gone.id && !(e.a === prev.id && e.b === gone.id) && !(dbl && nextN && e.a === nextN.id && e.b === gone.id));
        shown.edges.push({ id: 'skip' + prev.id, a: prev.id, as: 'next', b: nextN ? nextN.id : 'null', bs: nextN ? (dbl ? 'inU' : 'l') : 'c', bend: -46 });
        if (dbl && nextN) shown.edges.push({ id: 'skipb' + nextN.id, a: nextN.id, as: 'prev', b: prev.id, bs: 'outL', c: 'prevl', bend: 46 });
        R.push(shown, [['head', '→ ' + st.nodes[0].v], ['temp1', '→ ' + gone.v], ['temp2', '→ ' + prev.v]]);
        R.at(fn, 'delete(temp1)');
        st.nodes.splice(idx, 1);
        snap(C(`delete temp1: ${gone.v} is freed and the list closes the gap.`, `delete temp1: الـ ${gone.v} اتمسحت والـ list قفلت المكان.`));
      } else if (name === 'search') {
        const fn = 'list.search';
        if (!st.nodes.length) { R.at(fn, 'return (false)'); snap(C('search(): the list is empty, return false.', 'search(): الـ list فاضية، بترجع false.')); continue; }
        const at = st.nodes.findIndex(n => n.v === a);
        R.at(fn, 'Node *temp = head');
        R.quiz(C(`search(${a}): how many nodes does temp visit?`, `search(${a}): الـ temp هيزور كام node؟`), at < 0 ? st.nodes.length : at + 1, [1, st.nodes.length, at < 0 ? st.nodes.length + 1 : at + 2, at < 0 ? 0 : at]);
        let i = 0, found = false;
        while (i < st.nodes.length) {
          const hit = st.nodes[i].v === a;
          R.at(fn, hit ? 'return (true)' : 'else temp = temp->next');
          snap(C(`temp->data = ${st.nodes[i].v} ${hit ? '== ' + a + ': found, return true.' : '!= ' + a + ', temp = temp->next.'}`, `الـ temp->data = ${st.nodes[i].v} ${hit ? '== ' + a + ': لقيناها، بترجع true.' : '!= ' + a + '، فـ temp = temp->next.'}`), { [st.nodes[i].id]: hit ? 'ok' : 'hl' }, [{ name: 'temp', to: st.nodes[i].id, side: 'below', c: 'on2' }]);
          if (hit) { found = true; break; }
          i++;
        }
        if (!found) { R.at(fn, 'return (false)'); snap(C(`temp reached NULL: ${a} is not in the list, return false.`, `الـ temp وصل NULL: الـ ${a} مش في الـ list، بترجع false.`), {}, [{ name: 'temp', to: null, side: 'below' }]); }
      } else if (name === 'sorted') {
        const fn = 'list.insertsorted';
        make();
        R.at(fn, 'new Node()', 'newnode->data = item');
        const pos = st.nodes.findIndex(n => +n.v > +a), at = pos < 0 ? st.nodes.length : pos;
        R.quiz(C(`insertsorted(${a}): after which node does ${a} go?`, `insertsorted(${a}): الـ ${a} هتتحط بعد أنهي node؟`), at === 0 ? 'It becomes the first node' : st.nodes[at - 1].v, ['It becomes the first node'].concat(st.nodes.map(n => n.v)));
        snap(C(`insertsorted(${a}): newnode with data = ${a}.`, `insertsorted(${a}): newnode فيها data = ${a}.`));
        st.freshAt = at;
        if (at === 0) {
          R.at(fn, 'if (isEmpty() || item < head->data)', 'newnode->next = head');
          st.fresh.next = first();
          snap(st.nodes.length ? C(`${a} < head->data (${st.nodes[0].v}), so it goes first: newnode->next = head.`, `الـ ${a} أصغر من head->data (${st.nodes[0].v})، فهتبقى الأولى: newnode->next = head.`) : C('The list is empty, so newnode->next = head (NULL).', 'الـ list فاضية، فـ newnode->next = head (يعني NULL).'));
          R.at(fn, 'head = newnode');
          st.nodes.unshift({ id: st.fresh.id, v: a }); st.fresh = null; st.freshAt = null;
          snap(C('head = newnode.', 'head = newnode.'), { [first()]: 'new' });
          continue;
        }
        R.at(fn, 'Node *temp = head');
        snap(C('temp = head.', 'الـ temp = head.'), { [st.nodes[0].id]: 'hl' }, [{ name: 'temp', to: st.nodes[0].id, side: 'below', c: 'on2' }]);
        for (let i = 0; i < at; i++) {
          const nxn = st.nodes[i + 1], go = nxn && +nxn.v < +a;
          R.at(fn, 'while (temp->next != NULL && temp->next->data < item)');
          if (go) snap(C(`temp->next->data = ${nxn.v} < ${a}: temp = temp->next.`, `الـ temp->next->data = ${nxn.v} أصغر من ${a}: الـ temp = temp->next.`), { [nxn.id]: 'hl' }, [{ name: 'temp', to: nxn.id, side: 'below', c: 'on2' }]);
          else { snap(C(nxn ? `temp->next->data = ${nxn.v} is not < ${a}: stop. temp (${st.nodes[i].v}) is the node before the insertion point.` : `temp->next is NULL: stop. ${a} goes at the end.`, nxn ? `الـ temp->next->data = ${nxn.v} مش أصغر من ${a}: نقف. الـ temp (${st.nodes[i].v}) هي الـ node اللي قبل مكان الإضافة.` : `الـ temp->next بـ NULL: نقف. الـ ${a} هتتحط في الآخر.`), { [st.nodes[i].id]: 'hl' }, [{ name: 'temp', to: st.nodes[i].id, side: 'below', c: 'on2' }]); break; }
        }
        const prev = st.nodes[at - 1];
        R.at(fn, 'newnode->next = temp->next');
        st.fresh.next = st.nodes[at] ? st.nodes[at].id : null;
        snap(C(`Step 2: newnode->next = temp->next (${st.nodes[at] ? st.nodes[at].v : 'NULL'}).`, `الخطوة 2: newnode->next = temp->next (${st.nodes[at] ? st.nodes[at].v : 'NULL'}).`), {}, [{ name: 'temp', to: prev.id, side: 'below', c: 'on2' }]);
        R.at(fn, 'temp->next = newnode');
        st.linkTo = [prev.id];
        const sh = listDraw(Object.assign({}, st, { ptrs: basePtrs().concat([{ name: 'temp', to: prev.id, side: 'below', c: 'on2' }]) }), C(`Step 3: temp->next = newnode: ${prev.v} → ${a} → ${st.nodes[at] ? st.nodes[at].v : 'NULL'}.`, `الخطوة 3: temp->next = newnode: ${prev.v} → ${a} → ${st.nodes[at] ? st.nodes[at].v : 'NULL'}.`));
        sh.edges = sh.edges.filter(e => !(e.a === prev.id && e.id.startsWith('n')));
        R.push(sh, [['head', '→ ' + st.nodes[0].v], ['temp', '→ ' + prev.v], ['newnode', '→ ' + a]]);
        st.nodes.splice(at, 0, { id: st.fresh.id, v: a }); st.fresh = null; st.linkTo = null; st.freshAt = null;
        snap(C(`${a} is in place and the list is still sorted.`, `الـ ${a} اتحطت في مكانها والـ list لسه مترتبة.`), { [st.nodes[at].id]: 'new' });
      } else if (name === 'sorted!') {
        // the slide's loop, run literally: it works between two nodes and crashes at either end
        const fn = 'list.insertsorted.slide', item = +a;
        make(); st.freshAt = 0;
        R.at(fn, 'Node *temp1 = head');
        const works = st.nodes.length > 1 && +st.nodes[0].v < item && item < +st.nodes[st.nodes.length - 1].v;
        R.quiz(C(`The list is ${st.nodes.map(n => n.v).join(' → ')}. What happens with the slide's insertsorted(${a})?`, `الـ list هي ${st.nodes.map(n => n.v).join(' → ')}. إيه اللي هيحصل مع insertsorted(${a}) اللي في السلايد؟`), works ? 'It works' : 'The program crashes', ['It works', 'The program crashes', `${a} is added at the end`], true);
        snap(C(`insertsorted(${a}) with the slide's loop: temp1 = head.`, `insertsorted(${a}) بالـ loop اللي في السلايد: الـ temp1 = head.`), { [st.nodes[0].id]: 'hl' }, [{ name: 'temp1', to: st.nodes[0].id, side: 'below', c: 'on2' }]);
        let i = 0, crashed = false;
        for (;;) {
          const cur = st.nodes[i], nxn = st.nodes[i + 1], d = +cur.v;
          R.at(fn, 'while ((temp1->data > item', '(temp1->data < item && temp1->next->data < item)');
          if (!nxn) {
            snap(C(`temp1 is the last node (${cur.v}) and temp1->next is NULL, but the condition reads temp1->next->data: the program crashes. The slide's version fails for a value ${item < +st.nodes[0].v ? 'smaller than the first node' : 'larger than the last node'}.`, `الـ temp1 هي آخر node (${cur.v}) والـ temp1->next بـ NULL، بس الشرط بيقرا temp1->next->data: البرنامج بيعمل crash. نسخة السلايد بتبوظ مع قيمة ${item < +st.nodes[0].v ? 'أصغر من أول node' : 'أكبر من آخر node'}.`), { [cur.id]: 'bad' }, [{ name: 'temp1', to: cur.id, side: 'below', c: 'warn' }]).crash = true;
            crashed = true; break;
          }
          const goOn = (d > item && +nxn.v > item) || (d < item && +nxn.v < item);
          if (!goOn) { snap(C(`${cur.v} and ${nxn.v}: the condition is false, so the loop stops at ${cur.v}.`, `الـ ${cur.v} والـ ${nxn.v}: الشرط بقى false، فالـ loop وقفت عند ${cur.v}.`), { [cur.id]: 'hl' }, [{ name: 'temp1', to: cur.id, side: 'below', c: 'on2' }]); break; }
          i++;
          snap(C(`${cur.v} and ${nxn.v} are both ${d > item ? 'bigger' : 'smaller'} than ${item}: temp1 = temp1->next.`, `الـ ${cur.v} والـ ${nxn.v} الاتنين ${d > item ? 'أكبر' : 'أصغر'} من ${item}: الـ temp1 = temp1->next.`), { [nxn.id]: 'hl' }, [{ name: 'temp1', to: nxn.id, side: 'below', c: 'on2' }]);
        }
        if (crashed) { st.fresh = null; st.freshAt = null; continue; }
        const at = i + 1;
        R.at(fn, 'newnode->next = temp1->next', 'temp1->next = newnode');
        st.nodes.splice(at, 0, { id: st.fresh.id, v: a }); st.fresh = null; st.freshAt = null;
        snap(C(`newnode->next = temp1->next; temp1->next = newnode. Between two nodes the slide's loop works: ${st.nodes.map(n => n.v).join(' → ')}.`, `newnode->next = temp1->next؛ temp1->next = newnode. بين 2 nodes الـ loop اللي في السلايد بتشتغل: ${st.nodes.map(n => n.v).join(' → ')}.`), { [st.nodes[at].id]: 'new' });
      }
    }
  }

  /* ════════ trees ════════ */
  // a tree is built by BST inserts (init), or given exactly as in an exam question: "F(B(A,D(C,E)),G(,I(H,)))"
  function parseTree(s) {
    let i = 0;
    const node = () => {
      let v = ''; while (i < s.length && !'(),'.includes(s[i])) v += s[i++];
      v = v.trim(); if (!v) return null;
      const n = { v, l: null, r: null };
      if (s[i] === '(') { i++; n.l = node(); if (s[i] === ',') i++; n.r = node(); if (s[i] === ')') i++; }
      return n;
    };
    return node();
  }
  function bstSim(spec, R) {
    let root = spec.tree ? parseTree(spec.tree) : null;
    const isBst = !spec.tree;
    const key = v => isBst ? +v : v, cmp = (a, b) => isBst ? (+a) - (+b) : String(a).localeCompare(String(b));
    const ins = v => { const n = { v: key(v), l: null, r: null }; if (!root) { root = n; return; } let c = root; for (;;) { if (cmp(n.v, c.v) < 0) { if (!c.l) { c.l = n; return; } c = c.l; } else { if (!c.r) { c.r = n; return; } c = c.r; } } };
    (spec.init || []).forEach(v => ins(v));
    const all = () => { const o = []; const w = n => { if (!n) return; w(n.l); o.push(n.v); w(n.r); }; w(root); return o; };
    const draw = (cap, hl, out, vars) => {
      const items = [], edges = [], order = [];
      const walk = (n, d) => { if (!n) return; walk(n.l, d + 1); order.push([n, d]); walk(n.r, d + 1); };
      walk(root, 0);
      order.forEach(([n, d], i) => items.push(mk('circ', 'n' + n.v, 16 + i * 50, 16 + d * 66, { t: n.v, c: hl && hl[n.v] || '', from: { dx: 0, dy: -24 } })));
      const link = n => { if (!n) return; [n.l, n.r].forEach(ch => { if (ch) edges.push({ id: 'e' + n.v + '-' + ch.v, a: 'n' + n.v, as: 'auto', b: 'n' + ch.v, bs: 'auto', c: 'tree' }); link(ch); }); };
      link(root);
      if (!root) items.push(lbl('empty', 60, 30, 'root = NULL', 'muted'));
      return R.push({ items, edges, cap, out: out != null ? out : null }, [['root', root ? '→ ' + root.v : 'NULL']].concat(vars || []));
    };
    const shape = spec.tree ? spec.tree.replace(/\(,/g, '(–,').replace(/,\)/g, ',–)') : '';
    R.at(null);
    draw(root ? (isBst ? C('The tree before the operations. Smaller keys go left, bigger keys go right.', 'الـ tree قبل العمليات. المفاتيح الأصغر بتروح شمال والأكبر يمين.') : C(`The tree from the question, written as node(left, right): ${shape}.`, `الـ tree اللي في السؤال، مكتوبة node(left, right): ${shape}.`)) : C('Empty tree: root = NULL.', 'tree فاضية: الـ root = NULL.'));
    for (const op of spec.ops) {
      const [name, a] = op.split(' ');
      if (name === 'insert') {
        for (const s of a.split(',')) {
          const v = key(s);
          if (!root) { R.at('bst.insert', 'if (temp == NULL)', 'temp = newnode'); ins(v); draw(C(`insert(${v}): the tree is empty, so ${v} becomes the root.`, `insert(${v}): الـ tree فاضية، فالـ ${v} بقت الـ root.`), { [v]: 'new' }, null, [['item', v]]); continue; }
          let c = root, par = null; for (;;) { par = c; const nx = cmp(v, c.v) < 0 ? c.l : c.r; if (!nx) break; c = nx; }
          const side = cmp(v, par.v) < 0 ? 'left' : 'right';
          R.at('bst.insert', 'else if (item < temp->data)');
          R.quiz(C(`insert(${v}): where does ${v} end up?`, `insert(${v}): الـ ${v} هتقع فين؟`), `${side} child of ${par.v}`, [`${side === 'left' ? 'right' : 'left'} child of ${par.v}`].concat(all().filter(x => x !== par.v).slice(-3).map((x, j) => `${j % 2 ? 'right' : 'left'} child of ${x}`)));
          c = root;
          for (;;) {
            const left = cmp(v, c.v) < 0, nx = left ? c.l : c.r;
            R.at('bst.insert', left ? 'else if (item < temp->data)' : 'else temp->right');
            draw(C(`insert(${v}): ${v} ${left ? '<' : '≥'} ${c.v} → go ${left ? 'left' : 'right'}${nx ? '.' : '. That child is NULL, so ' + v + ' is attached here as a leaf.'}`, `insert(${v}): الـ ${v} ${left ? 'أصغر من' : 'أكبر من أو تساوي'} ${c.v} → نروح ${left ? 'شمال' : 'يمين'}${nx ? '.' : '. الـ child ده NULL، فالـ ' + v + ' هتتحط هنا كـ leaf.'}`), { [c.v]: 'hl' }, null, [['item', v], ['temp', '→ ' + c.v]]);
            if (!nx) break; c = nx;
          }
          R.at('bst.insert', 'if (temp == NULL)', 'temp = newnode');
          ins(v); draw(C(`${v} is now the ${side} child of ${par.v}.`, `الـ ${v} بقت الـ ${side} child بتاع ${par.v}.`), { [v]: 'new' }, null, [['item', v]]);
        }
      } else if (name === 'search') {
        const v = key(a); let c = root;
        { let x = root, steps = 0; while (x && cmp(v, x.v) !== 0) { x = cmp(v, x.v) < 0 ? x.l : x.r; steps++; }
          R.at('bst.search', 'bool search');
          R.quiz(C(`search(${v}): is it found, and after how many comparisons?`, `search(${v}): هنلاقيها؟ وبعد كام مقارنة؟`), x ? `Found, ${steps + 1} comparisons` : `Not found, ${steps} comparisons`, [x ? `Not found, ${steps} comparisons` : `Found, ${steps} comparisons`, `Found, ${all().length} comparisons`, 'Found, 1 comparison']); }
        while (c) {
          if (cmp(v, c.v) === 0) { R.at('bst.search', 'else if (item == temp->data) return true'); draw(C(`search(${v}): ${v} == ${c.v} → found, return true.`, `search(${v}): الـ ${v} == ${c.v} → لقيناها، بترجع true.`), { [c.v]: 'ok' }, null, [['item', v], ['temp', '→ ' + c.v]]); break; }
          const left = cmp(v, c.v) < 0;
          R.at('bst.search', left ? 'else if (item < temp->data)' : 'else return search(temp->right');
          draw(C(`search(${v}): ${v} ${left ? '<' : '>'} ${c.v} → search the ${left ? 'left' : 'right'} subtree.`, `search(${v}): الـ ${v} ${left ? 'أصغر من' : 'أكبر من'} ${c.v} → ندوّر في الـ ${left ? 'left' : 'right'} subtree.`), { [c.v]: 'hl' }, null, [['item', v], ['temp', '→ ' + c.v]]);
          c = left ? c.l : c.r;
          if (!c) { R.at('bst.search', 'if (temp == NULL) return false'); draw(C(`Reached NULL: ${v} is not in the tree, return false.`, `وصلنا NULL: الـ ${v} مش في الـ tree، بترجع false.`), {}, null, [['item', v], ['temp', 'NULL']]); }
        }
      } else if (name === 'inorder' || name === 'preorder' || name === 'postorder') {
        const seq = [];
        const go = n => { if (!n) return; if (name === 'preorder') seq.push(n.v); go(n.l); if (name === 'inorder') seq.push(n.v); go(n.r); if (name === 'postorder') seq.push(n.v); };
        go(root);
        const rule = { inorder: ['left, root, right', 'شمال، الـ root، يمين'], preorder: ['root, left, right', 'الـ root، شمال، يمين'], postorder: ['left, right, root', 'شمال، يمين، الـ root'] }[name];
        const fn = 'bst.' + name;
        R.at(fn, name + '(Node *temp)');
        draw(C(`${name[0].toUpperCase() + name.slice(1)} traversal: at every node visit ${rule[0]}.`, `الـ ${name} traversal: في كل node بنزور ${rule[1]}.`), {}, '');
        const out = [];
        seq.forEach((v, i) => {
          // ask for the next node every other visit (from the second), so the student keeps applying the rule
          if (i > 0 && i % 2 === 1) R.quiz(C(`Output so far: ${out.join(' ')}. Which node is printed next?`, `الـ output لحد دلوقتي: ${out.join(' ')}. أنهي node هتتطبع بعد كده؟`), v, seq.filter(x => !out.includes(x) && x !== v).slice(0, 2).concat(out.slice(-1)));
          out.push(v);
          const hl = {}; out.forEach(x => { hl[x] = 'done'; }); hl[v] = 'hl';
          R.at(fn, 'cout << temp->data');
          draw(C(`Visit ${v}.${i === seq.length - 1 ? ' Done: ' + out.join(' ') : ''}`, `نزور ${v}.${i === seq.length - 1 ? ' خلصنا: ' + out.join(' ') : ''}`), hl, out.join('  '), [['temp', '→ ' + v]]);
        });
      } else if (name === 'delete') {
        const v = key(a); let p = null, c = root;
        while (c && cmp(c.v, v) !== 0) { p = c; c = cmp(v, c.v) < 0 ? c.l : c.r; }
        R.at('bst.delete', 'find p');
        if (!c) { draw(C(`delete(${v}): ${v} is not in the tree.`, `delete(${v}): الـ ${v} مش في الـ tree.`)); continue; }
        const kids = (c.l ? 1 : 0) + (c.r ? 1 : 0);
        R.quiz(C(`delete(${v}): which case is it?`, `delete(${v}): دي أنهي حالة؟`), ['Case 1: a leaf', 'Case 2: one child', 'Case 3: two children'][kids], ['Case 1: a leaf', 'Case 2: one child', 'Case 3: two children'], true);
        const setChild = (par, old, nw) => { if (!par) root = nw; else if (par.l === old) par.l = nw; else par.r = nw; };
        if (!kids) {
          R.at('bst.delete', 'if (p is a leaf)');
          draw(C(`delete(${v}): ${v} is a leaf (case 1), so just remove it.`, `delete(${v}): الـ ${v} عبارة عن leaf (الحالة 1)، فبنشيلها وخلاص.`), { [v]: 'gone' });
          R.at('bst.delete', 'remove p');
          setChild(p, c, null); draw(C(`${v} removed.`, `الـ ${v} اتشالت.`));
        } else if (kids === 1) {
          const ch = c.l || c.r;
          R.at('bst.delete', 'else if (p has one child)');
          draw(C(`delete(${v}): ${v} has one child (${ch.v}) (case 2), so the child takes its place.`, `delete(${v}): الـ ${v} ليها child واحد بس (${ch.v}) (الحالة 2)، فالـ child بياخد مكانها.`), { [v]: 'gone', [ch.v]: 'hl' });
          R.at('bst.delete', "link p's parent to that child");
          setChild(p, c, ch); draw(C(`${ch.v} is now linked to ${p ? p.v : 'root'}.`, `الـ ${ch.v} بقت متوصلة بـ ${p ? p.v : 'الـ root'}.`), { [ch.v]: 'new' });
        } else {
          let sp = c, s = c.r; while (s.l) { sp = s; s = s.l; }
          R.at('bst.delete', 's = minimum(p->right)');
          draw(C(`delete(${v}): ${v} has two children (case 3). Its inorder successor is the minimum of the right subtree: ${s.v}.`, `delete(${v}): الـ ${v} ليها 2 children (الحالة 3). الـ inorder successor بتاعها هو أصغر حاجة في الـ right subtree: ${s.v}.`), { [v]: 'gone', [s.v]: 'hl' });
          const sv = s.v;
          if (sp === c) sp.r = s.r; else sp.l = s.r;
          c.v = sv;
          R.at('bst.delete', 'p->data = s->data', 'delete s');
          R.quiz(C(`${v} has two children. Which key takes its place (the inorder successor)?`, `الـ ${v} ليها 2 children. أنهي مفتاح هياخد مكانها (الـ inorder successor)؟`), sv, [c.l ? c.l.v : null, root.v, all().slice(-1)[0]].filter(x => x != null && x !== sv));
          draw(C(`Copy ${sv} into the node and delete the successor's old node (it has at most one right child).`, `بننسخ ${sv} في الـ node، ونمسح الـ node القديمة بتاعة الـ successor (عندها right child واحد بالكتير).`), { [sv]: 'new' });
        }
      }
    }
  }

  /* ════════ hashing ════════ */
  function hashSim(spec, R) {
    const m = spec.size, table = Array(m).fill(null), chains = Array.from({ length: m }, () => []);
    const method = spec.method;
    const h2m = spec.h2 || (m - 2);
    const X = 150, sy = i => 14 + i * 42;
    const fn = method === 'chain' ? 'hash.chain' : 'hash.probe';
    const draw = (cap, hl, key, vars) => {
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
      if (key) { items.push(ptr('key', 0, sy(key.at) + 5, 'key ' + key.v, key.c || 'on')); edges.push({ id: 'e-key', a: 'key', as: 'r', b: 's' + key.at, bs: 'l', c: 'ptrl' }); }
      return R.push({ items, edges, cap }, vars || []);
    };
    const f = {
      linear: ['h(k, i) = (k mod ' + m + ' + i) mod ' + m, 'linear probing'],
      quadratic: ['h(k, i) = (k mod ' + m + ' + i + i²) mod ' + m + '   (the lecture\'s formula)', 'quadratic probing'],
      double: ['h(k, i) = (k mod ' + m + ' + i·(1 + k mod ' + h2m + ')) mod ' + m, 'double hashing'],
      chain: ['h(k) = k mod ' + m + '; each slot holds a linked list', 'separate chaining']
    }[method];
    R.at(null);
    draw(C(`Table of size ${m}, ${f[1]}: ${f[0]}.`, `جدول حجمه ${m} بالـ ${f[1]}: ${f[0]}.`));
    let uid = 0;
    for (const s of spec.keys) {
      const k = +s, h1 = ((k % m) + m) % m;
      if (method === 'chain') {
        R.at(fn, 'int index = k % n');
        R.quiz(C(`Which slot does ${k} go to?`, `الـ ${k} هتروح أنهي slot؟`), h1, [(h1 + 1) % m, Math.floor(k / m) % m, (k % 10) % m, m - 1 - h1].filter(x => x !== h1));
        draw(C(`${k} mod ${m} = ${h1} → slot ${h1}.`, `${k} mod ${m} = ${h1} → الـ slot رقم ${h1}.`), { [h1]: 'hl' }, { v: k, at: h1 }, [['k', k], ['index', h1]]);
        chains[h1].push({ id: 'K' + (++uid), v: String(k) });
        R.at(fn, 'append k to the end');
        draw(C(chains[h1].length > 1 ? `Collision at ${h1}: ${k} is added to the end of slot ${h1}'s list.` : `${k} becomes the first node of slot ${h1}'s list.`, chains[h1].length > 1 ? `فيه collision في ${h1}: الـ ${k} بتتضاف في آخر الـ list بتاعة الـ slot ${h1}.` : `الـ ${k} بقت أول node في الـ list بتاعة الـ slot ${h1}.`), { [h1]: 'ok', ['nK' + uid]: 'new' }, null, [['k', k], ['index', h1]]);
        continue;
      }
      const d = 1 + k % h2m;
      let final = -1; for (let i = 0; i < m; i++) { const at = (h1 + (method === 'linear' ? i : method === 'quadratic' ? i + i * i : i * d)) % m; if (!table[at]) { final = at; break; } }
      if (final >= 0) R.quiz(C(`Which slot does ${k} end up in?`, `الـ ${k} هتستقر في أنهي slot؟`), final, [h1, (h1 + 1) % m, (final + 1) % m, (h1 + 4) % m].filter(x => x !== final));
      for (let i = 0; i < m; i++) {
        const add = method === 'linear' ? i : method === 'quadratic' ? i + i * i : i * d;
        const at = (h1 + add) % m;
        const math = i === 0 ? `${k} mod ${m} = ${h1}` : method === 'linear' ? `(${h1} + ${i}) mod ${m} = ${at}` : method === 'quadratic' ? `(${h1} + ${i} + ${i * i}) mod ${m} = ${at}` : `(${h1} + ${i}·${d}) mod ${m} = ${at}`;
        const pre = method === 'double' && i === 1 ? `h2 = 1 + ${k} mod ${h2m} = ${d}; ` : '';
        const vars = [['k', k], ['i', i], ['index', at]].concat(method === 'double' ? [['h2', d]] : []);
        if (table[at]) {
          R.at(fn, i === 0 ? 'int index = h(k, i)' : '{  i++;  index = h(k, i);  }', 'while (table[index] != EMPTY)');
          draw(C(`${k}, i = ${i}: ${pre}${math} → slot ${at} holds ${table[at].v}: collision, try i = ${i + 1}.`, `${k}، i = ${i}: ${pre}${math} → الـ slot ${at} فيه ${table[at].v}: collision، نجرب i = ${i + 1}.`), { [at]: 'bad' }, { v: k, at, c: 'warn' }, vars);
          if (i === m - 1) draw(C(`${k}: all ${m} probes collided, so this method cannot place it.`, `${k}: كل الـ ${m} محاولات عملت collision، فالطريقة دي مش قادرة تحطها.`), {}, null, vars);
        } else {
          R.at(fn, i === 0 ? 'int index = h(k, i)' : '{  i++;  index = h(k, i);  }');
          draw(C(`${k}, i = ${i}: ${pre}${math} → slot ${at} is empty.`, `${k}، i = ${i}: ${pre}${math} → الـ slot ${at} فاضي.`), { [at]: 'ok' }, { v: k, at }, vars);
          table[at] = { id: 'K' + (++uid), v: String(k) };
          R.at(fn, 'table[index] = k');
          draw(C(`${k} is stored in slot ${at}.`, `الـ ${k} اتخزنت في الـ slot ${at}.`), { [at]: 'new' }, null, vars);
          break;
        }
      }
    }
    R.at(null);
    const fin = method === 'chain' ? chains.map((c, i) => `[${i}] ${c.length ? c.map(n => n.v).join(' → ') : '–'}`).join('   ') : table.map((x, i) => `[${i}]=${x ? x.v : '–'}`).join(' ');
    draw(C(`Final table: ${fin}`, `الجدول في الآخر: ${fin}`));
  }

  const SIMS = { stack: stackSim, queue: queueSim, cqueue: cqueueSim, array: arraySim, list: listSim, dlist: listSim, lstack: listSim, lqueue: listSim, bst: bstSim, hash: hashSim };
  function run(spec) {
    vid = 0;
    const R = Rec();
    try { (SIMS[spec.type] || (() => {}))(spec, R); } catch (err) { console.error(err); }
    return R.frames;
  }

  /* ════════ "try your own": plain commands → a spec ════════ */
  const HELP = {
    stack: ['push 5, push 8, pop', 'Commands: push X, pop. Optional: size N (2 to 8).'],
    queue: ['enqueue 5, enqueue 8, dequeue', 'Commands: enqueue X, dequeue. Optional: size N (2 to 8).'],
    cqueue: ['size 4, enqueue 5, enqueue 8, dequeue', 'Commands: enqueue X, dequeue. Optional: size N (2 to 8).'],
    array: ['start 4 8 15 16, insert 2 99, delete 1, search 99', 'Commands: start A B C … (the array), insert K X (X goes to index K), delete K (the K\'th element), search X. Optional: size N (up to 10).'],
    list: ['start 10 20 30, begin 5, end 40, sorted 25, delete 20, search 40', 'Commands: start A B C … (the list), begin X, end X, sorted X, delete X, delfirst, dellast, search X.'],
    dlist: ['start 20 30, begin 10, end 40, delete 30', 'Commands: start A B C …, begin X, end X, delete X.'],
    lstack: ['push 50, push 70, pop', 'Commands: start A B … (top first), push X, pop.'],
    lqueue: ['enqueue 30, enqueue 50, dequeue', 'Commands: start A B … (front first), enqueue X, dequeue.'],
    bst: ['insert 50 30 70 20 40, search 40, delete 30, inorder', 'Commands: start A B C … (built without animation), insert A B C, search X, delete X, inorder, preorder, postorder.'],
    hash: ['size 7, keys 18 72 65 34 13', 'Commands: size M (2 to 13), keys A B C … (up to 12). Pick the method in the menu. Double hashing uses h2 = 1 + k mod P; set P with h2 P.']
  };
  const LIMIT = { stack: 8, queue: 8, cqueue: 8, array: 10, list: 7, dlist: 6, lstack: 7, lqueue: 7, bst: 15, hash: 13 };
  function parse(type, text, method) {
    const spec = { type, ops: [] }, isNum = s => /^-?\d+$/.test(s);
    const listy = ['list', 'dlist', 'lstack', 'lqueue'].includes(type);
    for (const raw of text.split(/[,;\n]+/)) {
      const w = raw.trim().split(/\s+/).filter(Boolean); if (!w.length) continue;
      const c = w[0].toLowerCase(), args = w.slice(1);
      const bad = msg => { throw new Error(`"${raw.trim()}": ${msg}`); };
      const num = s => { if (!isNum(s || '')) bad('a whole number is expected'); if (Math.abs(+s) > 9999) bad('use numbers up to 9999'); return s; };
      if (c === 'size' && ['stack', 'queue', 'cqueue', 'array', 'hash'].includes(type)) { const n = +num(args[0]); if (n < 2 || n > LIMIT[type]) bad(`size must be 2 to ${LIMIT[type]}`); spec.size = n; }
      else if (c === 'h2' && type === 'hash') { const n = +num(args[0]); if (n < 2) bad('h2 must be 2 or more'); spec.h2 = n; }
      else if (c === 'keys' && type === 'hash') { if (!args.length) bad('list some keys'); args.forEach(num); spec.keys = (spec.keys || []).concat(args.map(Number)); }
      else if (c === 'start' && (listy || type === 'array' || type === 'bst')) { args.forEach(num); spec.init = args.map(Number); }
      else if (['push', 'enqueue', 'begin', 'end', 'sorted', 'search', 'delete'].includes(c) && args.length === 1) { num(args[0]); spec.ops.push(c + ' ' + args[0]); }
      else if (['pop', 'dequeue', 'delfirst', 'dellast', 'inorder', 'preorder', 'postorder'].includes(c) && !args.length) spec.ops.push(c);
      else if (c === 'insert' && type === 'array' && args.length === 2) { num(args[0]); num(args[1]); spec.ops.push(`insert ${args[0]} ${args[1]}`); }
      else if (c === 'insert' && type === 'bst' && args.length) { args.forEach(num); spec.ops.push('insert ' + args.join(',')); }
      else bad('not a command here. ' + HELP[type][1]);
    }
    const valid = { stack: ['push', 'pop'], queue: ['enqueue', 'dequeue'], cqueue: ['enqueue', 'dequeue'], array: ['insert', 'delete', 'search'], list: ['begin', 'end', 'sorted', 'delete', 'delfirst', 'dellast', 'search'], dlist: ['begin', 'end', 'delete'], lstack: ['push', 'pop'], lqueue: ['enqueue', 'dequeue'], bst: ['insert', 'search', 'delete', 'inorder', 'preorder', 'postorder'], hash: [] }[type];
    spec.ops.forEach(o => { if (!valid.includes(o.split(' ')[0])) throw new Error(`"${o}" doesn't apply here. ${HELP[type][1]}`); });
    if (type === 'hash') { spec.method = method; spec.size = spec.size || 7; if (!spec.keys || !spec.keys.length) throw new Error('Add keys, for example "keys 18 72 65".'); if (spec.keys.length > 12) throw new Error('Up to 12 keys, so the table stays readable.'); if (spec.keys.some(k => k < 0)) throw new Error('Use keys of 0 or more.'); }
    else if (!spec.ops.length) throw new Error('Add at least one operation. ' + HELP[type][1]);
    if (spec.ops.length > 24) throw new Error('Up to 24 operations at a time.');
    let n = (spec.init || []).length; spec.ops.forEach(o => { if (/^(push|enqueue|begin|end|sorted)/.test(o)) n++; if (/^insert /.test(o) && type === 'bst') n += o.split(',').length; });
    if (listy && n > LIMIT[type]) throw new Error(`Keep it to ${LIMIT[type]} nodes or fewer, so the diagram stays readable.`);
    if (type === 'bst') { if (n > LIMIT.bst) throw new Error('Keep it to 15 nodes or fewer.'); const vals = (spec.init || []).concat(...spec.ops.filter(o => o.startsWith('insert')).map(o => o.slice(7).split(',').map(Number))); if (new Set(vals).size !== vals.length) throw new Error('Each key can be in the tree only once.'); }
    if (type === 'array') { spec.size = spec.size || Math.min(10, Math.max(6, (spec.init || []).length + 2)); if ((spec.init || []).length > spec.size) throw new Error('The array is longer than its size.'); }
    if (listy && spec.init) { const s = new Set(spec.init); if (s.size !== spec.init.length) throw new Error('Use different values for the starting nodes.'); }
    return spec;
  }
  // the lecture example written back as commands: the starting text of the "try your own" box
  function toText(spec) {
    const p = [];
    if (spec.type === 'hash') { p.push('size ' + spec.size); if (spec.method === 'double' && spec.h2) p.push('h2 ' + spec.h2); p.push('keys ' + spec.keys.join(' ')); return p.join(', '); }
    if (spec.size) p.push('size ' + spec.size);
    if (spec.init && spec.init.length) p.push('start ' + spec.init.join(' '));
    (spec.ops || []).forEach(o => p.push(o.replace('!', '').replace(/^insert (\S+)$/, (m, a) => 'insert ' + a.split(',').join(' '))));
    return p.join(', ');
  }

  /* ════════ drawing ════════ */
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  function blend(A, B, t) {
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
    const edges = B.edges.map(e => Object.assign({}, e, { o: ae.has(e.id) ? 1 : t })).concat(A.edges.filter(e => !be.has(e.id)).map(e => Object.assign({}, e, { o: 1 - t })));
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
    const d = e.bend ? `M${p[0]},${p[1]} Q${(p[0] + q[0]) / 2},${(p[1] + q[1]) / 2 + e.bend} ${q[0]},${q[1]}` : `M${p[0]},${p[1]} L${q[0]},${q[1]}`;
    return html`<path d=${d} className=${'vz-edge' + (e.c ? ' ' + e.c : '')} style=${{ opacity: Math.min(e.o, A.o, B.o) }} markerEnd=${e.c === 'tree' ? null : `url(#${mid})`} />`;
  }

  // the lecture's code with the running line lit; the panel scrolls to keep it in view
  function CodePanel({ code, prevFn }) {
    const ref = useRef(null);
    const fn = code && code.fn || prevFn;
    const lines = fn ? codeLines(fn) : [];
    const lit = new Set();
    if (code && code.fn) (code.hit || []).forEach(h => { const i = lines.findIndex(l => l.includes(h)); if (i >= 0) lit.add(i); });
    const litKey = [...lit].join();
    useEffect(() => {
      const box = ref.current, el = box && box.querySelector('.on');
      if (el) box.scrollTo({ top: Math.max(0, el.offsetTop - box.clientHeight / 2 + el.offsetHeight), behavior: calm() ? 'auto' : 'smooth' });
    }, [fn, litKey]);
    if (!fn) return html`<div className="vz-code vz-none"><span className="vz-ph">Code</span><p>Step forward to see the lecture's code run line by line.</p></div>`;
    return html`<div className=${'vz-code' + (code && code.fn ? '' : ' idle')}><span className="vz-ph">Code</span><pre ref=${ref} data-hl="">${lines.map((l, i) => html`<span key=${i} className=${lit.has(i) ? 'on' : ''}>${l || ' '}${'\n'}</span>`)}</pre></div>`;
  }
  function VarsPanel({ vars, prev }) {
    const old = new Map((prev || []).map(v => [v[0], String(v[1])]));
    return html`<div className="vz-vars"><span className="vz-ph">Variables</span>
      ${vars && vars.length ? html`<table><tbody>${vars.map(([k, v]) => html`<tr key=${k} className=${prev && old.get(k) !== String(v) ? 'chg' : ''}><th>${k}</th><td>${String(v)}</td></tr>`)}</tbody></table>` : html`<p>No variables yet.</p>`}
    </div>`;
  }

  let ids = 0;
  const icon = d => html`<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d=${d} /></svg>`;
  function Player({ spec, ar, onAnswer, custom, children }) {
    const frames = useMemo(() => run(spec), [spec]);
    const [i, setI] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [predict, setPredict] = useState(true);
    const [asking, setAsking] = useState(null);       // index of the frame whose question is open
    const [answers, setAnswers] = useState({});       // frame index → chosen option (-1 = skipped)
    const [shown, setShown] = useState(() => frames[0] ? blend(null, frames[0], 1) : null);
    const mid = useMemo(() => 'vzh' + (++ids), []);
    const prev = useRef(0), raf = useRef(0), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } prev.current = 0; setI(0); setAnswers({}); setAsking(null); setPlaying(false); setShown(frames[0] ? blend(null, frames[0], 1) : null); }, [frames]);
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
    // moving forward onto a frame with an unanswered question opens the question instead
    const forward = () => {
      const n = i + 1;
      if (n >= frames.length) return;
      if (predict && frames[n].ask && answers[n] == null) { setAsking(n); setPlaying(false); return; }
      setI(n);
    };
    useEffect(() => {
      if (!playing || asking != null) return;
      if (i >= frames.length - 1) { setPlaying(false); return; }
      const t = setTimeout(forward, 1700);
      return () => clearTimeout(t);
    }, [playing, i, frames.length, asking, predict, answers]);
    if (!frames.length || !shown) return html`<p className="vz-err">This diagram couldn't be built.</p>`;
    const f = frames[i], map = new Map(shown.items.map(it => [it.id, it]));
    const go = n => { setPlaying(false); setAsking(null); setI(n); };
    const choose = j => {
      const n = asking; if (n == null) return;
      setAnswers(a => Object.assign({}, a, { [n]: j })); setAsking(null); setI(n);
      if (onAnswer && j >= 0) onAnswer(j === frames[n].ask.a);
    };
    const asked = Object.keys(answers).map(Number).filter(n => answers[n] >= 0);
    const right = asked.filter(n => answers[n] === frames[n].ask.a).length;
    const missed = asked.filter(n => answers[n] !== frames[n].ask.a).sort((a, b) => a - b);
    const total = frames.filter(x => x.ask).length;
    const res = answers[i] != null && answers[i] >= 0 && f.ask ? { ok: answers[i] === f.ask.a, ans: f.ask.o[f.ask.a] } : null;
    const end = i >= frames.length - 1;
    const retry = () => { const a = Object.assign({}, answers); missed.forEach(n => delete a[n]); setAnswers(a); go(Math.max(0, missed[0] - 1)); };
    let prevFn = null; for (let k = i; k >= 0; k--) if (frames[k].code) { prevFn = frames[k].code.fn; break; }
    const q = asking != null ? frames[asking].ask : null;
    const onKey = e => {
      if (e.target.matches && e.target.matches('input, textarea, select')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); setPlaying(false); if (!q) forward(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); go(Math.max(0, i - 1)); }
      else if (q && /^[1-4]$/.test(e.key) && +e.key <= q.o.length) { e.preventDefault(); e.stopPropagation(); choose(+e.key - 1); }
    };
    return html`<figure className=${'vz' + (f.crash ? ' crash' : '')} onKeyDown=${onKey}>
      ${(spec.title || custom) && html`<div className="vz-title">${spec.bug ? html`<span className="vz-tag">What goes wrong</span>` : custom ? html`<span className="vz-tag mine">Your own</span>` : null}${custom ? html`<code>${spec.title}</code>` : html`<b>${spec.title}</b>`}</div>`}
      <div className="vz-stage">
        <svg viewBox=${box.join(' ')} style=${{ maxWidth: Math.round(box[2] * 1.05) + 'px', minWidth: Math.round(Math.min(box[2], 520)) + 'px' }} role="img" aria-label=${f.cap[0]}>
          <defs><marker id=${mid} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" className="vz-head" /></marker></defs>
          ${shown.edges.map(e => html`<${Edge} key=${e.id} e=${e} map=${map} mid=${mid} />`)}
          ${shown.items.map(it => html`<${Item} key=${it.id} it=${it} />`)}
        </svg>
      </div>
      <div className="vz-panels"><${CodePanel} code=${f.code} prevFn=${prevFn} /><${VarsPanel} vars=${f.vars} prev=${i > 0 ? frames[i - 1].vars : null} /></div>
      ${f.out != null && html`<div className="vz-out"><span>Output</span><code>${f.out || ' '}</code></div>`}
      ${q ? html`<div className="vz-ask" role="group" aria-label="Predict the next step">
          <span className="vz-ph">Predict, then see</span>
          <p className="vz-q">${q.q[0]}</p>${ar && q.q[1] ? html`<p className="ar vz-ar" dir="rtl" lang="ar">${q.q[1]}</p>` : null}
          <div className="vz-opts">${q.o.map((o, j) => html`<button key=${j} onClick=${() => choose(j)}><kbd>${j + 1}</kbd><span>${o}</span></button>`)}</div>
          <button className="vz-link" onClick=${() => choose(-1)}>Skip and show me</button>
        </div>`
      : html`<figcaption className="vz-cap" aria-live="polite">
          <span className="vz-step">Step ${i + 1} of ${frames.length}${total && predict && asked.length ? ' · predictions ' + right + ' / ' + asked.length + ' right' : ''}</span>
          ${res ? html`<span className=${'vz-res ' + (res.ok ? 'ok' : 'no')}>${res.ok ? '✓ You predicted it.' : '✗ Not quite. The answer is: ' + res.ans}</span>` : null}
          <span className="vz-text">${f.cap[0]}</span>
          ${ar && f.cap[1] ? html`<span className="ar vz-ar" dir="rtl" lang="ar">${f.cap[1]}</span>` : null}
          ${end && asked.length ? html`<span className="vz-sum">${right === asked.length ? `All ${right} predictions right.` : `${right} of ${asked.length} predictions right.`} ${missed.length ? html`<button className="vz-link" onClick=${retry}>Retry the ${missed.length} you missed</button>` : null}</span>` : null}
        </figcaption>`}
      <div className="vz-bar">
        <button onClick=${() => go(0)} disabled=${i === 0 && !q} aria-label="Back to the start" title="Start">${icon('M6 5v14M19 5l-9 7 9 7z')}</button>
        <button onClick=${() => go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step" title="Previous step (←)">${icon('M15 5l-7 7 7 7')}</button>
        <button className="vz-play" onClick=${() => { if (end) { go(0); setPlaying(true); } else setPlaying(p => !p); }} disabled=${!!q} aria-label=${playing ? 'Pause' : 'Play'}>${icon(playing ? 'M8 5v14M16 5v14' : 'M7 5l12 7-12 7z')}<span>${playing ? 'Pause' : end ? 'Replay' : 'Play'}</span></button>
        <button onClick=${() => { setPlaying(false); forward(); }} disabled=${end || !!q} aria-label="Next step" title="Next step (→)">${icon('M9 5l7 7-7 7')}</button>
        <span className="vz-prog" aria-hidden="true"><i style=${{ width: (frames.length > 1 ? i / (frames.length - 1) * 100 : 100) + '%' }}></i></span>
        ${total ? html`<label className="vz-tog" title="Stop at key steps and ask what happens next"><input type="checkbox" checked=${predict} onChange=${e => { setPredict(e.target.checked); setAsking(null); }} /><span>Predict</span></label>` : null}
        ${children}
      </div>
    </figure>`;
  }

  // one diagram: the lecture example, or the student's own operations
  function One({ spec, ar, onAnswer }) {
    const [own, setOwn] = useState(null);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState(() => toText(spec));
    const [method, setMethod] = useState(spec.method || 'linear');
    const [err, setErr] = useState('');
    const inId = useMemo(() => 'vzin' + (++ids), []);
    const canTry = !spec.bug && !spec.tree && HELP[spec.type];
    const runOwn = () => { try { const t = text.trim(); setOwn(Object.assign(parse(spec.type, t, method), { title: t.length > 80 ? t.slice(0, 80) + '…' : t })); setErr(''); } catch (e) { setErr(e.message); } };
    const tryBtn = canTry ? html`<button className=${'vz-try' + (open ? ' on' : '')} onClick=${() => setOpen(o => !o)} aria-expanded=${String(open)}>${icon('M4 20h4l10-10-4-4L4 16zM13 7l4 4')}<span>Try your own</span></button>` : null;
    return html`<div className="vzwrap">
      <${Player} spec=${own || spec} ar=${ar} onAnswer=${onAnswer} custom=${!!own}>${tryBtn}<//>
      ${open && html`<div className="vz-own">
        <label htmlFor=${inId}>Type operations, separated by commas, then press Run</label>
        <div className="vz-row">
          <input id=${inId} value=${text} onInput=${e => setText(e.target.value)} onKeyDown=${e => { if (e.key === 'Enter') runOwn(); }} spellCheck="false" autoComplete="off" />
          ${spec.type === 'hash' && html`<select value=${method} onChange=${e => setMethod(e.target.value)} aria-label="Collision method"><option value="linear">Linear probing</option><option value="quadratic">Quadratic (h1 + i + i²)</option><option value="double">Double hashing</option><option value="chain">Separate chaining</option></select>`}
          <button className="vz-run" onClick=${runOwn}>Run</button>
        </div>
        <p className="vz-help">${HELP[spec.type][1]} Example: <code>${HELP[spec.type][0]}</code></p>
        ${err && html`<p className="vz-errmsg" role="alert">${err}</p>`}
        ${own && html`<button className="vz-link" onClick=${() => { setOwn(null); setText(toText(spec)); setErr(''); }}>Back to the lecture example</button>`}
      </div>`}
    </div>`;
  }
  // a section can carry one spec or a list (for example the lecture example, then "what goes wrong")
  function Viz({ spec, ar, onAnswer }) {
    const list = Array.isArray(spec) ? spec : [spec];
    return html`${list.map((s, j) => html`<${One} key=${j} spec=${s} ar=${ar} onAnswer=${onAnswer} />`)}`;
  }

  window.VIZ = { Viz, SIMS, run, parse, toText, CODE };
})();

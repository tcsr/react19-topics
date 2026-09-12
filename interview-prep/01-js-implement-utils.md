# JS "Implement This" Utilities

The most common frontend coding-round asks. Write these from memory. Each: working
code + Big-O + what interviewers probe.

## debounce
Delay calling `fn` until `wait` ms after the LAST call. (Search box, resize, scrub.)
```js
function debounce(fn, wait = 300) {
  let t;
  function debounced(...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait); // keep `this` + args
  }
  debounced.cancel = () => clearTimeout(t);
  return debounced;
}
```
- Probes: closure over `t`, preserve `this`/args, a `cancel`. Leading-edge variant:
  fire immediately if not pending, then block.

## throttle
Call `fn` at most once per `wait` ms. (Scroll, mousemove, live progress.)
```js
function throttle(fn, wait = 300) {
  let last = 0, timer;
  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {            // leading edge
      clearTimeout(timer); timer = null;
      last = now; fn.apply(this, args);
    } else if (!timer) {             // trailing edge
      timer = setTimeout(() => { last = Date.now(); timer = null; fn.apply(this, args); }, remaining);
    }
  };
}
```
- Probes: debounce vs throttle difference — debounce waits for quiet; throttle caps
  rate.

## Promise.all (from scratch)
Resolve with all values, or reject on first rejection.
```js
function pAll(promises) {
  return new Promise((resolve, reject) => {
    const results = []; let done = 0; const n = promises.length;
    if (n === 0) return resolve(results);
    promises.forEach((p, i) => {
      Promise.resolve(p).then(
        (val) => { results[i] = val; if (++done === n) resolve(results); }, // order preserved
        reject,                                                             // fail fast
      );
    });
  });
}
```
- Follow-ups: `allSettled` (never rejects), `race` (first settled), `any` (first
  fulfilled). Preserve index order even though completion order varies.

## Promise.allSettled
```js
function allSettled(ps) {
  return Promise.all(ps.map((p) =>
    Promise.resolve(p).then(
      (value) => ({ status: "fulfilled", value }),
      (reason) => ({ status: "rejected", reason }),
    )));
}
```

## EventEmitter (pub/sub)
```js
class EventEmitter {
  #events = new Map();
  on(type, fn) { (this.#events.get(type) ?? this.#events.set(type, new Set()).get(type)).add(fn); return this; }
  off(type, fn) { this.#events.get(type)?.delete(fn); return this; }
  once(type, fn) { const w = (...a) => { this.off(type, w); fn(...a); }; return this.on(type, w); }
  emit(type, ...args) { this.#events.get(type)?.forEach((fn) => fn(...args)); return this; }
}
```
- Probes: `once`, removal during emit (copy or Set handles it), memory leaks.

## deepClone
```js
function deepClone(v, seen = new WeakMap()) {
  if (v === null || typeof v !== "object") return v;      // primitives
  if (v instanceof Date) return new Date(v);
  if (v instanceof RegExp) return new RegExp(v.source, v.flags);
  if (seen.has(v)) return seen.get(v);                    // cycles
  const out = Array.isArray(v) ? [] : {};
  seen.set(v, out);
  for (const k of Reflect.ownKeys(v)) out[k] = deepClone(v[k], seen);
  return out;
}
// (structuredClone is the built-in modern answer — mention it.)
```
- Probes: cycles (WeakMap), Date/Map/Set, why not `JSON.parse(JSON.stringify())`
  (drops functions/undefined/Dates, chokes on cycles).

## deepEqual
```js
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || a == null || b == null) return false;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => deepEqual(a[k], b[k]));
}
```

## curry
```js
function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn.apply(this, args)
      : (...more) => curried.apply(this, [...args, ...more]);
  };
}
```

## memoize
```js
function memoize(fn, keyFn = (...a) => JSON.stringify(a)) {
  const cache = new Map();
  return function (...args) {
    const k = keyFn(...args);
    if (cache.has(k)) return cache.get(k);
    const v = fn.apply(this, args); cache.set(k, v); return v;
  };
}
```

## flatten (array, depth)
```js
function flatten(arr, depth = 1) {
  return depth < 1 ? arr.slice()
    : arr.reduce((acc, x) => acc.concat(Array.isArray(x) ? flatten(x, depth - 1) : x), []);
}
// arr.flat(Infinity) is the built-in.
```

## retry with backoff
```js
async function retry(fn, times = 3, delay = 300) {
  try { return await fn(); }
  catch (e) {
    if (times <= 1) throw e;
    await new Promise((r) => setTimeout(r, delay));
    return retry(fn, times - 1, delay * 2); // exponential
  }
}
```

## once
```js
function once(fn) {
  let called = false, val;
  return function (...a) { if (!called) { called = true; val = fn.apply(this, a); } return val; };
}
```

## LRU Cache (Map keeps insertion order)
```js
class LRUCache {
  constructor(capacity) { this.cap = capacity; this.map = new Map(); }
  get(key) {
    if (!this.map.has(key)) return -1;
    const v = this.map.get(key);
    this.map.delete(key); this.map.set(key, v); // move to most-recent
    return v;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.cap) this.map.delete(this.map.keys().next().value); // evict oldest
    this.map.set(key, value);
  }
}
```
- Probes: O(1) get/put via Map ordering (or hashmap + doubly-linked list). Classic
  LeetCode 146.

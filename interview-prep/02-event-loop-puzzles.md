# Event Loop & Output-Ordering Puzzles

The rule: **sync code first → then all microtasks (Promise `.then`, `queueMicrotask`,
`await` continuations) → then one macrotask (setTimeout/setInterval/I/O) → drain
microtasks again → next macrotask …**. `process.nextTick` (Node) beats other
microtasks.

## Puzzle 1
```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
```
**Output:** `1 4 3 2` — sync (1,4), then microtask (3), then macrotask (2).

## Puzzle 2 (async/await)
```js
async function f() {
  console.log("A");
  await null;               // everything after await is a microtask
  console.log("B");
}
console.log("start");
f();
console.log("end");
```
**Output:** `start A end B` — `f()` runs sync up to `await`; the rest is queued as a
microtask, so `end` prints before `B`.

## Puzzle 3 (mixed)
```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => {
  console.log("3");
  setTimeout(() => console.log("4"), 0);
});
Promise.resolve().then(() => console.log("5"));
console.log("6");
```
**Output:** `1 6 3 5 2 4`
- sync: 1, 6
- microtasks: 3 (queues timeout→4), 5
- macrotasks: 2, then 4

## Puzzle 4 (interview favorite — loop + var vs let)
```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0);   // 3 3 3
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j), 0);   // 0 1 2
```
- `var` is function-scoped → one shared `i` (=3 by the time timeouts run).
- `let` is block-scoped → a fresh binding per iteration. (Pre-`let` fix: IIFE.)

## Puzzle 5 (microtask starvation idea)
```js
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(function loop() {
  console.log("microtask");
});
```
- One microtask runs before the timeout. If a microtask keeps scheduling more
  microtasks, it can **starve** macrotasks (the loop never yields) — a real bug.

## Node extra: nextTick vs Promise
```js
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("nextTick"));
```
- Order: `nextTick` → `promise` → then `timeout`/`immediate` (their order varies in
  the main module; inside an I/O callback `immediate` beats `timeout`).

**How to answer**: narrate the queues out loud — "sync stack empties, then the
microtask queue drains fully, then one macrotask, repeat."

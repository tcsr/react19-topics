# Data Structures & Problem-Solving Patterns (JS)

## Big-O quick table
| Structure | access | search | insert | delete |
|---|---|---|---|---|
| Array | O(1) | O(n) | O(n) (end O(1)) | O(n) |
| Hashmap (Map) / Set | - | O(1) avg | O(1) | O(1) |
| Stack / Queue | - | O(n) | O(1) | O(1) |
| Linked list | O(n) | O(n) | O(1) at node | O(1) at node |
| BST (balanced) | - | O(log n) | O(log n) | O(log n) |
| Heap | O(1) peek | - | O(log n) | O(log n) |
- Common time: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).

## JS gotchas
- `arr.sort()` is lexicographic by default → numbers need `(a,b)=>a-b`.
- No built-in heap → maintain a sorted array or write a binary heap.
- `Map`/`Set` for O(1) lookups (and Map keeps insertion order); object keys are
  strings.
- Strings immutable → build with arrays + `join`.
- `for...of`, `arr.at(-1)`, destructuring swaps `[a,b]=[b,a]`.

## The patterns (when to reach for each)
| Pattern | Signal | Typical problems |
|---|---|---|
| Hashmap frequency | "count / seen before / anagram / dedupe" | two-sum, group anagrams, first unique |
| Two pointers | sorted array / pair from ends / in-place | pair sum, reverse, remove dups, container water |
| Sliding window | "longest/shortest substring/subarray with…" | longest no-repeat, min window, max sum size-k |
| Prefix sum | subarray sums / range queries | subarray sum = k, running total |
| Binary search | sorted / "min value that…" / monotonic | search, rotated array, sqrt, first-bad-version |
| BFS | shortest path / level order (unweighted) | level-order, shortest grid path, word ladder |
| DFS / backtracking | explore all / combinations / permutations | subsets, permutations, N-queens, islands |
| Heap / top-K | "k largest/smallest / most frequent" | top-k, merge k lists, median stream |
| Intervals | overlapping ranges | merge intervals, meeting rooms |
| Fast/slow pointers | cycle / middle of list | linked-list cycle, middle node |
| DP (memo) | "count ways / min cost / can we…" overlapping subproblems | climb stairs, coin change, LIS, edit distance |
| Greedy | local optimum → global | jump game, intervals, max subarray (Kadane) |

## Worked examples (JS)

### Two Sum — hashmap, O(n)
```js
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
```

### Longest substring without repeating — sliding window, O(n)
```js
function lengthOfLongest(s) {
  const seen = new Set(); let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) seen.delete(s[left++]);
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

### Valid anagram — frequency, O(n)
```js
function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const f = {};
  for (const c of a) f[c] = (f[c] || 0) + 1;
  for (const c of b) { if (!f[c]) return false; f[c]--; }
  return true;
}
```

### Binary search, O(log n)
```js
function bsearch(a, t) {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] === t) return mid;
    if (a[mid] < t) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}
```

### Merge intervals, O(n log n)
```js
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (const [s, e] of intervals.slice(1)) {
    const last = res[res.length - 1];
    if (s <= last[1]) last[1] = Math.max(last[1], e);
    else res.push([s, e]);
  }
  return res;
}
```

### BFS grid (number of islands), O(rows*cols)
```js
function numIslands(grid) {
  let count = 0;
  const q = [];
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[0].length; c++)
      if (grid[r][c] === "1") {
        count++; grid[r][c] = "0"; q.push([r, c]);
        while (q.length) {
          const [i, j] = q.pop();
          for (const [di, dj] of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const ni = i + di, nj = j + dj;
            if (grid[ni]?.[nj] === "1") { grid[ni][nj] = "0"; q.push([ni, nj]); }
          }
        }
      }
  return count;
}
```

### Climbing stairs — DP, O(n)
```js
function climb(n) {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
```

### Kadane (max subarray) — greedy/DP, O(n)
```js
function maxSub(nums) {
  let best = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}
```

## Curated practice list (LeetCode, by pattern — do in JS, timed)
- Hashmap: Two Sum, Group Anagrams, Contains Duplicate, First Unique Char
- Two pointers: Valid Palindrome, Container With Most Water, 3Sum, Move Zeroes
- Sliding window: Longest Substring No Repeat, Max Consecutive Ones, Min Size Subarray Sum
- Binary search: Binary Search, Search in Rotated Sorted Array, First Bad Version
- Stack: Valid Parentheses, Min Stack, Daily Temperatures
- Linked list: Reverse List, Linked List Cycle, Merge Two Sorted Lists, Middle Node
- Tree/BFS/DFS: Max Depth, Invert Tree, Level Order, Validate BST, Number of Islands
- Heap/top-K: Kth Largest, Top K Frequent, Merge k Sorted Lists
- Intervals: Merge Intervals, Meeting Rooms
- DP: Climbing Stairs, Coin Change, House Robber, Longest Increasing Subsequence

## How to run a problem live (say this out loud)
1. Restate + clarify (input types, size, edge cases, dups, empty).
2. Brute force + its Big-O → then the better approach + pattern.
3. State time/space before coding.
4. Code cleanly; narrate.
5. Test: normal, empty, single, dup, large. Fix. Mention improvements.

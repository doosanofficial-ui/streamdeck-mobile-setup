(function (root) {
  'use strict';
  function createState() {
    return { selected: null, total: 0, counts: [0, 0, 0, 0, 0, 0] };
  }
  function pressKey(state, key) {
    if (!Number.isInteger(key) || key < 1 || key > 6) throw new RangeError('Choose a key from 1 to 6.');
    const counts = state.counts.slice();
    counts[key - 1] += 1;
    return { selected: key, total: state.total + 1, counts };
  }
  const api = Object.freeze({ createState, pressKey });
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StreamDeckPreview = api;
})(typeof globalThis === 'object' ? globalThis : this);

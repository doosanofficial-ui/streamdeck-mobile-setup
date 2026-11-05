const assert = require('node:assert/strict');
const test = require('node:test');
const { createState, pressKey } = require('./model.js');

test('new preview has no selected key or accumulated presses', () => {
  assert.deepEqual(createState(), { selected: null, total: 0, counts: [0, 0, 0, 0, 0, 0] });
});
test('pressing a key selects it and increments only its count', () => {
  assert.deepEqual(pressKey(createState(), 3), { selected: 3, total: 1, counts: [0, 0, 1, 0, 0, 0] });
});
test('repeat presses accumulate without changing other keys', () => {
  let state = pressKey(createState(), 2);
  state = pressKey(state, 2);
  state = pressKey(state, 6);
  assert.deepEqual(state, { selected: 6, total: 3, counts: [0, 2, 0, 0, 0, 1] });
});
test('pressing never mutates the previous state', () => {
  const previous = createState();
  pressKey(previous, 1);
  assert.deepEqual(previous, { selected: null, total: 0, counts: [0, 0, 0, 0, 0, 0] });
});
test('reset creates a fresh independent state', () => {
  const changed = pressKey(createState(), 5);
  const reset = createState();
  assert.equal(changed.total, 1);
  assert.equal(reset.total, 0);
  assert.notEqual(reset.counts, changed.counts);
});
for (const key of [0, 7, -1, 1.5, NaN, '1', null, undefined]) {
  test(`invalid key ${String(key)} is rejected without changing state`, () => {
    const previous = createState();
    assert.throws(() => pressKey(previous, key), RangeError);
    assert.equal(previous.total, 0);
  });
}
test('all six keys can be selected', () => {
  let state = createState();
  for (let key = 1; key <= 6; key += 1) state = pressKey(state, key);
  assert.deepEqual(state, { selected: 6, total: 6, counts: [1, 1, 1, 1, 1, 1] });
});

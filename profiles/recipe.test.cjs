const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const recipe = JSON.parse(fs.readFileSync(path.join(__dirname, 'mobile-starter.example.json'), 'utf8'));
test('starter stays a descriptive six-key recipe, not a native import', () => {
  assert.equal(recipe.nativeStreamDeckProfile, false);
  assert.equal(recipe.backgroundGet, false);
  assert.deepEqual(recipe.keys.map((key) => key.slot).sort(), [1, 2, 3, 4, 5, 6]);
});
test('website keys only target public pages inside this repository', () => {
  const web = recipe.keys.filter((key) => key.action === 'System:Website');
  assert.equal(web.length, 5);
  for (const key of web) {
    const url = new URL(key.url);
    assert.equal(url.origin, 'https://github.com');
    assert.equal(url.username, '');
    assert.equal(url.password, '');
    assert.equal(url.search, '');
    assert.equal(url.hash, '');
    assert.ok(url.pathname === '/doosanofficial-ui/streamdeck-mobile-setup' || url.pathname.startsWith('/doosanofficial-ui/streamdeck-mobile-setup/blob/main/'));
  }
});
test('local key opens the preview file rather than a command or user path', () => {
  const local = recipe.keys.filter((key) => key.action === 'System:Open');
  assert.equal(local.length, 1);
  assert.equal(local[0].localFile, 'REPOSITORY_DIRECTORY/demo/index.html');
  assert.equal(fs.existsSync(path.join(__dirname, '..', 'demo', 'index.html')), true);
  assert.equal(recipe.keys.some((key) => key.command || key.arguments || key.credentials), false);
});

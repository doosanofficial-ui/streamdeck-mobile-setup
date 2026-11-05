import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluate } from './guard-contract.mjs';

// Deliberately reserved domain and synthetic IDs. No user or company data.
const ready = {
  url: 'https://vpn.example.invalid/',
  vpn: 'disconnected',
  endpoint: 'passed',
  form: 'verified-fixture',
  method: 'FIDO',
  passwordField: false,
  permission: 'existing',
  request: 'not-sent',
  observedAt: 1000,
  now: 1001,
  tab: 'fixture-tab',
  observedTab: 'fixture-tab',
  busy: false,
};

// Negative cases assert the expected stop reason for each synthetic condition.
// These tests cover this example only.
const cases = [
  ['valid fixture stays plan-only', {}, 'PLAN_ONLY_READY'],
  ['malformed URL stops', { url: 'not a URL' }, 'STOP_ORIGIN'],
  ['HTTP stops', { url: 'http://vpn.example.invalid/' }, 'STOP_ORIGIN'],
  ['suffix lookalike stops', { url: 'https://vpn.example.invalid.evil.invalid/' }, 'STOP_ORIGIN'],
  ['prefix lookalike stops', { url: 'https://evil-vpn.example.invalid/' }, 'STOP_ORIGIN'],
  ['user-info URL stops', { url: 'https://test@vpn.example.invalid/' }, 'STOP_ORIGIN'],
  ['unexpected port stops', { url: 'https://vpn.example.invalid:444/' }, 'STOP_ORIGIN'],
  ['connected VPN is preserved', { vpn: 'connected' }, 'STOP_VPN'],
  ['connecting VPN is preserved', { vpn: 'connecting' }, 'STOP_VPN'],
  ['unknown VPN state stops', { vpn: 'unknown' }, 'STOP_VPN'],
  ['endpoint inspection required stops', { endpoint: 'required' }, 'STOP_ENDPOINT'],
  ['endpoint inspection error stops', { endpoint: 'failed' }, 'STOP_ENDPOINT'],
  ['unverified DOM stops', { form: 'unknown' }, 'STOP_FORM'],
  ['expired page stops', { form: 'expired' }, 'STOP_FORM'],
  ['password flow stops', { method: 'password' }, 'STOP_FORM'],
  ['password field stops', { passwordField: true }, 'STOP_FORM'],
  ['new permission stops', { permission: 'new' }, 'STOP_PERMISSION'],
  ['in-flight FIDO never resubmits', { request: 'pending' }, 'STOP_REQUEST'],
  ['uncertain outcome never resubmits', { request: 'uncertain' }, 'STOP_REQUEST'],
  ['completed request never resubmits', { request: 'completed' }, 'STOP_REQUEST'],
  ['rapid repeat stops', { busy: true }, 'STOP_BUSY'],
  ['changed tab stops', { observedTab: 'other-tab' }, 'STOP_OBSERVATION'],
  ['stale observation stops', { now: 2001 }, 'STOP_OBSERVATION'],
  ['clock reversal stops', { now: 999 }, 'STOP_OBSERVATION'],
  ['missing timestamp stops', { observedAt: undefined }, 'STOP_OBSERVATION'],
];

for (const [name, overrides, expected] of cases) {
  test(name, () => assert.equal(evaluate({ ...ready, ...overrides }), expected));
}

test('missing evidence fails closed', () => assert.equal(evaluate({}), 'STOP_ORIGIN'));

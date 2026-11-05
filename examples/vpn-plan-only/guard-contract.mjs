// Plan-only example using synthetic evidence. No device or network access.
export function evaluate(evidence) {
  const s = evidence ?? {};
  let url;
  try { url = new URL(s.url); } catch { return 'STOP_ORIGIN'; }
  if (url.origin !== 'https://vpn.example.invalid' || url.username || url.password) {
    return 'STOP_ORIGIN';
  }
  if (s.vpn !== 'disconnected') return 'STOP_VPN';
  if (s.endpoint !== 'passed') return 'STOP_ENDPOINT';
  if (s.form !== 'verified-fixture' || s.method !== 'FIDO' || s.passwordField !== false) {
    return 'STOP_FORM';
  }
  if (s.permission !== 'existing') return 'STOP_PERMISSION';
  if (s.request !== 'not-sent') return 'STOP_REQUEST';
  if (s.busy !== false) return 'STOP_BUSY';
  if (!s.tab || s.tab !== s.observedTab || !Number.isFinite(s.observedAt) ||
      !Number.isFinite(s.now) || s.now < s.observedAt || s.now - s.observedAt > 1000) {
    return 'STOP_OBSERVATION';
  }
  // This result is a proposal only. There is deliberately no action executor.
  return 'PLAN_ONLY_READY';
}

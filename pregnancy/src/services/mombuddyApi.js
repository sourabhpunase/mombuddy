/**
 * Central API layer: mock responses today; swap implementations when backend exists.
 * Set VITE_API_URL (e.g. https://api.example.com) to call real HTTP endpoints with the same shapes.
 */

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export function getApiBaseUrl() {
  const url = import.meta.env.VITE_API_URL;
  return url && String(url).replace(/\/$/, '') || '';
}

async function request(path, options = {}) {
  const base = getApiBaseUrl();
  if (!base) return null;
  const res = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

/** Profile — POST /api/profile expected when backend ships */
export async function saveProfile(payload) {
  const remote = await request('/api/profile', {
    method: 'POST',
    body: JSON.stringify(payload),
  }).catch(() => null);
  if (remote) return remote;
  await delay();
  return { ok: true, savedAt: new Date().toISOString(), profile: payload };
}

export async function exportUserData() {
  const remote = await request('/api/user/export', { method: 'POST' }).catch(() => null);
  if (remote) return remote;
  await delay();
  const blob = new Blob(
    [JSON.stringify({ app: 'MomBuddy', exportedAt: new Date().toISOString(), note: 'Mock export — replace with server data.' }, null, 2)],
    { type: 'application/json' }
  );
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mombuddy-export-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  return { ok: true };
}

export async function requestProfileShare() {
  const remote = await request('/api/user/share-link', { method: 'POST' }).catch(() => null);
  if (remote) return remote;
  await delay();
  const link = `${window.location.origin}/profile?ref=share-mock`;
  try {
    await navigator.clipboard.writeText(link);
    return { ok: true, copied: true, link };
  } catch {
    return { ok: true, copied: false, link };
  }
}

export async function requestAccountDeletion() {
  const remote = await request('/api/user/delete', { method: 'POST' }).catch(() => null);
  if (remote) return remote;
  await delay();
  return { ok: true, scheduled: false, message: 'Mock: no account was deleted. Wire DELETE /api/user when backend is ready.' };
}

/** Community — optional endpoints */
export async function joinCommunityGroup(groupId) {
  const remote = await request(`/api/community/groups/${groupId}/join`, { method: 'POST' }).catch(() => null);
  if (remote) return remote;
  await delay();
  return { ok: true, groupId };
}

export async function joinCommunityEvent(eventId) {
  const remote = await request(`/api/community/events/${eventId}/join`, { method: 'POST' }).catch(() => null);
  if (remote) return remote;
  await delay();
  return { ok: true, eventId };
}

export async function joinCommunityChallenge(challengeId) {
  const remote = await request(`/api/community/challenges/${challengeId}/join`, { method: 'POST' }).catch(() => null);
  if (remote) return remote;
  await delay();
  return { ok: true, challengeId };
}

export async function connectSimilarUser(userId) {
  const remote = await request(`/api/community/connect`, { method: 'POST', body: JSON.stringify({ userId }) }).catch(() => null);
  if (remote) return remote;
  await delay();
  return { ok: true, userId };
}

export async function fetchCommunityInsights() {
  const remote = await request('/api/community/insights').catch(() => null);
  if (remote) return remote;
  return null;
}

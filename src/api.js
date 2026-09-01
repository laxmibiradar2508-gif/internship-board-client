const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function fetchInternships(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/internships?${query}`);
  const body = await res.json();
  if (!res.ok) throw new Error(body?.errors?.[0]?.message || 'Failed to load internships');
  return body;
}

export async function submitApplication(payload) {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const body = await res.json();
  if (!res.ok) {
    const err = new Error('Validation failed');
    err.details = body.errors || [];
    throw err;
  }
  return body;
}
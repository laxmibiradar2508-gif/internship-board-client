import { useState } from 'react';
import { submitApplication } from '../api';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidUrl(url) {
  if (!url) return true;
  try {
    const p = new URL(url);
    return p.protocol === 'http:' || p.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function ApplicationForm({ internship, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', portfolioUrl: '', note: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!isValidEmail(form.email)) e.email = 'Enter a valid email.';
    if (!isValidUrl(form.portfolioUrl)) e.portfolioUrl = 'URL must start with http:// or https://.';
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const clientErrors = validate();
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      return;
    }
    setSubmitting(true);
    setErrors({});
    try {
      await submitApplication({ internshipId: internship.id, ...form });
      setResult('success');
    } catch (err) {
      setResult('error');
      const fieldErrors = {};
      (err.details || []).forEach((d) => { if (d.field) fieldErrors[d.field] = d.message; });
      setErrors(fieldErrors);
    } finally {
      setSubmitting(false);
    }
  }

  if (result === 'success') {
    return (
      <div role="alert">
        <p>Application submitted for {internship.title}.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-label={`Apply to ${internship.title}`}>
      <h2>Apply: {internship.title}</h2>

      <label>
        Name
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </label>
      {errors.name && <p role="alert">{errors.name}</p>}

      <label>
        Email
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </label>
      {errors.email && <p role="alert">{errors.email}</p>}

      <label>
        Portfolio URL (optional)
        <input value={form.portfolioUrl} onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })} />
      </label>
      {errors.portfolioUrl && <p role="alert">{errors.portfolioUrl}</p>}

      <label>
        Note (optional)
        <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
      </label>

      {result === 'error' && !Object.keys(errors).length && (
        <p role="alert">Something went wrong. Please try again.</p>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit application'}
      </button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}
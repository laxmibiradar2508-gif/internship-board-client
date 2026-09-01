import { useEffect, useState, useCallback } from 'react';
import { fetchInternships } from '../api';

export default function InternshipList({ onSelect }) {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('');
  const [mode, setMode] = useState('');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const res = await fetchInternships({ search, domain, mode });
      setData(res.data);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, [search, domain, mode]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <div>
      <div role="search" style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          aria-label="Search internships"
          placeholder="Search by title or skill"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select aria-label="Filter by domain" value={domain} onChange={(e) => setDomain(e.target.value)}>
          <option value="">All domains</option>
          <option>Full Stack Development</option>
          <option>UI/UX</option>
          <option>Data Analytics</option>
          <option>Cyber Security</option>
        </select>
        <select aria-label="Filter by mode" value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="">All modes</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>On-site</option>
        </select>
      </div>

      {status === 'loading' && <p role="status">Loading internships…</p>}

      {status === 'error' && (
        <div role="alert">
          <p>Couldn't load internships.</p>
          <button onClick={load}>Retry</button>
        </div>
      )}

      {status === 'success' && data.length === 0 && <p>No internships match your filters.</p>}

      {status === 'success' && data.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
          {data.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item)}
                style={{ width: '100%', textAlign: 'left', padding: 12, cursor: 'pointer' }}
              >
                <strong>{item.title}</strong> — {item.mode}, {item.location}
                <div>{item.skills.join(', ')}</div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
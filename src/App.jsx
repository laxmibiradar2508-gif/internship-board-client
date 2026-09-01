import { useState } from 'react';
import InternshipList from './components/InternshipList';
import ApplicationForm from './components/ApplicationForm';

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: 16 }}>
      <h1>Internship Board</h1>
      {!selected && <InternshipList onSelect={setSelected} />}
      {selected && <ApplicationForm internship={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
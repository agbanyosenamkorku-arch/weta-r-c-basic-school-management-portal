'use client';

import { useEffect, useState } from 'react';

export default function ParentsPage() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/parents/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((payload) => setData(payload))
      .catch(() => setError('Parent data unavailable'));
  }, []);

  return (
    <main style={{ padding: 32 }}>
      <h1>Parent Portal</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginTop: 20 }}>
        {data.map((item) => (
          <div key={item.student.id} style={{ background: '#fff', padding: 18, borderRadius: 12, marginBottom: 12 }}>
            <div style={{ fontWeight: 700 }}>{item.student.user.name}</div>
            <div>Admission No: {item.student.admissionNo}</div>
            <div>Guardian Phone: {item.student.guardianPhone || 'N/A'}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [overview, setOverview] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login first');
      return;
    }

    fetch('http://localhost:3001/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((user) => {
        setRole(user.role);
      })
      .catch(() => setError('Could not load user'));

    fetch('http://localhost:3001/dashboard/overview', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => setOverview(data))
      .catch(() => setError('Could not load dashboard data'));
  }, []);

  if (error) {
    return <main style={{ padding: 32 }}><h1>Dashboard</h1><p style={{ color: 'red' }}>{error}</p></main>;
  }

  if (!role || !overview) {
    return <main style={{ padding: 32 }}><h1>Loading dashboard...</h1></main>;
  }

  const cards = [
    { label: 'Students', value: overview.metrics.students },
    { label: 'Teachers', value: overview.metrics.teachers },
    { label: 'Classes', value: overview.metrics.classes },
    { label: 'Pending Fees', value: `$${overview.metrics.pendingFees}` },
  ];

  return (
    <main style={{ padding: 32 }}>
      <h1>Weta R. C. School Dashboard</h1>
      <p style={{ marginBottom: 24 }}>Role: {role}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
        {cards.map((card) => (
          <div key={card.label} style={{ background: '#fff', padding: 24, borderRadius: 16, boxShadow: '0 5px 16px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#64748b', fontSize: 14 }}>{card.label}</div>
            <div style={{ fontSize: 30, fontWeight: 700, marginTop: 8 }}>{card.value}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

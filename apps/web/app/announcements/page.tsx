'use client';

import { useEffect, useState } from 'react';

export default function AnnouncementsPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/announcements', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <main style={{ padding: 32 }}>
      <h1>Announcements</h1>
      <div style={{ marginTop: 20 }}>
        {items.map((item) => (
          <div key={item.id} style={{ background: '#fff', padding: 18, borderRadius: 12, marginBottom: 12 }}>
            <div style={{ fontWeight: 700 }}>{item.title}</div>
            <div style={{ marginTop: 8 }}>{item.message}</div>
            <div style={{ color: '#64748b', marginTop: 8 }}>By {item.user.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

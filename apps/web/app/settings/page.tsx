'use client';

import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/settings', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  if (!settings) return <main style={{ padding: 32 }}><h1>Loading school settings...</h1></main>;

  return (
    <main style={{ padding: 32 }}>
      <h1>School Settings</h1>
      <div style={{ background: '#fff', padding: 20, borderRadius: 12, maxWidth: 520 }}>
        <div><strong>School Name:</strong> {settings.schoolName}</div>
        <div><strong>Address:</strong> {settings.address}</div>
        <div><strong>Motto:</strong> {settings.motto}</div>
        <div><strong>Email:</strong> {settings.contactEmail}</div>
      </div>
    </main>
  );
}

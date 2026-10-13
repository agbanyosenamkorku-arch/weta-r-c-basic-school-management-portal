'use client';

import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.message || 'Login failed');
      return;
    }

    localStorage.setItem('token', data.token);
    setMessage('Login successful');
    window.location.href = '/dashboard';
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 28, width: 380, borderRadius: 18, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
        <h2 style={{ marginBottom: 20 }}>School Login</h2>

        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ ...inputStyle, marginTop: 12 }} />

        <button type="submit" style={{ width: '100%', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, marginTop: 18, padding: '12px 16px', cursor: 'pointer', fontWeight: 700 }}>
          Login
        </button>

        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #cbd5e1',
  fontSize: 16,
};

'use client';

import { FormEvent, useState } from 'react';

export default function AttendancePage() {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('2026-10-13');
  const [status, setStatus] = useState('PRESENT');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:3001/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ studentId, date, status, remarks: 'Marked from web portal' }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.message || 'Attendance failed');
      return;
    }

    setMessage('Attendance recorded successfully');
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Attendance</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student ID" style={inputStyle} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ ...inputStyle, marginTop: 12 }} />
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...inputStyle, marginTop: 12 }}>
          <option value="PRESENT">Present</option>
          <option value="ABSENT">Absent</option>
          <option value="LATE">Late</option>
          <option value="EXCUSED">Excused</option>
        </select>
        <button type="submit" style={buttonStyle}>Submit Attendance</button>
      </form>

      {message && <p style={{ marginTop: 18 }}>{message}</p>}
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #cbd5e1',
  fontSize: 16,
  marginBottom: 12,
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  marginTop: 8,
  background: '#2563eb',
  border: 'none',
  borderRadius: 10,
  color: '#fff',
  padding: '14px 16px',
  fontWeight: 700,
  cursor: 'pointer',
};

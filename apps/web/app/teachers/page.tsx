'use client';

import { useEffect, useState } from 'react';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/teachers', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => setTeachers(data))
      .catch(() => setError('Please login as admin'));
  }, []);

  return (
    <main style={{ padding: 32 }}>
      <h1>Teachers</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginTop: 20 }}>
        {teachers.map((teacher) => (
          <div key={teacher.id} style={{ background: '#fff', padding: 18, borderRadius: 12, marginBottom: 12 }}>
            <div style={{ fontWeight: 700 }}>{teacher.user.name}</div>
            <div>{teacher.user.email}</div>
            <div>Employee No: {teacher.employeeNo}</div>
            <div>Department: {teacher.department}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

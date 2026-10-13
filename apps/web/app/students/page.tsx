'use client';

import { useEffect, useState } from 'react';

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/students', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => setStudents(data))
      .catch(() => setError('Unauthorized or not allowed'));
  }, []);

  return (
    <main style={{ padding: 32 }}>
      <h1>Students</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginTop: 20 }}>
        {students.map((student) => (
          <div key={student.id} style={{ background: '#fff', borderRadius: 12, padding: 18, marginBottom: 12 }}>
            <div style={{ fontWeight: 700 }}>{student.user.name}</div>
            <div>{student.user.email}</div>
            <div>Admission No: {student.admissionNo}</div>
            <div>Gender: {student.gender}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

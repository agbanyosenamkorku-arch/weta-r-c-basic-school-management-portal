'use client';

import { useEffect, useState } from 'react';

export default function GradesPage() {
  const [grades, setGrades] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/grades', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setGrades(data));
  }, []);

  return (
    <main style={{ padding: 32 }}>
      <h1>Grades</h1>
      {grades.map((grade) => (
        <div key={grade.id} style={{ background: '#fff', padding: 18, borderRadius: 12, marginBottom: 12 }}>
          <div style={{ fontWeight: 700 }}>{grade.student.user.name}</div>
          <div>{grade.subject.name}</div>
          <div>{grade.examName}</div>
          <div>{grade.score}/{grade.maxScore}</div>
        </div>
      ))}
    </main>
  );
}

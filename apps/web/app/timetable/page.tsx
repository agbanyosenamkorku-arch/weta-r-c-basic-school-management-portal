'use client';

import { useEffect, useState } from 'react';

export default function TimetablePage() {
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/timetable', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSchedule(data));
  }, []);

  return (
    <main style={{ padding: 32 }}>
      <h1>Timetable</h1>
      {schedule.map((item) => (
        <div key={item.id} style={{ background: '#fff', borderRadius: 12, padding: 18, marginBottom: 12 }}>
          <div><strong>Day:</strong> {item.dayOfWeek}</div>
          <div><strong>Class:</strong> {item.classroom.name} {item.classroom.section}</div>
          <div><strong>Subject:</strong> {item.subject.name}</div>
          <div><strong>Time:</strong> {item.startTime} - {item.endTime}</div>
        </div>
      ))}
    </main>
  );
}

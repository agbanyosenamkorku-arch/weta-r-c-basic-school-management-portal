export default function HomePage() {
  return (
    <main style={{ padding: 32 }}>
      <h1 style={{ fontSize: 32 }}>Weta R. C. Basic School Management Portal</h1>
      <p style={{ marginTop: 12 }}>Manage students, attendance, grades, fees, timetable, and more.</p>
      <a href="/login" style={{ display: 'inline-block', marginTop: 18, background: '#2563eb', color: '#fff', borderRadius: 10, padding: '12px 18px' }}>
        Open portal
      </a>
    </main>
  );
}

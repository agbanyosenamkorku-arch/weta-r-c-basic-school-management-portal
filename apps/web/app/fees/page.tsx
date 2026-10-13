'use client';

import { useEffect, useState } from 'react';

export default function FeesPage() {
  const [fees, setFees] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/fees', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFees(data));
  }, []);

  async function handlePay(feeId: string, amount: number, studentId: string) {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3001/payments/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
        currency: 'usd',
        studentId,
        feeId,
        successUrl: 'http://localhost:3000/payments/success',
        cancelUrl: 'http://localhost:3000/payments/cancel',
      }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Fees</h1>
      {fees.map((fee) => (
        <div key={fee.id} style={{ background: '#fff', padding: 18, borderRadius: 12, marginBottom: 12 }}>
          <div style={{ fontWeight: 700 }}>{fee.student.user.name}</div>
          <div>{fee.description}</div>
          <div>Amount: ${fee.amount}</div>
          <div>Status: {fee.status}</div>
          <button onClick={() => handlePay(fee.id, fee.amount, fee.studentId)} style={{ marginTop: 12, background: '#16a34a', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 10, cursor: 'pointer' }}>
            Pay Now
          </button>
        </div>
      ))}
    </main>
  );
}

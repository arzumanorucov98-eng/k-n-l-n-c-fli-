'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Appointment = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  status: string;
  service?: { title: string } | null;
  location?: { name: string } | null;
};

const statusColors: Record<string, { bg: string; color: string }> = {
  new: { bg: '#e3f2fd', color: '#1565c0' },
  confirmed: { bg: '#e6f4ea', color: '#137333' },
  waiting: { bg: '#fff3e0', color: '#e65100' },
  cancelled: { bg: '#fce8e6', color: '#c5221f' },
  completed: { bg: '#e0e0e0', color: '#424242' },
};

export default function AppointmentsTable({ initialAppointments }: { initialAppointments: Appointment[] }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<Record<string, string>>(
    Object.fromEntries(initialAppointments.map(a => [a.id, a.status]))
  );
  const router = useRouter();

  const handleStatusChange = (id: string, value: string) => {
    setSelectedStatuses(prev => ({ ...prev, [id]: value }));
  };

  const handleConfirm = async (apptId: string) => {
    const newStatus = selectedStatuses[apptId];
    setLoadingId(apptId);

    try {
      const res = await fetch('/api/admin/confirm-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId: apptId, status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed');

      // Update UI immediately
      setAppointments(prev =>
        prev.map(a => (a.id === apptId ? { ...a, status: newStatus } : a))
      );
    } catch (e) {
      alert('Xəta baş verdi. Yenidən cəhd edin.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (apptId: string) => {
    if (!confirm('Bu rezervasiyanı silmək istəyirsinizmi?')) return;
    setLoadingId(apptId);

    try {
      const res = await fetch(`/api/admin/confirm-appointment?id=${apptId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed');
      setAppointments(prev => prev.filter(a => a.id !== apptId));
    } catch (e) {
      alert('Silmə zamanı xəta baş verdi.');
    } finally {
      setLoadingId(null);
    }
  };

  if (appointments.length === 0) {
    return (
      <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-gray-500)' }}>
        Heç bir rezervasiya tapılmadı.
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-gray-200)' }}>
            <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Ad Soyad</th>
            <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Telefon</th>
            <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Email</th>
            <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Tarix / Saat</th>
            <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Xidmət</th>
            <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Status</th>
            <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)', textAlign: 'right' }}>Əməliyyat</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appt => {
            const currentStatus = appt.status;
            const selectedStatus = selectedStatuses[appt.id] || currentStatus;
            const st = statusColors[currentStatus] || statusColors.new;
            const isLoading = loadingId === appt.id;

            return (
              <tr key={appt.id} style={{ borderBottom: '1px solid var(--color-gray-100)', opacity: isLoading ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                <td style={{ padding: 'var(--space-4)', fontWeight: '500', color: 'var(--color-navy)' }}>
                  {appt.firstName} {appt.lastName}
                </td>
                <td style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>{appt.phone}</td>
                <td style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                  {appt.email
                    ? <span style={{ color: 'var(--color-blue)' }}>{appt.email}</span>
                    : <span style={{ color: 'var(--color-gray-300)' }}>—</span>}
                </td>
                <td style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>{appt.date} / {appt.time}</td>
                <td style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>{appt.service?.title || '-'}</td>
                <td style={{ padding: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <select
                      value={selectedStatus}
                      onChange={e => handleStatusChange(appt.id, e.target.value)}
                      disabled={isLoading}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid var(--color-gray-200)',
                        fontSize: '12px',
                        background: st.bg,
                        color: st.color,
                      }}
                    >
                      <option value="new">Yeni</option>
                      <option value="confirmed">Təsdiqlə</option>
                      <option value="waiting">Gözləyir</option>
                      <option value="completed">Tamamlandı</option>
                      <option value="cancelled">Ləğv et</option>
                    </select>
                    <button
                      onClick={() => handleConfirm(appt.id)}
                      disabled={isLoading}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'var(--color-navy)',
                        color: 'white',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      {isLoading ? '...' : '✓'}
                    </button>
                  </div>
                </td>
                <td style={{ padding: 'var(--space-4)', textAlign: 'right' }}>
                  <button
                    onClick={() => handleDelete(appt.id)}
                    disabled={isLoading}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: 'var(--space-2) var(--space-3)', color: 'var(--color-danger)' }}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

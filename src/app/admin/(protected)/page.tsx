import { db } from '@/lib/db';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Fetch some stats
  const [
    appointmentsCount,
    servicesCount,
    locationsCount,
    messagesCount
  ] = await Promise.all([
    db.appointment.count(),
    db.service.count(),
    db.location.count(),
    db.contactMessage.count({ where: { isRead: false } })
  ]);

  const recentAppointments = await db.appointment.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { service: true, location: true }
  });

  return (
    <div>
      <h1 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-6)' }}>Dashboard</h1>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        {[
          { title: 'Ümumi Rezervasiyalar', value: appointmentsCount, icon: '📅', color: 'var(--color-blue)' },
          { title: 'Aktiv Xidmətlər', value: servicesCount, icon: '⚕️', color: 'var(--color-success)' },
          { title: 'Rayonlar', value: locationsCount, icon: '📍', color: 'var(--color-accent)' },
          { title: 'Oxunmamış Mesajlar', value: messagesCount, icon: '✉️', color: 'var(--color-error)' },
        ].map((stat) => (
          <div key={stat.title} style={{ padding: 'var(--space-6)', background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-lg)', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginBottom: '4px' }}>{stat.title}</div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-navy)' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-8)' }}>
        <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy)' }}>Son Rezervasiyalar</h2>
            <Link href="/admin/appointments" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-blue)' }}>Hamısına bax</Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--color-gray-50)' }}>
              <tr>
                <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'left', fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', fontWeight: '600' }}>PASİYENT</th>
                <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'left', fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', fontWeight: '600' }}>XİDMƏT/RAYON</th>
                <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'left', fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', fontWeight: '600' }}>TARİX/SAAT</th>
                <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'left', fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', fontWeight: '600' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-gray-500)' }}>
                    Heç bir rezervasiya tapılmadı
                  </td>
                </tr>
              ) : (
                recentAppointments.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                    <td style={{ padding: 'var(--space-4) var(--space-6)' }}>
                      <div style={{ fontWeight: '500', color: 'var(--color-navy)' }}>{app.firstName} {app.lastName}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{app.phone}</div>
                    </td>
                    <td style={{ padding: 'var(--space-4) var(--space-6)' }}>
                      <div style={{ fontSize: 'var(--text-sm)' }}>{app.service?.title || '-'}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{app.location?.name || '-'}</div>
                    </td>
                    <td style={{ padding: 'var(--space-4) var(--space-6)' }}>
                      <div style={{ fontSize: 'var(--text-sm)' }}>{app.date}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{app.time}</div>
                    </td>
                    <td style={{ padding: 'var(--space-4) var(--space-6)' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: 'var(--text-xs)',
                        fontWeight: '500',
                        background: app.status === 'new' ? 'var(--color-blue-pale)' : (app.status === 'confirmed' ? 'var(--color-success-bg)' : 'var(--color-gray-100)'),
                        color: app.status === 'new' ? 'var(--color-blue)' : (app.status === 'confirmed' ? 'var(--color-success)' : 'var(--color-gray-600)')
                      }}>
                        {app.status === 'new' ? 'Yeni' : app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-200)', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-gray-200)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-navy)' }}>Sürətli Əməliyyatlar</h2>
          </div>
          <div style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
              <Link href="/admin/appointments" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                📅 Təqvimi aç
              </Link>
              <Link href="/admin/blog/new" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                ✍️ Yeni blog yazısı
              </Link>
              <Link href="/admin/settings" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                ⚙️ Sayt məlumatlarını yenilə
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

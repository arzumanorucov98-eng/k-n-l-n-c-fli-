import { db } from '@/lib/db';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AppointmentsTable from '@/components/admin/AppointmentsTable';

export const dynamic = 'force-dynamic';

export default async function AdminAppointmentsPage() {
  const appointments = await db.appointment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { service: true, location: true },
  });

  return (
    <div>
      <AdminPageHeader
        title="Rezervasiyalar"
        description="Bütün qəbul (rezervasiya) sorğularını buradan idarə edin."
      />

      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <AppointmentsTable initialAppointments={appointments as any} />
      </div>
    </div>
  );
}

import { db } from '@/lib/db';
import Link from 'next/link';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { revalidatePath } from 'next/cache';
import DeleteButton from '@/components/admin/DeleteButton';

async function toggleActiveStatus(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const isActive = formData.get('isActive') === 'true';
  await db.location.update({
    where: { id },
    data: { isActive: !isActive }
  });
  revalidatePath('/admin/locations');
}

async function deleteLocation(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.location.delete({ where: { id } });
  revalidatePath('/admin/locations');
}

export default async function AdminLocationsPage() {
  const locations = await db.location.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div>
      <AdminPageHeader 
        title="Rayonlar və Qəbul Cədvəli" 
        description="Regionlardakı qəbul məlumatlarını, klinikaların ünvanlarını və iş saatlarını idarə edin."
        action={{ label: '+ Yeni Rayon', href: '/admin/locations/new' }}
      />

      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-gray-200)' }}>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Rayon (Klinika)</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Ünvan</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Status</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)', textAlign: 'right' }}>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                <td style={{ padding: 'var(--space-4)', fontWeight: '500', color: 'var(--color-navy)' }}>
                  {loc.name}
                </td>
                <td style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>
                  {loc.address || '-'}
                </td>
                <td style={{ padding: 'var(--space-4)' }}>
                  <form action={toggleActiveStatus}>
                    <input type="hidden" name="id" value={loc.id} />
                    <input type="hidden" name="isActive" value={loc.isActive.toString()} />
                    <button type="submit" style={{ 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px', 
                      background: loc.isActive ? '#e6f4ea' : '#fce8e6', 
                      color: loc.isActive ? '#137333' : '#c5221f',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                      {loc.isActive ? 'Aktiv' : 'Passiv'}
                    </button>
                  </form>
                </td>
                <td style={{ padding: 'var(--space-4)', textAlign: 'right', display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
                  <Link href={`/admin/locations/${loc.id}`} className="btn btn-secondary btn-sm" style={{ padding: 'var(--space-2) var(--space-3)' }}>
                    Redaktə
                  </Link>
                  <form action={deleteLocation}>
                    <input type="hidden" name="id" value={loc.id} />
                    <DeleteButton />
                  </form>
                </td>
              </tr>
            ))}
            {locations.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-gray-500)' }}>
                  Heç bir rayon tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

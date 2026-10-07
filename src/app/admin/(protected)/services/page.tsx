import { db } from '@/lib/db';
import Link from 'next/link';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { revalidatePath } from 'next/cache';
import DeleteButton from '@/components/admin/DeleteButton';

async function toggleActiveStatus(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const isActive = formData.get('isActive') === 'true';
  await db.service.update({
    where: { id },
    data: { isActive: !isActive }
  });
  revalidatePath('/admin/services');
}

async function deleteService(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.service.delete({ where: { id } });
  revalidatePath('/admin/services');
}

export default async function AdminServicesPage() {
  const services = await db.service.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div>
      <AdminPageHeader 
        title="Xidmətlər" 
        description="Saytda göstərilən bütün xidmətləri buradan idarə edə bilərsiniz."
        action={{ label: '+ Yeni Xidmət', href: '/admin/services/new' }}
      />

      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-gray-200)' }}>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Başlıq</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Slug</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Status</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)', textAlign: 'right' }}>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                <td style={{ padding: 'var(--space-4)', fontWeight: '500', color: 'var(--color-navy)' }}>
                  {service.title}
                </td>
                <td style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)' }}>
                  {service.slug}
                </td>
                <td style={{ padding: 'var(--space-4)' }}>
                  <form action={toggleActiveStatus}>
                    <input type="hidden" name="id" value={service.id} />
                    <input type="hidden" name="isActive" value={service.isActive.toString()} />
                    <button type="submit" style={{ 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px', 
                      background: service.isActive ? '#e6f4ea' : '#fce8e6', 
                      color: service.isActive ? '#137333' : '#c5221f',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                      {service.isActive ? 'Aktiv' : 'Passiv'}
                    </button>
                  </form>
                </td>
                <td style={{ padding: 'var(--space-4)', textAlign: 'right', display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
                  <Link href={`/admin/services/${service.id}`} className="btn btn-secondary btn-sm" style={{ padding: 'var(--space-2) var(--space-3)' }}>
                    Redaktə
                  </Link>
                  <form action={deleteService}>
                    <input type="hidden" name="id" value={service.id} />
                    <DeleteButton />
                  </form>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-gray-500)' }}>
                  Heç bir xidmət tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { db } from '@/lib/db';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { revalidatePath } from 'next/cache';

async function markAsRead(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const isRead = formData.get('isRead') === 'true';
  await db.contactMessage.update({ where: { id }, data: { isRead: !isRead } });
  revalidatePath('/admin/messages');
}

async function deleteMessage(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.contactMessage.delete({ where: { id } });
  revalidatePath('/admin/messages');
}

export default async function AdminMessagesPage() {
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <AdminPageHeader 
        title="Mesajlar" 
        description="Əlaqə formu vasitəsilə gələn mesajları buradan oxuyun."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ background: 'white', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', borderLeft: `4px solid ${msg.isRead ? 'var(--color-gray-200)' : 'var(--color-blue)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <h4 style={{ color: 'var(--color-navy)' }}>{msg.firstName} {msg.lastName}</h4>
                  {!msg.isRead && <span style={{ padding: '1px 8px', borderRadius: '12px', fontSize: '11px', background: '#e3f2fd', color: '#1565c0' }}>Yeni</span>}
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)', color: 'var(--color-gray-400)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
                  <span>📞 {msg.phone}</span>
                  {msg.email && <span>📧 {msg.email}</span>}
                  <span>{new Date(msg.createdAt).toLocaleDateString('az-AZ')}</span>
                </div>
                <p style={{ color: 'var(--color-gray-600)', lineHeight: '1.6' }}>{msg.message}</p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexShrink: 0, marginLeft: 'var(--space-4)' }}>
                <form action={markAsRead}>
                  <input type="hidden" name="id" value={msg.id} />
                  <input type="hidden" name="isRead" value={msg.isRead.toString()} />
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: 'var(--space-2) var(--space-3)' }}>
                    {msg.isRead ? '📩 Oxunmamış et' : '✓ Oxundu'}
                  </button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={msg.id} />
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: 'var(--space-2) var(--space-3)', color: 'var(--color-danger)' }}>Sil</button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-gray-500)', background: 'white', borderRadius: 'var(--radius-lg)' }}>
            Heç bir mesaj tapılmadı.
          </div>
        )}
      </div>
    </div>
  );
}

import { db } from '@/lib/db';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { revalidatePath } from 'next/cache';

async function addFAQ(formData: FormData) {
  'use server';
  await db.fAQ.create({
    data: {
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      category: formData.get('category') as string || 'general',
      order: parseInt(formData.get('order') as string) || 0,
    }
  });
  revalidatePath('/admin/faq');
}

async function deleteFAQ(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.fAQ.delete({ where: { id } });
  revalidatePath('/admin/faq');
}

async function toggleActive(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const isActive = formData.get('isActive') === 'true';
  await db.fAQ.update({ where: { id }, data: { isActive: !isActive } });
  revalidatePath('/admin/faq');
}

export default async function AdminFAQPage() {
  const faqs = await db.fAQ.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <AdminPageHeader 
        title="Tez-tez Verilən Suallar (FAQ)" 
        description="Xəstələrin suallarını və cavablarını idarə edin."
      />

      {/* Add form */}
      <form action={addFAQ} style={{ background: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', marginBottom: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)' }}>Yeni Sual Əlavə Et</h3>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Sual</label>
          <input required type="text" name="question" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Cavab</label>
          <textarea required name="answer" rows={4} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Kateqoriya</label>
            <select name="category" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }}>
              <option value="general">Ümumi</option>
              <option value="nevrologiya">Nevrologiya</option>
              <option value="qebul">Qəbul və Rezervasiya</option>
              <option value="mualice">Müalicə</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Sıra</label>
            <input type="number" name="order" defaultValue={0} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
          </div>
        </div>
        <button type="submit" className="btn btn-accent" style={{ width: 'fit-content' }}>Əlavə et</button>
      </form>

      {/* FAQ list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {faqs.map((faq) => (
          <div key={faq.id} style={{ background: 'white', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: 'var(--color-navy)', marginBottom: 'var(--space-2)' }}>{faq.question}</h4>
              <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>{faq.answer}</p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexShrink: 0, marginLeft: 'var(--space-4)' }}>
              <form action={toggleActive}>
                <input type="hidden" name="id" value={faq.id} />
                <input type="hidden" name="isActive" value={faq.isActive.toString()} />
                <button type="submit" style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '12px', background: faq.isActive ? '#e6f4ea' : '#fce8e6', color: faq.isActive ? '#137333' : '#c5221f', border: 'none', cursor: 'pointer' }}>
                  {faq.isActive ? 'Aktiv' : 'Passiv'}
                </button>
              </form>
              <form action={deleteFAQ}>
                <input type="hidden" name="id" value={faq.id} />
                <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: 'var(--space-2) var(--space-3)', color: 'var(--color-danger)' }}>Sil</button>
              </form>
            </div>
          </div>
        ))}
        {faqs.length === 0 && (
          <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-gray-500)', background: 'white', borderRadius: 'var(--radius-lg)' }}>
            Heç bir sual tapılmadı.
          </div>
        )}
      </div>
    </div>
  );
}

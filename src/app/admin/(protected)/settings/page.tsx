import { db } from '@/lib/db';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { revalidatePath } from 'next/cache';

const defaultKeys = [
  { key: 'contact_phone', label: 'Telefon nömrəsi', group: 'contact' },
  { key: 'contact_whatsapp', label: 'WhatsApp nömrəsi', group: 'contact' },
  { key: 'contact_email', label: 'Email adresi', group: 'contact' },
  { key: 'contact_address', label: 'Ünvan', group: 'contact' },
  { key: 'contact_workhours', label: 'İş saatları', group: 'contact' },
  { key: 'contact_map_embed', label: 'Xəritə Embed (Iframe Kodu)', group: 'contact' },
  { key: 'social_instagram', label: 'Instagram Linki', group: 'social' },
  { key: 'social_tiktok', label: 'TikTok Linki', group: 'social' },
  { key: 'social_youtube', label: 'YouTube Linki', group: 'social' },
];

async function updateSettings(formData: FormData) {
  'use server';
  
  for (const item of defaultKeys) {
    const value = formData.get(item.key) as string;
    if (value !== null) {
      await db.siteSetting.upsert({
        where: { key: item.key },
        update: { value },
        create: { key: item.key, value, group: item.group }
      });
    }
  }
  
  revalidatePath('/', 'layout');
}

export default async function AdminSettingsPage() {
  const settings = await db.siteSetting.findMany();
  
  const getValue = (key: string) => {
    return settings.find(s => s.key === key)?.value || '';
  };

  return (
    <div>
      <AdminPageHeader 
        title="Tənzimləmələr" 
        description="Saytın ümumi məlumatlarını (əlaqə nömrələri, sosial media linkləri və s.) buradan dəyişdirə bilərsiniz."
      />

      <form action={updateSettings} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', background: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)' }}>Əlaqə Məlumatları</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {defaultKeys.filter(k => k.group === 'contact').map(item => (
            <div key={item.key}>
              <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>{item.label}</label>
              <input type="text" name={item.key} defaultValue={getValue(item.key)} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 'var(--text-lg)', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)', marginTop: 'var(--space-4)' }}>Sosial Şəbəkələr</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {defaultKeys.filter(k => k.group === 'social').map(item => (
            <div key={item.key}>
              <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>{item.label}</label>
              <input type="text" name={item.key} defaultValue={getValue(item.key)} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-4)' }}>
          <button type="submit" className="btn btn-accent">
            Yadda Saxla
          </button>
        </div>
      </form>
    </div>
  );
}

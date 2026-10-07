'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LocationForm({ locationAction, initialData }: { locationAction: any, initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await locationAction(formData);
      router.push('/admin/locations');
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', background: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Rayon / Klinika adı</label>
          <input required type="text" name="name" defaultValue={initialData?.name} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Slug (URL linki)</label>
          <input required type="text" name="slug" defaultValue={initialData?.slug} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Əlaqə Nömrəsi</label>
          <input type="text" name="phone" defaultValue={initialData?.phone} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Sıralama (Order)</label>
          <input type="number" name="order" defaultValue={initialData?.order || 0} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Ünvan</label>
        <textarea required name="address" defaultValue={initialData?.address} rows={2} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Haqqında (Qısa Məlumat)</label>
        <textarea name="description" defaultValue={initialData?.description} rows={3} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Xəritə URL (Google Maps Linki)</label>
          <input type="text" name="mapsUrl" defaultValue={initialData?.mapsUrl} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Xəritə Embed (Iframe Kodu)</label>
          <input type="text" name="mapsEmbed" defaultValue={initialData?.mapsEmbed} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
        <button type="submit" disabled={loading} className="btn btn-accent">
          {loading ? 'Gözləyin...' : 'Yadda Saxla'}
        </button>
        <button type="button" onClick={() => router.push('/admin/locations')} className="btn btn-secondary">
          Ləğv et
        </button>
      </div>
    </form>
  );
}

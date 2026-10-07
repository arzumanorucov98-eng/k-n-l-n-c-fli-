'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ServiceForm({ serviceAction, initialData }: { serviceAction: any, initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setCoverImage(data.url);
      }
    } catch (err) {
      console.error(err);
      alert('Şəkil yüklənərkən xəta baş verdi');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('coverImage', coverImage);
    
    try {
      await serviceAction(formData);
      router.push('/admin/services');
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
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Başlıq (Title)</label>
          <input required type="text" name="title" defaultValue={initialData?.title} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Slug (URL linki)</label>
          <input required type="text" name="slug" defaultValue={initialData?.slug} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Qısa Təsvir (Short Description)</label>
        <textarea required name="shortDescription" defaultValue={initialData?.shortDescription} rows={2} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Geniş Təsvir (Description)</label>
        <textarea required name="description" defaultValue={initialData?.description} rows={5} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Simptomlar</label>
          <textarea name="symptoms" defaultValue={initialData?.symptoms} rows={4} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Kimlər müraciət etməlidir?</label>
          <textarea name="whoShouldApply" defaultValue={initialData?.whoShouldApply} rows={4} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Müayinə prosesi</label>
          <textarea name="examinationProcess" defaultValue={initialData?.examinationProcess} rows={4} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Müalicə yanaşması</label>
          <textarea name="treatmentApproach" defaultValue={initialData?.treatmentApproach} rows={4} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>İkon adı (məs. Brain, Stethoscope)</label>
          <input type="text" name="icon" defaultValue={initialData?.icon} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Sıralama (Order)</label>
          <input type="number" name="order" defaultValue={initialData?.order || 0} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Şəkil (Cover Image)</label>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
          {coverImage && (
            <img src={coverImage} alt="Cover" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
        <button type="submit" disabled={loading} className="btn btn-accent">
          {loading ? 'Gözləyin...' : 'Yadda Saxla'}
        </button>
        <button type="button" onClick={() => router.push('/admin/services')} className="btn btn-secondary">
          Ləğv et
        </button>
      </div>
    </form>
  );
}

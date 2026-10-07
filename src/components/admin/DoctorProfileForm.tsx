'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DoctorProfileForm({ saveAction, initialData }: { saveAction: any, initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(initialData?.photoUrl || '');
  const [aboutPhotoUrl, setAboutPhotoUrl] = useState(initialData?.aboutPhotoUrl || '');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setter(data.url);
    } catch (err) {
      alert('Şəkil yüklənərkən xəta baş verdi');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('photoUrl', photoUrl);
    formData.append('aboutPhotoUrl', aboutPhotoUrl);
    try {
      await saveAction(formData);
      router.refresh();
      alert('Məlumatlar uğurla yadda saxlandı!');
    } catch (err) {
      alert('Xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', background: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

      <h3 style={{ fontSize: 'var(--text-lg)', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)' }}>Doktor Fotoşəkilləri</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Ana Səhifə üçün şəkil</label>
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
            {photoUrl ? (
              <div style={{ position: 'relative' }}>
                <img src={photoUrl} alt="Doktor Ana səhifə" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
                <button type="button" onClick={() => setPhotoUrl('')} style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} aria-label="Şəkli sil">✕</button>
              </div>
            ) : (
              <div style={{ width: '120px', height: '120px', background: 'var(--color-gray-100)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gray-400)', textAlign: 'center', fontSize: '12px' }}>Şəkil yoxdur</div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setPhotoUrl)} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Həkim Haqqında səhifəsi üçün şəkil</label>
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
            {aboutPhotoUrl ? (
              <div style={{ position: 'relative' }}>
                <img src={aboutPhotoUrl} alt="Doktor Haqqında" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
                <button type="button" onClick={() => setAboutPhotoUrl('')} style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} aria-label="Şəkli sil">✕</button>
              </div>
            ) : (
              <div style={{ width: '120px', height: '120px', background: 'var(--color-gray-100)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gray-400)', textAlign: 'center', fontSize: '12px' }}>Şəkil yoxdur</div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setAboutPhotoUrl)} />
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: 'var(--text-lg)', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)', marginTop: 'var(--space-4)' }}>Əsas Məlumatlar</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Ad Soyad</label>
          <input type="text" name="name" defaultValue={initialData?.name || 'Dr. Könül Nəcəfli'} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Titul (Title)</label>
          <input type="text" name="title" defaultValue={initialData?.title || 'Nevroloq'} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Alt Başlıq (Subtitle)</label>
        <input type="text" name="subtitle" defaultValue={initialData?.subtitle} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Bioqrafiya</label>
        <textarea name="bio" defaultValue={initialData?.bio} rows={5} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
      </div>

      <h3 style={{ fontSize: 'var(--text-lg)', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)', marginTop: 'var(--space-4)' }}>Peşəkar Məlumatlar</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Təhsil</label>
          <textarea name="education" defaultValue={initialData?.education} rows={4} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>İş Təcrübəsi</label>
          <textarea name="experience" defaultValue={initialData?.experience} rows={4} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Sertifikatlar</label>
          <textarea name="certificates" defaultValue={initialData?.certificates} rows={4} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Konfranslar və Təlimlər</label>
          <textarea name="conferences" defaultValue={initialData?.conferences} rows={4} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
        </div>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Tibbi Yanaşma</label>
        <textarea name="approach" defaultValue={initialData?.approach} rows={4} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <button type="submit" disabled={loading} className="btn btn-accent">
          {loading ? 'Gözləyin...' : 'Yadda Saxla'}
        </button>
      </div>
    </form>
  );
}

import { db } from '@/lib/db';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { revalidatePath } from 'next/cache';

function extractYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return (match && match[1]) ? match[1] : url.trim();
}

async function addVideo(formData: FormData) {
  'use server';
  
  const rawYoutubeId = formData.get('youtubeId') as string;
  const youtubeId = extractYouTubeId(rawYoutubeId);
  
  await db.video.create({
    data: {
      youtubeId,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      order: parseInt(formData.get('order') as string) || 0,
    }
  });
  revalidatePath('/admin/videos');
  revalidatePath('/videolar');
}

async function deleteVideo(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.video.delete({ where: { id } });
  revalidatePath('/admin/videos');
}

async function toggleActive(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const isActive = formData.get('isActive') === 'true';
  await db.video.update({ where: { id }, data: { isActive: !isActive } });
  revalidatePath('/admin/videos');
}

export default async function AdminVideosPage() {
  const videos = await db.video.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <AdminPageHeader 
        title="YouTube Videoları" 
        description="YouTube videolarınızı əlavə edib saytda göstərin."
      />

      {/* Add form */}
      <form action={addVideo} style={{ background: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', marginBottom: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)' }}>Yeni Video Əlavə Et</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>YouTube Video ID və ya Linki</label>
            <input required type="text" name="youtubeId" placeholder="Məs: https://youtu.be/dQw4w9WgXcQ" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
            <small style={{ color: 'var(--color-gray-400)' }}>Videonun tam linkini və ya yalnız ID-sini yapışdıra bilərsiniz</small>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Video Başlığı</label>
            <input required type="text" name="title" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Təsvir (qısa)</label>
            <input type="text" name="description" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Kateqoriya</label>
            <input type="text" name="category" placeholder="Məs: Miqren" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Sıra</label>
            <input type="number" name="order" defaultValue={0} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }} />
          </div>
        </div>
        <button type="submit" className="btn btn-accent" style={{ width: 'fit-content' }}>Əlavə et</button>
      </form>

      {/* Video list */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-gray-200)' }}>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Önizləmə</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Başlıq</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>YouTube ID</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Status</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)', textAlign: 'right' }}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((v) => (
              <tr key={v.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                <td style={{ padding: 'var(--space-3)' }}>
                  <img src={`https://img.youtube.com/vi/${v.youtubeId}/default.jpg`} alt={v.title} style={{ width: '80px', borderRadius: '4px' }} />
                </td>
                <td style={{ padding: 'var(--space-4)', fontWeight: '500', color: 'var(--color-navy)' }}>{v.title}</td>
                <td style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>{v.youtubeId}</td>
                <td style={{ padding: 'var(--space-4)' }}>
                  <form action={toggleActive}>
                    <input type="hidden" name="id" value={v.id} />
                    <input type="hidden" name="isActive" value={v.isActive.toString()} />
                    <button type="submit" style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '12px', background: v.isActive ? '#e6f4ea' : '#fce8e6', color: v.isActive ? '#137333' : '#c5221f', border: 'none', cursor: 'pointer' }}>
                      {v.isActive ? 'Aktiv' : 'Passiv'}
                    </button>
                  </form>
                </td>
                <td style={{ padding: 'var(--space-4)', textAlign: 'right' }}>
                  <form action={deleteVideo}>
                    <input type="hidden" name="id" value={v.id} />
                    <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: 'var(--space-2) var(--space-3)', color: 'var(--color-danger)' }}>Sil</button>
                  </form>
                </td>
              </tr>
            ))}
            {videos.length === 0 && (
              <tr><td colSpan={5} style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-gray-500)' }}>Heç bir video tapılmadı.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

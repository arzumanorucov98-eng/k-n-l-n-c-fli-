import { db } from '@/lib/db';
import Link from 'next/link';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { revalidatePath } from 'next/cache';
import DeleteButton from '@/components/admin/DeleteButton';

async function togglePublishStatus(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const isPublished = formData.get('isPublished') === 'true';
  await db.blogPost.update({
    where: { id },
    data: { isPublished: !isPublished, publishedAt: !isPublished ? new Date() : null }
  });
  revalidatePath('/admin/blog');
}

async function deletePost(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.blogPost.delete({ where: { id } });
  revalidatePath('/admin/blog');
}

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <AdminPageHeader 
        title="Blog Məqalələri" 
        description="Saytda göstərilən blog məqalələrini buradan idarə edin."
        action={{ label: '+ Yeni Məqalə', href: '/admin/blog/new' }}
      />

      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-gray-200)' }}>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Başlıq</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Müəllif</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)' }}>Status</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontWeight: '500', fontSize: 'var(--text-sm)', textAlign: 'right' }}>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                <td style={{ padding: 'var(--space-4)', fontWeight: '500', color: 'var(--color-navy)' }}>
                  {post.title}
                </td>
                <td style={{ padding: 'var(--space-4)', color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>
                  {post.author || 'Dr. Könül Nəcəfli'}
                </td>
                <td style={{ padding: 'var(--space-4)' }}>
                  <form action={togglePublishStatus}>
                    <input type="hidden" name="id" value={post.id} />
                    <input type="hidden" name="isPublished" value={post.isPublished.toString()} />
                    <button type="submit" style={{ 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px', 
                      background: post.isPublished ? '#e6f4ea' : '#fce8e6', 
                      color: post.isPublished ? '#137333' : '#c5221f',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                      {post.isPublished ? 'Paylaşılıb' : 'Qaralama'}
                    </button>
                  </form>
                </td>
                <td style={{ padding: 'var(--space-4)', textAlign: 'right', display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
                  <Link href={`/admin/blog/${post.id}`} className="btn btn-secondary btn-sm" style={{ padding: 'var(--space-2) var(--space-3)' }}>
                    Redaktə
                  </Link>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <DeleteButton />
                  </form>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-gray-500)' }}>
                  Heç bir məqalə tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

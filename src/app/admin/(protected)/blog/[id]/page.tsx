import { db } from '@/lib/db';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import BlogForm from '@/components/admin/BlogForm';
import { notFound } from 'next/navigation';

async function createBlog(formData: FormData) {
  'use server';
  await db.blogPost.create({
    data: {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      author: formData.get('author') as string,
      readTime: parseInt(formData.get('readTime') as string) || 5,
      coverImage: formData.get('coverImage') as string,
    }
  });
}

async function updateBlog(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.blogPost.update({
    where: { id },
    data: {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      author: formData.get('author') as string,
      readTime: parseInt(formData.get('readTime') as string) || 5,
      coverImage: formData.get('coverImage') as string,
    }
  });
}

export default async function BlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === 'new';
  let initialData = null;

  if (!isNew) {
    initialData = await db.blogPost.findUnique({
      where: { id }
    });

    if (!initialData) {
      notFound();
    }
  }

  return (
    <div>
      <AdminPageHeader 
        title={isNew ? "Yeni Məqalə Yaz" : "Məqaləni Redaktə Et"} 
        description="Aşağıdakı formu dolduraraq blog məqaləsi yaradın."
      />
      
      <BlogForm 
        blogAction={isNew ? createBlog : updateBlog}
        initialData={initialData}
      />
    </div>
  );
}

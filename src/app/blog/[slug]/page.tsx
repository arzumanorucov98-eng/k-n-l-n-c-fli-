import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

// Dynamically generate SEO metadata based on the database content
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({
    where: { locale_slug: { locale: 'az', slug } },
  });

  if (!post || !post.isPublished) {
    return { title: 'Məqalə tapılmadı | Dr. Könül Nəcəfli' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dr-konul-necefli.az';

  return {
    title: `${post.seoTitle || post.title} | Dr. Könül Nəcəfli`,
    description: post.seoDescription || post.excerpt,
    keywords: post.seoKeywords?.split(',').map((k) => k.trim()) || [],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author || 'Dr. Könül Nəcəfli'],
      images: post.ogImage || post.coverImage ? [post.ogImage || post.coverImage] : [],
      url: `${siteUrl}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({
    where: { locale_slug: { locale: 'az', slug } },
  });

  if (!post || !post.isPublished) {
    notFound();
  }

  return (
    <>
      <article itemScope itemType="http://schema.org/BlogPosting" style={{ backgroundColor: 'var(--color-white)', paddingBottom: 'var(--space-20)' }}>
        {/* Hidden SEO Meta */}
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="datePublished" content={post.publishedAt?.toISOString()} />
        <meta itemProp="author" content={post.author || 'Dr. Könül Nəcəfli'} />

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ padding: 'var(--space-4) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--color-blue)', textDecoration: 'none' }} title="Ana səhifə">Ana səhifə</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" style={{ color: 'var(--color-blue)', textDecoration: 'none' }} title="Bütün məqalələr">Blog</Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--color-gray-600)' }} aria-current="page">{post.title}</span>
          </div>
        </nav>

        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', paddingTop: 'var(--space-8)' }}>
          {/* Header Section (Title & Meta) */}
          <header style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>
              
              <div style={{ order: 1 }}>
                <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginBottom: 'var(--space-4)', fontWeight: '500', flexWrap: 'wrap' }}>
                  <span>{post.author || 'Dr. Könül Nəcəfli'}</span>
                  <span>•</span>
                  <time dateTime={post.publishedAt?.toISOString()}>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('az-AZ')}</time>
                  <span>•</span>
                  <span>{post.readTime} dəq oxuma</span>
                </div>
                
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--color-navy)', lineHeight: '1.3', marginBottom: 'var(--space-4)', textAlign: 'left' }}>
                  {post.title}
                </h1>
                
                {post.excerpt && (
                  <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-gray-600)', lineHeight: '1.6', textAlign: 'left' }}>
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Featured Image */}
              {post.coverImage && (
                <div style={{ order: 2 }}>
                  <figure style={{ margin: '0', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', backgroundColor: 'var(--color-gray-50)', height: '100%', minHeight: '300px' }}>
                    <img 
                      src={post.coverImage} 
                      alt={post.seoTitle || post.title} 
                      itemProp="image"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    />
                  </figure>
                </div>
              )}
            </div>
          </header>

          <div style={{ borderTop: '1px solid var(--color-gray-100)', marginBottom: 'var(--space-8)' }}></div>

          {/* Article Content */}
          <div 
            itemProp="articleBody"
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </article>

      {/* Global styles specifically for blog HTML content */}
      <style dangerouslySetInnerHTML={{__html: `
        .blog-content {
          font-size: 1.125rem; 
          line-height: 1.8; 
          color: var(--color-gray-700);
        }
        .blog-content h2 {
          color: var(--color-navy);
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin: 2.5rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--color-gray-100);
        }
        .blog-content h3 {
          color: var(--color-navy-light);
          font-size: 1.5rem;
          margin: 2rem 0 1rem;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content strong {
          color: var(--color-navy);
          font-weight: 600;
        }
        .blog-content blockquote {
          border-left: 4px solid var(--color-blue);
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: var(--color-gray-600);
          background: var(--color-gray-50);
          padding: 1rem;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        @media (max-width: 768px) {
          .blog-content {
            font-size: 1rem;
          }
        }
      `}} />
    </>
  );
}

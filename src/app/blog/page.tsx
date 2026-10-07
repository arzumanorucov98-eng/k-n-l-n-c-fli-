import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog | Dr. Könül Nəcəfli',
  description: 'Nevroloji xəstəliklər, miqren, baş ağrısı və yuxu pozuntuları haqqında ən son məqalələr və həkim məsləhətləri. Bakıda peşəkar nevroloq bloqu.',
  keywords: ['nevroloji blog', 'bas agrisi mualicesi', 'miqren haqqinda', 'nevroloq mesleheti', 'dr konul necefli'],
  openGraph: {
    title: 'Nevroloji Sağlamlıq Blogu | Dr. Könül Nəcəfli',
    description: 'Nevrologiya sahəsində ən son və faydalı məlumatlar, məqalələr.',
    type: 'website'
  }
};

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage() {
  const blogs = await db.blogPost.findMany({
    where: { isPublished: true, locale: 'az' },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <>
      {/* Breadcrumb - SEO friendly navigation */}
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }} title="Ana səhifəyə qayıt">Ana səhifə</Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: 'var(--color-gray-600)' }} aria-current="page">Blog</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroBlog}>
        <div className="container">
          <span className="section-badge">Blog</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-4)' }}>
            Nevroloji Sağlamlıq Blogu
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy)', fontWeight: '500', maxWidth: '600px', margin: '0 auto' }}>
            Nevrologiya sahəsində faydalı məlumatlar, həkim məsləhətləri və xəstəliklərin müalicə yolları haqqında ətraflı məqalələr
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section">
        <div className="container">
          {blogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
              <p style={{ color: 'var(--color-gray-400)', maxWidth: '400px', margin: '0 auto' }}>
                Hələlik heç bir məqalə yayımlanmayıb.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
              {blogs.map((post) => (
                <article key={post.id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
                  <Link href={`/blog/${post.slug}`} title={post.seoTitle || post.title} style={{ display: 'block', height: '200px', overflow: 'hidden' }}>
                    {post.coverImage ? (
                      <img 
                        src={post.coverImage} 
                        alt={post.seoTitle || post.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                        className="hover-scale"
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'var(--color-gray-400)' }}>Şəkil yoxdur</span>
                      </div>
                    )}
                  </Link>
                  <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', marginBottom: 'var(--space-3)', fontWeight: '500' }}>
                      <span>{post.author || 'Dr. Könül Nəcəfli'}</span>
                      <span>•</span>
                      <time dateTime={post.publishedAt?.toISOString()}>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('az-AZ')}</time>
                      <span>•</span>
                      <span>{post.readTime} dəq oxuma</span>
                    </div>
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-2)', lineHeight: '1.4' }}>
                        {post.title}
                      </h2>
                    </Link>
                    <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--text-sm)', lineHeight: '1.6', flexGrow: 1 }}>
                      {post.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}`} 
                      title={`${post.title} məqaləsini oxu`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-blue)', fontWeight: '600', fontSize: 'var(--text-sm)', marginTop: 'var(--space-4)', textDecoration: 'none' }}
                    >
                      Davamını oxu
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* JSON-LD for Blog Collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Nevroloji Sağlamlıq Blogu | Dr. Könül Nəcəfli',
            description: 'Nevrologiya sahəsində ən son və faydalı məlumatlar, məqalələr.',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
            blogPost: blogs.map(post => ({
              '@type': 'BlogPosting',
              headline: post.title,
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
              datePublished: post.publishedAt || post.createdAt,
              author: {
                '@type': 'Person',
                name: post.author || 'Dr. Könül Nəcəfli'
              }
            }))
          })
        }}
      />
    </>
  );
}

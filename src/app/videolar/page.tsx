import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Videolar',
  description: 'Dr. Könül Nəcəfli - YouTube videoları. Nevroloji sağlamlıq haqqında faydalı video məzmunlar.',
};

export default function VideosPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>Videolar</span>
        </div>
      </nav>

      <section style={{ background: 'linear-gradient(135deg, var(--color-gray-50), var(--color-blue-pale))', padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <div className="container">
          <span className="section-badge">Videolar</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-4)' }}>YouTube Videoları</h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-gray-500)', maxWidth: '600px', margin: '0 auto' }}>
            Nevroloji sağlamlıq haqqında faydalı video məzmunlar
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-gray-300)" strokeWidth="1" style={{ margin: '0 auto var(--space-4)' }}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
            <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-gray-400)', marginBottom: 'var(--space-3)' }}>Videolar Tezliklə</h2>
            <p style={{ color: 'var(--color-gray-400)', maxWidth: '400px', margin: '0 auto' }}>
              YouTube videoları admin paneldən əlavə ediləcək.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

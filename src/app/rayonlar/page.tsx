import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import styles from './page.module.css';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Rayonlar',
  description: 'Dr. Könül Nəcəfli tərəfindən xidmət göstərilən rayonlar. Bakı, Zaqatala, Qəbələ, Şəki, Balakən, Qax və digər rayonlarda nevroloji qəbul.',
};

export default async function LocationsPage() {
  const locations = await db.location.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>Rayonlar</span>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.heroMap}>
        <div className="container">
          <span className="section-badge">Rayonlar</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-4)' }}>
            Xidmət Göstərilən Rayonlar
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy)', fontWeight: '500', maxWidth: '600px', margin: '0 auto' }}>
            Dr. Könül Nəcəfli Bakıda və müxtəlif rayonlarda peşəkar nevroloji qəbul keçirir
          </p>
        </div>
      </section>

      {/* Locations */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
            {locations.map((location) => (
              <Link key={location.slug} href={`/rayonlar/${location.slug}`} className="card" style={{ textDecoration: 'none' }}>
                <div style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-lg)', background: 'var(--color-blue-pale)', color: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'var(--color-navy)', marginBottom: 'var(--space-1)' }}>{location.name}</h2>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>{location.address || 'Qəbul məlumatı admin paneldən əlavə ediləcək'}</p>
                  </div>
                  <span style={{ color: 'var(--color-blue)', fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)' }}>→</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="medical-disclaimer" style={{ marginTop: 'var(--space-10)' }}>
            Rayonlardakı qəbul günləri və saatları dəyişə bilər. Dəqiq məlumat üçün əvvəlcədən əlaqə saxlayın.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-navy), var(--color-blue))', padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: 'var(--space-4)' }}>Rayonunuzda qəbul var?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
            Qəbul günləri və vaxtları haqqında məlumat alın
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/rezervasiya" className="btn btn-accent btn-lg">Rezervasiya et</Link>
            <Link href="/elaqe" className="btn btn-secondary btn-lg">Əlaqə saxlayın</Link>
          </div>
        </div>
      </section>
    </>
  );
}

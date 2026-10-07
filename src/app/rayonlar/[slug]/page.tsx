import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import styles from './page.module.css';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const loc = await db.location.findFirst({ where: { slug } });
  
  if (!loc) return { title: 'Rayon tapılmadı' };
  
  return {
    title: loc.seoTitle || `${loc.name} - Nevroloji Qəbul`,
    description: loc.seoDescription || `Dr. Könül Nəcəfli - ${loc.name} rayonunda nevroloji qəbul. Qəbul günləri, ünvan və rezervasiya məlumatları.`,
    keywords: loc.seoKeywords || '',
  };
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = await db.location.findFirst({ where: { slug } });
  
  if (!location || !location.isActive) notFound();

  const otherLocations = await db.location.findMany({ 
    where: { isActive: true, NOT: { slug } },
    orderBy: { order: 'asc' }
  });

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <Link href="/rayonlar" style={{ color: 'var(--color-blue)' }}>Rayonlar</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>{location.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-gray-50), var(--color-blue-pale))', padding: 'var(--space-16) 0' }}>
        <div className="container">
          <span className="section-badge" style={{ marginBottom: 'var(--space-4)' }}>Rayon qəbulu</span>
          <h1 className={styles.heroTitle}>
            {location.name}
          </h1>
          <p className={styles.heroDesc}>
            Dr. Könül Nəcəfli tərəfindən {location.name} bölgəsində nevroloji qəbul xidməti
          </p>
          <Link href="/rezervasiya" className="btn btn-primary btn-lg">Qəbul üçün rezervasiya</Link>
        </div>
      </section>

      {/* Content */}
      <section className="section" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div style={{ minWidth: 0 }}>
              <h2 className={styles.contentTitle}>{location.name} bölgəsində nevroloji qəbul</h2>
              
              <div className={styles.description}>
                {location.description || 'Qəbul haqqında ətraflı məlumat tezliklə əlavə ediləcək.'}
              </div>

              {/* Schedule */}
              <div className={styles.infoCard}>
                <h3>📅 Qəbul Statusu</h3>
                <p style={{ color: 'var(--color-gray-700)' }}>
                  {location.appointmentStatus === 'active' ? 'Qəbul aktivdir' : 
                   location.appointmentStatus === 'closed' ? 'Qəbul dayandırılıb' : 
                   location.appointmentStatus === 'planned' ? 'Tezliklə' : 'Məlumat yoxdur'}
                </p>
              </div>

              {/* Address */}
              <div className={styles.infoCard}>
                <h3>📍 Ünvan və Əlaqə</h3>
                <p style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--space-2)' }}>{location.address || 'Ünvan qeyd olunmayıb'}</p>
                {location.phone && <p style={{ color: 'var(--color-gray-700)' }}>Telefon: {location.phone}</p>}
              </div>

              {/* Map */}
              {location.mapsEmbed && (
                <div style={{ marginTop: 'var(--space-6)' }}>
                  <h3 style={{ marginBottom: 'var(--space-4)' }}>Xəritədə yerləşmə</h3>
                  <div 
                    className={styles.mapContainer}
                    dangerouslySetInnerHTML={{ __html: location.mapsEmbed }} 
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div className={styles.sidebar}>
                <div className={styles.sidebarCta}>
                  <h3>Qəbul üçün rezervasiya</h3>
                  <p>
                    {location.name} qəbulu
                  </p>
                  <Link href="/rezervasiya" className="btn btn-accent" style={{ width: '100%' }}>Rezervasiya et</Link>
                </div>

                {otherLocations.length > 0 && (
                  <div className={styles.sidebarLocations}>
                    <h3>Digər Bölgələr</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {otherLocations.map((l) => (
                        <Link key={l.slug} href={`/rayonlar/${l.slug}`} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-blue)', padding: 'var(--space-2) 0', textDecoration: 'none' }}>
                          → {l.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

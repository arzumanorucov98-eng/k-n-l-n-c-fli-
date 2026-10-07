import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import styles from './page.module.css';
import { Activity, Brain, Zap, RotateCw, Moon, Grid, Stethoscope, Dna } from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds


export const metadata: Metadata = {
  title: 'Xidmətlər',
  description: 'Dr. Könül Nəcəfli tərəfindən göstərilən nevroloji xidmətlər. Miqren, baş ağrısı, başgicəllənmə, yuxu pozuntuları və digər sinir sistemi xəstəliklərinin müalicəsi.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana səhifə', item: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' },
    { '@type': 'ListItem', position: 2, name: 'Xidmətlər' },
  ],
};

const getServiceIcon = (slug: string) => {
  const props = { size: 40, color: "var(--color-navy)", strokeWidth: 1.5 };
  switch (slug) {
    case 'nevroloji-muayine': return <Stethoscope {...props} />;
    case 'bas-agrilarinin-mualicesi': return <Brain {...props} />;
    case 'migren': return <Zap {...props} />;
    case 'bas-gicellenmesi': return <RotateCw {...props} />;
    case 'boyun-bel-agrilari': return <Dna {...props} />;
    case 'yuxu-pozuntulari': return <Moon {...props} />;
    case 'sinir-sistemi-xestelikleri': return <Activity {...props} />;
    default: return <Grid {...props} />;
  }
};

export default async function ServicesPage() {
  const services = await db.service.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>Xidmətlər</span>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className="section-badge">Xidmətlər</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-4)' }}>Nevroloji Xidmətlər</h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy)', fontWeight: '500', maxWidth: '600px', margin: '0 auto', lineHeight: 'var(--leading-relaxed)' }}>
            Sinir sistemi ilə bağlı müxtəlif problemlərin müasir diaqnostikası və müalicəsi
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/xidmetler/${service.slug}`}
                className="card"
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ padding: 'var(--space-4)', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', borderTopLeftRadius: 'var(--radius-xl)', borderTopRightRadius: 'var(--radius-xl)' }}>
                  {getServiceIcon(service.slug)}
                </div>
                <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--color-navy)', marginBottom: 'var(--space-3)' }}>
                    {service.title}
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-navy)', fontWeight: '500', lineHeight: 'var(--leading-relaxed)', flex: 1 }}>
                    {service.shortDescription || 'Bu xidmət haqqında ətraflı məlumat admin paneldən əlavə ediləcək.'}
                  </p>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-blue)', fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-4)' }}>
                    Ətraflı məlumat →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-navy)' }}>Nevroloji problemləriniz var?</h2>
          <p style={{ color: 'var(--color-navy)', fontWeight: '500', marginBottom: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
            Dr. Könül Nəcəfli ilə peşəkar konsultasiya üçün indi rezervasiya edin.
          </p>
          <Link href="/rezervasiya" className="btn btn-primary btn-lg">Qəbul üçün rezervasiya</Link>
        </div>
      </section>
    </>
  );
}

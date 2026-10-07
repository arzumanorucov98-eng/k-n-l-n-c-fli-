import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

// Generate static params for all service slugs
export async function generateStaticParams() {
  const services = await db.service.findMany({ select: { slug: true } });
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await db.service.findFirst({ where: { slug } });
  
  if (!service) return { title: 'Xidmət tapılmadı' };
  
  return {
    title: service.title,
    description: service.shortDescription || `${service.title} - Dr. Könül Nəcəfli tərəfindən peşəkar nevroloji xidmət.`,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const [service, allServices, settings] = await Promise.all([
    db.service.findFirst({ where: { slug } }),
    db.service.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    db.siteSetting.findMany({ where: { key: { in: ['contact_phone', 'contact_whatsapp'] } } })
  ]);

  if (!service) {
    notFound();
  }

  const phone = settings.find(s => s.key === 'contact_phone')?.value?.replace(/[^0-9+]/g, '') || '';
  const whatsapp = settings.find(s => s.key === 'contact_whatsapp')?.value || '';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana səhifə', item: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' },
      { '@type': 'ListItem', position: 2, name: 'Xidmətlər', item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/xidmetler` },
      { '@type': 'ListItem', position: 3, name: service.title },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `${service.title} xidməti üçün necə müraciət edə bilərəm?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Saytımızdakı rezervasiya bölməsindən online rezervasiya edə, telefon və ya WhatsApp vasitəsilə bizimlə əlaqə saxlaya bilərsiniz.',
        },
      },
      {
        '@type': 'Question',
        name: `${service.title} müayinəsi nə qədər vaxt aparır?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nevroloji müayinənin müddəti müraciətin xarakterindən asılı olaraq 30-45 dəqiqə arasında dəyişə bilər. İlkin müayinə adətən daha uzun sürə bilər.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <Link href="/xidmetler" style={{ color: 'var(--color-blue)' }}>Xidmətlər</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>{service.title}</span>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-gray-50) 0%, var(--color-blue-pale) 100%)', padding: 'var(--space-16) 0' }}>
        <div className="container">
          <span className="section-badge" style={{ marginBottom: 'var(--space-4)' }}>Nevroloji Xidmət</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-4)' }}>{service.title}</h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-gray-500)', maxWidth: '700px', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
            Dr. Könül Nəcəfli tərəfindən {service.title.toLowerCase()} sahəsində müasir diaqnostika və müalicə xidməti.
          </p>
          <Link href="/rezervasiya" className="btn btn-primary btn-lg">Qəbul üçün rezervasiya</Link>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container service-layout">
          <div>
            {/* Service Info */}
            <div style={{ marginBottom: 'var(--space-10)' }}>
              <h2 style={{ marginBottom: 'var(--space-4)' }}>Xidmət haqqında</h2>
              <div className="medical-disclaimer" dangerouslySetInnerHTML={{ __html: service.description || 'Bu xidmət haqqında ətraflı məlumat admin paneldən əlavə ediləcək.' }} />
            </div>

            {/* FAQ */}
            <div>
              <h2 style={{ marginBottom: 'var(--space-4)' }}>Tez-tez Verilən Suallar</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ padding: 'var(--space-5)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-100)' }}>
                  <h3 style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-semibold)', color: 'var(--color-navy)', marginBottom: 'var(--space-2)' }}>
                    {service.title} xidməti üçün necə müraciət edə bilərəm?
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
                    Saytımızdakı rezervasiya bölməsindən online rezervasiya edə, telefon və ya WhatsApp vasitəsilə bizimlə əlaqə saxlaya bilərsiniz.
                  </p>
                </div>
                <div style={{ padding: 'var(--space-5)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-100)' }}>
                  <h3 style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-semibold)', color: 'var(--color-navy)', marginBottom: 'var(--space-2)' }}>
                    {service.title} müayinəsi nə qədər vaxt aparır?
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
                    Nevroloji müayinənin müddəti müraciətin xarakterindən asılı olaraq 30-45 dəqiqə arasında dəyişə bilər.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div style={{ position: 'sticky', top: 'calc(var(--header-height-compact) + var(--space-6))', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Reservation CTA */}
              <div style={{ padding: 'var(--space-6)', background: 'linear-gradient(135deg, var(--color-navy), var(--color-blue))', borderRadius: 'var(--radius-xl)', textAlign: 'center', color: 'white' }}>
                <h3 style={{ color: 'white', marginBottom: 'var(--space-3)', fontSize: 'var(--text-lg)' }}>Qəbul üçün rezervasiya</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-4)' }}>
                  Dr. Könül Nəcəfli ilə peşəkar konsultasiya
                </p>
                <Link href="/rezervasiya" className="btn btn-accent" style={{ width: '100%' }}>Rezervasiya et</Link>
              </div>

              {/* Contact */}
              <div style={{ padding: 'var(--space-6)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-100)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>Əlaqə</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <a href={`tel:${phone}`} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>Zəng edin</a>
                  <a href={whatsapp.includes('http') ? whatsapp : `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>WhatsApp ilə yazın</a>
                </div>
              </div>

              {/* Other services */}
              <div style={{ padding: 'var(--space-6)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-100)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>Digər Xidmətlər</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {allServices.filter((s) => s.slug !== slug).slice(0, 5).map((s) => (
                    <Link key={s.slug} href={`/xidmetler/${s.slug}`} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-blue)', padding: 'var(--space-2) 0' }}>
                      → {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

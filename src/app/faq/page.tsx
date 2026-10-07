import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Tez-tez Verilən Suallar (FAQ)',
  description: 'Dr. Könül Nəcəfli haqqında tez-tez verilən suallar. Qəbul, rezervasiya, rayon qəbulları və nevroloji xidmətlər haqqında cavablar.',
};

export default async function FAQPage() {
  const [faqs, settings] = await Promise.all([
    db.fAQ.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
    db.siteSetting.findMany({ where: { key: 'contact_whatsapp' } })
  ]);
  const whatsapp = settings[0]?.value?.replace(/[^0-9]/g, '') || '';
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }) }} />

      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>FAQ</span>
        </div>
      </nav>

      <section style={{ background: 'linear-gradient(135deg, var(--color-gray-50), var(--color-blue-pale))', padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-4)' }}>Tez-tez Verilən Suallar</h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-gray-500)', maxWidth: '500px', margin: '0 auto' }}>
            Ən çox soruşulan suallara cavablar
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ padding: 'var(--space-5) var(--space-6)', background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-100)' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'var(--font-semibold)', color: 'var(--color-navy)', fontSize: 'var(--text-base)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.question}
                  <span style={{ color: 'var(--color-blue)', flexShrink: 0, marginLeft: 'var(--space-4)' }}>▼</span>
                </summary>
                <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-gray-600)', lineHeight: 'var(--leading-relaxed)', fontSize: 'var(--text-sm)' }}>{faq.answer}</p>
              </details>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)', padding: 'var(--space-8)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-xl)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>Sualınız var?</h2>
            <p style={{ color: 'var(--color-gray-500)', marginBottom: 'var(--space-6)' }}>Əlavə suallarınız üçün bizimlə əlaqə saxlayın</p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/elaqe" className="btn btn-primary">Əlaqə saxlayın</Link>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--space-12)' }}>
      <div>
        <div style={{ fontSize: '6rem', fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-bold)', color: 'var(--color-gray-200)', lineHeight: 1, marginBottom: 'var(--space-4)' }}>404</div>
        <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-3)' }}>Səhifə Tapılmadı</h1>
        <p style={{ color: 'var(--color-gray-500)', maxWidth: '400px', margin: '0 auto var(--space-6)', lineHeight: 'var(--leading-relaxed)' }}>
          Axtardığınız səhifə mövcud deyil və ya köçürülmüş ola bilər.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">Ana səhifəyə qayıt</Link>
          <Link href="/elaqe" className="btn btn-secondary">Əlaqə saxlayın</Link>
        </div>
      </div>
    </section>
  );
}

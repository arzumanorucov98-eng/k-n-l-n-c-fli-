import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gizlilik Siyasəti',
  description: 'Dr. Könül Nəcəfli - Gizlilik siyasəti. Şəxsi məlumatların qorunması və istifadəsi haqqında.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>Gizlilik Siyasəti</span>
        </div>
      </nav>

      <section className="section">
        <div className="container container-narrow">
          <h1 style={{ marginBottom: 'var(--space-8)' }}>Gizlilik Siyasəti</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--color-gray-600)', lineHeight: 'var(--leading-relaxed)' }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>1. Ümumi Məlumat</h2>
              <p>Bu gizlilik siyasəti Dr. Könül Nəcəfli veb saytı tərəfindən toplanan, istifadə olunan və qorunan şəxsi məlumatlar haqqında məlumat verir.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>2. Toplanan Məlumatlar</h2>
              <p>Saytımız vasitəsilə aşağıdakı məlumatlar toplanıla bilər:</p>
              <ul style={{ listStyle: 'disc', paddingLeft: 'var(--space-6)', marginTop: 'var(--space-3)' }}>
                <li>Ad və soyad</li>
                <li>Telefon nömrəsi</li>
                <li>Email ünvanı</li>
                <li>Rezervasiya məlumatları</li>
                <li>Əlaqə forması vasitəsilə göndərilən mesajlar</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>3. Məlumatların İstifadəsi</h2>
              <p>Toplanan məlumatlar yalnız aşağıdakı məqsədlər üçün istifadə olunur:</p>
              <ul style={{ listStyle: 'disc', paddingLeft: 'var(--space-6)', marginTop: 'var(--space-3)' }}>
                <li>Qəbul rezervasiyalarının idarə edilməsi</li>
                <li>Pasiyentlərlə əlaqə saxlanması</li>
                <li>Xidmət keyfiyyətinin yaxşılaşdırılması</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>4. Məlumatların Qorunması</h2>
              <p>Şəxsi məlumatlarınızın qorunması üçün müasir təhlükəsizlik tədbirləri tətbiq olunur. Məlumatlar üçüncü tərəflərə satılmır və ya paylaşılmır.</p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>5. Əlaqə</h2>
              <p>Gizlilik siyasəti ilə bağlı suallarınız üçün <Link href="/elaqe" style={{ color: 'var(--color-blue)' }}>əlaqə</Link> səhifəmiz vasitəsilə bizimlə əlaqə saxlaya bilərsiniz.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

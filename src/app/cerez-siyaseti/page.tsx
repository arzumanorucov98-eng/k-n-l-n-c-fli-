import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Çərəz Siyasəti',
  description: 'Dr. Könül Nəcəfli - Çərəz (cookie) siyasəti.',
};

export default function CookiePolicyPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>Çərəz Siyasəti</span>
        </div>
      </nav>
      <section className="section">
        <div className="container container-narrow">
          <h1 style={{ marginBottom: 'var(--space-8)' }}>Çərəz Siyasəti</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--color-gray-600)', lineHeight: 'var(--leading-relaxed)' }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>Çərəzlər (Cookies) nədir?</h2>
              <p>Çərəzlər veb brauzeriniz tərəfindən cihazınızda saxlanılan kiçik mətn fayllarıdır. Onlar saytın düzgün işləməsi və istifadəçi təcrübəsinin yaxşılaşdırılması üçün istifadə olunur.</p>
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>İstifadə etdiyimiz çərəzlər</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: 'var(--space-6)' }}>
                <li><strong>Zəruri çərəzlər:</strong> Saytın əsas funksiyaları üçün lazımdır</li>
                <li><strong>Analitik çərəzlər:</strong> Saytın istifadəsini başa düşmək üçün (Google Analytics)</li>
                <li><strong>Funksional çərəzlər:</strong> Dil seçimi və istifadəçi təcrübəsi üçün</li>
              </ul>
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>Çərəzləri necə idarə edə bilərsiniz?</h2>
              <p>Brauzerinizin ayarlarından çərəzləri silə və ya blok edə bilərsiniz. Lakin bu, saytın bəzi funksiyalarına təsir edə bilər.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

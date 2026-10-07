import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'İstifadə Şərtləri',
  description: 'Dr. Könül Nəcəfli veb saytının istifadə şərtləri.',
};

export default function TermsPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>İstifadə Şərtləri</span>
        </div>
      </nav>
      <section className="section">
        <div className="container container-narrow">
          <h1 style={{ marginBottom: 'var(--space-8)' }}>İstifadə Şərtləri</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--color-gray-600)', lineHeight: 'var(--leading-relaxed)' }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>1. Ümumi Şərtlər</h2>
              <p>Bu veb saytdan istifadə etməklə siz aşağıdakı şərtləri qəbul etmiş olursunuz.</p>
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>2. Tibbi Xəbərdarlıq</h2>
              <p>Bu saytda təqdim edilən məlumatlar yalnız məlumatlandırma məqsədi daşıyır. Heç bir məlumat fərdi tibbi məsləhəti əvəz etmir. Hər hansı tibbi problemlə bağlı mütləq mütəxəssis həkimə müraciət edin.</p>
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>3. Məzmun</h2>
              <p>Saytdakı bütün məzmun Dr. Könül Nəcəfliyə aiddir. Məzmunun icazəsiz istifadəsi qadağandır.</p>
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>4. Rezervasiya</h2>
              <p>Online rezervasiya sistemi vasitəsilə edilən qeydiyyat yalnız ilkin müraciət xarakteri daşıyır. Qəbul müəyyən hallarda dəyişdirilə və ya ləğv edilə bilər.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

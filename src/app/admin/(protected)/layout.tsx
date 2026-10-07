import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If no session, they will be redirected by middleware or we can do it here:
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-gray-50)' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'var(--color-navy)', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', color: 'white' }}>Admin Panel</h2>
          <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.5)', marginTop: 'var(--space-1)' }}>Dr. Könül Nəcəfli</p>
        </div>
        
        <nav style={{ padding: 'var(--space-4) 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          {[
            { href: '/admin', icon: '📊', label: 'Dashboard' },
            { href: '/admin/doctor', icon: '👩‍⚕️', label: 'Həkim Profili' },
            { href: '/admin/appointments', icon: '📅', label: 'Rezervasiyalar' },
            { href: '/admin/services', icon: '⚕️', label: 'Xidmətlər' },
            { href: '/admin/locations', icon: '📍', label: 'Rayonlar & Cədvəl' },
            { href: '/admin/blog', icon: '📝', label: 'Blog' },
            { href: '/admin/videos', icon: '🎥', label: 'Videolar' },
            { href: '/admin/faq', icon: '❓', label: 'FAQ' },
            { href: '/admin/messages', icon: '✉️', label: 'Mesajlar' },
            { href: '/admin/settings', icon: '⚙️', label: 'Tənzimləmələr' },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ padding: 'var(--space-3) var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', transition: 'all 0.2s', borderLeft: '3px solid transparent' }}>
              <span>{item.icon}</span>
              <span style={{ fontSize: 'var(--text-sm)' }}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ padding: 'var(--space-6)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {session.user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>{session.user?.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.5)' }}>Admin</div>
            </div>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" style={{ width: '100%', padding: 'var(--space-2)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 'var(--radius-md)', color: 'white', cursor: 'pointer', fontSize: 'var(--text-sm)', transition: 'background 0.2s' }}>
              Çıxış et
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '60px', background: 'white', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', alignItems: 'center', padding: '0 var(--space-8)', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--color-navy)' }}>
            İdarəetmə Paneli
          </h1>
          <Link href="/" target="_blank" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-blue)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            Sayta bax ↗
          </Link>
        </header>
        
        <div style={{ padding: 'var(--space-8)', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}

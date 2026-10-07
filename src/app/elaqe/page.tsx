import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Əlaqə',
  description: 'Dr. Könül Nəcəfli ilə əlaqə. Telefon, WhatsApp, email, ünvan və iş saatları. Google Maps üzərindən ünvanı tapın.',
};

export default async function ContactPage() {
  const settings = await db.siteSetting.findMany();
  const getSetting = (key: string, fallback: string) => {
    const val = settings.find(s => s.key === key)?.value;
    return val || fallback;
  };

  return (
    <>
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>Əlaqə</span>
        </div>
      </nav>

      <section className={styles.heroContact}>
        <div className="container">
          <span className="section-badge">Əlaqə</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-4)' }}>Bizimlə Əlaqə</h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy)', fontWeight: '500', maxWidth: '600px', margin: '0 auto' }}>
            Dr. Könül Nəcəfli ilə əlaqə saxlayın
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Contact Info */}
            <div>
              <h2 style={{ marginBottom: 'var(--space-6)' }}>Əlaqə Məlumatları</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
                {[
                  { icon: '📞', title: 'Telefon', value: getSetting('contact_phone', 'Təyin edilməyib') },
                  { icon: '💬', title: 'WhatsApp', value: getSetting('contact_whatsapp', 'Təyin edilməyib') },
                  { icon: '📧', title: 'Email', value: getSetting('contact_email', 'Təyin edilməyib') },
                  { icon: '📍', title: 'Ünvan', value: getSetting('contact_address', 'Təyin edilməyib') },
                  { icon: '🕐', title: 'İş Saatları', value: getSetting('contact_workhours', 'Təyin edilməyib') },
                ].map((item) => (
                  <div key={item.title} className={styles.contactInfoCard}>
                    <span className={styles.contactInfoIcon}>{item.icon}</span>
                    <div>
                      <div className={styles.contactInfoTitle}>{item.title}</div>
                      <div className={styles.contactInfoValue}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Sosial Şəbəkələr</h3>
              <div className={styles.socialLinks} style={{ marginBottom: 'var(--space-8)' }}>
                {getSetting('social_instagram', '') && (
                  <a href={getSetting('social_instagram', '')} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">Instagram</a>
                )}
                {getSetting('social_tiktok', '') && (
                  <a href={getSetting('social_tiktok', '')} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">TikTok</a>
                )}
                {getSetting('social_youtube', '') && (
                  <a href={getSetting('social_youtube', '')} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">YouTube</a>
                )}
              </div>

              {/* Quick Actions */}
              <div className={styles.quickActions}>
                <a href={`tel:${getSetting('contact_phone', '')?.replace(/[^0-9+]/g, '')}`} className="btn btn-primary">Zəng et</a>
                <a href={getSetting('contact_whatsapp', '').includes('http') ? getSetting('contact_whatsapp', '') : `https://wa.me/${getSetting('contact_whatsapp', '').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">WhatsApp</a>
                <Link href="/rezervasiya" className="btn btn-accent">Rezervasiya et</Link>
              </div>
            </div>

            {/* Map + Contact Form */}
            <div>
              {/* Map */}
              {getSetting('contact_map_embed', '') ? (
                <div 
                  className={styles.mapContainer} 
                  style={{ marginBottom: 'var(--space-6)', width: '100%', height: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
                  dangerouslySetInnerHTML={{ __html: getSetting('contact_map_embed', '') }}
                />
              ) : (
                <div className={styles.mapPlaceholder} style={{ marginBottom: 'var(--space-6)' }}>
                  <div style={{ textAlign: 'center', color: 'var(--color-gray-400)' }}>
                    <span style={{ fontSize: '2rem' }}>🗺️</span>
                    <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>Google Maps<br/>Admin paneldən konfiqurasiya ediləcək</p>
                  </div>
                </div>
              )}

              {/* Contact Form */}
              <div className={styles.contactFormWrapper}>
                <h3 style={{ marginBottom: 'var(--space-4)' }}>Mesaj Göndərin</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Ad Soyad *</label>
                    <input type="text" id="contact-name" className="form-input" placeholder="Adınız və soyadınız" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form-label">Telefon *</label>
                    <input type="tel" id="contact-phone" className="form-input" placeholder="+994 XX XXX XX XX" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email</label>
                    <input type="email" id="contact-email" className="form-input" placeholder="email@example.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">Mesaj *</label>
                    <textarea id="contact-message" className="form-textarea" placeholder="Mesajınızı yazın..." required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Mesaj göndər</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

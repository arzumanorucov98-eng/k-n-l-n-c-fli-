import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_LINKS, DOCTOR_NAME, DOCTOR_TITLE } from '@/lib/constants';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          {/* Brand */}
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}>
                <Image src="/images/logo-dr-konul.jpg" alt="Dr. Könül Nəcəfli" width={50} height={50} className={styles.footerLogoImg} />
              </div>
              <div className={styles.footerLogoText}>
                <span className={styles.footerLogoName}>Dr. {DOCTOR_NAME}</span>
                <span className={styles.footerLogoTitle}>{DOCTOR_TITLE}</span>
              </div>
            </div>
            <p className={styles.footerDesc}>
              Sinir sistemi xəstəliklərinin müasir yanaşmalarla diaqnostikası və müalicəsi. Peşəkar nevroloji xidmətlər.
            </p>
            <div className={styles.footerSocial}>
              <a href="#" className={styles.socialLink} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              <a href="https://wa.me/" className={styles.socialLink} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerColumnTitle}>Keçidlər</h3>
            <div className={styles.footerLinks}>
              {FOOTER_LINKS.main.map((link) => (
                <Link key={link.href} href={link.href} className={styles.footerLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerColumnTitle}>Xidmətlər</h3>
            <div className={styles.footerLinks}>
              <Link href="/xidmetler/nevroloji-muayine" className={styles.footerLink}>Nevroloji müayinə</Link>
              <Link href="/xidmetler/migren" className={styles.footerLink}>Miqren</Link>
              <Link href="/xidmetler/bas-agrilarinin-mualicesi" className={styles.footerLink}>Baş ağrısı</Link>
              <Link href="/xidmetler/bas-gicellenmesi" className={styles.footerLink}>Başgicəllənmə</Link>
              <Link href="/xidmetler/yuxu-pozuntulari" className={styles.footerLink}>Yuxu pozuntuları</Link>
              <Link href="/xidmetler/boyun-bel-agrilari" className={styles.footerLink}>Boyun və bel ağrıları</Link>
            </div>
          </div>

          {/* Contact */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerColumnTitle}>Əlaqə</h3>
            <div className={styles.footerLinks}>
              <div className={styles.footerContactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Telefon nömrəsi admin paneldən əlavə ediləcək</span>
              </div>
              <div className={styles.footerContactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>Email admin paneldən əlavə ediləcək</span>
              </div>
              <div className={styles.footerContactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Ünvan admin paneldən əlavə ediləcək</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} Dr. {DOCTOR_NAME}. Bütün hüquqlar qorunur.
          </p>
          <div className={styles.legalLinks}>
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.href} href={link.href} className={styles.legalLink}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div style={{ maxWidth: 'var(--container-xl)', margin: '0 auto', padding: '0 var(--container-padding)' }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(148, 163, 184, 0.6)', textAlign: 'center', marginTop: 'var(--space-6)', lineHeight: '1.6' }}>
          Bu saytda təqdim edilən məlumatlar yalnız məlumatlandırma məqsədi daşıyır və fərdi tibbi məsləhəti əvəz etmir.
          Hər hansı tibbi problemlə bağlı mütəxəssis həkimə müraciət edin.
        </p>
      </div>
    </footer>
  );
}

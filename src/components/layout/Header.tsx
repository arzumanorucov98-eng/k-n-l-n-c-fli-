'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLocale] = useState<'az' | 'ru'>('az');
  const [siteData, setSiteData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/public/site-data')
      .then(res => res.json())
      .then(data => setSiteData(data))
      .catch(() => {});
  }, []);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(styles.header, isScrolled && styles.headerCompact)}
        role="banner"
      >
        <div className={styles.headerInner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Ana səhifə">
            <div className={styles.logoIcon}>
              <Image src="/images/logo-dr-konul.jpg" alt="Dr. Könül Nəcəfli" width={44} height={44} className={styles.logoImage} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}><span className={styles.desktopDr}>Dr. </span>Könül Nəcəfli</span>
              <span className={styles.logoTitle}>Nevroloq</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav} role="navigation" aria-label="Əsas naviqasiya">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  styles.navLink,
                  isActive(link.href) && styles.navLinkActive
                )}
              >
                {currentLocale === 'ru' ? link.labelRu : link.label}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className={styles.headerActions}>
            {/* Language Switch */}
            <div className={styles.langSwitch}>
              <button
                className={cn(styles.langBtn, currentLocale === 'az' && styles.langBtnActive)}
                aria-label="Azərbaycan dili"
              >
                AZ
              </button>
              <button
                className={cn(styles.langBtn, currentLocale === 'ru' && styles.langBtnActive)}
                aria-label="Rus dili"
              >
                RU
              </button>
            </div>

            {/* Header Socials */}
            <div className={styles.headerSocials}>
              {siteData?.social?.instagram && (
                <a href={siteData.social.instagram} target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', textDecoration: 'none', boxShadow: '0 2px 8px rgba(220, 39, 67, 0.3)', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              )}
              {siteData?.social?.tiktok && (
                <a href={siteData.social.tiktok} target="_blank" rel="noopener noreferrer" style={{ background: '#000000', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} aria-label="TikTok">
                  <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                </a>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={cn(styles.menuToggle, isMobileMenuOpen && styles.menuOpen)}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Menüyü bağla' : 'Menüyü aç'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.menuIcon}>
                <span className={styles.menuLine} />
                <span className={styles.menuLine} />
                <span className={styles.menuLine} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={cn(styles.mobileOverlay, isMobileMenuOpen && styles.mobileOverlayVisible)}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
        style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
      />

      {/* Mobile Menu */}
      <nav
        className={cn(styles.mobileMenu, isMobileMenuOpen && styles.mobileMenuOpen)}
        role="navigation"
        aria-label="Mobil naviqasiya"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={styles.mobileMenuHeader}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Image src="/images/logo-dr-konul.jpg" alt="Dr. Könül Nəcəfli" width={44} height={44} className={styles.logoImage} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}><span className={styles.desktopDr}>Dr. </span>Könül Nəcəfli</span>
              <span className={styles.logoTitle}>Nevroloq</span>
            </div>
          </Link>
          <button
            className={styles.mobileMenuClose}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Menüyü bağla"
          >
            ✕
          </button>
        </div>

        <div className={styles.mobileMenuNav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                styles.mobileNavLink,
                isActive(link.href) && styles.mobileNavLinkActive
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {currentLocale === 'ru' ? link.labelRu : link.label}
            </Link>
          ))}
        </div>

        <div className={styles.mobileMenuCta}>
          <Link
            href="/rezervasiya"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Qəbul üçün rezervasiya
          </Link>
        </div>

        <div className={styles.mobileMenuContact}>
          <a href={`tel:${siteData?.contact?.phone?.replace(/[^0-9+]/g, '') || ''}`} className={styles.mobileContactLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Zəng edin
          </a>
          <a href={`https://wa.me/${siteData?.contact?.whatsapp?.replace(/[^0-9]/g, '') || ''}`} target="_blank" rel="noopener noreferrer" className={styles.mobileContactLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}

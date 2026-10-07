'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    // Trigger analytics if accepted
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-label="Çərəz razılığı">
      <div className={styles.banner}>
        <span className={styles.icon} aria-hidden="true">🍪</span>
        <p className={styles.text}>
          Bu sayt istifadəçi təcrübəsini yaxşılaşdırmaq üçün çərəzlərdən istifadə edir.{' '}
          <Link href="/cerez-siyaseti">Ətraflı məlumat</Link>
        </p>
        <div className={styles.actions}>
          <button onClick={declineCookies} className="btn btn-secondary btn-sm">
            Rədd et
          </button>
          <button onClick={acceptCookies} className="btn btn-primary btn-sm">
            Qəbul et
          </button>
        </div>
      </div>
    </div>
  );
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

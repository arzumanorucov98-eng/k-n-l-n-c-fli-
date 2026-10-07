'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './MobileActionBar.module.css';

export default function MobileActionBar() {
  const [siteData, setSiteData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/public/site-data')
      .then(res => res.json())
      .then(data => setSiteData(data))
      .catch(() => {});
  }, []);

  return (
    <div className={styles.mobileBar} role="navigation" aria-label="Sürətli əlaqə">
      <div className={styles.mobileBarInner}>
        {/* Call */}
        <a href={siteData?.contact?.phone ? `tel:${siteData.contact.phone.replace(/[^0-9+]/g, '')}` : "tel:"} className={`${styles.mobileBarBtn} ${styles.btnCall}`} aria-label="Zəng edin">
          <span className={styles.mobileBarIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </span>
          <span className={styles.mobileBarLabel}>Zəng et</span>
        </a>

        {/* WhatsApp */}
        <a href={siteData?.contact?.whatsapp ? (siteData.contact.whatsapp.includes('http') ? siteData.contact.whatsapp : `https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, '')}`) : "https://wa.me/"} target="_blank" rel="noopener noreferrer" className={`${styles.mobileBarBtn} ${styles.btnWhatsapp}`} aria-label="WhatsApp ilə əlaqə">
          <span className={styles.mobileBarIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </span>
          <span className={styles.mobileBarLabel}>WhatsApp</span>
        </a>

        {/* Reservation */}
        <Link href="/rezervasiya" className={`${styles.mobileBarBtn} ${styles.btnReservation}`} aria-label="Qəbul üçün rezervasiya">
          <span className={styles.mobileBarIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
          </span>
          <span className={styles.mobileBarLabel}>Rezervasiya</span>
        </Link>
      </div>
    </div>
  );
}

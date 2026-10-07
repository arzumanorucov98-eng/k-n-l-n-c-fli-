import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import styles from './page.module.css';

export const revalidate = 60; // Revalidate every 60 seconds

import DoctorSlider from '@/components/ui/DoctorSlider';

export const metadata: Metadata = {
  title: 'Həkim haqqında',
  description: 'Dr. Könül Nəcəfli haqqında ətraflı məlumat. Nevroloq, təhsil, ixtisas, iş təcrübəsi, sertifikatlar və peşəkar fəaliyyət.',
};

const physicianSchema = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Könül Nəcəfli',
  jobTitle: 'Nevroloq',
  medicalSpecialty: 'Neurology',
  description: 'Sinir sistemi xəstəliklərinin müasir yanaşmalarla diaqnostikası və müalicəsi üzrə peşəkar nevroloq.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana səhifə', item: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' },
    { '@type': 'ListItem', position: 2, name: 'Həkim haqqında' },
  ],
};

export default async function AboutDoctorPage() {
  const [doctor, settings] = await Promise.all([
    db.doctorProfile.findFirst({ where: { locale: 'az' } }),
    db.siteSetting.findMany({ where: { key: 'contact_whatsapp' } })
  ]);
  const whatsapp = settings[0]?.value || '';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>Həkim haqqında</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--color-gray-50) 0%, var(--color-blue-pale) 100%)' }}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroPhoto}>
              <DoctorSlider 
                images={[
                  doctor?.photoUrl, 
                  doctor?.aboutPhotoUrl
                ].filter(Boolean) as string[]} 
                alt={doctor?.name || 'Dr. Könül Nəcəfli'} 
              />
            </div>
            <div className={styles.heroInfo}>
              <span className="section-badge">{doctor?.title || 'Nevroloq'}</span>
              <h1 className={styles.heroTitle}>{doctor?.name || 'Dr. Könül Nəcəfli'}</h1>
              <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-navy)', fontWeight: '500', lineHeight: 'var(--leading-relaxed)', maxWidth: '600px' }}>
                {doctor?.subtitle || 'Sinir sistemi xəstəliklərinin müasir yanaşmalarla diaqnostikası və müalicəsi üzrə peşəkar nevroloq.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bio section */}
      <section className="section">
        <div className="container container-narrow">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>Haqqında</h2>
          <div className="medical-disclaimer" style={{ marginBottom: 'var(--space-8)', textAlign: 'justify', lineHeight: '1.8' }}>
            {doctor?.bio || 'Dr. Könül Nəcəfli Azərbaycan Tibb Universitetini bitirmiş və nevrologiya ixtisası üzrə internatura keçmiş həkim-nevroloqdur. 15 ildən artıq praktik təcrübə ərzində dövlət və müxtəlif özəl tibb müəssisələrində fəaliyyət göstərmişdir. Hazırda baş ağrıları, miqren, başgicəllənmə, periferik sinir sistemi xəstəlikləri və digər nevroloji problemlərin diaqnostika və müalicəsi ilə məşğul olur. Eyni zamanda EEG (elektroensefaloqrafiya) müayinəsini aparır və nəticələrini qiymətləndirir. Peşəkar fəaliyyətinin istiqamətlərindən biri də NeyroRevergensiya metodudur və bu metodu praktik fəaliyyətində uğurla tətbiq edir. Müalicə prosesində hər bir pasiyentə fərdi yanaşmağa üstünlük verir. İnanır ki, düzgün diaqnoz, pasiyentlə etibarlı ünsiyyət və elmi əsaslara söykənən müalicə uğurlu nəticənin əsasını təşkil edir.'}
          </div>

          {/* Sections for data */}
          {[
            { title: 'Təhsil', icon: '🎓', desc: doctor?.education },
            { title: 'İş Təcrübəsi', icon: '💼', desc: doctor?.experience },
            { title: 'Sertifikatlar', icon: '📜', desc: doctor?.certificates },
            { title: 'Konfranslar və Təlimlər', icon: '🎤', desc: doctor?.conferences },
            { title: 'Tibbi Yanaşma', icon: '🔬', desc: doctor?.approach },
          ].map((section) => (
            section.desc ? (
              <div key={section.title} style={{ marginBottom: 'var(--space-8)', padding: 'var(--space-6)', background: 'var(--color-accent)', borderRadius: 'var(--radius-xl)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', color: 'var(--color-navy)' }}>
                  <span style={{ fontSize: 'var(--text-2xl)' }}>{section.icon}</span>
                  {section.title}
                </h3>
                <p style={{ color: 'var(--color-navy)', fontStyle: 'italic', fontWeight: '500', fontSize: 'var(--text-sm)', whiteSpace: 'pre-wrap' }}>{section.desc}</p>
              </div>
            ) : null
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-navy), var(--color-blue))', padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: 'var(--space-4)' }}>Qəbul üçün rezervasiya edin</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
            Dr. Könül Nəcəfli ilə peşəkar nevroloji konsultasiya üçün indi qeydiyyatdan keçin.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/rezervasiya" className="btn btn-accent btn-lg">Rezervasiya et</Link>
            <a href={whatsapp.includes('http') ? whatsapp : `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}

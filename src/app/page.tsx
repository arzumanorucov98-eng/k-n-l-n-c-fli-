'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_SERVICES, DEFAULT_BLOG_CATEGORIES } from '@/lib/constants';
import styles from './page.module.css';
import { Activity, Brain, Zap, RotateCw, Moon, Grid, Stethoscope, Dna } from 'lucide-react';

const getServiceIcon = (slug: string) => {
  const props = { size: 24, strokeWidth: 2, color: 'currentColor' };
  switch (slug) {
    case 'nevroloji-muayine': return <Stethoscope {...props} />;
    case 'bas-agrilarinin-mualicesi': return <Brain {...props} />;
    case 'migren': return <Zap {...props} />;
    case 'bas-gicellenmesi': return <RotateCw {...props} />;
    case 'boyun-bel-agrilari': return <Dna {...props} />;
    case 'yuxu-pozuntulari': return <Moon {...props} />;
    case 'sinir-sistemi-xestelikleri': return <Activity {...props} />;
    default: return <Grid {...props} />;
  }
};

// FAQ data
const homeFAQs = [
  {
    question: 'Qəbul üçün necə rezervasiya edə bilərəm?',
    answer: 'Saytımızdakı "Qəbul üçün rezervasiya" düyməsinə klikləyərək, uyğun tarix və saatı seçərək online rezervasiya edə bilərsiniz. Həmçinin telefon və ya WhatsApp vasitəsilə də bizimlə əlaqə saxlaya bilərsiniz.',
  },
  {
    question: 'Qəbul harada keçirilir?',
    answer: 'Qəbullar Bakıda və müxtəlif rayonlarda keçirilir. Dəqiq ünvan və qəbul günləri haqqında məlumat üçün "Rayonlar" bölməsinə baxın və ya bizimlə əlaqə saxlayın.',
  },
  {
    question: 'Rayonlarda qəbul olurmu?',
    answer: 'Bəli, müəyyən rayonlarda vaxtaşırı qəbullar keçirilir. Qəbul edilən rayonlar və tarixlər haqqında ətraflı məlumat üçün "Rayonlar" səhifəsinə baxın.',
  },
  {
    question: 'Qəbul müddəti nə qədərdir?',
    answer: 'İlkin nevroloji müayinə adətən 30-45 dəqiqə davam edir. Müayinənin müddəti müraciətin xarakterindən asılı olaraq fərqlənə bilər.',
  },
  {
    question: 'Rezervasiyanı necə ləğv edə bilərəm?',
    answer: 'Rezervasiyanızı ləğv etmək və ya dəyişdirmək üçün bizimlə telefon və ya WhatsApp vasitəsilə əlaqə saxlayın. Xahiş edirik ən azı 24 saat əvvəl xəbər verəsiniz.',
  },
];

export default function HomePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [siteData, setSiteData] = useState<any>(null);
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    fetch('/api/public/site-data')
      .then(res => res.json())
      .then(data => setSiteData(data))
      .catch(() => {});
  }, []);

  const doctor = siteData?.doctor;
  const contact = siteData?.contact;
  const social = siteData?.social;
  const videos = siteData?.videos || [];
  const blogPosts = siteData?.blogPosts || [];
  const services = siteData?.services || DEFAULT_SERVICES;
  const faqs = siteData?.faqs?.length > 0 ? siteData.faqs : homeFAQs;
  const locations = siteData?.locations || [];

  const heroImages = [
    doctor?.photoUrl,
    '/images/neurology_bg.jpg',
    '/images/contact_bg.jpg'
  ].filter(Boolean) as string[];

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setBgImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        
        {/* Background Layer (Composite Image) */}
        <div className={styles.heroBackgroundLayer}>
          <img src="/images/hero-composite.jpg" alt="Nevrologiya" className={styles.heroCompositeImg} />
          
          <div className={styles.doctorSignature}>
            Doktor Könül Nəcəfli
            <br />
            <span className={styles.signatureRole}>Nevroloq</span>
          </div>
          <div className={styles.heroMobileOverlay}></div>
        </div>
        
        {/* Content Layer */}
        <div className={`container ${styles.heroContentContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
              Peşəkar Nevroloji Xidmətlər
            </div>
            <h1 className={`${styles.heroTitle} ${styles.heroAccentTitle}`}>
              Daha sağlam,<br />daha xoşbəxt<br />bir həyat üçün <span>♡</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Sinir sistemi xəstəliklərinin müasir<br />yanaşmalarla diaqnostikası və müalicəsi
            </p>
            
            <div className={styles.heroCtas}>
              <Link href="/rezervasiya" className={styles.heroCtaPrimary}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                Qəbul üçün rezervasiya
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
              <Link href="/xidmetler" className={styles.heroCtaSecondary}>
                Xidmətlərə bax
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOCTOR ABOUT GALLERY REMOVED AS REQUESTED ===== */}

      {/* ===== SERVICES ===== */}
      <section className={`${styles.services} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">XİDMƏTLƏRİMİZ</span>
            <h2 className="section-title">Sizin sağlamlığınız bizim prioritetimizdir</h2>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service: any, index: number) => (
              <Link key={service.slug} href={`/xidmetler/${service.slug}`} className={styles.serviceCard}>
                <div className={styles.serviceCardIcon}>
                  {getServiceIcon(service.slug)}
                </div>
                <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                <p className={styles.serviceCardDesc}>
                  {service.shortDescription || 'Bu xidmət haqqında ətraflı məlumat admin paneldən əlavə ediləcək.'}
                </p>
                <span className={styles.serviceCardArrow}>
                  Ətraflı →
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
            <Link href="/xidmetler" className="btn btn-secondary">
              Bütün xidmətlərə bax →
            </Link>
          </div>
        </div>
      </section>


      {/* ===== LOCATIONS ===== */}
      <section className={`${styles.locations} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Rayonlar</span>
            <h2 className="section-title">Xidmət Göstərilən Rayonlar</h2>
            <p className="section-subtitle">
              Bakı və müxtəlif rayonlarda qəbul imkanı
            </p>
          </div>

          <div className={styles.locationsGrid}>
            {locations.length > 0 ? locations.map((loc: any) => (
              <Link key={loc.id} href={`/rayonlar/${loc.slug}`} className={styles.locationCard}>
                <div className={styles.locationIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className={styles.locationInfo}>
                  <h3>{loc.name}</h3>
                  <p>{loc.address || 'Qəbul məlumatı admin paneldən əlavə ediləcək'}</p>
                </div>
              </Link>
            )) : ['Bakı', 'Zaqatala', 'Qəbələ', 'Şəki', 'Balakən', 'Qax'].map((city) => (
              <Link key={city} href={`/rayonlar/${city.toLowerCase().replace(/ə/g, 'e').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ı/g, 'i').replace(/ç/g, 'c').replace(/ş/g, 's').replace(/ğ/g, 'g')}`} className={styles.locationCard}>
                <div className={styles.locationIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className={styles.locationInfo}>
                  <h3>{city}</h3>
                  <p>Qəbul məlumatı admin paneldən əlavə ediləcək</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
            <Link href="/rayonlar" className="btn btn-secondary">
              Bütün rayonlara bax →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section className={`${styles.blogPreview} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Blog</span>
            <h2 className="section-title">Nevroloji Sağlamlıq Blogu</h2>
            <p className="section-subtitle">
              Nevrologiya sahəsində faydalı məlumatlar və həkim məsləhətləri
            </p>
          </div>

          <div className={styles.blogGrid}>
            {(blogPosts.length > 0 ? blogPosts : [1, 2, 3]).map((post: any, i: number) => {
              const isRealPost = !!post?.slug;
              const CardWrapper: any = isRealPost ? Link : 'div';
              const wrapperProps = isRealPost ? { href: `/blog/${post.slug}`, title: post.title } : {};
              
              return (
                <CardWrapper key={post?.id || i} className={styles.blogCard} {...wrapperProps} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className={styles.blogCardImage}>
                    {post?.coverImage ? (
                      <img src={post.coverImage} alt={post.seoTitle || post.title || 'Nevroloji blog məqaləsi'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    )}
                  </div>
                  <div className={styles.blogCardBody}>
                    <div className={styles.blogCardMeta}>
                      <span>{post?.author || 'Dr. Könül Nəcəfli'}</span>
                      <span>•</span>
                      <span>{post?.readTime || 5} dəq oxuma</span>
                    </div>
                    <h3 className={styles.blogCardTitle}>
                      {post?.title || 'Tezliklə yeni məqalələr'}
                    </h3>
                    <p className={styles.blogCardExcerpt}>
                      {post?.excerpt || 'Bu bölmədə nevroloji sağlamlıq haqqında faydalı məlumatlar paylaşılacaq.'}
                    </p>
                  </div>
                </CardWrapper>
              );
            })}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
            <Link href="/blog" className="btn btn-secondary">
              Bütün məqalələr →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== VIDEO PREVIEW ===== */}
      <section className={`${styles.videoPreview} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Videolar</span>
            <h2 className="section-title">YouTube Videoları</h2>
            <p className="section-subtitle">
              Nevroloji sağlamlıq haqqında video məzmunlar
            </p>
          </div>

          <div className={styles.videoGrid}>
            {(videos.length > 0 ? videos : [1, 2, 3]).map((video: any, i: number) => (
              <div key={video?.id || i} className={styles.videoCard}>
                <div className={styles.videoThumbnail} style={video?.youtubeId ? { backgroundImage: `url(https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                  {video?.youtubeId ? (
                    <a href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className={styles.videoPlayBtn}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </a>
                  ) : (
                    <div className={styles.videoPlayBtn}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  )}
                </div>
                <div className={styles.videoCardBody}>
                  <h3 className={styles.videoCardTitle}>
                    {video?.title || 'Tezliklə yeni videolar'}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
            <Link href="/videolar" className="btn btn-secondary">
              Bütün videolar →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL ===== */}
      <section className={`${styles.socialSection} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Sosial media</span>
            <h2 className="section-title">Bizi İzləyin</h2>
          </div>

          <div className={styles.socialGrid}>
            <div className={styles.socialCard}>
              <div className={`${styles.socialCardIcon} ${styles.socialInstagram}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
              <h3 className={styles.socialCardTitle}>Instagram</h3>
              <p className={styles.socialCardDesc}>Instagram-da bizi izləyin, faydalı nevroloji məlumatlar əldə edin</p>
              <a href={social?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                İzlə →
              </a>
            </div>
            <div className={styles.socialCard}>
              <div className={`${styles.socialCardIcon} ${styles.socialTiktok}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </div>
              <h3 className={styles.socialCardTitle}>TikTok</h3>
              <p className={styles.socialCardDesc}>TikTok-da qısa və faydalı video məzmunlar izləyin</p>
              <a href={social?.tiktok || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                İzlə →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className={`${styles.faqSection} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">FAQ</span>
            <h2 className="section-title">Tez-tez Verilən Suallar</h2>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq: any, index: number) => (
              <div key={index} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`${styles.faqIcon} ${openFAQ === index ? styles.faqIconOpen : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className={styles.faqAnswer}>{faq.answer}</div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
            <Link href="/faq" className="btn btn-ghost">
              Bütün suallar →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className={`${styles.contactSection} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Əlaqə</span>
            <h2 className="section-title">Bizimlə Əlaqə</h2>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactItemIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div className={styles.contactItemTitle}>Telefon</div>
                  <div className={styles.contactItemValue}>{contact?.phone || 'Təyin edilməyib'}</div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactItemIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <div>
                  <div className={styles.contactItemTitle}>WhatsApp</div>
                  <div className={styles.contactItemValue}>{contact?.whatsapp || 'Təyin edilməyib'}</div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactItemIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <div className={styles.contactItemTitle}>Email</div>
                  <div className={styles.contactItemValue}>{contact?.email || 'Təyin edilməyib'}</div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactItemIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div className={styles.contactItemTitle}>Ünvan</div>
                  <div className={styles.contactItemValue}>{contact?.address || 'Təyin edilməyib'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <a href={`tel:${contact?.phone?.replace(/[^0-9+]/g, '') || ''}`} className="btn btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Zəng et
                </a>
                <a href={`https://wa.me/${contact?.whatsapp?.replace(/[^0-9]/g, '') || ''}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  WhatsApp
                </a>
                <Link href="/rezervasiya" className="btn btn-accent">
                  Rezervasiya et
                </Link>
              </div>
            </div>

            <div className={styles.contactMap}>
              {contact?.map_embed ? (
                <div 
                  style={{ width: '100%', height: '100%', minHeight: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
                  dangerouslySetInnerHTML={{ __html: contact.map_embed }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                    Google Maps<br/>Admin paneldən konfiqurasiya ediləcək
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className={`${styles.finalCta} section-lg`}>
        <div className={styles.finalCtaBg} />
        <div className="container">
          <div className={styles.finalCtaContent}>
            <h2 className={styles.finalCtaTitle}>
              Nevroloji problemləriniz üçün peşəkar dəstək alın
            </h2>
            <p className={styles.finalCtaText}>
              Dr. Könül Nəcəfli ilə qəbul üçün indi rezervasiya edin. 
              Sağlamlığınız bizim prioritetimizdir.
            </p>
            <div className={styles.finalCtaButtons}>
              <Link href="/rezervasiya" className="btn btn-accent btn-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
                Qəbul üçün rezervasiya
              </Link>
              <a href={`https://wa.me/${contact?.whatsapp?.replace(/[^0-9]/g, '') || ''}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                WhatsApp ilə əlaqə
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: homeFAQs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}

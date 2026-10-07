'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Step = 1 | 2 | 3 | 4;

export default function ReservationPage() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    service: '',
    location: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [siteData, setSiteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/site-data')
      .then(res => res.json())
      .then(data => {
        setSiteData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch site data:', err);
        setIsLoading(false);
      });
  }, []);

  const services = siteData?.services || [];
  const locations = siteData?.locations || [];
  const whatsapp = siteData?.contact?.whatsapp?.replace(/[^0-9]/g, '') || '';

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent double submit
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/public/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: formData.service,
          locationId: formData.location,
          date: formData.date,
          time: formData.time,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          notes: formData.notes
        }),
      });

      if (!res.ok) {
        throw new Error('Xəta baş verdi');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('Rezervasiya edərkən xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
          <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
            <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-gray-600)' }}>Rezervasiya</span>
          </div>
        </nav>

        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ width: '80px', height: '80px', margin: '0 auto var(--space-6)', borderRadius: '50%', background: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy)', marginBottom: 'var(--space-4)' }}>Rezervasiyanız Qəbul Edildi!</h1>
            <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)', lineHeight: 'var(--leading-relaxed)' }}>
              Təşəkkür edirik, {formData.firstName}. Rezervasiyanız uğurla qeydə alındı. Tezliklə sizinlə əlaqə saxlanılacaq.
            </p>
            <div style={{ padding: 'var(--space-6)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-100)', textAlign: 'left', marginBottom: 'var(--space-6)' }}>
              <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)' }}>Rezervasiya Detalları</h3>
              <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                {formData.service && <div><strong>Xidmət:</strong> {services.find((s: any) => s.id === formData.service)?.title}</div>}
                {formData.location && <div><strong>Rayon:</strong> {locations.find((l: any) => l.id === formData.location)?.name}</div>}
                {formData.date && <div><strong>Tarix:</strong> {formData.date}</div>}
                {formData.time && <div><strong>Saat:</strong> {formData.time}</div>}
                <div><strong>Ad:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>Telefon:</strong> {formData.phone}</div>
                {formData.email && <div><strong>Email:</strong> {formData.email}</div>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
              <Link href="/" className="btn btn-secondary">Ana səhifə</Link>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">WhatsApp ilə əlaqə</a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <nav aria-label="Breadcrumb" style={{ background: 'var(--color-gray-50)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-400)' }}>
          <Link href="/" style={{ color: 'var(--color-blue)' }}>Ana səhifə</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-600)' }}>Rezervasiya</span>
        </div>
      </nav>

      <style>{`
        .steps-container {
          display: flex;
          justify-content: center;
          gap: var(--space-2);
          margin-bottom: var(--space-10);
        }
        @media (max-width: 768px) {
          .steps-container {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: var(--space-2);
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .steps-container::-webkit-scrollbar {
            display: none;
          }
          .step-label {
            display: none;
          }
          .step-label.active {
            display: inline;
          }
          .step-connector {
            width: 20px !important;
          }
        }
      `}</style>

      <section style={{ 
        background: 'linear-gradient(rgba(11, 35, 65, 0.8), rgba(11, 35, 65, 0.9)), url("/images/contact_bg.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 'var(--space-12) 0', 
        textAlign: 'center' 
      }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', color: 'var(--color-white)', marginBottom: 'var(--space-3)' }}>
            Qəbul üçün Rezervasiya
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 'var(--text-lg)' }}>
            Dr. Könül Nəcəfli ilə qəbul üçün uyğun vaxtı seçin
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Progress Steps */}
          <div className="steps-container">
            {[
              { num: 1, label: 'Xidmət & Rayon' },
              { num: 2, label: 'Tarix & Saat' },
              { num: 3, label: 'Məlumatlar' },
              { num: 4, label: 'Təsdiq' },
            ].map((s, i) => (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                  background: step >= s.num ? 'linear-gradient(135deg, var(--color-blue), var(--color-navy-light))' : 'var(--color-gray-100)',
                  color: step >= s.num ? 'white' : 'var(--color-gray-400)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)',
                  transition: 'all 0.3s ease'
                }}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className={`step-label ${step === s.num ? 'active' : ''}`} style={{ fontSize: 'var(--text-sm)', color: step >= s.num ? 'var(--color-navy)' : 'var(--color-gray-400)', fontWeight: step === s.num ? 'var(--font-semibold)' : 'var(--font-normal)', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
                {i < 3 && <div className="step-connector" style={{ width: '40px', height: '2px', background: step > s.num ? 'var(--color-blue)' : 'var(--color-gray-200)', margin: '0 var(--space-2)', flexShrink: 0 }} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ padding: 'var(--space-8)', background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-gray-100)', boxShadow: 'var(--shadow-card)' }}>

              {/* Step 1: Service & Location */}
              {step === 1 && (
                <div>
                  <h2 style={{ marginBottom: 'var(--space-6)' }}>Xidmət və Rayon Seçin</h2>
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">Xidmət *</label>
                    <select id="service" className="form-input" value={formData.service} onChange={(e) => updateField('service', e.target.value)} required style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3e%3cpath fill=\'none\' stroke=\'%23343a40\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m2 5 6 6 6-6\'/%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px 12px', paddingRight: '40px' }}>
                      <option value="">Xidmət seçin</option>
                      {services.map((s: any) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="location" className="form-label">Rayon *</label>
                    <select id="location" className="form-input" value={formData.location} onChange={(e) => updateField('location', e.target.value)} required style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3e%3cpath fill=\'none\' stroke=\'%23343a40\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m2 5 6 6 6-6\'/%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px 12px', paddingRight: '40px' }}>
                      <option value="">Rayon seçin</option>
                      {locations.map((l: any) => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                    <button type="button" className="btn btn-primary" onClick={() => { if (formData.service && formData.location) setStep(2); }} disabled={!formData.service || !formData.location}>
                      Davam et →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div>
                  <h2 style={{ marginBottom: 'var(--space-6)' }}>Tarix və Saat Seçin</h2>
                  <div className="form-group">
                    <label htmlFor="date" className="form-label">Tarix *</label>
                    <input type="date" id="date" className="form-input" value={formData.date} onChange={(e) => updateField('date', e.target.value)} min={new Date().toISOString().split('T')[0]} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time" className="form-label">Saat *</label>
                    <select id="time" className="form-input" value={formData.time} onChange={(e) => updateField('time', e.target.value)} required style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3e%3cpath fill=\'none\' stroke=\'%23343a40\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m2 5 6 6 6-6\'/%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px 12px', paddingRight: '40px' }}>
                      <option value="">Saat seçin</option>
                      {['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <p className="form-hint">Mövcud saatlar tarix və rayon seçildikdən sonra avtomatik yenilənəcək</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>← Geri</button>
                    <button type="button" className="btn btn-primary" onClick={() => { if (formData.date && formData.time) setStep(3); }} disabled={!formData.date || !formData.time}>
                      Davam et →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Patient Info */}
              {step === 3 && (
                <div>
                  <h2 style={{ marginBottom: 'var(--space-6)' }}>Məlumatlarınız</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">Ad *</label>
                      <input type="text" id="firstName" className="form-input" placeholder="Adınız" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">Soyad *</label>
                      <input type="text" id="lastName" className="form-input" placeholder="Soyadınız" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Telefon *</label>
                    <input type="tel" id="phone" className="form-input" placeholder="+994 XX XXX XX XX" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-input" placeholder="email@example.com" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="notes" className="form-label">Qeyd</label>
                    <textarea id="notes" className="form-textarea" placeholder="Əlavə qeyd (şikayətlər, əvvəlki müalicə və s.)" value={formData.notes} onChange={(e) => updateField('notes', e.target.value)} style={{ minHeight: '80px' }}></textarea>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)', marginBottom: 'var(--space-4)' }}>
                    Məlumatlarınız yalnız qəbul məqsədi ilə istifadə olunacaq. <Link href="/gizlilik-siyaseti" style={{ color: 'var(--color-blue)' }}>Gizlilik Siyasəti</Link>
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>← Geri</button>
                    <button type="button" className="btn btn-primary" onClick={() => { if (formData.firstName && formData.lastName && formData.phone) setStep(4); }} disabled={!formData.firstName || !formData.lastName || !formData.phone}>
                      Davam et →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div>
                  <h2 style={{ marginBottom: 'var(--space-6)' }}>Rezervasiyanı Təsdiqləyin</h2>
                  <div style={{ padding: 'var(--space-6)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-6)', display: 'grid', gap: 'var(--space-3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-gray-500)' }}>Xidmət:</span>
                      <strong>{services.find((s: any) => s.id === formData.service)?.title}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-gray-500)' }}>Rayon:</span>
                      <strong>{locations.find((l: any) => l.id === formData.location)?.name}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-gray-500)' }}>Tarix:</span>
                      <strong>{formData.date}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-gray-500)' }}>Saat:</span>
                      <strong>{formData.time}</strong>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-200)', margin: 'var(--space-2) 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-gray-500)' }}>Ad Soyad:</span>
                      <strong>{formData.firstName} {formData.lastName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-gray-500)' }}>Telefon:</span>
                      <strong>{formData.phone}</strong>
                    </div>
                    {formData.email && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-gray-500)' }}>Email:</span>
                        <strong>{formData.email}</strong>
                      </div>
                    )}
                    {formData.notes && (
                      <div>
                        <span style={{ color: 'var(--color-gray-500)' }}>Qeyd:</span>
                        <p style={{ marginTop: 'var(--space-1)' }}>{formData.notes}</p>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(3)}>← Geri</button>
                    <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                      {isSubmitting ? 'Göndərilir...' : 'Rezervasiyanı Təsdiqlə ✓'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </form>
        </div>
      </section>
    </>
  );
}

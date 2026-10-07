'use client';

import { useState, useEffect } from 'react';
import styles from './DoctorSlider.module.css';

interface DoctorSliderProps {
  images: string[];
  alt: string;
}

export default function DoctorSlider({ images, alt }: DoctorSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out any empty strings
  const validImages = images.filter(img => img && img.trim() !== '');

  useEffect(() => {
    if (validImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [validImages.length]);

  if (validImages.length === 0) {
    return (
      <div className={styles.placeholder}>
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-3)' }}>Şəkil yoxdur</p>
      </div>
    );
  }

  return (
    <div className={styles.sliderContainer}>
      {validImages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`${alt} - ${index + 1}`}
          className={`${styles.image} ${index === currentIndex ? styles.active : ''}`}
        />
      ))}
      
      {validImages.length > 1 && (
        <div className={styles.dots}>
          {validImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

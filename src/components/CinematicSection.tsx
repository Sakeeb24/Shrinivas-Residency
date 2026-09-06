import React, { useEffect, useRef, useState } from 'react';
import { hotelImages } from '../data/hotel';

const CinematicSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const [visible, setVisible] = useState(false);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > windowH) return;

      const progress = 1 - (rect.bottom / (windowH + rect.height));
      const offset = progress * 80 - 40; // -40 to +40px
      bgRef.current.style.transform = `translateY(${offset}px) scale(1.12)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Cinematic property showcase"
      style={{
        position: 'relative',
        height: '520px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Background ──────────────────────────────────── */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-10%',
          transition: 'transform 0.1s linear',
          willChange: 'transform',
          transform: 'scale(1.12)',
        }}
        aria-hidden="true"
      >
        {!imgError ? (
          <img
            src={hotelImages.cinematic}
            alt=""
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.65)',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(145deg, #0B1F2A 0%, #1A3A4A 50%, #0D2535 100%)',
            }}
          />
        )}
      </div>

      {/* ── Gradient Overlay ────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(11,31,42,0.4) 0%, rgba(11,31,42,0.6) 100%)',
        }}
      />

      {/* ── Content ─────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '0 1.5rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        {/* Decorative top line */}
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '3rem',
              height: '1px',
              background: 'rgba(201,154,62,0.6)',
            }}
          />
          <span
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C99A3E',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
            }}
          >
            Experience
          </span>
          <span
            style={{
              display: 'block',
              width: '3rem',
              height: '1px',
              background: 'rgba(201,154,62,0.6)',
            }}
          />
        </div>

        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '1rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}
        >
          Your Stay,
          <br />
          <span
            style={{
              color: '#C99A3E',
              fontStyle: 'italic',
            }}
          >
            Your Comfort
          </span>
        </h2>

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '420px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          A welcoming home away from home in the heart of Bagalkot.
        </p>
      </div>
    </section>
  );
};

export default CinematicSection;

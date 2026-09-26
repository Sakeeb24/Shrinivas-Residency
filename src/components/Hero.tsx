import React, { useState } from 'react';
import { Phone, Calendar, MapPin, ChevronDown, Star } from 'lucide-react';
import { hotel, formatPhone } from '../data/hotel';
import { useMouseParallax } from '../hooks/use3D';

const Hero: React.FC = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const mouse = useMouseParallax(14); // subtle mouse camera parallax

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    const introSection = document.querySelector('#introduction') || document.querySelector('#about');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckAvailability = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hotel.bookingUrl) {
      window.open(hotel.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  const handleScrollDown = () => {
    const introSection = document.querySelector('#introduction') || document.querySelector('#about');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Welcome to Shrinivas Residency"
      className="perspective-1500"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#111417',
      }}
    >
      {/* ── Layer 1: Real Property Hero Photography (Dolly / Parallax) ─ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-5%',
          width: '110%',
          height: '110%',
          zIndex: 0,
          overflow: 'hidden',
          transform: `translate3d(${-mouse.x * 0.3}px, ${-mouse.y * 0.3}px, 0)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {!imgError ? (
          <img
            src={hotel.heroImage}
            alt="Shrinivas Residency property entrance in Navanagar Bagalkot"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className="animate-cinematic-dolly"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 42%',
              opacity: imgLoaded ? 1 : 0.4,
              transition: 'opacity 1s ease',
              filter: 'brightness(0.85) contrast(1.05)',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #111417 0%, #1E2328 100%)',
            }}
          />
        )}
      </div>

      {/* ── Layer 2: Cinematic Atmosphere & Vignette Depth ─────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: `
            linear-gradient(to right, rgba(17, 20, 23, 0.94) 0%, rgba(17, 20, 23, 0.72) 48%, rgba(17, 20, 23, 0.4) 100%),
            linear-gradient(to top, rgba(17, 20, 23, 0.92) 0%, transparent 40%),
            linear-gradient(to bottom, rgba(17, 20, 23, 0.65) 0%, transparent 25%)
          `,
        }}
      />

      {/* ── Layer 3: Main Editorial Content & 3D Spatial Plaque ─── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: '7.5rem 1.5rem 5rem',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
          transform: `translate3d(${mouse.x * 0.4}px, ${mouse.y * 0.4}px, 0)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="hero-grid-desktop"
      >
        {/* Left-Aligned Headline & Story */}
        <div style={{ maxWidth: '700px' }}>
          {/* Eyebrow */}
          <div
            className="section-eyebrow section-eyebrow-dark hero-anim-eyebrow"
            style={{ marginBottom: '1.25rem' }}
          >
            <span>WELCOME TO THE RESIDENCY</span>
          </div>

          {/* Main Headline (Section 8 Hierarchy) */}
          <h1
            className="headline-serif hero-anim-title"
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.6)',
              textTransform: 'uppercase',
            }}
          >
            SHRINIVAS
            <br />
            <span style={{ color: 'var(--color-gold-light)', fontStyle: 'italic' }}>
              RESIDENCY
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            className="hero-anim-subtitle"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.92)',
              lineHeight: 1.6,
              fontWeight: 400,
              marginBottom: '1.25rem',
              maxWidth: '560px',
              textShadow: '0 1px 10px rgba(0,0,0,0.5)',
            }}
          >
            Comfortable stays in Bagalkot
          </p>

          {/* Location Information Badge */}
          <div
            className="hero-anim-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '2.25rem',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            }}
          >
            <MapPin size={14} color="var(--color-gold)" strokeWidth={2} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              NAVANAGAR · BAGALKOT
            </span>
          </div>

          {/* Primary & Secondary CTAs */}
          <div
            className="hero-anim-cta"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <a
              href="#introduction"
              onClick={handleExplore}
              className="btn-gold-solid"
              style={{
                padding: '1rem 2.25rem',
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
              }}
            >
              Explore The Residency
            </a>

            <a
              href="#contact"
              onClick={handleCheckAvailability}
              className="btn-outline-light"
              style={{
                padding: '1rem 2rem',
                fontSize: '0.85rem',
              }}
            >
              <Calendar size={15} color="var(--color-gold)" />
              Check Availability
            </a>
          </div>
        </div>

        {/* ── Right-Side 3D Floating Plaque (Desktop Entrance Card) ─ */}
        <div
          className="hero-floating-card-desktop"
          style={{
            display: 'none',
            justifyContent: 'flex-end',
            transform: `translate3d(${mouse.x * 0.8}px, ${mouse.y * 0.8}px, 30px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          <div
            className="floating-glass-plate"
            style={{
              padding: '2rem',
              maxWidth: '360px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--color-gold)',
                  backgroundColor: 'rgba(197, 168, 128, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                SR
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    display: 'block',
                  }}
                >
                  Shrinivas Residency
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    color: 'var(--color-gold-light)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  Police Palace Circle
                </span>
              </div>
            </div>

            {/* Verified Rating Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={13} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                4.5 / 5
              </span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                ({hotel.reviewCount} Reviews)
              </span>
            </div>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
              Dedicated front desk and comfortable accommodations for business and leisure in Bagalkot.
            </p>

            <a
              href="tel:+918354350125"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-gold-light)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                paddingTop: '1rem',
              }}
            >
              <Phone size={14} color="var(--color-gold)" />
              {formatPhone(hotel.phonePrimary)}
            </a>
          </div>
        </div>
      </div>

      {/* ── Layer 4: Discreet Scroll Indicator at Bottom ─────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
          cursor: 'pointer',
        }}
        onClick={handleScrollDown}
        role="button"
        tabIndex={0}
        aria-label="Scroll to discover Shrinivas Residency"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleScrollDown(); }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.62rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.65)',
          }}
        >
          Explore Property
        </span>
        <div className="animate-indicator-bounce">
          <ChevronDown size={18} color="var(--color-gold)" strokeWidth={2} />
        </div>
      </div>

      {/* Responsive layout styles */}
      <style>{`
        @media (min-width: 992px) {
          .hero-grid-desktop {
            grid-template-columns: 1.4fr 1fr !important;
          }
          .hero-floating-card-desktop {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

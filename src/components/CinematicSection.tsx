import React, { useState } from 'react';
import { hotelImages } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';
import { useParallax } from '../hooks/use3D';

const CinematicSection: React.FC = () => {
  useScrollReveal();
  const [imgError, setImgError] = useState(false);
  const { elementRef, offset } = useParallax(0.18);

  return (
    <section
      ref={elementRef}
      aria-label="Atmospheric hotel showcase"
      style={{
        position: 'relative',
        height: '560px',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111417',
      }}
      className="perspective-1000"
    >
      {/* ── Parallax Background Photography (Section 12) ──── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-15%',
          left: 0,
          right: 0,
          height: '130%',
          zIndex: 0,
          transform: `translate3d(0, ${offset}px, 0) scale(1.05)`,
          transition: 'transform 0.1s linear',
          willChange: 'transform',
        }}
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
              objectPosition: 'center center',
              filter: 'brightness(0.75) contrast(1.06)',
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

      {/* ── Subtle Translucent Shading & Vignette ─────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `
            linear-gradient(to bottom, rgba(17, 20, 23, 0.5) 0%, rgba(17, 20, 23, 0.65) 100%),
            radial-gradient(ellipse at center, rgba(17, 20, 23, 0.15) 0%, rgba(17, 20, 23, 0.75) 100%)
          `,
        }}
      />

      {/* ── 3D Floating Minimal Editorial Statement ─────────── */}
      <div
        className="reveal-hidden preserve-3d"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '840px',
          transform: 'translateZ(35px)',
        }}
      >
        {/* Small Label */}
        <div
          className="section-eyebrow section-eyebrow-dark with-lines"
          style={{ justifyContent: 'center', marginBottom: '1.25rem' }}
        >
          <span>A PHYSICAL SANCTUARY</span>
        </div>

        {/* Large Statement as specified in Section 16 */}
        <h2
          className="headline-serif"
          style={{
            fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '0.04em',
            textShadow: '0 4px 35px rgba(0, 0, 0, 0.65)',
            textTransform: 'uppercase',
          }}
        >
          ARRIVE.
          <br />
          UNWIND.
          <br />
          <span style={{ color: 'var(--color-gold-light)', fontStyle: 'italic' }}>
            STAY.
          </span>
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.85)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: '1.5rem',
            fontWeight: 500,
          }}
        >
          Navanagar · Bagalkot · Karnataka
        </p>
      </div>
    </section>
  );
};

export default CinematicSection;

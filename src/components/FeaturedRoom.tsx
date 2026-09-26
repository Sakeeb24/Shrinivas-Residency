import React, { useState } from 'react';
import { Check, Calendar, Sparkles } from 'lucide-react';
import { featuredRoomDetails, hotel } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';
import { use3DTilt } from '../hooks/use3D';

const FeaturedRoom: React.FC = () => {
  useScrollReveal();
  const [imgError, setImgError] = useState(false);
  const { ref: tiltRef, style: tiltStyle, glare, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLDivElement>(6, 1200);

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

  return (
    <section
      aria-label="Featured room details and comfort experience"
      style={{
        padding: '2rem 1.5rem 6.5rem',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
        }}
      >
        <div
          ref={tiltRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="reveal-hidden perspective-1000 preserve-3d"
          style={{
            ...tiltStyle,
            backgroundColor: 'var(--color-surface-cream)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'stretch',
            boxShadow: 'var(--shadow-3d-card)',
            position: 'relative',
          }}
        >
          {/* Subtle Glare reflection */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 60%)`,
              transition: 'opacity 0.2s ease-out',
              zIndex: 10,
            }}
          />

          {/* ── Magazine Photo Showcase ──────────────────────── */}
          <div
            style={{
              position: 'relative',
              minHeight: '380px',
              height: '100%',
              overflow: 'hidden',
              backgroundColor: '#1E2328',
            }}
          >
            {!imgError ? (
              <img
                src={featuredRoomDetails.image}
                alt="Wide view of comfortable guest room interior at Shrinivas Residency"
                loading="lazy"
                onError={() => setImgError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.8s ease',
                }}
                className="featured-room-img"
              />
            ) : (
              <div
                className="img-placeholder-hotel"
                style={{ width: '100%', height: '100%', minHeight: '380px' }}
              >
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Room Interior Feature
                </span>
              </div>
            )}

            {/* 3D Floating Editorial Badge */}
            <div
              className="layer-z-30 floating-glass-plate"
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                padding: '0.45rem 0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                zIndex: 5,
              }}
            >
              <Sparkles size={12} color="var(--color-gold)" />
              Guest Living Standard
            </div>
          </div>

          {/* ── Editorial Text & Highlights ───────────────────── */}
          <div
            style={{
              padding: 'clamp(2rem, 5vw, 3.75rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            className="layer-z-10"
          >
            <div className="section-eyebrow" style={{ marginBottom: '0.85rem' }}>
              <span>{featuredRoomDetails.label}</span>
            </div>

            {/* Headline: COMFORT IN THE DETAILS */}
            <h3
              className="headline-serif"
              style={{
                fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
                color: 'var(--color-charcoal)',
                lineHeight: 1.2,
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em',
              }}
            >
              {featuredRoomDetails.headline}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.96rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.75,
                marginBottom: '1.75rem',
              }}
            >
              {featuredRoomDetails.description}
            </p>

            <span className="gold-hairline" style={{ marginBottom: '1.75rem' }} />

            {/* Highlighted Elements Grid (Section 10) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '1rem',
                marginBottom: '2.25rem',
              }}
            >
              {featuredRoomDetails.highlights.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    color: 'var(--color-charcoal)',
                    fontWeight: 500,
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-gold-bg)',
                      border: '1px solid var(--color-gold-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={12} color="var(--color-gold-dark)" strokeWidth={2.5} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Availability Action */}
            <div>
              <a
                href="#contact"
                onClick={handleCheckAvailability}
                className="btn-charcoal-solid"
              >
                <Calendar size={15} color="var(--color-gold)" />
                Inquire About Rooms
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        div:hover .featured-room-img {
          transform: scale(1.03);
        }
      `}</style>
    </section>
  );
};

export default FeaturedRoom;

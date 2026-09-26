import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Building2 } from 'lucide-react';
import { hotelImages } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';
import { use3DTilt } from '../hooks/use3D';

const About: React.FC = () => {
  useScrollReveal();
  const [imgError, setImgError] = useState(false);
  const { ref: tiltRef, style: tiltStyle, glare, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLDivElement>(8, 1100);
  const { ref: secRef, style: secStyle, handleMouseMove: secMouseMove, handleMouseLeave: secMouseLeave } = use3DTilt<HTMLDivElement>(12, 900);

  const handleDiscover = (e: React.MouseEvent) => {
    e.preventDefault();
    const roomsSection = document.querySelector('#rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="introduction"
      aria-label="About Shrinivas Residency"
      style={{
        padding: '7.5rem 1.5rem',
        backgroundColor: 'var(--color-canvas)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Anchor for #about compatibility */}
      <div id="about" style={{ position: 'absolute', top: 0, left: 0 }} />

      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4.5rem',
          alignItems: 'center',
        }}
      >
        {/* ── Left Column: Overlapping Spatial Photo Composition (Section 11) ─ */}
        <div className="reveal-hidden perspective-1000" style={{ position: 'relative' }}>
          {/* Primary Photograph Card */}
          <div
            ref={tiltRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              ...tiltStyle,
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-3d-card)',
              border: '1px solid var(--color-border-subtle)',
              aspectRatio: '4 / 3.6',
              backgroundColor: 'var(--color-surface-cream)',
              cursor: 'pointer',
            }}
            className="preserve-3d"
          >
            {!imgError ? (
              <img
                src={hotelImages.about}
                alt="Well-lit guest corridor and welcoming interiors at Shrinivas Residency"
                loading="lazy"
                onError={() => setImgError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            ) : (
              <div
                className="img-placeholder-hotel"
                style={{ width: '100%', height: '100%', minHeight: '380px' }}
              >
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Shrinivas Residency Interior
                </span>
              </div>
            )}

            {/* Subtle Interactive 3D Light Glare Layer */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 60%)`,
                transition: 'opacity 0.2s ease-out',
                zIndex: 4,
              }}
            />

            {/* 3D Floating Location Plaque */}
            <div
              className="layer-z-30 floating-glass-plate"
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                padding: '0.55rem 0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                zIndex: 5,
              }}
            >
              <Sparkles size={13} color="var(--color-gold)" />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                }}
              >
                Sector 35 · Bagalkot
              </span>
            </div>

            {/* Photographic Bottom Gradient & Details */}
            <div
              className="layer-z-20"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.5rem',
                background: 'linear-gradient(to top, rgba(17, 20, 23, 0.85) 0%, transparent 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 3,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                }}
              >
                Corridors & Guest Spaces
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.68rem',
                  color: 'var(--color-gold-light)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                }}
              >
                Plot No. 15-D
              </span>
            </div>
          </div>

          {/* Secondary Overlapping Floating Photograph (Section 11) */}
          <div
            ref={secRef}
            onMouseMove={secMouseMove}
            onMouseLeave={secMouseLeave}
            className="about-secondary-photo preserve-3d"
            style={{
              ...secStyle,
              position: 'absolute',
              bottom: '-2rem',
              right: '-1.5rem',
              width: '210px',
              height: '155px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.95)',
              boxShadow: 'var(--shadow-3d-hover)',
              zIndex: 7,
              backgroundColor: '#1E2328',
              cursor: 'pointer',
            }}
          >
            <img
              src={hotelImages.exterior[0]}
              alt="Exterior multi-storey building facade of Shrinivas Residency"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(17, 20, 23, 0.75) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '0.65rem 0.85rem',
                color: '#FFFFFF',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.62rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <Building2 size={11} color="var(--color-gold)" />
                Property Facade
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Column: Editorial Hospitality Storytelling (Section 10) ─ */}
        <div className="reveal-hidden" style={{ maxWidth: '580px' }}>
          {/* Small Label */}
          <div className="section-eyebrow" style={{ marginBottom: '1rem' }}>
            <span>A STAY IN BAGALKOT</span>
          </div>

          {/* Exact Headline from Section 10 */}
          <h2
            className="headline-serif"
            style={{
              fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
              color: 'var(--color-charcoal)',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            A comfortable stay,
            <br />
            <span style={{ color: 'var(--color-gold-dark)', fontStyle: 'italic' }}>
              in the heart of Bagalkot.
            </span>
          </h2>

          <span className="gold-hairline" style={{ marginBottom: '1.75rem' }} />

          {/* Body Copy as specified in Section 10 */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
              marginBottom: '1.25rem',
              fontWeight: 400,
            }}
          >
            Shrinivas Residency provides a convenient and welcoming stay in Navanagar, Bagalkot, with comfortable rooms and easy access to the surrounding city.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.92rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.75,
              marginBottom: '2rem',
            }}
          >
            Positioned near Police Palace Circle, our residency is thoughtfully managed to provide travellers with dependable comfort, hygienic facilities, and warm, attentive care. Whether visiting for business, family occasions, or regional transit, our premises offer a quiet sanctuary.
          </p>

          {/* Key Attributes */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.85rem 1.5rem',
              marginBottom: '2.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            {[
              'Clean, well-maintained rooms',
              'Easy access to main roads',
              'Front desk reception support',
              'Peaceful residential locale',
            ].map((point) => (
              <div
                key={point}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 500,
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-gold-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={11} color="var(--color-gold-dark)" strokeWidth={2.5} />
                </div>
                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* Editorial Link: Discover Shrinivas Residency → */}
          <a
            href="#rooms"
            onClick={handleDiscover}
            className="link-editorial"
            aria-label="Discover Shrinivas Residency accommodation"
          >
            Explore Accommodations
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;


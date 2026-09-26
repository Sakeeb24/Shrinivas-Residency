import React from 'react';
import { MapPin, Navigation, Phone, Compass } from 'lucide-react';
import { hotel } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';
import { use3DTilt } from '../hooks/use3D';

const Location: React.FC = () => {
  useScrollReveal();
  const { ref: cardRef, style: cardStyle, glare, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLDivElement>(5, 1100);

  return (
    <section
      id="location"
      aria-label="Property location and directions"
      style={{
        padding: '7.5rem 1.5rem',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* ── Section Header ───────────────────────────────── */}
        <div className="reveal-hidden" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-eyebrow with-lines" style={{ justifyContent: 'center' }}>
            <span>FIND US</span>
          </div>

          <h2
            className="headline-serif"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: 'var(--color-charcoal)',
              marginBottom: '0.85rem',
            }}
          >
            Finding Shrinivas Residency
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--color-text-muted)',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            Centrally situated at Police Palace Circle, Sector 35, Navanagar, Bagalkot.
          </p>

          <span className="gold-hairline gold-hairline-center" style={{ marginTop: '1.25rem' }} />
        </div>

        {/* ── Split-Screen 3D Location Section (Section 15) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
          }}
          className="perspective-1000"
        >
          {/* ── LEFT: Large Embedded Google Maps Area ───────── */}
          <div
            className="reveal-hidden"
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: 'var(--shadow-3d-card)',
              minHeight: '450px',
              backgroundColor: 'var(--color-surface-cream)',
              position: 'relative',
            }}
          >
            {hotel.mapEmbedUrl ? (
              <iframe
                src={hotel.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  display: 'block',
                  minHeight: '450px',
                  filter: 'saturate(0.95)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shrinivas Residency Google Maps location in Bagalkot"
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <MapPin size={32} color="var(--color-gold-dark)" style={{ marginBottom: '1rem' }} />
                <h3 className="headline-serif" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Interactive Map
                </h3>
                <a
                  href="https://maps.google.com/?q=5M59%2B52+Bagalkot%2C+Karnataka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-solid"
                  style={{ marginTop: '1rem' }}
                >
                  <Navigation size={14} />
                  Open in Google Maps
                </a>
              </div>
            )}
          </div>

          {/* ── RIGHT: Verified Address Plinth (Section 15) ─── */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="reveal-hidden preserve-3d"
            style={{
              ...cardStyle,
              backgroundColor: 'var(--color-surface-cream)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(2rem, 4vw, 3rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-3d-card)',
              position: 'relative',
              overflow: 'hidden',
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
                zIndex: 4,
              }}
            />

            <div className="layer-z-20">
              <div className="section-eyebrow" style={{ marginBottom: '0.75rem' }}>
                <span>NAVANAGAR · BAGALKOT</span>
              </div>

              {/* Exact Headline as specified in Section 15 */}
              <h3
                className="headline-serif"
                style={{
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                  color: 'var(--color-charcoal)',
                  marginBottom: '1.25rem',
                }}
              >
                FIND US IN NAVANAGAR
              </h3>

              <span className="gold-hairline" style={{ marginBottom: '1.5rem' }} />

              {/* Verified Address Block */}
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  marginBottom: '1.75rem',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  }}
                >
                  <MapPin size={18} color="var(--color-gold-dark)" strokeWidth={1.8} />
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'var(--color-charcoal)',
                    lineHeight: 1.65,
                  }}
                >
                  <p style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>Plot No. 15-D</p>
                  <p>Sector No. 35</p>
                  <p>Police Palace Circle</p>
                  <p>Navanagar</p>
                  <p style={{ fontWeight: 500 }}>Bagalkot, Karnataka — 587103</p>
                </div>
              </div>

              {/* Plus Code Block */}
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '0.95rem 1.15rem',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '2rem',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                <Compass size={18} color="var(--color-gold-dark)" strokeWidth={1.8} />
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      display: 'block',
                      lineHeight: 1,
                      marginBottom: '2px',
                    }}
                  >
                    Google Plus Code
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--color-charcoal)',
                    }}
                  >
                    5M59+52 Bagalkot, Karnataka
                  </span>
                </div>
              </div>
            </div>

            {/* ── Actions: Open in Google Maps & Call Property ─── */}
            <div
              className="layer-z-20"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--color-border-subtle)',
              }}
            >
              {/* Primary Action: Open in Google Maps */}
              <a
                href="https://maps.google.com/?q=5M59%2B52+Bagalkot%2C+Karnataka"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-solid"
                style={{ flex: 1, minWidth: '170px', justifyContent: 'center' }}
              >
                <Navigation size={15} />
                Open in Google Maps
              </a>

              {/* Secondary Action: Call the Property */}
              <a
                href="tel:+918354350125"
                className="btn-outline-dark"
                style={{ flex: 1, minWidth: '170px', justifyContent: 'center' }}
              >
                <Phone size={15} color="var(--color-charcoal)" />
                Call the Property
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

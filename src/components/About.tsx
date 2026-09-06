import React, { useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { hotel, formatPhone, hotelImages } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';

const About: React.FC = () => {
  useScrollReveal();
  const [imgError, setImgError] = useState(false);

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hotel.bookingUrl) {
      window.open(hotel.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      style={{ padding: '6rem 1.5rem', backgroundColor: '#FAF8F3' }}
      aria-label="About Shrinivas Residency"
    >
      <div
        style={{
          maxWidth: '1160px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {/* ── Visual Media Showcase: Corridor & Artwork ────── */}
        <div className="reveal-hidden about-visual-col" style={{ position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(17, 32, 42, 0.12)',
              border: '1px solid #E8E2D5',
              aspectRatio: '4/5',
            }}
          >
            {!imgError ? (
              <img
                src={hotelImages.about}
                alt="Illuminated guest corridor with warm cove lighting at Shrinivas Residency"
                loading="lazy"
                onError={() => setImgError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            ) : (
              <div
                className="img-placeholder"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: '3rem' }}>🏨</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#6B7280' }}>
                  Property photo
                </span>
              </div>
            )}

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.25rem',
                background: 'linear-gradient(to top, rgba(17,32,42,0.85) 0%, transparent 100%)',
                color: '#FFFFFF',
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#E8C472',
                  display: 'block',
                  marginBottom: '2px',
                }}
              >
                Property Ambiance
              </span>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', margin: 0, color: '#F3EFEA' }}>
                Peaceful, warmly lit guest corridors
              </p>
            </div>
          </div>

          {/* Inset Artwork Highlight Card */}
          <div
            className="about-artwork-card"
            style={{
              position: 'absolute',
              bottom: '-1.5rem',
              right: '-1.5rem',
              width: '190px',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              background: '#FFFFFF',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.18)',
              border: '2px solid #FFFFFF',
              zIndex: 2,
            }}
          >
            <img
              src="/assets/images/gallery/artwork-folk-triptych.jpg"
              alt="Traditional Indian wall art displayed in Shrinivas Residency corridors"
              loading="lazy"
              style={{
                width: '100%',
                height: '130px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div style={{ padding: '0.6rem 0.75rem', backgroundColor: '#FAF8F3' }}>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#7A1E1E',
                  display: 'block',
                }}
              >
                Local Heritage
              </span>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.72rem',
                  color: '#4B5563',
                  fontWeight: 500,
                }}
              >
                Handcrafted Art Decor
              </span>
            </div>
          </div>
        </div>

        {/* ── Content ───────────────────────────────────────── */}
        <div className="reveal-hidden" style={{ transitionDelay: '0.15s' } as React.CSSProperties}>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#7A1E1E',
              display: 'block',
              marginBottom: '0.625rem',
            }}
          >
            Stay With Us
          </span>

          <span
            style={{
              display: 'block',
              width: '2.5rem',
              height: '2px',
              background: '#7A1E1E',
              marginBottom: '1.5rem',
              opacity: 0.6,
            }}
          />

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: '#172026',
              lineHeight: 1.25,
              marginBottom: '1.5rem',
            }}
          >
            A Comfortable Stay
            <br />
            in Bagalkot
          </h2>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              color: '#4B5563',
              lineHeight: 1.8,
              marginBottom: '1.25rem',
            }}
          >
            Located in Navanagar, Bagalkot, Shrinivas Residency offers a convenient
            base for guests visiting the city. With an accessible location near
            Police Palace Circle, the property is suited to travellers looking for
            a straightforward and comfortable stay.
          </p>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              color: '#4B5563',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}
          >
            Whether your trip is for work or leisure, the residency's location in
            Sector 35 keeps essential services and the city centre within easy reach.
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              marginBottom: '2.25rem',
              paddingBottom: '2.25rem',
              borderBottom: '1px solid #E8E2D5',
            }}
          >
            <div>
              <div className="font-serif" style={{ fontSize: '2.25rem', fontWeight: 700, color: '#172026', lineHeight: 1 }}>
                {hotel.rating}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#6B7280', marginTop: '0.3rem', letterSpacing: '0.05em' }}>
                Google Rating
              </div>
            </div>
            <div style={{ width: '1px', background: '#E8E2D5' }} />
            <div>
              <div className="font-serif" style={{ fontSize: '2.25rem', fontWeight: 700, color: '#172026', lineHeight: 1 }}>
                {hotel.reviewCount}+
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#6B7280', marginTop: '0.3rem', letterSpacing: '0.05em' }}>
                Guest Reviews
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <a
              href={hotel.bookingUrl || '#contact'}
              onClick={handleBook}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#7A1E1E',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5E1717')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7A1E1E')}
            >
              Book Your Stay
              <ArrowRight size={14} />
            </a>

            {hotel.phonePrimary && (
              <a
                href={`tel:${hotel.phonePrimary}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#172026',
                  textDecoration: 'none',
                  borderBottom: '1px solid #E8E2D5',
                  paddingBottom: '1px',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#7A1E1E';
                  e.currentTarget.style.borderColor = '#7A1E1E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#172026';
                  e.currentTarget.style.borderColor = '#E8E2D5';
                }}
              >
                <Phone size={13} strokeWidth={2} />
                {formatPhone(hotel.phonePrimary)}
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .about-visual-col {
            margin-bottom: 2rem;
          }
          .about-artwork-card {
            right: 0 !important;
            bottom: -1rem !important;
            width: 160px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;

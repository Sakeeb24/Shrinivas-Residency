import React from 'react';
import { MapPin, Navigation, Phone } from 'lucide-react';
import { hotel } from '../data/hotel';
import { useScrollReveal, useIsMobile } from '../hooks/useHotel';

const Location: React.FC = () => {
  useScrollReveal();
  const isMobile = useIsMobile();

  return (
    <section
      id="location"
      style={{ padding: isMobile ? '4.5rem 1.25rem' : '6rem 1.5rem', backgroundColor: '#FAF8F3' }}
      aria-label="Hotel location"
    >
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {/* ── Section Header ───────────────────────────────── */}
        <div className="reveal-hidden" style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '3.5rem' }}>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#7A1E1E',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            Find Us
          </span>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
              fontWeight: 700,
              color: '#172026',
              lineHeight: 1.2,
            }}
          >
            Our Location
          </h2>
          <span
            style={{
              display: 'block',
              width: '2.5rem',
              height: '2px',
              background: '#7A1E1E',
              margin: '0.875rem auto 0',
              opacity: 0.6,
            }}
          />
        </div>

        {/* ── Map (60-65%) & Information Card (35-40%) ──────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.55fr 1fr',
            gap: isMobile ? '1.5rem' : '2rem',
            alignItems: 'stretch',
          }}
        >
          {/* ── Map Container ───────────────────────────────── */}
          <div
            className="reveal-hidden"
            style={{
              borderRadius: '1.25rem',
              overflow: 'hidden',
              border: '1px solid #E8E2D5',
              boxShadow: '0 8px 30px rgba(11, 31, 42, 0.08)',
              height: isMobile ? '320px' : '480px',
              backgroundColor: '#FFFFFF',
              position: 'relative',
            }}
          >
            {hotel.mapEmbedUrl ? (
              <iframe
                src={hotel.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shrinivas Residency location map"
                aria-label="Google Map showing location of Shrinivas Residency in Bagalkot"
              />
            ) : (
              /* Polished Fallback — never exposing developer messages */
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.25rem',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(122,30,30,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin size={26} color="#7A1E1E" strokeWidth={1.75} />
                </div>
                <div>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      color: '#172026',
                      marginBottom: '0.4rem',
                    }}
                  >
                    View Our Location
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.85rem',
                      color: '#6B7280',
                      maxWidth: '280px',
                      lineHeight: 1.6,
                      margin: '0 auto',
                    }}
                  >
                    Open Google Maps to view our exact location and get directions.
                  </p>
                </div>
                <a
                  href={hotel.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: '0.8rem', padding: '0.75rem 1.75rem' }}
                >
                  <Navigation size={14} />
                  Open Google Maps
                </a>
              </div>
            )}
          </div>

          {/* ── Location Information Card ───────────────────── */}
          <div
            className="reveal-hidden"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '1.25rem',
              border: '1px solid #E8E2D5',
              boxShadow: '0 8px 30px rgba(11, 31, 42, 0.08)',
              padding: isMobile ? '1.75rem 1.5rem' : '2.25rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Eyebrow & Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C99A3E' }} />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#7A1E1E',
                  }}
                >
                  Bagalkot, Karnataka
                </span>
              </div>
              <h3
                className="font-serif"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#172026',
                  marginBottom: '0.75rem',
                }}
              >
                {hotel.name}
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  color: '#4B5563',
                  lineHeight: 1.65,
                  marginBottom: '1.5rem',
                }}
              >
                Conveniently located in Navanagar, Bagalkot, Shrinivas Residency offers easy access to the city's key areas and local conveniences.
              </p>

              {/* Verified Address */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.875rem',
                  padding: '1rem 1.1rem',
                  backgroundColor: '#FAF8F3',
                  borderRadius: '0.75rem',
                  border: '1px solid #E8E2D5',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(122,30,30,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <MapPin size={17} color="#7A1E1E" strokeWidth={2} />
                </div>
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#9CA3AF',
                      marginBottom: '0.2rem',
                    }}
                  >
                    Address
                  </span>
                  <address
                    style={{
                      fontStyle: 'normal',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.84rem',
                      color: '#172026',
                      lineHeight: 1.6,
                    }}
                  >
                    {hotel.address.plot}, {hotel.address.sector}, {hotel.address.landmark},<br />
                    {hotel.address.locality}, {hotel.address.city},<br />
                    {hotel.address.state} — {hotel.address.pincode}
                  </address>
                </div>
              </div>

              {/* Plus Code Badge */}
              {hotel.plusCode && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 1rem',
                    backgroundColor: '#FAF8F3',
                    borderRadius: '0.625rem',
                    border: '1px solid #E8E2D5',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: '#6B7280',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Google Plus Code
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#172026',
                    }}
                  >
                    {hotel.plusCode}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '0.75rem',
                marginTop: '0.5rem',
              }}
            >
              {/* Primary: Get Directions */}
              <a
                href={hotel.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.4rem',
                  backgroundColor: '#7A1E1E',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '0.375rem',
                  textDecoration: 'none',
                  border: '1px solid #7A1E1E',
                  transition: 'all 0.25s ease',
                  flex: 1,
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#5E1717';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#7A1E1E';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <Navigation size={14} />
                Get Directions →
              </a>

              {/* Secondary: Call Now */}
              {hotel.phonePrimary && (
                <a
                  href={`tel:${hotel.phonePrimary}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 1.25rem',
                    backgroundColor: 'transparent',
                    color: '#172026',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    border: '1px solid #E8E2D5',
                    transition: 'all 0.25s ease',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#7A1E1E';
                    e.currentTarget.style.color = '#7A1E1E';
                    e.currentTarget.style.backgroundColor = 'rgba(122,30,30,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E8E2D5';
                    e.currentTarget.style.color = '#172026';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Phone size={14} />
                  Call Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

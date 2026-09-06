import React from 'react';
import {
  Wifi, BedDouble, Car, UtensilsCrossed,
  MapPin, Clock, Sparkles, Navigation,
} from 'lucide-react';
import { amenities } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';

const iconComponents: Record<string, React.FC<{ size?: number; strokeWidth?: number; color?: string }>> = {
  Wifi, BedDouble, Car, UtensilsCrossed, MapPin, Clock, Sparkles, Navigation,
};

const Amenities: React.FC = () => {
  useScrollReveal();

  // Only render amenities marked visible: true
  const visible = amenities.filter((a) => a.visible);

  if (visible.length === 0) return null;

  return (
    <section
      id="amenities"
      style={{ padding: '6rem 1.5rem', backgroundColor: '#FAF8F3' }}
      aria-label="Hotel amenities"
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        {/* Header */}
        <div className="reveal-hidden" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#7A1E1E',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            What We Offer
          </span>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: '#172026',
              lineHeight: 1.25,
              marginBottom: '1rem',
            }}
          >
            At a Glance
          </h2>
          <span style={{ display: 'block', width: '2.5rem', height: '2px', background: '#7A1E1E', margin: '0 auto', opacity: 0.6 }} />
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {visible.map((amenity, i) => {
            const IconComponent = iconComponents[amenity.icon];
            return (
              <div
                key={amenity.id}
                className="reveal-hidden"
                style={{ transitionDelay: `${i * 0.07}s` } as React.CSSProperties}
              >
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8E2D5',
                    borderRadius: '0.625rem',
                    padding: '1.5rem',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-3px)';
                    el.style.boxShadow = '0 12px 32px rgba(11,31,42,0.08)';
                    el.style.borderColor = 'rgba(122,30,30,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'none';
                    el.style.boxShadow = 'none';
                    el.style.borderColor = '#E8E2D5';
                  }}
                >
                  <div
                    style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'rgba(122,30,30,0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    {IconComponent ? (
                      <IconComponent size={19} color="#7A1E1E" strokeWidth={1.75} />
                    ) : (
                      <span style={{ fontSize: '1rem' }}>✦</span>
                    )}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#172026',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {amenity.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.82rem',
                      color: '#6B7280',
                      lineHeight: 1.65,
                    }}
                  >
                    {amenity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className="reveal-hidden"
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: '#9CA3AF',
            fontStyle: 'italic',
          }}
        >
          Please confirm amenity availability at time of booking.
        </p>
      </div>
    </section>
  );
};

export default Amenities;

import React, { useState } from 'react';
import {
  MapPin, BedDouble, Clock, Wifi, Car, Sparkles, ArrowRight,
} from 'lucide-react';
import { amenities, hotelImages } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';
import { use3DTilt } from '../hooks/use3D';

const iconMap: Record<string, React.FC<{ size?: number; color?: string; strokeWidth?: number }>> = {
  MapPin,
  BedDouble,
  Clock,
  Wifi,
  Car,
  Sparkles,
};

// Map each amenity to an authentic real photograph from the property
const amenityPhotoMap: Record<string, { src: string; caption: string; tag: string }> = {
  location: {
    src: hotelImages.exterior[0],
    caption: 'Police Palace Circle, Navanagar',
    tag: 'Accessible Connectivity',
  },
  rooms: {
    src: hotelImages.rooms.roomWide,
    caption: 'Curated Guest Living Spaces',
    tag: 'Quiet Restful Rest',
  },
  frontdesk: {
    src: hotelImages.interior[0],
    caption: 'Reception & Foyer Gallery',
    tag: 'Attentive Assistance',
  },
  wifi: {
    src: hotelImages.rooms.roomTv,
    caption: 'High-Speed In-Room Connectivity',
    tag: 'Seamless Access',
  },
  parking: {
    src: hotelImages.about,
    caption: 'Premises Access & Ground Facility',
    tag: 'Secure & Convenient',
  },
  cleanliness: {
    src: hotelImages.rooms.roomPerspective,
    caption: 'Daily Housekeeping & Hygiene',
    tag: 'Hygienic Living',
  },
};

const Amenities: React.FC = () => {
  useScrollReveal();
  const visibleAmenities = amenities.filter((a) => a.visible);
  const [activeAmenityId, setActiveAmenityId] = useState<string>(visibleAmenities[0]?.id || 'location');
  const { ref: stageRef, style: stageStyle, glare, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLDivElement>(6, 1200);

  const activePhoto = amenityPhotoMap[activeAmenityId] || amenityPhotoMap.location;
  const activeAmenity = visibleAmenities.find((a) => a.id === activeAmenityId) || visibleAmenities[0];

  return (
    <section
      id="amenities"
      aria-label="Hotel amenities and guest services"
      style={{
        padding: '7.5rem 1.5rem',
        backgroundColor: 'var(--color-canvas)',
        borderTop: '1px solid var(--color-border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* ── Section Header ───────────────────────────────── */}
        <div className="reveal-hidden" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-eyebrow with-lines" style={{ justifyContent: 'center' }}>
            <span>FACILITIES & SERVICES</span>
          </div>

          <h2
            className="headline-serif"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              color: 'var(--color-charcoal)',
              maxWidth: '680px',
              margin: '0 auto 1.25rem',
              letterSpacing: '-0.01em',
            }}
          >
            Everything You Need for a Comfortable Stay
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--color-text-muted)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Essential conveniences provided with care to make your time in Navanagar effortless, restful, and pleasant.
          </p>

          <span className="gold-hairline gold-hairline-center" style={{ marginTop: '1.25rem' }} />
        </div>

        {/* ── Flowing Spatial Showcase (Section 15) ───────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className="perspective-1000"
        >
          {/* Left Column: Atmospheric Visual Anchor */}
          <div className="reveal-hidden">
            <div
              ref={stageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="preserve-3d"
              style={{
                ...stageStyle,
                position: 'relative',
                height: '480px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-3d-card)',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: '#1E2328',
              }}
            >
              <img
                key={activePhoto.src}
                src={activePhoto.src}
                alt={activePhoto.caption}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.5s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: 'brightness(0.9) contrast(1.05)',
                }}
              />

              {/* Dynamic Glare */}
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

              {/* Floating Top Tag */}
              <div
                className="layer-z-30 floating-glass-plate"
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  padding: '0.45rem 0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  zIndex: 5,
                }}
              >
                <Sparkles size={12} color="var(--color-gold)" />
                {activePhoto.tag}
              </div>

              {/* Bottom Caption Overlay */}
              <div
                className="layer-z-20"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.75rem',
                  background: 'linear-gradient(to top, rgba(17, 20, 23, 0.9) 0%, transparent 100%)',
                  color: '#FFFFFF',
                  zIndex: 3,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold-light)',
                    display: 'block',
                    marginBottom: '0.25rem',
                    fontWeight: 600,
                  }}
                >
                  Feature Detail
                </span>
                <h4
                  className="headline-serif"
                  style={{
                    fontSize: '1.4rem',
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                  }}
                >
                  {activeAmenity.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginTop: '0.35rem',
                  }}
                >
                  {activePhoto.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Flowing Spatial List (01 to 06) */}
          <div className="reveal-hidden" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {visibleAmenities.map((amenity, idx) => {
              const Icon = iconMap[amenity.icon] || Sparkles;
              const isActive = activeAmenityId === amenity.id;
              const numberStr = `0${idx + 1}`;

              return (
                <div
                  key={amenity.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${amenity.title} - ${amenity.description}`}
                  onClick={() => setActiveAmenityId(amenity.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveAmenityId(amenity.id);
                    }
                  }}
                  onMouseEnter={() => setActiveAmenityId(amenity.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1.15rem 1.4rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                    border: isActive ? '1px solid var(--color-gold)' : '1px solid transparent',
                    boxShadow: isActive ? 'var(--shadow-3d-card)' : 'none',
                    transform: isActive ? 'translateX(10px)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
                    cursor: 'pointer',
                    opacity: isActive ? 1 : 0.68,
                  }}
                >
                  {/* Number Indicator */}
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: isActive ? 'var(--color-gold-dark)' : 'var(--color-text-muted)',
                      minWidth: '24px',
                    }}
                  >
                    {numberStr}
                  </span>

                  {/* Icon */}
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: isActive ? 'var(--color-surface-cream)' : 'rgba(22, 25, 29, 0.04)',
                      border: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <Icon
                      size={18}
                      color={isActive ? 'var(--color-gold-dark)' : 'var(--color-charcoal)'}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title & Description */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.98rem',
                          fontWeight: 600,
                          color: 'var(--color-charcoal)',
                          lineHeight: 1.25,
                        }}
                      >
                        {amenity.title}
                      </h3>
                      {isActive && <ArrowRight size={14} color="var(--color-gold-dark)" />}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.84rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.5,
                        marginTop: '0.2rem',
                      }}
                    >
                      {amenity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;

import React, { useState } from 'react';
import { Eye, Calendar, X, Check, Phone, Wifi, Tv, Wind, Bed, Bath, ChevronLeft, ChevronRight } from 'lucide-react';
import { rooms, hotel, formatPhone } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';
import { use3DTilt } from '../hooks/use3D';

type RoomItem = typeof rooms[0];

const Rooms: React.FC = () => {
  useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % rooms.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
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

  return (
    <section
      id="rooms"
      aria-label="Rooms and accommodation at Shrinivas Residency"
      style={{
        padding: '7rem 1.5rem 6.5rem',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--color-border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* ── Section Header ───────────────────────────────── */}
        <div className="reveal-hidden" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-eyebrow with-lines" style={{ justifyContent: 'center' }}>
            <span>FIND YOUR STAY</span>
          </div>

          <h2
            className="headline-serif"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              color: '#16191D',
              maxWidth: '720px',
              margin: '0 auto 1rem',
              letterSpacing: '-0.01em',
              fontWeight: 600,
            }}
          >
            Rooms Designed for a Comfortable Stay
          </h2>

          {/* High-Contrast Introductory Description (Requirement 11) */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              color: '#2C3338',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.65,
              fontWeight: 450,
            }}
          >
            Each room at Shrinivas Residency is arranged with clean interiors, private amenities, and quiet comfort for your visit in Bagalkot.
          </p>

          <span className="gold-hairline gold-hairline-center" style={{ marginTop: '1.25rem' }} />
        </div>

        {/* ── Room Switcher Tabs (Requirement 12) ─────────── */}
        <div
          className="reveal-hidden"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3.25rem',
            flexWrap: 'wrap',
          }}
          role="tablist"
          aria-label="Room selection"
        >
          {rooms.map((room, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={room.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(idx)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '0.75rem 1.6rem',
                  borderRadius: 'var(--radius-sm)',
                  border: isActive ? '1.5px solid #16191D' : '1.5px solid #D8D0C5',
                  backgroundColor: isActive ? '#16191D' : '#FAF7F2',
                  color: isActive ? '#FFFFFF' : '#1E2328',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 6px 18px rgba(22, 25, 29, 0.16)' : '0 2px 6px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#EDE7DC';
                    e.currentTarget.style.borderColor = '#B8ABA0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#FAF7F2';
                    e.currentTarget.style.borderColor = '#D8D0C5';
                  }
                }}
              >
                <span
                  style={{
                    color: isActive ? 'var(--color-gold-light)' : '#8E6C3E',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  0{idx + 1}
                </span>
                <span>{room.name}</span>
              </button>
            );
          })}
        </div>

        {/* ── Desktop 3D Spatial Room Showcase (Requirement 5 & 13) ──── */}
        <div className="room-stage-desktop">
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '980px',
              height: '620px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
            }}
          >
            {rooms.map((room, index) => {
              // Calculate circular offset
              let diff = index - activeIndex;
              if (diff === -2) diff = 1;
              if (diff === 2) diff = -1;

              const isActive = diff === 0;
              const isRight = diff === 1;
              const isLeft = diff === -1;

              // Subtle gallery perspective as required by Section 5 & 13
              let transform = 'translate3d(0, 0, 20px) scale(1)';
              let zIndex = 25;
              let opacity = 1;

              if (isRight) {
                // Secondary right card: 94% opacity, crisp text, subtle perspective
                transform = 'translate3d(325px, 0, -70px) scale(0.88) rotateY(-5deg)';
                zIndex = 10;
                opacity = 0.94;
              } else if (isLeft) {
                // Secondary left card: 94% opacity, crisp text, subtle perspective
                transform = 'translate3d(-325px, 0, -70px) scale(0.88) rotateY(5deg)';
                zIndex = 10;
                opacity = 0.94;
              }

              return (
                <div
                  key={room.id}
                  onClick={() => {
                    if (!isActive) setActiveIndex(index);
                  }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    maxWidth: '540px',
                    transform,
                    zIndex,
                    opacity,
                    transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease',
                    cursor: isActive ? 'default' : 'pointer',
                    willChange: 'transform, opacity',
                  }}
                  className="preserve-3d"
                >
                  <SpatialRoomCard
                    room={room}
                    isActive={isActive}
                    roomNumber={`0${index + 1}`}
                    onViewDetails={() => setSelectedRoom(room)}
                    onCheckAvailability={handleCheckAvailability}
                  />
                </div>
              );
            })}
          </div>

          {/* Desktop Navigation Controls: Prev / 01 / 03 / Next */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              marginTop: '2.5rem',
            }}
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous room"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#FAF7F2',
                border: '1.5px solid #D8D0C5',
                color: '#16191D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#16191D';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#16191D';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FAF7F2';
                e.currentTarget.style.color = '#16191D';
                e.currentTarget.style.borderColor = '#D8D0C5';
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#16191D',
              }}
            >
              0{activeIndex + 1} / 0{rooms.length}
            </span>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next room"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#FAF7F2',
                border: '1.5px solid #D8D0C5',
                color: '#16191D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#16191D';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#16191D';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FAF7F2';
                e.currentTarget.style.color = '#16191D';
                e.currentTarget.style.borderColor = '#D8D0C5';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ── Mobile Single Room Showcase (Requirement 15) ──────── */}
        <div className="room-stage-mobile">
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            {/* Mobile Navigation Header: ← 01 / 03 → */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                padding: '0.65rem 1rem',
                backgroundColor: '#F5F1EB',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #E4DDD1',
              }}
            >
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous room"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#16191D',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '0.35rem 0.5rem',
                }}
              >
                <ChevronLeft size={18} />
                <span>Prev</span>
              </button>

              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#16191D',
                }}
              >
                0{activeIndex + 1} / 0{rooms.length}
              </span>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next room"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#16191D',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '0.35rem 0.5rem',
                }}
              >
                <span>Next</span>
                <ChevronRight size={18} />
              </button>
            </div>

            <SpatialRoomCard
              room={rooms[activeIndex]}
              isActive={true}
              roomNumber={`0${activeIndex + 1}`}
              onViewDetails={() => setSelectedRoom(rooms[activeIndex])}
              onCheckAvailability={handleCheckAvailability}
            />
          </div>
        </div>
      </div>

      {/* ── Responsive Stage Style ──────────────────────────── */}
      <style>{`
        .room-stage-desktop {
          display: block;
          perspective: 1400px;
        }
        .room-stage-mobile {
          display: none;
        }
        @media (max-width: 900px) {
          .room-stage-desktop {
            display: none !important;
          }
          .room-stage-mobile {
            display: block !important;
          }
        }
      `}</style>

      {/* ── 3D Room Details Inspection Modal ─────────────────── */}
      {selectedRoom && (
        <RoomModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onCheckAvailability={handleCheckAvailability}
        />
      )}
    </section>
  );
};

// ── Feature Icon Mapper ───────────────────────────────────────
const getFeatureIcon = (feature: string) => {
  const f = feature.toLowerCase();
  if (f.includes('ac') || f.includes('air')) return <Wind size={13} color="#8E6C3E" strokeWidth={2} />;
  if (f.includes('bed')) return <Bed size={13} color="#8E6C3E" strokeWidth={2} />;
  if (f.includes('wi-fi') || f.includes('wifi') || f.includes('internet')) return <Wifi size={13} color="#8E6C3E" strokeWidth={2} />;
  if (f.includes('bath') || f.includes('water')) return <Bath size={13} color="#8E6C3E" strokeWidth={2} />;
  if (f.includes('tv')) return <Tv size={13} color="#8E6C3E" strokeWidth={2} />;
  return <Check size={12} color="#8E6C3E" strokeWidth={2.5} />;
};

// ── Spatial Room Card Component with Layered 3D Depth ─────────
interface SpatialRoomCardProps {
  room: RoomItem;
  isActive: boolean;
  roomNumber: string;
  onViewDetails: () => void;
  onCheckAvailability: (e: React.MouseEvent) => void;
}

const SpatialRoomCard: React.FC<SpatialRoomCardProps> = ({
  room,
  isActive,
  roomNumber,
  onViewDetails,
  onCheckAvailability,
}) => {
  const [imgError, setImgError] = useState(false);
  // Subtle 3D tilt (max 2.5 deg) as required by Section 14
  const { ref, style, glare, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLElement>(isActive ? 2.5 : 0, 1200);

  return (
    <article
      ref={ref}
      onMouseMove={isActive ? handleMouseMove : undefined}
      onMouseLeave={isActive ? handleMouseLeave : undefined}
      style={{
        ...style,
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: isActive ? '2px solid var(--color-gold)' : '1.5px solid #DCD4C7',
        boxShadow: isActive
          ? '0 16px 44px -10px rgba(17, 20, 23, 0.18), 0 6px 16px -4px rgba(17, 20, 23, 0.08)'
          : '0 8px 24px -6px rgba(17, 20, 23, 0.10)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className="preserve-3d card-hotel-3d"
    >
      {/* Dynamic Cursor Light Glare for Active Card */}
      {isActive && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 60%)`,
            transition: 'opacity 0.2s ease-out',
            zIndex: 8,
          }}
        />
      )}

      {/* ── Room Photography Container (approx 45% of card height) ── */}
      <div
        style={{
          position: 'relative',
          height: '255px',
          overflow: 'hidden',
          backgroundColor: '#1E2328',
          borderBottom: '1px solid var(--color-border-subtle)',
          cursor: isActive ? 'pointer' : 'default',
        }}
        onClick={isActive ? onViewDetails : undefined}
      >
        {!imgError ? (
          <img
            src={room.image}
            alt={room.alt}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            className="room-card-img"
          />
        ) : (
          <div className="img-placeholder-hotel" style={{ width: '100%', height: '100%' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Room Photograph</span>
          </div>
        )}

        {/* Subtle Room Label Badge (Requirement 7) */}
        <div
          className="layer-z-20"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            backgroundColor: 'rgba(17, 20, 23, 0.75)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            color: '#FFFFFF',
            padding: '0.4rem 0.85rem',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            zIndex: 4,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
          }}
        >
          <span>ROOM {roomNumber}</span>
        </div>

        {/* Small Secondary Inspect Control (Requirement 8) */}
        {isActive && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: 'rgba(17, 20, 23, 0.75)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              zIndex: 4,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(17, 20, 23, 0.95)';
              e.currentTarget.style.borderColor = 'var(--color-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(17, 20, 23, 0.75)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
            aria-label={`Inspect ${room.name} details`}
          >
            <Eye size={12} color="var(--color-gold)" />
            <span>Inspect</span>
          </button>
        )}
      </div>

      {/* ── Room Information Panel (Requirement 2 & 3: High-Contrast Solid Canvas) ── */}
      <div
        style={{
          padding: '1.85rem 2rem 1.85rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}
        className="layer-z-10"
      >
        {/* Room Title: Strong High-Contrast Serif (Requirement 3: 28-34px) */}
        <h3
          className="headline-serif"
          style={{
            fontSize: 'clamp(1.75rem, 2.3vw, 2.05rem)',
            color: '#16191D',
            marginBottom: '0.65rem',
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          {room.name}
        </h3>

        {/* Room Description: Dark High-Contrast Charcoal (Requirement 3: 15-17px, line-height 1.65) */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: '#282F36',
            lineHeight: 1.65,
            marginBottom: '1.5rem',
            fontWeight: 450,
            maxWidth: '480px',
          }}
        >
          {room.description}
        </p>

        {/* Amenity Chips: High-Contrast & Comfortable Size (Requirement 9: 13-14px, 8x12px padding, 7px radius) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.55rem',
            marginBottom: '1.75rem',
          }}
        >
          {room.features.map((feature) => (
            <span
              key={feature}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: '#1C2126',
                backgroundColor: '#F3EFE8',
                border: '1px solid #DFD8CD',
                borderRadius: '7px',
                padding: '8px 13px',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                lineHeight: 1.2,
              }}
            >
              {getFeatureIcon(feature)}
              <span>{feature}</span>
            </span>
          ))}
        </div>

        {/* Actions Bar (Requirement 10: Clear Visual Hierarchy) */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '1.25rem',
            borderTop: '1px solid #E8E2D7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <button
            type="button"
            onClick={onViewDetails}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.55rem 0',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#16191D',
              cursor: 'pointer',
              borderBottom: '2px solid var(--color-gold)',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-gold-dark)';
              e.currentTarget.style.borderColor = 'var(--color-gold-dark)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#16191D';
              e.currentTarget.style.borderColor = 'var(--color-gold)';
            }}
          >
            Room Details
          </button>

          <a
            href="#contact"
            onClick={onCheckAvailability}
            className="btn-gold-solid"
            style={{
              padding: '0.75rem 1.45rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
            }}
          >
            <Calendar size={14} strokeWidth={2} />
            Check Availability
          </a>
        </div>
      </div>
    </article>
  );
};

// ── 3D Room Details Inspection Modal ──────────────────────────
interface RoomModalProps {
  room: RoomItem;
  onClose: () => void;
  onCheckAvailability: (e: React.MouseEvent) => void;
}

const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onCheckAvailability }) => {
  return (
    <div
      className="hotel-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${room.name}`}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(17, 20, 23, 0.75)',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-charcoal)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(17, 20, 23, 0.75)')}
        >
          <X size={18} />
        </button>

        {/* Modal Room Image */}
        <div style={{ height: '320px', width: '100%', overflow: 'hidden', position: 'relative' }}>
          <img
            src={room.image}
            alt={room.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.5rem',
              background: 'linear-gradient(to top, rgba(17, 20, 23, 0.85) 0%, transparent 100%)',
              color: '#FFFFFF',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-light)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              Accommodation Specifications
            </span>
            <h3 className="headline-serif" style={{ fontSize: '1.85rem', color: '#FFFFFF', fontWeight: 600 }}>
              {room.name}
            </h3>
          </div>
        </div>

        {/* Modal Room Content */}
        <div style={{ padding: '2rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: '#282F36',
              lineHeight: 1.7,
              marginBottom: '1.75rem',
              fontWeight: 450,
            }}
          >
            {room.description}
          </p>

          <h4
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#16191D',
              marginBottom: '1rem',
            }}
          >
            Verified Room Features
          </h4>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.85rem',
              marginBottom: '2rem',
            }}
          >
            {room.features.map((feature) => (
              <div
                key={feature}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: '#1C2126',
                  fontWeight: 500,
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-gold-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={12} color="var(--color-gold-dark)" strokeWidth={2.5} />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Modal Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--color-border-subtle)',
              paddingTop: '1.5rem',
            }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                onClose();
                onCheckAvailability(e);
              }}
              className="btn-gold-solid"
              style={{ flex: 1, minWidth: '180px', textAlign: 'center' }}
            >
              <Calendar size={15} />
              Check Availability
            </a>

            {hotel.phonePrimaryTel && (
              <a
                href={`tel:${hotel.phonePrimaryTel}`}
                className="btn-outline-dark"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                aria-label={`Call property directly at ${formatPhone(hotel.phonePrimary)}`}
              >
                <Phone size={14} color="var(--color-gold-dark)" />
                {formatPhone(hotel.phonePrimary)}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;

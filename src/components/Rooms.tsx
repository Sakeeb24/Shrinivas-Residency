import React, { useState } from 'react';
import { Eye, Calendar, X, Check, Phone, Wifi, Tv, Wind, Bed, Bath, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
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
        padding: '7rem 1.5rem 6rem',
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
              color: 'var(--color-charcoal)',
              maxWidth: '680px',
              margin: '0 auto 1rem',
              letterSpacing: '-0.01em',
            }}
          >
            Rooms Designed for a Comfortable Stay
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
            Each room at Shrinivas Residency is arranged with clean interiors, private amenities, and quiet comfort for your visit in Bagalkot.
          </p>

          <span className="gold-hairline gold-hairline-center" style={{ marginTop: '1.25rem' }} />
        </div>

        {/* ── Room Switcher Tabs (Section 13) ─────────────── */}
        <div
          className="reveal-hidden"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '3.5rem',
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
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '0.65rem 1.4rem',
                  borderRadius: 'var(--radius-sm)',
                  border: isActive ? '1px solid var(--color-charcoal)' : '1px solid var(--color-border-subtle)',
                  backgroundColor: isActive ? 'var(--color-charcoal)' : 'var(--color-surface-cream)',
                  color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
                  boxShadow: isActive ? '0 6px 18px rgba(22, 25, 29, 0.18)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <span
                  style={{
                    color: isActive ? 'var(--color-gold)' : 'var(--color-text-muted)',
                    fontSize: '0.7rem',
                  }}
                >
                  0{idx + 1}
                </span>
                {room.name}
              </button>
            );
          })}
        </div>

        {/* ── Desktop 3D Spatial Room Showcase (Section 13) ──── */}
        <div className="room-stage-desktop perspective-1500">
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
              height: '560px',
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

              let transform = 'translate3d(0, 0, 40px) scale(1)';
              let zIndex = 20;
              let opacity = 1;
              let filter = 'none';

              if (isRight) {
                transform = 'translate3d(310px, -15px, -80px) scale(0.85) rotateY(-8deg)';
                zIndex = 10;
                opacity = 0.65;
                filter = 'brightness(0.9)';
              } else if (isLeft) {
                transform = 'translate3d(-310px, -15px, -80px) scale(0.85) rotateY(8deg)';
                zIndex = 10;
                opacity = 0.65;
                filter = 'brightness(0.9)';
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
                    maxWidth: '560px',
                    transform,
                    zIndex,
                    opacity,
                    filter,
                    transition: 'all 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)',
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

          {/* Desktop Navigation Arrows */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
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
                backgroundColor: 'var(--color-surface-cream)',
                border: '1px solid var(--color-border-subtle)',
                color: 'var(--color-charcoal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-charcoal)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = 'var(--color-charcoal)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-cream)';
                e.currentTarget.style.color = 'var(--color-charcoal)';
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'var(--color-text-muted)',
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
                backgroundColor: 'var(--color-surface-cream)',
                border: '1px solid var(--color-border-subtle)',
                color: 'var(--color-charcoal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-charcoal)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = 'var(--color-charcoal)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-cream)';
                e.currentTarget.style.color = 'var(--color-charcoal)';
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Mobile Responsive Carousel (Section 23 & 24) ─── */}
        <div className="room-stage-mobile">
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            <SpatialRoomCard
              room={rooms[activeIndex]}
              isActive={true}
              roomNumber={`0${activeIndex + 1}`}
              onViewDetails={() => setSelectedRoom(rooms[activeIndex])}
              onCheckAvailability={handleCheckAvailability}
            />

            {/* Mobile Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '1.5rem',
                padding: '0 0.5rem',
              }}
            >
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous room"
                className="btn-outline-dark"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.78rem' }}
              >
                <ChevronLeft size={16} /> Prev
              </button>

              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                }}
              >
                Room 0{activeIndex + 1} of 0{rooms.length}
              </span>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next room"
                className="btn-outline-dark"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.78rem' }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Responsive Stage Style ──────────────────────────── */}
      <style>{`
        .room-stage-desktop {
          display: block;
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
  const { ref, style, glare, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLElement>(isActive ? 6 : 0, 1000);

  return (
    <article
      ref={ref}
      onMouseMove={isActive ? handleMouseMove : undefined}
      onMouseLeave={isActive ? handleMouseLeave : undefined}
      style={{
        ...style,
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: isActive ? '1.5px solid var(--color-gold)' : '1px solid var(--color-border-subtle)',
        boxShadow: isActive ? 'var(--shadow-3d-hover)' : 'var(--shadow-3d-card)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transformStyle: 'preserve-3d',
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

      {/* ── Room Photography Container ─────────────────────── */}
      <div
        style={{
          position: 'relative',
          height: '270px',
          overflow: 'hidden',
          backgroundColor: '#1E2328',
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
            }}
            className="room-card-img"
          />
        ) : (
          <div className="img-placeholder-hotel" style={{ width: '100%', height: '100%' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Room Photograph</span>
          </div>
        )}

        {/* Room Index & Category Badge */}
        <div
          className="layer-z-20 floating-glass-plate"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            color: '#FFFFFF',
            padding: '0.35rem 0.85rem',
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            zIndex: 4,
          }}
        >
          <Sparkles size={11} color="var(--color-gold)" />
          <span>Room {roomNumber}</span>
        </div>

        {/* Explore Button on Photo */}
        {isActive && (
          <div
            className="layer-z-20 floating-glass-plate"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              color: '#FFFFFF',
              padding: '0.35rem 0.75rem',
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              zIndex: 4,
            }}
          >
            <Eye size={12} color="var(--color-gold)" />
            Inspect
          </div>
        )}
      </div>

      {/* ── Room Information & Features ────────────────────── */}
      <div
        style={{
          padding: '1.75rem 1.85rem 1.75rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
        className="layer-z-10"
      >
        <h3
          className="headline-serif"
          style={{
            fontSize: '1.55rem',
            color: 'var(--color-charcoal)',
            marginBottom: '0.65rem',
            lineHeight: 1.2,
          }}
        >
          {room.name}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.65,
            marginBottom: '1.35rem',
          }}
        >
          {room.description}
        </p>

        {/* Specification Icons Grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.45rem',
            marginBottom: '1.75rem',
          }}
        >
          {room.features.map((feature) => (
            <span
              key={feature}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                color: 'var(--color-charcoal)',
                backgroundColor: 'var(--color-surface-cream)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.3rem 0.7rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              {feature.includes('AC') || feature.includes('Air') ? <Wind size={11} color="var(--color-gold-dark)" /> :
               feature.includes('Bed') ? <Bed size={11} color="var(--color-gold-dark)" /> :
               feature.includes('Wi-Fi') ? <Wifi size={11} color="var(--color-gold-dark)" /> :
               feature.includes('Bathroom') || feature.includes('Water') ? <Bath size={11} color="var(--color-gold-dark)" /> :
               feature.includes('TV') ? <Tv size={11} color="var(--color-gold-dark)" /> : null}
              {feature}
            </span>
          ))}
        </div>

        {/* Actions Bar */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--color-border-subtle)',
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
              padding: '0.4rem 0',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-charcoal)',
              cursor: 'pointer',
              borderBottom: '1px solid var(--color-gold)',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold-dark)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-charcoal)')}
          >
            Room Details
          </button>

          <a
            href="#contact"
            onClick={onCheckAvailability}
            className="btn-gold-solid"
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.75rem',
            }}
          >
            <Calendar size={13} />
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
            <h3 className="headline-serif" style={{ fontSize: '1.75rem', color: '#FFFFFF' }}>
              {room.name}
            </h3>
          </div>
        </div>

        {/* Modal Room Content */}
        <div style={{ padding: '2rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.96rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              marginBottom: '1.75rem',
            }}
          >
            {room.description}
          </p>

          <h4
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-charcoal)',
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
                  fontSize: '0.85rem',
                  color: 'var(--color-text-secondary)',
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

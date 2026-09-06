import React from 'react';
import { Phone } from 'lucide-react';
import { rooms, hotel, formatPhone } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';

// Only confirmed rooms are shown with full details.
// Unconfirmed rooms show a tasteful placeholder.

const Rooms: React.FC = () => {
  useScrollReveal();

  const confirmedRooms = rooms.filter((r) => r.confirmed);
  const showPlaceholder = confirmedRooms.length === 0;

  return (
    <section
      id="rooms"
      style={{ padding: '6rem 1.5rem', backgroundColor: '#FFFFFF' }}
      aria-label="Rooms at Shrinivas Residency"
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        {/* Header */}
        <div className="reveal-hidden" style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            Accommodation
          </span>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: '#172026',
              lineHeight: 1.25,
              maxWidth: '560px',
              margin: '0 auto 1rem',
            }}
          >
            Rooms for a Comfortable Stay
          </h2>
          <span style={{ display: 'block', width: '2.5rem', height: '2px', background: '#7A1E1E', margin: '0 auto', opacity: 0.6 }} />
        </div>

        {showPlaceholder ? (
          /* ── Placeholder state ──────────────────────────── */
          <div className="reveal-hidden">
            <div
              style={{
                maxWidth: '560px',
                margin: '0 auto',
                textAlign: 'center',
                padding: '4rem 2rem',
                border: '1px solid #E8E2D5',
                borderRadius: '0.75rem',
                backgroundColor: '#FAF8F3',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(122,30,30,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🛏️</span>
              </div>
              <h3
                className="font-serif"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#172026',
                  marginBottom: '0.75rem',
                }}
              >
                Room Details Coming Soon
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: '#6B7280',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                We're updating our room listings. For current availability and
                room information, please contact us directly.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', alignItems: 'center' }}>
                {hotel.phonePrimary && (
                  <a
                    href={`tel:${hotel.phonePrimary}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.75rem',
                      backgroundColor: '#7A1E1E',
                      color: '#FFFFFF',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      transition: 'background-color 0.25s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5E1717')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7A1E1E')}
                  >
                    <Phone size={15} />
                    {formatPhone(hotel.phonePrimary)}
                  </a>
                )}
                {hotel.phoneSecondary && (
                  <a
                    href={`tel:${hotel.phoneSecondary}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.75rem',
                      backgroundColor: 'transparent',
                      color: '#172026',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      border: '1px solid #E8E2D5',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#7A1E1E';
                      e.currentTarget.style.color = '#7A1E1E';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E8E2D5';
                      e.currentTarget.style.color = '#172026';
                    }}
                  >
                    <Phone size={15} />
                    {formatPhone(hotel.phoneSecondary)}
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    color: '#6B7280',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#172026')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
                >
                  Or send us a message →
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* ── Real room cards ────────────────────────────── */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {confirmedRooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ── Room Card ─────────────────────────────────────────────────
const RoomCard: React.FC<{ room: typeof rooms[0]; index: number }> = ({ room, index }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <article
      className="reveal-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        border: '1px solid #E8E2D5',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        transitionDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(11,31,42,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ height: '210px', overflow: 'hidden', position: 'relative' }}>
        {!imgError ? (
          <img
            src={room.image}
            alt={room.alt}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          />
        ) : (
          <div
            className="img-placeholder"
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <span style={{ fontSize: '2rem' }}>🛏️</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#6B7280' }}>Photo coming soon</span>
          </div>
        )}
      </div>
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="font-serif" style={{ fontSize: '1.3rem', fontWeight: 600, color: '#172026', marginBottom: '0.5rem' }}>
          {room.name}
        </h3>
        {room.description && (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.7, marginBottom: '1rem' }}>
            {room.description}
          </p>
        )}
        {room.features.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {room.features.map((f) => (
              <span
                key={f}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.72rem',
                  color: '#4B5563',
                  backgroundColor: '#FAF8F3',
                  border: '1px solid #E8E2D5',
                  borderRadius: '2rem',
                  padding: '0.2rem 0.625rem',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        )}
        <div style={{ marginTop: 'auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#7A1E1E', marginBottom: '0.75rem', fontWeight: 500 }}>
            Contact us for availability
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#172026',
              textDecoration: 'none',
              borderBottom: '1.5px solid #7A1E1E',
              paddingBottom: '1px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#7A1E1E')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#172026')}
          >
            Enquire →
          </a>
        </div>
      </div>
    </article>
  );
};

export default Rooms;

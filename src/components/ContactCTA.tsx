import React from 'react';
import { Phone, MessageCircle, Navigation } from 'lucide-react';
import { hotel, formatPhone } from '../data/hotel';

// WhatsApp message template
const WHATSAPP_MESSAGE = encodeURIComponent(
  `Hello, I'm interested in booking a stay at Shrinivas Residency, Bagalkot. Could you please share availability details?`
);

const ContactCTA: React.FC = () => {
  const callPrimary = () => {
    if (hotel.phonePrimary) window.location.href = `tel:${hotel.phonePrimary}`;
  };

  const callSecondary = () => {
    if (hotel.phoneSecondary) window.location.href = `tel:${hotel.phoneSecondary}`;
  };

  const openWhatsApp = () => {
    if (!hotel.whatsapp) return;
    const number = hotel.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${number}?text=${WHATSAPP_MESSAGE}`, '_blank', 'noopener,noreferrer');
  };

  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 1.75rem',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.82rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    textDecoration: 'none',
  };

  return (
    <section
      id="contact"
      style={{
        padding: '6rem 1.5rem',
        background: 'linear-gradient(160deg, #120808 0%, #1E0F0F 50%, #0B1F2A 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Contact and reservations"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          background: 'radial-gradient(ellipse at top right, rgba(122,30,30,0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Label */}
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C99A3E',
            display: 'block',
            marginBottom: '1rem',
          }}
        >
          Contact / Reservations
        </span>

        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}
        >
          Get in Touch
        </h2>

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.75,
            maxWidth: '420px',
            margin: '0 auto 2.5rem',
          }}
        >
          For room availability, bookings, and any enquiries about your stay in
          Bagalkot, reach our team directly.
        </p>

        {/* Phone numbers */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            marginBottom: '2.5rem',
          }}
        >
          {/* Primary number */}
          {hotel.phonePrimary && (
            <button
              onClick={callPrimary}
              aria-label={`Call primary number ${formatPhone(hotel.phonePrimary)}`}
              style={{
                ...btnBase,
                backgroundColor: '#7A1E1E',
                color: '#FFFFFF',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5E1717';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(122,30,30,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#7A1E1E';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Phone size={15} strokeWidth={2} />
              {formatPhone(hotel.phonePrimary)}
            </button>
          )}

          {/* Secondary number */}
          {hotel.phoneSecondary && (
            <button
              onClick={callSecondary}
              aria-label={`Call alternate number ${formatPhone(hotel.phoneSecondary)}`}
              style={{
                ...btnBase,
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <Phone size={15} strokeWidth={2} />
              {formatPhone(hotel.phoneSecondary)}
            </button>
          )}

          {/* WhatsApp — only if configured */}
          {hotel.whatsapp && (
            <button
              onClick={openWhatsApp}
              aria-label="Chat on WhatsApp"
              style={{
                ...btnBase,
                backgroundColor: '#25D366',
                color: '#FFFFFF',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1DAA57';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#25D366';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <MessageCircle size={15} strokeWidth={2} />
              WhatsApp
            </button>
          )}
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2.5rem',
          }}
        >
          <span style={{ display: 'block', width: '2.5rem', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            or
          </span>
          <span style={{ display: 'block', width: '2.5rem', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
        </div>

        {/* Directions */}
        <a
          href={hotel.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...btnBase,
            backgroundColor: 'transparent',
            color: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
          }}
        >
          <Navigation size={15} />
          Get Directions
        </a>

        {/* Address */}
        <address
          style={{
            fontStyle: 'normal',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.3)',
            marginTop: '2.5rem',
            lineHeight: 1.75,
          }}
        >
          {hotel.address.plot}, {hotel.address.sector},<br />
          {hotel.address.landmark}, {hotel.address.locality},<br />
          {hotel.address.city}, {hotel.address.state} {hotel.address.pincode}
        </address>
      </div>
    </section>
  );
};

export default ContactCTA;

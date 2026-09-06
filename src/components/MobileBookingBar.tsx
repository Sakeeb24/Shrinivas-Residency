import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { hotel, formatPhone } from '../data/hotel';
import { useScrollY } from '../hooks/useHotel';

const WHATSAPP_MSG = encodeURIComponent(
  `Hello, I'm interested in booking a stay at Shrinivas Residency, Bagalkot. Could you please share availability details?`
);

const MobileBookingBar: React.FC = () => {
  const scrollY = useScrollY();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(scrollY > 350);
  }, [scrollY]);

  const handleBook = () => {
    if (hotel.bookingUrl) {
      window.open(hotel.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    if (!hotel.whatsapp) return;
    const number = hotel.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${number}?text=${WHATSAPP_MSG}`, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    if (hotel.phonePrimary) window.location.href = `tel:${hotel.phonePrimary}`;
  };

  return (
    <>
      {/* ── Mobile sticky bottom bar ─────────────────────── */}
      <div
        aria-hidden={!visible}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className="mobile-only"
      >
        <div
          style={{
            backgroundColor: '#120808',
            borderTop: '1px solid rgba(122,30,30,0.35)',
            padding: '0.75rem 1rem',
            paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
            display: 'flex',
            gap: '0.5rem',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Call button */}
          {hotel.phonePrimary ? (
            <a
              href={`tel:${hotel.phonePrimary}`}
              onClick={(e) => { e.preventDefault(); handleCall(); }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem',
                padding: '0.625rem 0.5rem',
                backgroundColor: 'rgba(255,255,255,0.07)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
                transition: 'background-color 0.2s ease',
                minHeight: '56px',
              }}
              aria-label={`Call ${formatPhone(hotel.phonePrimary)}`}
            >
              <Phone size={18} color="#FFFFFF" strokeWidth={1.75} />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.75)',
                  textTransform: 'uppercase',
                }}
              >
                Call
              </span>
            </a>
          ) : null}

          {/* WhatsApp — only if configured */}
          {hotel.whatsapp ? (
            <button
              onClick={handleWhatsApp}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem',
                padding: '0.625rem 0.5rem',
                backgroundColor: 'rgba(37,211,102,0.12)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(37,211,102,0.2)',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                minHeight: '56px',
              }}
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={18} color="#25D366" strokeWidth={1.75} />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.75)',
                  textTransform: 'uppercase',
                }}
              >
                WhatsApp
              </span>
            </button>
          ) : null}

          {/* Book button — primary CTA */}
          <button
            onClick={handleBook}
            style={{
              flex: hotel.whatsapp && hotel.phonePrimary ? 1.4 : 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
              padding: '0.625rem 0.5rem',
              backgroundColor: '#7A1E1E',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              minHeight: '56px',
            }}
            aria-label="Book your stay"
          >
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>🛏️</span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
              }}
            >
              Book
            </span>
          </button>
        </div>
      </div>

      {/* ── Scroll-to-top button ─────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top of page"
        style={{
          position: 'fixed',
          zIndex: 89,
          borderRadius: '50%',
          backgroundColor: '#8F211F',
          color: '#FFFFFF',
          border: '1px solid rgba(214, 176, 106, 0.35)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.2s ease',
          pointerEvents: visible ? 'auto' : 'none',
        }}
        className="back-to-top-btn"
        tabIndex={visible ? 0 : -1}
      >
        <ArrowUp size={18} />
      </button>

      <style>{`
        @media (min-width: 768px) {
          .mobile-only  { display: none !important; }
          .back-to-top-btn {
            bottom: 2rem;
            right: 1.5rem;
            width: 42px;
            height: 42px;
          }
        }
        @media (max-width: 767px) {
          .mobile-only  { display: block !important; }
          .back-to-top-btn {
            bottom: calc(4.75rem + env(safe-area-inset-bottom, 0px));
            right: 1rem;
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </>
  );
};

export default MobileBookingBar;

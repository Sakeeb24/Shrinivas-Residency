import React, { useState, useEffect } from 'react';
import { Phone, Calendar } from 'lucide-react';
import { hotel, formatPhone } from '../data/hotel';
import { useScrollY } from '../hooks/useHotel';

const MobileBookingBar: React.FC = () => {
  const scrollY = useScrollY();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(scrollY > 280);
  }, [scrollY]);

  const handleCheckAvailability = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hotel.bookingUrl) {
      window.open(hotel.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Mobile quick actions"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        backgroundColor: '#16191D',
        borderTop: '1px solid rgba(197, 168, 128, 0.35)',
        boxShadow: '0 -6px 24px rgba(0, 0, 0, 0.35)',
        padding: '0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom, 0px))',
      }}
      className="mobile-action-bar-dock"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.35fr',
          gap: '0.75rem',
          maxWidth: '460px',
          margin: '0 auto',
        }}
      >
        {/* Call Action - Semantic Tel Link */}
        <a
          href="tel:+918354350125"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.85rem 0.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--radius-sm)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            minHeight: '48px',
          }}
          aria-label={`Call Shrinivas Residency at ${formatPhone(hotel.phonePrimary)}`}
        >
          <Phone size={15} color="var(--color-gold)" strokeWidth={2} />
          Call
        </a>

        {/* Check Availability Action */}
        <a
          href="#contact"
          onClick={handleCheckAvailability}
          className="btn-gold-solid"
          style={{
            padding: '0.85rem 0.75rem',
            fontSize: '0.82rem',
            minHeight: '48px',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
          }}
          aria-label="Check Room Availability"
        >
          <Calendar size={15} />
          Check Availability
        </a>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-action-bar-dock {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
};

export default MobileBookingBar;

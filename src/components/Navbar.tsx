import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useScrollY } from '../hooks/useHotel';
import { hotel, formatPhone } from '../data/hotel';

const navLinks = [
  { label: 'Home',      href: '#home' },
  { label: 'About',     href: '#about' },
  { label: 'Rooms',     href: '#rooms' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery',   href: '#gallery' },
  { label: 'Location',  href: '#location' },
  { label: 'Contact',   href: '#contact' },
];

// ── SR Logo Mark (text fallback until real logo is provided) ─
const SrLogoMark: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  const [logoError, setLogoError] = useState(true); // Start true = use fallback until file confirmed

  if (!logoError) {
    return (
      <img
        src={hotel.logoMark}
        alt=""
        aria-hidden="true"
        onError={() => setLogoError(true)}
        style={{ width: '36px', height: '36px', objectFit: 'contain' }}
      />
    );
  }

  // Text-based SR emblem fallback
  return (
    <div
      aria-hidden="true"
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: `2px solid ${isScrolled ? '#7A1E1E' : 'rgba(255,255,255,0.7)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'border-color 0.4s ease',
      }}
    >
      <span
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: isScrolled ? '#7A1E1E' : 'rgba(255,255,255,0.9)',
          lineHeight: 1,
          transition: 'color 0.4s ease',
        }}
      >
        SR
      </span>
    </div>
  );
};

const Navbar: React.FC = () => {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollY > 60;

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hotel.bookingUrl) {
      window.open(hotel.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      scrollTo('#contact');
    }
  };

  const handleCall = () => {
    if (hotel.phonePrimary) {
      window.location.href = `tel:${hotel.phonePrimary}`;
    }
  };

  const navBg = isScrolled
    ? 'rgba(250,248,243,0.97)'
    : 'transparent';

  const textColor = isScrolled ? '#172026' : 'rgba(255,255,255,0.92)';

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: navBg,
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          boxShadow: isScrolled ? '0 1px 0 rgba(11,31,42,0.08), 0 4px 20px rgba(11,31,42,0.06)' : 'none',
          transition: 'background-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: isScrolled ? '68px' : '80px',
            transition: 'height 0.3s ease',
          }}
        >
          {/* ── Logo ──────────────────────────────────────── */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            aria-label="Shrinivas Residency — Home"
          >
            <SrLogoMark isScrolled={isScrolled} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span
                className="font-serif"
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                  color: isScrolled ? '#172026' : '#FFFFFF',
                  lineHeight: 1.1,
                  transition: 'color 0.4s ease',
                }}
              >
                Shrinivas
              </span>
              <span
                style={{
                  fontSize: '0.55rem',
                  fontWeight: 600,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: isScrolled ? '#7A1E1E' : 'rgba(255,255,255,0.7)',
                  lineHeight: 1,
                  transition: 'color 0.4s ease',
                }}
              >
                Residency
              </span>
            </div>
          </a>

          {/* ── Desktop Nav ───────────────────────────────── */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="nav-link"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: textColor,
                  textDecoration: 'none',
                  transition: 'color 0.25s ease',
                  position: 'relative',
                  paddingBottom: '2px',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── Desktop CTAs ─────────────────────────────── */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            {/* Call Now */}
            {hotel.phonePrimary && (
              <button
                onClick={handleCall}
                aria-label={`Call ${formatPhone(hotel.phonePrimary)}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isScrolled ? '#172026' : 'rgba(255,255,255,0.9)',
                  backgroundColor: 'transparent',
                  border: `1px solid ${isScrolled ? 'rgba(23,32,38,0.2)' : 'rgba(255,255,255,0.35)'}`,
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isScrolled
                    ? 'rgba(23,32,38,0.06)'
                    : 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Phone size={13} strokeWidth={2} />
                Call Now
              </button>
            )}

            {/* Book Your Stay */}
            <a
              href={hotel.bookingUrl || '#contact'}
              onClick={handleBook}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.5rem 1.125rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                backgroundColor: '#7A1E1E',
                border: '1px solid #7A1E1E',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5E1717';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#7A1E1E';
              }}
            >
              Book Your Stay
            </a>
          </div>

          {/* ── Mobile Hamburger ─────────────────────────── */}
          <button
            className="nav-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: isScrolled ? '#172026' : '#FFFFFF',
              display: 'none', // shown via CSS
              transition: 'color 0.3s ease',
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile Menu ───────────────────────────────── */}
        <div
          className="nav-mobile"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(250,248,243,0.98)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(11,31,42,0.1)',
            overflow: 'hidden',
            maxHeight: menuOpen ? '600px' : '0',
            transition: 'max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'none', // shown via CSS
          }}
          role="menu"
          aria-hidden={!menuOpen}
        >
          <div style={{ padding: '0.75rem 1.5rem 1.5rem' }}>
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                role="menuitem"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#172026',
                  textDecoration: 'none',
                  padding: '0.75rem 0',
                  borderBottom: i < navLinks.length - 1 ? '1px solid #E8E2D5' : 'none',
                  letterSpacing: '0.02em',
                }}
              >
                {link.label}
              </a>
            ))}

            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {hotel.phonePrimary && (
                <a
                  href={`tel:${hotel.phonePrimary}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#172026',
                    border: '1px solid #E8E2D5',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                  }}
                >
                  <Phone size={15} />
                  {formatPhone(hotel.phonePrimary)}
                </a>
              )}
              <a
                href={hotel.bookingUrl || '#contact'}
                onClick={handleBook}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.875rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  backgroundColor: '#7A1E1E',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                }}
              >
                Book Your Stay
              </a>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @media (min-width: 960px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile  { display: none !important; }
        }
        @media (max-width: 959px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: block !important; }
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #7A1E1E;
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: #7A1E1E !important; }
        .nav-link:hover::after { width: 100%; }
      `}</style>
    </>
  );
};

export default Navbar;

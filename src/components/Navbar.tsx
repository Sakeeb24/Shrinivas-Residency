import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { useScrollY } from '../hooks/useHotel';
import { hotel, formatPhone } from '../data/hotel';

const navLinks = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'Experience', href: '#introduction' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const scrollY = useScrollY();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = scrollY > 40;

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 76;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleCheckAvailability = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          backgroundColor: isScrolled ? 'rgba(250, 248, 245, 0.96)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(232, 226, 215, 0.9)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 4px 20px rgba(22, 25, 29, 0.05)' : 'none',
          transition: 'background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
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
            height: isScrolled ? '70px' : '82px',
            transition: 'height 0.3s ease',
          }}
        >
          {/* ── Brand Logo / SR Mark ──────────────────────────── */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
            }}
            aria-label="Shrinivas Residency — Home"
          >
            {/* SR Emblem Badge */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '6px',
                border: isScrolled ? '1px solid var(--color-gold)' : '1px solid rgba(197, 168, 128, 0.7)',
                backgroundColor: isScrolled ? 'rgba(197, 168, 128, 0.08)' : 'rgba(22, 25, 29, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: isScrolled ? 'var(--color-charcoal)' : '#FFFFFF',
                  lineHeight: 1,
                }}
              >
                SR
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  color: isScrolled ? 'var(--color-charcoal)' : '#FFFFFF',
                  lineHeight: 1.15,
                  transition: 'color 0.3s ease',
                }}
              >
                Shrinivas Residency
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.62rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isScrolled ? 'var(--color-gold-dark)' : 'rgba(197, 168, 128, 0.9)',
                  lineHeight: 1,
                  marginTop: '2px',
                }}
              >
                Navanagar · Bagalkot
              </span>
            </div>
          </a>

          {/* ── Desktop Navigation Links ───────────────────────── */}
          <nav
            aria-label="Main Navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2rem',
            }}
            className="md-flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: isScrolled ? 'var(--color-text-secondary)' : 'rgba(255, 255, 255, 0.88)',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                  padding: '0.35rem 0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isScrolled ? 'var(--color-gold-dark)' : 'var(--color-gold-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isScrolled ? 'var(--color-text-secondary)' : 'rgba(255, 255, 255, 0.88)';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Desktop Actions: Phone + Check Availability ─────── */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.25rem',
            }}
            className="md-flex"
          >
            {/* Direct Phone */}
            {hotel.phonePrimary && (
              <a
                href="tel:+918354350125"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  color: isScrolled ? 'var(--color-charcoal)' : '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                title="Call Shrinivas Residency directly"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isScrolled ? 'var(--color-charcoal)' : '#FFFFFF';
                }}
              >
                <Phone size={15} color="var(--color-gold)" strokeWidth={2} />
                <span>{formatPhone(hotel.phonePrimary)}</span>
              </a>
            )}

            {/* Check Availability CTA */}
            <a
              href="#contact"
              onClick={handleCheckAvailability}
              className="btn-gold-solid"
              style={{
                padding: '0.65rem 1.4rem',
                fontSize: '0.78rem',
              }}
            >
              <Calendar size={14} />
              Check Availability
            </a>
          </div>

          {/* ── Mobile Hamburger Toggle Button ─────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="md-hidden">
            {hotel.phonePrimary && (
              <a
                href="tel:+918354350125"
                aria-label={`Call ${formatPhone(hotel.phonePrimary)}`}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isScrolled ? '1px solid var(--color-border-subtle)' : '1px solid rgba(255,255,255,0.25)',
                  backgroundColor: isScrolled ? '#FFFFFF' : 'rgba(22, 25, 29, 0.4)',
                  color: isScrolled ? 'var(--color-charcoal)' : '#FFFFFF',
                  textDecoration: 'none',
                }}
              >
                <Phone size={16} color="var(--color-gold)" strokeWidth={2} />
              </a>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isScrolled ? '#FFFFFF' : 'rgba(22, 25, 29, 0.4)',
                border: isScrolled ? '1px solid var(--color-border-subtle)' : '1px solid rgba(255,255,255,0.25)',
                borderRadius: '6px',
                color: isScrolled ? 'var(--color-charcoal)' : '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ─────────────────────────── */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 85,
            backgroundColor: 'rgba(17, 20, 23, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingTop: '82px',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderBottom: '1px solid var(--color-border-subtle)',
              padding: '2rem 1.75rem 2.5rem',
              boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className="section-eyebrow" style={{ marginBottom: '0.25rem' }}>
                Navigation
              </span>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-charcoal)', fontWeight: 600 }}>
                Shrinivas Residency
              </p>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    padding: '0.65rem 0',
                    borderBottom: '1px solid rgba(232, 226, 215, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ color: 'var(--color-gold)', fontSize: '0.85rem' }}>→</span>
                </a>
              ))}
            </nav>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
              <a
                href="#contact"
                onClick={handleCheckAvailability}
                className="btn-gold-solid"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Calendar size={16} />
                Check Availability
              </a>

              {hotel.phonePrimary && (
                <a
                  href="tel:+918354350125"
                  className="btn-outline-dark"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Phone size={15} color="var(--color-gold-dark)" />
                  Call: {formatPhone(hotel.phonePrimary)}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Responsive helper styles for header */}
      <style>{`
        @media (min-width: 768px) {
          .md-flex { display: flex !important; }
          .md-hidden { display: none !important; }
        }
        @media (max-width: 767px) {
          .md-flex { display: none !important; }
          .md-hidden { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;

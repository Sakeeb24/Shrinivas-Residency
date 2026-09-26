import React from 'react';
import { MapPin, Phone, Compass } from 'lucide-react';
import { hotel, formatPhone } from '../data/hotel';

const quickLinks = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'Experience', href: '#introduction' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Footer navigation and property information"
      style={{
        backgroundColor: '#111417',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#FFFFFF',
        padding: '5rem 1.5rem 2.5rem',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* ── 3-Column Sophisticated Dark Layout (Section 18) ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3.5rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* ── Column 1: Brand & Property Description ──────── */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                marginBottom: '1.25rem',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--color-gold)',
                  backgroundColor: 'rgba(197, 168, 128, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                SR
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    color: '#FFFFFF',
                    display: 'block',
                    lineHeight: 1.15,
                  }}
                >
                  Shrinivas Residency
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold)',
                  }}
                >
                  Bagalkot · Karnataka
                </span>
              </div>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                color: 'rgba(255, 255, 255, 0.72)',
                lineHeight: 1.7,
                maxWidth: '340px',
              }}
            >
              A comfortable and welcoming stay near Police Palace Circle in Navanagar, Bagalkot. Dedicated to dependable hospitality, clean rooms, and guest convenience.
            </p>
          </div>

          {/* ── Column 2: Quick Links ────────────────────────── */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-light)',
                marginBottom: '1.5rem',
              }}
            >
              Quick Links
            </h3>

            <nav
              aria-label="Footer links"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {quickLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    color: 'rgba(255, 255, 255, 0.75)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease, transform 0.2s ease',
                    display: 'inline-block',
                    width: 'fit-content',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-gold)';
                    e.currentTarget.style.transform = 'translateX(3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Column 3: Contact & Location ─────────────────── */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-light)',
                marginBottom: '1.5rem',
              }}
            >
              Contact & Location
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {/* Address */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={17} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <address style={{ fontStyle: 'normal', lineHeight: 1.6 }}>
                  Plot No. 15-D, Sector No. 35<br />
                  Police Palace Circle, Navanagar<br />
                  Bagalkot, Karnataka — 587103
                </address>
              </div>

              {/* Verified Phone 1 */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={16} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <a
                  href={`tel:${hotel.phonePrimaryTel}`}
                  style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 500 }}
                  aria-label={`Call primary phone ${formatPhone(hotel.phonePrimary)}`}
                >
                  {formatPhone(hotel.phonePrimary)}
                </a>
              </div>

              {/* Verified Phone 2 */}
              {hotel.phoneSecondary && (
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <Phone size={16} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                  <a
                    href={`tel:${hotel.phoneSecondaryTel}`}
                    style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 500 }}
                    aria-label={`Call alternative phone ${formatPhone(hotel.phoneSecondary)}`}
                  >
                    {formatPhone(hotel.phoneSecondary)}
                  </a>
                </div>
              )}

              {/* Plus Code */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.25rem' }}>
                <Compass size={16} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <a
                  href={hotel.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}
                  aria-label="View Plus Code 5M59+52 Bagalkot on Google Maps"
                >
                  Plus Code: 5M59+52 Bagalkot, Karnataka
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer Bottom Row ─────────────────────────────── */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.78rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <p>© {year} Shrinivas Residency. All rights reserved.</p>
          <p>Sector No. 35, Navanagar, Bagalkot, Karnataka — 587103, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

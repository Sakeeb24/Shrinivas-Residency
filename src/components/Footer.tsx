import React, { useState } from 'react';
import { MapPin, Phone, ExternalLink, MessageCircle } from 'lucide-react';
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

/** Convert raw Indian phone number to tel:+91... format */
function getTelHref(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('0')) {
    return `tel:+91${digits.slice(1)}`;
  }
  if (digits.length === 10) {
    return `tel:+91${digits}`;
  }
  return `tel:${raw}`;
}

const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);
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
      className="site-footer"
      role="contentinfo"
      aria-label="Footer navigation and property details"
    >
      <div className="footer-container">
        {/* ── 3 Columns Layout ──────────────────────────────── */}
        <div className="footer-columns">
          {/* ── COLUMN 1: BRAND ─────────────────────────────── */}
          <div className="footer-col-brand">
            {/* SR Logo + Name */}
            <a
              href="#home"
              onClick={(e) => scrollTo(e, '#home')}
              className="footer-brand-link"
              aria-label="Shrinivas Residency — Return to top"
            >
              {!logoError ? (
                <img
                  src={hotel.logoMark}
                  alt="Shrinivas Residency emblem"
                  onError={() => setLogoError(true)}
                  className="footer-logo-img"
                />
              ) : (
                <div className="footer-logo-emblem" aria-hidden="true">
                  <span>SR</span>
                </div>
              )}
              <div className="footer-brand-text">
                <span className="footer-brand-title">SHRINIVAS</span>
                <span className="footer-brand-subtitle">RESIDENCY</span>
              </div>
            </a>

            <p className="footer-tagline">
              A comfortable and welcoming stay near Police Palace Circle in Navanagar, Bagalkot.
            </p>

            {/* Optional Social Links (only if configured) */}
            {(hotel.social.facebook || hotel.social.instagram || hotel.social.twitter) && (
              <div className="footer-social-row">
                {hotel.social.facebook && (
                  <SocialLink href={hotel.social.facebook} label="Facebook">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </SocialLink>
                )}
                {hotel.social.instagram && (
                  <SocialLink href={hotel.social.instagram} label="Instagram">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><circle cx="17.5" cy="6.5" r=".5"/></svg>
                  </SocialLink>
                )}
                {hotel.social.twitter && (
                  <SocialLink href={hotel.social.twitter} label="X / Twitter">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </SocialLink>
                )}
              </div>
            )}
          </div>

          {/* ── COLUMN 2: QUICK LINKS ───────────────────────── */}
          <div className="footer-col-links">
            <h3 className="footer-heading">QUICK LINKS</h3>
            <nav aria-label="Footer navigation">
              <ul className="footer-nav-list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      className="footer-nav-link"
                    >
                      <span className="link-bullet" aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── COLUMN 3: CONTACT ───────────────────────────── */}
          <div className="footer-col-contact">
            <h3 className="footer-heading">CONTACT & LOCATION</h3>

            {/* Address */}
            <div className="footer-contact-item">
              <MapPin size={17} className="footer-icon" aria-hidden="true" />
              <address className="footer-address">
                {hotel.address.plot}, {hotel.address.sector},<br />
                {hotel.address.landmark},<br />
                {hotel.address.locality},<br />
                {hotel.address.city}, {hotel.address.state} — {hotel.address.pincode}
              </address>
            </div>

            {/* Phone 1 */}
            {hotel.phonePrimary && (
              <div className="footer-contact-item">
                <Phone size={16} className="footer-icon" aria-hidden="true" />
                <a
                  href={getTelHref(hotel.phonePrimary)}
                  className="footer-phone-link"
                  aria-label={`Call primary phone ${formatPhone(hotel.phonePrimary)}`}
                >
                  {formatPhone(hotel.phonePrimary)}
                </a>
              </div>
            )}

            {/* Phone 2 */}
            {hotel.phoneSecondary && (
              <div className="footer-contact-item">
                <Phone size={16} className="footer-icon" aria-hidden="true" />
                <a
                  href={getTelHref(hotel.phoneSecondary)}
                  className="footer-phone-link"
                  aria-label={`Call secondary phone ${formatPhone(hotel.phoneSecondary)}`}
                >
                  {formatPhone(hotel.phoneSecondary)}
                </a>
              </div>
            )}

            {/* WhatsApp (Only clickable/rendered if configured) */}
            {hotel.whatsapp && (
              <div className="footer-contact-item">
                <MessageCircle size={16} className="footer-icon-whatsapp" aria-hidden="true" />
                <a
                  href={`https://wa.me/${hotel.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-phone-link footer-whatsapp-link"
                  aria-label="Chat on WhatsApp"
                >
                  Chat on WhatsApp
                </a>
              </div>
            )}

            {/* Plus Code */}
            <div className="footer-contact-item">
              <ExternalLink size={15} className="footer-icon" aria-hidden="true" />
              <a
                href={hotel.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-pluscode-link"
                aria-label={`Open location ${hotel.plusCode} in Google Maps`}
              >
                {hotel.plusCode}
              </a>
            </div>
          </div>
        </div>

        {/* ── COPYRIGHT ROW ─────────────────────────────────── */}
        <div className="footer-divider" />
        <div className="footer-copyright-row">
          <p className="footer-copyright-text">
            © {year} {hotel.name}. All rights reserved.
          </p>
          <p className="footer-location-text">
            {hotel.address.landmark}, {hotel.address.locality}, {hotel.address.city}, {hotel.address.state}
          </p>
        </div>
      </div>

      {/* ── High-Contrast & Elegant Scoped Styling ────────────────── */}
      <style>{`
        .site-footer {
          background: linear-gradient(180deg, #1A1E24 0%, #121519 100%);
          border-top: 1px solid rgba(201, 154, 62, 0.28);
          color: #E2DDD8;
          padding-top: 5rem;
          padding-bottom: 3.5rem;
          width: 100%;
          position: relative;
        }

        .footer-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .footer-columns {
          display: grid;
          grid-template-columns: 1.35fr 0.9fr 1.35fr;
          gap: 3.5rem;
          margin-bottom: 3rem;
        }

        /* Column 1: Brand */
        .footer-brand-link {
          display: inline-flex;
          align-items: center;
          gap: 0.875rem;
          text-decoration: none;
          margin-bottom: 1.25rem;
        }

        .footer-logo-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
        }

        .footer-logo-emblem {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid #C99A3E;
          background: rgba(201, 154, 62, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 14px rgba(201, 154, 62, 0.25);
        }

        .footer-logo-emblem span {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #F0C475;
          line-height: 1;
        }

        .footer-brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }

        .footer-brand-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.04em;
        }

        .footer-brand-subtitle {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #E8C472;
          margin-top: 3px;
        }

        .footer-tagline {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.92rem;
          line-height: 1.7;
          color: #D6CFCA;
          max-width: 330px;
          margin-bottom: 1.5rem;
        }

        .footer-social-row {
          display: flex;
          gap: 0.75rem;
        }

        /* Column Headings */
        .footer-heading {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #F0C475;
          margin-bottom: 1.35rem;
          padding-bottom: 0.5rem;
          display: inline-block;
          border-bottom: 2px solid rgba(240, 196, 117, 0.35);
        }

        /* Column 2: Navigation */
        .footer-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-nav-link {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.92rem;
          color: #DAD3CC;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .link-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #C99A3E;
          opacity: 0.75;
          transition: transform 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;
        }

        .footer-nav-link:hover {
          color: #FFFFFF;
          transform: translateX(4px);
        }

        .footer-nav-link:hover .link-bullet {
          background-color: #F0C475;
          opacity: 1;
          transform: scale(1.4);
        }

        /* Column 3: Contact */
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.9rem;
        }

        .footer-icon {
          color: #F0C475;
          margin-top: 3px;
          flex-shrink: 0;
        }

        .footer-icon-whatsapp {
          color: #22C55E;
          margin-top: 3px;
          flex-shrink: 0;
        }

        .footer-address {
          font-style: normal;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.92rem;
          line-height: 1.7;
          color: #DAD3CC;
        }

        .footer-phone-link {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #FFFFFF;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          min-height: 28px;
        }

        .footer-phone-link:hover {
          color: #F0C475;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .footer-whatsapp-link {
          color: #22C55E;
        }

        .footer-whatsapp-link:hover {
          color: #4ADE80;
        }

        .footer-pluscode-link {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #F0C475;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
        }

        .footer-pluscode-link:hover {
          color: #FFFFFF;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* Divider & Copyright */
        .footer-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.16);
          margin-bottom: 1.75rem;
        }

        .footer-copyright-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .footer-copyright-text,
        .footer-location-text {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.86rem;
          color: #C7BFB6;
          margin: 0;
          line-height: 1.6;
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .site-footer {
            padding-top: 4rem;
            padding-bottom: 3.5rem;
          }
          .footer-columns {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .footer-col-contact {
            grid-column: span 2;
          }
        }

        @media (max-width: 640px) {
          .site-footer {
            padding-top: 3.5rem;
            /* Generous bottom padding clearing the sticky mobile action bar */
            padding-bottom: calc(4.5rem + 72px + env(safe-area-inset-bottom, 0px));
          }

          .footer-container {
            padding: 0 20px;
          }

          .footer-columns {
            grid-template-columns: 1fr;
            gap: 2.25rem;
            margin-bottom: 2.25rem;
          }

          .footer-col-contact {
            grid-column: span 1;
          }

          .footer-phone-link {
            font-size: 1rem;
            min-height: 36px;
          }

          .footer-copyright-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.6rem;
          }

          .footer-copyright-text,
          .footer-location-text {
            font-size: 0.82rem;
          }
        }
      `}</style>
    </footer>
  );
};

// Social icon component
const SocialLink: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({
  href,
  label,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Follow us on ${label}`}
    style={{
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      border: '1px solid rgba(255, 255, 255, 0.22)',
      background: 'rgba(255, 255, 255, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#E2DDD8',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#F0C475';
      e.currentTarget.style.color = '#FFFFFF';
      e.currentTarget.style.background = 'rgba(240, 196, 117, 0.15)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
      e.currentTarget.style.color = '#E2DDD8';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.transform = 'none';
    }}
  >
    {children}
  </a>
);

export default Footer;

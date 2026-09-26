import React, { useState } from 'react';
import { Calendar, Phone, CheckCircle, Sparkles } from 'lucide-react';
import { hotel, formatPhone } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';
import { use3DTilt } from '../hooks/use3D';

const ContactCTA: React.FC = () => {
  useScrollReveal();
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', dates: '', message: '' });
  const { ref: formRef, style: formStyle, glare, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLDivElement>(4, 1200);

  const handleCheckAvailability = (_e?: React.MouseEvent) => {
    if (hotel.bookingUrl) {
      window.open(hotel.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      const nameInput = document.getElementById('cta-guest-name');
      if (nameInput) nameInput.focus();
    }
  };

  const handleCall = () => {
    if (hotel.phonePrimary) {
      window.location.href = `tel:${hotel.phonePrimary}`;
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <section
      id="contact"
      aria-label="Direct booking inquiry and contact"
      style={{
        padding: '7.5rem 1.5rem',
        backgroundColor: '#16191D',
        position: 'relative',
        overflow: 'hidden',
        color: '#FFFFFF',
      }}
      className="perspective-1500"
    >
      {/* ── 3D Subtle Ambient Atmospheric Lighting ─────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-25%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(197, 168, 128, 0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-25%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(197, 168, 128, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* ── Left Column: Editorial Headline & Actions (Section 16) ── */}
          <div className="reveal-hidden">
            <div className="section-eyebrow section-eyebrow-dark">
              <span>RESERVATIONS & DIRECT INQUIRIES</span>
            </div>

            {/* Exact Headline as specified in Section 21 */}
            <h2
              className="headline-serif"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                color: '#FFFFFF',
                lineHeight: 1.08,
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
              }}
            >
              YOUR STAY
              <br />
              <span style={{ color: 'var(--color-gold-light)', fontStyle: 'italic' }}>
                STARTS HERE.
              </span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-light)',
                fontWeight: 600,
                marginBottom: '0.85rem',
              }}
            >
              Shrinivas Residency · Navanagar, Bagalkot
            </p>

            {/* Supporting Text as specified in Section 21 */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.02rem',
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.7,
                marginBottom: '2.25rem',
                maxWidth: '480px',
              }}
            >
              Get in touch with Shrinivas Residency for availability and stay information.
            </p>

            {/* Primary CTA & Secondary CTA per Section 21 */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '2.5rem',
              }}
            >
              <a
                href="tel:+918354350125"
                className="btn-gold-solid"
                style={{ padding: '0.95rem 2.25rem', fontSize: '0.85rem', letterSpacing: '0.06em' }}
              >
                <Phone size={15} />
                Call to Enquire
              </a>

              <button
                type="button"
                onClick={handleCheckAvailability}
                className="btn-outline-light"
                style={{ padding: '0.95rem 2rem', fontSize: '0.85rem' }}
              >
                <Calendar size={15} color="var(--color-gold)" />
                Check Availability
              </button>
            </div>

            {/* Verified Direct Phone Contacts */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <Phone size={16} color="var(--color-gold)" />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'rgba(255,255,255,0.9)' }}>
                  Primary Desk:{' '}
                  <a
                    href="tel:+918354350125"
                    style={{ color: '#FFFFFF', fontWeight: 600, textDecoration: 'none', marginLeft: '0.25rem' }}
                  >
                    {formatPhone(hotel.phonePrimary)}
                  </a>
                </span>
              </div>

              {hotel.phoneSecondary && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <Phone size={16} color="var(--color-gold)" />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'rgba(255,255,255,0.9)' }}>
                    Alternative Line:{' '}
                    <a
                      href="tel:+919448946728"
                      style={{ color: '#FFFFFF', fontWeight: 600, textDecoration: 'none', marginLeft: '0.25rem' }}
                    >
                      {formatPhone(hotel.phoneSecondary)}
                    </a>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Right Column: 3D Direct Stay Inquiry Plinth ──── */}
          <div
            ref={formRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="reveal-hidden preserve-3d"
            style={{
              ...formStyle,
              backgroundColor: '#1E2328',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(2rem, 4vw, 2.75rem)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Interactive Glare Layer */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 60%)`,
                transition: 'opacity 0.2s ease-out',
                zIndex: 6,
              }}
            />

            <div style={{ marginBottom: '1.5rem' }} className="layer-z-20">
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-light)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginBottom: '0.35rem',
                }}
              >
                <Sparkles size={12} color="var(--color-gold)" />
                Direct Inquiry
              </span>
              <h3
                className="headline-serif"
                style={{ fontSize: '1.6rem', color: '#FFFFFF', lineHeight: 1.25 }}
              >
                Inquire With the Property
              </h3>
            </div>

            {!inquirySent ? (
              <form
                onSubmit={handleSubmitInquiry}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}
                className="layer-z-10"
              >
                <div>
                  <label
                    htmlFor="cta-guest-name"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.7)',
                      marginBottom: '0.35rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    id="cta-guest-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      backgroundColor: 'rgba(22, 25, 29, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      borderRadius: 'var(--radius-xs)',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="cta-phone"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.7)',
                      marginBottom: '0.35rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Contact Phone Number
                  </label>
                  <input
                    id="cta-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      backgroundColor: 'rgba(22, 25, 29, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      borderRadius: 'var(--radius-xs)',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="cta-dates"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.7)',
                      marginBottom: '0.35rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Expected Check-In / Dates
                  </label>
                  <input
                    id="cta-dates"
                    type="text"
                    value={formData.dates}
                    onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                    placeholder="e.g. Tomorrow for 2 nights"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      backgroundColor: 'rgba(22, 25, 29, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      borderRadius: 'var(--radius-xs)',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold-solid"
                  style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
                >
                  Send Stay Inquiry
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }} className="layer-z-20">
                <CheckCircle size={44} color="var(--color-gold)" style={{ margin: '0 auto 1rem' }} />
                <h4 className="headline-serif" style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  Inquiry Received
                </h4>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Thank you, {formData.name || 'guest'}. For immediate confirmation, you can also reach our front desk directly at {formatPhone(hotel.phonePrimary)}.
                </p>
                <button
                  type="button"
                  onClick={handleCall}
                  className="btn-outline-light"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Phone size={14} color="var(--color-gold)" />
                  Call Front Desk Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;

import React, { useState } from 'react';
import { Calendar, Users, ChevronDown, Search } from 'lucide-react';
import { hotel } from '../data/hotel';
import { useIsMobile } from '../hooks/useHotel';

interface FormState {
  checkIn: string;
  checkOut: string;
  guests: string;
}

interface FormErrors {
  checkIn?: string;
  checkOut?: string;
}

const BookingBar: React.FC = () => {
  const isMobile = useIsMobile();
  const [form, setForm] = useState<FormState>({ checkIn: '', checkOut: '', guests: '1' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.checkIn) errs.checkIn = 'Select check-in date';
    if (!form.checkOut) errs.checkOut = 'Select check-out date';
    if (form.checkIn && form.checkOut && form.checkIn >= form.checkOut) {
      errs.checkOut = 'Check-out must be after check-in';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // If a real booking URL is configured, redirect there
    if (hotel.bookingUrl) {
      const url = new URL(hotel.bookingUrl);
      if (form.checkIn) url.searchParams.set('checkin', form.checkIn);
      if (form.checkOut) url.searchParams.set('checkout', form.checkOut);
      url.searchParams.set('guests', form.guests);
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    } else {
      // No booking engine — scroll to contact
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 2200);
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#6B7280',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    marginBottom: '0.4rem',
  };

  const inputStyle = (err: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '0.55rem 0.75rem',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    color: '#172026',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `2px solid ${err ? '#EF4444' : '#E8E2D5'}`,
    outline: 'none',
    transition: 'border-color 0.2s ease',
    appearance: 'none',
    borderRadius: 0,
  });

  return (
    <section id="booking" aria-label="Check availability">
      <div
        style={{
          maxWidth: '1100px',
          margin: '-3.5rem auto 0',
          padding: '0 1.5rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '0.75rem',
            boxShadow: '0 20px 60px rgba(11,31,42,0.14)',
            padding: isMobile ? '1.5rem' : '2rem 2.5rem',
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#7A1E1E',
              }}
            >
              Check Availability
            </span>
            <h2
              className="font-serif"
              style={{ fontSize: '1.4rem', fontWeight: 600, color: '#0B1F2A', marginTop: '0.2rem' }}
            >
              Plan Your Stay
            </h2>
            {!hotel.bookingUrl && (
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  color: '#6B7280',
                  marginTop: '0.3rem',
                }}
              >
                Complete the form and we'll connect you with our team for availability.
              </p>
            )}
          </div>

          {submitted && (
            <div
              role="alert"
              style={{
                backgroundColor: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: '0.5rem',
                padding: '0.875rem 1rem',
                marginBottom: '1.25rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                color: '#9A3412',
              }}
            >
              Connecting you to our reservations team…
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '1.25rem' : '0',
                alignItems: isMobile ? 'stretch' : 'flex-end',
              }}
            >
              {/* Check-in */}
              <div style={{ flex: 1, minWidth: isMobile ? '100%' : '150px' }}>
                <label htmlFor="checkin" style={labelStyle}>
                  <Calendar size={11} />
                  Check-in
                </label>
                <input
                  id="checkin"
                  type="date"
                  min={today}
                  value={form.checkIn}
                  onChange={(e) => handleChange('checkIn', e.target.value)}
                  style={inputStyle(!!errors.checkIn)}
                  onFocus={(e) => (e.target.style.borderBottomColor = '#7A1E1E')}
                  onBlur={(e) => (e.target.style.borderBottomColor = errors.checkIn ? '#EF4444' : '#E8E2D5')}
                  aria-invalid={!!errors.checkIn}
                  aria-describedby={errors.checkIn ? 'err-checkin' : undefined}
                />
                {errors.checkIn && (
                  <span id="err-checkin" style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: '0.2rem', display: 'block' }}>
                    {errors.checkIn}
                  </span>
                )}
              </div>

              {!isMobile && <div style={{ width: '1px', height: '52px', backgroundColor: '#E8E2D5', margin: '0 0.5rem', alignSelf: 'flex-end', marginBottom: '2px' }} />}

              {/* Check-out */}
              <div style={{ flex: 1, minWidth: isMobile ? '100%' : '150px' }}>
                <label htmlFor="checkout" style={labelStyle}>
                  <Calendar size={11} />
                  Check-out
                </label>
                <input
                  id="checkout"
                  type="date"
                  min={form.checkIn || today}
                  value={form.checkOut}
                  onChange={(e) => handleChange('checkOut', e.target.value)}
                  style={inputStyle(!!errors.checkOut)}
                  onFocus={(e) => (e.target.style.borderBottomColor = '#7A1E1E')}
                  onBlur={(e) => (e.target.style.borderBottomColor = errors.checkOut ? '#EF4444' : '#E8E2D5')}
                  aria-invalid={!!errors.checkOut}
                  aria-describedby={errors.checkOut ? 'err-checkout' : undefined}
                />
                {errors.checkOut && (
                  <span id="err-checkout" style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: '0.2rem', display: 'block' }}>
                    {errors.checkOut}
                  </span>
                )}
              </div>

              {!isMobile && <div style={{ width: '1px', height: '52px', backgroundColor: '#E8E2D5', margin: '0 0.5rem', alignSelf: 'flex-end', marginBottom: '2px' }} />}

              {/* Guests */}
              <div style={{ flex: 1, minWidth: isMobile ? '100%' : '120px' }}>
                <label htmlFor="guests" style={labelStyle}>
                  <Users size={11} />
                  Guests
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="guests"
                    value={form.guests}
                    onChange={(e) => handleChange('guests', e.target.value)}
                    style={{ ...inputStyle(false), paddingRight: '1.5rem', cursor: 'pointer' }}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  <ChevronDown size={13} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }} />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.75rem',
                  backgroundColor: '#7A1E1E',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  marginLeft: isMobile ? '0' : '1.25rem',
                  marginTop: isMobile ? '0' : '1.4rem',
                  transition: 'all 0.25s ease',
                  width: isMobile ? '100%' : 'auto',
                  minWidth: isMobile ? 'unset' : '170px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#5E1717';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#7A1E1E';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <Search size={15} />
                Check Availability
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingBar;

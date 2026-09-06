import React, { useRef, useEffect, useState } from 'react';
import { Star, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { hotel, formatPhone } from '../data/hotel';
import { useIsMobile } from '../hooks/useHotel';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const isMobile = useIsMobile();

  const useVideo = hotel.heroMediaType === 'VIDEO';
  const videoSrc = isMobile ? hotel.mobileHeroVideo : hotel.heroVideo;

  useEffect(() => {
    if (useVideo && videoRef.current) {
      videoRef.current.load();
    }
  }, [useVideo, videoSrc]);

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hotel.bookingUrl) {
      window.open(hotel.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCall = () => {
    if (hotel.phonePrimary) {
      window.location.href = `tel:${hotel.phonePrimary}`;
    }
  };

  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        fill={i < Math.floor(hotel.rating) ? '#C99A3E' : 'none'}
        stroke="#C99A3E"
        strokeWidth={1.5}
        style={{ flexShrink: 0 }}
      />
    ));

  return (
    <section
      id="home"
      className="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '100svh' : '100vh',
        minHeight: isMobile ? '580px' : '640px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Welcome to Shrinivas Residency"
    >
      {/* ── Background media ────────────────────────────────── */}
      {useVideo && !videoFailed ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={hotel.heroImage}
          onError={() => setVideoFailed(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
        >
          {!imgFailed ? (
            <img
              src={hotel.heroImage}
              alt=""
              onError={() => setImgFailed(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                animation: 'slowZoom 16s ease-in-out infinite alternate',
              }}
            />
          ) : (
            /* Gradient fallback — no broken image icon shown */
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(160deg, #1A0A0A 0%, #2C1414 35%, #0B1F2A 100%)',
              }}
            />
          )}
        </div>
      )}

      {/* ── Dark Translucent Overlay ───────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: isMobile
            ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.45) 45%, rgba(0, 0, 0, 0.75) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.38) 50%, rgba(0, 0, 0, 0.55) 100%)'
            : 'linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.38) 45%, rgba(0, 0, 0, 0.68) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.32) 50%, rgba(0, 0, 0, 0.45) 100%)',
        }}
      />

      {/* ── Content ─────────────────────────────────────────── */}
      <div
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 1.25rem',
          maxWidth: '820px',
          width: '100%',
        }}
      >
        {/* Label */}
        <div
          className="animate-fade-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.875rem',
            marginBottom: '1.25rem',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          <span style={{ display: 'block', width: '1.75rem', height: '1px', background: 'rgba(201,154,62,0.85)' }} />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C99A3E',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
            }}
          >
            Welcome to
          </span>
          <span style={{ display: 'block', width: '1.75rem', height: '1px', background: 'rgba(201,154,62,0.85)' }} />
        </div>

        {/* Main title */}
        <h1
          className="font-serif animate-fade-up delay-200"
          style={{
            fontSize: isMobile ? 'clamp(2.4rem, 9vw, 3.2rem)' : 'clamp(2.8rem, 5.5vw, 4.5rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '0.02em',
            marginBottom: '0.875rem',
            opacity: 0,
            animationFillMode: 'forwards',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.55), 0 1px 3px rgba(0, 0, 0, 0.4)',
          }}
        >
          Shrinivas Residency
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up delay-300"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: isMobile ? '1.15rem' : '1.35rem',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.92)',
            marginBottom: '0.75rem',
            opacity: 0,
            animationFillMode: 'forwards',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
          }}
        >
          {hotel.tagline}
        </p>

        {/* Description */}
        <p
          className="animate-fade-up delay-400"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.92rem',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '480px',
            margin: '0 auto 2rem',
            lineHeight: 1.75,
            opacity: 0,
            animationFillMode: 'forwards',
            textShadow: '0 1px 6px rgba(0, 0, 0, 0.4)',
          }}
        >
          {hotel.description}
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-up delay-500"
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '0.75rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2rem',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          {/* Primary: Book */}
          <a
            href={hotel.bookingUrl || '#contact'}
            onClick={handleBook}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              backgroundColor: '#7A1E1E',
              color: '#FFFFFF',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              border: '1px solid #7A1E1E',
              transition: 'all 0.25s ease',
              width: isMobile ? '100%' : 'auto',
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
            Book Your Stay
            <ArrowRight size={15} />
          </a>

          {/* Secondary: Call Now */}
          {hotel.phonePrimary ? (
            <a
              href={`tel:${hotel.phonePrimary}`}
              onClick={(e) => { e.preventDefault(); handleCall(); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.45)',
                transition: 'all 0.25s ease',
                width: isMobile ? '100%' : 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
              }}
            >
              <Phone size={14} strokeWidth={2} />
              {formatPhone(hotel.phonePrimary)}
            </a>
          ) : (
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                backgroundColor: 'transparent',
                color: 'rgba(255,255,255,0.85)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.4)',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Contact Us
            </a>
          )}
        </div>

        {/* Rating Badge */}
        <div
          className="animate-fade-up delay-600"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,154,62,0.25)',
            borderRadius: '2rem',
            padding: '0.45rem 0.875rem',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
          aria-label={`Google Rating: ${hotel.rating} out of 5, ${hotel.reviewCount} reviews`}
        >
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            {renderStars()}
          </div>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1,
            }}
          >
            {hotel.rating}
          </span>
          <span
            style={{
              width: '1px',
              height: '12px',
              backgroundColor: 'rgba(255,255,255,0.25)',
              display: 'block',
            }}
          />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1,
            }}
          >
            {hotel.reviewCount} Google Reviews
          </span>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────── */}
      <button
        onClick={handleScrollDown}
        aria-label="Scroll to about section"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          color: 'rgba(255,255,255,0.5)',
          padding: '0.5rem',
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#C99A3E')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <ChevronDown size={18} className="animate-scroll-bounce" />
      </button>
    </section>
  );
};

export default Hero;

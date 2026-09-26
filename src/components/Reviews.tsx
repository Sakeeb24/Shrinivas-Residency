import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { hotel } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';
import { use3DTilt } from '../hooks/use3D';

const Reviews: React.FC = () => {
  useScrollReveal();
  const { ref, style, glare, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLDivElement>(5, 1100);

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const isFull = i < Math.floor(hotel.rating);
      return (
        <Star
          key={i}
          size={24}
          fill={isFull ? 'var(--color-gold)' : 'none'}
          color="var(--color-gold)"
          strokeWidth={1.5}
        />
      );
    });
  };

  return (
    <section
      id="reviews"
      aria-label="Verified guest feedback and ratings"
      style={{
        padding: '7.5rem 1.5rem',
        backgroundColor: 'var(--color-canvas)',
        borderTop: '1px solid var(--color-border-subtle)',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '840px',
          margin: '0 auto',
          textAlign: 'center',
        }}
        className="perspective-1000"
      >
        {/* ── Eyebrow ────────────────────────────────────────── */}
        <div className="section-eyebrow with-lines reveal-hidden" style={{ justifyContent: 'center' }}>
          <span>GUEST RATINGS</span>
        </div>

        {/* ── Headline (Section 14) ─────────────────────────── */}
        <h2
          className="headline-serif reveal-hidden"
          style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            color: 'var(--color-charcoal)',
            marginBottom: '1rem',
          }}
        >
          Guests Choose Us for Comfort & Convenience
        </h2>

        <p
          className="reveal-hidden"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '560px',
            margin: '0 auto 3rem',
            lineHeight: 1.65,
          }}
        >
          Our verified Google rating reflects the consistent experiences of travellers staying at Shrinivas Residency in Navanagar, Bagalkot.
        </p>

        {/* ── 3D Clean Rating Plinth (Section 14) ───────────── */}
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="reveal-hidden preserve-3d"
          style={{
            ...style,
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '3.25rem 2.25rem',
            boxShadow: 'var(--shadow-3d-card)',
            maxWidth: '620px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Glare reflection */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 60%)`,
              transition: 'opacity 0.2s ease-out',
              zIndex: 4,
            }}
          />

          {/* Google Verified Indicator */}
          <div
            className="layer-z-20"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--color-surface-cream)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-xs)',
              padding: '0.4rem 0.85rem',
              marginBottom: '1.75rem',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-charcoal)',
                letterSpacing: '0.04em',
              }}
            >
              Verified Google Business Profile
            </span>
          </div>

          {/* Large Rating Number: 4.5 / 5 */}
          <div
            className="layer-z-30"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: '0.35rem',
              marginBottom: '0.75rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(4.2rem, 8vw, 5.5rem)',
                fontWeight: 700,
                color: 'var(--color-charcoal)',
                lineHeight: 1,
              }}
            >
              4.5
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              / 5
            </span>
          </div>

          {/* Gold Stars */}
          <div
            className="layer-z-20"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.35rem',
              marginBottom: '1rem',
            }}
            role="img"
            aria-label="4.5 out of 5 stars"
          >
            {renderStars()}
          </div>

          {/* Review Count: 75 reviews */}
          <p
            className="layer-z-10"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--color-charcoal)',
              marginBottom: '0.5rem',
            }}
          >
            {hotel.reviewCount} reviews
          </p>

          <p
            className="layer-z-10"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              marginBottom: '2rem',
            }}
          >
            Real guest ratings collected on Google Maps
          </p>

          {/* Google Reviews Action */}
          <div className="layer-z-20">
            <a
              href={hotel.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
              style={{ padding: '0.85rem 1.85rem' }}
            >
              View Verified Google Reviews
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

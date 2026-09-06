import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { hotel } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';

const Reviews: React.FC = () => {
  useScrollReveal();

  const fullStars = Math.floor(hotel.rating);
  const hasHalf = hotel.rating % 1 >= 0.5;

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const filled = i < fullStars;
      const half = !filled && hasHalf && i === fullStars;
      return (
        <Star
          key={i}
          size={28}
          fill={filled || half ? '#C99A3E' : 'none'}
          stroke="#C99A3E"
          strokeWidth={1.5}
        />
      );
    });
  };

  return (
    <section
      id="reviews"
      style={{
        padding: '6rem 1.5rem',
        backgroundColor: '#FAF8F3',
      }}
      aria-label="Google Reviews"
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Google Icon */}
        <div
          className="reveal-hidden"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E2D5',
            borderRadius: '2rem',
            padding: '0.5rem 1.25rem',
          }}
        >
          {/* Google G icon */}
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#6B7280',
              letterSpacing: '0.08em',
            }}
          >
            Google Reviews
          </span>
        </div>

        {/* Rating number */}
        <div
          className="reveal-hidden"
          style={{
            fontSize: '6rem',
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 700,
            color: '#0B1F2A',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
          aria-label={`Rating: ${hotel.rating} out of 5`}
        >
          {hotel.rating}
        </div>

        {/* Stars */}
        <div
          className="reveal-hidden"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.25rem',
            marginBottom: '1rem',
          }}
          role="img"
          aria-label={`${hotel.rating} out of 5 stars`}
        >
          {renderStars()}
        </div>

        {/* Review count */}
        <p
          className="reveal-hidden"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            color: '#6B7280',
            marginBottom: '1.5rem',
          }}
        >
          Based on{' '}
          <strong style={{ color: '#0B1F2A' }}>{hotel.reviewCount} Google Reviews</strong>
        </p>

        {/* Tagline */}
        <p
          className="reveal-hidden font-serif"
          style={{
            fontSize: '1.35rem',
            fontStyle: 'italic',
            color: '#6B7280',
            maxWidth: '480px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}
        >
          "See why guests choose Shrinivas Residency for their stay in Bagalkot."
        </p>

        {/* CTA */}
        <a
          href={hotel.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary reveal-hidden"
          style={{ display: 'inline-flex' }}
        >
          View Google Reviews
          <ExternalLink size={15} />
        </a>

        {/* Disclaimer */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: '#6B7280',
            marginTop: '1.5rem',
            fontStyle: 'italic',
            opacity: 0.7,
          }}
        >
          Reviews sourced from Google Maps. Individual review text not reproduced.
        </p>
      </div>
    </section>
  );
};

export default Reviews;

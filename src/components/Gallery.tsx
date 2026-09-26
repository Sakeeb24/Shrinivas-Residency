import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { hotelImages, galleryCategories } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';
import { use3DTilt } from '../hooks/use3D';

type GalleryItem = typeof hotelImages.gallery[0];

const Gallery: React.FC = () => {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === 'All'
    ? hotelImages.gallery
    : hotelImages.gallery.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev! + 1) % filteredImages.length));
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev! - 1 + filteredImages.length) % filteredImages.length));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, filteredImages.length]);

  return (
    <section
      id="gallery"
      aria-label="3D Property Photography Exhibition"
      style={{
        padding: '7rem 1.5rem',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* ── Section Header ───────────────────────────────── */}
        <div className="reveal-hidden" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-eyebrow with-lines" style={{ justifyContent: 'center' }}>
            <span>SEE THE RESIDENCY</span>
          </div>

          <h2
            className="headline-serif"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: 'var(--color-charcoal)',
              maxWidth: '680px',
              margin: '0 auto 1rem',
            }}
          >
            A Glimpse of Shrinivas Residency
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--color-text-muted)',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            Authentic photographs of our rooms, welcoming corridors, and guest areas in Bagalkot.
          </p>

          <span className="gold-hairline gold-hairline-center" style={{ marginTop: '1.25rem' }} />
        </div>

        {/* ── Category Filter Tabs (Section 13) ─────────────── */}
        <div
          className="reveal-hidden"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '3rem',
          }}
          role="tablist"
          aria-label="Filter gallery by category"
        >
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.55rem 1.25rem',
                  borderRadius: 'var(--radius-xs)',
                  border: isActive ? '1px solid var(--color-charcoal)' : '1px solid var(--color-border-subtle)',
                  backgroundColor: isActive ? 'var(--color-charcoal)' : 'var(--color-surface-cream)',
                  color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(22, 25, 29, 0.15)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--color-gold)';
                    e.currentTarget.style.color = 'var(--color-charcoal)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Asymmetric 3D Exhibition Grid ──────────────────── */}
        <div
          className="gallery-editorial-grid perspective-1000"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.5rem',
          }}
        >
          {filteredImages.map((image, i) => {
            // Asymmetric rhythm for 3D exhibition panels
            const colSpan = (i % 5 === 0) ? 'span 7' : (i % 5 === 1) ? 'span 5' : (i % 5 === 2) ? 'span 4' : (i % 5 === 3) ? 'span 4' : 'span 4';
            const height = (i % 5 === 0) ? '400px' : (i % 5 === 1) ? '400px' : '310px';

            return (
              <ExhibitionCard
                key={`${image.src}-${i}`}
                image={image}
                colSpan={colSpan}
                height={height}
                onClick={() => openLightbox(i)}
              />
            );
          })}
        </div>
      </div>

      {/* ── Responsive Grid Breakpoints ─────────────────────── */}
      <style>{`
        @media (max-width: 900px) {
          .gallery-editorial-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .exhibition-panel {
            grid-column: span 1 !important;
            height: 250px !important;
          }
        }
        @media (max-width: 540px) {
          .gallery-editorial-grid {
            grid-template-columns: 1fr !important;
          }
          .exhibition-panel {
            grid-column: span 1 !important;
            height: 230px !important;
          }
        }
      `}</style>

      {/* ── Full-Screen 3D Exhibition Lightbox ───────────────── */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
};

// ── 3D Interactive Exhibition Card ────────────────────────────
interface ExhibitionCardProps {
  image: GalleryItem;
  colSpan: string;
  height: string;
  onClick: () => void;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({ image, colSpan, height, onClick }) => {
  const { ref, style, glare, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLDivElement>(6, 1000);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="exhibition-panel reveal-hidden preserve-3d"
      style={{
        ...style,
        gridColumn: colSpan,
        height: height,
        position: 'relative',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'var(--color-surface-cream)',
        boxShadow: 'var(--shadow-3d-card)',
        border: '1px solid var(--color-border-subtle)',
      }}
      role="button"
      tabIndex={0}
      aria-label={`View photograph: ${image.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="exhibition-img"
      />

      {/* Interactive Glare Highlight */}
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

      {/* Floating Inspection Icon */}
      <div
        className="layer-z-20 floating-glass-plate exhibition-inspect-btn"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-gold)',
          opacity: 0,
          transition: 'opacity 0.25s ease',
          zIndex: 5,
        }}
      >
        <Eye size={15} />
      </div>

      {/* Subtle Depth Caption Overlay */}
      <div
        className="layer-z-10 exhibition-caption"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(17, 20, 23, 0.88) 0%, rgba(17, 20, 23, 0.25) 55%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '1.5rem',
          color: '#FFFFFF',
          opacity: 0,
          transition: 'opacity 0.35s ease',
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-light)',
            marginBottom: '0.3rem',
          }}
        >
          {image.category}
        </span>
        <h4
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: 1.25,
          }}
        >
          {image.title}
        </h4>
      </div>

      <style>{`
        .exhibition-panel:hover .exhibition-img {
          transform: scale(1.05);
        }
        .exhibition-panel:hover .exhibition-caption {
          opacity: 1 !important;
        }
        .exhibition-panel:hover .exhibition-inspect-btn {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

// ── Cinematic Exhibition Lightbox ─────────────────────────────
interface LightboxProps {
  images: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const current = images[currentIndex];
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) onNext();
    else if (diff < -45) onPrev();
    touchStartX.current = null;
  };

  return (
    <div
      className="hotel-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged gallery photograph"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFFFFF',
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              color: 'var(--color-gold-light)',
              fontWeight: 500,
              letterSpacing: '0.08em',
            }}
          >
            {currentIndex + 1} / {images.length}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {current.category}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close enlarged preview (Escape)"
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={26} />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        style={{
          maxWidth: '1100px',
          maxHeight: '78vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={current.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
          }}
        />

        {/* Caption */}
        <div style={{ marginTop: '1.25rem', textAlign: 'center', color: '#FFFFFF' }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.35rem',
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '0.25rem',
            }}
          >
            {current.title}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            {current.alt}
          </p>
        </div>
      </div>

      {/* Left / Right Navigation Controls */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous photograph"
        style={{
          position: 'absolute',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(22, 25, 29, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(6px)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-charcoal)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(22, 25, 29, 0.7)')}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next photograph"
        style={{
          position: 'absolute',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(22, 25, 29, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(6px)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-charcoal)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(22, 25, 29, 0.7)')}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Gallery;

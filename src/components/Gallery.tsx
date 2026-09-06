import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { hotelImages, galleryCategories } from '../data/hotel';
import { useScrollReveal } from '../hooks/useHotel';

type GalleryItem = {
  src: string;
  category: string;
  title: string;
  alt: string;
};

// ── Lightbox Component ──────────────────────────────────────────
const Lightbox: React.FC<{
  images: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ images, activeIndex, onClose, onNext, onPrev }) => {
  const [imgError, setImgError] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setImgError(false);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, onNext, onPrev]);

  // Mobile swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      onNext(); // swipe left -> next
    } else if (distance < -minSwipeDistance) {
      onPrev(); // swipe right -> prev
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const current = images[activeIndex];
  if (!current) return null;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged gallery photograph"
      onClick={onClose}
    >
      {/* Top Bar: Counter & Close button */}
      <div className="lightbox-topbar" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-counter" aria-live="polite">
          <span>{activeIndex + 1}</span>
          <span className="lightbox-counter-sep">/</span>
          <span>{images.length}</span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close full-screen image preview (Escape)"
          className="lightbox-btn-close"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Preview Area */}
      <div
        className="lightbox-main-area"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Prev button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photograph (Left Arrow key)"
          className="lightbox-nav-btn lightbox-prev"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Current Image */}
        <div className="lightbox-img-wrapper">
          {!imgError ? (
            <img
              src={current.src}
              alt={current.alt}
              className="lightbox-img"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="lightbox-img-error">
              <span style={{ fontSize: '2.5rem' }}>🖼️</span>
              <p>Image could not be loaded</p>
            </div>
          )}
        </div>

        {/* Next button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photograph (Right Arrow key)"
          className="lightbox-nav-btn lightbox-next"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Caption & Category metadata */}
      <div className="lightbox-caption-bar" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-badge-row">
          <span className="lightbox-category-badge">{current.category}</span>
        </div>
        <h3 className="lightbox-caption-title">{current.title}</h3>
        <p className="lightbox-caption-desc">{current.alt}</p>
      </div>

      <style>{`
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background-color: rgba(10, 14, 18, 0.94);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1rem;
          animation: lightboxFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          touch-action: pan-y;
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-topbar {
          width: 100%;
          max-width: 1200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0.75rem;
          z-index: 10;
        }

        .lightbox-counter {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #E2DDD8;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.35rem 0.85rem;
          border-radius: 2rem;
        }

        .lightbox-counter-sep {
          margin: 0 0.35rem;
          color: #C99A3E;
        }

        .lightbox-btn-close {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lightbox-btn-close:hover {
          background: rgba(201, 154, 62, 0.3);
          border-color: #C99A3E;
          transform: scale(1.05);
        }

        .lightbox-main-area {
          position: relative;
          width: 100%;
          max-width: 1200px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
          padding: 0.5rem 0;
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(20, 24, 28, 0.75);
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .lightbox-prev {
          left: 0.5rem;
        }

        .lightbox-next {
          right: 0.5rem;
        }

        .lightbox-nav-btn:hover {
          background: rgba(201, 154, 62, 0.9);
          border-color: #E8C472;
          color: #0E1317;
          transform: translateY(-50%) scale(1.06);
        }

        .lightbox-img-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: calc(100% - 130px);
          max-height: 72vh;
          user-select: none;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 72vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 0.75rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .lightbox-img-error {
          width: 380px;
          height: 260px;
          border-radius: 0.75rem;
          background: #1B2127;
          color: #B8B0AA;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
        }

        .lightbox-caption-bar {
          width: 100%;
          max-width: 800px;
          text-align: center;
          padding: 0.75rem 1rem 0;
          z-index: 10;
        }

        .lightbox-badge-row {
          margin-bottom: 0.4rem;
        }

        .lightbox-category-badge {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #E8C472;
          background: rgba(201, 154, 62, 0.16);
          border: 1px solid rgba(201, 154, 62, 0.35);
          padding: 0.2rem 0.75rem;
          border-radius: 2rem;
        }

        .lightbox-caption-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
        }

        .lightbox-caption-desc {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.85rem;
          color: #C5BCB4;
          line-height: 1.5;
          margin: 0;
        }

        @media (max-width: 768px) {
          .lightbox-img-wrapper {
            max-width: 100%;
            max-height: 68vh;
          }
          .lightbox-img {
            max-height: 68vh;
          }
          .lightbox-nav-btn {
            width: 42px;
            height: 42px;
            background: rgba(14, 18, 22, 0.85);
          }
          .lightbox-prev {
            left: 0.25rem;
          }
          .lightbox-next {
            right: 0.25rem;
          }
          .lightbox-caption-title {
            font-size: 1.2rem;
          }
          .lightbox-caption-desc {
            font-size: 0.78rem;
          }
        }
      `}</style>
    </div>
  );
};

// ── Main Gallery Section ─────────────────────────────────────────
const Gallery: React.FC = () => {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allItems: GalleryItem[] = hotelImages.gallery;

  const filteredItems: GalleryItem[] =
    activeCategory === 'All'
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (prev) => ((prev ?? 0) - 1 + filteredItems.length) % filteredItems.length
    );
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section
      id="gallery"
      className="gallery-section"
      aria-label="Shrinivas Residency Photo Gallery"
    >
      <div className="gallery-container">
        {/* Header */}
        <div className="reveal-hidden gallery-header">
          <span className="gallery-pretitle">Visual Tour</span>
          <h2 className="gallery-title font-serif">
            Photographs of Shrinivas Residency
          </h2>
          <div className="gallery-gold-line" />
          <p className="gallery-subtitle">
            Explore authentic images of our guest rooms, peaceful corridors,
            traditional artworks, and scenic balcony outlook in Bagalkot.
          </p>
        </div>

        {/* Category Filters */}
        <div className="reveal-hidden gallery-filters-wrap">
          <div
            className="gallery-filter-buttons"
            role="tablist"
            aria-label="Filter photographs by category"
          >
            {galleryCategories.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === 'All'
                  ? allItems.length
                  : allItems.filter((item) => item.category === cat).length;

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`gallery-filter-btn ${isActive ? 'active' : ''}`}
                >
                  <span>{cat}</span>
                  <span className="gallery-filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry Grid (Desktop 3 col, Tablet 2 col, Mobile 1 col) */}
        <div className="gallery-masonry" role="region" aria-label="Photo grid">
          {filteredItems.map((item, index) => (
            <article
              key={item.src}
              className="gallery-item-card"
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open photograph: ${item.title}`}
            >
              <div className="gallery-media-wrap">
                {/* Natural aspect ratio image with lazy loading */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="gallery-photo"
                />

                {/* Hover overlay with title & zoom prompt */}
                <div className="gallery-hover-overlay" aria-hidden="true">
                  <div className="gallery-zoom-badge">
                    <Maximize2 size={16} />
                  </div>
                  <div className="gallery-card-meta">
                    <span className="gallery-card-category">{item.category}</span>
                    <h3 className="gallery-card-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="gallery-empty-state">
            <p>No photographs found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredItems}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}

      {/* Scoped CSS for responsive masonry and warm visual aesthetic */}
      <style>{`
        .gallery-section {
          padding: 6.5rem 1.5rem;
          background-color: #FFFFFF;
          position: relative;
        }

        .gallery-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 2.75rem;
        }

        .gallery-pretitle {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #7A1E1E;
          display: block;
          margin-bottom: 0.75rem;
        }

        .gallery-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          color: #172026;
          line-height: 1.2;
          margin: 0 auto 0.75rem;
        }

        .gallery-gold-line {
          width: 3.5rem;
          height: 2px;
          background: linear-gradient(90deg, #7A1E1E, #C99A3E);
          margin: 1.25rem auto;
        }

        .gallery-subtitle {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.95rem;
          color: #6B7280;
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* Category Filter Buttons */
        .gallery-filters-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .gallery-filter-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.625rem;
          padding: 0.35rem;
          background: #FAF8F3;
          border: 1px solid #E8E2D5;
          border-radius: 3rem;
        }

        .gallery-filter-btn {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 0.5rem 1.15rem;
          border-radius: 2rem;
          border: 1px solid transparent;
          background: transparent;
          color: #4B5563;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          transition: all 0.22s ease;
          outline: none;
        }

        .gallery-filter-btn:hover {
          color: #172026;
          background: rgba(201, 154, 62, 0.08);
        }

        .gallery-filter-btn.active {
          background-color: #7A1E1E;
          color: #FFFFFF;
          border-color: #7A1E1E;
          box-shadow: 0 4px 14px rgba(122, 30, 30, 0.25);
        }

        .gallery-filter-count {
          font-size: 0.68rem;
          font-weight: 700;
          opacity: 0.75;
          padding: 0.1rem 0.4rem;
          border-radius: 1rem;
          background: rgba(0, 0, 0, 0.08);
        }

        .gallery-filter-btn.active .gallery-filter-count {
          background: rgba(255, 255, 255, 0.22);
          color: #FFFFFF;
          opacity: 1;
        }

        /* ── Masonry Grid Layout ───────────────────────── */
        /* Desktop: 3 columns */
        .gallery-masonry {
          column-count: 3;
          column-gap: 1.5rem;
          width: 100%;
        }

        /* Card container */
        .gallery-item-card {
          break-inside: avoid;
          margin-bottom: 1.5rem;
          border-radius: 0.875rem;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid #ECE7DF;
          box-shadow: 0 4px 20px rgba(17, 32, 42, 0.07);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
                      box-shadow 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
                      border-color 0.35s ease;
          cursor: pointer;
          position: relative;
        }

        .gallery-item-card:hover,
        .gallery-item-card:focus-visible {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(17, 32, 42, 0.14);
          border-color: #C99A3E;
          outline: none;
        }

        .gallery-media-wrap {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        /* Natural aspect ratio preservation: no fixed heights, no aggressive cropping */
        .gallery-photo {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .gallery-item-card:hover .gallery-photo,
        .gallery-item-card:focus-visible .gallery-photo {
          transform: scale(1.045);
        }

        /* Gradient overlay with details on hover */
        .gallery-hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15, 22, 28, 0.85) 0%,
            rgba(15, 22, 28, 0.35) 45%,
            rgba(15, 22, 28, 0) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.15rem;
        }

        .gallery-item-card:hover .gallery-hover-overlay,
        .gallery-item-card:focus-visible .gallery-hover-overlay {
          opacity: 1;
        }

        .gallery-zoom-badge {
          align-self: flex-end;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-8px);
          transition: transform 0.3s ease;
        }

        .gallery-item-card:hover .gallery-zoom-badge {
          transform: translateY(0);
        }

        .gallery-card-meta {
          transform: translateY(8px);
          transition: transform 0.3s ease;
        }

        .gallery-item-card:hover .gallery-card-meta {
          transform: translateY(0);
        }

        .gallery-card-category {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #E8C472;
          display: inline-block;
          margin-bottom: 0.25rem;
        }

        .gallery-card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.25;
        }

        .gallery-empty-state {
          text-align: center;
          padding: 4rem 1rem;
          color: #6B7280;
          font-family: 'Inter', sans-serif;
        }

        /* ── Responsive Columns ─────────────────────────── */
        /* Tablet: 2 columns */
        @media (max-width: 960px) {
          .gallery-masonry {
            column-count: 2;
            column-gap: 1.25rem;
          }
          .gallery-section {
            padding: 5rem 1.25rem;
          }
        }

        /* Mobile: 1 column */
        @media (max-width: 600px) {
          .gallery-masonry {
            column-count: 1;
          }
          .gallery-filter-buttons {
            border-radius: 1.25rem;
            padding: 0.4rem;
            gap: 0.4rem;
          }
          .gallery-filter-btn {
            font-size: 0.74rem;
            padding: 0.45rem 0.85rem;
          }
          /* Ensure hover meta is visible or touch friendly */
          .gallery-hover-overlay {
            opacity: 0.92;
            background: linear-gradient(
              to top,
              rgba(15, 22, 28, 0.75) 0%,
              transparent 60%
            );
          }
          .gallery-zoom-badge {
            display: none;
          }
          .gallery-card-meta {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;

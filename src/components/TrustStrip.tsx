import React from 'react';
import { BedDouble, MapPin, HeartHandshake, Car } from 'lucide-react';
import { trustPoints } from '../data/hotel';

const iconMap: Record<string, React.FC<{ size?: number; color?: string; strokeWidth?: number }>> = {
  BedDouble,
  MapPin,
  HeartHandshake,
  Car,
};

const TrustStrip: React.FC = () => {
  return (
    <section
      id="trust-strip"
      aria-label="Property highlights"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-border-subtle)',
        borderTop: '1px solid var(--color-border-subtle)',
        padding: '2.5rem 1.5rem',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch',
        }}
      >
        {trustPoints.map((item) => {
          const Icon = iconMap[item.icon] || BedDouble;
          return (
            <div
              key={item.title}
              className="trust-card-3d"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.15rem',
                padding: '1.25rem 1.35rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface-cream)',
                border: '1px solid var(--color-border-subtle)',
                transition: 'all 0.35s cubic-bezier(0.2, 0, 0.2, 1)',
                cursor: 'default',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
                className="trust-icon-box"
              >
                <Icon size={20} color="var(--color-gold-dark)" strokeWidth={1.6} />
              </div>

              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: 'var(--color-charcoal)',
                    lineHeight: 1.3,
                    marginBottom: '0.2rem',
                  }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.45,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .trust-card-3d:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 10px 24px -6px rgba(17, 20, 23, 0.08);
          border-color: rgba(197, 168, 128, 0.4);
          background-color: #FFFFFF;
        }
        .trust-card-3d:hover .trust-icon-box {
          border-color: var(--color-gold);
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default TrustStrip;

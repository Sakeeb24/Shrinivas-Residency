import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook for smooth 3D tilt interaction on hover
 * Calculates pitch (rotateX), yaw (rotateY), and glare highlight position based on cursor.
 */
export function use3DTilt<T extends HTMLElement = HTMLDivElement>(maxTilt = 10, perspective = 1000) {
  const ref = useRef<T>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
    transition: 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)',
  });
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!ref.current) return;
      // Disable on touch / reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normalizedX = (x / rect.width) * 2 - 1; // -1 to 1
      const normalizedY = (y / rect.height) * 2 - 1; // -1 to 1

      const rotateY = normalizedX * maxTilt;
      const rotateX = -normalizedY * maxTilt;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px)`,
        transition: 'transform 0.1s ease-out',
      });

      setGlare({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.18,
      });
    },
    [maxTilt, perspective]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, [perspective]);

  return { ref, style, glare, handleMouseMove, handleMouseLeave };
}

/**
 * Scroll Parallax Hook
 * Returns scroll progress and pixel offset for smooth background/foreground parallax
 */
export function useParallax(speed = 0.2) {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!elementRef.current) return;
        const rect = elementRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Only calculate when visible or near viewport
        if (rect.bottom >= -100 && rect.top <= windowHeight + 100) {
          const middle = rect.top + rect.height / 2;
          const windowMiddle = windowHeight / 2;
          const delta = middle - windowMiddle;
          setOffset(delta * speed);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return { elementRef, offset };
}

/**
 * Global subtle mouse camera parallax for hero depth layers
 */
export function useMouseParallax(sensitivity = 18) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return; // desktop only

    let rafId: number;
    const onMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setCoords({
          x: x * sensitivity,
          y: y * sensitivity,
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [sensitivity]);

  return coords;
}

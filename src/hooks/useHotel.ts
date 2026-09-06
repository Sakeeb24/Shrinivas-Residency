import { useState, useEffect, useCallback } from 'react';

export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

export const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-hidden');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
};

export const useVideoFallback = (videoSrc: string, imageSrc: string) => {
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [videoChecked, setVideoChecked] = useState(false);

  const checkVideo = useCallback(() => {
    const video = document.createElement('video');
    video.muted = true;
    video.preload = 'metadata';

    const timeout = setTimeout(() => {
      setCanPlayVideo(false);
      setVideoChecked(true);
    }, 3000);

    video.onloadedmetadata = () => {
      clearTimeout(timeout);
      setCanPlayVideo(true);
      setVideoChecked(true);
    };

    video.onerror = () => {
      clearTimeout(timeout);
      setCanPlayVideo(false);
      setVideoChecked(true);
    };

    video.src = videoSrc;
    return () => {
      clearTimeout(timeout);
      video.src = '';
    };
  }, [videoSrc]);

  useEffect(() => {
    if (videoSrc) {
      return checkVideo();
    } else {
      setCanPlayVideo(false);
      setVideoChecked(true);
    }
  }, [videoSrc, checkVideo]);

  return { canPlayVideo, videoChecked, fallbackImage: imageSrc };
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);

  return isMobile;
};

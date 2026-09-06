# Asset & Photography Replacement Guide — Shrinivas Residency
================================================================

When the real Shrinivas Residency photographs and brand assets are ready,
drop them directly into the folders below. Centralized configuration in
`src/data/hotel.ts` ensures no code changes are required across individual components.

## 1. LOGO ASSETS
- `public/assets/images/logo.png`
  -> Primary horizontal/stacked brand logo (transparent PNG)
- `public/assets/images/logo-mark.png`
  -> SR circular emblem (transparent PNG, used in favicon and navbar fallback)

## 2. HERO MEDIA
- `public/assets/images/hero.jpg`
  -> High-resolution property exterior or signature view (1920x1080+, landscape)
  -> Also acts as poster image for the video hero
- `public/assets/video/hero-video.mp4`
  -> Desktop 2D/3D cinematic video loop (1080p, optimized MP4, h264)
- `public/assets/video/mobile-hero-video.mp4`
  -> Mobile portrait/vertical cinematic video loop (720x1280 or 1080x1920)
*To switch hero from image to video: set `heroMediaType: 'VIDEO'` in `src/data/hotel.ts`*

## 3. KEY SECTIONS
- `public/assets/images/about.jpg`
  -> About section photo (portrait ratio 4:5, e.g. 800x1000)
- `public/assets/images/cinematic.jpg`
  -> Parallax showcase banner image (wide landscape, 1920x800)

## 4. EXTERIOR PHOTOS
- `public/assets/images/exterior/exterior-1.jpg`
- `public/assets/images/exterior/exterior-2.jpg`
  -> Facade, main entrance, signage, building structure

## 5. ROOM PHOTOS
- `public/assets/images/rooms/room-1.jpg`
- `public/assets/images/rooms/room-2.jpg`
- `public/assets/images/rooms/room-3.jpg`
  -> Real guest rooms (update room categories and features in `src/data/hotel.ts` once confirmed)

## 6. INTERIOR PHOTOS
- `public/assets/images/interior/interior-1.jpg`
- `public/assets/images/interior/interior-2.jpg`
  -> Reception, lobby, hallways, seating areas

## 7. AMENITIES
- `public/assets/images/amenities/`
  -> Property facility shots

## 8. GALLERY (Curated Showcase)
- `public/assets/images/gallery/gallery-1.jpg` (Exterior)
- `public/assets/images/gallery/gallery-2.jpg` (Rooms)
- `public/assets/images/gallery/gallery-3.jpg` (Interior)
- `public/assets/images/gallery/gallery-4.jpg` (Rooms)
- `public/assets/images/gallery/gallery-5.jpg` (Amenities)
- `public/assets/images/gallery/gallery-6.jpg` (Surroundings)
- `public/assets/images/gallery/gallery-7.jpg` (Exterior)
- `public/assets/images/gallery/gallery-8.jpg` (Interior)
- `public/assets/images/gallery/gallery-9.jpg` (Rooms)

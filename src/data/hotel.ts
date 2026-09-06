// ============================================================
// SHRINIVAS RESIDENCY — CENTRAL CONFIGURATION
// ============================================================
// All property-specific data lives here.
// Components must never contain hardcoded addresses, phones,
// image paths, ratings, or URLs.

// ── Types ────────────────────────────────────────────────────
export interface HotelAddress {
  plot: string;
  sector: string;
  landmark: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface HotelConfig {
  name: string;
  tagline: string;
  description: string;
  address: HotelAddress;
  plusCode: string;
  rating: number;
  reviewCount: number;
  phonePrimary: string;
  phoneSecondary: string;
  whatsapp: string; // Set to confirmed number when available
  googleMapsUrl: string;
  googleReviewsUrl: string;
  mapEmbedUrl: string;
  heroImage: string;
  heroVideo: string;
  mobileHeroVideo: string;
  logo: string;
  logoMark: string;
  social: { facebook: string; instagram: string; twitter: string };
  heroMediaType: 'VIDEO' | 'IMAGE';
  // Set to a URL to redirect, or "" to scroll to contact section
  bookingUrl: string;
  seo: { title: string; description: string; canonicalUrl: string; ogImage: string };
}

// ── Main Config ───────────────────────────────────────────────
export const hotel: HotelConfig = {
  name: 'Shrinivas Residency',
  tagline: 'Comfortable Stays in Bagalkot',
  description:
    'Experience a convenient and welcoming stay in Navanagar, Bagalkot.',

  address: {
    plot: 'Plot No. 15-D',
    sector: 'Sector No. 35',
    landmark: 'Police Palace Circle',
    locality: 'Navanagar',
    city: 'Bagalkot',
    state: 'Karnataka',
    pincode: '587103',
    country: 'India',
  },

  plusCode: '5M59+52 Bagalkot, Karnataka',

  rating: 4.5,
  reviewCount: 74,

  // ── Contact ──────────────────────────────────────────────
  phonePrimary: '08354350125',    // Displayed as: 08354 350125
  phoneSecondary: '9448946728',  // Displayed as: 94489 46728
  whatsapp: '',                  // Set when confirmed — do NOT assume either number

  // ── Google Integration ────────────────────────────────────
  // Replace PLACE_ID_HERE with the actual Google Place ID
  googleMapsUrl: 'https://maps.google.com/?q=5M59%2B52+Bagalkot%2C+Karnataka',
  googleReviewsUrl:
    'https://search.google.com/local/reviews?placeid=PLACE_ID_HERE',
  // Google Maps Embed URL for Shrinivas Residency, Bagalkot
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Shrinivas+Residency%2C+Plot+No.+15-D%2C+Sector+No.+35%2C+Police+Palace+Circle%2C+Navanagar%2C+Bagalkot%2C+Karnataka+587103&t=&z=16&ie=UTF8&iwloc=&output=embed',

  // ── Media ─────────────────────────────────────────────────
  heroImage: '/assets/images/hero.jpg',
  heroVideo: '/assets/video/hero-video.mp4',
  mobileHeroVideo: '/assets/video/mobile-hero-video.mp4',

  // Logo paths — replace files when real logo assets are ready
  logo: '/assets/images/logo.png',           // Full logo (horizontal/stacked)
  logoMark: '/assets/images/logo-mark.png',  // SR circular emblem

  // ── Social ────────────────────────────────────────────────
  social: {
    facebook: '',  // Add URL when page is ready
    instagram: '', // Add URL when page is ready
    twitter: '',   // Add URL when page is ready
  },

  // ── Hero type ─────────────────────────────────────────────
  // "VIDEO" → use hero-video.mp4 (with hero.jpg as poster/fallback)
  // "IMAGE" → use hero.jpg directly (current default until video is ready)
  heroMediaType: 'IMAGE',

  // ── Booking ───────────────────────────────────────────────
  // Leave empty to scroll to contact section (no booking engine yet)
  // Set to a URL when a real booking system is connected
  bookingUrl: '',

  // ── SEO ───────────────────────────────────────────────────
  seo: {
    title: 'Shrinivas Residency | Hotel in Bagalkot, Karnataka',
    description:
      'Shrinivas Residency in Navanagar, Bagalkot, Karnataka. Find accommodation, contact details, location and stay information.',
    canonicalUrl: 'https://shrinivasresidency.in', // Update to actual domain
    ogImage: '/assets/images/hero.jpg',
  },
};

// ── Image Registry ────────────────────────────────────────────
// All image paths in one place. Centralized for components.
export const hotelImages = {
  hero: '/assets/images/hero.jpg',
  about: '/assets/images/about.jpg',
  cinematic: '/assets/images/cinematic.jpg',
  logo: '/assets/images/logo.png',
  logoMark: '/assets/images/logo-mark.png',

  exterior: [
    '/assets/images/exterior/exterior-1.jpg',
  ],

  rooms: {
    room1: '/assets/images/rooms/room-1.jpg',
    room2: '/assets/images/rooms/room-2.jpg',
    room3: '/assets/images/rooms/room-3.jpg',
    roomWide: '/assets/images/rooms/room-wide.jpg',
    roomTv: '/assets/images/rooms/room-tv-setup.jpg',
    roomPerspective: '/assets/images/rooms/room-perspective.jpg',
  },

  interior: [
    '/assets/images/gallery/staircase-foyer.jpg',
    '/assets/images/gallery/corridor-main.jpg',
  ],

  gallery: [
    {
      src: '/assets/images/rooms/room-1.jpg',
      category: 'Rooms',
      title: 'Deluxe Double Bedroom',
      alt: 'Deluxe double bedroom with vibrant yellow headboard, ambient cove lighting, and fresh linens',
    },
    {
      src: '/assets/images/exterior/exterior-1.jpg',
      category: 'Balcony / Exterior View',
      title: 'Shrinivas Residency Building Facade',
      alt: 'Modern multi-storey exterior facade of Shrinivas Residency at Hebbar Complex, Navanagar, Bagalkot',
    },
    {
      src: '/assets/images/gallery/corridor-main.jpg',
      category: 'Corridors & Common Areas',
      title: 'Warmly Lit Guest Corridor',
      alt: 'Long guest corridor with recessed warm LED ceiling lighting, framed art, and wooden finish flooring',
    },
    {
      src: '/assets/images/rooms/room-2.jpg',
      category: 'Rooms',
      title: 'Executive Room with SR Embroidery',
      alt: 'Executive guest room featuring embroidered SR pillows, textured accent wall, and tailored roman shades',
    },
    {
      src: '/assets/images/gallery/balcony-view.jpg',
      category: 'Balcony / Exterior View',
      title: 'Panoramic Balcony Overlook',
      alt: 'Curved open-air balcony with polished wooden ceiling and lush planters overlooking Bagalkot at night',
    },
    {
      src: '/assets/images/gallery/artwork-folk-triptych.jpg',
      category: 'Artwork',
      title: 'Traditional Folk Art Canvases',
      alt: 'Trio of vibrant vertical folk art paintings adorning the guest room corridor',
    },
    {
      src: '/assets/images/rooms/room-3.jpg',
      category: 'Rooms',
      title: 'Comfort Double Room',
      alt: 'Symmetrical front view of guest bedroom with geometric bed throw, nightstand, and split AC',
    },
    {
      src: '/assets/images/gallery/staircase-foyer.jpg',
      category: 'Interiors',
      title: 'Staircase Landing & Gallery Foyer',
      alt: 'Modern staircase landing with wood-grain flooring, stainless steel railings, and traditional art gallery',
    },
    {
      src: '/assets/images/gallery/artwork-room-entry.jpg',
      category: 'Artwork',
      title: 'Indian Folk Art at Room 106',
      alt: 'Hand-painted Indian folk art featuring fish and royal elephant motifs outside Room 106',
    },
    {
      src: '/assets/images/rooms/room-wide.jpg',
      category: 'Rooms',
      title: 'Spacious Room Layout & Seating',
      alt: 'Wide perspective of guest room with relaxing armchair, center table, and elegant wood entryway door',
    },
    {
      src: '/assets/images/rooms/room-tv-setup.jpg',
      category: 'Rooms',
      title: 'LED TV & Living Console',
      alt: 'Wall-mounted flat-screen TV with floating wooden console shelf and relaxation chair',
    },
    {
      src: '/assets/images/rooms/room-perspective.jpg',
      category: 'Rooms',
      title: 'Bed Perspective & Room Details',
      alt: 'Perspective view of comfortable double bed with rolled towels and room furnishings',
    },
  ],
};

// ── Rooms ─────────────────────────────────────────────────────
// Confirmed room data with actual hotel media
export const rooms = [
  {
    id: 'deluxe-double',
    name: 'Deluxe Double Room',
    description:
      'Air-conditioned guest room featuring an upholstered headboard, king-sized bed, ambient ceiling lighting, and fresh linens.',
    image: hotelImages.rooms.room1,
    features: ['Air Conditioned', 'King Size Bed', 'Free Wi-Fi', 'Attached Bathroom', 'LED TV'],
    alt: 'Deluxe double room with yellow headboard and ambient lighting at Shrinivas Residency',
    confirmed: true,
  },
  {
    id: 'executive-room',
    name: 'Executive Room',
    description:
      'Spacious room with signature embroidered SR pillows, premium roman blinds, bedside controls, and dedicated seating area.',
    image: hotelImages.rooms.room2,
    features: ['Signature SR Linens', 'Comfort Seating', 'Split AC', 'Roman Blinds', 'Room Service'],
    alt: 'Executive room with embroidered SR pillows and seating at Shrinivas Residency',
    confirmed: true,
  },
  {
    id: 'comfort-double',
    name: 'Standard Double Room',
    description:
      'Thoughtfully arranged double room with geometric linens, clean tiled flooring, wall TV console, and modern woodwork.',
    image: hotelImages.rooms.room3,
    features: ['Double Bed', 'Flat-screen TV', 'Daily Housekeeping', '24/7 Hot Water', 'Ceiling Fan'],
    alt: 'Comfort double room with television and seating at Shrinivas Residency',
    confirmed: true,
  },
];

// ── Amenities ─────────────────────────────────────────────────
// Set visible: false for any amenity not yet confirmed.
// Components render only items where visible === true.
export const amenities = [
  {
    id: 'location',
    icon: 'MapPin',
    title: 'Convenient Location',
    description: 'Near Police Palace Circle, Navanagar — easy access to the city.',
    visible: true,
  },
  {
    id: 'rooms',
    icon: 'BedDouble',
    title: 'Comfortable Rooms',
    description: 'Well-maintained rooms for short and extended stays.',
    visible: true,
  },
  {
    id: 'frontdesk',
    icon: 'Clock',
    title: 'Front Desk',
    description: 'Reception assistance available for guest needs.',
    visible: true,
  },
  {
    id: 'wifi',
    icon: 'Wifi',
    title: 'Wi-Fi',
    description: 'Connectivity for guests during their stay.',
    visible: true,
  },
  {
    id: 'parking',
    icon: 'Car',
    title: 'Parking',
    description: 'Parking available for guests.',
    visible: true,
  },
  {
    id: 'cleanliness',
    icon: 'Sparkles',
    title: 'Clean & Well-Maintained',
    description: 'Regularly cleaned and maintained to ensure guest comfort.',
    visible: true,
  },
];

// ── Gallery Categories ────────────────────────────────────────
export const galleryCategories = [
  'All',
  'Rooms',
  'Interiors',
  'Corridors & Common Areas',
  'Artwork',
  'Balcony / Exterior View',
];

// ── Helpers ───────────────────────────────────────────────────
/** Format a raw phone string for display: "08354350125" → "08354 350125" */
export function formatPhone(raw: string): string {
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  if (digits.length === 11) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  return raw;
}

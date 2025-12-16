export interface Post {
  id: number;
  text: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface PortfolioItem {
  id: number;
  type: 'image' | 'video' | 'audio' | 'pdf';
  thumb: string; // Thumbnail for all types
  src: string;   // URL to the full resource (image, embed, audio, pdf)
  title: string;
  description?: string;
}

export interface Artist {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  location: string;
  state: string;
  district: string;
  pincode: string;
  avatar: string;
  verified: boolean;
  whatsapp: string;
  rating: number;
  latitude: number;
  longitude: number;
  price: number; // e.g., per hour rate
  available: boolean;
  languages: string[];
  experience: 'Beginner' | 'Intermediate' | 'Expert';
  email: string;
  banner: string;
  bio: string;
  tags: string[];
  equipment: string[];
  socials: {
    youtube?: string;
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  posts: Post[];
  reviews: Review[];
  portfolio: PortfolioItem[];
  followers: number;
  following: number;
}

export const CATEGORIES: { [key: string]: string[] } = {
  "Singer": [
    "Classical Singer", "Semi-Classical Singer", "Bollywood Singer", "Playback Singer", "Folk Singer", "Ghazal Singer", "Bhajan / Devotional Singer", "Sufi Singer", "Western Vocalist", "Pop Singer", "Rock Singer", "Live Show Singer", "Wedding Singer", "Background Vocalist"
  ],
  "Musician": [
    "Guitarist", "Keyboard / Piano Player", "Violinist", "Flutist", "Drummer", "Percussionist", "Tabla Player", "Harmonium Player", "Sitar Player", "Bass Guitarist", "Saxophonist", "Trumpet Player", "Multi-Instrumentalist"
  ],
  "Dancer": [
    "Classical Dancer", "Kathak Dancer", "Bharatanayatam Dancer", "Odissi Dancer", "Kuchipudi Dancer", "Folk Dancer", "Bollywood Dancer", "Hip-Hop Dancer", "Contemporary Dancer", "Freestyle Dancer", "Western Dance Performer", "Wedding Choreographer", "Stage Show Dancer"
  ],
  // ... other categories remain the same
};


export const artists: Artist[] = [
  { 
    id: 1, name: 'Aarav Sharma', category: 'Composer', subCategory: 'Independent Music Producer', location: 'Mumbai, Maharashtra', state: 'Maharashtra', district: 'Mumbai Suburban', pincode: '400050', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80', verified: true, whatsapp: '919876543210', rating: 4.9, latitude: 19.0760, longitude: 72.8777, price: 4500, available: true, languages: ['Hindi', 'English', 'Marathi'], experience: 'Expert',
    email: 'aarav.sharma.music@example.com',
    banner: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=400&fit=crop&q=80',
    bio: 'Award-winning composer and music producer with over a decade of experience in crafting sounds for film, television, and independent artists. My work blends traditional Indian soundscapes with contemporary electronic elements to create something truly unique.',
    tags: ['Film Scoring', 'Ad Jingles', 'Sound Design', 'Mixing & Mastering'],
    equipment: ['Ableton Live Suite', 'Native Instruments Komplete', 'Moog Matriarch', 'Fender Telecaster'],
    socials: { youtube: '#', instagram: '#', facebook: '#', website: '#' },
    posts: [
      { id: 1, text: 'In the studio cooking up something special for my new EP. The vibe is electric tonight!', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop', timestamp: '2 hours ago', likes: 125, comments: 12 },
      { id: 2, text: 'Just wrapped up a scoring session for a fantastic indie film. Can\'t wait for you all to hear it!', timestamp: '1 day ago', likes: 250, comments: 28 },
    ],
    reviews: [
      { id: 1, author: 'Priya Singh', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop', rating: 5, text: 'Aarav is a genius. He took my simple melody and turned it into a masterpiece. A true professional and a joy to work with.', date: '3 weeks ago' },
      { id: 2, author: 'Rohan Das', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', rating: 5, text: 'His attention to detail is unmatched. The final mix for our ad jingle was crisp, clear, and delivered ahead of schedule.', date: '1 month ago' },
    ],
    portfolio: [
        { id: 1, type: 'video', thumb: 'https://img.youtube.com/vi/z3WWp_da_oI/hqdefault.jpg', src: 'https://www.youtube.com/embed/z3WWp_da_oI', title: 'Live Concert Highlights 2024', description: 'A montage of my best moments from the recent live tour.' },
        { id: 2, type: 'image', thumb: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=450&fit=crop', src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&h=900&fit=crop', title: 'Studio Session', description: 'Behind the scenes working on my new EP.' },
        { id: 3, type: 'audio', thumb: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=450&fit=crop', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', title: 'Midnight Drive (Demo)', description: 'An unreleased instrumental track.' },
        { id: 4, type: 'pdf', thumb: 'https://images.unsplash.com/photo-1504221507732-5246c045949b?w=800&h=450&fit=crop', src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', title: 'Press Kit 2024', description: 'My official press kit and brochure for event bookings.' },
        { id: 5, type: 'image', thumb: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=450&fit=crop', src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&h=900&fit=crop', title: 'Gear Setup', description: 'A look at the instruments I use.' },
    ],
    followers: 12500,
    following: 150,
  },
  // Add minimal data for other artists to avoid errors
  { id: 2, name: 'Riya Patel', category: 'Singer', subCategory: 'Classical Singer', location: 'Delhi, Delhi', state: 'Delhi', district: 'New Delhi', pincode: '110001', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80', verified: true, whatsapp: '919876543211', rating: 4.8, latitude: 28.6139, longitude: 77.2090, price: 3000, available: false, languages: ['Hindi', 'Regional'], experience: 'Expert', email: 'riya.patel@example.com', banner: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=400&fit=crop&q=80', bio: 'Hindustani classical vocalist with a soulful voice.', tags: [], equipment: [], socials: {}, posts: [], reviews: [], portfolio: [], followers: 8900, following: 80 },
  { id: 3, name: 'Vikram Singh', category: 'Musician', subCategory: 'Guitarist', location: 'Bangalore, Karnataka', state: 'Karnataka', district: 'Bengaluru Urban', pincode: '560001', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80', verified: false, whatsapp: '919876543212', rating: 4.7, latitude: 12.9716, longitude: 77.5946, price: 1500, available: true, languages: ['English'], experience: 'Intermediate', email: 'vikram.singh@example.com', banner: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1200&h=400&fit=crop&q=80', bio: 'Rock and blues guitarist based in Bangalore.', tags: [], equipment: [], socials: {}, posts: [], reviews: [], portfolio: [], followers: 5200, following: 210 },
  { 
    id: 4, 
    name: 'Ananya Joshi', 
    category: 'Singer', 
    subCategory: 'Indie Pop Singer', 
    location: 'Pune, Maharashtra', 
    state: 'Maharashtra', 
    district: 'Pune', 
    pincode: '411001', 
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80', 
    verified: true, 
    whatsapp: '919876543213', 
    rating: 4.6, 
    latitude: 18.5204, 
    longitude: 73.8567, 
    price: 2000, 
    available: true, 
    languages: ['Hindi', 'English'], 
    experience: 'Intermediate',
    email: 'ananya.joshi@example.com', 
    banner: 'https://images.unsplash.com/photo-1499415474324-e2985852a1DB?w=1200&h=400&fit=crop&q=80', 
    bio: 'Indie pop singer-songwriter with a love for lyrical storytelling and mellow vibes.', 
    tags: ['Singer-Songwriter', 'Acoustic', 'Live Looping'], 
    equipment: ['Taylor GS Mini', 'TC-Helicon VoiceLive', 'Shure SM58'], 
    socials: { instagram: '#', youtube: '#' }, 
    posts: [], 
    reviews: [], 
    portfolio: [],
    followers: 22000,
    following: 300,
  },
  { 
    id: 5, 
    name: 'Rohan Desai', 
    category: 'Musician', 
    subCategory: 'Tabla Player', 
    location: 'Jaipur, Rajasthan', 
    state: 'Rajasthan', 
    district: 'Jaipur', 
    pincode: '302001', 
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&q=80', 
    verified: false, 
    whatsapp: '919876543214', 
    rating: 4.5, 
    latitude: 26.9124, 
    longitude: 75.7873, 
    price: 1800, 
    available: true, 
    languages: ['Hindi'], 
    experience: 'Expert',
    email: 'rohan.desai@example.com', 
    banner: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?w=1200&h=400&fit=crop&q=80', 
    bio: 'Tabla maestro blending classical rhythms with contemporary fusion. Available for collaborations and live performances.', 
    tags: ['Classical', 'Fusion', 'Studio Sessions'], 
    equipment: ['Custom Dayan-Bayan Set', 'Electronic Tanpura'], 
    socials: { youtube: '#' }, 
    posts: [], 
    reviews: [], 
    portfolio: [],
    followers: 3500,
    following: 50,
  }
];

// Flat lists for easier access in search suggestions
export const categories: string[] = Object.keys(CATEGORIES);
export const locations: string[] = [
  'Mumbai, Maharashtra',
  'Delhi, Delhi',
  'Bangalore, Karnataka',
  'Pune, Maharashtra',
  'Kolkata, West Bengal',
  'Chennai, Tamil Nadu',
  'Hyderabad, Telangana',
  'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan',
];
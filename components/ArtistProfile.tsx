import React, { useState, useRef, useEffect } from 'react';

// Types
type MediaType = 'image' | 'video' | 'reel' | 'audio';

interface PortfolioItem {
  id: number;
  type: MediaType;
  thumb: string;
  src: string;
  title: string;
  description: string;
}

interface Track {
  id: number;
  title: string;
  plays: string;
  duration: string;
  image: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  venue: string;
  location: string;
}

// Initial Data
const initialArtist = {
  name: "Arjun Mehta",
  username: "@arjun_music",
  category: "Musician",
  subCategory: "Hindustani Classical & Fusion Vocalist",
  location: "Mumbai, Maharashtra",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&q=80",
  banner: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=400&fit=crop&q=80",
  bio: "Classically trained in Hindustani vocals with a passion for modern electronic fusion. Creating soundscapes that bridge the gap between tradition and future. Open for collaborations and live bookings.",
  tags: ["Live Performer", "Studio Artist", "Composer", "Music Teacher"],
  stats: {
    followers: "12.5k",
    following: "450",
    tracks: "24"
  },
  whatsapp: "919876543210",
  socials: [
    { name: "YouTube", icon: "smart_display", link: "#" },
    { name: "Instagram", icon: "photo_camera", link: "#" },
    { name: "Facebook", icon: "groups", link: "#" },
    { name: "Website", icon: "language", link: "#" }
  ],
  genres: ["Indie Pop", "Electronic", "Classical Fusion"],
  instruments: ["Vocals", "Guitar", "Ableton"]
};

const initialTracks: Track[] = [
  { id: 1, title: "Midnight Raga", plays: "45.2k", duration: "3:45", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop" },
  { id: 2, title: "Neon Streets", plays: "28.1k", duration: "4:12", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop" },
  { id: 3, title: "Monsoon Feelings", plays: "12.5k", duration: "3:20", image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=100&h=100&fit=crop" }
];

const initialPortfolioItems: PortfolioItem[] = [
    { 
      id: 1, 
      type: 'video', 
      thumb: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop', 
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      title: 'Live at Blue Frog',
      description: 'An electric performance at the legendary Blue Frog venue, blending traditional raga with synthwave textures.'
    },
    { 
      id: 2, 
      type: 'image', 
      thumb: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=600&h=600&fit=crop', 
      src: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=1200&h=800&fit=crop',
      title: 'Studio Session 2024',
      description: 'Tracking vocals for the upcoming EP "Mirage". The acoustics in this room are phenomenal.'
    },
    { 
      id: 3, 
      type: 'reel', 
      thumb: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=600&h=600&fit=crop', 
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      title: 'Backstage Vibes',
      description: 'Getting ready to hit the stage! Pre-show rituals are essential.'
    },
    { 
      id: 4, 
      type: 'audio', 
      thumb: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop', 
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      title: 'Demo - "Drift"',
      description: 'A rough sketch of a new track I am working on. Let me know what you think of the bassline!'
    },
];

// --- Sub-Components ---

const ImageViewer = ({ src, alt }: { src: string; alt: string }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    const handleZoomIn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(prev => Math.min(prev + 0.5, 4));
    };

    const handleZoomOut = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(prev => {
            const newScale = Math.max(prev - 0.5, 1);
            if (newScale === 1) setPosition({ x: 0, y: 0 }); // Reset pos on full zoom out
            return newScale;
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true);
            setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && scale > 1) {
            e.preventDefault();
            setPosition({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div 
            className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black/50 rounded-2xl border border-white/5 group pointer-events-auto"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <img 
                ref={imgRef}
                src={src} 
                alt={alt} 
                className={`max-w-full max-h-[90vh] transition-transform duration-100 ease-linear select-none ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                style={{ 
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` 
                }}
                onMouseDown={handleMouseDown}
                draggable={false}
            />

            {/* Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 z-10 pointer-events-auto">
                <button onClick={handleZoomOut} className="size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="px-2 flex items-center text-xs font-mono text-white min-w-[3rem] justify-center">{Math.round(scale * 100)}%</span>
                <button onClick={handleZoomIn} className="size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">add</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); setScale(1); setPosition({x:0, y:0}); }} className="size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center ml-2" title="Reset">
                    <span className="material-symbols-outlined text-sm">restart_alt</span>
                </button>
            </div>
        </div>
    );
};

const PortfolioGridItem = ({ item, onClick }: { item: PortfolioItem; onClick: (item: PortfolioItem) => void }) => {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    // Use a small timeout to avoid rapid toggling performance issues
    setTimeout(() => {
        if(videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {}); // catch promise errors if unmounted
        }
    }, 50);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if(videoRef.current) {
        videoRef.current.pause();
    }
  };

  const isVideo = item.type === 'video' || item.type === 'reel';

  // Helper icon
  const getIconForType = (type: MediaType) => {
    switch (type) {
      case 'video': return 'play_arrow';
      case 'reel': return 'movie'; 
      case 'audio': return 'music_note';
      default: return 'zoom_in';
    }
  };

  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={isVideo ? handleMouseEnter : undefined}
      onMouseLeave={isVideo ? handleMouseLeave : undefined}
      className="group relative aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/5 cursor-pointer hover:border-primary/50 transition-colors z-0"
    >
        {/* Render Video if hovering and supported */}
        {isVideo && isHovering ? (
            <div className="w-full h-full animate-in fade-in duration-300">
                <video
                    ref={videoRef}
                    src={item.src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                />
            </div>
        ) : (
            <img
                src={item.thumb}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
        )}

        {/* Icon Overlay (hidden if video playing to allow clear view, but visible for non-video or initial state) */}
        {(!isVideo || !isHovering) && (
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                 <div className="size-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                     <span className="material-symbols-outlined text-white filled">
                        {getIconForType(item.type)}
                     </span>
                 </div>
             </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur text-[10px] font-bold uppercase text-white/80 pointer-events-none">
            {item.type}
        </div>
    </div>
  );
};


const ArtistProfile: React.FC = () => {
  // Main State
  const [artist, setArtist] = useState(initialArtist);
  const [tracks, setTracks] = useState(initialTracks);
  const [portfolioItems, setPortfolioItems] = useState(initialPortfolioItems);
  const [events, setEvents] = useState<Event[]>([]); // Start empty to show empty state logic
  
  // UI State
  const [activeTab, setActiveTab] = useState<'portfolio' | 'tracks' | 'events'>('portfolio');
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'image' | 'video' | 'reel' | 'audio'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Modal State
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddMediaOpen, setIsAddMediaOpen] = useState(false);
  const [isAddTrackOpen, setIsAddTrackOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Add Media Custom Dropdown State
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [isMediaTypeDropdownOpen, setIsMediaTypeDropdownOpen] = useState(false);

  // Booking Modal Dropdown State
  const [bookingEventType, setBookingEventType] = useState("Live Performance");
  const [isBookingTypeDropdownOpen, setIsBookingTypeDropdownOpen] = useState(false);

  // Refs for file inputs
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const trackImageInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setArtist(prev => ({ ...prev, banner: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setArtist(prev => ({ ...prev, avatar: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setArtist(prev => ({
        ...prev,
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        subCategory: formData.get('subCategory') as string,
        location: formData.get('location') as string,
        whatsapp: formData.get('whatsapp') as string,
        bio: formData.get('bio') as string,
    }));
    setIsEditProfileOpen(false);
  };

  const handleAddMedia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type') as MediaType;
    // Mock image for demo if no file uploaded
    const mockImage = "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop";
    
    const newItem: PortfolioItem = {
        id: Date.now(),
        type,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        thumb: mockImage, // In real app, generate from file
        src: mockImage,   // In real app, upload file
    };
    setPortfolioItems([newItem, ...portfolioItems]);
    setIsAddMediaOpen(false);
  };

  const handleAddTrack = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTrack: Track = {
        id: Date.now(),
        title: formData.get('title') as string,
        duration: "0:00", // Would come from audio file metadata
        plays: "0",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop"
    };
    setTracks([newTrack, ...tracks]);
    setIsAddTrackOpen(false);
  };

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent: Event = {
        id: Date.now(),
        title: formData.get('title') as string,
        venue: formData.get('venue') as string,
        location: formData.get('location') as string,
        date: formData.get('date') as string,
    };
    setEvents([newEvent, ...events]);
    setIsAddEventOpen(false);
  };

  const handleBookNow = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate API call
      setTimeout(() => {
          setIsBookingOpen(false);
          alert(`Booking request sent to ${artist.name}!`);
      }, 1000);
  };

  const filteredPortfolio = portfolioItems.filter(item => 
      portfolioFilter === 'all' ? true : item.type === portfolioFilter
  );
  
  const relatedMedia = portfolioItems.filter(item => item.id !== selectedItem?.id).slice(0, 3);

  return (
    <div className="w-full min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* --- HIDDEN FILE INPUTS --- */}
      <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={handleBannerUpload} />
      <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={handleAvatarUpload} />

      {/* 1. Cover Photo (Banner) */}
      <div className="relative h-[350px] w-full group">
        <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{ backgroundImage: `url("${artist.banner}")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
        
        {/* Edit Cover Button - Functioning */}
        <button 
            onClick={() => bannerInputRef.current?.click()}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-white/10 transition-all opacity-0 group-hover:opacity-100 z-10"
        >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Edit Cover
        </button>
      </div>

      <div className="container mx-auto px-4 max-w-[1280px] relative -mt-24">
         <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Sidebar / Profile Card */}
            <div className="w-full lg:w-[360px] flex-shrink-0">
               <div className="glass-card p-6 rounded-2xl relative">
                  
                  {/* 2. Profile Photo */}
                  <div className="relative -mt-20 mb-4 flex justify-between items-end group">
                     <div className="relative size-36 rounded-2xl p-1 bg-background-dark shadow-2xl">
                        <img 
                            src={artist.avatar} 
                            alt={artist.name} 
                            className="w-full h-full rounded-xl object-cover border border-white/10" 
                        />
                        {/* Edit Avatar Overlay */}
                        <div 
                            onClick={() => avatarInputRef.current?.click()}
                            className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-white">photo_camera</span>
                        </div>
                     </div>
                     <div className="flex gap-2 mb-2">
                        <button 
                            onClick={() => setIsEditProfileOpen(true)}
                            className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-primary" 
                            title="Edit Profile"
                        >
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                     </div>
                  </div>

                  {/* 3. Artist Name + Verified Badge */}
                  <div className="mb-1">
                      <div className="flex items-center gap-2">
                          <h1 className="text-2xl font-bold text-white">{artist.name}</h1>
                          <span className="material-symbols-outlined text-[20px] text-blue-400 filled" title="Verified Artist">verified</span>
                      </div>
                      <p className="text-white/40 text-sm">{artist.username}</p>
                  </div>

                  {/* 4. Category + Sub-category */}
                  <div className="mb-4">
                      <p className="text-primary font-bold text-sm uppercase tracking-wide">{artist.category}</p>
                      <p className="text-white/70 text-sm">{artist.subCategory}</p>
                  </div>

                  {/* 5. Work Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                      {artist.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-bold text-white/60 uppercase tracking-wider">
                              {tag}
                          </span>
                      ))}
                  </div>

                  {/* 6. Location */}
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-6 border-b border-white/5 pb-6">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span>{artist.location}</span>
                  </div>

                  {/* Stats Row */}
                  <div className="flex justify-between items-center mb-6">
                      <div className="text-center">
                          <div className="font-bold text-white text-lg">{artist.stats.followers}</div>
                          <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Followers</div>
                      </div>
                      <div className="w-px h-8 bg-white/10"></div>
                      <div className="text-center">
                          <div className="font-bold text-white text-lg">{artist.stats.following}</div>
                          <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Following</div>
                      </div>
                      <div className="w-px h-8 bg-white/10"></div>
                      <div className="text-center">
                          <div className="font-bold text-white text-lg">{tracks.length}</div>
                          <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Tracks</div>
                      </div>
                  </div>

                  {/* 8. WhatsApp Contact */}
                  <div className="space-y-3 mb-8">
                      <a 
                        href={`https://wa.me/${artist.whatsapp}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full py-3 bg-[#25D366] text-white font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,211,102,0.2)]"
                      >
                          <span className="material-symbols-outlined filled">chat</span>
                          Contact via WhatsApp
                      </a>
                      <button 
                        onClick={() => setIsBookingOpen(true)}
                        className="w-full py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                      >
                          Book Now
                      </button>
                  </div>

                  {/* 7. Bio */}
                  <div className="mb-8">
                      <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">About</h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                          {artist.bio}
                      </p>
                  </div>

                  {/* 9. Social Links */}
                  <div>
                      <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Socials</h4>
                      <div className="flex gap-3">
                          {artist.socials.map((social) => (
                              <a 
                                key={social.name}
                                href={social.link}
                                className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-primary/50 transition-all"
                                title={social.name}
                              >
                                  <span className="material-symbols-outlined text-[20px]">{social.icon}</span>
                              </a>
                          ))}
                      </div>
                  </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full mt-8 lg:mt-0">
                {/* Tabs */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2 border-b border-white/5">
                   {[
                       { id: 'portfolio', label: 'Portfolio' },
                       { id: 'tracks', label: 'Tracks' },
                       { id: 'events', label: 'Events' }
                   ].map((tab) => (
                       <button 
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id as any)}
                           className={`px-6 py-3 border-b-2 text-sm font-bold capitalize transition-all whitespace-nowrap ${
                               activeTab === tab.id 
                               ? 'border-primary text-primary' 
                               : 'border-transparent text-white/40 hover:text-white'
                           }`}
                       >
                           {tab.label}
                       </button>
                   ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                   
                   {/* 10. Portfolio Section */}
                   {activeTab === 'portfolio' && (
                       <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                               <div className="flex items-center gap-4">
                                   <h3 className="text-xl font-bold text-white">Featured Work</h3>
                                   
                                   {/* Filters */}
                                   <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/10 overflow-x-auto hide-scrollbar">
                                        {(['all', 'image', 'video', 'reel', 'audio'] as const).map((filter) => {
                                            const label = {
                                                all: 'All',
                                                image: 'Images',
                                                video: 'Videos',
                                                reel: 'Reels',
                                                audio: 'Audio'
                                            }[filter];
                                            return (
                                                <button
                                                    key={filter}
                                                    onClick={() => setPortfolioFilter(filter)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-bold capitalize transition-all whitespace-nowrap ${
                                                        portfolioFilter === filter 
                                                        ? 'bg-white/10 text-white shadow-sm' 
                                                        : 'text-white/40 hover:text-white'
                                                    }`}
                                                >
                                                    {label}
                                                </button>
                                            );
                                        })}
                                   </div>
                               </div>

                               <button 
                                onClick={() => setIsAddMediaOpen(true)}
                                className="flex items-center gap-1 text-xs font-bold text-primary hover:underline self-start sm:self-auto whitespace-nowrap"
                               >
                                   <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                   Add Media
                               </button>
                           </div>
                           
                           {filteredPortfolio.length > 0 ? (
                               <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                   {filteredPortfolio.map((item) => (
                                       <PortfolioGridItem 
                                          key={item.id} 
                                          item={item} 
                                          onClick={(it) => setSelectedItem(it)} 
                                       />
                                   ))}
                               </div>
                           ) : (
                               <div className="w-full flex flex-col items-center justify-center h-[200px] text-center bg-white/[0.02] rounded-xl border border-white/5">
                                   <div className="size-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                                       <span className="material-symbols-outlined text-white/20 text-2xl">
                                           perm_media
                                       </span>
                                   </div>
                                   <p className="text-white/40 text-sm italic">No items found.</p>
                               </div>
                           )}
                       </div>
                   )}

                   {activeTab === 'tracks' && (
                       <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                           <div className="flex items-center justify-between mb-6">
                               <h3 className="text-xl font-bold text-white">Top Tracks</h3>
                               <button className="text-xs font-bold text-primary hover:underline">View All</button>
                           </div>
                           <div className="space-y-3">
                               {tracks.map((track, i) => (
                                   <div key={track.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                                       <span className="text-white/30 font-mono w-6 text-center text-sm group-hover:text-primary transition-colors">{i + 1}</span>
                                       <div className="size-12 rounded-lg bg-cover bg-center relative flex-shrink-0 overflow-hidden" style={{ backgroundImage: `url("${track.image}")` }}>
                                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                               <span className="material-symbols-outlined text-white text-[20px] filled">play_arrow</span>
                                           </div>
                                       </div>
                                       <div className="flex-1 min-w-0">
                                           <h4 className="font-bold text-white text-sm truncate">{track.title}</h4>
                                           <p className="text-white/40 text-xs">{track.plays} plays</p>
                                       </div>
                                       <span className="text-white/40 text-xs font-mono">{track.duration}</span>
                                       <button className="size-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                                           <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                       </button>
                                   </div>
                               ))}
                           </div>
                           
                           {/* Upload CTA - Functioning */}
                           <div 
                            onClick={() => setIsAddTrackOpen(true)}
                            className="mt-6 p-8 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/30 hover:bg-white/[0.02] transition-all cursor-pointer group"
                           >
                                <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-3">
                                    <span className="material-symbols-outlined">cloud_upload</span>
                                </div>
                                <h4 className="font-bold text-white text-sm">Upload New Track</h4>
                                <p className="text-white/40 text-xs mt-1">WAV, MP3, or AIFF up to 50MB</p>
                           </div>
                       </div>
                   )}
                   
                   {activeTab === 'events' && (
                       <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                           {events.length > 0 ? (
                               <div className="space-y-4">
                                  <div className="flex items-center justify-between mb-4">
                                     <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
                                     <button onClick={() => setIsAddEventOpen(true)} className="flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                                         <span className="material-symbols-outlined text-[16px]">add</span> Add Event
                                     </button>
                                  </div>
                                  {events.map((evt) => {
                                      // Safely parse local date to avoid timezone shift
                                      const [year, month, day] = evt.date.split('-').map(Number);
                                      const eventDate = new Date(year, month - 1, day);
                                      
                                      return (
                                          <div key={evt.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                              <div className="flex-shrink-0 w-full sm:w-20 h-20 bg-white/5 rounded-lg flex flex-col items-center justify-center border border-white/10">
                                                  <span className="text-primary font-bold text-xl">{eventDate.getDate()}</span>
                                                  <span className="text-white/50 text-xs uppercase font-bold">{eventDate.toLocaleString('default', { month: 'short' })}</span>
                                              </div>
                                              <div className="flex-1">
                                                  <h4 className="font-bold text-white text-lg">{evt.title}</h4>
                                                  <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                                                      <span className="material-symbols-outlined text-[16px]">apartment</span>
                                                      {evt.venue}
                                                  </div>
                                                  <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                                                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                      {evt.location}
                                                  </div>
                                              </div>
                                              <div className="flex items-center sm:self-center">
                                                  <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-bold hover:bg-primary/20 transition-colors">
                                                      Tickets
                                                  </button>
                                              </div>
                                          </div>
                                      );
                                  })}
                               </div>
                           ) : (
                               <div className="flex flex-col items-center justify-center h-[300px] text-center bg-white/[0.02] rounded-2xl border border-white/5">
                                   <div className="size-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4">
                                       <span className="material-symbols-outlined text-3xl">event_busy</span>
                                   </div>
                                   <h3 className="text-lg font-bold text-white mb-2">No Upcoming Events</h3>
                                   <p className="text-white/50 text-sm max-w-xs mb-6">
                                       You haven't added any upcoming gigs or performances yet.
                                   </p>
                                   <button 
                                    onClick={() => setIsAddEventOpen(true)}
                                    className="px-5 py-2 bg-white/10 border border-white/10 rounded-full text-sm font-bold hover:bg-white/20 transition-all flex items-center gap-2"
                                   >
                                       <span className="material-symbols-outlined text-[16px]">add</span>
                                       Add Event
                                   </button>
                               </div>
                           )}
                       </div>
                   )}
                </div>
            </div>
         </div>
      </div>

      {/* --- MODALS --- */}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#121418] border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#121418] z-10">
                    <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                    <button onClick={() => setIsEditProfileOpen(false)}><span className="material-symbols-outlined text-white/50 hover:text-white">close</span></button>
                </div>
                <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Name</label>
                        <input name="name" defaultValue={artist.name} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Category</label>
                        <input name="category" defaultValue={artist.category} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Sub-Category</label>
                        <input name="subCategory" defaultValue={artist.subCategory} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Location</label>
                        <input name="location" defaultValue={artist.location} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">WhatsApp Number</label>
                        <input name="whatsapp" defaultValue={artist.whatsapp} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Bio</label>
                        <textarea name="bio" defaultValue={artist.bio} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary resize-none" />
                    </div>
                    <button type="submit" className="w-full bg-primary text-background-dark font-bold py-3 rounded-xl hover:brightness-110 mt-2">Save Changes</button>
                </form>
            </div>
        </div>
      )}

      {/* Add Media Modal */}
      {isAddMediaOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#121418] border border-white/10 rounded-2xl w-full max-w-md">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Add to Portfolio</h3>
                    <button onClick={() => setIsAddMediaOpen(false)}><span className="material-symbols-outlined text-white/50 hover:text-white">close</span></button>
                </div>
                <form onSubmit={handleAddMedia} className="p-6 space-y-4">
                    <div className="relative">
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Media Type</label>
                        <input type="hidden" name="type" value={mediaType} />
                        <div 
                            onClick={() => setIsMediaTypeDropdownOpen(!isMediaTypeDropdownOpen)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
                        >
                            <span className="capitalize">{mediaType}</span>
                            <span className="material-symbols-outlined text-white/50 text-[20px] transition-transform duration-200" style={{ transform: isMediaTypeDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                        </div>
                        {isMediaTypeDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsMediaTypeDropdownOpen(false)}></div>
                                <div className="absolute top-full left-0 right-0 mt-1 bg-[#181a1d] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-48 overflow-y-auto custom-scrollbar">
                                    {['image', 'video', 'reel', 'audio'].map((type) => (
                                        <div 
                                            key={type}
                                            onClick={() => {
                                                setMediaType(type as MediaType);
                                                setIsMediaTypeDropdownOpen(false);
                                            }}
                                            className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-white/5 capitalize flex items-center justify-between transition-colors ${mediaType === type ? 'text-primary bg-white/[0.02]' : 'text-white/80'}`}
                                        >
                                            {type}
                                            {mediaType === type && <span className="material-symbols-outlined text-[16px] filled">check</span>}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Title</label>
                        <input name="title" required placeholder="e.g. Live Performance 2024" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Upload File</label>
                        <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center cursor-pointer hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-white/30 text-3xl">cloud_upload</span>
                            <p className="text-xs text-white/50 mt-2">Click to select file</p>
                            <input type="file" required className="hidden" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Description</label>
                        <textarea name="description" placeholder="Describe this work..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary resize-none" />
                    </div>
                    <button type="submit" className="w-full bg-primary text-background-dark font-bold py-3 rounded-xl hover:brightness-110 mt-2">Add Item</button>
                </form>
            </div>
        </div>
      )}

      {/* Add Track Modal */}
      {isAddTrackOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#121418] border border-white/10 rounded-2xl w-full max-w-md">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Upload New Track</h3>
                    <button onClick={() => setIsAddTrackOpen(false)}><span className="material-symbols-outlined text-white/50 hover:text-white">close</span></button>
                </div>
                <form onSubmit={handleAddTrack} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Track Title</label>
                        <input name="title" required placeholder="e.g. Summer Vibes" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                    </div>
                     <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Audio File</label>
                        <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center cursor-pointer hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-white/30 text-2xl">audio_file</span>
                            <p className="text-xs text-white/50 mt-2">Select Audio File (MP3/WAV)</p>
                            <input type="file" accept="audio/*" className="hidden" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Cover Art</label>
                        <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center cursor-pointer hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-white/30 text-2xl">image</span>
                            <p className="text-xs text-white/50 mt-2">Select Cover Image</p>
                            <input type="file" accept="image/*" className="hidden" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-primary text-background-dark font-bold py-3 rounded-xl hover:brightness-110 mt-2">Upload Track</button>
                </form>
            </div>
        </div>
      )}

      {/* Add Event Modal */}
      {isAddEventOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#121418] border border-white/10 rounded-2xl w-full max-w-md">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Add Event</h3>
                    <button onClick={() => setIsAddEventOpen(false)}><span className="material-symbols-outlined text-white/50 hover:text-white">close</span></button>
                </div>
                <form onSubmit={handleAddEvent} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Event Name</label>
                        <input name="title" required placeholder="e.g. Live at Hard Rock" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Date</label>
                        <input type="date" name="date" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Venue</label>
                        <input name="venue" required placeholder="e.g. Hard Rock Cafe" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/50 uppercase mb-1">Location</label>
                        <input name="location" required placeholder="e.g. Mumbai" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <button type="submit" className="w-full bg-primary text-background-dark font-bold py-3 rounded-xl hover:brightness-110 mt-2">Add Event</button>
                </form>
            </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-2xl w-full max-w-md transition-colors duration-200">
                <div className="p-6 border-b border-gray-100 dark:border-[#333] flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-[#e0e0e0]">Book {artist.name}</h3>
                    <button onClick={() => setIsBookingOpen(false)}><span className="material-symbols-outlined text-gray-500 dark:text-[#e0e0e0]/50 hover:text-gray-900 dark:hover:text-[#e0e0e0] transition-colors">close</span></button>
                </div>
                <form onSubmit={handleBookNow} className="p-6 space-y-4">
                    <p className="text-gray-600 dark:text-[#e0e0e0]/60 text-sm mb-2">Fill out this form to request a booking. The artist will contact you via your registered email or phone.</p>
                    
                    {/* Event Type Custom Dropdown */}
                    <div className="relative">
                        <label className="block text-xs font-bold text-gray-500 dark:text-[#e0e0e0]/50 uppercase mb-1">Event Type</label>
                        <input type="hidden" name="eventType" value={bookingEventType} />
                        <div 
                            onClick={() => setIsBookingTypeDropdownOpen(!isBookingTypeDropdownOpen)}
                            className="w-full bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-3 text-gray-900 dark:text-[#e0e0e0] flex items-center justify-between cursor-pointer hover:border-gray-300 dark:hover:border-[#555] transition-all duration-200"
                        >
                            <span>{bookingEventType}</span>
                            <span className={`material-symbols-outlined text-gray-400 dark:text-[#888] text-[20px] transition-transform duration-200 ${isBookingTypeDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                        </div>
                        
                        {isBookingTypeDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsBookingTypeDropdownOpen(false)}></div>
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    {['Live Performance', 'Studio Session', 'Private Event', 'Workshop'].map((type) => (
                                        <div 
                                            key={type}
                                            onClick={() => {
                                                setBookingEventType(type);
                                                setIsBookingTypeDropdownOpen(false);
                                            }}
                                            className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-[#333] flex items-center justify-between transition-colors ${bookingEventType === type ? 'text-primary font-bold' : 'text-gray-700 dark:text-[#e0e0e0]'}`}
                                        >
                                            {type}
                                            {bookingEventType === type && <span className="material-symbols-outlined text-[16px] filled">check</span>}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-[#e0e0e0]/50 uppercase mb-1">Preferred Date</label>
                        <input 
                            type="date" 
                            required 
                            className="w-full bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-3 text-gray-900 dark:text-[#e0e0e0] placeholder-gray-400 dark:placeholder-[#888] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-[#e0e0e0]/50 uppercase mb-1">Budget (Approx)</label>
                        <input 
                            placeholder="e.g. ₹50,000" 
                            className="w-full bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-3 text-gray-900 dark:text-[#e0e0e0] placeholder-gray-400 dark:placeholder-[#888] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-[#e0e0e0]/50 uppercase mb-1">Message</label>
                        <textarea 
                            rows={3} 
                            placeholder="Tell us more about the event..." 
                            className="w-full bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-3 text-gray-900 dark:text-[#e0e0e0] placeholder-gray-400 dark:placeholder-[#888] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all duration-200" 
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-xl hover:brightness-110 transition-all duration-200 mt-2 shadow-lg hover:shadow-primary/20">Send Request</button>
                </form>
            </div>
        </div>
      )}

      {/* Full Viewer Modal (Existing) */}
      {selectedItem && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedItem(null)}
          >
              <button 
                  className="absolute top-6 right-6 z-20 size-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors pointer-events-auto"
                  onClick={(e) => { e.stopPropagation(); setSelectedItem(null); }}
              >
                  <span className="material-symbols-outlined text-3xl">close</span>
              </button>

              <div 
                  className="w-full max-w-6xl h-full max-h-[90vh] grid grid-cols-1 lg:grid-cols-3 gap-6 pointer-events-none"
                  onClick={(e) => e.stopPropagation()}
              >
                  {/* Media Content */}
                  <div className="lg:col-span-2 flex items-center justify-center bg-black/50 rounded-2xl overflow-hidden pointer-events-auto border border-white/5">
                      {selectedItem.type === 'video' || selectedItem.type === 'reel' ? (
                           <video 
                             src={selectedItem.src} 
                             className={`w-full h-full ${selectedItem.type === 'reel' ? 'object-contain max-h-[85vh]' : 'object-contain'}`} 
                             controls 
                             autoPlay
                           />
                      ) : selectedItem.type === 'audio' ? (
                          <div className="flex flex-col items-center gap-8 p-8 w-full max-w-md">
                               <img 
                                 src={selectedItem.thumb} 
                                 alt={selectedItem.title} 
                                 className="w-full aspect-square rounded-xl shadow-2xl object-cover"
                               />
                               <audio src={selectedItem.src} controls className="w-full" />
                          </div>
                      ) : (
                          // Replaced standard img with new ImageViewer component
                          <ImageViewer src={selectedItem.src} alt={selectedItem.title} />
                      )}
                  </div>

                  {/* Details Sidebar */}
                  <div className="bg-[#121418] rounded-2xl p-6 pointer-events-auto border border-white/5 flex flex-col overflow-y-auto">
                      <div className="flex items-center gap-3 mb-6">
                           <div className="size-10 rounded-full overflow-hidden border border-white/10">
                               <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
                           </div>
                           <div>
                               <h4 className="font-bold text-white text-sm">{artist.name}</h4>
                               <p className="text-white/40 text-xs">Featured Artist</p>
                           </div>
                           <button className="ml-auto text-primary text-xs font-bold hover:underline">Follow</button>
                      </div>

                      <h2 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h2>
                      <div className="flex gap-2 mb-4">
                           <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/60">
                               {selectedItem.type}
                           </span>
                      </div>
                      
                      <p className="text-white/70 text-sm leading-relaxed mb-8">
                          {selectedItem.description}
                      </p>

                      <div className="mt-auto pt-6 border-t border-white/5">
                          <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">Related Media</h4>
                          <div className="grid grid-cols-3 gap-2">
                               {relatedMedia.map(item => (
                                   <div 
                                     key={item.id} 
                                     onClick={() => setSelectedItem(item)}
                                     className="aspect-square rounded-lg bg-white/5 cursor-pointer overflow-hidden hover:opacity-80 transition-opacity"
                                   >
                                       <img src={item.thumb} className="w-full h-full object-cover" alt="" />
                                   </div>
                               ))}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default ArtistProfile;
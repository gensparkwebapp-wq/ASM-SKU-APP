import React, { useState } from 'react';

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

// Mock Data
const artist = {
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

const tracks = [
  { id: 1, title: "Midnight Raga", plays: "45.2k", duration: "3:45", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop" },
  { id: 2, title: "Neon Streets", plays: "28.1k", duration: "4:12", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop" },
  { id: 3, title: "Monsoon Feelings", plays: "12.5k", duration: "3:20", image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=100&h=100&fit=crop" }
];

const portfolioItems: PortfolioItem[] = [
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
    { 
      id: 5, 
      type: 'image', 
      thumb: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&h=600&fit=crop', 
      src: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&h=800&fit=crop',
      title: 'Press Shot',
      description: 'Official press photo for the 2025 Summer Tour.'
    },
    { 
      id: 6, 
      type: 'image', 
      thumb: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop', 
      src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=800&fit=crop',
      title: 'Backstage',
      description: 'Moments of calm before the storm.'
    },
    { 
      id: 7, 
      type: 'reel', 
      thumb: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&h=600&fit=crop', 
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      title: 'Crowd Reaction',
      description: 'The energy last night was unmatched! Thank you Mumbai!'
    },
    {
      id: 8,
      type: 'video',
      thumb: 'https://images.unsplash.com/photo-1459749411177-287ce112a8bf?w=600&h=600&fit=crop',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: 'Acoustic Set',
      description: 'Stripped back version of "Neon Streets".'
    }
];

const ArtistProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'tracks' | 'events'>('portfolio');
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'image' | 'video' | 'reel' | 'audio'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredPortfolio = portfolioItems.filter(item => 
      portfolioFilter === 'all' ? true : item.type === portfolioFilter
  );

  const getIconForType = (type: MediaType) => {
    switch (type) {
      case 'video': return 'play_arrow';
      case 'reel': return 'movie'; // or 'smart_display' for reels feel
      case 'audio': return 'music_note';
      default: return null;
    }
  };

  const relatedMedia = portfolioItems.filter(item => item.id !== selectedItem?.id).slice(0, 3);

  return (
    <div className="w-full min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Cover Photo (Banner) */}
      <div className="relative h-[350px] w-full group">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${artist.banner}")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
        
        {/* Edit Cover Button */}
        <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-white/10 transition-all opacity-0 group-hover:opacity-100">
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
                  <div className="relative -mt-20 mb-4 flex justify-between items-end">
                     <div className="size-36 rounded-2xl p-1 bg-background-dark shadow-2xl">
                        <img 
                            src={artist.avatar} 
                            alt={artist.name} 
                            className="w-full h-full rounded-xl object-cover border border-white/10" 
                        />
                     </div>
                     <div className="flex gap-2 mb-2">
                        <button className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" title="Share">
                            <span className="material-symbols-outlined text-[20px]">share</span>
                        </button>
                        <button className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" title="Settings">
                            <span className="material-symbols-outlined text-[20px]">settings</span>
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
                          <div className="font-bold text-white text-lg">{artist.stats.tracks}</div>
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
                      <button className="w-full py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all">
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
                                        {(['all', 'image', 'video', 'reel', 'audio'] as const).map((filter) => (
                                            <button
                                                key={filter}
                                                onClick={() => setPortfolioFilter(filter)}
                                                className={`px-3 py-1.5 rounded-md text-xs font-bold capitalize transition-all whitespace-nowrap ${
                                                    portfolioFilter === filter 
                                                    ? 'bg-white/10 text-white shadow-sm' 
                                                    : 'text-white/40 hover:text-white'
                                                }`}
                                            >
                                                {filter === 'all' ? 'All' : filter + 's'}
                                            </button>
                                        ))}
                                   </div>
                               </div>

                               <button className="flex items-center gap-1 text-xs font-bold text-primary hover:underline self-start sm:self-auto whitespace-nowrap">
                                   <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                   Add Media
                               </button>
                           </div>
                           
                           {filteredPortfolio.length > 0 ? (
                               <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                   {filteredPortfolio.map((item) => {
                                       const typeIcon = getIconForType(item.type);
                                       return (
                                           <div 
                                             key={item.id} 
                                             onClick={() => setSelectedItem(item)}
                                             className="group relative aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/5 cursor-pointer hover:border-primary/50 transition-colors"
                                            >
                                               <img src={item.thumb} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                               
                                               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                   {typeIcon && (
                                                       <div className="size-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                                           <span className="material-symbols-outlined text-white filled">{typeIcon}</span>
                                                       </div>
                                                   )}
                                               </div>
                                           </div>
                                       );
                                   })}
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
                           
                           {/* Upload CTA */}
                           <div className="mt-6 p-8 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/30 hover:bg-white/[0.02] transition-all cursor-pointer group">
                                <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-3">
                                    <span className="material-symbols-outlined">cloud_upload</span>
                                </div>
                                <h4 className="font-bold text-white text-sm">Upload New Track</h4>
                                <p className="text-white/40 text-xs mt-1">WAV, MP3, or AIFF up to 50MB</p>
                           </div>
                       </div>
                   )}
                   
                   {activeTab === 'events' && (
                       <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col items-center justify-center h-[300px] text-center bg-white/[0.02] rounded-2xl border border-white/5">
                           <div className="size-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4">
                               <span className="material-symbols-outlined text-3xl">event_busy</span>
                           </div>
                           <h3 className="text-lg font-bold text-white mb-2">No Upcoming Events</h3>
                           <p className="text-white/50 text-sm max-w-xs mb-6">
                               You haven't added any upcoming gigs or performances yet.
                           </p>
                           <button className="px-5 py-2 bg-white/10 border border-white/10 rounded-full text-sm font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                               <span className="material-symbols-outlined text-[16px]">add</span>
                               Add Event
                           </button>
                       </div>
                   )}
                </div>
            </div>
         </div>
      </div>

      {/* Full Viewer Modal */}
      {selectedItem && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedItem(null)}
          >
              <button 
                  className="absolute top-6 right-6 z-20 size-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
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
                          <img 
                            src={selectedItem.src} 
                            alt={selectedItem.title} 
                            className="w-full h-full object-contain max-h-[90vh]"
                          />
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
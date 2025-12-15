import React, { useState } from 'react';

// Mock Data
const artist = {
  name: "Arjun Mehta",
  username: "@arjun_music",
  role: "Vocalist & Songwriter",
  location: "Mumbai, India",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&q=80",
  banner: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=400&fit=crop&q=80",
  bio: "Classically trained in Hindustani vocals with a passion for modern electronic fusion. Creating soundscapes that bridge the gap between tradition and future.",
  stats: {
    followers: "12.5k",
    following: "450",
    tracks: "24"
  },
  socials: [
    { icon: "public", link: "#" }, // Website
    { icon: "campaign", link: "#" } // Social
  ],
  genres: ["Indie Pop", "Electronic", "Classical Fusion"],
  instruments: ["Vocals", "Guitar", "Ableton"]
};

const tracks = [
  { id: 1, title: "Midnight Raga", plays: "45.2k", duration: "3:45", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop" },
  { id: 2, title: "Neon Streets", plays: "28.1k", duration: "4:12", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop" },
  { id: 3, title: "Monsoon Feelings", plays: "12.5k", duration: "3:20", image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=100&h=100&fit=crop" }
];

const ArtistProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tracks' | 'events' | 'media'>('tracks');

  return (
    <div className="w-full min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Banner */}
      <div className="relative h-[300px] w-full group">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${artist.banner}")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
        
        {/* Edit Cover Button */}
        <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-white/10 transition-all opacity-0 group-hover:opacity-100">
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Edit Cover
        </button>
      </div>

      <div className="container mx-auto px-4 max-w-[1280px] relative -mt-20">
         <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Sidebar / Profile Card */}
            <div className="w-full md:w-[320px] flex-shrink-0">
               <div className="glass-card p-6 rounded-2xl relative">
                  {/* Avatar */}
                  <div className="relative -mt-16 mb-4">
                     <div className="size-32 rounded-full p-1 bg-background-dark">
                        <img 
                            src={artist.avatar} 
                            alt={artist.name} 
                            className="w-full h-full rounded-full object-cover border-2 border-white/10" 
                        />
                     </div>
                     <div className="absolute bottom-1 right-1 bg-primary text-background-dark rounded-full p-1.5 border-[3px] border-background-dark" title="Verified Artist">
                        <span className="material-symbols-outlined text-[16px] font-bold filled">check</span>
                     </div>
                  </div>

                  <h1 className="text-2xl font-bold text-white mb-1">{artist.name}</h1>
                  <p className="text-primary font-medium text-sm mb-4">{artist.role}</p>

                  <div className="flex justify-between items-center py-4 border-y border-white/5 mb-6">
                      <div className="text-center">
                          <div className="font-bold text-white text-lg">{artist.stats.followers}</div>
                          <div className="text-xs text-white/40 uppercase tracking-wider">Followers</div>
                      </div>
                      <div className="text-center">
                          <div className="font-bold text-white text-lg">{artist.stats.following}</div>
                          <div className="text-xs text-white/40 uppercase tracking-wider">Following</div>
                      </div>
                      <div className="text-center">
                          <div className="font-bold text-white text-lg">{artist.stats.tracks}</div>
                          <div className="text-xs text-white/40 uppercase tracking-wider">Tracks</div>
                      </div>
                  </div>

                  <div className="space-y-4 mb-6">
                      <button className="w-full py-2.5 bg-primary text-background-dark font-bold rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(43,238,121,0.2)]">
                          Edit Profile
                      </button>
                      <button className="w-full py-2.5 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                          Share Profile
                      </button>
                  </div>

                  <div className="mb-6">
                      <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">About</h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                          {artist.bio}
                      </p>
                  </div>

                  <div className="mb-6">
                      <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Genres</h4>
                      <div className="flex flex-wrap gap-2">
                          {artist.genres.map(g => (
                              <span key={g} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
                                  {g}
                              </span>
                          ))}
                      </div>
                  </div>

                  <div>
                      <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Instruments</h4>
                      <div className="flex flex-wrap gap-2">
                          {artist.instruments.map(i => (
                              <span key={i} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
                                  {i}
                              </span>
                          ))}
                      </div>
                  </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full">
                {/* Tabs */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
                   {['tracks', 'events', 'media'].map((tab) => (
                       <button 
                           key={tab}
                           onClick={() => setActiveTab(tab as any)}
                           className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all whitespace-nowrap ${
                               activeTab === tab 
                               ? 'bg-white text-background-dark shadow-lg' 
                               : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                           }`}
                       >
                           {tab}
                       </button>
                   ))}
                </div>

                {/* Tab Content */}
                <div className="glass-card p-6 rounded-2xl min-h-[400px]">
                   {activeTab === 'tracks' && (
                       <div>
                           <div className="flex items-center justify-between mb-6">
                               <h3 className="text-xl font-bold text-white">Popular Tracks</h3>
                               <button className="text-xs font-bold text-primary hover:underline">View All</button>
                           </div>
                           <div className="space-y-4">
                               {tracks.map((track, i) => (
                                   <div key={track.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                                       <span className="text-white/30 font-mono w-4 text-center text-sm group-hover:text-primary transition-colors">{i + 1}</span>
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
                           <div className="mt-8 p-8 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/30 hover:bg-white/[0.02] transition-all cursor-pointer group">
                                <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-3">
                                    <span className="material-symbols-outlined">cloud_upload</span>
                                </div>
                                <h4 className="font-bold text-white text-sm">Upload New Track</h4>
                                <p className="text-white/40 text-xs mt-1">WAV, MP3, or AIFF up to 50MB</p>
                           </div>
                       </div>
                   )}
                   
                   {activeTab === 'events' && (
                       <div className="flex flex-col items-center justify-center h-[300px] text-center">
                           <div className="size-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4">
                               <span className="material-symbols-outlined text-3xl">event_busy</span>
                           </div>
                           <h3 className="text-lg font-bold text-white mb-2">No Upcoming Events</h3>
                           <p className="text-white/50 text-sm max-w-xs mb-6">
                               You haven't added any upcoming gigs or performances yet.
                           </p>
                           <button className="px-5 py-2 bg-white/10 border border-white/10 rounded-full text-sm font-bold hover:bg-white/20 transition-all">
                               Add Event
                           </button>
                       </div>
                   )}

                   {activeTab === 'media' && (
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[1,2,3,4,5,6].map((i) => (
                                <div key={i} className="aspect-square bg-white/5 rounded-xl border border-white/5 relative overflow-hidden group cursor-pointer">
                                    <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:text-white/20 transition-colors">
                                        <span className="material-symbols-outlined text-4xl">image</span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-white">add</span>
                                    </div>
                                </div>
                            ))}
                       </div>
                   )}
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
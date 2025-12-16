import React from 'react';
import { ViewState } from '../App';
import { mobileVideos } from '../data/mobileFeedData';

interface WetubeMobileLibraryPageProps {
  onNavigate: (view: ViewState, data?: any) => void;
}

const WetubeMobileLibraryPage: React.FC<WetubeMobileLibraryPageProps> = ({ onNavigate }) => {
  const recentHistory = mobileVideos.slice(0, 4);
  const downloads = mobileVideos.slice(1, 3);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased overflow-x-hidden pb-24 selection:bg-primary selection:text-white min-h-screen">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div onClick={() => onNavigate('profile')} className="relative group cursor-pointer">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-transparent group-hover:ring-primary transition-all" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBIJ4eEvmBDrakEcKJH8QvpzecOz8m4sJ8RMxXi4bIIXpaqELIy28JhYyZsdSfZbg23ZTX34_6qk8kG6xd0BZ_K4vRSH6bSvWxx6Hf6-D7te5jhq3kthVBNGpIDjkv8yrsR9SGJXgjnlmTIKw1GKhHEy-B1f9WK2ICyzk3l52BVV1mJWGHNBOjdzL4lR-vdck5D_99kDTX58qpb1uJXST52bSVQNE1Q2QYSl27WcdE6vqKsu0fEYNxWmY_LbLQSNK9F1L0VhGV49mA")` }}></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Library</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors">
            <span className="material-symbols-outlined">cast</span>
          </button>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button onClick={() => onNavigate('wetube-mobile-search', '')} className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </header>

      {/* Recent History Carousel */}
      <section className="mt-2">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-lg font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[20px] filled">history</span>Recent</h2>
          <button className="text-primary text-sm font-semibold hover:underline">View all</button>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4 gap-4 snap-x snap-mandatory">
          {recentHistory.map((video, index) => (
            <div key={video.id} onClick={() => onNavigate('wetube-mobile-player', video)} className="flex flex-col gap-2 min-w-[160px] w-[160px] snap-start group cursor-pointer">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-dark shadow-sm">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url("${video.thumbnail}")` }}></div>
                <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[10px] font-bold text-white">{video.duration}</div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30"><div className="h-full bg-primary" style={{ width: `${[75, 30, 90, 10][index]}%` }}></div></div>
              </div>
              <div>
                <h3 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{video.channelName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <div className="h-px w-full bg-black/5 dark:bg-white/5 my-2"></div>

      {/* Quick Filters / Chips */}
      <section className="py-2">
        <div className="flex gap-3 px-4 overflow-x-auto hide-scrollbar">
          <button className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 px-4 active:scale-95 transition-transform hover:bg-black/5 dark:hover:bg-white/10">
            <span className="material-symbols-outlined text-[20px]">thumb_up</span><span className="text-sm font-medium">Liked Videos</span>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 px-4 active:scale-95 transition-transform hover:bg-black/5 dark:hover:bg-white/10">
            <span className="material-symbols-outlined text-[20px]">movie</span><span className="text-sm font-medium">Your Movies</span>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 px-4 active:scale-95 transition-transform hover:bg-black/5 dark:hover:bg-white/10">
            <span className="material-symbols-outlined text-[20px]">video_library</span><span className="text-sm font-medium">Your Videos</span>
          </button>
        </div>
      </section>

      {/* Playlists Section */}
      <section className="mt-4 px-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Playlists</h2>
          <button className="flex items-center gap-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"><span>A-Z</span><span className="material-symbols-outlined text-[18px]">expand_more</span></button>
        </div>
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-4 p-2 -mx-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 transition-colors text-left group">
            <div className="size-14 rounded-lg bg-transparent border-2 border-dashed border-primary/50 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-colors"><span className="material-symbols-outlined text-primary text-[28px]">add</span></div>
            <div className="flex-1"><h3 className="text-base font-semibold text-primary">New Playlist</h3></div>
          </button>
          <div className="flex items-center gap-4 p-2 -mx-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 transition-colors cursor-pointer group">
            <div className="relative size-14 rounded-lg overflow-hidden flex items-center justify-center bg-surface-dark group-hover:ring-2 ring-primary/50 transition-all"><div className="absolute inset-0 bg-primary/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary text-[28px]">schedule</span></div></div>
            <div className="flex-1 flex flex-col justify-center"><h3 className="text-base font-medium">Watch Later</h3><p className="text-xs text-slate-500 dark:text-slate-400">32 unwatched videos</p></div>
          </div>
          <div className="flex items-center gap-4 p-2 -mx-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 transition-colors cursor-pointer group">
            <div className="relative size-14 rounded-lg overflow-hidden flex items-center justify-center bg-surface-dark group-hover:ring-2 ring-primary/50 transition-all">
              <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkmFzplhZkQUO7fQ6dzc9knzjm2YKFf_dczF3CZOCj46rgvEqA7dx-DByckD3nYRZYoUoIKNyx770g_xFb1A0ZGgBsshcUGsp4PpVnCQzryYAlpCxwItnfLpwep06Gp9St_ryEdjy3y4lK7y3cZaG9NErKqgVxCx48BBsPJYbjPMp5dtkLo_d7zPjhCTVkc3MvEzFoY4YUmuSw0rn1ODtE_tot7a1evVGjL7C4iYtsLlTdf9n5BsJWVqq3qWB5iblEtPlofB9gHeg")` }}></div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="material-symbols-outlined text-white text-[24px]">thumb_up</span></div>
            </div>
            <div className="flex-1 flex flex-col justify-center"><h3 className="text-base font-medium">Liked Videos</h3><p className="text-xs text-slate-500 dark:text-slate-400">1,204 videos</p></div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-black/5 dark:bg-white/5 my-4"></div>

      {/* Downloads Grid */}
      <section className="px-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold flex items-center gap-2"><span className="material-symbols-outlined text-[20px]">download_done</span>Downloads</h2>
          <button className="flex size-8 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors"><span className="material-symbols-outlined text-[20px]">settings</span></button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {downloads.map(video => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-2 shadow-sm bg-surface-dark">
                <div className="w-full h-full bg-cover bg-center group-hover:opacity-90 transition-opacity" style={{ backgroundImage: `url("${video.thumbnail}")` }}></div>
                <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[10px] font-bold text-white">{video.duration}</div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1"><h4 className="text-sm font-medium leading-tight line-clamp-2">{video.title}</h4><p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1"><span className="material-symbols-outlined text-[12px] text-green-500">check_circle</span>Downloaded</p></div>
                <button className="text-slate-500 dark:text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm font-semibold text-primary border border-primary/30 rounded-full hover:bg-primary/10 transition-colors">View all downloads</button>
      </section>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-black/5 dark:border-white/5 pb-5 pt-2 px-4 flex justify-between items-center z-50">
        <button onClick={() => onNavigate('wetube-mobile')} className="flex flex-col items-center justify-center w-16 gap-1 group text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">home</span><span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => onNavigate('shorts')} className="flex flex-col items-center justify-center w-16 gap-1 group text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">slow_motion_video</span><span className="text-[10px] font-medium">Shorts</span>
        </button>
        <button onClick={() => onNavigate('wetube-subscriptions')} className="flex flex-col items-center justify-center w-16 gap-1 group text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <div className="relative"><span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">subscriptions</span></div><span className="text-[10px] font-medium">Subs</span>
        </button>
        <button onClick={() => onNavigate('wetube-mobile-library')} className="flex flex-col items-center justify-center w-16 gap-1 group text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px] filled">video_library</span><span className="text-[10px] font-medium">Library</span>
        </button>
      </nav>
    </div>
  );
};

export default WetubeMobileLibraryPage;

import React from 'react';
import { ViewState } from '../App';
import { Video, videos as allVideos } from '../data/videos';

interface WetubeLibraryPageProps {
  videos: Video[];
  onNavigate: (view: ViewState, data?: any) => void;
}

const HistoryVideoCard: React.FC<{ video: Video; progress: number; onNavigate: () => void }> = ({ video, progress, onNavigate }) => (
    <div onClick={onNavigate} className="group flex flex-col gap-2 cursor-pointer w-[210px] shrink-0">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-dark">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
                style={{ backgroundImage: `url("${video.thumbnail}")` }}
            ></div>
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-bold px-1.5 py-0.5 rounded">{video.duration}</div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg filled">play_arrow</span>
            </div>
        </div>
        <div className="flex gap-3 items-start">
            <div className="flex flex-col gap-1 pr-6 relative w-full">
                <h3 className="text-white text-sm font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">{video.title}</h3>
                <p className="text-white/50 text-xs hover:text-white">{video.channelName}</p>
                <button className="absolute top-0 right-[-8px] opacity-0 group-hover:opacity-100 p-1 hover:bg-surface-dark rounded-full">
                    <span className="material-symbols-outlined text-white text-[20px]">more_vert</span>
                </button>
            </div>
        </div>
    </div>
);

const PlaylistCard: React.FC<{ title: string; videoCount: number; thumbnail: string; type: 'user' | 'liked' }> = ({ title, videoCount, thumbnail, type }) => {
    return (
      <div className="group flex flex-col gap-2 cursor-pointer">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-dark">
            {type === 'liked' ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-white text-4xl mb-2 filled">thumb_up</span>
                    <p className="text-white font-bold text-lg">{title}</p>
                 </div>
            ) : (
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${thumbnail}")` }}></div>
            )}

            {/* Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-2/5 bg-black/80 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                <p className="text-lg font-bold">{videoCount}</p>
                <span className="material-symbols-outlined text-[20px]">playlist_play</span>
            </div>
            
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs">
                    <span className="material-symbols-outlined">play_arrow</span> Play All
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <h3 className="text-white text-sm font-bold line-clamp-1 leading-tight group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-white/50 text-xs">{type === 'liked' ? 'Auto-generated' : 'User playlist'}</p>
        </div>
      </div>
    );
};


const WetubeLibraryPage: React.FC<WetubeLibraryPageProps> = ({ videos, onNavigate }) => {
  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[240px] flex-col overflow-y-auto bg-surface-dark/30 border-r border-white/5 pb-4 hide-scrollbar">
        <div className="flex flex-col p-3 gap-1">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-white">home</span>
                <p className="text-white text-sm font-medium">Home</p>
            </button>
            <button onClick={() => onNavigate('wetube-subscriptions')} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-white">subscriptions</span>
                <p className="text-white text-sm font-medium">Subscriptions</p>
            </button>
            <div className="my-2 border-t border-white/5 mx-3"></div>
            <button className="flex items-center gap-4 px-3 py-2 rounded-lg bg-white/10">
                <span className="material-symbols-outlined text-white filled">video_library</span>
                <p className="text-white text-sm font-bold">Library</p>
            </button>
             <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-white">history</span>
                <p className="text-white text-sm font-medium">History</p>
            </button>
            <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-white">schedule</span>
                <p className="text-white text-sm font-medium">Watch Later</p>
            </button>
             <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-white">thumb_up</span>
                <p className="text-white text-sm font-medium">Liked Videos</p>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background-dark p-4 lg:p-8">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-8">
            <h1 className="text-white tracking-light text-3xl font-bold">Library</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: 'history', label: 'Videos Watched', value: '1,204' },
                    { icon: 'schedule', label: 'Watch Later', value: '8' },
                    { icon: 'playlist_play', label: 'Playlists', value: '12' },
                    { icon: 'thumb_up', label: 'Liked Videos', value: '430' },
                ].map(stat => (
                    <div key={stat.label} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-surface-dark/50 p-4 items-start hover:bg-surface-dark transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-primary mb-1 filled">{stat.icon}</span>
                        <p className="text-white text-2xl font-bold">{stat.value}</p>
                        <p className="text-white/50 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="h-px bg-white/10 w-full"></div>

            {/* History Section */}
            <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-white">history</span><h2 className="text-white text-xl font-bold">History</h2></div>
                    <button className="text-blue-400 hover:bg-blue-400/10 px-3 py-1.5 rounded-full text-sm font-bold transition-colors">See all</button>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
                    {videos.slice(0, 5).map((video, i) => (
                       <HistoryVideoCard key={video.id} video={video} progress={[85, 30, 98, 10, 100][i]} onNavigate={() => onNavigate('wetube-player', video)} />
                    ))}
                </div>
            </section>
            
             <div className="h-px bg-white/10 w-full"></div>

            {/* Watch Later Section */}
            <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-white">schedule</span><h2 className="text-white text-xl font-bold">Watch Later</h2></div>
                    <button className="text-blue-400 hover:bg-blue-400/10 px-3 py-1.5 rounded-full text-sm font-bold transition-colors">See all</button>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
                     {videos.slice(5, 8).map(video => (
                       <HistoryVideoCard key={video.id} video={video} progress={0} onNavigate={() => onNavigate('wetube-player', video)} />
                    ))}
                </div>
            </section>

             <div className="h-px bg-white/10 w-full"></div>

            {/* Playlists Section */}
            <section className="flex flex-col gap-4 mb-8">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-white">playlist_play</span><h2 className="text-white text-xl font-bold">Playlists</h2></div>
                    <button className="text-blue-400 hover:bg-blue-400/10 px-3 py-1.5 rounded-full text-sm font-bold transition-colors">See all</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <PlaylistCard type="liked" title="Liked Videos" videoCount={430} thumbnail="" />
                    <PlaylistCard type="user" title="Learn Javascript" videoCount={12} thumbnail={videos[0].thumbnail} />
                    <PlaylistCard type="user" title="Chill Vibes" videoCount={45} thumbnail={videos[1].thumbnail} />
                </div>
            </section>
        </div>
      </main>
    </div>
  );
};

export default WetubeLibraryPage;

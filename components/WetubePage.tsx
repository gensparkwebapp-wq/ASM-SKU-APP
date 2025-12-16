import React, { useState, useMemo } from 'react';
import { Video } from '../data/videos';
import VideoCard from './VideoCard';
import { ViewState } from '../App';

const categories = ['All', 'Music', 'Tutorials', 'Live Shows', 'Podcasts', 'Gear Reviews', 'Gaming', 'Cooking', 'News', 'Travel'];

interface WetubePageProps {
  videos: Video[];
  onNavigate: (view: ViewState, data?: any) => void;
}

const WetubePage: React.FC<WetubePageProps> = ({ videos, onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredVideos = useMemo(() => {
        let currentVideos = videos;

        if (selectedCategory !== 'All') {
            currentVideos = currentVideos.filter(video => video.category === selectedCategory);
        }

        if (searchQuery.trim() !== '') {
            const lowercasedQuery = searchQuery.toLowerCase();
            currentVideos = currentVideos.filter(video =>
                video.title.toLowerCase().includes(lowercasedQuery) ||
                video.channelName.toLowerCase().includes(lowercasedQuery)
            );
        }

        return currentVideos;
    }, [searchQuery, selectedCategory, videos]);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onNavigate('wetube-search', searchQuery);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex w-full h-full">
            {/* Sidebar (Visible on LG screens) */}
            <aside className="hidden lg:flex w-[240px] flex-col overflow-y-auto bg-surface-dark/30 border-r border-white/5 pb-4 hide-scrollbar">
                <div className="px-3 py-3">
                    <div className="flex flex-col gap-1">
                        <button onClick={() => onNavigate('home')} className={`flex items-center gap-5 px-3 py-2 rounded-lg transition-colors hover:bg-white/5`}>
                            <span className="material-symbols-outlined text-white">home</span>
                            <span className="text-sm font-medium text-white">Home</span>
                        </button>
                        <button onClick={() => onNavigate('wetube-subscriptions')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-white">subscriptions</span>
                            <span className="text-sm font-medium text-white">Subscriptions</span>
                        </button>
                    </div>
                    <div className="my-3 border-t border-white/5"></div>
                    <h3 onClick={() => onNavigate('wetube-library')} className="px-3 py-2 text-base font-semibold text-white flex items-center gap-2 group cursor-pointer hover:bg-white/5 rounded-lg">
                        You <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
                    </h3>
                     <div className="flex flex-col gap-1">
                        <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-white">history</span>
                            <span className="text-sm font-medium text-white">History</span>
                        </button>
                        <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-white">playlist_play</span>
                            <span className="text-sm font-medium text-white">Playlists</span>
                        </button>
                         <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-white">thumb_up</span>
                            <span className="text-sm font-medium text-white">Liked videos</span>
                        </button>
                    </div>
                    <div className="my-3 border-t border-white/5"></div>
                    <h3 className="px-3 py-2 text-base font-semibold text-white">Subscriptions</h3>
                    <div className="flex flex-col gap-1">
                        {videos.slice(0, 5).map((vid, i) => (
                             <button key={i} onClick={() => onNavigate('wetube-channel', vid.channelName)} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="h-6 w-6 overflow-hidden rounded-full bg-white/10">
                                    <img className="h-full w-full object-cover" src={vid.channelAvatar} alt={vid.channelName} />
                                </div>
                                <span className="text-sm font-medium text-white truncate max-w-[120px] text-left">{vid.channelName}</span>
                                {i < 2 && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content Feed */}
            <main className="flex-1 overflow-y-auto bg-background-dark pb-8 relative">
                 {/* Top Search & Upload Bar (Visible in Main Area for this layout) */}
                 <div className="sticky top-0 z-30 bg-background-dark/95 backdrop-blur-sm px-4 py-3 border-b border-white/5 flex items-center gap-4">
                     <div className="relative flex-grow max-w-2xl">
                         <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search"
                            className="w-full h-10 pl-10 pr-4 rounded-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-white/40 text-sm transition-all"
                        />
                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/40">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </span>
                     </div>
                      <button 
                        onClick={handleSearch}
                        className="flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <span className="material-symbols-outlined text-white filled">mic</span>
                     </button>
                     <button
                        onClick={() => onNavigate('upload')}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full text-sm font-bold transition-all ml-auto"
                    >
                        <span className="material-symbols-outlined text-[18px]">add_box</span>
                        <span className="hidden sm:inline">Create</span>
                    </button>
                 </div>

                {/* Chips/Categories */}
                <div className="sticky top-[65px] z-20 bg-background-dark/95 backdrop-blur-sm px-4 py-3 w-full border-b border-transparent">
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`flex h-8 shrink-0 items-center justify-center rounded-lg px-3 transition-colors text-sm font-medium ${
                                    selectedCategory === category
                                        ? 'bg-white text-black'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 px-4 py-6">
                    {filteredVideos.length > 0 ? (
                        filteredVideos.map(video => (
                            <VideoCard 
                                key={video.id} 
                                video={video} 
                                onClick={() => onNavigate('wetube-player', video)}
                                onChannelClick={(name) => onNavigate('wetube-channel', name)}
                            />
                        ))
                    ) : (
                         <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/40">
                            <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
                            <p className="text-lg font-medium">No videos found</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default WetubePage;

import React from 'react';
import { ViewState } from '../App';
import { MobileVideo } from '../data/mobileFeedData';

interface WetubeMobilePlayerPageProps {
    video: MobileVideo;
    allVideos: MobileVideo[];
    onNavigate: (view: ViewState, data?: any) => void;
}

const SuggestedVideoItem: React.FC<{ video: MobileVideo, onClick: () => void }> = ({ video, onClick }) => (
    <div onClick={onClick} className="flex gap-3 group active:opacity-80 transition cursor-pointer">
        <div className="relative w-[160px] aspect-video shrink-0 rounded-lg overflow-hidden bg-slate-800">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${video.thumbnail}')` }}></div>
            <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[10px] font-bold text-white tracking-wide">{video.duration}</div>
        </div>
        <div className="flex flex-col flex-1 min-w-0 py-0.5">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug line-clamp-2 mb-1">
                {video.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-gray-400">{video.channelName}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                <span>{video.views}</span>
                <span>•</span>
                <span>{video.uploadDate}</span>
            </div>
        </div>
        <button className="shrink-0 h-6 w-6 flex items-start justify-center text-slate-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-xl">more_vert</span>
        </button>
    </div>
);


const WetubeMobilePlayerPage: React.FC<WetubeMobilePlayerPageProps> = ({ video, allVideos, onNavigate }) => {
    const suggestedVideos = allVideos.filter(v => v.id !== video.id);

    return (
        <div className="font-display text-slate-900 dark:text-white antialiased overflow-x-hidden min-h-screen w-full" style={{ backgroundColor: '#221010' }}>
            {/* Sticky Video Player Container */}
            <div className="sticky top-0 z-50 w-full bg-black shadow-xl">
                <div className="relative w-full aspect-video bg-black group overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url('${video.thumbnail}')` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>
                    <div className="absolute top-0 left-0 right-0 p-4 pt-4 flex justify-between items-start z-30">
                        <button onClick={() => onNavigate('wetube-mobile')} className="text-white hover:bg-white/10 rounded-full p-2 transition -ml-2">
                            <span className="material-symbols-outlined block text-3xl">expand_more</span>
                        </button>
                        <div className="flex gap-2">
                            <button className="text-white hover:bg-white/10 rounded-full p-2 transition"><span className="material-symbols-outlined block text-2xl">cast</span></button>
                            <button className="text-white hover:bg-white/10 rounded-full p-2 transition"><span className="material-symbols-outlined block text-2xl">closed_caption</span></button>
                            <button className="text-white hover:bg-white/10 rounded-full p-2 transition -mr-2"><span className="material-symbols-outlined block text-2xl">settings</span></button>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <button className="pointer-events-auto flex items-center justify-center rounded-full size-16 bg-black/40 backdrop-blur-sm text-white hover:bg-primary/80 hover:scale-105 transition duration-300">
                            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                        </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 z-30 flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-white/90 w-9 text-right">0:37</span>
                            <div className="relative flex-1 h-8 flex items-center group/slider cursor-pointer">
                                <div className="absolute left-0 right-0 h-1 bg-white/30 rounded-full overflow-hidden">
                                    <div className="h-full w-[45%] bg-white/40"></div>
                                </div>
                                <div className="absolute left-0 h-1 w-[28%] bg-primary rounded-full z-10"></div>
                                <div className="absolute left-[28%] size-3.5 bg-primary rounded-full shadow-lg scale-100 transition-transform z-20"></div>
                            </div>
                            <span className="text-xs font-medium text-white/50 w-9">{video.duration}</span>
                        </div>
                        <div className="flex justify-between items-center px-1">
                            <button className="text-white/80 hover:text-white"><span className="text-xs font-medium">Next: SwiftUI Advanced</span></button>
                            <button className="text-white hover:scale-110 transition"><span className="material-symbols-outlined block">fullscreen</span></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Scroll Area */}
            <div className="flex flex-col pb-8">
                <div className="px-4 pt-5 pb-2">
                    <h1 className="text-slate-900 dark:text-white text-xl font-bold leading-tight line-clamp-2">{video.title}</h1>
                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-600 dark:text-gray-400">
                        <span>{video.views}</span>
                        <span className="text-[8px] opacity-60">●</span>
                        <span>{video.uploadDate}</span>
                        <button className="text-slate-500 dark:text-gray-400 font-medium">...more</button>
                    </div>
                </div>
                <div className="px-4 py-3">
                    <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
                        <div className="flex items-center bg-slate-200 dark:bg-white/10 rounded-full h-9">
                            <button className="flex items-center gap-1.5 pl-3 pr-3 h-full border-r border-slate-300 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 rounded-l-full transition">
                                <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                                <span className="text-sm font-medium">12K</span>
                            </button>
                            <button className="flex items-center pl-3 pr-3 h-full hover:bg-black/5 dark:hover:bg-white/5 rounded-r-full transition">
                                <span className="material-symbols-outlined text-[20px]">thumb_down</span>
                            </button>
                        </div>
                        <button className="flex shrink-0 items-center gap-1.5 bg-slate-200 dark:bg-white/10 px-4 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition"><span className="material-symbols-outlined text-[20px]">share</span><span className="text-sm font-medium">Share</span></button>
                        <button className="flex shrink-0 items-center gap-1.5 bg-slate-200 dark:bg-white/10 px-4 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition"><span className="material-symbols-outlined text-[20px]">movie_edit</span><span className="text-sm font-medium">Remix</span></button>
                        <button className="flex shrink-0 items-center gap-1.5 bg-slate-200 dark:bg-white/10 px-4 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition"><span className="material-symbols-outlined text-[20px]">bookmark</span><span className="text-sm font-medium">Save</span></button>
                    </div>
                </div>
                <div className="px-4 py-3 border-y border-slate-200 dark:border-white/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="size-10 shrink-0 rounded-full bg-slate-700 bg-cover bg-center" style={{ backgroundImage: `url('${video.channelAvatar}')` }}></div>
                            <div className="flex flex-col truncate">
                                <span className="font-bold text-base leading-none text-slate-900 dark:text-white truncate">{video.channelName}</span>
                                <span className="text-xs text-slate-500 dark:text-gray-400 mt-1 truncate">450K subscribers</span>
                            </div>
                        </div>
                        <button className="shrink-0 bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition">Subscribe</button>
                    </div>
                </div>
                <div className="px-4 py-4">
                    <div className="bg-slate-200/50 dark:bg-white/5 rounded-xl p-3 active:bg-slate-200 dark:active:bg-white/10 transition cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-sm">Comments</span>
                            <span className="text-xs text-slate-500 dark:text-gray-400">405</span>
                            <span className="material-symbols-outlined text-lg ml-auto opacity-60">unfold_more</span>
                        </div>
                        <div className="flex gap-2.5 items-start">
                            <div className="size-6 shrink-0 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white font-bold shadow-sm">J</div>
                            <p className="text-xs text-slate-700 dark:text-gray-300 line-clamp-2 leading-relaxed">This tutorial is gold! I've been struggling with Auto Layout for weeks. The way you explained constraints finally made it click for me. 🔥</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 px-4 pt-2">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">Up Next</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 dark:text-gray-400">Autoplay</span>
                            <div className="w-8 h-4 bg-slate-300 dark:bg-white/20 rounded-full relative cursor-pointer">
                                <div className="absolute right-0.5 top-0.5 size-3 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                    {suggestedVideos.map(sv => <SuggestedVideoItem key={sv.id} video={sv} onClick={() => onNavigate('wetube-mobile-player', sv)} />)}
                </div>
            </div>
        </div>
    );
};

export default WetubeMobilePlayerPage;

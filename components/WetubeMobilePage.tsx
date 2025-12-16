import React from 'react';
import { ViewState } from '../App';
import { mobileVideos, mobileShorts } from '../data/mobileFeedData';
import MobileVideoCard from './MobileVideoCard';
import ShortsShelf from './ShortsShelf';

interface WetubeMobilePageProps {
    onNavigate: (view: ViewState, data?: any) => void;
}

const filterChips = ["All", "New to you", "Gaming", "Music", "Podcasts", "Programming", "Live"];

const WetubeMobilePage: React.FC<WetubeMobilePageProps> = ({ onNavigate }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white overflow-x-hidden min-h-screen pb-20 w-full">
            {/* Top App Bar */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm transition-colors duration-200">
                <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-primary text-3xl filled" style={{fontVariationSettings: "'FILL' 1"}}>play_circle</span>
                        <h1 className="text-xl font-bold tracking-tight">YouTube</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center justify-center p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
                            <span className="material-symbols-outlined text-2xl">cast</span>
                        </button>
                        <button className="relative flex items-center justify-center p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
                            <span className="material-symbols-outlined text-2xl">notifications</span>
                            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background-light dark:border-background-dark"></span>
                        </button>
                        <button onClick={() => onNavigate('wetube-mobile-search', 'UI Design Trends 2024')} className="flex items-center justify-center p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
                            <span className="material-symbols-outlined text-2xl">search</span>
                        </button>
                        <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 overflow-hidden">
                            {/* Avatar placeholder */}
                        </div>
                    </div>
                </div>
                {/* Filter Chips */}
                <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 pb-3 pt-1 border-b border-black/5 dark:border-white/10">
                    {filterChips.map((chip, index) => (
                        <button key={chip} className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition active:scale-95 ${index === 0 ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-900 dark:text-white'}`}>
                            {chip}
                        </button>
                    ))}
                </div>
            </header>

            {/* Main Content Feed */}
            <main className="flex flex-col gap-6 pt-4">
                <MobileVideoCard video={mobileVideos[0]} onClick={() => onNavigate('wetube-mobile-player', mobileVideos[0])} />
                <ShortsShelf shorts={mobileShorts} />
                <MobileVideoCard video={mobileVideos[1]} onClick={() => onNavigate('wetube-mobile-player', mobileVideos[1])} />
                <MobileVideoCard video={mobileVideos[2]} onClick={() => onNavigate('wetube-mobile-player', mobileVideos[2])} />
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-black/5 dark:border-white/5 z-50">
                <div className="flex justify-around items-center h-14">
                    {/* Home (Active) */}
                    <button onClick={() => onNavigate('wetube-mobile')} className="flex flex-col items-center justify-center w-full h-full gap-1 group">
                        <span className="material-symbols-outlined text-2xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
                        <span className="text-[10px] font-medium text-primary">Home</span>
                    </button>
                    {/* Shorts */}
                    <button onClick={() => onNavigate('shorts')} className="flex flex-col items-center justify-center w-full h-full gap-1 group text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
                        <span className="material-symbols-outlined text-2xl">bolt</span>
                        <span className="text-[10px] font-medium">Shorts</span>
                    </button>
                    {/* Create (+) */}
                    <button className="flex items-center justify-center w-full h-full group">
                        <div className="flex items-center justify-center h-9 w-9 rounded-full border border-gray-400 dark:border-gray-600 group-hover:bg-black/5 dark:group-hover:bg-white/10 transition">
                            <span className="material-symbols-outlined text-3xl text-gray-900 dark:text-white font-light">add</span>
                        </div>
                    </button>
                    {/* Subscriptions */}
                    <button onClick={() => onNavigate('wetube-subscriptions')} className="flex flex-col items-center justify-center w-full h-full gap-1 group text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
                        <span className="material-symbols-outlined text-2xl">subscriptions</span>
                        <span className="text-[10px] font-medium">Subscriptions</span>
                    </button>
                    {/* Library */}
                    <button onClick={() => onNavigate('wetube-mobile-library')} className="flex flex-col items-center justify-center w-full h-full gap-1 group text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
                        <span className="material-symbols-outlined text-2xl">video_library</span>
                        <span className="text-[10px] font-medium">Library</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default WetubeMobilePage;

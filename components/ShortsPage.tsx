import React, { useRef, useEffect, useState } from 'react';
import { shorts, Short } from '../data/shorts';
import ShortsPlayer from './ShortsPlayer';
import { ViewState } from '../App';

interface ShortsPageProps {
    onNavigate: (view: ViewState) => void;
}

const ShortsPage: React.FC<ShortsPageProps> = ({ onNavigate }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleShortId, setVisibleShortId] = useState<number | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const shortId = Number(entry.target.getAttribute('data-id'));
                        setVisibleShortId(shortId);
                    }
                });
            },
            { threshold: 0.7 } // Trigger when 70% of the video is visible
        );

        const players = containerRef.current?.querySelectorAll('.short-player-container');
        if (players) {
            players.forEach(player => observer.observe(player));
        }

        return () => {
            if (players) {
                players.forEach(player => observer.unobserve(player));
            }
        };
    }, []);

    return (
        <div className="relative h-screen w-screen bg-black overflow-hidden">
            {/* Minimal Header */}
            <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
                <div className="flex items-center gap-2">
                    <button onClick={() => onNavigate('home')} className="size-10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-3xl">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-xl font-bold text-white">Shorts</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="size-10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-2xl">search</span>
                    </button>
                     <button onClick={() => onNavigate('profile')} className="size-10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-2xl">person</span>
                    </button>
                </div>
            </header>

            {/* Swipeable Container */}
            <div
                ref={containerRef}
                className="h-full w-full snap-y snap-mandatory overflow-y-auto hide-scrollbar scroll-smooth"
            >
                {shorts.map(short => (
                    <div
                        key={short.id}
                        data-id={short.id}
                        className="short-player-container h-full w-full snap-start flex items-center justify-center relative"
                    >
                        <ShortsPlayer
                            short={short}
                            isVisible={visibleShortId === short.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShortsPage;

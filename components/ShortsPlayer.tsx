import React, { useState, useRef, useEffect } from 'react';
import { Short } from '../data/shorts';

interface ShortsPlayerProps {
    short: Short;
    isVisible: boolean;
}

const formatCount = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
};

const ShortsPlayer: React.FC<ShortsPlayerProps> = ({ short, isVisible }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            if (isVisible) {
                videoElement.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
            } else {
                videoElement.pause();
                videoElement.currentTime = 0;
                setIsPlaying(false);
            }
        }
    }, [isVisible]);

    const handleVideoTap = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            if (videoElement.paused) {
                videoElement.play();
                setIsPlaying(true);
            } else {
                videoElement.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div className="relative w-full h-full bg-black">
            <video
                ref={videoRef}
                src={short.videoUrl}
                loop
                playsInline
                muted={isMuted}
                className="w-full h-full object-contain"
                poster={short.thumbnail}
                onClick={handleVideoTap}
            />
            
            {/* Play/Pause indicator */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="size-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-5xl ml-1">play_arrow</span>
                    </div>
                </div>
            )}
            
            {/* Mute/Unmute button */}
            <button onClick={() => setIsMuted(!isMuted)} className="absolute top-20 right-4 z-30 size-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-white">{isMuted ? 'volume_off' : 'volume_up'}</span>
            </button>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 text-white bg-gradient-to-t from-black/60 to-transparent flex items-end">
                {/* Left Side: Info */}
                <div className="flex-1 space-y-2">
                    <h2 className="text-lg font-bold">{short.title}</h2>
                    <p className="text-sm text-white/80">{formatCount(short.views)} views</p>
                    <div className="flex items-center gap-3">
                        <img src={short.channelAvatar} alt={short.channelName} className="size-10 rounded-full border-2 border-white/50" />
                        <span className="font-semibold">{short.channelName}</span>
                        <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full">Subscribe</button>
                    </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex flex-col items-center space-y-5">
                    <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center gap-1">
                        <span className={`material-symbols-outlined text-3xl transition-colors ${isLiked ? 'filled text-red-500' : ''}`}>
                            favorite
                        </span>
                        <span className="text-xs font-semibold">{formatCount(short.likes)}</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-3xl">chat_bubble</span>
                        <span className="text-xs font-semibold">{formatCount(short.comments)}</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-3xl">send</span>
                        <span className="text-xs font-semibold">Share</span>
                    </button>
                    <button className="mt-2">
                        <span className="material-symbols-outlined text-3xl">more_horiz</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShortsPlayer;

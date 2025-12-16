import React from 'react';
import { Video } from '../data/videos';

interface VideoCardProps {
  video: Video;
  onClick?: () => void;
  onChannelClick?: (channelName: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = React.memo(({ video, onClick, onChannelClick }) => {
  const handleChannelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChannelClick) {
        onChannelClick(video.channelName);
    }
  };

  return (
    <div 
        onClick={onClick}
        className="flex flex-col gap-3 group cursor-pointer animate-in fade-in zoom-in-95 duration-300"
    >
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-surface-dark">
            <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
                style={{ backgroundImage: `url('${video.thumbnail}')` }}
            ></div>
            <span className={`absolute bottom-1 right-1 rounded px-1.5 py-0.5 text-xs font-medium text-white ${video.duration === 'LIVE' ? 'bg-primary flex items-center gap-1' : 'bg-black/80'}`}>
               {video.duration === 'LIVE' && <span className="material-symbols-outlined text-[12px] animate-pulse">sensors</span>}
               {video.duration}
            </span>
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
        </div>
        
        <div className="flex gap-3 px-1">
            <div 
                onClick={handleChannelClick}
                className="h-9 w-9 shrink-0 rounded-full bg-white/10 overflow-hidden hover:opacity-80 transition-opacity"
            >
                <img className="h-full w-full object-cover" src={video.channelAvatar} alt={video.channelName} loading="lazy" />
            </div>
            <div className="flex flex-col">
                <h3 className="text-base font-bold leading-tight text-white line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
                <div className="mt-1 flex flex-col text-sm text-white/50">
                    <span 
                        onClick={handleChannelClick}
                        className="hover:text-white transition-colors w-fit"
                    >
                        {video.channelName}
                    </span>
                    <span>{video.views} • {video.uploadDate}</span>
                </div>
            </div>
            <button className="ml-auto opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full h-fit self-start transition-all">
                <span className="material-symbols-outlined text-white text-[20px]">more_vert</span>
            </button>
        </div>
    </div>
  );
});

export default VideoCard;
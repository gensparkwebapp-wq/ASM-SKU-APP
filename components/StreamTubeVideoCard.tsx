import React from 'react';

export interface StreamTubeVideo {
    id: string;
    thumbnail: string;
    title: string;
    channelName: string;
    channelAvatar: string;
    views: string;
    uploadDate: string;
    duration: string;
    verified?: boolean;
}

interface StreamTubeVideoCardProps {
  video: StreamTubeVideo;
  onClick?: () => void;
}

const StreamTubeVideoCard: React.FC<StreamTubeVideoCardProps> = ({ video, onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-col gap-3 group cursor-pointer">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-800">
            <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
                style={{ backgroundImage: `url('${video.thumbnail}')` }}
            ></div>
            <span className={`absolute bottom-1 right-1 rounded px-1.5 py-0.5 text-xs font-medium text-white ${video.duration === 'LIVE' ? 'bg-[#ff0000] flex items-center gap-1' : 'bg-black/80'}`}>
               {video.duration === 'LIVE' && <span className="material-symbols-outlined text-[12px] animate-pulse">sensors</span>}
               {video.duration}
            </span>
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
        </div>
        
        <div className="flex gap-3 px-1">
            <div className="h-9 w-9 shrink-0 rounded-full bg-gray-500 overflow-hidden">
                <img className="h-full w-full object-cover" src={video.channelAvatar} alt={video.channelName} loading="lazy" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-base font-bold leading-tight text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#ff0000] transition-colors">{video.title}</h3>
                <div className="mt-1 flex flex-col text-sm text-gray-600 dark:text-gray-400">
                    <span className="hover:text-gray-900 dark:hover:text-white flex items-center gap-1">
                        {video.channelName} 
                        {video.verified && <span className="material-symbols-outlined text-gray-500 text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>}
                    </span>
                    <span>{video.views} • {video.uploadDate}</span>
                </div>
            </div>
            <button className="ml-auto opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full h-fit self-start">
                <span className="material-symbols-outlined text-gray-900 dark:text-white text-[20px]">more_vert</span>
            </button>
        </div>
    </div>
  );
};

export default StreamTubeVideoCard;
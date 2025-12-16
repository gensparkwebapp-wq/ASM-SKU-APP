import React from 'react';
import { MobileVideo } from '../data/mobileFeedData';

interface MobileVideoCardProps {
  video: MobileVideo;
  onClick?: () => void;
}

const MobileVideoCard: React.FC<MobileVideoCardProps> = ({ video, onClick }) => {
  return (
    <article onClick={onClick} className="flex flex-col gap-3 group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-surface-dark group-hover:opacity-90 transition-opacity">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${video.thumbnail}')` }}></div>
        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-medium text-white">
          {video.duration}
        </div>
      </div>
      {/* Info */}
      <div className="flex gap-3 px-4">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-700 bg-cover bg-center" style={{ backgroundImage: `url('${video.channelAvatar}')` }}></div>
        </div>
        <div className="flex flex-col flex-grow gap-0.5">
          <h3 className="text-base font-semibold leading-snug line-clamp-2">{video.title}</h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span>{video.channelName}</span>
            {video.views && <span className="mx-1">•</span>}
            {video.views && <span>{video.views}</span>}
            {video.uploadDate && <span className="mx-1">•</span>}
            {video.uploadDate && <span>{video.uploadDate}</span>}
          </div>
          {video.isLive && (
            <div className="mt-1">
              <span className="inline-flex items-center bg-primary/20 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                Live Now
              </span>
            </div>
          )}
        </div>
        <button className="flex-shrink-0 self-start p-1 -mr-2 text-gray-600 dark:text-white">
          <span className="material-symbols-outlined text-[20px]">more_vert</span>
        </button>
      </div>
    </article>
  );
};

export default MobileVideoCard;

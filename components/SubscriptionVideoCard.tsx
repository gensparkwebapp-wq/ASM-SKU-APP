import React from 'react';
import { SubscriptionVideo } from '../data/subscriptionFeedData';

interface SubscriptionVideoCardProps {
  video: SubscriptionVideo;
  onClick?: () => void;
}

const SubscriptionVideoCard: React.FC<SubscriptionVideoCardProps> = ({ video, onClick }) => {
  return (
    <article onClick={onClick} className="flex flex-col group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video sm:rounded-xl overflow-hidden bg-[#2f1616]">
        <div className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-105 transition-transform duration-500 ease-out" style={{ backgroundImage: `url("${video.thumbnail}")` }}></div>
        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-1.5 py-0.5 rounded">{video.duration}</div>
        {video.progress > 0 && <div className="absolute bottom-0 left-0 h-1 bg-primary" style={{ width: `${video.progress}%` }}></div>}
      </div>
      {/* Meta */}
      <div className="flex gap-3 px-4 sm:px-0 pt-3 items-start">
        <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 shrink-0 mt-1" style={{ backgroundImage: `url("${video.channelAvatar}")` }}></div>
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <h3 className="text-slate-900 dark:text-white text-base font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
          <div className="flex flex-wrap items-center gap-1 text-slate-500 dark:text-[#cb9090] text-sm font-normal">
            <span>{video.channelName}</span>
            <span className="text-[10px]">•</span>
            <span>{video.views}</span>
            <span className="text-[10px]">•</span>
            <span>{video.uploadDate}</span>
          </div>
        </div>
        <button className="shrink-0 text-slate-900 dark:text-white p-1 -mr-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
    </article>
  );
};

export default SubscriptionVideoCard;

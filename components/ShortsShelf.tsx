import React from 'react';
import { MobileShort } from '../data/mobileFeedData';

interface ShortsShelfProps {
  shorts: MobileShort[];
}

const ShortsShelf: React.FC<ShortsShelfProps> = ({ shorts }) => {
  return (
    <section className="border-y border-black/5 dark:border-white/5 py-4">
      <div className="flex items-center gap-2 px-4 mb-3">
        <span className="material-symbols-outlined text-primary text-2xl font-bold">bolt</span>
        <h3 className="text-lg font-bold">Shorts</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 snap-x">
        {shorts.map(short => (
          <div key={short.id} className="relative flex-shrink-0 w-40 aspect-[9/16] rounded-xl overflow-hidden snap-start">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${short.thumbnail}')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="font-bold text-sm leading-tight mb-1 line-clamp-2">{short.title}</p>
              <p className="text-xs font-medium opacity-90">{short.views}</p>
            </div>
            <div className="absolute top-2 right-2 p-1">
              <span className="material-symbols-outlined text-white drop-shadow-md">more_vert</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShortsShelf;

import React, { useState } from 'react';
import { ViewState } from '../App';
import { searchResults, SearchResult, SearchResultChannel, SearchResultVideo, SearchResultPlaylist } from '../data/mobileSearchData';

// --- SUB-COMPONENTS for RESULT CARDS ---

const ChannelResultCard: React.FC<{ item: SearchResultChannel }> = ({ item }) => (
  <div className="flex flex-col border-b border-gray-200 dark:border-white/5 py-4 mx-4">
    <div className="flex items-center gap-4">
      <div className="bg-center bg-no-repeat bg-cover rounded-full h-16 w-16 shrink-0 ring-2 ring-primary/20" style={{ backgroundImage: `url("${item.avatar}")` }}></div>
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{item.name}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-text-secondary">
          <span>{item.handle}</span><span className="text-[10px]">•</span><span>{item.subscribers}</span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-1">{item.description}</p>
      </div>
      <button className="h-9 px-5 bg-primary hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-colors shrink-0">Subscribe</button>
    </div>
    <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-2">
      <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">NEW</div>
      <p className="text-xs text-gray-500 dark:text-text-secondary">Latest video • 2 hours ago</p>
    </div>
  </div>
);

const VideoResultCard: React.FC<{ item: SearchResultVideo }> = ({ item }) => (
  <div className="active:bg-gray-100 dark:active:bg-white/5 transition-colors">
    <div className="flex flex-col p-4 gap-3">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg group">
        <div className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${item.thumbnail}")` }}></div>
        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-1.5 py-0.5 rounded">{item.duration}</div>
        {item.progress && <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"><div className="h-full bg-primary" style={{width: `${item.progress}%`}}></div></div>}
      </div>
      <div className="flex gap-3 items-start">
        {item.channelAvatar && <div className="w-10 h-10 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${item.channelAvatar}")`}}></div>}
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">{item.title}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-text-secondary mt-0.5">
            <span>{item.channelName}</span>
            {item.verified && <span className="material-symbols-outlined text-[14px] filled text-gray-400">check_circle</span>}
            <span>•</span><span>{item.views}</span><span>•</span><span>{item.uploadDate}</span>
          </div>
          {item.hasCC && <div className="mt-1 inline-flex"><span className="bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-1.5 py-0.5 rounded">CC</span></div>}
        </div>
        <button className="shrink-0 text-gray-500 dark:text-gray-400 p-1"><span className="material-symbols-outlined">more_vert</span></button>
      </div>
    </div>
  </div>
);

const CompactVideoResultCard: React.FC<{ item: SearchResultVideo }> = ({ item }) => (
  <div className="active:bg-gray-100 dark:active:bg-white/5 transition-colors p-4 pt-0">
    <div className="flex gap-3 h-24">
      <div className="relative w-40 h-full rounded-lg overflow-hidden shrink-0">
        <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url("${item.thumbnail}")` }}></div>
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1 py-0.5 rounded">{item.duration}</div>
      </div>
      <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">{item.title}</h3>
          <div className="flex items-center gap-1 text-[11px] text-gray-600 dark:text-text-secondary">
            <span>{item.channelName}</span><span>•</span><span>{item.views}</span>
          </div>
        </div>
        <button className="self-start"><span className="material-symbols-outlined text-gray-400 text-[18px]">more_horiz</span></button>
      </div>
    </div>
  </div>
);

const PlaylistResultCard: React.FC<{ item: SearchResultPlaylist }> = ({ item }) => (
  <div className="active:bg-gray-100 dark:active:bg-white/5 transition-colors">
    <div className="flex flex-col p-4 gap-3 pt-0">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg group">
        <div className="w-full h-full bg-center bg-cover blur-[1px] opacity-60 scale-110" style={{ backgroundImage: `url("${item.blurImage}")` }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[96%] h-[96%] bg-black/40 rounded-lg -z-10 mt-[-6px]"></div>
        <div className="absolute inset-0 m-auto w-[90%] h-[90%] rounded-lg overflow-hidden shadow-2xl"><div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url("${item.mainImage}")`}}></div></div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
          <div className="flex items-center gap-2 text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full"><span className="material-symbols-outlined text-sm">playlist_play</span><span className="text-xs font-bold uppercase tracking-wider">Play All</span></div>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">format_list_bulleted</span>{item.videoCount} videos</div>
      </div>
      <div className="flex gap-3 items-start">
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">{item.title}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-text-secondary mt-0.5"><span>{item.channelName}</span><span>•</span><span className="text-gray-500 dark:text-gray-400">{item.lastUpdated}</span></div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">Learn Figma from scratch with this complete crash course series.</p>
        </div>
        <button className="shrink-0 text-gray-500 dark:text-gray-400 p-1"><span className="material-symbols-outlined">more_vert</span></button>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
interface WetubeMobileSearchPageProps {
  query: string;
  onNavigate: (view: ViewState, data?: any) => void;
}

const filterChips = ["All", "Channels", "Videos", "Unwatched", "Live", "Playlists"];

const WetubeMobileSearchPage: React.FC<WetubeMobileSearchPageProps> = ({ query, onNavigate }) => {
  const [searchInput, setSearchInput] = useState(query);

  const clearSearch = () => setSearchInput('');

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-[#f8f5f5] dark:bg-[#221010]">
      <div className="sticky top-0 z-50 bg-[#f8f5f5]/95 dark:bg-[#221010]/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5 pb-2">
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <button onClick={() => onNavigate('wetube-mobile')} className="flex items-center justify-center p-2 -ml-2 rounded-full active:bg-gray-200 dark:active:bg-white/10 text-gray-800 dark:text-white transition-colors"><span className="material-symbols-outlined text-2xl">arrow_back</span></button>
          <div className="flex flex-1 items-center h-10 bg-gray-100 dark:bg-surface-dark-search rounded-full px-4 border border-transparent focus-within:border-primary/50 transition-all">
            <span className="material-symbols-outlined text-gray-500 dark:text-text-secondary text-[20px]">search</span>
            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-text-secondary/70 px-3 h-full" placeholder="Search YouTube" type="text" />
            <button onClick={clearSearch} className="flex items-center justify-center rounded-full bg-gray-300 dark:bg-[#5a2e2e] p-0.5"><span className="material-symbols-outlined text-gray-600 dark:text-text-secondary text-[16px]">close</span></button>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-surface-dark-search text-gray-800 dark:text-white active:scale-95 transition-transform"><span className="material-symbols-outlined filled">mic</span></button>
        </div>
        <div className="flex w-full overflow-x-auto hide-scrollbar gap-2 px-4 py-2">
            {filterChips.map((chip, i) => (
                <button key={chip} className={`shrink-0 h-8 px-4 rounded-lg text-sm font-semibold transition-colors ${i === 0 ? 'bg-gray-900 dark:bg-white text-white dark:text-black' : 'bg-gray-200 dark:bg-surface-dark-search text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-[#4a2626] border border-transparent dark:border-white/5'}`}>
                    {chip}
                </button>
            ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1 pb-20">
        {searchResults.map(item => {
          switch (item.type) {
            case 'channel': return <ChannelResultCard key={item.id} item={item} />;
            case 'video':
              if (item.layout === 'compact') {
                return <CompactVideoResultCard key={item.id} item={item} />;
              }
              return <VideoResultCard key={item.id} item={item} />;
            case 'playlist': return <PlaylistResultCard key={item.id} item={item} />;
            default: return null;
          }
        })}
      </div>
    </div>
  );
};

export default WetubeMobileSearchPage;
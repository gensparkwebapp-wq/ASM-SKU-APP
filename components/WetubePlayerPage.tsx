import React from 'react';
import { Video } from '../data/videos';
import { ViewState } from '../App';

interface WetubePlayerPageProps {
  video: Video;
  allVideos: Video[];
  onNavigate: (view: ViewState, data?: any) => void;
}

const WetubePlayerPage: React.FC<WetubePlayerPageProps> = ({ video, allVideos, onNavigate }) => {
  const suggestedVideos = allVideos.filter(v => v.id !== video.id);

  return (
    <div className="flex justify-center w-full min-h-full bg-background-dark text-white">
      <div className="flex flex-col lg:flex-row max-w-[1700px] w-full p-0 sm:p-6 gap-6">
        {/* Left Column: Video Player & Info */}
        <div className="flex flex-col flex-1 w-full min-w-0">
          {/* Video Player Container */}
          <div className="w-full bg-black aspect-video rounded-none sm:rounded-xl overflow-hidden relative group cursor-pointer shadow-lg mb-4">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url('${video.thumbnail}')` }}
            ></div>
            
            {/* Video Controls Overlay (Simulation) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end pb-3 px-4">
              {/* Progress Bar */}
              <div className="group/progress h-1 w-full bg-white/30 cursor-pointer mb-4 relative hover:h-1.5 transition-all">
                <div className="absolute h-full w-[35%] bg-primary"></div>
                <div className="absolute left-[35%] top-1/2 -translate-y-1/2 size-3 bg-primary rounded-full scale-0 group-hover/progress:scale-100 transition-transform"></div>
              </div>
              
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <button><span className="material-symbols-outlined filled">play_arrow</span></button>
                  <button><span className="material-symbols-outlined filled">skip_next</span></button>
                  <div className="flex items-center gap-1 group/vol">
                    <button><span className="material-symbols-outlined">volume_up</span></button>
                    <div className="w-0 overflow-hidden group-hover/vol:w-16 transition-all duration-300 ml-1">
                      <div className="h-1 bg-white rounded-full w-14"></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium ml-2">4:20 / {video.duration}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button><span className="material-symbols-outlined">closed_caption</span></button>
                  <button><span className="material-symbols-outlined">settings</span></button>
                  <button><span className="material-symbols-outlined">branding_watermark</span></button>
                  <button><span className="material-symbols-outlined">fullscreen</span></button>
                </div>
              </div>
            </div>
            
            {/* Play Button Center (if needed visually) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                 <div className="size-16 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="material-symbols-outlined filled text-4xl">play_arrow</span>
                 </div>
            </div>
          </div>

          {/* Video Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-white line-clamp-2 px-4 sm:px-0 mb-3">
            {video.title}
          </h1>

          {/* Channel & Actions Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-0 mb-4">
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => onNavigate('wetube-channel', video.channelName)}
                  className="bg-center bg-no-repeat bg-cover rounded-full size-10 cursor-pointer bg-white/10 hover:opacity-80 transition-opacity" 
                  style={{ backgroundImage: `url("${video.channelAvatar}")` }}
                ></div>
                <div className="flex flex-col">
                  <span 
                    onClick={() => onNavigate('wetube-channel', video.channelName)}
                    className="text-base font-semibold text-white hover:text-white/80 cursor-pointer"
                  >
                    {video.channelName}
                  </span>
                  <span className="text-xs text-white/50">1.2M subscribers</span>
                </div>
              </div>
              <button className="bg-white text-black hover:bg-white/80 px-4 py-2 rounded-full text-sm font-bold transition-colors">
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              <div className="flex items-center bg-white/10 rounded-full h-9">
                <button className="flex items-center gap-2 pl-3 pr-2 h-full hover:bg-white/20 rounded-l-full border-r border-white/10 transition-colors">
                  <span className="material-symbols-outlined text-lg">thumb_up</span>
                  <span className="text-sm font-medium">12K</span>
                </button>
                <button className="flex items-center px-3 h-full hover:bg-white/20 rounded-r-full transition-colors">
                  <span className="material-symbols-outlined text-lg">thumb_down</span>
                </button>
              </div>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 h-9 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
                <span className="material-symbols-outlined text-lg">share</span>
                Share
              </button>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 h-9 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
                <span className="material-symbols-outlined text-lg">download</span>
                Download
              </button>
              <button className="flex items-center justify-center bg-white/10 hover:bg-white/20 size-9 rounded-full transition-colors">
                <span className="material-symbols-outlined text-lg">more_horiz</span>
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-white/10 rounded-xl p-3 text-sm cursor-pointer hover:bg-white/20 transition-colors mx-4 sm:mx-0 mb-6">
            <div className="font-bold mb-1">{video.views} • {video.uploadDate}</div>
            <p className="whitespace-pre-line text-white/80 mb-2">
              In this video, {video.channelName} takes you through a journey of sound and creativity. 
              Don't forget to like, share, and subscribe for more content like this!
            </p>
            <button className="font-bold text-white mt-1">Show more</button>
          </div>

          {/* Comments Section (Desktop) */}
          <div className="hidden sm:block px-4 sm:px-0">
            <div className="flex items-center gap-8 mb-6">
              <h3 className="text-xl font-bold">453 Comments</h3>
              <button className="flex items-center gap-2 text-sm font-medium">
                <span className="material-symbols-outlined text-xl">sort</span>
                Sort by
              </button>
            </div>
            
            {/* Add Comment */}
            <div className="flex gap-4 mb-8">
              <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 shrink-0 bg-white/10">
                 <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80" alt="User" className="w-full h-full rounded-full object-cover"/>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <input className="bg-transparent border-0 border-b border-white/20 focus:border-primary focus:ring-0 px-0 py-1 w-full text-sm text-white placeholder-white/40" placeholder="Add a comment..." type="text"/>
                <div className="flex justify-end gap-2 mt-1">
                  <button className="px-4 py-2 text-sm font-medium rounded-full hover:bg-white/10 text-white/70 hover:text-white">Cancel</button>
                  <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 text-white/50 hover:bg-primary hover:text-background-dark transition-colors">Comment</button>
                </div>
              </div>
            </div>

            {/* Comment List */}
            <div className="flex flex-col gap-6">
              {/* Comment 1 */}
              <div className="flex gap-4 group">
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 shrink-0 bg-white/10">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" alt="Commenter" className="w-full h-full rounded-full object-cover"/>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs mb-0.5">
                    <span className="font-bold text-[13px] text-white">@MusicLover99</span>
                    <span className="text-white/50">2 days ago</span>
                  </div>
                  <p className="text-sm text-white leading-5">This tutorial is exactly what I needed! The way you explained the composition structure was super clear. Can't wait for part 2!</p>
                  <div className="flex items-center gap-4 mt-1">
                    <button className="flex items-center gap-1 p-1.5 rounded-full hover:bg-white/10 text-white/70">
                      <span className="material-symbols-outlined text-base">thumb_up</span>
                      <span className="text-xs">24</span>
                    </button>
                    <button className="flex items-center p-1.5 rounded-full hover:bg-white/10 text-white/70">
                      <span className="material-symbols-outlined text-base">thumb_down</span>
                    </button>
                    <button className="text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/10 text-white/70">Reply</button>
                  </div>
                </div>
              </div>
              
              {/* Comment 2 */}
              <div className="flex gap-4 group">
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 shrink-0 bg-white/10">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Commenter" className="w-full h-full rounded-full object-cover"/>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs mb-0.5">
                    <span className="font-bold text-[13px] text-white">@IndieFan</span>
                    <span className="text-white/50">5 hours ago</span>
                  </div>
                  <p className="text-sm text-white leading-5">Could you please share the gear list used in this video? The audio quality is insane.</p>
                  <div className="flex items-center gap-4 mt-1">
                    <button className="flex items-center gap-1 p-1.5 rounded-full hover:bg-white/10 text-white/70">
                      <span className="material-symbols-outlined text-base">thumb_up</span>
                      <span className="text-xs">5</span>
                    </button>
                    <button className="flex items-center p-1.5 rounded-full hover:bg-white/10 text-white/70">
                      <span className="material-symbols-outlined text-base">thumb_down</span>
                    </button>
                    <button className="text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/10 text-white/70">Reply</button>
                  </div>
                  
                  {/* Nested Reply */}
                  <div className="mt-1 ml-2 flex gap-3">
                    <div 
                      className="bg-center bg-no-repeat bg-cover rounded-full size-6 shrink-0" 
                      style={{ backgroundImage: `url("${video.channelAvatar}")` }}
                    ></div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-xs mb-0.5">
                        <span className="font-bold text-[13px] text-black bg-white px-1.5 rounded-full">{video.channelName}</span>
                        <span className="text-white/50">1 hour ago</span>
                      </div>
                      <p className="text-sm text-white leading-5">Just updated the description with the full gear list! Happy recording!</p>
                      <div className="flex items-center gap-4 mt-1">
                        <button className="flex items-center gap-1 p-1.5 rounded-full hover:bg-white/10 text-white/70">
                          <span className="material-symbols-outlined text-base">thumb_up</span>
                          <span className="text-xs">2</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Suggested Videos */}
        <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-3 px-4 sm:px-0">
          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            <button className="bg-white text-black px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors">All</button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors">From {video.channelName}</button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors">Related</button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors">Live</button>
          </div>

          {/* Video List */}
          <div className="flex flex-col gap-2">
            {suggestedVideos.map(suggested => (
              <div key={suggested.id} onClick={() => onNavigate('wetube-player', suggested)} className="flex gap-2 group cursor-pointer">
                <div className="relative w-[168px] aspect-video shrink-0 rounded-lg overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-200" 
                    style={{ backgroundImage: `url('${suggested.thumbnail}')` }}
                  ></div>
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-medium px-1 rounded">{suggested.duration}</span>
                </div>
                <div className="flex flex-col gap-1 pr-4">
                  <h4 className="text-sm font-semibold text-white line-clamp-2 leading-tight group-hover:text-white/90">{suggested.title}</h4>
                  <div className="text-xs text-white/50">
                    <p className="hover:text-white transition-colors">{suggested.channelName}</p>
                    <p>{suggested.views} • {suggested.uploadDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WetubePlayerPage;

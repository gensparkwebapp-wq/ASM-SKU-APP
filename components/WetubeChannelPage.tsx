import React, { useState } from 'react';
import { ViewState } from '../App';
import { Video, videos as allVideos } from '../data/videos';

interface WetubeChannelPageProps {
  channelName: string;
  onNavigate: (view: ViewState, data?: any) => void;
}

const WetubeChannelPage: React.FC<WetubeChannelPageProps> = ({ channelName, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Home');

  // Mock channel data (fallback to specific mock if not found in video list)
  const channelVideo = allVideos.find(v => v.channelName === channelName);
  
  const channelData = {
    name: channelName || "TechReview Pro",
    handle: `@${channelName?.replace(/\s+/g, '').toLowerCase() || 'techreviewpro'}`,
    subscribers: "2.85M subscribers",
    videoCount: "1.2K videos",
    description: "Checking out the latest tech, gadgets, and software so you don't have to. New videos every Tuesday and Friday!",
    avatar: channelVideo?.channelAvatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfdcCJXy6FsUQ4fLpV-VccqcHNo-0w5TS_nOq1ZzysxbG_C5g2jtDhDa05G2kzWfc8HKld0AXZnC425vH5dPcmJvahuNE00LHRZhHHUzdb_WpxvH1Zy6r1JdX_5P_R_DAIKtp21MYodUBs74XPtaHdgI_RoL-8XWZ1RRfD_tI8Xb88IZQYnS4B63mcwqgrO5SElfyH82MQwbY5QSckSUzGq147PO7qg_yPzGIAyFfQ0Y4ivIZy2klWdOJILVSdFMVO0LfYcABi4zo',
    banner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzEZ7Rb1zJcj_hqfEDJpfC5EFAwnGXAQIG342j40aicJlflYk3rJvBeBIconrNyaD09W080w2q2lBIx_pqEJJssCZi6rh6ZzP52Sz2wfAmo31iJInwV_lG9P5ezTBm02gM9FUTjkneTdSI5-orrZluPwVp5au85rae9ov5e-CAtsaIbkXtFoeqzSUADJzmbEvhtX0RvD2vEXZP3IFrdAL_4OUmAgGwy1IucwFUafukTEMTVC4rhkcfx73mWV5bB9hQJJ_TuEODTyc'
  };

  // Filter videos for this channel, or show some generic ones if none match exactly (for demo)
  const channelVideos = allVideos.filter(v => v.channelName === channelName);
  const displayVideos = channelVideos.length > 0 ? channelVideos : allVideos.slice(0, 4);

  return (
    <div className="flex w-full h-full">
      {/* Mini Sidebar (Desktop) */}
      <nav className="hidden md:flex flex-col w-[72px] hover:w-[240px] group transition-all duration-200 bg-surface-dark/30 border-r border-white/5 z-40 overflow-y-auto overflow-x-hidden shrink-0 pb-4">
        <div className="flex flex-col p-2 gap-1">
            <button onClick={() => onNavigate('home')} className="flex items-center px-4 py-4 rounded-lg hover:bg-white/5 gap-5 group/btn transition-colors">
                <span className="material-symbols-outlined text-white">home</span>
                <span className="text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-100">Home</span>
            </button>
            <button onClick={() => onNavigate('wetube-subscriptions')} className="flex items-center px-4 py-4 rounded-lg hover:bg-white/5 gap-5 group/btn transition-colors">
                <span className="material-symbols-outlined text-white">subscriptions</span>
                <span className="text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-100">Subscriptions</span>
            </button>
            <div className="my-2 border-t border-white/5 mx-4 opacity-0 group-hover:opacity-100"></div>
            <button onClick={() => onNavigate('wetube-library')} className="flex items-center px-4 py-4 rounded-lg hover:bg-white/5 gap-5 group/btn transition-colors">
                <span className="material-symbols-outlined text-white">video_library</span>
                <span className="text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-100">Library</span>
            </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background-dark pb-10 scroll-smooth">
        <div className="max-w-[1284px] mx-auto">
            {/* Channel Banner */}
            <div 
                className="w-full aspect-[6/1] min-h-[150px] sm:min-h-[212px] bg-center bg-cover bg-no-repeat" 
                style={{ backgroundImage: `url('${channelData.banner}')` }}
            ></div>

            {/* Channel Header Info */}
            <div className="px-4 sm:px-12 pt-6 pb-2">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Avatar */}
                    <div className="shrink-0">
                        <div 
                            className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-cover bg-center border-2 border-background-dark bg-surface-dark" 
                            style={{ backgroundImage: `url('${channelData.avatar}')` }}
                        ></div>
                    </div>
                    {/* Text Info */}
                    <div className="flex flex-col flex-1 gap-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                            {channelData.name}
                            <span className="material-symbols-outlined filled text-[18px] text-white/50">check_circle</span>
                        </h1>
                        <div className="flex flex-col text-white/50 text-sm gap-1">
                            <span className="font-medium text-white/90">{channelData.handle}</span>
                            <span>{channelData.subscribers} • {channelData.videoCount}</span>
                            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                                <span className="truncate max-w-[600px]">{channelData.description}</span>
                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                            </div>
                            <a href="#" className="text-blue-400 hover:underline text-sm font-semibold mt-1">
                                {channelData.handle.replace('@', '')}.com
                            </a>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-3">
                            <button className="bg-white text-black hover:bg-white/90 px-6 py-2 rounded-full text-sm font-bold transition-colors">
                                Subscribe
                            </button>
                            <button className="border border-white/20 text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="sticky top-0 bg-background-dark z-30 pt-4 px-4 sm:px-12 border-b border-white/10 mt-4">
                <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar">
                    {['Home', 'Videos', 'Live', 'Playlists', 'Community'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 border-b-2 font-bold text-sm uppercase tracking-wide whitespace-nowrap transition-colors ${
                                activeTab === tab ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                    <button className="pb-3 border-b-2 border-transparent text-white/50 hover:text-white font-bold text-sm uppercase tracking-wide whitespace-nowrap transition-colors ml-auto">
                        <span className="material-symbols-outlined text-lg">search</span>
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 sm:px-12 py-6 flex flex-col gap-8">
                {/* Featured Video Section */}
                <div className="flex flex-col lg:flex-row gap-6 mb-4">
                    <div 
                        className="flex-1 aspect-video rounded-xl overflow-hidden relative group cursor-pointer bg-surface-dark"
                        onClick={() => displayVideos[0] && onNavigate('wetube-player', displayVideos[0])}
                    >
                        <div 
                            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                            style={{ backgroundImage: `url('${displayVideos[0]?.thumbnail || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_jKTclbpRbBNqUR2DmnACCn2y-gLrlJhVzsG8VbbH-GPmuMC_w04iDFVXQ58IKI3ocDggxW7HoHya118CV8_TKiwOsH99GYBh2bBUFsjJNaqbTCaT8U3p5RBTOpwUbyHAakPoA3NMGbvGLQg8iw18jIfIZ4JPnGj4LrsR6w6HWBvSTHq0DDQ4FbsEw-PHylJPo4OyrwS4MMmpc_3wfQ7WQjrA4Ys3IpNdoiapu1GJoylsb_6mW-AkRZlSpKbmthWuH5E2Lmgqlhg'}')` }}
                        ></div>
                        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-bold text-white">{displayVideos[0]?.duration || '14:20'}</div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 text-6xl drop-shadow-lg transition-opacity filled">play_circle</span>
                        </div>
                    </div>
                    <div className="flex-1 lg:max-w-[400px] flex flex-col justify-center gap-3">
                        <h3 className="text-xl font-bold line-clamp-2 text-white">
                            {displayVideos[0]?.title || "The Ultimate Developer Desk Setup 2024 - Minimal & Productive"}
                        </h3>
                        <div className="text-white/50 text-xs font-bold">
                            {displayVideos[0]?.views || "1.2M views"} • {displayVideos[0]?.uploadDate || "2 weeks ago"}
                        </div>
                        <p className="text-white/50 text-sm line-clamp-4">
                            In this video, I break down my complete desk setup for content creation. From the mechanical keyboard to the ultrawide monitor, here is everything I use daily to stay productive. Links to all products are in the description below!
                        </p>
                        <button 
                            onClick={() => displayVideos[0] && onNavigate('wetube-player', displayVideos[0])}
                            className="self-start mt-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
                        >
                            Watch Full Video
                        </button>
                    </div>
                </div>

                <hr className="border-white/10" />

                {/* For You Section */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">For You</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
                        {displayVideos.map((video, idx) => (
                            <div key={`foryou-${idx}`} onClick={() => onNavigate('wetube-player', video)} className="flex flex-col gap-2 group cursor-pointer">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-dark">
                                    <div 
                                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" 
                                        style={{ backgroundImage: `url('${video.thumbnail}')` }}
                                    ></div>
                                    <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1 py-0.5 rounded text-[10px] font-bold text-white">{video.duration}</div>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-white font-bold text-sm leading-tight line-clamp-2 group-hover:text-white/90">{video.title}</h4>
                                    <div className="text-white/50 text-xs mt-1">
                                        {video.views} • {video.uploadDate}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Videos Section */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold text-white">Videos</h3>
                        <button className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-xs font-bold transition-colors text-white">
                            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                            Play all
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
                         {/* Repeating display videos for visual fullness in demo */}
                         {[...displayVideos, ...displayVideos].slice(0, 8).map((video, idx) => (
                            <div key={`videos-${idx}`} onClick={() => onNavigate('wetube-player', video)} className="flex flex-col gap-2 group cursor-pointer">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-dark">
                                    <div 
                                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" 
                                        style={{ backgroundImage: `url('${video.thumbnail}')` }}
                                    ></div>
                                    <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1 py-0.5 rounded text-[10px] font-bold text-white">{video.duration}</div>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-white font-bold text-sm leading-tight line-clamp-2 group-hover:text-white/90">{video.title}</h4>
                                    <div className="text-white/50 text-xs mt-1">
                                        {video.views} • {video.uploadDate}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default WetubeChannelPage;

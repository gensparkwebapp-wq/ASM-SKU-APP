import React, { useState } from 'react';
import { ViewState } from '../App';
import { videos } from '../data/videos';

interface YTStudioPageProps {
  onNavigate: (view: ViewState, data?: any) => void;
}

type StudioTab = 'Dashboard' | 'Content' | 'Analytics' | 'Community';

const YTStudioPage: React.FC<YTStudioPageProps> = ({ onNavigate }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<StudioTab>('Dashboard');

  const navItems = [
    { icon: 'space_dashboard', label: 'Dashboard' as StudioTab },
    { icon: 'video_library', label: 'Content' as StudioTab },
    { icon: 'analytics', label: 'Analytics' as StudioTab },
    { icon: 'forum', label: 'Community' as StudioTab },
  ];

  const recentVideos = videos.slice(0, 5).map(v => ({ ...v, comments: Math.floor(Math.random() * 100), likes: Math.floor(Math.random() * 1000) }));

  const subscribers = [
    { name: 'Riya Patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80' },
    { name: 'Vikram Singh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80' },
    { name: 'Ananya Joshi', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80' },
  ];
  
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {/* Latest Video Performance */}
            <div className="lg:col-span-2 xl:col-span-2 glass-card rounded-2xl p-6">
              <h3 className="font-bold text-white mb-1">Latest video performance</h3>
              <p className="text-xs text-white/50 mb-4">First 24 hours</p>
              <div className="flex gap-6">
                <div className="w-40 h-24 rounded-lg bg-surface-dark overflow-hidden shrink-0">
                  <img src={recentVideos[0].thumbnail} alt={recentVideos[0].title} className="w-full h-full object-cover"/>
                </div>
                <div className="grid grid-cols-3 gap-4 flex-1">
                  <div className="flex flex-col justify-center">
                    <span className="text-xs text-white/50">Views</span>
                    <span className="text-2xl font-bold text-white">2.1K</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs text-white/50">Watch time (hours)</span>
                    <span className="text-2xl font-bold text-white">85.2</span>
                    <span className="text-xs text-green-400">+15%</span>
                  </div>
                   <div className="flex flex-col justify-center">
                    <span className="text-xs text-white/50">Likes</span>
                    <span className="text-2xl font-bold text-white">128</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Channel Analytics */}
            <div className="lg:col-span-2 xl:col-span-2 glass-card rounded-2xl p-6">
               <h3 className="font-bold text-white mb-1">Channel analytics</h3>
               <p className="text-xs text-white/50 mb-4">Current subscribers: <span className="font-bold text-white">1,250</span></p>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                      <p className="text-sm font-bold text-white/70">Summary</p>
                      <p className="text-xs text-white/50">Last 28 days</p>
                  </div>
                  <div className="flex justify-end items-center">
                      <button onClick={() => setActiveTab('Analytics')} className="text-xs font-bold text-primary hover:underline">GO TO ANALYTICS</button>
                  </div>
                </div>
            </div>
          </div>
        );
      default:
        return <div className="p-6 text-center text-white/50">Content for {activeTab} goes here.</div>
    }
  };

  return (
      <div className="flex h-screen bg-background-dark text-white font-display">
        {/* Sidebar */}
        <aside className={`bg-surface-dark transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
          <div className="flex items-center justify-between p-4 h-16 border-b border-white/10">
            {!isSidebarCollapsed && <h2 className="font-bold text-lg">Creator Studio</h2>}
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 rounded-full hover:bg-white/10">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
          <nav className="p-2">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                title={item.label}
                className={`flex items-center gap-4 w-full p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.label ? 'bg-primary/10 text-primary' : 'hover:bg-white/10'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <header className="sticky top-0 z-10 h-16 bg-background-dark/80 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">{activeTab}</h1>
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('upload')} className="px-4 py-2 bg-primary text-background-dark text-sm font-bold rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-base">add</span> CREATE
              </button>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80" alt="User" className="size-9 rounded-full" />
            </div>
          </header>
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
  );
};

export default YTStudioPage;
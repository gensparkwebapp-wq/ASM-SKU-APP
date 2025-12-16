import React from 'react';
import { ViewState } from '../App';
import { subscriptionVideos } from '../data/subscriptionFeedData';
import SubscriptionVideoCard from './SubscriptionVideoCard';

interface WetubeSubscriptionsPageProps {
  onNavigate: (view: ViewState, data?: any) => void;
}

const filterChips = ["All", "Today", "Live", "Unwatched", "Posts", "Continue Watching"];

const WetubeSubscriptionsPage: React.FC<WetubeSubscriptionsPageProps> = ({ onNavigate }) => {
  const bottomNavItems = [
    { label: 'Dashboard', icon: 'dashboard', active: true, view: 'creator-studio-mobile' as ViewState },
    { label: 'Content', icon: 'video_library', active: false, view: 'yt-studio' as ViewState },
    { label: 'Analytics', icon: 'analytics', active: false, view: 'yt-studio' as ViewState },
    { label: 'Comments', icon: 'comment', active: false, view: 'yt-studio' as ViewState },
    { label: 'Earn', icon: 'monetization_on', active: false, view: 'yt-studio' as ViewState },
  ];
  
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-20 bg-[#f8f5f5] dark:bg-[#221010] font-display text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-[#f8f5f5]/90 dark:bg-[#221010]/90 backdrop-blur-md px-4 py-3 border-b border-black/5 dark:border-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <div onClick={() => onNavigate('profile')} className="relative group cursor-pointer">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-transparent group-hover:ring-primary/50 transition-all" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9gxE4uRhlb0ycHLmlFlwNp1sabLa1ONRHbVgJ7EUeUOimQD61zbazzvmzpq5EagASCunHKCzXZqC0vcvdbwhqSQ8JSzunNAh-BzQONWzrBSQKnpcFRiaPifpReMsLRC9ntm9CsNmAaNCuii_gKp65TgfYyp_y58D3ajaKGsQtBqGqv7fd8ocS_zCiYwnCYEudXsvR9EK5JFaVISwt7-5BEjVCSZx0carv1MGTnbe2NRYmHUsjr_RnxJ66ywb7Wn4BQdIp-yZwhiM")' }}></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Subscriptions</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center text-slate-600 dark:text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>search</span>
          </button>
          <button className="flex items-center justify-center text-slate-600 dark:text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>notifications</span>
          </button>
        </div>
      </header>

      {/* Filter Chips */}
      <div className="sticky top-[60px] z-40 bg-[#f8f5f5]/95 dark:bg-[#221010]/95 backdrop-blur-sm border-b border-black/5 dark:border-white/5">
        <div className="flex gap-3 px-4 py-3 overflow-x-auto hide-scrollbar items-center">
          {filterChips.map((chip, index) => (
             <button key={chip} className={`flex h-8 shrink-0 items-center justify-center rounded-lg px-4 transition-transform active:scale-95 ${
                 index === 0 
                 ? 'bg-slate-900 dark:bg-white' 
                 : 'bg-slate-200 dark:bg-[#2f1616] border border-transparent hover:border-white/10'
             }`}>
                <span className={`text-sm font-semibold leading-normal ${
                    index === 0 ? 'text-white dark:text-[#221010]' : 'text-slate-700 dark:text-white'
                }`}>{chip}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Feed */}
      <main className="flex flex-col gap-6 p-0 sm:p-4 w-full max-w-2xl mx-auto">
        {subscriptionVideos.map(video => <SubscriptionVideoCard key={video.id} video={video} />)}
        
        {/* Loading Skeleton */}
        <div className="flex flex-col animate-pulse opacity-50">
            <div className="w-full aspect-video sm:rounded-xl bg-slate-200 dark:bg-[#2f1616]"></div>
            <div className="flex gap-3 px-4 sm:px-0 pt-3">
                <div className="rounded-full size-10 bg-slate-200 dark:bg-[#2f1616] shrink-0"></div>
                <div className="flex flex-col gap-2 flex-1 pt-1">
                    <div className="h-4 bg-slate-200 dark:bg-[#2f1616] rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 dark:bg-[#2f1616] rounded w-1/2"></div>
                </div>
            </div>
        </div>
        <div className="h-4"></div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 z-50 w-full bg-[#f8f5f5]/90 dark:bg-[#221010]/90 backdrop-blur-xl border-t border-black/5 dark:border-white/5 pb-safe">
        <div className="flex justify-around items-center h-[60px] px-2">
            {bottomNavItems.map(item => (
                <button 
                    key={item.label} 
                    onClick={() => onNavigate(item.view)}
                    className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${item.active ? 'text-primary' : 'text-slate-400 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'}`}
                >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: item.active ? "'FILL' 1" : "" }}>{item.icon}</span>
                    <span className="text-[10px] font-medium">{item.label}</span>
                </button>
            ))}
        </div>
      </nav>
    </div>
  );
};

export default WetubeSubscriptionsPage;
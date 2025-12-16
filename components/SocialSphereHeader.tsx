import React from 'react';
import { ViewState } from '../App';

interface SocialSphereHeaderProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const NavIcon: React.FC<{
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`relative w-full h-14 flex items-center justify-center group ${isActive ? '' : 'hover:bg-gray-200 dark:hover:bg-surface-dark-search rounded-lg'}`}
  >
    <span className={`material-symbols-outlined text-3xl ${isActive ? 'text-primary-blue' : 'text-gray-600 dark:text-text-secondary'}`}>
      {icon}
    </span>
    {isActive && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-blue"></div>
    )}
  </button>
);

const SocialSphereHeader: React.FC<SocialSphereHeaderProps> = ({ activeView, onNavigate }) => {
  const currentUserAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80';

  const navItems: { view: ViewState; label: string; icon: string }[] = [
    { view: 'feed', label: 'Home', icon: 'home' },
    { view: 'friends', label: 'Friends', icon: 'group' },
    { view: 'watch', label: 'Watch', icon: 'smart_display' },
    { view: 'marketplace', label: 'Marketplace', icon: 'storefront' },
    { view: 'groups', label: 'Groups', icon: 'groups' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-surface-light dark:bg-surface-dark shadow-md flex items-center justify-between px-4 border-b border-gray-200 dark:border-border-dark">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <div className="size-10 bg-primary-blue rounded-full text-white font-bold text-2xl flex items-center justify-center font-display">
          SS
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-text-secondary">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input
            aria-label="Search SocialSphere"
            className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-surface-dark-search border-none focus:ring-2 focus:ring-primary-blue text-sm"
            placeholder="Search SocialSphere"
            type="text"
          />
        </div>
      </div>

      {/* Center Nav */}
      <nav className="hidden lg:flex items-center justify-center flex-1 max-w-xl mx-auto">
        {navItems.map(item => (
          <div key={item.view} className="flex-1">
            <NavIcon
              label={item.label}
              icon={item.icon}
              isActive={activeView === item.view}
              onClick={() => onNavigate(item.view)}
            />
          </div>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('settings')} aria-label="Settings" className="hidden sm:flex size-10 rounded-full bg-gray-200 dark:bg-surface-dark-search items-center justify-center">
          <span className="material-symbols-outlined text-xl">settings</span>
        </button>
        <button onClick={() => onNavigate('messages')} aria-label="Messages" className="hidden sm:flex size-10 rounded-full bg-gray-200 dark:bg-surface-dark-search items-center justify-center">
          <span className="material-symbols-outlined text-xl">chat</span>
        </button>
        <button onClick={() => onNavigate('notifications')} aria-label="Notifications" className="flex size-10 rounded-full bg-gray-200 dark:bg-surface-dark-search items-center justify-center">
          <span className="material-symbols-outlined text-xl">notifications</span>
        </button>
        <div onClick={() => onNavigate('profile')} className="cursor-pointer">
          <img src={currentUserAvatar} alt="User Profile" className="size-10 rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default SocialSphereHeader;

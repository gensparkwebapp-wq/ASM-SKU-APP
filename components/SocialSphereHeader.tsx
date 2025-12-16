import React, { useState, useRef, useEffect } from 'react';
import { ViewState } from '../App';
import { useData } from '../contexts/DataContext';

interface SocialSphereHeaderProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
  onToggleMobileMenu: () => void;
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
    className={`relative w-full h-14 flex items-center justify-center group ${isActive ? '' : 'hover:bg-surface-dark-search rounded-lg'}`}
  >
    <span className={`material-symbols-outlined text-3xl ${isActive ? 'text-primary-blue' : 'text-text-secondary'}`}>
      {icon}
    </span>
    {isActive && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-blue"></div>
    )}
  </button>
);

const SocialSphereHeader: React.FC<SocialSphereHeaderProps> = ({ activeView, onNavigate, onToggleMobileMenu }) => {
  const { state, actions } = useData();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    actions.logout();
    setIsProfileMenuOpen(false);
  };


  const navItems: { view: ViewState; label: string; icon: string }[] = [
    { view: 'feed', label: 'Home', icon: 'home' },
    { view: 'friends', label: 'Friends', icon: 'group' },
    { view: 'watch', label: 'Watch', icon: 'smart_display' },
    { view: 'marketplace', label: 'Marketplace', icon: 'storefront' },
    { view: 'groups', label: 'Groups', icon: 'groups' },
  ];

  return (
    <header className="fixed top-12 left-0 right-0 z-50 h-14 bg-surface-dark shadow-md flex items-center justify-between px-2 sm:px-4 border-b border-border-dark">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <button onClick={onToggleMobileMenu} aria-label="Open navigation menu" className="lg:hidden flex items-center justify-center size-10 rounded-full hover:bg-surface-dark-search transition-colors">
            <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <div className="size-10 bg-primary-blue rounded-full text-white font-bold text-2xl flex items-center justify-center font-display shrink-0">
          SS
        </div>
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input
            aria-label="Search SocialSphere"
            className="w-full h-10 pl-10 pr-4 rounded-full bg-surface-dark-search border-none focus:ring-2 focus:ring-primary-blue text-sm"
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
        <button onClick={() => onNavigate('settings')} aria-label="Settings" className="flex size-10 rounded-full bg-surface-dark-search items-center justify-center">
          <span className="material-symbols-outlined text-xl">settings</span>
        </button>
        <button onClick={() => onNavigate('messages')} aria-label="Messages" className="flex size-10 rounded-full bg-surface-dark-search items-center justify-center">
          <span className="material-symbols-outlined text-xl">chat</span>
        </button>
        <button onClick={() => onNavigate('notifications')} aria-label="Notifications" className="flex size-10 rounded-full bg-surface-dark-search items-center justify-center">
          <span className="material-symbols-outlined text-xl">notifications</span>
        </button>
        <div className="relative" ref={profileMenuRef}>
          <button onClick={() => setIsProfileMenuOpen(p => !p)} aria-label="Profile menu">
              <img src={state.currentUser?.avatarUrl} alt="User Profile" className="size-10 rounded-full" />
          </button>
          {isProfileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-surface-dark-search rounded-lg shadow-lg border border-border-dark z-10 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2">
                      <button onClick={() => { onNavigate('profile'); setIsProfileMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-e4e6eb hover:bg-white/10 rounded-md transition-colors">
                          <span className="material-symbols-outlined text-base">person</span>
                          <span>Profile</span>
                      </button>
                      <div className="my-1 h-px bg-border-dark"></div>
                      <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-e4e6eb hover:bg-white/10 rounded-md transition-colors">
                          <span className="material-symbols-outlined text-base">logout</span>
                          <span>Log Out</span>
                      </button>
                  </div>
              </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default SocialSphereHeader;
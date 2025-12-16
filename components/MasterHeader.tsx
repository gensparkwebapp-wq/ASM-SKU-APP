import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../contexts/DataContext';

type AppName = 'artist-union' | 'social-sphere' | 'wetube';

interface MasterHeaderProps {
  activeApp: AppName;
  onAppChange: (app: AppName) => void;
}

const apps: { id: AppName, name: string }[] = [
    { id: 'artist-union', name: 'Artist Union' },
    { id: 'social-sphere', name: 'SocialSphere' },
    { id: 'wetube', name: 'WeTube' },
];

const MasterHeader: React.FC<MasterHeaderProps> = ({ activeApp, onAppChange }) => {
  const { state, actions } = useData();
  const { currentUser } = state;
  
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

  const handleLoginClick = () => {
    if (activeApp !== 'social-sphere') {
      onAppChange('social-sphere');
    }
    // Use timeout to allow app to switch before hash changes
    setTimeout(() => {
      window.location.hash = '#login';
    }, 0);
  };

  const handleProfileLinkClick = (hash: string) => {
    window.location.hash = hash;
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[60] h-12 w-full bg-[#111] backdrop-blur-lg border-b border-white/10 flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between h-full max-w-7xl">
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer">
               <span className="material-symbols-outlined text-red-500 text-2xl">hub</span>
               <span className="text-white font-bold text-lg hidden sm:block">AppSuite</span>
            </div>
            <div className="h-6 w-px bg-white/20 hidden md:block"></div>
            <nav className="hidden md:flex items-center gap-2">
                {apps.map(app => (
                    <button 
                        key={app.id} 
                        onClick={() => onAppChange(app.id)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            activeApp === app.id 
                            ? 'text-white bg-red-600/80 shadow-inner shadow-black/30' 
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        {app.name}
                    </button>
                ))}
            </nav>
        </div>
        
        <div className="flex items-center gap-4">
            {currentUser ? (
                <div className="relative" ref={profileMenuRef}>
                    <button onClick={() => setIsProfileMenuOpen(p => !p)} className="flex items-center gap-2 group">
                        <img src={currentUser.avatarUrl} alt="User Profile" className="size-8 rounded-full border-2 border-transparent group-hover:border-red-500 transition-colors" />
                        <span className="hidden sm:block text-sm font-medium text-white/80 group-hover:text-white">{currentUser.name}</span>
                    </button>
                    {isProfileMenuOpen && (
                         <div className="absolute top-full right-0 mt-3 w-56 origin-top-right rounded-xl bg-surface-dark border border-white/10 shadow-2xl z-20 animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-2">
                                <div className="px-3 py-2 flex items-center gap-3 border-b border-white/5 mb-1">
                                    <img src={currentUser.avatarUrl} alt="User" loading="lazy" className="size-10 rounded-full object-cover"/>
                                    <div>
                                        <p className="text-sm font-bold text-white">{currentUser.name}</p>
                                        <p className="text-xs text-white/50">@{currentUser.name.replace(/\s+/g, '_').toLowerCase()}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleProfileLinkClick('profile')} className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-md transition-colors">
                                    <span className="material-symbols-outlined text-base">person</span><span>My Profile</span>
                                </button>
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors">
                                    <span className="material-symbols-outlined text-base">logout</span><span>Logout</span>
                                </button>
                            </div>
                         </div>
                    )}
                </div>
            ) : (
                <button onClick={handleLoginClick} className="flex items-center gap-2 group">
                    <div className="size-8 rounded-full border-2 border-transparent group-hover:border-red-500 transition-colors bg-surface-dark flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/50">person</span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-white/80 group-hover:text-white">Log In</span>
                </button>
            )}
        </div>
      </div>
    </header>
  );
};

export default MasterHeader;
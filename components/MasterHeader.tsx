import React from 'react';

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
  const currentUserAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80';

  const handleProfileClick = () => {
    // Navigate to a generic profile page, or app-specific one
    if (activeApp === 'social-sphere') {
        window.location.hash = '#profile';
    } else {
        // For artist union, profile navigation requires artist data, which isn't available here.
        // For now, we can just alert or navigate to a generic placeholder.
        alert("Profile page is context-specific for this app.");
    }
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
            <button onClick={handleProfileClick} className="flex items-center gap-2 group">
                 <img src={currentUserAvatar} alt="User Profile" className="size-8 rounded-full border-2 border-transparent group-hover:border-red-500 transition-colors" />
                 <span className="hidden sm:block text-sm font-medium text-white/80 group-hover:text-white">Arjun Mehta</span>
            </button>
        </div>
      </div>
    </header>
  );
};

export default MasterHeader;

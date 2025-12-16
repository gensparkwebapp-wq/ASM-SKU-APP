import React, { useState, useRef, useEffect } from "react";
import { ViewState } from '../App';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isLoggedIn, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const handleNavClick = (view: ViewState) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogoClick = () => {
    onNavigate('home');
  };

  const NavLinks = () => (
    <>
      <button className="text-sm font-medium text-white/80 hover:text-primary transition-colors" onClick={() => handleNavClick('home')}>Home</button>
      <button className="text-sm font-medium text-white/80 hover:text-primary transition-colors" onClick={() => handleNavClick('directory')}>Artists</button>
      <button className="text-sm font-medium text-white/80 hover:text-primary transition-colors" onClick={() => handleNavClick('wetube-mobile')}>Wetube</button>
      <button className="text-sm font-medium text-white/80 hover:text-primary transition-colors" onClick={() => handleNavClick('social')}>Social</button>
      <button className="text-sm font-medium text-white/80 hover:text-primary transition-colors" onClick={() => handleNavClick('my-studios')}>Studios</button>
      <button className="text-sm font-medium text-white/80 hover:text-primary transition-colors" onClick={() => handleNavClick('about')}>About</button>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-20 glass">
        <div className="relative flex h-full items-center justify-between px-4 md:px-8 max-w-[1400px] mx-auto">
          {/* Left Side: Branding */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={handleLogoClick}>
            <div className="size-10 text-primary flex items-center justify-center bg-white/5 rounded-full">
              <span className="material-symbols-outlined text-[24px] filled">graphic_eq</span>
            </div>
            <h1 className="text-white text-lg font-bold tracking-wide">Sangeet Kalakar Union</h1>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <NavLinks />
          </nav>

          {/* Right Side: Profile & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Profile Button with Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button 
                onClick={() => setIsProfileMenuOpen(prev => !prev)}
                className="size-10 rounded-full border-2 border-white/10 hover:border-primary transition-colors"
                aria-label="View Profile Menu"
              >
                <img 
                  src={isLoggedIn ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80" : "https://images.unsplash.com/photo-1549078642-b2c4b3212cde?w=100&h=100&fit=crop&q=80"} 
                  alt="User Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute top-full right-0 mt-3 w-56 origin-top-right rounded-xl bg-surface-dark border border-white/10 shadow-2xl z-20 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-2">
                    {isLoggedIn ? (
                      <>
                        <div className="px-3 py-2 flex items-center gap-3 border-b border-white/5 mb-1">
                          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80" alt="User" loading="lazy" className="size-10 rounded-full object-cover"/>
                          <div>
                            <p className="text-sm font-bold text-white">Arjun Mehta</p>
                            <p className="text-xs text-white/50">@arjun_music</p>
                          </div>
                        </div>
                        <button onClick={() => handleNavClick('profile')} className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-md transition-colors">
                          <span className="material-symbols-outlined text-base">person</span><span>My Profile</span>
                        </button>
                        <button onClick={() => handleNavClick('yt-studio')} className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-md transition-colors">
                          <span className="material-symbols-outlined text-base">space_dashboard</span><span>Creator Studio</span>
                        </button>
                        <button onClick={() => handleNavClick('categories')} className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-md transition-colors">
                          <span className="material-symbols-outlined text-base">category</span><span>Manage Categories</span>
                        </button>
                        <button onClick={() => { /* Placeholder */ setIsProfileMenuOpen(false); }} className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-md transition-colors">
                          <span className="material-symbols-outlined text-base">settings</span><span>Settings</span>
                        </button>
                        <button onClick={onLogout} className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors">
                          <span className="material-symbols-outlined text-base">logout</span><span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleNavClick('social')} className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-md transition-colors">
                          <span className="material-symbols-outlined text-base">login</span><span>Sign In</span>
                        </button>
                        <button onClick={() => handleNavClick('social')} className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-md transition-colors">
                          <span className="material-symbols-outlined text-base">person_add</span><span>Sign Up</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden size-10 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 h-full w-full max-w-[280px] bg-surface-dark border-l border-white/10 p-6 flex flex-col animate-in slide-in-from-right-full duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-white">Navigation</h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="size-10 rounded-full flex items-center justify-center text-white/80 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-2 text-lg [&>button]:text-left [&>button]:p-3 [&>button]:rounded-lg [&>button]:hover:bg-white/5">
              <NavLinks />
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

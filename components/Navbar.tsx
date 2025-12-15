import React, { useState, useRef, useEffect } from "react";

interface NavbarProps {
  onNavigate: (view: 'home' | 'about' | 'my-studios' | 'profile') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b-0">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-[1280px] mx-auto">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="size-8 text-primary flex items-center justify-center bg-white/5 rounded-full group-hover:bg-primary group-hover:text-background-dark transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              graphic_eq
            </span>
          </div>
          <h2 className="text-white text-lg font-bold tracking-wide">
            Sangeet Kalakar
          </h2>
        </div>
        
        {/* Navigation & Search */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <button
            className="text-sm font-medium text-white hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          
          <div className="relative group">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-3 py-1.5 focus-within:bg-black/40 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(43,238,121,0.15)] transition-all w-[260px]">
               <span className="material-symbols-outlined text-white/40 text-[18px] group-focus-within:text-primary transition-colors">search</span>
               <input 
                 type="text" 
                 placeholder="Search studios or artists..." 
                 className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-white/30 w-full ml-2 h-auto py-0 leading-normal"
               />
            </div>
          </div>

          <button
            className="text-sm font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 hover:bg-primary/20 transition-all shadow-[0_0_10px_rgba(43,238,121,0.1)] cursor-pointer"
            onClick={() => onNavigate('my-studios')}
          >
            My Studios
          </button>

          <button
            className="text-sm font-medium text-white/70 hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            Events
          </button>

          <button
            className="text-sm font-medium text-white/70 hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            onClick={() => onNavigate('about')}
          >
            About
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {/* User Profile Avatar with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 rounded-full border p-1 pr-3 transition-all group bg-black/20 backdrop-blur-sm ${isDropdownOpen ? 'border-primary/50 bg-white/5' : 'border-white/10 hover:bg-white/5'}`}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
            >
                <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[1px]">
                     <img 
                       src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80" 
                       alt="User" 
                       className="w-full h-full rounded-full object-cover"
                     />
                </div>
                <span className="text-sm font-bold text-white hidden sm:block">Arjun</span>
                <span className={`material-symbols-outlined text-white/50 text-[18px] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-primary' : ''}`}>expand_more</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 rounded-xl bg-[#121418] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[60] ring-1 ring-white/5">
                    <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                        <p className="text-sm font-bold text-white">Arjun Mehta</p>
                        <p className="text-xs text-white/40 truncate mt-0.5">arjun.mehta@example.com</p>
                        <div className="mt-3 flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/20">PRO MEMBER</span>
                        </div>
                    </div>
                    <div className="p-1.5">
                        <button 
                            onClick={() => {
                                onNavigate('profile');
                                setIsDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors group"
                        >
                            <span className="material-symbols-outlined text-[20px] text-white/40 group-hover:text-primary transition-colors">person</span>
                            My Profile
                        </button>
                        <button className="w-full text-left px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors group">
                            <span className="material-symbols-outlined text-[20px] text-white/40 group-hover:text-primary transition-colors">settings</span>
                            Settings
                        </button>
                        <button className="w-full text-left px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors group">
                            <span className="material-symbols-outlined text-[20px] text-white/40 group-hover:text-primary transition-colors">notifications</span>
                            Notifications
                            <span className="ml-auto size-2 rounded-full bg-red-500"></span>
                        </button>
                    </div>
                    <div className="p-1.5 border-t border-white/5">
                        <button className="w-full text-left px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-3 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                            Logout
                        </button>
                    </div>
                </div>
            )}
          </div>
          
          <button className="md:hidden text-white ml-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
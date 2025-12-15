import React, { useState, useRef, useEffect } from "react";

interface NavbarProps {
  onNavigate: (view: 'home' | 'about') => void;
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
                className="flex items-center gap-2 rounded-full border border-white/10 p-1 pr-3 hover:bg-white/5 transition-colors group bg-black/20 backdrop-blur-sm"
            >
                <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[1px]">
                     <img 
                       src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Y5JfKRXBOeZjY--cYTp30tSf5OUWOHWUy5Od0E1jnn65Y7XNlZne080-NmjZkCGRFSaNeAJMruju49u5MYyLFG9RDsiCF8OAQ1QdbOErvDKF14fNQpXtPzennUI85pgepruSTg1suZlk0-4uCZxN0jrwSs_T6GoGrnBvp8Zlspv5HdSnvY5IqukDMTDwVEhb6w-ftRcsK0lJCbFDEQfuC4GFvS3lusZpq-DftBN-ftD2qoVbyjI_FvFQCF3EBaHoDzyAlBcp-cs" 
                       alt="User" 
                       className="w-full h-full rounded-full object-cover"
                     />
                </div>
                <span className="text-sm font-bold text-white hidden sm:block">Arjun</span>
                <span className={`material-symbols-outlined text-white/50 text-[18px] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#121418] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[60]">
                    <div className="p-3 border-b border-white/5 bg-white/[0.02]">
                        <p className="text-sm font-bold text-white">Arjun Mehta</p>
                        <p className="text-xs text-white/40 truncate">arjun.mehta@example.com</p>
                    </div>
                    <div className="p-1.5">
                        <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg flex items-center gap-3 transition-colors group">
                            <span className="material-symbols-outlined text-[20px] text-white/50 group-hover:text-primary transition-colors">person</span>
                            My Profile
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg flex items-center gap-3 transition-colors group">
                            <span className="material-symbols-outlined text-[20px] text-white/50 group-hover:text-primary transition-colors">settings</span>
                            Settings
                        </button>
                    </div>
                    <div className="p-1.5 border-t border-white/5">
                        <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-3 transition-colors">
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
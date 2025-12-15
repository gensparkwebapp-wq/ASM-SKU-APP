import React from "react";

interface NavbarProps {
  onNavigate: (view: 'home' | 'about') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
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
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <button
            className="text-sm font-medium text-white hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className="text-sm font-medium text-white/70 hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            Search
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
          <button className="hidden md:flex bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors items-center gap-2">
            <span>Sign In</span>
          </button>
          <button className="bg-primary hover:bg-primary/90 text-background-dark rounded-full px-4 py-1.5 text-sm font-bold transition-colors shadow-[0_0_15px_rgba(43,238,121,0.3)]">
            Sign Up
          </button>
          <button className="md:hidden text-white ml-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
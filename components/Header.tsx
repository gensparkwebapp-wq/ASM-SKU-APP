import React from "react";
import Navbar from "./Navbar";

interface HeaderProps {
  onNavigate: (view: 'home' | 'about' | 'my-studios' | 'profile' | 'directory' | 'categories') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {

  const handleLogoClick = () => {
    onNavigate('home');
  };

  return (
    <header className="sticky top-0 z-50 w-full h-20 glass">
      <div className="relative flex h-full items-center justify-between px-4 md:px-8 max-w-[1400px] mx-auto">
        {/* Left Side: Branding */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={handleLogoClick}>
          <div className="size-10 text-primary flex items-center justify-center bg-white/5 rounded-full">
            <span className="material-symbols-outlined text-[24px] filled">graphic_eq</span>
          </div>
          <h1 className="text-white text-lg font-bold tracking-wide">Sangeet Kalakar Union</h1>
        </div>
        
        <Navbar onNavigate={onNavigate} />
        
      </div>
    </header>
  );
};

export default Header;
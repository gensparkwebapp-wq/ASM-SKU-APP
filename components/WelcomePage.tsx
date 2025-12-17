
import React from 'react';
import { ViewState } from '../App';

interface WelcomePageProps {
  onNavigate: (view: ViewState) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden transition-colors duration-200 font-display">
      {/* Top Status Bar Area (Safe Area Simulation) */}
      <div className="w-full h-12 shrink-0"></div>

      {/* Main Content Container */}
      <div className="flex flex-1 flex-col items-center justify-between px-4 pb-8 max-w-md mx-auto w-full">
        
        {/* Hero Visual / Logo Section */}
        <div className="flex flex-1 w-full flex-col items-center justify-center py-6 animate-in fade-in zoom-in duration-700">
          <div className="relative flex items-center justify-center w-40 h-40 rounded-full bg-background-dark dark:bg-[#1A2633] border-4 border-white/5 dark:border-white/5 shadow-2xl overflow-hidden mb-8">
            {/* Abstract Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-0"></div>
            
            {/* Logo Icon */}
            <div className="z-10 bg-gradient-to-br from-primary-blue to-blue-400 bg-clip-text text-transparent">
              <span 
                className="material-symbols-outlined text-[80px]" 
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 48" }}
              >
                globe_asia
              </span>
            </div>
            
            {/* Decorative shapes */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-blue/20 blur-2xl rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/20 blur-2xl rounded-full"></div>
          </div>

          {/* Hero Image (Subtle Background for Depth) */}
          <div className="absolute inset-0 z-[-1] opacity-30 dark:opacity-20 pointer-events-none overflow-hidden">
            <div 
              className="w-full h-full bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center blur-3xl"
            ></div>
          </div>
        </div>

        {/* Content & Actions Section */}
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* HeadlineText */}
          <h1 className="text-gray-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-3">
            Connect instantly.
          </h1>
          
          {/* BodyText */}
          <p className="text-gray-600 dark:text-[#92adc9] text-base font-normal leading-relaxed text-center px-4 pb-10">
            Join the community where millions of people share their daily lives, ideas, and passions.
          </p>

          {/* SingleButton (Primary Action) */}
          <div className="w-full px-2 pb-4">
            <button 
              onClick={() => onNavigate('tour')}
              className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 bg-primary-blue text-white text-[17px] font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary-blue/20 hover:bg-blue-600 active:scale-[0.98] transition-all duration-200"
            >
              <span className="truncate relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* MetaText (Secondary Action) */}
          <div className="pb-2">
            <button 
              onClick={() => onNavigate('login')}
              className="text-gray-500 dark:text-[#92adc9] text-[15px] font-normal leading-normal py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              Already have an account? <span className="font-semibold text-primary-blue">Log In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Safe Area Spacer */}
      <div className="h-6 bg-transparent w-full shrink-0"></div>
    </div>
  );
};

export default WelcomePage;

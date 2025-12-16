import React from "react";
// FIX: Corrected import type name from ViewState to the now unified ViewState. This file had an error because ViewState was not exported from App.tsx.
import { ViewState } from '../App';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-background-dark">
      {/* The correct background image with spotlights and smoke */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1629424119837-d95f365d96a7?q=80&w=2070&auto=format&fit=crop")',
        }}
      ></div>
      {/* The gradient overlay for text readability and mood */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark/10 via-background-dark/60 to-background-dark"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 mb-2">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="text-xs font-medium tracking-wide uppercase text-white/80">
            Official Union Portal
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-tight tracking-tighter text-white drop-shadow-lg">
          Unite Your <br />
          <span className="text-primary drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">
            Rhythm
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed">
          Join the official union for musical artists. Connect, collaborate, and
          grow your career on the Midnight Stage.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button className="flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-primary text-background-dark text-base font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            <span>Join the Union</span>
            <span className="material-symbols-outlined text-[20px]">
              arrow_forward
            </span>
          </button>
          <button 
            onClick={() => onNavigate('directory')}
            className="flex items-center justify-center h-12 px-8 rounded-full bg-white/5 border border-white/10 text-white text-base font-bold backdrop-blur-md hover:bg-white/10 transition-all">
            <span>Artists Directory</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

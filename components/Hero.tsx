import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnavj-pz28wdg5tVrtjt-dIcW6L1F7uKHBgW-_PI32MA9G65-JKfaXTMOn_4TrMc_ItV3Afw4IQ0I4SStlWqV3lJy04oiTafWKiYcm7Qls17SZhg5PKTyLbTXCEP7d-eqakI_yAk8JjogW7Wz-X89RPcB6-8orVZJ6WmSyrnRMAgHZG8tJBUaz9-NHd-zJ6QeXiY-_KlXF5iBCUex11PGGBlutXfxTo71-7umIX6dYqN2N9DP8QMhdkYBwL1bu0eIaH0nR8qwaepk")',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 via-background-dark/60 to-background-dark"></div>
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs font-medium tracking-wide uppercase text-primary">
            Official Union Portal
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-lg">
          Unite Your <br />
          <span className="text-primary drop-shadow-[0_0_20px_rgba(43,238,121,0.5)]">
            Rhythm
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
          Join the official union for musical artists. Connect, collaborate, and
          grow your career on the Midnight Stage.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button className="flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-primary text-background-dark text-base font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(43,238,121,0.4)]">
            <span>Join the Union</span>
            <span className="material-symbols-outlined text-[20px]">
              arrow_forward
            </span>
          </button>
          <button className="flex items-center justify-center h-12 px-8 rounded-full bg-white/5 border border-white/10 text-white text-base font-bold backdrop-blur-md hover:bg-white/10 transition-all">
            <span>Explore Events</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
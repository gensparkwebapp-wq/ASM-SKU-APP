import React from "react";

const ExploreGrid: React.FC = () => {
  return (
    <section className="container mx-auto px-4 max-w-[1280px]">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        <h2 className="text-2xl font-bold tracking-tight">Explore the Union</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
        {/* Large Tile: Venue Finder */}
        <div className="lg:col-span-2 lg:row-span-2 glass-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer">
          <div className="size-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px]">
              stadium
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Venue Finder</h3>
            <p className="text-white/60 mb-4">
              Discover over 500+ verified venues looking for live performers
              tonight.
            </p>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-2/3"></div>
          </div>
        </div>

        {/* Small Tile: Legal Aid */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:bg-white/5 cursor-pointer">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-3xl text-blue-400">
              gavel
            </span>
            <span className="material-symbols-outlined text-white/20">
              arrow_forward
            </span>
          </div>
          <div>
            <h4 className="font-bold text-lg">Legal Aid</h4>
            <p className="text-xs text-white/50">Contract review & disputes</p>
          </div>
        </div>

        {/* Small Tile: Insurance */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:bg-white/5 cursor-pointer">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-3xl text-purple-400">
              health_and_safety
            </span>
            <span className="material-symbols-outlined text-white/20">
              arrow_forward
            </span>
          </div>
          <div>
            <h4 className="font-bold text-lg">Insurance</h4>
            <p className="text-xs text-white/50">Gear & health coverage</p>
          </div>
        </div>

        {/* Wide Tile: Community Forum */}
        <div className="md:col-span-2 glass-card rounded-2xl p-6 flex items-center justify-between group hover:bg-white/5 cursor-pointer relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="font-bold text-xl mb-1">Community Forum</h4>
            <p className="text-sm text-white/60">
              Join the discussion with 10k+ artists
            </p>
          </div>
          <div className="size-12 rounded-full bg-white/10 flex items-center justify-center relative z-10 group-hover:bg-primary group-hover:text-background-dark transition-colors">
            <span className="material-symbols-outlined">forum</span>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] text-white/5 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">
              group
            </span>
          </div>
        </div>

        {/* Tall Tile: Workshops */}
        <div className="lg:row-span-2 glass-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQ0-e2zQrz4FW8NRf2odfC4lDUSmnE4XV5J1NOYx8sopbM8aV8D56Qdsf0ASyQNgFjeKNa1oO8VZBLdD_n9nNbztxM_4bgQFeNxg0hw8a_FAHISpKEQhdro1YqSvMPd-rD9130zojUoa6AkzG04G1CnOzA4Piw9SYPYhcfcYdpJDOcFZoSq_40q_9_66rPd3wcbAL7QA-7lLIWogUxAhPnKgQA20o0n3tKp8ADEvIrJDzvhRtCRMEWkDs39xmkwRh2xbqMS1s_Qk8")',
            }}
          >
            <div className="absolute inset-0 bg-black/60 hover:bg-black/40 transition-colors"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end">
            <h4 className="font-bold text-xl mb-1">Workshops</h4>
            <p className="text-sm text-white/80">
              Master your craft with pros.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreGrid;
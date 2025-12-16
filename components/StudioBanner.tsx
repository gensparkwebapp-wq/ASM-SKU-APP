import React from "react";

const StudioBanner: React.FC = () => {
  return (
    <section className="container mx-auto px-4 max-w-[1400px]">
      <div className="bg-surface-dark rounded-xl overflow-hidden border border-primary/20">
        <div className="grid md:grid-cols-2 items-center">
          <div className="relative h-[300px] md:h-full overflow-hidden order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop&q=80"
              alt="Recording Studio"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface-dark via-surface-dark/50 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="size-16 rounded-full bg-primary/80 backdrop-blur-sm text-background-dark flex items-center justify-center shadow-lg hover:bg-primary hover:scale-105 transition-transform">
                <span className="material-symbols-outlined filled text-4xl ml-1">play_arrow</span>
              </button>
            </div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center gap-6 order-1 md:order-2">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Elevate Your Sound
              </h3>
              <p className="text-white/60 leading-relaxed">
                Book top-rated studios instantly through the union app. Members get
                exclusive 20% discounts on all night sessions.
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/80">
                <span className="material-symbols-outlined text-primary filled">
                  check_circle
                </span>
                Premium Equipment Access
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <span className="material-symbols-outlined text-primary filled">
                  check_circle
                </span>
                Sound Engineer Included
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <span className="material-symbols-outlined text-primary filled">
                  check_circle
                </span>
                24/7 Availability
              </li>
            </ul>
            <button className="w-fit mt-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm transition-colors flex items-center gap-2">
              Book a Studio
              <span className="material-symbols-outlined text-[18px]">
                arrow_outward
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioBanner;
import React from "react";

const StudioBanner: React.FC = () => {
  return (
    <section className="container mx-auto px-4 max-w-[1280px]">
      <div className="glass-card rounded-2xl overflow-hidden p-1">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-black h-[300px] md:h-auto overflow-hidden rounded-xl md:rounded-r-none">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCoMbv8LaODM65jb82pRyGYmPFaniqRq50NXvRQPu6lK_oFxtxGNc6eeLpF3jz3EH8eMLar-bhYuEVvKUahru8f8lLgrt0CVV5fpDH4iseAQNLXYRIZ3un8wYPgBSi8Fm7yUljjhTCUkLgAMzGaL8Qt8eM1qSJ0d8sfv6tZ_ErLyPsEJ49AYtJmSlXem8MLh14MxQDHoKK_OoN-oDsz6t4lyphlNruu1jRPJ_q03xqT3Sy1gFNnhyrZGoOxmGCx5_V25BKyAQ7qcI8")',
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-16 rounded-full bg-primary/90 flex items-center justify-center text-background-dark shadow-[0_0_30px_rgba(43,238,121,0.5)] cursor-pointer hover:scale-110 transition-transform">
                <span className="material-symbols-outlined filled text-[32px]">
                  play_arrow
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded text-xs font-bold text-white tracking-widest uppercase">
              Sponsored
            </div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center gap-6 bg-gradient-to-br from-[#152a20] to-[#0f1115]">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Elevate Your Sound
              </h3>
              <p className="text-white/60 leading-relaxed">
                Book top-rated studios instantly through the union app. Members
                get exclusive 20% discounts on all night sessions.
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/80">
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
                Premium Equipment Access
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
                Sound Engineer Included
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <span className="material-symbols-outlined text-primary">
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
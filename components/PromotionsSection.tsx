import React, { useState, useEffect } from "react";

interface Ad {
  id: number;
  title: string;
  brand: string;
  image: string;
}

const ads: Ad[] = [
  {
    id: 1,
    title: "New Album Launch",
    brand: "Sony Music",
    image:
      "https://images.unsplash.com/photo-1593697821252-0c917daf3453?w=600&h=600&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Best Microphones",
    brand: "AudioTechnica",
    image:
      "https://images.unsplash.com/photo-1590602334926-2d1a37c8a32a?w=600&h=600&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Learn Guitar Fast",
    brand: "Udemy Music",
    image:
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&h=600&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Talent Hunt 2025",
    brand: "Star Plus",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=600&fit=crop&q=80",
  },
];

const PromotionsSection: React.FC = () => {
  const [activeAdId] = useState<number>(1);

  return (
    <section className="container mx-auto px-4 max-w-[1400px]">
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4B400] text-black tracking-wider uppercase">
            Sponsored
          </span>
          <h2 className="text-2xl font-bold tracking-tight">Artist Promotions</h2>
        </div>
        <p className="text-white/50 text-sm">
          Featured content from our partners
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ads.map((ad) => {
          const isActive = activeAdId === ad.id;

          return (
            <div
              key={ad.id}
              className={`bg-surface-dark rounded-lg overflow-hidden cursor-pointer group flex flex-col transition-all duration-300 ${
                isActive ? "ad-active-border" : "border-2 border-transparent hover:border-primary/30"
              }`}
            >
              <div className="relative"> {/* Wrapper to fix aspect-ratio in flexbox */}
                <div
                  className="aspect-square w-full bg-cover bg-center relative bg-gray-900 overflow-hidden"
                >
                  <img src={ad.image} alt={ad.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {isActive && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                      <span className="text-xs font-bold tracking-widest text-white/80 uppercase">
                        Auto-playing Ad
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold text-white/70">
                    Ad
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-1 leading-tight text-white group-hover:text-primary transition-colors truncate">
                  {ad.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{ad.brand}</p>
                
                <button
                  className={`mt-auto w-full py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                    isActive
                      ? "bg-primary text-background-dark font-bold hover:brightness-110"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  {isActive ? "Watch Now" : "View Ad"}
                  <span className="material-symbols-outlined text-sm">
                    open_in_new
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PromotionsSection;
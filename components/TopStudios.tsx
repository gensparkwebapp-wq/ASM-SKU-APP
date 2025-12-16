import React, { useState, useEffect } from "react";

export interface Studio {
  id: number;
  name: string;
  location: string;
  pricePerHour: string;
  rating: number;
  image: string;
}

const topStudios: Studio[] = [
  {
    id: 1,
    name: "Sonic Realm Studios",
    location: "Andheri West, Mumbai",
    pricePerHour: "₹1,200/hr",
    rating: 4.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoMbv8LaODM65jb82pRyGYmPFaniqRq50NXvRQPu6lK_oFxtxGNc6eeLpF3jz3EH8eMLar-bhYuEVvKUahru8f8lLgrt0CVV5fpDH4iseAQNLXYRIZ3un8wYPgBSi8Fm7yUljjhTCUkLgAMzGaL8Qt8eM1qSJ0d8sfv6tZ_ErLyPsEJ49AYtJmSlXem8MLh14MxQDHoKK_OoN-oDsz6t4lyphlNruu1jRPJ_q03xqT3Sy1gFNnhyrZGoOxmGCx5_V25BKyAQ7qcI8",
  },
  {
    id: 2,
    name: "The Rhythm Box",
    location: "Bandra, Mumbai",
    pricePerHour: "₹1,500/hr",
    rating: 4.8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnavj-pz28wdg5tVrtjt-dIcW6L1F7uKHBgW-_PI32MA9G65-JKfaXTMOn_4TrMc_ItV3Afw4IQ0I4SStlWqV3lJy04oiTafWKiYcm7Qls17SZhg5PKTyLbTXCEP7d-eqakI_yAk8JjogW7Wz-X89RPcB6-8orVZJ6WmSyrnRMAgHZG8tJBUaz9-NHd-zJ6QeXiY-_KlXF5iBCUex11PGGBlutXfxTo71-7umIX6dYqN2N9DP8QMhdkYBwL1bu0eIaH0nR8qwaepk",
  },
  {
    id: 3,
    name: "Echo Chamber",
    location: "Koramangala, Bangalore",
    pricePerHour: "₹900/hr",
    rating: 4.7,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASjfGuSONgzGLWuTBL_Bp0Zny0DFqWdOQnCJISopOWRuts6CsQbnnZi-zSEEWGPThtJmE0aa2atkGe9ivDjohayFgvTcuDF5EpF8uf4ZT3WLxoRsWxAFRj84U5fuNZbINV0kGqyKB9-G4lLffAe0ie2uw8lvUfPVY2rWxOlz9pyOfcoEPhuS3Q0loehEHzJ_nmOj6R6Y5dN09IEzcwC-PtfR-Zq5xN_TOU_dud8GUrOZ1q57rf1DmRhW5akFg-3KC6HUmsvbY0iJc",
  },
  {
    id: 4,
    name: "Bassment Tapes",
    location: "Hauz Khas, Delhi",
    pricePerHour: "₹1,100/hr",
    rating: 4.6,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvCM5q41NbkWEz3XQOrGeE10kjvwok_HjjjTJWHbfEDFx4Ml-KRuFyTCbLTYQhlxuniJYSSJhzT2QC6nq3JxQxlrhnVZ6HdcyLYMOuBbAszpTfcPse75bpmLMdMDz2LMv_lAQAnHiqc_iES6lyYFETOTZkAdD9M-ftgEN17El3TDSkGWwoYbesXC9xNnjxYDzTUpXj2s8Oqb1QX2MFzEpGp8gqjQNXFq3fsTFcIfCEcmlFnOKyy46pzmtU40uwnQr7IVr5UYpbIDU",
  },
  {
    id: 5,
    name: "High Note Haven",
    location: "Pune, Maharashtra",
    pricePerHour: "₹800/hr",
    rating: 4.5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ0-e2zQrz4FW8NRf2odfC4lDUSmnE4XV5J1NOYx8sopbM8aV8D56Qdsf0ASyQNgFjeKNa1oO8VZBLdD_n9nNbztxM_4bgQFeNxg0hw8a_FAHISpKEQhdro1YqSvMPd-rD9130zojUoa6AkzG04G1CnOzA4Piw9SYPYhcfcYdpJDOcFZoSq_40q_9_66rPd3wcbAL7QA-7lLIWogUxAhPnKgQA20o0n3tKp8ADEvIrJDzvhRtCRMEWkDs39xmkwRh2xbqMS1s_Qk8",
  },
];

interface TopStudiosProps {
  onViewDetails?: (studio: Studio) => void;
}

const TopStudios: React.FC<TopStudiosProps> = ({ onViewDetails }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loadingStudioId, setLoadingStudioId] = useState<number | null>(null);

  useEffect(() => {
    // Load favorites from local storage on mount
    const savedFavorites = localStorage.getItem("studioFavorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites", error);
      }
    }
  }, []);

  const toggleFavorite = (id: number) => {
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId) => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);
    localStorage.setItem("studioFavorites", JSON.stringify(newFavorites));
  };

  const handleBookStudio = (studio: Studio) => {
    setLoadingStudioId(studio.id);
    // Simulate loading delay for better UX
    setTimeout(() => {
      onViewDetails?.(studio);
      setLoadingStudioId(null);
    }, 800);
  };

  return (
    <section className="container mx-auto px-4 max-w-[1280px]">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h2 className="text-2xl font-bold tracking-tight">Top Studios</h2>
        </div>
        <div className="hidden md:flex gap-2">
          <button className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 snap-x snap-mandatory">
        {topStudios.map((studio) => {
          const isFavorite = favorites.includes(studio.id);
          const isLoading = loadingStudioId === studio.id;

          return (
            <div
              key={studio.id}
              className="min-w-[280px] md:min-w-[320px] snap-center"
            >
              <div className="glass-card rounded-xl overflow-hidden group h-full flex flex-col hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(43,238,121,0.2)] transition-all duration-300">
                {/* Image Section */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={studio.image}
                    alt={studio.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(studio.id)}
                    className="absolute top-3 left-3 size-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/70 transition-colors z-10 group/fav"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] transition-all duration-300 ${
                        isFavorite
                          ? "text-red-500 filled scale-110"
                          : "text-white group-hover/fav:scale-110"
                      }`}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
                    <span className="material-symbols-outlined text-[14px] text-yellow-400 filled">
                      star
                    </span>
                    <span className="text-xs font-bold">{studio.rating}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white mb-1 truncate">
                    {studio.name}
                  </h3>

                  <div className="flex items-center gap-1 text-white/50 text-xs mb-4">
                    <span className="material-symbols-outlined text-[14px]">
                      location_on
                    </span>
                    <span className="truncate">{studio.location}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium">
                        Starting at
                      </span>
                      <span className="text-primary font-bold">
                        {studio.pricePerHour}
                      </span>
                    </div>

                    <button
                      onClick={() => handleBookStudio(studio)}
                      disabled={isLoading}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-bold transition-all text-white flex items-center gap-1 group-hover:border-primary/50 group-hover:text-primary min-w-[90px] justify-center"
                    >
                      {isLoading ? (
                        <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      ) : (
                        "Book Now"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopStudios;
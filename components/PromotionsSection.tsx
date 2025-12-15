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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrPdErdSK5U2vnFD0wG8cPDOWR-plB3eS2QS_tC870s2JjKVMHZWWGKRjF_PjSu2OkLpqX01x6fApt-Zs4y8S54UTpeAhXSSKeHf6OClynhJquMPSipZhDuGetTtE6tnE_A7DTBptRAe_ZHW6k1SYZZ8vEVa6oEWdQHGlL32FS8v1ILfLvZYhQI9x0NDI8YUc3jtGvjrJXtH4OYreoSzyaSmS0f5fj4FgFrtp8IWB53Qp3Gh4SyxnZ3pLWizFppcQZxN7ObQsf7MQ",
  },
  {
    id: 2,
    title: "Best Microphones",
    brand: "AudioTechnica",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8UkrozxYO53bUMAyV6Izc6SRb7x7IyeEzh4CZI23kKa9gzgMGT64RdID4gGcgIY-jaafc_vHRZr9NERkmwdIOJD-gFFNmQjz95adw_b-XYUM_YkizaATRA9zkjP_bciKrQnF6wokvkAU51lS11S0UEfHsJ4Y121t7_ijLhE03Sh5LiqyH7_MtrjYS8AjrMas9vFgnT-8Ad8g_xiCiG4fJGDfonlU5IKRpQxwn6tZNj9_CLhTmcJuxsB_I13fJgfDvtlK5b413bSs",
  },
  {
    id: 3,
    title: "Learn Guitar Fast",
    brand: "Udemy Music",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIDMvtADemTQ9qpeDEy1riNXjRUUvvD_d3wB4tgyM2-JWqaUji0m_KwFiVGmy1ENEmMrGSZn_tvCU5-Ap0Mu-FZPJtQksHp94596i8uAlOQ2gZbCu0Tt-GZpk9ww54J6FbZGim1je_6uKXDT8dLQ8rWWo4Rtz46cE7kIqe_GR1TP4v25CUwIaKk6fbPemI5DBdDtCvZQmKuHHKL_AlQQhPiVPoDAOBI3_banqsxjj6h6oIJVtPJmF3mAJ9WjInIToeLmM4Qq68DGE",
  },
  {
    id: 4,
    title: "Talent Hunt 2025",
    brand: "Star Plus",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBla_ZGuWiHMOklsvrLLFAupppKg3RsflHWkGnIMs8ItuC756yT8W-RwXOmV_7LGbjeplUbBkxqKwRrR9Yd4aMw99FO-cG_NDJG8DXhTfrDVPpma6C0CkdpjlXKI9sGMXtrbOEeTWMRsWXOlHFFTgeTv5DUKOHn8_0g_6V5FzvKrL-cv27RiCk5ZUT4NLPUV8LSKq0iqec_dp-KUtPvA64reIzK6zTtlfsSFxVN6NyJar0TczHl1PZZ4YhD7nponQ9ErUOSHQiKlRc",
  },
];

const PromotionsSection: React.FC = () => {
  const [activeAdId, setActiveAdId] = useState<number>(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset progress when active ad changes
    setProgress(0);
    const timer = setTimeout(() => {
      setProgress(100);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeAdId]);

  return (
    <section className="container mx-auto px-4 max-w-[1280px]">
      <div className="flex flex-col mb-8 px-2">
        <div className="flex items-center gap-3 mb-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4B400] text-black tracking-wider uppercase">
            Sponsored
          </span>
          <h2 className="text-3xl font-bold tracking-tight">Artist Promotions</h2>
        </div>
        <p className="text-white/50 text-sm ml-1">
          Featured content from our partners
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ads.map((ad) => {
          const isActive = activeAdId === ad.id;

          return (
            <div
              key={ad.id}
              onClick={() => setActiveAdId(ad.id)}
              className={`glass-card rounded-xl overflow-hidden cursor-pointer relative group transition-all duration-300 h-full flex flex-col ${
                isActive ? "ad-active-border" : "border-transparent hover:border-white/10"
              }`}
            >
              <div
                className="aspect-[4/3] w-full bg-cover bg-center relative bg-gray-900 overflow-hidden"
                style={{ backgroundImage: `url("${ad.image}")` }}
              >
                {isActive ? (
                  <>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center">
                      <div className="ad-loader mb-3"></div>
                      <span className="text-xs font-bold tracking-widest text-primary uppercase animate-pulse">
                        Auto-playing Ad
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${progress}%`,
                          transition: "width 10s linear",
                        }}
                      ></div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <div className="size-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-80 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined filled">
                        play_arrow
                      </span>
                    </div>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold text-white/70">
                  Ad
                </div>
              </div>

              <div
                className={`p-5 flex flex-col flex-1 ${
                  isActive
                    ? "bg-gradient-to-t from-black/80 to-transparent relative"
                    : "bg-[#121418]"
                }`}
              >
                <h3
                  className={`text-lg font-bold mb-1 leading-tight transition-colors ${
                    isActive ? "text-primary" : "text-white group-hover:text-primary"
                  }`}
                >
                  {ad.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{ad.brand}</p>
                
                <button
                  className={`mt-auto w-full py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                    isActive
                      ? "bg-primary text-background-dark font-bold hover:bg-white hover:text-black"
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
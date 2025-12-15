import React, { useState } from "react";

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  width: string;
  duration?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: 'image',
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIDMvtADemTQ9qpeDEy1riNXjRUUvvD_d3wB4tgyM2-JWqaUji0m_KwFiVGmy1ENEmMrGSZn_tvCU5-Ap0Mu-FZPJtQksHp94596i8uAlOQ2gZbCu0Tt-GZpk9ww54J6FbZGim1je_6uKXDT8dLQ8rWWo4Rtz46cE7kIqe_GR1TP4v25CUwIaKk6fbPemI5DBdDtCvZQmKuHHKL_AlQQhPiVPoDAOBI3_banqsxjj6h6oIJVtPJmF3mAJ9WjInIToeLmM4Qq68DGE",
    width: "w-[200px]",
  },
  {
    id: 2,
    type: 'video',
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBla_ZGuWiHMOklsvrLLFAupppKg3RsflHWkGnIMs8ItuC756yT8W-RwXOmV_7LGbjeplUbBkxqKwRrR9Yd4aMw99FO-cG_NDJG8DXhTfrDVPpma6C0CkdpjlXKI9sGMXtrbOEeTWMRsWXOlHFFTgeTv5DUKOHn8_0g_6V5FzvKrL-cv27RiCk5ZUT4NLPUV8LSKq0iqec_dp-KUtPvA64reIzK6zTtlfsSFxVN6NyJar0TczHl1PZZ4YhD7nponQ9ErUOSHQiKlRc",
    width: "w-[350px]",
    duration: "04:20"
  },
  {
    id: 3,
    type: 'image',
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgRM8sFbogcwvsAXPSRuGKvrzTK-GGBAwhgwHEa6IOiqjT8BeThZtGRy-F2Y_ALRRqjA6DtctSI9gJhZTpkV-S6cf6mIBNhhCSQpZYBUqB6exJp6PYDYsii2fLJqdUmXUQrt33mIsQIQu6Sn_2kA6X3Sipx2FOMByHUOX5KAytfyvY3QnhbKIE6atITl0ozoXFFEgrzNsgpu1SS968Ch363rSi2VsAZo2W8Yy4ACmJPm48GKO0TsSqf-jittmj4m04QfXl0p6eYCY",
    width: "w-[200px]"
  },
  {
    id: 4,
    type: 'video',
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8UkrozxYO53bUMAyV6Izc6SRb7x7IyeEzh4CZI23kKa9gzgMGT64RdID4gGcgIY-jaafc_vHRZr9NERkmwdIOJD-gFFNmQjz95adw_b-XYUM_YkizaATRA9zkjP_bciKrQnF6wokvkAU51lS11S0UEfHsJ4Y121t7_ijLhE03Sh5LiqyH7_MtrjYS8AjrMas9vFgnT-8Ad8g_xiCiG4fJGDfonlU5IKRpQxwn6tZNj9_CLhTmcJuxsB_I13fJgfDvtlK5b413bSs",
    width: "w-[250px]",
    duration: "12:05"
  },
  {
    id: 5,
    type: 'image',
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoY6Z5pwynIduIm-MTgcjtmP9z0T1lMVQ_22B3JKFVldfCZgg613TcN8beErx9aKt4gPDeMpfDIGQpEKypCEsfPQBvqDK5njB5x7yRjRbXC_eX8_uxT73N-_mKrRrmuc_m9V-mGUOdmfOEPnqbPfeM7VMwh5SR6RoquSd4tKobzDKSbZ-J-D57NmUivsMo0JyDRnjZRuDLNMDBhi9rxMiJhpBepXR6KX6YjoKaXgN8e7oAieVOjMQJLI6EI6CmUvgzpNs9mCpuYO4",
    width: "w-[200px]"
  },
  {
    id: 6,
    type: 'video',
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuANWTUZ2DA9ekvjQhuXGkoEnbXFNeXUMtXojeKhr1XTB-Dj-Pb1SDoBCYt3WWFec30W91qjqJvze0mvpJhO-okOJKU7c3aGwtKzg6ODqzsw5-KZ7pYnvhTdRTuL7k04KK4TJq_ixwI5MVoFwaw77Yqcz1-zfblWcT73OH7zGLyTaCKndlvxXdshxRNX_AdZ1RY6HdMnwJzqm5nXlynp1xjnM8fvVyr1W4zdTT9nEl9Py2TIZqAnbeYD-qlCZYj4lu1Bdt6bSq2mJWA",
    width: "w-[300px]",
    duration: "08:32"
  },
  {
    id: 7,
    type: 'image',
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1A0oOfHc3nl_4oorpm0fELOQz08dLzHZnkSvp6URyVeueDXqcUC0uhwq74XWyqwrwF7-210DyNm2boVzA9f4_1kh3MVSaGAEm0HZhkOg5kgbjsrgrup7V6J06TpjxG7ijRjOiv1rWmU-IuzrxvXN_lB7RpgsSdecYUoX8VesWNoHv0ZWFk4fkxJsR_Z4brEnhozLfFAXYxbLx6UIzl0cOR9-BfkucBKuWX4ISICa6HDjeapg303Bi8pkbyuMr8bppTR6wL5n2Oc8",
    width: "w-[200px]"
  },
];

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  const filteredItems = galleryItems.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  return (
    <section className="w-full border-y border-white/5 bg-white/[0.02] py-8 relative">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">
              photo_camera
            </span>
            <h3 className="text-lg font-bold">Community Gallery</h3>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 self-start sm:self-auto">
            {(['all', 'image', 'video'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold capitalize transition-all duration-300 ${
                  filter === f 
                    ? 'bg-primary text-background-dark shadow-[0_0_15px_rgba(43,238,121,0.3)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {f === 'all' ? 'All' : f + 's'}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-full overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 px-4 w-max min-w-full">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item.src)}
                className={`${item.width} h-[250px] rounded-lg bg-cover bg-center shrink-0 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-xl border border-transparent hover:border-white/10 relative group overflow-hidden animate-in fade-in zoom-in-95 duration-300`}
                style={{ backgroundImage: `url("${item.src}")` }}
              >
                 {/* Video Indicator/Duration */}
                 {item.type === 'video' && item.duration && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 z-10">
                       <span className="material-symbols-outlined text-[14px] text-white filled">play_circle</span>
                       <span className="text-[10px] font-bold text-white font-mono tracking-wide">{item.duration}</span>
                    </div>
                 )}
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center h-[250px] text-white/40 italic">
                No items found for this filter.
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 z-10 size-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center pointer-events-none">
             <img 
               src={selectedImage} 
               alt="Gallery Preview" 
               className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain pointer-events-auto animate-in zoom-in-95 duration-300"
               onClick={(e) => e.stopPropagation()} 
             />
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
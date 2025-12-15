import React, { useState } from "react";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBIDMvtADemTQ9qpeDEy1riNXjRUUvvD_d3wB4tgyM2-JWqaUji0m_KwFiVGmy1ENEmMrGSZn_tvCU5-Ap0Mu-FZPJtQksHp94596i8uAlOQ2gZbCu0Tt-GZpk9ww54J6FbZGim1je_6uKXDT8dLQ8rWWo4Rtz46cE7kIqe_GR1TP4v25CUwIaKk6fbPemI5DBdDtCvZQmKuHHKL_AlQQhPiVPoDAOBI3_banqsxjj6h6oIJVtPJmF3mAJ9WjInIToeLmM4Qq68DGE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBla_ZGuWiHMOklsvrLLFAupppKg3RsflHWkGnIMs8ItuC756yT8W-RwXOmV_7LGbjeplUbBkxqKwRrR9Yd4aMw99FO-cG_NDJG8DXhTfrDVPpma6C0CkdpjlXKI9sGMXtrbOEeTWMRsWXOlHFFTgeTv5DUKOHn8_0g_6V5FzvKrL-cv27RiCk5ZUT4NLPUV8LSKq0iqec_dp-KUtPvA64reIzK6zTtlfsSFxVN6NyJar0TczHl1PZZ4YhD7nponQ9ErUOSHQiKlRc",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDgRM8sFbogcwvsAXPSRuGKvrzTK-GGBAwhgwHEa6IOiqjT8BeThZtGRy-F2Y_ALRRqjA6DtctSI9gJhZTpkV-S6cf6mIBNhhCSQpZYBUqB6exJp6PYDYsii2fLJqdUmXUQrt33mIsQIQu6Sn_2kA6X3Sipx2FOMByHUOX5KAytfyvY3QnhbKIE6atITl0ozoXFFEgrzNsgpu1SS968Ch363rSi2VsAZo2W8Yy4ACmJPm48GKO0TsSqf-jittmj4m04QfXl0p6eYCY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA8UkrozxYO53bUMAyV6Izc6SRb7x7IyeEzh4CZI23kKa9gzgMGT64RdID4gGcgIY-jaafc_vHRZr9NERkmwdIOJD-gFFNmQjz95adw_b-XYUM_YkizaATRA9zkjP_bciKrQnF6wokvkAU51lS11S0UEfHsJ4Y121t7_ijLhE03Sh5LiqyH7_MtrjYS8AjrMas9vFgnT-8Ad8g_xiCiG4fJGDfonlU5IKRpQxwn6tZNj9_CLhTmcJuxsB_I13fJgfDvtlK5b413bSs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCoY6Z5pwynIduIm-MTgcjtmP9z0T1lMVQ_22B3JKFVldfCZgg613TcN8beErx9aKt4gPDeMpfDIGQpEKypCEsfPQBvqDK5njB5x7yRjRbXC_eX8_uxT73N-_mKrRrmuc_m9V-mGUOdmfOEPnqbPfeM7VMwh5SR6RoquSd4tKobzDKSbZ-J-D57NmUivsMo0JyDRnjZRuDLNMDBhi9rxMiJhpBepXR6KX6YjoKaXgN8e7oAieVOjMQJLI6EI6CmUvgzpNs9mCpuYO4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuANWTUZ2DA9ekvjQhuXGkoEnbXFNeXUMtXojeKhr1XTB-Dj-Pb1SDoBCYt3WWFec30W91qjqJvze0mvpJhO-okOJKU7c3aGwtKzg6ODqzsw5-KZ7pYnvhTdRTuL7k04KK4TJq_ixwI5MVoFwaw77Yqcz1-zfblWcT73OH7zGLyTaCKndlvxXdshxRNX_AdZ1RY6HdMnwJzqm5nXlynp1xjnM8fvVyr1W4zdTT9nEl9Py2TIZqAnbeYD-qlCZYj4lu1Bdt6bSq2mJWA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD1A0oOfHc3nl_4oorpm0fELOQz08dLzHZnkSvp6URyVeueDXqcUC0uhwq74XWyqwrwF7-210DyNm2boVzA9f4_1kh3MVSaGAEm0HZhkOg5kgbjsrgrup7V6J06TpjxG7ijRjOiv1rWmU-IuzrxvXN_lB7RpgsSdecYUoX8VesWNoHv0ZWFk4fkxJsR_Z4brEnhozLfFAXYxbLx6UIzl0cOR9-BfkucBKuWX4ISICa6HDjeapg303Bi8pkbyuMr8bppTR6wL5n2Oc8",
];

const widths = [
  "w-[200px]",
  "w-[350px]",
  "w-[200px]",
  "w-[250px]",
  "w-[200px]",
  "w-[300px]",
  "w-[200px]",
];

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="w-full border-y border-white/5 bg-white/[0.02] py-8 relative">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary">
            photo_camera
          </span>
          <h3 className="text-lg font-bold">Community Gallery</h3>
        </div>
      </div>
      <div className="w-full overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 px-4 w-max">
          {images.map((src, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(src)}
              className={`${
                widths[idx] || "w-[200px]"
              } h-[250px] rounded-lg bg-cover bg-center shrink-0 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-xl border border-transparent hover:border-white/10`}
              style={{ backgroundImage: `url("${src}")` }}
            ></div>
          ))}
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
import React, { useState } from "react";

interface Artist {
  id: number;
  name: string;
  role: string;
  image: string;
  soundcloudUrl: string;
  bio: string;
}

const artists: Artist[] = [
  {
    id: 1,
    name: "Sarah J.",
    role: "Vocalist",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOvFryrGgfd8UIFgTaDdFZDDpHIReQFbx41eBjuop4fGPhUX7F_tS25oiEzeM6rtoTw2BUNXmJ2m6r_pHC08KiH5GQrBVW3nd-uzoDTHsJxtHYyRRqYDsPv1XmRPOWhAOnwgW32eVNpjUgHObS7RfjG6QLhVQDQm7ABc4mQwoq0vCk2tFUyVRtr6YJVo79Z9EQCMABiOcZ9EQBAONOMM7MGByTwbamAZqzJ8Z4XOLzbHdsI2lTIVighXTBIUfWjU1PkRmao1VFUJg",
    soundcloudUrl: "#",
    bio: "Classically trained vocalist blending soul with electronic textures."
  },
  {
    id: 2,
    name: "Mike R.",
    role: "Drummer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpxXA0sjoeRFPDyApJ5nSaqs8bB-l_qjN3pzo6qNb7TapG0BUEaqbdL1Bm1nAfRSZXxfZsqsyvZttivbbS_7oVfFvoTI3JfqIisrcGG-7AtsC0ksU8XTiYp4YqgGpgjo5dVCTGkfO4X2phKEqQZf_bfMBht5XDAWCPLW4S4JcXYY5189tDftMKQCZYPu6GgENSZWXGvNxg2M_u9RhIaiGn0MMwf39wyPONGY6uXva7A-CHfdvijUCEaxJzRdr2iCLTMLjhg5e3i7o",
    soundcloudUrl: "#",
    bio: "Rhythmic powerhouse known for complex time signatures and groove."
  },
  {
    id: 3,
    name: "Elara",
    role: "Pianist",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCc2kb25HZr5gLtc7hzAbGCik0L8yTpvUB5rhAm4ZsS6ItTM3GqwjIpe3NtMpw4pS7_vWjX4M_Gmo6tLJdrAZRYffWwnW7HFLPhqVrrphqb-Y5yMbmZqnVHhEsGBZNuxDa8eaPcXz3FITZIWN_6D35B1QCEI41rUfrqtfKGdgijYBMy-apIOvBY23E7oDQFyQBEWJ2bZRDGcwDXyyFvd5v5dzkFOLf0RUc4STfoiNH7J_rpo4CnGZEiO5jFEUHdLq0WGCT3LKAzT2c",
    soundcloudUrl: "#",
    bio: "Award-winning pianist bridging the gap between jazz and neo-classical."
  },
  {
    id: 4,
    name: "David K.",
    role: "Guitar",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZEZr5Esuh8NsPdTy5YosAJ0LPS-hjIxmLuACs4G7cM_f9QZpmn6deup41cEsw4INR4w3L1VroHFxALjgu84TfTXD8YE7HIpDMFOXlrBUbuko4DKYnKYupxaR-4l3CncFqlZ1Na2KsK1FvGHP616vwyNP_-omqR_h4MnK_69YouoC8ca9rsoUyO0UjjiZ7GPHlwEYOWHBvMNqnwPmZNmhoaeA6lPVlJY7o5L_5T4IDJwMNNGz6a9wE5CXJcU2lhYMvsz_-izhlHY",
    soundcloudUrl: "#",
    bio: "Experimental guitarist pushing the boundaries of sonic landscapes."
  },
  {
    id: 5,
    name: "Alex T.",
    role: "Bass",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIRg2FkYKwO9xHu578fhinR3H5WHS3aOzsngelrqD5JjiGm5W_N8WxpgZppzEAKWTsmPO0JqS6nSF70QZgqwQtMPbmXQesEQiiJ7PHBnrzR85QCmZXXua1eAuZw3BKZLfQXZPByDI3A1LU6S2Yz-Dp8a9x1sxsz6697vnOCxqNDPY81xY8I4o2rYO3_syhIv2qIx7FbPibP42n6p8_i0IjcaKX-nA9gfVseQbGPsZqcAtlgtgiErv61d0sdNgywd2roUseoKdXWgQ",
    soundcloudUrl: "#",
    bio: "The backbone of the rhythm section, delivering deep, melodic basslines."
  },
  {
    id: 6,
    name: "DJ Pulse",
    role: "DJ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzXYgC4ztI5XxYn6qqxBN2_F0EGQZiQpNM62LVlZdyu6SreqHwh-bgJWtLl4u0RX7KresBHiDyo_LTGT31TqykAMiBXoE2PvQA7KqJ5keYLfANAvB1vEvrVEbx2HK0HZcepWup4Z9MCGKd-lqt4Mg3VnFjloFnlrvqhR_tgFzNrM6rXY28MUatxg7COLsUNVpruYW-8ZsohtkimhjSl29CmDOKk13EWhkGTjGRngcB8KISWAiJf_8H3aNwfNvUgG2ECtk1o8_ov7M",
    soundcloudUrl: "#",
    bio: "Underground sensation mixing synthwave with traditional Indian beats."
  },
];

const FeaturedArtists: React.FC = () => {
  const [activeArtistId, setActiveArtistId] = useState<number | null>(null);

  const handleInteraction = (id: number) => {
    setActiveArtistId(prevId => prevId === id ? null : id);
  };

  return (
    <section className="container mx-auto px-4 max-w-[1280px]">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h2 className="text-2xl font-bold tracking-tight">Featured Artists</h2>
        </div>
      </div>
      <div className="flex overflow-x-auto hide-scrollbar gap-8 pb-4 snap-x snap-mandatory px-2">
        {artists.map((artist) => {
          const isActive = activeArtistId === artist.id;
          
          return (
            <div
              key={artist.id}
              className="flex flex-col items-center gap-3 min-w-[120px] snap-center group cursor-pointer"
              onClick={() => handleInteraction(artist.id)}
            >
              <div className="relative size-24 md:size-32">
                {/* Main Image Container */}
                <div 
                  className={`w-full h-full rounded-full p-1 border transition-all duration-500 overflow-hidden relative z-0 ${
                    isActive ? "border-primary scale-105" : "border-white/10 group-hover:border-primary/50"
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-full bg-cover bg-center transition-all duration-500 ${
                       isActive ? "opacity-20 blur-md" : "opacity-100"
                    }`}
                    style={{ backgroundImage: `url("${artist.image}")` }}
                  ></div>
                  
                  {/* Bio Overlay */}
                  <div 
                    className={`absolute inset-0 flex items-center justify-center p-2 text-center transition-all duration-500 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                    }`}
                  >
                    <p className="text-[10px] md:text-[11px] leading-tight text-white font-bold drop-shadow-md select-none">
                      {artist.bio}
                    </p>
                  </div>
                </div>

                {/* SoundCloud Link */}
                <a
                  href={artist.soundcloudUrl}
                  className={`absolute bottom-0 right-0 bg-[#ff5500] text-white p-1.5 md:p-2 rounded-full border-[3px] border-background-dark shadow-lg flex items-center justify-center transition-transform duration-300 z-10 ${
                    isActive ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100 hover:scale-110"
                  }`}
                  title="Listen on SoundCloud"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span className="material-symbols-outlined text-[14px] md:text-[16px]">
                    cloud
                  </span>
                </a>
              </div>
              
              <div className="text-center">
                <h4 className={`font-bold leading-tight transition-colors duration-300 ${isActive ? "text-primary" : "text-white"}`}>
                  {artist.name}
                </h4>
                <span className="text-xs text-white/50">{artist.role}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedArtists;
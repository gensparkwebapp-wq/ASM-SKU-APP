import React from "react";

interface Artist {
  id: number;
  name: string;
  role: string;
  image: string;
  soundcloudUrl: string;
}

const artists: Artist[] = [
  {
    id: 1,
    name: "Sarah J.",
    role: "Vocalist",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOvFryrGgfd8UIFgTaDdFZDDpHIReQFbx41eBjuop4fGPhUX7F_tS25oiEzeM6rtoTw2BUNXmJ2m6r_pHC08KiH5GQrBVW3nd-uzoDTHsJxtHYyRRqYDsPv1XmRPOWhAOnwgW32eVNpjUgHObS7RfjG6QLhVQDQm7ABc4mQwoq0vCk2tFUyVRtr6YJVo79Z9EQCMABiOcZ9EQBAONOMM7MGByTwbamAZqzJ8Z4XOLzbHdsI2lTIVighXTBIUfWjU1PkRmao1VFUJg",
    soundcloudUrl: "#",
  },
  {
    id: 2,
    name: "Mike R.",
    role: "Drummer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpxXA0sjoeRFPDyApJ5nSaqs8bB-l_qjN3pzo6qNb7TapG0BUEaqbdL1Bm1nAfRSZXxfZsqsyvZttivbbS_7oVfFvoTI3JfqIisrcGG-7AtsC0ksU8XTiYp4YqgGpgjo5dVCTGkfO4X2phKEqQZf_bfMBht5XDAWCPLW4S4JcXYY5189tDftMKQCZYPu6GgENSZWXGvNxg2M_u9RhIaiGn0MMwf39wyPONGY6uXva7A-CHfdvijUCEaxJzRdr2iCLTMLjhg5e3i7o",
    soundcloudUrl: "#",
  },
  {
    id: 3,
    name: "Elara",
    role: "Pianist",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCc2kb25HZr5gLtc7hzAbGCik0L8yTpvUB5rhAm4ZsS6ItTM3GqwjIpe3NtMpw4pS7_vWjX4M_Gmo6tLJdrAZRYffWwnW7HFLPhqVrrphqb-Y5yMbmZqnVHhEsGBZNuxDa8eaPcXz3FITZIWN_6D35B1QCEI41rUfrqtfKGdgijYBMy-apIOvBY23E7oDQFyQBEWJ2bZRDGcwDXyyFvd5v5dzkFOLf0RUc4STfoiNH7J_rpo4CnGZEiO5jFEUHdLq0WGCT3LKAzT2c",
    soundcloudUrl: "#",
  },
  {
    id: 4,
    name: "David K.",
    role: "Guitar",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZEZr5Esuh8NsPdTy5YosAJ0LPS-hjIxmLuACs4G7cM_f9QZpmn6deup41cEsw4INR4w3L1VroHFxALjgu84TfTXD8YE7HIpDMFOXlrBUbuko4DKYnKYupxaR-4l3CncFqlZ1Na2KsK1FvGHP616vwyNP_-omqR_h4MnK_69YouoC8ca9rsoUyO0UjjiZ7GPHlwEYOWHBvMNqnwPmZNmhoaeA6lPVlJY7o5L_5T4IDJwMNNGz6a9wE5CXJcU2lhYMvsz_-izhlHY",
    soundcloudUrl: "#",
  },
  {
    id: 5,
    name: "Alex T.",
    role: "Bass",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIRg2FkYKwO9xHu578fhinR3H5WHS3aOzsngelrqD5JjiGm5W_N8WxpgZppzEAKWTsmPO0JqS6nSF70QZgqwQtMPbmXQesEQiiJ7PHBnrzR85QCmZXXua1eAuZw3BKZLfQXZPByDI3A1LU6S2Yz-Dp8a9x1sxsz6697vnOCxqNDPY81xY8I4o2rYO3_syhIv2qIx7FbPibP42n6p8_i0IjcaKX-nA9gfVseQbGPsZqcAtlgtgiErv61d0sdNgywd2roUseoKdXWgQ",
    soundcloudUrl: "#",
  },
  {
    id: 6,
    name: "DJ Pulse",
    role: "DJ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzXYgC4ztI5XxYn6qqxBN2_F0EGQZiQpNM62LVlZdyu6SreqHwh-bgJWtLl4u0RX7KresBHiDyo_LTGT31TqykAMiBXoE2PvQA7KqJ5keYLfANAvB1vEvrVEbx2HK0HZcepWup4Z9MCGKd-lqt4Mg3VnFjloFnlrvqhR_tgFzNrM6rXY28MUatxg7COLsUNVpruYW-8ZsohtkimhjSl29CmDOKk13EWhkGTjGRngcB8KISWAiJf_8H3aNwfNvUgG2ECtk1o8_ov7M",
    soundcloudUrl: "#",
  },
];

const FeaturedArtists: React.FC = () => {
  return (
    <section className="container mx-auto px-4 max-w-[1280px]">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h2 className="text-2xl font-bold tracking-tight">Featured Artists</h2>
        </div>
      </div>
      <div className="flex overflow-x-auto hide-scrollbar gap-8 pb-4 snap-x snap-mandatory px-2">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="flex flex-col items-center gap-3 min-w-[100px] snap-center group cursor-pointer"
          >
            <div className="relative">
              <div className="size-24 md:size-32 rounded-full p-1 border border-white/10 group-hover:border-primary/50 transition-colors">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url("${artist.image}")` }}
                ></div>
              </div>
              <a
                href={artist.soundcloudUrl}
                className="absolute bottom-0 right-0 bg-[#ff5500] text-white p-1.5 md:p-2 rounded-full border-[3px] border-background-dark hover:scale-110 transition-transform shadow-lg flex items-center justify-center group/sc"
                title="Listen on SoundCloud"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="material-symbols-outlined text-[14px] md:text-[16px]">
                  cloud
                </span>
              </a>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-white leading-tight">
                {artist.name}
              </h4>
              <span className="text-xs text-primary">{artist.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArtists;
import React, { useState } from 'react';
import { ViewState } from '../App';

interface WetubeSearchPageProps {
  query: string;
  onNavigate: (view: ViewState, data?: any) => void;
}

const WetubeSearchPage: React.FC<WetubeSearchPageProps> = ({ query, onNavigate }) => {
  const [searchInput, setSearchInput] = useState(query);

  const handleSearch = () => {
    onNavigate('wetube-search', searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
  };

  return (
    <div className="flex w-full h-full">
      {/* Sidebar (Consistent with WetubePage) */}
      <aside className="hidden lg:flex w-[240px] flex-col overflow-y-auto bg-surface-dark/30 border-r border-white/5 pb-4 hide-scrollbar">
        <div className="px-3 py-3">
            <div className="flex flex-col gap-1">
                <button onClick={() => onNavigate('home')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-white">home</span>
                    <span className="text-sm font-medium text-white">Home</span>
                </button>
                <button onClick={() => onNavigate('wetube-subscriptions')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-white">subscriptions</span>
                    <span className="text-sm font-medium text-white">Subscriptions</span>
                </button>
            </div>
            <div className="my-3 border-t border-white/5"></div>
            <div className="flex flex-col gap-1">
                <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-white">video_library</span>
                    <span className="text-sm font-medium text-white">Library</span>
                </button>
                <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-white">history</span>
                    <span className="text-sm font-medium text-white">History</span>
                </button>
                <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-white">schedule</span>
                    <span className="text-sm font-medium text-white">Watch Later</span>
                </button>
                <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-white">thumb_up</span>
                    <span className="text-sm font-medium text-white">Liked videos</span>
                </button>
            </div>
            <div className="my-3 border-t border-white/5"></div>
            <h3 className="px-3 py-2 text-base font-semibold text-white">Subscriptions</h3>
            <div className="flex flex-col gap-1">
                 <button onClick={() => onNavigate('wetube-channel', 'Tech Reviews Daily')} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="h-6 w-6 overflow-hidden rounded-full bg-white/10">
                        <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmttVDt3rCUUrjjwmi1qFdMIDoS8wGcxZna3lxZVeuYF1fgVAjH7pUMiKbQjaR_7dO3hKffe7ozBFJYLJEzcqEVx9s3xOzfl9G-GR-lQd5Bz-rQF49wYoB6ePu-cFCw_ocXJIXes8yyp6hs7iZ9ruzcCdFQvnaiSE2eBJbzXGpkvLqAYLj7SOwugBCf2lVbUacyCD1KxVZrCiLCUC1_VVodULvlqv7qZ9kKgDanaWpZXT0AEfq6A8N-i7ROhHUqOvJmVC5RGKe4Zg" alt="Channel" />
                    </div>
                    <span className="text-sm font-medium text-white truncate">Tech Reviews Daily</span>
                </button>
                <button onClick={() => onNavigate('wetube-channel', 'Gadget Dreams')} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="h-6 w-6 overflow-hidden rounded-full bg-white/10">
                        <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIoOTcWqgR_hBvVxHvwMLqFrSYKyZCgvh_2FC3VisXZth40EtgBsxTDd-i1IgMimHS6KyY-Ct2Mu4h812mGdLmVdPiJY8WTBaxdWfOF1pM63de9OfutT-tQBQKGWSfh1OhVMZhEwhcC-8cLZoVSysyE6G_rq-V9XufpC38KfCkWMHS53oO__XabYvRF6jH7pqyk5SM9w2nGm3OD_2obZ2ZbftVciZENJKPXmH2RT6wQRMOnRDhR1y4WJ7iU6f8FBuMu_r3tz_qeac" alt="Channel" />
                    </div>
                    <span className="text-sm font-medium text-white truncate">Gadget Dreams</span>
                </button>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background-dark pb-10">
        
        {/* Search Bar (Specific to this view) */}
        <div className="sticky top-0 z-30 bg-background-dark/95 backdrop-blur-sm px-4 py-3 border-b border-white/5 flex items-center gap-4">
             <div className="relative flex-grow max-w-2xl mx-auto md:ml-0">
                 <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                    className="w-full h-10 pl-10 pr-4 rounded-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-white/40 text-sm transition-all"
                />
                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/40">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                </span>
             </div>
              <button 
                onClick={handleSearch}
                className="flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-white filled">mic</span>
             </button>
        </div>

        <div className="flex flex-col max-w-[1200px] mx-auto px-4 md:px-8">
            {/* Filter Chips */}
            <div className="sticky top-[65px] bg-background-dark/95 z-20 py-3 backdrop-blur-sm border-b border-transparent">
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                    <button className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-white text-black px-3 transition-colors">
                        <span className="text-sm font-medium">All</span>
                    </button>
                    {['Channels', 'Unwatched', 'Recently uploaded', 'Live', 'Playlists'].map(filter => (
                        <button key={filter} className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white px-3 transition-colors">
                            <span className="text-sm font-medium">{filter}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
                {/* Result 1: Channel */}
                <div 
                    onClick={() => onNavigate('wetube-channel', 'Tech Reviews Daily')}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-6 py-6 border-b border-white/5 cursor-pointer group"
                >
                    <div className="shrink-0 flex justify-center w-full sm:w-[360px]">
                        <div className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 md:h-[136px] md:w-[136px]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJ4B79nWOdcbPMTACyitFEroeWivZN0l_A8Rtkby6RMCyCiWQ26M1C-RejgA7QEj0aZqy-0NFQdC1vKj5W5aqPUYSXNTjBm_ni2fthiGZG_U89UDVTX9p1aaryXyeHzVnH_fIndMaes49uHuyT140QW5ufSJ9xNAwo5XLTYqmzqOBARga72h4bJ0qG6jOV4anf2bUHRtqusoyU16AUOsFDT4t8FzKM8rF1vsxRpVoGdOZk-zapSUyOEZyw-an2pdytvbhDMgVhHPI")' }}></div>
                    </div>
                    <div className="flex flex-col flex-1 items-center sm:items-start text-center sm:text-left justify-center h-full py-2">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white text-lg font-medium group-hover:text-primary transition-colors">Tech Reviews Daily</h3>
                            <span className="material-symbols-outlined text-white/50 text-[16px] filled">check_circle</span>
                        </div>
                        <p className="text-white/50 text-xs font-normal mb-3">@TechReviewsDaily • 1.2M subscribers • 500 videos</p>
                        <p className="text-white/50 text-sm font-normal leading-normal max-w-lg mb-4 line-clamp-2">Your daily dose of the latest tech news, reviews, unboxings, and comprehensive guides to the gadget world.</p>
                        <button className="bg-white text-black font-medium text-sm px-4 py-2 rounded-full hover:bg-white/90 transition-opacity">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Result 2: Video */}
                <div className="group flex flex-col md:flex-row gap-4 cursor-pointer">
                    <div className="relative w-full md:w-[360px] md:min-w-[360px] aspect-video rounded-xl overflow-hidden bg-surface-dark">
                        <div className="w-full h-full bg-center bg-no-repeat bg-cover hover:scale-105 transition-transform duration-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD2mxC2HMAOy0U8vxskhjkjasCYnkTJVr9-IArk53oV8QzToq8S4OLd_m5V4W21a8CzoGBLhVcUKkaOlaI92lO-2WGflAEWVTgQyGxXziVDlQnrgiaACSk5Uu2pFPDyjK6wiSJS827RyrUiwfIkSrmCz3z-nBoEu2z_AtKFEjIoIfg5k_e0pGyXov-CaSLTs8uHRYtHWUqMMoQzm8AmAm6_ziN89cGX0u_pTneOw6byWNXmXtkyAG96ceVadevOaP6t9wPB6uPG0BU")' }}></div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">14:20</div>
                        <div className="absolute bottom-1 left-1 h-1 bg-primary w-[70%] z-10"></div>
                        <div className="absolute bottom-1 left-1 h-1 bg-white/20 w-[98%]"></div>
                    </div>
                    <div className="flex flex-col py-1 flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h3 className="text-white text-lg font-medium leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">Top 10 Gadgets 2023 - You Won't Believe #1</h3>
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full text-white transition-opacity">
                                <span className="material-symbols-outlined text-xl">more_vert</span>
                            </button>
                        </div>
                        <p className="text-white/50 text-xs mb-3">240K views • 2 days ago</p>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full h-6 w-6" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1d0zIZTMaMkrhZC0xe6e_j5sWZdA5h0CjEp31H3vWA8sVc21srLFHmz2nKcV4WzTJWXMmkpHi3kXwsrpJ5fpvrfEvpcDRdvgj9yP4yanQJ14uyD1_avQBA9huCzMRTDSV0SzLlGPLtxruBWNQo7KLlIdIBCkjqWVXNO9jOh29BqXPvShiKhMFTme01quGZfALR7x1PIiWgJkFSl0dUwUvipe6lro5LFJZQbHao5TXMA1mA6aK4AD-NZHsPFol9kvhjjYlAz_7WHk")' }}></div>
                            <p onClick={() => onNavigate('wetube-channel', 'Tech Reviews Daily')} className="text-white/50 text-xs hover:text-white transition-colors cursor-pointer">Tech Reviews Daily</p>
                            <span className="material-symbols-outlined text-white/50 text-[12px] filled">check_circle</span>
                        </div>
                        <p className="text-white/50 text-xs line-clamp-2">In this video, we break down the absolute best gadgets released this year. From smartphones to smart home devices...</p>
                        <div className="mt-2 inline-flex items-center bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white/70 font-semibold uppercase tracking-wide w-fit">4K</div>
                    </div>
                </div>

                {/* Result 3: Video */}
                <div className="group flex flex-col md:flex-row gap-4 cursor-pointer mt-2">
                    <div className="relative w-full md:w-[360px] md:min-w-[360px] aspect-video rounded-xl overflow-hidden bg-surface-dark">
                        <div className="w-full h-full bg-center bg-no-repeat bg-cover hover:scale-105 transition-transform duration-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHxeN3y3BBlISKuNa6dZiY1m0PIp0ZOw3BVI0rpwNiIZtfgRsH47eAz5GnzsfLFTDwty8-8cRnC54mzDvqbJEiZkH-yXUWOF4sz2_2xpQwhn6sJTFiu_yJMKe2RgLgQiqFU0xdAyTx3LvYgnX3jJ_B0e6YmTBpJOouGKlbe6G1lhL2s4qVAqN0aCFWcn7rHGJCkpJQC4vDnzouuUw_vF8j-R01iQGKyxjmuzPbfgzspQuV7Qry7rnsDrsY_kBQGtOUE-PA2lhN-C8")' }}></div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">8:45</div>
                    </div>
                    <div className="flex flex-col py-1 flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h3 className="text-white text-lg font-medium leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">Unboxing the Future: Vision Pro First Impressions</h3>
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full text-white transition-opacity">
                                <span className="material-symbols-outlined text-xl">more_vert</span>
                            </button>
                        </div>
                        <p className="text-white/50 text-xs mb-3">50K views • 4 hours ago • <span className="bg-white/10 text-white px-1 rounded font-medium">New</span></p>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full h-6 w-6" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmj_xQG6M-dH9iW6ZxRPJNBzjrrBVN3fPzR9knwH7_fz9ck1s39mm9Cgl9IzSffGnYAedL9sxGAdlrG2yjKC1-m6jEdMBwYDOluQt3_7fze_mY8fwPyAfN2eTgy-WFrzQh4oF6Qn0Am6Iz8Yl9zoHx-ysHJsoorupTLJ3VLx2QcmXP519ZFyXXBdLyoeKwaIuPG6UdQYS-TQ_ZoKkVO_4Hx7861lvH0F87aZ5TGOECI7vikuymFADnsbYCyiL9jEGYlqL6plHJhVk")' }}></div>
                            <p onClick={() => onNavigate('wetube-channel', 'Gadget Dreams')} className="text-white/50 text-xs hover:text-white transition-colors cursor-pointer">Gadget Dreams</p>
                        </div>
                        <p className="text-white/50 text-xs line-clamp-2">Finally getting my hands on the latest VR headset. Is it worth the hype? Let's find out in this comprehensive unboxing.</p>
                    </div>
                </div>

                {/* Shorts Shelf */}
                <div className="py-6 border-b border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary filled">smart_display</span>
                        <h2 className="text-xl font-bold text-white">Shorts</h2>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                        {[
                            { title: 'Will it break? Ultimate Drop Test 😱', channel: 'TechDestruction', views: '1.2M views', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChpi_b_YGwpZOA7hDomToV33SQb3GKQQDR4fLWLOohtOk2FPUoydm3fOYe_uYz32LZMR5GHYk79PlZrSYOUaH72N_5TFyc-7l1R0HbRYm7aUEeaulr4HXxYKMTD6bLiNXEEj4-Cqh8WyL_BLVHktC9rdIVDBh8FIDTIdWbSfFWTPxNEJcapqypRqiMDTfHcfUJ_E0qv9XLtGvRwb0LD-vWF9dwvMuG8gcMKHpHiPspQe1_YW6VVvZBDaj-nkJOf9FwkW3zE033I0A' },
                            { title: 'Best Mechanical Keyboard ASMR ⌨️', channel: 'ClickyKeys', views: '', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIFmUbWeUIzGQAgK1LqZGRN8n-9yyuH8U4R02hY0oJmdFEzgvOQle_MTrrNBDoPKVJA4aoOCiuhMcbIA5OqRWKR42uGgOAum451LWYMqjB238sNt1vqc0gDnMuM0o6fZWXgGdmDWwkCp42EgwWbnZSuL9MjGU9gNwAnGEoP-i9ezkXdp2pwv8UzKNj4a3j3kgHR_8N1NwsKulicJGwlEsgQ-YfTIBJmwZgbhkzC2xSj7DQVxP6JRlAJE2rq8Ngce53ZRfvDck8doc' },
                            { title: 'Hidden iPhone Trick you didn\'t know!', channel: 'AppleGuru', views: '', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiODfH6s8VZ3cEQvEElMbrWrh_-ropCpIuc5D0AFXV62iEWcCdF-7gx5K4oYYZxcMEPA85H-6esZn1ZuQ_1wD-6WSPv4sX2_gHdc2fkdq_tomDcA_LgirgLqPfv6WGyEV6ywMK6NrOHsKT3bV9p52wfsOO27ev-n1hs-uf4gK12L8kgo9WvtHdvdh-8_G_lucRc7o4mgNtqgjTUdDnm2Z7UR1mIzLxvzZQLaW6wn51eSb2bBDAuE6ERMNfI6NhRnZWOsKcoHvtUX8' },
                            { title: 'Dream Desk Setup 2024 ✨', channel: 'SetupWars', views: '', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnE9B5ptmGlRyRxOnuCiOhqBvhJiyU-WoAvcbC7sEAmEDj7RGPr1K5gSWpgKyt1gaN4KCaD7ER2TgEPfa6Ia12a9tUJnSLNzqOmf4ii5ATbDdVU9P5BQdAe8D-AoVBF4KoKPcWoZaMgXDEtecKYgmsDo1KiEjKwtVRRrmuu-OsUZhomY4qeAfT9_pC5Aw6XUB9Ws1ZvoD1XTloL0B-em-xhMY8BfUXPDzhoqddFJvRk1mZOcukV6lFqB55gXPmqCcRLxhLQs3y38Y' },
                            { title: 'This robot is SCARY fast ⚡️', channel: 'FutureTech', views: '', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcKJUqszOtyY0n-C_caO-mkCh2lQEJfmdgBWpuoqhfsk10ccH5Q33zk4_gbWjiG_qNJSjXO5YkCBvyLvm3HRMFJGyEIPvAPQ8K_8zsElc8FU4Nk9OvQ750mGr5gu09J25bottKEdwfACZRYjy78WyP994g-YUL_NYU6ye83KkVVPNz558bsjkUtfySW_mdvr40JMfTbrCR2O7zxs3gQ5IYB76wfNywkGcDIAVLO4yJTZi7Rn_GRD5wEF86TLgtfQh2bJJmAaFMA9c' }
                        ].map((short, i) => (
                            <div key={i} className="w-[160px] md:w-[210px] shrink-0 flex flex-col gap-2 cursor-pointer group">
                                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-surface-dark">
                                    <div className="w-full h-full bg-center bg-no-repeat bg-cover group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: `url("${short.img}")` }}></div>
                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    {short.views && <div className="absolute bottom-2 right-2 text-white text-xs font-bold drop-shadow-md">{short.views}</div>}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <h4 className="text-white text-sm font-medium line-clamp-2 leading-snug">{short.title}</h4>
                                    <p className="text-white/50 text-xs">{short.channel}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Result 4: Playlist */}
                <div className="group flex flex-col md:flex-row gap-4 cursor-pointer mt-4">
                    <div className="relative w-full md:w-[360px] md:min-w-[360px] aspect-video rounded-xl overflow-hidden bg-surface-dark group-hover:shadow-lg transition-shadow">
                        <div className="w-full h-full bg-center bg-no-repeat bg-cover opacity-80" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUIhkN9CJBLuvZp2KFJzrwqi8FDOr5aNqVFooLC62eKcp_hpmngbsKzb3W9hE18rFwdWim1byCnekzeln2robKURp7o_6NHTIEYUTKbgzElPJVhnHqSjf-NVoJ0xOY17WRCizTQw1bQ9qhSvZQqs_wJSzby7lQuyUA3XOnB8ZqUM3ItH7cGk2zORN27gsnVnNFtS-Aq1lY7y53EAqqD6eMLOlE4iGY7xB1bvtIQKxRLfmxdlmRkVPQieWhFX_KsoUtoAKgafEUSA0")' }}></div>
                        {/* Playlist Overlay */}
                        <div className="absolute right-0 top-0 bottom-0 w-2/5 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-1">
                            <span className="text-xl font-bold">12</span>
                            <span className="material-symbols-outlined text-3xl">playlist_play</span>
                        </div>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/80 px-2 py-1 rounded text-white text-xs font-medium">
                            <span className="material-symbols-outlined text-sm">playlist_play</span>
                            Playlist
                        </div>
                    </div>
                    <div className="flex flex-col py-1 flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h3 className="text-white text-lg font-medium leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">Best of CES 2024 - Full Coverage</h3>
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full text-white transition-opacity">
                                <span className="material-symbols-outlined text-xl">more_vert</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mb-2 mt-1">
                            <p onClick={() => onNavigate('wetube-channel', 'Tech Reviews Daily')} className="text-white/50 text-xs hover:text-white transition-colors cursor-pointer">Tech Reviews Daily</p>
                        </div>
                        <p className="text-white/50 text-xs mb-3">Updated yesterday</p>
                        <p className="text-white/50 text-xs text-primary font-medium">View full playlist</p>
                    </div>
                </div>

                {/* Result 5: Video */}
                <div className="group flex flex-col md:flex-row gap-4 cursor-pointer mt-2">
                    <div className="relative w-full md:w-[360px] md:min-w-[360px] aspect-video rounded-xl overflow-hidden bg-surface-dark">
                        <div className="w-full h-full bg-center bg-no-repeat bg-cover hover:scale-105 transition-transform duration-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCifgMeTdL1oOIFwg5FMwxeh0Ae-Kt9symtq_1VzOfhHphTivJHI5WGBThiAE8ysPIgdIax3vjcol7jYy9QbQbNrRkMAQGUahoTrcsxQKl9H55S0pUR6mPCs_FjoZ00-cPv3GVLgimijYirlnLCQnmuqVZ6LS8Iu1j1pdu0ilbb8UFMegfS1a8MCbAG9tNUGWYjMji444kGLNPF6rWIfhKVuCVAoK9x2WCG09P8Q-Xxuu30AqnuoZ5AyiH8OiFTi5Hy7mZQk9AdPgs")' }}></div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">12:10</div>
                    </div>
                    <div className="flex flex-col py-1 flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h3 className="text-white text-lg font-medium leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">The Smartwatch Killer? New Wearable Tech Review</h3>
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full text-white transition-opacity">
                                <span className="material-symbols-outlined text-xl">more_vert</span>
                            </button>
                        </div>
                        <p className="text-white/50 text-xs mb-3">15K views • 1 day ago</p>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full h-6 w-6" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDM5kE4YlHf5AL_UWcUdeFmMCj00VBkONtYQ15oGdhoSF2T9fKwjJZvZesu_D3L6-IjdlG04B1FY9CBOgB3XKoHX4aedStBn7hWB56jUkZOVZLhJ2-hh36gND_w1uIczgiAdo1ztgW8jqLk9b_OHbViTmKYlJrmBZjoNRBxxXEhEcHw6nWmqn7PdjnSPyaVEWfdokdAknHfxXIxm9gl2djMS71fBooEDMDEG85kl5aVB7iScFYZHEiPe09xnMq6bGe4ae0yUXaPvRE")' }}></div>
                            <p onClick={() => onNavigate('wetube-channel', 'Wearable Weekly')} className="text-white/50 text-xs hover:text-white transition-colors cursor-pointer">Wearable Weekly</p>
                        </div>
                        <p className="text-white/50 text-xs line-clamp-2">Is the traditional smartwatch dead? We look at the new wave of screenless AI pins and wearables.</p>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default WetubeSearchPage;

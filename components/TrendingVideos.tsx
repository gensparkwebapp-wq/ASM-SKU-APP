import React, { useState, useRef, useEffect } from 'react';

// Data structure for a video
interface TrendingVideo {
  id: number;
  thumbnail: string;
  title: string;
  artistName: string;
  artistAvatar: string;
  views: string;
  duration: string;
}

// Mock data for the videos
const trendingVideos: TrendingVideo[] = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1516223725372-6d34b84024c4?w=800&h=450&fit=crop&q=80',
    title: 'Live Acoustic Session in the Woods',
    artistName: 'Elara',
    artistAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
    views: '1.2M views',
    duration: '15:30',
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&h=450&fit=crop&q=80',
    title: 'Making a Beat from Scratch | Ableton Tutorial',
    artistName: 'DJ Pulse',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
    views: '890k views',
    duration: '22:15',
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=450&fit=crop&q=80',
    title: 'The Great Gig - Arena Rock Show',
    artistName: 'Mike R.',
    artistAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&q=80',
    views: '2.5M views',
    duration: '04:55',
  },
  {
    id: 4,
    thumbnail: 'https://images.unsplash.com/photo-1499415474324-e2985852a1DB?w=800&h=450&fit=crop&q=80',
    title: 'Guitar Solo Masterclass',
    artistName: 'David K.',
    artistAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80',
    views: '650k views',
    duration: '18:40',
  },
   {
    id: 5,
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=450&fit=crop&q=80',
    title: 'Official Music Video - "Neon Dreams"',
    artistName: 'Sarah J.',
    artistAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80',
    views: '5.1M views',
    duration: '03:45',
  },
];

const TrendingVideos: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            handleScroll('right');
        }
      }
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (!isHovering) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
    return () => {
      stopAutoScroll();
    };
  }, [isHovering]);

  return (
    <section className="container mx-auto px-4 max-w-[1400px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        <h2 className="text-2xl font-bold tracking-tight">Trending Artist Videos</h2>
      </div>
      
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 -mx-4 px-4 snap-x snap-mandatory scroll-smooth"
        >
          {trendingVideos.map((video) => (
            <div key={video.id} className="min-w-[300px] md:min-w-[350px] snap-start group/card cursor-pointer">
              {/* Thumbnail */}
              <div className="relative aspect-video w-full bg-surface-dark rounded-xl overflow-hidden mb-3 border-2 border-transparent group-hover/card:border-primary transition-all duration-300 group-hover/card:shadow-xl group-hover/card:shadow-primary/10">
                <img src={video.thumbnail} alt={video.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  <div className="size-12 rounded-full bg-primary/80 backdrop-blur-sm text-background-dark flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined filled text-3xl ml-1">play_arrow</span>
                  </div>
                </div>
                
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur rounded text-xs font-mono font-bold text-white/90">
                  {video.duration}
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <img src={video.artistAvatar} alt={video.artistName} loading="lazy" className="size-10 rounded-full object-cover mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-white leading-tight mb-1 line-clamp-2 group-hover/card:text-primary transition-colors">{video.title}</h3>
                  <p className="text-sm text-white/60">{video.artistName}</p>
                  <p className="text-xs text-white/40">{video.views}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <div className="hidden md:flex absolute top-0 left-0 w-full h-full items-center justify-between pointer-events-none px-2">
            <button 
                onClick={() => handleScroll('left')}
                className="size-12 rounded-full border border-white/10 flex items-center justify-center bg-surface-dark/60 backdrop-blur-sm hover:bg-white/10 text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100 pointer-events-auto -translate-x-4 group-hover:translate-x-0"
                aria-label="Scroll left"
            >
                <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
                onClick={() => handleScroll('right')}
                className="size-12 rounded-full border border-white/10 flex items-center justify-center bg-surface-dark/60 backdrop-blur-sm hover:bg-white/10 text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100 pointer-events-auto translate-x-4 group-hover:translate-x-0"
                aria-label="Scroll right"
            >
                <span className="material-symbols-outlined">chevron_right</span>
            </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingVideos;
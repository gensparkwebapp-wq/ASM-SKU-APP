import React, { useState, useRef, useEffect } from 'react';

// Data structure for a gallery moment
interface GalleryMoment {
  id: number;
  image: string;
  caption: string;
}

// Mock data for the gallery moments
const galleryMoments: GalleryMoment[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?w=600&h=800&fit=crop&q=80',
    caption: 'Lost in the moment, live on stage.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=800&fit=crop&q=80',
    caption: 'The energy of the crowd was electric.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=800&fit=crop&q=80',
    caption: 'Finding inspiration in the quiet moments.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1543321269-9d86d368095b?w=600&h=800&fit=crop&q=80',
    caption: 'Final soundcheck before the big show.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1484876065684-b683cf17a275?w=600&h=800&fit=crop&q=80',
    caption: 'Penning down the next big hit.',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1516943993219-db3c3738ca68?w=600&h=800&fit=crop&q=80',
    caption: 'Studio nights and creative flights.',
  },
];

const ArtistMomentsGallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth -1) {
        // If at the end, smoothly scroll to the beginning
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Otherwise, scroll a bit to the right
        scrollContainerRef.current.scrollBy({ left: 1, behavior: 'smooth' });
      }
    }
  };
  
  const startAutoScroll = () => {
    stopAutoScroll();
    // Use a much faster interval for smooth pixel-by-pixel scrolling
    intervalRef.current = setInterval(handleScroll, 25); 
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
    return () => stopAutoScroll();
  }, [isHovering]);

  return (
    <section className="container mx-auto px-4 max-w-[1400px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        <h2 className="text-2xl font-bold tracking-tight">Artist Moments – Photo Gallery</h2>
      </div>
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 -mx-4 px-4 snap-x snap-mandatory"
      >
        {galleryMoments.map((moment) => (
          <div key={moment.id} className="min-w-[280px] md:min-w-[320px] snap-start group cursor-pointer">
            <div className="relative aspect-[3/4] w-full bg-surface-dark rounded-xl overflow-hidden">
              <img 
                src={moment.image} 
                alt={moment.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-bold leading-tight line-clamp-2">{moment.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistMomentsGallery;
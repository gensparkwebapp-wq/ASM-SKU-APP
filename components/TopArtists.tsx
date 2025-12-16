import React, { useRef } from 'react';
import { Artist } from '../data/artists';
import { ViewState } from '../App';

// Data structure for a top artist
interface TopArtist {
  id: number;
  rank: number;
  name: string;
  type: string;
  tagline: string;
  avatar: string;
}

// Mock data for the top artists (remains for display purposes)
const topArtistDisplayData: TopArtist[] = [
  {
    id: 1,
    rank: 1,
    name: 'Aarav Sharma',
    type: 'Producer & DJ',
    tagline: 'Crafting the sounds of tomorrow.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 2,
    rank: 2,
    name: 'Riya Patel',
    type: 'Classical Vocalist',
    tagline: 'Reviving ancient melodies.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 3,
    rank: 3,
    name: 'Vikram Singh',
    type: 'Rock Guitarist',
    tagline: 'Shredding strings, breaking norms.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 4,
    rank: 4,
    name: 'Ananya Joshi',
    type: 'Indie Pop Singer',
    tagline: 'Whispering stories through songs.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80',
  },
  {
    id: 5,
    rank: 5,
    name: 'Rohan Desai',
    type: 'Tabla Maestro',
    tagline: 'The rhythm of a new generation.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&q=80',
  },
];

interface TopArtistsProps {
  artists: Artist[];
  onNavigate: (view: ViewState, data?: any) => void;
}

const TopArtists: React.FC<TopArtistsProps> = ({ artists, onNavigate }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
        const scrollAmount = scrollContainerRef.current.clientWidth * 0.7;
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
        }
    };

    const handleViewProfile = (artistId: number) => {
      const artistData = artists.find(a => a.id === artistId);
      if (artistData) {
        onNavigate('profile', artistData);
      } else {
        console.warn(`Artist with ID "${artistId}" not found in main artist list.`);
      }
    };

    return (
        <section className="container mx-auto px-4 max-w-[1400px]">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h2 className="text-2xl font-bold tracking-tight">Top Artists Profiles</h2>
            </div>
            <div className="hidden md:flex gap-2">
            <button 
                onClick={() => handleScroll('left')}
                className="size-10 rounded-full border border-white/10 flex items-center justify-center bg-surface-dark/50 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                aria-label="Scroll left"
            >
                <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
                onClick={() => handleScroll('right')}
                className="size-10 rounded-full border border-white/10 flex items-center justify-center bg-surface-dark/50 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                aria-label="Scroll right"
            >
                <span className="material-symbols-outlined">chevron_right</span>
            </button>
            </div>
        </div>
        <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 -mx-4 px-4 snap-x snap-mandatory scroll-smooth"
        >
            {topArtistDisplayData.map((artist) => (
            <div key={artist.id} className="min-w-[260px] md:min-w-[280px] snap-start">
                <div 
                    onClick={() => handleViewProfile(artist.id)}
                    className="glass-card rounded-xl p-4 flex flex-col items-center text-center h-full group cursor-pointer hover:border-primary/40 transition-all duration-300">
                    <div className="relative mb-4">
                        <img 
                            src={artist.avatar} 
                            alt={artist.name} 
                            loading="lazy"
                            className="size-24 rounded-full object-cover border-2 border-white/10 group-hover:border-primary/50 transition-colors"
                        />
                        <div className="absolute -top-1 -right-1 size-8 rounded-full bg-primary text-background-dark flex items-center justify-center font-bold text-sm border-2 border-background-dark shadow-md">
                            #{artist.rank}
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{artist.name}</h3>
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-3">{artist.type}</p>
                    <p className="text-sm text-white/50 leading-snug italic">"{artist.tagline}"</p>
                    <button className="mt-auto w-full py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold transition-all text-white group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/10 mt-4">
                        View Profile
                    </button>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
};

export default TopArtists;
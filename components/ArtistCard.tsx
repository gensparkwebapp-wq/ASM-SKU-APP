import React from 'react';
import { Artist } from '../data/artists';

interface ArtistCardProps {
  artist: Artist & { distance?: number };
  onNavigate: () => void;
  isFollowed: boolean;
  onFollowToggle: (artistId: number) => void;
}

const ArtistCard: React.FC<ArtistCardProps> = React.memo(({ artist, onNavigate, isFollowed, onFollowToggle }) => {
  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate();
  };

  const handleWhatsappClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://wa.me/${artist.whatsapp}`, '_blank', 'noreferrer');
  };

  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFollowToggle(artist.id);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="material-symbols-outlined text-[16px] filled text-yellow-400">star</span>);
    }
    if (halfStar) {
      stars.push(<span key="half" className="material-symbols-outlined text-[16px] filled text-yellow-400">star_half</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="material-symbols-outlined text-[16px] text-white/20">star</span>);
    }
    return stars;
  };
  
  return (
    <div 
      onClick={handleViewProfile}
      className="glass-card rounded-2xl p-4 flex flex-col text-center group cursor-pointer hover:border-primary/40 transition-all duration-300 animate-in fade-in zoom-in-95"
    >
      <div className="relative mb-3">
        <img
          src={artist.avatar}
          alt={artist.name}
          loading="lazy"
          className="size-28 mx-auto rounded-full object-cover border-2 border-white/10 group-hover:border-primary/50 transition-colors"
        />
      </div>
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <h3 className="text-lg font-bold text-white truncate group-hover:text-primary transition-colors">{artist.name}</h3>
        {artist.verified && (
            <span className="material-symbols-outlined text-[18px] text-blue-400 filled" title="Verified Artist">verified</span>
        )}
      </div>
      <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1 line-clamp-1">{artist.category}</p>
      <p className="text-[11px] text-white/50 mb-2 h-4 line-clamp-1">{artist.subCategory}</p>
      
      <div className="flex items-center justify-center gap-2 text-xs mb-2 h-4">
        {artist.available ? (
          <div className="flex items-center gap-1.5 text-green-400">
            <span className="size-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="font-bold">Available for booking</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-white/40">
            <span className="size-1.5 rounded-full bg-white/40"></span>
            <span>Currently booked</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-1.5 text-yellow-400 text-xs mb-2">
        <div className="flex items-center gap-0.5">{renderStars(artist.rating)}</div>
        <span className="font-bold text-white/80">{artist.rating.toFixed(1)}</span>
      </div>
      
      <div className="h-4 mb-2 flex items-center justify-center">
        {artist.distance !== undefined && (
          <div className="flex items-center gap-1 text-primary text-xs font-bold animate-in fade-in duration-300">
            <span className="material-symbols-outlined text-[14px]">near_me</span>
            <span>{`~${artist.distance.toFixed(1)} km away`}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-center gap-1 text-white/40 text-xs mb-4">
        <span className="material-symbols-outlined text-[14px]">location_on</span>
        <span>{`${artist.district}, ${artist.state}`}</span>
      </div>

      <div className="flex items-stretch justify-center gap-2 mt-auto w-full">
        <button
          onClick={handleFollowClick}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              isFollowed 
              ? 'bg-primary text-background-dark border border-primary' 
              : 'bg-white/5 border border-white/10 text-white group-hover:border-primary/50 group-hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-sm">{isFollowed ? 'check' : 'add'}</span>
          <span>{isFollowed ? 'Following' : 'Follow'}</span>
        </button>
        <button
          onClick={handleWhatsappClick}
          aria-label="Contact on WhatsApp"
          className="w-10 flex-shrink-0 bg-[#25D366]/80 hover:bg-[#25D366] text-white rounded-lg flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-lg filled">chat</span>
        </button>
      </div>
    </div>
  );
});

export default ArtistCard;
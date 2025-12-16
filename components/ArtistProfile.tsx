import React, { useState, useRef, useEffect } from 'react';
import { Artist, PortfolioItem, Post, Review } from '../data/artists';
import { ViewState } from '../App';

type ActiveTab = 'about' | 'portfolio' | 'posts' | 'reviews';
type PortfolioFilter = 'all' | 'image' | 'video' | 'audio' | 'pdf';

interface ArtistProfileProps {
  artist: Artist;
  onNavigate: (view: ViewState, data?: any) => void;
  isFollowed: boolean;
  onFollowToggle: (artistId: number) => void;
}

// --- SUB-COMPONENTS for TABS ---

const AboutTab: React.FC<{ artist: Artist }> = ({ artist }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
    <div className="lg:col-span-1 space-y-6">
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-bold text-white mb-4">Contact & Socials</h3>
        <div className="space-y-3">
          <a href={`https://wa.me/${artist.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white/80 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[18px] text-green-400">chat</span>
            <span>WhatsApp</span>
          </a>
          <a href={`mailto:${artist.email}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[18px] text-blue-400">email</span>
            <span>{artist.email}</span>
          </a>
          {Object.entries(artist.socials).map(([platform, link]) => link && (
            <a key={platform} href={link} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white/80 hover:text-primary transition-colors capitalize">
              <span className="material-symbols-outlined text-[18px]">link</span>
              <span>{platform}</span>
            </a>
          ))}
        </div>
      </div>
       <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-bold text-white mb-4">Skills & Languages</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {artist.tags.map(tag => <span key={tag} className="px-2 py-1 text-[10px] font-bold bg-white/5 border border-white/10 rounded uppercase">{tag}</span>)}
        </div>
        <div className="flex flex-wrap gap-2">
          {artist.languages.map(lang => <span key={lang} className="px-2.5 py-1 text-xs font-bold bg-primary/10 text-primary border border-primary/20 rounded-full">{lang}</span>)}
        </div>
      </div>
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-bold text-white mb-4">My Equipment</h3>
        <ul className="space-y-2">
          {artist.equipment.map(item => <li key={item} className="flex items-center gap-2 text-sm text-white/70"><span className="material-symbols-outlined text-primary text-sm">album</span>{item}</li>)}
        </ul>
      </div>
    </div>
    <div className="lg:col-span-2 glass-card p-8 rounded-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">About {artist.name}</h2>
      <p className="text-white/70 leading-relaxed whitespace-pre-wrap">{artist.bio}</p>
    </div>
  </div>
);

const PortfolioTab: React.FC<{ portfolio: PortfolioItem[], onSelectItem: (item: PortfolioItem) => void }> = ({ portfolio, onSelectItem }) => {
  const [filter, setFilter] = useState<PortfolioFilter>('all');
  const filteredPortfolio = portfolio.filter(item => filter === 'all' || item.type === filter);

  const getIconForType = (type: PortfolioItem['type']) => {
    switch (type) {
      case 'video': return 'play_arrow';
      case 'audio': return 'graphic_eq';
      case 'pdf': return 'article';
      default: return 'image';
    }
  };

  const handleItemClick = (item: PortfolioItem) => {
    if (item.type === 'pdf') {
      window.open(item.src, '_blank', 'noreferrer');
    } else {
      onSelectItem(item);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">My Work</h2>
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 overflow-x-auto hide-scrollbar">
          {(['all', 'image', 'video', 'audio', 'pdf'] as PortfolioFilter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-md text-xs font-bold capitalize transition-all ${filter === f ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      {filteredPortfolio.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredPortfolio.map(item => (
            <div key={item.id} onClick={() => handleItemClick(item)} className="group relative aspect-video rounded-lg overflow-hidden bg-surface-dark border border-border-dark cursor-pointer hover:border-primary/50 transition-all duration-300">
              <img src={item.thumb} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="size-10 rounded-full bg-primary/80 text-background-dark flex items-center justify-center">
                  <span className="material-symbols-outlined filled">{getIconForType(item.type)}</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="font-bold text-white text-sm truncate">{item.title}</h4>
              </div>
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur text-[9px] font-bold uppercase text-white/80">{item.type}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-dark rounded-xl border border-dashed border-border-dark">
          <h3 className="text-xl font-bold text-white">Portfolio is Empty</h3>
          <p className="text-white/50 mt-2">This artist hasn't added any work yet.</p>
        </div>
      )}
    </div>
  );
};

const PostsTab: React.FC<{ posts: Post[] }> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20 bg-surface-dark rounded-xl border border-dashed border-border-dark max-w-2xl mx-auto">
        <div className="size-16 rounded-full bg-black/20 flex items-center justify-center mx-auto mb-4 text-text-placeholder">
          <span className="material-symbols-outlined text-4xl">edit_note</span>
        </div>
        <h3 className="text-xl font-bold text-white">No Posts Yet</h3>
        <p className="text-white/50 mt-2">This artist hasn't shared any updates recently.</p>
      </div>
    );
  }
  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-300">
      {posts.map(post => (
        <div key={post.id} className="glass-card p-6 rounded-2xl">
          <p className="text-white/80 mb-4 whitespace-pre-wrap">{post.text}</p>
          {post.image && (
            <div className="rounded-lg overflow-hidden mb-4 border border-border-dark">
                <img src={post.image} alt="Post content" className="w-full h-auto object-cover"/>
            </div>
          )}
          <div className="flex justify-between items-center text-xs text-white/50">
            <span>{post.timestamp}</span>
            <div className="flex gap-4">
              <span>{post.likes.toLocaleString()} Likes</span>
              <span>{post.comments.toLocaleString()} Comments</span>
            </div>
          </div>
          <div className="border-t border-border-dark mt-4 pt-3 flex justify-around">
            <button className="flex items-center gap-2 text-sm font-bold text-white/60 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-base">thumb_up</span> Like
            </button>
            <button className="flex items-center gap-2 text-sm font-bold text-white/60 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-base">chat_bubble</span> Comment
            </button>
            <button className="flex items-center gap-2 text-sm font-bold text-white/60 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-base">share</span> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const ReviewsTab: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<span key={i} className={`material-symbols-outlined text-[16px] ${i < rating ? 'filled text-yellow-400' : 'text-white/20'}`}>star</span>);
        }
        return stars;
    };
    
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-20 bg-surface-dark rounded-xl border border-dashed border-border-dark max-w-2xl mx-auto">
                <div className="size-16 rounded-full bg-black/20 flex items-center justify-center mx-auto mb-4 text-text-placeholder">
                    <span className="material-symbols-outlined text-4xl">reviews</span>
                </div>
                <h3 className="text-xl font-bold text-white">No Reviews Yet</h3>
                <p className="text-white/50 mt-2">Be the first to leave a review for this artist.</p>
            </div>
        );
    }
    return (
        <div className="space-y-8 glass-card p-8 rounded-2xl animate-in fade-in duration-300 max-w-3xl mx-auto">
            {reviews.map(review => (
                <div key={review.id} className="border-b border-border-dark pb-6 last:pb-0 last:border-0">
                    <div className="flex items-start gap-4">
                        <img src={review.avatar} alt={review.author} className="size-10 rounded-full object-cover" />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h5 className="font-bold text-white">{review.author}</h5>
                                <span className="text-xs text-white/40">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-0.5 mb-2">
                                {renderStars(review.rating)}
                            </div>
                            <p className="text-sm text-white/70 leading-relaxed">{review.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


const ArtistProfile: React.FC<ArtistProfileProps> = ({ artist, onNavigate, isFollowed, onFollowToggle }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('about');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    setActiveTab('about');
  }, [artist]);
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'about': return <AboutTab artist={artist} />;
      case 'portfolio': return <PortfolioTab portfolio={artist.portfolio} onSelectItem={setSelectedItem} />;
      case 'posts': return <PostsTab posts={artist.posts} />;
      case 'reviews': return <ReviewsTab reviews={artist.reviews} />;
      default: return null;
    }
  };

  const MediaViewerModal: React.FC = () => {
    if (!selectedItem) return null;
    let content;
    switch (selectedItem.type) {
        case 'image': content = <img src={selectedItem.src} alt={selectedItem.title} className="max-w-full max-h-[80vh] object-contain rounded-lg" />; break;
        case 'video': content = <iframe src={selectedItem.src} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="w-full h-full aspect-video"></iframe>; break;
        case 'audio': content = (<div className="bg-surface-dark p-6 rounded-2xl flex flex-col items-center gap-4 border border-border-dark"><img src={selectedItem.thumb} alt={selectedItem.title} className="w-64 h-64 rounded-lg object-cover" /><h3 className="text-xl font-bold text-white">{selectedItem.title}</h3><audio controls autoPlay src={selectedItem.src} className="w-full accent-primary">Your browser does not support the audio element.</audio></div>); break;
        default: return null;
    }
    return (<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300" onClick={() => setSelectedItem(null)}><div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>{content}</div><button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"><span className="material-symbols-outlined">close</span></button></div>);
  };

  const ContactModal: React.FC = () => {
    if (!isContactModalOpen) return null;
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Message sent to ${artist.name}! (simulation)`);
        setIsContactModalOpen(false);
    };
    return (<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"><div className="bg-surface-dark border border-white/10 rounded-2xl w-full max-w-md"><div className="p-6 border-b border-white/5 flex items-center justify-between"><h3 className="text-xl font-bold text-white">Message {artist.name}</h3><button onClick={() => setIsContactModalOpen(false)}><span className="material-symbols-outlined text-white/50 hover:text-white">close</span></button></div><form onSubmit={handleSubmit} className="p-6 space-y-4"><input placeholder="Your Name" className="filter-select" /><input type="email" required placeholder="Your Email" className="filter-select" /><input placeholder="Subject" className="filter-select" /><textarea placeholder="Your Message..." rows={4} className="filter-select w-full !h-auto resize-none" required></textarea><button type="submit" className="w-full bg-primary text-background-dark font-bold py-3 rounded-xl hover:brightness-110 mt-2">Send Message</button></form></div></div>);
  }
  
  const formatCount = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <>
      <div className="w-full min-h-screen pb-20 animate-in fade-in duration-500">
        <div className="relative h-[250px] md:h-[350px] w-full bg-surface-dark"><img src={artist.banner} alt={`${artist.name}'s banner`} loading="lazy" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div></div>
        <div className="container mx-auto px-4 max-w-5xl relative">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-24 gap-4 md:gap-6 pb-6 border-b border-border-dark">
            <div className="relative size-32 md:size-48 rounded-full flex-shrink-0 border-4 border-background-dark bg-background-dark shadow-2xl"><img src={artist.avatar} alt={artist.name} loading="lazy" className="w-full h-full object-cover rounded-full" /></div>
            <div className="flex-1 flex flex-col md:flex-row items-center md:items-end justify-between w-full gap-4 text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2"><h1 className="text-3xl md:text-4xl font-bold text-white">{artist.name}</h1>{artist.verified && <span className="material-symbols-outlined text-blue-400 filled" title="Verified">verified</span>}</div>
                <p className="text-white/60 mt-1">{artist.subCategory}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm"><div className="text-white"><span className="font-bold">{formatCount(artist.followers)}</span><span className="text-white/50 ml-1">Followers</span></div><div className="text-white"><span className="font-bold">{formatCount(artist.following)}</span><span className="text-white/50 ml-1">Following</span></div></div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onNavigate('edit-profile', artist)} className="px-3 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-lg text-xs hover:bg-white/10 transition-all flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">edit</span>Edit</button>
                <a href={`https://wa.me/${artist.whatsapp}`} target="_blank" rel="noreferrer" className="px-3 py-2 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] font-bold rounded-lg text-xs hover:bg-[#25D366]/20 transition-all flex items-center gap-1.5"><span className="material-symbols-outlined filled text-sm">chat</span>WhatsApp</a>
                <button onClick={() => setIsContactModalOpen(true)} className="px-3 py-2 bg-white/10 border border-white/20 text-white font-bold rounded-lg text-xs hover:bg-white/20 transition-all">Message</button>
                <button onClick={() => onFollowToggle(artist.id)} className={`px-5 py-2 font-bold rounded-lg text-xs transition-all w-[100px] ${isFollowed ? 'bg-white/10 border border-white/20 text-white' : 'bg-primary text-background-dark'}`}>{isFollowed ? 'Following' : 'Follow'}</button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 my-6 overflow-x-auto hide-scrollbar">{(['about', 'portfolio', 'posts', 'reviews'] as ActiveTab[]).map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>{tab}</button>))}</div>
          <div className="mt-4">{renderTabContent()}</div>
        </div>
      </div>
      <MediaViewerModal />
      <ContactModal />
    </>
  );
};

export default ArtistProfile;

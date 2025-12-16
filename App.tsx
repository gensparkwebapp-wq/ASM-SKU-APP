import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrendingSection from "./components/TrendingSection";
import TopArtists from "./components/TopArtists";
import PromotionsSection from "./components/PromotionsSection";
import TrendingVideos from "./components/TrendingVideos";
import StudioBanner from "./components/StudioBanner";
import TopStudios, { Studio } from "./components/TopStudios";
import StudioDetails from "./components/StudioDetails";
import AboutPage from "./components/AboutPage";
import ArtistMomentsGallery from "./components/ArtistMomentsGallery";
import GallerySection from "./components/GallerySection";
import Footer from "./components/Footer";
import MyStudios from "./components/MyStudios";
import ArtistProfile from "./components/ArtistProfile";
import ArtistsDirectory from "./components/ArtistsDirectory";
import CategoriesPage from "./components/CategoriesPage";
import EditProfile from "./components/EditProfile";
import { Artist, artists as initialArtists } from "./data/artists";

export type ViewState = 'home' | 'about' | 'studio-details' | 'my-studios' | 'profile' | 'directory' | 'categories' | 'edit-profile';

const App: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>(initialArtists);
  const [currentView, setCurrentView] = useState<ViewState>('directory');
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(artists[0]);
  const [followedArtistIds, setFollowedArtistIds] = useState<number[]>([]);

  const handleNavigate = (view: ViewState, data?: any) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (view === 'studio-details') {
        setSelectedStudio(data as Studio);
    } else if (view === 'profile' || view === 'edit-profile') {
        const artistId = (data as Artist).id;
        const currentArtistData = artists.find(a => a.id === artistId);
        setSelectedArtist(currentArtistData || null);
        setSelectedStudio(null);
    } else {
        setSelectedStudio(null);
    }
  };
  
  const handleUpdateArtist = (updatedArtist: Artist) => {
    setArtists(prevArtists => 
      prevArtists.map(a => (a.id === updatedArtist.id ? updatedArtist : a))
    );
    setSelectedArtist(updatedArtist);
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFollowToggle = (artistId: number) => {
    const isFollowing = followedArtistIds.includes(artistId);
    
    // Update the list of followed IDs
    setFollowedArtistIds(prev => 
      isFollowing ? prev.filter(id => id !== artistId) : [...prev, artistId]
    );

    // Update the follower count for the specific artist
    setArtists(prevArtists => 
      prevArtists.map(artist => {
        if (artist.id === artistId) {
          return {
            ...artist,
            followers: isFollowing ? artist.followers - 1 : artist.followers + 1
          };
        }
        return artist;
      })
    );
  };

  const renderContent = () => {
    const isFollowingSelected = selectedArtist ? followedArtistIds.includes(selectedArtist.id) : false;
    
    switch (currentView) {
      case 'studio-details':
        return selectedStudio ? <StudioDetails studio={selectedStudio} onBack={() => handleNavigate('directory')} /> : null;
      case 'about':
        return <AboutPage />;
      case 'my-studios':
        return <MyStudios />;
      case 'profile':
        return selectedArtist ? <ArtistProfile artist={selectedArtist} onNavigate={handleNavigate} isFollowed={isFollowingSelected} onFollowToggle={handleFollowToggle} /> : null;
      case 'edit-profile':
        return selectedArtist ? <EditProfile artist={selectedArtist} onSave={handleUpdateArtist} onCancel={() => handleNavigate('profile', selectedArtist)} /> : null;
      case 'directory':
        return <ArtistsDirectory artists={artists} onNavigate={handleNavigate} followedArtistIds={followedArtistIds} onFollowToggle={handleFollowToggle} />;
      case 'categories':
        return <CategoriesPage />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <TrendingSection />
            <TopArtists artists={artists} onNavigate={handleNavigate} />
            <PromotionsSection />
            <TrendingVideos />
            <StudioBanner />
            <TopStudios onViewDetails={(studio) => handleNavigate('studio-details', studio)} />
            <ArtistMomentsGallery />
            <GallerySection />
          </>
        );
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-white font-body antialiased overflow-x-hidden selection:bg-primary selection:text-black">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
      </div>

      <Header onNavigate={handleNavigate} />

      <main className="relative z-10 flex-1 flex flex-col gap-12 sm:gap-16 md:gap-24 pb-20">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default App;

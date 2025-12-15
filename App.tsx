import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrendingSection from "./components/TrendingSection";
import FeaturedArtists from "./components/FeaturedArtists";
import PromotionsSection from "./components/PromotionsSection";
import StudioBanner from "./components/StudioBanner";
import TopStudios, { Studio } from "./components/TopStudios";
import StudioDetails from "./components/StudioDetails";
import AboutPage from "./components/AboutPage";
import GallerySection from "./components/GallerySection";
import ExploreGrid from "./components/ExploreGrid";
import Footer from "./components/Footer";
import MyStudios from "./components/MyStudios";
import ArtistProfile from "./components/ArtistProfile";

type ViewState = 'home' | 'about' | 'studio-details' | 'my-studios' | 'profile';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);

  const handleStudioSelect = (studio: Studio) => {
    setSelectedStudio(studio);
    setCurrentView('studio-details');
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (view: 'home' | 'about' | 'my-studios' | 'profile') => {
    setCurrentView(view);
    setSelectedStudio(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedStudio(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-white font-display antialiased overflow-x-hidden selection:bg-primary selection:text-background-dark">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <Navbar onNavigate={handleNavigate} />

      <main className="relative z-10 flex-1 flex flex-col gap-12 pb-20">
        {currentView === 'studio-details' && selectedStudio ? (
          <StudioDetails studio={selectedStudio} onBack={handleBackToHome} />
        ) : currentView === 'about' ? (
          <AboutPage />
        ) : currentView === 'my-studios' ? (
          <MyStudios />
        ) : currentView === 'profile' ? (
          <ArtistProfile />
        ) : (
          <>
            <Hero />
            <TrendingSection />
            <FeaturedArtists />
            <PromotionsSection />
            <StudioBanner />
            <TopStudios onViewDetails={handleStudioSelect} />
            <GallerySection />
            <ExploreGrid />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
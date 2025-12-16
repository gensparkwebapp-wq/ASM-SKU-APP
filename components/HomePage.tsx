import React from 'react';
import { ViewState } from '../App';
import { artists } from '../data/artists';
import { Studio } from './TopStudios';
import Hero from './Hero';
import TrendingSection from './TrendingSection';
import TopArtists from './TopArtists';
import TrendingVideos from './TrendingVideos';
import StudioBanner from './StudioBanner';
import ArtistMomentsGallery from './ArtistMomentsGallery';
import TopStudios from './TopStudios';
import PromotionsSection from './PromotionsSection';

interface HomePageProps {
  onNavigate: (view: ViewState, data?: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleViewStudioDetails = (studio: Studio) => {
    onNavigate('studio-details', studio);
  };

  return (
    <div className="flex flex-col gap-12 md:gap-20">
      <Hero onNavigate={onNavigate} />
      <TrendingSection />
      <TopArtists artists={artists} onNavigate={onNavigate} />
      <PromotionsSection />
      <TopStudios onViewDetails={handleViewStudioDetails} />
      <TrendingVideos />
      <StudioBanner />
      <ArtistMomentsGallery />
    </div>
  );
};

export default HomePage;
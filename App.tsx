import React, { useState, useEffect } from "react";
import { artists as initialArtists, Artist } from "./data/artists";
import { videos as initialVideos, Video } from "./data/videos";
import { mobileVideos as initialMobileVideos, MobileVideo } from "./data/mobileFeedData";
import { SocialSphereDataProvider } from "./contexts/SocialSphereDataContext";

// --- Page Components ---
// SocialSphere
import SocialSphereHeader from "./components/SocialSphereHeader";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import FeedPage from "./components/FeedPage";
import FriendsPage from "./components/FriendsPage";
import WatchPage from "./components/WatchPage";
import MarketplacePage from "./components/MarketplacePage";
import GroupsPage from "./components/GroupsPage";
import ProfilePage from "./components/ProfilePage";
import MessagesPage from "./components/MessagesPage";
import NotificationsPage from "./components/NotificationsPage";
import SettingsPage from "./components/SettingsPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import SocialMediaPage from "./components/SocialMediaPage";
import NotFoundPage from "./components/NotFoundPage";

// Sangeet Kalakar
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ArtistsDirectory from "./components/ArtistsDirectory";
import ArtistProfile from "./components/ArtistProfile";
import StudioDetails from "./components/StudioDetails";
import AboutPage from "./components/AboutPage";
import MyStudios from "./components/MyStudios";
import CategoriesPage from "./components/CategoriesPage";
import EditProfile from "./components/EditProfile";

// WeTube / StreamTube
import WetubeMobilePage from "./components/WetubeMobilePage";
import WetubePlayerPage from "./components/WetubePlayerPage";
import WetubeMobilePlayerPage from "./components/WetubeMobilePlayerPage";
import WetubeSearchPage from "./components/WetubeSearchPage";
import WetubeMobileSearchPage from "./components/WetubeMobileSearchPage";
import WetubeChannelPage from "./components/WetubeChannelPage";
import WetubeLibraryPage from "./components/WetubeLibraryPage";
import WetubeMobileLibraryPage from "./components/WetubeMobileLibraryPage";
import WetubeSubscriptionsPage from "./components/WetubeSubscriptionsPage";
import CreatorStudioMobilePage from "./components/CreatorStudioMobilePage";
import StreamTubePage from "./components/StreamTubePage";
import ShortsPage from "./components/ShortsPage";
import YTStudioPage from "./components/YTStudioPage";
import UploadPage from "./components/UploadPage";
import WetubePage from "./components/WetubePage";


// Combined ViewState type
export type ViewState =
  | 'feed' | 'friends' | 'watch' | 'marketplace' | 'groups' // SocialSphere Core
  | 'profile' | 'messages' | 'notifications' | 'settings' // SocialSphere User
  | 'login' | 'register' // Auth
  // Sangeet Kalakar
  | 'home' | 'directory' | 'about' | 'my-studios' | 'categories' | 'edit-profile' | 'studio-details'
  // WeTube / StreamTube
  | 'social' | 'wetube-mobile' | 'wetube-subscriptions' | 'wetube-library' | 'wetube-channel' | 'upload'
  | 'wetube-search' | 'wetube-player' | 'streamtube' | 'shorts'
  | 'wetube-mobile-search' | 'wetube-mobile-player' | 'wetube-mobile-library'
  | 'creator-studio-mobile' | 'yt-studio';

const getViewFromHash = (): string => {
  const hash = window.location.hash.substring(1);
  return hash || 'home'; // Default to Sangeet Kalakar home
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>(getViewFromHash());
  const [pageData, setPageData] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  
  // App-specific state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [followedArtistIds, setFollowedArtistIds] = useState<number[]>([2, 4]);
  const [artists, setArtists] = useState<Artist[]>(initialArtists);
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [mobileVideos, setMobileVideos] = useState<MobileVideo[]>(initialMobileVideos);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => setActiveView(getViewFromHash());
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: ViewState, data: any = null) => {
    if (view === activeView && data === pageData) return;
    setPageData(data);
    window.location.hash = view;
  };
  
  const handleFollowToggle = (artistId: number) => {
    setFollowedArtistIds(prev =>
      prev.includes(artistId)
        ? prev.filter(id => id !== artistId)
        : [...prev, artistId]
    );
  };
  
  const handleSaveProfile = (updatedArtist: Artist) => {
    setArtists(prev => prev.map(a => a.id === updatedArtist.id ? updatedArtist : a));
    handleNavigate('profile', updatedArtist);
  };

  const handleUploadComplete = (newVideo: Video) => {
    setVideos(prev => [newVideo, ...prev]);
    handleNavigate('yt-studio');
  };

  const renderContent = () => {
    switch (activeView) {
      // SocialSphere Core
      case 'feed': return <FeedPage />;
      case 'friends': return <FriendsPage />;
      case 'watch': return <WatchPage />;
      case 'marketplace': return <MarketplacePage />;
      case 'groups': return <GroupsPage />;
      case 'profile': return pageData && 'category' in pageData ? <ArtistProfile artist={pageData} onNavigate={handleNavigate} isFollowed={followedArtistIds.includes(pageData.id)} onFollowToggle={handleFollowToggle} /> : <ProfilePage />;
      case 'messages': return <MessagesPage />;
      case 'notifications': return <NotificationsPage />;
      case 'settings': return <SettingsPage />;
      case 'social': return <SocialMediaPage onLoginSuccess={() => {}} onNavigate={handleNavigate} />;

      // Auth
      case 'login': return <LoginPage />;
      case 'register': return <RegisterPage />;

      // Sangeet Kalakar
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'directory': return <ArtistsDirectory artists={artists} onNavigate={handleNavigate} followedArtistIds={followedArtistIds} onFollowToggle={handleFollowToggle} />;
      case 'about': return <AboutPage />;
      case 'my-studios': return <MyStudios />;
      case 'categories': return <CategoriesPage />;
      case 'edit-profile': return pageData ? <EditProfile artist={pageData} onSave={handleSaveProfile} onCancel={() => handleNavigate('profile', pageData)} /> : <NotFoundPage />;
      case 'studio-details': return pageData ? <StudioDetails studio={pageData} onBack={() => window.history.back()} /> : <NotFoundPage />;

      // WeTube / StreamTube
      case 'wetube-mobile': return <WetubeMobilePage onNavigate={handleNavigate} />;
      case 'wetube-player': return pageData ? <WetubePlayerPage video={pageData} allVideos={videos} onNavigate={handleNavigate} /> : <NotFoundPage />;
      case 'wetube-mobile-player': return pageData ? <WetubeMobilePlayerPage video={pageData} allVideos={mobileVideos} onNavigate={handleNavigate} /> : <NotFoundPage />;
      case 'wetube-search': return <WetubeSearchPage query={pageData || ''} onNavigate={handleNavigate} />;
      case 'wetube-mobile-search': return <WetubeMobileSearchPage query={pageData || ''} onNavigate={handleNavigate} />;
      case 'wetube-channel': return <WetubeChannelPage channelName={pageData || ''} onNavigate={handleNavigate} />;
      case 'wetube-library': return <WetubeLibraryPage videos={videos} onNavigate={handleNavigate} />;
      case 'wetube-mobile-library': return <WetubeMobileLibraryPage onNavigate={handleNavigate} />;
      case 'wetube-subscriptions': return <WetubeSubscriptionsPage onNavigate={handleNavigate} />;
      case 'creator-studio-mobile': return <CreatorStudioMobilePage onNavigate={handleNavigate} />;
      case 'streamtube': return <StreamTubePage onNavigate={handleNavigate} />;
      case 'shorts': return <ShortsPage onNavigate={handleNavigate} />;
      case 'yt-studio': return <YTStudioPage onNavigate={handleNavigate} />;
      case 'upload': return <UploadPage onUploadComplete={handleUploadComplete} onCancel={() => handleNavigate('yt-studio')} />;
      case 'wetube-page-temp': return <WetubePage videos={videos} onNavigate={handleNavigate} />; // Temp route for the unused component

      // Fallback
      default: return <NotFoundPage />;
    }
  };

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-dark">
        <div className="flex flex-col items-center gap-4">
            <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }
  
  const sangeetViews = ['home', 'directory', 'about', 'my-studios', 'profile', 'edit-profile', 'categories', 'studio-details'];
  const socialViews = ['feed', 'friends', 'watch', 'marketplace', 'groups', 'messages', 'notifications', 'settings', 'social'];
  const authViews = ['login', 'register'];
  
  // Fullscreen views manage their own layout
  if (!sangeetViews.includes(activeView) && !socialViews.includes(activeView) && !authViews.includes(activeView)) {
      return <div className="bg-background-dark w-full h-full">{renderContent()}</div>;
  }
  
  if (authViews.includes(activeView)) {
      return <div className="w-full min-h-screen bg-background-light dark:bg-background-dark font-body">{renderContent()}</div>;
  }

  if (sangeetViews.includes(activeView)) {
    return (
        <div className="w-full min-h-screen bg-background-dark font-display text-white selection:bg-primary selection:text-white">
            <Header isLoggedIn={isLoggedIn} onNavigate={handleNavigate} onLogout={() => setIsLoggedIn(false)} />
            <main className="pt-20">
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
  }

  // Default to SocialSphere Layout
  return (
    <SocialSphereDataProvider>
      <div className="w-full min-h-screen bg-background-light dark:bg-background-dark font-body text-black dark:text-white">
        <SocialSphereHeader activeView={activeView as ViewState} onNavigate={handleNavigate} />
        <main className="flex pt-14">
          <LeftSidebar />
          <div className="flex-1 px-4 lg:px-8 xl:px-20 py-6">
            <div className="max-w-[1280px] mx-auto">
              {renderContent()}
            </div>
          </div>
          <RightSidebar />
        </main>
      </div>
    </SocialSphereDataProvider>
  );
};

export default App;
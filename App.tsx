import React, { useState, useEffect, Suspense, lazy, useCallback } from "react";
import { artists as initialArtists, Artist } from "./data/artists";
import { DataProvider, useData } from "./contexts/DataContext";

// --- App Containers ---
const MasterHeader = lazy(() => import("./components/MasterHeader"));

// --- Artist Union Components ---
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const HomePage = lazy(() => import("./components/HomePage"));
const ArtistsDirectory = lazy(() => import("./components/ArtistsDirectory"));
const ArtistProfile = lazy(() => import("./components/ArtistProfile"));
const StudioDetails = lazy(() => import("./components/StudioDetails"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const MyStudios = lazy(() => import("./components/MyStudios"));
const CategoriesPage = lazy(() => import("./components/CategoriesPage"));
const EditProfile = lazy(() => import("./components/EditProfile"));

// --- Social Sphere Components ---
const SocialSphereHeader = lazy(() => import("./components/SocialSphereHeader"));
const LeftSidebar = lazy(() => import("./components/LeftSidebar"));
const RightSidebar = lazy(() => import("./components/RightSidebar"));
const BottomNav = lazy(() => import("./components/BottomNav"));
const FeedPage = lazy(() => import("./components/FeedPage"));
const FriendsPage = lazy(() => import("./components/FriendsPage"));
const WatchPage = lazy(() => import("./components/WatchPage"));
const MarketplacePage = lazy(() => import("./components/MarketplacePage"));
const GroupsPage = lazy(() => import("./components/GroupsPage"));
const ProfilePage = lazy(() => import("./components/ProfilePage"));
const MessagesPage = lazy(() => import("./components/MessagesPage"));
const NotificationsPage = lazy(() => import("./components/NotificationsPage"));
const SettingsPage = lazy(() => import("./components/SettingsPage"));
const LoginPage = lazy(() => import("./components/LoginPage"));
const RegisterPage = lazy(() => import("./components/RegisterPage"));

// --- WeTube Components ---
const WetubePage = lazy(() => import("./components/WetubePage"));
import { videos } from "./data/videos";
const WetubePlayerPage = lazy(() => import("./components/WetubePlayerPage"));
const WetubeSearchPage = lazy(() => import("./components/WetubeSearchPage"));
const WetubeChannelPage = lazy(() => import("./components/WetubeChannelPage"));

// --- Common Components ---
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

export type ViewState =
  | 'home' | 'directory' | 'about' | 'my-studios' | 'categories' | 'edit-profile' | 'studio-details'
  | 'feed' | 'friends' | 'watch' | 'marketplace' | 'groups' | 'settings' | 'messages' | 'notifications' | 'profile' | 'login' | 'register'
  | 'wetube' | 'wetube-player' | 'wetube-search' | 'wetube-channel' | 'wetube-subscriptions' | 'wetube-library' | 'upload'
  | 'streamtube' | 'wetube-mobile' | 'wetube-mobile-search' | 'wetube-mobile-player' | 'wetube-mobile-library' | 'shorts'
  | 'creator-studio-mobile' | 'yt-studio';

type AppName = 'artist-union' | 'social-sphere' | 'wetube';

// This is the new, simplified layout component. It only handles the UI for a logged-in user.
const SocialSphereLayout: React.FC<{ 
    activeView: ViewState; 
    handleNavigate: (view: ViewState, data?: any) => void;
}> = ({ activeView, handleNavigate }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const renderMainContent = () => {
        switch(activeView) {
            case 'feed': return <FeedPage />;
            case 'friends': return <FriendsPage />;
            case 'watch': return <WatchPage />;
            case 'marketplace': return <MarketplacePage />;
            case 'groups': return <GroupsPage />;
            case 'profile': return <ProfilePage />;
            case 'messages': return <MessagesPage />;
            case 'notifications': return <NotificationsPage />;
            case 'settings': return <SettingsPage />;
            default: return <FeedPage />; // Default to feed if view is unknown but logged in
        }
    };
    
    return (
        <div className="relative min-h-screen bg-background-dark font-body text-e4e6eb selection:bg-primary-blue selection:text-white">
            <div className={`fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-72 h-full bg-surface-dark shadow-lg" onClick={(e) => e.stopPropagation()}>
                    <LeftSidebar />
                </div>
            </div>
            <SocialSphereHeader activeView={activeView} onNavigate={handleNavigate} onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />
            <div className="pt-14 flex">
                <div className="hidden lg:block w-[360px] shrink-0"><LeftSidebar /></div>
                <main className="flex-1 px-2 sm:px-4 py-6">
                    {renderMainContent()}
                </main>
                <div className="hidden lg:block w-[360px] shrink-0"><RightSidebar /></div>
            </div>
            <BottomNav activeView={activeView} onNavigate={handleNavigate} />
        </div>
    );
};


const App: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppName>('social-sphere');
  const [activeView, setActiveView] = useState<string>(window.location.hash.substring(1) || 'feed');
  const [pageData, setPageData] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  // Artist Union State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [followedArtistIds, setFollowedArtistIds] = useState<number[]>([2, 4]);
  const [artists, setArtists] = useState<Artist[]>(initialArtists);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAppChange = (app: AppName) => {
    setActiveApp(app);
    if (app === 'artist-union') window.location.hash = 'home';
    if (app === 'social-sphere') window.location.hash = 'feed';
    if (app === 'wetube') window.location.hash = 'wetube';
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const view = hash.split('/')[0];
      setActiveView(view || (activeApp === 'artist-union' ? 'home' : 'feed'));
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeApp]);
  
  const handleNavigate = useCallback( (view: ViewState, data: any = null) => {
      setPageData(data);
      window.location.hash = view;
    }, []);

  // --- Artist Union Logic ---
  const handleFollowToggle = useCallback((artistId: number) => {
    setFollowedArtistIds(prev => prev.includes(artistId) ? prev.filter(id => id !== artistId) : [...prev, artistId]);
  }, []);
  const handleSaveProfile = useCallback((updatedArtist: Artist) => {
    setArtists(prev => prev.map(a => a.id === updatedArtist.id ? updatedArtist : a));
    handleNavigate('profile', updatedArtist);
  }, [handleNavigate]);
  
  // --- Social Sphere Auth Wrapper ---
  const SocialSphereAuthWrapper: React.FC = () => {
      const { state } = useData();
      const { currentUser } = state;

      const privateViews: ViewState[] = ['feed', 'friends', 'watch', 'marketplace', 'groups', 'profile', 'messages', 'notifications', 'settings'];
      const publicViews: ViewState[] = ['login', 'register'];

      // If user is LOGGED IN
      if (currentUser) {
          // and trying to access a public page, redirect to feed
          if (publicViews.includes(activeView as ViewState)) {
              useEffect(() => { handleNavigate('feed'); }, [activeView]);
              return <div className="min-h-screen bg-background-dark" />; // Render blank while redirecting
          }
          // otherwise, show the main app layout
          return <SocialSphereLayout activeView={activeView as ViewState} handleNavigate={handleNavigate} />;
      } 
      // If user is NOT LOGGED IN
      else {
          // and trying to access a private page, redirect to login
          if (privateViews.includes(activeView as ViewState)) {
              useEffect(() => { handleNavigate('login'); }, [activeView]);
              return <div className="min-h-screen bg-background-dark" />; // Render blank while redirecting
          }

          // otherwise, show the correct public page
          switch(activeView) {
              case 'register':
                  return <RegisterPage onNavigate={handleNavigate} />;
              case 'login':
              default:
                  return <LoginPage onNavigate={handleNavigate} />;
          }
      }
  };


  // --- RENDER FUNCTIONS ---
  const renderArtistUnion = () => {
    const renderContent = () => {
      switch (activeView) {
        case 'home': return <HomePage onNavigate={handleNavigate} />;
        case 'directory': return <ArtistsDirectory artists={artists} onNavigate={handleNavigate} followedArtistIds={followedArtistIds} onFollowToggle={handleFollowToggle} />;
        case 'about': return <AboutPage />;
        case 'my-studios': return <MyStudios />;
        case 'categories': return <CategoriesPage />;
        case 'profile': return pageData && 'category' in pageData ? <ArtistProfile artist={pageData} onNavigate={handleNavigate} isFollowed={followedArtistIds.includes(pageData.id)} onFollowToggle={handleFollowToggle} /> : <NotFoundPage />;
        case 'edit-profile': return pageData ? <EditProfile artist={pageData} onSave={handleSaveProfile} onCancel={() => handleNavigate('profile', pageData)} /> : <NotFoundPage />;
        case 'studio-details': return pageData ? <StudioDetails studio={pageData} onBack={() => window.history.back()} /> : <NotFoundPage />;
        default: return <NotFoundPage />;
      }
    };
    return (
      <div className="w-full min-h-screen bg-background-dark font-display text-white selection:bg-primary selection:text-white">
        <Header isLoggedIn={isLoggedIn} onNavigate={handleNavigate} onLogout={() => setIsLoggedIn(false)} />
        <main className="pt-20">{renderContent()}</main>
        {activeView === 'home' && <Footer />}
      </div>
    );
  };

  const renderSocialSphere = () => {
    return (
      <DataProvider>
          <SocialSphereAuthWrapper />
      </DataProvider>
    );
  };
  
  const renderWeTube = () => {
    switch (activeView) {
        case 'wetube': return <WetubePage videos={videos} onNavigate={handleNavigate} />;
        case 'wetube-player': return pageData ? <WetubePlayerPage video={pageData} allVideos={videos} onNavigate={handleNavigate} /> : <NotFoundPage />;
        case 'wetube-search': return <WetubeSearchPage query={pageData || ''} onNavigate={handleNavigate} />;
        case 'wetube-channel': return <WetubeChannelPage channelName={pageData || ''} onNavigate={handleNavigate} />;
        default: return <WetubePage videos={videos} onNavigate={handleNavigate} />;
    }
  };

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'artist-union': return renderArtistUnion();
      case 'social-sphere': return renderSocialSphere();
      case 'wetube': return renderWeTube();
      default: return <NotFoundPage />;
    }
  };

  const loadingFallback = (
    <div className="flex items-center justify-center min-h-screen bg-background-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold">Loading AppSuite...</p>
      </div>
    </div>
  );

  if (!isReady) {
    return loadingFallback;
  }

  return (
    <Suspense fallback={loadingFallback}>
      <MasterHeader activeApp={activeApp} onAppChange={handleAppChange} />
      {renderActiveApp()}
    </Suspense>
  );
};

export default App;
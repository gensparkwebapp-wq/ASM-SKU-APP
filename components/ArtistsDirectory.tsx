import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ArtistCard from './ArtistCard';
import { Artist } from '../data/artists';
import { ViewState } from '../App';
import Filters, { FilterState } from './Filters';

interface ArtistsDirectoryProps {
  artists: Artist[];
  onNavigate: (view: ViewState, data?: any) => void;
  followedArtistIds: number[];
  onFollowToggle: (artistId: number) => void;
}

// Haversine formula to calculate distance between two lat/lon points in km
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

type SortByType = 'rating' | 'name' | 'verified' | 'nearest';
const ITEMS_PER_PAGE = 12;

const ArtistsDirectory: React.FC<ArtistsDirectoryProps> = ({ artists: allArtists, onNavigate, followedArtistIds, onFollowToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);
  const [filteredArtists, setFilteredArtists] = useState<(Artist & { distance?: number })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortByType>('rating');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Location state
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number, lon: number } | null>(null);
  const [distanceRadius, setDistanceRadius] = useState(100);


  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1); // Reset page whenever filters change

    const timer = setTimeout(() => {
      let results: (Artist & { distance?: number })[] = [...allArtists];

      // 1. Filter by location first if available
      if (userCoords) {
        results = results
          .map(artist => {
            const distance = getDistance(userCoords.lat, userCoords.lon, artist.latitude, artist.longitude);
            return { ...artist, distance };
          })
          .filter(artist => artist.distance <= distanceRadius);
      }
      
      // 2. Filter by search query
      const lowercasedQuery = searchQuery.toLowerCase().trim();
      if (lowercasedQuery) {
        results = results.filter(artist =>
          artist.name.toLowerCase().includes(lowercasedQuery) ||
          artist.category.toLowerCase().includes(lowercasedQuery) ||
          artist.subCategory.toLowerCase().includes(lowercasedQuery) ||
          artist.location.toLowerCase().includes(lowercasedQuery)
        );
      }

      // 3. Filter by active filters from the Filters component
      if (activeFilters) {
        // Basic Filters
        if (activeFilters.category) results = results.filter(artist => artist.category === activeFilters.category);
        if (activeFilters.subCategory) results = results.filter(artist => artist.subCategory === activeFilters.subCategory);
        if (activeFilters.state) results = results.filter(artist => artist.state === activeFilters.state);
        if (activeFilters.district) results = results.filter(artist => artist.district === activeFilters.district);
        if (activeFilters.pincode) results = results.filter(artist => artist.pincode.startsWith(activeFilters.pincode));
        
        // Advanced Filters
        if (activeFilters.maxPrice < 5001) results = results.filter(artist => artist.price <= activeFilters.maxPrice);
        if (activeFilters.isAvailable) results = results.filter(artist => artist.available);
        if (activeFilters.experience) results = results.filter(artist => artist.experience === activeFilters.experience);
        if (activeFilters.languages.length > 0) {
          results = results.filter(artist => 
            activeFilters.languages.some(lang => artist.languages.includes(lang))
          );
        }
      }

      // 4. Sort the results
      const sortedResults = [...results].sort((a, b) => {
        switch (sortBy) {
          case 'nearest':
            return (a.distance ?? Infinity) - (b.distance ?? Infinity);
          case 'name':
            return a.name.localeCompare(b.name);
          case 'verified':
            if (b.verified !== a.verified) {
              return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
            }
            return b.rating - a.rating; // Secondary sort by rating
          case 'rating':
          default:
            return b.rating - a.rating;
        }
      });
      
      setFilteredArtists(sortedResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);

  }, [searchQuery, activeFilters, userCoords, distanceRadius, sortBy, allArtists]);

  const artistsToDisplay = filteredArtists.slice(0, currentPage * ITEMS_PER_PAGE);

  const handleApplyFilters = (filters: FilterState) => {
    setUserCoords(null); // Applying manual filters resets location search
    setLocationMessage(null);
    setActiveFilters(filters);
    setDistanceRadius(100);
    setSortBy('rating');
  };
  
  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilters(null);
    setUserCoords(null);
    setLocationMessage(null);
    setDistanceRadius(100);
    setSortBy('rating');
  };

  const handleNearMeClick = () => {
    setIsFetchingLocation(true);
    setLocationMessage(null);
    setSearchQuery('');
    setActiveFilters(null);
    setDistanceRadius(100);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsFetchingLocation(false);
        setLocationMessage('Location access granted. Showing artists nearby.');
        setSortBy('nearest');
        setUserCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        setIsFetchingLocation(false);
        setLocationMessage('Location permission denied. Please enable location access in your browser settings.');
        setUserCoords(null);
        console.error("Geolocation error:", error);
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Artist Directory
        </h1>
        <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
          Discover and connect with talented artists from across the nation. Use the search and filters below to find exactly who you're looking for.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start mb-8">
        <div className="md:col-span-2">
           <SearchBar onSearch={setSearchQuery} />
        </div>
        <button
          onClick={handleNearMeClick}
          disabled={isFetchingLocation}
          className="w-full h-14 flex items-center justify-center gap-2 px-6 bg-white/5 border-2 border-border-dark rounded-full text-white font-bold hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-wait"
        >
          {isFetchingLocation ? (
            <>
              <div className="size-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span>Getting Location...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">my_location</span>
              <span>Find Artists Near Me</span>
            </>
          )}
        </button>
      </div>
      
      {locationMessage && (
        <div className={`text-center py-2 px-4 rounded-lg text-sm mb-6 ${locationMessage.includes('denied') ? 'bg-red-500/10 text-red-400' : 'bg-primary/10 text-primary'}`}>
          {locationMessage}
        </div>
      )}
      
      {userCoords && (
        <div className="my-6 p-4 bg-surface-dark rounded-xl border border-border-dark animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="distance-slider" className="text-sm font-bold text-white/80">Distance Radius</label>
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-bold border border-primary/20">{distanceRadius} km</span>
          </div>
          <input
            id="distance-slider"
            type="range"
            min="5"
            max="100"
            step="5"
            value={distanceRadius}
            onChange={(e) => setDistanceRadius(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      )}
      
      <Filters onApply={handleApplyFilters} onReset={handleResetFilters} />
      
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 px-2 gap-4">
          <h3 className="text-lg font-bold text-white/80">
            {isLoading ? 'Searching...' : `${filteredArtists.length} Artists Found`}
          </h3>
          <div className="relative">
            <label htmlFor="sort-by" className="sr-only">Sort by</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortByType)}
              className="filter-select !h-10 !py-0 !pl-4 !pr-10 text-xs appearance-none"
            >
              {userCoords && <option value="nearest">Nearest first</option>}
              <option value="rating">Highest rated</option>
              <option value="name">Name (A-Z)</option>
              <option value="verified">Verified first</option>
            </select>
            <span className="material-symbols-outlined text-white/40 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-base">
              expand_more
            </span>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="ad-loader"></div>
          </div>
        ) : artistsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artistsToDisplay.map(artist => (
              <ArtistCard 
                key={artist.id} 
                artist={artist} 
                onNavigate={() => onNavigate('profile', artist)}
                isFollowed={followedArtistIds.includes(artist.id)}
                onFollowToggle={onFollowToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-dark rounded-xl border border-dashed border-border-dark">
            <div className="size-16 rounded-full bg-black/20 flex items-center justify-center mx-auto mb-4 text-text-placeholder">
              <span className="material-symbols-outlined text-4xl">person_off</span>
            </div>
            <h3 className="text-xl font-bold text-white">No Artists Found</h3>
            <p className="text-white/50 mt-2 max-w-xs mx-auto">Try adjusting your search or filter criteria to find what you're looking for.</p>
          </div>
        )}

        {filteredArtists.length > artistsToDisplay.length && !isLoading && (
          <div className="mt-12 text-center">
            <button
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-8 py-3 bg-primary text-background-dark font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/20"
            >
                Load More Artists
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistsDirectory;

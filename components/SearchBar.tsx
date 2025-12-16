import React, { useState, useEffect, useRef } from 'react';
import { artists, categories, locations } from '../data/artists';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const suggestedArtists = query ? artists.filter(artist => 
    artist.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3) : [];

  const suggestedCategories = query ? categories.filter(category =>
    category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2) : [];

  const suggestedLocations = query ? Array.from(new Set(artists.map(a => `${a.district}, ${a.state}`)))
    .filter(location => location.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 2) : [];

  const showSuggestions = query.length > 0 && isFocused;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
  };
  
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };
  
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchContainerRef}>
      <form onSubmit={(e) => { e.preventDefault(); setIsFocused(false); onSearch(query); }}>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-text-placeholder">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            onFocus={() => setIsFocused(true)}
            placeholder="Search by name, category, or location..."
            className="w-full h-14 pl-12 pr-12 rounded-full bg-surface-dark border-2 border-border-dark focus:border-primary focus:ring-2 focus:ring-primary/50 text-white placeholder-text-placeholder transition-all duration-300"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-placeholder hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
      </form>
      
      {showSuggestions && (
        <div className="absolute top-full mt-2 w-full bg-surface-dark border border-border-dark rounded-xl shadow-2xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-[60vh] overflow-y-auto hide-scrollbar">
            {suggestedArtists.length > 0 && (
              <div>
                <h3 className="px-4 py-2 text-xs font-bold text-primary uppercase tracking-wider">Artists</h3>
                <ul>
                  {suggestedArtists.map(artist => (
                    <li key={`artist-${artist.id}`} onClick={() => handleSelectSuggestion(artist.name)} className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-white/5 transition-colors">
                      <img src={artist.avatar} alt={artist.name} className="size-8 rounded-full object-cover" />
                      <span className="text-white text-sm">{artist.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {suggestedCategories.length > 0 && (
              <div>
                <h3 className="px-4 pt-3 pb-2 text-xs font-bold text-primary uppercase tracking-wider border-t border-border-dark">Categories</h3>
                <ul>
                  {suggestedCategories.map(cat => (
                    <li key={`cat-${cat}`} onClick={() => handleSelectSuggestion(cat)} className="px-4 py-2.5 cursor-pointer hover:bg-white/5 text-white/80 text-sm transition-colors">{cat}</li>
                  ))}
                </ul>
              </div>
            )}
             {suggestedLocations.length > 0 && (
              <div>
                <h3 className="px-4 pt-3 pb-2 text-xs font-bold text-primary uppercase tracking-wider border-t border-border-dark">Locations</h3>
                <ul>
                  {suggestedLocations.map(loc => (
                    <li key={`loc-${loc}`} onClick={() => handleSelectSuggestion(loc)} className="px-4 py-2.5 cursor-pointer hover:bg-white/5 text-white/80 text-sm transition-colors">{loc}</li>
                  ))}
                </ul>
              </div>
            )}
            {suggestedArtists.length === 0 && suggestedCategories.length === 0 && suggestedLocations.length === 0 && (
                <div className="p-6 text-center text-text-placeholder text-sm">No results found for "{query}"</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../data/artists';
import { indianStates } from '../data/locations';

// --- CUSTOM SELECT COMPONENT ---
interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder = 'Select an option', disabled = false, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
    } else {
        setSearchQuery(''); // Reset search when dropdown closes
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={selectRef}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="filter-select w-full flex items-center justify-between text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedOption ? 'text-white/80' : 'text-text-placeholder'}>
          {selectedOption?.label || placeholder}
        </span>
        <span 
            className="material-symbols-outlined text-white/50 transition-transform duration-200"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
            expand_more
        </span>
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full mt-1.5 w-full bg-surface-dark border border-border-dark rounded-lg shadow-2xl z-50 flex flex-col animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2 border-b border-border-dark">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-white/40">
                <span className="material-symbols-outlined text-sm">search</span>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Search..."
                className="w-full h-8 pl-8 pr-2 rounded bg-background-dark border border-transparent text-white/80 text-xs focus:border-primary focus:ring-0"
                autoFocus
              />
            </div>
          </div>
          <ul role="listbox" className="max-h-52 overflow-y-auto hide-scrollbar">
            {placeholder && !options.some(opt => opt.value === '') && !searchQuery && (
                 <li 
                    onClick={() => handleSelect('')}
                    className="px-4 py-2.5 text-sm text-text-placeholder custom-select-option cursor-pointer transition-colors"
                    role="option"
                >
                    {placeholder}
                </li>
            )}
            {filteredOptions.length > 0 ? filteredOptions.map(option => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2.5 text-sm custom-select-option cursor-pointer transition-colors ${value === option.value ? 'bg-primary/10 text-primary font-bold' : 'text-white/80'}`}
                role="option"
                aria-selected={value === option.value}
              >
                {option.label}
              </li>
            )) : (
              <li className="px-4 py-2.5 text-sm text-text-placeholder text-center italic">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};


// --- FILTERS COMPONENT ---
export interface FilterState {
  category: string;
  subCategory: string;
  state: string;
  district: string;
  pincode: string;
  maxPrice: number;
  isAvailable: boolean;
  languages: string[];
  experience: string;
}

interface FiltersProps {
  onApply: (filters: FilterState) => void;
  onReset: () => void;
}

const LANGUAGES = ['Hindi', 'English', 'Regional'];
const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Expert'];
const MAX_PRICE = 5001; // Use 5001 to show 5000+

const Filters: React.FC<FiltersProps> = ({ onApply, onReset }) => {
  // Basic filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [pincode, setPincode] = useState('');

  // Advanced filters
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState('');

  // Derived state for dropdowns
  const [subCategoryOptions, setSubCategoryOptions] = useState<string[]>([]);
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCategory && CATEGORIES[selectedCategory]) {
      setSubCategoryOptions(CATEGORIES[selectedCategory]);
      setSelectedSubCategory('');
    } else {
      setSubCategoryOptions([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedState && indianStates[selectedState]) {
      setDistrictOptions(indianStates[selectedState]);
      setSelectedDistrict('');
    } else {
      setDistrictOptions([]);
    }
  }, [selectedState]);

  const handleApplyClick = () => {
    onApply({
      category: selectedCategory,
      subCategory: selectedSubCategory,
      state: selectedState,
      district: selectedDistrict,
      pincode,
      maxPrice,
      isAvailable,
      languages: selectedLanguages,
      experience: selectedExperience,
    });
  };

  const handleResetClick = () => {
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedState('');
    setSelectedDistrict('');
    setPincode('');
    setMaxPrice(MAX_PRICE);
    setIsAvailable(false);
    setSelectedLanguages([]);
    setSelectedExperience('');
    onReset();
  };
  
  const handleLanguageChange = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const activeFilterCount = [selectedCategory, selectedSubCategory, selectedState, selectedDistrict, pincode, selectedExperience].filter(Boolean).length + (isAvailable ? 1 : 0) + selectedLanguages.length + (maxPrice < MAX_PRICE ? 1 : 0);

  const categoryOptions = Object.keys(CATEGORIES).map(cat => ({ value: cat, label: cat }));
  const subCategoryOptionsForSelect = subCategoryOptions.map(sub => ({ value: sub, label: sub }));
  const stateOptions = Object.keys(indianStates).map(st => ({ value: st, label: st }));
  const districtOptionsForSelect = districtOptions.map(dist => ({ value: dist, label: dist }));

  return (
    <div className="w-full bg-surface-dark border border-border-dark rounded-xl">
      <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <label htmlFor="category-filter" className="block text-xs font-bold text-white/50 uppercase mb-2">Category</label>
              <CustomSelect id="category-filter" value={selectedCategory} onChange={setSelectedCategory} options={categoryOptions} placeholder="All Categories"/>
            </div>
            <div>
              <label htmlFor="subcategory-filter" className="block text-xs font-bold text-white/50 uppercase mb-2">Sub-Category</label>
              <CustomSelect id="subcategory-filter" value={selectedSubCategory} onChange={setSelectedSubCategory} options={subCategoryOptionsForSelect} placeholder="All Sub-categories" disabled={!selectedCategory}/>
            </div>
            <div>
              <label htmlFor="state-filter" className="block text-xs font-bold text-white/50 uppercase mb-2">State</label>
              <CustomSelect id="state-filter" value={selectedState} onChange={setSelectedState} options={stateOptions} placeholder="All States"/>
            </div>
            <div>
              <label htmlFor="district-filter" className="block text-xs font-bold text-white/50 uppercase mb-2">District</label>
              <CustomSelect id="district-filter" value={selectedDistrict} onChange={setSelectedDistrict} options={districtOptionsForSelect} placeholder="All Districts" disabled={!selectedState}/>
            </div>
            <div>
              <label htmlFor="pincode-filter" className="block text-xs font-bold text-white/50 uppercase mb-2">Pincode</label>
              <input id="pincode-filter" type="text" value={pincode} onChange={(e) => { const val = e.target.value.replace(/\D/g, ''); if (val.length <= 6) { setPincode(val); } }} maxLength={6} placeholder="Enter pincode" className="filter-select"/>
            </div>
          </div>
          
          {/* Advanced Filters Section */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showAdvanced ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pt-6 mt-6 border-t border-border-dark grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="price-range" className="block text-xs font-bold text-white/50 uppercase">Price Range</label>
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                    {maxPrice >= MAX_PRICE ? `₹${(MAX_PRICE-1).toLocaleString()}+` : `Up to ₹${maxPrice.toLocaleString()}`}
                  </span>
                </div>
                <input id="price-range" type="range" min="500" max={MAX_PRICE} step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"/>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase mb-3">Language</label>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {LANGUAGES.map(lang => (
                    <label key={lang} className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                      <input type="checkbox" checked={selectedLanguages.includes(lang)} onChange={() => handleLanguageChange(lang)} className="size-4 rounded bg-white/10 border-white/20 text-primary focus:ring-primary/50 focus:ring-offset-surface-dark"/>
                      {lang}
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase mb-3">Experience</label>
                <div className="flex items-center bg-white/5 p-1 rounded-lg border border-white/10 w-full">
                  {EXPERIENCE_LEVELS.map(level => (
                    <button key={level} onClick={() => setSelectedExperience(level)} className={`flex-1 text-center text-xs font-bold py-1.5 rounded transition-colors ${selectedExperience === level ? 'bg-white/10 text-white shadow' : 'text-white/50 hover:text-white'}`}>
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-4">
               <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-base">{showAdvanced ? 'unfold_less' : 'tune'}</span>
                  {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
               </button>
               {activeFilterCount > 0 && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span className="font-bold">{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <label htmlFor="availability-toggle" className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" id="availability-toggle" className="sr-only" checked={isAvailable} onChange={() => setIsAvailable(!isAvailable)} />
                    <div className="block bg-white/10 w-10 h-5 rounded-full border border-transparent group-hover:border-white/20 transition"></div>
                    <div className={`dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${isAvailable ? 'translate-x-5 bg-primary' : ''}`}></div>
                  </div>
                  <div className="ml-2 text-sm font-bold text-white/80">Available Now</div>
                </label>
                <button onClick={handleResetClick} className="w-full sm:w-auto text-center text-sm font-bold text-white/60 hover:text-white transition-colors">Reset</button>
                <button onClick={handleApplyClick} className="w-full sm:w-auto px-8 py-3 bg-primary text-background-dark font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                  Apply Filters
                </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Filters;
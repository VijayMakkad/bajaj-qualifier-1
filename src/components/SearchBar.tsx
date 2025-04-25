import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Doctor } from '../types/types';
import { getAutocompleteSuggestions } from '../utils/filterUtils';

interface SearchBarProps {
  doctors: Doctor[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar = ({ doctors, searchQuery, onSearchChange }: SearchBarProps) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (searchQuery) {
      const newSuggestions = getAutocompleteSuggestions(doctors, searchQuery);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, doctors]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
  };
  
  const handleSuggestionClick = (doctorName: string) => {
    onSearchChange(doctorName);
    setShowSuggestions(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    // The search is already updated via the onChange handler
  };

  const clearSearch = () => {
    onSearchChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex w-full">
        <div className="relative flex-grow">
          <input
            ref={inputRef}
            type="text"
            data-testid="autocomplete-input"
            className="block w-full py-4 px-4 pl-12 border-2 border-blue-300 rounded-l-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 shadow-sm"
            placeholder="Search Doctors, Specialists, Symptoms or Clinics..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery && suggestions.length > 0 && setShowSuggestions(true)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-blue-500" />
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm font-medium"
        >
          Search
        </button>
      </form>
      
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto"
        >
          <ul className="py-1">
            {suggestions.map((doctor) => (
              <li 
                key={doctor.id}
                data-testid="suggestion-item"
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => handleSuggestionClick(doctor.name)}
              >
                <div className="flex items-center">
                  <Search className="h-4 w-4 text-blue-500 mr-2" />
                  <div>
                    <div className="font-medium text-gray-800">{doctor.name}</div>
                    {doctor.specialty && doctor.specialty.length > 0 && (
                      <div className="text-xs text-gray-500">{doctor.specialty[0]}</div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
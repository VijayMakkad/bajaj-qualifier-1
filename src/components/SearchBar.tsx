import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
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

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex w-full">
        <div className="relative flex-grow">
          <input
            ref={inputRef}
            type="text"
            data-testid="autocomplete-input"
            className="block w-full py-3 px-4 pl-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Symptoms, Doctors, Specialists, Clinics"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery && suggestions.length > 0 && setShowSuggestions(true)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 ml-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
      
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <ul className="py-1">
            {suggestions.map((doctor) => (
              <li 
                key={doctor.id}
                data-testid="suggestion-item"
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(doctor.name)}
              >
                {doctor.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
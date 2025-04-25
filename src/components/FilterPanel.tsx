import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { ConsultationType, SortOption } from '../types/types';

interface FilterPanelProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationType: ConsultationType;
  sortBy: SortOption;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationTypeChange: (type: ConsultationType) => void;
  onSortChange: (sortOption: SortOption) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    specialties: true,
    consultationType: true,
  });
  
  const [specialtySearch, setSpecialtySearch] = useState('');

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderChevron = (section: keyof typeof expandedSections) => {
    return expandedSections[section] ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };
  
  const filteredSpecialties = specialties.filter(specialty => 
    specialty.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden max-h-screen">
      {/* Sort By Section */}
      <div className="border-b">
        <div 
          className="flex justify-between items-center cursor-pointer p-4"
          onClick={() => toggleSection('sort')}
        >
          <h3 
            data-testid="filter-header-sort"
            className="font-medium text-gray-800"
          >
            Sort by
          </h3>
          {renderChevron('sort')}
        </div>
        
        {expandedSections.sort && (
          <div className="px-4 pb-4 space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="sort-fees"
                data-testid="sort-fees"
                name="sort-by"
                checked={sortBy === 'fees'}
                onChange={() => onSortChange('fees')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="sort-fees"
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                Price: Low-High
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="sort-experience"
                data-testid="sort-experience"
                name="sort-by"
                checked={sortBy === 'experience'}
                onChange={() => onSortChange('experience')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="sort-experience"
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                Experience: Most Experience first
              </label>
            </div>
          </div>
        )}
      </div>
      
      {/* Filters Title */}
      <div className="px-4 py-3 border-b flex justify-between">
        <h3 className="font-medium text-gray-800">Filters</h3>
        <button 
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={() => {
            onSortChange('');
            onConsultationTypeChange('');
            selectedSpecialties.forEach(s => onSpecialtyChange(s));
          }}
        >
          Clear All
        </button>
      </div>
      
      {/* Specialties Section */}
      <div className="border-b">
        <div 
          className="flex justify-between items-center cursor-pointer p-4"
          onClick={() => toggleSection('specialties')}
        >
          <h3 
            data-testid="filter-header-speciality"
            className="font-medium text-gray-800"
          >
            Specialities
          </h3>
          {renderChevron('specialties')}
        </div>
        
        {expandedSections.specialties && (
          <div className="px-4 pb-4">
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                placeholder="Search Specialties"
                value={specialtySearch}
                onChange={(e) => setSpecialtySearch(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {filteredSpecialties.map(specialty => (
                <div key={specialty} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`specialty-${specialty}`}
                    data-testid={`filter-specialty-${specialty}`}
                    checked={selectedSpecialties.includes(specialty)}
                    onChange={() => onSpecialtyChange(specialty)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`specialty-${specialty}`}
                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                  >
                    {specialty}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Consultation Type Section - Fixed to ensure visibility */}
      <div className="pb-1"> 
        <div 
          className="flex justify-between items-center cursor-pointer p-4"
          onClick={() => toggleSection('consultationType')}
        >
          <h3 
            data-testid="filter-header-moc"
            className="font-medium text-gray-800"
          >
            Mode of consultation
          </h3>
          {renderChevron('consultationType')}
        </div>
        
        {expandedSections.consultationType && (
          <div className="px-4 pb-4 space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="video-consult"
                data-testid="filter-video-consult"
                name="consultation-type"
                checked={consultationType === 'Video Consult'}
                onChange={() => onConsultationTypeChange('Video Consult')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="video-consult"
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                Video Consultation
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="in-clinic"
                data-testid="filter-in-clinic"
                name="consultation-type"
                checked={consultationType === 'In Clinic'}
                onChange={() => onConsultationTypeChange('In Clinic')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="in-clinic"
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                In-clinic Consultation
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="all-consult"
                name="consultation-type"
                checked={consultationType === ''}
                onChange={() => onConsultationTypeChange('')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="all-consult"
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                All
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
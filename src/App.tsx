import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { useDoctorData } from './hooks/useDoctorData';
import { useQueryParams } from './hooks/useQueryParams';
import { getUniqueSpecialties } from './utils/filterUtils';
import { ConsultationType, SortOption } from './types/types';

function AppContent() {
  const { doctors, isLoading, error } = useDoctorData();
  const { filters, updateFilters } = useQueryParams();

  // Handle loading state
  if (isLoading || !doctors) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded w-full max-w-md"></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-lg max-w-md">
          <h3 className="font-medium mb-2">Error loading doctors</h3>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  // Only call after ensuring doctors is available
  const specialties = getUniqueSpecialties(doctors);

  const handleSearchChange = (query: string) => {
    updateFilters({ searchQuery: query });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const updatedSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];

    updateFilters({ specialties: updatedSpecialties });
  };

  const handleConsultationTypeChange = (type: ConsultationType) => {
    updateFilters({ consultationType: type });
  };

  const handleSortChange = (sortOption: SortOption) => {
    updateFilters({ sortBy: sortOption });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-blue-600 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl mx-auto">
            <SearchBar
              doctors={doctors}
              searchQuery={filters.searchQuery}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <FilterPanel
              specialties={specialties}
              selectedSpecialties={filters.specialties}
              consultationType={filters.consultationType}
              sortBy={filters.sortBy}
              onSpecialtyChange={handleSpecialtyChange}
              onConsultationTypeChange={handleConsultationTypeChange}
              onSortChange={handleSortChange}
            />
          </div>

          <div className="col-span-12 lg:col-span-9">
            <DoctorList
              doctors={doctors}
              searchQuery={filters.searchQuery}
              consultationType={filters.consultationType}
              specialties={filters.specialties}
              sortBy={filters.sortBy}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
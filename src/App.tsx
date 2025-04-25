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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-blue-200 rounded-full w-64 mb-6"></div>
          <div className="h-40 bg-blue-100 rounded-lg w-full max-w-md"></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="bg-red-50 text-red-700 p-8 rounded-xl max-w-md shadow-lg border border-red-200">
          <h3 className="font-bold text-xl mb-4">Error Loading Doctors</h3>
          <p className="text-red-600">{error.message}</p>
          <button 
            className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 py-6 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h1 className="text-white text-2xl font-bold mb-4">Find Your Doctor</h1>
            <div className="w-full max-w-2xl mx-auto">
              <SearchBar
                doctors={doctors}
                searchQuery={filters.searchQuery}
                onSearchChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-8">
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

      <footer className="bg-blue-800 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Doctor Finder. All rights reserved.</p>
        </div>
      </footer>
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
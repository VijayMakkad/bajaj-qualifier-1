import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConsultationType, SortOption } from '../types/types';

interface FilterState {
  searchQuery: string;
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: SortOption;
}

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: searchParams.get('search') || '',
    consultationType: (searchParams.get('consult') || '') as ConsultationType,
    specialties: searchParams.get('specialties')?.split(',').filter(Boolean) || [],
    sortBy: (searchParams.get('sort') || '') as SortOption,
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.searchQuery) {
      params.set('search', filters.searchQuery);
    }
    
    if (filters.consultationType) {
      params.set('consult', filters.consultationType);
    }
    
    if (filters.specialties.length > 0) {
      params.set('specialties', filters.specialties.join(','));
    }
    
    if (filters.sortBy) {
      params.set('sort', filters.sortBy);
    }
    
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    filters,
    updateFilters,
  };
};
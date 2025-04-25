import React from 'react';
import DoctorCard from './DoctorCard';
import { Doctor } from '../types/types';
import { filterDoctors } from '../utils/filterUtils';
import { AlertCircle, Search, Frown } from 'lucide-react';

interface DoctorListProps {
  doctors: Doctor[];
  searchQuery: string;
  consultationType: string;
  specialties: string[];
  sortBy: string;
  isLoading: boolean;
  error: string | null;
}

const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  searchQuery,
  consultationType,
  specialties,
  sortBy,
  isLoading,
  error
}) => {
  const filteredDoctors = filterDoctors(
    doctors,
    searchQuery,
    consultationType as any,
    specialties,
    sortBy as any
  );
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-pulse flex flex-col gap-6 w-full">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex">
                <div className="rounded-full bg-gray-200 h-24 w-24 mr-5"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-lg shadow-sm flex items-start">
        <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-lg mb-2">Unable to load doctors</h3>
          <p className="text-red-600">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-sm transition-colors"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }
  
  if (filteredDoctors.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg text-center shadow-sm">
        <div className="flex justify-center mb-4">
          {searchQuery ? (
            <Search className="h-12 w-12 text-gray-400" />
          ) : (
            <Frown className="h-12 w-12 text-gray-400" />
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No doctors found</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          {searchQuery 
            ? `We couldn't find any doctors matching "${searchQuery}"`
            : "No doctors match your current filter criteria"}
        </p>
        <div className="space-y-2 text-sm">
          <p className="font-medium text-gray-600">Try:</p>
          <ul className="text-gray-500 space-y-1">
            <li>• Using different search terms</li>
            <li>• Clearing some filters</li>
            <li>• Selecting a different consultation type</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
        <span className="font-medium text-gray-700" data-testid="doctor-count">
          {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
        </span>
        
        {(searchQuery || specialties.length > 0 || consultationType) && (
          <div className="text-sm text-gray-500">
            {searchQuery && <span className="mr-2">Search: "{searchQuery}"</span>}
            {specialties.length > 0 && (
              <span className="mr-2">
                {specialties.length} {specialties.length === 1 ? 'specialty' : 'specialties'}
              </span>
            )}
            {consultationType && <span>{consultationType}</span>}
          </div>
        )}
      </div>
      
      <div className="space-y-4" data-testid="doctor-results">
        {filteredDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
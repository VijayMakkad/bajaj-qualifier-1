import React from 'react';
import DoctorCard from './DoctorCard';
import { Doctor } from '../types/types';
import { filterDoctors } from '../utils/filterUtils';

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
        <div className="animate-pulse flex flex-col gap-4 w-full">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 h-40 rounded-lg w-full"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <p>Error loading doctors: {error}</p>
      </div>
    );
  }
  
  if (filteredDoctors.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg text-center shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-2">No doctors found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <span className="font-medium text-gray-700">{filteredDoctors.length} doctors found</span>
      </div>
      
      <div className="space-y-4">
        {filteredDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
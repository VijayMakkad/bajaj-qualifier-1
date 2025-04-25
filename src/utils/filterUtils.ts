import { Doctor, ConsultationType, SortOption } from '../types/types';

// Helper function to extract numeric value from fee string
const extractNumericFee = (fee: string | number): number => {
  if (typeof fee === 'number') return fee;
  // Extract only digits from strings like "₹ 500"
  return parseInt(fee.replace(/[^\d]/g, '')) || 0;
};

// Helper function to extract numeric value from experience string
const extractNumericExperience = (exp: string | number): number => {
  if (typeof exp === 'number') return exp;
  // Extract only digits from strings like "13 Years of experience"
  return parseInt(exp.replace(/\D/g, '')) || 0;
};

export const filterDoctors = (
  doctors: Doctor[],
  searchQuery: string,
  consultationType: ConsultationType,
  specialties: string[],
  sortBy: SortOption,
): Doctor[] => {
  let filteredDoctors = [...doctors]; // safer copy

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredDoctors = filteredDoctors.filter(doctor =>
      doctor.name.toLowerCase().includes(query)
    );
  }

  // Filter by consultation type
  if (consultationType) {
    filteredDoctors = filteredDoctors.filter(doctor => {
      if (consultationType === 'Video Consult') {
        return doctor.video_consult || doctor.availability?.videoConsult;
      } else if (consultationType === 'In Clinic') {
        return doctor.in_clinic || doctor.availability?.inClinic;
      }
      return true;
    });
  }

  // Filter by specialties
  if (specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor => {
      // Check both new and old specialty structures
      return specialties.some(specialty => 
        (doctor.specialities && doctor.specialities.some(s => s.name === specialty)) ||
        (doctor.specialty && doctor.specialty.includes(specialty))
      );
    });
  }

  // Sort by fees or experience
  if (sortBy === 'fees') {
    filteredDoctors.sort((a, b) => {
      const feeA = extractNumericFee(a.fees);
      const feeB = extractNumericFee(b.fees);
      return feeA - feeB; // ascending
    });
  } else if (sortBy === 'experience') {
    filteredDoctors.sort((a, b) => {
      const expA = extractNumericExperience(a.experience);
      const expB = extractNumericExperience(b.experience);
      return expB - expA; // descending
    });
  }

  return filteredDoctors;
};

export const getUniqueSpecialties = (doctors: Doctor[] | undefined): string[] => {
  if (!Array.isArray(doctors)) return [];

  const specialtiesSet = new Set<string>();

  doctors.forEach(doctor => {
    // Handle both new and old specialty structures
    if (doctor.specialities) {
      doctor.specialities.forEach(specialty => {
        if (specialty.name) specialtiesSet.add(specialty.name);
      });
    }
    
    if (doctor.specialty) {
      doctor.specialty.forEach(specialty => {
        if (specialty) specialtiesSet.add(specialty);
      });
    }
  });

  return Array.from(specialtiesSet).sort();
};

export const getAutocompleteSuggestions = (
  doctors: Doctor[],
  query: string,
  limit: number = 3
): Doctor[] => {
  if (!query || !Array.isArray(doctors)) return [];

  const normalizedQuery = query.toLowerCase();

  return doctors
    .filter(doctor => doctor.name.toLowerCase().includes(normalizedQuery))
    .slice(0, limit);
};
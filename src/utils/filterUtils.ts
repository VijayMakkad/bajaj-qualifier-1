import { Doctor, ConsultationType, SortOption } from '../types/types';

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
      return consultationType === 'Video Consult'
        ? doctor.availability?.videoConsult
        : consultationType === 'In Clinic'
        ? doctor.availability?.inClinic
        : true;
    });
  }

  // Filter by specialties
  if (specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor =>
      specialties.some(specialty =>
        doctor.specialty?.includes(specialty)
      )
    );
  }

  // Sort by fees or experience
  if (sortBy === 'fees') {
    filteredDoctors.sort((a, b) => a.fees - b.fees); // ascending
  } else if (sortBy === 'experience') {
    filteredDoctors.sort((a, b) => b.experience - a.experience); // descending
  }

  return filteredDoctors;
};

export const getUniqueSpecialties = (doctors: Doctor[] | undefined): string[] => {
  if (!Array.isArray(doctors)) return [];

  const specialtiesSet = new Set<string>();

  doctors.forEach(doctor => {
    doctor.specialty?.forEach(specialty => {
      if (specialty) specialtiesSet.add(specialty);
    });
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

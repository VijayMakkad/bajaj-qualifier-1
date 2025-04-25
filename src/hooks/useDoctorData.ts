import { useEffect, useState } from 'react';
import { Doctor } from '../types/types';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

// Default values for doctors with missing data
const DEFAULT_DOCTOR_IMAGE = "/api/placeholder/80/80";
const DEFAULT_FEES = 500; // A reasonable default fee

export const useDoctorData = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched doctor data:', data); // Log the data to inspect
        
        // Process the data to ensure all required fields are present
        const processedDoctors = data.map((doctor: any) => ({
          ...doctor,
          fees: doctor.fees || DEFAULT_FEES, // Use default fee if missing
          profileImage: doctor.profileImage || DEFAULT_DOCTOR_IMAGE, // Use default image if missing
          // Ensure other critical fields have defaults
          experience: doctor.experience || 0,
          specialty: doctor.specialty || [],
        }));
        
        setDoctors(processedDoctors);
      } catch (err) {
        console.error('Error fetching doctor data:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return { doctors, isLoading, error };
};
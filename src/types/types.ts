export type ConsultationType = 'Video Consult' | 'In Clinic' | '';
export type SortOption = 'fees' | 'experience' | '';

export interface Doctor {
  id: string;
  name: string;
  name_initials?: string;
  photo?: string;
  doctor_introduction?: string;
  specialities?: { name: string }[];
  experience: string | number;
  fees: string | number;
  languages?: string[];
  clinic?: {
    name: string;
    address?: {
      locality: string;
      city: string;
      address_line1: string;
      location: string;
      logo_url?: string;
    };
  };
  video_consult?: boolean;
  in_clinic?: boolean;
  // Keep the old fields for compatibility
  specialty?: string[];
  rating?: number;
  location?: string;
  availability?: {
    videoConsult?: boolean;
    inClinic?: boolean;
  };
  profileImage?: string;
  qualification?: string;
  education?: string;
}

export interface FilterState {
  searchQuery: string;
  specialties: string[];
  consultationType: ConsultationType;
  sortBy: SortOption;
}
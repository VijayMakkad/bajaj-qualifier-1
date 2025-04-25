export type ConsultationType = 'Video Consult' | 'In Clinic' | '';
export type SortOption = 'fees' | 'experience' | '';

export interface Doctor {
  id: string;
  name: string;
  specialty?: string[];
  experience: number;
  fees: number;
  rating?: number;
  location?: string;
  availability?: {
    videoConsult?: boolean;
    inClinic?: boolean;
  };
  profileImage?: string;
  qualification?: string;
  education?: string;
  clinic?: string;
}

export interface FilterState {
  searchQuery: string;
  specialties: string[];
  consultationType: ConsultationType;
  sortBy: SortOption;
}
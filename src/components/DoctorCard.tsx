import React from 'react';
import { MapPin, Building } from 'lucide-react';
import { Doctor } from '../types/types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  // Extract numeric experience value from the string
  const expYears = typeof doctor.experience === 'string' 
    ? doctor.experience.replace(/\D/g, '') 
    : doctor.experience;
  
  // Extract fee amount (removing currency symbol and spaces)
  const feeAmount = typeof doctor.fees === 'string'
    ? doctor.fees.replace(/[^\d]/g, '')
    : doctor.fees;

  // Format qualification display
  const qualification = doctor.qualification || (doctor.specialities && doctor.specialities[0]?.name) || "General Physician";
  
  // Additional qualifications if available
  const additionalQualifications = [];
  if (doctor.education) additionalQualifications.push(doctor.education);
  else if (doctor.doctor_introduction) {
    const introMatches = doctor.doctor_introduction.match(/\b[A-Z]+,?\b/g);
    if (introMatches && introMatches.length > 0) {
      additionalQualifications.push(introMatches.join(', '));
    }
  }

  return (
    <div 
      data-testid="doctor-card"
      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 mb-4"
    >
      <div className="p-6">
        <div className="flex">
          {/* Left side - Doctor info */}
          <div className="flex items-start">
            {/* Doctor profile image */}
            <div className="flex-shrink-0 mr-4">
              <img 
                src={doctor.photo || "/api/placeholder/100/100"} 
                alt={`Dr. ${doctor.name}`}
                className="w-20 h-20 rounded-full object-cover border border-gray-200"
              />
            </div>
            
            <div>
              <h3 
                data-testid="doctor-name"
                className="text-lg font-semibold text-gray-900 mb-1"
              >
                Dr. {doctor.name.replace(/^Dr\.\s*/i, '')}
              </h3>
              
              <p className="text-gray-600 text-sm mb-1">
                {qualification}
              </p>
              
              {additionalQualifications.length > 0 && (
                <p className="text-gray-500 text-sm mb-1">
                  {additionalQualifications.join(', ')}
                </p>
              )}
              
              <div 
                data-testid="doctor-experience"
                className="text-sm text-gray-600 mb-3"
              >
                {expYears} yrs exp.
              </div>
              
              {/* Clinic details */}
              {doctor.clinic && (
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Building className="h-3.5 w-3.5 mr-1.5" />
                  <span>{doctor.clinic.name}</span>
                </div>
              )}
              
              {/* Location details */}
              {doctor.clinic?.address && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>{doctor.clinic.address.locality || doctor.clinic.address.city}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Right side - Fee */}
          <div className="ml-auto text-right">
            <span 
              data-testid="doctor-fee"
              className="block font-semibold text-lg text-gray-900"
            >
              ₹ {feeAmount}
            </span>
          </div>
        </div>
        
        {/* Book Appointment Button */}
        <div className="mt-4">
          <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
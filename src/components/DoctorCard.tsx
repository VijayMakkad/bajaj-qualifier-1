import React from 'react';
import { Star, MapPin, Building } from 'lucide-react';
import { Doctor } from '../types/types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      data-testid="doctor-card"
      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-start">
          {/* Doctor profile image */}
          <div className="flex-shrink-0 mr-4">
            <img 
              src={doctor.profileImage || "/api/placeholder/80/80"} 
              alt={`Dr. ${doctor.name}`}
              className="w-20 h-20 rounded-full object-cover border border-gray-200"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 
                  data-testid="doctor-name"
                  className="text-lg font-semibold text-gray-900 mb-1"
                >
                  Dr. {doctor.name.replace(/^Dr\.\s*/i, '')}
                </h3>
                
                <p className="text-gray-600 text-sm mb-2">
                  {doctor.qualification || "General Physician"}
                </p>
                
                {doctor.education && (
                  <p className="text-gray-500 text-sm mb-2">
                    {doctor.education}
                  </p>
                )}
                
                <div 
                  data-testid="doctor-experience"
                  className="text-sm text-gray-600 mb-3"
                >
                  {doctor.experience} yrs exp.
                </div>
              </div>

              <div className="text-right">
                <span 
                  data-testid="doctor-fee"
                  className="block font-semibold text-lg text-gray-900"
                >
                  ₹{doctor.fees}
                </span>
                <span className="text-xs text-gray-500">Consultation Fee</span>
              </div>
            </div>
            
            {/* Specialties */}
            <div 
              data-testid="doctor-specialty"
              className="flex flex-wrap gap-1.5 mb-3"
            >
              {doctor.specialty?.map((specialty, index) => (
                <span 
                  key={index}
                  className="text-sm bg-blue-50 text-blue-700 rounded-full px-2.5 py-0.5"
                >
                  {specialty}
                </span>
              ))}
            </div>
            
            {/* Clinic and Location */}
            <div className="flex flex-col space-y-1 mb-3">
              {doctor.clinic && (
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-3.5 w-3.5 mr-1.5" />
                  <span>{doctor.clinic}</span>
                </div>
              )}
              
              {doctor.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>{doctor.location}</span>
                </div>
              )}
            </div>

            {/* Book Appointment Button */}
            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
import React from 'react';
import { Button } from '@/components/ui/Button';

interface JobListingProps {
  title: string;
  contractType: string;
  location: string;
  onApply?: () => void;
}

export function JobListing({ title, contractType, location, onApply }: JobListingProps) {
  return (
    <div className="flex items-center justify-between p-6 border rounded-lg hover:shadow-md transition-shadow bg-white">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="flex gap-4 mt-2 text-gray-600">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {contractType}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M19 10C19 17 12 21 12 21C12 21 5 17 5 10C5 6.134 8.134 3 12 3C15.866 3 19 6.134 19 10Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {location}
          </span>
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={onApply}
        className="hover:bg-blue-50"
      >
        Apply Now
      </Button>
    </div>
  );
}

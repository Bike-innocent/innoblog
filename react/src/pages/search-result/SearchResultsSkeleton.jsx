// src/components/SearchResultsSkeleton.jsx

import React from 'react';
import { Skeleton } from '@nextui-org/react';

const SearchResultsSkeleton = () => {
  return (
    <div className="">
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <div key={index} className="flex flex-col sm:flex-row items-start mb-4">
          <div className="w-full sm:w-3/4 md:w-2/4 mr-4 mb-2 mt-3 sm:mb-0">
            <Skeleton className="w-full h-64 rounded-md" />
          </div>
          <div className="sm:w-2/3 w-full flex flex-col justify-between">
            <Skeleton className="h-6 md:w-3/4 mb-2" />
            <div className="flex items-center mt-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="ml-2 h-5 w-1/4" />
            </div>
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsSkeleton;

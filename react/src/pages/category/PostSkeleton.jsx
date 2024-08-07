import React from 'react';
import { Skeleton } from '@nextui-org/react';

const PostSkeleton = () => (
  <div className="w-full group">
    <div className="block">
      <Skeleton className="w-full h-[180px] md:h-[250px] object-cover rounded-lg" />
      <div className="flex pt-2">
        <div className="w-1/5">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex flex-col pl-2 w-full">
          <Skeleton className="h-5 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 mt-1 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

export default PostSkeleton;

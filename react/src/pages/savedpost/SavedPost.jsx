import React, { useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';
import axiosInstance from '../../axiosInstance';
import Post from './Post';

const fetchSavedPosts = async ({ pageParam = 1 }) => {
  try {
    const response = await axiosInstance.get(`posts/saved-posts?page=${pageParam}&limit=12`);
    return response.data;
  } catch (error) {
    console.error('Error during API call:', error.response || error.message || error);
    throw error; // Rethrow so that React Query can handle the error state
  }
};

const SavedPost = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch, // <-- refetch function from useInfiniteQuery
  } = useInfiniteQuery({
    queryKey: ['savedPostscc'],
    queryFn: fetchSavedPosts,
    getNextPageParam: (lastPage) => lastPage.next_page_url ? lastPage.current_page + 1 : undefined,
  });

  const posts = data?.pages.flatMap(page => page.data) || [];
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <section>
        <div className="container mx-auto my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="w-full group">
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
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return <p className="text-red-500">Error fetching saved posts: {error.message}</p>;
  }

  return (
    <section>
      <div className="container mx-auto my-4">
        <h3>saved posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-0">
          {posts.map((post, index) => (
            <Post key={index} post={post} isSaved={true} onRemove={refetch} />  
          ))}
        </div>
        <div ref={observerRef} className="w-full h-10"></div>
        {isFetchingNextPage && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="w-full group">
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPost;

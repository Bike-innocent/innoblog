import React, { useRef, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Tab } from '@headlessui/react';
import { Skeleton } from '@nextui-org/react';
import axiosInstance from '../../axiosInstance';
import Published from './Published';
import Draft from './Draft';

const fetchUserPosts = async ({ pageParam = 1 }) => {
  const response = await axiosInstance.get(`/posts?page=${pageParam}&limit=12`);
  return response.data;
};

const MyPost = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['userPosts'],
    queryFn: fetchUserPosts,
    getNextPageParam: (lastPage) => lastPage.next_page_url ? lastPage.current_page + 1 : undefined,
  });

  const posts = data?.pages.flatMap(page => page.data) || [];
  const publishedPosts = posts.filter(post => post.status === 1);
  const draftPosts = posts.filter(post => post.status === 0);

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

  const refreshPosts = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <section id="hero-slider">
        <div className="container mx-auto my-4" data-aos="fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="w-full group">
                <div className="block">
                  <Skeleton className="w-full h-[180px] md:h-[250px] object-cover rounded-lg" />
                  <div className="flex pt-2">
                   
                    <div className="flex flex-col w-full">
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
    return <p className="text-red-500">Error fetching posts: {error.message}</p>;
  }

  return (
    <section>
      <div className="container mx-auto my-4" data-aos="fade-in">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 rounded-xl">
            <Tab
            className={({ selected }) =>
                selected
                  ? 'w-full py-2.5 text-sm leading-5 font-medium border-b-2 border-blue-500'
                  : 'w-full py-2.5 text-sm leading-5 font-medium border-b-2'
              }
            >
              Published
            </Tab>
            <Tab
             className={({ selected }) =>
                selected
                  ? 'w-full py-2.5 text-sm leading-5 font-medium border-b-2 border-blue-500'
                  : 'w-full py-2.5 text-sm leading-5 font-medium border-b-2'
              }
            >
              Draft
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-0">
                {publishedPosts.map((post) => (
                  <Published key={post.slug} post={post} refreshPosts={refreshPosts} />
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-0">
                {draftPosts.map((post) => (
                  <Draft key={post.slug} post={post} refreshPosts={refreshPosts} />
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <div ref={observerRef} className="w-full h-10"></div>
        {isFetchingNextPage && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="w-full group">
                <div className="block">
                  <Skeleton className="w-full h-[180px] md:h-[250px] object-cover rounded-lg" />
                  <div className="flex pt-2">
                    
                    <div className="flex flex-col w-full">
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

export default MyPost;

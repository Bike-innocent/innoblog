import React, { useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation, Link } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import PlaceholderImage from './PlaceholderImage';
import SearchResultsSkeleton from './SearchResultsSkeleton';
import PostDropdown from './PostDropdown'; // Import the PostDropdown component

const fetchSearchResults = async ({ pageParam = 1, queryKey }) => {
    const query = queryKey[1];
    const response = await axiosInstance.get('/search', {
        params: { query, page: pageParam, limit: 12 }, // Adjust the limit as needed
    });
    return response.data;
};

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['searchResults', query],
        queryFn: fetchSearchResults,
        getNextPageParam: (lastPage) => lastPage.next_page_url ? lastPage.current_page + 1 : undefined,
        enabled: !!query,
    });

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
        return <SearchResultsSkeleton />;
    }

    if (isError) {
        return <div>Error loading search results: {error.message}</div>;
    }

    const results = data?.pages.flatMap((page) => page.data) || [];

    return (
        <div className="">
            {results.length > 0 ? (
                <ul className="space-y-4">
                    {results.map((result) => (
                        <li key={result.id} className="flex flex-col sm:flex-row items-start">
                            {result.image && (
                                <div className="w-full sm:w-3/4 md:w-2/4 mr-4 mb-2 mt-3 sm:mb-0">
                                    <Link to={`/posts/${result.slug}`}>
                                        <img
                                            src={result.image}
                                            alt={result.title}
                                            className="w-full h-64 object-cover rounded-md shadow-md"
                                        />
                                    </Link>
                                </div>
                            )}
                            <div className="sm:w-2/3 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <Link to={`/posts/${result.slug}`} className="text-blue-500 hover:underline text-lg md:mt-2 font-bold">
                                        {result.title}
                                    </Link>
                                    {/* Pass result to PostDropdown */}
                                </div>
                                <div className="flex items-center mt-3">
                                    <Link to={`/${result.user.username}`}>
                                        <PlaceholderImage
                                            name={result.user.name}
                                            avatar={result.user.avatar_url}
                                            placeholderColor={result.user.placeholder_color}
                                        />
                                    </Link>
                                    <Link to={`/${result.user.username}`}>
                                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                            {result.user.name}
                                        </span>
                                    </Link>
                                    <div className='block sm:hidden ml-auto'>
                                        <PostDropdown post={result} />
                                    </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mt-1 md-2">
                                    {result.content}
                                </p>
                            </div>
                            <div className='hidden sm:block'>
                                <PostDropdown post={result} />
                            </div>

                        </li>
                    ))}
                </ul>
            ) : (
                <div>No results found</div>
            )}
            <div ref={observerRef} className="w-full h-10"></div>
            {isFetchingNextPage && (
                <SearchResultsSkeleton />
            )}
        </div>
    );
};

export default SearchResults;

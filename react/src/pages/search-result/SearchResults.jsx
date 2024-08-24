import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosInstance'; // Adjust path as needed
import PlaceholderImage from './PlaceholderImage'; // Import your PlaceholderImage component

const fetchSearchResults = async (query) => {
  const response = await axiosInstance.get(`/search`, {
    params: { query },
  });
  return response.data;
};

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const { data: results, error, isLoading } = useQuery({
    queryKey: ['searchResults', query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query, // Only run the query if there's a search query
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading search results</div>;

  return (
    <div className="">
      {results?.length > 0 ? (
        <ul className="space-y-4">
          {results.map((result) => (
            <li key={result.id} className="flex flex-col sm:flex-row items-start ">
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
              <div className="sm:w-2/3">
              <Link to={`/posts/${result.slug}`} className="text-blue-500 hover:underline text-lg font-bold">
                  {result.title}
                </Link>
              <div className="flex items-center mt-2">
              <Link to={`/${result.user.username}`} >
                  <PlaceholderImage
                    name={result.user.name}
                    avatar={result.user.avatar_url}
                    placeholderColor={result.user.placeholder_color}
                  />
                      </Link>
                      <Link to={`/${result.user.username}`} >
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {result.user.name}
                  </span>
                  </Link>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mt-1 md-2">
                  {result.content}
                </p>
               
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default SearchResults;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance'; // Adjust path as needed

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2>
      {results?.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.id} className="mb-2">
              <a href={`/posts/${result.slug}`} className="text-blue-500 hover:underline">
                {result.title}
              </a>
              <p>{result.content}</p>
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

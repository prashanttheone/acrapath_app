import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../app/lib/apiClient';
import { Endpoints } from '../app/lib/EndPoint';

export const useLocationSuggestions = (query: string) => {
  return useQuery({
    queryKey: ['suggestLocations', query],
    queryFn: async () => {
      if (!query) return [];
      const response = await apiClient.get(`${Endpoints.search.suggestLocations}?q=${encodeURIComponent(query)}`);
      return response.data?.data || [];
    },
    enabled: query.length > 1,
    staleTime: 60 * 1000,
  });
};

export const useKeywordSuggestions = (query: string) => {
  return useQuery({
    queryKey: ['suggestKeywords', query],
    queryFn: async () => {
      if (!query) return [];
      const response = await apiClient.get(`${Endpoints.search.suggestKeyword}?q=${encodeURIComponent(query)}`);
      return response.data?.data || [];
    },
    enabled: query.length > 1,
    staleTime: 60 * 1000,
  });
};

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../app/lib/apiClient';
import { Endpoints } from '../app/lib/EndPoint';

export const useJobDetails = (jobId: string) => {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('No job ID provided');
      const response = await apiClient.get(Endpoints.jobs.getById(jobId));
      return response.data;
    },
    enabled: !!jobId,
    staleTime: 60 * 1000, // Cache for 1 minute
  });
};

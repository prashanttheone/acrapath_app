import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../app/lib/apiClient';
import { Endpoints } from '../app/lib/EndPoint';

export interface GetJobsParams {
  page?: number;
  limit?: number;
  location?: string;
  experience?: string;
  salary?: string;
  job_type?: string;
  skills?: string[];
  function?: string;
}

export const fetchJobs = async (params: GetJobsParams) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.location) queryParams.append('location', params.location);
  if (params.experience) queryParams.append('experience', params.experience);
  if (params.salary) queryParams.append('salary', params.salary);
  if (params.job_type) queryParams.append('job_type', params.job_type);
  if (params.function) queryParams.append('function', params.function);
  
  if (params.skills && params.skills.length > 0) {
    params.skills.forEach(skill => {
      queryParams.append('skills', skill);
    });
  }

  const { data } = await apiClient.get(`${Endpoints.jobs.getAll}?${queryParams.toString()}`);
  return data;
};

export const useJobs = (filters: Omit<GetJobsParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['jobs', filters],
    queryFn: ({ pageParam }) => fetchJobs({ ...filters, page: pageParam as number, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 60 * 1000, // 1 minute
  });
};

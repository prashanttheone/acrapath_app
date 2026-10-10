export const Endpoints = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  jobs: {
    create: '/api/jobs',
    getAll: '/api/jobs',
    getById: (id: string) => `/api/jobs/${id}`,
  },
};

import Config from 'react-native-config';

const BASE_URL = Config.API_URL || 'http://localhost:3000/api';

export const Endpoints = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
  },
  // other endpoint groups can go here...
};

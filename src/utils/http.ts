import axios from 'axios';
import {API_URL} from '@env';

declare global {
  var token: any;
}

const http = axios.create({
  baseURL: API_URL,
});

http.interceptors.request.use(
  async (config: any) => {
    if (typeof global.token != 'undefined') {
      config.headers.Authorization = `Bearer ${global.token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default http;

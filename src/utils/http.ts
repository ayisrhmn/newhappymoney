import axios from 'axios';
import {API_URL} from '@env';
import {showMessage} from 'react-native-flash-message';

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
    if (
      error.response.data.indexOf(
        "Error: you don't have permission to access this resource",
      ) < 0
    ) {
      showMessage({
        type: 'danger',
        message: error.response.data || 'Something went wrong!!',
      });
    }
    return Promise.reject(error);
  },
);

export default http;

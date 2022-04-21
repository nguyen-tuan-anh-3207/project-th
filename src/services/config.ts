/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import { TIMEOUT } from 'src/constants';
import { REACT_APP_API_VERSION, REACT_APP_BASE_API } from 'src/constants/env';

const axiosInstance = axios.create({
  // eslint-disable-next-line max-len
  baseURL: `${REACT_APP_BASE_API}/${REACT_APP_API_VERSION}`,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  async (response: any) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error: any) => {
    switch (error.response?.status) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

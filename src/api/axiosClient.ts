import axios from 'axios';
import queryString from 'querystring';
import {
  getHeaders,
  getAccessTokenFromLocalStorage,
} from '../helpers/auth';

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_GATEWAY}`,
  ...getHeaders(),
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config) => {
    // return config;
    // Do something before request is sent
    const accessToken = getAccessTokenFromLocalStorage();
    config.headers.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : undefined;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response.data;
  },
  (error) => {
    throw error;
  },
);

export default axiosClient;

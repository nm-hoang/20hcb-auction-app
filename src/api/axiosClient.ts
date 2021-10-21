import axios from 'axios';
import queryString from 'querystring';
import { getHeaders } from '../helpers/auth';

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_GATEWAY}`,
  ...getHeaders(),
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => config);

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

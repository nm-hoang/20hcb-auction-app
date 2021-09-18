import axiosClient from './axiosClient';

const prefix = '/auth';

const authApi = {
  login: (data: object) => {
    const url = `${prefix}/login`;
    return axiosClient.post(url, data);
  },
  signup: (data: object) => {
    const url = `${prefix}/register`;
    return axiosClient.post(url, data);
  },
};

export default authApi;

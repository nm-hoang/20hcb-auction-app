import axiosClient from './axiosClient';
import { getHeaders } from '../helpers/auth';
import { ChangePasswordType } from '../types/authType';

const prefix = '/auth';

const authApi = {
  login: (data: object) => {
    const url = `${prefix}/login`;
    const headers = getHeaders(true);

    return axiosClient.post(url, data, headers);
  },
  signup: (data: object) => {
    const url = `${prefix}/register`;
    return axiosClient.post(url, data);
  },

  getMe: () => {
    const url = `${prefix}/me`;
    const headers = getHeaders();

    return axiosClient.get(url, headers)
      .then((res) => res);
  },

  // TODO: Fix api, return all with 200 status
  changePassword: (data: ChangePasswordType) => {
    const url = `${prefix}/password/modify`;
    const headers = getHeaders();

    return axiosClient.post(url, data, headers)
      .then((res) => res)
      .catch((error) => error.message);
  },
};

export default authApi;

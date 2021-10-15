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
  recoveryPassword: (email: string) => {
    const url = `${prefix}/password/reset?email=${email}`;
    return axiosClient.get(url);
  },
  resetPassword: (
    token: string,
  ) => axiosClient.get(`${prefix}/password/reset/verify-token?token=${token}`)
    .then((res) => res.data),
};

export default authApi;

import axiosClient from './axiosClient';

const prefix = '/cloudinary';

const cloundinaryApi = {
  uploadFile: (file: any) => {
    const url = `${prefix}`;
    return axiosClient.post(url, file);
  },
};

export default cloundinaryApi;

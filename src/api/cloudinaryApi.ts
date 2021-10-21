import axiosClient from './axiosClient';

const prefix = '/cloudinary';

const cloundinaryApi = {
  uploadFile: (image: any) => {
    const url = `${prefix}`;
    return axiosClient.post(url, image);
  },
};
export default cloundinaryApi;

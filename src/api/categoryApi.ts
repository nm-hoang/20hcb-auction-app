import axiosClient from './axiosClient';

const categoryApi = {
  getCategories: () => {
    const url = 'http://134.209.96.118:9005/categories';
    return axiosClient.get(url);
  },
};

export default categoryApi;

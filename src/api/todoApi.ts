import axiosClient from './axiosClient';

const prefix = '/todos';

const todoApi = {
  getTodoList: () => {
    const url = `${prefix}`;
    return axiosClient.get(url);
  },
  getTodoById: (id: number) => {
    const url = `${prefix}/${id}`;
    return axiosClient.get(url);
  },
  addTodo: (data: object) => {
    const url = `${prefix}`;
    return axiosClient.post(url, { ...data });
  },

};

export default todoApi;

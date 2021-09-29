import axiosClient from './axiosClient';
import { ConditionQueryType, Product, SortQueryType } from '../types/productType';

const prefix = '/products';
const url = `${prefix}`;

export enum ProductConditions {
  NEXT_CLOSE = 'next-close',
  BID_TURN = 'bid-turns',
  HIGHEST_PRICE = 'highest-price',
  RANDOM = 'random'
}

const productApi = {
  getProducts: (
    page: number = 1,
    sortBy: SortQueryType = SortQueryType.TIME,
    cond: ConditionQueryType = ConditionQueryType.HIGH_LOW,
  ) => axiosClient.get(`${url}?page=${page}&sortBy=${sortBy}&cond=${cond}`)
    .then((res) => res.data),

  getProduct: (id: string) => axiosClient.get(`${url}/${id}`)
    .then((res) => res.data),

  getFiveProducts: () => axiosClient.get(`${url}/all-top-five`)
    .then((res) => res.data),

  createProduct: (product: Product) => axiosClient.post(url, product),
};

export default productApi;

import axiosClient from './axiosClient';
import { Product } from '../types/productType';

const prefix = '/products';
const url = `${prefix}`;

export enum ProductConditions {
  NEXT_CLOSE = 'next-close',
  BID_TURN = 'bid-turns',
  HIGHEST_PRICE = 'highest-price',
  RANDOM = 'random'
}

const productApi = {
  getProducts: () => axiosClient.get(url),

  getProduct: (id: string) => axiosClient.get(`${url}/${id}`)
    .then((res) => res.data),

  getFiveProducts: () => axiosClient.get(`${url}/all-top-five`)
    .then((res) => res.data),

  createProduct: (product: Product) => axiosClient.post(url, product),
};

export default productApi;

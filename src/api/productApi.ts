import axiosClient from './axiosClient';
import {
  ConditionQueryType,
  FetchProductBidLogsQuery,
  FetchProductOptions,
  PatchPlaceBidQuery,
  Product,
  SortQueryType,
} from '../types/productType';

const prefix = '/products';
const url = `${prefix}`;
const logUrl = '/logs';

export enum ProductConditions {
  NEXT_CLOSE = 'next-close',
  BID_TURN = 'bid-turns',
  HIGHEST_PRICE = 'highest-price',
  RANDOM = 'random'
}

const productApi = {
  getCount: () => axiosClient.get(`${url}/count`).then((res) => res.data),

  getProducts: (
    {
      page = 1,
      sortBy = SortQueryType.TIME,
      cond = ConditionQueryType.HIGH_LOW,
    }: FetchProductOptions,
  ) => axiosClient.get(`${url}?page=${page}&sortBy=${sortBy}&cond=${cond}`)
    .then((res) => res.data),

  getProduct: (id: string) => axiosClient.get(`${url}/${id}`)
    .then((res) => res.data),

  getFiveProducts: () => axiosClient.get(`${url}/all-top-five`)
    .then((res) => res.data),

  createProduct: (product: Product) => axiosClient.post(url, product),

  getProductBidLogs: (
    {
      productId,
      page = 1, limit = 20,
    }: FetchProductBidLogsQuery,
  ) => axiosClient.get(`${logUrl}?productId=${productId}&page=${page}&limit=${limit}`)
    .then((res) => res.data),

  placeBid: ({
    productId,
    bidderUUID,
    price,
  }: PatchPlaceBidQuery) => axiosClient.patch(`${logUrl}?productId=${productId}&bidderUUID=${bidderUUID}&price=${price}`)
    .then((res) => res.data),
};

export default productApi;

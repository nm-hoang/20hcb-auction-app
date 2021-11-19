import axiosClient from './axiosClient';
import {
  ConditionQueryType,
  FetchProductBidLogsQuery,
  FetchProductOptions,
  PatchPlaceBidQuery,
  Product,
  SortQueryType,
} from '../types/productType';
import { getHeaders } from '../helpers/auth';

const prefix = '/products';
const url = `${prefix}`;
const logUrl = '/logs';
const watchlistUrl = '/watchlist';

export enum ProductConditions {
  NEXT_CLOSE = 'next-close',
  BID_TURN = 'bid-turns',
  HIGHEST_PRICE = 'highest-price',
  RANDOM = 'random'
}

const productApi = {
  getCount: () => axiosClient.get(`${url}/count`),

  getProducts: (
    {
      page = 1,
      sortBy = SortQueryType.TIME,
      cond = ConditionQueryType.HIGH_LOW,
    }: FetchProductOptions,
  ) => axiosClient.get(`${url}?page=${page}&sortBy=${sortBy}&cond=${cond}`),

  getProduct: (id: string) => axiosClient.get(`${url}/${id}`),

  getFiveProducts: () => axiosClient.get(`${url}/all-top-five`),

  createProduct: (product: Product) => axiosClient.post(url, product),

  getProductBidLogs: (
    {
      productId,
      page = 1, limit = 20,
    }: FetchProductBidLogsQuery,
  ) => axiosClient.get(`${logUrl}?productId=${productId}&page=${page}&limit=${limit}`),

  placeBid: ({
    productId,
    price,
  }: PatchPlaceBidQuery) => axiosClient.patch(
    `${logUrl}?productId=${productId}&price=${price}`,
  ),

  retrieveWatchlistByOwnerUUID: () => axiosClient.get(`${watchlistUrl}`),

  addProductToWatchlist: (
    productId: string,
  ) => axiosClient.patch(`${watchlistUrl}/${productId}`, {}, getHeaders()),
};

export default productApi;

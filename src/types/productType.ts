import { Image } from './imageType';
import { UserBrief } from './userBriefType';

export type Description = {
  version: string
  data: string
}

export type Category = {
  key: string
  name: string
}

export type Price = {
  initialPrice: number
  currentBid: number
  bidStep: number
}

export enum Type {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE'
}

export interface Product {
  _id: string
  id?: string
  ownerUUID: string
  highestBidderUUID?: string
  ownerBrief: UserBrief
  highestBidderBrief?: UserBrief
  rating: number
  images: Image[]
  name: string
  description: Description[]
  category: Category
  price: Price
  type: Type
  closeDate: number
  bannedBidder: string[]
  createdAt: string
}

export enum SortQueryType {
  TIME = 'time',
  PRICE = 'price'
}

export enum ConditionQueryType {
  LOW_HIGH = 'low-high',
  HIGH_LOW = 'high-low'
}

export type FetchProductOptions = {
  page: number
  sortBy: SortQueryType
  cond: ConditionQueryType
}

export type FetchProductBidLogsQuery = {
  productId: string
  page?: number
  limit?: number
}

export type PatchPlaceBidQuery = {
  productId: string
  bidderUUID: string
  price: number
}

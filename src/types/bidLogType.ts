import { UserBrief } from './userBriefType';

export enum BidLogStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  DENIED = 'DENIED'
}

export type BidLogType = {
  _id: string
  bidderUUID: string
  productId: string
  price: number
  status: BidLogStatus
  bidderBrief: UserBrief
  createdAt: string
}

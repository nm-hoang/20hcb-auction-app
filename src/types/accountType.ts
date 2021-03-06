import { Image } from './imageType';

export enum AccountStatus {
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED'
}

export enum Roles {
  ADMIN = 'ADMIN',
  BIDDER = 'BIDDER',
  SELLER = 'SELLER',
  GUEST = 'GUEST',
  }

export type User = {
  address: string
  fullName: string
  favorProducts: string[]
  phoneNumber?: number
}

export interface Account {
  _id: string
  status: AccountStatus
  rating: number
  role: Roles
  email: string
  username: string
  user: User
  profilePicture: Image
  createdAt: string
}

export interface CurrentUser {
  uuid: string;
  profilePicture: Image;
  fullName: string;
  username: string;
}

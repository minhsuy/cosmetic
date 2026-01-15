import { Token } from './../../node_modules/path-to-regexp/dist/index.d'
export enum EUserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
  MANAGER = 'MANAGER'
}

export enum EUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN'
}

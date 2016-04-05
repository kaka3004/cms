import {IAddress} from 'shared/models/address.d';

export interface IShopConfig {
  address: IAddress;
  currency_code: string;
}

export interface IShop {
  _id?: any;
  name: string;
  published?: boolean;
  creator_id: string;
  config?: IShopConfig;
  created_at?: Date;
  updated_at?: Date;
}
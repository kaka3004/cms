import {IAddress} from 'shared/models/address';

export interface IUserImage {
  src: string;
  width: number;
  height: number;
  provider: "local" | "facebook" | "twitter" | "google" | "amazon";
}

export interface IUserRole {
  role: string;
  shop_id: any;
}

export interface IUser {
  _id?: any;
  display_name: string;
  username: string;
  images?: [IUserImage];
  shipping_address?: IAddress;
  online_at?: Date;
  roles?: [IUserRole];
  local?: {
    email: string;
    password: string;
    fname: string;
    lname: string;
    validated?: boolean;
  };
  facebook?: {
    id: string;
    email: string;
    display_name: string;
    token: {value: string, secret: string}
  };
  twitter?: {
    id: string;
    username: string;
    display_name: string;
    token: {value: string, secret: string}
  };
  google?: {
    id: string;
    email: string;
    display_name: string;
    token: {value: string, secret: string}
  };
  amazon?: {
    id: string;
    email: string;
    display_name: string;
    token: {value: string, secret: string}
  };
  created_at?: Date;
  updated_at?: Date;
}

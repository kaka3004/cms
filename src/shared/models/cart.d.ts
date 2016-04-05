import {IPrice} from 'shared/models/price';

export interface ICartTotals {
  pre_discount: {
    with_tax: IPrice,
    without_tax: IPrice
  };

  post_discount: {
    with_tax: IPrice,
    without_tax: IPrice
  };
}

export interface ICartItem {
  variant_id: string;
  product_id: string;
  quantity: number;
}

export interface ICart {
  _id: any;
  items: Array<ICartItem>;
  // Total number of items in your cart
  total_items: number;
  // Total number of unique items in your cart
  total_unique_items: number;
  totals: ICartTotals;
  shop_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

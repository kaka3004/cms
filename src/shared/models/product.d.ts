import {IPrice} from 'shared/models/price';

export interface IProductImage {
  src: string;
  width: number;
  height: number;
  position: number;
  is_main: boolean;
  variant_ids: Array<string>;
}

export interface IProductInventory {
  sku: string;
  barcode: string;
  track_inventory: boolean;
  quantity: number;
}

export interface IProductVariantOption {
  name: string;
  values: Array<string>;
}

export interface IProductVariant {
  _id: any;
  option1: string;
  option2: string;
  option3: string;
  price: IPrice;
  compare_at_price: IPrice;
  taxable: boolean;
  inventory: IProductInventory;
  requires_shipping: boolean;
  weight: number;
  weight_unit: "kg" | "g";
}

export interface IProduct {
  _id: any;
  title: string;
  slug: string;
  body_html: string;
  description: string;
  sizing_info: string;
  shipping_info: string;
  gender: "male" | "female" | "unisex";
  images: Array<IProductImage>;
  tags: Array<string>;
  // Available variants options e.g. size, color, material. 
  // Maximum of 3 options you can use
  variants_options: Array<IProductVariantOption>;
  // Each product must at least have one variant
  variants: Array<IProductVariant>;
  // Shop id
  shop_id: string;
  // Category id
  category_id: string;
  creator_id: string;
  publish_status: "visible" | "hidden" | "delayed";
  published_at: Date;
  created_at: Date;
  updated_at: Date;
}

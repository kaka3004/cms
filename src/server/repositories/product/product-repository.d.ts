import {IProduct} from 'shared/models/product.d';
import {Promise} from 'mongoose';
import {IProductDocument} from 'server/models/product/product-model.d';

export interface IProductQuery {
  shop_id?: string;
}
export interface IProductRepository {
  find(query: IProductQuery): Promise<IProductDocument[]>;
  findById(id): Promise<IProductDocument>;
  create(attributes: IProduct, shop, user): Promise<IProductDocument>;
}
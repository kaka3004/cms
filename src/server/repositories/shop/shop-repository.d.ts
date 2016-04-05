import {IShop} from 'shared/models/shop.d';
import {Promise} from 'mongoose';
import {IShopDocument} from 'server/models/shop/shop-model.d';

export interface IShopQuery {
}

export interface IShopRepository {
  find(query): Promise<IShopDocument[]>;
  findById(id): Promise<IShopDocument>;
  findByName(name: string): Promise<IShopDocument>;
  create(attributes: IShop): Promise<IShopDocument>;
}
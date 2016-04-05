import {IShop} from 'shared/models/shop.d';
import {BaseDocument} from 'server/models/base/base.d';

export interface IShopDocument extends IShop, BaseDocument<IShopDocument> {
  _id: any;
  replaceAttributes(attrs: IShop): void;
  updateAttributes(attrs: IShop): void;
}
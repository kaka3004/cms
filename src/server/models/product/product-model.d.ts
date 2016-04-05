import {IProduct} from 'shared/models/product';
import {BaseDocument} from 'server/models/base/base.d';

export interface IProductDocument extends IProduct, BaseDocument<IProductDocument> {
  _id: any;
  replaceAttributes(attrs: IProduct): void;
  updateAttributes(attrs: IProduct): void;
  setShop(id): void;
}
import {ICart} from 'shared/models/cart.d';
import {BaseDocument} from 'server/models/base/base.d';

export interface ICartDocument extends ICart, BaseDocument<ICartDocument> {
  _id: any;
  replaceAttributes(attrs: ICart): void;
  updateAttributes(attrs: ICart): void;
}
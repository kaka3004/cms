import {BaseApi} from 'client/apis/base/base-api';
import {Schema, arrayOf} from 'normalizr';
import {ICart} from 'shared/models/cart';
import {ICartApi} from 'client/apis/cart/cart-api.d';

export class CartApi extends BaseApi implements ICartApi {

  getSchema() {
    return new Schema('carts', {
      idAttribute: '_id'
    });
  }

  all() {
    return this.get<ICart[]>('cart');
  }

  findById(id) {
    return this.get<ICart>(`cart/${id}`);
  }

  session() {
    return this.get<ICart[]>(`cart/session`);
  }
}

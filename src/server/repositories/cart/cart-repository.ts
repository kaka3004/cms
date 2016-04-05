import {Promise} from 'mongoose';
import {ICartRepository, ICartQuery} from 'server/repositories/cart/cart-repository.d';
import {CartModel} from 'server/models/cart/cart-model';
import {ICart} from 'shared/models/cart.d';
import {getDocumentId} from 'shared/helpers';

export class CartRepository implements ICartRepository {

  public find(query: ICartQuery = {}) {
    let filteredQuery: ICartQuery = {};

    if(query.shop_id) {
      filteredQuery.shop_id = query.shop_id;
    }

    if(query.user_id) {
      filteredQuery.user_id = query.user_id;
    }

    return CartModel.find(filteredQuery).exec();
  }

  public findById(id) {
    return CartModel.findById(id).exec();
  }

  public create(attributes: ICart) {
    return CartModel.create(attributes);
  }
}

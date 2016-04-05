import {ICart} from 'shared/models/cart.d';
import {Promise} from 'mongoose';
import {ICartDocument} from 'server/models/cart/cart-model.d';

interface ICartQuery {
  shop_id?: string;
  user_id?: string;
}

export interface ICartRepository {
  find(query: ICartQuery): Promise<ICartDocument[]>;
  findById(id): Promise<ICartDocument>;
  create(attributes: ICart): Promise<ICartDocument>;
}
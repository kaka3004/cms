import {ICartApi} from 'shared/apis/cart.d';

export interface ICartController extends ICartApi {
  fetch(req, res, next, id);
}
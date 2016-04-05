import {IShopApi} from 'shared/apis/shop.d';

export interface IShopController extends IShopApi {
  fetch(req, res, next, id);
}
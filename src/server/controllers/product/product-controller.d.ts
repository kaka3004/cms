import {IProductApi} from 'shared/apis/product.d';

export interface IProductController extends IProductApi {
  fetch(req, res, next, id);
}
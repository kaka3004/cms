import {ICategoryApi} from 'shared/apis/category.d';

export interface ICategoryController extends ICategoryApi {
  fetch(req, res, next, id);
}
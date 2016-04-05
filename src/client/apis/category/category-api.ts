import {BaseApi} from 'client/apis/base/base-api';
import {Schema, arrayOf} from 'normalizr';
import {ICategory} from 'shared/models/category';
import {ICategoryApi} from 'client/apis/category/category-api.d';

export class CategoryApi extends BaseApi implements ICategoryApi {

  getSchema() {
    return new Schema('categories', {
      idAttribute: '_id'
    });
  }

  all() {
    return this.get<ICategory[]>('category');
  }

  findById(id) {
    return this.get<ICategory>(`category/${id}`);
  }
}

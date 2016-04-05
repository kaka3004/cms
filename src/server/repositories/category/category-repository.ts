import {Promise} from 'mongoose';
import {ICategoryRepository, ICategoryQuery} from 'server/repositories/category/category-repository.d';
import {CategoryModel} from 'server/models/category/category-model';
import {ICategory} from 'shared/models/category.d';
import {getDocumentId} from 'shared/helpers';

export class CategoryRepository implements ICategoryRepository {

  public find(query: ICategoryQuery = {}) {
    let filteredQuery: ICategoryQuery = {};

    return CategoryModel.find(filteredQuery).exec();
  }

  public findById(id) {
    return CategoryModel.findById(id).exec();
  }

  public create(attributes: ICategory) {
    return CategoryModel.create(attributes);
  }
}

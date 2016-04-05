import {ICategory} from 'shared/models/category.d';
import {Promise} from 'mongoose';
import {ICategoryDocument} from 'server/models/category/category-model.d';

export interface ICategoryQuery {
}

export interface ICategoryRepository {
  find(query): Promise<ICategoryDocument[]>;
  findById(id): Promise<ICategoryDocument>;
  create(attributes: ICategory): Promise<ICategoryDocument>;
}
import {ICategory} from 'shared/models/category.d';
import {BaseDocument} from 'server/models/base/base.d';

export interface ICategoryDocument extends ICategory, BaseDocument<ICategoryDocument> {
  _id: any;
  replaceAttributes(attrs: ICategory): void;
  updateAttributes(attrs: ICategory): void;
}
import * as sinon from 'sinon';
import {ICategoryRepository} from 'server/repositories/category/category-repository.d';

export class CategoryRepositoryMock implements ICategoryRepository {
  public find = sinon.stub();
  public findById = sinon.stub();
  public create = sinon.stub();
}
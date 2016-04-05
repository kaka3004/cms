import * as sinon from 'sinon';
import {ICategoryApi} from 'client/apis/category/category-api.d';

export class CategoryApiMock implements ICategoryApi {
  public all = sinon.stub();
  public findById = sinon.stub();
  public create = sinon.stub();
  public update = sinon.stub();
  public replace = sinon.stub();
  public remove = sinon.stub();
}

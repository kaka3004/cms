import * as sinon from 'sinon';
import {IProductApi} from 'client/apis/product/product-api.d';

export class ProductApiMock implements IProductApi {
  public all = sinon.stub();
  public findById = sinon.stub();
  public create = sinon.stub();
  public update = sinon.stub();
  public replace = sinon.stub();
  public remove = sinon.stub();
}

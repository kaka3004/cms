import * as sinon from 'sinon';
import {IProductRepository} from 'server/repositories/product/product-repository.d';

export class ProductRepositoryMock implements IProductRepository {
  public find = sinon.stub();
  public findById = sinon.stub();
  public create = sinon.stub();
}
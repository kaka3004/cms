import * as sinon from 'sinon';
import {IShopRepository} from 'server/repositories/shop/shop-repository.d';

export class ShopRepositoryMock implements IShopRepository {
  public find = sinon.stub();
  public findById = sinon.stub();
  public findByName = sinon.stub();
  public create = sinon.stub();
}
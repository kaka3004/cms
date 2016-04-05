import * as sinon from 'sinon';
import {ICartRepository} from 'server/repositories/cart/cart-repository.d';

export class CartRepositoryMock implements ICartRepository {
  public find = sinon.stub();
  public findById = sinon.stub();
  public create = sinon.stub();
}
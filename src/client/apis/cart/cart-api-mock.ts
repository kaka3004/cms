import * as sinon from 'sinon';
import {ICartApi} from 'client/apis/cart/cart-api.d';

export class CartApiMock implements ICartApi {
  public all = sinon.stub();
  public findById = sinon.stub();
  public session = sinon.stub();
}

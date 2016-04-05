import * as sinon from 'sinon';
import {ICartActions} from 'client/actions/cart/cart-actions.d';

export class CartActionsMock implements ICartActions {
  public findById = sinon.stub();
  public all = sinon.stub();
  public reset = sinon.stub();
}

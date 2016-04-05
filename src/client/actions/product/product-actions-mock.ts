import * as sinon from 'sinon';
import {IProductActions} from 'client/actions/product/product-actions.d';

export class ProductActionsMock implements IProductActions {
  public findById = sinon.stub();
  public all = sinon.stub();
  public create = sinon.stub();
  public update = sinon.stub();
  public replace = sinon.stub();
  public remove = sinon.stub();
  public reset = sinon.stub();
}

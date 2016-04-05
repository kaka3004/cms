import * as sinon from 'sinon';
import {IShopApi} from 'client/apis/shop/shop-api.d';

export class ShopApiMock implements IShopApi {
  public all = sinon.stub();
  public findById = sinon.stub();
  public session = sinon.stub();
}

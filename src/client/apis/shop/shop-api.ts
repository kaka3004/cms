import {BaseApi} from 'client/apis/base/base-api';
import {Schema, arrayOf} from 'normalizr';
import {IShop} from 'shared/models/shop';
import {IShopApi} from 'client/apis/shop/shop-api.d';

export class ShopApi extends BaseApi implements IShopApi {

  getSchema() {
    return new Schema('shops', {
      idAttribute: '_id'
    });
  }

  all() {
    return this.get<IShop[]>('shop');
  }

  findById(id) {
    return this.get<IShop>(`shop/${id}`);
  }

  session(shopId) {
    return this.get<IShop>('shop/session', {shop_id: shopId});
  }
}

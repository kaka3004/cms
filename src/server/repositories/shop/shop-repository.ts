import {Promise} from 'mongoose';
import {IShopRepository, IShopQuery} from 'server/repositories/shop/shop-repository.d';
import {ShopModel} from 'server/models/shop/shop-model';
import {IShop} from 'shared/models/shop.d';

export class ShopRepository implements IShopRepository {

  public find(query: IShopQuery = {}) {
    let filteredQuery: IShopQuery = {};

    return ShopModel.find(filteredQuery).exec();
  }

  public findById(id) {
    return ShopModel.findById(id).exec();
  }

  public findByName(name) {
    return ShopModel.findOne({name}).exec();
  }

  public create(attributes: IShop) {
    return ShopModel.create(attributes);
  }
}

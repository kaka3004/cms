import {Promise} from 'mongoose';
import {ProductModel} from 'server/models/product/product-model';
import {IProductRepository, IProductQuery} from 'server/repositories/product/product-repository.d';
import {IProduct} from 'shared/models/product.d';
import {IUser} from 'shared/models/user.d';
import {IShop} from 'shared/models/shop.d';
import {getDocumentId} from 'shared/helpers';

export class ProductRepository implements IProductRepository {

  public find(query: IProductQuery = {}) {
    let filteredQuery: IProductQuery = {};

    if(query.shop_id) {
      filteredQuery.shop_id = query.shop_id;
    }

    return ProductModel.find(filteredQuery).exec();
  }

  public findById(id) {
    return ProductModel.findById(id).exec();
  }

  public create(attributes: IProduct, shop: IShop, user: IUser) {
    attributes.shop_id = getDocumentId(shop);
    attributes.creator_id = getDocumentId(user);

    return ProductModel.create(attributes);
  }
}

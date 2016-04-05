import {Mongoose} from 'mongoose';
import {configureCartModel} from 'server/models/cart/cart-model';
import {configureCategoryModel} from 'server/models/category/category-model';
import {configureProductModel} from 'server/models/product/product-model';
import {configureShopModel} from 'server/models/shop/shop-model';
import {configureUserModel} from 'server/models/user/user-model';

export function configureModels(mongoose: Mongoose) {
  configureCartModel(mongoose);
  configureCategoryModel(mongoose);
  configureProductModel(mongoose);
  configureShopModel(mongoose);
  configureUserModel(mongoose);
}

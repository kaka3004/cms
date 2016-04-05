import {BaseApi} from 'client/apis/base/base-api';
import {Schema, arrayOf} from 'normalizr';
import {IProduct} from 'shared/models/product';
import {IProductApi} from 'client/apis/product/product-api.d';
import {ApiError} from 'client/apis/base/api-error';
import {merge} from 'shared/helpers';

export class ProductApi extends BaseApi implements IProductApi {

  getSchema() {
    return new Schema('products', {
      idAttribute: '_id'
    });
  }

  all() {
    return this.get<IProduct[]>('product');
  }

  findById(id) {
    return this.get<IProduct>(`product/${id}`);
  }

  replace(id, attributes) {
    return this.put<IProduct>(`product/${id}`, attributes);
  }

  update(id, attributes) {
    return this.patch<IProduct>(`product/${id}`, attributes);
  }

  private shopRequiredError() {
    return Rx.Observable.throwError(new ApiError({
      statusCode: 400,
      error: {
        type: "validation",
        description: "Fix these validation errors",
        message: "You have to pass the shop id",
        errors: {shop_id: "Shop id must be set"}
      }
    }));
  }

  create(attributes, shop_id) {
    console.log(shop_id);
    if(! shop_id) {
      return this.shopRequiredError();
    } else {
      attributes = merge(attributes, {shop_id});
      return this.post<IProduct>(`product`, attributes);
    }
  }

  remove(id) {
    return this.delete(`product/${id}`);
  }
}

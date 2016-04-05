import {BaseController} from 'server/controllers/base/base-controller';
import {ValidationError, ModelNotFoundError, ForbiddenError} from 'server/errors';
import {IShopRepository} from 'server/repositories/shop/shop-repository.d';
import {IShopController} from 'server/controllers/shop/shop-controller.d';

export class ShopController extends BaseController implements IShopController {
  
  constructor(private shopRepository: IShopRepository) {
    super();
  }

  fetch(req, res, next, id) {
    this.shopRepository.findById(id)
      .onFulfill((shop) => {
        if(! shop) {
          throw new ModelNotFoundError(id);
        }
        req.fetchedShop = shop;
        next();
      }).onReject(next);
  }

  all(req, res, next) {
    this.shopRepository.find(req.query)
      .onFulfill((shops) => {
        this.successResponse(res, shops);
      }).onReject(next);
  }

  findById(req, res, next) {
    this.successResponse(res, req.fetchedShop);
  }

  session(req, res, next) {
    this.successResponse(res, req.shop);
  }
}
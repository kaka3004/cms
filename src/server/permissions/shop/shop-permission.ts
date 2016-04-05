import {ForbiddenError, UnauthorizedError} from 'server/errors';
import {IResponseError} from 'shared/response';
import {IShopPermission} from 'server/permissions/shop/shop-permission.d';

export class ShopPermission implements IShopPermission {
  constructor() {
  }
  
  canShowAll(req, res, next) {
    next();
  }

  canShowById(req, res, next) {
    next();
  }

  canShowSession(req, res, next) {
    if(! req.user) {
      next(new UnauthorizedError("You have to login to make this request!"));
    } else if(! req.shop) {
      next(new ForbiddenError("You are not a shop admin"));
    } else {
      next();
    }
  }
}

import {ForbiddenError, UnauthorizedError, ShopRequiredError} from 'server/errors';
import {IResponseError} from 'shared/response';
import {ICartPermission} from 'server/permissions/cart/cart-permission.d';

export class CartPermission implements ICartPermission {
  constructor() {
  }

  canShowAll(req, res, next) {
    if(req.user && req.user.hasShopAdminRole(req.shop)) {
      next();
    }  else {
      next(new ForbiddenError("You don't have permission to show all carts"));
    }
  }

  canShowSession(req, res, next) {
    // Shop is required to make this request
    if(! req.shop) {
      throw new ShopRequiredError();
    } else if(! req.user) {
      throw new UnauthorizedError("You have to login to access this resource");
    }
  }

  canShowById(req, res, next) {
    if(! req.user) {
      throw new UnauthorizedError("You have to login to access this resource");
    } else if(req.user.isMerchant(req.shop) || req.cart.creator_id === req.user._id) {
      next();
    }  else {
      throw new ForbiddenError("You don't have permission to show this cart");
    }
  }
}

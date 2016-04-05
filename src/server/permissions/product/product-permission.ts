import {ForbiddenError, UnauthorizedError, ShopRequiredError} from 'server/errors';
import {IResponseError} from 'shared/response';
import {IProductPermission} from 'server/permissions/product/product-permission.d';

export class ProductPermission implements IProductPermission {
  constructor() {
  }

  canShowAll(req, res, next) {
    next();
  }

  canShowById(req, res, next) {
    next();
  }

  canCreate(req, res, next) {
    if(! req.shop) {
      throw new ShopRequiredError();
    } else if(req.user && req.user.hasShopAdminRole(req.shop)) {
      next();
    } else {
      next(new ForbiddenError("You don't have permission to create this resource"));
    }
  }

  canReplace(req, res, next) {
    if(req.user && req.user.hasShopAdminRole(req.product.shop_id)) {
      next();
    } else {
      next(new ForbiddenError("You don't have permission to replace this resource"));
    }
  }

  canUpdate(req, res, next) {
    if(req.user && req.user.hasShopAdminRole(req.product.shop_id)) {
      next();
    } else {
      next(new ForbiddenError("You don't have permission to update this resource"));
    }
  }

  canRemove(req, res, next) {
    if(req.user && req.user.hasShopAdminRole(req.product.shop_id)) {
      next();
    } else {
      next(new ForbiddenError("You don't have permission to remove this resource"));
    }
  }
}

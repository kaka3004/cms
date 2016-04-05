import {ForbiddenError, UnauthorizedError} from 'server/errors';
import {IResponseError} from 'shared/response';
import {ICategoryPermission} from 'server/permissions/category/category-permission.d';

export class CategoryPermission implements ICategoryPermission {
  constructor() {
  }

  canShowAll(req, res, next) {
    next();
  }

  canShowById(req, res, next) {
    next();
  }
}

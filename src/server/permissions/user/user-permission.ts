import {ForbiddenError, UnauthorizedError} from 'server/errors';
import {IResponseError} from 'shared/response';
import {IUserPermission} from 'server/permissions/user/user-permission.d';

export class UserPermission implements IUserPermission {
  constructor() {
  }

  private isSuperUser(req) {
    return req.user && req.user.username === 'kareem';
  }

  canShowAll(req, res, next) {
    // Admins
    if(this.isSuperUser(req)) {
      next();
    } else {
      next(new ForbiddenError("You don't have permission to show this resource"));
    }
  }

  canShowById(req, res, next) {
    // Admins
    if(this.isSuperUser(req)) {
      next();
    } else {
      next(new ForbiddenError("You don't have permission to show this resource"));
    }
  }

  canShowSession(req, res, next) {
    if(! req.user) {
      next(new UnauthorizedError("You are not logged in"));
    } else {
      next();
    }
  }
}

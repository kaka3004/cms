import {ForbiddenError, UnauthorizedError} from 'server/errors';
import {IResponseError} from 'shared/response';
import {IBasePermission} from 'server/permissions/base/base-permission.d';

export class BasePermission implements IBasePermission {
  constructor() {
  }
}

import {ValidationError, ModelNotFoundError} from 'server/errors';
import {IBaseController} from 'server/controllers/base/base-controller.d';
import * as Q from 'q';

export class BaseController implements IBaseController {
  protected successResponse(res, result = null) {
    res.json({result, statusCode: 200});
  }
}

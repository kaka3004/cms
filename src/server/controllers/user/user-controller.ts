import {BaseController} from 'server/controllers/base/base-controller';
import {ValidationError, ModelNotFoundError} from 'server/errors';
import {IUserRepository} from 'server/repositories/user/user-repository.d';
import {IUserController} from 'server/controllers/user/user-controller.d';

export class UserController extends BaseController implements IUserController {
  
  constructor(private userRepository: IUserRepository) {
    super();
  }

  fetch(req, res, next, id) {
    this.userRepository.findById(id)
      .onFulfill((user) => {
        if(! user) {
          throw new ModelNotFoundError(id);
        }
        req.fetchedUser = user;
        next();
      }).onReject(next);
  }

  all(req, res, next) {
    this.userRepository.find(req.query)
      .onFulfill((users) => {
        this.successResponse(res, users);
      }).onReject(next);
  }

  findById(req, res, next) {
    this.successResponse(res, req.fetchedUser);
  }

  session(req, res, next) {
    this.successResponse(res, req.user);
  }
}
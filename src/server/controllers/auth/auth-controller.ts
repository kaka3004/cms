import {BaseController} from 'server/controllers/base/base-controller';
import {ValidationError, UnauthorizedError} from 'server/errors';
import {IAuthController} from 'server/controllers/auth/auth-controller.d';
import {IUserRepository} from 'server/repositories/user/user-repository.d';
import * as jwt from 'jsonwebtoken';

export class AuthController extends BaseController implements IAuthController {
  
  constructor(private userRepository: IUserRepository, private privateKey: string) {
    super();
  }

  authenticateLocal(attributes) {
    // Authenticate local user
    let {email, password} = attributes;

    return this.userRepository.checkLocal(email, password);
  }

  createToken(req, res, next) {
    this.authenticateLocal(req.body)
      .then((user) => {
        let signedToken = jwt.sign({user_id: user._id}, this.privateKey);
        this.successResponse(res, {token: signedToken});
      })
      .then(null, next);
  }

  checkToken(req, res, next) {
    try {
      jwt.verify(req.body.token, this.privateKey);
      this.successResponse(res);
    } catch(exp) {
      next(new UnauthorizedError("Invalid token"));      
    }
  }
}

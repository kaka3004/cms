import {ForbiddenError, UnauthorizedError} from 'server/errors';
import {IResponseError} from 'shared/response';
import {ISessionMiddleware} from 'server/middlewares/session/session-middleware.d';
import {IUserRepository} from 'server/repositories/user/user-repository.d';
import {IShopRepository} from 'server/repositories/shop/shop-repository.d';
import * as jwt from 'jsonwebtoken';
import * as Q from 'q';

export class SessionMiddleware implements ISessionMiddleware {
  constructor(
    private userRepository: IUserRepository,
    private shopRepository: IShopRepository,
    private privateKey: string) {
  }

  private getShopId(req) {
    let shopId;

    if(req.get('Shop-Id')) {
      shopId = req.get('Shop-Id');
    } else if(req.query.shop_id) {
      shopId = req.query.shop_id;
    } else if(req.body.shop_id) {
      shopId = req.body.shop_id;
    }

    return shopId;    
  }

  private getToken(req) {
    let token;

    if(req.query.token) {
      token = req.query.token;
    }
    else if(req.get('Authorization')) {
      token = req.get('Authorization').replace('Bearer ', '');
    }

    return token;
  }

  private getDecodedUserId(token) {
    let deferred = Q.defer();

    jwt.verify(token, this.privateKey, function (err, decoded) {
      if(err) {
        deferred.reject(new UnauthorizedError("Invalid token"));
      } else {
        deferred.resolve(decoded.user_id);
      }
    });

    return deferred.promise;
  }

  /**
   * Save user in the request. If user doesn't exist we don't throw an error
   * @param {[type]}   req  [description]
   * @param {[type]}   res  [description]
   * @param {Function} next [description]
   */
  setUser(req, res, next) {
    let token = this.getToken(req);

    if(! token) {
      return next();
    }

    this.getDecodedUserId(token)
      .then(user_id => this.userRepository.findById(user_id))
      .then((user) => {
        if(! user) {
          throw new UnauthorizedError("Invalid token");
        }
        req.user = user;
        next();
      })
      .then(null, next);
  }

  setShop(req, res, next) {
    let shopId = this.getShopId(req);

    if(! shopId) {
      return next();
    }

    this.shopRepository.findById(shopId)
      .then((shop) => {
        req.shop = shop;
        next();
      })
      // Don't fail if error happened
      .then(null, next);
  }
}

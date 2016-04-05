import {BaseController} from 'server/controllers/base/base-controller';
import {ValidationError, ModelNotFoundError} from 'server/errors';
import {ICartRepository} from 'server/repositories/cart/cart-repository.d';
import {ICartController} from 'server/controllers/cart/cart-controller.d';

export class CartController extends BaseController implements ICartController {
  
  constructor(private cartRepository: ICartRepository) {
    super();
  }

  fetch(req, res, next, id) {
    this.cartRepository.findById(id)
      .onFulfill((cart) => {
        if(! cart) {
          throw new ModelNotFoundError(id);
        }
        req.cart = cart;
        next();
      }).onReject(next);
  }

  all(req, res, next) {
    return this.cartRepository.find(req.query)
      .then((carts) => this.successResponse(res, carts))
      .then(null, next);
  }

  session(req, res, next) {
    return this.cartRepository.find({
      shop_id: req.shop._id,
      user_id: req.user._id
    }).onFulfill((carts) => {
      this.successResponse(res, carts);
    }).onReject(next);
  }

  findById(req, res, next) {
    this.successResponse(res, req.cart);
  }
}
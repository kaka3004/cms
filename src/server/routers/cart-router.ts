import {Router} from 'express';
import {ICartController} from 'server/controllers/cart/cart-controller.d';
import {ICartPermission} from 'server/permissions/cart/cart-permission.d';

export function configureCartRouter(cartController: ICartController, cartPermission: ICartPermission) {
  const cartRouter = Router();

  cartRouter.param('cartId', cartController.fetch.bind(cartController));
  
  // Only super admins can access this url
  cartRouter.get('/',
    cartPermission.canShowAll.bind(cartPermission),
    cartController.all.bind(cartController));
  
  // Only shop admins can access this method
  cartRouter.get('/session',
    cartController.session.bind(cartController));
  
  // Get a cart by id
  cartRouter.get('/:cartId',
    cartPermission.canShowById.bind(cartPermission),
    cartController.findById.bind(cartController));

  return cartRouter;
}


import {Router} from 'express';
import {configureProductRouter} from 'server/routers/product-router';
import {configureCartRouter} from 'server/routers/cart-router';
import {configureCategoryRouter} from 'server/routers/category-router';
import {configureUserRouter} from 'server/routers/user-router';
import {configureShopRouter} from 'server/routers/shop-router';
import {configureFirsttimeRouter} from 'server/routers/firsttime-router';
import {configureAuthRouter} from 'server/routers/auth-router';

export function configureRouter(controllers, permissions) {
  let apiRouter = Router();
  // Configure product router
  apiRouter.use('/api/v1/product',
    configureProductRouter(controllers.productController, permissions.productPermission));
  // Configure cart router
  apiRouter.use('/api/v1/cart',
    configureCartRouter(controllers.cartController, permissions.cartPermission));
  // Configure category router
  apiRouter.use('/api/v1/category',
    configureCategoryRouter(controllers.categoryController, permissions.categoryPermission));
  // Configure user router
  apiRouter.use('/api/v1/user',
    configureUserRouter(controllers.userController, permissions.userPermission));
  // Configure shop router
  apiRouter.use('/api/v1/shop',
    configureShopRouter(controllers.shopController, permissions.shopPermission));
  // Configure auth router
  apiRouter.use('/api/v1/auth', configureAuthRouter(controllers.authController));

  apiRouter.use('/firsttime', configureFirsttimeRouter(controllers.firsttimeController));

  return apiRouter;
}
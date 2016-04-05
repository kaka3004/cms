import {ProductRepository} from 'server/repositories/product/product-repository';
import {CategoryRepository} from 'server/repositories/category/category-repository';
import {CartRepository} from 'server/repositories/cart/cart-repository';
import {ShopRepository} from 'server/repositories/shop/shop-repository';
import {UserRepository} from 'server/repositories/user/user-repository';

import {ProductController} from 'server/controllers/product/product-controller';
import {CartController} from 'server/controllers/cart/cart-controller';
import {CategoryController} from 'server/controllers/category/category-controller';
import {ShopController} from 'server/controllers/shop/shop-controller';
import {UserController} from 'server/controllers/user/user-controller';
import {FirsttimeController} from 'server/controllers/firsttime/firsttime-controller';
import {AuthController} from 'server/controllers/auth/auth-controller';

import {ProductPermission} from 'server/permissions/product/product-permission';
import {CartPermission} from 'server/permissions/cart/cart-permission';
import {CategoryPermission} from 'server/permissions/category/category-permission';
import {ShopPermission} from 'server/permissions/shop/shop-permission';
import {UserPermission} from 'server/permissions/user/user-permission';

import {ErrorMiddleware} from 'server/middlewares/error/error-middleware';
import {SessionMiddleware} from 'server/middlewares/session/session-middleware';

export function configureKernel() {
  const privateKey = process.env.SECRET;

  const productRepository = new ProductRepository();
  const categoryRepository = new CategoryRepository();
  const cartRepository = new CartRepository();
  const shopRepository = new ShopRepository();
  const userRepository = new UserRepository();

  // Bind controllers
  const productController = new ProductController(productRepository);
  const cartController = new CartController(cartRepository);
  const categoryController = new CategoryController(categoryRepository);
  const shopController = new ShopController(shopRepository);
  const userController = new UserController(userRepository);
  const firsttimeController = new FirsttimeController(userRepository, shopRepository, categoryRepository);
  const authController = new AuthController(userRepository, privateKey);

  // Bind permissions
  const productPermission = new ProductPermission();
  const cartPermission = new CartPermission();
  const categoryPermission = new CategoryPermission();
  const shopPermission = new ShopPermission();
  const userPermission = new UserPermission();

  // Bind middlewares
  const errorMiddleware = new ErrorMiddleware();
  const sessionMiddleware = new SessionMiddleware(userRepository, shopRepository, privateKey);

  return {
    // Bind controllers used in our app
    controllers: {
      productController,
      cartController,
      categoryController,
      shopController,
      userController,
      firsttimeController,
      authController
    },

    permissions: {
      productPermission,
      cartPermission,
      categoryPermission,
      shopPermission,
      userPermission
    },

    middlewares: {
      errorMiddleware,
      sessionMiddleware
    }
  };
}

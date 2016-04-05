import {Router} from 'express';
import {IShopController} from 'server/controllers/shop/shop-controller.d';
import {IShopPermission} from 'server/permissions/shop/shop-permission.d';

export function configureShopRouter(shopController: IShopController, shopPermission: IShopPermission) {
  const shopRouter = Router();

  shopRouter.param('shopId', shopController.fetch.bind(shopController));

  // Get a shop by id
  shopRouter.get('/session',
    shopPermission.canShowSession.bind(shopPermission),
    shopController.session.bind(shopController));

  // Get all shops
  shopRouter.get('',
    shopPermission.canShowAll.bind(shopPermission),
    shopController.all.bind(shopController));

  // Get a shop by id
  shopRouter.get('/:shopId',
    shopPermission.canShowById.bind(shopPermission),
    shopController.findById.bind(shopController));

  return shopRouter;
}


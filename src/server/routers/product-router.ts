import {Router} from 'express';
import {IProductController} from 'server/controllers/product/product-controller.d';
import {IProductPermission} from 'server/permissions/product/product-permission.d';

export function configureProductRouter(productController: IProductController, productPermission: IProductPermission) {
  const productRouter = Router();

  productRouter.param('productId', productController.fetch.bind(productController));

  // Get all products
  productRouter.get('',
    productPermission.canShowAll.bind(productPermission),
    productController.all.bind(productController));

  // Get a product by id
  productRouter.get('/:productId',
    productPermission.canShowById.bind(productPermission),
    productController.findById.bind(productController));
  
  // Create new product
  productRouter.post('/',
    productPermission.canCreate.bind(productPermission),
    productController.create.bind(productController));
  
  // Replace product attributes
  productRouter.put('/:productId',
    productPermission.canReplace.bind(productPermission),
    productController.replace.bind(productController));
  
  // Update a product attributes
  productRouter.patch('/:productId',
    productPermission.canUpdate.bind(productPermission),
    productController.update.bind(productController));
  
  // Delete a product
  productRouter.delete('/:productId',
    productPermission.canRemove.bind(productPermission),
    productController.remove.bind(productController));

  return productRouter;
}


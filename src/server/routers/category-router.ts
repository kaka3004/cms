import {Router} from 'express';
import {ICategoryController} from 'server/controllers/category/category-controller.d';
import {ICategoryPermission} from 'server/permissions/category/category-permission.d';

export function configureCategoryRouter(categoryController: ICategoryController, categoryPermission: ICategoryPermission) {
  const categoryRouter = Router();

  categoryRouter.param('categoryId', categoryController.fetch.bind(categoryController));

  // Get all categories
  categoryRouter.get('',
    categoryPermission.canShowAll.bind(categoryPermission),
    categoryController.all.bind(categoryController));

  // Get a category by id
  categoryRouter.get('/:categoryId',
    categoryPermission.canShowById.bind(categoryPermission),
    categoryController.findById.bind(categoryController));

  return categoryRouter;
}


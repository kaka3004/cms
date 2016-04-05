import {Router} from 'express';
import {IUserController} from 'server/controllers/user/user-controller.d';
import {IUserPermission} from 'server/permissions/user/user-permission.d';

export function configureUserRouter(userController: IUserController, userPermission: IUserPermission) {
  const userRouter = Router();

  userRouter.param('userId', userController.fetch.bind(userController));

  // Get user in the session
  userRouter.get('/session',
    userPermission.canShowSession.bind(userPermission),
    userController.session.bind(userController));

  // Get all users
  userRouter.get('',
    userPermission.canShowAll.bind(userPermission),
    userController.all.bind(userController));

  // Get a user by id
  userRouter.get('/:userId',
    userPermission.canShowById.bind(userPermission),
    userController.findById.bind(userController));

  return userRouter;
}


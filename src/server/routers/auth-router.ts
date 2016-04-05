import {Router} from 'express';
import {AuthController} from 'server/controllers/auth/auth-controller';

export function configureAuthRouter(authController: AuthController) {
  const authRouter = Router();

  authRouter.post('/token', authController.createToken.bind(authController));
  authRouter.post('/check', authController.checkToken.bind(authController));

  return authRouter;
}


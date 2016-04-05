import {Router} from 'express';
import {FirsttimeController} from 'server/controllers/firsttime/firsttime-controller';

export function configureFirsttimeRouter(firsttimeController: FirsttimeController) {
  const firsttimeRouter = Router();

  // Get all firsttimes
  firsttimeRouter.post('/setup', firsttimeController.setupTestShop.bind(firsttimeController));
  firsttimeRouter.post('/categories', firsttimeController.setupCategories.bind(firsttimeController));

  return firsttimeRouter;
}


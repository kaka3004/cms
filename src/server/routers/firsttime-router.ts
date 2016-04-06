import {Router} from 'express';
import {FirsttimeController} from 'server/controllers/firsttime/firsttime-controller';

export function configureFirsttimeRouter(firsttimeController: FirsttimeController) {
  const firsttimeRouter = Router();

  firsttimeRouter.get('/setup', 
    firsttimeController.setupTestShop.bind(firsttimeController),
    firsttimeController.setupCategories.bind(firsttimeController),
    function(req, res, next) {
      res.send({ statusCode: 200, result: 'Database seeded!' });
    });

  return firsttimeRouter;
}


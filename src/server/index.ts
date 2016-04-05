import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as http from 'http';
import {Mongoose} from 'mongoose';
import {configureMongoose} from 'server/config/mongoose-config';
import {configureModels} from 'server/config/models-config';
import {configureKernel} from 'server/config/kernel-config';
import {configureRouter} from 'server/config/router-config';

export const port = process.env.PORT;

export var mongoose: Mongoose;
export var kernel;
export var router;

/**
 * Create http server with the given middlewares
 * This way we can allow injecting middlewares e.g. 'webpack hot middleware'
 * @param {[any]} middlewares = Middlwares to inject
 */
export function serve(middlewares = [], BaseDirname) {

  var app = new (<any>Express)();

  for(let i = 0; i < middlewares.length; i++) {
    app.use(middlewares[i]);
  }

  app.use(bodyParser.json());

  // Configuration
  mongoose = configureMongoose();
  kernel = configureKernel();

  let {errorMiddleware, sessionMiddleware} = kernel.middlewares;

  // Configure models
  configureModels(mongoose);

  // Configure router
  router = configureRouter(kernel.controllers, kernel.permissions);

  // use middlewares in our application before router
  app.use(sessionMiddleware.setUser.bind(sessionMiddleware));
  app.use(sessionMiddleware.setShop.bind(sessionMiddleware));

  app.use(router);

  app.use(errorMiddleware.logErrors.bind(errorMiddleware));
  app.use(errorMiddleware.response.bind(errorMiddleware));

  app.use(Express.static(path.join(BaseDirname, 'public')));

  app.get('/*', function(req, res, next) {
    return res.sendFile(path.join(BaseDirname, 'src/client/index.html'));
  });

  var server = http.createServer(app);

  server.listen(port, () => console.log(`Server is listening on port ${port}`));

  return server;
}

export interface IErrorMiddleware {
  logErrors(err, req, res, next);
  response(err, req, res, next);
}
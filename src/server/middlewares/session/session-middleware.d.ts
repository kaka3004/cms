export interface ISessionMiddleware {
  // Get user from token and set in the request
  setUser(req, res, next);
  // Get shop from url and set in the request
  setShop(req, res, next);
}
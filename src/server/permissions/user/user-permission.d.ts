export interface IUserPermission {
  canShowAll(req, res, next);
  canShowById(req, res, next);
  canShowSession(req, res, next);
}

export interface ICartPermission {
  canShowAll(req, res, next);
  canShowById(req, res, next);
  canShowSession(req, res, next);
}

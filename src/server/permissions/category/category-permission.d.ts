export interface ICategoryPermission {
  canShowAll(req, res, next);
  canShowById(req, res, next);
}

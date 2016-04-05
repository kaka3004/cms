export interface IProductPermission {
  canShowAll(req, res, next);
  canShowById(req, res, next);
  canCreate(req, res, next);
  canReplace(req, res, next);
  canUpdate(req, res, next);
  canRemove(req, res, next);
}

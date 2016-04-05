export interface IProductActions {
  findById(instanceName, id);
  all();
  create(instanceName, attributes);
  update(instanceName, id, attributes);
  replace(instanceName, id, attributes);
  remove(instanceName, id);
  reset(instanceName);
}
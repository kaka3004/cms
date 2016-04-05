export interface ICartActions {
  findById(instanceName, id);
  all();
  reset(instanceName);
}
export interface ISessionActions {
  fetchUser();
  fetchShop(shopId?);

  resetUser();
  resetShop();
}
import {Store} from 'redux';
import {routerActions} from 'react-router-redux';

import {ProductApi} from 'client/apis/product/product-api';
import {AuthApi} from 'client/apis/auth/auth-api';
import {UserApi} from 'client/apis/user/user-api';
import {ShopApi} from 'client/apis/shop/shop-api';
import {CategoryApi} from 'client/apis/category/category-api';

import {LocationActions} from 'client/actions/location/location-actions';
import {ProductActions} from 'client/actions/product/product-actions';
import {AuthActions} from 'client/actions/auth/auth-actions';
import {SessionActions} from 'client/actions/session/session-actions';
import {CategoryActions} from 'client/actions/category/category-actions';

export function configureKernel(store: Store) {
  // Bind apis
  const productApi = new ProductApi();
  const userApi = new UserApi();
  const shopApi = new ShopApi();
  const authApi = new AuthApi();
  const categoryApi = new CategoryApi();

  // Bind actions
  const locationActions = new LocationActions(store.getState, routerActions);
  const productActions = new ProductActions(store.getState, productApi);
  const authActions = new AuthActions(store.getState, authApi);
  const sessionActions = new SessionActions(store.getState, userApi, shopApi);
  const categoryActions = new CategoryActions(store.getState, categoryApi);

  return {
    store,

    apis: {
      productApi,
      authApi,
      userApi,
      shopApi,
      categoryApi
    },

    // Bind actions used in our app
    actions: {
      locationActions,
      productActions,
      authActions,
      sessionActions,
      categoryActions
    }
  };
}

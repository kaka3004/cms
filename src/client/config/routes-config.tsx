import * as React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import ConnectedAppContainer from 'client/containers/app-container';
import ConnectedDashboardPage from 'client/pages/dashboard/dashboard-page';
import ConnectedCreateProductPage from 'client/pages/product/create-product/create-product-page';
import ConnectedEditProductPage from 'client/pages/product/edit-product/edit-product-page';
import ConnectedProductDetaills from 'client/pages/product/show-product/show-product-page';
import ConnectedListProductsPage from 'client/pages/product/list-products/list-products-page';
import ConnectedLoginPage from 'client/pages/auth/login/login-page';
import ConnectedSessionLoadingPage from 'client/pages/auth/session-loading/session-loading-page';
import {kernel} from 'client/app/index';
import {IState} from 'client/reducers/index';

function requireGuest(nextState, replace) {
  let state: IState = kernel.store.getState();

  // authenticated, no need to login
  if(!!state.auth.token) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function requireAuth(nextState, replace) {
  let state: IState = kernel.store.getState();

  // Not authenticated then redirect to login page
  if(!state.auth.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function requireAuthAndSession(nextState, replace) {
  let state: IState = kernel.store.getState();

  requireAuth(nextState, replace);

  // If session is not ready then go to the loading page to fetch session first
  if(!state.session.shop.id || !state.session.user.id) {
    replace({
      pathname: '/loading',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export function configureRoutes(history) {
  return (
    <Router history={history}>

      <Route path="/login"
        component={ConnectedLoginPage} onEnter={requireGuest} />

      <Route path="/loading"
        component={ConnectedSessionLoadingPage} onEnter={requireAuth} />

      <Route path="/"
        component={ConnectedAppContainer} onEnter={requireAuthAndSession}>
        <IndexRoute
          component={ConnectedDashboardPage} />
        <Route path="/products/create"
          component={ConnectedCreateProductPage} />
        <Route path="/products/update/:id"
          component={ConnectedEditProductPage} />
        <Route path="/products/show/:id"
          component={ConnectedProductDetaills} />
        <Route path="/products"
          component={ConnectedListProductsPage} />
      </Route>

    </Router>
  );
}

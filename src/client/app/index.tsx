import * as React from "react";
import * as ReactDOM from "react-dom";
import RootContainer from 'client/containers/root-container';
import {registerActionCreators} from 'client/actions/register';
import {configureRoutes} from 'client/config/routes-config';
import {configureStore} from 'client/config/store-config';
import {configureKernel} from 'client/config/kernel-config';
import {configureMaterialUi} from 'client/config/material-config';
import {IState} from 'client/reducers/index';

configureMaterialUi();

const {store, history} = configureStore();
const routes = configureRoutes(history);
export const kernel = configureKernel(store);

let access_token;
store.subscribe(() => {
  let new_token = store.getState().auth.token;
  // When token changes, inject it in all apis
  if(new_token != access_token) {
    access_token = new_token;

    for(let key in kernel.apis) {
      kernel.apis[key].setAccessToken(access_token);
    }
  }
});

registerActionCreators();

ReactDOM.render(
  <RootContainer store={store} routes={routes} />,
  document.getElementById("root")
)

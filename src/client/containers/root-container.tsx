import * as React from "react";
import {Provider} from "react-redux";
import {DevToolsComponent} from 'client/components/dev/dev-tools/dev-tools-component';
import {isDevEnv} from "shared/helpers";

interface IProps {
  store: any;
  routes: any;
}

export default class RootContainer extends React.Component<IProps, any> {

  render() {
    const { store, routes } = this.props;
    return (
      <Provider store={store}>
        <div>
          {routes}
          {isDevEnv() && <DevToolsComponent />}
        </div>
      </Provider>
    )
  }
}

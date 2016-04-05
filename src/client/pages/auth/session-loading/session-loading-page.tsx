import * as React from "react";
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'client/app/index';
import {ApiErrorComponent} from 'client/components/errors/api-error/api-error-component';
import {AuthActions} from 'client/actions/auth/auth-actions';
import {SessionActions} from 'client/actions/session/session-actions';
import {LocationActions} from 'client/actions/location/location-actions';
import {IUserSessionState} from 'client/reducers/session';
import {IShopSessionState} from 'client/reducers/session';
import {ApiError} from 'client/apis/base/api-error';
import {IState} from 'client/reducers/index';
import {IUser} from 'shared/models/user';
import {IShop} from 'shared/models/shop';
import {LoginFormComponent} from 'client/components/auth/login-form/login-form-component';

interface IProps extends React.Props<SessionLoadingPage> {
  nextPathname: string;
  error: ApiError;
  user: IUser;
  shop: IShop;
  sessionActions: SessionActions;
  locationActions: LocationActions;
  authActions: AuthActions;
}

export class SessionLoadingPage extends React.Component<IProps, any> {

  componentWillReceiveProps(nextProps: IProps) {

    if(nextProps.error && nextProps.error.isInvalidToken()) {
      this.props.locationActions.push(`login`);
      this.props.sessionActions.resetUser();
      this.props.sessionActions.resetShop();
    }

    else if(nextProps.error) {
      return;      
    }

    // Both user and shop fetched successfully
    else if(nextProps.user && nextProps.shop) {
      this.props.locationActions.push(nextProps.nextPathname);
    }

    // If user fetched successfully then go fetch first shop for this user
    else if(nextProps.user) {
      console.log(nextProps.user.roles);
      this.props.sessionActions.fetchShop(nextProps.user.roles[0].shop_id);
    }
  }

  componentWillMount() {
    this.props.sessionActions.fetchUser();
  }

  /**
   * In this page dave should be able to create products
   */
  render() {
    let result;

    if(this.props.error) {
      result = <ApiErrorComponent error={this.props.error} />;
    } else {
      result = <CircularProgress />;
    }
    return (
      <div className="session-loading-page">
        {result}
      </div>
    )
  }
}

function mapStateToProps({routing, session, entities}: IState) {

  let user = session.user.id ? entities.users[session.user.id] : null;
  let shop = session.shop.id ? entities.shops[session.shop.id] : null;
  let error = session.shop.error || session.user.error;
  let nextPathname = routing.locationBeforeTransitions.state.nextPathname;

  return { user, shop, error, nextPathname };
}

function mapDispatchToProps() {
  return {
    sessionActions: kernel.actions.sessionActions,
    locationActions: kernel.actions.locationActions,
    authActions: kernel.actions.authActions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionLoadingPage);
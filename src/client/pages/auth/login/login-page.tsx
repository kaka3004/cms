import * as React from "react";
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'client/app/index';
import {ApiErrorComponent} from 'client/components/errors/api-error/api-error-component';
import {LoginFormComponent} from 'client/components/auth/login-form/login-form-component';
import {AuthActions} from 'client/actions/auth/auth-actions';
import {LocationActions} from 'client/actions/location/location-actions';
import {IState} from 'client/reducers/index';
import {ApiError} from 'client/apis/base/api-error';

interface IProps extends React.Props<LoginPage> {
  error: ApiError;
  isUpdating: boolean;
  token: string;
  authActions: AuthActions;
  locationActions: LocationActions;
}

export class LoginPage extends React.Component<IProps, any> {

  componentWillReceiveProps(nextProps: IProps) {
    // Token created successfully
    if(nextProps.token) {
      this.props.locationActions.push(`/`);
    }
  }

  login(email, password) {
    this.props.authActions.createToken(email, password);
  }

  /**
   * In this page dave should be able to create products
   */
  render() {
    let result;
    if(this.props.isUpdating) {
      result = <CircularProgress />;
    } else {
      result = (
        <div>
          {
            this.props.error ? 
            <ApiErrorComponent
              error={this.props.error}/> : null
          }
          <LoginFormComponent
            onLogin={(email, pwd) => this.login(email, pwd)} />
        </div>
      );
    }
    return (
      <div className="create-product-page">
        {result}
      </div>
    )
  }
}

function mapStateToProps({auth}: IState) {
  return {
    token: auth.token,
    isUpdating: !!auth.isUpdating,
    error: auth.error
  };
}

function mapDispatchToProps() {
  return {
    authActions: kernel.actions.authActions,
    locationActions: kernel.actions.locationActions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
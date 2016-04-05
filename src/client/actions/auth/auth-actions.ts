import {BaseActions} from 'client/actions/base/base-actions';
import {IAuthActions} from 'client/actions/auth/auth-actions.d';
import {AUTH_ACTIONS} from 'client/constants/actions-constants';
import {IAuthApi} from 'client/apis/auth/auth-api.d';

export class AuthActions extends BaseActions implements IAuthActions {
  constructor(getState, public authApi: IAuthApi) {
    super(getState);
  }

  /**
   * Find user in auth
   */
  public createToken(email, password) {
    if(this.state.auth.isUpdating) {
      return;
    }
    //
    this.onNext({
      type: AUTH_ACTIONS.CREATE_TOKEN_REQUEST
    });
    //
    let onSuccess = ({ result }) => {
      localStorage.setItem('token', result.token);
      this.onNext({
        type: AUTH_ACTIONS.CREATE_TOKEN_SUCCESS,
        payload: {token: result.token}
      });
    }
    //
    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: AUTH_ACTIONS.CREATE_TOKEN_FAILURE,
        payload: {error}
      })
    }
    //
    this.authApi.createToken(email, password)
      .subscribe(onSuccess, onError);
  }

  /**
   * Find user in auth
   */
  public checkToken(email, password) {
    if(this.state.auth.isUpdating) {
      return;
    }
    //
    this.onNext({
      type: AUTH_ACTIONS.CHECK_TOKEN_REQUEST
    });
    //
    let onSuccess = ({ result }) => {
      this.onNext({
        type: AUTH_ACTIONS.CHECK_TOKEN_SUCCESS,
        payload: {token: result.token}
      });
    }
    //
    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: AUTH_ACTIONS.CHECK_TOKEN_FAILURE,
        payload: {error}
      })
    }
    //
    this.authApi.checkToken(email, password)
      .subscribe(onSuccess, onError);
  }
}

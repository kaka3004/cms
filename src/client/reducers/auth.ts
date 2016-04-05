import {combineReducers} from 'redux';
import {AUTH_ACTIONS} from 'client/constants/actions-constants';
import {ApiError} from 'client/apis/base/api-error';

export interface IAuthState {
  token?: string;
  isUpdating?: boolean;
  error?: ApiError;
};

const initialState: IAuthState = {
  // @todo
  token: localStorage.getItem('token')
};

export function authReducer(auth: IAuthState = initialState, {type, payload}): IAuthState {
  switch(type) {
    case AUTH_ACTIONS.CREATE_TOKEN_REQUEST:
      return {
        isUpdating: true
      };

    case AUTH_ACTIONS.CREATE_TOKEN_SUCCESS:
      return {
        token: payload.token
      };

    case AUTH_ACTIONS.CREATE_TOKEN_FAILURE:
      return {
        error: payload.error
      };
  }

  return auth;
}

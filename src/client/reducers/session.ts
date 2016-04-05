import {combineReducers} from 'redux';
import {SESSION_ACTIONS} from 'client/constants/actions-constants';
import {ApiError} from 'client/apis/base/api-error';
import {IUser} from 'shared/models/user.d';
import {IShop} from 'shared/models/shop.d';

export interface IUserSessionState {
  isFetching: boolean;
  id?: string;
  error?: ApiError;
}

export interface IShopSessionState {
  isFetching: boolean;
  id?: string;
  error?: ApiError;
}

export interface ISessionState {
  user: IUserSessionState;
  shop: IShopSessionState;
};

const initialState: ISessionState = {
  user: {
    isFetching: false
  },
  shop: {
    isFetching: false
  }
};

function user(userSession: IUserSessionState = initialState.user, {type, payload}): IUserSessionState {
  switch(type) {
    case SESSION_ACTIONS.FETCH_USER_REQUEST:
      return {
        isFetching: true
      };

    case SESSION_ACTIONS.FETCH_USER_SUCCESS:
      return {
        isFetching: false,
        id: payload.id
      };

    case SESSION_ACTIONS.FETCH_USER_FAILURE:
      return {
        isFetching: false,
        error: payload.error
      }

    case SESSION_ACTIONS.RESET_USER:
      return initialState.user;
  }

  return userSession;
}

function shop(shopSession: IShopSessionState = initialState.shop, {type, payload}): IShopSessionState {
  switch(type) {
    case SESSION_ACTIONS.FETCH_SHOP_REQUEST:
      return {
        isFetching: true
      };

    case SESSION_ACTIONS.FETCH_SHOP_SUCCESS:
      return {
        isFetching: false,
        id: payload.id
      };

    case SESSION_ACTIONS.FETCH_SHOP_FAILURE:
      return {
        isFetching: false,
        error: payload.error
      }

    case SESSION_ACTIONS.RESET_SHOP:
      return initialState.shop;
  }

  return shopSession;
}

export const sessionReducer = combineReducers({
  user,
  shop
});

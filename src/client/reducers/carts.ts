import {combineReducers} from 'redux';
import {CART_ACTIONS} from 'client/constants/actions-constants';
import {ApiError} from 'client/apis/base/api-error';

export interface ICartState {
  isFetching: boolean;
  id?: string;
  error?: ApiError;
}

export interface ICartsListComponentState {
  isFetching: boolean;
  ids: string[];
  error?: ApiError;
};

export interface ICartsState {
  // Instance used in the details page
  detailsPage: ICartState,
  // List of carts
  list: ICartsListComponentState
};

const cartInitialState: ICartState = {
  isFetching: false
};

const listInitialState: ICartsListComponentState = {
  isFetching: false,
  ids: []
};

function cartReducer(cart: ICartState, {type, payload}): ICartState {
  switch(type) {
    case CART_ACTIONS.FETCH_REQUEST:
      return {
        isFetching: true,
        id: payload.result
      };

    case CART_ACTIONS.FETCH_FAILURE:
      return {
        isFetching: false,
        error: payload.error
      }

    case CART_ACTIONS.RESET:
      return cartInitialState;
  }

  return cart;
}

export function detailsPage(state: ICartState = cartInitialState, action): ICartState {
  if(action.payload && action.payload.instanceName === 'detailsPage') {
    return cartReducer(state, action);
  }
  return state;
}

export function list(state: ICartsListComponentState = listInitialState, {type, payload}): ICartsListComponentState {
  switch (type) {
    case CART_ACTIONS.FETCH_LIST_REQUEST:
      return {
        isFetching: true,
        ids: state.ids
      };

    case CART_ACTIONS.FETCH_LIST_SUCCESS:
      return {
        isFetching: false,
        ids: payload.result
      };

    case CART_ACTIONS.FETCH_LIST_FAILURE:
      return {
        isFetching: false,
        ids: [],
        error: payload.error
      }
  }

  return state;
}

export const cartsReducer = combineReducers({
  detailsPage,
  list
});

import {combineReducers} from 'redux';
import {PRODUCT_ACTIONS} from 'client/constants/actions-constants';
import {ApiError} from 'client/apis/base/api-error';

export interface IProductState {
  isUpdating: boolean;
  isFetching: boolean;
  id?: string;
  error?: ApiError;
}

export interface IProductsListComponentState {
  isFetching: boolean;
  ids: string[];
  error?: ApiError;
};

export interface IProductsState {
  // Instance used in the details page
  detailsPage: IProductState,
  // Instance used in the create page
  createPage: IProductState,
  // Instance used in the update page
  updatePage: IProductState,
  // List of products
  list: IProductsListComponentState
};

const productInitialState: IProductState = {
  isUpdating: false,
  isFetching: false
};

const listInitialState: IProductsListComponentState = {
  isFetching: false,
  ids: []
};

function productReducer(product: IProductState, {type, payload}): IProductState {
  switch(type) {
    case PRODUCT_ACTIONS.FETCH_REQUEST:
      return {
        isUpdating: false,
        isFetching: true,
        id: payload.result
      };

    case PRODUCT_ACTIONS.UPDATE_REQUEST:
    case PRODUCT_ACTIONS.REPLACE_REQUEST:
    case PRODUCT_ACTIONS.CREATE_REQUEST:
      return {
        isUpdating: true,
        isFetching: true,
        id: payload.result
      };

    case PRODUCT_ACTIONS.FETCH_SUCCESS:
    case PRODUCT_ACTIONS.UPDATE_SUCCESS:
    case PRODUCT_ACTIONS.REPLACE_SUCCESS:
    case PRODUCT_ACTIONS.CREATE_SUCCESS:
      return {
        isUpdating: false,
        isFetching: false,
        id: payload.result
      };

    case PRODUCT_ACTIONS.FETCH_FAILURE:
    case PRODUCT_ACTIONS.UPDATE_FAILURE:
    case PRODUCT_ACTIONS.REPLACE_FAILURE:
    case PRODUCT_ACTIONS.CREATE_FAILURE:
      return {
        isUpdating: false,
        isFetching: false,
        error: payload.error
      }

    case PRODUCT_ACTIONS.RESET:
      return productInitialState;
  }

  return product;
}

export function detailsPage(state: IProductState = productInitialState, action): IProductState {
  if(action.payload && action.payload.instanceName === 'detailsPage') {
    return productReducer(state, action);
  }
  return state;
}

export function createPage(state: IProductState = productInitialState, action): IProductState {
  if(action.payload && action.payload.instanceName === 'createPage') {
    return productReducer(state, action);
  }
  return state;
}

export function updatePage(state: IProductState = productInitialState, action): IProductState {
  if(action.payload && action.payload.instanceName === 'updatePage') {
    return productReducer(state, action);
  }
  return state;
}

export function list(state: IProductsListComponentState = listInitialState, {type, payload}): IProductsListComponentState {
  switch (type) {
    case PRODUCT_ACTIONS.FETCH_LIST_REQUEST:
      return {
        isFetching: true,
        ids: state.ids
      };

    case PRODUCT_ACTIONS.FETCH_LIST_SUCCESS:
      return {
        isFetching: false,
        ids: payload.result
      };

    case PRODUCT_ACTIONS.FETCH_LIST_FAILURE:
      return {
        isFetching: false,
        ids: [],
        error: payload.error
      }
  }

  return state;
}

export const productsReducer = combineReducers({
  detailsPage,
  createPage,
  updatePage,
  list
});

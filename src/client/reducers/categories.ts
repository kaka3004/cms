import {combineReducers} from 'redux';
import {CATEGORY_ACTIONS} from 'client/constants/actions-constants';
import {ApiError} from 'client/apis/base/api-error';

export interface ICategoryState {
  isFetching: boolean;
  id?: string;
  error?: ApiError;
}

export interface ICategoriesListComponentState {
  isFetching: boolean;
  ids: string[];
  error?: ApiError;
};

export interface ICategoriesState {
  // Instance used in the details page
  detailsPage: ICategoryState,
  // List of categories
  list: ICategoriesListComponentState
};

const categoryInitialState: ICategoryState = {
  isFetching: false
};

const listInitialState: ICategoriesListComponentState = {
  isFetching: false,
  ids: []
};

function categoryReducer(category: ICategoryState, {type, payload}): ICategoryState {
  switch(type) {
    case CATEGORY_ACTIONS.FETCH_REQUEST:
      return {
        isFetching: true,
        id: payload.result
      };

    case CATEGORY_ACTIONS.FETCH_FAILURE:
      return {
        isFetching: false,
        error: payload.error
      }

    case CATEGORY_ACTIONS.RESET:
      return categoryInitialState;
  }

  return category;
}

export function detailsPage(state: ICategoryState = categoryInitialState, action): ICategoryState {
  if(action.payload && action.payload.instanceName === 'detailsPage') {
    return categoryReducer(state, action);
  }
  return state;
}

export function list(state: ICategoriesListComponentState = listInitialState, {type, payload}): ICategoriesListComponentState {
  switch (type) {
    case CATEGORY_ACTIONS.FETCH_LIST_REQUEST:
      return {
        isFetching: true,
        ids: state.ids
      };

    case CATEGORY_ACTIONS.FETCH_LIST_SUCCESS:
      return {
        isFetching: false,
        ids: payload.result
      };

    case CATEGORY_ACTIONS.FETCH_LIST_FAILURE:
      return {
        isFetching: false,
        ids: [],
        error: payload.error
      }
  }

  return state;
}

export const categoriesReducer = combineReducers({
  detailsPage,
  list
});

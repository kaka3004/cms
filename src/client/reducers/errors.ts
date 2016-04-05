import {combineReducers} from 'redux';
import {ERRORS_ACTIONS} from 'client/constants/actions-constants';
import {ApiError} from 'client/apis/base/api-error';
import {IUser} from 'shared/models/user.d';
import {IShop} from 'shared/models/shop.d';

export interface IErrorsState extends Array<ApiError> {
}

const initialState = [];

export function errorsReducer(state = initialState, {type, error}) {
  if(type === ERRORS_ACTIONS.SAVE_API_ERROR) {
    return [...state, error];
  }

  return state;
}

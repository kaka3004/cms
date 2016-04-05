import {ENTITIES_ACTIONS} from 'client/constants/actions-constants';
import {merge} from 'shared/helpers';
import {IProduct} from 'shared/models/product';
import {IUser} from 'shared/models/user';
import {IShop} from 'shared/models/shop';
import {ICart} from 'shared/models/cart';
import {ICategory} from 'shared/models/category';

export interface IEntitiesState {
  products: { [id: string]: IProduct };
  carts: { [id: string]: ICart };
  categories: { [id: string]: ICategory };
  users: { [id: string]: IUser };
  shops: { [id: string]: IShop };
}

const initialState: IEntitiesState = {
  products: {},
  carts: {},
  categories: {},
  users: {},
  shops: {}
};

function entities(state: IEntitiesState = initialState, {type, payload}): IEntitiesState {
  // Save documents to entities
  if(type === ENTITIES_ACTIONS.SAVE) {
    let newState = merge({}, state);

    for(let entityName in state) {
      if(payload.entities[entityName]) {
        newState[entityName] = merge(state[entityName], payload.entities[entityName]);
      }
    }

    return newState;
  }
  // Remove document from specified entity
  else if(type === ENTITIES_ACTIONS.REMOVE) {
    let newState = merge({}, state);

    if(newState[payload.entityName] && newState[payload.entityName][payload.id]) {
      delete newState[payload.entityName][payload.id];
    }

    return newState;
  }

  return state;
}

export const entitiesReducer = entities;
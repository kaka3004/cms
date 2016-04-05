import {entitiesReducer, IEntitiesState} from 'client/reducers/entities';
import {productsReducer, IProductsState} from 'client/reducers/products';
import {categoriesReducer, ICategoriesState} from 'client/reducers/categories';
import {cartsReducer, ICartsState} from 'client/reducers/carts';
import {sessionReducer, ISessionState} from 'client/reducers/session';
import {authReducer, IAuthState} from 'client/reducers/auth';
import {errorsReducer, IErrorsState} from 'client/reducers/errors';

export interface IState {
  entities: IEntitiesState;
  products: IProductsState;
  categories: ICategoriesState;
  carts: ICartsState;
  session: ISessionState;
  auth: IAuthState;
  errors: IErrorsState;
  routing: any;
};

export const reducers = {
  entities: entitiesReducer,
  products: productsReducer,
  categories: categoriesReducer,
  carts: cartsReducer,
  session: sessionReducer,
  auth: authReducer,
  errors: errorsReducer
};

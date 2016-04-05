import {BaseActions} from 'client/actions/base/base-actions';
import {ISessionActions} from 'client/actions/session/session-actions.d';
import {SESSION_ACTIONS} from 'client/constants/actions-constants';
import {IUserApi} from 'client/apis/user/user-api.d';
import {IShopApi} from 'client/apis/shop/shop-api.d';

export class SessionActions extends BaseActions implements ISessionActions {
  constructor(getState, public userApi: IUserApi, public shopApi: IShopApi) {
    super(getState);
  }

  /**
   * Find user in session
   */
  public fetchUser() {
    if(this.state.session.user.isFetching) {
      return;
    }
    //
    this.onNext({
      type: SESSION_ACTIONS.FETCH_USER_REQUEST
    });
    //
    let onSuccess = ({ result, entities }) => {
      this.saveEntity(entities);
      this.onNext({
        type: SESSION_ACTIONS.FETCH_USER_SUCCESS,
        payload: {id: result}
      });
    }
    //
    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: SESSION_ACTIONS.FETCH_USER_FAILURE,
        payload: {error}
      })
    }
    //
    this.userApi.session()
      .subscribe(onSuccess, onError);
  }

  /**
   * Reset user in sesssion
   */
  public resetUser() {
    this.onNext({
      type: SESSION_ACTIONS.RESET_USER
    });
  }

  /**
   * Find shop in session
   */
  public fetchShop(shopId: string = null) {
    if(this.state.session.shop.isFetching) {
      return;
    }
    //
    this.onNext({
      type: SESSION_ACTIONS.FETCH_SHOP_REQUEST
    });
    //
    let onSuccess = ({ result, entities }) => {
      this.saveEntity(entities);
      this.onNext({
        type: SESSION_ACTIONS.FETCH_SHOP_SUCCESS,
        payload: {id: result}
      });
    }
    //
    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: SESSION_ACTIONS.FETCH_SHOP_FAILURE,
        payload: {error}
      })
    }
    //
    this.shopApi.session(shopId).subscribe(onSuccess, onError);
  }

  /**
   * Reset shop in sesssion
   */
  public resetShop() {
    this.onNext({
      type: SESSION_ACTIONS.RESET_SHOP
    });
  }
}

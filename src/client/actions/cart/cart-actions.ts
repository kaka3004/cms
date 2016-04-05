import {BaseActions} from 'client/actions/base/base-actions';
import {ICartActions} from 'client/actions/cart/cart-actions.d';
import {CART_ACTIONS} from 'client/constants/actions-constants';
import {ICartApi} from 'client/apis/cart/cart-api.d';

export class CartActions extends BaseActions implements ICartActions {
  constructor(getState, public cartApi: ICartApi) {
    super(getState);
  }

  /**
   * Find cart by id
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {string} id              Cart id
   */
  public findById(instanceName, id) {
    if(this.state.carts[instanceName].isFetching) {
      return;
    }
    //
    this.onNext({
      type: CART_ACTIONS.FETCH_REQUEST,
      payload: {id, instanceName}
    });
    //
    let onSuccess = ({ result, entities }) => {
      this.saveEntity(entities);
      this.onNext({
        type: CART_ACTIONS.FETCH_SUCCESS,
        payload: {result, instanceName}
      });
    }
    //
    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: CART_ACTIONS.FETCH_FAILURE,
        payload: {error, instanceName}
      })
    }
    //
    this.cartApi.findById(id).subscribe(onSuccess, onError);
  }


  /**
   * Get all carts
   */
  public all() {
    if(this.state.carts.list.isFetching) {
      return;
    }
    //
    this.onNext({ type: CART_ACTIONS.FETCH_LIST_REQUEST });
    //
    let onSuccess = ({entities, result}) => {
      this.saveEntity(entities);
      this.onNext({
        type: CART_ACTIONS.FETCH_LIST_SUCCESS,
        payload: {result}
      });
    }

    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: CART_ACTIONS.FETCH_LIST_FAILURE,
        payload: {error}
      })
    }

    this.cartApi.all().subscribe(onSuccess, onError);
  }

  /**
   * Reset instance
   * @param {string} instanceName Cart instance name
   */
  public reset(instanceName) {
    this.onNext({
      type: CART_ACTIONS.RESET,
      payload: {instanceName}
    });
  }
}

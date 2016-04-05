import {BaseActions} from 'client/actions/base/base-actions';
import {IProductActions} from 'client/actions/product/product-actions.d';
import {PRODUCT_ACTIONS} from 'client/constants/actions-constants';
import {IProductApi} from 'client/apis/product/product-api.d';

export class ProductActions extends BaseActions implements IProductActions {
  constructor(getState, public productApi: IProductApi) {
    super(getState);
  }

  /**
   * Find product by id
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {string} id              Product id
   */
  public findById(instanceName, id) {
    if(this.state.products[instanceName].isFetching ||
      this.state.products[instanceName].isUpdating) {
      return;
    }
    //
    this.onNext({
      type: PRODUCT_ACTIONS.FETCH_REQUEST,
      payload: {id, instanceName}
    });
    //
    let onSuccess = ({ result, entities }) => {
      this.saveEntity(entities);
      this.onNext({
        type: PRODUCT_ACTIONS.FETCH_SUCCESS,
        payload: {result, instanceName}
      });
    }
    //
    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: PRODUCT_ACTIONS.FETCH_FAILURE,
        payload: {error, instanceName}
      })
    }
    //
    this.productApi.findById(id).subscribe(onSuccess, onError);
  }


  /**
   * Get all products
   */
  public all() {
    if(this.state.products.list.isFetching) {
      return;
    }
    //
    this.onNext({ type: PRODUCT_ACTIONS.FETCH_LIST_REQUEST });
    //
    let onSuccess = ({entities, result}) => {
      this.saveEntity(entities);
      this.onNext({
        type: PRODUCT_ACTIONS.FETCH_LIST_SUCCESS,
        payload: {result}
      });
    }

    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: PRODUCT_ACTIONS.FETCH_LIST_FAILURE,
        payload: {error}
      })
    }

    this.productApi.all().subscribe(onSuccess, onError);
  }

  /**
   * Create new product
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {Object} attributes     Product attributes
   */
  public create(instanceName, attributes) {
    if(this.state.products[instanceName].isFetching) {
      return;
    }
    
    this.onNext({
      type: PRODUCT_ACTIONS.CREATE_REQUEST,
      payload: {instanceName}
    });

    let onSuccess = ({entities, result}) => {
      this.saveEntity(entities);
      this.onNext({
        type: PRODUCT_ACTIONS.CREATE_SUCCESS,
        payload: {result, instanceName}
      });
    }

    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: PRODUCT_ACTIONS.CREATE_FAILURE,
        payload: {error, instanceName}
      })
    }

    this.productApi.create(attributes, this.state.session.shop.id)
      .subscribe(onSuccess, onError);
  }

  /**
   * Update product
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {string} id         Product id
   * @param {Object} attributes Product attributes
   */
  public update(instanceName, id, attributes) {
    if(this.state.products[instanceName].isUpdating) {
      return;
    }
    
    this.onNext({
      type: PRODUCT_ACTIONS.UPDATE_REQUEST,
      payload: {id}
    });

    let onSuccess = ({entities, result}) => {
      this.saveEntity(entities);
      this.onNext({
        type: PRODUCT_ACTIONS.UPDATE_SUCCESS,
        payload: {result}
      });
    }

    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: PRODUCT_ACTIONS.UPDATE_FAILURE,
        payload: {error}
      })
    }

    this.productApi.update(id, attributes).subscribe(onSuccess, onError);
  }

  /**
   * Create new product
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {string} id         Product id
   * @param {Object} attributes     Product attributes
   */
  public replace(instanceName, id, attributes) {
    if(this.state.products[instanceName].isUpdating) {
      return;
    }
    
    this.onNext({
      type: PRODUCT_ACTIONS.REPLACE_REQUEST,
      payload: {id}
    });

    let onSuccess = ({entities, result}) => {
      this.saveEntity(entities);
      this.onNext({
        type: PRODUCT_ACTIONS.REPLACE_SUCCESS,
        payload: {result, instanceName}
      });
    }

    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: PRODUCT_ACTIONS.REPLACE_FAILURE,
        payload: {error, instanceName}
      })
    }

    this.productApi.replace(id, attributes).subscribe(onSuccess, onError);
  }

  /**
   * Create new product
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {string} id             Product id
   */
  public remove(id) {
    this.onNext({
      type: PRODUCT_ACTIONS.DELETE_REQUEST,
      payload: {id}
    });

    let onSuccess = () => {
      this.removeFromEntity('products', id);
      this.onNext({
        type: PRODUCT_ACTIONS.DELETE_SUCCESS,
        payload: {id}
      });
    }

    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: PRODUCT_ACTIONS.CREATE_FAILURE,
        payload: {error}
      })
    }

    this.productApi.remove(id).subscribe(onSuccess, onError);
  }

  /**
   * Reset instance
   * @param {string} instanceName Product instance name
   */
  public reset(instanceName) {
    this.onNext({
      type: PRODUCT_ACTIONS.RESET,
      payload: {instanceName}
    });
  }
}

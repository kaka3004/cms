import {BaseActions} from 'client/actions/base/base-actions';
import {ICategoryActions} from 'client/actions/category/category-actions.d';
import {CATEGORY_ACTIONS} from 'client/constants/actions-constants';
import {ICategoryApi} from 'client/apis/category/category-api.d';

export class CategoryActions extends BaseActions implements ICategoryActions {
  constructor(getState, public categoryApi: ICategoryApi) {
    super(getState);
  }

  /**
   * Find category by id
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {string} id              Category id
   */
  public findById(instanceName, id) {
    if(this.state.categories[instanceName].isFetching) {
      return;
    }
    //
    this.onNext({
      type: CATEGORY_ACTIONS.FETCH_REQUEST,
      payload: {id, instanceName}
    });
    //
    let onSuccess = ({ result, entities }) => {
      this.saveEntity(entities);
      this.onNext({
        type: CATEGORY_ACTIONS.FETCH_SUCCESS,
        payload: {result, instanceName}
      });
    }
    //
    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: CATEGORY_ACTIONS.FETCH_FAILURE,
        payload: {error, instanceName}
      })
    }
    //
    this.categoryApi.findById(id).subscribe(onSuccess, onError);
  }


  /**
   * Get all categories
   */
  public all() {
    if(this.state.categories.list.isFetching) {
      return;
    }
    //
    this.onNext({ type: CATEGORY_ACTIONS.FETCH_LIST_REQUEST });
    //
    let onSuccess = ({entities, result}) => {
      this.saveEntity(entities);
      this.onNext({
        type: CATEGORY_ACTIONS.FETCH_LIST_SUCCESS,
        payload: {result}
      });
    }

    let onError = (error) => {
      this.handleApiError(error);
      this.onNext({
        type: CATEGORY_ACTIONS.FETCH_LIST_FAILURE,
        payload: {error}
      })
    }

    this.categoryApi.all().subscribe(onSuccess, onError);
  }

  /**
   * Reset instance
   * @param {string} instanceName Category instance name
   */
  public reset(instanceName) {
    this.onNext({
      type: CATEGORY_ACTIONS.RESET,
      payload: {instanceName}
    });
  }
}

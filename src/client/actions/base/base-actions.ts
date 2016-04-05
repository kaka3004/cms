import {Subject} from 'rx';
import {ENTITIES_ACTIONS, ERRORS_ACTIONS, AUTH_ACTIONS} from 'client/constants/actions-constants';
import {IState} from 'client/reducers/index';
import {ApiError} from 'client/apis/base/api-error';

export abstract class BaseActions {

  protected observable: Subject<Object>;

  constructor(private getState) {
    this.observable = new Subject();
  }

  get state(): IState {
    return this.getState();
  }

  getObservable() {
    return this.observable;
  }

  protected onNext(action) {
    this.observable.onNext(action);
  }

  protected saveEntity(entities) {
    this.onNext({
      type: ENTITIES_ACTIONS.SAVE,
      payload: {entities}
    });
  }

  protected removeFromEntity(entityName, id) {
    this.onNext({
      type: ENTITIES_ACTIONS.REMOVE,
      payload: {entityName, id}
    });
  }

  /**
   * @param {ApiError} error
   */
  protected handleApiError(error: ApiError) {

    if(error.isInvalidToken()) {
      this.onNext({
        type: AUTH_ACTIONS.CREATE_TOKEN_FAILURE,
        payload: {error}
      });
    }

    this.onNext({
      type: ERRORS_ACTIONS.SAVE_API_ERROR,
      payload: {error}
    });
  }
}

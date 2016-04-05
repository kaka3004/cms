import {BaseActions} from 'client/actions/base/base-actions';
import {RouteActions} from 'react-router-redux';

export class LocationActions extends BaseActions {
  constructor(getState, public routeActions: RouteActions) {
    super(getState);
  }

  push(url) {
    this.onNext(this.routeActions.push({pathname: url}));
  };
}

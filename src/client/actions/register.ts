import {Observable} from 'rx';
import {kernel} from 'client/app/index';

export function registerActionCreators() {

  let observables = [];

  for(let key in kernel.actions) {
    observables.push(kernel.actions[key].getObservable());
  }

  Observable.merge(observables)
    .subscribe((action) => {
      kernel.store.dispatch(action);
    });
}
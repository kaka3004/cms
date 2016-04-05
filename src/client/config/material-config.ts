import * as injectTapEventPlugin from 'react-tap-event-plugin';

export function configureMaterialUi() {
  // This to solve iOS's dreaded 300ms tap delay
  // https://github.com/zilverline/react-tap-event-plugin
  (<any>injectTapEventPlugin)();
}

///////////////////////////////////
// Redux Dev tools
///////////////////////////////////
declare module ReduxDevTools {
  function createDevTools(component: any): any;
}
declare module "redux-devtools" {
  export = ReduxDevTools;
}
///////////////////////////////////
// Redux Log monitor
///////////////////////////////////
declare module "redux-devtools-log-monitor" {
  export default class LogMonitor extends __React.Component<any, any> {}
}
///////////////////////////////////
// Redux Dock monitor
///////////////////////////////////
declare module "redux-devtools-dock-monitor" {
  export default class DockMonitor extends __React.Component<any, any> {}
}

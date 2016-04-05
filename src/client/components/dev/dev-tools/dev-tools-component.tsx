import * as React from "react";
import { createDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";

export const DevToolsComponent = createDevTools(
  <DockMonitor defaultIsVisible={false}
               toggleVisibilityKey="ctrl-m"
               changePositionKey="ctrl-b">
    <LogMonitor />
  </DockMonitor>
);

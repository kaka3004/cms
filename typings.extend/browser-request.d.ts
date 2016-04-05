declare module 'browser-request' {
  namespace BrowserRequest {

    interface RequestOptions {
      url?: string;
      uri?: string;
      method?: string;
      json?: boolean|{relaxed: boolean};
      body?: string;
    }

    export interface RequestAPI {
      <T>(url: string|RequestOptions, callback: (err, res: {body: T}, body?: T) => void): void;
    }
  }

  var browserRequest: BrowserRequest.RequestAPI;
  export = browserRequest;
}
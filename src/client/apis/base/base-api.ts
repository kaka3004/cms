import { Schema, arrayOf, normalize } from 'normalizr';
import request = require('browser-request');
import {Subject, ISubject} from 'rx';
import {IResponseSuccess, IResponseError} from 'shared/response';
import {ApiError} from 'client/apis/base/api-error';

interface IApiSuccess {
  result: string | string[];
  entities: any;
}

export abstract class BaseApi {

  protected version = 'v1';
  protected access_token: string = null;
  protected shop_id: string = null;

  protected abstract getSchema(): Schema;

  public setAccessToken(access_token) {
    this.access_token = access_token;
  }

  protected call<T>(method, uri, data: any = {}, normalizeResponse = true) {

    // Log the current request
    this.log(method, uri, data);

    const options = {
      method: method,
      url: this.getUrl(uri),
      json: true,
      body: JSON.stringify(data),
      headers: {}
    };

    if(this.access_token) {
      options.headers['Authorization'] = `Bearer ${this.access_token}`;
    }

    if(data.shop_id) {
      options.headers['Shop-Id'] = data.shop_id;
    }

    const observable = new Subject<IApiSuccess>();

    request<any>(options, (err, response, body) => {
      if(err) {
        observable.onError(new ApiError(err));
      } else if(body.error) {
        observable.onError(new ApiError(body));
      } else if(body.result && normalizeResponse) {
        observable.onNext(
          this.normalizeResponse(body.result));
      } else if(body.result) {
        observable.onNext(body);
      } else {
        observable.onNext(body);
      }
    });

    return observable;
  }

  protected post<T>(uri, data = {}) {
    return this.call<T>("POST", uri, data);
  }

  protected put<T>(uri, data = {}) {
    return this.call<T>("PUT", uri, data);
  }

  protected patch<T>(uri, data = {}) {
    return this.call<T>("PATCH", uri, data);
  }

  protected get<T>(uri, data = {}) {
    return this.call<T>("GET", uri, data);
  }

  protected delete<T>(uri, data = {}) {
    return this.call<T>("DELETE", uri, data, false);
  }

  protected log(method: string, uri: string, data: any) {
    console.log(`$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`);
    console.log(`$$$ Making a ${method.toUpperCase()} request to ${uri}`);
    console.log("$$$ Data", data);
    if(this.access_token) {
      console.log("$$$ USING ACCESS_TOKEN");
    }
    console.log(`$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`);
  }

  protected getUrl(uri: string) {
    return `/api/${this.version}/${uri.replace(/^\/+/g, '')}`;
  }

  protected normalizeResponse(result): IApiSuccess {
    let schema = result.constructor === Array ? 
      arrayOf(this.getSchema()) : this.getSchema();

    return normalize(result, schema);
  }
}
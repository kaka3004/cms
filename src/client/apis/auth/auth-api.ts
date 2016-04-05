import {Schema, arrayOf} from 'normalizr';
import {IAuthApi} from 'client/apis/auth/auth-api.d';
import {BaseApi} from 'client/apis/base/base-api';
import request = require('browser-request');

export class AuthApi extends BaseApi implements IAuthApi {

  // We are not using schema in this api
  getSchema() {
    return null;
  }

  createToken(email, password) {
    return this.call("POST", "/auth/token", {email, password}, false);
  }

  checkToken(email, password) {
    return this.call("POST", "/auth/check", {email, password}, false);
  }
}

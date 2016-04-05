import {BaseApi} from 'client/apis/base/base-api';
import {Schema, arrayOf} from 'normalizr';
import {IUser} from 'shared/models/user';
import {IUserApi} from 'client/apis/user/user-api.d';

export class UserApi extends BaseApi implements IUserApi {

  getSchema() {
    return new Schema('users', {
      idAttribute: '_id'
    });
  }

  all() {
    return this.get<IUser[]>('user');
  }

  findById(id) {
    return this.get<IUser>(`user/${id}`);
  }

  session() {
    return this.get<IUser>('user/session');
  }
}

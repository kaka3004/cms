import * as sinon from 'sinon';
import {IUserApi} from 'client/apis/user/user-api.d';

export class UserApiMock implements IUserApi {
  public all = sinon.stub();
  public findById = sinon.stub();
  public session = sinon.stub();
}

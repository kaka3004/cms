import * as sinon from 'sinon';
import {IAuthApi} from 'client/apis/auth/auth-api.d';

export class AuthApiMock implements IAuthApi {
  public all = sinon.stub();
  public checkToken = sinon.stub();
  public createToken = sinon.stub();
}

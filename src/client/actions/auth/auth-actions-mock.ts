import * as sinon from 'sinon';
import {IAuthActions} from 'client/actions/auth/auth-actions.d';

export class AuthActionsMock implements IAuthActions {
  public createToken = sinon.stub();
  public checkToken = sinon.stub();
}

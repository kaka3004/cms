import * as sinon from 'sinon';
import {ISessionActions} from 'client/actions/session/session-actions.d';

export class SessionActionsMock implements ISessionActions {
  public fetchUser = sinon.stub();
  public resetUser = sinon.stub();
  public fetchShop = sinon.stub();
  public resetShop = sinon.stub();
}

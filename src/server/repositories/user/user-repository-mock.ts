import * as sinon from 'sinon';
import {IUserRepository} from 'server/repositories/user/user-repository.d';

export class UserRepositoryMock implements IUserRepository {
  public find = sinon.stub();
  public findById = sinon.stub();
  public findByUsername = sinon.stub();
  public create = sinon.stub();
  public addRoleByUsername = sinon.stub();
  public checkLocal = sinon.stub();
  public findByLocalEmail = sinon.stub();
}
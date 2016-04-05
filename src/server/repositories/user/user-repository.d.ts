import {IUser, IUserRole} from 'shared/models/user.d';
import {Promise} from 'mongoose';
import {IUserDocument} from 'server/models/user/user-model.d';

export interface IUserQuery {
}

export interface IUserRepository {
  find(query: IUserQuery): Promise<IUserDocument[]>;
  findById(id): Promise<IUserDocument>;
  findByUsername(username: string): Promise<IUserDocument>;
  create(attributes: IUser): Promise<IUserDocument>;
  addRoleByUsername(username: string, role: IUserRole): Promise<IUserDocument>;
  checkLocal(email: string, password: string): Promise<IUserDocument>;
  findByLocalEmail(email: string): Promise<IUserDocument>;
}
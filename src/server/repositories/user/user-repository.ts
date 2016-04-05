import {Promise} from 'mongoose';
import {IUserRepository, IUserQuery} from 'server/repositories/user/user-repository.d';
import {UserModel} from 'server/models/user/user-model';
import {IUser, IUserRole} from 'shared/models/user.d';
import {ValidationError} from 'server/errors';
import {getDocumentId} from 'shared/helpers';

export class UserRepository implements IUserRepository {

  public find(query: IUserQuery) {
    let filteredQuery: IUserQuery = {};

    return UserModel.find(filteredQuery).exec();
  }

  public findById(id) {
    return UserModel.findById(id).exec();
  }

  public findByUsername(username) {
    return UserModel.findOne({username}).exec();
  }

  public findByLocalEmail(email) {
    return UserModel.findOne({
      "local.email": email
    }).exec();
  }

  public create(attributes: IUser) {
    return UserModel.create(attributes);
  }

  public addRoleByUsername(username: string, role: IUserRole) {
    let conditions = {
      username,
      'roles.role': { $ne: role.role },
      'roles.shop_id': { $ne: role.shop_id }
    };

    let update = {$addToSet: { roles: role }};

    return UserModel.findOneAndUpdate(conditions, update).exec();
  }

  public checkLocal(email: string, password: string) {
    return this.findByLocalEmail(email).then((user) => {
      if(! user) {
        throw new ValidationError({email: "Email not found"});
      }

      return user.checkPassword(password);
    });
  }
}

import {IUserApi} from 'shared/apis/user.d';

export interface IUserController extends IUserApi {
  fetch(req, res, next, id);
}
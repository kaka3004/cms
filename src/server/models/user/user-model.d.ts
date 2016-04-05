import {IUser, IUserRole} from 'shared/models/user.d';
import {IShop} from 'shared/models/shop.d';
import {BaseDocument} from 'server/models/base/base.d';
import {Promise} from 'mongoose';

export interface IUserDocument extends IUser, BaseDocument<IUserDocument> {
  _id: any;

  // Read part of the user attributes
  auth: any;
  full: any;
  profile: any;

  isSuperUser(): boolean;
  getFirstShopId(): string;
  hasShopAdminRole(shop: IShop): boolean;
  checkPassword(password: string): Promise<IUserDocument>;
  replaceAttributes(attrs: IUser): void;
  updateAttributes(attrs: IUser): void;
}

import {BaseController} from 'server/controllers/base/base-controller';
import {IProductRepository} from 'server/repositories/product/product-repository.d';
import {IUserRepository} from 'server/repositories/user/user-repository.d';
import {IShopRepository} from 'server/repositories/shop/shop-repository.d';
import {ICategoryRepository} from 'server/repositories/category/category-repository.d';
import {IUser, IUserRole} from 'shared/models/user';
import {IShop} from 'shared/models/shop';
import {ForbiddenError} from 'server/errors';
import * as Q from 'q';

export class FirsttimeController extends BaseController {
  constructor(
    private userRepository: IUserRepository,
    private shopRepository: IShopRepository,
    private categoryRepository: ICategoryRepository
    ) {
    super();
  }

  public setupTestShop(req, res, next) {
    let superUser, testShop;

    this.createSuperUser()
      .then((user) => {
        superUser = user;
        return this.createTestShop(user);
      })
      .then((shop) => {
        testShop = shop;
        this.addAdminRole(superUser, shop)
      })
      .then((user) => {
        return this.successResponse(res, {user, shop: testShop});
      })
      .then(null, next);
  }

  public setupCategories(req, res, next) {
    var categoriesData: Array<any> = require('server/seeds/categories.json');

    let createAllCategories = () => {
      return categoriesData.map(
        (category) => this.categoryRepository.create(category));
    };

    this.categoryRepository.find({})
      .then((categories) => {
        if(categories.length > 0) {
          throw new ForbiddenError("Categories already been seeded");
        }

        return Q.all(createAllCategories());
      })
      .then(() => res.send(), next);
  }

  private createSuperUser() {
    let superUsers: IUser[] = [];

    superUsers.push({
      display_name: "Kareem Mohamed",
      username: "kareem",
      local: {
        email: "kareem3d.a@gmail.com",
        password: "kareem123",
        fname: "Kareem",
        lname: "Mohamed",
        validated: true
      }
    });

    superUsers.push({
      display_name: "Dave Ghijben",
      username: "dave",
      local: {
        email: "dghijben@gmail.com",
        password: "dave123",
        fname: "Dave",
        lname: "Ghijben",
        validated: true
      }
    });

    return Q.all(superUsers.map((user) => this.userRepository.create(user)));
  }

  private createTestShop(user) {
    let testShop: IShop = {
      name: "test",
      creator_id: user
    };

    return this.shopRepository.create(testShop);
  }

  private addAdminRole(user, shop) {
    return this.userRepository.addRoleByUsername(user.username, {
      role: "admin",
      shop_id: shop._id
    });
  }
}  

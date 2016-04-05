import {BaseController} from 'server/controllers/base/base-controller';
import {ValidationError, ModelNotFoundError} from 'server/errors';
import {ICategoryRepository} from 'server/repositories/category/category-repository.d';
import {ICategoryController} from 'server/controllers/category/category-controller.d';

export class CategoryController extends BaseController implements ICategoryController {
  
  constructor(private categoryRepository: ICategoryRepository) {
    super();
  }

  fetch(req, res, next, id) {
    this.categoryRepository.findById(id)
      .onFulfill((category) => {
        if(! category) {
          throw new ModelNotFoundError(id);
        }
        req.category = category;
        next();
      }).onReject(next);
  }

  all(req, res, next) {
    this.categoryRepository.find(req.query)
      .onFulfill((categorys) => {
        this.successResponse(res, categorys);
      }).onReject(next);
  }

  findById(req, res, next) {
    this.successResponse(res, req.category);
  }

  create(req, res, next) {
    this.categoryRepository.create(req.body)
      .then((category) => {
        this.successResponse(res, category);
      }).then(null, next);
  }

  replace(req, res, next) {
    req.category.replaceAttributes(req.body);
    req.category.promiseToSave()
      .then((category) => {
        this.successResponse(res, category);
      })
      .then(null, next);
  }

  update(req, res, next) {
    req.category.updateAttributes(req.body);
    req.category.promiseToSave()
      .then((category) => {
        this.successResponse(res, category);
      })
      .then(null, next);
  }

  remove(req, res, next) {
    req.category.promiseToRemove()
      .then((category) => {
        this.successResponse(res, category);
      })
      .then(null, next);
  }
}

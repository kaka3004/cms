import {BaseController} from 'server/controllers/base/base-controller';
import {ValidationError, ModelNotFoundError} from 'server/errors';
import {IProductRepository} from 'server/repositories/product/product-repository.d';
import {IProductController} from 'server/controllers/product/product-controller.d';

export class ProductController extends BaseController implements IProductController {
  
  constructor(private productRepository: IProductRepository) {
    super();
  }

  fetch(req, res, next, id) {
    this.productRepository.findById(id)
      .then((product) => {
        if(! product) {
          throw new ModelNotFoundError(id);
        }
        req.product = product;
        next();
      }).then(null, next);
  }

  all(req, res, next) {
    this.productRepository.find(req.query)
      .then((product) => {
        this.successResponse(res, product);
      }).then(null, next);
  }

  findById(req, res, next) {
    this.successResponse(res, req.product);
  }

  create(req, res, next) {
    this.productRepository.create(req.body, req.shop, req.user)
      .then((product) => {
        this.successResponse(res, product);
      }).then(null, next);
  }

  replace(req, res, next) {
    req.product.replaceAttributes(req.body);
    req.product.promiseToSave()
      .then((product) => {
        this.successResponse(res, product);
      })
      .then(null, next);
  }

  update(req, res, next) {
    req.product.updateAttributes(req.body);
    req.product.promiseToSave()
      .then((product) => {
        this.successResponse(res, product);
      })
      .then(null, next);
  }

  remove(req, res, next) {
    req.product.promiseToRemove()
      .then((product) => {
        this.successResponse(res, product);
      })
      .then(null, next);
  }
}

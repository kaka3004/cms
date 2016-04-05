import * as sinon from 'sinon';
import {expect} from 'chai';
import {ProductController} from 'server/controllers/product/product-controller';
import {ProductRepositoryMock} from 'server/repositories/product/product-repository-mock';

describe('ProductController', function() {

  let productController: ProductController, productRepository: ProductRepositoryMock;
  let reqMock = sinon.stub();
  let resMock = sinon.stub();
  let nextMock = sinon.stub();

  beforeEach(function() {
    productRepository = new ProductRepositoryMock();

    productController = new ProductController(productRepository);
  });

  it('should exists', function () {
    expect(ProductController).to.exist;
  });
  
  it('should get all from product repository', function () {
    productController.all(reqMock, resMock, nextMock);
    expect(productRepository.find.calledOnce).to.be.true;
  });
});
import {expect} from 'chai';
import {ProductRepository} from 'server/repositories/product/product-repository';

describe('ProductRepository', function() {
  it('should exists', function () {
    expect(ProductRepository).to.exist;
  });
});
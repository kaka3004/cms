import {expect} from 'chai';
import {ProductApi} from 'client/apis/product/product-api';

describe('ProductApi', function() {
  it('should exists', function () {
    expect(ProductApi).to.exist;
  });
});
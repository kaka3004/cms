import {expect} from 'chai';
import {CartRepository} from 'server/repositories/cart/cart-repository';

describe('CartRepository', function() {
  it('should exists', function () {
    expect(CartRepository).to.exist;
  });
});
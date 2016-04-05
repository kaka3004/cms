import {expect} from 'chai';
import {CartController} from 'server/controllers/cart/cart-controller';

describe('CartController', function() {
  it('should exists', function () {
    expect(CartController).to.exist;
  });
});
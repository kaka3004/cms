import {expect} from 'chai';
import {CartApi} from 'client/apis/cart/cart-api';

describe('CartApi', function() {
  it('should exists', function () {
    expect(CartApi).to.exist;
  });
});
import {expect} from 'chai';
import {CartPermission} from 'server/permissions/cart/cart-permission';

describe('CartPermission', function() {
  it('should exists', function () {
    expect(CartPermission).to.exist;
  });
});
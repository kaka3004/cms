import {expect} from 'chai';
import {ShopPermission} from 'server/permissions/shop/shop-permission';

describe('ShopPermission', function() {
  it('should exists', function () {
    expect(ShopPermission).to.exist;
  });
});
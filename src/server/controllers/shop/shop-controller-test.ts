import {expect} from 'chai';
import {ShopController} from 'server/controllers/shop/shop-controller';

describe('ShopController', function() {
  it('should exists', function () {
    expect(ShopController).to.exist;
  });
});
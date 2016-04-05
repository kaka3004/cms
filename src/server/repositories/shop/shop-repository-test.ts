import {expect} from 'chai';
import {ShopRepository} from 'server/repositories/shop/shop-repository';

describe('ShopRepository', function() {
  it('should exists', function () {
    expect(ShopRepository).to.exist;
  });
});
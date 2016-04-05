import {expect} from 'chai';
import {ShopApi} from 'client/apis/shop/shop-api';

describe('ShopApi', function() {
  it('should exists', function () {
    expect(ShopApi).to.exist;
  });
});
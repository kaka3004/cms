import {expect} from 'chai';
import {ProductPermission} from 'server/permissions/product/product-permission';

describe('ProductPermission', function() {
  it('should exists', function () {
    expect(ProductPermission).to.exist;
  });
});
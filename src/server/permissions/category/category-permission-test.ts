import {expect} from 'chai';
import {CategoryPermission} from 'server/permissions/category/category-permission';

describe('CategoryPermission', function() {
  it('should exists', function () {
    expect(CategoryPermission).to.exist;
  });
});
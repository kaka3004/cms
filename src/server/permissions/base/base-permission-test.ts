import {expect} from 'chai';
import {BasePermission} from 'server/permissions/base/base-permission';

describe('BasePermission', function() {
  it('should exists', function () {
    expect(BasePermission).to.exist;
  });
});
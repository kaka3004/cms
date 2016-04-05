import {expect} from 'chai';
import {UserPermission} from 'server/permissions/user/user-permission';

describe('UserPermission', function() {
  it('should exists', function () {
    expect(UserPermission).to.exist;
  });
});
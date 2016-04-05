import {expect} from 'chai';
import {UserController} from 'server/controllers/user/user-controller';

describe('UserController', function() {
  it('should exists', function () {
    expect(UserController).to.exist;
  });
});
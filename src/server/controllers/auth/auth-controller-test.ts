import {expect} from 'chai';
import {AuthController} from 'server/controllers/auth/auth-controller';

describe('AuthController', function() {
  it('should exists', function () {
    expect(AuthController).to.exist;
  });
});
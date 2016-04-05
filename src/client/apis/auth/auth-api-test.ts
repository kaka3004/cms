import {expect} from 'chai';
import {AuthApi} from 'client/apis/auth/auth-api';

describe('AuthApi', function() {
  it('should exists', function () {
    expect(AuthApi).to.exist;
  });
});
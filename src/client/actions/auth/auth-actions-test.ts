import {expect} from 'chai';
import {AuthActions} from 'client/actions/auth/auth-actions';

describe('AuthActions', function() {
  it('should exists', function () {
    expect(AuthActions).to.exist;
  });
});
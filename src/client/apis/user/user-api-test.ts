import {expect} from 'chai';
import {UserApi} from 'client/apis/user/user-api';

describe('UserApi', function() {
  it('should exists', function () {
    expect(UserApi).to.exist;
  });
});
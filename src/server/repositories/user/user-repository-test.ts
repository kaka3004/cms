import {expect} from 'chai';
import {UserRepository} from 'server/repositories/user/user-repository';

describe('UserRepository', function() {
  it('should exists', function () {
    expect(UserRepository).to.exist;
  });
});
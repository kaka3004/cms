import {expect} from 'chai';
import {BaseController} from 'server/controllers/base/base-controller';

describe('BaseController', function() {
  it('should exists', function () {
    expect(BaseController).to.exist;
  });
});
import {expect} from 'chai';
import {ErrorMiddleware} from 'server/middlewares/error/error-middleware';

describe('ErrorMiddleware', function() {
  it('should exists', function () {
    expect(ErrorMiddleware).to.exist;
  });
});
import {expect} from 'chai';
import {SessionMiddleware} from 'server/middlewares/session/session-middleware';

describe('SessionMiddleware', function() {
  it('should exists', function () {
    expect(SessionMiddleware).to.exist;
  });
});
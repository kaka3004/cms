import {expect} from 'chai';
import {CategoryApi} from 'client/apis/category/category-api';

describe('CategoryApi', function() {
  it('should exists', function () {
    expect(CategoryApi).to.exist;
  });
});
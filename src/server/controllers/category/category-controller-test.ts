import {expect} from 'chai';
import {CategoryController} from 'server/controllers/category/category-controller';

describe('CategoryController', function() {
  it('should exists', function () {
    expect(CategoryController).to.exist;
  });
});
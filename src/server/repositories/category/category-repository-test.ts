import {expect} from 'chai';
import {CategoryRepository} from 'server/repositories/category/category-repository';

describe('CategoryRepository', function() {
  it('should exists', function () {
    expect(CategoryRepository).to.exist;
  });
});
import * as sinon from 'sinon';
import {ICategoryActions} from 'client/actions/category/category-actions.d';

export class CategoryActionsMock implements ICategoryActions {
  public findById = sinon.stub();
  public all = sinon.stub();
  public reset = sinon.stub();
}

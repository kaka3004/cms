import {Document, Promise} from 'mongoose';

export interface BaseDocument<T> extends Document {
  promiseToSave(): Promise<T>;
  promiseToRemove(): Promise<T>;
}
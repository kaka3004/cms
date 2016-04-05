import {Schema, Promise} from 'mongoose';

export function promisifyPlugin(schema: Schema) {
  schema.method('promiseToSave', function(next) {
    let promise = new Promise();

    this.save(function(err, document) {
      if(err) {
        promise.reject(err);
      } else {
        promise.fulfill(document);
      }
    });

    return promise;
  });
  schema.method('promiseToRemove', function(next) {
    let promise = new Promise();

    this.remove(function(err) {
      if(err) {
        promise.reject(err);
      } else {
        promise.fulfill(true);
      }
    });

    return promise;
  });
}
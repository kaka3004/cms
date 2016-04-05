declare module Normalizr {

  class Schema {
    constructor(schemaName: string, options?: {});

    define(attributes: {}): void;
  }

  function arrayOf(schema: Schema): Schema;

  function normalize(data: any, schema): any;
}

declare module "normalizr" {
  export = Normalizr;
}

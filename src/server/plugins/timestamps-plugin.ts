import {Schema} from 'mongoose';

export function timestampsPlugin(schema: Schema) {
  schema.add({ created_at: Date });
  schema.add({ updated_at: Date });

  schema.pre('save', function(next) {
    if(! this.created_at) {
      this.created_at = new Date();
    }
    this.updated_at = new Date();
    next();
  })
}
import {Schema, Promise} from 'mongoose';
import {slugify, getDocumentId} from 'shared/helpers';

export function slugPlugin(schema: Schema, options) {

  schema.add({ slug: String });

  schema.pre('validate', function(next) {
    if(! this.slug ) {
      this.makeSlug();
    }
    next();
  });

  schema.path('slug').validate(function(value, respond) {
    var query = this.constructor.count();

    if(this.id) {
      query.where('_id').ne(this.id);
    }

    // Make sure the slug is unique in this shop
    if(options && options.uniqueShop) {
      query.where('shop_id', getDocumentId(this.shop_id));
    }

    // Make sure it's unique for parent (used in categories)
    if(options && options.uniqueParent) {
      query.where('parent_id', getDocumentId(this.parent_id));
    }

    // Make sure it's unique for this user
    if(options && options.uniqueUser) {
      query.where('user_id', getDocumentId(this.user_id));
    }

    query.where('slug', this.slug);

    return query.exec().then(function(count) {
      if(count > 0) {
        respond(false);
      } else {
        respond(true);
      }
    }, function() {
      respond(false);
    });

  }, 'Slug must be unique');


  schema.method('makeSlug', function() {
    this.slug = slugify(this.title);
  })
}

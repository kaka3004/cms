import {Schema, Model, Mongoose} from 'mongoose';
import {timestampsPlugin} from 'server/plugins/timestamps-plugin';
import {promisifyPlugin} from 'server/plugins/promisify-plugin';
import {ICategoryDocument} from 'server/models/category/category-model.d';
import {ICategory} from 'shared/models/category.d';

export var CategoryModel: Model<ICategoryDocument>;

export function configureCategoryModel(mongoose: Mongoose) {
  let categoryImageSchema = {
    src: String,
    width: Number,
    height: Number,
    kind: {type: String, enum: ['cover', 'main']},
  };

  let categorySchema = new Schema({
    title: String,
    slug: String,
    status: String,
    description: String,
    images: [categoryImageSchema]
  });

  categorySchema.method('replaceAttributes', function(attributes) {
    this.title = attributes.title;
    this.slug = attributes.slug;
    this.status = attributes.status;
    this.description = attributes.description;
    this.images = attributes.images;
  });

  categorySchema.method('updateAttributes', function(attributes) {
    
    if(attributes.title) {
      this.title = attributes.title;
    }
    
    if(attributes.slug) {
      this.slug = attributes.slug;
    }
    
    if(attributes.status) {
      this.status = attributes.status;
    }
    
    if(attributes.description) {
      this.description = attributes.description;
    }
    
    if(attributes.cover_image) {
      this.cover_image = this.cover_image.concat(attributes.cover_image);
    }
  });

  categorySchema.plugin(timestampsPlugin);
  categorySchema.plugin(promisifyPlugin);

  CategoryModel = mongoose.model<ICategoryDocument>('Category', categorySchema); 
}
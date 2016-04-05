import {Schema, Model, Mongoose} from 'mongoose';
import {timestampsPlugin} from 'server/plugins/timestamps-plugin';
import {promisifyPlugin} from 'server/plugins/promisify-plugin';
import {slugPlugin} from 'server/plugins/slug-plugin';
import {IProductDocument} from 'server/models/product/product-model.d';
import {IProduct} from 'shared/models/product.d';
import {getDocumentId} from 'shared/helpers';

export var ProductModel: Model<IProductDocument>;

export function configureProductModel(mongoose: Mongoose) {

  let priceSchema = {
    value: Number,
    currency: String
  };

  let inventorySchema = {
    sku: String,
    barcode: String,
    track_inventory: Boolean,
    quantity: Number
  };

  let productImageSchema = {
    src: String,
    width: Number,
    height: Number,
    position: Number,
    is_main: {type: Boolean, default: false},
    variant_ids: [String]
  };

  let variantOptionSchema = {
    name: String,
    values: [String]
  };

  let variantSchema = {
    option1: String,
    option2: String,
    option3: String,
    price: priceSchema,
    compare_at_price: priceSchema,
    taxable: Boolean,
    inventory: inventorySchema,
    requires_shipping: Boolean,
    weight: Number,
    weight_unit: String
  };

  let productSchema = new Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    body_html: String,
    description: String,
    sizing_info: String,
    shipping_info: String,
    gender: {type: String, enum: ['male', 'female', 'unisex']},
    images: [productImageSchema],
    tags: [String],
    variants_options: [variantOptionSchema],
    variants: [variantSchema],
    shop_id: {type: Schema.Types.ObjectId, ref: 'Shop', required: true},
    category_id: {type: Schema.Types.ObjectId, ref: 'Category', default: null},
    creator_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    // When publish_status is delayed, published_at must be set in the future
    publish_status: {type: String, enum: ['visible', 'hidden', 'delayed']},
    published_at: Date
  });

  productSchema.method('replaceAttributes', function(attributes: IProduct) {
    this.title = attributes.title;
    this.slug = attributes.slug;
    this.body_html = attributes.body_html;
    this.description = attributes.description;
    this.sizing_info = attributes.sizing_info;
    this.shipping_info = attributes.shipping_info;
    this.gender = attributes.gender;
    this.images = attributes.images;
    this.tags = attributes.tags;
    this.variants_options = attributes.variants_options;
    this.variants = attributes.variants;
    this.category_id = getDocumentId(attributes.category_id);
    this.publish_status = attributes.publish_status;
    this.published_at = attributes.published_at;
  });

  productSchema.method('updateAttributes', function(attributes) {
    
    if(attributes.title) {
      this.title = attributes.title;
    }
    
    if(attributes.slug) {
      this.slug = attributes.slug;
    }
    
    if(attributes.body_html) {
      this.body_html = attributes.body_html;
    }
    
    if(attributes.description) {
      this.description = attributes.description;
    }
    
    if(attributes.gender) {
      this.gender = attributes.gender;
    }
    
    if(attributes.images) {
      this.images = attributes.images;
    }
    
    if(attributes.tags) {
      this.tags = attributes.tags;
    }
    
    if(attributes.variants_options) {
      this.variants_options = this.variants_options.concat(attributes.variants_options);
    }
    
    if(attributes.variants) {
      this.variants = this.variants.concat(attributes.variants);
    }
    
    if(attributes.category_id) {
      this.category_id = getDocumentId(attributes.category_id);
    }
    
    if(attributes.publish_status) {
      this.publish_status = attributes.publish_status;
    }
    
    if(attributes.published_at) {
      this.published_at = attributes.published_at;
    }
  });

  productSchema.method('setCreator', function(creator) {
    this.creator_id = getDocumentId(creator);
  });

  productSchema.method('setShop', function(shop) {
    this.shop_id = getDocumentId(shop);
  });

  productSchema.path('publish_status').validate(function(value) {
    // When publish_status is delayed the published_at must be in the future
    if(value === 'delayed' && this.published_at < Date.now()) {
      return false;
    }
    return true;
  }, 'Publish date must be in the future when publish status is "delayed"');

  productSchema.plugin(timestampsPlugin);
  productSchema.plugin(promisifyPlugin);
  productSchema.plugin(slugPlugin, {uniqueShop: true});

  ProductModel = mongoose.model<IProductDocument>('Product', productSchema); 
}
import {Schema, Model, Mongoose} from 'mongoose';
import {timestampsPlugin} from 'server/plugins/timestamps-plugin';
import {promisifyPlugin} from 'server/plugins/promisify-plugin';
import {IShopDocument} from 'server/models/shop/shop-model.d';
import {getDocumentId} from 'shared/helpers';

export var ShopModel: Model<IShopDocument>;

export function configureShopModel(mongoose: Mongoose) {
  let addressSchema = {
    address: String,
    address2: String,
    city:String,
    state: String,
    country: String,
    country_code: String,
    zip: String
  };

  let shopSchema = new Schema({
    name: String,
    published: Boolean,
    config: {
      address: addressSchema,
      currency_code: String
    },
    creator_id: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  });

  shopSchema.method('replaceAttributes', function(attributes) {
    this.published = attributes.published;
    this.config = attributes.config;
  });

  shopSchema.method('updateAttributes', function(attributes) {
    if(attributes.published) {
      this.published = attributes.published;
    }
    
    if(attributes.config) {
      this.config = attributes.config;
    }
  });

  shopSchema.method('setCreator', function(creator) {
    this.creator_id = getDocumentId(creator);
  });

  shopSchema.plugin(timestampsPlugin);
  shopSchema.plugin(promisifyPlugin);

  ShopModel = mongoose.model<IShopDocument>('Shop', shopSchema); 
}
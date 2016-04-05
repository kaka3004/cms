import {Schema, Model, Mongoose} from 'mongoose';
import {timestampsPlugin} from 'server/plugins/timestamps-plugin';
import {promisifyPlugin} from 'server/plugins/promisify-plugin';
import {ICartDocument} from 'server/models/cart/cart-model.d';
import {getDocumentId} from 'shared/helpers';

export var CartModel: Model<ICartDocument>;

export function configureCartModel(mongoose: Mongoose) {
  let priceSchema = {
    value: Number,
    currency: String
  };

  let cartItemSchema = {
    variant_id: {type: Schema.Types.ObjectId},
    product_id: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: Number
  };

  let totalsSchema = {
    pre_discount: {
      with_tax: priceSchema,
      without_tax: priceSchema
    },

    post_discount: {
      with_tax: priceSchema,
      without_tax: priceSchema
    }
  }

  let cartSchema = new Schema({
    items: [cartItemSchema],
    totals: totalsSchema,
    total_items: Number,
    total_unique_items: Number,
    shop_id: {type: Schema.Types.ObjectId, ref: 'Shop', required: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  });

  cartSchema.method('replaceAttributes', function(attributes) {
    this.items = attributes.items;
    this.totals = attributes.totals;
    this.total_items = attributes.total_items;
    this.total_unique_items = attributes.total_unique_items;
    this.shop_id = getDocumentId(attributes.shop_id);
    this.user_id = getDocumentId(attributes.user_id);
  });

  cartSchema.method('updateAttributes', function(attributes) {
    
    if(attributes.items) {
      this.items = attributes.items;
    }
    
    if(attributes.totals) {
      this.totals = attributes.totals;
    }
    
    if(attributes.total_items) {
      this.total_items = attributes.total_items;
    }
    
    if(attributes.total_unique_items) {
      this.total_unique_items = attributes.total_unique_items;
    }
    
    if(attributes.shop_id) {
      this.shop_id = getDocumentId(attributes.shop_id);
    }
  });

  cartSchema.plugin(timestampsPlugin);
  cartSchema.plugin(promisifyPlugin);

  CartModel = mongoose.model<ICartDocument>('Cart', cartSchema); 
}
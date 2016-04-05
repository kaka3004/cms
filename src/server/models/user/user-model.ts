import {Schema, Model, Mongoose} from 'mongoose';
import {timestampsPlugin} from 'server/plugins/timestamps-plugin';
import {promisifyPlugin} from 'server/plugins/promisify-plugin';
import {IUserDocument} from 'server/models/user/user-model.d';
import {IUserRole} from 'shared/models/user';
import {checkEqualIds} from 'shared/helpers';
import uniqueValidator = require('mongoose-unique-validator');
import passwordHash = require('password-hash-and-salt');
import * as Q from 'q';
import {ValidationError} from 'server/errors';

export var UserModel: Model<IUserDocument>;

var superUsersEmails = ['kareem3d.a@gmail.com', 'dghijben@gmail.com'];

/**
 * Hash password
 * @param  {string}   password Password to hash
 * @return Promise
 */
function hashPassword(password) {
  const deferred = Q.defer();
  passwordHash(password).hash(function(err, hash) {
      if (err) return deferred.reject(err);

      deferred.resolve(hash);
  });
  return deferred.promise;
}

function checkPassword(password, userHash) {
  const deferred = Q.defer();
  const validationError = () => 
    new ValidationError({email: "Password is incorrect"});

  if(! userHash || ! password) {
    return Q.reject(validationError());
  }

  passwordHash(password).verifyAgainst(userHash, function(err, verified) {
    if (err) {
      deferred.reject(err);
    } else if (verified) {
      deferred.resolve();
    } else {
      deferred.reject(validationError());
    }
  });
  return deferred.promise;
}

export function configureUserModel(mongoose: Mongoose) {
  let userImageSchema = {
    src: String,
    width: Number,
    height: Number,
    provider: {type: String, enum: ['local', 'facebook', 'twitter', 'google', 'amazon']}
  };

  let addressSchema = {
    address: String,
    address2: String,
    city:String,
    state: String,
    country: String,
    country_code: String,
    zip: String
  };

  let userRoleSchema = {
    role: {type: String, enum: ['admin']},
    shop_id: {type: Schema.Types.ObjectId, ref: 'Shop', required: true}
  };

  let userSchema = new Schema({
    display_name: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    images: [userImageSchema],
    shipping_address: addressSchema,
    roles: [userRoleSchema],
    online_at: {type: Date, default: Date.now},
    shop_id: {type: Schema.Types.ObjectId, ref: 'Shop'},
    local: {
      email        : String,
      password     : String,
      fname        : String,
      lname        : String,
      validated    : {type: Boolean, default: false}
    },
    facebook: {
      id           : String,
      email        : String,
      display_name : String,    
      token        : {value: String, secret: String}
    },
    twitter: {
      id           : String,
      display_name : String,
      username     : String,
      token        : {value: String, secret: String}
    },
    google: {
      id           : String,
      email        : String,
      display_name : String,
      token        : {value: String, secret: String}
    },
    amazon: {
      id           : String,
      email        : String,
      display_name : String,
      token        : {value: String, secret: String}
    },
  });

  userSchema.method('replaceAttributes', function(attributes) {
    this.display_name = attributes.display_name;
    this.images = attributes.images;
    this.shipping_address = attributes.shipping_address;
  });

  userSchema.method('updateAttributes', function(attributes) {
    if(attributes.display_name) {
      this.display_name = attributes.display_name;
    }
    
    if(attributes.images) {
      this.images = attributes.images;
    }
    
    if(attributes.shipping_address) {
      this.shipping_address = attributes.shipping_address;
    }
  });

  userSchema.method('getFirstShopId', function(shop) {
    return this.roles[0] ? this.roles[0].shop_id : null;
  });

  userSchema.method('hasShopAdminRole', function(shop) {
    return this.roles
      .filter((role) => checkEqualIds(shop, role.shop_id) && role.role === 'admin').length > 0;
  });

  userSchema.method('checkPassword', function(password) {
    return checkPassword(password, this.local.password)
      .then(() => this);
  });

  userSchema.method('isMerchant', function() {
    return this.roles
      .filter((role) => role.role === 'admin').length > 0;
  });

  userSchema.method('isSuperUser', function() {
    return superUsersEmails.indexOf(this.email) > -1;
  });

  userSchema.pre('save', function(next) {
    if(! this.local.password) {
      return;
    }
    hashPassword(this.local.password).then((hashedPassword) => {
      this.local.password = hashedPassword;
    }).then(next, next);
  });


  /**
   * Add virtuals to the user schema
   * @param {object} schema 
   */
  // Return full user info
  // Available for merchants
  userSchema.virtual('full').get(function() {

    let local = {
      email: this.local.email,
      fname: this.local.fname,
      lname: this.local.lname
    };

    let facebook = {
      id           : this.facebook.id,
      email        : this.facebook.email,
      display_name : this.facebook.display_name
    };
    
    let twitter = {
      id           : this.twitter.id,
      username     : this.twitter.username,
      display_name : this.twitter.display_name
    };
    
    let google = {
      id           : this.google.id,
      email        : this.google.email,
      display_name : this.google.display_name
    };

    return {
      '_id'             : this._id,
      'display_name'    : this.display_name,
      'username'        : this.username,
      'roles'           : this.roles,
      'images'          : this.images,
      'shipping_address': this.shipping_address,
      'online_at'       : this.online_at,
      'created_date'    : this.created_date,
      'updated_date'    : this.updated_date,

      'facebook': facebook,
      'google'  : google,
      'twitter' : twitter,
      'local'   : local
    };
  });

  // Return authenticated user info
  userSchema.virtual('auth').get(function() {

    let local = {
      email: this.local.email,
      fname: this.local.fname,
      lname: this.local.lname
    };

    let facebook = {
      id           : this.facebook.id,
      email        : this.facebook.email,
      display_name : this.facebook.display_name,
      token        : this.facebook.token
    };
    
    let twitter = {
      id           : this.twitter.id,
      username     : this.twitter.username,
      display_name : this.twitter.display_name,
      token        : this.twitter.token
    };
    
    let google = {
      id           : this.google.id,
      email        : this.google.email,
      display_name : this.google.display_name,
      token        : this.google.token
    };

    return {
      '_id'             : this._id,
      'display_name'    : this.display_name,
      'username'        : this.username,
      'roles'           : this.roles,
      'images'          : this.images,
      'shipping_address': this.shipping_address,
      'online_at'       : this.online_at,
      'created_date'    : this.created_date,  
      'updated_date'    : this.updated_date,  

      'facebook'        : facebook,
      'google'          : google,
      'twitter'         : twitter,
      'local'           : local
    };
  });

  // Public profile information
  userSchema.virtual('profile').get(function() {
    var local = {
      email: this.local.email,
      fname: this.local.fname,
      lname: this.local.lname
    };

    var facebook = {
      id           : this.facebook.id,
      email        : this.facebook.email,
      display_name : this.facebook.display_name
    };
    
    var twitter = {
      id           : this.twitter.id,
      username     : this.twitter.username,
      display_name : this.twitter.display_name
    };
    
    var google = {
      id           : this.google.id,
      email        : this.google.email,
      display_name : this.google.display_name
    };

    return {
      '_id'          : this._id,
      'display_name' : this.display_name,
      'username'     : this.username,
      'images'       : this.images,
      'online_at'    : this.online_at,
      
      'facebook'     : facebook,
      'google'       : google,
      'twitter'      : twitter,
      'local'        : local
    };
  });
  
  userSchema.plugin(timestampsPlugin);
  userSchema.plugin(promisifyPlugin);
  userSchema.plugin(uniqueValidator);

  UserModel = mongoose.model<IUserDocument>('User', userSchema); 
}

import {Mongoose} from 'mongoose';
import {isDevEnv} from 'shared/helpers';

export function configureMongoose() {

  const mongoose = new Mongoose();

  mongoose.connect(process.env.MONGODB_URL, function(err) {
    if(err) { throw err; }

    console.log("Successfully connected to mongodb");
  });

  return mongoose; 
}
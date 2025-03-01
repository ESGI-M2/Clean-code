import mongoose from 'mongoose';

import MongoUriResolver from './mongo-uri.resolver';

export default class MongooseConnection {
  async initialize(): Promise<void> {
    console.log('Initializing Mongoose connection...');
    try {
      await mongoose.connect(MongoUriResolver.resolve(), {});
      console.log('Mongoose connection initialized');
    } catch (error) {
      console.error('Error initializing Mongoose connection:', error);
      throw error;
    }
  }
}

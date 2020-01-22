import mongoose from 'mongoose';

import User from './user';
import Message from './message';
import Recipe from './recipe';
const connectDb = () => {
  if (process.env.TEST_DATABASE_URL) {
    return mongoose.connect(
      process.env.TEST_DATABASE_URL,
      { useNewUrlParser: true },
    );
  }


  if (process.env.DATABASE_URL) {
    console.log('connect db');
    return mongoose.connect(
      process.env.DATABASE_URL,
      { useNewUrlParser: true },
    );
  }
};

const models = { User, Message, Recipe };

export { connectDb };

export default models;

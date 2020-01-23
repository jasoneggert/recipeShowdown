import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import express from 'express';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { connectDb } from './models';
import loaders from './loaders';
import { combineResolvers } from 'graphql-resolvers';

const app = express();

app.use(cors());

app.use(morgan('dev'));

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const isTest = !!process.env.TEST_DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8008;

connectDb().then(async () => {
  // reset database
  await Promise.all([
    models.User.deleteMany({}),
    models.Message.deleteMany({}),
    models.Recipe.deleteMany({}),
  ]);
  console.log('seed');
  createUsersWithMessages(new Date());

  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
});

const createUsersWithMessages = async date => {
  const user1 = new models.User({
    username: 'gert',
    email: 'jeggert@jeggert.com',
    password: 'cash1234',
    role: 'ADMIN',
  });

  const user2 = new models.User({
    username: 'user2',
    email: 'eggert.jason+recipeUser2@gmail.com',
    password: 'cash1234',
  });

  const message1 = new models.Message({
    text: '3 sticks of butter',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user1.id,
  });

  const recipe1 = new models.Recipe ({
    text: '3 sticks of butter',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user1.id,
  });

  const recipe2 = new models.Recipe ({
    text: '3 sticks of butter',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user1.id,
  });

  const recipe3 = new models.Recipe ({
    text: '3 sticks of butter',
    createdAt: date.setSeconds(date.getSeconds() + 1),
    userId: user1.id,
  });
  await message1.save();
  await recipe1.save();
  await recipe2.save();
  await recipe3.save();

  await user1.save();
  await user2.save();
};

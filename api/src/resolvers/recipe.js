import { combineResolvers } from 'graphql-resolvers';

import pubsub, { EVENTS } from '../subscription';
import { isAuthenticated, isMessageOwner } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    recipes: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            createdAt: {
              $lt: fromCursorHash(cursor),
            },
          }
        : {};
        const recipes = await models.Recipe.find(
          cursorOptions,
          null,
          {
            sort: { createdAt: -1 },
            limit: limit + 1,
          },
          );
          
      const hasNextPage = recipes.length > limit;
      const edges = hasNextPage ? Recipes.slice(0, -1) : recipes;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges.lengthth > 0 ? edges[edges.length - 1].createdAt.toString() : Date.now().toString,
          ),
        },
      };
    },
    recipe: async (parent, { id }, { models }) => {
      return await models.Recipe.findById(id);
    },
  },

  Mutation: {
    createRecipe: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const recipe = await models.Recipe.create({
          text,
          userId: me.id,
        });

        pubsub.publish(EVENTS.RECIPE.CREATED, {
          recipeCreated: { recipe },
        });

        return recipe;
      },
    ),

    deleteRecipe: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        const recipe = await models.Recipe.findById(id);

        if (recipe) {
          await recipe.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },

  Recipe: {
    user: async (recipe, args, { loaders }) => {
      const user = await loaders.user.load(recipe.userId);
      return user;
    },
  },

  Subscription: {
    recipeCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.RECIPE.CREATED),
    },
  },
};

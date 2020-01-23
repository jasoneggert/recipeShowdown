import { PubSub } from 'apollo-server';

import * as MESSAGE_EVENTS from './message';
import * as RECIPE_EVENTS from './recipe';
export const EVENTS = {
  MESSAGE: MESSAGE_EVENTS,
  RECIPE: RECIPE_EVENTS
};

export default new PubSub();

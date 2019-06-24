import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

export const getNavMiddleware = () =>
  createReactNavigationReduxMiddleware('root', state => state.navigation);

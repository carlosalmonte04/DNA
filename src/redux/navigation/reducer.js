import { createNavigationReducer } from 'react-navigation-redux-helpers';

let navReducer;

export const getNavigationReducer = RootNavigator => {
  if (navReducer) return navReducer;
  navReducer = createNavigationReducer(RootNavigator);
  return navReducer;
};

export { navReducer };

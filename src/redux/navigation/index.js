import { reduxifyNavigator } from 'react-navigation-redux-helpers';

export const getReduxifiedNavigator = (RootNavigator, reduxifiedNavigator) => {
  if (reduxifiedNavigator) return reduxifiedNavigator;
  reduxifiedNavigator = reduxifyNavigator(RootNavigator, 'root');
  return reduxifiedNavigator;
};

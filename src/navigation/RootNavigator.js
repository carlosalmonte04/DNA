import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import { getReduxifiedNavigator } from 'redux/navigation';
import { getNavigationReducer } from 'redux/navigation/reducer';
import { getNavMiddleware } from 'redux/navigation/middleware';

import { HomeNavigator } from './HomeNavigator';

let reduxifiedNavigator;
export const RootNavigator = createStackNavigator({
  HomeNavigator: {
    screen: HomeNavigator,
    navigationOptions: {
      header: null,
    },
  },
});

const mapStateToProps = ({ navigation }) => ({
  state: navigation,
});

getNavigationReducer(RootNavigator);

getNavMiddleware();

export const ConnectedAppWithNavState = connect(mapStateToProps)(
  getReduxifiedNavigator(RootNavigator, reduxifiedNavigator),
);

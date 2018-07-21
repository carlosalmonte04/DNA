import { createStackNavigator } from "react-navigation";
import { connect } from "react-redux";
// import { AddNavigationState } from "@dnaHOCs";
import { ConceptScreen } from "@dnaComponents";
import { HomeNavigator } from "./HomeNavigator";
import { reduxifiedAppNavigator } from "@dnaStore";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

export const AppNavigator = createStackNavigator({
  HomeNavigator: {
    screen: HomeNavigator,
    navigationOptions: {
      header: null
    }
  },
  ConceptScreen: {
    screen: ConceptScreen
  }
});

const mapStateToProps = ({ nav }) => ({
  state: nav
});

export const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

const UnconnectedAppWithNavState = reduxifyNavigator(AppNavigator, "root");

export const ConnectedAppWithNavState = connect(mapStateToProps)(
  UnconnectedAppWithNavState
);

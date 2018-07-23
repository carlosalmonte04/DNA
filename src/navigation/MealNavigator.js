/* eslint

  react/display-name: 0
  
*/

import React from "react";
import { Image, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { Meal, Meals } from "@dnaComponents";
import { DEV } from "@dnaConfig";
import { Colors, IOS, Icons, DEFAULT_TABBAR_HEIGHT } from "@dnaAssets";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

const FIRST_SCREEN = DEV ? "Meals" : "Meals";

const NAV_ICONS = {
  CameraScreen: {
    active: Icons.greenCamera,
    inactive: Icons.grayCamera
  },
  ProfileScreen: {
    active: Icons.greenProfile,
    inactive: Icons.grayProfile
  }
};

const TabBarIcon = ({ screen, state }) => {
  return (
    <View>
      <Image
        source={NAV_ICONS[screen][state]}
        style={{
          height: 23,
          width: 23,
          alignSelf: "center"
        }}
        resizeMode="cover"
      />
    </View>
  );
};

const createTabConfig = initialRouteName => {
  const commonConfig = {
    animationEnabled: false,
    lazy: false,
    tabBarOptions: {
      activeTintColor: Colors.green,
      showLabel: false,
      style: {
        height: DEFAULT_TABBAR_HEIGHT
      }
    },
    initialRouteName
  };

  if (IOS) {
    return {
      ...commonConfig,
      navigationOptions: {
        headerLeft: null,
        swipeEnabled: false,
        gesturesEnabled: false
      }
    };
  }

  return {
    ...commonConfig,
    tabBarPosition: "bottom",
    // enimationEnabled: false,
    backBehavior: "none",
    swipeEnabled: false,
    navigationOptions: {
      headerLeft: null,
      gesturesEnabled: false
    }
  };
};

const tabScreens = {
  Meal: {
    screen: Meal
  },
  Meals: {
    screen: Meals
  }
};

export const MealsNavigator = createStackNavigator(
  tabScreens,
  createTabConfig(FIRST_SCREEN)
);

const mapStateToProps = ({ nav }) => ({
  state: { ...nav }
});

// export const mealNavMiddleware = createReactNavigationReduxMiddleware(
//   "root",
//   state => state.nav
// );

// const UnconnectedMealWithNavState = reduxifyNavigator(MealsNavigator, "root");

// export const ConnectedMealWithNavState = connect(mapStateToProps)(
//   UnconnectedMealWithNavState
// );

import React from 'react';
import { Image, View } from 'react-native';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { createBottomTabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { reduxifiedAppNavigator } from 'redux/store';

import routes from 'routes/routes';
import Home from 'routes/Home';
import Profile from 'routes/Profile';

import { DEV } from 'config/env';

import { Colors, IOS, Icons, DEFAULT_TABBAR_HEIGHT } from 'assets';

const FIRST_SCREEN = DEV ? routes.Home : routes.Home;

const NAV_ICONS = {
  [routes.Home]: {
    active: Icons.greenCamera,
    inactive: Icons.grayCamera,
  },
  [routes.Profile]: {
    active: Icons.greenProfile,
    inactive: Icons.grayProfile,
  },
};

const TabBarIcon = ({ screen, state }) => {
  return (
    <View>
      <Image
        source={NAV_ICONS[screen][state]}
        style={{
          height: 23,
          width: 23,
          alignSelf: 'center',
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
        height: DEFAULT_TABBAR_HEIGHT,
      },
    },
    initialRouteName,
  };

  if (IOS) {
    return {
      ...commonConfig,
      navigationOptions: {
        headerLeft: null,
        swipeEnabled: false,
        gesturesEnabled: false,
      },
    };
  }

  return {
    ...commonConfig,
    tabBarPosition: 'bottom',
    // enimationEnabled: false,
    backBehavior: 'none',
    swipeEnabled: false,
    navigationOptions: {
      headerLeft: null,
      gesturesEnabled: false,
    },
  };
};

const tabScreens = {
  [routes.Home]: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon state={focused ? 'active' : 'inactive'} screen="Home" />
      ),
    },
  },
  [routes.Profile]: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon state={focused ? 'active' : 'inactive'} screen="Profile" />
      ),
    },
  },
};

export const HomeNavigator = createBottomTabNavigator(
  tabScreens,
  createTabConfig(FIRST_SCREEN),
);

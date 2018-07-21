/* eslint

  react/display-name: 0
  
*/

import React from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { CameraScreen, ProfileScreen } from "@dnaComponents";
import { DEV } from "@dnaConfig";
import { Colors, IOS, Icons, DEFAULT_TABBAR_HEIGHT } from "@dnaAssets";

const FIRST_SCREEN = DEV ? "CameraScreen" : "CameraScreen";

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
  CameraScreen: {
    screen: CameraScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          state={focused ? "active" : "inactive"}
          screen="CameraScreen"
        />
      )
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          state={focused ? "active" : "inactive"}
          screen="ProfileScreen"
        />
      )
    }
  }
};

export const HomeNavigator = createBottomTabNavigator(
  tabScreens,
  createTabConfig(FIRST_SCREEN)
);

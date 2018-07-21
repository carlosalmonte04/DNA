import React, { Component } from "react";
import { BackHandler, AppState } from "react-native";
import { connect } from "react-redux";
import { getCurrentRouteName, _addNavigationHelpers } from "@dnaHelpers";

export const AddNavigationState = WrappedNavigator => {
  return class AppWithNavigationState extends Component {
    state = {
      appState: AppState.currentState
    };

    componentDidMount() {
      const { user } = this.props;

      BackHandler.addEventListener("backPress", this.handleBackPress);
    }

    componentWillUpdate(nextProps) {
      const { nav } = this.props;
      const { nav: nextNav } = nextProps;

      const currentRoute = getCurrentRouteName(nav);
      const nextRoute = getCurrentRouteName(nextNav);

      const backFromEditProfile =
        currentRoute === "EditProfile" && nextRoute !== "EditProfile";
      const backFromEditHouse =
        currentRoute === "AddHouse" && nextRoute !== "AddHouse";

      if (backFromEditHouse || backFromEditProfile) {
        BackHandler.addEventListener("backPress", this.handleBackPress);
      }
    }

    componentWillUnmount() {
      BackHandler.removeEventListener("backPress");
    }

    handleBackPress = () => {
      console.log(`HANDLING BACK PRESS`);

      const { dispatch, nav } = this.props;
      // const { token } = user.profile;
      const currentRoute = getCurrentRouteName(nav);
      const disabledRoutes = ["EditProfile", "AddHouse"];

      if (disabledRoutes.includes(currentRoute)) {
        return true;
      }

      console.log(`THE CURRENT ROUTE IS`, currentRoute);

      const isLoggedIn = !"EnterLoginSignUpForgotPasswordResetPasswordVerificationOnboardingWalkthrough".includes(
        currentRoute
      ); // TODO: adapt routes to KW

      console.log(`IS LOGGED IN?`, isLoggedIn);

      if (isLoggedIn && this.shouldCloseApp(nav, currentRoute)) {
        console.log(`EXITING APP...`);
        BackHandler.exitApp();
        return false;
      }

      if (currentRoute === "Login") {
        console.log(`CURRENT ROUTE IS LOGIN... exiting app`);
        BackHandler.exitApp();
        return true;
      }

      dispatch({
        type: "Navigation/BACK"
      });
      return true;
    };

    shouldCloseApp = (nav, currentRoute) => {
      const { index } = nav;
      const noIndex = !index && index !== 0;

      if (noIndex) {
        console.log(`ROUTE NAME`, nav.routes[index - 1].routeName);
        console.log(`INDEX:`, index);
        console.log(
          "EnterLoginSignUpResetPasswordVerificationOnboardingWalkthrough".includes(
            nav.routes[index - 1].routeName
          )
        );
      }

      return (
        noIndex ||
        "MyProfileSearchMapRequestsFavoritesProfile".includes(currentRoute) // TODO adapt routes to KW
      );
    };

    render() {
      const { nav, dispatch, navigation } = this.props;
      return <WrappedNavigator navigation={{ dispatch, state: nav }} />;
    }
  };
};

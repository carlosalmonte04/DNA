import React, { Component } from "react";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import {
  toggleLoggedIn,
  saveMeal,
  setLoading,
  fetchUser,
  resetFoods,
  resetMeals,
  pictureOnAnalyser
} from "@dnaActions";
import { CameraScreen } from "./Home";
import WelcomeLoginForm from "./WelcomeLoginForm";

class CameraDashboardContainer extends Component {
  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn = async () => {
    const token = await AsyncStorage.getItem("token");
    this.props.toggleLoggedIn(!!token);
    if (this.props.isLoggedIn) await this.props.fetchUser(token);
    console.log("Toggling to false");
    this.props.setLoading(false);
  };

  resetAll = () => {
    this.props.resetFoods();
    this.props.resetMeals();
    this.props.retakePicture();
  };

  _renderCameraScreen = () => {
    return (
      <CameraScreen
        navigation={this.props.navigation}
        resetAll={this.resetAll}
      />
    );
  };

  _renderWelcomeLoginForm() {
    return <WelcomeLoginForm navigation={this.props.navigation} />;
  }

  render() {
    return /*this.props.isLoggedIn*/ true
      ? this._renderCameraScreen()
      : this._renderWelcomeLoginForm();
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.ui.isLoading,
    isLoggedIn: state.ui.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleLoggedIn: bool => dispatch(toggleLoggedIn(bool)),
    saveMeal: meal => dispatch(saveMeal(meal)),
    setLoading: bool => dispatch(setLoading(bool)),
    fetchUser: token => dispatch(fetchUser(token)),
    retakePicture: () => dispatch(pictureOnAnalyser(null)),
    resetFoods: () => dispatch(resetFoods()),
    resetMeals: () => dispatch(resetMeals())
  };
}

export default connect(
  mapStateToProps,
  {
    toggleLoggedIn,
    saveMeal,
    setLoading,
    fetchUser,
    retakePicture: () => pictureOnAnalyser(null),
    resetFoods,
    resetMeals
  }
)(CameraDashboardContainer);

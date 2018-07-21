import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Navigator,
  Image,
  View,
  Link,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Modal
} from "react-native";
import {
  Container,
  Content,
  InputGroup,
  Input,
  Icon,
  Button,
  Text,
  Form,
  Header,
  Title,
  Item,
  Label
} from "native-base";
import { DnaImage } from "@dnaCommon";
import { Jiro } from "react-native-textinput-effects";
import toggleSignUpModal from "../../actions/ui/toggleSignUpModal";
import SignUpForm from "../SignUpForm";
import login from "../../actions/users-sessions/login";
import { Colors } from "@dnaAssets";
import LinearGradient from "react-native-linear-gradient";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const localStyles = StyleSheet.create({
  mealImage: {
    height: WIDTH / 3.02,
    width: WIDTH / 3.02,
    borderWidth: 1,
    borderColor: Colors.white
  }
});

class UnconnectedMealListItem extends Component {
  render() {
    const {
      meal: { pictureUrl }
    } = this.props;

    return (
      <View>
        <DnaImage source={{ uri: pictureUrl }} style={localStyles.mealImage} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    signUpShowing: state.ui.signUpModalShowing
  };
}

export const MealListItem = connect(
  mapStateToProps,
  { toggleSignUpModal, login }
)(UnconnectedMealListItem);
